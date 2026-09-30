import os

exam_path = "c:\\Users\\Asus\\Documents\\2026.1\\IT4931 - Lưu trữ và xử lý dữ liệu lớn\\Gemini\\exam.json"
append_path = "c:\\Users\\Asus\\Documents\\2026.1\\IT4931 - Lưu trữ và xử lý dữ liệu lớn\\Gemini\\exam_append.json"

with open(exam_path, 'r', encoding='utf-8') as f:
    exam_raw = f.read()

with open(append_path, 'r', encoding='utf-8') as f:
    append_raw = f.read()

# Remove the trailing `]` from exam_raw
exam_raw = exam_raw.strip()
if exam_raw.endswith("]"):
    exam_raw = exam_raw[:-1]

# Remove the opening `[` from append_raw
append_raw = append_raw.strip()
if append_raw.startswith("["):
    append_raw = append_raw[1:]

with open(exam_path, 'w', encoding='utf-8') as f:
    f.write(exam_raw + ",\n" + append_raw)

print("Appended manually!")
