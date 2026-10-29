# NHÓM 2 — HƯỚNG DẪN THỰC HIỆN ĐỀ TÀI SMART OUTFIT RECOMMENDER

**Đề tài:** Nghiên cứu hệ thống gợi ý trang phục cá nhân nhằm tối ưu hóa thời gian lựa chọn của người dùng.

**Đối tượng:** Nhóm **3 sinh viên** học kỳ 1 năm thứ 2, đã học một số kiến thức lập trình cơ bản, chưa học học máy và mới tiếp xúc với AI agent.

**Cách sử dụng tài liệu:** Đọc mục 0 để nắm gap, pain point và phạm vi; xem mục 8 để biết ai làm gì và ghép thành phiên bản nào; làm bài tập ở mục 6 trước khi chia nhánh. Mục 10–11 dành cho việc đo và kiểm chứng, không cần học hết thuật ngữ ngay ngày đầu tiên.

**Trạng thái:** Tài liệu định hướng, chưa có kết quả khảo sát hoặc thực nghiệm của nhóm. Các con số ví dụ không phải kết quả nghiên cứu. Cập nhật phân công 3 người ngày 29/10/2026.

> **Thông điệp của giảng viên hướng dẫn:** Các em không phải bắt đầu bằng việc huấn luyện AI. Trước hết, hãy viết được một chương trình nhỏ mà mình giải thích được, đo được và sửa được. Sau đó mới bổ sung từng cải tiến để kiểm tra xem chúng có thực sự giúp người dùng chọn đồ nhanh hơn không.

---

## 0. Đọc trước: Gap, pain point và việc nhóm thực sự làm

### 0.1. Gap thực sự là gì, và không phải là gì?

**Gap** là khoảng trống kiến thức hoặc bằng chứng cần được giải quyết, không phải danh sách tính năng ứng dụng chưa được nhóm viết.

**Không chọn các phát biểu sau làm gap:**

- “Chưa có ứng dụng gợi ý quần áo.”
- “Chưa ai kết hợp ngữ cảnh và sở thích cá nhân.”
- “Chưa ai đo thời gian chọn trang phục.”
- “Thêm CLIP hoặc reinforcement learning là có đóng góp mới.”

Các công trình dưới đây cho thấy những tuyên bố đó không đứng vững:

| Nguồn đã đối chiếu | Điều đã có | Điều nguồn này chưa trả lời cho đề tài |
|---|---|---|
| Shen, Lieberman & Lam, 2007 [1] | Gợi ý theo tình huống, tủ đồ và cá nhân hóa; có đo thời gian tìm/chọn trong pilot | Thời gian hai giai đoạn gần như nhau; chưa chứng minh hiệu quả cho phép so sánh v1/v2/v3 trên tủ thật của nhóm người dùng hiện tại |
| Han và cộng sự, 2017 [2] | Học tương thích outfit trên Polyvore; đánh giá điền món còn thiếu và phân biệt outfit phù hợp/không phù hợp | FITB accuracy và ROC-AUC không phải thời gian người dùng chốt bộ đồ |
| Woiceshyn và cộng sự, 2017 [3] | Gợi ý từ tủ cá nhân theo thời tiết, hoạt động, dress code, comfort và phản hồi | Có đánh giá người dùng, nhưng không báo phép so sánh thời gian quyết định khách quan như giao thức đề xuất ở đây |
| Wibowo và cộng sự, 2018 [4] | Đo thời gian chọn bộ áo–quần; kiểu giải thích có ảnh hưởng tới tốc độ chọn | Tác vụ chọn cho người dùng giả định, không phải nghiên cứu đúng gói xếp hạng trên tủ áo–quần–giày thật của sinh viên |

**Kết luận từ bằng chứng:** Gợi ý theo ngữ cảnh/cá nhân hóa và đo thời gian đều không mới. Chất lượng xếp hạng offline, sự hài lòng và tốc độ quyết định là ba thứ khác nhau; không thể suy từ một thứ ra hai thứ còn lại.

**Gap khả thi cho nhóm:**

> Trong phạm vi các nguồn đã đối chiếu, chưa có bằng chứng trực tiếp trả lời: với tủ đồ thật của sinh viên, cùng giao diện và dữ liệu đã xác nhận, việc thêm điểm ngữ cảnh rồi thêm sở thích–phạt lặp vào baseline quy tắc ảnh hưởng thế nào tới thời gian chốt bộ, số lần đổi và mức chấp nhận?

Đây là **khoảng trống bằng chứng thực nghiệm trong một điều kiện sử dụng cụ thể**, không phải khẳng định nhóm phát minh bài toán hoặc thuật toán chưa từng có. Rà soát trên là rà soát có mục tiêu, không phải tổng quan hệ thống bao phủ toàn bộ công trình đến 29/10/2026. Nhóm phải tiếp tục đọc tài liệu và thu hẹp phát biểu nếu tìm thấy nghiên cứu gần hơn.

**Đóng góp dự kiến, chưa phải đóng góp đã đạt:** Một pipeline nhỏ, có thể giải thích; một phép so sánh có kiểm soát; dữ liệu đã ẩn danh và script tái lập; phân tích điều kiện cải tiến hữu ích hoặc không hữu ích. Dùng heuristic thay vì học máy không làm mất giá trị kiểm chứng, nhưng cũng không được gọi là mô hình AI mới.

### 0.2. Pain point: Người dùng đang vướng ở bước nào?

**Pain point** là khó khăn thực tế của người dùng. Khác với gap: pain point thuộc trải nghiệm; gap thuộc điều chúng ta chưa biết/chưa có bằng chứng đủ tốt.

**Pain point trung tâm dự kiến:**

> Khi đã có quần áo nhưng phải ra khỏi nhà, người dùng phải cân nhắc nhiều khả năng, loại những món không sẵn sàng hoặc không hợp hoàn cảnh, rồi đổi qua lại trước khi chốt một bộ chấp nhận được.

Không mặc định mọi sinh viên đều gặp vấn đề này. Người có đồng phục, tủ rất nhỏ hoặc thói quen chọn sẵn từ tối hôm trước có thể không cần hệ thống.

| Khó khăn giả định | Dấu hiệu cần quan sát/hỏi | Không được kết luận chỉ từ cảm tính |
|---|---|---|
| Phải cân nhắc nhiều lựa chọn | Lần chọn gần nhất: đổi mấy lần, vướng ở bước nào? | “Nhiều quần áo luôn làm chọn chậm” |
| Chọn xong mới thấy không mặc được | Món đang giặt, chưa khô hoặc không sẵn sàng | “Thuật toán phối đồ kém” khi dữ liệu trạng thái sai |
| Không hợp ngày hôm nay | Bộ phù hợp sở thích nhưng không hợp sự kiện/thời tiết | Một ngưỡng nhiệt độ đúng cho tất cả |
| Gợi ý không hợp mình hoặc quá lặp | Người dùng từ chối và nêu lý do cụ thể | Mọi lần không chọn đều là ghét bộ đó |
| Nhập tủ đồ quá mất công | Thời gian chụp, gán/sửa nhãn, cập nhật trạng thái | Ứng dụng có lợi tổng thể chỉ vì một phiên chọn nhanh hơn |

**Chưa có khảo sát của nhóm để định lượng các khó khăn này.** Không viết “sinh viên mất X phút mỗi sáng” hoặc “Y% sinh viên cần ứng dụng” nếu chưa đo và chưa có nguồn thích hợp.

**Việc tuần 1:** Cả nhóm phỏng vấn ngắn khoảng 5–8 người phù hợp phạm vi dự kiến, nếu được đồng ý; đây là khám phá vấn đề, không phải mẫu đại diện hoặc nghiên cứu chính. Hỏi về hành vi gần nhất, không hỏi dẫn dắt “Bạn có muốn AI giúp chọn nhanh hơn không?”.

Năm câu nên hỏi:

1. Lần gần nhất bạn khó chọn trang phục là khi nào, đi đâu?
2. Bạn đã làm lần lượt những gì trước khi chốt?
3. Bạn đổi vì màu, sự kiện, đồ không sẵn sàng, hay lý do khác?
4. Bạn đang khắc phục bằng cách nào: chọn sẵn, hỏi bạn, mặc bộ quen?
5. Bạn có chấp nhận công nhập/cập nhật tủ đồ không? Điều gì khiến bạn không muốn dùng?

Nếu có quan sát tác vụ, ghi rõ phần nào là thời gian quan sát và phần nào chỉ là người tham gia nhớ lại. Báo cáo cả người không gặp khó khăn.

**Cửa quyết định:** Nếu khó khăn chính là tìm đồ ngoài đời hoặc nhập tủ quá phiền, không cố chứng minh bài toán xếp hạng; trao đổi với giảng viên để đổi trọng tâm hoặc thu hẹp nhóm đối tượng.

### 0.3. Đề tài đánh vào pain point bằng cách nào?

Không phải “thêm AI để phối đẹp”, mà là giảm các bước cân nhắc không cần thiết trước khi chốt bộ phù hợp.

| Pain point | Cơ chế nhóm làm | Kỳ vọng cần kiểm chứng | Chỉ số/bằng chứng |
|---|---|---|---|
| Gợi ý đồ không thể mặc | Lọc quyền sở hữu và trạng thái sẵn sàng | Không mất lượt chọn vì món không dùng được | Test ràng buộc; số gợi ý không hợp lệ |
| Phải tự cân nhắc sự kiện/thời tiết | Điểm ngữ cảnh ở v2 | Bộ phù hợp hôm nay lên trước | Số lần đổi, mức phù hợp, thời gian |
| Nhiều bộ có thể chọn nhưng chưa biết ưu tiên | Chỉ hiển thị tối đa 3 bộ đã xếp hạng | Dễ bắt đầu và ít phải duyệt hơn | Thời gian và tỷ lệ hoàn thành; Top-3 là lựa chọn thiết kế, chưa chứng minh tối ưu |
| Gợi ý không hợp sở thích | Re-ranking bằng lịch sử lựa chọn ở v3 | Bộ người dùng có khả năng chấp nhận lên trước | So sánh v3 với v2, cùng giao diện |
| Luôn đưa lại món vừa mặc | Phạt lặp mềm dựa trên xác nhận đã mặc | Tăng lựa chọn thay thế khi người dùng muốn luân phiên | Phân tích thứ tự và phản hồi; không tự giả định mọi người ghét mặc lặp |
| Phải thao tác rườm rà | Một chạm chọn, một nút đổi | Giảm thao tác trong phiên | Log thao tác; giữ UI như nhau khi so sánh thuật toán |

**Giả thuyết H1:** v2 có thể giúp chọn nhanh/ít đổi hơn v1 nhờ phù hợp ngữ cảnh hơn.  
**Giả thuyết H2:** v3 có thể cải thiện thêm so với v2 nhờ sở thích và luân phiên.  
**Điều kiện đi kèm:** Không đánh đổi bằng nhiều phiên bỏ dở hơn hoặc mức phù hợp kém hơn; báo cáo cả ba mặt, không chỉ chọn chỉ số đẹp.

Kết quả v3–v2 chỉ cho biết tác động của **gói sở thích + phạt lặp**. Muốn tách từng thành phần cần ablation. Một thử nghiệm ngắn cũng chưa chứng minh lợi ích sau N ngày.

### 0.4. Đề tài làm những gì và nộp những gì?

**Bắt buộc xây:**

1. Tủ đồ số nhỏ: thêm ảnh, nhập/sửa loại–màu–thuộc tính, cập nhật sẵn sàng.
2. Ngữ cảnh nhập tay: đi học, thuyết trình/họp, đi chơi; nhiệt độ và mưa nếu có dữ liệu.
3. Ghép áo + quần + giày từ đồ sẵn có; không tạo đồ tưởng tượng.
4. Ba phiên bản xếp hạng có thể chạy trên cùng dữ liệu.
5. Giao diện tối đa 3 bộ, chọn/đổi/kết thúc và xử lý không đủ bộ.
6. Log thời gian, gợi ý đã trả về, lựa chọn, phiên lỗi/bỏ dở và mức phù hợp.
7. Pilot, nghiên cứu người dùng thăm dò, script phân tích và báo cáo trung thực.

**Tùy chọn:** Tự gợi ý màu, tách nền, API thời tiết. Đánh giá riêng công sức nhập liệu; bỏ các phần này trước nếu chậm tiến độ.

**Không yêu cầu:** Huấn luyện deep learning, thử đồ ảo, chatbot, sinh ảnh người mặc, contextual bandit, ứng dụng mobile riêng hoặc hệ thống bán hàng.

**Bộ đầu ra cuối kỳ:** Code chạy được + dữ liệu mẫu được phép chia sẻ + test + cấu hình v1/v2/v3 + giao thức thực nghiệm + kết quả ẩn danh theo sự đồng ý của người tham gia + script dựng bảng/biểu đồ + báo cáo giới hạn. Đây là bộ đầu ra của nghiên cứu, không chỉ một video demo ứng dụng.

### 0.5. Ba người ghép việc thành ba phiên bản ra sao?

| Người | Trách nhiệm chính | v1 — tuần 5 | v2 — tuần 7 | v3 — tuần 9 |
|---|---|---|---|---|
| **SV 1** | Dữ liệu, tủ đồ, ngữ cảnh | Schema + tủ nhập tay + đồ sẵn sàng + lọc cơ bản | Điểm phù hợp thời tiết/sự kiện | Lịch sử đã mặc + snapshot dữ liệu |
| **SV 2** | Ghép bộ, xếp hạng, cá nhân hóa | Tổ hợp + màu/phong cách + Top-3 | Kết hợp điểm ngữ cảnh | Sở thích + phạt lặp + ablation |
| **SV 3** | Giao diện, tích hợp, đo lường | Giao diện + timer + log | Chạy v1/v2 trên cùng UI, lưu cấu hình | Tích hợp v3 + pilot + phân tích phiên |

Tuần 10–12, **cả ba** thu thập và phân tích thực nghiệm. Đây là kế hoạch dự kiến, không phải cam kết các phiên bản đã tồn tại. Checklist và đầu ra chi tiết từng người nằm ở mục 8; kế hoạch từng tuần ở mục 12.

**Bản v1:** “Ứng dụng quy tắc chạy và đo được.”  
**Bản v2:** “Ứng dụng xếp hạng có xét ngữ cảnh, chưa học sở thích.”  
**Bản v3:** “Ứng dụng cá nhân hóa heuristic, chưa phải reinforcement learning.”  
**Bản nghiên cứu cuối:** “Biết cải tiến nào hữu ích, mức độ nào và trong điều kiện nào, dựa trên số liệu thật.”

### 0.6. Phạm vi kết luận phải đúng với phép đo

- Giao thức chính trong tài liệu đo từ **Bắt đầu chọn sau khi xác nhận ngữ cảnh** đến **Chốt bộ**, có tính thời gian chờ/đổi. Không gọi đó là toàn bộ thời gian chuẩn bị ra khỏi nhà.
- So sánh v1/v2/v3 chỉ cho thấy phiên bản nào tốt hơn phiên bản nào. Nếu muốn nói “nhanh hơn tự chọn không có gợi ý”, cần thêm điều kiện tự chọn với cùng dữ liệu/tác vụ và bố trí thứ tự hợp lý.
- Công nhập ảnh, xác nhận nhãn, cập nhật trạng thái và nhập ngữ cảnh phải được đo riêng nếu muốn bàn về tiết kiệm tổng thời gian.
- Nghiên cứu thăm dò với mẫu nhỏ không bảo đảm có ý nghĩa thống kê và không đại diện mọi sinh viên.
- Nếu chưa có bằng chứng tốt hơn, kết luận đúng là “chưa chứng minh được lợi ích trong điều kiện thử”, không tạo biểu đồ giả để hoàn thành mục tiêu.

### 0.7. Nguồn để đọc và kiểm tra phát biểu về gap

**[1]** Edward Shen, Henry Lieberman, Francis Lam (2007). *What am I gonna wear?: Scenario-Oriented Recommendation*. IUI, bản tác giả. Đọc phần Evaluation/Results, trang PDF 6–7; đây là đối chứng trực tiếp cho việc thời gian chọn đã từng được đo. [Toàn văn từ MIT](https://web.media.mit.edu/~lieber/Publications/What-am-I-Gonna-Wear.pdf).

**[2]** Xintong Han, Zuxuan Wu, Yu-Gang Jiang, Larry S. Davis (2017). *Learning Fashion Compatibility with Bidirectional LSTMs*. ACM Multimedia. Đọc phần Experiments, phân biệt FITB/compatibility với nghiên cứu thời gian người dùng. [Bản tác giả trên arXiv](https://arxiv.org/abs/1707.05691).

**[3]** Leo Woiceshyn, Yuchi Wang, Goldie Nejat, Beno Benhabib (2017). *Personalized Clothing Recommendation by a Social Robot*. IEEE IRIS. Đọc các yếu tố cá nhân hóa và phương pháp đánh giá người dùng; không đồng nhất Likert với thời gian quyết định quan sát. [Toàn văn từ nhóm tác giả](https://asblab.mie.utoronto.ca/sites/default/files/iris-2017-clothing.pdf).

**[4]** Agung Toto Wibowo, Advaith Siddharthan, Judith Masthoff, Chenghua Lin (2018). *Understanding how to Explain Package Recommendations in the Clothes Domain*. IntRS@RecSys. Đọc mục 3–4, trang PDF 3–4: đo thời gian chọn thật, nhưng trên tác vụ người dùng giả định và các kiểu giải thích khác nhau. [Toàn văn CEUR-WS](https://ceur-ws.org/Vol-2225/paper11.pdf).

Các tài liệu này chứng minh **đã có nghiên cứu liên quan**, không cung cấp sẵn kết quả cho hệ thống của nhóm. Khi bổ sung nguồn mới, ghi rõ nó hỗ trợ phát biểu nào và có điều kiện/giới hạn gì.

---

## 1. Hiểu đúng: Nhóm đang giải quyết vấn đề gì?

### 1.1. Một tình huống cụ thể

Một bạn có 6 chiếc áo, 4 chiếc quần và 2 đôi giày. Sáng nay bạn ấy đi thuyết trình, trời có khả năng mưa và một chiếc áo đang giặt.

Nếu ghép mọi khả năng, có:

```text
6 × 4 × 2 = 48 bộ trang phục
```

Nhưng không phải bộ nào cũng dùng được:

- Món đang giặt không thể mặc ngay.
- Một số món không phù hợp với yêu cầu trang phục của buổi thuyết trình.
- Một số món khiến người dùng cảm thấy không phù hợp với thời tiết.
- Một bộ phối hợp hợp lý vẫn có thể không đúng sở thích cá nhân.

Hệ thống cần giúp người dùng đi từ nhiều khả năng xuống một vài lựa chọn dễ quyết định.

### 1.2. Câu hỏi nghiên cứu trung tâm

> Với cùng tủ đồ, ngữ cảnh và giao diện, cách xếp hạng có xét sở thích cùng lịch sử mặc có giúp người dùng chốt trang phục nhanh hơn cách xếp hạng bằng quy tắc cơ bản không, mà vẫn giữ mức chấp nhận được về sự phù hợp?

Đây là **câu hỏi cần kiểm chứng**, chưa phải kết luận.

Không viết trước rằng “hệ thống giảm đáng kể thời gian” khi chưa thực nghiệm. Kết quả có thể là giảm, không thay đổi hoặc thậm chí tăng thời gian.

### 1.3. Phân biệt bốn việc dễ bị nhầm

| Việc | Ví dụ | Có tự chứng minh người dùng chọn nhanh hơn không? |
|---|---|---|
| Chương trình chạy được | Tải ảnh lên và hiển thị 3 bộ | Không |
| Thuật toán chạy nhanh | Sinh gợi ý trong 200 ms thay vì 800 ms | Không; đây là độ trễ xử lý |
| Người dùng chọn nhanh | Thời gian từ bắt đầu phiên đến chốt bộ giảm | Có liên quan trực tiếp, nhưng cần so sánh công bằng |
| Gợi ý có chất lượng | Người dùng thấy bộ phù hợp, có thể mặc | Là điều kiện cần kiểm tra để tránh “nhanh nhưng chọn bừa” |

**Mục tiêu không phải:** Đưa thật nhiều tên công nghệ vào báo cáo.

**Mục tiêu là:** Xây được hệ thống nhỏ, đề xuất được một cải tiến có lý do và đánh giá trung thực tác động của cải tiến đó.

### 1.4. Giới hạn đề tài ở giai đoạn đầu

Phạm vi bắt buộc:

- Gợi ý từ đồ **người dùng đã sở hữu**, không phải tìm sản phẩm để mua.
- Một bộ gồm **áo + quần + giày**.
- Hỗ trợ trước 3 ngữ cảnh: đi học, thuyết trình/họp, đi chơi.
- Mỗi lượt đưa ra tối đa 3 bộ, không có nghĩa lúc nào cũng đủ 3 bộ.
- Chạy trên máy tính bằng ứng dụng web đơn giản.
- Cho phép người dùng sửa thuộc tính bị nhận dạng sai.

Chưa làm trong bản đầu:

- Thử đồ ảo lên cơ thể, sinh ảnh người mặc đồ.
- Nhận dạng vóc dáng, khuôn mặt hoặc suy luận thuộc tính nhạy cảm.
- Mua sắm, thanh toán, mạng xã hội, ứng dụng Android/iOS riêng.
- Phối nhiều lớp, váy liền, phụ kiện và mọi loại trang phục cùng lúc.
- Huấn luyện mô hình lớn, triển khai hệ thống phục vụ hàng nghìn người.

Chỉ mở rộng khi bản cơ bản đã vượt qua kiểm thử và được giảng viên đồng ý.

---

## 2. Những khái niệm cần hiểu bằng lời đơn giản

| Khái niệm | Hiểu trong đề tài này |
|---|---|
| Dữ liệu | Thông tin về áo, quần, giày, thời tiết và các lần chọn đồ |
| Thuộc tính — feature | Đặc điểm của một món: loại, màu, độ trang trọng… |
| Nhãn — label | Câu trả lời dùng để kiểm tra, chẳng hạn người dùng xác nhận “đây là áo” |
| JSON | Cách ghi dữ liệu có cấu trúc để các phần chương trình trao đổi với nhau |
| Hàm | Một phần chương trình nhận đầu vào, xử lý và trả kết quả |
| Module | Một nhóm chức năng có trách nhiệm rõ ràng, chẳng hạn lọc đồ đang giặt |
| API | Cách chương trình yêu cầu một hệ thống khác cung cấp dữ liệu, ví dụ thời tiết |
| Quy tắc — rule | Điều kiện do người viết đặt ra: nếu đồ đang giặt thì không gợi ý |
| Điểm — score | Một con số dùng để sắp xếp các bộ, không tự động là xác suất hay “độ đẹp khách quan” |
| Baseline | Phương pháp đơn giản được giữ lại để làm mốc so sánh |
| Học máy — machine learning | Học một quy luật từ dữ liệu thay vì viết toàn bộ quy tắc bằng tay |
| Mô hình pretrained | Mô hình đã được bên khác huấn luyện; nhóm có thể dùng để dự đoán |
| Inference | Dùng mô hình đã có để đưa ra dự đoán; khác với huấn luyện lại |
| Embedding | Dãy số biểu diễn một món đồ để máy tính xử lý hoặc so sánh |
| Cá nhân hóa | Hai người có cùng tủ đồ và thời tiết vẫn có thể nhận thứ tự gợi ý khác nhau |
| Agent | Trợ lý AI có thể đọc, sửa tệp và chạy công cụ khi được cấp quyền; vẫn có thể hiểu sai hoặc viết sai |
| Test | Ví dụ đầu vào có kết quả mong đợi, dùng để kiểm tra chương trình |
| Ablation | Tắt riêng một thành phần để xem thành phần đó thực sự đóng góp gì |

**Chưa cần học ngay:** CNN, Siamese Network, LinUCB, Thompson Sampling, huấn luyện reinforcement learning. Đây là kiến thức mở rộng, không phải điều kiện để bắt đầu đề tài.

### 2.1. Các em có thể nghiên cứu mà chưa biết học máy không?

Có. Chẳng hạn, nhóm có thể kiểm tra:

> Việc kết hợp điểm phù hợp ngữ cảnh với điểm sở thích đơn giản và phạt mặc lặp có tốt hơn chỉ dùng quy tắc màu sắc hay không?

Đây là một nghiên cứu ứng dụng nhỏ nếu có giả thuyết rõ, thiết kế so sánh hợp lý, dữ liệu thật và phân tích kết quả. Không được gọi một công thức đếm đơn giản là “mô hình học tăng cường mới”.

---

## 3. Ba phiên bản vừa sức, không nhảy thẳng vào AI phức tạp

Giữ tên v1.0, v2.0, v3.0 để dễ đối chiếu với định hướng ban đầu, nhưng điều chỉnh mức triển khai cho phù hợp năng lực hiện tại.

| Phiên bản | Nội dung phải làm | Nội dung chưa bắt buộc | Điều cần chứng minh |
|---|---|---|---|
| **v1.0 — Bản cơ bản** | Nhập thuộc tính thủ công; lọc đồ không dùng được; ghép áo–quần–giày; chấm điểm quy tắc; giao diện chọn bộ; ghi log | Tách nền, mô hình thị giác, cá nhân hóa | Luồng chạy đúng và số đo thời gian đáng tin |
| **v2.0 — Bản cải tiến ngữ cảnh** | Chấm điểm mềm theo thời tiết/sự kiện từ dữ liệu đã xác nhận; cùng giao diện v1 | Gợi ý màu từ ảnh, API thời tiết, pretrained classification, embedding | Đóng góp của ngữ cảnh; không đánh đồng tự động nhập ảnh với cải tiến xếp hạng |
| **v3.0 — Bản cá nhân hóa đơn giản** | Re-ranking bằng lịch sử lựa chọn và giảm ưu tiên đồ vừa mặc; đo thời gian, số lần đổi, mức hài lòng | Contextual Bandit, học online nâng cao | Có giảm thời gian và số lần đổi mà không làm chất lượng giảm hay không |

### 3.1. Điều chỉnh quan trọng so với định hướng ban đầu

1. **Không yêu cầu tự động hóa hoàn toàn khâu thêm đồ.** Màu có thể ước lượng từ ảnh, nhưng chất liệu, độ dày và độ phù hợp thời tiết thường cần người dùng xác nhận.
2. **Không bắt buộc CLIP/CNN ở v2.0.** Nếu bản quy tắc còn sai thì thêm mô hình chỉ làm khó xác định nguyên nhân.
3. **Không bắt buộc reinforcement learning ở v3.0.** Ưu tiên cách re-ranking bằng số đếm mà cả nhóm giải thích được.
4. **Không dùng mô phỏng để kết luận người thật chọn nhanh hơn.** Mô phỏng chỉ hỗ trợ kiểm thử thuật toán và độ trễ.
5. **Không gắn nhãn “tối ưu toàn cục” cho Top-3.** Đây là 3 bộ có điểm cao nhất theo cách chấm điểm hiện tại, không chắc là 3 bộ tốt nhất trong thực tế.

### 3.2. Cửa dừng an toàn

- v1.0 chưa đúng: chưa thêm mô hình thị giác.
- v2.0 chưa ổn định: chưa làm bandit.
- Chưa có người tham gia thực nghiệm: chỉ kết luận về chức năng và tính khả thi kỹ thuật, chưa kết luận giảm thời gian cho người dùng.
- Nếu giảng viên yêu cầu bắt buộc một thành phần học máy: dùng **một mô hình pretrained cho một tác vụ hẹp**, ví dụ phân loại áo/quần/giày, và đánh giá riêng độ đúng của tác vụ đó.

---

## 4. Hệ thống gồm những phần nào?

### 4.1. Luồng số hóa tủ đồ

```text
Ảnh một món đồ
    ↓
Người dùng nhập hoặc hệ thống gợi ý thuộc tính
    ↓
Người dùng kiểm tra, sửa và xác nhận
    ↓
Lưu món đồ vào tủ cá nhân
```

Tách nền và tự nhận dạng chỉ hỗ trợ nhập liệu. Nhận dạng sai không được âm thầm biến thành dữ liệu “đúng”.

### 4.2. Luồng gợi ý mỗi ngày

```text
Tủ đồ + Ngữ cảnh + Trạng thái sẵn sàng
    ↓
Lọc món không được phép sử dụng
    ↓
Ghép áo + quần + giày thành các bộ hợp lệ
    ↓
Chấm điểm từng bộ
    ↓
Cá nhân hóa và giảm ưu tiên đồ vừa mặc nếu chạy v3.0
    ↓
Hiển thị tối đa 3 bộ
    ↓
Người dùng chọn / đổi bộ / kết thúc mà không chọn
    ↓
Lưu sự kiện và kết quả phiên
```

### 4.3. Phân biệt “loại bỏ” và “giảm điểm”

**Ràng buộc cứng — hard constraint:** Không được vi phạm.

- Món thuộc tủ của người khác.
- Món đang giặt hoặc được đánh dấu không khả dụng.
- Một bộ thiếu áo, quần hoặc giày trong phạm vi hiện tại.
- Quy định trang phục bắt buộc đã được người dùng xác nhận.

**Ưu tiên mềm — soft preference:** Có thể phù hợp ít hơn, nhưng chưa chắc phải loại.

- Màu người dùng ít chọn.
- Áo vừa mặc gần đây nhưng đã sạch và sẵn sàng.
- Kiểu phối chưa đúng sở thích.
- Mức phù hợp nhiệt độ theo cảm nhận cá nhân.

Không tự đặt quy tắc “trời mưa thì cấm giày trắng” như một chân lý. Đây có thể là sở thích của một người, không phải của tất cả mọi người. Tương tự, ngưỡng “lạnh” phụ thuộc điều kiện địa phương và người sử dụng.

Riêng v1.0 có thể dùng bộ lọc ngưỡng thời tiết để tạo baseline đơn giản. Đây là **heuristic thử nghiệm**, không phải ràng buộc bắt buộc của người dùng. Cần ghi riêng lý do loại theo heuristic để phân biệt với lý do không được phép dùng như đồ đang giặt; v2.0 sẽ thử thay phần heuristic này bằng điểm mềm.

### 4.4. Khi không đủ bộ để gợi ý

- Có 2 bộ hợp lệ: hiển thị 2 bộ.
- Có 1 bộ: hiển thị 1 bộ.
- Không có bộ: giải thích chính xác lý do. Nếu thiếu giày hoặc toàn bộ quần đang giặt, cần cập nhật tủ/trạng thái thực tế; nới ưu tiên màu sắc không giải quyết được.
- Nếu hết bộ chỉ do bộ lọc heuristic hoặc ưu tiên do người dùng đặt, có thể đề nghị người dùng tự điều chỉnh; ghi lại việc điều chỉnh nếu đang thực nghiệm.
- Không tự ý đưa đồ đang giặt trở lại chỉ để đủ Top-3.
- Không tạo ra món đồ không có thật trong tủ.
- Khi đã xem hết các bộ: thông báo đã hết lựa chọn mới, không lặp vô hạn mà không giải thích.

---

## 5. Tổ chức thư mục và thống nhất dữ liệu

### 5.1. Cấu trúc đề xuất

Đây là cấu trúc nhóm sẽ tạo khi bắt đầu lập trình, không phải một dự án đã được cài đặt sẵn.

```text
smart-outfit-recommender/
├── core/
│   ├── schema.py
│   └── pipeline_manager.py
├── modules/
│   ├── vision_extractor/
│   ├── context_filter/
│   ├── compatibility_scorer/
│   └── user_preference/
├── app_ui/
│   └── app.py
├── datasets/
│   └── sample_wardrobe.json
├── tests/
├── experiments/
├── evaluate_simulation.py
├── evaluate_sessions.py
├── requirements.txt
└── .gitignore
```

Vai trò:

- `schema.py`: Quy ước chung về dữ liệu. Không phải mỗi người tự đặt một kiểu.
- `pipeline_manager.py`: Gọi các module theo đúng thứ tự; không chứa mọi thuật toán.
- `vision_extractor/`: Gợi ý thuộc tính từ ảnh.
- `context_filter/`: Đọc ngữ cảnh và kiểm tra ràng buộc.
- `compatibility_scorer/`: Ghép bộ, chấm điểm quy tắc và ngữ cảnh.
- `user_preference/`: Tính điểm sở thích và mức phạt lặp. Tên này tránh hiểu nhầm rằng nhóm đã triển khai RL.
- `tests/`: Kiểm thử nhỏ cho từng hàm và cả luồng.
- `experiments/`: Cấu hình thí nghiệm và kết quả đã loại thông tin nhận dạng.
- `evaluate_simulation.py`: Kiểm thử bằng dữ liệu giả lập, đo số ứng viên và độ trễ.
- `evaluate_sessions.py`: Tính chỉ số từ phiên người dùng thật.

Ảnh riêng tư, khóa API, log thô có thông tin cá nhân và môi trường `.venv` không được đưa lên kho mã công khai.

### 5.2. Bộ công cụ tối thiểu

- Python 3.11 hoặc 3.12, thống nhất một phiên bản đã kiểm tra tương thích.
- Một trình soạn thảo mà nhóm biết sử dụng; AI agent là công cụ hỗ trợ, không thay thế kiến thức Python.
- Git để lưu lịch sử và ghép công việc.
- JSON cho dữ liệu ban đầu.
- `pytest` cho kiểm thử.
- `Streamlit` cho giao diện mẫu.
- `Pillow` để đọc và xử lý ảnh đơn giản.
- `requests` chỉ khi bắt đầu gọi API thời tiết.

Chưa cần React, Docker, cơ sở dữ liệu vector hoặc máy có GPU.

Nhóm chỉ chọn một cách dựng giao diện. Mục tiêu là nghiên cứu cách gợi ý, không phải cùng lúc học nhiều framework.

#### Bắt đầu môi trường lập trình như thế nào?

Mở Terminal tại thư mục dự án do nhóm tạo. Chọn đúng nhóm lệnh theo hệ điều hành, không chạy cả hai. Ví dụ dưới đây dùng Python 3.11; nếu nhóm đã thống nhất 3.12 thì thay số phiên bản tương ứng.

**macOS/Linux:**

```bash
python3.11 --version
python3.11 -m venv .venv
.venv/bin/python -m pip install pytest
.venv/bin/python -m pytest --version
```

**Windows — PowerShell:**

```powershell
py -3.11 --version
py -3.11 -m venv .venv
.\.venv\Scripts\python.exe -m pip install pytest
.\.venv\Scripts\python.exe -m pytest --version
```

Dấu hiệu đúng: lệnh đầu hiển thị Python 3.11.x, thư mục `.venv` được tạo, lệnh cuối hiển thị phiên bản pytest. Nếu lệnh đầu báo không tìm thấy Python, dừng để kiểm tra việc cài Python với giảng viên hoặc bạn hỗ trợ; chưa chạy tiếp các lệnh sau.

Các lệnh dùng trực tiếp Python trong `.venv`, nên chưa cần kích hoạt môi trường hoặc thay đổi chính sách thực thi của PowerShell. Môi trường ảo giúp thư viện của dự án không lẫn với dự án khác.

Sau khi tự viết bài 1 vào tệp `exercise_01.py`, chạy:

```bash
# macOS/Linux
.venv/bin/python exercise_01.py
```

```powershell
# Windows
.\.venv\Scripts\python.exe exercise_01.py
```

Khi bắt đầu viết test, đặt chúng trong `tests/`, tên tệp bắt đầu bằng `test_` và tên hàm kiểm thử cũng bắt đầu bằng `test_`. Ví dụ `tests/test_wardrobe.py` chứa những kiểm thử do các em tự viết.

Chạy test bằng `.venv/bin/python -m pytest` trên macOS/Linux hoặc `.\.venv\Scripts\python.exe -m pytest` trên Windows. `passed` nghĩa là các test đã chạy đạt; `no tests ran` nghĩa là chưa có hoặc chưa tìm thấy test, **không phải kiểm thử đã đạt**.

Đến tuần làm giao diện mới cài Streamlit và Pillow bằng Python của môi trường này:

```bash
# macOS/Linux — chạy khi đã có app_ui/app.py
.venv/bin/python -m pip install streamlit Pillow
.venv/bin/python -m streamlit run app_ui/app.py
```

```powershell
# Windows — chạy khi đã có app_ui/app.py
.\.venv\Scripts\python.exe -m pip install streamlit Pillow
.\.venv\Scripts\python.exe -m streamlit run app_ui/app.py
```

Mở địa chỉ local mà terminal thực tế hiển thị. Đây là ứng dụng trên máy để phát triển, chưa phải triển khai công khai. Ghi lại các phiên bản thư viện đã chạy được vào `requirements.txt` trước khi chia sẻ cho thành viên khác.

### 5.3. Item — Một món đồ

Ví dụ dữ liệu minh họa, không phải dữ liệu người dùng thật:

```json
{
  "item_id": "item_001",
  "user_id": "user_demo",
  "category": "top",
  "image_path": "images/item_001.jpg",
  "color_group": "white",
  "formality": "formal",
  "warmth": "light",
  "available": true,
  "last_worn_at": null
}
```

Quy ước tối thiểu:

| Trường | Ý nghĩa | Quy ước |
|---|---|---|
| `item_id` | Mã món đồ | Duy nhất, không đổi sau mỗi lần tải ảnh |
| `user_id` | Chủ tủ đồ | Dùng mã giả, không cần họ tên thật |
| `category` | Loại món | `top`, `bottom`, `footwear` |
| `image_path` | Ảnh minh họa | Ảnh không bắt buộc cho bài tập đầu tiên |
| `color_group` | Nhóm màu | Nhóm thống nhất trước, ví dụ `black`, `white`, `gray`, `blue`, `other`, `unknown` |
| `formality` | Độ trang trọng | `casual`, `smart_casual`, `formal`, `unknown` |
| `warmth` | Mức giữ ấm | `light`, `medium`, `warm`, `unknown`; người dùng xác nhận |
| `available` | Có thể dùng ngay không? | `true` hoặc `false` |
| `last_worn_at` | Lần thực sự mặc gần nhất | Thời điểm có múi giờ hoặc `null` nếu chưa có dữ liệu |

Phân biệt ba trạng thái:

- Hệ thống **đã gợi ý** món.
- Người dùng **đã chọn** bộ.
- Người dùng **đã mặc** bộ.

Ba việc không đồng nghĩa. Chỉ cập nhật `last_worn_at` khi người dùng xác nhận đã mặc; không tự suy ra từ một cú bấm chọn thử.

Ở giai đoạn xử lý ảnh, bổ sung thông tin như nguồn nhãn `manual`/`auto`, phiên bản bộ nhận dạng và việc người dùng đã xác nhận hay chưa. Nếu lưu giá trị HSV, phải thống nhất thang đo giữa các thư viện; không trộn các thang hue khác nhau.

### 5.4. Context — Ngữ cảnh

```json
{
  "user_id": "user_demo",
  "occasion": "presentation",
  "temperature_c": 24.0,
  "rain_probability": 0.7,
  "weather_source": "manual",
  "observed_at": "2026-10-29T07:00:00+07:00"
}
```

- `occasion`: Trước hết chỉ dùng `study`, `presentation`, `leisure`.
- `temperature_c`: Đơn vị độ C, không nhầm với Kelvin.
- `rain_probability`: Trong khoảng 0–1; khác với lượng mưa tính bằng mm.
- `weather_source`: `manual`, `api` hoặc nguồn đã thống nhất.
- Trường không lấy được từ API phải được đánh dấu thiếu, không tự đổi thành 0.

Bản đầu cho nhập ngữ cảnh thủ công. Khi nối API, người dùng vẫn có quyền sửa.

Không cần vị trí GPS chính xác. Chọn thành phố thường đủ cho bản thử nghiệm; kiểm tra điều khoản sử dụng, hạn mức và cách bảo vệ khóa API của nhà cung cấp.

### 5.5. Outfit — Một bộ trang phục

```json
{
  "outfit_id": "item_001|item_007|item_012",
  "item_ids": ["item_001", "item_007", "item_012"],
  "score": 0.76,
  "score_parts": {
    "color": 0.8,
    "style": 0.7
  },
  "reasons": ["Điểm phối màu: 0.8 theo bảng quy tắc", "Điểm phong cách: 0.7 theo bảng quy tắc"]
}
```

Các con số trên chỉ minh họa định dạng, không phải kết quả đánh giá.

- Một bộ phải có đúng một `top`, một `bottom`, một `footwear`.
- `outfit_id` được tạo nhất quán theo thứ tự loại món để phát hiện bộ trùng.
- `score_parts` chứa các thành phần điểm mà phiên bản đó thực sự dùng; không yêu cầu mọi phiên bản có cùng các khóa thành phần.
- Lý do gợi ý phải được tạo từ quy tắc hoặc điểm thực tế, không để AI tự bịa lời giải thích.

### 5.6. Hợp đồng giữa các module

Nhóm cùng thống nhất các hàm ở mức ý nghĩa trước khi viết code:

```text
extract_attributes(image) → thuộc tính gợi ý, cho phép unknown
filter_items(items, context) → món hợp lệ + lý do món bị loại
build_outfits(valid_items) → danh sách bộ hợp lệ
score_outfit(outfit, items_by_id, context) → tổng điểm + điểm thành phần
rerank(outfits, items_by_id, user_history, context) → danh sách đã đổi thứ tự
recommend(items, context, user_history, version, excluded_outfit_ids) → tối đa 3 bộ
log_event(event) → lưu sự kiện của phiên
```

`items_by_id` là dictionary tra món đồ theo mã, ví dụ `items_by_id["item_001"]` trả về Item tương ứng. Outfit chỉ giữ mã món, nên hàm chấm điểm cần nhận dictionary này để đọc màu, phong cách và các thuộc tính; không dùng biến toàn cục ngầm định.

`excluded_outfit_ids` dùng để tránh đưa lại ngay các bộ vừa hiển thị khi người dùng bấm đổi.

**Quy tắc tích hợp:** Nếu sửa tên trường hoặc kiểu dữ liệu, phải báo cả nhóm, sửa kiểm thử liên quan và cùng xác nhận; không âm thầm đổi `category` thành `type` trong riêng một module.

---

## 6. Hai tuần đầu: Học gì và làm bài tập gì?

### 6.1. Kiến thức nền tối thiểu

Mỗi thành viên phải làm được:

1. Viết và gọi hàm Python.
2. Dùng `list`, `dict`, vòng lặp và câu lệnh điều kiện.
3. Đọc/ghi một tệp JSON.
4. Sắp xếp danh sách theo một trường điểm.
5. Đọc thông báo lỗi và tìm dòng lỗi đầu tiên trong code của mình.
6. Viết một kiểm thử đơn giản.
7. Giải thích được đầu vào, đầu ra của hàm mình viết.
8. Dùng Git để xem thay đổi, lưu một thay đổi nhỏ và tạo nhánh làm việc.

Chưa cần lập trình hướng đối tượng phức tạp. Chưa cần tự xây một framework.

### 6.2. Chuỗi bài tập chung — tất cả thành viên đều làm

#### Bài 1 — Mô tả tủ đồ không dùng AI

- Tạo dữ liệu gồm 2 áo, 2 quần, 1 đôi giày.
- Đọc dữ liệu và in tên/mã từng món.
- Đếm số món thuộc mỗi loại.

**Nộp:** Dữ liệu JSON, chương trình chạy được, ảnh hoặc bản ghi kết quả.

**Phải trả lời:** Vì sao cần mã món đồ thay vì chỉ dùng tên “áo trắng”?

#### Bài 2 — Lọc đồ đang giặt

- Đánh dấu một chiếc quần `available = false`.
- Viết hàm chỉ trả về các món sẵn sàng.
- Không xóa chiếc quần đó khỏi dữ liệu gốc.

**Kiểm thử:** Đầu vào có 5 món, 1 món không sẵn sàng; đầu ra có 4 món và không chứa mã món bị loại.

#### Bài 3 — Ghép bộ bằng vòng lặp

- Ghép mỗi áo với mỗi quần và mỗi đôi giày.
- Trước khi lọc có `2 × 2 × 1 = 4` bộ.
- Sau khi lọc chiếc quần đang giặt còn `2 × 1 × 1 = 2` bộ.

**Phải giải thích:** Vì sao lọc trước khi ghép tiết kiệm công việc hơn ghép mọi thứ rồi mới loại?

#### Bài 4 — Chấm điểm và lấy Top-3

- Viết một bảng điểm màu sắc đơn giản do nhóm thống nhất.
- Tính điểm cho từng bộ, sắp xếp giảm dần.
- Nếu chỉ có 2 bộ thì trả 2 bộ.
- Nếu hai bộ bằng điểm, dùng quy tắc phụ cố định, chẳng hạn thứ tự `outfit_id`.

**Phải giải thích:** Vì sao cùng đầu vào nên cho cùng kết quả khi chạy baseline?

#### Bài 5 — Viết kiểm thử

Ít nhất 5 trường hợp:

- Đủ đồ, ghép được bộ.
- Không có giày, không ghép được bộ.
- Tất cả quần đang giặt.
- Có ít hơn 3 bộ.
- Hai bộ có điểm bằng nhau.

#### Bài 6 — Giải thích lại mà không nhìn AI

Mỗi người chọn một hàm mình đã làm và trình bày trong 3–5 phút:

- Dữ liệu đi vào là gì?
- Từng bước xử lý ra sao?
- Dữ liệu trả về là gì?
- Khi nào hàm trả danh sách rỗng?
- Test nào giúp phát hiện hàm bị viết sai?

**Điều kiện chia nhánh:** Không thành viên nào chỉ biết chạy chương trình mà không giải thích được bài 1–5.

### 6.3. Nhịp tự học đề xuất

Mỗi buổi khoảng 90 phút:

- 20 phút đọc hoặc xem một chủ đề nhỏ.
- 40 phút tự viết và chạy một bài tập.
- 20 phút kiểm thử, sửa lỗi.
- 10 phút ghi lại điều đã hiểu và câu hỏi còn vướng.

Một tuần có thể dành 6–8 giờ/người nếu phù hợp lịch học. Đây là ước lượng để lập kế hoạch, không phải yêu cầu cố định; báo giảng viên nếu thời lượng thực tế thấp hơn để giảm phạm vi.

---

## 7. Cách xây thuật toán từ dễ đến khó

### 7.1. v1.0 — Quy tắc đơn giản, giải thích được

Các bước:

1. Lấy đúng tủ của người đang sử dụng.
2. Lọc đồ không sẵn sàng và các ràng buộc bắt buộc đã xác nhận.
3. Áp dụng bảng lọc thời tiết cơ bản đã thống nhất cho baseline.
4. Chia danh sách thành áo, quần, giày.
5. Ghép các tổ hợp hợp lệ.
6. Tính điểm màu sắc và phong cách bằng bảng quy tắc.
7. Sắp xếp, loại bộ trùng và lấy tối đa 3 bộ chưa hiển thị.

Công thức khởi đầu để học, **không phải công thức đã được chứng minh tốt**:

```text
S1 = 0.6 × ColorScore + 0.4 × StyleScore
```

Mỗi điểm thành phần nằm trong khoảng 0–1.

Ví dụ cách làm đơn giản:

- Nhóm màu trung tính kết hợp với một màu khác được điểm thuận lợi theo bảng của nhóm.
- Các món có độ trang trọng phù hợp nhau được điểm cao hơn.
- Nhãn `unknown` dùng mức điểm mặc định đã công bố, không tự coi là hoàn toàn phù hợp.

Bảng quy tắc cần lưu thành dữ liệu hoặc cấu hình dễ kiểm tra. Không rải các con số khác nhau trong nhiều hàm.

**Giới hạn phải ghi trong báo cáo:** Bảng màu và phong cách là giả định thực nghiệm, không phải quy luật thẩm mỹ đúng với mọi người.

### 7.2. v2.0 — Ngữ cảnh bắt buộc, hỗ trợ ảnh tùy chọn

Tách thành phần nghiên cứu chính khỏi tính năng hỗ trợ. Với nhóm 3 người, hoàn thành A là đủ mốc v2.0; B chỉ làm khi không ảnh hưởng tiến độ đo lường.

**A. Cải tiến xếp hạng — bắt buộc:**

Thay vì mọi điều kiện thời tiết đều là “được/không được”, cho điểm mức độ phù hợp để tránh loại quá nhiều lựa chọn vì ngưỡng cứng.

```text
S2 = 0.3 × WeatherFit + 0.3 × OccasionFit + 0.4 × Compatibility
```

Trong bản vừa sức, `Compatibility` có thể chính là điểm quy tắc màu/phong cách của v1.0. Như vậy vẫn kiểm tra được đóng góp của ngữ cảnh mà chưa cần mô hình embedding.

- Định nghĩa rõ cách tính từng điểm.
- Các điểm thành phần cùng thang 0–1.
- Các ràng buộc cứng như quyền sở hữu và đồ đang giặt luôn giữ nguyên ở mọi phiên bản.
- Ngưỡng và trọng số chỉ chỉnh bằng dữ liệu thử phát triển, không chỉnh sau khi xem kết quả kiểm tra cuối.

**B. Hỗ trợ nhập ảnh — tùy chọn, đánh giá riêng:**

Làm theo thứ tự:

1. Đọc ảnh và hiển thị đúng chiều.
2. Thử ảnh một món đồ trên nền đơn giản.
3. Trích màu trong vùng món đồ; tránh lấy màu nền làm màu áo.
4. Gợi ý nhóm màu.
5. Cho người dùng xác nhận hoặc sửa.
6. Khi bước trước ổn định mới thử `rembg` hoặc mô hình phân loại pretrained.

Không phải mọi ảnh đều nhận dạng được. Đồ nhiều họa tiết, ánh sáng màu, vùng bóng và ảnh chụp nhiều món có thể gây sai; cần cho phép kết quả `unknown` hoặc yêu cầu chụp lại.

### 7.3. Embedding giống nhau chưa chắc phối hợp tốt

Hai chiếc áo gần như giống nhau có thể có embedding rất gần nhau. Điều đó không có nghĩa chúng tạo thành một bộ áo–quần–giày.

Ngược lại, áo và giày phối tốt với nhau không nhất thiết có hình ảnh giống nhau.

Vì vậy:

- Không gọi cosine similarity trực tiếp là “độ đẹp của outfit”.
- Nếu thử CLIP/Fashion-CLIP, coi đây là một phương án cần kiểm chứng.
- Chỉ đưa vào phiên bản chính nếu có dữ liệu đánh giá phối hợp và có cải thiện đủ thuyết phục.
- Nếu dùng pretrained, ghi rõ mô hình, phiên bản, nguồn và điều kiện sử dụng.

### 7.4. v3.0 — Cá nhân hóa bằng số đếm, chưa cần RL

Cách dễ triển khai:

1. Khi người dùng chọn một bộ, tăng số đếm cho nhóm màu/phong cách xuất hiện trong lựa chọn đó.
2. Một nhóm thuộc tính có số đếm `c` được chuyển thành điểm đơn giản `c / (c + 2)`.
3. Lấy trung bình điểm các thuộc tính đã thống nhất để có `PreferenceScore` trong khoảng 0–1.
4. Nếu chưa có lịch sử lựa chọn, dùng nguyên `S2` làm điểm nền và không cộng điểm sở thích.
5. Một món vừa được xác nhận đã mặc sẽ nhận mức giảm ưu tiên theo số ngày gần nhất, kể cả khi chưa có lịch sử lựa chọn trên ứng dụng.

Ví dụ mức phạt từng món:

```text
Nếu chưa có lần mặc trước: RecentItemPenalty = 0
Nếu đã có: RecentItemPenalty = max(0, 1 - days_since_last_worn / 3)
RotationPenalty = trung bình RecentItemPenalty của 3 món
```

Ví dụ công thức kết hợp, xác định rõ từng trường hợp:

```text
Có lịch sử lựa chọn:
S3 = 0.75 × S2 + 0.25 × PreferenceScore - 0.20 × RotationPenalty

Chưa có lịch sử lựa chọn:
S3 = S2 - 0.20 × RotationPenalty
```

Nếu chưa có cả lịch sử lựa chọn lẫn lịch sử mặc, `RotationPenalty = 0` và `S3 = S2`. Viết test riêng cho trường hợp chưa từng chọn trên ứng dụng nhưng đã khai báo lần mặc gần nhất.

Đây chỉ là cấu hình ban đầu để thử nghiệm. Tổng điểm có thể âm; không hiển thị nó như xác suất hoặc phần trăm chắc chắn phù hợp.

Lưu ý:

- Đồ đang giặt đã bị loại từ trước, không chỉ bị giảm điểm.
- Một món vừa mặc nhưng đã sạch vẫn có thể được gợi ý khi ít lựa chọn; lặp lại là ưu tiên mềm.
- Nếu chưa có lịch sử lựa chọn, v3.0 dùng `S2` và vẫn có thể áp dụng phạt lặp nếu có lịch sử mặc thực tế.
- Không cập nhật sở thích chỉ vì hệ thống hiển thị một bộ.
- Chưa chọn không đồng nghĩa với ghét. Bấm đổi có thể do nhiều nguyên nhân.
- Số đếm lựa chọn bị ảnh hưởng bởi những gì hệ thống từng cho xem; đây là heuristic, chưa phải ước lượng sở thích không thiên lệch.
- Không dùng lựa chọn tương lai để tính gợi ý cho một phiên trong quá khứ.

Nếu chưa có bằng chứng v3.0 tốt hơn, giữ nó là phương án thử nghiệm; không mặc định phiên bản số lớn hơn là tốt hơn.

### 7.5. Khi nào mới học Contextual Bandit?

Chỉ xem là hướng mở rộng sau khi hệ thống và thực nghiệm chính đã ổn.

Trước khi dùng, nhóm phải trả lời được:

- **Context:** Thuật toán nhìn thấy những thông tin nào trước khi gợi ý?
- **Action:** Nó chọn một bộ hay chọn cả danh sách 3 bộ?
- **Reward:** “Chốt”, “đổi” và thời gian được chuyển thành phản hồi như thế nào?
- **Exploration:** Có cho thử lựa chọn chưa chắc phù hợp không? Giới hạn trải nghiệm ra sao?
- **Evaluation:** Đánh giá chính sách khác nhau bằng dữ liệu nào, khi người dùng chỉ phản hồi những gì đã được hiển thị?

Chưa trả lời được thì chưa nên viết LinUCB hay Thompson Sampling bằng cách sao chép code do AI tạo.

---

## 8. Phân công chính thức: Nhóm 3 thành viên

**Chỉ có 3 vai trò.** Gộp dữ liệu và ngữ cảnh vào một đầu mối; không chia người thứ tư làm AI. Thị giác nâng cao và API thời tiết là phần tùy chọn để tránh quá tải. Cả ba cùng hiểu schema, baseline và cách đo.

### 8.1. SV 1 — Tủ đồ, dữ liệu và ngữ cảnh

**Nhánh:** `feat/wardrobe-context`  
**Phụ trách:** `core/schema.py`, dữ liệu mẫu, `modules/context_filter/`; `modules/vision_extractor/` chỉ khi mở rộng được duyệt.

**Câu hỏi em chịu trách nhiệm:** “Những món nào thực sự dùng được, và phù hợp ngữ cảnh đến đâu?”

**Để có v1.0:**

1. Soạn Item/Context mẫu, cùng cả nhóm thống nhất schema.
2. Tạo 30–50 món mẫu có quyền sử dụng; cho nhập/sửa nhãn thủ công.
3. Viết hàm đọc tủ, cập nhật `available`, lọc đúng người sở hữu và đồ sẵn sàng.
4. Viết bảng ngữ cảnh nhập tay và bộ lọc nhiệt độ baseline, trả lý do loại.
5. Gửi SV 2 danh sách món hợp lệ; gửi SV 3 cấu trúc biểu mẫu nhập/sửa.

**Để có v2.0:**

1. Tách ràng buộc cứng khỏi điểm phù hợp mềm.
2. Viết `WeatherFit` và `OccasionFit`, có ví dụ tính tay.
3. Giữ dữ liệu thiếu là `unknown`, không tự coi là phù hợp hoàn toàn.
4. Chỉ khi phần bắt buộc đã xong mới thử gợi ý màu từ ảnh nền đơn giản hoặc nối một API thời tiết; không làm cả hai bằng mọi giá.

**Để có v3.0 và thực nghiệm:**

1. Lưu lịch sử đã mặc tách khỏi lịch sử đã chọn; thêm thao tác xác nhận đã mặc với SV 3.
2. Tạo snapshot tủ/ngữ cảnh đã ẩn danh để các phiên bản dùng cùng đầu vào.
3. Kiểm tra quyền sử dụng ảnh, nhãn và sự nhất quán dữ liệu.
4. Cùng SV 3 kiểm tra các phiên bị loại hoặc thiếu dữ liệu; không sửa nhãn sau khi xem kết quả để ưu ái một phiên bản.

**Phải bàn giao:** Schema, dữ liệu mẫu, bảng quy tắc, module lọc/điểm ngữ cảnh, test và bảng lỗi dữ liệu. Nếu có nhận dạng màu, thêm bảng đúng/sai và ví dụ thất bại.

**Nghiệm thu:** Không lọt đồ của người khác/đang giặt; thiếu giày trả không có bộ; đầu vào thiếu nhiệt độ được ghi nhận rõ. Giải thích được một món bị loại vì ràng buộc hay chỉ vì heuristic.

**Tự học:** `dict`, JSON → hàm lọc → đơn vị thời tiết → hard/soft constraints → xử lý ảnh hoặc HTTP/API nếu còn thời gian.

### 8.2. SV 2 — Ghép bộ, xếp hạng và cá nhân hóa

**Nhánh:** `feat/outfit-ranking`  
**Phụ trách:** `modules/compatibility_scorer/`, `modules/user_preference/`, `evaluate_simulation.py`.

**Câu hỏi em chịu trách nhiệm:** “Trong các bộ dùng được, nên đưa bộ nào lên trước và vì sao?”

**Để có v1.0:**

1. Nhận danh sách món hợp lệ từ SV 1.
2. Sinh tổ hợp áo–quần–giày; loại trùng và tính điểm quy tắc màu/phong cách.
3. Xếp hạng có quy tắc phụ cố định khi bằng điểm.
4. Trả tối đa 3 bộ và lý do thật cho SV 3; hỗ trợ loại các bộ đã hiển thị khi bấm đổi.
5. Viết test tủ nhỏ có thể kiểm tra toàn bộ bằng tay.

**Để có v2.0:**

1. Nhận `WeatherFit`, `OccasionFit` từ SV 1.
2. Kết hợp thành `S2`, chuẩn hóa thang điểm và tách cấu hình trọng số.
3. Chạy v1/v2 trên cùng dữ liệu, giải thích trường hợp thứ tự thay đổi.
4. Đo độ trễ và số ứng viên; không gọi đây là thời gian quyết định của người dùng.

**Để có v3.0 và thực nghiệm:**

1. Nhận lịch sử lựa chọn từ log của SV 3 và lịch sử mặc từ dữ liệu của SV 1.
2. Viết điểm sở thích bằng số đếm và phạt lặp; xử lý người mới theo công thức ở mục 7.
3. Có cách tắt riêng sở thích/phạt lặp phục vụ ablation, không thay cả pipeline.
4. Đóng băng cấu hình trước nghiên cứu chính; kiểm tra không dùng dữ liệu tương lai.
5. Cùng SV 3 phân tích kết quả, kể cả khi v3 không hơn v2.

**Phải bàn giao:** Ba thuật toán chạy lại được, cấu hình, điểm thành phần, test, kết quả hiệu năng và ví dụ xếp hạng đúng/sai mong đợi.

**Nghiệm thu:** Tự tính điểm một bộ bằng tay và khớp code; không tạo bộ không có thật; lịch sử rỗng không lỗi; tắt từng thành phần có tác động kiểm tra được.

**Tự học:** Vòng lặp → tích Descartes → sắp xếp → chuẩn hóa điểm → thống kê đếm → ablation. Chưa học bandit trước khi các bước này ổn định.

### 8.3. SV 3 — Giao diện, tích hợp và đo trải nghiệm

**Nhánh:** `feat/ui-evaluation`  
**Phụ trách:** `app_ui/`, `core/pipeline_manager.py`, log sự kiện và `evaluate_sessions.py`.

**Câu hỏi em chịu trách nhiệm:** “Người dùng có chọn được nhanh và phù hợp hơn không, và số đo có đáng tin không?”

**Để có v1.0:**

1. Dựng Streamlit nhập/sửa tủ theo schema chung, không tự tạo schema khác.
2. Hiển thị tối đa 3 bộ với nút chọn, đổi, kết thúc không chọn.
3. Tích hợp hàm lọc của SV 1 và hàm xếp hạng của SV 2.
4. Lưu `session_started` ngay lúc bắt đầu; đổi bộ không reset timer.
5. Kiểm tra bấm chốt lặp, tủ trống, tải lại trang và log chưa có sự kiện kết thúc.

**Để có v2.0:**

1. Cho chạy v1/v2 với cùng giao diện, ngữ cảnh và tủ đồ.
2. Lưu mã phiên bản, cấu hình, snapshot và danh sách gợi ý thực tế.
3. Viết script tính thời gian, số lần đổi, tỷ lệ hoàn thành từ dữ liệu thử có thể tính tay.
4. Không cho giao diện v2 ít thao tác hơn rồi quy cải thiện đó cho xếp hạng.

**Để có v3.0 và thực nghiệm:**

1. Tích hợp re-ranking của SV 2, hiển thị lý do có cơ sở.
2. Thêm đánh giá phù hợp 1–5 và xác nhận đã mặc, không gộp hai hành vi này.
3. Chủ trì kiểm tra log pilot và luân phiên thứ tự v1/v2/v3.
4. Cả ba cùng tổ chức phiên người dùng; SV 3 không phải tự tuyển và quan sát toàn bộ.
5. Tạo bảng/biểu đồ theo người từ log thật và ghi nhận phiên bỏ dở, timeout, lỗi.

**Phải bàn giao:** Ứng dụng tích hợp, schema log, test luồng, script phân tích, giao thức thực nghiệm và bảng kết quả có thể chạy lại.

**Nghiệm thu:** Người ngoài nhóm tự làm được một phiên theo hướng dẫn; timer/log đúng; các phiên không hoàn thành không biến mất khỏi báo cáo.

**Tự học:** Streamlit → Session State → sự kiện → đo khoảng thời gian → CSV/JSONL → trung vị và so sánh theo cặp.

### 8.4. Ghép việc của 3 người sẽ ra phiên bản nào?

| Mốc | SV 1 bàn giao | SV 2 bàn giao | SV 3 bàn giao | Phiên bản cả nhóm nhận được |
|---|---|---|---|---|
| Tuần 1–2 | Dữ liệu và schema thử | Ghép bộ, sắp xếp thử | Form và log thử | Bài tập nền, chưa phải sản phẩm hoàn chỉnh |
| Tuần 3–5 | Nhập tay, trạng thái đồ, lọc baseline | Điểm màu/phong cách, Top-3 | Giao diện và đo phiên đầu-cuối | **v1.0: bản quy tắc chạy được và đo được** |
| Tuần 6–7 | Điểm ngữ cảnh mềm | Kết hợp ngữ cảnh vào thứ hạng | Cùng UI, log có mã cấu hình | **v2.0: gợi ý có xét ngữ cảnh; chưa cá nhân hóa** |
| Tuần 8–9 | Lịch sử mặc và snapshot | Điểm sở thích + phạt lặp | Tích hợp và pilot | **v3.0: cá nhân hóa heuristic sẵn sàng kiểm chứng** |
| Tuần 10–12 | Kiểm tra dữ liệu, cùng thu thập | Phân tích thuật toán/ablation | Tổng hợp phiên và trình bày | **Bản nghiên cứu: v1/v2/v3 + dữ liệu thật + kết luận có giới hạn** |

**Không nhầm:** v3 chạy được không đồng nghĩa v3 tốt hơn. Nếu số liệu không cho thấy lợi ích, sản phẩm nghiên cứu vẫn phải báo cáo kết quả đó.

**Luồng bàn giao:** SV 1 → danh sách món/điểm ngữ cảnh → SV 2 → danh sách bộ đã xếp hạng → SV 3 → phản hồi/log → SV 2 dùng cho các phiên tương lai. Snapshot lịch sử trong thí nghiệm chính vẫn giữ cố định theo giao thức.

### 8.5. Mỗi người bắt đầu ngay bằng việc gì?

- **SV 1:** Viết 5 Item mẫu và một Context; viết test loại đúng món đang giặt.
- **SV 2:** Dùng chính 5 Item đó để ghép 4 bộ trước lọc và 2 bộ sau lọc; tính tay thứ tự.
- **SV 3:** Tạo một màn hình hiển thị các bộ mẫu, nút bắt đầu/chọn/đổi; lưu một phiên thử.
- **Cả nhóm:** Mỗi người vẫn tự hoàn thành bài tập nền ở mục 6 trước; đây là đầu việc sau khi đã nắm phần chung.

### 8.6. Trách nhiệm chung và vai trò nhóm trưởng

- Cả 3 người cùng phỏng vấn để kiểm tra pain point, gán/kiểm tra nhãn và thu thập thực nghiệm.
- SV 1 viết phần dữ liệu/ngữ cảnh; SV 2 viết phương pháp/xếp hạng; SV 3 viết tích hợp/đo lường; cả nhóm cùng viết kết luận.
- Mỗi người đọc ít nhất một tài liệu liên quan và trình bày lại.
- Nhóm trưởng do nhóm chọn; chức danh này không tạo thêm một thành viên hoặc buộc một người làm thay các phần khác.
- Kiểm tra chéo: SV 1 đọc test của SV 2, SV 2 kiểm tra log của SV 3, SV 3 kiểm tra dữ liệu của SV 1.
- Nếu chậm tiến độ, bỏ xử lý ảnh nâng cao và API trước; không bỏ logging, đối chứng hoặc kiểm thử để giữ tính năng trình diễn.

---

## 9. Dữ liệu: Nhỏ, sạch, có quyền sử dụng

### 9.1. Bắt đầu bằng ba loại dữ liệu

**Bộ A — Dữ liệu học và kiểm thử:**

- 5 món cho bài tập đầu.
- Sau đó tăng lên khoảng 30–50 món mẫu do nhóm tự chụp hoặc được cho phép sử dụng.
- Có đủ áo, quần, giày và một số trường hợp khó.
- Dùng để phát triển quy tắc, sửa lỗi và thử trọng số.

**Bộ B — Dữ liệu kiểm tra xử lý ảnh:**

- Giữ riêng những món không dùng để chỉnh bộ nhận dạng hoặc ngưỡng màu.
- Người kiểm tra xác nhận nhãn trước khi xem dự đoán.
- Nếu một món có nhiều ảnh, tất cả ảnh của món đó thuộc cùng một phần dữ liệu; không để ảnh gần trùng lọt sang tập kiểm tra.
- Bộ dữ liệu nhỏ chỉ cho bằng chứng thăm dò, chưa đại diện mọi loại quần áo.

**Bộ C — Tủ đồ phục vụ nghiên cứu người dùng:**

- Mỗi người có khoảng 12–20 món để tạo đủ lựa chọn trong phạm vi đề tài.
- Ví dụ mức tối thiểu khởi đầu: 6 áo, 4 quần, 2 đôi giày.
- Ưu tiên đồ người tham gia thực sự sở hữu và biết rõ.
- Nếu chỉ dùng tủ giả định, phải mô tả là nghiên cứu lựa chọn trên giao diện với tủ giả định, không suy rộng thành giảm thời gian mặc đồ ngoài đời.

Tủ đồ 50–100 món không phải điều kiện bắt buộc để nghiên cứu lần đầu. Quy mô lớn hơn chủ yếu dùng thử tốc độ tính toán sau khi bản nhỏ đã đúng.

### 9.2. Các tập dữ liệu trong định hướng ban đầu dùng để làm gì?

- **Fashion-MNIST:** Có ích để học quy trình phân loại ảnh nhỏ, ảnh xám; không đại diện đầy đủ ảnh quần áo người dùng chụp bằng điện thoại, cũng không phải dữ liệu đo phối outfit.
- **Polyvore:** Có thể tham khảo nghiên cứu phối hợp outfit; cần kiểm tra phiên bản, khả năng tải, quyền sử dụng và cách chia dữ liệu. Không mặc định còn một nguồn tải hoạt động hoặc được phép tái phân phối ảnh.
- **Tủ đồ tự thu thập:** Phù hợp trực tiếp nhất với bản thử nghiệm nhỏ, nhưng phải thừa nhận quy mô hạn chế.

Không cần tải mọi dataset ngay đầu kỳ. Dữ liệu phải phục vụ câu hỏi cụ thể, không phải tải về để báo cáo trông nhiều hơn.

### 9.3. Quyền riêng tư và sự đồng ý

- Chỉ thu thập sau khi người tham gia đồng ý và hiểu mục đích.
- Ưu tiên ảnh riêng món đồ; không cần chụp mặt hoặc cơ thể người.
- Dùng mã như `P01`, không ghi họ tên vào log phân tích.
- Không ghi địa chỉ nhà hay vị trí GPS chính xác nếu không cần.
- Kiểm tra, loại bỏ metadata định vị trong ảnh trước khi chia sẻ.
- Thống nhất thời hạn giữ dữ liệu, nơi lưu và ai được truy cập.
- Cho phép người tham gia dừng và yêu cầu xử lý dữ liệu theo nội dung đã đồng ý.
- Không tải ảnh riêng tư, dữ liệu người tham gia hoặc khóa API lên AI agent/dịch vụ bên ngoài khi chưa được phép.

---

## 10. Đo thời gian: Định nghĩa trước rồi mới lập trình

### 10.1. Chỉ số chính và chỉ số hỗ trợ

| Chỉ số | Cách hiểu | Vai trò |
|---|---|---|
| `decision_time_ms` | Từ khi bấm bắt đầu phiên, sau khi ngữ cảnh đã được xác nhận, đến khi chốt một bộ | Chỉ số chính của nghiên cứu giao diện |
| `refresh_count` | Số lần yêu cầu xem nhóm bộ khác trong phiên | Chỉ số hỗ trợ về công sức lựa chọn |
| `completion_rate` | Số phiên chốt được bộ / số phiên thử theo giao thức | Tránh kết luận “nhanh” do bỏ qua người không chọn được |
| `satisfaction` | Người dùng đánh giá mức phù hợp sau phiên, thang 1–5 | Kiểm tra chất lượng lựa chọn |
| `engine_latency_ms` | Thời gian chương trình lọc, ghép và xếp hạng | Chỉ số kỹ thuật, không thay thế thời gian quyết định |
| `invalid_recommendation_count` | Số gợi ý vi phạm ràng buộc cứng | Bắt buộc bằng 0 trong các kiểm thử đã xác định |
| Thời gian thêm món | Thời gian nhập ảnh và xác nhận thuộc tính | Đánh giá riêng công sức số hóa tủ đồ |

`decision_time_ms` ở giao thức này bao gồm chờ hệ thống và thao tác đổi bộ. Không bao gồm chụp ảnh tủ đồ, mặc thử, tìm đồ trong nhà hoặc nhập ngữ cảnh. Vì vậy kết luận phải đúng phạm vi: **thời gian chọn bộ trên giao diện sau khi đã có tủ đồ số**.

Nếu muốn kết luận tiết kiệm tổng thời gian sử dụng, cần đo thêm chi phí nhập tủ và bảo trì dữ liệu; không bỏ qua chi phí này trong thảo luận.

Câu hỏi mức phù hợp dùng thống nhất sau khi chốt: **“Bộ vừa chọn phù hợp với nhu cầu và ngữ cảnh của bạn trong phiên này ở mức nào?”**

- 1: Hoàn toàn không phù hợp.
- 2: Ít phù hợp.
- 3: Tạm chấp nhận được.
- 4: Phù hợp.
- 5: Rất phù hợp.

Phiên không chọn được không có điểm đánh giá bộ đã chọn; ghi thiếu, không tự gán 1 hoặc 0. Có thể hỏi riêng lý do không chọn. Nếu muốn báo tỷ lệ bộ được đánh giá phù hợp, chốt trước ngưỡng, ví dụ điểm từ 4 trở lên, và luôn ghi rõ mẫu số là các phiên đã chọn có đánh giá.

Nghiên cứu thăm dò nên báo song song phân bố mức phù hợp và tỷ lệ hoàn thành. Chưa có tiêu chí cùng thiết kế phù hợp thì không kết luận đã chứng minh “chất lượng không giảm”; không tìm thấy khác biệt rõ cũng chưa chứng minh hai phiên bản tương đương.

### 10.2. Đồng hồ bắt đầu và kết thúc ở đâu?

Quy trình một phiên:

1. Người dùng kiểm tra ngữ cảnh, chưa thấy gợi ý của phiên.
2. Bấm **Bắt đầu chọn** → tạo phiên và ghi mốc bắt đầu.
3. Hệ thống tạo, hiển thị các bộ.
4. Người dùng chọn ngay hoặc bấm **Đổi bộ khác**.
5. Bấm **Chọn bộ này** → ghi kết quả và kết thúc đồng hồ.
6. Hỏi mức phù hợp 1–5; thời gian trả lời khảo sát không cộng vào thời gian chọn.

Nguyên tắc kỹ thuật:

- Dùng đồng hồ đo khoảng thời gian đơn điệu, chẳng hạn `time.perf_counter()` nếu đo tại server.
- Mốc thời gian có múi giờ dùng để đối chiếu log, không thay thế đồng hồ đo khoảng thời gian.
- Hai mốc dùng tính chênh lệch phải thuộc cùng hệ đồng hồ; không trừ thời gian client và server với nhau.
- Với Streamlit, giữ mốc trong trạng thái phiên; rerun do bấm đổi không được tạo phiên mới hoặc reset timer.
- Nếu đo lúc server nhận sự kiện bấm nút, phải ghi rõ đây là phép đo từ phía server, có ảnh hưởng của độ trễ mạng/xử lý sự kiện.
- Không gọi thời điểm server dựng xong trang là thời điểm người dùng thực sự nhìn thấy trang.
- Nếu muốn đo riêng từ lúc thẻ đã hiển thị đến lúc bấm chọn, cần bổ sung phép đo phía trình duyệt; đây là mở rộng, không bắt buộc bản đầu.

Kiểm tra với đồng hồ quan sát thủ công trong vài phiên pilot để phát hiện sai lệch lớn, không coi hai cách đo là giống nhau tuyệt đối.

### 10.3. Những sự kiện cần lưu

Tối thiểu:

```text
session_started
recommendations_served
refresh_requested
outfit_selected
session_abandoned
session_timeout
session_error
```

Tên `recommendations_served` chỉ khẳng định ứng dụng đã tạo/trả nhóm gợi ý, không khẳng định đã quan sát được thời điểm trình duyệt vẽ xong.

Một bản tóm tắt phiên minh họa:

```json
{
  "session_id": "session_demo_001",
  "participant_id": "P_DEMO",
  "version": "v1.0",
  "config_id": "rules_demo_01",
  "context_id": "context_demo_01",
  "wardrobe_snapshot_id": "wardrobe_demo_01",
  "history_snapshot_id": "history_demo_01",
  "decision_time_ms": 18000,
  "refresh_count": 1,
  "selected_outfit_id": "item_001|item_007|item_012",
  "status": "selected",
  "satisfaction": 4
}
```

**Dữ liệu trên hoàn toàn minh họa; không đưa các giá trị này vào bảng kết quả thực nghiệm.**

Log sự kiện chi tiết cần thêm mã/thứ tự sự kiện, nhóm outfit đã trả về, điểm tương ứng và mốc thời gian. Chỉ lưu một dòng tổng kết là chưa đủ để kiểm tra hệ thống có đếm lần đổi đúng hay không.

### 10.4. Phiên không chốt được bộ thì sao?

- Giữ lại phiên bỏ dở, timeout và lỗi; không xóa khỏi dữ liệu gốc.
- Với phiên không chọn, `decision_time_ms` để thiếu/null theo định nghĩa “thời gian tới khi chốt”; lưu riêng thời lượng đã quan sát và trạng thái kết thúc.
- Có thể đặt ngưỡng tối đa, ví dụ 180 giây sau khi pilot cho thấy phù hợp; phải chốt ngưỡng trước nghiên cứu chính.
- Báo cáo thời gian của phiên hoàn thành **kèm** tỷ lệ hoàn thành và số timeout/lỗi. Không chỉ báo thời gian những người dễ chọn.
- Không coi timeout là một lần chốt đúng ở mốc 180 giây. Nếu dùng thời lượng bị chặn để phân tích bổ sung, đặt tên khác và giải thích rõ.
- Bị gián đoạn, chuyển tab hoặc tải lại trang phải được đánh dấu theo quy tắc đã thống nhất trước; không tùy ý bỏ chỉ vì kết quả làm thuật toán trông kém.
- Chỉ một sự kiện chọn đầu tiên hợp lệ được dùng để kết thúc phiên; bấm hai lần không tạo hai phiên thành công.

**Tải lại trang khác với rerun:** Streamlit có thể mất Session State khi tải lại trang hoặc mất kết nối. Lưu `session_started` và các sự kiện xuống nơi lưu bền ngay khi chúng xảy ra, không chờ đến lúc chốt mới lưu toàn bộ.

Khi tổng hợp, đối soát các phiên có bắt đầu nhưng thiếu sự kiện kết thúc và đánh dấu `incomplete_unknown` nếu chưa biết nguyên nhân. Trong nghiên cứu có người quan sát, ghi nhận thủ công việc tải lại/đóng tab hoặc bị gián đoạn là cách vừa sức. Không giả định trình duyệt luôn gửi được sự kiện bỏ dở, không lấy thời điểm sự kiện cuối làm chính xác thời điểm người dùng rời đi, và không nối timer đã mất sang phiên mới.

### 10.5. Hit Rate@3 và MRR có bắt buộc không?

Chưa bắt buộc cho bản đầu.

- Hit Rate@3 cần biết bộ nào được xem là phù hợp trong một tập đánh giá đã xác định.
- MRR cần danh sách xếp hạng và nhãn phù hợp để tìm thứ hạng của bộ phù hợp đầu tiên.
- Nếu chỉ cho người dùng chọn trong 3 bộ rồi lấy chính bộ đã chọn làm “đáp án”, Hit Rate@3 sẽ bị tính theo vòng lặp và không chứng minh chất lượng.

Chỉ dùng khi nhóm có cách lấy nhãn độc lập, chẳng hạn người tham gia đánh giá một tập bộ cố định mà không thấy thứ hạng thuật toán. Với nghiên cứu nhỏ, ưu tiên thời gian, số lần đổi, tỷ lệ hoàn thành và mức phù hợp.

---

## 11. Thiết kế thực nghiệm vừa sức nhưng không sai phương pháp

### 11.1. Tách ba câu hỏi thành ba phép đánh giá

1. **Chức năng có đúng không?** Dùng unit test và kiểm thử luồng.
2. **Số hóa có hữu ích không?** Đo lỗi nhận dạng và thời gian thêm/sửa món.
3. **Xếp hạng có giúp chọn nhanh không?** Dùng nghiên cứu người dùng với giao diện và dữ liệu đầu vào được kiểm soát.

Không trộn ba phép đánh giá rồi kết luận chỉ từ một biểu đồ tổng hợp.

### 11.2. Pilot trước, nghiên cứu chính sau

**Pilot gợi ý:** 2–3 người để kiểm tra hướng dẫn, log, nút bấm, độ khó tình huống và thời lượng. Nếu thay đổi giao thức sau pilot thì không gộp dữ liệu pilot vào kết quả chính.

**Nghiên cứu chính gợi ý:** Khoảng 8–12 người tham gia tự nguyện là quy mô thăm dò có thể cân nhắc cho nhóm mới. Đây không phải cỡ mẫu đã được tính toán để bảo đảm có ý nghĩa thống kê.

Nếu trường/khoa có quy trình phê duyệt nghiên cứu người tham gia, phải thực hiện trước khi thu thập. Nên bắt đầu với người trưởng thành và tránh tạo cảm giác tham gia ảnh hưởng điểm học tập.

### 11.3. So sánh v1.0, v2.0, v3.0 cho công bằng

Thiết kế đơn giản là mỗi người thử cả ba phiên bản.

So sánh này chỉ đánh giá các phiên bản hệ thống với nhau. Muốn nói hệ thống nhanh hơn **tự chọn không có gợi ý**, cần thêm điều kiện đối chứng tự chọn với phạm vi nhiệm vụ tương đương; không suy ra kết luận đó chỉ từ v1/v2/v3.

Giữ giống nhau:

- Tủ đồ và thuộc tính đã được người dùng xác nhận.
- Giao diện, số thẻ, số nút và nội dung hướng dẫn.
- Thiết bị và điều kiện kết nối nếu có thể.
- Snapshot thời tiết và ngữ cảnh tương đương; không để thời tiết thật thay đổi giữa các lượt so sánh trong phòng thử.
- Trạng thái sẵn sàng của đồ trong một khối so sánh.
- Mọi lời giải thích gợi ý có độ dài/cách trình bày tương đương.

Thay đổi có chủ đích:

- Cách lọc thời tiết cơ bản so với cho điểm mềm, nếu đó là khác biệt đã định nghĩa giữa v1.0 và v2.0.
- Cách tính điểm và cá nhân hóa giữa các phiên bản.

Không để v1.0 chậm vì giao diện khó dùng, còn v3.0 có ít nút hơn rồi quy toàn bộ cải thiện cho thuật toán.

**Đặc biệt:** Trong thử nghiệm thời gian chọn, cả ba phiên bản dùng cùng metadata đã xác nhận. Khác biệt tự động nhập ảnh của v2.0 được đánh giá riêng; nếu không, nhóm không biết thời gian thay đổi do xếp hạng hay do dữ liệu đầu vào khác nhau.

### 11.4. Tránh hiệu ứng “làm sau nên quen hơn”

Không cho mọi người luôn thử theo thứ tự v1 → v2 → v3.

Luân phiên và phân bổ gần đều các thứ tự:

```text
v1 → v2 → v3
v1 → v3 → v2
v2 → v1 → v3
v2 → v3 → v1
v3 → v1 → v2
v3 → v2 → v1
```

- Cho mọi người một lượt làm quen không tính vào kết quả chính.
- Dùng tình huống tương đương về độ khó, phân bổ tình huống cho phiên bản một cách cân bằng.
- Không lặp nguyên xi một bài ngay sau khi người dùng vừa nhớ đáp án nếu có thể tránh.
- Có thể đặt tên giao diện là A/B/C và không nói phiên bản nào “thông minh hơn”.

Ví dụ khối lượng khả thi: 3 phiên mỗi phiên bản, tức 9 phiên/người. Đây chỉ là gợi ý tổ chức; cần pilot trước, không tăng số phiên đến mức người tham gia chọn cho xong.

### 11.5. v3.0 lấy lịch sử ở đâu?

Nếu thử cá nhân hóa, cần lịch sử **có trước** phiên kiểm tra.

Cách đơn giản:

1. Có một giai đoạn làm quen/thu thập lựa chọn trước nghiên cứu chính.
2. Trong giai đoạn đó dùng một cách hiển thị chung cho mọi người, chưa ưu tiên theo phiên bản đang đánh giá.
3. Thu thập riêng lịch sử đã mặc nếu muốn thử phạt lặp; không suy ra từ lựa chọn giả định.
4. Chốt một snapshot lịch sử cho từng người.
5. Trong khối so sánh chính, v3.0 dùng snapshot đó và chưa cập nhật online; v1.0/v2.0 bỏ qua phần sở thích theo định nghĩa phiên bản.
6. Không để các lần thử v1.0 ngay trước đó làm v3.0 được thêm lợi thế dữ liệu.

Thiết kế này đánh giá **cá nhân hóa dựa trên lịch sử cố định**, chưa chứng minh “hệ thống càng dùng càng học tốt”.

Nếu không có lịch sử thực, phải đánh giá rõ trường hợp người mới. Lịch sử giả có thể dùng test code, không dùng thay lịch sử thật để kết luận hiệu quả cá nhân hóa.

### 11.6. Muốn chứng minh cải thiện sau N ngày thì cần thêm gì?

Đó là nghiên cứu dài ngày, khó hơn nghiên cứu một buổi.

Nhóm cần:

- Theo dõi người dùng thật qua nhiều ngày, với N được xác định trước.
- Lưu ngữ cảnh, mức độ sẵn sàng của tủ đồ và phiên bản thuật toán.
- Có đối chứng phù hợp được giảng viên duyệt, chẳng hạn so sánh chính sách thích nghi với chính sách cố định qua cách phân bổ người/lượt đã xác định trước.
- Phân biệt tác động học sở thích với tác động người dùng quen giao diện hoặc lịch sinh hoạt thay đổi.
- Không lấy riêng biểu đồ thời gian giảm dần của một nhóm làm bằng chứng chắc chắn do thuật toán học.

Với năng lực và thời gian hiện tại, nghiên cứu lịch sử cố định là phần chính; nghiên cứu N ngày có thể để phần mở rộng.

### 11.7. Ablation — Tắt từng phần để biết đóng góp

Nếu v3.0 tốt hơn, hỏi tiếp: tốt hơn nhờ thành phần nào?

Đánh giá thêm nếu đủ thời gian/người tham gia:

- v3 đầy đủ.
- v3 không dùng điểm sở thích.
- v3 không dùng phạt lặp.

Giữ nguyên các phần khác, cùng dữ liệu và cách phân bổ lượt; không đồng thời đổi giao diện hoặc điều chỉnh lại toàn bộ trọng số.

Nếu chưa đủ điều kiện làm ablation với người dùng, có thể kiểm tra tác động lên thứ tự gợi ý bằng dữ liệu cố định, nhưng phải gọi đúng là phân tích thuật toán, không phải bằng chứng giảm thời gian người dùng.

### 11.8. Cách tổng hợp kết quả ở mức nhập môn

Với mỗi người:

1. Tính trung vị thời gian của các phiên hoàn thành ở từng phiên bản.
2. Tính chênh lệch giữa các phiên bản cho chính người đó.
3. Tổng hợp chênh lệch trên các người tham gia.
4. Báo cáo song song số phiên hoàn thành, timeout, lỗi và mức phù hợp.

Trung vị là giá trị giữa sau khi sắp xếp, thường ít bị chi phối bởi một phiên quá dài hơn trung bình.

Nếu tính tỷ lệ giảm cho từng người:

```text
reduction_percent = (T_baseline - T_new) / T_baseline × 100
```

Trong đó `T_baseline` và `T_new` phải cùng định nghĩa, cùng người và có đủ dữ liệu hợp lệ. Người không có phiên hoàn thành ở một phía vẫn được báo cáo trong tỷ lệ hoàn thành và số người thiếu cặp; không bị âm thầm biến mất.

Không coi 90 phiên của 10 người là 90 người độc lập. Nếu muốn kiểm định hoặc khoảng tin cậy, trao đổi với giảng viên để chọn phương pháp theo cặp và xử lý việc nhiều phiên thuộc cùng một người.

Bảng kết quả chưa đo nên để đúng như sau:

| Phiên bản | Số người | Phiên hoàn thành / tổng phiên | Thời gian | Số lần đổi | Mức phù hợp |
|---|---|---|---|---|---|
| v1.0 | Chưa đo | Chưa đo | Chưa đo | Chưa đo | Chưa đo |
| v2.0 | Chưa đo | Chưa đo | Chưa đo | Chưa đo | Chưa đo |
| v3.0 | Chưa đo | Chưa đo | Chưa đo | Chưa đo | Chưa đo |

Trước khi điền, chốt cách tổng hợp từng cột và đơn vị. Ưu tiên biểu đồ ghép cặp theo từng người hơn chỉ vẽ ba cột trung bình làm mất khác biệt cá nhân.

---

## 12. Lộ trình gợi ý 12 tuần và các mốc nghiệm thu

Đây là kế hoạch tham khảo, cần điều chỉnh theo lịch học và thời gian được giao. Không bỏ bước kiểm thử để giữ đủ mọi tính năng.

| Tuần | Việc chính | Bằng chứng phải nộp |
|---|---|---|
| 1 | Hiểu bài toán; kiểm tra pain point bằng phỏng vấn nhỏ; ôn Python | Ghi chép ẩn danh về vấn đề thật, mỗi người chạy được bài đọc/lọc JSON |
| 2 | Bài ghép bộ, chấm điểm, test; thống nhất schema và Git | Dữ liệu chung, hợp đồng module, test bài cơ bản |
| 3 | Trạng thái đồ; ngữ cảnh nhập tay; quy tắc cơ bản | Test lọc hợp lệ và lý do loại |
| 4 | Ghép bộ, điểm v1.0, Top-3 và xử lý thiếu đồ | Chạy được pipeline không cần giao diện |
| 5 | Giao diện tối giản và logging | **Mốc A: v1.0 chạy đầu-cuối, timer không reset** |
| 6 | SV 1 xây điểm ngữ cảnh; SV 2 tích hợp; SV 3 kiểm tra log so sánh | Ví dụ điểm tính tay; ảnh/API chỉ thử khi còn thời gian |
| 7 | Điểm ngữ cảnh v2.0; so sánh kỹ thuật | **Mốc B: cùng đầu vào chạy được v1/v2, cấu hình tách rõ** |
| 8 | Số đếm sở thích, phạt lặp và re-ranking v3.0 | Test lịch sử rỗng, lịch sử cố định, không dùng dữ liệu tương lai |
| 9 | Pilot, kiểm tra đồng hồ, chốt giao thức và tham số | **Mốc C: log đúng, hướng dẫn thực nghiệm và cấu hình được chốt** |
| 10 | Thu thập nghiên cứu chính | Log người tham gia thật, ghi nhận các lỗi/gián đoạn |
| 11 | Tổng hợp theo người; ablation nếu đủ điều kiện | Bảng/biểu đồ có nguồn dữ liệu và script tái tạo |
| 12 | Phân tích thất bại, viết báo cáo, tập bảo vệ | **Mốc D: kết quả tái lập được, kết luận đúng phạm vi** |

Sau mốc C, không âm thầm thay thuật toán trong khi thu thập. Nếu phát hiện lỗi buộc phải sửa, ghi phiên bản mới và trao đổi cách xử lý các phiên đã thu với giảng viên.

### 12.1. Nội dung họp hằng tuần

Mỗi thành viên báo cáo ngắn:

1. Tuần này đã hoàn thành đầu ra nào?
2. Chạy bằng thao tác/lệnh nào để người khác kiểm tra?
3. Những test nào đã đạt, test nào chưa đạt?
4. AI đã giúp phần nào? Em tự sửa hoặc bác bỏ gợi ý nào của AI?
5. Vướng điều gì và tuần tới làm một việc cụ thể nào?

Không báo cáo chỉ bằng “đã tìm hiểu CLIP” hoặc “đã làm 80%”. Hãy chỉ ra một ví dụ, một hàm, một test hoặc một bảng kết quả.

---

## 13. Dùng AI agent như người hướng dẫn, không như người làm hộ

### 13.1. Quy trình 6 bước cho mỗi nhiệm vụ nhỏ

1. **Tự mô tả bài toán:** Viết đầu vào, đầu ra và ví dụ mong đợi.
2. **Hỏi cách làm:** Yêu cầu giải thích bằng kiến thức đang có.
3. **Tự viết phần đầu:** Thử ít nhất một phiên bản nhỏ.
4. **Nhờ AI kiểm tra:** Cung cấp code, lỗi thật và ví dụ tái hiện.
5. **Chạy test:** Không tin câu “đã sửa xong” nếu chưa chạy.
6. **Giải thích lại:** Không nhìn câu trả lời của AI mà trình bày thuật toán.

Được dùng AI để gợi ý cấu trúc, giải thích lỗi, viết test mẫu và kiểm tra trường hợp biên. Không được để AI tạo số liệu, trích dẫn không kiểm tra hoặc giải thích kết quả không có trong log.

### 13.2. Khi mới dùng agent có quyền sửa file

- Bắt đầu bằng một nhiệm vụ nhỏ trong một module.
- Lưu trạng thái công việc bằng Git trước khi cho sửa.
- Yêu cầu agent nêu những file dự định sửa và phạm vi sửa.
- Không cấp quyền thao tác tài khoản, triển khai công khai hay xóa dữ liệu nếu không cần.
- Đọc phần thay đổi trước khi chấp nhận.
- Không gửi khóa API, dữ liệu cá nhân hoặc ảnh chưa được phép chia sẻ.
- Không cho agent sửa test chỉ để làm test “xanh” nếu yêu cầu ban đầu vẫn đúng.
- Không để agent cài hàng loạt thư viện khi một vòng lặp Python đã giải quyết được bài toán.

### 13.3. Prompt 1 — Hiểu nhiệm vụ trước khi code

```text
Tôi là sinh viên học kỳ 1 năm 2, mới biết biến, điều kiện, vòng lặp,
list, dict và hàm Python. Tôi chưa học machine learning.

Tôi tham gia đề tài gợi ý trang phục từ tủ đồ cá nhân.
Nhiệm vụ hiện tại: [một nhiệm vụ nhỏ].

Đầu vào: [dán ví dụ dữ liệu đã ẩn thông tin cá nhân].
Đầu ra mong đợi: [dán ví dụ].

Chưa viết code ngay. Hãy:
1. Giải thích bài toán bằng một ví dụ đời thường.
2. Chỉ ra kiến thức Python tối thiểu cần dùng.
3. Viết các bước xử lý bằng ngôn ngữ tự nhiên.
4. Cho tôi một bài tập nhỏ để tự làm.
5. Hỏi tôi 3 câu để kiểm tra đã hiểu trước khi chuyển sang code.
Không thêm framework, mô hình học máy hoặc tính năng ngoài nhiệm vụ.
```

### 13.4. Prompt 2 — Thiết kế và kiểm tra một hàm

```text
Tôi đang viết hàm [tên hàm] trong module [tên module].
Đây là quy ước dữ liệu nhóm đã thống nhất:
[dán phần schema liên quan, không chứa dữ liệu riêng tư].

Yêu cầu:
- Đầu vào: [...]
- Đầu ra: [...]
- Ràng buộc: [...]
- Trường hợp không có kết quả: [...]

Hãy đề xuất chữ ký hàm, thuật toán đơn giản và 5 test.
Giải thích vì sao từng test cần thiết.
Chưa sửa file hoặc sinh code toàn dự án.
Tôi sẽ tự viết bản đầu rồi gửi bạn nhận xét.
```

### 13.5. Prompt 3 — Sửa lỗi có bằng chứng

```text
Tôi đã tự viết đoạn code dưới đây:
[code liên quan].

Dữ liệu tái hiện lỗi:
[dữ liệu nhỏ].

Kết quả tôi mong đợi: [...]
Kết quả thực tế/thông báo lỗi đầy đủ: [...]
Lệnh hoặc thao tác đã chạy: [...]

Hãy giải thích nguyên nhân phù hợp với bằng chứng.
Nếu chưa đủ dữ liệu, hãy nói cần xem thêm gì, không đoán là đã tìm ra lỗi.
Chỉ đề xuất thay đổi nhỏ nhất và một test tái hiện lỗi.
Không sửa các phần không liên quan, không đổi yêu cầu để test dễ vượt qua.
```

### 13.6. Prompt 4 — Nhờ agent sửa code trong phạm vi được giao

```text
Tôi đã hiểu và thống nhất cách làm sau:
[mô tả ngắn thuật toán].

Hãy chỉ triển khai phần [nhiệm vụ] trong [file/module được phép sửa].
Không thay đổi schema hoặc file khác nếu chưa hỏi tôi.
Trước khi sửa, đọc code hiện tại và nêu các thay đổi dự định thực hiện.
Không xóa dữ liệu, không cài thư viện mới, không triển khai công khai.

Sau khi sửa:
1. Chạy các test liên quan nếu môi trường cho phép.
2. Nêu chính xác test đã chạy và kết quả thật.
3. Nêu test/chức năng chưa kiểm tra.
4. Giải thích phần sửa bằng kiến thức Python cơ bản.
5. Cho tôi 3 câu hỏi để tự kiểm tra mức hiểu.
```

### 13.7. Prompt 5 — Riêng cho ba nhánh chính thức

**SV 1 — Tủ đồ và ngữ cảnh:**

```text
Tôi phụ trách feat/wardrobe-context trong nhóm 3 người.
Tôi cần thống nhất Item/Context rồi lọc đồ theo user_id, available
và ngữ cảnh nhập tay. Hãy giúp tôi phân biệt ràng buộc cứng với
ưu tiên mềm trên 6 ví dụ. Không coi mọi sở thích cá nhân như
'không đi giày trắng khi mưa' là quy tắc cho mọi người.
Cho tôi bài tập viết hàm và test; chưa nối API hoặc dùng deep learning.
Đầu ra cần được SV 2 dùng ghép bộ và SV 3 dùng dựng biểu mẫu.
```

**SV 2 — Xếp hạng và cá nhân hóa:**

```text
Tôi phụ trách feat/outfit-ranking, nhận dữ liệu hợp lệ từ SV 1.
Tôi có 2 áo, 2 quần, 1 đôi giày. Hãy hướng dẫn tôi tự liệt kê các bộ,
tự tính điểm bằng bảng quy tắc và sắp xếp Top-3 để gửi cho SV 3.
Giải thích bằng điểm, thiếu giày, bộ trùng và đồ đang giặt.
Sau khi tôi làm đúng baseline mới hướng dẫn điểm ngữ cảnh,
số đếm sở thích và phạt lặp. Không nhảy vào embedding hoặc RL.
```

**SV 3 — Giao diện và đo lường:**

```text
Tôi phụ trách feat/ui-evaluation, dùng Streamlit và tích hợp
hàm lọc của SV 1 cùng hàm xếp hạng của SV 2.
Tôi đo thời gian từ nút Bắt đầu đến nút Chọn bộ.
Người dùng có thể bấm Đổi nhiều lần và Streamlit sẽ rerun.
Hãy hướng dẫn thiết kế trạng thái và lưu sự kiện để timer không reset,
không đếm chọn lặp và không làm mất dấu phiên tải lại/đóng tab.
Phân biệt mốc server nhận sự kiện với lúc trình duyệt hiển thị thật.
Chưa viết toàn ứng dụng; trước hết mô tả state và test cần có.
```

### 13.8. Prompt 6 — Kiểm tra thiết kế thực nghiệm

```text
Nhóm tôi muốn so sánh v1, v2, v3 về thời gian chọn trang phục.
Đây là giao thức dự kiến:
[dán giao thức, định nghĩa thời gian, cách tạo lịch sử và thứ tự thử].

Hãy tìm các yếu tố gây nhiễu, rò rỉ dữ liệu và cách tính sai chỉ số.
Đặc biệt kiểm tra:
- Người làm sau có quen giao diện hơn không?
- Các phiên bản có dùng cùng tủ đồ và metadata không?
- v3 có vô tình nhìn thấy lựa chọn tương lai không?
- Phiên không chọn được có bị bỏ khỏi báo cáo không?
- Chúng tôi có đang gọi thời gian server chạy là thời gian người dùng chọn không?

Chỉ đề xuất sửa thiết kế. Không tạo số liệu hoặc khẳng định phiên bản nào tốt hơn.
```

### 13.9. Prompt 7 — Phân tích kết quả thật

```text
Đây là schema log và một mẫu dữ liệu đã ẩn danh:
[đính kèm phần được phép chia sẻ].

Định nghĩa chỉ số và quy tắc xử lý phiên đã chốt trước:
[đính kèm].

Hãy giúp tôi viết script tổng hợp theo từng người, rồi so sánh theo cặp.
Giữ riêng phiên hoàn thành, bỏ dở, timeout và lỗi.
Không coi nhiều phiên của một người là nhiều người độc lập.
Không thay dữ liệu thiếu bằng số tự đoán.
Phân biệt kết quả quan sát được với giả thuyết giải thích.
Nếu chưa đủ bằng chứng, hãy kết luận chưa đủ bằng chứng.
```

### 13.10. Prompt 8 — Đọc tài liệu nghiên cứu

```text
Tôi mới học lập trình, chưa học machine learning.
Đây là nội dung một tài liệu/bài báo mà tôi có quyền chia sẻ:
[dán phần liên quan].

Hãy giải thích theo đúng trình tự của tác giả:
1. Bài toán họ giải quyết.
2. Đầu vào và đầu ra.
3. Ý tưởng chính bằng một ví dụ nhỏ.
4. Họ so sánh với baseline nào và đo gì.
5. Điều tác giả thực sự chứng minh và giới hạn.
6. Phần nào phù hợp hoặc chưa phù hợp với nhóm tôi.

Không bịa nội dung ngoài tài liệu. Nếu bạn không truy cập được toàn văn,
hãy nói rõ chỉ đang giải thích phần được cung cấp.
```

---

## 14. Git và phối hợp để không phá bài của nhau

Quy trình tối thiểu:

1. Có một nhánh `main` luôn giữ phiên bản chạy được.
2. Mỗi người làm trên nhánh được giao.
3. Chia thay đổi thành các phần nhỏ: một hàm, một test, một tính năng.
4. Trước khi ghép, tự chạy test của module và luồng cơ bản.
5. Có ít nhất một người khác đọc thay đổi và chạy thử.
6. Nếu đụng schema hoặc pipeline, trao đổi trước khi sửa.
7. Ghi lại phiên bản code, cấu hình và dữ liệu dùng cho từng thí nghiệm.

Không:

- Gửi qua lại các thư mục tên `final`, `final2`, `final_moi_nhat` để thay cho Git.
- Đưa `.env`, khóa API, ảnh riêng tư và dữ liệu thô của người tham gia lên kho công khai.
- Sao chép thư mục `.venv` sang máy bạn khác.
- Gộp hàng loạt code chưa chạy ngay trước ngày báo cáo.
- Nhờ agent xử lý xung đột bằng cách bỏ toàn bộ code của một thành viên mà chưa xem nội dung.

---

## 15. Đọc tài liệu và viết báo cáo ở mức phù hợp

### 15.1. Từ khóa tự học theo từng giai đoạn

**Giai đoạn bắt đầu:**

- Python list dictionary JSON functions.
- Python sorting key, itertools product, pytest basics.
- Streamlit session state.
- Rule-based recommender system.

**Sau khi v1.0 chạy:**

- Context-aware recommendation.
- Outfit compatibility recommendation.
- Dominant color extraction foreground segmentation.
- User study time to decision recommender systems.
- Within-subject study counterbalancing.

**Chỉ tìm khi có nhu cầu mở rộng:**

- Fashion-CLIP, type-aware fashion compatibility.
- Contextual bandit recommendation, LinUCB, Thompson Sampling.
- Off-policy evaluation và các giới hạn của log phản hồi.

Các tên công nghệ trên là từ khóa để tìm hiểu, không phải danh sách thư viện bắt buộc cài.

### 15.2. Mỗi tài liệu chỉ cần trả lời sáu câu lúc đầu

1. Tác giả muốn giải quyết việc gì?
2. Họ nhận dữ liệu gì và trả kết quả gì?
3. Ý tưởng chính là gì?
4. Họ so với cách đơn giản nào?
5. Họ dùng dữ liệu và chỉ số nào để kết luận?
6. Nhóm học được gì và phần nào chưa đủ khả năng áp dụng?

Với nguồn đọc được, ghi tên, tác giả, năm và nơi tìm thực tế. Không yêu cầu AI tự điền thông tin trích dẫn mà không kiểm tra.

### 15.3. Bố cục báo cáo gợi ý

1. **Bài toán và phạm vi:** Ai gặp khó khăn, tối ưu loại thời gian nào?
2. **Cơ sở và nghiên cứu liên quan:** Các hướng đã có, nhóm chọn mức nào và vì sao?
3. **Dữ liệu và hệ thống:** Schema, module, quyền riêng tư, giới hạn dữ liệu.
4. **Phương pháp:** v1/v2/v3, quy tắc, công thức, trọng số và cách chọn.
5. **Thiết kế đánh giá:** Người tham gia, giao thức, đối chứng, cách tính chỉ số.
6. **Kết quả:** Bảng/biểu đồ từ dữ liệu thật, có thể chạy lại.
7. **Thảo luận:** Khi nào tốt, khi nào kém, yếu tố gây nhiễu và hạn chế.
8. **Kết luận:** Chỉ khẳng định điều được số liệu hỗ trợ.

Nếu không có mô hình học máy, viết đúng là “hệ thống gợi ý theo quy tắc kết hợp cá nhân hóa heuristic”. Không đổi tên thành “học sâu” để làm báo cáo có vẻ nâng cao.

### 15.4. Bằng chứng nào tương ứng với kết luận nào?

| Bằng chứng có được | Có thể kết luận | Chưa thể kết luận |
|---|---|---|
| Test chức năng đạt | Hệ thống xử lý đúng các trường hợp đã kiểm tra | Đúng với mọi tình huống thực tế |
| Chạy dữ liệu giả lập nhanh | Độ trễ tốt trên cấu hình và quy mô đã thử | Người dùng thật quyết định nhanh |
| Bộ nhận dạng đúng trên tập kiểm tra nhỏ | Có hiệu quả trên dữ liệu kiểm tra đó | Tự động nhận dạng tốt mọi ảnh ngoài đời |
| Nghiên cứu người dùng nhỏ, có kiểm soát | Bằng chứng thăm dò trong phạm vi người và tình huống đã thử | Hiệu quả phổ quát hoặc dài hạn |
| Thời gian giảm nhưng tỷ lệ chốt/mức phù hợp giảm | Có sự đánh đổi cần phân tích | Hệ thống chắc chắn tốt hơn |
| Không thấy cải thiện rõ | Chưa đủ bằng chứng cho giả thuyết, hoặc phương pháp chưa hữu ích ở điều kiện thử | Được phép sửa số liệu để “đạt mục tiêu” |

---

## 16. Checklist nghiệm thu cuối cùng

### A. Hiểu và làm chủ

- [ ] Mỗi người giải thích được module của mình mà không đọc câu trả lời AI.
- [ ] Mỗi người biết ít nhất một trường hợp module thất bại.
- [ ] Nhóm phân biệt được quy tắc, pretrained inference và tự huấn luyện.
- [ ] Nhóm không gọi similarity là compatibility mà không có kiểm chứng.

### B. Hệ thống

- [ ] Chỉ gợi ý đồ đúng người sở hữu và đang sẵn sàng.
- [ ] Một bộ có đúng cấu trúc trong phạm vi đã chọn.
- [ ] Không lặp bộ trong cùng nhóm Top-3.
- [ ] Xử lý được ít hơn 3 bộ, không có bộ và hết lựa chọn mới.
- [ ] Có đường sửa thuộc tính ảnh bị nhận sai.
- [ ] API lỗi/thiếu dữ liệu được thông báo đúng.
- [ ] v1, v2, v3 chạy lại được với cấu hình rõ ràng.

### C. Đo lường

- [ ] Định nghĩa rõ mốc bắt đầu/kết thúc thời gian.
- [ ] Đổi bộ không reset timer.
- [ ] Bấm chọn lặp không tạo nhiều kết quả.
- [ ] Giữ lại phiên bỏ dở, timeout, lỗi.
- [ ] Phân biệt thời gian engine với thời gian chọn trên giao diện.
- [ ] Không tính Hit Rate@3 bằng một “đáp án” được tạo từ chính Top-3 đã hiển thị.

### D. Thực nghiệm và báo cáo

- [ ] Người tham gia đã đồng ý; dữ liệu phân tích đã được ẩn danh.
- [ ] Có pilot và giao thức nghiên cứu chính được chốt.
- [ ] Có kiểm soát thứ tự thử và điều kiện đầu vào.
- [ ] Lịch sử v3 có trước phiên kiểm tra; không rò rỉ dữ liệu tương lai.
- [ ] Không dùng mô phỏng như bằng chứng giảm thời gian người thật.
- [ ] Bảng kết quả được tạo từ log thật bằng script.
- [ ] Kết luận đi kèm tỷ lệ hoàn thành và mức phù hợp.
- [ ] Trình bày cả kết quả không tốt, hạn chế và chi phí nhập tủ đồ.

---

## 17. Việc cần làm ngay trong buổi đầu tiên

1. Cả nhóm đọc mục 1–3 và mỗi người diễn đạt lại bài toán bằng 3 câu.
2. Chốt phạm vi áo–quần–giày, 3 ngữ cảnh, giao diện web đơn giản.
3. Thống nhất phiên bản Python và cách lưu mã nguồn.
4. Cùng tạo tủ đồ mẫu 2 áo, 2 quần, 1 đôi giày.
5. Mỗi người tự làm bài đọc JSON, lọc và ghép bộ.
6. Hẹn buổi kiểm tra lại: từng người chạy chương trình và giải thích một test.
7. Chỉ sau đó mới chia nhánh module theo mục 8.

**Buổi đầu chưa cần:** Tải Polyvore, cài CLIP, viết bandit hoặc yêu cầu agent sinh toàn bộ hệ thống.

> **Nguyên tắc xuyên suốt:** Làm nhỏ → hiểu rõ → kiểm tra đúng → đo thật → mới nâng cấp. Một baseline đơn giản có đối chứng và số liệu trung thực có giá trị học tập, nghiên cứu hơn một ứng dụng gắn nhiều nhãn AI nhưng nhóm không giải thích hoặc kiểm chứng được.
