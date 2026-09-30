import json
import os

append_path = "c:\\Users\\Asus\\Documents\\2026.1\\IT4931 - Lưu trữ và xử lý dữ liệu lớn\\Gemini\\exam_append.json"

with open(append_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    if item["id"] in [157, 173]:
        item["options"] = [
            "A. ./spark-submit wordcount.py README.md",
            "B. ./spark-submit README.md wordcount.py",
            "C. spark-submit README.md wordcount.py",
            "D. Phương án A và C"
        ]
        item["correctAnswers"] = ["A. ./spark-submit wordcount.py README.md"]
    elif item["id"] == 161:
        item["options"] = [
            "A. Chạy trên YARN",
            "B. Chạy trên ZooKeeper",
            "C. Phương án A và B đều sai",
            "D. Cả 2 phương án A và B"
        ]
        item["correctAnswers"] = ["A. Chạy trên YARN"]
    elif item["id"] == 162:
        item["options"] = [
            "A. Chạy MapReduce",
            "B. Chạy các thuật toán dự đoán",
            "C. Tính toán phân tán",
            "D. Cả B and C"
        ]
        item["correctAnswers"] = ["D. Cả B and C"]
    elif item["id"] == 165:
        # 165 has "ý B, C"
        item["options"] = [
            "A. sub-samping, principal componenet analysis, feature extraction và feature selection",
            "B. song song hóa trên mapreduce hay spark",
            "C. các kiến trúc mới xử lý luồn liên tục như mini-batch, complex event processing",
            "D. tất cả",
            "E. ý B, C"
        ]
        item["correctAnswers"] = ["D. tất cả"]

with open(append_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Fixed prefixes in exam_append.json")
