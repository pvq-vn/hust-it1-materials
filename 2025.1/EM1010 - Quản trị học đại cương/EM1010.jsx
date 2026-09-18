import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, Flag, RotateCcw, ChevronLeft, ChevronRight, BookOpen, LayoutGrid, CheckSquare, Zap, Trophy, BrainCircuit } from 'lucide-react';

/**
 * DATA - ĐỀ ÔN TẬP QUẢN TRỊ HỌC ĐẠI CƯƠNG (49 Câu)
 * Source: QTHĐC.pdf
 * Note: Đáp án được suy luận dựa trên kiến thức quản trị học (File gốc chưa có đáp án).
 */
const QUESTIONS = [
  {
    id: 1,
    type: "single",
    text: "Ủy quyền đảm bảo nguyên tắc về tính tuyệt đối trong trách nhiệm:",
    code: "",
    options: [
      "a. Cấp trên chịu trách nhiệm và ra quyết định hết",
      "b. Cấp dưới chịu trách nhiệm hoàn toàn, cấp trên không liên quan",
      "c. Cấp dưới dám ra quyết định và chịu trách nhiệm chứ không đùn đẩy lại nhiệm vụ cho cấp trên",
      "d. Cấp dưới tuyệt đối tuân thủ và không ra quyết định"
    ],
    correctAnswers: ["a. Cấp trên chịu trách nhiệm và ra quyết định hết"], // Trong ủy quyền, người ủy quyền (cấp trên) vẫn chịu trách nhiệm cuối cùng.
    explanation: "Nguyên tắc ủy quyền: Người ủy quyền không mất đi trách nhiệm. Họ vẫn chịu trách nhiệm về kết quả cuối cùng của công việc đã ủy quyền.",
    slideRef: "Chương Tổ chức"
  },
  {
    id: 2,
    type: "single",
    text: "Sau khi tốt nghiệp đại học, An đã đi làm được 3 năm với vị trí là kĩ sư chế tạo tại một Nhà máy sản xuất thép. An vừa được Ban giám đốc bổ nhiệm vị trí trưởng bộ phận chế tạo. Theo anh/chị, đối với An, kĩ năng quản trị nào là quan trọng nhất:",
    code: "",
    options: [
      "a. Kỹ năng kĩ thuật",
      "b. Kỹ năng thuyết trình",
      "c. Kỹ năng quan hệ",
      "d. Kỹ năng tư duy"
    ],
    correctAnswers: ["c. Kỹ năng quan hệ"],
    explanation: "Ở cấp quản trị cơ sở/trung gian (Trưởng bộ phận), kỹ năng quan hệ con người (nhân sự) rất quan trọng để điều phối nhóm. Tuy nhiên, kỹ năng kỹ thuật vẫn cần, nhưng sự chuyển dịch sang kỹ năng quan hệ là điểm nhấn khi lên chức.",
    slideRef: "Chương 1: Nhà quản trị"
  },
  {
    id: 3,
    type: "single",
    text: "Phát biểu nào sau đây KHÔNG đúng khi nói về động lực làm việc:",
    code: "",
    options: [
      "a. Là sự mong muốn và tự nguyện của cá nhân để phát huy và tự nỗ lực để đạt được mục tiêu của cá nhân và tổ chức đề ra.",
      "b. Là những yếu tố bên trong thúc đẩy con người nỗ lực làm việc trong điều kiện sức lực bản thân để tạo ra năng suất, chất lượng và hiệu quả công việc.",
      "c. Tồn tại ở hai hình thức là động lực bên trong và động lực bên ngoài",
      "d. Chịu sự ảnh hưởng bởi đặc điểm tổ chức và bản chất công việc, không liên quan đến các đặc điểm cá nhân"
    ],
    correctAnswers: ["d. Chịu sự ảnh hưởng bởi đặc điểm tổ chức và bản chất công việc, không liên quan đến các đặc điểm cá nhân"],
    explanation: "Động lực CHẮC CHẮN chịu ảnh hưởng bởi đặc điểm cá nhân (nhu cầu, tính cách, mong muốn).",
    slideRef: "Chương Lãnh đạo"
  },
  {
    id: 4,
    type: "single",
    text: "_____ là một hệ thống chính thức về các mối quan hệ vừa độc lập vừa phụ thuộc thể hiện rõ những việc do ai làm.",
    code: "",
    options: [
      "a. Phân công lao động",
      "b. Hệ thống công việc",
      "c. Tầm hạn quản trị",
      "d. Cơ cấu tổ chức"
    ],
    correctAnswers: ["d. Cơ cấu tổ chức"],
    explanation: "Định nghĩa cơ bản của Cơ cấu tổ chức.",
    slideRef: "Chương Tổ chức"
  },
  {
    id: 5,
    type: "single",
    text: "Dựa trên tiêu chí thời hạn của bản kế hoạch, kế hoạch được phân loại thành:",
    code: "",
    options: [
      "a. Kế hoạch định hướng và kế hoạch cụ thể",
      "b. Kế hoạch một lần và kế hoạch hiện hành",
      "c. Kế hoạch chiến lược và kế hoạch tác nghiệp",
      "d. Kế hoạch ngắn hạn, trung hạn và dài hạn"
    ],
    correctAnswers: ["d. Kế hoạch ngắn hạn, trung hạn và dài hạn"],
    explanation: "Tiêu chí 'thời hạn' (thời gian) -> Ngắn, trung, dài.",
    slideRef: "Chương Lập kế hoạch"
  },
  {
    id: 6,
    type: "single",
    text: "Nội dung nào sau đây thuộc chức năng lãnh đạo:",
    code: "",
    options: [
      "a. Phương pháp lãnh đạo",
      "b. Nhận thức đúng về các yếu tố con người trong tổ chức",
      "c. Phong cách lãnh đạo",
      "d. Tất cả các phương án trên đều đúng"
    ],
    correctAnswers: ["d. Tất cả các phương án trên đều đúng"],
    explanation: "Chức năng lãnh đạo bao gồm hiểu con người (động viên), lựa chọn phong cách và phương pháp phù hợp.",
    slideRef: "Chương Lãnh đạo"
  },
  {
    id: 7,
    type: "single",
    text: "_____ là đưa ra các quyết định tác nghiệp, hướng dẫn và đôn đốc các nhân viên dưới quyền triển khai các công việc cụ thể.",
    code: "",
    options: [
      "a. Nhân viên",
      "b. Nhà quản lý cấp cao",
      "c. Nhà quản lý cấp trung gian",
      "d. Nhà quản lý cấp cơ sở"
    ],
    correctAnswers: ["d. Nhà quản lý cấp cơ sở"],
    explanation: "Cấp cơ sở (First-line managers) trực tiếp làm việc với nhân viên thừa hành.",
    slideRef: "Chương 1"
  },
  {
    id: 8,
    type: "single",
    text: "Tổ chức nhân sự bao gồm các nội dung:",
    code: "",
    options: [
      "a. Sử dụng, đào tạo, đãi ngộ",
      "b. Đào tạo, đề bạt",
      "c. Tuyển chọn, sử dụng, đào tạo, đãi ngộ",
      "d. Tuyển chọn, đào tạo"
    ],
    correctAnswers: ["c. Tuyển chọn, sử dụng, đào tạo, đãi ngộ"],
    explanation: "Quy trình quản trị nhân lực đầy đủ nhất.",
    slideRef: "Chương Nhân sự"
  },
  {
    id: 9,
    type: "single",
    text: "Để biện pháp động viên phù hợp, nhà quản trị cần xuất phát từ:",
    code: "",
    options: [
      "a. Ý muốn của nhà quản trị",
      "b. Tiềm lực của công ty",
      "c. Môi trường kinh tế- xã hội",
      "d. Nhu cầu cấp dưới"
    ],
    correctAnswers: ["d. Nhu cầu cấp dưới"],
    explanation: "Nguyên tắc cơ bản của động viên là thỏa mãn nhu cầu (Maslow, Herzberg...).",
    slideRef: "Chương Lãnh đạo"
  },
  {
    id: 10,
    type: "single",
    text: "Những tuyên bố về việc được hay không được phép làm được gọi là:",
    code: "",
    options: [
      "a. Thủ tục",
      "b. Chính sách",
      "c. Quy trình",
      "d. Quy tắc"
    ],
    correctAnswers: ["d. Quy tắc"],
    explanation: "Quy tắc (Rules) là những quy định cụ thể, nghiêm ngặt về việc được làm/không được làm, không cho phép sự linh hoạt.",
    slideRef: "Chương Lập kế hoạch"
  },
  {
    id: 11,
    type: "single",
    text: "Khi xây dựng tiêu chuẩn kiểm tra cần kết hợp những phương pháp nào:",
    code: "",
    options: [
      "a. Phân tích tính toán",
      "b. Thống kê kinh nghiệm",
      "c. Tất cả các phương án trên đều đúng",
      "d. Chuyên gia"
    ],
    correctAnswers: ["c. Tất cả các phương án trên đều đúng"],
    explanation: "Để có tiêu chuẩn chính xác, cần kết hợp cả số liệu quá khứ (thống kê), tính toán khoa học và ý kiến chuyên gia.",
    slideRef: "Chương Kiểm tra"
  },
  {
    id: 12,
    type: "single",
    text: "Theo Maslow, nhận định nào trong các nhận định sau KHÔNG chính xác?",
    code: "",
    options: [
      "a. Nhu cầu tự thân vận động (tự hoàn thiện) cao nhất",
      "b. Nhu cầu xã hội (hội nhập) cao hơn nhu cầu an toàn",
      "c. Nhu cầu sinh học là thấp nhất",
      "d. Nhu cầu được tôn trọng cao nhất"
    ],
    correctAnswers: ["d. Nhu cầu được tôn trọng cao nhất"],
    explanation: "Tháp Maslow: Sinh học -> An toàn -> Xã hội -> Tôn trọng -> Tự hoàn thiện. Vậy 'Tôn trọng' không phải cao nhất.",
    slideRef: "Chương Lãnh đạo (Động viên)"
  },
  {
    id: 13,
    type: "single",
    text: "Nhà quản trị ra quyết định mang tính tập trung và lựa chọn cơ cấu tổ chức ổn định trong điều kiện nào?",
    code: "",
    options: [
      "a. Ban lãnh đạo muốn tập trung quyền lực",
      "b. Đội ngũ nhân viên có tay nghề cao",
      "c. Diễn biến môi trường quá nhiều biến động",
      "d. Diễn biến môi trường rất ít biến động"
    ],
    correctAnswers: ["d. Diễn biến môi trường rất ít biến động"],
    explanation: "Cơ cấu ổn định (cơ giới) và tập trung quyền lực phù hợp với môi trường ổn định, ít biến động.",
    slideRef: "Chương Tổ chức"
  },
  {
    id: 14,
    type: "single",
    text: "Đây là một phương pháp đo lường có tốc độ nhanh của kiểm tra phản hồi, tuy nhiên mang tính cá nhân và có thể mất nhiều thời gian:",
    code: "",
    options: [
      "a. báo cáo miệng",
      "b. quan sát cá nhân",
      "c. báo cáo bằng văn bản",
      "d. báo cáo phân tích thống kê"
    ],
    correctAnswers: ["b. quan sát cá nhân"],
    explanation: "Quan sát trực tiếp (Management by walking around) cho thông tin nhanh, thực tế nhưng tốn thời gian và chủ quan.",
    slideRef: "Chương Kiểm tra"
  },
  {
    id: 15,
    type: "single",
    text: "Kiểm tra _____ là loại kiểm tra được thực hiện sau khi hoạt động đã xảy ra và đề xuất biện pháp điều chỉnh trong tương lai.",
    code: "",
    options: [
      "a. Phản hồi",
      "b. Lường trước",
      "c. Chéo",
      "d. Đồng thời"
    ],
    correctAnswers: ["a. Phản hồi"],
    explanation: "Sau khi hoạt động xảy ra = Phản hồi (Feedback Control).",
    slideRef: "Chương Kiểm tra"
  },
  {
    id: 16,
    type: "single",
    text: "Điểm quan tâm chung của các trường phái quản trị là:",
    code: "",
    options: [
      "a. Hiệu quả",
      "b. Con người",
      "c. Lợi nhuận",
      "d. Năng suất lao động"
    ],
    correctAnswers: ["a. Hiệu quả"],
    explanation: "Mục đích cuối cùng của quản trị là đạt được mục tiêu một cách hiệu quả (Efficiency + Effectiveness).",
    slideRef: "Chương 1"
  },
  {
    id: 17,
    type: "single",
    text: "Kỹ năng nào cần thiết ở mức độ như nhau đối với các nhà quản trị:",
    code: "",
    options: [
      "a. Kỹ thuật",
      "b. Tất cả các phương án trên",
      "c. Quan hệ con người",
      "d. Tư duy"
    ],
    correctAnswers: ["c. Quan hệ con người"],
    explanation: "Kỹ năng nhân sự (Human skills) là cần thiết như nhau ở mọi cấp quản trị (Katz).",
    slideRef: "Chương 1"
  },
  {
    id: 18,
    type: "single",
    text: "_____ là quá trình làm việc với và thông qua người khác để công việc được hoàn thành với kết quả mong đợi và hiệu quả cao.",
    code: "",
    options: [
      "a. Quản trị",
      "b. Điều khiển",
      "c. Giám sát",
      "d. Lãnh đạo"
    ],
    correctAnswers: ["a. Quản trị"],
    explanation: "Đây là định nghĩa kinh điển của Quản trị (Management).",
    slideRef: "Chương 1"
  },
  {
    id: 19,
    type: "single",
    text: "Theo nghiên cứu tại Ohio, phong cách lãnh đạo bao gồm:",
    code: "",
    options: [
      "a. Độc đoán, dân chủ, tự do",
      "b. Chú trọng đến con người và chú trọng đến công việc",
      "c. Tất cả các phương án đều đúng",
      "d. Đồng đội, câu lạc bộ, an phận, trung dung, mệnh lệnh"
    ],
    correctAnswers: ["b. Chú trọng đến con người và chú trọng đến công việc"],
    explanation: "Nghiên cứu Ohio State University đưa ra 2 chiều: Initiating Structure (Cấu trúc/Công việc) và Consideration (Sự quan tâm/Con người).",
    slideRef: "Chương Lãnh đạo"
  },
  {
    id: 20,
    type: "single",
    text: "_____ trong đó bộ máy quản lý được sắp xếp theo các bộ phận chức năng. Các bộ phận này sẽ trực tiếp ra quyết định xuống các bộ phận trực thuộc trong phạm vi chuyên môn của mình.",
    code: "",
    options: [
      "a. Cơ cấu tổ chức theo kiểu ma trận",
      "b. Cơ cấu tổ chức theo kiểu dự án",
      "c. Cơ cấu tổ chức theo kiểu trực tuyến",
      "d. Cơ cấu tổ chức theo kiểu chức năng"
    ],
    correctAnswers: ["d. Cơ cấu tổ chức theo kiểu chức năng"],
    explanation: "Từ khóa: 'bộ phận chức năng', 'phạm vi chuyên môn'.",
    slideRef: "Chương Tổ chức"
  },
  {
    id: 21,
    type: "single",
    text: "Kế hoạch chiến lược có xu hướng tập trung vào:",
    code: "",
    options: [
      "a. Hoạt động của tổ chức trong vòng 1 năm tới",
      "b. Hoạt động của tổ chức trong vòng 6 tháng tới",
      "c. Những vấn đề dài hạn và vị thế của tổ chức",
      "d. Những vấn đề hàng ngày và cụ thể"
    ],
    correctAnswers: ["c. Những vấn đề dài hạn và vị thế của tổ chức"],
    explanation: "Chiến lược (Strategic) gắn liền với dài hạn và tổng thể.",
    slideRef: "Chương Lập kế hoạch"
  },
  {
    id: 22,
    type: "single",
    text: "Theo thuyết hai yếu tố của Herzberg, yếu tố nào sau đây KHÔNG phải yếu tố động viên?",
    code: "",
    options: [
      "a. Sự công nhận",
      "b. Bản thân công việc",
      "c. Sự giám sát",
      "d. Cơ hội phát triển"
    ],
    correctAnswers: ["c. Sự giám sát"],
    explanation: "Sự giám sát (Supervision) thuộc nhóm Yếu tố duy trì (Hygiene Factors), không phải Yếu tố động viên (Motivators).",
    slideRef: "Chương Lãnh đạo"
  },
  {
    id: 23,
    type: "single",
    text: "Chức năng kiểm tra là công việc của các nhà quản trị cấp nào?",
    code: "",
    options: [
      "a. cấp trung",
      "b. không có câu trả lời đúng",
      "c. cấp cơ sở",
      "d. cấp cao"
    ],
    correctAnswers: ["b. không có câu trả lời đúng"],
    explanation: "Kiểm tra là công việc của MỌI cấp quản trị. Vì không có đáp án 'Tất cả các cấp', nên chọn 'b'. (Nếu đề coi 'Tất cả' là đáp án ẩn thì đây là câu bẫy).",
    slideRef: "Chương Kiểm tra"
  },
  {
    id: 24,
    type: "single",
    text: "Xu thế quản lý trên thế giới hiện nay là:",
    code: "",
    options: [
      "a. Tăng tầm hạn quản trị, tăng số cấp quản trị",
      "b. Giảm tầm hạn quản trị, giảm số cấp quản trị",
      "c. Giảm tầm hạn quản trị, tăng số cấp quản trị",
      "d. Tăng tầm hạn quản trị, giảm số cấp quản trị"
    ],
    correctAnswers: ["d. Tăng tầm hạn quản trị, giảm số cấp quản trị"],
    explanation: "Xu hướng tổ chức phẳng (Flat organization): Mở rộng tầm hạn quản trị để giảm bớt các tầng nấc trung gian.",
    slideRef: "Chương Tổ chức"
  },
  {
    id: 25,
    type: "single",
    text: "Phát biểu nào sau đây không đúng trong một tổ chức:",
    code: "",
    options: [
      "a. Các nhà quản trị cấp trung cần có kỹ năng quan hệ cao hơn các nhà quản trị cấp cao và cấp cơ sở",
      "b. Các nhà quản trị cấp cơ sở cần thiết phải có kỹ năng kỹ thuật, chuyên môn cao hơn các nhà quản trị cấp cao và cấp trung",
      "c. Cấp bậc quản trị càng cao thì kỹ năng kỹ thuật càng giảm dần tính quan trọng",
      "d. Cấp bậc quản trị càng cao thì kỹ năng tư duy càng cần phải cao"
    ],
    correctAnswers: ["a. Các nhà quản trị cấp trung cần có kỹ năng quan hệ cao hơn các nhà quản trị cấp cao và cấp cơ sở"],
    explanation: "Kỹ năng quan hệ (Human skills) là quan trọng NHƯ NHAU ở mọi cấp. Câu a sai.",
    slideRef: "Chương 1"
  },
  {
    id: 26,
    type: "single",
    text: "Phương án nào dưới đây là căn cứ lập kế hoạch",
    code: "",
    options: [
      "a. Tổng số nhân công",
      "b. Xu hướng thị trường",
      "c. Hệ thống phân phối của doanh nghiệp",
      "d. Tất cả các phương án trên đều đúng"
    ],
    correctAnswers: ["d. Tất cả các phương án trên đều đúng"],
    explanation: "Lập kế hoạch cần căn cứ vào nguồn lực nội bộ (nhân công, phân phối) và môi trường bên ngoài (thị trường).",
    slideRef: "Chương Lập kế hoạch"
  },
  {
    id: 27,
    type: "single",
    text: "Phong cách lãnh đạo nào sau đây mô tả một người lãnh đạo trao cho các thành viên trong nhóm tự do hoàn toàn để ra quyết định và hoàn thành công việc theo cách thức họ cảm thấy phù hợp nhất?",
    code: "",
    options: [
      "a. Phong cách văn hóa",
      "b. Phong cách độc đoán",
      "c. Phong cách tự do",
      "d. Phong cách dân chủ"
    ],
    correctAnswers: ["c. Phong cách tự do"],
    explanation: "Phong cách tự do (Laissez-faire): Lãnh đạo ủy quyền hoàn toàn, ít can thiệp.",
    slideRef: "Chương Lãnh đạo"
  },
  {
    id: 28,
    type: "single",
    text: "Hùng làm việc tại công ty A & B. Ông có hai cấp trên trực tiếp, một nhà quản trị chức năng và một nhà quản trị một đơn vị độc lập. A & B tổ chức theo một cấu trúc............",
    code: "",
    options: [
      "a. Đơn vị độc lập",
      "b. Chức năng",
      "c. Ma trận",
      "d. Địa lý"
    ],
    correctAnswers: ["c. Ma trận"],
    explanation: "Dấu hiệu nhận biết Ma trận (Matrix): Có 2 cấp trên (Dual chain of command).",
    slideRef: "Chương Tổ chức"
  },
  {
    id: 29,
    type: "single",
    text: "Có kiến thức chuyên sâu về một ngành nghề, lĩnh vực cụ thể như công nghệ thông tin, tài chính, cơ khí v.v là kỹ năng nào của nhà quản trị:",
    code: "",
    options: [
      "a. Nhận thức",
      "b. Kỹ thuật",
      "c. Thiết kế",
      "d. Khái quát"
    ],
    correctAnswers: ["b. Kỹ thuật"],
    explanation: "Kỹ năng kỹ thuật (Technical skills) liên quan đến chuyên môn cụ thể.",
    slideRef: "Chương 1"
  },
  {
    id: 30,
    type: "single",
    text: "Đặc điểm chung của một tổ chức là:",
    code: "",
    options: [
      "a. Tất cả lựa chọn trên đều đúng",
      "b. Có mục đích chung",
      "c. Có một cấu trúc nhất định",
      "d. Kết hợp nỗ lực của các thành viên"
    ],
    correctAnswers: ["a. Tất cả lựa chọn trên đều đúng"],
    explanation: "Tổ chức là tập hợp người, có mục đích chung, có cấu trúc.",
    slideRef: "Chương 1"
  },
  {
    id: 31,
    type: "single",
    text: "Cơ chế đánh giá, khen thưởng, đề bạt nhân viên công bằng, minh bạch trong doanh nghiệp nhằm đáp ứng nhu cầu:",
    code: "",
    options: [
      "a. Nhu cầu sinh học",
      "b. Nhu cầu được tôn trọng",
      "c. Nhu cầu an toàn",
      "d. Nhu cầu xã hội"
    ],
    correctAnswers: ["b. Nhu cầu được tôn trọng"],
    explanation: "Được ghi nhận, đề bạt, khen thưởng thỏa mãn nhu cầu Tôn trọng (Esteem Needs).",
    slideRef: "Chương Lãnh đạo"
  },
  {
    id: 32,
    type: "single",
    text: "Tập quyền là:",
    code: "",
    options: [
      "a. Quyền lực tập sự",
      "b. Quyền lực tập trung",
      "c. Quyền lực tập thể",
      "d. Quyền lực tập đoàn"
    ],
    correctAnswers: ["b. Quyền lực tập trung"],
    explanation: "Tập quyền (Centralization) là sự tập trung quyền ra quyết định vào cấp cao nhất.",
    slideRef: "Chương Tổ chức"
  },
  {
    id: 33,
    type: "single",
    text: "____ là những hoạt động công ty có thể làm tốt hoặc những nguồn lực quý hiếm công ty sở hữu",
    code: "",
    options: [
      "a. Các nguy cơ",
      "b. Các điểm mạnh",
      "c. Các cơ hội",
      "d. Các điểm yếu"
    ],
    correctAnswers: ["b. Các điểm mạnh"],
    explanation: "Điểm mạnh (Strengths) trong SWOT.",
    slideRef: "Chương Lập kế hoạch"
  },
  {
    id: 34,
    type: "single",
    text: "Nhân tố nào sau đây của môi trường quản trị doanh nghiệp không thuộc nhóm môi trường bên ngoài?",
    code: "",
    options: [
      "a. Nhà cung cấp",
      "b. Đối thủ tiềm ẩn",
      "c. Khách hàng",
      "d. Đoàn thanh niên của doanh nghiệp"
    ],
    correctAnswers: ["d. Đoàn thanh niên của doanh nghiệp"],
    explanation: "Đoàn thanh niên thuộc tổ chức nội bộ.",
    slideRef: "Chương Môi trường quản trị"
  },
  {
    id: 35,
    type: "single",
    text: "Phát biểu nào sau đây là sai:",
    code: "",
    options: [
      "a. Quản trị cần thiết đối với bệnh viện",
      "b. Quản trị cần thiết đối với doanh nghiệp",
      "c. Quản trị cần thiết đối với trường đại học",
      "d. Quản trị chỉ cần thiết đối với tổ chức có quy mô lớn"
    ],
    correctAnswers: ["d. Quản trị chỉ cần thiết đối với tổ chức có quy mô lớn"],
    explanation: "Quản trị cần thiết cho MỌI tổ chức, bất kể quy mô.",
    slideRef: "Chương 1"
  },
  {
    id: 36,
    type: "single",
    text: "Xây dựng các mục tiêu và các tiêu chuẩn được sử dụng trong quá trình kiểm tra là vai trò của hoạt động chức năng quản trị nào?",
    code: "",
    options: [
      "a. Lãnh đạo",
      "b. Lập kế hoạch",
      "c. Kiểm tra",
      "d. Tổ chức"
    ],
    correctAnswers: ["b. Lập kế hoạch"],
    explanation: "Việc XÂY DỰNG mục tiêu là của Lập kế hoạch. Kiểm tra chỉ SỬ DỤNG chúng.",
    slideRef: "Chương Lập kế hoạch"
  },
  {
    id: 37,
    type: "single",
    text: "Phương án nào dưới đây không nằm trong các yêu cầu có tính nguyên tắc khi xây dựng cơ cấu tổ chức quản lý:",
    code: "",
    options: [
      "a. Độ tin cậy trong hoạt động",
      "b. Tính lịch sử",
      "c. Tính kinh tế",
      "d. Tính tối ưu của hệ thống"
    ],
    correctAnswers: ["b. Tính lịch sử"],
    explanation: "Các yêu cầu thường gặp: Tối ưu, Linh hoạt, Tin cậy, Kinh tế. 'Tính lịch sử' không phải là yêu cầu bắt buộc.",
    slideRef: "Chương Tổ chức"
  },
  {
    id: 38,
    type: "single",
    text: "Nhu cầu sẽ trở thành động cơ khi có yếu tố:",
    code: "",
    options: [
      "a. Tính hiện thực của sự mong muốn",
      "b. Hoàn cảnh, môi trường xung quanh",
      "c. Cả 3 yếu tố trên",
      "d. Sự mong muốn"
    ],
    correctAnswers: ["c. Cả 3 yếu tố trên"],
    explanation: "Động cơ nảy sinh từ nhu cầu + mong muốn + khả năng hiện thực hóa + môi trường.",
    slideRef: "Chương Lãnh đạo"
  },
  {
    id: 39,
    type: "single",
    text: "____ là khả năng thiết lập các mối quan hệ tốt đẹp với các đối tác, khả năng cùng làm việc, động viên và điều khiển nhân sự:",
    code: "",
    options: [
      "a. Kỹ năng quan hệ",
      "b. Kỹ năng tư duy",
      "c. Kỹ năng giải quyết vấn đề",
      "d. Kỹ năng kỹ thuật"
    ],
    correctAnswers: ["a. Kỹ năng quan hệ"],
    explanation: "Định nghĩa Kỹ năng quan hệ (Interpersonal/Human skills).",
    slideRef: "Chương 1"
  },
  {
    id: 40,
    type: "single",
    text: "Kiểm tra ____ là loại kiểm tra được tiến hành trong khi hoạt động đang diễn ra",
    code: "",
    options: [
      "a. Chéo",
      "b. Đồng thời",
      "c. Phản hồi",
      "d. Lường trước"
    ],
    correctAnswers: ["b. Đồng thời"],
    explanation: "Trong khi diễn ra = Đồng thời (Concurrent Control).",
    slideRef: "Chương Kiểm tra"
  },
  {
    id: 41,
    type: "single",
    text: "“Tất cả nhân viên phải nghiêm túc tuân thủ các tiêu chuẩn về an toàn lao động” là một ví dụ của",
    code: "",
    options: [
      "a. Quy tắc",
      "b. Chính sách",
      "c. Thủ tục",
      "d. Chương trình"
    ],
    correctAnswers: ["a. Quy tắc"],
    explanation: "Bắt buộc tuân thủ, không có ngoại lệ = Quy tắc (Rule).",
    slideRef: "Chương Lập kế hoạch"
  },
  {
    id: 42,
    type: "single",
    text: "“Công ty có chế độ lương thưởng đặc biệt cạnh tranh đối với các nhân sự giỏi, có nhiều kinh nghiệm trong các lĩnh vực liên quan, một mặt để giữ chân và thu hút nhân lực giỏi” là một ví dụ về",
    code: "",
    options: [
      "a. Chính sách",
      "b. Thủ tục",
      "c. Quy tắc",
      "d. Quy trình"
    ],
    correctAnswers: ["a. Chính sách"],
    explanation: "Hướng dẫn tư duy và hành động chung = Chính sách (Policy).",
    slideRef: "Chương Lập kế hoạch"
  },
  {
    id: 43,
    type: "single",
    text: "Nhà quản trị tiến hành các hoạt động nhằm thiết lập mối quan hệ với những người khác bên ngoài tổ chức, để tìm kiếm sự ủng hộ và hợp tác của các cá nhân, tổ chức khác đối với tổ chức của mình là mô tả cho vai trò quản trị nào dưới đây:",
    code: "",
    options: [
      "a. Truyền thông",
      "b. Đại diện",
      "c. Lãnh đạo",
      "d. Liên kết"
    ],
    correctAnswers: ["d. Liên kết"],
    explanation: "Vai trò Liên kết (Liaison) trong nhóm vai trò Quan hệ con người của Mintzberg.",
    slideRef: "Chương 1"
  },
  {
    id: 44,
    type: "single",
    text: "Đặc tính của MBO là mỗi thành viên trong tổ chức ____ ràng buộc và...... hành động trong suốt quá trình quản trị",
    code: "",
    options: [
      "a. Tự nguyện; cam kết",
      "b. Cam kết; tự nguyện",
      "c. Tự nguyện; tích cực",
      "d. Chấp nhận; tích cực"
    ],
    correctAnswers: ["a. Tự nguyện; cam kết"],
    explanation: "MBO (Management by Objectives) nhấn mạnh sự tự nguyện tham gia và cam kết thực hiện mục tiêu.",
    slideRef: "Chương Lập kế hoạch"
  },
  {
    id: 45,
    type: "single",
    text: "Đặc trưng của phong cách lãnh đạo chuyên quyền:",
    code: "",
    options: [
      "a. Phân tán quyền ra quyết định cho cấp dưới",
      "b. Thích ra lệnh và ít có lòng tin vào nhân viên cấp dưới",
      "c. Tạo môi trường làm việc 'mở' trong nhóm",
      "d. Tạo điều kiện cho nhân viên cấp dưới phát huy tiềm năng sáng tạo"
    ],
    correctAnswers: ["b. Thích ra lệnh và ít có lòng tin vào nhân viên cấp dưới"],
    explanation: "Chuyên quyền (Autocratic) = Tập trung quyền lực, ra lệnh, ít tin tưởng.",
    slideRef: "Chương Lãnh đạo"
  },
  {
    id: 46,
    type: "single",
    text: "Mục tiêu được xây dựng tốt cần thỏa mãn những tiêu chí nào",
    code: "",
    options: [
      "a. Cụ thể, dễ nhớ, dễ đạt được, thực tế, có khung thời gian rõ ràng",
      "b. Cụ thể, đo lường được, dễ đạt được, thực tế, có khung thời gian rõ ràng",
      "c. Cụ thể, dễ nhớ, có thể đạt được, thực tế, có khung thời gian rõ ràng",
      "d. Cụ thể, đo lường được, có thể đạt được, thực tế, có khung thời gian rõ ràng"
    ],
    correctAnswers: ["d. Cụ thể, đo lường được, có thể đạt được, thực tế, có khung thời gian rõ ràng"],
    explanation: "SMART: Specific, Measurable, Achievable (Có thể đạt được/Khả thi), Realistic, Time-bound. 'Dễ đạt được' (Easy) không đúng bản chất mục tiêu phấn đấu.",
    slideRef: "Chương Lập kế hoạch"
  },
  {
    id: 47,
    type: "single",
    text: "Phát biểu nào sau đây KHÔNG đúng",
    code: "",
    options: [
      "a. Không có phương án đúng",
      "b. Kiểm tra trong khi thực hiện để lường trước rủi ro và khó khăn",
      "c. Kiểm tra sau khi thực hiện là kiểm soát phản hồi",
      "d. Kiểm tra lường trước giúp ngăn ngừa bất trắc, chủ động khi thực hiện"
    ],
    correctAnswers: ["b. Kiểm tra trong khi thực hiện để lường trước rủi ro và khó khăn"],
    explanation: "Đây là câu bẫy. Kiểm tra TRONG KHI thực hiện (Đồng thời) là để sửa sai ngay lúc đó. Kiểm tra LƯỜNG TRƯỚC mới là để dự báo rủi ro TRƯỚC khi thực hiện. Câu b gán ghép sai tính chất.",
    slideRef: "Chương Kiểm tra"
  },
  {
    id: 48,
    type: "single",
    text: "“Tất cả nhân viên phải nghiêm túc tuân thủ các tiêu chuẩn về an toàn lao động” là một ví dụ của",
    code: "",
    options: [
      "a. Thủ tục",
      "b. Quy tắc",
      "c. Chương trình",
      "d. Chính sách"
    ],
    correctAnswers: ["b. Quy tắc"],
    explanation: "Như câu 41, đây là Quy tắc (Rules).",
    slideRef: "Chương Lập kế hoạch"
  },
  {
    id: 49,
    type: "single",
    text: "Nhà quản trị thường xuyên xem xét, phân tích bối cảnh xung quanh tổ chức để nhận ra những tin tức, những hoạt động và những sự kiện có thể đem lại cơ hội tốt hay sự đe dọa đối với hoạt động của tổ chức là mô tả cho vai trò quản trị nào dưới đây:",
    code: "",
    options: [
      "a. Phát ngôn",
      "b. Thu thập và tiếp nhận thông tin",
      "c. Liên kết",
      "d. Phổ biến thông tin"
    ],
    correctAnswers: ["b. Thu thập và tiếp nhận thông tin"],
    explanation: "Vai trò Thu thập thông tin (Monitor) trong nhóm Thông tin của Mintzberg.",
    slideRef: "Chương 1"
  }
];

const Exam = () => {
  const [status, setStatus] = useState('start');
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState(new Set());
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [filterMode, setFilterMode] = useState('all');

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

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setStatus('quiz');
    setTimeLeft(60 * 60);
    setAnswers({});
    setMarkedQuestions(new Set());
    setCurrentQIndex(0);
  };

  const handleSelectOption = (option) => {
    const currentQ = QUESTIONS[currentQIndex];
    const qId = currentQ.id;
    const currentAns = answers[qId] || [];

    if (currentQ.type === 'single') {
        setAnswers(prev => ({ ...prev, [qId]: [option] }));
    } else {
        if (currentAns.includes(option)) {
            setAnswers(prev => ({ ...prev, [qId]: currentAns.filter(a => a !== option) }));
        } else {
            setAnswers(prev => ({ ...prev, [qId]: [...currentAns, option] }));
        }
    }
  };

  const toggleMark = (e) => {
    e.stopPropagation();
    const qId = QUESTIONS[currentQIndex].id;
    setMarkedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(qId)) newSet.delete(qId);
      else newSet.add(qId);
      return newSet;
    });
  };

  const handleSubmit = () => {
    setStatus('review');
    setShowConfirmSubmit(false);
    setCurrentQIndex(0);
  };

  const checkAnswerCorrectness = (userAns, correctAns) => {
      if (!userAns || userAns.length === 0) return false;
      if (userAns.length !== correctAns.length) return false;
      const sortedUser = [...userAns].sort();
      const sortedCorrect = [...correctAns].sort();
      return JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
  };

  const calculateScore = () => {
    let correct = 0;
    QUESTIONS.forEach(q => {
      const userAns = answers[q.id] || [];
      if (checkAnswerCorrectness(userAns, q.correctAnswers)) {
        correct++;
      }
    });
    return correct;
  };

  // Render Helpers
  const renderStartScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full text-center border-t-8 border-purple-600">
        <div className="mb-6 flex justify-center">
          <Zap size={64} className="text-purple-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">QUẢN TRỊ HỌC ĐẠI CƯƠNG</h1>
        <h2 className="text-xl font-semibold text-gray-600 mb-6">Đề ôn tập cuối kỳ (49 Câu)</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-8 text-left max-w-lg mx-auto">
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
            <Clock className="text-purple-600" />
            <div>
              <p className="font-bold text-gray-900">Thời gian</p>
              <p className="text-sm text-gray-600">60 phút</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
            <LayoutGrid className="text-purple-600" />
            <div>
              <p className="font-bold text-gray-900">Số câu hỏi</p>
              <p className="text-sm text-gray-600">49 câu trắc nghiệm</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-left bg-yellow-50 p-6 rounded-lg mb-8 text-sm text-gray-800 border-l-4 border-yellow-400">
          <p className="font-bold flex items-center gap-2 text-yellow-800"><AlertCircle size={18}/> LƯU Ý QUAN TRỌNG:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Đề này lấy nguyên văn từ file PDF <strong>QTHĐC.pdf</strong>.</li>
            <li>File gốc <strong>chưa có đáp án</strong>. Hệ thống đã tự động suy luận đáp án dựa trên lý thuyết Quản trị học.</li>
            <li>Nếu thấy sai sót, hãy check var lại với giáo trình nhé!</li>
          </ul>
        </div>

        <button 
          onClick={handleStart}
          className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold rounded-xl transition-all shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <BrainCircuit /> CHIẾN LUÔN
        </button>
      </div>
    </div>
  );

  const renderQuizScreen = () => {
    const currentQ = QUESTIONS[currentQIndex];
    const isMarked = markedQuestions.has(currentQ.id);
    const userAns = answers[currentQ.id] || [];
    const isMultiple = currentQ.type === 'multiple';

    return (
      <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
        <div className="flex-1 flex flex-col h-full">
          <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center z-10 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm">Câu {currentQIndex + 1}</span>
              <span className="text-xs font-semibold px-2 py-1 bg-gray-200 rounded text-gray-600 uppercase">
                {isMultiple ? 'Nhiều đáp án' : '1 đáp án'}
              </span>
            </h2>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-lg ${timeLeft < 300 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-800'}`}>
                <Clock size={20} />
                {formatTime(timeLeft)}
              </div>
              <button 
                onClick={() => setShowConfirmSubmit(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-bold shadow-sm transition-colors"
              >
                Nộp bài
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10 min-h-[500px] flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed whitespace-pre-line">
                    {currentQ.text}
                    {isMultiple && <span className="block text-sm text-gray-500 font-normal mt-1">(Chọn tất cả các đáp án đúng)</span>}
                  </h3>
                </div>
                <button 
                  onClick={(e) => toggleMark(e)}
                  className={`ml-4 p-2 rounded-full transition-colors ${isMarked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                  title="Đánh dấu"
                >
                  <Flag fill={isMarked ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="space-y-3 mt-6">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = userAns.includes(opt);
                  return (
                    <div 
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      className={`
                        relative group flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                        ${isSelected 
                          ? 'border-purple-600 bg-purple-50 shadow-inner' 
                          : 'border-gray-200 hover:border-purple-200 hover:bg-gray-50'}
                      `}
                    >
                      <div className={`
                        w-6 h-6 flex items-center justify-center mr-4 flex-shrink-0
                        ${isMultiple ? 'rounded-md' : 'rounded-full'}
                        ${isSelected ? 'bg-purple-600 border-purple-600 text-white' : 'border-2 border-gray-300'}
                      `}>
                         {isSelected && (isMultiple ? <CheckSquare size={16}/> : <div className="w-2.5 h-2.5 rounded-full bg-white" />)}
                      </div>
                      <span className={`text-base ${isSelected ? 'font-medium text-purple-900' : 'text-gray-700'}`}>
                        {opt}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto pt-8 flex justify-between items-center border-t border-gray-100 mt-8">
                <button 
                  onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft /> Trước
                </button>
                <button 
                  onClick={() => setCurrentQIndex(prev => Math.min(QUESTIONS.length - 1, prev + 1))}
                  disabled={currentQIndex === QUESTIONS.length - 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  Sau <ChevronRight />
                </button>
              </div>
            </div>
          </main>
        </div>

        <div className="w-80 bg-white border-l border-gray-200 flex flex-col hidden lg:flex">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <LayoutGrid size={18}/> Navigation
            </h3>
            <div className="flex gap-4 mt-3 text-xs text-gray-500 flex-wrap">
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-600"></span> Đã làm</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-400"></span> Lưu ý</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded border border-gray-300"></span> Trống</div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-5 gap-2">
              {QUESTIONS.map((q, idx) => {
                const isAns = (answers[q.id] || []).length > 0;
                const isMk = markedQuestions.has(q.id);
                const isCurr = currentQIndex === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`
                      h-10 w-full rounded-md text-sm font-medium transition-all relative
                      ${isCurr ? 'ring-2 ring-blue-500 ring-offset-2 z-10' : ''}
                      ${isAns ? 'bg-purple-600 text-white' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}
                    `}
                  >
                    {idx + 1}
                    {isMk && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {showConfirmSubmit && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <div className="text-center">
                <AlertCircle size={48} className="mx-auto text-yellow-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Chốt đơn chưa?</h3>
                <p className="text-gray-600 mb-6">
                   Còn {formatTime(timeLeft)} nữa. Chắc chắn nộp chưa hay check var lại phát nữa?
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setShowConfirmSubmit(false)} className="py-3 px-4 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50">
                    Check lại
                  </button>
                  <button onClick={handleSubmit} className="py-3 px-4 rounded-xl bg-purple-600 font-semibold text-white hover:bg-purple-700 shadow-lg">
                    Nộp luôn
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderReviewScreen = () => {
    const score = calculateScore();
    const percentage = Math.round((score / QUESTIONS.length) * 100);
    
    let displayedQuestions = QUESTIONS;
    if (filterMode === 'wrong') {
      displayedQuestions = QUESTIONS.filter(q => {
        const userAns = answers[q.id] || [];
        return !checkAnswerCorrectness(userAns, q.correctAnswers);
      });
    } else if (filterMode === 'marked') {
      displayedQuestions = QUESTIONS.filter(q => markedQuestions.has(q.id));
    }

    return (
      <div className="min-h-screen bg-gray-50 pb-12 font-sans">
        <div className="bg-gray-900 text-white pb-20 pt-10 px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Kết quả bài làm</h1>
              <p className="text-gray-400 flex items-center gap-2"><Trophy size={18} className="text-yellow-500"/> Hoàn thành {QUESTIONS.length} câu hỏi</p>
            </div>
            <div className="mt-6 md:mt-0 flex items-center gap-8">
              <div className="text-center">
                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{score}<span className="text-2xl text-gray-500">/{QUESTIONS.length}</span></p>
                <p className="text-sm text-gray-400 uppercase tracking-wider mt-1">Điểm số</p>
              </div>
              <div className="w-px h-16 bg-gray-700 hidden md:block"></div>
               <button 
                  onClick={() => { if(window.confirm("Làm lại từ đầu nha?")) handleStart(); }}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-semibold"
                >
                  <RotateCcw size={18} /> Làm lại
                </button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 -mt-12">
            <div className="flex bg-white rounded-xl shadow-lg p-2 mb-8 w-fit mx-auto md:mx-0 overflow-x-auto max-w-full">
                <button onClick={() => setFilterMode('all')} className={`px-6 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filterMode === 'all' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>Tất cả</button>
                <button onClick={() => setFilterMode('wrong')} className={`px-6 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filterMode === 'wrong' ? 'bg-red-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>Sai / Chưa làm</button>
                 <button onClick={() => setFilterMode('marked')} className={`px-6 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filterMode === 'marked' ? 'bg-yellow-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>Đánh dấu</button>
            </div>

          <div className="space-y-6">
            {displayedQuestions.map((q, idx) => {
              const userAns = answers[q.id] || [];
              const isCorrect = checkAnswerCorrectness(userAns, q.correctAnswers);
              const isMultiple = q.type === 'multiple';

              return (
                <div key={q.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden ${isCorrect ? 'border-green-200' : 'border-red-200'}`}>
                  <div className={`px-6 py-3 border-b flex justify-between items-center ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex items-center gap-3">
                        <span className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>Câu {q.id}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-white/50 border border-black/10 text-gray-600">
                            {isMultiple ? 'Multi-choice' : 'Single-choice'}
                        </span>
                    </div>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-green-700 text-sm font-bold"><CheckCircle size={16}/> Correct</span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-700 text-sm font-bold"><AlertCircle size={16}/> Incorrect</span>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-gray-900 font-medium mb-4 whitespace-pre-line">{q.text}</h3>
                    {q.code && <div className="mb-4 bg-gray-900 rounded-lg p-4 overflow-x-auto"><pre className="font-mono text-sm text-green-400">{q.code}</pre></div>}

                    <div className="space-y-2 mb-6">
                        {q.options.map((opt, i) => {
                            const selected = userAns.includes(opt);
                            const correct = q.correctAnswers.includes(opt);
                            
                            // Styling logic for review
                            let styleClass = "border-gray-200 text-gray-500 opacity-60"; 
                            let icon = isMultiple ? <div className="w-4 h-4 border border-gray-400 rounded-sm"></div> : <div className="w-4 h-4 border border-gray-400 rounded-full"></div>;

                            if (correct) {
                                styleClass = "border-green-500 bg-green-50 text-green-900 font-medium"; 
                                icon = <CheckCircle size={18} className="text-green-600"/>;
                            }
                            if (selected && !correct) {
                                styleClass = "border-red-500 bg-red-50 text-red-900 font-medium"; 
                                icon = <AlertCircle size={18} className="text-red-600"/>;
                            }
                            if (selected && correct) {
                                styleClass = "border-green-600 bg-green-100 text-green-900 font-bold ring-1 ring-green-600";
                                icon = <CheckCircle size={18} className="text-green-600 fill-green-100"/>;
                            }

                            return (
                                <div key={i} className={`flex items-center p-3 rounded-lg border ${styleClass}`}>
                                    <div className="mr-3">{icon}</div>
                                    <span>{opt}</span>
                                </div>
                            )
                        })}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <p className="font-bold text-blue-900 text-sm mb-1 flex items-center gap-2"><BookOpen size={16}/> Giải thích:</p>
                        <p className="text-blue-800 text-sm leading-relaxed mb-2">{q.explanation}</p>
                        <span className="text-xs text-blue-600 font-semibold bg-blue-100 inline-block px-2 py-1 rounded">Ref: {q.slideRef}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans text-gray-900">
      {status === 'start' && renderStartScreen()}
      {status === 'quiz' && renderQuizScreen()}
      {status === 'review' && renderReviewScreen()}
    </div>
  );
};

export default Exam;