import os
import sys

sys.path.append(os.path.dirname(__file__))
from builder import add_q

add_q(148, "single", "Các đặc trưng của HDFS. Chọn đáp án sai", [
    "Tối ưu cho các tệp tin có kích thước lớn",
    "Hỗ trợ thao tác đọc ghi tương tranh tại chunk (phân mảnh) trên tệp tin",
    "Hỗ trợ nén dữ liệu để tiết kiệm chi phí",
    "Hỗ trợ cơ chế phân quyền và kiểm soát người dùng của UNIX"
], ["Hỗ trợ thao tác đọc ghi tương tranh tại chunk (phân mảnh) trên tệp tin"], "HDFS")

add_q(149, "single", "Mô tả cách thức một client đọc dữ liệu trên HDFS", [
    "Client truy vấn Namenode để biết được vị trí các chunks. Namenode trả về vị trí các chunks. Client kết nối song song tới các datanode để đọc các chunk",
    "Client thông báo tới namenode để bắt đầu quá trình đọc sau đó client truy vấn các datanode để trực tiếp đọc các chunks",
    "Client truy vấn Namenode để đưa thông tin về thao tác đọc. Namenode kết nối song song tới các datanode để lấy dữ liệu, sau đó trả về cho client.",
    "Client truy vấn Namenode để biết được vị trí các chunks. Nếu Namenode không biết về vị trí các chunk thì namenode sẽ hỏi các datanode. Sau đó Namenode gửi lại thông tin vị trí các chunk cho client. Client kết nối song song tới các datanode để đọc các chunk."
], ["Client truy vấn Namenode để biết được vị trí các chunks. Namenode trả về vị trí các chunks. Client kết nối song song tới các datanode để đọc các chunk"], "HDFS")

add_q(150, "single", "Mô tả cách thức một client ghi dữ liệu trên HDFS", [
    "Client kết nối tới Namenode chỉ định muốn ghi vào chunk nào. Namenode trả về vị trí các chunk cho client. Client ghi đồng thời vào các datanode.",
    "Client kết nối tới Namenode chỉ định khối lượng dữ liệu cần ghi. Namenode trả về vị trí các chunk cho client. Client ghi chunk tới datanode đầu tiên, sau đó các datanode tự động thực thi nhân bản. Quá trình ghi kết thúc thi tất cả các chunk và các nhân bản đã được ghi thành công.",
    "Client kết nối tới Namenode chỉ định khối lượng dữ liệu cần ghi. Namenode trả về vị trí các chunk cho client. Client ghi đồng thời các chunk vào datanode. Với mỗi chunk, các datanode thực thi nhân bản tự động sau khi thao tác ghi thành công."
], ["Client kết nối tới Namenode chỉ định khối lượng dữ liệu cần ghi. Namenode trả về vị trí các chunk cho client. Client ghi chunk tới datanode đầu tiên, sau đó các datanode tự động thực thi nhân bản. Quá trình ghi kết thúc thi tất cả các chunk và các nhân bản đã được ghi thành công."], "HDFS")

add_q(151, "single", "Cơ chế chịu lỗi của datanode trong HDFS", [
    "Sử dụng Zookeeper để quản lý các thành viên datanode trong cụm.",
    "Sử dụng cơ chế heartbeat, định kỳ các datanode thông báo về trạng thái cho Namenode.",
    "Sử dụng cơ chế heartbeat, Namenode định kỳ hỏi các datanode về trạng thái tồn tại của các datanode."
], ["Sử dụng cơ chế heartbeat, định kỳ các datanode thông báo về trạng thái cho Namenode."], "HDFS")

add_q(152, "single", "Cơ chế tổ chức dữ liệu của Datanode trong HDFS", [
    "Các chunk là các tệp tin trong hệ thống tệp tin cục bộ của máy chủ datanode.",
    "Các chunk là các vùng dữ liệu liên tục trên ổ cứng của máy chủ datanode.",
    "Các chunk được lưu trữ tin cậy trên datanode theo cơ chế RAID."
], ["Các chunk là các tệp tin trong hệ thống tệp tin cục bộ của máy chủ datanode."], "HDFS")

add_q(153, "single", "Cơ chế nhân bản dữ liệu trong HDFS", [
    "Namenode quyết định vị trí các nhân bản của các chunk trên datanode.",
    "Datanode là primary quyết định vị trí các nhân bản của các chunk tại các secondary datanode.",
    "Client quyết định vị trí lưu trữ các nhân bản với từng chunk."
], ["Namenode quyết định vị trí các nhân bản của các chunk trên datanode."], "HDFS")

add_q(154, "single", "HDFS giải quyết bài toán single-point-of-failure cho Namenode bằng cách nào?", [
    "Sử dụng thêm secondary namenode theo cơ chế active-active. Cả Namenode và Secondary namenode cùng online trong hệ thống",
    "Sử dụng Secondary namenode theo cơ chế active-passive. Secondary namenode chỉ hoạt động khi có vấn đề với Namenode."
], ["Sử dụng Secondary namenode theo cơ chế active-passive. Secondary namenode chỉ hoạt động khi có vấn đề với Namenode."], "HDFS")

add_q(155, "single", "Đầu vào dữ liệu cho chương trình Spark có thể là:", [
    "Local file",
    "HDFS, NFS",
    "Amazon S3, Elasticsearch",
    "Cả 3 phương án trên"
], ["Cả 3 phương án trên"], "Spark")

add_q(156, "single", "Đâu là lệnh lưu dữ liệu ra ngoài chương trình Spark:", [
    "input.saveAsTextFile('file:///usr/zeppelin/notebook/dataset/new.txt')",
    "input.saveAsTextFile('/usr/zeppelin/notebook/dataset/new.txt')",
    "input.saveAs('file:///usr/zeppelin/notebook/dataset/new.txt')",
    "input.saveAsTextFile:'file:///usr/zeppelin/notebook/dataset/new.txt'"
], ["input.saveAsTextFile('file:///usr/zeppelin/notebook/dataset/new.txt')"], "Spark")

add_q(157, "single", "Đâu là cách submit đúng một job lên Spark cluster hoặc chế độ local:", [
    "./spark-submit wordcount.py README.md",
    "./spark-submit README.md wordcount.py",
    "spark-submit README.md wordcount.py",
    "Phương án A và C"
], ["./spark-submit wordcount.py README.md"], "Spark")

print("Done batch 6")
