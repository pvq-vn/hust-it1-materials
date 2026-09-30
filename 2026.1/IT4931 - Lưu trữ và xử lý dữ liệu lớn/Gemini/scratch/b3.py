import os
import sys

sys.path.append(os.path.dirname(__file__))
from builder import add_q

add_q(118, "single", "Phát biểu nào sau đây không đúng về Apache Hadoop?", [
    "Hadoop thiết kế để mở rộng thông qua kĩ thuật scale-out, tăng số lượng máy chủ",
    "Xử lý dữ liệu phân tán với mô hình lập trình đơn giản, thân thiện hơn như MapReduce.",
    "Thiết kế để vận hành trên siêu máy tính, cấu hình mạnh, độ tin cậy cao",
    "Thiết kế để vận hành trên phần cứng phổ thông, có khả năng chống chịu lỗi phần cứng"
], ["Thiết kế để vận hành trên siêu máy tính, cấu hình mạnh, độ tin cậy cao"], "Hadoop")

add_q(119, "multiple", "Ưu điểm của hệ thống tệp tin phân tán là gì?", [
    "Tập trung hoá việc quản trị.",
    "Đơn giản hoá việc chia sẻ dữ liệu.",
    "Cho phép người dùng có cái nhìn hợp nhất (như nhau) về toàn bộ dữ liệu trong hệ thống."
], ["Tập trung hoá việc quản trị.", "Cho phép người dùng có cái nhìn hợp nhất (như nhau) về toàn bộ dữ liệu trong hệ thống."], "Distributed File System")

add_q(120, "single", "Phát biểu nào đúng về Amazon DynamoDB", [
    "DynamoDB là multipe-hop DHT",
    "DynamoDB là one-hop DHT",
    "DynamoDB là zero-hop DHT"
], ["DynamoDB là zero-hop DHT"], "DynamoDB")

add_q(121, "multiple", "Đâu là các thao tác có thể thực hiện trên RDD (Resilient distributed dataset) của Spark?", [
    "Yêu cầu Spark lưu RDD ở bộ nhớ đệm",
    "Thực hiện các hành động (action)",
    "Thực hiện các biến đổi mà cập nhật các bản ghi trong RDD",
    "Thực hiện các biến đổi (transformation)",
    "Thực hiện các biến đổi mà xoá các bản ghi trong RDD"
], ["Thực hiện các hành động (action)", "Thực hiện các biến đổi (transformation)"], "Spark")

add_q(122, "single", "Phát biểu nào sai về Kafka?", [
    "Thứ tự của message trong mỗi partition do key của message quyết định.",
    "Kafka producer quyết định message sẽ được gửi đến partition nào trong topic.",
    "Kafka producer có thể gửi message đến nhiều broker khác nhau."
], ["Thứ tự của message trong mỗi partition do key của message quyết định."], "Kafka")

add_q(123, "single", "CSDL nào dưới đây không phải là NoSQL", [
    "MongoDB",
    "Không phải các đáp án đã đưa ra",
    "Cassandra",
    "Microsoft SQL server"
], ["Microsoft SQL server"], "Database")

add_q(124, "single", "Cơ chế mà NoSQL sử dụng để tăng khả năng chịu lỗi", [
    "Phân mảnh và phân tán dữ liệu ra nhiều máy chủ",
    "Nhân bản (Replication)",
    "Giao diện truy vấn đơn giản hơn so với CSQL quan hệ truyền thốn"
], ["Nhân bản (Replication)"], "NoSQL")

add_q(125, "single", "Phát biểu nào sai về Kafka?", [
    "Các message trên Kafka được lưu lại theo thời gian (time-based)",
    "Các message trên Kafka được lưu lại theo kích thước partition (size-based)",
    "Các message trên Kafka được lưu lại trước khi thực hiện compaction",
    "Message sau khi được tiêu thụ bởi tất cả các consumer thì bị xoá."
], ["Message sau khi được tiêu thụ bởi tất cả các consumer thì bị xoá."], "Kafka")

add_q(126, "multiple", "Các biến đổi (transformation) trên Spark có đặc điểm gì?", [
    "Mỗi phép biến đổi trên RDD được thực thi bởi một hay nhiều Spark worker",
    "Thực hiện theo cơ chế lười biếng. khi nào một hành động (action) cần tới phép biến đổi trước đó phải thực hiện thì mới phải thực hiện",
    "Các biến đổi (transformation) luôn tạo ra RDD mới có cùng số partition với RDD đầu vào"
], [
    "Mỗi phép biến đổi trên RDD được thực thi bởi một hay nhiều Spark worker",
    "Thực hiện theo cơ chế lười biếng. khi nào một hành động (action) cần tới phép biến đổi trước đó phải thực hiện thì mới phải thực hiện"
], "Spark")

add_q(127, "single", "Các đặc điểm của virtual node trên AmazonDB. Chọn phương án sai", [
    "Số lượng các node ảo đối với mỗi node vật lý là khác nhau tuỳ vào từng node vật lý.",
    "Số lượng các node ảo bắt buộc cần phải căn cứ vào khả năng lưu trữ của node vật lý.",
    "Node ảo đóng vai trò quan trọng trong bài toán cân bằng tải và hiệu năng khi một node vật lý ra hoặc kết nối vào cụm.",
    "Mỗi node vật lý có thể được ánh xạ thành nhiều node ảo, nằm liên tiếp nhau trong vòng tròn không gian khoá."
], ["Số lượng các node ảo bắt buộc cần phải căn cứ vào khả năng lưu trữ của node vật lý."], "DynamoDB")

print("Done batch 3")
