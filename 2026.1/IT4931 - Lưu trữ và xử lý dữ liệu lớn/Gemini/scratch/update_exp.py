import re
import json

append_path = "c:\\Users\\Asus\\Documents\\2026.1\\IT4931 - Lưu trữ và xử lý dữ liệu lớn\\Gemini\\exam_append.json"

with open(append_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    ans_str = ', '.join(item['correctAnswers'])
    item['explanation'] = f"Đáp án chính xác là: '{ans_str}'. Các phương án này đúng vì nó mô tả chính xác đặc tính kỹ thuật của {item['scope']}. Các phương án còn lại mô tả sai kiến trúc, tính năng hoặc cấu trúc logic của hệ thống. Phạm vi kiến thức cần ôn tập: Các khái niệm cơ bản, đặc điểm, và kiến trúc của {item['scope']} trong môn học Lưu trữ và xử lý dữ liệu lớn."

with open(append_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Updated explanations in append file.")
