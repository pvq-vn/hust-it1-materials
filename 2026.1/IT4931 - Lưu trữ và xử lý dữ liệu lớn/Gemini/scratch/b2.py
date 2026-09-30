import os
import sys

sys.path.append(os.path.dirname(__file__))
from builder import add_q

add_q(108, "single", "Công cụ nào có thể sử dụng để hỗ trợ import, export dữ liệu vào ra hệ sinh thái Hadoop?", [
    "Flume",
    "Sqoop",
    "Hive",
    "Oozie"
], ["Sqoop"], "Hadoop Ecosystem")

add_q(109, "single", "Thế nào là UNIX semantic?", [
    "Tệp tin là chỉ đọc, không cho phép cập nhật và ghi đè. Mọi tiến trình đều có thể đọc tệp tin đồng thời.",
    "Cập nhật tới tệp tin có thể được nhìn thấy ngay lập tức bởi các tiến trình khác mà mở tệp tin đó cùng thời điểm với tiến trình ghi.",
    "Cập nhật tới tệp tin chỉ có thể thấy được bởi các tiến trình khác sau khi tiến trình ghi thực hiện thao tác đóng tệp."
], ["Cập nhật tới tệp tin có thể được nhìn thấy ngay lập tức bởi các tiến trình khác mà mở tệp tin đó cùng thời điểm với tiến trình ghi."], "HDFS")

add_q(110, "single", "Cơ chế nhân bản dữ liệu trong HDFS?", [
    "Datanode là primary quyết định vị trí các nhân bản của các chunk tại các secondary datanode.",
    "Namenode quyết định vị trí các nhân bản của các chunk trên datanode.",
    "Client quyết định vị trí lưu trữ các nhân bản với từng chunk."
], ["Namenode quyết định vị trí các nhân bản của các chunk trên datanode."], "HDFS")

add_q(111, "multiple", "Đâu là vấn đề khi xử lý dữ liệu lớn với MapReduce?", [
    "Xử lý dữ liệu lớn theo lô (Bulk processing)",
    "Xử lý dữ liệu lớn trong thời gian tương tác",
    "Xử lý chuỗi các công việc",
    "Xử lý luồng dữ liệu lớn"
], [
    "Xử lý dữ liệu lớn trong thời gian tương tác",
    "Xử lý chuỗi các công việc",
    "Xử lý luồng dữ liệu lớn"
], "MapReduce")

add_q(112, "single", "Đâu là một dạng của NoSQL", [
    "OLAP",
    "JSON",
    "Key-value store",
    "MySQL"
], ["Key-value store"], "NoSQL")

add_q(113, "single", "Phát biểu nào sai về cơ chế scheduling của Presto?", [
    "Stage có thể được lập lịch theo giai đoạn",
    "Một task có thể được lập lịch chạy trên bất kỳ worker nào",
    "Split được gán cho task theo cơ chế lazy",
    "Stage có thể được lập lịch all-at-once"
], ["Một task có thể được lập lịch chạy trên bất kỳ worker nào"], "Presto")

add_q(114, "multiple", "Thao tác nào không được hỗ trợ bởi Hbase", [
    "Put",
    "Multiput",
    "Scan",
    "Join",
    "Get"
], ["Multiput", "Join"], "Hbase")

add_q(115, "single", "Hbase có thể được sử dụng cho kiểu dữ liệu nào", [
    "Dữ liệu có cấu trúc",
    "Dữ liệu phi cấu trúc",
    "Dữ liệu bán cấu trúc",
    "Tất cả các phương án được đưa ra."
], ["Tất cả các phương án được đưa ra."], "Hbase")

add_q(116, "single", "HDFS giải quyết bài toán một điểm hỏng hóc duy nhất (single-point-of-failure) cho Namenode bằng cách nào?", [
    "Sử dụng Secondary namenode theo cơ chế active-passive. Secondary namenode chỉ hoạt động khi có vấn đề với Namenode.",
    "Sử dụng thêm secondary namenode theo cơ chế active-active. Cả Namenode và Secondary namenode cùng online trong hệ thống"
], ["Sử dụng Secondary namenode theo cơ chế active-passive. Secondary namenode chỉ hoạt động khi có vấn đề với Namenode."], "HDFS")

add_q(117, "multiple", "Chọn phát biểu đúng về NoSQL", [
    "Không hỗ trợ các truy vấn SQL",
    "Không thể được sử dụng kết hợp với các CSDL quan hệ",
    "Đáp ứng khả năng xử lý giao dịch với tính nhất quán chặt",
    "Rất phù hợp cho các tập dữ liệu phân tán quy mô lớn"
], [
    "Không hỗ trợ các truy vấn SQL",
    "Rất phù hợp cho các tập dữ liệu phân tán quy mô lớn"
], "NoSQL")

print("Done batch 2")
