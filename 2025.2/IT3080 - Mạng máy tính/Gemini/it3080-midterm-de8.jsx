import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Flag, Clock, CheckCircle2, XCircle, AlertCircle, RefreshCw, Send, Image as ImageIcon, ExternalLink, BookOpen } from 'lucide-react';

// --- DATA: 45 Câu hỏi kèm Đáp án và Giải thích chi tiết ---
const QUIZ_DATA = [
  {
    id: 1, text: "Trong các nhận xét sau, nhận xét nào về NAT là đúng?", type: "radio", category: "IP",
    options: [ { id: "A", text: "Tốn kém địa chỉ IP" }, { id: "B", text: "Không hiệu quả đối với mạng kích thước lớn" }, { id: "C", text: "Tăng chi phí khi thay đổi nhà cung cấp dịch vụ mạng" }, { id: "D", text: "Tăng tính bảo mật của mạng LAN" } ],
    correct: ["D"], explanation: "NAT (Network Address Translation) giúp ẩn các địa chỉ IP private bên trong mạng LAN khi giao tiếp với Internet, đóng vai trò như một bức tường lửa cơ bản, ngăn chặn các truy cập trực tiếp từ bên ngoài vào thiết bị nội bộ, từ đó tăng tính bảo mật."
  },
  {
    id: 2, text: "Server là các máy tính cung cấp tài nguyên cho các máy tính khác được kết nối với nhau qua?", type: "radio", category: "General",
    options: [ { id: "A", text: "Network" }, { id: "B", text: "Server" }, { id: "C", text: "Hệ thống backup" }, { id: "D", text: "Modem" } ],
    correct: ["A"], explanation: "Server (Máy chủ) cung cấp tài nguyên, dịch vụ cho các Client (Máy khách) thông qua kết nối Mạng (Network)."
  },
  {
    id: 3, text: "Kiểu mạng nào sẽ sử dụng đường điện thoại (phone lines)?", type: "radio", category: "General",
    options: [ { id: "A", text: "WAN (Wide Area Network)" }, { id: "B", text: "LAN (Local Area Networks)" }, { id: "C", text: "Wireless" }, { id: "D", text: "WWAN (Wireless WAN)" } ],
    correct: ["A"], explanation: "Mạng diện rộng WAN truyền thống (như Dial-up, ADSL) thường tận dụng cơ sở hạ tầng đường dây điện thoại công cộng để kết nối các mạng LAN ở xa nhau."
  },
  {
    id: 4, text: "Một thiết bị kết nối tới một hệ thống mạng mà không sử dụng dây cáp thì được gọi là gì?", type: "radio", category: "General",
    options: [ { id: "A", text: "Phân tán" }, { id: "B", text: "Tập trung" }, { id: "C", text: "Dây cáp" }, { id: "D", text: "Không dây" } ],
    correct: ["D"], explanation: "Kết nối không sử dụng dây cáp vật lý (sử dụng sóng vô tuyến, hồng ngoại...) được gọi là kết nối Không dây (Wireless)."
  },
  {
    id: 5, text: "Trong kiến trúc mạng OSI, routing được thực thi bởi tầng nào?", type: "radio", category: "OSI",
    options: [ { id: "A", text: "Tầng mạng" }, { id: "B", text: "Tầng giao vận" }, { id: "C", text: "Tầng liên kết dữ liệu" }, { id: "D", text: "Tầng ứng dụng" } ],
    correct: ["A"], explanation: "Chức năng Định tuyến (Routing) - tìm đường đi tối ưu cho các gói tin xuyên qua các mạng khác nhau - là nhiệm vụ cốt lõi của Tầng mạng (Network Layer - Tầng 3)."
  },
  {
    id: 6, text: "Giả sử đường dẫn từ A đến B thông qua 3 kết nối có băng thông 4Mbps, 1Mbps và 2 Mbps. Nếu tất cả các liên kết chỉ phục vụ kết nối giữa A và B và độ trễ lan truyền gần như bằng 0 thì A cần chuyển một tệp 20 MB sang B trong bao lâu (giây)?", type: "radio", category: "Performance",
    options: [ { id: "A", text: "140" }, { id: "B", text: "320" }, { id: "C", text: "40" }, { id: "D", text: "160" }, { id: "E", text: "80" }, { id: "F", text: "200" } ],
    correct: ["D"], explanation: "Băng thông thực tế (throughput) bị giới hạn bởi liên kết chậm nhất (bottleneck link), ở đây là 1Mbps. Kích thước tệp = 20 MB = 20 * 8 = 160 Mbits. Thời gian = Dung lượng / Băng thông = 160 Mbits / 1 Mbps = 160 giây."
  },
  {
    id: 7, text: "Mô hình TCP/IP gồm bao nhiêu tầng?", type: "radio", category: "OSI",
    options: [ { id: "A", text: "4" }, { id: "B", text: "6" }, { id: "C", text: "5" }, { id: "D", text: "7" } ],
    correct: ["C"], explanation: "Mô hình TCP/IP nguyên bản của DoD gồm 4 tầng: Tầng liên kết mạng (Network Access/Link), Tầng mạng (Internet), Tầng giao vận (Transport), và Tầng ứng dụng (Application). (Lưu ý: Một số giáo trình cập nhật có thể phân thành 5 tầng, nhưng 4 tầng là cấu trúc cổ điển phổ biến nhất trong các bài thi)."
  },
  {
    id: 8, text: "Thành phần nào dưới đây không được sử dụng trong mạng LAN?", type: "radio", category: "General",
    options: [ { id: "A", text: "Cạc mạng" }, { id: "B", text: "Máy tính" }, { id: "C", text: "Dây cáp" }, { id: "D", text: "Modem" } ],
    correct: ["D"], explanation: "Modem (Modulator-Demodulator) là thiết bị dùng để điều chế tín hiệu, thường dùng để kết nối mạng LAN với mạng WAN (Internet) thông qua đường điện thoại/cáp quang, nó không phải là thiết bị dùng để kết nối nội bộ bên trong LAN (như Switch/Hub)."
  },
  {
    id: 9, text: "Phương tiện truyền dẫn nào cho phép truyền dữ liệu tốc độ cao nhất trong mạng?", type: "radio", category: "Physical",
    options: [ { id: "A", text: "Cáp đồng trục" }, { id: "B", text: "Cáp xoắn đôi" }, { id: "C", text: "Cáp quang" }, { id: "D", text: "Cáp điện" } ],
    correct: ["C"], explanation: "Cáp quang sử dụng ánh sáng để truyền tín hiệu, ít bị suy hao và không bị nhiễu điện từ, cung cấp băng thông và tốc độ truyền tải cao nhất hiện nay."
  },
  {
    id: 10, text: "Đâu là tên gọi khác cho topology mạng có kết nối đầy đủ?", type: "radio", category: "General",
    options: [ { id: "A", text: "Mesh" }, { id: "B", text: "Tree" }, { id: "C", text: "Star" }, { id: "D", text: "Ring" } ],
    correct: ["A"], explanation: "Topology Mesh (Dạng lưới) kết nối đầy đủ (Full Mesh) là kiến trúc mà mỗi nút mạng đều có kết nối trực tiếp đến tất cả các nút mạng còn lại."
  },
  {
    id: 11, text: "Các thiết bị trên tầng liên kết dữ liệu sử dụng định danh là gì?", type: "radio", category: "DataLink",
    options: [ { id: "A", text: "Địa chỉ MAC" }, { id: "B", text: "Địa chỉ IP" }, { id: "C", text: "Số hiệu cổng (port)" }, { id: "D", text: "Không đáp án nào đúng" } ],
    correct: ["A"], explanation: "Tầng liên kết dữ liệu (Data Link - Tầng 2) định danh các thiết bị bằng địa chỉ vật lý MAC (Media Access Control)."
  },
  {
    id: 12, text: "Cho kết nối mạng giữa hai máy chủ có RTT là 100 ms, tốc độ băng thông (bandwidth) là 30 Mbps và kích thước tải trọng tối đa là 1500 byte. Nếu chúng ta cần truyền 15000 byte dữ liệu bằng cách sử dụng cơ chế stop-and-wait, sẽ mất bao lâu để hoàn thành việc truyền dữ liệu? (tính bằng ms)", type: "radio", category: "Performance",
    options: [ { id: "A", text: "5" }, { id: "B", text: "1005" }, { id: "C", text: "40" }, { id: "D", text: "1000" }, { id: "E", text: "104" }, { id: "F", text: "1040" } ],
    correct: ["B"], explanation: "Số lượng Frame = 15000 / 1500 = 10 frames. \nThời gian truyền 1 frame (Transmission Delay) = (1500 * 8 bits) / (30 * 10^6 bps) = 0.4 ms. \nStop-and-wait yêu cầu gửi 1 frame và chờ ACK, tốn đúng 1 RTT (nếu bỏ qua thời gian truyền ACK). \nTổng thời gian cho 1 frame = Transmission + RTT = 0.4 + 100 = 100.4 ms. \nTổng thời gian 10 frames = 10 * 100.4 = 1004 ms. \nĐáp án gần đúng nhất trong lựa chọn là 1005 ms."
  },
  {
    id: 13, text: "Đâu là nhận xét đúng về bảng định tuyến trong bộ định tuyến?", type: "radio", category: "Routing",
    options: [ { id: "A", text: "Bộ định tuyến tham khảo bảng định tuyến để xác định đường đi tối ưu đến đích, thông qua xem xét địa chỉ IP đích của các gói tin đến" }, { id: "B", text: "Bộ định tuyến tham khảo bảng định tuyến để xác định đường dẫn tối ưu để đến đích, thông qua xem xét địa chỉ IP nguồn của các gói tin đến" }, { id: "C", text: "Nếu bộ định tuyến không thể tìm thấy mục phù hợp trong bảng định tuyến, nó sẽ phát gói tin đến tất cả các cổng ngoại trừ cổng đến" }, { id: "D", text: "Nếu bộ định tuyến không thể tìm thấy mục phù hợp trong bảng định tuyến, nó sẽ phát gói tin đến tất cả các cổng" } ],
    correct: ["A"], explanation: "Router (Bộ định tuyến) hoạt động dựa trên địa chỉ IP Đích. Nó đọc IP đích của gói tin, so khớp với Bảng định tuyến (Routing Table) để đẩy gói tin ra cổng (interface) phù hợp nhất."
  },
  {
    id: 14, text: "Thiết bị nào sau đây đang hoạt động ở tầng liên kết dữ liệu trong mô hình tham chiếu OSI? (có thể có nhiều lựa chọn)", type: "checkbox", category: "OSI",
    options: [ { id: "A", text: "Repeater" }, { id: "B", text: "Hub" }, { id: "C", text: "Router" }, { id: "D", text: "Switch" }, { id: "E", text: "Bridge" }, { id: "F", text: "Máy tính cá nhân" } ],
    correct: ["D", "E"], explanation: "Switch và Bridge là các thiết bị hoạt động ở Tầng 2 (Data Link), chúng xử lý các Frame và chuyển tiếp dựa trên địa chỉ MAC. Repeater/Hub ở tầng 1; Router ở tầng 3."
  },
  {
    id: 15, text: "Đâu là ưu điểm của thuật toán định tuyến link-state so với distance-vector?", type: "radio", category: "Routing",
    options: [ { id: "A", text: "Độ tin cậy cao hơn" }, { id: "B", text: "Số lượng thông điệp trao đổi ít hơn" }, { id: "C", text: "Tốc độ hội tụ như nhau" }, { id: "D", text: "Không đáp án nào đúng" } ],
    correct: ["A"], explanation: "Thuật toán Link-state (như OSPF) mỗi router có cái nhìn toàn cảnh về toàn bộ topology mạng, do đó không bị dính vào vòng lặp định tuyến (routing loop) và có tốc độ hội tụ nhanh hơn, dẫn đến độ tin cậy và ổn định cao hơn so với Distance-vector (như RIP)."
  },
  {
    id: 16, text: "Đâu là nhận xét sai về hệ tự trị (Autonomous System) trong định tuyến?", type: "radio", category: "Routing",
    options: [ { id: "A", text: "Trong một AS, các router sẽ triển khai chính sách định tuyến giống nhau." }, { id: "B", text: "Giao thức định tuyến nội miền (Intra-domain) được sử dụng bên trong AS." }, { id: "C", text: "Giao thức định tuyến liên miền (Inter-domain) được sử dụng để kết nối các AS với nhau." }, { id: "D", text: "Số lượng các AS là cố định." } ],
    correct: ["D"], explanation: "Số lượng các Hệ tự trị (AS) trên Internet không cố định mà liên tục tăng lên và thay đổi khi mạng Internet mở rộng và các tổ chức, nhà mạng mới tham gia."
  },
  {
    id: 17, text: "Tác dụng của Dynamic Host Configuration Protocol (DHCP) là gì?", type: "radio", category: "App",
    options: [ { id: "A", text: "Cung cấp địa chỉ IP tự động từ một máy chủ khi có một máy tính tham gia vào mạng" }, { id: "B", text: "Truyền địa chỉ IP giữa các máy tính" }, { id: "C", text: "Cấu hình bảng định tuyến máy tính" }, { id: "D", text: "Thiết lập cấu hình máy tính thông qua kết nối từ xa" } ],
    correct: ["A"], explanation: "DHCP (Dynamic Host Configuration Protocol) là giao thức cấp phát động. Máy chủ DHCP tự động cấp phát địa chỉ IP, Subnet mask, Default Gateway và DNS cho thiết bị client ngay khi thiết bị kết nối vào mạng."
  },
  {
    id: 18, text: "Chức năng chính của các giao thức đa truy cập (multiple access) trong tầng liên kết dữ liệu là gì? (2 lựa chọn)", type: "checkbox", category: "DataLink",
    options: [ { id: "A", text: "Cho máy tính tham gia vào mạng mới" }, { id: "B", text: "Xác định cách các nút chia sẻ kênh" }, { id: "C", text: "Truyền thông về chia sẻ kênh phải sử dụng chính kênh đó" }, { id: "D", text: "Giúp máy tính truy cập video, âm thanh, hình ảnh trên Internet" } ],
    correct: ["B", "C"], explanation: "Giao thức đa truy cập (Multiple Access Protocols) giải quyết bài toán: Khi có nhiều thiết bị cùng chia sẻ chung một môi trường truyền dẫn (kênh), làm sao để quyết định ai được truyền (Xác định cách chia sẻ - B), và việc đàm phán/cạnh tranh quyền truyền tải này phải diễn ra ngay trên chính kênh truyền đó (C)."
  },
  {
    id: 19, text: "Hạn chế của giao thức định tuyến động là gì?", type: "radio", category: "Routing",
    options: [ { id: "A", text: "Không thể sử dụng liên kết dự phòng" }, { id: "B", text: "Khó quản lý" }, { id: "C", text: "Khó thích ứng với sự thay đổi của cấu trúc mạng" }, { id: "D", text: "Không an toàn" } ],
    correct: ["D"], explanation: "Định tuyến động (Dynamic Routing) tự động trao đổi thông tin định tuyến. Nếu không được cấu hình xác thực chặt chẽ, hacker có thể gửi các gói tin định tuyến giả mạo để đầu độc bảng định tuyến, do đó rủi ro về mặt an toàn (security) cao hơn định tuyến tĩnh."
  },
  {
    id: 20, text: "Mạng sử dụng bit parity chẵn để phát hiện lỗi do truyền mạng gây ra. Tìm bit parity chẵn của dữ liệu 1001 1100?", type: "radio", category: "DataLink",
    options: [ { id: "A", text: "0" }, { id: "B", text: "01" }, { id: "C", text: "1" }, { id: "D", text: "11" } ],
    correct: ["A"], explanation: "Bit Parity chẵn (Even Parity) đảm bảo tổng số lượng bit '1' trong toàn bộ dữ liệu (bao gồm cả bit parity) là một số chẵn. Chuỗi 1001 1100 đã có sẵn 4 bit '1' (là số chẵn), nên bit parity thêm vào phải là 0."
  },
  {
    id: 21, text: "Datagram (1011 1000 0011 1100) được gửi sử dụng mã vòng CRC (Cyclic Redundancy Check) để phát hiện lỗi. Biết rằng G = 10011, hãy tính mã CRC của datagram bên trên.", type: "radio", category: "DataLink",
    options: [ { id: "A", text: "1100" }, { id: "B", text: "1001" }, { id: "C", text: "0110" }, { id: "D", text: "1011" }, { id: "E", text: "0011" }, { id: "F", text: "Không đáp án nào đúng" } ],
    correct: ["A"], explanation: "Đa thức G=10011 có 5 bit, ta thêm 4 bit '0' vào cuối Datagram: 10111000001111000000. Thực hiện phép chia XOR chuỗi này cho 10011, phần dư (remainder) cuối cùng thu được là 1100. Mã CRC chính là phần dư này."
  },
  {
    id: 22, text: "Trong số các kiến trúc phân phối quang (optical-distribution) cái mà được chuyển mạch ethernet là?", type: "radio", category: "Physical",
    options: [ { id: "A", text: "PON" }, { id: "B", text: "MON" }, { id: "C", text: "AON" }, { id: "D", text: "NON" } ],
    correct: ["C"], explanation: "AON (Active Optical Network) sử dụng các thiết bị chủ động chạy bằng điện (như Router, Ethernet Switch) để điều hướng tín hiệu quang đến các khách hàng cụ thể. Trong khi PON (Passive) chỉ dùng bộ chia quang thụ động không dùng điện."
  },
  {
    id: 23, text: "Thiết bị chuyển mạch (switch) được liên kết với mạng nào?", type: "radio", category: "General",
    options: [ { id: "A", text: "Bus" }, { id: "B", text: "Ring" }, { id: "C", text: "Star" }, { id: "D", text: "Mesh" } ],
    correct: ["C"], explanation: "Trong cấu trúc mạng hình sao (Star Topology), Switch đóng vai trò là nút trung tâm. Tất cả các thiết bị đầu cuối đều nối cáp trực tiếp về Switch này."
  },
  {
    id: 24, text: "Thiết bị nào không phải là thiết bị đầu cuối?", type: "radio", category: "General",
    options: [ { id: "A", text: "Switch" }, { id: "B", text: "Server" }, { id: "C", text: "Máy tính" }, { id: "D", text: "Điện thoại thông minh" } ],
    correct: ["A"], explanation: "Thiết bị đầu cuối (End-system / Host) là thiết bị nơi dữ liệu sinh ra hoặc kết thúc (Máy tính, Server, Điện thoại). Switch là thiết bị trung gian (Intermediary device) làm nhiệm vụ chuyển tiếp dữ liệu trong mạng."
  },
  {
    id: 25, text: "Kĩ thuật đa truy cập (multiple access) nào được sử dụng bởi chuẩn IEEE 802.11 cho wireless LAN?", type: "radio", category: "DataLink",
    options: [ { id: "A", text: "CDMA" }, { id: "B", text: "CSMA/CA" }, { id: "C", text: "CSMA/CD" }, { id: "D", text: "ALOHA" } ],
    correct: ["B"], explanation: "IEEE 802.11 (Wi-Fi) sử dụng môi trường không dây, thiết bị không thể vừa phát vừa lắng nghe xung đột hiệu quả. Do đó nó dùng CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance) - Đa truy cập nhận biết sóng mang có tránh xung đột."
  },
  {
    id: 26, text: "Trường nào giúp kiểm tra sự sắp xếp của các fragments?", type: "radio", category: "IP",
    options: [ { id: "A", text: "Flag" }, { id: "B", text: "TTL (Time to Live)" }, { id: "C", text: "Identifier" }, { id: "D", text: "Offset" } ],
    correct: ["D"], explanation: "Khi gói tin IP bị phân mảnh (Fragmented), trường Fragment Offset (Độ lệch phân mảnh) chỉ ra vị trí tương đối của phân mảnh đó so với dữ liệu gốc ban đầu, giúp máy đích sắp xếp và ghép nối lại chính xác."
  },
  {
    id: 27, text: "Đâu là tốc độ truyền dữ liệu nhanh nhất trong các ý dưới đây?", type: "radio", category: "Performance",
    options: [ { id: "A", text: "bps" }, { id: "B", text: "Mbps" }, { id: "C", text: "Kbps" }, { id: "D", text: "Gbps" } ],
    correct: ["D"], explanation: "Gbps (Gigabits per second) = 10^9 bps, lớn nhất trong các đơn vị được liệt kê."
  },
  {
    id: 28, text: "Địa chỉ IPv4 nào sau đây là hợp lệ cho địa chỉ IP public nếu sử dụng phương pháp CIDR (Classless Inter Domain Routing) để cấp phát địa chỉ IP?", type: "checkbox", category: "IP",
    options: [ { id: "A", text: "192.168.1.16" }, { id: "B", text: "10.0.0.1" }, { id: "C", text: "23.3.4.256" }, { id: "D", text: "11.0.0.1" }, { id: "E", text: "172.15.4.9" }, { id: "F", text: "172.16.9.4" } ],
    correct: ["E", "D"], explanation: "Loại bỏ dải IP Private: 10.0.0.0/8, 172.16.0.0 đến 172.31.255.255, 192.168.0.0/16. (A, B, F là Private). Loại C vì octet chứa 256 > 255 (không hợp lệ). Địa chỉ 172.15.x.x nằm ngoài dải Private của lớp B, do đó nó là địa chỉ Public hợp lệ. (D - 11.x.x.x cũng là public, nhưng 172.15 thường được đưa vào bài thi làm bẫy nhầm lẫn với dải private 172.16)."
  },
  {
    id: 29, text: "Trong classful addressing, phần lớn các địa chỉ có đặc điểm nào sau đây?", type: "radio", category: "IP",
    options: [ { id: "A", text: "Được tổ chức" }, { id: "B", text: "Bị lãng phí" }, { id: "C", text: "Bị chặn" }, { id: "D", text: "Giao tiếp với nhau" } ],
    correct: ["B"], explanation: "Định tuyến theo lớp (Classful Addressing - Lớp A, B, C cố định) chia mạng thành các khối kích thước cố định rất lớn. Ví dụ cấp Lớp B cho 1 công ty có 1000 máy sẽ gây lãng phí tới >64000 địa chỉ. CIDR ra đời để giải quyết sự lãng phí này."
  },
  {
    id: 30, text: "Điều gì sẽ xảy ra nếu MTU của kết nối mạng quá nhỏ?", type: "radio", category: "IP",
    options: [ { id: "A", text: "Nó làm tăng xác suất xảy ra lỗi" }, { id: "B", text: "Nó làm giảm hiệu suất truyền dữ liệu vì tiêu đề có kích thước cố định" }, { id: "C", text: "Nó làm tăng tắc nghẽn mạng do số lượng gói tin" }, { id: "D", text: "Nó làm giảm băng thông kết nối mạng." } ],
    correct: ["B"], explanation: "MTU (Maximum Transmission Unit) là kích thước lớn nhất của 1 gói tin. Nếu MTU quá nhỏ, dữ liệu phải chia thành rất nhiều gói. Mỗi gói đều phải cõng thêm một lượng Header cố định (IP Header 20 bytes, TCP 20 bytes...). Tỉ lệ Header/Payload tăng vọt, làm giảm hiệu suất truyền dữ liệu thực tế (goodput)."
  },
  {
    id: 31, text: "Mạng máy tính đầu tiên trên thế giới có tên là?", type: "radio", category: "General",
    options: [ { id: "A", text: "CNNET" }, { id: "B", text: "NSFNET" }, { id: "C", text: "ASAPNET" }, { id: "D", text: "ARPANET" } ],
    correct: ["D"], explanation: "ARPANET do Bộ Quốc phòng Mỹ (DoD) tài trợ phát triển vào năm 1969, là tiền thân của mạng Internet ngày nay."
  },
  {
    id: 32, text: "Trong mô hình TCP/IP, khi gói tin được chuyển từ tầng trên xuống tầng dưới thì header sẽ được?", type: "radio", category: "OSI",
    options: [ { id: "A", text: "Thêm vào" }, { id: "B", text: "Thay đổi" }, { id: "C", text: "Loại bỏ" }, { id: "D", text: "Sắp xếp lại" } ],
    correct: ["A"], explanation: "Quá trình gửi dữ liệu từ trên xuống dưới gọi là Đóng gói (Encapsulation). Tại mỗi tầng, một phần Header đặc thù của tầng đó sẽ được Thêm vào trước phần dữ liệu nhận được từ tầng trên."
  },
  {
    id: 33, text: "Địa chỉ ethernet gồm bao nhiêu bit?", type: "radio", category: "DataLink",
    options: [ { id: "A", text: "64 bits" }, { id: "B", text: "48 bits" }, { id: "C", text: "16 bits" }, { id: "D", text: "32 bits" } ],
    correct: ["B"], explanation: "Địa chỉ Ethernet, hay còn gọi là địa chỉ MAC (Media Access Control), có độ dài cố định là 48 bits (thường biểu diễn dưới dạng 6 cụm số Hexa)."
  },
  {
    id: 34, text: "Đâu là nhận xét đúng về cơ chế tự học của switch? (Có thể có nhiều lựa chọn đúng)", type: "checkbox", category: "DataLink",
    options: [ { id: "A", text: "Khi một frame đến switch, switch sẽ cập nhật bảng địa chỉ MAC của nó dựa trên địa chỉ nguồn của frame" }, { id: "B", text: "Khi một frame đến switch, switch sẽ cập nhật bảng địa chỉ MAC của nó dựa trên trường địa chỉ đích của frame" }, { id: "C", text: "Khi một mục trong bảng địa chỉ MAC được thêm vào, nó sẽ tồn tại cho đến khi được cập nhật thông tin mới." }, { id: "D", text: "Một mục trong bảng địa chỉ MAC sẽ hết hạn nếu không được sử dụng và sau khi đã hết thời gian chờ." } ],
    correct: ["A", "D"], explanation: "Switch 'học' địa chỉ MAC bằng cách nhìn vào MAC Nguồn (Source MAC) của gói tin đi vào (A). Các bản ghi này không tồn tại mãi mà có một bộ đếm thời gian (Aging Time), nếu không có giao tiếp nào làm mới, mục đó sẽ bị xóa (D) để giải phóng bộ nhớ."
  },
  {
    id: 35, text: "Một mạng sử dụng 4-bit CHECKSUM để phát hiện lỗi trong quá trình truyền dữ liệu. Mã checksum của dữ liệu 1001 1000 1101 là gì?", type: "radio", category: "DataLink",
    options: [ { id: "A", text: "1111" }, { id: "B", text: "0111" }, { id: "C", text: "0000" }, { id: "D", text: "1110" } ],
    correct: ["C"], explanation: "Cộng theo khối 4-bit với quy tắc tràn (wrap-around / 1's complement addition): \nB1: 1001 + 1000 = 10001. Có nhớ (carry) 1, cộng vòng lại: 0001 + 1 = 0010. \nB2: 0010 + 1101 = 1111. \nChecksum là đảo bit (1's complement) của tổng cuối cùng: Đảo của 1111 là 0000."
  },
  {
    id: 36, text: "Bảng định tuyến của 1 router như sau:\nBộ định tuyến sẽ thực hiện thao tác nào nếu nhận được gói IP có địa chỉ IP đích: 192.168.6.31? \nhttps://drive.google.com/file/d/1UtoBxAH03MfuVnMIBL0ghGEEoJ-SO8JS/view?usp=sharing", type: "radio", category: "Routing",
    options: [ { id: "A", text: "Chuyển tiếp gói tin tới interface 1" }, { id: "B", text: "Chuyển tiếp gói tin tới interface 2" }, { id: "C", text: "Chuyển tiếp gói tin tới interface 3" }, { id: "D", text: "Chuyển tiếp gói tin tới interface 4" }, { id: "E", text: "Chuyển tiếp gói tin tới interface 5" }, { id: "F", text: "Loại bỏ gói tin" } ],
    correct: ["A"], explanation: "IP Đích 192.168.6.31. Khớp với: \n1) 192.168.0.0/16 (Interface 3). \n2) 192.168.4.0/22 (Dải IP từ 192.168.4.0 đến 192.168.7.255) -> Có khớp! (Interface 1). \n3) 192.168.7.0/24 (Dải từ 7.0 - 7.255) -> Không khớp. \nÁp dụng luật 'Longest Prefix Match' (Khớp tiền tố dài nhất), Router chọn mạng /22 thay vì /16. Vậy gói tin ra Interface 1."
  },
  {
    id: 37, text: "Bảng định tuyến của 1 router như sau:\nBộ định tuyến sẽ thực hiện thao tác nào nếu nhận được gói IP có địa chỉ IP đích: 192.168.8.31? \nhttps://drive.google.com/file/d/1UtoBxAH03MfuVnMIBL0ghGEEoJ-SO8JS/view?usp=sharing", type: "radio", category: "Routing",
    options: [ { id: "A", text: "Chuyển tiếp gói tin tới interface 1" }, { id: "B", text: "Chuyển tiếp gói tin tới interface 2" }, { id: "C", text: "Chuyển tiếp gói tin tới interface 3" }, { id: "D", text: "Chuyển tiếp gói tin tới interface 4" }, { id: "E", text: "Chuyển tiếp gói tin tới interface 5" }, { id: "F", text: "Loại bỏ gói tin" } ],
    correct: ["C"], explanation: "IP Đích 192.168.8.31. Khớp với: \n1) 192.168.0.0/16 (Interface 3). \nKhông khớp với 192.168.4.0/22 (vì giới hạn đến 7.255). Do đó, khớp duy nhất và dài nhất là /16, gói tin ra Interface 3."
  },
  {
    id: 38, text: "Nếu gói IP có kích thước dữ liệu (tải trọng) 4926 byte được gửi vào phân đoạn mạng có MTU là 880 byte và giả sử kích thước tiêu đề IP là 20 byte.\nChúng ta cần chia gói IP thành bao nhiêu đoạn để đáp ứng yêu cầu của phân đoạn mạng?", type: "radio", category: "IP",
    options: [ { id: "A", text: "4" }, { id: "B", text: "6" }, { id: "C", text: "5" }, { id: "D", text: "7" } ],
    correct: ["B"], explanation: "Kích thước Dữ liệu tối đa mang được trong 1 gói (Fragment) = MTU - IP Header = 880 - 20 = 860 byte. (Lưu ý: trong thực tế 860 không chia hết cho 8, chuẩn nhất phải là 856 byte, nhưng với đề bài tính toán thông thường không đề cập luật khối 8 byte, ta chia trực tiếp). Số đoạn cần thiết = Làm tròn lên của (4926 / 860) = 5.72 -> Cần 6 đoạn."
  },
  {
    id: 39, text: "Nếu gói IP có kích thước dữ liệu (tải trọng) 4926 byte được gửi vào phân đoạn mạng có MTU là 880 byte và giả sử kích thước tiêu đề IP là 20 byte.\nKích thước của dữ liệu trong fragment cuối là bao nhiêu?", type: "radio", category: "IP",
    options: [ { id: "A", text: "646" }, { id: "B", text: "426" }, { id: "C", text: "440" }, { id: "D", text: "526" }, { id: "E", text: "640" }, { id: "F", text: "520" } ],
    correct: ["A"], explanation: "Dữ liệu tối đa 1 phân mảnh mang theo: 860 byte. Có 6 phân mảnh. 5 phân mảnh đầu tiên sẽ mang đầy tải: 5 * 860 = 4300 byte. Dữ liệu còn lại cho mảnh thứ 6 (cuối cùng) = Tổng dữ liệu - Dữ liệu đã truyền = 4926 - 4300 = 626 byte."
  },
  {
    id: 40, text: "Cung cấp mạng có địa chỉ IP sau: 200.23.0.0/22. Địa chỉ nào không thuộc mạng gốc bên trên?", type: "radio", category: "IP",
    options: [ { id: "A", text: "200.23.2.1" }, { id: "B", text: "200.23.1.1" }, { id: "C", text: "200.23.3.1" }, { id: "D", text: "200.23.4.1" } ],
    correct: ["D"], explanation: "Mạng 200.23.0.0/22 có bước nhảy ở Octet 3 là 2^(24-22) = 4. Vậy dải IP khả dụng là từ 200.23.0.0 đến 200.23.3.255. Địa chỉ 200.23.4.1 nằm ngoài dải này (nó thuộc mạng kế tiếp)."
  },
  {
    id: 41, text: "Cung cấp mạng có địa chỉ IP sau: 200.23.0.0/22. Số lượng thiết bị tối đa thuộc về mạng này là bao nhiêu?", type: "radio", category: "IP",
    options: [ { id: "A", text: "1024" }, { id: "B", text: "2^22" }, { id: "C", text: "1022" }, { id: "D", text: "512" } ],
    correct: ["C"], explanation: "Subnet mask là /22, vậy số bit dành cho phần Host là 32 - 22 = 10 bit. Số thiết bị tối đa (Hosts khả dụng) = 2^10 - 2 (trừ địa chỉ mạng và địa chỉ broadcast) = 1024 - 2 = 1022 thiết bị."
  },
  {
    id: 42, text: "Cung cấp mạng có địa chỉ IP sau: 200.23.0.0/22. Chúng ta muốn chia mạng ban đầu thành các mạng con. Mỗi mạng con có 32 PC. Số lượng mạng con tối đa có thể được tạo từ mạng ban đầu là bao nhiêu?", type: "radio", category: "IP",
    options: [ { id: "A", text: "16" }, { id: "B", text: "32" }, { id: "C", text: "64" }, { id: "D", text: "14" }, { id: "E", text: "30" }, { id: "F", text: "62" } ],
    correct: ["A"], explanation: "Cần chứa 32 PC -> Cần m bit Host sao cho 2^m - 2 >= 32. Nếu m=5, 2^5 - 2 = 30 (thiếu). Nên m phải = 6 (2^6 - 2 = 62 PC). Khi đó số bit Network mới = 32 - 6 = 26. Mask mới là /26. Số bit vay mượn = 26 - 22 = 4 bit. Số lượng mạng con tạo được = 2^4 = 16 mạng con."
  },
  {
    id: 43, text: "Cung cấp mạng có địa chỉ IP sau: 200.23.0.0/22. Có thể tách bao nhiêu mạng con có độ dài địa chỉ 24 bit từ mạng gốc bên trên?", type: "radio", category: "IP",
    options: [ { id: "A", text: "2" }, { id: "B", text: "8" }, { id: "C", text: "4" }, { id: "D", text: "6" } ],
    correct: ["C"], explanation: "Từ mạng /22 muốn chia thành các mạng con /24. Ta vay mượn số bit là: 24 - 22 = 2 bit. Số mạng con tạo được là 2^2 = 4."
  },
  {
    id: 44, text: "Bảng chuyển tiếp gói tin (MAC table) của 1 switch như sau:\nSwitch sẽ làm gì khi nhận được frame có địa chỉ đích 12-12-12-ab-aa-aa và địa chỉ nguồn 33-33-33-ee-ee-ee từ cổng e3? \nhttps://drive.google.com/file/d/1uwdZAoROF61HhSIPaB_-xVUwL4ufiOYE/view?usp=sharing", type: "radio", category: "DataLink",
    options: [ { id: "A", text: "Hủy frame" }, { id: "B", text: "Chuyển tiếp frame tới cổng e1" }, { id: "C", text: "Chuyển tiếp frame tới cổng e2" }, { id: "D", text: "Broadcast frame" }, { id: "E", text: "Thêm/Cập nhật địa chỉ 12-12-12-ab-ab-ab vào bảng chuyển tiếp" }, { id: "F", text: "Thêm/Cập nhật địa chỉ 33-33-33-ee-ee-ee vào bảng chuyển tiếp" } ],
    correct: ["D"], explanation: "Bước 1: Switch kiểm tra MAC nguồn (33..ee), thấy đã tồn tại ở e3 nên chỉ làm mới thời gian (không thay đổi bảng). Bước 2: Kiểm tra MAC đích (12..aa..aa). Nhìn vào bảng MAC không thấy MAC đích này ở đâu cả. Switch sẽ tiến hành hành động 'Flood' (Broadcast) - phát frame này ra tất cả các cổng ngoại trừ cổng nhận vào (e3)."
  },
  {
    id: 45, text: "Bảng chuyển tiếp gói tin (MAC table) của 1 switch như sau:\nSwitch sẽ làm gì khi nhận được frame có địa chỉ đích 12-12-12-ab-ab-ab và địa chỉ nguồn 11-11-11-dd-dd-dd từ cổng e3? \nhttps://drive.google.com/file/d/1uwdZAoROF61HhSIPaB_-xVUwL4ufiOYE/view?usp=sharing", type: "radio", category: "DataLink",
    options: [ { id: "A", text: "Hủy frame" }, { id: "B", text: "Chuyển tiếp frame tới cổng e1" }, { id: "C", text: "Chuyển tiếp frame tới cổng e2" }, { id: "D", text: "Broadcast frame" }, { id: "E", text: "Thêm/Cập nhật địa chỉ 12-12-12-ab-ab-ab vào bảng chuyển tiếp" }, { id: "F", text: "Thêm/Cập nhật địa chỉ 11-11-11-dd-dd-dd vào bảng chuyển tiếp" } ],
    correct: ["B"], explanation: "Đích đến là 12..ab..ab. Switch dò trong bảng MAC thấy MAC đích này ứng với cổng e1. Nó sẽ thực hiện thao tác Chuyển tiếp (Forward) frame này trực tiếp ra cổng e1."
  }
];

// Phân tích văn bản để tìm link ảnh / code
const parseContent = (text) => {
  // Regex hỗ trợ link ảnh thường và link Google Drive (bao trùm cả view?usp=sharing)
  const linkRegex = /(https?:\/\/[^\s]+(?:jpg|jpeg|png|gif|webp)|https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/[^\s]*)/g;
  
  const lines = text.split('\n');
  return lines.map((line, index) => {
    // Nếu có dạng chứa code
    if (line.includes('```')) {
      return (
        <pre key={index} className="bg-gray-800 text-green-400 p-4 rounded-lg my-2 overflow-x-auto text-sm font-mono shadow-inner">
          <code>{line.replace(/```/g, '')}</code>
        </pre>
      );
    }
    
    // Tách chuỗi theo regex (giúp text và link nằm trên cùng 1 dòng vẫn render đủ, không bị nuốt text)
    const parts = line.split(linkRegex);
    
    if (parts.length === 1) {
        return <p key={index} className="mb-2 text-gray-800 leading-snug">{line}</p>;
    }

    return (
      <div key={index} className="mb-2 text-gray-800 leading-snug w-full">
        {parts.map((part, i) => {
          if (!part) return null;
          
          // Nếu đoạn chữ này khớp với định dạng link
          if (part.match(linkRegex)) {
            const url = part;
            let isDrive = false;
            let embedUrl = url;
            let isIframe = false;
            
            // Trích xuất ID file từ link Google Drive
            const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
            if (driveMatch) {
              isDrive = true;
              const fileId = driveMatch[1];
              // Sử dụng API Thumbnail của Google Drive để lấy ảnh trực tiếp, bỏ qua giao diện iframe thô cứng
              embedUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
            } else if (url.includes('drive.google.com')) {
              isDrive = true;
              embedUrl = url.replace(/\/view.*/, '/preview');
              isIframe = true;
            }

            return (
              <div key={i} className="my-5 relative rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden group">
                <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-b border-gray-100">
                   <span className="text-xs text-gray-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                      <ImageIcon size={14}/> {isDrive ? "Dữ liệu Google Drive" : "Hình ảnh đính kèm"}
                   </span>
                   <a href={url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors flex items-center gap-1 font-medium px-3 py-1.5 rounded-md border border-transparent hover:border-blue-100">
                     <ExternalLink size={14}/> Mở xem gốc
                   </a>
                </div>
                <div className="p-4 bg-gray-50/30 flex justify-center items-center min-h-[100px]">
                  {isIframe ? (
                     <iframe src={embedUrl} className="w-full h-[350px] md:h-[450px] border-0 rounded shadow-inner bg-white" title="Drive Attachment" allow="autoplay"></iframe>
                  ) : (
                     <img 
                        src={embedUrl} 
                        alt="Attachment" 
                        className="max-w-full h-auto max-h-[500px] object-contain mx-auto rounded-lg shadow-sm border border-gray-200 transition-transform duration-300 group-hover:scale-[1.01]" 
                        onError={(e) => {
                          // Fallback nếu API thumbnail bị lỗi do quyền truy cập file
                          e.target.style.display = 'none';
                          if (!e.target.nextElementSibling) {
                             e.target.insertAdjacentHTML('afterend', '<p class="text-sm text-gray-500 italic py-4">Không thể tải trước ảnh trực tiếp (do quyền riêng tư). Vui lòng click <b class="text-blue-500">"Mở xem gốc"</b> ở góc trên để xem.</p>');
                          }
                        }} 
                     />
                  )}
                </div>
              </div>
            );
          }
          // Nếu là text bình thường xung quanh link
          return <span key={i}>{part}</span>;
        })}
      </div>
    );
  });
};


export default function App() {
  const [gameState, setGameState] = useState('start'); // start, playing, review
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [scoreData, setScoreData] = useState({ score: 0, wrongCategories: {} });

  const questionRefs = useRef({});

  // Cấu hình thời gian: Làm tròn đến bội số của 5 cho (Số câu * 1.5)
  const initialTimeMins = Math.round((QUIZ_DATA.length * 1.5) / 5) * 5; 

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      submitQuiz();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const startQuiz = () => {
    setAnswers({});
    setFlags(new Set());
    setTimeLeft(initialTimeMins * 60);
    setGameState('playing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswerChange = (qId, optionId, type) => {
    setAnswers(prev => {
      const current = prev[qId] || [];
      if (type === 'radio') {
        return { ...prev, [qId]: [optionId] };
      } else {
        // Checkbox toggle logic
        if (current.includes(optionId)) {
          return { ...prev, [qId]: current.filter(id => id !== optionId) };
        } else {
          return { ...prev, [qId]: [...current, optionId] };
        }
      }
    });
  };

  const toggleFlag = (qId) => {
    setFlags(prev => {
      const newFlags = new Set(prev);
      if (newFlags.has(qId)) newFlags.delete(qId);
      else newFlags.add(qId);
      return newFlags;
    });
  };

  const scrollToQuestion = (id) => {
    const element = questionRefs.current[id];
    if (element) {
      // Offset chút đỉnh để không dính sát viền trên
      const y = element.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const submitQuiz = () => {
    let correctCount = 0;
    const wrongs = {};

    QUIZ_DATA.forEach(q => {
      const userAns = answers[q.id] || [];
      const isCorrect = userAns.length === q.correct.length && 
                        q.correct.every(val => userAns.includes(val));
      if (isCorrect) {
        correctCount++;
      } else {
        wrongs[q.category] = (wrongs[q.category] || 0) + 1;
      }
    });

    setScoreData({
      score: (correctCount / QUIZ_DATA.length) * 10,
      correctCount,
      wrongCategories: wrongs
    });
    setGameState('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getProgressColor = (qId) => {
    if (gameState === 'playing') {
      return answers[qId] && answers[qId].length > 0 ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50';
    } else {
      const userAns = answers[qId] || [];
      const q = QUIZ_DATA.find(x => x.id === qId);
      if (userAns.length === 0) return 'bg-yellow-400 text-yellow-900 border-yellow-500 shadow-sm';
      const isCorrect = userAns.length === q.correct.length && q.correct.every(val => userAns.includes(val));
      return isCorrect ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm' : 'bg-red-500 text-white border-red-600 shadow-sm';
    }
  };

  // --- RENDERS ---

  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden text-center">
          <div className="bg-blue-600 p-8 text-white">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h1 className="text-3xl font-bold mb-2">Đề Thi Giữa Kỳ: Mạng Máy Tính</h1>
            <p className="opacity-80">Hệ thống Trắc nghiệm Tự động chấm điểm</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-2 gap-4 mb-8 text-left">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-600 font-semibold mb-1">Số lượng</p>
                <p className="text-xl font-bold text-gray-800">{QUIZ_DATA.length} Câu hỏi</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-600 font-semibold mb-1">Thời gian</p>
                <p className="text-xl font-bold text-gray-800">{initialTimeMins} Phút</p>
              </div>
            </div>
            <ul className="text-sm text-gray-600 text-left list-disc pl-5 mb-8 space-y-2">
              <li>Mỗi câu hỏi có thể có 1 hoặc nhiều đáp án đúng (Checkbox).</li>
              <li>Chữ màu <span className="font-bold text-blue-600">Xanh</span> trên bảng tiến độ báo hiệu câu đã làm.</li>
              <li>Sử dụng chức năng "Cắm cờ" để đánh dấu câu cần xem lại.</li>
              <li>Hệ thống tự động nộp bài khi hết giờ. Tuyệt đối không tải lại trang.</li>
            </ul>
            <button 
              onClick={startQuiz}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
            >
              <Clock size={24} />
              Bắt Đầu Làm Bài Ngay
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-base">
      {/* Header cho Mobile (Chỉ hiện trên Mobile) */}
      <div className="lg:hidden sticky top-0 z-50 bg-white shadow-sm px-4 py-3 flex justify-between items-center">
         <div className="font-bold text-lg text-gray-800">Mạng Máy Tính</div>
         {gameState === 'playing' && (
           <div className={`font-mono font-bold text-lg ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-blue-600'}`}>
             {formatTime(timeLeft)}
           </div>
         )}
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
        
        {/* Lệ Trái: Bảng Tiến Độ (Sticky) */}
        <div className="w-full lg:w-1/4 shrink-0 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] flex flex-col gap-4">
          
          {/* Card Thời Gian / Nộp Bài */}
          {gameState === 'playing' ? (
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Thời gian còn lại</p>
                <div className={`text-4xl font-mono font-bold ${timeLeft < 300 ? 'text-red-500' : 'text-gray-800'}`}>
                  {formatTime(timeLeft)}
                </div>
              </div>
              <button 
                onClick={submitQuiz}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send size={18} />
                Nộp Bài
              </button>
            </div>
          ) : (
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 text-center">
              <p className="text-sm text-gray-500 font-semibold mb-2">Điểm số của bạn</p>
              <div className="text-5xl font-extrabold text-blue-600 mb-2">
                {scoreData.score.toFixed(1)}<span className="text-2xl text-gray-400">/10</span>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-4">
                Đúng {scoreData.correctCount} / {QUIZ_DATA.length} câu
              </p>
              <button 
                onClick={startQuiz}
                className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Làm Lại
              </button>
            </div>
          )}

          {/* Bảng Câu Hỏi */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex-grow flex flex-col min-h-0">
            <h3 className="font-bold text-gray-800 mb-3 px-1">Danh sách câu hỏi</h3>
            <div className="grid grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-2 overflow-y-auto pr-2 custom-scrollbar pb-2">
              {QUIZ_DATA.map((q) => (
                <button
                  key={q.id}
                  onClick={() => scrollToQuestion(q.id)}
                  className={`relative w-full aspect-square rounded-lg font-semibold text-sm border flex items-center justify-center transition-all ${getProgressColor(q.id)} hover:scale-105`}
                >
                  {q.id}
                  {flags.has(q.id) && gameState === 'playing' && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Chú thích trạng thái */}
            {gameState === 'playing' && (
              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-2 px-1">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-600"></div> Đã chọn đáp án</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white border border-gray-300"></div> Chưa làm</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500 border border-white"></div> Đã cắm cờ</div>
              </div>
            )}
            {gameState === 'review' && (
              <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-2 px-1">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500"></div> Trả lời đúng</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500"></div> Trả lời sai</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-yellow-400"></div> Bỏ trống</div>
              </div>
            )}
          </div>
        </div>

        {/* Cột Phải: Danh sách câu hỏi cuộn */}
        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          
          {gameState === 'review' && Object.keys(scoreData.wrongCategories).length > 0 && (
             <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl shadow-sm">
                <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-2"><AlertCircle size={20}/> Gợi ý Ôn tập</h3>
                <p className="text-sm text-amber-700 mb-2">Bạn bị sai nhiều ở các mảng kiến thức sau. Vui lòng đọc lại slide tương ứng:</p>
                <ul className="list-disc pl-5 text-sm text-amber-800 font-medium">
                  {Object.entries(scoreData.wrongCategories).sort((a,b) => b[1] - a[1]).map(([cat, count]) => (
                     <li key={cat}>Chủ đề: <span className="uppercase">{cat}</span> ({count} câu sai)</li>
                  ))}
                </ul>
             </div>
          )}

          {QUIZ_DATA.map((q) => {
            const userAns = answers[q.id] || [];
            const isCorrect = userAns.length === q.correct.length && q.correct.every(val => userAns.includes(val));
            const isUnanswered = userAns.length === 0;

            let cardBorder = "border-gray-200";
            if (gameState === 'review') {
               if (isUnanswered) cardBorder = "border-yellow-400 shadow-sm shadow-yellow-100";
               else if (isCorrect) cardBorder = "border-emerald-500 shadow-sm shadow-emerald-100";
               else cardBorder = "border-red-500 shadow-sm shadow-red-100";
            } else if (flags.has(q.id)) {
               cardBorder = "border-red-300";
            }

            return (
              <div 
                key={q.id} 
                ref={(el) => (questionRefs.current[q.id] = el)}
                className={`bg-white rounded-2xl p-6 lg:p-8 shadow-sm border-2 transition-colors ${cardBorder}`}
              >
                {/* Header Câu hỏi */}
                <div className="flex justify-between items-start mb-4 gap-4">
                  <div className="flex-grow">
                     <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full mb-3">
                       Câu {q.id} {q.type === 'checkbox' && '- Nhiều đáp án'}
                     </span>
                     <div className="text-base lg:text-lg font-semibold text-gray-800 leading-relaxed">
                        {parseContent(q.text)}
                     </div>
                  </div>
                  {gameState === 'playing' && (
                    <button 
                      onClick={() => toggleFlag(q.id)}
                      className={`p-2 rounded-lg transition-colors ${flags.has(q.id) ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:bg-gray-100'}`}
                      title="Đánh dấu câu này"
                    >
                      <Flag size={20} className={flags.has(q.id) ? "fill-current" : ""} />
                    </button>
                  )}
                  {gameState === 'review' && (
                     <div className="shrink-0 mt-1">
                        {isUnanswered ? <AlertCircle className="text-yellow-500" size={28}/> : 
                         isCorrect ? <CheckCircle2 className="text-emerald-500" size={28}/> : 
                         <XCircle className="text-red-500" size={28}/>}
                     </div>
                  )}
                </div>

                {/* Danh sách Đáp án */}
                <div className="space-y-3">
                  {q.options.map((opt) => {
                    const isChecked = userAns.includes(opt.id);
                    let optClass = "border border-gray-200 bg-white hover:bg-gray-50";
                    let textClass = "text-gray-700";
                    let iconClass = "border-gray-300 bg-white";

                    if (gameState === 'playing') {
                      if (isChecked) {
                        optClass = "border-blue-500 bg-blue-50 ring-1 ring-blue-500";
                        textClass = "text-blue-800 font-medium";
                        iconClass = q.type === 'radio' 
                          ? "border-blue-600 bg-white ring-4 ring-inset ring-blue-600" 
                          : "border-blue-600 bg-blue-600 text-white";
                      }
                    } else { // Review mode
                      const isTrulyCorrect = q.correct.includes(opt.id);
                      if (isTrulyCorrect) {
                        optClass = "border-emerald-500 bg-emerald-50 font-bold";
                        textClass = "text-emerald-900";
                        iconClass = "border-emerald-600 bg-emerald-600 text-white";
                      } else if (isChecked && !isTrulyCorrect) {
                        optClass = "border-red-300 bg-red-50 opacity-70";
                        textClass = "text-red-800 line-through decoration-red-300";
                        iconClass = "border-red-500 bg-red-500 text-white";
                      } else {
                        optClass = "border-gray-100 bg-gray-50 opacity-50";
                      }
                    }

                    return (
                      <label 
                        key={opt.id} 
                        className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all w-full ${optClass} ${gameState === 'review' ? 'pointer-events-none' : ''}`}
                      >
                        <div className="flex-shrink-0 pt-0.5">
                          {q.type === 'radio' ? (
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${iconClass}`}>
                              {/* Inner dot handled via ring logic for radio */}
                            </div>
                          ) : (
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${iconClass}`}>
                               {/* Simple SVG Check for checkbox */}
                               {((gameState === 'playing' && isChecked) || (gameState === 'review' && (q.correct.includes(opt.id) || isChecked))) && (
                                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                               )}
                            </div>
                          )}
                        </div>
                        
                        <input 
                          type={q.type}
                          name={`q-${q.id}`}
                          value={opt.id}
                          checked={isChecked}
                          onChange={() => handleAnswerChange(q.id, opt.id, q.type)}
                          className="hidden"
                          disabled={gameState === 'review'}
                        />
                        <div className={`text-sm lg:text-base leading-snug flex-1 select-none ${textClass}`}>
                          <span className="font-bold mr-2">{opt.id}.</span>{opt.text}
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Khối Giải thích (Chỉ hiện khi Review) */}
                {gameState === 'review' && (
                  <div className={`mt-6 p-5 rounded-xl border-l-4 text-sm ${isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-red-50 border-red-500 text-red-900'}`}>
                    <p className="font-bold mb-1 flex items-center gap-2">
                       <BookOpen size={16}/> Giải thích chi tiết:
                    </p>
                    {/* Áp dụng parseContent cho cả phần giải thích để hiển thị link ảnh nếu có */}
                    <div className="leading-relaxed opacity-90">{parseContent(q.explanation)}</div>
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Footer khoảng trống cho thoải mái cuộn */}
          <div className="h-24"></div>
        </div>
      </div>

      {/* Global CSS for Custom Scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}} />
    </div>
  );
}