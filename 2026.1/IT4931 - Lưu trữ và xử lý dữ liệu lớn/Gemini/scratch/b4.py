import os
import sys

sys.path.append(os.path.dirname(__file__))
from builder import add_q

add_q(128, "single", "Thế nào là Session semantic?", [
    "Tệp tin là chỉ đọc, không cho phép cập nhật và ghi đè. Mọi tiến trình đều có thể đọc tệp tin đồng thời.",
    "Cập nhật tới tệp tin có thể được nhìn thấy ngay lập tức bởi các tiến trình khác mà mở tệp tin đó cùng thời điểm với tiến trình ghi.",
    "Cập nhật tới tệp tin chỉ có thể thấy được bởi các tiến trình khác sau khi tiến trình ghi thực hiện thao tác đóng tệp."
], ["Cập nhật tới tệp tin chỉ có thể thấy được bởi các tiến trình khác sau khi tiến trình ghi thực hiện thao tác đóng tệp."], "Distributed File System")

add_q(129, "single", "Phát biểu nào sai về Hbase", [
    "Hbase có lệ thuộc vào các dịch vụ cung cấp bởi Zookeeper",
    "Hbase hỗ trợ truy vấn dạng SQL",
    "Hbase không hỗ trợ versioning",
    "Hbase có hệ thuộc vào các dịch vụ cung cấp bởi HDFS"
], ["Hbase hỗ trợ truy vấn dạng SQL"], "Hbase")

add_q(130, "single", "Giữa Pig và Hive, công cụ nào có giao diện truy vấn gần với ANSI SQL hơn?", [
    "Pig",
    "Hive",
    "Pig và Hive đều không có giao diện truy vấn gần với SQL."
], ["Hive"], "Hadoop Ecosystem")

add_q(131, "single", "Ưu điểm của kiến trúc SAN (Storage area network)?", [
    "Quản trị dễ dàng hơn so với NAS.",
    "Hiệu năng, băng thông tốt hơn với NAS.",
    "Máy khách có thể kết nối tới SAN bằng đường truyền Ethernet thông thường (Chuẩn kết nối TCP/IP)."
], ["Hiệu năng, băng thông tốt hơn với NAS."], "Storage Architecture")

add_q(132, "single", "Hadoop giải quyết bài toán khả mở bằng cách nào? Chọn đáp án sai.", [
    "Các node thêm vào cụm cần có cấu hình, độ tin cậy cao",
    "Các node tham gia vào cụm đóng cả 2 vai trò tính toán và lưu trữ",
    "Thiết kế hướng phân tán ngay từ đầu, mặc định triển khai trên cụm máy chủ",
    "Các node tham gia vào cụm Hadoop được gán vai trò hoặc là node tính toán hoặc là node lưu trữ dữ liệu"
], ["Các node tham gia vào cụm Hadoop được gán vai trò hoặc là node tính toán hoặc là node lưu trữ dữ liệu"], "Hadoop")

add_q(133, "multiple", "Đâu là ưu điểm của Spark so với MapReduce?", [
    "Hỗ trợ tốt cho xử lý chuỗi các biến đổi",
    "Khai thác bộ nhớ trong thay vì sử dụng hệ thống lưu trữ ngoài như HDFS",
    "Có khả năng chịu lỗi",
    "Có thể khai phá dữ liệu trong thời gian tương tác"
], [
    "Hỗ trợ tốt cho xử lý chuỗi các biến đổi",
    "Khai thác bộ nhớ trong thay vì sử dụng hệ thống lưu trữ ngoài như HDFS",
    "Có khả năng chịu lỗi",
    "Có thể khai phá dữ liệu trong thời gian tương tác"
], "Spark vs MapReduce")

add_q(134, "multiple", "Thành phần nào không thuộc thành phần lõi của Hadoop?", [
    "Apache Zookeeper",
    "Hệ thống tệp tin phân tán HDFS",
    "Apache Hbase",
    "Mapreduce framework",
    "YARN: yet another resource negotiator"
], ["Apache Zookeeper", "Apache Hbase"], "Hadoop")

add_q(135, "single", "Hadoop giải quyết bài toán chịu lỗi thông qua kỹ thuật gì. Chọn đáp án sai.", [
    "Hadoop chịu lỗi thông qua kỹ thuật dư thừa",
    "Các công việc cần tính toán được phân mảnh thành các tác vụ độc lập.",
    "Các tệp tin được phân mảnh, các mảnh được lưu trữ tin cậy trên ổ cứng theo cơ chế RAID",
    "Các tệp tin được phân mảnh, các mảnh được nhân bản ra các node khác trên cụm"
], ["Các tệp tin được phân mảnh, các mảnh được lưu trữ tin cậy trên ổ cứng theo cơ chế RAID"], "Hadoop")

add_q(136, "single", "Phát biểu sau đây đúng hay sai: Trong cụm Kafka, 1 server đóng vai trò leader, các server còn lại đóng vai trò follower.", [
    "Sai",
    "Đúng"
], ["Sai"], "Kafka")

add_q(137, "single", "Phát biểu nào sai về Presto", [
    "Presto thường nhanh hơn Hive hay Pig",
    "Presto không truy vấn được dữ liệu trong MySQL, MS SQL và các CSDL quan hệ truyền thống",
    "Presto có thể truy vấn nhiều data storages khác nhau như HDFS, Cassandra"
], ["Presto không truy vấn được dữ liệu trong MySQL, MS SQL và các CSDL quan hệ truyền thống"], "Presto")

print("Done batch 4")
