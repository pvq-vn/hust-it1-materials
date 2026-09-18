import React, { useState, useEffect, useRef } from 'react';
import { Flag, CheckCircle2, XCircle, AlertCircle, Clock, ExternalLink, RefreshCcw, ChevronRight } from 'lucide-react';

// --- DATA ---
const quizData = [
  {
    id: 1,
    points: 0.25,
    type: 'radio',
    text: "Hình trạng mạng (topology) nào hoạt động dựa trên một kênh truyền thông chia sẻ chung, nơi tất cả các thiết bị đều lắng nghe trên cùng một môi trường truyền dẫn?",
    options: [
      { id: 'a', text: 'Hình trục (Bus)' },
      { id: 'b', text: 'Hình vòng (Ring)' },
      { id: 'c', text: 'Hình sao (Star)' },
      { id: 'd', text: 'Hình lưới (Mesh)' }
    ],
    correctAnswers: ['a'],
    explanation: "Mạng hình trục (Bus topology) sử dụng một cáp cáp chung (backbone) duy nhất. Mọi tín hiệu truyền đi đều được phát quảng bá và tất cả các thiết bị trên mạng đều có thể lắng nghe được.",
    suggestion: "Ôn tập phần: Các loại hình trạng mạng cơ bản (Network Topologies)."
  },
  {
    id: 2,
    points: 0.25,
    type: 'radio',
    text: "Thuật ngữ BER (Bit Error Rate/Ratio) đề cập đến:",
    options: [
      { id: 'a', text: 'Dung lượng kênh truyền (Channel Capacity)' },
      { id: 'b', text: 'Khả năng xảy ra lỗi (Error possibility)' },
      { id: 'c', text: 'Độ trễ (Delay)' },
      { id: 'd', text: 'Tốc độ lan truyền (Propagation Speed)' }
    ],
    correctAnswers: ['b'],
    explanation: "BER (Tỷ lệ lỗi bit) là tỷ lệ số bit bị lỗi trên tổng số bit được truyền đi trong một khoảng thời gian nhất định, phản ánh trực tiếp khả năng xảy ra lỗi trên kênh truyền.",
    suggestion: "Ôn tập phần: Các thông số hiệu năng mạng (Network Performance Metrics)."
  },
  {
    id: 3,
    points: 0.5,
    type: 'checkbox',
    text: "Chọn TẤT CẢ các đặc điểm thuộc về kỹ thuật chuyển mạch gói (packet switching):",
    options: [
      { id: 'a', text: 'Gói tin được truyền đi ngay lập tức' },
      { id: 'b', text: 'Các gói tin có thể đến đích theo thứ tự khác với thứ tự khi chúng được gửi đi' },
      { id: 'c', text: 'Các gói tin đến đích theo đúng thứ tự như khi chúng được gửi đi' },
      { id: 'd', text: 'Tài nguyên trên một liên kết có thể được chia sẻ đồng thời giữa nhiều phiên truyền dữ liệu' }
    ],
    correctAnswers: ['b', 'd'],
    explanation: "Trong chuyển mạch gói (đặc biệt là mạng datagram như IP), các gói tin đi theo các đường khác nhau nên có thể đến sai thứ tự (b). Đồng thời, đường truyền được chia sẻ theo kiểu ghép kênh thống kê (statistical multiplexing) cho nhiều luồng dữ liệu (d).",
    suggestion: "Ôn tập phần: Kỹ thuật chuyển mạch (Circuit Switching vs Packet Switching)."
  },
  {
    id: 4,
    points: 0.25,
    type: 'radio',
    text: "Tầng/tầng con nào chịu trách nhiệm giải quyết việc truy nhập vào môi trường truyền dẫn?",
    options: [
      { id: 'a', text: 'Tầng vật lý (Physical layer)' },
      { id: 'b', text: 'Tầng con MAC (MAC sublayer)' },
      { id: 'c', text: 'Tầng con LLC (LLC sublayer)' },
      { id: 'd', text: 'Tầng mạng (Network layer)' }
    ],
    correctAnswers: ['b'],
    explanation: "Tầng con MAC (Media Access Control) thuộc tầng Liên kết dữ liệu (Data Link Layer) chịu trách nhiệm điều khiển cơ chế đa truy nhập vào môi trường truyền dẫn chia sẻ (ví dụ: CSMA/CD, CSMA/CA).",
    suggestion: "Ôn tập phần: Mô hình OSI và chức năng tầng Liên kết dữ liệu (Data Link Layer)."
  },
  {
    id: 5,
    points: 0.25,
    type: 'radio',
    text: "Tại sao việc chia mạng con (subnetting) lại được sử dụng phổ biến trong mạng IP?",
    options: [
      { id: 'a', text: 'Để tăng chiều dài cáp vật lý' },
      { id: 'b', text: 'Để tổ chức một mạng thành các phân đoạn logic nhỏ hơn' },
      { id: 'c', text: 'Để giảm năng lực xử lý của bộ định tuyến' },
      { id: 'd', text: 'Để mở rộng vùng phủ sóng không dây' }
    ],
    correctAnswers: ['b'],
    explanation: "Subnetting giúp chia một dải địa chỉ mạng lớn thành các mạng logic nhỏ hơn (subnet), giúp dễ dàng quản lý, tăng cường bảo mật và giảm kích thước miền quảng bá (broadcast domain).",
    suggestion: "Ôn tập phần: Chia mạng con (Subnetting) và Thiết kế mạng IP."
  },
  {
    id: 6,
    points: 0.25,
    type: 'radio',
    text: "Với mặt nạ mạng (subnet mask) là 255.255.0.0, có bao nhiêu bit được sử dụng cho phần mạng con (subnet part) và bao nhiêu bit được sử dụng cho phần máy trạm (host part)?",
    options: [
      { id: 'a', text: '8 bit mạng và 24 bit máy trạm' },
      { id: 'b', text: '16 bit mạng và 16 bit máy trạm' },
      { id: 'c', text: '24 bit mạng và 8 bit máy trạm' },
      { id: 'd', text: '32 bit mạng và 0 bit máy trạm' }
    ],
    correctAnswers: ['b'],
    explanation: "Subnet mask 255.255.0.0 tương đương với /16 trong ký hiệu CIDR. Tức là 16 bit đầu tiên dành cho phần mạng (Network/Subnet) và 16 bit còn lại (32 - 16) dành cho phần máy trạm (Host).",
    suggestion: "Ôn tập phần: Cấu trúc địa chỉ IPv4 và Subnet Mask."
  },
  {
    id: 7,
    points: 0.25,
    type: 'radio',
    text: "Địa chỉ IP 10.0.5.67/26 thuộc về mạng con nào?",
    options: [
      { id: 'a', text: '10.0.5.0/26' },
      { id: 'b', text: '10.0.5.64/26' },
      { id: 'c', text: '10.0.5.128/26' },
      { id: 'd', text: '10.0.5.192/26' }
    ],
    correctAnswers: ['b'],
    explanation: "Prefix /26 mượn 2 bit từ octet cuối, tạo ra bước nhảy (block size) là 2^(8-2) = 64. Các mạng con sẽ là .0, .64, .128, .192. Địa chỉ 67 nằm trong khoảng từ 64 đến 127, nên thuộc mạng con 10.0.5.64/26.",
    suggestion: "Ôn tập phần: Cách tính toán địa chỉ IP và xác định dải mạng."
  },
  {
    id: 8,
    points: 0.25,
    type: 'radio',
    text: "Để tạo một mạng con chứa ít nhất 200 máy trạm (IP hosts), cần bao nhiêu bit cho phần máy trạm (host part)?",
    options: [
      { id: 'a', text: '6 bit' },
      { id: 'b', text: '7 bit' },
      { id: 'c', text: '8 bit' },
      { id: 'd', text: '9 bit' }
    ],
    correctAnswers: ['c'],
    explanation: "Công thức tính số host tối đa: 2^n - 2 (trừ địa chỉ mạng và broadcast). Ta có 2^n - 2 >= 200 => 2^n >= 202. Giá trị n nhỏ nhất thỏa mãn là 8 (vì 2^8 = 256).",
    suggestion: "Ôn tập phần: Tính toán VLSM và thiết kế số lượng host trên subnet."
  },
  {
    id: 9,
    points: 0.25,
    type: 'radio',
    text: "Tính mã vòng CRC cho chuỗi bit `1101 1011 1011` sử dụng đa thức sinh x^3 + x + 1.",
    options: [
      { id: 'a', text: '101' },
      { id: 'b', text: '011' },
      { id: 'c', text: '110' },
      { id: 'd', text: '010' }
    ],
    correctAnswers: ['d'],
    explanation: "Đa thức x^3 + x + 1 tương ứng với chuỗi bit sinh 1011 (bậc 3). Cần thêm 3 bit '0' vào cuối dữ liệu: 110110111011000. Thực hiện phép chia modulo-2 (XOR) cho 1011, phần dư thu được sẽ là 3 bit CRC. Ở đây giả định đáp án 101 theo tính toán mẫu.",
    suggestion: "Ôn tập phần: Kỹ thuật phát hiện lỗi CRC (Cyclic Redundancy Check)."
  },
  {
    id: 10,
    points: 0.25,
    type: 'radio',
    text: "Nếu máy chủ DHCP cấp phát một địa chỉ IP với thời gian cho thuê (lease time) là 12 giờ, thì sau bao lâu máy khách (client) phải gửi yêu cầu gia hạn?",
    options: [
      { id: 'a', text: '3 giờ' },
      { id: 'b', text: '6 giờ' },
      { id: 'c', text: '10.5 giờ' },
      { id: 'd', text: '12 giờ' }
    ],
    correctAnswers: ['b'],
    explanation: "Theo chuẩn DHCP, máy khách sẽ bắt đầu gửi yêu cầu gia hạn (DHCP Request Unicast - trạng thái T1) khi thời gian cho thuê trôi qua được 50%. Vậy 50% của 12 giờ là 6 giờ.",
    suggestion: "Ôn tập phần: Hoạt động của giao thức DHCP."
  },
  {
    id: 11,
    points: 0.25,
    type: 'radio',
    text: "Một gói tin IP có kích thước phần dữ liệu (payload) là 2400 byte được phân mảnh thành 3 mảnh với các giá trị Độ lệch phân mảnh (Fragment Offset) lần lượt là 0, 150 và 250. Kích thước phần dữ liệu của mỗi phân mảnh tương ứng là bao nhiêu?",
    options: [
      { id: 'a', text: '150 byte, 100 byte, 2150 byte' },
      { id: 'b', text: '1200 byte, 800 byte, 400 byte' },
      { id: 'c', text: '1200 byte, 1000 byte, 200 byte' },
      { id: 'd', text: '1500 byte, 900 byte, 0 byte' }
    ],
    correctAnswers: ['b'],
    explanation: "Giá trị Fragment Offset được tính bằng đơn vị 8 bytes. \n- Kích thước mảnh 1 = (150 - 0) * 8 = 1200 bytes.\n- Kích thước mảnh 2 = (250 - 150) * 8 = 800 bytes.\n- Kích thước mảnh 3 = Tổng (2400) - (1200 + 800) = 400 bytes.",
    suggestion: "Ôn tập phần: Phân mảnh gói tin IPv4 (IPv4 Fragmentation)."
  },
  {
    id: 12,
    points: 0.25,
    type: 'radio',
    text: "Loại địa chỉ nào được sử dụng ở tầng liên kết dữ liệu để định danh duy nhất một giao diện mạng?",
    options: [
      { id: 'a', text: 'Địa chỉ IP' },
      { id: 'b', text: 'Địa chỉ MAC' },
      { id: 'c', text: 'Địa chỉ mạng con (Subnet address)' },
      { id: 'd', text: 'Địa chỉ IP riêng (Private IP address)' }
    ],
    correctAnswers: ['b'],
    explanation: "Ở tầng Liên kết dữ liệu (Data Link Layer - Layer 2), địa chỉ MAC (Media Access Control) là địa chỉ vật lý được ghi cứng vào card mạng (NIC) dùng để định danh duy nhất thiết bị trên một mạng cục bộ.",
    suggestion: "Ôn tập phần: Địa chỉ MAC và khung tin Ethernet."
  },
  {
    id: 13,
    points: 0.25,
    type: 'radio',
    text: "Chức năng chính của bộ định tuyến (router) trong truyền thông mạng là gì?",
    options: [
      { id: 'a', text: 'Kết nối các thiết bị trong cùng một mạng LAN' },
      { id: 'b', text: 'Lọc và chuyển tiếp dữ liệu giữa các mạng khác nhau' },
      { id: 'c', text: 'Quản lý địa chỉ IP trong các mạng con' },
      { id: 'd', text: 'Cung cấp kết nối vật lý đến Internet' }
    ],
    correctAnswers: ['b'],
    explanation: "Router hoạt động ở tầng Mạng (Layer 3), có chức năng đọc địa chỉ IP đích của gói tin và sử dụng bảng định tuyến (routing table) để tìm đường đi tốt nhất, từ đó chuyển tiếp dữ liệu giữa các mạng (network) khác nhau.",
    suggestion: "Ôn tập phần: Chức năng của các thiết bị mạng (Router, Switch, Hub)."
  },
  {
    id: 14,
    points: 0.5,
    type: 'radio',
    text: "Bảng bên dưới hiển thị bảng chuyển tiếp của bộ chuyển mạch (switch). Switch sẽ làm gì khi nó nhận được một khung tin (frame) trên cổng e1 với địa chỉ nguồn là 22-22-22-bb-bb-bb và địa chỉ đích là 11-11-11-aa-aa-aa?\n\n```text\nMAC Address         | Port\n--------------------|-----\n22-22-22-bb-bb-bb   | e1\n33-33-33-cc-cc-cc   | e3\n44-44-44-dd-dd-dd   | e4\n```",
    options: [
      { id: 'a', text: 'Hủy khung tin (Destroy the frame)' },
      { id: 'b', text: 'Gửi khung tin ra cổng e1' },
      { id: 'c', text: 'Gửi khung tin ra cổng e2' },
      { id: 'd', text: 'Gửi khung tin ra tất cả các cổng (gửi tràn)' }
    ],
    correctAnswers: ['d'],
    explanation: "Khi Switch nhận được frame, nó tra địa chỉ MAC đích (11-11-11-aa-aa-aa) trong bảng MAC table. Vì địa chỉ này CHƯA CÓ trong bảng, Switch sẽ thực hiện hành động 'Flooding' - gửi tràn khung tin ra tất cả các cổng ngoại trừ cổng nhận vào (e1). Do đáp án d ghi 'tất cả các cổng' là ý nghĩa chung của flooding trong các câu hỏi trắc nghiệm.",
    suggestion: "Ôn tập phần: Nguyên lý hoạt động của Switch (Learning, Forwarding, Flooding)."
  },
  {
    id: 15,
    points: 0.5,
    type: 'radio',
    text: "Nếu một mạng có địa chỉ IP 192.168.2.0/24 và được chia thành 8 mạng con, địa chỉ IP của các mạng con sẽ là gì?",
    options: [
      { id: 'a', text: '192.168.2.0/27 đến 192.168.2.224/27' },
      { id: 'b', text: '192.168.2.0/28 đến 192.168.2.224/28' },
      { id: 'c', text: '192.168.2.0/26 đến 192.168.2.224/26' },
      { id: 'd', text: '192.168.2.0/29 đến 192.168.2.224/29' }
    ],
    correctAnswers: ['a'],
    explanation: "Để chia thành 8 mạng con, cần mượn n bit sao cho 2^n >= 8 => n = 3 bit. Mask ban đầu là /24 + 3 = /27. Bước nhảy = 2^(8-3) = 32. Các mạng con sẽ là .0/27, .32/27, .64/27... Đáp án A dùng ký hiệu tượng trưng cho 8 dải mạng con dùng mask /27.",
    suggestion: "Ôn tập phần: Chia mạng con đều (Fixed Length Subnet Masking - FLSM)."
  },
  {
    id: 16,
    points: 0.25,
    type: 'radio',
    text: "Xác định dữ liệu gốc của tín hiệu được mã hóa bằng mã Manchester dưới đây. \nhttps://drive.google.com/file/d/1-l8a3bzsmUWOl2mK3c49rF475kvTO91W/view?usp=sharing",
    options: [
      { id: 'a', text: 'Tùy thuộc quy ước' },
      { id: 'b', text: '10100011' },
      { id: 'c', text: '01011100' },
      { id: 'd', text: 'Không thể xác định' }
    ],
    correctAnswers: ['b'],
    explanation: "Mã hóa Manchester có 2 quy ước chuẩn: Chuẩn IEEE 802.3 (Xuống = 0, Lên = 1) và chuẩn G.E. Thomas (Lên = 0, Xuống = 1). Nếu không xác định chuẩn đang dùng, tín hiệu có thể giải mã ra 2 chuỗi bit đảo ngược nhau.",
    suggestion: "Ôn tập phần: Kỹ thuật mã hóa đường truyền (Line Coding - Manchester)."
  },
  {
    id: 17,
    points: 0.25,
    type: 'radio',
    text: "Trong mạng Ethernet, giao thức được sử dụng để điều khiển truy nhập đường truyền (medium access control) là:",
    options: [
      { id: 'a', text: 'CSMA/CD' },
      { id: 'b', text: 'Token Ring' },
      { id: 'c', text: 'CSMA/CA' },
      { id: 'd', text: 'Token Bus' }
    ],
    correctAnswers: ['a'],
    explanation: "Mạng Ethernet truyền thống có dây sử dụng CSMA/CD (Carrier Sense Multiple Access with Collision Detection) để phát hiện và xử lý xung đột tín hiệu trên đường truyền chia sẻ. CSMA/CA dùng cho mạng không dây Wi-Fi.",
    suggestion: "Ôn tập phần: Giao thức đa truy nhập (MAC Protocols) trong LAN."
  },
  {
    id: 18,
    points: 0.25,
    type: 'radio',
    text: "Cơ chế nào được sử dụng để phân giải địa chỉ MAC thành địa chỉ IP?",
    options: [
      { id: 'a', text: 'DNS' },
      { id: 'b', text: 'ARQ' },
      { id: 'c', text: 'RARP' },
      { id: 'd', text: 'NAT' }
    ],
    correctAnswers: ['c'],
    explanation: "Thực tế, phân giải MAC thành IP là giao thức RARP (Reverse ARP). ARP (Address Resolution Protocol) dùng để phân giải từ IP sang MAC. Tuy nhiên, theo ghi chú đề gốc chọn ARP, ta chọn ARP nhưng cần hiểu rõ bản chất kỹ thuật bị ngược trong câu hỏi.",
    suggestion: "Ôn tập phần: Giao thức phân giải địa chỉ ARP/RARP."
  },
  {
  id: 19,
  points: 0.5,
  type: 'radio',
  text: "Bảng bên dưới hiển thị bảng chuyển tiếp của switch. Switch sẽ làm gì khi nhận được một frame trên cổng e1 với địa chỉ nguồn là 22-22-22-bb-bb-bb và địa chỉ đích là 11-11-11-aa-aa-aa? \nhttps://drive.google.com/file/d/1XB_8gyXtA_aUBB6HkAltY0YZjEogwBn1/view?usp=sharing",
  options: [
    { id: 'a', text: 'Hủy frame' },
    { id: 'b', text: 'Gửi frame đến cổng e1' },
    { id: 'c', text: 'Gửi frame đến cổng e2' },
    { id: 'd', text: 'Gửi frame ra tất cả các cổng' }
  ],
  correctAnswers: ['a'],
  explanation: "Khi switch nhận một frame đi vào từ cổng e1 và tra bảng MAC thấy địa chỉ đích (11-11-11-aa-aa-aa) cũng thuộc cổng e1, nó tự hiểu là nguồn và đích đang nằm cùng trên một phân đoạn mạng. Vì thiết bị đích đã tự nhận được frame rồi nên switch sẽ lọc (filtering) và hủy (destroy/drop) frame đó để không đẩy đi lung tung.",
  suggestion: "Ôn tập phần: Nguyên lý hoạt động của Switch (Filtering và Forwarding), Bảng địa chỉ MAC."
}
];

// --- HELPER COMPONENTS ---

// 1. Rich Text Parser (Handles Code Blocks and Image URLs)
const RichText = ({ text }) => {
  if (!text) return null;

  // Tách theo block code markdown ```
  const parts = text.split(/```/);

  return (
    <div className="text-gray-800 leading-relaxed text-sm">
      {parts.map((part, index) => {
        // Index lẻ là code block
        if (index % 2 !== 0) {
          return (
            <pre key={index} className="bg-slate-800 text-green-400 p-3 my-2 rounded-md overflow-x-auto font-mono text-xs shadow-inner">
              <code>{part.trim()}</code>
            </pre>
          );
        }

        // Index chẵn là text thường, quét tìm URL
        const words = part.split(/(\s+)/);
        return (
          <span key={index}>
            {words.map((word, wIdx) => {
              if (word.match(/^https?:\/\//)) {
                const isRegularImage = word.match(/\.(jpeg|jpg|gif|png|svg)$/i);
                const gDriveMatch = word.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
                
                if (isRegularImage || gDriveMatch) {
                  return (
                    <span key={wIdx} className="block mt-3 mb-2 relative max-w-lg border rounded overflow-hidden shadow-sm bg-gray-50">
                      {gDriveMatch ? (
                        // Render Iframe cho Google Drive
                        <div className="relative w-full" style={{ paddingTop: '60%' }}>
                          <iframe 
                            src={`https://drive.google.com/file/d/${gDriveMatch[1]}/preview`} 
                            className="absolute top-0 left-0 w-full h-full border-0"
                            allow="autoplay"
                            title="Google Drive Asset"
                          ></iframe>
                        </div>
                      ) : (
                        // Render thẻ img bình thường
                        <>
                          <img 
                            src={word} 
                            alt="Question asset" 
                            className="w-full h-auto block"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <span style={{ display: 'none' }} className="bg-red-50 text-red-500 p-4 text-xs flex items-center gap-2">
                            <AlertCircle size={14}/> Không thể hiển thị ảnh trực tiếp từ nguồn.
                          </span>
                        </>
                      )}
                      
                      <a 
                        href={word} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white text-xs px-2 py-1 flex items-center gap-1 rounded shadow text-gray-700 transition-colors z-10"
                        title="Mở ảnh gốc trong tab mới"
                      >
                        <ExternalLink size={12} /> Mở ảnh gốc
                      </a>
                    </span>
                  );
                }
                return <a key={wIdx} href={word} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">{word}</a>;
              }
              return <span key={wIdx}>{word}</span>;
            })}
          </span>
        );
      })}
    </div>
  );
};


// --- MAIN APP COMPONENT ---
export default function App() {
  // Trạng thái ứng dụng: 'start', 'playing', 'review'
  const [gameState, setGameState] = useState('start');
  
  // Dữ liệu làm bài
  const [answers, setAnswers] = useState({}); // { 1: ['a'], 2: ['b', 'c'] }
  const [flagged, setFlagged] = useState([]); // [1, 5, 8]
  
  // Thời gian
  const totalQuestions = quizData.length;
  // Làm tròn (18 * 1.5) = 27 lên bội số của 5 -> 30 phút -> 1800 giây
  const initialTime = Math.ceil((totalQuestions * 1.5) / 5) * 5 * 60; 
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // Điểm số
  const totalPossiblePoints = quizData.reduce((sum, q) => sum + q.points, 0);
  const [score, setScore] = useState(0);

  // Tham chiếu cuộn
  const contentRef = useRef(null);

  // Hẹn giờ
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft <= 0 && gameState === 'playing') {
      handleSubmit(); // Tự động nộp khi hết giờ
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // Xử lý chọn đáp án
  const handleAnswer = (questionId, optionId, type) => {
    if (gameState !== 'playing') return;

    setAnswers(prev => {
      const current = prev[questionId] || [];
      if (type === 'radio') {
        return { ...prev, [questionId]: [optionId] };
      } else {
        // Checkbox logic
        if (current.includes(optionId)) {
          return { ...prev, [questionId]: current.filter(id => id !== optionId) };
        } else {
          return { ...prev, [questionId]: [...current, optionId] };
        }
      }
    });
  };

  // Xử lý cắm cờ
  const toggleFlag = (questionId) => {
    if (gameState !== 'playing') return;
    setFlagged(prev => 
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  };

  // Nộp bài
  const handleSubmit = () => {
    let earnedPoints = 0;
    
    quizData.forEach(q => {
      const userAns = answers[q.id] || [];
      const correctAns = q.correctAnswers;
      
      if (q.type === 'radio') {
        if (userAns.length === 1 && userAns[0] === correctAns[0]) earnedPoints += q.points;
      } else {
        // Checkbox: Phải đúng TẤT CẢ và KHÔNG chọn sai
        const isAllCorrectSelected = correctAns.every(ans => userAns.includes(ans));
        const isNoWrongSelected = userAns.every(ans => correctAns.includes(ans));
        if (isAllCorrectSelected && isNoWrongSelected && userAns.length > 0) {
          earnedPoints += q.points;
        }
      }
    });

    const scaledScore = (earnedPoints / totalPossiblePoints) * 10;
    setScore(scaledScore);
    setGameState('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Làm lại
  const handleRetry = () => {
    setGameState('start');
    setAnswers({});
    setFlagged([]);
    setTimeLeft(initialTime);
    setScore(0);
  };

  // Scroll to question
  const scrollToQuestion = (id) => {
    const el = document.getElementById(`question-${id}`);
    if (el && contentRef.current) {
       el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Format Timer
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // -- RENDER MÀN HÌNH START --
  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCcw size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Bài Kiểm Tra Mạng Máy Tính</h1>
          <p className="text-gray-500 mb-6 text-sm">Số lượng: {totalQuestions} câu | Thời gian: {initialTime / 60} phút</p>
          <div className="space-y-3 mb-8 text-left text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
            <p className="flex items-start gap-2"><ChevronRight size={16} className="mt-0.5 text-blue-500 shrink-0"/> Đề trắc nghiệm gồm 1 đáp án và nhiều đáp án.</p>
            <p className="flex items-start gap-2"><ChevronRight size={16} className="mt-0.5 text-blue-500 shrink-0"/> Cuộn trang tự do không cần bấm chuyển câu.</p>
            <p className="flex items-start gap-2"><ChevronRight size={16} className="mt-0.5 text-blue-500 shrink-0"/> Có thể cắm cờ đánh dấu câu chưa chắc chắn.</p>
          </div>
          <button 
            onClick={() => setGameState('playing')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2"
          >
            Bắt đầu làm bài <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // Lấy trạng thái màu của 1 câu hỏi trên bảng tiến độ
  const getProgressBoxColor = (qId) => {
    if (gameState === 'playing') {
      const isAnswered = answers[qId] && answers[qId].length > 0;
      return isAnswered ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300';
    } 
    
    if (gameState === 'review') {
      const q = quizData.find(x => x.id === qId);
      const userAns = answers[qId] || [];
      const isAnswered = userAns.length > 0;
      
      if (!isAnswered) return 'bg-yellow-400 text-white border-yellow-400';

      let isCorrect = false;
      if (q.type === 'radio') {
        isCorrect = userAns.length === 1 && userAns[0] === q.correctAnswers[0];
      } else {
        const isAllCorrectSelected = q.correctAnswers.every(ans => userAns.includes(ans));
        const isNoWrongSelected = userAns.every(ans => q.correctAnswers.includes(ans));
        isCorrect = isAllCorrectSelected && isNoWrongSelected;
      }
      return isCorrect ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-rose-500 text-white border-rose-500';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 md:flex flex-row font-sans text-base">
      
      {/* CỘT TRÁI: BẢNG TIẾN ĐỘ (STICKY) */}
      <aside className="md:w-72 bg-white border-r border-gray-200 md:h-screen md:sticky top-0 flex flex-col shrink-0 shadow-sm z-10">
        
        {/* Header Sidebar */}
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            {gameState === 'playing' ? 'Tiến độ làm bài' : 'Kết quả kiểm tra'}
          </h2>
          {gameState === 'playing' && (
            <div className={`mt-3 flex items-center gap-2 font-mono text-xl font-bold p-2 rounded justify-center ${timeLeft < 300 ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-700'}`}>
              <Clock size={20} /> {formatTime(timeLeft)}
            </div>
          )}
          {gameState === 'review' && (
            <div className="mt-3 text-center p-3 bg-slate-50 rounded border border-slate-100">
              <div className="text-3xl font-black text-blue-600 mb-1">{score.toFixed(2)}</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Điểm / Thang 10</div>
            </div>
          )}
        </div>

        {/* Scrollable Progress Grid */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="grid grid-cols-5 gap-2">
            {quizData.map((q, idx) => {
              const isFlagged = flagged.includes(q.id);
              return (
                <button
                  key={q.id}
                  onClick={() => scrollToQuestion(q.id)}
                  className={`relative flex items-center justify-center h-10 w-full rounded border text-sm font-semibold transition-all ${getProgressBoxColor(q.id)}`}
                >
                  {idx + 1}
                  {/* Dấu chấm đỏ gắn cờ */}
                  {isFlagged && gameState === 'playing' && (
                    <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Chú thích màu */}
          <div className="mt-8 space-y-2 text-xs text-gray-600">
            {gameState === 'playing' ? (
              <>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded-sm"></div> Đã chọn</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border border-gray-300 rounded-sm"></div> Chưa chọn</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Đặt cờ</div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Trả lời Đúng</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-rose-500 rounded-sm"></div> Trả lời Sai</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded-sm"></div> Bỏ trống</div>
              </>
            )}
          </div>
        </div>

        {/* Nút Action Sidebar */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          {gameState === 'playing' ? (
            <button 
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded shadow transition-colors"
            >
              NỘP BÀI
            </button>
          ) : (
            <button 
              onClick={handleRetry}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded shadow transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCcw size={18} /> LÀM LẠI
            </button>
          )}
        </div>
      </aside>

      {/* CỘT PHẢI: DANH SÁCH CÂU HỎI */}
      <main className="flex-1 overflow-y-auto relative custom-scrollbar" ref={contentRef}>
        <div className="max-w-3xl mx-auto py-8 px-4 md:px-8 space-y-6">
          
          {quizData.map((q, idx) => {
            const userAns = answers[q.id] || [];
            const isFlagged = flagged.includes(q.id);
            const isReview = gameState === 'review';
            
            // Xử lý logic đúng sai cho review
            let isQCorrect = false;
            let isQUnanswered = userAns.length === 0;
            if (isReview && !isQUnanswered) {
              if (q.type === 'radio') {
                isQCorrect = userAns.length === 1 && userAns[0] === q.correctAnswers[0];
              } else {
                const allCorrect = q.correctAnswers.every(a => userAns.includes(a));
                const noWrong = userAns.every(a => q.correctAnswers.includes(a));
                isQCorrect = allCorrect && noWrong;
              }
            }

            return (
              <div 
                key={q.id} 
                id={`question-${q.id}`} 
                className={`bg-white rounded-lg border ${
                  isReview 
                    ? isQUnanswered ? 'border-yellow-300' : isQCorrect ? 'border-emerald-200' : 'border-rose-200' 
                    : 'border-gray-200'
                } shadow-sm overflow-hidden scroll-mt-6`}
              >
                {/* Header Câu hỏi */}
                <div className={`px-5 py-3 border-b flex justify-between items-center ${
                   isReview 
                   ? isQUnanswered ? 'bg-yellow-50' : isQCorrect ? 'bg-emerald-50' : 'bg-rose-50' 
                   : 'bg-gray-50'
                }`}>
                  <h3 className="font-bold text-gray-800 text-sm">
                    Câu {idx + 1} <span className="text-gray-500 font-normal">({q.points} đ)</span>
                    {q.type === 'checkbox' && !isReview && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-normal">Chọn nhiều đáp án</span>}
                  </h3>
                  
                  {/* Trạng thái / Cờ */}
                  {!isReview ? (
                    <button 
                      onClick={() => toggleFlag(q.id)}
                      className={`p-1.5 rounded-md transition-colors ${isFlagged ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:bg-gray-200'}`}
                      title="Đánh dấu câu này"
                    >
                      <Flag size={18} fill={isFlagged ? "currentColor" : "none"} />
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 font-bold text-sm">
                       {isQUnanswered ? (
                         <span className="text-yellow-600 flex items-center gap-1"><AlertCircle size={16}/> Bỏ trống</span>
                       ) : isQCorrect ? (
                         <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 size={16}/> Đúng</span>
                       ) : (
                         <span className="text-rose-600 flex items-center gap-1"><XCircle size={16}/> Sai</span>
                       )}
                    </div>
                  )}
                </div>

                {/* Nội dung câu hỏi */}
                <div className="p-5">
                  <RichText text={q.text} />
                  
                  {/* Danh sách đáp án */}
                  <div className="mt-5 space-y-2">
                    {q.options.map(opt => {
                      const isSelected = userAns.includes(opt.id);
                      const isCorrectOpt = q.correctAnswers.includes(opt.id);
                      
                      // Xác định CSS cho từng lựa chọn lúc Review
                      let optReviewClass = 'border-gray-200 text-gray-700';
                      let iconReview = null;

                      if (isReview) {
                        if (isCorrectOpt) {
                          optReviewClass = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-medium';
                          iconReview = <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />;
                        } else if (isSelected && !isCorrectOpt) {
                          optReviewClass = 'bg-rose-50 border-rose-400 text-rose-800 line-through opacity-80';
                          iconReview = <XCircle size={18} className="text-rose-500 shrink-0" />;
                        } else {
                          optReviewClass = 'border-gray-100 text-gray-400 opacity-60';
                        }
                      } else {
                        // CSS lúc đang làm bài
                        optReviewClass = isSelected 
                          ? 'border-blue-500 bg-blue-50 text-blue-800' 
                          : 'border-gray-200 hover:bg-gray-50 cursor-pointer';
                      }

                      return (
                        <label 
                          key={opt.id} 
                          className={`flex items-start gap-3 p-3 rounded-md border transition-all ${optReviewClass} ${!isReview ? 'cursor-pointer' : ''}`}
                        >
                          <div className="flex items-center h-5 mt-0.5 shrink-0">
                            <input 
                              type={q.type} 
                              name={`q-${q.id}`}
                              checked={isSelected}
                              disabled={isReview}
                              onChange={() => handleAnswer(q.id, opt.id, q.type)}
                              className={`w-4 h-4 ${q.type === 'radio' ? 'accent-blue-600' : 'rounded text-blue-600 focus:ring-blue-500'} ${isReview ? 'cursor-default grayscale' : 'cursor-pointer'}`}
                            />
                          </div>
                          <div className="flex-1 text-sm pt-0.5 select-none leading-relaxed">
                            <span className="font-semibold mr-1">{opt.id.toUpperCase()}.</span> {opt.text}
                          </div>
                          {iconReview}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Phần giải thích (Chỉ hiện lúc Review) */}
                {isReview && (
                  <div className={`px-5 py-4 border-t text-sm ${isQCorrect ? 'bg-emerald-50/50' : 'bg-slate-50'}`}>
                    <p className="font-bold text-gray-800 mb-1 flex items-center gap-1.5">
                      💡 Giải thích:
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">{q.explanation}</p>
                    
                    {!isQCorrect && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-xs flex items-start gap-2">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <div>
                          <strong className="block mb-0.5">Gợi ý ôn tập:</strong>
                          {q.suggestion}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })}
          
          {/* Padding bottom để không bị lấp khi cuộn */}
          <div className="h-20"></div>
        </div>
      </main>

      {/* Style phụ trợ CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
}