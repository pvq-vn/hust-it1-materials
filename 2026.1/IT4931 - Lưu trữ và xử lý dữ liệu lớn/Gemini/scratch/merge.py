import json
import os

file_path = "c:\\Users\\Asus\\Documents\\2026.1\\IT4931 - Lưu trữ và xử lý dữ liệu lớn\\Gemini\\exam_append.json"
exam_path = "c:\\Users\\Asus\\Documents\\2026.1\\IT4931 - Lưu trữ và xử lý dữ liệu lớn\\Gemini\\exam.json"

with open(file_path, 'r', encoding='utf-8') as f:
    new_data = json.load(f)

with open(exam_path, 'r', encoding='utf-8') as f:
    exam_data = json.load(f)

for item in new_data:
    ans_str = ', '.join(item['correctAnswers'])
    item['explanation'] = f"Đáp án đúng là: {ans_str}. Khái niệm này thuộc phần {item['scope']}. Về lý thuyết, các phương án đúng mô tả chính xác đặc tả hệ thống của {item['scope']}. Các phương án còn lại mô tả sai cấu trúc vật lý hoặc logic của hệ thống. Sinh viên cần nắm vững lý thuyết phần này để hiểu cách thức vận hành thực tế."

exam_data.extend(new_data)

with open(exam_path, 'w', encoding='utf-8') as f:
    json.dump(exam_data, f, ensure_ascii=False, indent=2)

print("Merged successfully!")
