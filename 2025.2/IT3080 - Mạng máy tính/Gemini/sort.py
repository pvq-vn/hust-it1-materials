import json
import re

def get_sort_key(item):
    # Lấy value từ 'text' hoặc 'question', nếu không có thì trả về chuỗi rỗng
    val = item.get('text', item.get('question', ''))
    
    # Dùng regex để dọn dẹp phần đầu chuỗi:
    # ^             : Bắt đầu chuỗi
    # \(\s* : Dấu ngoặc mở '(', có thể có khoảng trắng
    # (các|những)   : Bắt đúng chữ 'các' hoặc 'những'
    # \s*\)         : Dấu ngoặc đóng ')', có thể có khoảng trắng trước đó
    # \s* : Bỏ qua luôn các khoảng trắng sau dấu ngoặc đóng
    # flags=re.IGNORECASE: Không phân biệt hoa/thường (Các, CÁC, các...)
    clean_val = re.sub(r'^\(\s*(các|những)\s*\)\s*', '', val, flags=re.IGNORECASE)
    
    # Trả về chuỗi đã dọn dẹp và viết thường để sort chính xác
    return clean_val.lower()

def sort_json_advanced(input_filepath, output_filepath):
    # Đọc file json
    with open(input_filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Sắp xếp sử dụng hàm get_sort_key làm tiêu chí
    sorted_data = sorted(data, key=get_sort_key)
    
    # Ghi ra file mới
    with open(output_filepath, 'w', encoding='utf-8') as f:
        json.dump(sorted_data, f, ensure_ascii=False, indent=4)
        
    print(f"Đã xử lý xong! File mới được lưu tại:\n{output_filepath}")

# Đường dẫn file
input_file = r"C:\Users\Asus\Downloads\OldExam.json"
output_file = r"C:\Users\Asus\Downloads\SortedExam.json"

sort_json_advanced(input_file, output_file)