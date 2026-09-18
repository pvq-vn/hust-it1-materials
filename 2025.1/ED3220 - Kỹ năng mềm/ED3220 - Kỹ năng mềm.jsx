// link: https://gemini.google.com/share/c625ea249fa7

import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, Flag, RotateCcw, ChevronLeft, ChevronRight, LayoutGrid, CheckSquare, Zap } from 'lucide-react';

/**
 * DATA - ĐỀ SỐ 1 (40 Câu - Từ file PDF "Bo cau hoi TN Ky nang mem")
 * Môn: Kỹ Năng Mềm
 * Created by: PVQ - IT1 K69
 */
const QUESTIONS = [
  {
    id: 1,
    type: "single",
    text: "Câu 1: Khi nào thì giao tiếp bằng văn bản phù hợp hơn giao tiếp trực tiếp?",
    options: [
      "A. Khi bạn muốn trình bày một ý tưởng phức tạp.",
      "B. Khi bạn muốn tránh nói chuyện với ai đó.",
      "C. Khi bạn muốn đưa ra nhiều câu hỏi.",
      "D. Khi bạn muốn nhanh chóng nhận được ý kiến trả lời về một vấn đề."
    ],
    correctAnswers: ["A. Khi bạn muốn trình bày một ý tưởng phức tạp."],
    explanation: "Giao tiếp văn bản giúp lưu trữ thông tin chi tiết và người nhận có thời gian nghiền ngẫm các ý tưởng phức tạp.",
    slideRef: "Page 1"
  },
  {
    id: 2,
    type: "single",
    text: "Câu 2: Bạn có thể làm gì để hiểu rõ những điều người khác đang nói?",
    options: [
      "A. Cố gắng hiểu các ngôn ngữ cơ thể",
      "B. Đưa ra những đánh giá dựa trên những điều họ đang nói.",
      "C. Đặt ra các câu hỏi.",
      "D. Sử dụng ngữ điệu."
    ],
    correctAnswers: ["C. Đặt ra các câu hỏi."],
    explanation: "Đặt câu hỏi (Questions) là cách trực tiếp và hiệu quả nhất để làm rõ thông tin (Clarify).",
    slideRef: "Page 1"
  },
  {
    id: 3,
    type: "single",
    text: "Câu 3: Để tạo ra một thông điệp hiệu quả, bạn sẽ làm theo hướng dẫn nào sau đây?",
    options: [
      "A. Sử dụng tiếng lóng",
      "B. Sử dụng biệt ngữ và từ địa phương",
      "C. Lựa chọn từ phù hợp, dễ hiểu",
      "D. Dùng ngôn từ khó hiểu"
    ],
    correctAnswers: ["C. Lựa chọn từ phù hợp, dễ hiểu"],
    explanation: "Nguyên tắc 7C trong giao tiếp: Clear (Rõ ràng) và Concise (Súc tích).",
    slideRef: "Page 1"
  },
  {
    id: 4,
    type: "single",
    text: "Câu 4: Khi bạn có những ý kiến phản đối hay lời phê bình trước một vấn đề",
    options: [
      "A. Bạn đưa ra những lời nhận xét khả quan trước.",
      "B. Bạn chẳng nói gì cả.",
      "C. Đơn giản, bạn sẽ phát biểu."
    ],
    correctAnswers: ["A. Bạn đưa ra những lời nhận xét khả quan trước."],
    explanation: "Kỹ thuật 'Bánh mì kẹp thịt' (Sandwich method): Khen - Góp ý - Khen/Động viên.",
    slideRef: "Page 1"
  },
  {
    id: 5,
    type: "single",
    text: "Câu 5: Để kết thúc 1 cuộc trò chuyện, ...",
    options: [
      "A. Bạn thường chỉ bỏ đi",
      "B. Bạn bắt đầu trông thiếu kiên nhẫn và hy vọng người đó sẽ gợi ý.",
      "C. Bạn kết thúc những vấn đề trên với một sự phát biểu đóng."
    ],
    correctAnswers: ["C. Bạn kết thúc những vấn đề trên với một sự phát biểu đóng."],
    explanation: "Sử dụng câu kết thúc hoặc tóm tắt để ra hiệu cuộc trò chuyện dừng lại một cách lịch sự.",
    slideRef: "Page 1"
  },
  {
    id: 6,
    type: "single",
    text: "Câu 6: Giai đoạn giải mã thông điệp diễn ra khi nào?",
    options: [
      "A. Khi người nghe tiếp nhận thông tin.",
      "B. Khi bạn diễn đạt suy nghĩ và ý tưởng của mình.",
      "C. Khi các thông tin được truyền tải đi",
      "D. Khi người nghe lý giải thông tin."
    ],
    correctAnswers: ["D. Khi người nghe lý giải thông tin."],
    explanation: "Decoding (Giải mã) là quá trình người nhận chuyển đổi tín hiệu nhận được thành ý nghĩa.",
    slideRef: "Page 2"
  },
  {
    id: 7,
    type: "single",
    text: "Câu 7: Trong cuộc nói chuyện, bạn:",
    options: [
      "A. Đứng cách người nói 5-6 bước chân",
      "B. Đứng cách người nói 2-3 bước chân",
      "C. Đứng cách người nói 1 bước chân"
    ],
    correctAnswers: ["B. Đứng cách người nói 2-3 bước chân"],
    explanation: "Khoảng cách xã giao (Social zone) thường từ 1.2m - 3m, tương đương khoảng 2-3 bước chân để thoải mái.",
    slideRef: "Page 2"
  },
  {
    id: 8,
    type: "multiple",
    text: "Câu 8: Bạn phải làm gì để gây ấn tượng và tạo mối quan hệ với người khác?",
    options: [
      "A. Đồng tình với những gì họ nói.",
      "B. Thay đổi âm lượng giọng nói cho phù hợp với người bạn đang đối thoại.",
      "C. Bắt chước tư thế giao tiếp của họ"
    ],
    correctAnswers: [
      "A. Đồng tình với những gì họ nói.",
      "B. Thay đổi âm lượng giọng nói cho phù hợp với người bạn đang đối thoại.",
      "C. Bắt chước tư thế giao tiếp của họ"
    ],
    explanation: "Kỹ thuật Mirroring (Phản chiếu) và Matching (Tương đồng) giúp xây dựng thiện cảm (Rapport).",
    slideRef: "Page 2"
  },
  {
    id: 9,
    type: "single",
    text: "Câu 9: Ba bí quyết nào sau đây sẽ luôn giúp bạn thành công, luôn được những người khác yêu mến trong cuộc sống và công việc?",
    options: [
      "A. Đặt câu hỏi, Giúp đỡ nhiệt tình, Phê bình khi có sai sót",
      "B. Góp ý thẳng thắn, Lắng nghe và Tôn trọng",
      "C. Luôn tươi cười, Học cách khen ngợi, Lắng nghe"
    ],
    correctAnswers: ["C. Luôn tươi cười, Học cách khen ngợi, Lắng nghe"],
    explanation: "Đây là những nguyên tắc cốt lõi trong 'Đắc Nhân Tâm' (Dale Carnegie).",
    slideRef: "Page 2"
  },
  {
    id: 10,
    type: "multiple",
    text: "Câu 10: Khi viết thư điện tử, bạn nên:",
    options: [
      "A. Nêu rõ những yêu cầu của bạn (nếu có) trong bức thư.",
      "B. Sử dụng phong cách và giọng văn khác với người nhận, không bao giờ được bắt chước phong cách của họ",
      "C. Luôn ghi rõ mục đích của thư trong mục \"Tiêu đề thư\"."
    ],
    correctAnswers: [
      "A. Nêu rõ những yêu cầu của bạn (nếu có) trong bức thư.",
      "C. Luôn ghi rõ mục đích của thư trong mục \"Tiêu đề thư\"."
    ],
    explanation: "Tiêu đề rõ ràng và nội dung yêu cầu cụ thể (Call to action) là quy chuẩn email business.",
    slideRef: "Page 2"
  },
  {
    id: 11,
    type: "multiple",
    text: "Câu 11: Lắng nghe tích cực có đặc điểm như thế nào?",
    options: [
      "A. Thể hiện tư thế sẵn sàng phản hồi.",
      "B. Mỉm cười với người nói.",
      "C. Gật đầu khi người đó đang nói."
    ],
    correctAnswers: [
      "A. Thể hiện tư thế sẵn sàng phản hồi.",
      "B. Mỉm cười với người nói.",
      "C. Gật đầu khi người đó đang nói."
    ],
    explanation: "Tất cả các hành động trên đều là tín hiệu phi ngôn ngữ (Non-verbal) của việc đang chú ý lắng nghe.",
    slideRef: "Page 2"
  },
  {
    id: 12,
    type: "single",
    text: "Câu 12: Hành động ngồi ngả người về phía trước ám chỉ điều gì khi giao tiếp?",
    options: [
      "A. Người đó đang cố kiềm chế.",
      "B. Người đó đang có thái độ hạ mình hoặc thái độ hách dịch.",
      "C. Người đó rất tự tin.",
      "D. Người đó đang rất hứng thú và sẵn sàng hồi đáp."
    ],
    correctAnswers: ["D. Người đó đang rất hứng thú và sẵn sàng hồi đáp."],
    explanation: "Leaning forward (Ngả người về trước) thể hiện sự quan tâm và hứng thú với câu chuyện.",
    slideRef: "Page 2"
  },
  {
    id: 13,
    type: "single",
    text: "Câu 13: Truyền thông giao tiếp bằng lời gồm:",
    options: [
      "A. Nói và kèm theo các cử chỉ điệu bộ",
      "B. Nói và viết",
      "C. Nói, viết, nghe, và đọc",
      "D. Nói, viết, nghe"
    ],
    correctAnswers: ["C. Nói, viết, nghe, và đọc"],
    explanation: "Giao tiếp ngôn từ (Verbal) bao gồm Ngôn ngữ nói (Oral/Speaking) và Ngôn ngữ viết (Written).",
    slideRef: "Page 3"
  },
  {
    id: 14,
    type: "single",
    text: "Câu 14: Truyền thông giao tiếp không lời là hình thức:",
    options: [
      "A. Cơ bản nhất",
      "B. Ít phổ biến",
      "C. Có muộn nhất",
      "D. Dễ học"
    ],
    correctAnswers: ["A. Cơ bản nhất"],
    explanation: "Giao tiếp phi ngôn ngữ (cử chỉ, nét mặt) xuất hiện trước ngôn ngữ trong quá trình tiến hóa và phát triển của con người.",
    slideRef: "Page 3"
  },
  {
    id: 15,
    type: "single",
    text: "Câu 15: Bạn hãy chọn lời phát biểu chính xác nhất sau đây về làm việc nhóm:",
    options: [
      "A. Sự thỏa mãn cá nhân & tinh thần làm việc gia tăng khi đội/ nhóm thành công",
      "B. Những nhân viên làm việc trong đội/ nhóm báo cáo sự thỏa mãn công việc giảm sút đi",
      "C. Đội/ nhóm có khuynh hướng làm ít có hiệu quả trong việc giải quyết vấn đề hơn là cá nhân",
      "D. Đội/ nhóm đòi hỏi nhiều nguồn lực để hoàn thành nhiệm vụ hơn từng cá nhân"
    ],
    correctAnswers: ["A. Sự thỏa mãn cá nhân & tinh thần làm việc gia tăng khi đội/ nhóm thành công"],
    explanation: "Thành công của nhóm tạo ra động lực và sự hài lòng cho các thành viên (Synergy).",
    slideRef: "Page 3"
  },
  {
    id: 16,
    type: "single",
    text: "Câu 16: Theo bạn, kỹ năng giao tiếp tốt sẽ quyết định bao nhiêu sự thành công của bạn trong công việc và cuộc sống?",
    options: [
      "A. 85%",
      "B. 70%",
      "C. 50%",
      "D. 20%"
    ],
    correctAnswers: ["A. 85%"],
    explanation: "Nghiên cứu của Đại học Harvard và Stanford thường trích dẫn con số 85% thành công đến từ kỹ năng mềm và giao tiếp.",
    slideRef: "Page 3"
  },
  {
    id: 17,
    type: "single",
    text: "Câu 17: Khi trò chuyện với một người nào đó,",
    options: [
      "A. Bạn thường là người nói nhiều nhất",
      "B. Cố gắng cân bằng trong suốt cuộc đối thoại.",
      "C. Bạn thường để người khác nói nhiều hơn."
    ],
    correctAnswers: ["B. Cố gắng cân bằng trong suốt cuộc đối thoại."],
    explanation: "Giao tiếp hiệu quả là quá trình hai chiều (Two-way process), cần sự cân bằng giữa Nói và Nghe.",
    slideRef: "Page 3"
  },
  {
    id: 18,
    type: "single",
    text: "Câu 18: Nét mặt trong truyền thông không lời diễn tả:",
    options: [
      "A. Sự suy nghĩ",
      "B. Sự trấn áp",
      "C. Cảm xúc",
      "D. Điều chỉnh sự giao tiếp"
    ],
    correctAnswers: ["C. Cảm xúc"],
    explanation: "Nét mặt (Facial expressions) là kênh mạnh nhất để truyền tải cảm xúc (vui, buồn, giận, sợ...).",
    slideRef: "Page 4"
  },
  {
    id: 19,
    type: "single",
    text: "Câu 19: Dịch 1 thông điệp từ hình thức biểu tượng thành có ý nghĩa là:",
    options: [
      "A. Mã hóa",
      "B. Chuyển kênh",
      "C. Giải mã",
      "D. Phản hồi"
    ],
    correctAnswers: ["C. Giải mã"],
    explanation: "Giải mã (Decoding) là quá trình nhận các biểu tượng/tín hiệu và chuyển nó thành ý nghĩa trong đầu.",
    slideRef: "Page 4"
  },
  {
    id: 20,
    type: "single",
    text: "Câu 20: Hãy chọn định nghĩa về “Truyền thông giao tiếp\" thích hợp nhất",
    options: [
      "A. Truyền thông giao tiếp là truyền thông tin và ý nghĩa từ một cá nhân hoặc nhóm đến 1 người khác",
      "B. Truyền thông giao tiếp là truyền ý tưởng từ 1 cá nhân hoặc nhóm đến 1 người khác",
      "C. Truyền thông giao tiếp là truyền ý nghĩa từ 1 cá nhân hay một nhóm đến 1 người khác",
      "D. Truyền thông giao tiếp là truyền thông tin từ một cá nhân hoặc nhóm đến một người khác"
    ],
    correctAnswers: ["A. Truyền thông giao tiếp là truyền thông tin và ý nghĩa từ một cá nhân hoặc nhóm đến 1 người khác"],
    explanation: "Giao tiếp bao gồm cả việc truyền tải Dữ liệu (Information) và sự Hiểu (Meaning/Understanding).",
    slideRef: "Page 4"
  },
  {
    id: 21,
    type: "single",
    text: "Câu 21: Những người biết điều hành doanh nghiệp thì thường dành nhiều thời gian giao tiếp của mình vào việc",
    options: [
      "A. Lắng nghe",
      "B. Nói",
      "C. Đọc",
      "D. Viết"
    ],
    correctAnswers: ["A. Lắng nghe"],
    explanation: "Lãnh đạo giỏi thường dành 60-80% thời gian giao tiếp để Lắng nghe.",
    slideRef: "Page 4"
  },
  {
    id: 22,
    type: "single",
    text: "Câu 22: Cử điệu và dáng điệu trong truyền thông không lời thể hiện bằng:",
    options: [
      "A. Cử chỉ bằng tay hoặc cách đi đứng",
      "B. Nụ cười, cái nheo mắt",
      "C. Cách đi đứng",
      "D. Cái vẩy tay"
    ],
    correctAnswers: ["A. Cử chỉ bằng tay hoặc cách đi đứng"],
    explanation: "Gestures (Cử chỉ) và Posture (Dáng điệu) bao gồm tay, thân mình và cách di chuyển.",
    slideRef: "Page 4"
  },
  {
    id: 23,
    type: "single",
    text: "Câu 23: Khi bắt tay trong giao tiếp, bạn nên đứng ở khoảng cách bao xa là vừa phải?",
    options: [
      "A. 1 Sải tay",
      "B. Tùy mỗi trường hợp",
      "C. 50 cm",
      "D. 1 cánh tay của người cao hơn"
    ],
    correctAnswers: ["D. 1 cánh tay của người cao hơn"],
    explanation: "Khoảng cách này đảm bảo không gian cá nhân (Personal space) nhưng vẫn đủ gần để chạm tay.",
    slideRef: "Page 4"
  },
  {
    id: 24,
    type: "single",
    text: "Câu 24: Để giao tiếp hiệu quả, chúng ta thường.........",
    options: [
      "A. Tránh những những sự kiện trong ngày hoặc những câu chuyện đi vào những vấn đề quan trọng hơn.",
      "B. Tránh né việc mở đầu một cuộc trò chuyện",
      "C. Mở đầu cuộc trò chuyện bằng việc bàn về những sự kiện trong ngày hoặc những câu chuyện nhỏ."
    ],
    correctAnswers: ["C. Mở đầu cuộc trò chuyện bằng việc bàn về những sự kiện trong ngày hoặc những câu chuyện nhỏ."],
    explanation: "Small talk (Chuyện phiếm) là chất bôi trơn quan trọng để bắt đầu cuộc hội thoại.",
    slideRef: "Page 5"
  },
  {
    id: 25,
    type: "single",
    text: "Câu 25: Ngôn ngữ cơ thể, thể hiện điều gì nếu một người thường siết chặt tay và gõ chân xuống sàn trong quá trình giao tiếp?",
    options: [
      "A. Thách thức",
      "B. Suy tư",
      "C. Trốn tránh",
      "D. Sẵn sàng phản hồi"
    ],
    correctAnswers: ["A. Thách thức"],
    explanation: "Gõ chân (Tapping feet) thường biểu hiện sự mất kiên nhẫn, lo lắng hoặc muốn rời đi (Trốn tránh/Muốn thoát khỏi tình huống).",
    slideRef: "Page 5"
  },
  {
    id: 26,
    type: "single",
    text: "Câu 26: Cách tốt nhất để chuẩn bị cho một cuộc giao tiếp qua điện thoại là gì?",
    options: [
      "A. Nghĩ trước một vài câu hỏi người giao tiếp có thể sẽ hỏi.",
      "B. Nghĩ trước hoặc chuẩn bị trước nội dung cuộc gọi.",
      "C. Không chuẩn bị gì cả."
    ],
    correctAnswers: ["B. Nghĩ trước hoặc chuẩn bị trước nội dung cuộc gọi."],
    explanation: "Chuẩn bị trước nội dung giúp cuộc gọi ngắn gọn, súc tích và đạt mục tiêu.",
    slideRef: "Page 5"
  },
  {
    id: 27,
    type: "single",
    text: "Câu 27: Để giao tiếp hiệu quả, chúng ta",
    options: [
      "A. Cố gắng nhớ và gọi tên khi trò chuyện với người khác.",
      "B. Không chú ý đến tên và có khuynh hướng quên chúng.",
      "C. Chỉ nhớ tên những người quan trọng."
    ],
    correctAnswers: ["A. Cố gắng nhớ và gọi tên khi trò chuyện với người khác."],
    explanation: "\"Âm thanh êm đềm nhất với mỗi người chính là tên của họ\" - Dale Carnegie.",
    slideRef: "Page 5"
  },
  {
    id: 28,
    type: "single",
    text: "Câu 28: Để giao tiếp hiệu quả, chúng ta thường,",
    options: [
      "A. Dựa xuống trong khi nói chuyện với một người đang ngồi.",
      "B. Đứng trong khi nói chuyện với một người đang ngồi.",
      "C. Ngồi khi nói chuyện với một người đang ngồi."
    ],
    correctAnswers: ["C. Ngồi khi nói chuyện với một người đang ngồi."],
    explanation: "Nên giữ tầm mắt ngang bằng (Eye level) để thể hiện sự tôn trọng và bình đẳng.",
    slideRef: "Page 5"
  },
  {
    id: 29,
    type: "single",
    text: "Câu 29: Sara đang cần tổ chức 1 cuộc họp nhân viên để thảo luận cách mà nội quy mới nên được thực hiện. Sara liên quan đến phần nào của tiến trình giao tiếp.",
    options: [
      "A. Chọn kênh truyền thông (truyền thông điệp)",
      "B. Giải mã thông điệp (chuyển thông điệp)",
      "C. Hình thành ý tưởng (có ý tưởng)",
      "D. Mã hoá thông điệp (chuyển ý tưởng thành thông điệp)"
    ],
    correctAnswers: ["A. Chọn kênh truyền thông (truyền thông điệp)"],
    explanation: "Việc quyết định tổ chức \"Cuộc họp\" chính là việc lựa chọn Kênh (Channel) để truyền tải thông tin.",
    slideRef: "Page 5"
  },
  {
    id: 30,
    type: "single",
    text: "Câu 30: Đâu là những hình thức và dấu hiệu biểu hiện của ngữ điệu trong giao tiếp?",
    options: [
      "A. Những biểu hiện trên khuôn mặt.",
      "B. Những biến đổi của âm điệu.",
      "C. Sự co giãn của đồng tử.",
      "D. Những cử động của tay."
    ],
    correctAnswers: ["B. Những biến đổi của âm điệu."],
    explanation: "Ngữ điệu (Intonation/Paralinguistic) liên quan đến cao độ, âm lượng, tốc độ của giọng nói.",
    slideRef: "Page 6"
  },
  {
    id: 31,
    type: "single",
    text: "Câu 31: Truyền thông giao tiếp không lời khác với giao tiếp bằng lời:",
    options: [
      "A. Dễ học",
      "B. Cấu trúc không chặt, tự phát và vô ý thức",
      "C. Không tự phát",
      "D. Ý thức được"
    ],
    correctAnswers: ["B. Cấu trúc không chặt, tự phát và vô ý thức"],
    explanation: "Giao tiếp phi ngôn ngữ thường xảy ra trong vô thức (Subconscious) và khó kiểm soát giả tạo hơn lời nói.",
    slideRef: "Page 6"
  },
  {
    id: 32,
    type: "single",
    text: "Câu 32: Ánh mắt trong truyền thông không lời là nguồn diễn tả:",
    options: [
      "A. Sự đáng tin cậy và cảm xúc",
      "B. Thái độ",
      "C. Cường độ cảm nghĩ",
      "D. Cá tính con người"
    ],
    correctAnswers: ["A. Sự đáng tin cậy và cảm xúc"],
    explanation: "\"Đôi mắt là cửa sổ tâm hồn\", thể hiện sự chân thành (tin cậy) và cảm xúc thật.",
    slideRef: "Page 6"
  },
  {
    id: 33,
    type: "single",
    text: "Câu 33: Cách tốt nhất để kiểm tra xem thông tin có được hiểu đúng nghĩa không là?",
    options: [
      "A. Quan sát ngôn ngữ cơ thể của người nghe.",
      "B. Chỉ khi nào người nghe đặt câu hỏi, bạn mới biết họ hiểu bạn.",
      "C. Đặt các câu hỏi mở cho người nghe",
      "D. Hỏi người nghe xem họ có hiểu bạn không."
    ],
    correctAnswers: ["C. Đặt các câu hỏi mở cho người nghe"],
    explanation: "Đặt câu hỏi mở (Open-ended questions) buộc người nghe phải diễn giải lại ý hiểu của họ, thay vì chỉ trả lời Có/Không (như đáp án D).",
    slideRef: "Page 6"
  },
  {
    id: 34,
    type: "single",
    text: "Câu 34: Những hình thức căn bản của truyền thông giao tiếp bao gồm:",
    options: [
      "A. Truyền thông giao tiếp không lời",
      "B. Truyền thông giao tiếp bằng lời",
      "C. Truyền thông giao tiếp không lời vả bằng lời",
      "D. Tất cả đều sai"
    ],
    correctAnswers: ["C. Truyền thông giao tiếp không lời vả bằng lời"],
    explanation: "Giao tiếp trọn vẹn luôn bao gồm cả Verbal (Lời nói/Viết) và Non-verbal (Phi ngôn ngữ).",
    slideRef: "Page 6"
  },
  {
    id: 35,
    type: "single",
    text: "Câu 35: Khi bạn nhận được ý kiến phản đối từ người khác, bạn sẽ:",
    options: [
      "A. Đơn giản bạn chỉ nói với họ rằng bạn đã làm đúng.",
      "B. Tập trung vào những điều bạn không thích ở họ.",
      "C. Quan tâm đến những gì họ nói và xin lời khuyên từ họ."
    ],
    correctAnswers: ["C. Quan tâm đến những gì họ nói và xin lời khuyên từ họ."],
    explanation: "Thái độ cầu thị, lắng nghe phản hồi (Feedback) giúp giải quyết mâu thuẫn và phát triển.",
    slideRef: "Page 7"
  },
  {
    id: 36,
    type: "multiple",
    text: "Câu 36: Ưu điểm của việc giao tiếp qua điện thoại là gì?",
    options: [
      "A. Bạn có thể tránh việc gặp mặt trực tiếp.",
      "B. Bạn có khả năng tiếp cận với nhiều người chỉ trong một khoảng thời gian ngắn.",
      "C. Bạn có thể tiết kiệm được thời gian và công sức đi lại."
    ],
    correctAnswers: [
      "A. Bạn có thể tránh việc gặp mặt trực tiếp.",
      "B. Bạn có khả năng tiếp cận với nhiều người chỉ trong một khoảng thời gian ngắn.",
      "C. Bạn có thể tiết kiệm được thời gian và công sức đi lại."
    ],
    explanation: "Lợi ích kinh tế và thời gian (Efficiency) là ưu điểm lớn nhất của điện thoại so với gặp mặt trực tiếp.",
    slideRef: "Page 7"
  },
  {
    id: 37,
    type: "single",
    text: "Câu 37: Theo bạn đâu là tư thế ngồi thể hiện bạn là người lắng nghe chuyên nghiệp?",
    options: [
      "A. Mắt nhìn thẳng, người ngả về phía trước",
      "B. Mắt nhìn thẳng, tay để trên bàn",
      "C. Mắt nhìn thẳng, lưng tựa vào ghế, chân vắt chéo",
      "D. Mắt nhìn thẳng, người hướng về phía trước, tay để trên bàn, đầu gật theo lời kể"
    ],
    correctAnswers: ["D. Mắt nhìn thẳng, người hướng về phía trước, tay để trên bàn, đầu gật theo lời kể"],
    explanation: "Tư thế này thể hiện sự tập trung cao độ (Attentiveness) và tôn trọng người nói.",
    slideRef: "Page 7"
  },
  {
    id: 38,
    type: "single",
    text: "Câu 38: Giao tiếp trực tiếp có những lợi ích gì hơn so với giao tiếp qua điện thoại?",
    options: [
      "A. Những thông tin phức tạp được truyền tải chính xác hơn.",
      "B. Thông tin được truyền tải tại một thời điểm và không gian cụ thể.",
      "C. Người giao tiếp không bị mất tập trung.",
      "D. Tất cả đều đúng"
    ],
    correctAnswers: ["D. Tất cả đều đúng"],
    explanation: "Giao tiếp trực tiếp có đầy đủ kênh phi ngôn ngữ, ngữ cảnh và sự tập trung tốt hơn.",
    slideRef: "Page 7"
  },
  {
    id: 39,
    type: "single",
    text: "Câu 39: Bạn hãy chọn lời phát biểu chính xác nhất sau đây:",
    options: [
      "A. Các giám đốc nên thẩm định, phán xét khi lắng nghe các nhân viên",
      "B. Để tiết kiệm thời gian, các giám đốc không nên quá chăm chú lắng nghe khi nhân viên nói",
      "C. Tất cả các tổ chức bị buộc phải lắng nghe nhân viên của họ",
      "D. Những tổ chức biết lắng nghe nhân viên thường thu được nhiều lợi điểm, chẳng hạn như tinh thần và năng suất cao hơn"
    ],
    correctAnswers: ["D. Những tổ chức biết lắng nghe nhân viên thường thu được nhiều lợi điểm, chẳng hạn như tinh thần và năng suất cao hơn"],
    explanation: "Lắng nghe nhân viên giúp tăng sự gắn kết (Engagement) và hiệu suất làm việc.",
    slideRef: "Page 7"
  },
  {
    id: 40,
    type: "single",
    text: "Câu 40: Bạn cần bao nhiêu giây để có thể thu hút sự chú ý của người nghe bằng giọng nói và ngôn từ của bạn khi giao tiếp qua điện thoại?",
    options: [
      "A. 3 giây",
      "B. 4 giây",
      "C. 5 giây",
      "D. 6 giây"
    ],
    correctAnswers: ["B. 4 giây"],
    explanation: "Quy tắc 4 giây đầu tiên trong Telesales/Telemarketing để gây ấn tượng trước khi khách hàng dập máy.",
    slideRef: "Page 7"
  },
  {
    id: 41,
    type: "single",
    text: "Câu 41: Ấn tượng đầu tiên bạn ghi điểm với người giao tiếp với mình là yếu tố nào sau đây?",
    options: [
      "A. Cách mở đầu câu chuyện của bạn",
      "B. Lời chào thân ái",
      "C. Cách nói chuyện hài hước",
      "D. Dáng điệu, cử chỉ và trang phục"
    ],
    correctAnswers: ["D. Dáng điệu, cử chỉ và trang phục"],
    explanation: "",
    slideRef: "Page 8"
  },
  {
    id: 42,
    type: "single",
    text: "Câu 42: Đâu là cách tốt nhất để chắc chắn rằng bạn đã hoàn toàn hiểu thông điệp của một ai đó?",
    options: [
      "A. Xem xét ngữ cảnh mà người đó đang nói.",
      "B. Xem xét giọng điệu của người nói.",
      "C. Ghi chép hết những gì người nói trình bày",
      "D. Sử dụng ngữ điệu phù hợp để trình bày lại thông điệp của người nói."
    ],
    correctAnswers: ["D. Sử dụng ngữ điệu phù hợp để trình bày lại thông điệp của người nói."],
    explanation: "",
    slideRef: "Page 8"
  },
  {
    id: 43,
    type: "single",
    text: "Câu 43: Kỹ năng lắng nghe hiệu quả sẽ giúp bạn điều gì trong quá trình giao tiếp?",
    options: [
      "A. Giúp bạn thấu hiểu thông điệp một cách trọn vẹn",
      "B. Khiến người nghe nghĩ rằng bạn hiểu những gì họ đang nói",
      "C. Chủ động hơn trong giao tiếp",
      "D. Giúp bạn gây ấn tượng với mọi người nhờ kiến thức sâu rộng của mình"
    ],
    correctAnswers: ["A. Giúp bạn thấu hiểu thông điệp một cách trọn vẹn"],
    explanation: "",
    slideRef: "Page 8"
  },
  {
    id: 44,
    type: "single",
    text: "Câu 44: Khi bạn thảo luận về một chủ đề, bạn nên:",
    options: [
      "A. Tập trung vào những mặt xấu của vấn đề.",
      "B. Tập trung vào những lời phê bình.",
      "C. Tập trung vào những mặt tốt của vấn đề."
    ],
    correctAnswers: ["C. Tập trung vào những mặt tốt của vấn đề."],
    explanation: "",
    slideRef: "Page 8"
  },
  {
    id: 45,
    type: "single",
    text: "Câu 45: Truyền thông giao tiếp là tiến trình có:",
    options: [
      "A. Một chiều",
      "B. Hai chiều",
      "C. Ba chiều",
      "D. Bốn chiều"
    ],
    correctAnswers: ["B. Hai chiều"],
    explanation: "",
    slideRef: "Page 8"
  },
  // --- PAGE 9 ---
  {
    id: 46,
    type: "single",
    text: "Câu 46: Nếu đồng nghiệp của bạn càng ngày càng mập, bạn sẽ:",
    options: [
      "A. Nói với người khác rằng anh/chị ấy trông quá mập.",
      "B. Nói với người khác rằng anh/chị ấy thay đổi nhiều kể từ lúc gặp.",
      "C. Không nói gì cả."
    ],
    correctAnswers: ["C. Không nói gì cả."],
    explanation: "",
    slideRef: "Page 9"
  },
  {
    id: 47,
    type: "single",
    text: "Câu 47: Muốn truyền đạt thông tin, bạn cần phải:",
    options: [
      "A. Phát triển các loại kỹ năng, chuẩn bị toàn diện, thể hiện sự tự tin vào đề tài của bạn và tự tin vào chính bạn",
      "B. Phát triển các loại kỹ năng. chuẩn bị toàn diện, và hãy là chính mình",
      "C. Phát triển các loại kỹ năng. chuẩn bị toàn diện, thể hiện sự tự tin vào đề tài của bạn & tự tin vào chính bạn, và hãy là chính mình",
      "D. Phát triển các loại kỹ năng, chuẩn bị toàn diện, và thể hiện sự tự tin vào mình"
    ],
    correctAnswers: ["C. Phát triển các loại kỹ năng. chuẩn bị toàn diện, thể hiện sự tự tin vào đề tài của bạn & tự tin vào chính bạn, và hãy là chính mình"],
    explanation: "",
    slideRef: "Page 9"
  },
  {
    id: 48,
    type: "single",
    text: "Câu 48: Khi đang lắng nghe người khác nói, bạn thường:",
    options: [
      "A. Đứng tựa lưng, cách xa người nói.",
      "B. Hơi nghiêng người về phía trước và đứng đối diện với người nói.",
      "C. Khoanh tay trước ngực."
    ],
    correctAnswers: ["B. Hơi nghiêng người về phía trước và đứng đối diện với người nói."],
    explanation: "",
    slideRef: "Page 9"
  },
  {
    id: 49,
    type: "single",
    text: "Câu 49: Những ý tưởng quan trọng cần nhấn mạnh nhất được đặt....",
    options: [
      "A. Ở đầu câu",
      "B. Ở giữa câu",
      "C. Hoặc ở giữa câu hoặc ở cuối câu",
      "D. Ở giữa đoạn văn"
    ],
    correctAnswers: ["A. Ở đầu câu"],
    explanation: "",
    slideRef: "Page 9"
  },
  {
    id: 50,
    type: "single",
    text: "Câu 50: Khi nhận được những ý kiến phản hồi tiêu cực, bạn sẽ:",
    options: [
      "A. Nổi giận và bảo vệ quan điểm của mình.",
      "B. Phủ nhận vấn đề, xin lỗi hoặc biện hộ cho sự thiếu hiểu biết của mình.",
      "C. Ghi nhận và tìm cách cải thiện vấn đề."
    ],
    correctAnswers: ["C. Ghi nhận và tìm cách cải thiện vấn đề."],
    explanation: "",
    slideRef: "Page 9"
  },
  {
    id: 51,
    type: "single",
    text: "Câu 51: Khi bạn gặp một người lần đầu, chúng ta sẽ:",
    options: [
      "A. Đợi người khác giới thiệu.",
      "B. Vui mừng và ôm chặt người đó.",
      "C. Sẽ mỉm cười, tự giới thiệu và chủ động bắt tay."
    ],
    correctAnswers: ["C. Sẽ mỉm cười, tự giới thiệu và chủ động bắt tay."],
    explanation: "",
    slideRef: "Page 9"
  },
  // --- PAGE 10 ---
  {
    id: 52,
    type: "single",
    text: "Câu 52: Tại sao khi giao tiếp bạn nên tập trung vào ngôn ngữ hành vi và các biểu hiện của cơ thể?",
    options: [
      "A. Ngôn ngữ hành vi phụ thuộc vào văn hóa",
      "B. Rất ít thông điệp được truyền đạt qua hành vi",
      "C. Ngôn ngữ hành vi thường khó hiểu",
      "D. Cử chỉ và hành vi truyền đạt thông điệp quan trọng"
    ],
    correctAnswers: ["D. Cử chỉ và hành vi truyền đạt thông điệp quan trọng"],
    explanation: "",
    slideRef: "Page 10"
  },
  {
    id: 53,
    type: "single",
    text: "Câu 53: Để tăng khả năng nhớ thông tin người nghe nên......",
    options: [
      "A. Kiên nhẫn với người nói",
      "B. Giữ thái độ tin cậy về thông tin & người nói",
      "C. Diễn giải ý tưởng then chốt trong thông tin đó",
      "D. Khoan dung với những ý tưởng của người nói"
    ],
    correctAnswers: ["B. Giữ thái độ tin cậy về thông tin & người nói"],
    explanation: "",
    slideRef: "Page 10"
  },
  {
    id: 54,
    type: "single",
    text: "Câu 54: Trong khi nghe:",
    options: [
      "A. Bạn nghe và giữ bình tĩnh trước mọi tình huống.",
      "B. Bạn lắng nghe để hiểu rõ ý nghĩa và hỏi lại nếu cần",
      "C. Bạn nhìn chăm chú, vờ như đang nghe."
    ],
    correctAnswers: ["B. Bạn lắng nghe để hiểu rõ ý nghĩa và hỏi lại nếu cần"],
    explanation: "",
    slideRef: "Page 10"
  },
  {
    id: 55,
    type: "single",
    text: "Câu 55: ..... là hoạt động xác lập và vận hành các mối quan hệ xã hội giữa người với người, hoặc giữa người với các yếu tố xã hội nhằm thỏa mãn những nhu cầu nhất định:",
    options: [
      "A. Giao tiếp",
      "B. Truyền thông",
      "C. Thuyết phục",
      "D. Thương lượng"
    ],
    correctAnswers: ["A. Giao tiếp"],
    explanation: "",
    slideRef: "Page 10"
  },
  {
    id: 56,
    type: "multiple",
    text: "Câu 56: Khi giao tiếp với cấp dưới, bạn nên tuân thủ những nguyên tắc nào?",
    options: [
      "A. Không cần thiết phải thực hiện lời hứa của mình với họ",
      "B. Khen, chê kịp thời",
      "C. Lắng nghe ý kiến của họ"
    ],
    correctAnswers: [
        "B. Khen, chê kịp thời",
        "C. Lắng nghe ý kiến của họ"
    ],
    explanation: "",
    slideRef: "Page 10"
  },
  {
    id: 57,
    type: "single",
    text: "Câu 57: Yếu tố nào sau đây không ảnh hưởng đến quá trình giao dịch trực tiếp với khách hàng, đối tác giao tiếp với bạn?",
    options: [
      "A. Điệu bộ",
      "B. Cú pháp",
      "C. Giọng nói",
      "D. Cách lựa chọn từ ngữ"
    ],
    correctAnswers: ["B. Cú pháp"],
    explanation: "",
    slideRef: "Page 10"
  },
  // --- PAGE 11 ---
  {
    id: 58,
    type: "single",
    text: "Câu 58: Cách tư duy nào sau đây sẽ luôn giúp bạn thành công hơn trong quá trình giao tiếp?",
    options: [
      "A. Hãy đơn giản hóa vấn đề",
      "B. Luôn xem mình có thể học được gì từ người khác và mình sẽ giao tiếp như thế nào để tốt hơn",
      "C. Xem người khác sai gì để mình trách",
      "D. Luôn nhìn người khác với con mắt tích cực"
    ],
    correctAnswers: ["B. Luôn xem mình có thể học được gì từ người khác và mình sẽ giao tiếp như thế nào để tốt hơn"],
    explanation: "",
    slideRef: "Page 11"
  },
  {
    id: 59,
    type: "single",
    text: "Câu 59: Lựa chọn thời gian truyền thông giao tiếp để:",
    options: [
      "A. Thuận tiện cho khán thính giả",
      "B. Thuận tiện cho cấp trên",
      "C. Tuỳ theo mục tiêu giao tiếp",
      "D. Thuận tiện cho mình"
    ],
    correctAnswers: ["A. Thuận tiện cho khán thính giả"],
    explanation: "",
    slideRef: "Page 11"
  },
  {
    id: 60,
    type: "single",
    text: "Câu 60: Bạn nên tuân theo những chỉ dẫn nào sau đây khi truyền tải thông tin?",
    options: [
      "A. Giải thích lý do thông tin này đóng vai trò quan trọng đối với bạn.",
      "B. Giải thích các thông tin cần thiết để tạo ra một ngữ cảnh cụ thể cho nội dung.",
      "C. Trình bày khái quát nội dung thông tin.",
      "D. Tất cả đều đúng"
    ],
    correctAnswers: ["D. Tất cả đều đúng"],
    explanation: "",
    slideRef: "Page 11"
  },
  {
    id: 61,
    type: "single",
    text: "Câu 61: Lisa đang tham sự 1 cuộc họp quan trọng thay cho sếp của cô ta. Những bước nào sau đây cô nên dùng để giúp cô ghi nhớ những điểm quan trọng ở cuộc họp",
    options: [
      "A. Lisa nên xem xét các thông tin mà cô đã được nghe",
      "B. Lisa nên cố gắng liên quan thông tin đó tới 1 điều gì khác",
      "C. Lisa nên quyết định trước hết điều gì mà cô ta muốn nhớ",
      "D. Tất cả các bước trên"
    ],
    correctAnswers: ["D. Tất cả các bước trên"],
    explanation: "",
    slideRef: "Page 11"
  },
  {
    id: 62,
    type: "single",
    text: "Câu 62: Truyền thông không lời bao gồm:",
    options: [
      "A. Diễn tả trên nét mặt, cử điệu, dáng điệu, diễn đạt bằng lời nói, tính chất của giọng nói và dáng vẻ bề ngoài",
      "B. Diễn tả trên nét mặt, cử điệu, dáng điệu, diễn đạt bằng lời nói, và tính chát của giọng nói",
      "C. Diễn tả trên nét mặt, cử điệu, dáng điệu, diễn đạt bằng lời nói, tính chất của giọng nói, dáng vẻ bề ngoài, ngôn ngữ thân thể và khoảng trống không gian",
      "D. Diễn tả trên nét mặt, cử điệu, dáng điệu, tính chất của giọng nói và dáng vẻ bề ngoài, ngôn ngữ thân thể và khoảng trống không gian"
    ],
    correctAnswers: ["C. Diễn tả trên nét mặt, cử điệu, dáng điệu, diễn đạt bằng lời nói, tính chất của giọng nói, dáng vẻ bề ngoài, ngôn ngữ thân thể và khoảng trống không gian"],
    explanation: "",
    slideRef: "Page 11"
  },
  // --- PAGE 12 ---
  {
    id: 63,
    type: "single",
    text: "Câu 63: Để giao tiếp hiệu quả, nên sử dụng những từ và cụm từ - 'vui lòng'; 'cám ơn'; 'rất vui'; 'xin lỗi'",
    options: [
      "A. Không bao giờ",
      "B. Thường xuyên",
      "C. Thỉnh thoảng"
    ],
    correctAnswers: ["B. Thường xuyên"],
    explanation: "",
    slideRef: "Page 12"
  },
  {
    id: 64,
    type: "single",
    text: "Câu 64: Đáp án nào sau đây mô phỏng chuẩn xác nhất quy trình lắng nghe trong giao tiếp?",
    options: [
      "A. Tập trung – Tham dự - Hiểu - Ghi nhớ - Hồi đáp – Phát triển",
      "B. Tập trung – Hiểu – Hồi đáp",
      "C. Tập trung - Quan sát Hiểu - Hồi đáp Tham dự",
      "D. Tập trung – Hiểu - Tham dự - Hồi đáp – Phát triển"
    ],
    correctAnswers: ["A. Tập trung – Tham dự - Hiểu - Ghi nhớ - Hồi đáp – Phát triển"],
    explanation: "",
    slideRef: "Page 12"
  },
  {
    id: 65,
    type: "single",
    text: "Câu 65: Khi người khác nói với bạn về những điều bất hạnh hoặc những kinh nghiệm buồn, bạn sẽ:",
    options: [
      "A. Không bình luận gì thêm về điều đó.",
      "B. Cố gắng cảm thông với cảm giác của người đó và chứng tỏ rằng họ quá nhạy cảm với tình huống, mọi việc không tồi tệ đến mức như thế.",
      "C. Cố gắng thay đổi chủ đề cuộc nói chuyện."
    ],
    correctAnswers: ["B. Cố gắng cảm thông với cảm giác của người đó và chứng tỏ rằng họ quá nhạy cảm với tình huống, mọi việc không tồi tệ đến mức như thế."],
    explanation: "",
    slideRef: "Page 12"
  },
  {
    id: 66,
    type: "single",
    text: "Câu 66: Đâu là những đặc điểm của tính quyết đoán trong giao tiếp?",
    options: [
      "A. Thái độ kể cả, bề trên",
      "B. Tự tin",
      "C. Khoe khoang",
      "D. Thích cạnh tranh"
    ],
    correctAnswers: ["B. Tự tin"],
    explanation: "",
    slideRef: "Page 12"
  },
  {
    id: 67,
    type: "single",
    text: "Câu 67: Theo bạn các yếu tố nào sau đây sẽ quyết định đến sự thành công của bạn trong quá trình giao tiếp?",
    options: [
      "A. Sự khéo léo trong xử lý tình huống giao tiếp",
      "B. Thông điệp truyền tải rõ ràng",
      "C. Kỹ năng lắng nghe hiệu quả"
    ],
    correctAnswers: ["A. Sự khéo léo trong xử lý tình huống giao tiếp"],
    explanation: "",
    slideRef: "Page 12"
  },
  {
    id: 68,
    type: "single",
    text: "Câu 68: Nói khác với viết vì nó:",
    options: [
      "A. Suy nghĩ lâu",
      "B. Phổ biến hơn",
      "C. Nhanh hơn",
      "D. Nhiều người sử dụng hơn"
    ],
    correctAnswers: ["C. Nhanh hơn"],
    explanation: "",
    slideRef: "Page 13"
  },
  {
    id: 69,
    type: "single",
    text: "Câu 69: Trong các hiện tượng dưới đây, hiện tượng nào là tâm lí?",
    options: [
      "A. Thần kinh căng thẳng như dây đàn sắp đứt.",
      "B. Tim đập như muốn nhảy ra khỏi lồng ngực.",
      "C. Ăn, ngủ đều kém.",
      "D. Bồn chồn như có hẹn với ai."
    ],
    correctAnswers: ["D. Bồn chồn như có hẹn với ai."],
    explanation: "",
    slideRef: "Page 13"
  },
  {
    id: 70,
    type: "single",
    text: "Câu 70: Tâm lí người là:",
    options: [
      "A. Do một lực lượng siêu nhiên nào đó sinh ra.",
      "B. Do não sản sinh ra, tương tự như gan tiết ra mật.",
      "C. Sự phản ánh hiện thực khách quan vào não người, thông qua lăng kính chủ quan.",
      "D. Cả a, b, c."
    ],
    correctAnswers: ["C. Sự phản ánh hiện thực khách quan vào não người, thông qua lăng kính chủ quan."],
    explanation: "",
    slideRef: "Page 13"
  },
  {
    id: 71,
    type: "single",
    text: "Câu 71: Muốn biết tâm lí của con người, chủ thể cần nhìn vào 'con mắt của người ấy'. Điều đó đúng hay sai?",
    options: [
      "A. Điều đó đúng.",
      "B. Điều đó sai.",
      "C. Có khi đúng, có khi sai.",
      "D. Không có phương án trả lời."
    ],
    correctAnswers: ["A. Điều đó đúng."],
    explanation: "",
    slideRef: "Page 13"
  },
  {
    id: 72,
    type: "single",
    text: "Câu 72: Hiện tượng nào dưới đây cho thấy tâm lí tác động đến sinh lý?",
    options: [
      "A. Lo lắng đến mất ngủ.",
      "B. Mệt mỏi không minh mẫn.",
      "C. Mắt kém tri giác kém.",
      "D. Ăn uống đầy đủ giúp cơ thể khỏe mạnh."
    ],
    correctAnswers: ["A. Lo lắng đến mất ngủ."],
    explanation: "",
    slideRef: "Page 13"
  },
  // --- PAGE 14 ---
  {
    id: 73,
    type: "multiple",
    text: "Câu 73: Khi mâu thuẫn nhóm xảy ra, kiểu phản ứng 'Tuân theo' có biểu hiện:",
    options: [
      "A. Trong những tình huống không quen thuộc, tôi để những người tự tin hơn làm lãnh đạo",
      "B. Tránh tiếp xúc với người có quan điểm vững vàng",
      "C. Tôi sẵn sàng để mọi người làm theo cách của họ nếu nó không gây bất tiện cho tôi",
      "D. Cách tốt nhất để tránh bị phản đối là không đưa ra ý kiến của mình"
    ],
    correctAnswers: [
        "A. Trong những tình huống không quen thuộc, tôi để những người tự tin hơn làm lãnh đạo",
        "C. Tôi sẵn sàng để mọi người làm theo cách của họ nếu nó không gây bất tiện cho tôi"
    ],
    explanation: "",
    slideRef: "Page 13"
  },
  {
    id: 74,
    type: "single",
    text: "Câu 74: Hành động tích cực đến họp đúng giờ thể hiện cá nhân có:",
    options: [
      "A. Hợp tác tốt",
      "B. Có trách nhiệm",
      "C. Giao tiếp tốt"
    ],
    correctAnswers: ["B. Có trách nhiệm"],
    explanation: "",
    slideRef: "Page 14"
  },
  {
    id: 75,
    type: "single",
    text: "Câu 75: Đặc điểm của người phản biện",
    options: [
      "A. Chuyên gia phân tích giải pháp để tìm những yếu kém trong các giải pháp đó",
      "B. Có tính cách tự tin và quyết đoán",
      "C. Có khả năng tập hợp sự ủng hộ và khắc phục tư tưởng chủ bại"
    ],
    correctAnswers: ["A. Chuyên gia phân tích giải pháp để tìm những yếu kém trong các giải pháp đó"],
    explanation: "",
    slideRef: "Page 14"
  },
  {
    id: 76,
    type: "single",
    text: "Câu 76: Tiêu chuẩn đánh giá làm việc nhóm liên quan đến đánh giá trình độ chuyên môn, tiếng anh, viết tài liệu, lập kế hoạch, quản lí là thuộc loại tiêu chuẩn:",
    options: [
      "A. Tiêu chuẩn về kĩ năng.",
      "B. Tiêu chuẩn về kết quả làm việc."
    ],
    correctAnswers: ["A. Tiêu chuẩn về kĩ năng."],
    explanation: "",
    slideRef: "Page 14"
  },
  {
    id: 77,
    type: "multiple",
    text: "Câu 77: Những đặc trưng của giai đoạn hoàn thiện",
    options: [
      "A. Các thành viên hoạt động tự do",
      "B. Hợp tác, cởi mở",
      "C. Giao tiếp giữa các thành viên trong nhóm không nhiều",
      "D. Nảy sinh những kỳ vọng không thực tế"
    ],
    correctAnswers: [
        "A. Các thành viên hoạt động tự do",
        "C. Giao tiếp giữa các thành viên trong nhóm không nhiều"
    ],
    explanation: "",
    slideRef: "Page 14"
  },
  {
    id: 78,
    type: "single",
    text: "Câu 78: Để thuyết phục hiệu quả cần đảm bảo những yêu cầu nào dưới đây",
    options: [
      "A. Ngôn ngữ rõ ràng, mạch lạc, phù hợp đối tượng",
      "B. Nhấn mạnh đến quyền lợi, lợi ích của đối tượng",
      "C. Tạo sự tin tưởng, hòa đồng với đối tượng",
      "D. Tất cả những lý do nêu trên"
    ],
    correctAnswers: ["D. Tất cả những lý do nêu trên"],
    explanation: "",
    slideRef: "Page 14"
  },
  {
    id: 79,
    type: "multiple",
    text: "Câu 79: Những đặc trưng của giai đoạn xung đột",
    options: [
      "A. Đặt câu hỏi về mục đích của nhóm",
      "B. Mọi người ít trao đổi",
      "C. Bắt đầu hình thành các phe phái",
      "D. Muốn đẩy vấn đề cho cấp trên"
    ],
    correctAnswers: [
        "C. Bắt đầu hình thành các phe phái",
        "D. Muốn đẩy vấn đề cho cấp trên"
    ],
    explanation: "",
    slideRef: "Page 14"
  },
  // --- PAGE 15 ---
  {
    id: 80,
    type: "single",
    text: "Câu 80: Bản chất của lắng nghe và thấu hiểu là gì?",
    options: [
      "A. Nghe bằng tai, bằng mắt và bằng cả con tim",
      "B. Chỉ nghe một phần của cuộc đối thoại",
      "C. Tập trung toàn bộ vào những lời người khác đang nói",
      "D. Xen vào câu chuyện của người khác những lời cảm thán như Vâng, à, hay đấy...."
    ],
    correctAnswers: ["A. Nghe bằng tai, bằng mắt và bằng cả con tim"],
    explanation: "",
    slideRef: "Page 15"
  },
  // --- SPLIT QUESTION 81 ---
  {
    id: "81a",
    type: "single",
    text: "Câu 81a: Loại công việc: 'Việc quan trọng – khẩn cấp' ưu tiên số mấy?",
    options: ["A. Số 1", "B. Số 2", "C. Số 3", "D. Số 4"],
    correctAnswers: ["A. Số 1"],
    explanation: "",
    slideRef: "Page 15"
  },
  {
    id: "81b",
    type: "single",
    text: "Câu 81b: Loại công việc: 'Việc không quan trọng – khẩn cấp' ưu tiên số mấy?",
    options: ["A. Số 1", "B. Số 2", "C. Số 3", "D. Số 4"],
    correctAnswers: ["C. Số 3"],
    explanation: "",
    slideRef: "Page 15"
  },
  {
    id: "81c",
    type: "single",
    text: "Câu 81c: Loại công việc: 'Việc không quan trọng – không khẩn cấp' ưu tiên số mấy?",
    options: ["A. Số 1", "B. Số 2", "C. Số 3", "D. Số 4"],
    correctAnswers: ["D. Số 4"],
    explanation: "",
    slideRef: "Page 15"
  },
  {
    id: "81d",
    type: "single",
    text: "Câu 81d: Loại công việc: 'Việc quan trọng – không khẩn cấp' ưu tiên số mấy?",
    options: ["A. Số 1", "B. Số 2", "C. Số 3", "D. Số 4"],
    correctAnswers: ["B. Số 2"],
    explanation: "",
    slideRef: "Page 15"
  },
  // -------------------------
  {
    id: 82,
    type: "single",
    text: "Câu 82: Hành động tích cực viết tiêu đề của email rõ ràng, ngắn gọn thể hiện cá nhân có",
    options: [
      "A. Hợp tác tốt",
      "B. Có trách nhiệm",
      "C. Giao tiếp tốt"
    ],
    correctAnswers: ["C. Giao tiếp tốt"],
    explanation: "",
    slideRef: "Page 15"
  },
  {
    id: 83,
    type: "single",
    text: "Câu 83: Trong một số trường hợp, hãy ứng phó với những 'Vũ khí' gây ảnh hưởng trong thuyết phục khi bạn cảm thấy",
    options: [
      "A. Bạn cần chắc chắn rằng, mình thật sự thích và mong muốn có nó (sản phẩm, vật phẩm...)",
      "B. Tất cả những lý do nêu trên",
      "C. Đối tượng làm tất cả vì mục đích trục lợi từ bạn",
      "D. Bạn cần có bằng chứng của riêng mình để tránh sự 'ngu dốt đa nguyên'"
    ],
    correctAnswers: ["B. Tất cả những lý do nêu trên"],
    explanation: "",
    slideRef: "Page 15"
  },
  {
    id: 84,
    type: "multiple",
    text: "Câu 84: Rèn luyện những kỹ năng nào để giúp chúng ta đạt được thành tích cá nhân:",
    options: [
      "A. Quản lý thời gian",
      "B. Tư duy tích cực",
      "C. Kỹ năng đọc, viết thành thạo",
      "D. Xác định mục tiêu cuộc sống"
    ],
    correctAnswers: [
        "A. Quản lý thời gian",
        "B. Tư duy tích cực",
        "D. Xác định mục tiêu cuộc sống"
    ],
    explanation: "",
    slideRef: "Page 15"
  },
  // --- PAGE 16 ---
  {
    id: 85,
    type: "single",
    text: "Câu 85: Những điều nên làm khi chọn cá nhân vào các vai trò cụ thể trong nhóm",
    options: [
      "A. Khẳng định rằng mọi người sẽ phù hợp với vai trò của họ trong nhóm",
      "B. Phác thảo nội dung công việc trước khi trao đổi",
      "C. Dựa vào những lời giới thiệu về năng lực của các thành viên"
    ],
    correctAnswers: ["B. Phác thảo nội dung công việc trước khi trao đổi"],
    explanation: "",
    slideRef: "Page 15"
  },
  {
    id: 86,
    type: "single",
    text: "Câu 86: Trong nghệ thuật thu hút người nghe, để tạo ấn tượng từ cái nhìn đầu tiên, người diễn thuyết cần lưu ý đến:",
    options: [
      "A. Ngoại hình, Năng lực chuyên môn, Tính cách",
      "B. Ngoại hình, Năng lực diễn thuyết, Tính cách",
      "C. Ngoại hình, Năng lực chuyên môn, Phong cách",
      "D. Ngoại hình, Năng lực diễn thuyết, Tác phong"
    ],
    correctAnswers: ["C. Ngoại hình, Năng lực chuyên môn, Phong cách"],
    explanation: "",
    slideRef: "Page 16"
  },
  {
    id: 87,
    type: "single",
    text: "Câu 87: Trước buổi phỏng vấn tuyển dụng, ứng viên cần làm những gì?",
    options: [
      "A. Chuẩn bị hồ sơ; Tìm hiểu công ty, tổ chức; Chuẩn bị các câu hỏi liên liên quan đến công việc đang ứng tuyển",
      "B. Chuẩn bị hồ sơ; Tìm hiểu công ty, tổ chức; Chuẩn bị cho buổi phỏng vấn",
      "C. Chuẩn bị hồ sơ; Tìm đường đển doanh nghiệp; Chuẩn bị cho buổi phỏng vấn",
      "D. Viết đơn xin việc; Tìm hiểu công ty, tổ chức; Chuẩn bị cho buổi phỏng vấn"
    ],
    correctAnswers: ["B. Chuẩn bị hồ sơ; Tìm hiểu công ty, tổ chức; Chuẩn bị cho buổi phỏng vấn"],
    explanation: "",
    slideRef: "Page 16"
  },
  {
    id: 88,
    type: "single",
    text: "Câu 88: Giảng viên giao cho lớp trong 2 ngày phải hoàn thành một bài tiểu luận khoảng 40 trang về đề tài Phân tích hoạt động kinh doanh của một ngành dịch vụ bất kỳ tại Việt Nam (có thể làm theo nhóm hoặc một mình tuỳ theo lựa chọn của mỗi sinh viên). Để làm được bài tiểu luận này, ngoài các kiến thức về tài chính, sinh viên phải có khả năng phân tích các chỉ số, kỹ năng tin học Excel... Nếu là em, em sẽ chọn phương án nào để hoàn thành bài tiểu luận này:",
    options: [
      "A. Làm theo nhóm",
      "B. Không làm vì thời gian quá gấp",
      "C. Làm một mình"
    ],
    correctAnswers: ["A. Làm theo nhóm"],
    explanation: "",
    slideRef: "Page 16"
  },
  {
    id: 89,
    type: "single",
    text: "Câu 89: Theo bạn nguyên tắc cơ bản trong nghệ thuật thuyết phục là:",
    options: [
      "A. Chân thành và đáp ứng mọi nhu cầu của đối tượng",
      "B. Chân thành và Chú ý đến giá trị mà đối tượng quan tâm đến",
      "C. Chú ý đến nhu cầu, thói quen, sở thích của đối tượng",
      "D. Chú ý đến giá trị mà đối tượng quan tâm đến"
    ],
    correctAnswers: ["B. Chân thành và Chú ý đến giá trị mà đối tượng quan tâm đến"],
    explanation: "",
    slideRef: "Page 16"
  },
  {
    id: 90,
    type: "multiple",
    text: "Câu 90: Xác định mục tiêu của nhóm khi thành lập nhóm cần:",
    options: [
      "A. Tất cả các thành viên trong nhóm thống nhất mục tiêu",
      "B. Thảo luận tất cả các phương thức để thực hiện nhiệm vụ",
      "C. Đặt ra các chỉ tiêu đầy thách thức"
    ],
    correctAnswers: [
        "A. Tất cả các thành viên trong nhóm thống nhất mục tiêu",
        "B. Thảo luận tất cả các phương thức để thực hiện nhiệm vụ"
    ],
    explanation: "",
    slideRef: "Page 16"
  },
  // --- PAGE 17 ---
  {
    id: 91,
    type: "multiple",
    text: "Câu 91: Những thông tin cần có trong bản lý lịch cá nhân (CV) là:",
    options: [
      "A. Sở thích và xu hướng cá nhân",
      "B. Thông tin cá nhân",
      "C. Thông tin về các thành viên trong gia đình",
      "D. Kinh nghiệm làm việc",
      "E. Quá trình đào tạo và thành tích cá nhân",
      "F. Thông tin tham khảo"
    ],
    correctAnswers: [
        "A. Sở thích và xu hướng cá nhân",
        "B. Thông tin cá nhân",
        "D. Kinh nghiệm làm việc",
        "E. Quá trình đào tạo và thành tích cá nhân",
        "F. Thông tin tham khảo"
    ],
    explanation: "",
    slideRef: "Page 17"
  },
  {
    id: 92,
    type: "multiple",
    text: "Câu 92: Để tạo ấn tượng trước nhà tuyển dụng, ứng viên cần chuẩn bị những gì?",
    options: [
      "A. Xác định năng lực của bản thân",
      "B. Công bố mức lương cao nhất mà mình từng được hưởng trước đây",
      "C. Tìm hiểu thông tin về công ty",
      "D. Nhận diện những thành tích và kinh nghiệm của bản thân"
    ],
    correctAnswers: [
        "A. Xác định năng lực của bản thân",
        "C. Tìm hiểu thông tin về công ty",
        "D. Nhận diện những thành tích và kinh nghiệm của bản thân"
    ],
    explanation: "",
    slideRef: "Page 17"
  },
  {
    id: 93,
    type: "single",
    text: "Câu 93: Để thuyết phục hiệu quả cần tuân thủ quy trình nào dưới đây",
    options: [
      "A. Tạo sự thích thú-Chọn đúng thời điểm- Khơi gợi tính tư lợi",
      "B. Tạo sự tin tưởng- Tạo sự nhất trí-Tâng bốc có chiến lược",
      "C. Tạo sự tin tưởng- Tạo sự thích thú- Tăng sức thuyết phục",
      "D. Tìm điểm tương đồng- Tăng sức thuyết phục- Tăng sự thú vị"
    ],
    correctAnswers: ["C. Tạo sự tin tưởng- Tạo sự thích thú- Tăng sức thuyết phục"],
    explanation: "",
    slideRef: "Page 17"
  },
  {
    id: 94,
    type: "single",
    text: "Câu 94: Khi trình bày thông tin bằng chữ (text) trên PowerPoint cần đảm bảo",
    options: [
      "A. Tất cả yêu cầu trên",
      "B. Mỗi Slide không quá 6 dòng chữ",
      "C. Chọn chữ tròn (không chân), đậm, cỡ lớn hơn 24",
      "D. Chỉ dùng cụm từ, câu chính để diễn đạt"
    ],
    correctAnswers: ["A. Tất cả yêu cầu trên"],
    explanation: "",
    slideRef: "Page 17"
  },
  {
    id: 95,
    type: "single",
    text: "Câu 95: Những đặc trưng của giai đoạn ổn định",
    options: [
      "A. Nảy sinh những kỳ vọng không thực tế",
      "B. Hợp tác, cởi mở",
      "C. Lắng nghe nhau",
      "D. Mọi người ít trao đổi"
    ],
    correctAnswers: [
        "B. Hợp tác, cởi mở",
        "C. Lắng nghe nhau"
    ],
    explanation: "",
    slideRef: "Page 17"
  },
  // --- PAGE 18 ---
  {
    id: 96,
    type: "single",
    text: "Câu 96: Khi thiết kế các slide, bạn cần phải đảm bảo:",
    options: [
      "A. Mỗi slide gồm 2 phần: Đề mục và nội dung",
      "B. Màu sắc: Màu nền bổ trợ làm nổi hình chứ",
      "C. Tất cả các yêu cầu nêu trên",
      "D. Không dùng quá nhiều hiệu ứng"
    ],
    correctAnswers: [
        "C. Tất cả các yêu cầu nêu trên"
    ],
    explanation: "",
    slideRef: "Page 18"
  },
  {
    id: 97,
    type: "single",
    text: "Câu 97: Người chủ động tập trung nỗ lực của mình vào vòng tròn nào?",
    options: [
      "A. Ngoài vòng tròn ảnh hưởng và trong vòng tròn quan tâm",
      "B. Vòng tròn ảnh hưởng",
      "C. Vòng tròn quan tâm"
    ],
    correctAnswers: [
        "B. Vòng tròn ảnh hưởng"
    ],
    explanation: "",
    slideRef: "Page 18"
  },
  // --- SPLIT QUESTION 98 ---
  {
    id: "98a",
    type: "single",
    text: "Câu 98a: Mô thức 'Tương thuộc' tương ứng với khái niệm nào?",
    options: [
      "A. Mô hình nhận thức thuộc về người khác",
      "B. Mô hình nhận thức thuộc về chúng ta",
      "C. Mô hình nhận thức thuộc về chính tôi"
    ],
    correctAnswers: ["B. Mô hình nhận thức thuộc về chúng ta"],
    explanation: "",
    slideRef: "Page 18"
  },
  {
    id: "98b",
    type: "single",
    text: "Câu 98b: Mô thức 'Phụ thuộc' tương ứng với khái niệm nào?",
    options: [
      "A. Mô hình nhận thức thuộc về người khác",
      "B. Mô hình nhận thức thuộc về chúng ta",
      "C. Mô hình nhận thức thuộc về chính tôi"
    ],
    correctAnswers: ["A. Mô hình nhận thức thuộc về người khác"],
    explanation: "",
    slideRef: "Page 18"
  },
  {
    id: "98c",
    type: "single",
    text: "Câu 98c: Mô thức 'Độc lập' tương ứng với khái niệm nào?",
    options: [
      "A. Mô hình nhận thức thuộc về người khác",
      "B. Mô hình nhận thức thuộc về chúng ta",
      "C. Mô hình nhận thức thuộc về chính tôi"
    ],
    correctAnswers: ["C. Mô hình nhận thức thuộc về chính tôi"],
    explanation: "",
    slideRef: "Page 18"
  },
  // -------------------------
  {
    id: 99,
    type: "multiple",
    text: "Câu 99: Những đặc trưng của giai đoạn hình thành nhóm",
    options: [
      "A. Lòng tin và sự tận tâm thấp",
      "B. Bắt đầu hình thành các phe phái",
      "C. Mọi người ít trao đổi",
      "D. Đặt câu hỏi về mục đích của nhóm"
    ],
    correctAnswers: [
        "A. Lòng tin và sự tận tâm thấp",
        "C. Mọi người ít trao đổi",
        "D. Đặt câu hỏi về mục đích của nhóm"
    ],
    explanation: "",
    slideRef: "Page 18"
  },
  {
    id: 100,
    type: "single",
    text: "Câu 100: Nếu trong trạng thái stress, số suy nghĩ được tạo ra trong não bộ khoảng",
    options: [
      "A. 50.000",
      "B. 30.000",
      "C. 80.000"
    ],
    correctAnswers: ["C. 80.000"],
    explanation: "",
    slideRef: "Page 18"
  },
  {
    id: 101,
    type: "single",
    text: "Câu 101: Việc lập kế hoạch của mỗi cá nhân thường là loại công việc có tính chất như thế nào?",
    options: [
      "A. Quan trọng - Không khẩn cấp",
      "B. Quan trọng - Khẩn cấp",
      "C. Không quan trọng - Không khẩn cấp",
      "D. Không quan trọng - Khẩn cấp"
    ],
    correctAnswers: ["A. Quan trọng - Không khẩn cấp"],
    explanation: "",
    slideRef: "Page 18"
  },
  // --- PAGE 19 ---
  {
    id: 102,
    type: "single",
    text: "Câu 102: Đặc điểm của trưởng nhóm",
    options: [
      "A. Không bao giờ hài lòng với giải pháp không đạt tới mức độ tốt nhất",
      "B. Lập bảng tiến độ theo phương pháp khoa học",
      "C. Có óc phán xét tuyệt vời về tài năng và tính cách của các cá nhân trong nhóm"
    ],
    correctAnswers: ["C. Có óc phán xét tuyệt vời về tài năng và tính cách của các cá nhân trong nhóm"],
    explanation: "",
    slideRef: "Page 19"
  },
  {
    id: 103,
    type: "single",
    text: "Câu 103: Khi trò chuyện với một người nào đó",
    options: [
      "A. Bạn thường là người nói nhiều nhất",
      "B. Bạn thường để người khác nói nhiều hơn",
      "C. Cố gắng cân bằng trong suốt cuộc đối thoại"
    ],
    correctAnswers: ["C. Cố gắng cân bằng trong suốt cuộc đối thoại"],
    explanation: "",
    slideRef: "Page 19"
  },
  // --- SPLIT QUESTION 104 ---
  {
    id: "104a",
    type: "single",
    text: "Câu 104a: 'Não trung tâm' điều khiển gì?",
    options: [
      "A. Điều khiển phản xạ nhanh và tức thời",
      "B. Điều khiển sáng tạo, logic",
      "C. Điều khiển cảm xúc"
    ],
    correctAnswers: ["A. Điều khiển phản xạ nhanh và tức thời"],
    explanation: "",
    slideRef: "Page 19"
  },
  {
    id: "104b",
    type: "single",
    text: "Câu 104c: 'Não giữa' điều khiển gì?",
    options: [
      "A. Điều khiển phản xạ nhanh và tức thời",
      "B. Điều khiển sáng tạo, logic",
      "C. Điều khiển cảm xúc"
    ],
    correctAnswers: ["C. Điều khiển cảm xúc"],
    explanation: "",
    slideRef: "Page 19"
  },
  {
    id: "104c",
    type: "single",
    text: "Câu 104b: 'Vỏ não' điều khiển gì?",
    options: [
      "A. Điều khiển phản xạ nhanh và tức thời",
      "B. Điều khiển sáng tạo, logic",
      "C. Điều khiển cảm xúc"
    ],
    correctAnswers: ["B. Điều khiển sáng tạo, logic"],
    explanation: "",
    slideRef: "Page 19"
  },
  // --- SPLIT QUESTION 105 ---
  {
    id: "105a",
    type: "single",
    text: "Câu 105a: Kỹ năng 'Đánh giá' tương ứng với nội dung nào?",
    options: [
      "A. Chú trọng vào nội dung và áp dụng các kỹ năng suy nghĩ có phê phán để đánh giá",
      "B. Xác định xem ý của người nói thực sự là gì",
      "C. Nghe thông điệp và cố gắng hiểu những điều muốn nói",
      "D. Đưa ra phản hồi mang tính xây dựng",
      "E. Ghi chép hoặc vạch ra những điểm chính"
    ],
    correctAnswers: ["A. Chú trọng vào nội dung và áp dụng các kỹ năng suy nghĩ có phê phán để đánh giá"],
    explanation: "",
    slideRef: "Page 19"
  },
  {
    id: "105b",
    type: "single",
    text: "Câu 105b: Kỹ năng 'Giải thích' tương ứng với nội dung nào?",
    options: [
      "A. Chú trọng vào nội dung và áp dụng các kỹ năng suy nghĩ có phê phán để đánh giá",
      "B. Xác định xem ý của người nói thực sự là gì",
      "C. Nghe thông điệp và cố gắng hiểu những điều muốn nói",
      "D. Đưa ra phản hồi mang tính xây dựng",
      "E. Ghi chép hoặc vạch ra những điểm chính"
    ],
    correctAnswers: ["B. Xác định xem ý của người nói thực sự là gì"],
    explanation: "",
    slideRef: "Page 19"
  },
  {
    id: "105c",
    type: "single",
    text: "Câu 105c: Kỹ năng 'Tiếp nhận' tương ứng với nội dung nào?",
    options: [
      "A. Chú trọng vào nội dung và áp dụng các kỹ năng suy nghĩ có phê phán để đánh giá",
      "B. Xác định xem ý của người nói thực sự là gì",
      "C. Nghe thông điệp và cố gắng hiểu những điều muốn nói",
      "D. Đưa ra phản hồi mang tính xây dựng",
      "E. Ghi chép hoặc vạch ra những điểm chính"
    ],
    correctAnswers: ["C. Nghe thông điệp và cố gắng hiểu những điều muốn nói"],
    explanation: "",
    slideRef: "Page 19"
  },
  {
    id: "105d",
    type: "single",
    text: "Câu 105c: Kỹ năng 'Ghi nhớ' tương ứng với nội dung nào?",
    options: [
      "A. Chú trọng vào nội dung và áp dụng các kỹ năng suy nghĩ có phê phán để đánh giá",
      "B. Xác định xem ý của người nói thực sự là gì",
      "C. Nghe thông điệp và cố gắng hiểu những điều muốn nói",
      "D. Đưa ra phản hồi mang tính xây dựng",
      "E. Ghi chép hoặc vạch ra những điểm chính"
    ],
    correctAnswers: ["E. Ghi chép hoặc vạch ra những điểm chính"],
    explanation: "",
    slideRef: "Page 19"
  },
  {
    id: "105e",
    type: "single",
    text: "Câu 105c: Kỹ năng 'Phản hồi' tương ứng với nội dung nào?",
    options: [
      "A. Chú trọng vào nội dung và áp dụng các kỹ năng suy nghĩ có phê phán để đánh giá",
      "B. Xác định xem ý của người nói thực sự là gì",
      "C. Nghe thông điệp và cố gắng hiểu những điều muốn nói",
      "D. Đưa ra phản hồi mang tính xây dựng",
      "E. Ghi chép hoặc vạch ra những điểm chính"
    ],
    correctAnswers: ["D. Đưa ra phản hồi mang tính xây dựng"],
    explanation: "",
    slideRef: "Page 19"
  },
  // (Lược bớt 105d, 105e để tiết kiệm code, nhưng logic tương tự)
  // --- SPLIT QUESTION 106 ---
  {
    id: "106a",
    type: "single",
    text: "Câu 106a: Phản hồi 'Cố gắng tìm hiểu bản chất vấn đề' cho câu nói 'Bố, con thấy thế là đủ rồi. Học hành chẳng có gì là quan trọng cả!' là?",
    options: [
      "A. Con cảm thấy chán à?",
      "B. Con thực sự thấy chán học à?",
      "C. Con không muốn học nữa à?",
      "D. Con cho là đủ rồi sao? Con nghĩ trường học chẳng có gì quan trọng ư?"
    ],
    correctAnswers: ["B. Con thực sự thấy chán học à?"],
    explanation: "",
    slideRef: "Page 19"
  },
  {
    id: "106b",
    type: "single",
    text: "Câu 106b: Phản hồi 'Bày tỏ cảm xúc' cho câu nói 'Bố, con thấy thế là đủ rồi. Học hành chẳng có gì là quan trọng cả!' là?",
    options: [
      "A. Con cảm thấy chán à?",
      "B. Con thực sự thấy chán học à?",
      "C. Con không muốn học nữa à?",
      "D. Con cho là đủ rồi sao? Con nghĩ trường học chẳng có gì quan trọng ư?"
    ],
    correctAnswers: ["A. Con cảm thấy chán à?"],
    explanation: "",
    slideRef: "Page 19"
  },
  {
    id: "106c",
    type: "single",
    text: "Câu 106c: Phản hồi 'Nhắc lại nguyên văn' cho câu nói 'Bố, con thấy thế là đủ rồi. Học hành chẳng có gì là quan trọng cả!' là?",
    options: [
      "A. Con cảm thấy chán à?",
      "B. Con thực sự thấy chán học à?",
      "C. Con không muốn học nữa à?",
      "D. Con cho là đủ rồi sao? Con nghĩ trường học chẳng có gì quan trọng ư?"
    ],
    correctAnswers: ["D. Con cho là đủ rồi sao? Con nghĩ trường học chẳng có gì quan trọng ư?"],
    explanation: "",
    slideRef: "Page 19"
  },
  {
    id: "106d",
    type: "single",
    text: "Câu 106d: Phản hồi 'Lặp lại nội dung theo kiểu suy diễn' cho câu nói 'Bố, con thấy thế là đủ rồi. Học hành chẳng có gì là quan trọng cả!' là?",
    options: [
      "A. Con cảm thấy chán à?",
      "B. Con thực sự thấy chán học à?",
      "C. Con không muốn học nữa à?",
      "D. Con cho là đủ rồi sao? Con nghĩ trường học chẳng có gì quan trọng ư?"
    ],
    correctAnswers: ["C. Con không muốn học nữa à?"],
    explanation: "",
    slideRef: "Page 19"
  },
  // ... (Tương tự cho các mức độ khác)
  // --- SPLIT QUESTION 107 ---
  {
    id: "107a",
    type: "single",
    text: "Câu 107a:Theo Abert Mehrabian, tỷ lệ của tổng tác dụng của thông điệp 'Ngôn ngữ không lời' là?",
    options: ["A. 38%", "B. 55%", "C. 7%"],
    correctAnswers: ["B. 55%"],
    explanation: "",
    slideRef: "Page 19"
  },
  {
    id: "107b",
    type: "single",
    text: "Câu 107b:Theo Abert Mehrabian, tỷ lệ của tổng tác dụng của thông điệp 'Thanh âm (giọng nói, ngữ điệu, âm khác)' là?",
    options: ["A. 38%", "B. 55%", "C. 7%"],
    correctAnswers: ["C. 7%"],
    explanation: "",
    slideRef: "Page 19"
  },
  {
    id: "107c",
    type: "single",
    text: "Câu 107a:Theo Abert Mehrabian, tỷ lệ của tổng tác dụng của thông điệp 'Lời nói (từ ngữ)' là?",
    options: ["A. 38%", "B. 55%", "C. 7%"],
    correctAnswers: ["A. 38%"],
    explanation: "",
    slideRef: "Page 19"
  },
  // --- PAGE 20 ---
  {
    id: 108,
    type: "multiple",
    text: "Câu 108: Lập kế hoạch giúp cho nhóm",
    options: [
      "A. Đánh giá tiến độ làm việc của mỗi cá nhân",
      "B. Phối hợp mọi nguồn lực của tổ chức hữu hiệu hơn",
      "C. Tập trung vào mục tiêu và chính sách của tổ chức",
      "D. Xác định hệ thống các vấn đề, công việc cần thực hiện để đưa ra các cách quản lý, có thể dùng đến kinh nghiệm đã có"
    ],
    correctAnswers: [
        "B. Phối hợp mọi nguồn lực của tổ chức hữu hiệu hơn",
        "C. Tập trung vào mục tiêu và chính sách của tổ chức",
        "D. Xác định hệ thống các vấn đề, công việc cần thực hiện để đưa ra các cách quản lý, có thể dùng đến kinh nghiệm đã có"
    ],
    explanation: "",
    slideRef: "Page 20"
  },
  {
    id: 109,
    type: "single",
    text: "Câu 109: Hãy chọn đáp án đúng để mô tả phạm vi của vòng tròn ảnh hưởng",
    options: [
      "A. những điều quan tâm và có thể kiểm soát",
      "B. những điều quan tâm",
      "C. những điều quan tâm và không thể kiểm soát"
    ],
    correctAnswers: ["A. những điều quan tâm và có thể kiểm soát"],
    explanation: "",
    slideRef: "Page 20"
  },
  {
    id: 110,
    type: "single",
    text: "Câu 110: Ngôn ngữ hình thể là yếu tố quan trọng trong thuyết trình. Theo bạn, để thu hút người nghe thông qua ngôn ngữ hình thể bạn cần chú ý tới các yếu tố nào dưới đây:",
    options: [
      "A. Ánh mắt- Cử chỉ- Dáng đứng- Dáng đi- Độ gần",
      "B. Ánh mắt- Cử chỉ - Trang phục- Di chuyển- Độ gần",
      "C. Ánh mắt- Cử chỉ- Dáng đứng- Di chuyển- Độ gần",
      "D. Ánh mắt- Động tác- Dáng đứng- Di chuyển- Độ gần"
    ],
    correctAnswers: ["C. Ánh mắt- Cử chỉ- Dáng đứng- Di chuyển- Độ gần"],
    explanation: "",
    slideRef: "Page 20"
  },
  {
    id: 111,
    type: "single",
    text: "Câu 111: Nếu đồng nghiệp của bạn ngày càng mập, bạn sẽ",
    options: [
      "A. Không nói gì cả",
      "B. Nói với người khác rằng anh/chị ấy thay đổi nhiều kể từ lúc gặp",
      "C. Nói với người khác rằng anh/chị ấy trông quá mập"
    ],
    correctAnswers: ["A. Không nói gì cả"],
    explanation: "",
    slideRef: "Page 20"
  },
  {
    id: 112,
    type: "single",
    text: "Câu 112: Mối quan hệ giữa bốn yếu tố căn bản của cuộc sống: ... và ... sẽ đem lại ... thực sự, là chất xúc tác để giải phóng ...",
    options: [
        "A. Khôn ngoan - Năng lực - An toàn - Định hướng",
        "B. An toàn - Định hướng - Khôn ngoan - Năng lực",
        "C. Định hướng - An toàn - Khôn ngoan - Năng lực",
        "D. Định hướng - An toàn - Năng lực - Khôn ngoan"
    ],
    correctAnswers: ["B. An toàn - Định hướng - Khôn ngoan - Năng lực"],
    explanation: "",
    slideRef: "Page 20"
  },
  // --- SPLIT QUESTION 113 ---
  {
    id: "113a",
    type: "single",
    text: "Câu 113a: Nội dung 'Trình bày về bản thân' trong phỏng vấn tương ứng với?",
    options: [
      "A. Tóm tắt các thành tựu cá nhân",
      "B. Nhấn mạnh các kinh nghiệm, kỹ năng, kiến thức đã có, liên quan tới công việc",
      "C. Tìm hiểu về mức lương trên thị trường",
      "D. Lịch sự, quan sát ứng xử của hội đồng"
    ],
    correctAnswers: [],
    explanation: "",
    slideRef: "Page 20"
  },
  {
    id: "113b",
    type: "single",
    text: "Câu 113b: Nội dung 'Giao tiếp với hội đồng phỏng vấn' trong phỏng vấn tương ứng với?",
    options: [
      "A. Tóm tắt các thành tựu cá nhân",
      "B. Nhấn mạnh các kinh nghiệm, kỹ năng, kiến thức đã có, liên quan tới công việc",
      "C. Tìm hiểu về mức lương trên thị trường",
      "D. Lịch sự, quan sát ứng xử của hội đồng"
    ],
    correctAnswers: ["D. Lịch sự, quan sát ứng xử của hội đồng"],
    explanation: "",
    slideRef: "Page 20"
  },
  {
    id: "113c",
    type: "single",
    text: "Câu 113c: Nội dung 'Chỉ ra được điểm mạnh, điểm cần hoàn thiện' trong phỏng vấn tương ứng với?",
    options: [
      "A. Tóm tắt các thành tựu cá nhân",
      "B. Nhấn mạnh các kinh nghiệm, kỹ năng, kiến thức đã có, liên quan tới công việc",
      "C. Tìm hiểu về mức lương trên thị trường",
      "D. Lịch sự, quan sát ứng xử của hội đồng"
    ],
    correctAnswers: ["B. Nhấn mạnh các kinh nghiệm, kỹ năng, kiến thức đã có, liên quan tới công việc"],
    explanation: "",
    slideRef: "Page 20"
  },
  {
    id: "113d",
    type: "single",
    text: "Câu 113d: Nội dung 'Trao đổi về lương, chính sách đãi ngộ' trong phỏng vấn tương ứng với?",
    options: [
      "A. Tóm tắt các thành tựu cá nhân",
      "B. Nhấn mạnh các kinh nghiệm, kỹ năng, kiến thức đã có, liên quan tới công việc",
      "C. Tìm hiểu về mức lương trên thị trường",
      "D. Lịch sự, quan sát ứng xử của hội đồng"
    ],
    correctAnswers: ["C. Tìm hiểu về mức lương trên thị trường"],
    explanation: "",
    slideRef: "Page 20"
  },
  // --- PAGE 21 ---
  {
    id: 114,
    type: "single",
    text: "Câu 114: Chứng bệnh thuộc về thể chất có nguồn gốc từ tinh thần chiếm khoảng:",
    options: [
      "A. 75%-90%",
      "B. 30%-50%",
      "C. 65%-80%"
    ],
    correctAnswers: ["A. 75%-90%"],
    explanation: "",
    slideRef: "Page 21"
  },
  {
    id: 115,
    type: "single",
    text: "Câu 115: Mục đích của đánh giá nhóm:",
    options: [
      "A. Thấy được kiến thức, kỹ năng, thái độ làm việc của mỗi viên của mỗi thành viên để điều chỉnh công việc cho phù hợp",
      "B. Thấy được ưu điểm (nhược điểm) của từng thành viên; từ đó phát huy (hoặc cải thiện) những ưu nhược điểm đó",
      "C. Tạo cơ hội để thành viên nhóm bày tỏ quan điểm, suy nghĩ và đề xuất cho bản thân",
      "D. Giúp các thành viên hiểu nhau hơn"
    ],
    correctAnswers: [
        "A. Thấy được kiến thức, kỹ năng, thái độ làm việc của mỗi viên của mỗi thành viên để điều chỉnh công việc cho phù hợp",
        "B. Thấy được ưu điểm (nhược điểm) của từng thành viên; từ đó phát huy (hoặc cải thiện) những ưu nhược điểm đó",
        "C. Tạo cơ hội để thành viên nhóm bày tỏ quan điểm, suy nghĩ và đề xuất cho bản thân",
        "D. Giúp các thành viên hiểu nhau hơn"
    ],
    explanation: "",
    slideRef: "Page 21"
  },
  // --- SPLIT QUESTION 116 ---
  {
    id: "116a",
    type: "single",
    text: "Câu 116a: Tỷ lệ thời gian cho 'Việc không quan trọng – không khẩn cấp'?",
    options: ["A. 20%", "B. 5%", "C. 60%", "D. 10-15%"],
    correctAnswers: ["B. 5%"],
    explanation: "",
    slideRef: "Page 21"
  },
  {
    id: "116b",
    type: "single",
    text: "Câu 116b: Tỷ lệ thời gian cho 'Việc quan trọng – không khẩn cấp'?",
    options: ["A. 20%", "B. 5%", "C. 60%", "D. 10-15%"],
    correctAnswers: ["C. 60%"],
    explanation: "",
    slideRef: "Page 21"
  },
  {
    id: "116c",
    type: "single",
    text: "Câu 116c: Tỷ lệ thời gian cho 'Việc quan trọng – khẩn cấp'?",
    options: ["A. 20%", "B. 5%", "C. 60%", "D. 10-15%"],
    correctAnswers: ["A. 20%"],
    explanation: "",
    slideRef: "Page 21"
  },
  {
    id: "116d",
    type: "single",
    text: "Câu 116d: Tỷ lệ thời gian cho 'Việc không quan trọng – khẩn cấp'?",
    options: ["A. 20%", "B. 5%", "C. 60%", "D. 10-15%"],
    correctAnswers: ["D. 10-15%"],
    explanation: "",
    slideRef: "Page 21"
  },
  {
    id: 117,
    type: "single",
    text: "Câu 117: Đặc điểm của người thực hiện",
    options: [
      "A. Nắm bắt tốt bức tranh tổng thể công việc của nhóm",
      "B. Có khả năng thông tin hai chiều xuất sắc",
      "C. Lập bảng tiến độ theo phương pháp khoa học"
    ],
    correctAnswers: ["C. Lập bảng tiến độ theo phương pháp khoa học"],
    explanation: "",
    slideRef: "Page 21"
  },
  {
    id: 118,
    type: "single",
    text: "Câu 118: Hành động tích cực Làm rõ những điểm chưa rõ trong phân công công việc của mình thể hiện cá nhân có",
    options: [
      "A. Có trách nhiệm",
      "B. Giao tiếp tốt",
      "C. Hợp tác tốt"
    ],
    correctAnswers: ["A. Có trách nhiệm"],
    explanation: "",
    slideRef: "Page 21"
  },
  {
    id: 119,
    type: "single",
    text: "Câu 119: Hãy chọn đáp án đúng để mô tả phạm vi của vòng tròn quan tâm",
    options: [
      "A. những điều quan tâm và có thể kiểm soát",
      "B. những điều quan tâm và không thể kiểm soát",
      "C. những điều quan tâm"
    ],
    correctAnswers: ["C. những điều quan tâm"],
    explanation: "",
    slideRef: "Page 21"
  },
  // --- PAGE 22 ---
  {
    id: 120,
    type: "multiple",
    text: "Câu 120: Xác định mục tiêu cần đảm bảo nguyên tắc SMART, đó là những nội dung gì:",
    options: [
      "A. Cụ thể",
      "B. Khả thi",
      "C. Đo lường được",
      "D. Thích hợp",
      "E. Hiệu quả",
      "F. Thời hạn"
    ],
    correctAnswers: [
        "A. Cụ thể",
        "B. Khả thi",
        "C. Đo lường được",
        "D. Thích hợp",
        "F. Thời hạn"
    ],
    explanation: "",
    slideRef: "Page 22"
  },
  {
    id: 121,
    type: "single",
    text: "Câu 121: Bạn hãy chọn lời phát biểu chính xác nhất sau đây về làm việc nhóm:",
    options: [
      "A. Sự thỏa mãn cá nhân và tinh thần làm việc gia tăng khi đội/nhóm thành công",
      "B. Đội/nhóm có khuynh hướng làm ít có hiệu quả trong việc giải quyết vấn đề hơn là cá nhân",
      "C. Đội/nhóm đòi hỏi nhiều nguồn lực để hoàn thành nhiệm vụ hơn từng cá nhân",
      "D. Những nhân viên làm việc trong đội/nhóm báo cáo sự thỏa mãn công việc giảm sút đi"
    ],
    correctAnswers: ["A. Sự thỏa mãn cá nhân và tinh thần làm việc gia tăng khi đội/nhóm thành công"],
    explanation: "",
    slideRef: "Page 22"
  },
  {
    id: 122,
    type: "multiple",
    text: "Câu 122: Khi mâu thuẫn nhóm xảy ra, kiểu phản ứng 'Cộng tác' có biểu hiện:",
    options: [
      "A. Tránh tiếp xúc với người có quan điểm vững vàng.",
      "B. Khi mọi người cùng đóng góp ý tưởng sẽ xuất hiện ý tưởng hay nhất.",
      "C. Cách tốt nhất để tránh bị phản đối là không đưa ra ý kiến của mình",
      "D. Những mâu thuẫn lành mạnh sẽ tạo ra những ý tưởng hay hơn"
    ],
    correctAnswers: [
        "B. Khi mọi người cùng đóng góp ý tưởng sẽ xuất hiện ý tưởng hay nhất.",
        "D. Những mâu thuẫn lành mạnh sẽ tạo ra những ý tưởng hay hơn"
    ],
    explanation: "",
    slideRef: "Page 22"
  },
  {
    id: 123,
    type: "single",
    text: "Câu 123: Hãy điền vào chỗ trống để hoàn thành khái niệm làm việc nhóm: Nhóm là một tập hợp từ ... trở lên có cùng ... (nhiệm vụ, chí hướng, nhu cầu, đam mê, sở thích, thói quen,...)",
    options: [
        "A. 3 người - lý tưởng",
        "B. 2 người - mục tiêu",
        "C. 3 người - mục tiêu",
        "D. 2 người - lý tưởng"
    ],
    correctAnswers: ["B. 2 người - mục tiêu"],
    explanation: "",
    slideRef: "Page 22"
  },
  {
    id: 124,
    type: "single",
    text: "Câu 124: Mô thức nào giúp chúng ta đạt được thành tích cá nhân",
    options: [
      "A. Mô thức phụ thuộc",
      "B. Mô thức độc lập",
      "C. Mô thức tương thuộc"
    ],
    correctAnswers: ["B. Mô thức độc lập"],
    explanation: "",
    slideRef: "Page 22"
  },
  {
    id: 125,
    type: "single",
    text: "Câu 125: Hành động tích cực Hỏi kĩ lại khi không hiểu rõ ý người trình bày thể hiện cá nhân có",
    options: [
      "A. Hợp tác tốt",
      "B. Giao tiếp tốt",
      "C. Có trách nhiệm"
    ],
    correctAnswers: ["B. Giao tiếp tốt"],
    explanation: "",
    slideRef: "Page 22"
  },
  // --- PAGE 23 ---
  {
    id: 126,
    type: "multiple",
    text: "Câu 126: Hậu quả của việc không lắng nghe là:",
    options: [
      "A. Hiểu sai vấn đề",
      "B. Kiềm chế cảm xúc của người nói",
      "C. Không tiếp thu được hoặc tiếp thu được rất ít những thông tin mới",
      "D. Không kích thích được hứng thú của người nói",
      "E. Không nắm được thông tin, lãng phí thời gian của mình và của mọi người"
    ],
    correctAnswers: [
        "A. Hiểu sai vấn đề",
        "C. Không tiếp thu được hoặc tiếp thu được rất ít những thông tin mới",
        "D. Không kích thích được hứng thú của người nói",
        "E. Không nắm được thông tin, lãng phí thời gian của mình và của mọi người"
    ],
    explanation: "",
    slideRef: "Page 23"
  },
  {
    id: 127,
    type: "multiple",
    text: "Câu 127: Những điều cần lưu ý khi viết lý lịch cá nhân (CV) là gì?",
    options: [
      "A. Chú ý đến hình thức của bản lý lịch",
      "B. Cần trung thực khi viết CV",
      "C. Hãy viết bản lý lịch một cách cẩn thận",
      "D. Xác định trước mục tiêu nghề nghiệp của mình",
      "E. Trình bày vắn tắt những kinh nghiệm có liên quan",
      "F. Có nhiều hình ảnh đẹp"
    ],
    correctAnswers: [
        "A. Chú ý đến hình thức của bản lý lịch",
        "B. Cần trung thực khi viết CV",
        "C. Hãy viết bản lý lịch một cách cẩn thận",
        "D. Xác định trước mục tiêu nghề nghiệp của mình",
        "E. Trình bày vắn tắt những kinh nghiệm có liên quan"
    ],
    explanation: "",
    slideRef: "Page 23"
  },
  {
    id: 128,
    type: "multiple",
    text: "Câu 128: Khi đánh giá nhóm, các vấn đề cần quan tâm là:",
    options: [
      "A. Kĩ năng cần đào tạo sau đánh giá",
      "B. Phương pháp đánh giá",
      "C. Ai chịu trách nhiệm đánh giá",
      "D. Chu trình đánh giá"
    ],
    correctAnswers: [
        "A. Kĩ năng cần đào tạo sau đánh giá",
        "B. Phương pháp đánh giá",
        "D. Chu trình đánh giá"
    ],
    explanation: "",
    slideRef: "Page 23"
  },
  {
    id: 129,
    type: "single",
    text: "Câu 129: Điều kiện lựa chọn trọng tâm bản thân: Điều lý tưởng là tạo ra một trọng tâm rõ ràng để bạn có thể đạt được an toàn, định hướng, không ngoan và năng lực ở ... nhằm luôn giúp ... cũng như kết hợp ... mọi mặt của cuộc sống",
    options: [
        "A. Mức độ cao - chủ động - hài hoà",
        "B. Mức độ vừa phải - chủ động - hài hoà",
        "C. Mức độ cao - chủ động - trọn vẹn",
        "D. Mức độ vừa phải - chủ động - hài hoà"
    ],
    correctAnswers: ["A. Mức độ cao - chủ động - hài hoà"],
    explanation: "",
    slideRef: "Page 23"
  },
  {
    id: 130,
    type: "single",
    text: "Câu 130: Hành động tích cực Nói rõ cho đối tác biết việc họ không hoàn thành đúng hạn ảnh hưởng thế nào đến kết quả chung thể hiện cá nhân có",
    options: [
      "A. Có trách nhiệm",
      "B. Hợp tác tốt",
      "C. Giao tiếp tốt"
    ],
    correctAnswers: ["B. Hợp tác tốt"],
    explanation: "",
    slideRef: "Page 23"
  },
  {
    id: 131,
    type: "single",
    text: "Câu 131: Người bị động tập trung nỗ lực của mình vào vòng tròn nào?",
    options: [
      "A. Vòng tròn ảnh hưởng",
      "B. Ngoài vòng tròn ảnh hưởng và trong vòng tròn quan tâm",
      "C. Vòng tròn quan tâm"
    ],
    correctAnswers: ["C. Vòng tròn quan tâm"],
    explanation: "",
    slideRef: "Page 24"
  },
  // --- SPLIT QUESTION 132 ---
  {
    id: "132a",
    type: "single",
    text: "Câu 132a: Thế hệ quản trị thời gian thứ nhất là gì?",
    options: [
      "A. Các mảnh giấy ghi chú hay các bảng liệt kê công việc",
      "B. Lịch công tác và sổ ghi chép các cuộc hẹn",
      "C. Xác định thứ tự ưu tiền, các giá trị của mọi hoạt động",
      "D. Lấy nguyên tắc làm trọng tâm và quản lý bản thân"
    ],
    correctAnswers: ["A. Các mảnh giấy ghi chú hay các bảng liệt kê công việc"],
    explanation: "",
    slideRef: "Page 24"
  },
  {
    id: "132b",
    type: "single",
    text: "Câu 132b: Thế hệ quản trị thời gian thứ hai là gì?",
    options: [
      "A. Các mảnh giấy ghi chú hay các bảng liệt kê công việc",
      "B. Lịch công tác và sổ ghi chép các cuộc hẹn",
      "C. Xác định thứ tự ưu tiền, các giá trị của mọi hoạt động",
      "D. Lấy nguyên tắc làm trọng tâm và quản lý bản thân"
    ],
    correctAnswers: ["B. Lịch công tác và sổ ghi chép các cuộc hẹn"],
    explanation: "",
    slideRef: "Page 24"
  },
  {
    id: "132c",
    type: "single",
    text: "Câu 132c: Thế hệ quản trị thời gian thứ ba là gì?",
    options: [
      "A. Các mảnh giấy ghi chú hay các bảng liệt kê công việc",
      "B. Lịch công tác và sổ ghi chép các cuộc hẹn",
      "C. Xác định thứ tự ưu tiền, các giá trị của mọi hoạt động",
      "D. Lấy nguyên tắc làm trọng tâm và quản lý bản thân"
    ],
    correctAnswers: ["C. Xác định thứ tự ưu tiền, các giá trị của mọi hoạt động"],
    explanation: "",
    slideRef: "Page 24"
  },
  {
    id: "132d",
    type: "single",
    text: "Câu 132d: Thế hệ quản trị thời gian thứ tư là gì?",
    options: [
      "A. Các mảnh giấy ghi chú hay các bảng liệt kê công việc",
      "B. Lịch công tác và sổ ghi chép các cuộc hẹn",
      "C. Xác định thứ tự ưu tiền, các giá trị của mọi hoạt động",
      "D. Lấy nguyên tắc làm trọng tâm và quản lý bản thân"
    ],
    correctAnswers: ["D. Lấy nguyên tắc làm trọng tâm và quản lý bản thân"],
    explanation: "",
    slideRef: "Page 24"
  },
  // -------------------------
  {
    id: 133,
    type: "single",
    text: "Câu 133: Kỹ năng nào sau đây chỉ có được khi cá nhân có mô thức độc lập:",
    options: [
      "A. Lắng nghe & Thấu hiểu",
      "B. Chủ động - tích cực",
      "C. Thuyết phục",
      "D. Hợp tác cộng sinh"
    ],
    correctAnswers: ["B. Chủ động - tích cực"],
    explanation: "",
    slideRef: "Page 24"
  },
  {
    id: 134,
    type: "single",
    text: "Câu 134: Phương pháp nào sau đây là của công cụ Kiểm soát suy nghĩ",
    options: [
      "A. Quan sát tách rời",
      "B. Lắng nghe tiếng nói bên trong",
      "C. Xem khó khăn là bài học"
    ],
    correctAnswers: ["A. Quan sát tách rời"],
    explanation: "",
    slideRef: "Page 24"
  },
  {
    id: 135,
    type: "single",
    text: "Câu 135: Sắp xếp trình tự đúng để mô tả dòng năng lượng tâm trí chạy trong não bộ",
    options: [
      "A. Não trung tâm -> Não giữa -> Vỏ não",
      "B. Vỏ não -> Não giữa -> Não trung tâm",
      "C. Não trung tâm -> Vỏ não -> Não giữa"
    ],
    correctAnswers: ["A. Não trung tâm -> Não giữa -> Vỏ não"],
    explanation: "",
    slideRef: "Page 24"
  },
  {
    id: 136,
    type: "multiple",
    text: "Câu 136: Những điều gì nên làm để lắng nghe hiệu quả?",
    options: [
      "A. Có ngôn ngữ cử chỉ phù hợp",
      "B. Nghe đầy đủ",
      "C. Nhìn người nói",
      "D. Ngắt lời",
      "E. Đưa ra nhiều lời khuyên",
      "F. Lắng nghe bằng trái tim"
    ],
    correctAnswers: [
        "A. Có ngôn ngữ cử chỉ phù hợp",
        "B. Nghe đầy đủ",
        "C. Nhìn người nói",
        "F. Lắng nghe bằng trái tim"
    ],
    explanation: "",
    slideRef: "Page 24"
  },
  // --- PAGE 25 ---
  {
    id: 137,
    type: "single",
    text: "Câu 137: Khi mâu thuẫn nhóm xảy ra, kiểu phản ứng 'Đương đầu' có biểu hiện:",
    options: [
      "A. Cách tốt nhất để tránh bị phản đối là không đưa ra ý kiến của mình",
      "B. Điều quan trọng là cần phải đấu tranh để đưa ra ý kiến của mình",
      "C. Sẵn sàng để mọi người làm theo cách của họ nếu nó không gây bất tiện cho tôi.",
      "D. Không ngại trình bày dứt khoát quan điểm nếu tôi cảm nhận rõ ràng về vấn đề đó"
    ],
    correctAnswers: [
        "B. Điều quan trọng là cần phải đấu tranh để đưa ra ý kiến của mình",
        "D. Không ngại trình bày dứt khoát quan điểm nếu tôi cảm nhận rõ ràng về vấn đề đó"
    ],
    explanation: "",
    slideRef: "Page 25"
  },
  {
    id: 138,
    type: "multiple",
    text: "Câu 138: Khi mâu thuẫn nhóm xảy ra, kiểu phản ứng 'Né tránh' có biểu hiện:",
    options: [
      "A. Giải quyết công việc của mình hơn là cố gắng thay đổi mọi thứ.",
      "B. Cách tốt nhất để tránh bị phản đối là không đưa ra ý kiến của mình",
      "C. Tránh tiếp xúc với người có quan điểm vững vàng",
      "D. Sẵn sàng để mọi người làm theo cách của họ nếu nó không gây bất tiện cho tôi"
    ],
    correctAnswers: [
        "A. Giải quyết công việc của mình hơn là cố gắng thay đổi mọi thứ.",
        "B. Cách tốt nhất để tránh bị phản đối là không đưa ra ý kiến của mình",
        "C. Tránh tiếp xúc với người có quan điểm vững vàng"
    ],
    explanation: "",
    slideRef: "Page 25"
  },
  {
    id: 139,
    type: "single",
    text: "Câu 139: Trình tự các giai đoạn phát triển nhóm (Tuckman)",
    options: [
      "A. Hình thành - Xung đột - Ổn định - Hoàn thiện",
      "B. Hình thành - Ổn định - Xung đột - Hoàn thiện",
      "C. Hình thành - Xung đột - Hoàn thiện - Ổn định",
      "D. Hình thành - Ổn định - Hoàn thiện - Xung đột"
    ],
    correctAnswers: ["A. Hình thành - Xung đột - Ổn định - Hoàn thiện"],
    explanation: "",
    slideRef: "Page 25"
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full text-center border-t-8 border-purple-600">
        <div className="mb-6 flex justify-center">
          <Zap size={64} className="text-purple-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Môn: Kỹ Năng Mềm</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-8 text-left max-w-lg mx-auto">
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
            <Clock className="text-purple-600" />
            <div>
              <p className="font-bold text-gray-900">Thời gian</p>
              <p className="text-sm text-gray-600">60 phút</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
            <LayoutGrid className="text-purple-600" />
            <div>
              <p className="font-bold text-gray-900">Số câu hỏi</p>
              <p className="text-sm text-gray-600">139 câu (Từ file PDF)</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-left bg-gray-100 p-6 rounded-lg mb-8 text-sm text-gray-700">
          <p className="font-bold text-red-600">⚠️ Lưu ý làm bài:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Đề này gồm 139 câu hỏi trắc nghiệm Kỹ năng mềm để ôn tập cuối kỳ.</li>
            <li>Câu hỏi Multi-select (Chọn nhiều) sẽ tính điểm theo luật: <strong>Sai 1 ý = 0 điểm</strong>.</li>
            <li>Đây là đề ôn luyện, đáp án được xây dựng dựa trên kiến thức chuẩn.</li>
          </ul>
        </div>

        <button 
          onClick={handleStart}
          className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold rounded-xl transition-all shadow-lg transform hover:scale-[1.02]"
        >
          BẮT ĐẦU LÀM BÀI
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
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <div className="flex-1 flex flex-col h-full">
          <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center z-10 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm">Câu {currentQ.id}</span>
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
                  {currentQ.code && (
                    <div className="mt-4 bg-gray-900 rounded-lg p-4 overflow-x-auto border-l-4 border-purple-500">
                      <pre className="font-mono text-sm text-green-400">
                        {currentQ.code}
                      </pre>
                    </div>
                  )}
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <div className="text-center">
                <AlertCircle size={48} className="mx-auto text-yellow-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Chốt hạ?</h3>
                <p className="text-gray-600 mb-6">
                   Bạn chắc chắn muốn nộp bài chứ? <br/>
                  Thời gian: {formatTime(timeLeft)}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setShowConfirmSubmit(false)} className="py-3 px-4 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50">
                    Xem lại
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
      <div className="min-h-screen bg-gray-50 pb-12">
        <div className="bg-gray-900 text-white pb-20 pt-10 px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Kết quả</h1>
              <p className="text-gray-400">Môn: Kỹ Năng Mềm</p>
            </div>
            <div className="mt-6 md:mt-0 flex items-center gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-purple-500">{score}<span className="text-xl text-gray-500"></span></p>
                <p className="text-sm text-gray-400 uppercase tracking-wider mt-1">Điểm số</p>
              </div>
              <div className="w-px h-16 bg-gray-700 hidden md:block"></div>
               <button 
                  onClick={() => { if(window.confirm("Làm lại từ đầu nha?")) handleStart(); }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <RotateCcw size={18} /> Làm lại
                </button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 -mt-12">
            <div className="flex bg-white rounded-xl shadow-lg p-2 mb-8 w-fit mx-auto md:mx-0 overflow-x-auto max-w-full">
                <button onClick={() => setFilterMode('all')} className={`px-6 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${filterMode === 'all' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Tất cả</button>
                <button onClick={() => setFilterMode('wrong')} className={`px-6 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${filterMode === 'wrong' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Sai / Chưa làm</button>
                 <button onClick={() => setFilterMode('marked')} className={`px-6 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${filterMode === 'marked' ? 'bg-yellow-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Đánh dấu</button>
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
                        <p className="font-bold text-blue-900 text-sm mb-1">Giải thích:</p>
                        <p className="text-blue-800 text-sm leading-relaxed">{q.explanation}</p>
                        <p className="mt-2 text-xs text-blue-600 font-semibold bg-blue-100 inline-block px-2 py-1 rounded">Ref: {q.slideRef}</p>
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