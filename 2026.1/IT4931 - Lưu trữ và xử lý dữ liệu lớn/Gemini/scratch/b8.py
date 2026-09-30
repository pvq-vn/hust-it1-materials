import os
import sys

sys.path.append(os.path.dirname(__file__))
from builder import add_q

# Duplicates from Page 9
add_q(171, "single", "Câu 1: Đầu vào dữ liệu cho chương trình Spark có thể là:", [
    "Local file",
    "HDFS, NFS",
    "Amazon S3, Elasticsearch",
    "Cả 3 phương án trên"
], ["Cả 3 phương án trên"], "Spark")

add_q(172, "single", "Câu 2: Đâu là lệnh lưu dữ liệu ra ngoài chương trình Spark:", [
    "input.saveAsTextFile('file:///usr/zeppelin/notebook/dataset/new.txt')",
    "input.saveAsTextFile('/usr/zeppelin/notebook/dataset/new.txt')",
    "input.saveAs('file:///usr/zeppelin/notebook/dataset/new.txt')",
    "input.saveAsTextFile:'file:///usr/zeppelin/notebook/dataset/new.txt'"
], ["input.saveAsTextFile('file:///usr/zeppelin/notebook/dataset/new.txt')"], "Spark")

add_q(173, "single", "Câu 3: Đâu là cách submit đúng một job lên Spark cluster hoặc chế độ local:", [
    "./spark-submit wordcount.py README.md",
    "./spark-submit README.md wordcount.py",
    "spark-submit README.md wordcount.py",
    "Phương án A và C"
], ["./spark-submit wordcount.py README.md"], "Spark")

add_q(174, "single", "Câu 4: Câu lệnh MapReduce trong Spark dưới đây, chia mỗi dòng thành từ dựa vào delimiter nào.\n`input.flatMap(lambda x: x.split(\"\\t\")).map(lambda x: (x, 1)).reduceByKey(add)`", [
    "Tab",
    "Dấu cách",
    "Dấu hai chấm",
    "Dấu phẩy"
], ["Tab"], "Spark")

print("Done batch 8")
