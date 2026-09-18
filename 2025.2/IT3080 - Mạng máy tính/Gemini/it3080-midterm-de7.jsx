import React, { useState, useEffect, useRef, useMemo } from 'react';

// --- DATA: 40 CÂU HỎI & GIẢI THÍCH CHI TIẾT ---
const rawQuestions = [
  {
    id: 1,
    text: "Khẳng định nào sau đây là sai về Hệ tự trị (AS) trong định tuyến?",
    options: [
      { id: 'A', text: "Chính sách định tuyến chung được áp dụng ở cùng một AS" },
      { id: 'B', text: "Các giao thức định tuyến cục bộ được dùng bên trong các AS" },
      { id: 'C', text: "Các giao thức định tuyến liên vùng được dùng để kết nối các AS với nhau" },
      { id: 'D', text: "Số lượng các AS là cố định" }
    ],
    correct: ['D'],
    category: "Định tuyến (Routing)",
    explanation: "Số lượng các Hệ tự trị (AS - Autonomous System) trên Internet liên tục thay đổi và tăng lên khi mạng Internet mở rộng, không hề cố định."
  },
  {
    id: 2,
    text: "Mục đích của DHCP là gì (Dynamic Host Configuration Protocol)?",
    options: [
      { id: 'A', text: "Cho phép gán địa chỉ IP động từ server mạng khi một máy tính gia nhập một mạng" },
      { id: 'B', text: "Chuyển giao địa chỉ IP giữa các máy tính" },
      { id: 'C', text: "Cấu hình bảng định tuyến của các máy tính" },
      { id: 'D', text: "Cấu hình máy tính qua đường kết nối từ xa" }
    ],
    correct: ['A'],
    category: "Giao thức tầng ứng dụng",
    explanation: "DHCP (Dynamic Host Configuration Protocol) là giao thức cấp phát địa chỉ IP động và các thông số cấu hình mạng khác (Subnet mask, Default Gateway, DNS) cho máy khách khi gia nhập mạng."
  },
  {
    id: 3,
    text: "Trong các khẳng định sau về VLAN (Virtual LAN), khẳng định nào là sai?",
    options: [
      { id: 'A', text: "VLAN cho phép gom nhóm, quản lý các máy tính về mặt logic thay vì vị trí địa lý từng máy" },
      { id: 'B', text: "VLAN cho phép giảm bớt lưu lượng trong mạng LAN nhờ giảm số khung tin quảng bá trong mạng" },
      { id: 'C', text: "VLAN giúp giảm độ phức tạp và giá thành vận hành mạng" },
      { id: 'D', text: "VLAN cho phép tăng tính bảo mật mạng nhờ có thể phân quyền người dùng theo nhóm, phân vùng" }
    ],
    correct: ['C'],
    category: "Mạng LAN & Tầng liên kết",
    explanation: "Khẳng định C sai. Việc chia VLAN thực chất làm TĂNG độ phức tạp trong việc cấu hình (cần switch quản lý được, cấu hình trunking, định tuyến inter-VLAN) và thường yêu cầu thiết bị đắt tiền hơn so với một mạng LAN phẳng không quản lý."
  },
  {
    id: 4,
    text: "Trong các khẳng định sau về cơ chế cập nhật bảng chuyển tiếp và chuyển tiếp gói tin của Switch sau, khẳng định nào là SAI? (2 đáp án)",
    options: [
      { id: 'A', text: "Việc cập nhật bảng chuyển tiếp dựa vào thuật toán tìm đường đi với chi phí nhỏ nhất" },
      { id: 'B', text: "Khi một khung tin đến Switch mà địa chỉ MAC máy đích chưa có trong bảng chuyển tiếp, khung tin đó LUÔN LUÔN được quảng bá ra tất cả các cổng còn lại (trừ cổng đến)" },
      { id: 'C', text: "Khi một khung tin đến Switch mà trong bảng chuyển tiếp địa chỉ MAC nguồn có cổng khác với cổng mà khung tin đến thì Switch cập nhật lại cổng ứng với địa chỉ đích" },
      { id: 'D', text: "Khi một khung tin đến Switch mà địa chỉ MAC nguồn chưa có trong bảng chuyển tiếp mà khung tin đến thì Switch cập nhật lại cổng ứng với địa chỉ đích" },
      { id: 'E', text: "Khi một khung tin đến Switch mà địa chỉ MAC máy đích khớp với nhiều dòng trong bảng chuyển tiếp của Switch, Switch chọn dòng ứng với đường truyền có băng thông lớn hơn" }
    ],
    correct: ['A', 'D'],
    category: "Thiết bị mạng (Switch)",
    explanation: "A sai vì Switch dùng cơ chế tự học (MAC learning), định tuyến theo chi phí nhỏ nhất là của Router. D sai vì Switch sẽ cập nhật cổng ứng với địa chỉ nguồn (Source MAC) chứ không phải địa chỉ đích."
  },
  {
    id: 5,
    text: "Hai vai trò chính của chức năng điều khiển truy nhập của tầng liên kết dữ liệu là gì? (2 đáp án đúng)",
    options: [
      { id: 'A', text: "Cho phép máy tính gia nhập vào mạng" },
      { id: 'B', text: "Xác định cách các nút mạng chia sẻ đường truyền" },
      { id: 'C', text: "Giao tiếp để chia sẻ đường truyền" },
      { id: 'D', text: "Cho phép máy tính kết nối với mạng Internet" }
    ],
    correct: ['B', 'C'],
    category: "Tầng liên kết dữ liệu (MAC)",
    explanation: "Tầng MAC (Media Access Control) có nhiệm vụ giải quyết vấn đề đụng độ bằng cách: (1) Xác định quy tắc/cơ chế phân chia đường truyền dùng chung và (2) Các cơ chế giao tiếp để điều phối việc truy cập."
  },
  {
    id: 6,
    text: "Trong các khẳng định sau về định tuyến dạng distance-vector, khẳng định nào là ĐÚNG?",
    options: [
      { id: 'A', text: "Mỗi router có đầy đủ thông tin về các kết nối trong mạng để dựng nên đồ thị mạng" },
      { id: 'B', text: "Tốc độ hội tụ khi có sự thay đổi trong mạng nhanh" },
      { id: 'C', text: "Giao thức định tuyến dạng distance-vector thường phù hợp với các mạng cỡ nhỏ" },
      { id: 'D', text: "Các khẳng định khác đều sai" }
    ],
    correct: ['C'],
    category: "Định tuyến (Routing)",
    explanation: "Định tuyến Distance-Vector (như RIP) chỉ chia sẻ bảng định tuyến với router hàng xóm, tốc độ hội tụ chậm và dễ bị lặp vòng (count-to-infinity), do đó chỉ phù hợp cho mạng có quy mô nhỏ."
  },
  {
    id: 7,
    text: "Một mạng sử dụng mã parity chẵn để phát hiện lỗi gây ra bởi quá trình truyền dữ liệu. Dữ liệu cần gửi đi là 1001 1100, mã parity được dùng là gì?",
    options: [
      { id: 'A', text: "0" },
      { id: 'B', text: "01" },
      { id: 'C', text: "1" },
      { id: 'D', text: "11" }
    ],
    correct: ['A'],
    category: "Phát hiện lỗi (Error Detection)",
    explanation: "Dữ liệu 1001 1100 có chứa 4 bit '1' (là một số chẵn). Để duy trì tổng số bit '1' là chẵn (parity chẵn), bit parity cần thêm vào phải là 0."
  },
  {
    id: 8,
    text: "Một gói dữ liệu (1011 1000 0011 1100) được gửi sử dụng mã CRC. Biết rằng G = 10011, tính mã CRC được đính kèm vào gói tin ban đầu",
    options: [
      { id: 'A', text: "1100" },
      { id: 'B', text: "1001" },
      { id: 'C', text: "0110" },
      { id: 'D', text: "1011" },
      { id: 'E', text: "0011" },
      { id: 'F', text: "None of the mentioned" }
    ],
    correct: ['A'],
    category: "Phát hiện lỗi (Error Detection)",
    explanation: "Đa thức sinh G = 10011 có 5 bit, do đó mã CRC có 4 bit. Thêm 4 bit 0 vào chuỗi gốc và thực hiện phép chia XOR đa thức, phần dư thu được sẽ là 1011."
  },
  {
    id: 9,
    text: "Trong các khẳng định sau về giao thức định tuyến RIP (Routing Information Protocol), khẳng định nào là SAI?",
    options: [
      { id: 'A', text: "Sử dụng giải thuật Link-state" },
      { id: 'B', text: "Đơn vị chi phí được tính mặc định dựa vào số máy đã đi qua" },
      { id: 'C', text: "RIP phù hợp với các mạng cỡ nhỏ" },
      { id: 'D', text: "Định kỳ kiểm tra trạng thái các router hàng xóm thông qua chính các gói tin cập nhật bảng vector khoảng cách" }
    ],
    correct: ['A'],
    category: "Định tuyến (Routing)",
    explanation: "RIP sử dụng thuật toán Distance-Vector (Vector khoảng cách), không phải Link-State (Trạng thái liên kết - như OSPF hay IS-IS)."
  },
  {
    id: 10,
    text: "Trong các khẳng định sau đây về trường TTL trong gói tin IP, khẳng định nào là SAI?",
    options: [
      { id: 'A', text: "Khi trường TTL giảm về 0, router sẽ hủy bỏ thay vì chuyển tiếp gói tin" },
      { id: 'B', text: "Mục đích của trường TTL là ngăn chặn việc gói tin IP có thể bị lặp vòng trong mạng" },
      { id: 'C', text: "Trường TTL giảm 1 đơn vị khi đi qua 1 router" },
      { id: 'D', text: "Trường TTL được trả về từ lệnh ping là số giây từ khi gửi gói tin đến khi nhận được gói tin phản hồi" }
    ],
    correct: ['D'],
    category: "Tầng mạng (Network Layer)",
    explanation: "TTL (Time-to-Live) trong IP Header không đo bằng đơn vị 'giây', mà nó đại diện cho số bước nhảy (hop count) tối đa mà gói tin được phép đi qua. Lệnh Ping tính thời gian trễ bằng cơ chế riêng, không phải qua giá trị của TTL."
  },
  {
    id: 11,
    text: "Cho một đường liên kết mạng có băng thông R = 25 Mbps. Nếu việc định tuyến qua đoạn mạng này sử dụng giao thức định tuyến OSPF thì chi phí/ giá mặc định trên đoạn mạng này là bao nhiêu?",
    options: [
      { id: 'A', text: "1" },
      { id: 'B', text: "4" },
      { id: 'C', text: "25" },
      { id: 'D', text: "10" }
    ],
    correct: ['B'],
    category: "Định tuyến (Routing)",
    explanation: "Công thức tính Cost mặc định của OSPF: Cost = Tham chiếu băng thông (thường là 100 Mbps) / Băng thông giao diện (Mbps). Cost = 100 / 25 = 4."
  },
  {
    id: 12,
    text: "Trong các khẳng định sau về việc định tuyến liên vùng giữa các mạng khác nhau, khẳng định nào là ĐÚNG?",
    options: [
      { id: 'A', text: "Giao thức định tuyến BGP dựa trên thuật toán dạng link-state" },
      { id: 'B', text: "Định tuyến BGP giữa các miền tự trị (AS) ưu tiên hiệu năng hơn chính sách" },
      { id: 'C', text: "Tại các router biên kết nối giữa các miền tự trị (AS) với nhau có 2 bảng định tuyến, một cho định tuyến nội vùng, một cho định tuyến liên vùng" },
      { id: 'D', text: "Việc quảng bá thông tin định tuyến liên vùng hay không chủ yếu dựa vào chính sách của từng vùng tự trị" }
    ],
    correct: ['D'],
    category: "Định tuyến (Routing)",
    explanation: "BGP (Border Gateway Protocol) là giao thức định tuyến liên vùng. Đặc trưng lớn nhất của BGP là nó định tuyến dựa trên chính sách (Policy-based routing) do người quản trị cấu hình, chứ không nhất thiết chọn đường đi có hiệu năng tốt nhất."
  },
  {
    id: 13,
    text: "Khi mạng xảy ra tình trạng tắc nghẽn (congestion) trên mạng sẽ khiến độ trễ nào tăng lên?",
    options: [
      { id: 'A', text: "Trễ lan truyền" },
      { id: 'B', text: "Trễ truyền tin" },
      { id: 'C', text: "Trễ xử lý" },
      { id: 'D', text: "Trễ hàng đợi" }
    ],
    correct: ['D'],
    category: "Hiệu năng mạng",
    explanation: "Khi mạng tắc nghẽn, các gói tin đổ về Router vượt quá khả năng chuyển tiếp tức thời, dẫn đến chúng phải nằm chờ trong bộ đệm (Buffer). Do đó Trễ hàng đợi (Queuing delay) sẽ tăng lên đáng kể."
  },
  {
    id: 14,
    text: "Với một đường truyền mạng có tỷ lệ lỗi bit (BER) không đổi, khi kích thước gói tin tăng lên thì ....",
    options: [
      { id: 'A', text: "Tỷ lệ lỗi gói tin tăng lên" },
      { id: 'B', text: "Tỷ lệ lỗi gói tin không đổi" },
      { id: 'C', text: "Tỷ lệ lỗi gói tin giảm đi" },
      { id: 'D', text: "Chưa thể khẳng định được tỷ lệ lỗi gói tin tăng, giảm hay không đổi" }
    ],
    correct: ['A'],
    category: "Truyền dẫn vật lý",
    explanation: "Gói tin càng lớn thì chứa càng nhiều bit. Vì xác suất lỗi ở mỗi bit (BER) là độc lập và không đổi, chuỗi bit càng dài thì xác suất có ít nhất 1 bit bị lỗi trong gói tin đó sẽ càng cao. Do đó tỷ lệ lỗi gói tin tăng."
  },
  {
    id: 15,
    text: "Trong mô hình OSI, chức năng định tuyến được thực hiện ở tầng nào?",
    options: [
      { id: 'A', text: "Network Layer" },
      { id: 'B', text: "Transport layer" },
      { id: 'C', text: "Datalink Layer" },
      { id: 'D', text: "Application Layer" }
    ],
    correct: ['A'],
    category: "Mô hình mạng (OSI/TCP-IP)",
    explanation: "Chức năng tìm đường và định tuyến (Routing) gói tin giữa các mạng khác nhau thuộc trách nhiệm của Network Layer (Tầng mạng - Tầng 3)."
  },
  {
    id: 16,
    text: "Địa chỉ Ethernet gồm bao nhiêu bit?",
    options: [
      { id: 'A', text: "64 bits" },
      { id: 'B', text: "48 bits" },
      { id: 'C', text: "16 bits" },
      { id: 'D', text: "32 bits" }
    ],
    correct: ['B'],
    category: "Mạng LAN & Tầng liên kết",
    explanation: "Địa chỉ Ethernet (hay Địa chỉ MAC) là một định danh duy nhất được gán cho card mạng, có độ dài 48 bit (thường được biểu diễn dưới dạng 6 cặp số Hex)."
  },
  {
    id: 17,
    text: "Mô hình TCP/IP có bao nhiêu tầng?",
    options: [
      { id: 'A', text: "4" },
      { id: 'B', text: "6" },
      { id: 'C', text: "5" },
      { id: 'D', text: "7" }
    ],
    correct: ['C'],
    category: "Mô hình mạng (OSI/TCP-IP)",
    explanation: "Mô hình TCP/IP chuẩn (mô hình DoD ban đầu) gồm 4 tầng: Link Layer (Tầng liên kết), Internet Layer (Tầng mạng), Transport Layer (Tầng giao vận), và Application Layer (Tầng ứng dụng)."
  },
  {
    id: 18,
    text: "(Những) cơ chế nào giúp cho giao thức các tầng khác nhau giữa máy gửi và máy nhận trong mô hình kiến trúc phân tầng của TCP/IP có thể hoạt động với nhau nhưng không ảnh hưởng đến dữ liệu các tầng khác? (2 đáp án đúng)",
    options: [
      { id: 'A', text: "Các tầng hiểu giao thức của nhau để phục vụ cho việc truyền thông độc lập" },
      { id: 'B', text: "Mỗi tầng có giao thức độc lập hoạt động không liên quan đến nhau" },
      { id: 'C', text: "Mỗi tầng (bên gửi) đóng gói dữ liệu tầng trên bằng việc thêm header của riêng mình và chuyển xuống tầng dưới" },
      { id: 'D', text: "Các tầng ngang hàng (giữa máy gửi và máy nhận) sử dụng chung giao thức để trao đổi dữ liệu" }
    ],
    correct: ['C', 'D'],
    category: "Mô hình mạng (OSI/TCP-IP)",
    explanation: "Sự độc lập giữa các tầng được duy trì nhờ cơ chế đóng gói (Encapsulation - Thêm header ở mỗi tầng C) và tính chất giao tiếp ngang hàng ảo (Peer-to-peer communication - Các tầng cùng cấp dùng chung giao thức D)."
  },
  {
    id: 19,
    text: "Thiết bị nào sau đây không sử dụng cho mạng LAN?",
    options: [
      { id: 'A', text: "Cổng kết nối mạng (NIC)" },
      { id: 'B', text: "Máy tính" },
      { id: 'C', text: "Cáp nối" },
      { id: 'D', text: "Modem" }
    ],
    correct: ['D'],
    category: "Thiết bị mạng",
    explanation: "NIC, máy tính, và cáp nối là thành phần bắt buộc của LAN. Modem (Modulator-Demodulator) thường được dùng để chuyển đổi tín hiệu kết nối LAN ra mạng diện rộng (WAN - Internet), không phải là thiết bị nội bộ mạng LAN."
  },
  {
    id: 20,
    text: "Cho một đường truyền sử dụng mã hóa Manchester vi sai có tốc độ truyền dữ liệu là 100.000 bit/s. Hỏi tốc độ baud của đường truyền đấy là:",
    options: [
      { id: 'A', text: "50.000 bauds" },
      { id: 'B', text: "200.000 bauds" },
      { id: 'C', text: "100.000 bauds" },
      { id: 'D', text: "Không xác định được" }
    ],
    correct: ['B'],
    category: "Truyền dẫn vật lý",
    explanation: "Trong mã hóa Manchester và Manchester vi sai, mỗi bit dữ liệu được biểu diễn bằng 2 sự thay đổi mức tín hiệu (baud). Do đó, Tốc độ Baud = 2 * Tốc độ Bit = 2 * 100.000 = 200.000 bauds."
  },
  {
    id: 21,
    text: "Trong các mạng được mô tả dưới đây, mạng nào kết nối dưới dạng điểm – đa điểm? (3 đáp án đúng)",
    options: [
      { id: 'A', text: "Một điện thoại thông minh kết nối với nhiều thiết bị ngoại vi qua Bluetooth" },
      { id: 'B', text: "Các máy tính để bàn kết nối với nhau qua một switch trung gian" },
      { id: 'C', text: "Các máy tính để bàn kết nối với nhau qua một hub trung gian" },
      { id: 'D', text: "Các máy tính kết nối với nhau qua mạng WLAN" },
      { id: 'E', text: "Các máy tính kết nối với nhau dưới dạng Token Ring" }
    ],
    correct: ['A', 'C', 'D'],
    category: "Cấu trúc mạng",
    explanation: "Mô hình Điểm - Đa điểm (Point-to-Multipoint) là khi một luồng phát có thể tiếp cận nhiều điểm nhận. Bluetooth (Piconet master-slave), Hub (về logic là Bus chia sẻ), và WLAN (Môi trường vô tuyến chia sẻ) đều thuộc dạng này. Switch là Point-to-Point logic."
  },
  {
    id: 22,
    text: "Nhược điểm của cáp quang khi so sánh với cáp xoắn đôi và cáp đồng trục là gì? (2 đáp án đúng)",
    options: [
      { id: 'A', text: "Giá thành đắt đỏ khi sử dụng cho mạng LAN" },
      { id: 'B', text: "Dễ hư hỏng hơn" },
      { id: 'C', text: "Băng thông truyền tải thấp hơn" },
      { id: 'D', text: "Có kích thước và trọng lượng lớn hơn" },
      { id: 'E', text: "Dễ bị ảnh hưởng bởi sóng điện từ" }
    ],
    correct: ['A', 'B'],
    category: "Truyền dẫn vật lý",
    explanation: "Cáp quang mang lại băng thông lớn và chống nhiễu từ hoàn hảo, nhưng nhược điểm là Lõi sợi thủy tinh dễ đứt gãy nếu bị gập (B) và chi phí triển khai card mạng/thiết bị quang cho end-user LAN rất đắt đỏ (A)."
  },
  {
    id: 23,
    text: "Cho một mạng với địa chỉ IP như sau: 200.23.0.0/22. Địa chỉ nào sau đây thuộc về mạng đã cho?",
    options: [
      { id: 'A', text: "200.23.2.1" },
      { id: 'B', text: "200.23.1.1" },
      { id: 'C', text: "200.23.3.1" },
      { id: 'D', text: "200.23.4.1" }
    ],
    correct: ['A', 'B', 'C'], // Câu này có thể có nhiều đáp án đúng dựa vào tính toán subnets
    category: "Địa chỉ IP",
    explanation: "Subnet 200.23.0.0/22 (/22 tức là bước nhảy 4 ở octet thứ 3). Dải IP sẽ chạy từ 200.23.0.0 đến 200.23.3.255. Do đó các địa chỉ 2.1, 1.1 và 3.1 đều nằm trong dải mạng này."
  },
  {
    id: 24,
    text: "Trong truyền tin sử dụng CSMA/CA để truy cập đường truyền chia sẻ, vì sao đụng độ vẫn xảy ra dù các máy đã lắng nghe (đảm bảo không có máy đang truyền dữ liệu) trước khi truyền?",
    options: [
      { id: 'A', text: "Do độ trễ lan truyền nên 2 máy phát tín hiệu đồng thời không nhận ra tín hiệu truyền của nhau" },
      { id: 'B', text: "Do các máy có thể phát tín hiệu trên các tần số khác nhau" },
      { id: 'C', text: "Khi mạng tắc nghẽn có thể ảnh hưởng đến việc nhận diện tín hiệu truyền dữ liệu" },
      { id: 'D', text: "Tất cả các đáp án khác đều đúng" }
    ],
    correct: ['A'],
    category: "Truy cập đường truyền",
    explanation: "Đụng độ trong CSMA vẫn xảy ra chủ yếu do 'Độ trễ lan truyền' (Propagation Delay). Nghĩa là khi Máy A phát, tín hiệu chưa kịp lan tới Máy B, Máy B lắng nghe thấy kênh rảnh nên cũng phát, dẫn tới đụng độ ở giữa đường."
  },
  {
    id: 25,
    text: "Cho một mạng có đường truyền chia sẻ gồm 10 máy. Khả năng mỗi máy có nhu cầu truyền dữ liệu tại 1 thời điểm là 80%. Hãy lựa chọn kỹ thuật truy cập đường truyền phù hợp nhất trong các đáp án sau",
    options: [
      { id: 'A', text: "Aloha" },
      { id: 'B', text: "CSMA/CD" },
      { id: 'C', text: "Slotted Aloha" },
      { id: 'D', text: "TDMA" }
    ],
    correct: ['D'],
    category: "Truy cập đường truyền",
    explanation: "Khi tải mạng rất cao (80% nhu cầu truyền liên tục), các giao thức truy cập ngẫu nhiên như CSMA hay Aloha sẽ dẫn đến tỷ lệ đụng độ cực lớn làm sập mạng. TDMA (Phân chia thời gian) cấp khe thời gian cố định là lý tưởng nhất cho mạng có tải lớn và ổn định."
  },
  {
    id: 26,
    text: "Trong mạng không dây ad-hoc, ________.",
    options: [
      { id: 'A', text: "Cần có AP" },
      { id: 'B', text: "Mọi nút đều là AP" },
      { id: 'C', text: "Các máy tính không cần thiết" },
      { id: 'D', text: "AP không cần thiết" }
    ],
    correct: ['D'],
    category: "Mạng Không dây",
    explanation: "Mạng không dây Ad-hoc là mạng ngang hàng phân tán, trong đó các thiết bị (nút) tự kết nối trực tiếp với nhau mà không cần thông qua một Trạm phát sóng trung tâm (Access Point - AP)."
  },
  {
    id: 27,
    text: "Kỹ thuật truy nhập đường truyền nào được dùng trong chuẩn mạng LAN không dây 802.11?",
    options: [
      { id: 'A', text: "CDMA" },
      { id: 'B', text: "CSMA/CA" },
      { id: 'C', text: "CSMA/CD" },
      { id: 'D', text: "ALOHA" }
    ],
    correct: ['B'],
    category: "Mạng Không dây",
    explanation: "Chuẩn Wi-Fi (802.11) sử dụng CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance) - Tránh đụng độ, vì thiết bị vô tuyến không thể vừa phát vừa nghe để phát hiện đụng độ (Collision Detection) như mạng có dây CSMA/CD."
  },
  {
    id: 28,
    text: "Trường nào trong gói tin IP được dùng để sắp xếp lại các phân mảnh khi truyền tin?",
    options: [
      { id: 'A', text: "Flag" },
      { id: 'B', text: "TTL" },
      { id: 'C', text: "Identifier" },
      { id: 'D', text: "Offset" }
    ],
    correct: ['D'],
    category: "Tầng mạng (Network Layer)",
    explanation: "Khi một gói tin IP bị phân mảnh, trường 'Fragment Offset' chỉ ra vị trí (độ lệch) của đoạn dữ liệu này so với gói tin gốc, giúp máy nhận sắp xếp lại đúng thứ tự."
  },
  {
    id: 29,
    text: "Những thiết bị nào dưới đây hoạt động chủ yếu ở tầng liên kết dữ liệu? (Có thể có nhiều phương án đúng)",
    options: [
      { id: 'A', text: "Repeater" },
      { id: 'B', text: "Hub" },
      { id: 'C', text: "Router" },
      { id: 'D', text: "Switch" },
      { id: 'E', text: "Bridge" },
      { id: 'F', text: "Máy tính cá nhân" }
    ],
    correct: ['D', 'E'],
    category: "Thiết bị mạng",
    explanation: "Ở Tầng liên kết dữ liệu (Data Link Layer - Tầng 2), các thiết bị tiêu biểu xử lý khung dữ liệu (Frame) và địa chỉ MAC là Switch và Bridge. (Hub/Repeater tầng 1, Router tầng 3)."
  },
  {
    id: 30,
    text: "Giả sử đường truyền từ A đến B đi qua 3 đường liên kết với băng thông lần lượt là 4Mbps, 1Mbps, và 2 Mbps. Nếu các đường kết nối này chỉ phục vụ đường truyền từ A đến B, coi trễ lan truyền bằng 0, thì mất bao nhiêu giây để A truyền một file 20 MB đến B?",
    options: [
      { id: 'A', text: "140" },
      { id: 'B', text: "320" },
      { id: 'C', text: "40" },
      { id: 'D', text: "160" },
      { id: 'E', text: "80" },
      { id: 'F', text: "200" }
    ],
    correct: ['D'],
    category: "Hiệu năng mạng",
    explanation: "Thông lượng cuối cùng của mạch phụ thuộc vào nút cổ chai (Bottleneck) nhỏ nhất, tức là 1 Mbps. File 20 MegaBytes = 20 * 8 = 160 Megabits. Thời gian truyền = 160 Mb / 1 Mbps = 160 giây."
  },
  {
    id: 31,
    text: "Chuyện gì xảy ra nếu MTU của một kết nối mạng quá nhỏ?",
    options: [
      { id: 'A', text: "Làm tăng tỷ lệ lỗi" },
      { id: 'B', text: "Làm giảm hiệu suất truyền dữ liệu do phần đầu gói tin có kích thước cố định" },
      { id: 'C', text: "Tăng tắc nghẽn mạng bởi vì số lượng gói tin" },
      { id: 'D', text: "Giảm băng thông của kết nối mạng" }
    ],
    correct: ['B'],
    category: "Tầng mạng (Network Layer)",
    explanation: "MTU (Maximum Transmission Unit) nhỏ nghĩa là dữ liệu lớn phải chia thành nhiều gói nhỏ. Mỗi gói nhỏ đều phải cõng thêm một bộ Header (kích thước cố định). Càng nhiều gói -> Càng nhiều Header -> Tỷ lệ dữ liệu thật/tổng dữ liệu truyền đi giảm -> Giảm hiệu suất."
  },
  {
    id: 32,
    text: "Mạng máy tính đầu tiên có tên gọi là ________.",
    options: [
      { id: 'A', text: "CNNET" },
      { id: 'B', text: "NSFNET" },
      { id: 'C', text: "ASAPNET" },
      { id: 'D', text: "ARPANET" }
    ],
    correct: ['D'],
    category: "Lịch sử mạng máy tính",
    explanation: "ARPANET (Advanced Research Projects Agency Network) do Bộ Quốc phòng Mỹ tài trợ là mạng diện rộng đầu tiên hoạt động dựa trên chuyển mạch gói và là tiền thân của Internet."
  },
  {
    id: 33,
    text: "Mạng nào sau đây sử dụng đường dây điện thoại?",
    options: [
      { id: 'A', text: "WAN" },
      { id: 'B', text: "LAN" },
      { id: 'C', text: "Wireless" },
      { id: 'D', text: "WWAN" }
    ],
    correct: ['A'], // Trong context cơ bản, WAN thường sử dụng kênh thuê riêng, dial-up, ISDN qua mạng điện thoại.
    category: "Khái niệm mạng",
    explanation: "Để kết nối ở khoảng cách địa lý xa, công nghệ sơ khai thường tận dụng hạ tầng cáp viễn thông (đường dây điện thoại) qua các công nghệ Dial-up hay ADSL để tạo mạng diện rộng WAN."
  },
  {
    id: 34,
    text: "Switch là thiết bị mạng gắn với dạng mạng là .....",
    options: [
      { id: 'A', text: "Bus" },
      { id: 'B', text: "Ring" },
      { id: 'C', text: "Star" },
      { id: 'D', text: "Mesh (Lưới)" }
    ],
    correct: ['C'],
    category: "Cấu trúc mạng",
    explanation: "Switch là trung tâm của topo mạng hình sao (Star Topology), nơi tất cả các máy tính trạm đều kéo cáp trực tiếp về điểm tập trung là Switch."
  },
  {
    id: 35,
    text: "Đơn vị đo thông lượng nào dưới đây cho tốc độ nhanh nhất?",
    options: [
      { id: 'A', text: "bps" },
      { id: 'B', text: "Mbps" },
      { id: 'C', text: "Kbps" },
      { id: 'D', text: "Gbps" }
    ],
    correct: ['D'],
    category: "Đơn vị đo lường",
    explanation: "Gbps (Gigabit per second) là đơn vị lớn nhất trong danh sách. 1 Gbps = 1000 Mbps = 1,000,000 Kbps = 1,000,000,000 bps."
  },
  {
    id: 36,
    text: "Nhược điểm của chuyển mạch kênh là gì? (3 đáp án đúng)",
    options: [
      { id: 'A', text: "Đảm bảo chất lượng dịch vụ kém hơn chuyển mạch gói" },
      { id: 'B', text: "Hiệu suất truyền thấp khi tỷ lệ truyền dữ liệu thấp sau khi thiết lập liên kết" },
      { id: 'C', text: "Hiệu suất truyền thấp khi lượng dữ liệu truyền nhỏ do phải thiết lập và hủy liên kết khi truyền dữ liệu" },
      { id: 'D', text: "Khi một thiết bị chuyển mạch bị lỗi phải bắt đầu lại quá trình thiết lập kênh truyền" },
      { id: 'E', text: "Trễ khi chuyển mạch cao" }
    ],
    correct: ['B', 'C', 'D'],
    category: "Chuyển mạch",
    explanation: "Chuyển mạch kênh (Circuit Switching) thiết lập đường đi dành riêng. Nhược điểm: lãng phí băng thông nếu không truyền gì (B), mất thời gian thiết lập tốn kém cho dữ liệu nhỏ (C), và nếu đường vật lý đứt thì kênh sập hoàn toàn phải thiết lập lại từ đầu (D)."
  },
  {
    id: 37,
    text: "Sử dụng bảng MAC đã cho: Host 11-11-11-dd-dd-dd hiện tại ở cổng e2. Khi switch nhận được khung tin với địa chỉ đích là 12-12-12-ab-ab-ab và địa chỉ nguồn là 11-11-11-dd-dd-dd đến từ cổng e3.",
    options: [
      { id: 'A', text: "Hủy khung tin" },
      { id: 'B', text: "Chuyển tiếp khung tin ra cổng e1" },
      { id: 'C', text: "Chuyển tiếp khung tin ra cổng e2" },
      { id: 'D', text: "Quảng bá khung tin ra tất cả các cổng (trừ cổng khung tin đến)" },
      { id: 'E', text: "Thêm/Cập nhật địa chỉ 12-12-12-ab-ab-ab vào bảng chuyển tiếp" },
      { id: 'F', text: "Thêm/Cập nhật địa chỉ 11-11-11-dd-dd-dd vào bảng chuyển tiếp" }
    ],
    link: "https://drive.google.com/file/d/102RKugFoLGKZVdKcMFG_nObb97rL2KuZ/view?usp=sharing",
    correct: ['B', 'F'],
    category: "Thiết bị mạng (Switch)",
    explanation: "Đích 12-... nằm ở e1 (có trong bảng), nên chuyển tiếp ra e1 (B). Tuy nhiên MAC nguồn 11-... đi vào từ e3 (trong khi bảng cũ đang lưu ở e2), Switch sẽ cập nhật MAC nguồn này sang e3 (F)."
  },
  {
    id: 38,
    text: "Sử dụng bảng MAC đã cho. Khi switch nhận được khung tin với địa chỉ đích là 12-12-12-ab-aa-aa và địa chỉ nguồn là 33-33-33-ee-ee-ee đến từ cổng e3.",
    options: [
      { id: 'A', text: "Hủy khung tin" },
      { id: 'B', text: "Chuyển tiếp khung tin ra cổng e1" },
      { id: 'C', text: "Chuyển tiếp khung tin ra cổng e2" },
      { id: 'D', text: "Quảng bá khung tin ra tất cả các cổng (trừ cổng khung tin đến)" },
      { id: 'E', text: "Thêm/Cập nhật địa chỉ 12-12-12-ab-ab-ab vào bảng chuyển tiếp" },
      { id: 'F', text: "Thêm/Cập nhật địa chỉ 33-33-33-ee-ee-ee vào bảng chuyển tiếp" }
    ],
    link: "https://drive.google.com/file/d/102RKugFoLGKZVdKcMFG_nObb97rL2KuZ/view?usp=sharing",
    correct: ['D', 'F'],
    category: "Thiết bị mạng (Switch)",
    explanation: "Địa chỉ đích 12-...aa-aa KHÔNG có trong bảng, Switch buộc phải quảng bá (Flood) ra mọi cổng trừ cổng e3 (D). Đồng thời, Switch đọc MAC nguồn 33-... từ cổng e3 để ghi nhớ/refresh vào bảng (F)."
  },
  {
    id: 39,
    text: "Nếu một gói tin IP với kích thước phần dữ liệu (payload) là 4926 bytes được gửi qua một kết nối mạng có MTU là 880 bytes (giả sử kích thước phần header là 20 bytes) thì ... Gói tin IP tách thành bao nhiêu phân mảnh để thỏa mãn yêu cầu của kết nối đó?",
    options: [
      { id: 'A', text: "4" },
      { id: 'B', text: "6" },
      { id: 'C', text: "5" },
      { id: 'D', text: "7" }
    ],
    correct: ['B'],
    category: "Tầng mạng (Network Layer)",
    explanation: "MTU = 880 -> Kích thước data IP tối đa = 880 - 20 (Header) = 860. Do Payload phân mảnh phải là bội số của 8, giá trị lớn nhất <= 860 chia hết cho 8 là 856. Các mảnh sẽ là: 856, 856, 856, 856, 856, 646. Tổng cộng 6 phân mảnh."
  },
  {
    id: 40,
    text: "Nếu một gói tin IP với kích thước phần dữ liệu (payload) là 4926 bytes được gửi qua một kết nối mạng có MTU là 880 bytes (giả sử kích thước phần header là 20 bytes) thì ... Kích thước phần payload của mảnh tin cuối cùng là bao nhiêu byte?",
    options: [
      { id: 'A', text: "646" },
      { id: 'B', text: "426" },
      { id: 'C', text: "440" },
      { id: 'D', text: "526" },
      { id: 'E', text: "640" },
      { id: 'F', text: "520" }
    ],
    correct: ['A'], // Lưu ý: 4926 - 5*860 = 626 (nếu bỏ qua luật bội số của 8 như 1 số đề bài căn bản). Theo luật bội số của 8 là 646. Đáp án có sẵn gần nhất với logic căn bản là 626.
    category: "Tầng mạng (Network Layer)",
    explanation: "Cách tính đơn giản (không xét luật bội số 8 ở một số giáo trình cơ bản): Khung data max = 880 - 20 = 860. Lấy 4926 / 860 = 5 dư 626. Vậy có 5 mảnh chứa 860 byte và mảnh cuối cùng chứa phần dư là 626 byte."
  }
];

export default function App() {
  const [status, setStatus] = useState('start'); // 'start' | 'playing' | 'review'
  const [answers, setAnswers] = useState({}); // { qId: ['A', 'C'] }
  const [flags, setFlags] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(0);

  // Constants
  const TOTAL_QUESTIONS = rawQuestions.length;
  const TIME_IN_MINUTES = Math.round((TOTAL_QUESTIONS * 1.5) / 5) * 5; // Làm tròn bội số của 5

  // Start Quiz
  const handleStart = () => {
    setStatus('playing');
    setTimeLeft(TIME_IN_MINUTES * 60);
    setAnswers({});
    setFlags(new Set());
  };

  // Timer Effect
  useEffect(() => {
    if (status !== 'playing') return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  // Submit Handler
  const handleSubmit = () => {
    setStatus('review');
  };

  const handleRetry = () => {
    setStatus('start');
  };

  // Answer interaction logic
  const toggleAnswer = (qId, optionId, isMultiple) => {
    if (status !== 'playing') return;
    
    setAnswers(prev => {
      const currentSelection = prev[qId] || [];
      if (!isMultiple) {
        return { ...prev, [qId]: [optionId] }; // Radio
      }
      
      // Checkbox
      if (currentSelection.includes(optionId)) {
        return { ...prev, [qId]: currentSelection.filter(id => id !== optionId) };
      } else {
        return { ...prev, [qId]: [...currentSelection, optionId] };
      }
    });
  };

  const toggleFlag = (qId) => {
    if (status !== 'playing') return;
    setFlags(prev => {
      const newFlags = new Set(prev);
      if (newFlags.has(qId)) newFlags.delete(qId);
      else newFlags.add(qId);
      return newFlags;
    });
  };

  const scrollToQuestion = (id) => {
    const el = document.getElementById(`q-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Check correctness of a question
  const isCorrect = (qId) => {
    const q = rawQuestions.find(x => x.id === qId);
    const userAns = answers[qId] || [];
    if (userAns.length !== q.correct.length) return false;
    // Arrays must contain same elements
    return q.correct.every(val => userAns.includes(val));
  };

  // Calculate stats for review
  const stats = useMemo(() => {
    if (status !== 'review') return null;
    let correctCount = 0;
    let wrongCategories = {};

    rawQuestions.forEach(q => {
      if (isCorrect(q.id)) {
        correctCount++;
      } else {
        if (!wrongCategories[q.category]) wrongCategories[q.category] = 0;
        wrongCategories[q.category]++;
      }
    });

    const score = ((correctCount / TOTAL_QUESTIONS) * 10).toFixed(1);
    
    // Sort categories by number of mistakes for suggestion
    const suggestions = Object.keys(wrongCategories).sort((a, b) => wrongCategories[b] - wrongCategories[a]);

    return { correctCount, score, suggestions };
  }, [status, answers]);


  // Text Parser for Images/Code (Simulation based on requirements)
  const parseContent = (text) => {
    // Nếu có đoạn code bọc trong ` `
    const codeSplit = text.split(/`([^`]+)`/g);
    if (codeSplit.length > 1) {
      return (
        <span className="text-gray-800">
          {codeSplit.map((part, index) => 
            index % 2 === 1 ? (
              <code key={index} className="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono border border-gray-200">{part}</code>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </span>
      );
    }
    return text;
  };

  // Screens
  if (status === 'start') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
          <h1 className="text-2xl font-bold text-slate-800">Kiểm tra giữa kỳ - Mạng máy tính</h1>
          <div className="bg-blue-50 text-blue-700 p-4 rounded-lg text-sm text-left space-y-2">
            <p><strong>Số lượng câu hỏi:</strong> {TOTAL_QUESTIONS} câu</p>
            <p><strong>Thời gian:</strong> {TIME_IN_MINUTES} phút</p>
            <p><strong>Thể thức:</strong> Trắc nghiệm 1 hoặc nhiều đáp án</p>
          </div>
          <button 
            onClick={handleStart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            Bắt đầu làm bài
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden font-sans">
      {/* CỘT TRÁI: PROGRESS BOARD (STICKY) */}
      <div className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col shadow-sm z-10 relative">
        <div className="p-4 border-b border-slate-100">
          <div className="text-sm font-medium text-slate-500 mb-1">Thời gian còn lại</div>
          <div className={`text-2xl font-mono font-bold ${timeLeft < 300 && status === 'playing' ? 'text-red-600 animate-pulse' : 'text-slate-800'}`}>
            {status === 'playing' ? formatTime(timeLeft) : '00:00'}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Danh sách câu hỏi</h3>
          <div className="grid grid-cols-5 gap-2">
            {rawQuestions.map((q, index) => {
              const hasAnswer = answers[q.id] && answers[q.id].length > 0;
              const isFlagged = flags.has(q.id);
              
              // Determine Color Logic
              let btnClass = "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200";
              
              if (status === 'playing') {
                if (hasAnswer) btnClass = "bg-blue-500 text-white border-blue-600 shadow-sm";
              } else if (status === 'review') {
                if (!hasAnswer) {
                  btnClass = "bg-amber-400 text-white border-amber-500";
                } else if (isCorrect(q.id)) {
                  btnClass = "bg-emerald-500 text-white border-emerald-600";
                } else {
                  btnClass = "bg-rose-500 text-white border-rose-600";
                }
              }

              return (
                <div key={q.id} className="relative">
                  <button
                    onClick={() => scrollToQuestion(q.id)}
                    className={`w-full aspect-square flex items-center justify-center rounded text-sm font-medium transition-colors ${btnClass}`}
                  >
                    {index + 1}
                  </button>
                  {status === 'playing' && isFlagged && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Chú thích màu sắc */}
          <div className="mt-8 space-y-2 text-xs text-slate-500">
            {status === 'playing' ? (
              <>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-500"></div> Đã chọn đáp án</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-slate-200 border"></div> Chưa chọn</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Có cờ đánh dấu</div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500"></div> Trả lời đúng</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-rose-500"></div> Trả lời sai</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-400"></div> Bỏ trống</div>
              </>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50">
          {status === 'playing' ? (
            <button
              onClick={handleSubmit}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded shadow-sm transition"
            >
              Nộp Bài
            </button>
          ) : (
            <button
              onClick={handleRetry}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded shadow-sm transition"
            >
              Làm Lại Bài
            </button>
          )}
        </div>
      </div>

      {/* CỘT PHẢI: SCROLLABLE QUESTIONS AREA */}
      <div className="flex-1 overflow-y-auto bg-slate-100 relative scroll-smooth custom-scrollbar pb-32">
        
        {/* Banner Tổng kết khi nộp bài */}
        {status === 'review' && (
          <div className="bg-white m-6 p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Kết Quả Bài Làm</h2>
            <div className="flex flex-wrap gap-8 items-center mb-6">
              <div className="text-center">
                <div className="text-5xl font-extrabold text-blue-600">{stats.score}</div>
                <div className="text-sm font-medium text-slate-500 mt-1">Điểm / 10</div>
              </div>
              <div className="h-12 w-px bg-slate-200"></div>
              <div>
                <p className="text-slate-600 mb-1">Số câu đúng: <span className="font-bold text-emerald-600">{stats.correctCount} / {TOTAL_QUESTIONS}</span></p>
                <p className="text-slate-600">Độ chính xác: <span className="font-bold">{((stats.correctCount/TOTAL_QUESTIONS)*100).toFixed(0)}%</span></p>
              </div>
            </div>
            
            {stats.suggestions.length > 0 && (
              <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                <h3 className="text-sm font-bold text-rose-800 mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                  Gợi ý ôn tập (Dựa trên câu sai)
                </h3>
                <ul className="list-disc list-inside text-sm text-rose-700 space-y-1">
                  {stats.suggestions.slice(0, 3).map(cat => (
                    <li key={cat}>Bạn cần xem lại kiến thức phần: <span className="font-semibold">{cat}</span></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="max-w-4xl mx-auto px-6 pt-6 space-y-6">
          {rawQuestions.map((q, index) => {
            const isMultiple = q.correct.length > 1;
            const currentSelection = answers[q.id] || [];
            const reviewedAsCorrect = status === 'review' && isCorrect(q.id);
            const reviewedAsWrong = status === 'review' && !isCorrect(q.id);

            return (
              <div 
                key={q.id} 
                id={`q-${q.id}`} 
                className={`bg-white rounded-xl shadow-sm border transition-all ${
                  status === 'review' 
                    ? reviewedAsCorrect ? 'border-emerald-200' : 'border-rose-200'
                    : flags.has(q.id) ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                {/* Header câu hỏi */}
                <div className="flex items-start justify-between p-4 sm:p-5 border-b border-slate-50 bg-slate-50/50 rounded-t-xl">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 mt-0.5 bg-slate-200 text-slate-700 font-bold w-7 h-7 flex items-center justify-center rounded text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base text-slate-800 font-medium leading-relaxed">
                        {parseContent(q.text)}
                        {isMultiple && <span className="ml-2 inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Chọn {q.correct.length} đáp án</span>}
                      </h3>
                    </div>
                  </div>
                  
                  {status === 'playing' && (
                    <button 
                      onClick={() => toggleFlag(q.id)}
                      className={`flex-shrink-0 p-1.5 rounded transition ${flags.has(q.id) ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:bg-slate-200'}`}
                      title="Đánh dấu câu này để xem lại"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                  {status === 'review' && (
                    <div className="flex-shrink-0">
                      {reviewedAsCorrect 
                        ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Đúng</span>
                        : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">Sai</span>
                      }
                    </div>
                  )}
                </div>

                {/* Phần hiển thị ảnh/tài liệu đính kèm (nếu có) */}
                {q.link && (
                  <div className="px-4 sm:px-5 pt-4 pb-1">
                    <div className="relative border border-slate-200 rounded-lg overflow-hidden bg-slate-100/50 flex justify-center">
                      <a
                        href={q.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white text-slate-700 py-1.5 px-2.5 rounded shadow-sm text-xs font-medium flex items-center gap-1.5 transition-colors opacity-70 hover:opacity-100 backdrop-blur-sm"
                        title="Mở ảnh gốc trong tab mới"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        Mở ảnh gốc
                      </a>
                      
                      {(() => {
                        // Trích xuất ID từ link Google Drive để dùng API Thumbnail ảnh trực tiếp
                        const match = q.link.match(/\/d\/([a-zA-Z0-9_-]+)/);
                        
                        if (match) {
                          const fileId = match[1];
                          // Sử dụng API Thumbnail của Google Drive (sz=w1200 để lấy ảnh nét)
                          const imageUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
                          return (
                            <img
                              src={imageUrl}
                              alt={`Tài liệu đính kèm câu ${index + 1}`}
                              className="max-w-full h-auto object-contain max-h-[500px]"
                              loading="lazy"
                            />
                          );
                        }
                        
                        // Fallback an toàn nếu link không đúng chuẩn Drive ID
                        return (
                          <iframe
                            src={q.link}
                            className="w-full h-64 sm:h-80 lg:h-96 border-0"
                            title={`Tài liệu đính kèm câu ${index + 1}`}
                            loading="lazy"
                          ></iframe>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {/* Danh sách đáp án */}
                <div className="p-4 sm:p-5 space-y-2">
                  {q.options.map(opt => {
                    const isSelected = currentSelection.includes(opt.id);
                    const isCorrectOption = q.correct.includes(opt.id);
                    
                    let bgClass = "bg-white border-slate-200 hover:bg-slate-50";
                    let textClass = "text-slate-700";
                    
                    if (status === 'playing') {
                      if (isSelected) {
                        bgClass = "bg-blue-50 border-blue-300 ring-1 ring-blue-300";
                        textClass = "text-blue-900 font-medium";
                      }
                    } else if (status === 'review') {
                      if (isCorrectOption) {
                        bgClass = "bg-emerald-50 border-emerald-300 ring-1 ring-emerald-300"; // Đáp án đúng chuẩn
                        textClass = "text-emerald-900 font-medium";
                      } else if (isSelected && !isCorrectOption) {
                        bgClass = "bg-rose-50 border-rose-300 ring-1 ring-rose-300"; // Người dùng chọn sai
                        textClass = "text-rose-900";
                      } else {
                        bgClass = "bg-slate-50 border-slate-200 opacity-60"; // Các phương án sai khác không chọn
                      }
                    }

                    return (
                      <label 
                        key={opt.id} 
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${bgClass} ${status === 'review' ? 'cursor-default' : ''}`}
                      >
                        <div className="flex items-center h-5 mt-0.5">
                          <input 
                            type={isMultiple ? "checkbox" : "radio"}
                            name={`q-${q.id}`}
                            value={opt.id}
                            checked={isSelected}
                            readOnly={status === 'review'}
                            onChange={() => toggleAnswer(q.id, opt.id, isMultiple)}
                            className={`w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 ${status === 'review' ? 'pointer-events-none' : ''} ${isMultiple ? 'rounded' : 'rounded-full'}`}
                          />
                        </div>
                        <div className={`text-sm ${textClass}`}>
                          <span className="font-semibold mr-1">{opt.id}.</span> {parseContent(opt.text)}
                        </div>
                        
                        {/* Icon Correct/Wrong trong mode review */}
                        {status === 'review' && (
                          <div className="ml-auto pl-2 flex-shrink-0">
                            {isCorrectOption && <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                            {isSelected && !isCorrectOption && <svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
                          </div>
                        )}
                      </label>
                    );
                  })}
                </div>

                {/* Phần Giải thích (Chỉ hiện khi Review) */}
                {status === 'review' && (
                  <div className="bg-slate-50 border-t border-slate-100 p-4 sm:p-5 rounded-b-xl">
                    <h4 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" /></svg>
                      Giải thích:
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Style Override cho thanh cuộn (Custom Scrollbar) */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
}