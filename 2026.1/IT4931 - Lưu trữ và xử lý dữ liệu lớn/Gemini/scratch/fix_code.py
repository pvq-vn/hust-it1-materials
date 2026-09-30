import json
import os

append_path = "c:\\Users\\Asus\\Documents\\2026.1\\IT4931 - Lưu trữ và xử lý dữ liệu lớn\\Gemini\\exam_append.json"

with open(append_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    if "`" in item["text"]:
        # Find everything between backticks
        parts = item["text"].split("`")
        if len(parts) >= 3:
            code = parts[1]
            text = parts[0].strip() + parts[2].strip()
            item["code"] = code
            item["text"] = text

with open(append_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Fixed code fields")
