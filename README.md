# ỨNG DỤNG GHI CHÚ VIẾT BẰNG REACT NATIVE và BACKEND BẰNG PHP

## Hướng dẫn sử dụng:

Vui lòng sử dụng xampp hoặc các công cụ hỗ trợ PHP và MySQL

Bước 1: Import file mynotes.sql vào phpMyAdmin

Bước 2: copy folder api vào trong thư mục htdocs(đối vs xampp), xem lại tài khoản trong file ./api/db.php phù hợp vs tài khoản trong phpMyAdmin của bạn

Bước 3: khởi động Android Studio lên và chạy máy ảo trong folder MyNotes, có một folder hỗ trợ android

Buoc 4: Chạy cmd folder MyNotes:

		react-native run-android

## Chức năng:
- Lưu trử ghi chú
## Nhược điểm:
- Lưu trử các note chung một database, nhiều máy có cài ứng dụng đều xem đc các note.
- Chưa có chức năng đăng nhập để lưu trử các note cho từng tài khoản riêng
