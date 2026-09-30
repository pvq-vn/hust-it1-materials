import os
import sys

sys.path.append(os.path.dirname(__file__))
from builder import add_q

add_q(98, "multiple", "Cơ chế chịu lỗi của datanode trong HDFS?", [
    "Sử dụng cơ chế heartbeat, Namenode định kỳ hỏi các datanode về trạng thái tồn tại của các datanode.",
    "Sử dụng cơ chế heartbeat, định kỳ các datanode thông báo về trạng thái cho Namenode.",
    "Sử dụng Zookeeper để quản lý các thành viên datanode trong cụm."
], [
    "Sử dụng cơ chế heartbeat, Namenode định kỳ hỏi các datanode về trạng thái tồn tại của các datanode.",
    "Sử dụng cơ chế heartbeat, định kỳ các datanode thông báo về trạng thái cho Namenode."
], "HDFS")

add_q(99, "single", "Các mục tiêu chính của Apache Hadoop?", [
    "Lưu trữ dữ liệu khả mở, xử lý dữ liệu lớn mạnh mẽ và trực quan hoá dữ liệu hiệu quả",
    "Lưu trữ dữ liệu khả mở và Xử lý dữ liệu lớn mạnh mẽ",
    "Trực quan hoá dữ liệu hiệu quả",
    "Lưu trữ dữ liệu khả mở",
    "Xử lý dữ liệu lớn mạnh mẽ"
], [
    "Lưu trữ dữ liệu khả mở, xử lý dữ liệu lớn mạnh mẽ và trực quan hoá dữ liệu hiệu quả"
], "Hadoop")

add_q(100, "single", "Chọn phát biểu sai", [
    "NoSQL yêu cầu lược đồ CSDL phải được định nghĩa trước khi thêm dữ liệu",
    "NoSQL cho phép thêm vào dữ liệu mà không cần định nghĩa trước lược đồ dữ liệu",
    "NoSQL được đưa ra nhằm bổ sung các giải pháp mà CSDL truyền thống không đáp ứng tốt"
], [
    "NoSQL yêu cầu lược đồ CSDL phải được định nghĩa trước khi thêm dữ liệu"
], "NoSQL")

add_q(101, "single", "Phát biểu nào sau sai về Kafka?", [
    "Tiến trình quảng bá message lên cụm Kafka gọi là publishers",
    "Kafka quản lý các luồng thông điệp (messages) thành các nhóm gọi là các Topics.",
    "Tiến trình đăng ký theo dõi các topics gọi là consumers.",
    "Các máy chủ chạy Kafka gọi là các brokers."
], [
    "Tiến trình quảng bá message lên cụm Kafka gọi là publishers"
], "Kafka")

add_q(102, "multiple", "Đâu là đặc điểm của RDD (Resilient distributed dataset) của Spark?", [
    "Người sử dụng không thể quyết định số các phân mảnh của mỗi RDD",
    "Có khả năng chịu lỗi",
    "Được chia thành các phân mảnh (partition)",
    "Người lập trình có thể quyết định số các phân mảnh của mỗi RDD"
], [
    "Có khả năng chịu lỗi",
    "Được chia thành các phân mảnh (partition)",
    "Người lập trình có thể quyết định số các phân mảnh của mỗi RDD"
], "Spark")

add_q(103, "multiple", "Đâu là đặc điểm của Spark streaming?", [
    "Có thể nhận đầu vào là các tệp tin trên HDFS",
    "Không thể thực hiện các truy vấn SQL",
    "Có thể nhận đầu vào là các luồng dữ liệu từ Kafka"
], [
    "Có thể nhận đầu vào là các tệp tin trên HDFS",
    "Có thể nhận đầu vào là các luồng dữ liệu từ Kafka"
], "Spark")

add_q(104, "multiple", "Kiến trúc xử lý dữ liệu Lambda có đặc điểm gì?", [
    "Giúp giải quyến vấn đề độ trễ từ khi dữ liệu được thâp tới kết quả phân tích của mô hình xử lý theo lô",
    "Kết hợp xử lý dữ liệu theo lô và theo luồng",
    "Giúp giải quyết vấn đề nhược điểm của xử lý theo luồng là kết quả phân tích không khai thác được toàn bộ dữ liệu trong lịch sử.",
    "Có kiến trúc gồm 2 tầng: tầng xử lý theo lô và tầng xử lý theo luồng",
    "Bao gồm các tiến trình ETL (extract, transform, load) đưa dữ liệu vào hồ dữ liệu (data lake)"
], [
    "Giúp giải quyến vấn đề độ trễ từ khi dữ liệu được thâp tới kết quả phân tích của mô hình xử lý theo lô",
    "Kết hợp xử lý dữ liệu theo lô và theo luồng",
    "Giúp giải quyết vấn đề nhược điểm của xử lý theo luồng là kết quả phân tích không khai thác được toàn bộ dữ liệu trong lịch sử.",
    "Có kiến trúc gồm 2 tầng: tầng xử lý theo lô và tầng xử lý theo luồng"
], "Big Data Architecture")

add_q(105, "single", "Cơ chế tổ chức dữ liệu của Datanode trong HDFS?", [
    "Các chunk là các tệp tin trong hệ thống tệp tin cục bộ của máy chủ datanode.",
    "Các chunk được lưu trữ tin cậy trên datanode theo cơ chế RAID.",
    "Các chunk là các vùng dữ liệu liên tục trên ổ cứng của máy chủ datanode."
], [
    "Các chunk là các tệp tin trong hệ thống tệp tin cục bộ của máy chủ datanode."
], "HDFS")

add_q(106, "single", "Phát biểu nào sai về Presto?", [
    "Presto là một engine truy vấn SQL hiệu năng cao, phân tán cho dữ liệu lớn",
    "Presto được quản lý bở Apache Software foundation",
    "Presto cho phép tích hợp với các công cụ Business Intelligence",
    "Presto được quản lý bở Presto Software foundation"
], [
    "Presto được quản lý bở Apache Software foundation"
], "Presto")

add_q(107, "single", "Phát biểu nào sai về Hfile trong Hbase?", [
    "Nhiều Hfile có thể được gộp lại thành 1 Hfile lớn theo những khoảng thời gian nhất định",
    "Hfile chứa một tập hợp các dòng bản ghi trong Hbase table",
    "Một version của 1 dòng hay 1 bản ghi trong Hbase table có thể được phân rã trên nhiều Hfile khác nhau",
    "Nhiều Hfile có thể được gộp lại thành 1 Hfile lớn khi cần thiết"
], [
    "Nhiều Hfile có thể được gộp lại thành 1 Hfile lớn theo những khoảng thời gian nhất định"
], "Hbase")

print("Done batch 1")
