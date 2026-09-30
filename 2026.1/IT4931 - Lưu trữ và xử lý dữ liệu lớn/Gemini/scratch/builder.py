import json
import os

data = []

file_path = "c:\\Users\\Asus\\Documents\\2026.1\\IT4931 - Lưu trữ và xử lý dữ liệu lớn\\Gemini\\exam_append.json"

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

def add_q(id, type, text, options, correct, scope):
    q = {
        "id": id,
        "type": type,
        "text": text,
        "code": "",
        "tables": [],
        "link": "",
        "options": options,
        "correctAnswers": correct,
        "explanation": "Câu hỏi này nằm trong phạm vi kiến thức về " + scope + ". Đáp án được xác định theo tài liệu ôn tập.",
        "scope": scope
    }
    data.append(q)
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Script ready")
