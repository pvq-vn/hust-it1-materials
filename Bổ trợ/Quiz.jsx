import React, { useState, useEffect } from 'react';

// ==========================================
// KHO ICON BẰNG SVG NGUYÊN BẢN (KHÔNG DÙNG THƯ VIỆN ĐỂ TRÁNH LỖI)
// ==========================================
const IconClock = ({size=20, className=""}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconBookOpen = ({size=20, className=""}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const IconArrowRight = ({size=20, className=""}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconSend = ({size=18, className=""}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const IconCheckSquare = ({size=14, className=""}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>;
const IconChevronLeft = ({size=20, className=""}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IconChevronRight = ({size=20, className=""}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
const IconLayoutGrid = ({size=20, className=""}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const IconTrophy = ({size=64, className=""}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;
const IconAlertCircle = ({size=24, className=""}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const IconRotateCcw = ({size=20, className=""}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>;
const IconCheckCircle = ({size=20, className=""}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const IconBookmark = ({size=20, className=""}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>;
const IconBookmarkSolid = ({size=20, className=""}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>;

// ==========================================
// KHO DỮ LIỆU ĐỀ THI (30 Câu - Bám sát tài liệu IT3040)
// ==========================================
const QUESTIONS = [
  {
    id: 1,
    type: "single",
    text: "Kỹ thuật nào sau đây KHÔNG nằm trong mục tiêu giảng dạy chính của học phần IT3040 - Kỹ thuật lập trình?",
    options: ["Quản lý bộ nhớ", "Kỹ thuật đệ quy", "Kỹ thuật lập trình phòng ngừa", "Thiết kế cơ sở dữ liệu quan hệ"],
    correctAnswers: ["Thiết kế cơ sở dữ liệu quan hệ"],
    explanation: "Học phần KTLT trang bị kỹ thuật lập trình như quản lý bộ nhớ, hàm, đệ quy, cấu trúc dữ liệu, lập trình phòng ngừa, gỡ rối, tinh chỉnh mã nguồn. Thiết kế CSDL không thuộc phạm vi môn học.",
    slideRef: "Lec1. KTLT - Slide 2"
  },
  {
    id: 2,
    type: "fill",
    text: "Trong bước Validate Design, việc Lập trình viên sử dụng các dữ liệu thử nghiệm giống như số liệu thực để tự kiểm tra tay (chạy chay) chương trình được gọi là gì? (Nhập thuật ngữ tiếng Anh)",
    correctAnswers: ["desk check", "desk-check", "deskcheck"],
    explanation: "Desk check là kỹ thuật LTV dùng các dữ liệu thử nghiệm để kiểm tra chương trình trên giấy/bàn làm việc trước khi code.",
    slideRef: "Lec1. KTLT - Slide 55"
  },
  {
    id: 3,
    type: "single",
    text: "Cho đoạn code C/C++ sau. Giá trị của a và b sau khi thực thi là bao nhiêu?",
    code: "int a, b = 10;\na = ++b + 5;",
    options: ["a = 15, b = 11", "a = 16, b = 11", "a = 15, b = 10", "a = 16, b = 10"],
    correctAnswers: ["a = 16, b = 11"],
    explanation: "Toán tử ++b (tiền tố) sẽ tăng b lên 1 (thành 11) trước, sau đó lấy giá trị mới của b cộng với 5 gán cho a. Vậy a = 11 + 5 = 16.",
    slideRef: "Lec2. Quan ly bo nho - Slide 3"
  },
  {
    id: 4,
    type: "single",
    text: "Cho đoạn code C/C++ sau. Giá trị của a và b sau khi thực thi là bao nhiêu?",
    code: "int a, b = 10;\na = b++ + 5;",
    options: ["a = 15, b = 11", "a = 16, b = 11", "a = 15, b = 10", "a = 16, b = 10"],
    correctAnswers: ["a = 15, b = 11"],
    explanation: "Toán tử b++ (hậu tố) sẽ lấy giá trị cũ của b (là 10) để thực hiện biểu thức trước: a = 10 + 5 = 15. Sau đó mới tăng b lên 1 (thành 11).",
    slideRef: "Lec2. Quan ly bo nho - Slide 4"
  },
  {
    id: 5,
    type: "single",
    text: "Biểu thức nào sau đây sẽ bị lỗi biên dịch (Compile error)?",
    options: ["++a = b++ + 10;", "a++ = b++ + 10;", "++b = c++;", "a = printf(\"%d\", 200);"],
    correctAnswers: ["a++ = b++ + 10;"],
    explanation: "Toán tử hậu tố a++ trả về giá trị l-value (rvalue) nên không thể đứng bên trái toán tử gán (không thể gán một giá trị cho một hằng số). Trong khi đó, tiền tố ++a trả về tham chiếu đến chính biến đó nên hợp lệ.",
    slideRef: "Lec2. Quan ly bo nho - Slide 3"
  },
  {
    id: 6,
    type: "fill",
    text: "Kết quả in ra màn hình của câu lệnh sau là gì? (Nhập chính xác dãy ký tự in ra)",
    code: "printf(\"%d\", printf(\"%d\", 200));",
    correctAnswers: ["2003"],
    explanation: "Hàm printf bên trong in ra '200' và trả về số lượng ký tự đã in (là 3 ký tự). Hàm printf bên ngoài sẽ nhận kết quả trả về này và in ra '3'. Do đó kết quả dính liền là 2003.",
    slideRef: "Lec2. Quan ly bo nho - Slide 3"
  },
  {
    id: 7,
    type: "multiple",
    text: "Vùng nhớ Stack (Stack segment) thường được sử dụng để lưu trữ các thành phần nào sau đây?",
    options: ["Biến cục bộ (Local variables)", "Tham số truyền vào hàm (Parameters)", "Địa chỉ trả về (Return address)", "Biến toàn cục (Global variables)", "Bộ nhớ cấp phát động bằng lệnh new"],
    correctAnswers: ["Biến cục bộ (Local variables)", "Tham số truyền vào hàm (Parameters)", "Địa chỉ trả về (Return address)"],
    explanation: "Stack được dùng để cấp phát Frame cho các hàm, bao gồm: biến cục bộ, tham số của hàm, địa chỉ trả về của hàm gọi, và frame pointer cũ. Biến toàn cục nằm ở Data segment, còn 'new' nằm ở Heap.",
    slideRef: "Lec2. Quan ly bo nho - Slide 44"
  },
  {
    id: 8,
    type: "multiple",
    text: "Trong kiến trúc phân vùng bộ nhớ, vùng nhớ Heap có đặc điểm gì?",
    options: ["Dùng cho các biến toàn cục", "Dùng để cấp phát động (Dynamic allocation)", "Kích thước có thể thay đổi linh hoạt trong quá trình chạy", "Tự động giải phóng biến khi kết thúc hàm", "Vùng nhớ Heap có thể phân mảnh"],
    correctAnswers: ["Dùng để cấp phát động (Dynamic allocation)", "Kích thước có thể thay đổi linh hoạt trong quá trình chạy", "Vùng nhớ Heap có thể phân mảnh"],
    explanation: "Heap dùng để cấp phát động bằng malloc/new, kích thước thay đổi linh hoạt, do lập trình viên tự quản lý (phải free/delete). Nếu thao tác liên tục có thể gây phân mảnh.",
    slideRef: "Lec2. Quan ly bo nho - Phân vùng bộ nhớ"
  },
  {
    id: 9,
    type: "single",
    text: "Trong bước Implement Design, phương pháp 'Extreme programming (XP)' được hiểu là gì?",
    options: ["Viết toàn bộ code rồi mới bắt đầu test", "Coding và testing ngay sau khi các yêu cầu được xác định", "Chỉ viết code theo tài liệu đặc tả chặt chẽ từ trên xuống", "Lập trình không cần viết comment"],
    correctAnswers: ["Coding và testing ngay sau khi các yêu cầu được xác định"],
    explanation: "Extreme programming (XP) là một phương pháp phát triển linh hoạt (Agile), nhấn mạnh vào việc coding và testing (thường là Test-driven) ngay sau khi nắm được yêu cầu, thay vì chờ thiết kế hoàn chỉnh.",
    slideRef: "Lec1. KTLT - Slide 56"
  },
  {
    id: 10,
    type: "single",
    text: "Thuật ngữ 'Dead code' cần được loại bỏ trong quá trình Rà soát lại chương trình (Document Solution) có nghĩa là gì?",
    options: ["Các mã nguồn gây ra lỗi biên dịch", "Các hàm hoặc câu lệnh mà chương trình không bao giờ gọi đến hoặc thực thi tới", "Các biến chưa được khởi tạo giá trị", "Bộ nhớ rác không được giải phóng"],
    correctAnswers: ["Các hàm hoặc câu lệnh mà chương trình không bao giờ gọi đến hoặc thực thi tới"],
    explanation: "Dead code (Mã chết) là phần mã nguồn tồn tại trong project nhưng luồng thực thi của chương trình không bao giờ chạy qua nó, cần được dọn dẹp để code sạch sẽ hơn.",
    slideRef: "Lec1. KTLT - Slide 58"
  },
  {
    id: 11,
    type: "single",
    text: "Trong cấu trúc một Stack frame của hàm, thanh ghi FP (Frame pointer) dùng để làm gì?",
    options: ["Trỏ đến đỉnh hiện tại của Stack", "Truy cập các biến cục bộ (local variables) và tham số (parameters) của hàm", "Lưu trữ giá trị trả về của hàm", "Chứa địa chỉ của lệnh sẽ được thực thi tiếp theo (Instruction Pointer)"],
    correctAnswers: ["Truy cập các biến cục bộ (local variables) và tham số (parameters) của hàm"],
    explanation: "Frame pointer (FP) đóng vai trò như một điểm mốc cố định của hàm hiện tại, được sử dụng để tính toán địa chỉ và truy cập an toàn vào local variables và parameters. Stack pointer (SP) thì liên tục thay đổi.",
    slideRef: "Lec2. Quan ly bo nho - Slide 44"
  },
  {
    id: 12,
    type: "fill",
    text: "Vùng nhớ chứa các biến toàn cục (global variables) và biến tĩnh (static variables) được gọi là vùng nhớ ______?",
    correctAnswers: ["data", "data segment", "vùng nhớ data", "phân vùng data", "vùng data"],
    explanation: "Data segment (bao gồm initialized data và uninitialized data/BSS) là nơi lưu trữ các biến có thời gian sống (lifetime) trong toàn bộ thời gian chạy của chương trình.",
    slideRef: "Lec2. Quan ly bo nho"
  },
  {
    id: 13,
    type: "multiple",
    text: "Theo tài liệu khai thác hiệu quả phần cứng, dữ liệu được lưu trữ ở đâu sẽ có tốc độ truy xuất nhanh hơn đáng kể so với bộ nhớ chính (RAM)?",
    options: ["Thanh ghi (Registers)", "Bộ nhớ đệm (Cache)", "Ổ cứng SSD", "Đĩa từ (Magnetic disk)"],
    correctAnswers: ["Thanh ghi (Registers)", "Bộ nhớ đệm (Cache)"],
    explanation: "Dữ liệu trong thanh ghi (registers) nằm ngay trong CPU có tốc độ nhanh nhất, tiếp đó là bộ nhớ đệm (cache). Khai thác tốt điều này giúp tăng hiệu năng phần mềm (locality of reference).",
    slideRef: "IT3040.pdf - Slide 69 (Trang 266)"
  },
  {
    id: 14,
    type: "single",
    text: "Kỹ thuật 'Pipelining' trong phần cứng vi xử lý có nghĩa là gì?",
    options: ["Thực hiện lệnh trước khi biết có đủ điều kiện để thực hiện hay không", "Thực hiện nhiều thao tác trong cùng 1 chu kỳ đồng hồ", "Giải mã 1 lệnh trong khi đang thực hiện 1 lệnh khác", "Cấp phát bộ nhớ cho nhiều luồng cùng lúc"],
    correctAnswers: ["Giải mã 1 lệnh trong khi đang thực hiện 1 lệnh khác"],
    explanation: "Pipelining (đường ống) cho phép CPU chia quá trình xử lý lệnh thành nhiều giai đoạn. Nó có thể nạp/giải mã lệnh tiếp theo trong khi đang thực thi lệnh hiện tại, giúp tăng throughput.",
    slideRef: "IT3040.pdf - Slide 70 (Trang 266)"
  },
  {
    id: 15,
    type: "single",
    text: "Đặc điểm của kiến trúc 'Superscalar' là gì?",
    options: ["Giải mã 1 lệnh trong khi thực hiện 1 lệnh khác", "Thực hiện nhiều thao tác trong cùng 1 chu kỳ đồng hồ (clock cycle)", "Dành riêng cho các lệnh tuần tự, phụ thuộc lẫn nhau", "Dự đoán nhánh để thực thi trước (Speculative execution)"],
    correctAnswers: ["Thực hiện nhiều thao tác trong cùng 1 chu kỳ đồng hồ (clock cycle)"],
    explanation: "Superscalar processor có khả năng dispatch nhiều chỉ thị (instructions) tới nhiều đơn vị thực thi dư thừa trong cùng một chu kỳ xung nhịp, áp dụng tốt cho các lệnh độc lập.",
    slideRef: "IT3040.pdf - Slide 70 (Trang 266)"
  },
  {
    id: 16,
    type: "single",
    text: "Kỹ thuật 'Speculative execution' (Thực thi đầu cơ) được định nghĩa thế nào?",
    options: ["Thực hiện lệnh trước khi biết chắc chắn có đủ điều kiện để thực hiện nó hay không", "Giải mã toàn bộ chương trình trước khi chạy", "Liên tục kiểm tra các lỗi logic trong quá trình chạy", "Thực thi nhiều luồng (threads) trên các lõi khác nhau"],
    correctAnswers: ["Thực hiện lệnh trước khi biết chắc chắn có đủ điều kiện để thực hiện nó hay không"],
    explanation: "Thực thi đầu cơ thường kết hợp với dự đoán nhánh (branch prediction). CPU 'đoán' xem nhánh nào của câu lệnh IF sẽ được chọn và thực thi trước để tiết kiệm thời gian.",
    slideRef: "IT3040.pdf - Slide 70 (Trang 266)"
  },
  {
    id: 17,
    type: "single",
    text: "Nếu trong hàm main() ta khai báo một mảng tĩnh cực lớn: `double arr[1000000];`, mảng này sẽ nằm ở đâu và có nguy cơ gây ra lỗi gì?",
    options: ["Nằm ở Heap - Nguy cơ Memory Leak", "Nằm ở Stack - Nguy cơ Stack Overflow", "Nằm ở Data Segment - Nguy cơ Out of Memory", "Nằm ở Text Segment - Nguy cơ Segmentation Fault"],
    correctAnswers: ["Nằm ở Stack - Nguy cơ Stack Overflow"],
    explanation: "Biến cục bộ khai báo bình thường trong hàm sẽ nằm trên Stack. Kích thước Stack mặc định của OS thường khá nhỏ (ví dụ 1MB-8MB). Việc khai báo mảng tĩnh quá lớn sẽ làm cạn kiệt không gian này, gây lỗi Stack Overflow.",
    slideRef: "Lec2. Quan ly bo nho - Stack (Slide 44)"
  },
  {
    id: 18,
    type: "single",
    text: "Một sinh viên định nghĩa toán tử cộng ma trận trả về một con trỏ ma trận cấp phát động. Khi thực hiện C = A + B hàng ngàn lần trong vòng lặp, chương trình bị crash do hết bộ nhớ. Nguyên nhân cốt lõi là gì?",
    options: ["Vòng lặp chạy quá nhanh làm CPU quá tải", "Lỗi tràn bộ đệm (Buffer overflow)", "Lỗi rò rỉ bộ nhớ (Memory leak) do không giải phóng vùng nhớ sinh ra bởi phép toán cộng", "Kích thước ma trận vượt quá giới hạn mảng 2 chiều"],
    correctAnswers: ["Lỗi rò rỉ bộ nhớ (Memory leak) do không giải phóng vùng nhớ sinh ra bởi phép toán cộng"],
    explanation: "Mỗi lần A+B, hàm sẽ dùng 'new' hoặc 'malloc' tạo một ma trận tạm thời. Nếu trong vòng lặp biến C chỉ nhận con trỏ mới mà không delete vùng nhớ cũ trước đó, hoặc ma trận trung gian không được dọn dẹp, nó sẽ dẫn đến rò rỉ bộ nhớ nghiêm trọng.",
    slideRef: "IT3040 - Đề thi - Câu 2 (Trang 1)"
  },
  {
    id: 19,
    type: "fill",
    text: "Trong quá trình kiểm tra Validate Design, hoạt động nhóm mà Lập trình viên mô tả logic thuật toán trong khi programming team duyệt theo logic chương trình được gọi là gì? (Viết bằng tiếng Anh)",
    correctAnswers: ["structured walkthrough", "structured walk-through", "structured walk through"],
    explanation: "Structured walkthrough là hình thức rà soát chéo. LTV trình bày từng bước logic, còn các thành viên khác đóng vai trò kiểm định để bắt lỗi.",
    slideRef: "Lec1. KTLT - Slide 55"
  },
  {
    id: 20,
    type: "multiple",
    text: "Theo đề thi tham khảo, kỹ thuật Template Function khi kết hợp với Operator Overloading (ví dụ phép cộng số phức) mang lại những lợi ích gì?",
    options: ["Tăng tốc độ chạy của vòng lặp", "Tái sử dụng mã (Code reuse) cho nhiều kiểu dữ liệu của thuộc tính (như int, float, double)", "Giảm bớt thời gian giải phóng bộ nhớ tự động", "Viết hàm một cách tổng quát, tránh phải định nghĩa lại toán tử nhiều lần cho từng kiểu"],
    correctAnswers: ["Tái sử dụng mã (Code reuse) cho nhiều kiểu dữ liệu của thuộc tính (như int, float, double)", "Viết hàm một cách tổng quát, tránh phải định nghĩa lại toán tử nhiều lần cho từng kiểu"],
    explanation: "Template giúp tổng quát hóa kiểu dữ liệu. Khi định nghĩa operator+ cho số phức, thay vì viết riêng cho (int, int) và (float, float), ta chỉ cần viết 1 template để dùng cho mọi kiểu số.",
    slideRef: "IT3040 - Đề thi - Câu 1 (Trang 1)"
  },
  {
    id: 21,
    type: "single",
    text: "Khi cấp phát động một mảng 2 chiều bằng con trỏ cấp 2 (ví dụ `float **Data`), quá trình thu hồi bộ nhớ (delete) cần thực hiện theo trình tự nào để không bị memory leak?",
    options: ["Xóa mảng con trỏ cấp 1 (Data) trước, sau đó xóa các hàng", "Dùng vòng lặp delete từng mảng 1 chiều (các hàng) trước, sau đó delete mảng các con trỏ", "Chỉ cần dùng lệnh `delete[] Data;` là tự động xóa tất cả", "Dùng hàm `free()` thay thế cho toán tử `delete`"],
    correctAnswers: ["Dùng vòng lặp delete từng mảng 1 chiều (các hàng) trước, sau đó delete mảng các con trỏ"],
    explanation: "Cấp phát mảng 2 chiều động thực chất là cấp phát một mảng chứa các con trỏ, mỗi con trỏ trỏ tới một mảng dữ liệu. Khi hủy, ta phải vòng lặp hủy từng 'mảng dữ liệu' trước, rồi mới hủy 'mảng các con trỏ'. Nếu làm ngược lại sẽ mất dấu địa chỉ các mảng dữ liệu.",
    slideRef: "Lec2. Quan ly bo nho - Bài tập cấp phát động (Slide 45, 46)"
  },
  {
    id: 22,
    type: "fill",
    text: "Từ khóa nào trong ngôn ngữ C/C++ được sử dụng để báo cho trình biên dịch biết một biến, mảng hoặc con trỏ không được phép thay đổi giá trị (chỉ đọc)?",
    correctAnswers: ["const", "constant"],
    explanation: "Từ khóa const dùng để định nghĩa hằng số hoặc các tham số chỉ đọc. Sử dụng const là một trong những best practice của Lập trình phòng ngừa (Defensive programming).",
    slideRef: "Lec2. Quan ly bo nho - Slide 44 (Đọc thêm)"
  },
  {
    id: 23,
    type: "single",
    text: "Lỗi cú pháp (Syntax error) là gì?",
    options: ["Lỗi vi phạm quy tắc xác định cách viết các lệnh của ngôn ngữ lập trình", "Sự sai sót về thuật toán khiến kết quả bị sai lệch", "Lỗi xảy ra khi chương trình chia cho 0 trong lúc đang chạy", "Việc truy cập vào mảng ở vị trí vượt quá kích thước"],
    correctAnswers: ["Lỗi vi phạm quy tắc xác định cách viết các lệnh của ngôn ngữ lập trình"],
    explanation: "Syntax error là lỗi ngữ pháp (ví dụ thiếu dấu chấm phẩy, sai tên từ khóa). Trình biên dịch sẽ bắt được lỗi này và không cho phép tạo file thực thi.",
    slideRef: "Lec1. KTLT - Slide 56"
  },
  {
    id: 24,
    type: "multiple",
    text: "Đâu là những hành vi được xem là Undefined Behavior (UB) trong C/C++?",
    options: ["Truy cập mảng ngoài biên (Out of bounds)", "Cộng trừ hai biến số nguyên bình thường", "Sử dụng con trỏ chưa được khởi tạo (Uninitialized pointer)", "Chia một số thực cho biến có giá trị 0"],
    correctAnswers: ["Truy cập mảng ngoài biên (Out of bounds)", "Sử dụng con trỏ chưa được khởi tạo (Uninitialized pointer)", "Chia một số thực cho biến có giá trị 0"],
    explanation: "UB là những hành vi mà chuẩn ngôn ngữ C/C++ không quy định kết quả. Chương trình có thể crash ngay, có thể chạy tiếp nhưng sinh dữ liệu rác, hoặc thậm chí hoạt động 'đúng' một cách ngẫu nhiên. Chia cho số 0 với số nguyên là UB (thường báo Floating point exception).",
    slideRef: "Lec2. Quan ly bo nho - Slide 44 (Undefined Behaviors)"
  },
  {
    id: 25,
    type: "single",
    text: "Khi xem xét tối ưu hóa mã nguồn (Performance Optimization), lời khuyên nào sau đây được nhắc đến trong kết luận của slide bài giảng?",
    options: ["Luôn luôn ưu tiên viết mã nguồn phức tạp để chạy nhanh nhất có thể", "Tối ưu hóa mọi hàm trong chương trình kể cả khi phần mềm đang chạy nhanh", "Không cần cố gắng tối ưu hóa một chương trình đã chạy đủ nhanh", "Bỏ qua các nguyên tắc Lập trình phòng ngừa để ép hiệu năng"],
    correctAnswers: ["Không cần cố gắng tối ưu hóa một chương trình đã chạy đủ nhanh"],
    explanation: "Hãy lập trình một cách thông minh, đừng quá cứng nhắc. Nguyên tắc 'Premature optimization is the root of all evil' chỉ ra rằng ta chỉ nên dùng profiler (chạy thử) tìm 'hot spots' rồi mới tối ưu, không cần tối ưu đoạn code vốn không phải là nút thắt cổ chai.",
    slideRef: "IT3040.pdf - Slide 71 (Trang 267)"
  },
  {
    id: 26,
    type: "single",
    text: "Hoạt động Debugging (Gỡ rối) trong giai đoạn Test Solution được thực hiện nhằm mục đích gì?",
    options: ["Viết báo cáo đánh giá giao diện người dùng", "Dịch từ mã giả (pseudocode) sang C++", "Khởi tạo dữ liệu ngẫu nhiên thay cho test data", "Tìm và sửa các lỗi syntax và logic errors trong chương trình"],
    correctAnswers: ["Tìm và sửa các lỗi syntax và logic errors trong chương trình"],
    explanation: "Debugging là quá trình tìm kiếm điểm gây ra lỗi (bugs) trong phần mềm để cô lập và sửa chữa chúng. Đảm bảo chương trình chạy thông suốt và kết quả chính xác.",
    slideRef: "Lec1. KTLT - Slide 57"
  },
  {
    id: 27,
    type: "single",
    text: "Cấu trúc điều khiển lặp 'Do-Until' khác với 'Do-While' ở điểm cơ bản nào theo lý thuyết?",
    options: ["Do-Until lặp khi điều kiện còn sai (cho đến khi đúng), Do-While lặp khi điều kiện còn đúng", "Do-Until kiểm tra điều kiện trước, Do-While kiểm tra điều kiện sau", "Do-Until chỉ có trong ngôn ngữ C++", "Không có sự khác biệt về logic"],
    correctAnswers: ["Do-Until lặp khi điều kiện còn sai (cho đến khi đúng), Do-While lặp khi điều kiện còn đúng"],
    explanation: "Slide KTLT có phân loại: Do-while là lặp khi điều kiện còn đúng (True). Do-Until là lặp cho đến khi điều kiện trở nên đúng (tức là lặp khi nó đang Sai).",
    slideRef: "Lec1. KTLT - Slide 54"
  },
  {
    id: 28,
    type: "multiple",
    text: "Trong bước Document Solution, hoạt động nào cần được thực hiện để hoàn thiện dự án phần mềm?",
    options: ["Rà soát lại program code để loại bỏ các dead code", "Tuyển thêm lập trình viên", "Rà soát và hoàn thiện documentation (tài liệu dự án)", "Chuyển ngôn ngữ lập trình sang dạng assembly"],
    correctAnswers: ["Rà soát lại program code để loại bỏ các dead code", "Rà soát và hoàn thiện documentation (tài liệu dự án)"],
    explanation: "Bước 6 là bước lưu trữ tài liệu. Bao gồm dọn dẹp code (bỏ code rác/dead code) và viết tài liệu kỹ thuật (documentation) giải thích thiết kế, cấu trúc, comment hàm để sau này bảo trì.",
    slideRef: "Lec1. KTLT - Slide 58"
  },
  {
    id: 29,
    type: "fill",
    text: "Toán tử trong C++ được sử dụng để trả lại vùng nhớ đã được cấp phát động về cho hệ điều hành là gì?",
    correctAnswers: ["delete", "delete[]"],
    explanation: "Trong C++, ta dùng 'new' để xin cấp phát động và 'delete' (hoặc 'delete[]' cho mảng) để giải phóng vùng nhớ đó trên Heap.",
    slideRef: "Lec2. Quan ly bo nho - Slide 46"
  },
  {
    id: 30,
    type: "single",
    text: "Khi một biến cục bộ kiểu int được khai báo bên trong hàm nhưng chưa được gán giá trị khởi tạo, điều gì sẽ xảy ra nếu ta đem in nó ra màn hình?",
    options: ["Trình biên dịch mặc định gán giá trị 0", "Sẽ in ra một giá trị rác (garbage value) tùy thuộc vào dữ liệu tồn tại sẵn trên Stack", "Chương trình sẽ tự động crash do lỗi Null Pointer", "Sẽ báo lỗi Syntax error"],
    correctAnswers: ["Sẽ in ra một giá trị rác (garbage value) tùy thuộc vào dữ liệu tồn tại sẵn trên Stack"],
    explanation: "Biến cục bộ không tự động khởi tạo. Vùng nhớ cấp cho biến trên Stack frame có thể chứa byte ngẫu nhiên của các lời gọi hàm trước đó, tạo thành giá trị rác. Nếu muốn, phải tự gán hoặc dùng biến toàn cục (sẽ được zero-initialized).",
    slideRef: "Lec2. Quan ly bo nho (Kiến thức về bộ nhớ)"
  }
];

export default function App() {
  const [status, setStatus] = useState('start'); // start, quiz, review
  const [timeLeft, setTimeLeft] = useState(40 * 60); // 40 minutes
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [flagged, setFlagged] = useState([]);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all', 'correct', 'incorrect', 'flagged'

  // Timer Effect
  useEffect(() => {
    let timer;
    if (status === 'quiz' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  // Format Time
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Handle Answers
  const handleOptionChange = (qId, type, value) => {
    setAnswers(prev => {
      const currentAns = prev[qId];
      if (type === 'single') {
        return { ...prev, [qId]: value };
      } else if (type === 'multiple') {
        let arr = currentAns ? [...currentAns] : [];
        if (arr.includes(value)) {
          arr = arr.filter(item => item !== value);
        } else {
          arr.push(value);
        }
        return { ...prev, [qId]: arr };
      } else if (type === 'fill') {
        return { ...prev, [qId]: value };
      }
      return prev;
    });
  };

  // Evaluate Answer
  const isCorrectAnswer = (q, userAns) => {
    if (!userAns) return false;
    
    if (q.type === 'single') {
      return userAns === q.correctAnswers[0];
    }
    
    if (q.type === 'multiple') {
      if (!Array.isArray(userAns)) return false;
      if (userAns.length !== q.correctAnswers.length) return false;
      // Ktra xem tat ca correctAnswers co trong userAns ko
      const isMatch = q.correctAnswers.every(ans => userAns.includes(ans));
      return isMatch;
    }
    
    if (q.type === 'fill') {
      const normalizedUserAns = String(userAns).trim().toLowerCase();
      return q.correctAnswers.some(ans => ans.toLowerCase() === normalizedUserAns);
    }
    return false;
  };

  // Submit Logic
  const handleSubmit = () => {
    let newScore = 0;
    QUESTIONS.forEach(q => {
      if (isCorrectAnswer(q, answers[q.id])) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setShowConfirmSubmit(false);
    setStatus('review');
  };

  // Get Suggestions
  const getSuggestions = () => {
    const wrongRefs = QUESTIONS
      .filter(q => !isCorrectAnswer(q, answers[q.id]))
      .map(q => q.slideRef);
    
    // Get unique slide references
    return [...new Set(wrongRefs)];
  };

  const toggleFlag = (qId) => {
    setFlagged(prev => prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]);
  };

  // ================= RENDER START SCREEN =================
  const renderStartScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-2xl w-full text-center border-t-8 border-indigo-600">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full text-indigo-600">
            <IconBookOpen size={48} />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">HỆ THỐNG ÔN TẬP CHUYÊN SÂU</h1>
        <h2 className="text-xl font-bold text-indigo-600 mb-6">Môn học: IT3040 - Kỹ thuật lập trình</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-8 text-left">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-slate-500 text-sm">Phạm vi kiến thức</p>
            <p className="font-bold text-slate-700">Chương I & II</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-slate-500 text-sm">Số lượng câu hỏi</p>
            <p className="font-bold text-slate-700">{QUESTIONS.length} Câu</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-slate-500 text-sm">Thời gian</p>
            <p className="font-bold text-slate-700">40 Phút</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-slate-500 text-sm">Quy chế</p>
            <p className="font-bold text-slate-700">Hệ 10 điểm</p>
          </div>
        </div>

        <button 
          onClick={() => setStatus('quiz')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-12 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center mx-auto gap-2 text-lg"
        >
          Bắt đầu thi <IconArrowRight size={20}/>
        </button>
      </div>
    </div>
  );

  // ================= RENDER QUIZ SCREEN =================
  const renderQuizScreen = () => {
    const q = QUESTIONS[currentQIndex];
    const userAns = answers[q.id];

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="font-bold text-indigo-800 flex items-center gap-2">
                <IconBookOpen size={20}/> IT3040 Quiz
            </div>
            
            <div className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-1.5 rounded-lg ${timeLeft < 300 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-700'}`}>
              <IconClock size={20} />
              {formatTime(timeLeft)}
            </div>

            <button 
              onClick={() => setShowConfirmSubmit(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
            >
              <IconSend size={18}/> Nộp bài
            </button>
          </div>
        </header>

        {/* Modal Submit Confirm */}
        {showConfirmSubmit && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
                    <h3 className="text-xl font-bold mb-4">Xác nhận nộp bài?</h3>
                    <p className="text-slate-500 mb-6">Bạn đã trả lời {Object.keys(answers).length}/{QUESTIONS.length} câu hỏi.</p>
                    <div className="flex gap-4">
                        <button onClick={() => setShowConfirmSubmit(false)} className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-300">Hủy</button>
                        <button onClick={handleSubmit} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700">Nộp ngay</button>
                    </div>
                </div>
            </div>
        )}

        {/* Main Content */}
        <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            
          {/* Question Area (Left 3 cols) */}
          <div className="md:col-span-3">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-md text-sm">
                            Câu {currentQIndex + 1} / {QUESTIONS.length}
                        </div>
                        <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
                            {q.type === 'single' ? 'Một đáp án' : q.type === 'multiple' ? 'Nhiều đáp án' : 'Điền khuyết'}
                        </div>
                    </div>
                    <button 
                        onClick={() => toggleFlag(q.id)} 
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-bold transition-colors ${flagged.includes(q.id) ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                    >
                        {flagged.includes(q.id) ? <IconBookmarkSolid size={16}/> : <IconBookmark size={16}/>}
                        {flagged.includes(q.id) ? 'Đã đánh dấu' : 'Đánh dấu'}
                    </button>
                </div>

                <h2 className="text-xl font-bold text-slate-800 mb-4 leading-relaxed">{q.text}</h2>
                
                {q.code && (
                    <div className="bg-slate-800 text-slate-50 p-4 rounded-xl font-mono text-sm mb-6 overflow-x-auto">
                        <pre>{q.code}</pre>
                    </div>
                )}

                <div className="space-y-3">
                    {/* Render Options if Single/Multiple */}
                    {(q.type === 'single' || q.type === 'multiple') && q.options.map((opt, i) => {
                        const isSelected = q.type === 'single' 
                            ? userAns === opt 
                            : (Array.isArray(userAns) && userAns.includes(opt));
                        
                        return (
                            <div 
                                key={i} 
                                onClick={() => handleOptionChange(q.id, q.type, opt)}
                                className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-indigo-300 hover:bg-slate-50'}`}
                            >
                                <div className="mt-0.5 mr-3 flex-shrink-0">
                                    {q.type === 'single' ? (
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-indigo-600' : 'border-slate-300'}`}>
                                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                                        </div>
                                    ) : (
                                        <div className={`w-5 h-5 rounded flex items-center justify-center border-2 ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                                            {isSelected && <IconCheckSquare size={14} className="text-white"/>}
                                        </div>
                                    )}
                                </div>
                                <span className={`text-base ${isSelected ? 'font-semibold text-indigo-900' : 'text-slate-700'}`}>{opt}</span>
                            </div>
                        )
                    })}

                    {/* Render Input if Fill */}
                    {q.type === 'fill' && (
                        <input 
                            type="text"
                            placeholder="Nhập câu trả lời của bạn vào đây..."
                            value={userAns || ''}
                            onChange={(e) => handleOptionChange(q.id, 'fill', e.target.value)}
                            className="w-full p-4 text-lg border-2 border-slate-200 rounded-xl focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-mono"
                        />
                    )}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
                <button 
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex(prev => prev - 1)}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <IconChevronLeft size={20}/> Câu trước
                </button>
                <button 
                    disabled={currentQIndex === QUESTIONS.length - 1}
                    onClick={() => setCurrentQIndex(prev => prev + 1)}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-100 border border-transparent rounded-xl font-bold text-indigo-700 hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Câu tiếp <IconChevronRight size={20}/>
                </button>
            </div>
          </div>

          {/* Sidebar (Right 1 col) */}
          <div className="md:col-span-1">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
                <div className="flex items-center gap-2 font-bold text-slate-800 mb-4 pb-4 border-b">
                    <IconLayoutGrid size={20}/> Danh sách câu hỏi
                </div>
                <div className="grid grid-cols-5 gap-2">
                    {QUESTIONS.map((qItem, i) => {
                        const isAnswered = answers[qItem.id] !== undefined && answers[qItem.id] !== '' && (!Array.isArray(answers[qItem.id]) || answers[qItem.id].length > 0);
                        const isCurrent = currentQIndex === i;
                        return (
                            <button
                                key={i}
                                onClick={() => setCurrentQIndex(i)}
                                className={`relative h-10 w-full rounded-lg text-sm font-bold flex items-center justify-center transition-all border-2
                                    ${isCurrent ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}
                                    ${isAnswered ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}
                                `}
                            >
                                {i + 1}
                                {flagged.includes(qItem.id) && <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white"></div>}
                            </button>
                        )
                    })}
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ================= RENDER REVIEW SCREEN =================
  const renderReviewScreen = () => {
    const finalScore10 = ((score / QUESTIONS.length) * 10).toFixed(1);
    const suggestions = getSuggestions();

    return (
      <div className="min-h-screen bg-slate-50 py-10 px-6 font-sans">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Score */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-slate-100">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-center text-white relative">
                <div className="flex justify-center mb-4 opacity-90">
                    <IconTrophy size={64}/>
                </div>
                <h1 className="text-4xl font-black mb-2">HOÀN THÀNH BÀI THI!</h1>
                <p className="text-indigo-100 text-lg">Hệ thống ôn tập IT3040</p>
            </div>
            
            <div className="flex flex-wrap border-b border-slate-100 divide-x divide-slate-100">
                <div className="flex-1 p-6 text-center">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Điểm số</p>
                    <p className="text-5xl font-black text-indigo-600">{finalScore10}</p>
                    <p className="text-sm text-slate-500 mt-1">/ 10</p>
                </div>
                <div className="flex-1 p-6 text-center">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Số câu đúng</p>
                    <p className="text-5xl font-black text-green-500">{score}</p>
                    <p className="text-sm text-slate-500 mt-1">/ {QUESTIONS.length} câu</p>
                </div>
                <div className="flex-1 p-6 text-center">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Đánh giá</p>
                    <div className="flex items-center justify-center h-full pb-6">
                        {score >= 25 ? (
                            <span className="px-4 py-2 bg-green-100 text-green-700 font-bold rounded-lg text-lg">Xuất sắc</span>
                        ) : score >= 20 ? (
                            <span className="px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-lg text-lg">Khá tốt</span>
                        ) : score >= 15 ? (
                            <span className="px-4 py-2 bg-yellow-100 text-yellow-700 font-bold rounded-lg text-lg">Trung bình</span>
                        ) : (
                            <span className="px-4 py-2 bg-red-100 text-red-700 font-bold rounded-lg text-lg">Cần cố gắng</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <div className="p-8 bg-amber-50/50">
                    <div className="flex items-start gap-3">
                        <div className="text-amber-500 mt-1"><IconAlertCircle size={24}/></div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg mb-2">Góc học tập - Các phần cần đọc lại:</h3>
                            <ul className="list-disc list-inside space-y-1 text-slate-600">
                                {suggestions.map((s, idx) => (
                                    <li key={idx} className="font-medium">{s}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
          </div>

          <button 
             onClick={() => {
                setStatus('start');
                setAnswers({});
                setScore(0);
                setCurrentQIndex(0);
                setTimeLeft(40 * 60);
                setFlagged([]);
                setReviewFilter('all');
             }}
             className="w-full mb-8 bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-lg"
          >
             <IconRotateCcw size={20}/> Thi lại từ đầu
          </button>

          {/* Detail Review List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <div className="text-indigo-600"><IconCheckSquare size={28}/></div> Chi tiết đáp án
            </h3>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button onClick={() => setReviewFilter('all')} className={`px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-colors ${reviewFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>Tất cả ({QUESTIONS.length})</button>
                <button onClick={() => setReviewFilter('correct')} className={`px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-colors ${reviewFilter === 'correct' ? 'bg-green-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>Làm đúng ({score})</button>
                <button onClick={() => setReviewFilter('incorrect')} className={`px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-colors ${reviewFilter === 'incorrect' ? 'bg-red-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>Làm sai ({QUESTIONS.length - score})</button>
                <button onClick={() => setReviewFilter('flagged')} className={`px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-colors ${reviewFilter === 'flagged' ? 'bg-amber-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>Đánh dấu ({flagged.length})</button>
            </div>

            {(() => {
                const filtered = QUESTIONS.filter(q => {
                    if (reviewFilter === 'correct') return isCorrectAnswer(q, answers[q.id]);
                    if (reviewFilter === 'incorrect') return !isCorrectAnswer(q, answers[q.id]);
                    if (reviewFilter === 'flagged') return flagged.includes(q.id);
                    return true;
                });

                if (filtered.length === 0) {
                    return <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 font-medium">Không có câu hỏi nào trong mục này nha ông!</div>;
                }

                return filtered.map((q) => {
                  const uAns = answers[q.id];
                  const isCorrect = isCorrectAnswer(q, uAns);
                  const originalIdx = QUESTIONS.findIndex(orig => orig.id === q.id);

                  return (
                    <div key={q.id} className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden relative ${isCorrect ? 'border-green-100' : 'border-red-100'}`}>
                      {flagged.includes(q.id) && (
                          <div className="absolute top-0 right-4 w-6 h-8 bg-amber-400 flex items-end justify-center pb-1 rounded-b-md shadow-sm">
                              <IconBookmarkSolid size={14} className="text-amber-900"/>
                          </div>
                      )}
                      {/* Header Status */}
                      <div className={`px-6 py-3 flex items-center gap-2 font-bold pr-12 ${isCorrect ? 'bg-green-50 text-green-700 border-b border-green-100' : 'bg-red-50 text-red-700 border-b border-red-100'}`}>
                        {isCorrect ? <IconCheckCircle size={20}/> : <IconAlertCircle size={20}/>}
                        Câu {originalIdx + 1}: {isCorrect ? 'Chính xác' : 'Sai'}
                      </div>

                      <div className="p-6">
                        <p className="text-lg font-bold text-slate-800 mb-4">{q.text}</p>
                        
                        {q.code && (
                            <div className="bg-slate-800 text-slate-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
                                <pre>{q.code}</pre>
                            </div>
                        )}

                        {/* Display user answers vs correct answers */}
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            {/* User Answer */}
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Câu trả lời của bạn:</p>
                                {q.type === 'fill' ? (
                                    <p className={`font-mono font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                        {uAns ? `"${uAns}"` : <span className="text-slate-400 italic">Bỏ trống</span>}
                                    </p>
                                ) : (
                                    <ul className="space-y-1">
                                        {(Array.isArray(uAns) ? uAns : [uAns]).map((ans, i) => (
                                            ans ? <li key={i} className={`font-semibold flex items-start gap-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                                <span className="mt-1">•</span> <span>{ans}</span>
                                            </li> : <li key={i} className="text-slate-400 italic">Bỏ trống</li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Correct Answer */}
                            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                                <p className="text-xs font-bold text-indigo-500 uppercase mb-2">Đáp án đúng:</p>
                                <ul className="space-y-1">
                                    {q.correctAnswers.map((ans, i) => (
                                        <li key={i} className="font-semibold text-indigo-700 flex items-start gap-2">
                                            <span className="mt-1">✓</span> <span>{ans}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Explanation */}
                        <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 relative">
                            <div className="absolute top-0 right-0 p-3 text-blue-200">
                               <IconBookOpen size={24}/>
                            </div>
                            <p className="font-bold text-blue-900 text-sm mb-2 uppercase tracking-wide">Giải thích</p>
                            <p className="text-blue-800 text-sm leading-relaxed mb-3">{q.explanation}</p>
                            <div className="inline-flex bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                                Ref: {q.slideRef}
                            </div>
                        </div>

                      </div>
                    </div>
                  );
                });
            })()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans text-slate-800 selection:bg-indigo-200 selection:text-indigo-900">
      {status === 'start' && renderStartScreen()}
      {status === 'quiz' && renderQuizScreen()}
      {status === 'review' && renderReviewScreen()}
    </div>
  );
}