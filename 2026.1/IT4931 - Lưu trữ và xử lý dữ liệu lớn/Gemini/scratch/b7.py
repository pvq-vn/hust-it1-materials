import os
import sys

sys.path.append(os.path.dirname(__file__))
from builder import add_q

add_q(158, "single", "Câu lệnh MapReduce trong Spark dưới đây, chia mỗi dòng thành từ dựa vào delimiter nào.\n`input.flatMap(lambda x: x.split(\"\\t\")).map(lambda x: (x, 1)).reduceByKey(add)`", [
    "Tab",
    "Dấu cách",
    "Dấu hai chấm",
    "Dấu phẩy"
], ["Tab"], "Spark")

add_q(159, "multiple", "Data Pipeline nào sau đây là đúng trên Spark", [
    "Spark -> RabbitMQ -> Elasticsearch -> Hiển thị",
    "Dữ liệu sensor -> RabbitMQ -> Elasticsearch -> Spark -> Hiển thị",
    "Dữ liệu sensor -> Elasticsearch -> RabbitMQ -> Spark -> Hiển thị",
    "Spark -> Elasticsearch -> Hiển thị"
], [
    "Spark -> RabbitMQ -> Elasticsearch -> Hiển thị",
    "Spark -> Elasticsearch -> Hiển thị"
], "Spark")

add_q(160, "single", "Mục đích của sử dụng RabbitMQ là gì?", [
    "Lưu trữ dữ liệu",
    "Tránh dữ liệu bị mất mát",
    "Hiển thị dữ liệu",
    "Phân tích dữ liệu"
], ["Tránh dữ liệu bị mất mát"], "Message Queue")

add_q(161, "single", "Spark có thể chạy ở chế độ nào khi chạy trên nhiều máy?", [
    "Chạy trên YARN",
    "Chạy trên ZooKeeper",
    "Phương án A và B đều sai",
    "Cả 2 phương án A và B"
], ["Chạy trên YARN"], "Spark")

add_q(162, "single", "Mục đích của sử dụng Spark ML là gì?", [
    "Chạy MapReduce",
    "Chạy các thuật toán dự đoán",
    "Tính toán phân tán",
    "Cả B and C"
], ["Cả B and C"], "Spark ML")

add_q(163, "single", "Mục đích của lệnh sau đây là gì?\n`(trainingData, testData) = dataset.randomSplit([0.8, 0.2], seed=100)`", [
    "Chia dữ liệu học và dữ liệu kiểm tra",
    "Chạy chương trình học",
    "Tạo dữ liệu ngẫu nhiên cho dữ liệu học và kiểm tra",
    "Chạy chương trình dự đoán"
], ["Chia dữ liệu học và dữ liệu kiểm tra"], "Spark ML")

add_q(164, "single", "Label và Feature của câu lệnh bên dưới có nghĩa là gì?\n`LogisticRegression(labelCol=\"label\", featuresCol=\"features\", maxIter=10)`", [
    "Dữ liệu đầu vào được gán là feature và dự đoán được gán vào label",
    "Dữ liệu đầu vào được gán là label và kết quả của dữ liệu đầu vào đó được gán vào feature",
    "Dữ liệu đầu vào được gán là feature và kết quả của dữ liệu đầu vào đó được gán vào label",
    "Dữ liệu đầu vào được gán là label và kết quả dự đoán được gán vào feature"
], ["Dữ liệu đầu vào được gán là feature và kết quả của dữ liệu đầu vào đó được gán vào label"], "Spark ML")

add_q(165, "single", "đâu là kĩ thuật có thể dùng để thích nghi các giải thuật học máy cho dữ liệu lớn:", [
    "sub-samping, principal componenet analysis, feature extraction và feature selection",
    "song song hóa trên mapreduce hay spark",
    "các kiến trúc mới xử lý luồn liên tục như mini-batch, complex event processing",
    "tất cả",
    "ý B, C"
], ["tất cả"], "Machine Learning")

add_q(166, "single", "Các mục tiêu chính của apache hadoop", [
    "lưu trữ dữ liệu khá mở",
    "Xử lý dữ liệu lớn mạnh mẽ",
    "trực quan hóa dữ liệu hiệu quả",
    "lưu trữ dữ liệu khá mở và xử lý dữ liệu lớn mạnh mẽ",
    "lưu trữ dữ liệu khá mở và xử lý dữ liệu lớn mạnh mẽ và trực quan hóa dữ liệu hiệu quả"
], ["lưu trữ dữ liệu khá mở và xử lý dữ liệu lớn mạnh mẽ"], "Hadoop")

add_q(167, "single", "Phạt biểu sai về hadoop", [
    "xử lý dữ liệu phân tán với mô hình lập trình đơn giản, thân thiện hơn như mapreduce",
    "Hadoop thiết kế để mở rộng thông qua kỹ thuật scale-out, tăng số lượng máy chủ",
    "Thiết kế để vận hành trên phần cứng phổ thông, có khả năng chống chịu lỗi phần cứng",
    "Thiết kế để vận hành trên siêu máy tính, câu hình mạnh, dộ tin cậy cao"
], ["Thiết kế để vận hành trên siêu máy tính, câu hình mạnh, dộ tin cậy cao"], "Hadoop")

add_q(168, "multiple", "cơ chế chịu lỗi của datanode trong HDFS?", [
    "sử dụng zookeeper để quản lý các thành viên datanode trong cụm",
    "Sử dụng cơ chế heartbeat, định kì các datanode thông báo về trạng thái cho Namenode",
    "Sử dụng cơ chế heartbeat, Namenode định kì hỏi các datanode về trạng thái tồn tại của các datanode"
], [
    "Sử dụng cơ chế heartbeat, định kì các datanode thông báo về trạng thái cho Namenode"
], "HDFS")

add_q(169, "single", "Cơ chế tổ chức dữ liệu của Datanode trong HDFS", [
    "các chunk là các tệp tin trong hệ thống tệp tin cục bộ của máy chủ datanode",
    "các chunk là các vùng dữ liệu liên tục trên ổ cứng của máy chủ datanode",
    "các chunk được lưu trữ tin cậy trên datanode theo cơ chế RAID"
], ["các chunk là các tệp tin trong hệ thống tệp tin cục bộ của máy chủ datanode"], "HDFS")

add_q(170, "single", "Cơ chế nhân bản dữ liệu trong HDFS", [
    "Namenode quyết định vị trí các nhân bản của các chunk trên datanode",
    "Datanode là primary quyết định vị trí các nhân bản của các chunk tại các secondary datanode",
    "Client quyết định vị trí lưu trữ các nhân bản với từng chunk"
], ["Namenode quyết định vị trí các nhân bản của các chunk trên datanode"], "HDFS")

print("Done batch 7")
