# Smart Outfit — Hướng dẫn nghiên cứu Nhóm 2

Tài liệu dành cho **3 sinh viên học kỳ 1 năm 2**, đã học lập trình cơ bản, chưa học machine learning.

## Đọc tài liệu

- **[Trang đọc công khai trên Qoder Page](https://smart-outfit-guide-3cthlaqe70c.qoder.website)** — có mục lục, giao diện điện thoại, sao chép prompt và tải Markdown.
- [Hướng dẫn đầy đủ](HUONG_DAN_NHOM_2_SMART_OUTFIT_RECOMMENDER.md) — nội dung nguồn dùng để tạo trang web.

## Năm điều cần nắm

1. **Gap:** Khoảng trống bằng chứng cho phép so sánh các cải tiến đơn giản trên tủ đồ thật của nhóm người dùng cụ thể, không phải tuyên bố chưa ai làm gợi ý trang phục hoặc đo thời gian.
2. **Pain point:** Công cân nhắc, loại đồ không sẵn sàng/không hợp ngữ cảnh và đổi lựa chọn; nhóm phải xác thực khó khăn này trước khi khẳng định nhu cầu.
3. **Cách tiếp cận:** Lọc đồ hợp lệ, xếp hạng theo ngữ cảnh, bổ sung sở thích và phạt lặp; đo thời gian cùng tỷ lệ hoàn thành và mức phù hợp.
4. **Phạm vi:** Tủ đồ nhỏ, áo–quần–giày, ba phiên bản, giao diện tối giản và nghiên cứu người dùng thăm dò. Không bắt buộc deep learning, bandit hoặc thử đồ ảo.
5. **Phân công:** SV 1 làm dữ liệu/ngữ cảnh; SV 2 làm ghép bộ/xếp hạng/cá nhân hóa; SV 3 làm giao diện/tích hợp/đo lường. Cả ba cùng thu thập và phân tích thực nghiệm.

Xem mục **0** để hiểu bài toán, mục **8** để xem bàn giao theo từng người/từng phiên bản, mục **12** để xem kế hoạch 12 tuần.

Đây là **hướng dẫn nghiên cứu**, chưa phải ứng dụng gợi ý trang phục đã triển khai hoặc kết quả nghiên cứu đã chứng minh. Tài liệu có nguồn tham khảo và phân biệt ví dụ minh họa với dữ liệu thật.

## Cập nhật trang đọc

Website tĩnh, không có backend, tài khoản người học hoặc thu thập dữ liệu nghiên cứu. Sửa tài liệu Markdown nguồn và giao diện trong `web/`, sau đó dựng lại `dist/`. Không sửa trực tiếp nội dung đã sinh trong `dist/`.

Cần Node.js 20 trở lên. Các lệnh xem local dưới đây dùng Python 3.

```bash
npm ci
npm run build
npm run check
npm run dev
```

Máy chủ local ở `http://127.0.0.1:4173/`.

Kiểm tra bằng Chrome đã cài trên máy, khi máy chủ đang chạy:

```bash
npm run test:browser
```

Kiểm tra cùng luồng trên trang công khai bằng biến môi trường `BASE_URL`:

```bash
BASE_URL="https://smart-outfit-guide-3cthlaqe70c.qoder.website/" npm run test:browser
```

Bài kiểm tra bao gồm điều hướng, tải tài liệu, clipboard và nhánh bị từ chối quyền, reload liên kết chương, màn hình desktop/390px/320px, và lỗi console/network. Ảnh kiểm tra được lưu trong thư mục tạm, không đưa lên website.

## Tổ chức nguồn

- `HUONG_DAN_NHOM_2_SMART_OUTFIT_RECOMMENDER.md`: Nội dung chuẩn.
- `web/`: Template, CSS, JavaScript và favicon.
- `scripts/build.mjs`: Dựng HTML và bản tải xuống từ cùng nguồn.
- `scripts/check.mjs`: Kiểm tra nội dung, JSON, anchor và tài nguyên.
- `scripts/browser-check.mjs`: Kiểm tra trải nghiệm đọc trên Chrome.
- `dist/`: Gói tĩnh dùng xuất bản Qoder Page.

Không đưa ảnh riêng tư, log người tham gia, khóa API hoặc descriptor quản lý Qoder vào repo. Việc đưa tài liệu lên GitHub không tự động cập nhật bản Qoder Page; cần build, kiểm tra và xuất bản bản mới từ dự án gốc.
