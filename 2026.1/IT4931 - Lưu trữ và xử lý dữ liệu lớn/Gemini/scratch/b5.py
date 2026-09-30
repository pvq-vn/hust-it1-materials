import os
import sys

sys.path.append(os.path.dirname(__file__))
from builder import add_q

add_q(138, "single", "CƠ CHẾ MÀ NOSQL SỬ DỤNG ĐỂ TĂNG KHẢ NĂNG CHỊU LỖI", [
    "REPLICATION",
    "GIAO DIỆN TRUY VẤN ĐƠN GIẢN HƠN SO VỚI CSQL QUAN HỆ TRUYỀN THỐNG",
    "PHÂN MẢNH VÀ PHÂN TÁN DỮ LIỆU RA NHIỀU MÁY CHỦ",
    "DÙNG RAID"
], ["REPLICATION"], "NoSQL")

add_q(139, "single", "ĐÂU LÀ MỘT CSDL DẠNG CỘT MỞ RỘNG?", [
    "CASSANDRA",
    "REDIS",
    "ELASTICSEARCH",
    "MONGODB"
], ["CASSANDRA"], "Database")

add_q(140, "single", "ĐÂU LÀ CHƯƠNG TRÌNH WORDCOUNT ĐÚNG, VỚI INPUT LÀ MỘT RDD CHỨA DỮ LIỆU ĐỌC TỪ FILE VĂN BẢN", [
    "INPUT.FLATMAP(LAMBDA X: X.SPLIT(' ')).MAP(LAMBDA X:(X, 1)).REDUCEBYVALUE(LAMBDA X,Y:X+Y).SORTBY(LAMBDA X: -X[1])",
    "INPUT.MAP(LAMBDA X: X.SPLIT(' ')).FLATMAP(LAMBDA X:(X, 1)).REDUCEBYKEY(LAMBDA X,Y:X+Y).SORTBY(LAMBDA X: -X[1])",
    "INPUT.MAP(LAMBDA X:(X, 1)).REDUCEBYKEY(LAMBDA X,Y:X+Y).SORTBY(LAMBDA X: -X[1])",
    "INPUT.FLATMAP(LAMBDA X: X.SPLIT(' ')).MAP(LAMBDA X:(X, 1)).REDUCEBYKEY(LAMBDA X,Y:X+Y).SORTBY(LAMBDA X: -X[1])"
], ["INPUT.FLATMAP(LAMBDA X: X.SPLIT(' ')).MAP(LAMBDA X:(X, 1)).REDUCEBYKEY(LAMBDA X,Y:X+Y).SORTBY(LAMBDA X: -X[1])"], "Spark")

add_q(141, "single", "CSDL NÀO PHÙ HỢP VỚI DỮ LIỆU MẠNG XÃ HỘI, DỮ LIỆU CÓ SỰ LIÊN KẾT", [
    "DOCUMENT STORE",
    "KEY-VALUE",
    "COLUMNAR STORE",
    "GRAPH STORE"
], ["GRAPH STORE"], "Database")

add_q(142, "single", "SPARK HỖ TRỢ CÁC CLUSTER MANAGER NÀO?", [
    "MESOS",
    "TẤT CẢ CÁC ĐÁP ÁN TRÊN",
    "STANDALONE CLUSTER MANAGER",
    "YARN"
], ["TẤT CẢ CÁC ĐÁP ÁN TRÊN"], "Spark")

add_q(143, "single", "Các mục tiêu chính của Apache Hadoop", [
    "Lưu trữ dữ liệu khả mở",
    "Xử lý dữ liệu lớn mạnh mẽ",
    "Trực quan hoá dữ liệu hiệu quả",
    "Lưu trữ dữ liệu khả mở và Xử lý dữ liệu lớn mạnh mẽ",
    "Lưu trữ dữ liệu khả mở, xử lý dữ liệu lớn mạnh mẽ và trực quan hoá dữ liệu hiệu quả"
], ["Lưu trữ dữ liệu khả mở và Xử lý dữ liệu lớn mạnh mẽ"], "Hadoop")

add_q(144, "single", "Phát biểu nào sau đây không đúng về Apache Hadoop", [
    "Xử lý dữ liệu phân tán với mô hình lập trình đơn giản, thân thiện hơn như MapReduce",
    "Hadoop thiết kế để mở rộng thông qua kĩ thuật scale-out, tăng số lượng máy chủ",
    "Thiết kế để vận hành trên phần cứng phổ thông, có khả năng chống chịu lỗi phần cứng",
    "Thiết kế để vận hành trên siêu máy tính, cấu hình mạnh, độ tin cậy cao"
], ["Thiết kế để vận hành trên siêu máy tính, cấu hình mạnh, độ tin cậy cao"], "Hadoop")

add_q(145, "multiple", "Thành phần nào không thuộc thành phần lõi của Hadoop", [
    "Hệ thống tệp tin phân tán HDFS",
    "Mapreduce framework",
    "YARN: yet another resource negotiator",
    "Apache Zookeeper",
    "Apache Hbase"
], ["Apache Zookeeper", "Apache Hbase"], "Hadoop")

add_q(146, "single", "Hadoop giải quyết bài toán khả mở bằng cách nào? Chọn đáp án sai.", [
    "Thiết kế hướng phân tán ngay từ đầu, mặc định triển khai trên cụm máy chủ",
    "Các node tham gia vào cụm Hadoop được gán vai trò hoặc là node tính toán hoặc là node lưu trữ dữ liệu",
    "Các node tham gia vào cụm đóng cả 2 vai trò tính toán và lưu trữ",
    "Các node thêm vào cụm có thể có cấu hình, độ tin cậy cao"
], ["Các node tham gia vào cụm Hadoop được gán vai trò hoặc là node tính toán hoặc là node lưu trữ dữ liệu"], "Hadoop")

add_q(147, "single", "Hadoop giải quyết bài toán chịu lỗi thông qua kỹ thuật gì. Chọn đáp án sai", [
    "Hadoop chịu lỗi thông qua kỹ thuật dư thừa",
    "Các tệp tin được phân mảnh, các mảnh được nhân bản ra các node khác trên cụm",
    "Các tệp tin được phân mảnh, các mảnh được lưu trữ tin cậy trên ổ cứng theo cơ chế RAID",
    "Các công việc cần tính toán được phân mảnh thành các tác vụ độc lập."
], ["Các tệp tin được phân mảnh, các mảnh được lưu trữ tin cậy trên ổ cứng theo cơ chế RAID"], "Hadoop")

print("Done batch 5")
