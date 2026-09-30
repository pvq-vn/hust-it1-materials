import React, { useState } from 'react';
import { ExternalLink, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface RichTextProps {
  text?: string;
  code?: string;
  table?: string;
  link?: string;
  driveImageId?: string;
  className?: string;
}

export const RichTextRenderer: React.FC<RichTextProps> = ({
  text = '',
  code,
  table,
  link,
  driveImageId,
  className = '',
}) => {
  // Combine drive links from link prop if present
  const extractedDriveId = driveImageId || extractDriveId(link);

  return (
    <div className={`rich-text space-y-3 text-slate-800 ${className}`}>
      {/* 1. Main Text with Markdown and inline code parsing */}
      {text && <ParsedText content={text} />}

      {/* 2. Embedded Google Drive Preview (if driveImageId or link has drive URL) */}
      {extractedDriveId && (
        <div className="my-3 rounded-lg border border-slate-200 overflow-hidden shadow-sm bg-slate-900/5">
          <div className="relative w-full aspect-video md:aspect-[16/9] bg-slate-100 flex items-center justify-center">
            <iframe
              src={`https://drive.google.com/file/d/${extractedDriveId}/preview`}
              className="absolute inset-0 w-full h-full border-0"
              allow="autoplay"
              title="Google Drive Document Preview"
              loading="lazy"
            />
          </div>
          <div className="p-2 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <ImageIcon size={14} className="text-slate-400" /> Tài liệu đính kèm (Google Drive)
            </span>
            <a
              href={`https://drive.google.com/file/d/${extractedDriveId}/view?usp=sharing`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-100 text-blue-600 rounded border border-slate-200 font-medium transition-colors"
            >
              <ExternalLink size={12} /> Mở trong tab mới
            </a>
          </div>
        </div>
      )}

      {/* 3. Regular Image URL (non-drive) */}
      {link && !extractedDriveId && isImageUrl(link) && (
        <ImageWithFallback src={link} />
      )}

      {/* 4. Standalone Code Block (if provided in code property) */}
      {code && (
        <div className="my-3 rounded-lg border border-slate-800 bg-slate-900 text-slate-100 p-3.5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed shadow-sm">
          <pre className="m-0">
            <code>{code}</code>
          </pre>
        </div>
      )}

      {/* 5. Standalone Table (if provided in table property) */}
      {table && <ParsedTable tableContent={table} />}
    </div>
  );
};

function extractDriveId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];
  return null;
}

function isImageUrl(url: string): boolean {
  return /\.(jpeg|jpg|gif|png|svg|webp)($|\?)/i.test(url) || url.includes('images');
}

/**
 * Image component with fallback when direct image cannot load.
 */
const ImageWithFallback: React.FC<{ src: string }> = ({ src }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="my-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <AlertCircle size={14} className="text-amber-500 shrink-0" />
          Không thể hiển thị ảnh trực tiếp từ nguồn.
        </span>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium"
        >
          <ExternalLink size={12} /> Mở ảnh gốc
        </a>
      </div>
    );
  }

  return (
    <div className="my-3 relative rounded-lg border border-slate-200 overflow-hidden bg-slate-50 group">
      <img
        src={src}
        alt="Question diagram"
        className="w-full max-h-96 object-contain block mx-auto"
        onError={() => setHasError(true)}
        loading="lazy"
      />
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        className="absolute top-2 right-2 bg-white/90 hover:bg-white text-xs px-2 py-1 rounded shadow text-slate-700 font-medium flex items-center gap-1 transition-opacity opacity-80 group-hover:opacity-100"
      >
        <ExternalLink size={12} /> Mở ảnh gốc
      </a>
    </div>
  );
};

/**
 * Text parser splitting code blocks (```), URLs, images, and basic markdown.
 */
const ParsedText: React.FC<{ content: string }> = ({ content }) => {
  // Split by markdown code fences: ```lang ... ```
  const codeBlockParts = content.split(/```/);

  return (
    <div className="leading-relaxed text-sm sm:text-base">
      {codeBlockParts.map((part, index) => {
        // Odd indices are code blocks
        if (index % 2 !== 0) {
          return (
            <div
              key={index}
              className="my-3 rounded-lg border border-slate-800 bg-slate-900 text-emerald-400 p-3.5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed shadow-sm"
            >
              <pre className="m-0">
                <code>{part.trim()}</code>
              </pre>
            </div>
          );
        }

        // Even indices are regular text lines
        return <ParsedParagraph key={index} text={part} />;
      })}
    </div>
  );
};

const ParsedParagraph: React.FC<{ text: string }> = ({ text }) => {
  // Split into lines to respect line breaks
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, lIdx) => {
        if (!line.trim()) {
          return <div key={lIdx} className="h-2" />;
        }

        // Tokenize line by words/spaces
        const tokens = line.split(/(\s+)/);

        return (
          <p key={lIdx} className="my-1 text-slate-800">
            {tokens.map((token, tIdx) => {
              // URL detection
              if (/^https?:\/\//i.test(token)) {
                const driveId = extractDriveId(token);
                if (driveId) {
                  return (
                    <span key={tIdx} className="block my-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md border border-blue-200 text-xs font-medium">
                        <ImageIcon size={14} />
                        Tài liệu Google Drive
                        <a
                          href={token}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center ml-1 text-blue-600 underline"
                        >
                          <ExternalLink size={12} />
                        </a>
                      </span>
                    </span>
                  );
                }

                if (isImageUrl(token)) {
                  return <ImageWithFallback key={tIdx} src={token} />;
                }

                return (
                  <a
                    key={tIdx}
                    href={token}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline break-all inline-flex items-center gap-0.5 mx-0.5"
                  >
                    {token} <ExternalLink size={11} className="inline shrink-0" />
                  </a>
                );
              }

              // Inline code: `code`
              if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
                return (
                  <code
                    key={tIdx}
                    className="px-1.5 py-0.5 bg-slate-100 text-red-600 rounded text-xs sm:text-sm font-mono border border-slate-200"
                  >
                    {token.slice(1, -1)}
                  </code>
                );
              }

              // Bold: **text**
              if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
                return (
                  <strong key={tIdx} className="font-bold text-slate-900">
                    {token.slice(2, -2)}
                  </strong>
                );
              }

              return <span key={tIdx}>{token}</span>;
            })}
          </p>
        );
      })}
    </>
  );
};

/**
 * Responsive table renderer for question table data.
 */
const ParsedTable: React.FC<{ tableContent: string }> = ({ tableContent }) => {
  // If table is a URL, render link
  if (/^https?:\/\//i.test(tableContent.trim())) {
    return (
      <div className="my-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-center justify-between">
        <span className="font-medium text-slate-700">Bảng dữ liệu đính kèm:</span>
        <a
          href={tableContent.trim()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 hover:underline font-semibold"
        >
          <ExternalLink size={12} /> Xem bảng
        </a>
      </div>
    );
  }

  // Parse markdown or pipe-separated table
  const lines = tableContent.split('\n').filter((l) => l.trim().length > 0);
  if (lines.length === 0) return null;

  const rows = lines.map((l) =>
    l
      .split('|')
      .map((c) => c.trim())
      .filter((_, idx, arr) => (idx !== 0 && idx !== arr.length - 1) || arr.length <= 2)
  );

  return (
    <div className="my-3 overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
      <table className="w-full text-left text-xs sm:text-sm border-collapse">
        <tbody>
          {rows.map((row, rIdx) => {
            // Check if divider line like |---|---|
            if (row.some((cell) => /^:?-+:?$/.test(cell))) {
              return null;
            }
            const isHeader = rIdx === 0;
            return (
              <tr
                key={rIdx}
                className={isHeader ? 'bg-slate-100 font-bold text-slate-900 border-b border-slate-200' : 'even:bg-slate-50 border-b border-slate-100'}
              >
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-3.5 py-2.5 whitespace-nowrap text-slate-700">
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
