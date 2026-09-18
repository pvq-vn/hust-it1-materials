import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Clock, Flag, CheckCircle2, XCircle, AlertCircle, ExternalLink, Image as ImageIcon, ChevronRight } from 'lucide-react';

// --- DATA CÂU HỎI ---
// Đã trích xuất và chuẩn hóa từ file PDF, kèm theo giải thích chi tiết và phân loại chủ đề ôn tập.
const quizData = [
  {
    id: 1,
    originalNum: 2,
    topic: "Chia mạng con (Subnetting)",
    question: "Sử dụng mặt nạ mạng 255.255.240.0 để chia mạng 172.16.0.0/16 thành các mạng con. Số lượng mạng con là bao nhiêu?",
    type: "fill",
    correctAnswer: "16",
    explanation: "Mặt nạ mạng 255.255.240.0 có số bit 1 là: 8 + 8 + 4 = 20 bit (tức là /20). Mạng gốc là /16. Số bit mượn để chia mạng con là 20 - 16 = 4 bit. Số lượng mạng con tạo ra là 2^4 = 16 mạng con."
  },
  {
    id: 2,
    originalNum: 3,
    topic: "Chuyển mạch (Switching) & Bảng MAC",
    question: "Bảng MAC/CAM của một switch có nội dung như sau. Switch thực hiện những xử lý nào nếu nhận thành công một gói tin có địa chỉ nguồn là a3-a3-b3-b3-c3-c3 và địa chỉ đích là bb-bb-bb-cc-cc-cc? (Chọn tất cả đáp án đúng)",
    type: "multiple",
    driveImageId: "1DuZHIW7mGk8Q3ucya0_Bkro9FOdWfr8-",
    options: [
      "Thêm địa chỉ đích vào bảng MAC/CAM",
      "Gửi lại gói tin cho nút nguồn",
      "Gửi gói tin ra tất cả các cổng trừ cổng nhận",
      "Thêm địa chỉ nguồn vào bảng MAC/CAM",
      "Báo lỗi cho nút nguồn",
      "Hủy gói tin"
    ],
    correctAnswer: ["Gửi gói tin ra tất cả các cổng trừ cổng nhận", "Thêm địa chỉ nguồn vào bảng MAC/CAM"],
    explanation: "Nguyên lý hoạt động của Switch: 1) Học địa chỉ MAC nguồn (Source MAC) chưa có trong bảng. Ở đây 'a3-a3-b3-b3-c3-c3' chưa có -> Thêm vào bảng. 2) Chuyển tiếp dựa vào MAC đích: Đích 'bb-bb-bb-cc-cc-cc' không có trong bảng (Unknown Unicast) -> Switch sẽ 'flood' gói tin ra tất cả các cổng ngoại trừ cổng nhận vào."
  },
  {
    id: 3,
    originalNum: 4,
    topic: "Chuyển mạch gói (Packet Switching)",
    question: "Những phát biểu nào là SAI về hoạt động của kỹ thuật chuyển mạch gói? (Chọn tất cả đáp án đúng)",
    type: "multiple",
    options: [
      "Gói tin của các liên kết khác nhau được truyền trên cùng một đường truyền vật lý",
      "Độ trễ trong mạng không phụ thuộc vào tải",
      "Trên cùng một liên kết vật lý, tất cả các gói tin đều được truyền với tốc độ như nhau.",
      "Các gói tin từ một nguồn cùng một đích thì đi qua tất cả các chặng giống nhau"
    ],
    correctAnswer: ["Độ trễ trong mạng không phụ thuộc vào tải", "Các gói tin từ một nguồn cùng một đích thì đi qua tất cả các chặng giống nhau"],
    explanation: "- Sai thứ 1: Độ trễ (delay) phụ thuộc rất nhiều vào tải của mạng (đặc biệt là Queuing delay tại các router).\n- Sai thứ 2: Chuyển mạch gói theo phương thức Datagram không thiết lập đường truyền cố định, do đó các gói tin dù cùng nguồn/đích có thể đi theo các con đường (route) khác nhau tùy tình trạng mạng."
  },
  {
    id: 4,
    originalNum: 5,
    topic: "Mã phát hiện lỗi (CRC)",
    question: "Sử dụng mã CRC với đa thức sinh G(x) = x^3 + x + 1. Chuỗi bit biểu diễn cho đa thức này là gì?",
    type: "fill",
    correctAnswer: "1011",
    explanation: "Đa thức G(x) = 1*x^3 + 0*x^2 + 1*x^1 + 1*x^0. Biểu diễn dưới dạng nhị phân theo hệ số của các bậc từ cao xuống thấp là 1011."
  },
  {
    id: 5,
    originalNum: 6,
    topic: "Địa chỉ IPv4",
    question: "Địa chỉ nào sau đây có thể gán được cho một nút mạng?",
    type: "multiple",
    options: [
      "230.12.3.1",
      "172.20.64.0/15",
      "10.24.0.0/13",
      "127.0.0.1",
      "192.168.1.113/28"
    ],
    correctAnswer: ["192.168.1.113/28", "172.20.64.0/15"],
    explanation: "- 230.12.3.1 là địa chỉ Multicast (Lớp D), không gán cho host cá nhân.\n- 172.20.64.0/15 là địa chỉ đường mạng (Network ID).\n- 10.24.0.0/13 là địa chỉ đường mạng.\n- 127.0.0.1 là địa chỉ Loopback (test nội bộ máy), không dùng giao tiếp mạng ngoài.\n- 192.168.1.113/28 nằm trong mạng 192.168.1.112/28 (dải host từ 113 đến 126), là địa chỉ host hợp lệ."
  },
  {
    id: 6,
    originalNum: 7,
    topic: "Mã hóa tín hiệu (Encoding)",
    question: "Khi sử dụng phương pháp điều chế Bipolar NRZ, xung tín hiệu trên đường truyền như hình vẽ sau. Chuỗi bit đang được truyền đi là gì?",
    type: "fill",
    driveImageId: "11SB2Q_FdlFP89s-5WmWdCjwOXnulFeEj",
    correctAnswer: "01110000", 
    explanation: "Đây là câu hỏi yêu cầu quan sát hình (thường là Bipolar AMI). Quy tắc chung của Bipolar AMI: Bit 0 được biểu diễn bởi mức điện áp 0. Bit 1 được biểu diễn bởi điện áp luân phiên (+V rồi -V rồi +V...). Cần đối chiếu với đồ thị hình vẽ thực tế để đếm số chu kỳ."
  },
  {
    id: 7,
    originalNum: 8,
    topic: "Hiệu năng mạng (Network Performance)",
    question: "Những yếu tố nào sau đây ảnh hưởng đến giá trị Round Trip Time trong quá trình truyền? (Chọn tất cả đáp án đúng)",
    type: "multiple",
    options: [
      "Tốc độ xử lý của nút đích",
      "Khoảng cách giữa nút nguồn và đích",
      "Băng thông",
      "Số nút chuyển tiếp phải qua trên đường truyền",
      "Tải của mạng"
    ],
    correctAnswer: ["Tốc độ xử lý của nút đích", "Khoảng cách giữa nút nguồn và đích", "Băng thông", "Số nút chuyển tiếp phải qua trên đường truyền", "Tải của mạng"],
    explanation: "RTT (Thời gian vòng đi - về) bị ảnh hưởng bởi toàn bộ các độ trễ thành phần trên mạng bao gồm: Trễ truyền dẫn (do Băng thông), Trễ lan truyền (do Khoảng cách), Trễ xử lý (tại nút đích, và số lượng nút chuyển tiếp), và Trễ hàng đợi (do Tải của mạng lúc đó)."
  },
  {
    id: 8,
    originalNum: 9,
    topic: "Chia mạng con (Subnetting)",
    question: "Địa chỉ IP nào sau đây không nằm cùng mạng với các địa chỉ còn lại?",
    type: "single",
    options: [
      "172.16.40.113/19",
      "172.16.50.114/19",
      "172.16.60.115/19",
      "172.16.30.112/19"
    ],
    correctAnswer: "172.16.30.112/19",
    explanation: "Prefix /19 ứng với subnet mask 255.255.224.0. Bước nhảy (block size) ở octet thứ 3 là 256 - 224 = 32. Các mạng con sẽ là .0, .32, .64...\n- .40, .50, .60 nằm trong dải mạng 172.16.32.0/19 (từ 32.1 đến 63.254).\n- .30 nằm trong dải mạng 172.16.0.0/19 (từ 0.1 đến 31.254)."
  },
  {
    id: 9,
    originalNum: 10,
    topic: "Mô hình TCP/IP",
    question: "Trong chồng giao thức TCP/IP, giao thức nào sau đây nằm ở tầng mạng? (Chọn tất cả đáp án đúng)",
    type: "multiple",
    options: ["ICMP", "IP", "DHCP", "UDP", "TCP"],
    correctAnswer: ["ICMP", "IP"],
    explanation: "- IP và ICMP hoạt động ở tầng Mạng (Network/Internet Layer).\n- UDP và TCP ở tầng Giao vận (Transport).\n- DHCP ở tầng Ứng dụng (Application)."
  },
  {
    id: 10,
    originalNum: 11,
    topic: "Hiệu năng mạng (Delay)",
    question: "Liên kết giữa 2 nút A và B có tốc độ truyền tin là 8 Mbps và độ dài là 200 km. Thời gian để truyền hết một gói tin có kích thước 2000 byte là bao nhiêu mili giây? (Chỉ ghi giá trị số)",
    type: "fill",
    correctAnswer: "3",
    explanation: "Tổng thời gian = Trễ truyền (Transmission) + Trễ lan truyền (Propagation).\n- T_trans = L / R = (2000 * 8 bits) / (8 * 10^6 bps) = 0.002s = 2ms.\n- T_prop = d / v = (200 * 10^3 m) / (2 * 10^8 m/s) = 0.001s = 1ms. (Mặc định v = 2*10^8 m/s trong cáp).\nTổng = 2 + 1 = 3ms."
  },
  {
    id: 11,
    originalNum: 12,
    topic: "Chuyển mạch kênh (Circuit Switching)",
    question: "Phát biểu nào sau đây là đúng về chuyển mạch kênh? (Chọn tất cả đáp án đúng)",
    type: "multiple",
    options: [
      "Các nút chuyển mạch thay đổi lượng tài nguyên cấp phát cho kênh biến thiên theo tải trên đường truyền",
      "Các thiết bị chuyển mạch cấp phát tài nguyên cho kênh",
      "Nút nguồn sử dụng kênh truyền được cấp để gửi dữ liệu tới nhiều đích",
      "Kênh được hủy khi cả 2 bên báo hủy",
      "Nút nguồn gửi thông điệp xin thiết lập kênh"
    ],
    correctAnswer: ["Các thiết bị chuyển mạch cấp phát tài nguyên cho kênh", "Nút nguồn gửi thông điệp xin thiết lập kênh"],
    explanation: "Trong chuyển mạch kênh, kết nối được thiết lập trước khi truyền bằng việc nguồn gửi thông điệp xin cấp phát. Tài nguyên (băng thông, khe thời gian) được cấp phát cố định dọc theo toàn bộ tuyến, không biến thiên theo tải. Kênh bị hủy ngay khi 1 bên báo kết thúc."
  },
  {
    id: 12,
    originalNum: 13,
    topic: "Mã phát hiện lỗi (CRC)",
    question: "Sử dụng đa thức sinh G(x) = x^3 + x + 1, tính mã CRC cho chuỗi bit 1000100.",
    type: "fill",
    correctAnswer: "011",
    explanation: "G(x) = 1011 (bậc 3). Thêm 3 bit 0 vào dữ liệu: 1000100000. \nThực hiện chia modulo-2 (XOR) 1000100000 cho 1011. Kết quả phần dư cuối cùng sẽ là 111. Mã CRC cần gắn thêm là 111."
  },
  {
    id: 13,
    originalNum: 14,
    topic: "Mô hình OSI / TCP/IP",
    question: "Địa chỉ MAC được dùng ở tầng nào trong mô hình TCP/IP",
    type: "single",
    options: [
      "Tầng liên kết dữ liệu",
      "Tầng vật lý",
      "Tầng ứng dụng",
      "Tầng giao vận",
      "Tầng mạng"
    ],
    correctAnswer: "Tầng liên kết dữ liệu",
    explanation: "Địa chỉ MAC (Media Access Control) định danh các thiết bị vật lý trong cùng một mạng cục bộ (LAN), hoạt động tại tầng Liên kết dữ liệu (Data Link Layer)."
  },
  {
    id: 14,
    originalNum: 15,
    topic: "Định tuyến (Routing)",
    question: "Hoạt động định tuyến thực hiện trên tầng nào trong mô hình TCP/IP",
    type: "single",
    options: [
      "Tầng giao vận",
      "Tầng ứng dụng",
      "Tầng vật lý",
      "Tầng mạng",
      "Tầng liên kết dữ liệu"
    ],
    correctAnswer: "Tầng mạng",
    explanation: "Định tuyến (tìm đường đi tối ưu cho gói tin từ nguồn tới đích qua nhiều mạng khác nhau) là chức năng cốt lõi của Tầng mạng (Network Layer), sử dụng địa chỉ IP."
  },
  {
    id: 15,
    originalNum: 16,
    topic: "Giao thức truy nhập MAC (Slotted Aloha)",
    question: "Phát biểu nào sau đây là đúng về hoạt động của phương pháp điều khiển truy nhập đường truyền Slotted Aloha? (Chọn tất cả đáp án đúng)",
    type: "multiple",
    options: [
      "Đồng bộ thời gian giữa các nút",
      "Kiểm tra trạng thái đường truyền trước khi gửi dữ liệu",
      "Phát hiện đụng độ và thông báo cho các nút trong mạng",
      "Mỗi nút mạng được phép truyền trong khe thời gian dành riêng cho nút mạng đó",
      "Thuộc nhóm phương pháp điều khiển truy nhập ngẫu nhiên",
      "Truyền nhiều khung tin nhất có thể trong một khung thời gian (frame time)"
    ],
    correctAnswer: ["Đồng bộ thời gian giữa các nút", "Thuộc nhóm phương pháp điều khiển truy nhập ngẫu nhiên"],
    explanation: "Slotted Aloha là thuật toán truy nhập ngẫu nhiên. Khác với Aloha tinh khiết, Slotted Aloha chia thời gian thành các khe (slots) và yêu cầu các nút phải đồng bộ đồng hồ để chỉ bắt đầu truyền ở đầu các khe thời gian. Nó KHÔNG kiểm tra đường truyền trước khi gửi (không có CS) và KHÔNG phân bổ khe cố định (cái đó là TDMA)."
  },
  {
    id: 16,
    originalNum: 17,
    topic: "Phân lớp địa chỉ IP",
    question: "Địa chỉ 241.134.23.12 thuộc phân lớp nào?",
    type: "single",
    options: ["A", "D", "C", "E", "B"],
    correctAnswer: "E",
    explanation: "Dựa vào octet đầu tiên của địa chỉ IPv4:\n- Lớp A: 0 - 127\n- Lớp B: 128 - 191\n- Lớp C: 192 - 223\n- Lớp D: 224 - 239\n- Lớp E (Thử nghiệm): 240 - 255. Số 241 nằm trong Lớp E."
  },
  {
    id: 17,
    originalNum: 18,
    topic: "Chuyển mạch (Switching) & Bảng MAC",
    question: "Bảng MAC/CAM của một switch có nội dung như sau. Switch thực hiện những xử lý nào nếu trên cổng e2 nhận thành công một gói tin có địa chỉ nguồn là bc-bc-ac-ac-11-11 và địa chỉ đích là a1-a1-b2-b2-c3-c3? (Chọn tất cả đáp án đúng)",
    type: "multiple",
    driveImageId: "1XRN2TPxizKriA1c03XuH84P5TfKU2_vc",
    options: [
      "Gửi gói tin ra tất cả các cổng trừ cổng nhận",
      "Gửi gói tin ra cổng e0",
      "Gửi trả lại gói tin cho nút nguồn",
      "Gửi báo lỗi cho nút nguồn",
      "Gửi gói tin ra cổng e3",
      "Hủy gói tin",
      "Cập nhật cổng chuyển tiếp tới địa chỉ bc-bc-ac-ac-11-11 là e2"
    ],
    correctAnswer: ["Gửi gói tin ra cổng e0", "Cập nhật cổng chuyển tiếp tới địa chỉ bc-bc-ac-ac-11-11 là e2"],
    explanation: "1) Nguồn 'bc-bc-ac-ac-11-11' đến từ cổng e2, nhưng trong bảng đang ghi nó ở cổng e3 -> Switch tiến hành cập nhật lại bảng cho địa chỉ này sang cổng e2. \n2) Đích 'a1-a1-b2-b2-c3-c3' đã có trong bảng và tương ứng với cổng e0 -> Switch chỉ chuyển gói tin ra duy nhất cổng e0."
  },
  {
    id: 18,
    originalNum: 19,
    topic: "Kiến trúc phân tầng",
    question: "Trong kiến trúc phân tầng, khi nhận được dữ liệu từ tầng cao hơn chuyển xuống, tầng dưới xử lý như thế nào?",
    type: "single",
    options: [
      "Thêm tiêu đề cho gói tin",
      "Sửa thông tin phần tiêu đề",
      "Loại bỏ phần tiêu đề của gói tin",
      "Thay thế tiêu đề của gói tin bằng tiêu đề mới"
    ],
    correctAnswer: "Thêm tiêu đề cho gói tin",
    explanation: "Quá trình này gọi là Đóng gói dữ liệu (Encapsulation). Khi đi từ trên xuống, mỗi tầng sẽ thêm phần tiêu đề (Header) của riêng tầng đó vào dữ liệu của tầng trên gửi xuống."
  },
  {
    id: 19,
    originalNum: 20,
    topic: "Cấu trúc mạng (Topology)",
    question: "Trong hình trạng (topology) mạng nào sau đây, sự cố xảy ra trên đường truyền vật lý có thể cản trở đến quá trình truyền dữ liệu toàn bộ mạng?",
    type: "single",
    options: [
      "Mạng hình trục (Bus)",
      "Mạng hình sao (Star)",
      "Mạng hình vòng (Ring)",
      "Tất cả các hình trạng trên"
    ],
    correctAnswer: "Mạng hình trục (Bus)",
    explanation: "Trong mạng Ring (Vòng), tín hiệu đi vòng tròn qua các node. Nếu đường cáp bị đứt ở bất kỳ điểm nào, toàn bộ vòng tín hiệu sẽ bị ngắt, ảnh hưởng đến toàn hệ thống (nếu không có cơ chế Dual-Ring dự phòng). Mạng Bus đứt trục chính cũng chết toàn mạng, nhưng đứt cáp nhánh thì không sao. Ring rủi ro cao nhất."
  },
  {
    id: 20,
    originalNum: 21,
    topic: "Mã hóa tín hiệu",
    question: "Khi sử dụng phương pháp điều chế Manchester vi sai, xung tín hiệu trên đường truyền như hình vẽ sau. Chuỗi bit đang được truyền đi là gì?",
    type: "fill",
    driveImageId: "1jQa3Hw90SkJjs7ZaaplFX2rWGiRyAwmO",
    correctAnswer: "11100101", 
    explanation: "Quy tắc Manchester vi sai: Luôn có sự đảo pha ở giữa chu kỳ bit (để đồng bộ). Nếu bit là 0, sẽ CÓ đảo pha ở đầu chu kỳ. Nếu bit là 1, KHÔNG CÓ đảo pha ở đầu chu kỳ. (Bạn cần đối chiếu hình thực tế)."
  },
  {
    id: 21,
    originalNum: 22,
    topic: "Giao thức MAC",
    question: "Phương pháp điều khiển truy cập đường truyền nào sau đây không nằm cùng nhóm với các phương pháp còn lại?",
    type: "single",
    options: ["Aloha", "CSMA", "FDMA"],
    correctAnswer: "FDMA",
    explanation: "Aloha và CSMA thuộc nhóm phương pháp truy nhập ngẫu nhiên (Random Access - tranh chấp đường truyền). Trong khi đó, FDMA (Phân chia tần số) thuộc nhóm Phân chia kênh tĩnh (Channel Partitioning)."
  },
  {
    id: 22,
    originalNum: 23,
    topic: "Mạng LAN",
    question: "Ưu điểm của phương pháp CSMA/CD so với Token Passing là gì?",
    type: "single",
    options: [
      "Xác suất đụng độ thấp hơn",
      "Có cơ chế vãn hồi đụng độ",
      "Đơn giản hơn",
      "Hiệu suất sử dụng đường truyền cao hơn",
      "Tất cả các đáp án trên"
    ],
    correctAnswer: "Đơn giản hơn",
    explanation: "CSMA/CD (Ethernet) là thuật toán phi tập trung, hoạt động cực kỳ đơn giản (nghe trước khi nói, phát hiện đụng độ thì lùi lại ngẫu nhiên). Token Passing yêu cầu việc tạo token, quản lý token mất mát, phức tạp hơn nhiều. Token Passing không hề có đụng độ nên không thể nói CSMA/CD xác suất đụng độ thấp hơn."
  },
  {
    id: 23,
    originalNum: 24,
    topic: "Mạng LAN",
    question: "Các chuẩn Fast Ethernet có tốc độ truyền tin tối đa là bao nhiêu?",
    type: "single",
    options: ["1 Gbps", "54 Mbps", "10 Gbps", "100 Mbps", "10 Mbps"],
    correctAnswer: "100 Mbps",
    explanation: "Standard Ethernet = 10 Mbps. Fast Ethernet (802.3u) = 100 Mbps. Gigabit Ethernet = 1 Gbps."
  },
  {
    id: 24,
    originalNum: 25,
    topic: "Mạng LAN",
    question: "Ưu điểm của phương pháp CSMA/CD so với Token Passing là gì?",
    type: "single",
    options: [
      "Đơn giản hơn",
      "Xác suất đụng độ thấp hơn",
      "Có cơ chế thiết lập thứ tự ưu tiên truyền",
      "Có cơ chế phát hiện và vãn hồi đụng độ",
      "Tất cả các đáp án trên"
    ],
    correctAnswer: "Đơn giản hơn",
    explanation: "Câu hỏi lặp lại với các options hơi khác. CSMA/CD không có thứ tự ưu tiên, luôn có đụng độ. Token Passing không đụng độ. Sự vượt trội của CSMA/CD giúp nó phổ biến là nhờ sự 'Đơn giản hơn', chi phí rẻ."
  },
  {
    id: 25,
    originalNum: 26,
    topic: "Mã hóa tín hiệu đường truyền",
    question: "Phương pháp mã hóa nào sau đây sử dụng để điều chế dữ liệu số - tín hiệu số? (Chọn tất cả đáp án đúng)",
    type: "multiple",
    options: [
      "Mã checksum",
      "Mã Unipolar NRZ-L",
      "Mã parity",
      "Mã vòng CRC",
      "Mã Unipolar NRZ-I"
    ],
    correctAnswer: ["Mã Unipolar NRZ-L", "Mã Unipolar NRZ-I"],
    explanation: "NRZ-L (Non-Return-to-Zero Level) và NRZ-I (Non-Return-to-Zero Inverted) là các kỹ thuật điều chế Số sang Số (Digital-to-Digital Encoding). Checksum, Parity và CRC là kỹ thuật kiểm tra và phát hiện lỗi, không phải mã hóa đường truyền."
  }
];

// --- COMPONENTS ---

// Component xử lý Hình ảnh với cơ chế Fallback (Drive API)
const DriveImage = ({ fileId }) => {
  if (!fileId) return null;
  // Sử dụng API get Thumbnail của Drive
  const thumbUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  const originalUrl = `https://drive.google.com/file/d/${fileId}/view`;

  return (
    <div className="mt-4 mb-2 relative border border-gray-200 rounded-md bg-gray-50 flex flex-col items-center p-2 group">
      <img 
        src={thumbUrl} 
        alt="Question illustration" 
        className="max-w-full max-h-[300px] object-contain"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextElementSibling.style.display = 'flex';
        }}
      />
      {/* Fallback & Nút mở rộng */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <a 
          href={originalUrl} 
          target="_blank" 
          rel="noreferrer"
          className="bg-white/90 text-gray-700 shadow-sm px-2 py-1 text-xs rounded-md flex items-center gap-1 hover:bg-gray-100 border border-gray-200"
        >
          <ExternalLink size={14} /> Mở ảnh gốc
        </a>
      </div>
      <div style={{ display: 'none' }} className="flex-col items-center p-6 text-gray-500">
         <ImageIcon size={32} className="mb-2 text-gray-400" />
         <p className="text-sm text-center">Trình duyệt chặn hiển thị ảnh từ bên thứ 3.</p>
         <a href={originalUrl} target="_blank" rel="noreferrer" className="text-blue-500 text-sm mt-1 hover:underline">
            Click vào đây để xem ảnh
         </a>
      </div>
    </div>
  );
};

// Layout chính của ứng dụng
export default function App() {
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  
  // Dữ liệu làm bài
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  
  // Tính toán thời gian (Mỗi câu 1.5 phút, làm tròn bội số 5)
  const totalMinsRaw = quizData.length * 1.5;
  const totalMins = Math.ceil(totalMinsRaw / 5) * 5; 
  const totalSeconds = totalMins * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  // Tham chiếu để tự cuộn lên đầu khi nộp bài
  const listTopRef = useRef(null);

  // Xử lý Timer đếm ngược
  useEffect(() => {
    let timer;
    if (started && !submitted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && !submitted) {
      handleFinalSubmit(); // Hết giờ tự động nộp
    }
    return () => clearInterval(timer);
  }, [started, submitted, timeLeft]);

  // Format Text mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Cuộn mượt đến câu hỏi
  const scrollToQuestion = (index) => {
    const el = document.getElementById(`question-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Logic Chọn đáp án
  const handleSelectAnswer = (qIndex, value, type) => {
    if (submitted) return;
    
    setAnswers(prev => {
      const current = prev[qIndex];
      if (type === 'single' || type === 'fill') {
        return { ...prev, [qIndex]: value };
      } 
      if (type === 'multiple') {
        let arr = Array.isArray(current) ? [...current] : [];
        if (arr.includes(value)) {
          arr = arr.filter(v => v !== value);
        } else {
          arr.push(value);
        }
        return { ...prev, [qIndex]: arr };
      }
      return prev;
    });
  };

  // Toggle gắn cờ
  const toggleFlag = (qIndex) => {
    setFlagged(prev => ({ ...prev, [qIndex]: !prev[qIndex] }));
  };

  // Nộp bài chính thức
  const handleFinalSubmit = () => {
    setShowSubmitModal(false);
    setSubmitted(true);
    if(listTopRef.current) {
        listTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Chấm điểm và tạo thống kê (chỉ chạy lại khi data thay đổi - tối ưu React)
  const resultStats = useMemo(() => {
    if (!submitted) return null;
    let correctCount = 0;
    const wrongTopics = new Set();

    quizData.forEach((q, idx) => {
      const userAns = answers[idx];
      let isCorrect = false;

      if (q.type === 'single') {
        isCorrect = userAns === q.correctAnswer;
      } else if (q.type === 'fill') {
        // Normalize answer cho text input
        const cleanUser = (userAns || "").toString().trim().toLowerCase();
        const cleanCorrect = q.correctAnswer.toString().trim().toLowerCase();
        isCorrect = cleanUser === cleanCorrect;
      } else if (q.type === 'multiple') {
        const uArr = Array.isArray(userAns) ? userAns : [];
        const cArr = Array.isArray(q.correctAnswer) ? q.correctAnswer : [];
        if (uArr.length === cArr.length && uArr.every(v => cArr.includes(v))) {
          isCorrect = true;
        }
      }

      if (isCorrect) {
        correctCount++;
      } else {
        if(q.topic) wrongTopics.add(q.topic);
      }
    });

    const score10 = ((correctCount / quizData.length) * 10).toFixed(1);

    return { correctCount, score10, wrongTopics: Array.from(wrongTopics) };
  }, [submitted, answers]);

  // Render Màn hình Start
  if (!started) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full rounded-xl shadow-lg p-8 text-center border border-gray-200">
          <div className="mb-6 flex justify-center">
             <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                <AlertCircle className="text-blue-600 h-8 w-8" />
             </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Bài Kiểm tra Giữa kỳ</h1>
          <h2 className="text-md text-gray-500 mb-6 font-medium">Môn: Mạng Máy Tính (Mã lớp: 124173)</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-8 text-left text-sm text-gray-700">
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><ChevronRight size={16} className="text-blue-500"/> Số lượng: <b>{quizData.length} câu hỏi</b> trắc nghiệm & điền từ.</li>
              <li className="flex items-center gap-2"><ChevronRight size={16} className="text-blue-500"/> Thời gian làm bài: <b>{totalMins} phút</b>.</li>
              <li className="flex items-center gap-2"><ChevronRight size={16} className="text-blue-500"/> Tất cả câu hỏi sẽ được hiển thị trên một trang.</li>
            </ul>
          </div>
          
          <button 
            onClick={() => setStarted(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Bắt đầu làm bài
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-800 font-sans flex flex-col md:flex-row">
      
      {/* CỘT TRÁI: PROGRESS BOARD (Sticky) */}
      <div className="w-full md:w-[280px] md:shrink-0 bg-white shadow-md border-r border-gray-200 md:h-screen md:sticky md:top-0 flex flex-col z-10">
        
        {/* Phần Header Bảng điều khiển */}
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-lg mb-3">Tiến độ làm bài</h3>
          <div className={`flex items-center gap-2 text-xl font-bold ${timeLeft < 300 && !submitted ? 'text-red-500 animate-pulse' : 'text-gray-700'}`}>
            <Clock size={22} />
            {submitted ? "Đã nộp bài" : formatTime(timeLeft)}
          </div>
        </div>

        {/* Khung chứa các nút số (Scrollable riêng) */}
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="grid grid-cols-5 gap-2">
            {quizData.map((q, idx) => {
              const hasAnswered = q.type === 'multiple' 
                ? (answers[idx] && answers[idx].length > 0) 
                : !!answers[idx];
              const isFlagged = flagged[idx];

              // Color logic
              let btnClass = "bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200";
              if (!submitted) {
                if (hasAnswered) btnClass = "bg-blue-500 text-white hover:bg-blue-600 border-blue-500";
              } else {
                // Logic tô màu khi nộp bài
                let isCorrect = false;
                const userAns = answers[idx];
                if (q.type === 'single') isCorrect = userAns === q.correctAnswer;
                if (q.type === 'fill') {
                   const cleanUser = (userAns || "").toString().trim().toLowerCase();
                   const cleanCorrect = q.correctAnswer.toString().trim().toLowerCase();
                   isCorrect = cleanUser === cleanCorrect;
                }
                if (q.type === 'multiple') {
                   const uArr = Array.isArray(userAns) ? userAns : [];
                   const cArr = Array.isArray(q.correctAnswer) ? q.correctAnswer : [];
                   isCorrect = uArr.length === cArr.length && uArr.every(v => cArr.includes(v));
                }

                if (!hasAnswered) btnClass = "bg-yellow-400 text-white border-yellow-400";
                else if (isCorrect) btnClass = "bg-green-500 text-white border-green-500";
                else btnClass = "bg-red-500 text-white border-red-500";
              }

              return (
                <button
                  key={idx}
                  onClick={() => scrollToQuestion(idx)}
                  className={`relative flex items-center justify-center w-full aspect-square text-sm font-semibold rounded border transition-colors ${btnClass}`}
                >
                  {idx + 1}
                  {isFlagged && !submitted && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Chú thích màu sắc */}
          <div className="mt-6 text-xs text-gray-500 space-y-2">
            {!submitted ? (
              <>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-500"></div> Đã làm</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-gray-200"></div> Chưa làm</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500"></div> Đánh dấu</div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-500"></div> Làm đúng</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500"></div> Làm sai</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-yellow-400"></div> Bỏ trống</div>
              </>
            )}
          </div>
        </div>

        {/* Nút Nộp Bài */}
        {!submitted && (
          <div className="p-4 border-t border-gray-100">
            <button 
              onClick={() => setShowSubmitModal(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow transition-colors"
            >
              Nộp bài
            </button>
          </div>
        )}
      </div>

      {/* CỘT PHẢI: DANH SÁCH CÂU HỎI (Scroll tự do) */}
      <div className="flex-1 h-screen overflow-y-auto scroll-smooth bg-gray-50/50 p-4 md:p-8" ref={listTopRef}>
        <div className="max-w-3xl mx-auto">
          
          {/* KẾT QUẢ HIỂN THỊ SAU KHI NỘP BÀI */}
          {submitted && resultStats && (
            <div className="mb-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-center mb-6">Kết quả làm bài</h2>
              <div className="flex flex-col md:flex-row items-center justify-around gap-6 mb-6">
                <div className="text-center">
                  <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Điểm số</div>
                  <div className={`text-5xl font-extrabold ${resultStats.score10 >= 8 ? 'text-green-500' : resultStats.score10 >= 5 ? 'text-blue-500' : 'text-red-500'}`}>
                    {resultStats.score10}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">/ 10 điểm</div>
                </div>
                
                <div className="h-16 w-px bg-gray-200 hidden md:block"></div>
                
                <div className="text-center">
                   <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Số câu đúng</div>
                   <div className="text-3xl font-bold text-gray-800">
                     <span className="text-green-500">{resultStats.correctCount}</span> / {quizData.length}
                   </div>
                </div>
              </div>

              {resultStats.wrongTopics.length > 0 && (
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <h4 className="font-semibold flex items-center gap-2 text-yellow-800 mb-2">
                    <AlertCircle size={18} /> Gợi ý ôn tập
                  </h4>
                  <p className="text-sm text-yellow-700 mb-2">Bạn cần ôn lại các mảng kiến thức sau dựa trên những câu làm sai:</p>
                  <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                    {resultStats.wrongTopics.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
              )}

              <button 
                onClick={() => window.location.reload()}
                className="mt-6 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors border border-gray-200"
              >
                Làm lại bài (Reset)
              </button>
            </div>
          )}

          {/* DANH SÁCH CÂU HỎI TỪ TRÊN XUỐNG DƯỚI */}
          <div className="space-y-6 pb-20">
            {quizData.map((q, index) => {
              const uAns = answers[index];
              const isFlagged = flagged[index];
              
              // Logic check kết quả câu hỏi để render visual
              let isCorrect = false;
              let hasAnswered = false;
              if (submitted) {
                 if (q.type === 'single') {
                    hasAnswered = !!uAns;
                    isCorrect = uAns === q.correctAnswer;
                 } else if (q.type === 'fill') {
                    hasAnswered = !!uAns;
                    isCorrect = (uAns || "").toString().trim().toLowerCase() === q.correctAnswer.toString().trim().toLowerCase();
                 } else if (q.type === 'multiple') {
                    const uArr = Array.isArray(uAns) ? uAns : [];
                    const cArr = Array.isArray(q.correctAnswer) ? q.correctAnswer : [];
                    hasAnswered = uArr.length > 0;
                    isCorrect = uArr.length === cArr.length && uArr.every(v => cArr.includes(v));
                 }
              }

              return (
                <div 
                  key={q.id} 
                  id={`question-${index}`} 
                  className={`bg-white rounded-xl shadow-sm border p-5 transition-colors duration-300 ${
                    submitted 
                      ? (isCorrect ? 'border-green-300' : 'border-red-300')
                      : (isFlagged ? 'border-red-200 bg-red-50/20' : 'border-gray-200')
                  }`}
                >
                  {/* Header Question */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-base md:text-lg flex items-center gap-2">
                      <span className="bg-gray-100 text-gray-700 py-1 px-2.5 rounded text-sm shrink-0 border border-gray-200">
                        Câu {index + 1}
                      </span>
                    </h3>
                    {!submitted && (
                      <button 
                        onClick={() => toggleFlag(index)}
                        className={`text-sm flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${
                          isFlagged ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'
                        }`}
                      >
                        <Flag size={16} fill={isFlagged ? "currentColor" : "none"}/>
                        <span className="hidden sm:inline">Đánh dấu</span>
                      </button>
                    )}
                    {submitted && (
                      <div className="flex items-center gap-1 text-sm font-bold">
                        {isCorrect ? (
                          <span className="text-green-600 flex items-center gap-1"><CheckCircle2 size={18}/> Đúng</span>
                        ) : hasAnswered ? (
                          <span className="text-red-500 flex items-center gap-1"><XCircle size={18}/> Sai</span>
                        ) : (
                           <span className="text-yellow-600 flex items-center gap-1"><AlertCircle size={18}/> Bỏ trống</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Nội dung Text */}
                  <div className="text-gray-800 text-sm md:text-base mb-4 leading-relaxed whitespace-pre-line">
                    {q.question}
                  </div>

                  {/* Ảnh (nếu có) */}
                  <DriveImage fileId={q.driveImageId} />

                  {/* Code block (nếu có) */}
                  {q.code && (
                    <div className="mb-4 rounded-md border border-gray-200 bg-[#1e1e1e] p-3 overflow-x-auto text-sm text-[#d4d4d4] font-mono leading-relaxed">
                       <pre><code>{q.code}</code></pre>
                    </div>
                  )}

                  {/* Vùng Chọn Đáp Án */}
                  <div className="space-y-2 mt-4 text-sm">
                    {/* TYPE: SINGLE (Radio) */}
                    {q.type === 'single' && q.options.map((opt, i) => {
                      const isSelected = uAns === opt;
                      let rowClass = "border-gray-200 hover:bg-blue-50/50 cursor-pointer text-gray-700";
                      
                      // Highlight logic cho Review mode
                      if (submitted) {
                        rowClass = "border-gray-200 opacity-60 cursor-default pointer-events-none"; // Mặc định làm mờ
                        if (opt === q.correctAnswer) {
                          rowClass = "border-green-500 bg-green-50 text-green-800 font-semibold z-10 opacity-100 shadow-sm"; // Đáp án chuẩn luôn nổi
                        } else if (isSelected && opt !== q.correctAnswer) {
                          rowClass = "border-red-400 bg-red-50 text-red-800 opacity-100"; // Đáp án user chọn sai
                        }
                      } else if (isSelected) {
                         rowClass = "border-blue-500 bg-blue-50 ring-1 ring-blue-500 text-blue-800";
                      }

                      return (
                        <label key={i} className={`flex items-start gap-3 p-3 border rounded-lg transition-all ${rowClass}`}>
                          <div className="pt-0.5 shrink-0">
                            <input 
                              type="radio" 
                              name={`q-${index}`} 
                              checked={isSelected}
                              onChange={() => handleSelectAnswer(index, opt, 'single')}
                              disabled={submitted}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                          </div>
                          <span className="leading-snug block flex-1">{opt}</span>
                        </label>
                      );
                    })}

                    {/* TYPE: MULTIPLE (Checkbox) */}
                    {q.type === 'multiple' && q.options.map((opt, i) => {
                      const ansArr = Array.isArray(uAns) ? uAns : [];
                      const isSelected = ansArr.includes(opt);
                      const isCorrectOpt = Array.isArray(q.correctAnswer) && q.correctAnswer.includes(opt);
                      
                      let rowClass = "border-gray-200 hover:bg-blue-50/50 cursor-pointer text-gray-700";
                      
                      if (submitted) {
                        rowClass = "border-gray-200 opacity-60 cursor-default pointer-events-none";
                        if (isCorrectOpt) {
                          rowClass = "border-green-500 bg-green-50 text-green-800 font-semibold opacity-100 shadow-sm";
                        } else if (isSelected && !isCorrectOpt) {
                          rowClass = "border-red-400 bg-red-50 text-red-800 opacity-100";
                        }
                      } else if (isSelected) {
                         rowClass = "border-blue-500 bg-blue-50 ring-1 ring-blue-500 text-blue-800";
                      }

                      return (
                        <label key={i} className={`flex items-start gap-3 p-3 border rounded-lg transition-all ${rowClass}`}>
                          <div className="pt-0.5 shrink-0">
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              onChange={() => handleSelectAnswer(index, opt, 'multiple')}
                              disabled={submitted}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </div>
                          <span className="leading-snug block flex-1">{opt}</span>
                        </label>
                      );
                    })}

                    {/* TYPE: FILL (Text input) */}
                    {q.type === 'fill' && (
                      <div className="pt-2">
                        <input
                          type="text"
                          value={uAns || ""}
                          onChange={(e) => handleSelectAnswer(index, e.target.value, 'fill')}
                          disabled={submitted}
                          placeholder="Nhập câu trả lời của bạn vào đây..."
                          className={`w-full p-3 border rounded-lg outline-none transition-colors text-sm font-medium ${
                             submitted 
                               ? (isCorrect ? 'bg-green-50 border-green-400 text-green-800' : 'bg-red-50 border-red-400 text-red-800')
                               : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                          }`}
                        />
                        {submitted && !isCorrect && (
                           <div className="mt-2 text-sm text-green-700 font-semibold flex gap-1 items-center bg-green-50 p-2 rounded border border-green-200 inline-block">
                              <CheckCircle2 size={16}/> Đáp án đúng: {q.correctAnswer}
                           </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* KHUNG GIẢI THÍCH (Chỉ hiện khi Submit) */}
                  {submitted && q.explanation && (
                     <div className="mt-5 pt-4 border-t border-gray-100">
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 text-sm">
                           <h4 className="font-bold text-blue-800 mb-1 flex items-center gap-1.5">
                             <span>💡 Giải thích chi tiết</span>
                           </h4>
                           <p className="text-blue-900 leading-relaxed whitespace-pre-line">{q.explanation}</p>
                        </div>
                     </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CUSTOM MODAL XÁC NHẬN NỘP BÀI (Thay thế window.confirm) */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full animate-in fade-in zoom-in duration-200">
             <h3 className="text-xl font-bold text-gray-900 mb-2">Xác nhận nộp bài</h3>
             <p className="text-gray-600 text-sm mb-6">
                Bạn có chắc chắn muốn nộp bài? Sau khi nộp, bạn sẽ không thể thay đổi đáp án.
             </p>
             <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Hủy, kiểm tra lại
                </button>
                <button 
                  onClick={handleFinalSubmit}
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Nộp bài ngay
                </button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}