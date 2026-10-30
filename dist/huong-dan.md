# NHÓM 2 — HƯỚNG DẪN THỰC HIỆN ĐỀ TÀI SMART OUTFIT RECOMMENDER

**Đề tài:** Nghiên cứu hệ thống gợi ý trang phục cá nhân nhằm tối ưu hóa thời gian lựa chọn của người dùng.

**Đối tượng:** Nhóm **3 sinh viên** học kỳ 1 năm thứ 2, đã học một số kiến thức lập trình cơ bản, chưa học học máy và mới tiếp xúc với AI agent.

**Cách sử dụng tài liệu:** Đọc mục 0 để nắm gap, pain point và phạm vi; xem mục 8 để biết ai làm gì và ghép thành phiên bản nào; làm bài tập ở mục 6 trước khi chia nhánh. Mục 10–11 dành cho việc đo và kiểm chứng, không cần học hết thuật ngữ ngay ngày đầu tiên.

**Trạng thái:** Tài liệu định hướng, chưa có kết quả khảo sát hoặc thực nghiệm của nhóm. Các con số ví dụ không phải kết quả nghiên cứu. Cập nhật ngày 30/10/2026 theo đề xuất của nhóm: v1 quy tắc, v2 ngữ cảnh mềm, v3 cá nhân hóa heuristic; khoanh vùng nhiệm vụ 3 người.

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
**Điều kiện đi kèm:** Theo dõi cả phù hợp, hài lòng và tỷ lệ hoàn thành để phát hiện đánh đổi; báo cáo cùng thời gian/số lần đổi, không chỉ chọn chỉ số đẹp hoặc hứa trước “chất lượng không giảm”.

Kết quả v3–v2 chỉ cho biết tác động của **gói sở thích + phạt lặp**. Muốn tách từng thành phần cần ablation. Một thử nghiệm ngắn cũng chưa chứng minh lợi ích sau N ngày.

### 0.4. Đề tài làm những gì và nộp những gì?

**Mô tả tổng quan thống nhất để nhóm dùng trong đề cương:**

> Smart Outfit Recommender nghiên cứu hệ thống gợi ý bộ áo–quần–giày từ tủ đồ cá nhân đã được người dùng xác nhận. Nhóm đánh giá tác động của ba cách xếp hạng: quy tắc màu/phong cách (v1), bổ sung điểm ngữ cảnh mềm (v2), và tái xếp hạng bằng lịch sử lựa chọn cùng phạt lặp mềm theo lịch sử thực sự mặc (v3). Mục tiêu kiểm chứng là rút ngắn thời gian chốt bộ và giảm số lần yêu cầu đổi gợi ý, đồng thời theo dõi mức phù hợp, sự hài lòng và tỷ lệ hoàn thành. Các phiên bản dùng cùng bộ lọc hợp lệ, tập ứng viên ban đầu, dữ liệu đã xác nhận và giao diện tối đa 3 bộ. Đóng góp dự kiến là bằng chứng thực nghiệm thăm dò trên tủ đồ thật, không phải một thuật toán AI mới hay lời khẳng định chắc chắn sẽ tiết kiệm thời gian.

**Bắt buộc xây:**

1. Tủ đồ số nhỏ: thêm ảnh, nhập/sửa loại–màu–thuộc tính, cập nhật sẵn sàng; người dùng tự xác nhận, không cần nhận dạng AI.
2. Ngữ cảnh nhập tay: đi học, thuyết trình/họp, đi chơi; nhiệt độ và xác suất mưa, có quy ước dữ liệu thiếu.
3. Một bộ lọc chung chỉ giữ đồ đúng chủ, sẵn sàng, đúng ba loại; ghép áo + quần + giày từ đồ có thật.
4. Ba phiên bản xếp hạng trên cùng tập ứng viên đầu vào. **v1 không lọc hoặc chấm điểm thời tiết/sự kiện**; v2 chỉ bổ sung điểm mềm; v3 không loại đồ chỉ vì vừa mặc.
5. Một giao diện tối đa 3 bộ, chọn/đổi/kết thúc; xử lý tủ trống, thiếu loại và hết lựa chọn mới.
6. Log tự động thời gian, yêu cầu đổi, gợi ý đã trả về, lựa chọn và trạng thái phiên; hỏi riêng điểm phù hợp và hài lòng rồi lưu câu trả lời.
7. Pilot, nghiên cứu người dùng thăm dò, script phân tích và báo cáo trung thực.

**Chỉnh cách diễn đạt để không hứa quá bằng chứng:** “Đổi bộ” trong nghiên cứu là bấm yêu cầu nhóm gợi ý khác, không phải thay quần áo ngoài đời; chưa đủ căn cứ gọi mọi lần đổi là “không cần thiết”. Máy tự ghi thao tác/thời gian, nhưng **không tự đoán điểm hài lòng**. “Vẫn bảo đảm phù hợp và hài lòng” là mục tiêu cần đánh giá, chưa phải kết quả đã đạt.

**Ngoài phạm vi bắt buộc của cả ba phiên bản:** Nhận dạng ảnh, tách nền, API thời tiết, CLIP/CNN, embedding, reinforcement learning/bandit, thử đồ ảo, chatbot, sinh ảnh người mặc, ứng dụng mobile riêng hoặc bán hàng. Chỉ mở một nhánh mở rộng sau khi phần chính ổn định và được giảng viên đồng ý; không dùng nó làm điều kiện nghiệm thu v2/v3.

**Bộ đầu ra cuối kỳ:** Code chạy được + dữ liệu mẫu được phép chia sẻ + test + cấu hình v1/v2/v3 + giao thức thực nghiệm + dữ liệu nghiên cứu đã xử lý quyền riêng tư theo sự đồng ý của người tham gia + script dựng bảng/biểu đồ + báo cáo giới hạn. Dữ liệu bàn giao cho giảng viên không mặc nhiên được công khai lên GitHub; gán mã giả chưa có nghĩa đã ẩn danh hoàn toàn. Đây là bộ đầu ra của nghiên cứu, không chỉ một video demo ứng dụng.

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

> Với cùng tủ đồ thật, tập ứng viên ban đầu, ngữ cảnh và giao diện, thêm điểm ngữ cảnh vào quy tắc (v2 so với v1), rồi thêm sở thích và phạt lặp (v3 so với v2), ảnh hưởng thế nào tới thời gian chốt, số yêu cầu đổi gợi ý, mức phù hợp, hài lòng và tỷ lệ hoàn thành?

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

**Ưu tiên mềm — soft preference:** Có thể phù hợp ít hơn, nhưng chưa chắc phải loại.

- Màu người dùng ít chọn.
- Áo vừa mặc gần đây nhưng đã sạch và sẵn sàng.
- Kiểu phối chưa đúng sở thích.
- Mức phù hợp với sự kiện, nhiệt độ và mưa theo bảng do nhóm quy định.

Không tự đặt quy tắc “trời mưa thì cấm giày trắng” như một chân lý. Đây có thể là sở thích của một người, không phải của tất cả mọi người. Tương tự, ngưỡng “lạnh” phụ thuộc điều kiện địa phương và người sử dụng.

**Chốt cho phép so sánh chính:** v1 chỉ lọc quyền sở hữu/trạng thái/loại món; v2 và v3 dùng nguyên bộ lọc này. Không có bộ lọc nhiệt độ baseline và không biến sự kiện thành điều kiện loại. Trường hợp bắt buộc đồng phục hoặc dress code đặc biệt nằm ngoài ba tình huống thử thông thường; nếu muốn bổ sung phải thống nhất schema và áp dụng giống nhau cho cả ba phiên bản.

Cùng tủ và trạng thái sẵn sàng phải sinh cùng tập ứng viên trước xếp hạng. Sau khi người dùng bấm đổi, tập bộ chưa xem có thể khác do các phiên bản đã xếp hạng khác nhau; chính sách bỏ qua bộ đã xem vẫn phải giống nhau.

### 4.4. Khi không đủ bộ để gợi ý

- Có 2 bộ hợp lệ: hiển thị 2 bộ.
- Có 1 bộ: hiển thị 1 bộ.
- Không có bộ: giải thích chính xác lý do. Nếu thiếu giày hoặc toàn bộ quần đang giặt, cần cập nhật tủ/trạng thái thực tế; nới ưu tiên màu sắc không giải quyết được.
- Điểm ngữ cảnh/sở thích thấp không làm mất ứng viên; không dùng ngưỡng điểm để loại thêm bộ ở một phiên bản.
- Không tự ý đưa đồ đang giặt trở lại chỉ để đủ Top-3.
- Không tạo ra món đồ không có thật trong tủ.
- Khi đã xem hết các bộ: giữ nhóm cuối để người dùng còn chọn hoặc kết thúc, báo đã hết lựa chọn mới và vô hiệu hóa nút đổi; không tự quay vòng hoặc tự chốt hộ.

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
│   ├── wardrobe_store.py
│   ├── context_filter/
│   ├── compatibility_scorer/
│   ├── user_preference/
│   └── event_log.py
├── app_ui/
│   └── app.py
├── datasets/
│   └── sample_wardrobe.json
├── tests/
├── experiments/
│   ├── configs/
│   └── protocol.md
├── evaluate_simulation.py
├── evaluate_sessions.py
├── requirements.txt
└── .gitignore
```

Vai trò và người sở hữu:

- `core/schema.py` — **SV 1** cập nhật sau khi cả nhóm duyệt: Item, Context, Outfit, Event, bản tóm tắt phiên. SV 2 đề xuất cấu trúc điểm; SV 3 đề xuất cấu trúc log.
- `modules/wardrobe_store.py` — **SV 1**: đọc/lưu tủ JSON, cập nhật trạng thái và xác nhận đã mặc; không dựng giao diện.
- `modules/context_filter/` — **SV 1**: lọc hợp lệ dùng chung và tính riêng WeatherFit/OccasionFit; không tự xếp hạng.
- `modules/compatibility_scorer/` — **SV 2**: ghép bộ, chấm màu/phong cách, kết hợp điểm ngữ cảnh thành S2, sắp xếp.
- `modules/user_preference/` — **SV 2**: tính sở thích và phạt lặp từ dữ liệu được truyền vào; không ghi lịch sử hoặc làm RL.
- `modules/event_log.py` — **SV 3**: lưu sự kiện bền vững, đọc lịch sử lựa chọn hợp lệ; không tự xác nhận đã mặc.
- `core/pipeline_manager.py`, `app_ui/` — **SV 3**: điều phối các hàm có sẵn và giao diện; không chép công thức của SV 1/SV 2 vào UI.
- `tests/` — mỗi người viết test phần mình; SV 3 sở hữu test tích hợp, cả nhóm đọc chéo.
- `experiments/configs/` — SV 1 sở hữu bảng ngữ cảnh; SV 2 sở hữu bảng màu/phong cách và trọng số; SV 3 sở hữu lịch thử và cấu hình đo. Cấu hình có mã, được đóng băng trước nghiên cứu chính.
- `experiments/protocol.md` — **SV 3** tổng hợp giao thức đã được cả nhóm và giảng viên duyệt; đây là tài liệu nhóm cần viết khi bắt đầu nghiên cứu.
- `evaluate_simulation.py` — **SV 2**: dữ liệu giả lập để kiểm tra ứng viên/độ trễ, không phải số liệu thời gian người dùng.
- `evaluate_sessions.py` — **SV 3**: tổng hợp phiên người dùng thật; SV 1 đối soát dữ liệu, SV 2 kiểm tra so sánh theo cặp.

Không tạo `vision_extractor/` trong phần bắt buộc. Nếu mở rộng nhận dạng ảnh được duyệt, mới thêm module riêng và test riêng, không thay dữ liệu xác nhận của phép so sánh chính.

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
  "user_id": "P_DEMO",
  "category": "top",
  "image_path": "images/item_001.jpg",
  "color_group": "white",
  "formality": "formal",
  "warmth": "light",
  "rain_suitability": "unknown",
  "available": true,
  "last_worn_at": null
}
```

Quy ước tối thiểu:

| Trường | Ý nghĩa | Quy ước |
|---|---|---|
| `item_id` | Mã món đồ | Duy nhất, không đổi sau mỗi lần tải ảnh |
| `user_id` | Chủ tủ đồ | Dùng cùng mã giả với `participant_id` trong log, không cần họ tên thật |
| `category` | Loại món | `top`, `bottom`, `footwear` |
| `image_path` | Ảnh minh họa | Ảnh không bắt buộc cho bài tập đầu tiên |
| `color_group` | Nhóm màu | Nhóm thống nhất trước, ví dụ `black`, `white`, `gray`, `blue`, `other`, `unknown` |
| `formality` | Độ trang trọng | `casual`, `smart_casual`, `formal`, `unknown` |
| `warmth` | Mức giữ ấm | `light`, `medium`, `warm`, `unknown`; người dùng xác nhận |
| `rain_suitability` | Người dùng thấy có hợp khi mưa không? | `low`, `medium`, `high`, `unknown`; nhập tay, không suy từ màu ảnh |
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
  "user_id": "P_DEMO",
  "occasion": "presentation",
  "temperature_c": 24.0,
  "rain_probability": 0.7,
  "weather_source": "manual",
  "observed_at": "2026-10-30T07:00:00+07:00",
  "reference_time": "2026-10-30T07:00:00+07:00"
}
```

- `occasion`: Trước hết chỉ dùng `study`, `presentation`, `leisure`.
- `temperature_c`: Đơn vị độ C, không nhầm với Kelvin.
- `rain_probability`: Trong khoảng 0–1; khác với lượng mưa tính bằng mm.
- `weather_source`: `manual`, `api` hoặc nguồn đã thống nhất.
- `observed_at`: Thời điểm quan sát/dự báo thời tiết; không thay bằng thời điểm ghi log.
- `reference_time`: Mốc tính số ngày đã mặc, giữ cố định trong khối so sánh và mọi lần đổi của phiên. Có thể trùng `observed_at` trong ví dụ, nhưng ý nghĩa khác nhau.
- Nhiệt độ hoặc xác suất mưa thiếu dùng `null`, không tự đổi thành 0. Kiểm tra xác suất trong 0–1 ở biểu mẫu; `70%` phải đổi thành `0.7`.
- Ngữ cảnh không được đổi giữa một phiên đang đo; nếu cần sửa, kết thúc phiên hiện tại có lý do và bắt đầu phiên khác.

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
SV 1:
load_wardrobe(user_id) → danh sách Item của đúng người
save_item(user_id, item) → Item đã lưu hoặc lỗi dữ liệu cụ thể
confirm_worn(user_id, item_ids, worn_at) → cập nhật các món thực sự đã mặc
filter_items(items, context) → {valid_items, excluded_items kèm reason_code}
context_fit(outfit, items_by_id, context, context_rules) → {weather, occasion, reasons}

SV 2:
build_outfits(valid_items) → tất cả Outfit hợp lệ, chưa lấy Top-3
score_outfit(outfit, items_by_id, context, version, config) → Outfit có score, score_parts, reasons
rerank(scored_outfits, items_by_id, selection_history, reference_time, config) → mọi Outfit đã tính S3 và sắp xếp

SV 3:
load_selection_history(user_id, cutoff, allowed_phases) → lựa chọn hợp lệ trước cutoff, đúng phase được duyệt, không trùng event
recommend(items, context, selection_history, version, config, excluded_outfit_ids) → {outfits: tối đa 3, remaining_count, empty_reason}
log_event(event) → ghi sự kiện của phiên xuống nơi lưu bền
```

`items_by_id` là dictionary tra món đồ theo mã, ví dụ `items_by_id["item_001"]` trả về Item tương ứng. Outfit chỉ giữ mã món, nên hàm chấm điểm cần nhận dictionary này để đọc màu, phong cách và các thuộc tính; không dùng biến toàn cục ngầm định.

`score_outfit` của SV 2 chỉ nhận `v1.0` hoặc `v2.0`; với v2, nó gọi `context_fit` của SV 1, không tính lại ngữ cảnh ở chỗ khác. Khi yêu cầu v3, pipeline chấm **tất cả** ứng viên bằng v2 rồi gọi `rerank`. Không lấy Top-3 v2 trước khi tính v3 vì có thể bỏ sót bộ đáng được đưa lên.

`excluded_outfit_ids` chứa toàn bộ mã bộ đã trả về trong phiên, bắt đầu rỗng và không xóa khi bấm đổi. Pipeline bỏ các mã đó, sắp điểm giảm dần rồi `outfit_id` tăng dần khi bằng điểm, lấy tối đa 3. `remaining_count` là số bộ chưa trả về còn lại **sau nhóm hiện tại**. Khi hết bộ mới, UI giữ nhóm đang xem theo mục 4.4; phiên mới bắt đầu lại danh sách đã xem.

**Định danh xuyên suốt:** Trong bản nhỏ, `user_id` của tủ/Context và `participant_id` trong log phải có **cùng một giá trị mã giả**, ví dụ `P01`; không tạo hai bộ mã độc lập. SV 1 và SV 3 cùng test với P01/P02 để `load_selection_history(P01, cutoff)` chỉ trả lịch sử P01, tuyệt đối không dùng dữ liệu P02. Mã `P_DEMO` trong các ví dụ chỉ dành cho dữ liệu minh họa.

`selection_history` chỉ chứa lựa chọn thật có trước mốc đóng băng, kèm thuộc tính màu/phong cách tại lúc chọn hoặc snapshot tương ứng. Không tra lại nhãn hiện tại đã bị sửa rồi coi như lịch sử ban đầu. Dữ liệu mặc nằm trong `last_worn_at` của snapshot Item; `reference_time` lấy từ Context đã đóng băng, không gọi đồng hồ hiện tại bên trong hàm phạt lặp.

`allowed_phases` được chốt trước nghiên cứu: với nghiên cứu một buổi, danh sách này thường chỉ gồm `history_collection`; các lựa chọn trong `development`, `practice` hoặc `pilot` không được vào PreferenceScore dù đúng người và trước cutoff. Test bắt buộc: lịch sử trộn nhiều phase chỉ trả về event thuộc phase được duyệt.

**Phân chia lưu trữ:** SV 1 ghi tủ đồ và lịch sử mặc; SV 3 ghi sự kiện chọn/đổi/đánh giá. SV 2 chỉ đọc các dữ liệu được truyền vào để tính điểm. Trong bản dùng hằng ngày, sự kiện hợp lệ được dùng cho phiên tương lai; trong nghiên cứu chính, log mới vẫn được lưu nhưng không thay snapshot lịch sử đang dùng.

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
2. Lọc đồ không sẵn sàng; kiểm tra loại món và mã trùng ngay khi nhập dữ liệu.
3. Chia danh sách thành áo, quần, giày và ghép mọi tổ hợp hợp lệ.
4. Tính điểm màu sắc và phong cách bằng bảng quy tắc, **không dùng thời tiết, sự kiện, sở thích hay lịch sử mặc**.
5. Sắp xếp, loại bộ trùng và lấy tối đa 3 bộ chưa hiển thị.

Tính phong cách ở v1 là độ tương thích **giữa các món trong bộ**, không phải độ phù hợp với sự kiện. Ví dụ độ trang trọng áo–quần có hợp nhau không thuộc v1; có hợp buổi thuyết trình không thuộc v2.

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

### 7.2. v2.0 — Thêm điểm ngữ cảnh mềm, giữ nguyên tập ứng viên

v2 nhận chính các bộ hợp lệ của v1, không loại thêm vì nóng/lạnh/mưa/sự kiện. **SV 1** tính WeatherFit và OccasionFit; **SV 2** kết hợp chúng với điểm v1; **SV 3** chỉ gọi pipeline và hiển thị.

```text
Compatibility = S1
S2 = 0.3 × WeatherFit + 0.3 × OccasionFit + 0.4 × S1
```

Đây là công thức khởi đầu do nhóm lựa chọn để thử, không lấy từ kết quả thực nghiệm đã có. Giữ bảng màu/phong cách và trọng số bên trong S1 như v1 để phép so sánh rõ ràng.

**Cách viết điểm ngữ cảnh đủ cụ thể để bắt đầu:**

1. `TemperatureFit`: tra bảng theo `warmth` của áo và quần rồi lấy trung bình hai món. Giày không được tính vào thành phần giữ ấm trong bản nhỏ này.
2. `RainFit`: đổi `rain_suitability` của cả ba món thành điểm `low = 0`, `medium = 0.5`, `high = 1`, `unknown = 0.5`; lấy trung bình thành `R`. Với xác suất mưa `p`, dùng `RainFit = (1 - p) × 0.5 + p × R`.
3. `WeatherFit = 0.7 × TemperatureFit + 0.3 × RainFit`.
4. `OccasionFit`: tra bảng sự kiện–độ trang trọng cho từng món, lấy trung bình ba món.

Bảng nhiệt độ **minh họa để lập trình và kiểm tra**, cần rà lại với người dùng ở giai đoạn phát triển:

| Nhiệt độ °C | light | medium | warm | unknown |
|---|---|---|---|---|
| Dưới 20 | 0.2 | 0.6 | 1.0 | 0.5 |
| Từ 20 đến dưới 28 | 0.8 | 1.0 | 0.4 | 0.5 |
| Từ 28 trở lên | 1.0 | 0.5 | 0.1 | 0.5 |

Bảng sự kiện **minh họa**, không phải quy tắc trang phục bắt buộc hoặc chuẩn thẩm mỹ:

| Sự kiện | casual | smart_casual | formal | unknown |
|---|---|---|---|---|
| study | 0.8 | 1.0 | 0.7 | 0.5 |
| presentation | 0.3 | 0.8 | 1.0 | 0.5 |
| leisure | 1.0 | 0.8 | 0.4 | 0.5 |

Thiếu nhiệt độ thì `TemperatureFit = 0.5`; thiếu xác suất mưa thì `RainFit = 0.5`. Không thay dữ liệu thiếu bằng “0°C” hoặc “không mưa”. Cách cho điểm trung tính là quy ước công khai, không phải dự đoán dữ liệu thiếu. Giữ nguyên trọng số, không tự chuẩn hóa lại riêng từng phiên.

**Ví dụ kiểm tra tay:** Áo/quần đều `light`, cả ba món `formal`, nhiệt độ 24°C, mưa 0.7, cả ba nhãn mưa `unknown`, S1 = 0.76. Khi đó TemperatureFit = 0.8, RainFit = 0.5, WeatherFit = 0.71, OccasionFit = 1, nên S2 = 0.817. Đây là toy data để test công thức, không phải kết quả về người dùng.

**Test bắt buộc:** Đúng tại 20°C và 28°C; xác suất 0 và 1; nhãn thiếu; đầu vào y hệt cho điểm y hệt; đổi ngữ cảnh có thể đổi điểm v2 nhưng không đổi ứng viên hoặc điểm v1. Bảng/trọng số chỉ sửa trước khi đóng băng giao thức, không điều chỉnh theo kết quả nghiên cứu chính.

**Nhận dạng ảnh không thuộc v2 bắt buộc.** Nếu sau này mở rộng, hãy đánh giá riêng gợi ý màu và công sức xác nhận nhãn; không thay metadata giữa các phiên bản trong nghiên cứu thời gian.

### 7.3. Embedding giống nhau chưa chắc phối hợp tốt

Hai chiếc áo gần như giống nhau có thể có embedding rất gần nhau. Điều đó không có nghĩa chúng tạo thành một bộ áo–quần–giày.

Ngược lại, áo và giày phối tốt với nhau không nhất thiết có hình ảnh giống nhau.

Vì vậy:

- Không gọi cosine similarity trực tiếp là “độ đẹp của outfit”.
- Nếu thử CLIP/Fashion-CLIP, coi đây là một phương án cần kiểm chứng.
- Không đưa embedding vào ba phiên bản đã chốt trong tài liệu này. Nếu nghiên cứu riêng ở nhánh mở rộng, cần dữ liệu đánh giá phối hợp và giao thức mới được duyệt.
- Nếu dùng pretrained, ghi rõ mô hình, phiên bản, nguồn và điều kiện sử dụng.

### 7.4. v3.0 — Cá nhân hóa bằng số đếm, chưa cần RL

Cách dễ triển khai:

1. SV 3 cung cấp các sự kiện chọn hợp lệ trước mốc đóng băng, đã loại trùng theo sự kiện/phiên. SV 2 tính số đếm, không tự ghi sự kiện thêm lần nữa.
2. Dùng khóa `(category, attribute, value)`, ví dụ `(top, color_group, white)`. Mỗi món trong mỗi lựa chọn đóng góp một lượt cho màu và một lượt cho độ trang trọng; bỏ qua giá trị `unknown`.
3. Với mỗi bộ cần chấm, tra sáu khóa: màu và độ trang trọng của áo, quần, giày. Mỗi khóa có số đếm `c` nhận điểm `c / (c + 2)`; khóa chưa từng có nhận 0, thuộc tính hiện tại `unknown` cũng nhận 0. Lấy trung bình **sáu** điểm thành PreferenceScore.
4. Có ít nhất một số đếm thuộc tính hợp lệ thì dùng nhánh có lịch sử ở công thức dưới. Lịch sử rỗng hoặc toàn `unknown` dùng nhánh chưa có lịch sử; không tự tạo sở thích giả.
5. Lịch sử thực sự mặc là nguồn riêng do SV 1 quản lý. Một món đã xác nhận vừa mặc nhận mức giảm ưu tiên, kể cả khi chưa có lịch sử lựa chọn trên ứng dụng.

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

`days_since_last_worn` là số giây từ `last_worn_at` đến `reference_time` chia 86.400, cho phép ngày lẻ; không chỉ lấy phần ngày trên lịch. Mốc mặc nằm sau `reference_time` là dữ liệu không hợp lệ cần xử lý trước khi tạo snapshot, không âm thầm dùng trong nghiên cứu. Sau đúng 3 ngày, phạt bằng 0 theo cấu hình khởi đầu này.

Nếu chưa có cả lịch sử lựa chọn lẫn lịch sử mặc, `RotationPenalty = 0` và `S3 = S2`. Viết test riêng cho trường hợp chưa từng chọn trên ứng dụng nhưng đã khai báo lần mặc gần nhất.

**Ví dụ phạt lặp mềm, không phải loại đồ:** Hai bộ A/B cùng S2 = 0.8 và PreferenceScore = 0.5. A có một món mặc cách đây 1 ngày, hai món còn lại chưa có lịch sử: RotationPenalty của A = 2/9; B không bị phạt. S3(A) xấp xỉ 0.68056, S3(B) = 0.725. B lên trước nhưng A vẫn nằm trong tập ứng viên. Nếu chỉ còn A hợp lệ, hệ thống vẫn có thể gợi ý A.

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

**Không chia “mỗi người làm một version”.** Cả ba cùng tạo v1, rồi nâng đúng phần mình để có v2 và v3. Mỗi phần có **một người chịu trách nhiệm cuối**, một người nhận bàn giao và test kiểm chứng. Hỗ trợ nhau không có nghĩa cả nhóm cùng sửa một file hoặc để SV 3 làm thay thuật toán.

**Đọc phần của mình:** [SV 1 — Dữ liệu và ngữ cảnh](#81-sv-1--chủ-nhiệm-dữ-liệu-tủ-đồ-và-ngữ-cảnh) · [SV 2 — Xếp hạng](#82-sv-2--chủ-nhiệm-ghép-bộ-xếp-hạng-và-cá-nhân-hóa) · [SV 3 — Giao diện và đo lường](#83-sv-3--chủ-nhiệm-giao-diện-tích-hợp-và-đo-lường). Sau đó cả nhóm đọc [ranh giới phối hợp](#84-ranh-giới-phối-hợp-việc-dễ-chồng-chéo-do-ai-làm), [mốc bàn giao](#85-ghép-việc-của-3-người-sẽ-ra-phiên-bản-nào) và [tiêu chí hoàn thành cá nhân](#88-tiêu-chí-hoàn-thành-cá-nhân-và-câu-hỏi-bảo-vệ).

| Thành viên | Sản phẩm chuyên môn chính | Không phải phần em tự làm thay |
|---|---|---|
| SV 1 | Dữ liệu đúng, lọc hợp lệ, điểm ngữ cảnh giải thích được | Công thức S1/S2/S3, giao diện, tính thời gian |
| SV 2 | Bộ phối và thứ tự xếp hạng có thể tính tay/test | Form nhập đồ, lưu log, tự thu thập toàn bộ nghiên cứu |
| SV 3 | Luồng sử dụng, tích hợp, log và phân tích phiên đáng tin | Nhận dạng ảnh, viết lại điểm ngữ cảnh hoặc công thức xếp hạng |

### 8.1. SV 1 — Chủ nhiệm dữ liệu, tủ đồ và ngữ cảnh

**Nhánh:** `feat/wardrobe-context`  
**File/module sở hữu:** `core/schema.py`, `modules/wardrobe_store.py`, `modules/context_filter/`, dữ liệu mẫu và bảng cấu hình ngữ cảnh.

**Câu hỏi phải trả lời:** “Dữ liệu có đúng không, món nào dùng được và từng bộ hợp hoàn cảnh đến đâu?”

#### SV 1: Học tối thiểu trước khi làm

`dict`, JSON, hàm kiểm tra/đọc/ghi → phân biệt `null`/`unknown`/0 → đơn vị nhiệt độ/xác suất → bảng tra và trung bình → datetime có múi giờ. Không học CLIP, API thời tiết hoặc tách nền để bắt đầu phần này.

#### SV 1: Đầu vào nhận và đầu ra gửi

- Nhận thông tin/ảnh từng món do người dùng cung cấp và đã đồng ý sử dụng; không tự suy độ dày hoặc hợp mưa từ màu ảnh.
- Nhận đề xuất trường điểm từ SV 2, trường phiên/sự kiện từ SV 3; cập nhật schema sau khi cả nhóm thống nhất.
- Gửi SV 2 `valid_items`, `items_by_id`, hàm `context_fit`, dữ liệu mặc đã xác nhận và mẫu có thể tính tay.
- Gửi SV 3 hàm đọc/lưu/cập nhật tủ, danh sách giá trị hợp lệ, thông báo lỗi cụ thể, hàm xác nhận đã mặc. **SV 3 làm form; SV 1 làm xử lý dữ liệu sau form.**

#### SV 1: Nhiệm vụ tạo v1 — tuần 2–5

| Mã việc | Em tự làm | Bàn giao và cách kiểm tra |
|---|---|---|
| D1 | Chốt Item/Context; sau đó tích hợp Outfit/Event do hai bạn đề xuất | Từ điển trường: tên, kiểu, bắt buộc/thiếu, đơn vị; 5 món + 1 Context mẫu cùng schema |
| D2 | Đọc/lưu tủ JSON; thêm/sửa món; cập nhật `available`; giữ mã không đổi | Thêm món, mở lại vẫn còn; sửa món không sinh bản trùng; sai loại/trùng mã báo lỗi |
| D3 | Lọc đúng chủ và đồ sẵn sàng, không sửa danh sách đầu vào | Một món của người khác và một món đang giặt đều bị loại, có `reason_code`; đổi thời tiết không đổi kết quả lọc |
| D4 | Cùng hai bạn mở rộng bộ mẫu lên tổng 30–50 món, gán nhãn và kiểm tra | Bộ phát triển có quyền sử dụng; đủ loại và ca thiếu dữ liệu; không yêu cầu một người tự nhập toàn bộ |

**Cửa nghiệm thu v1:** SV 2 gọi được hàm lọc không cần UI; SV 3 lưu/sửa tủ bằng hàm đã giao. Không lọt đồ sai chủ/không sẵn sàng. Thiếu giày là dữ liệu cần giải thích; không phải SV 1 phải tự sinh giày để cứu pipeline.

#### SV 1: Nhiệm vụ tạo v2 — tuần 6–7

| Mã việc | Em tự làm | Bàn giao và cách kiểm tra |
|---|---|---|
| D5 | Viết bảng nhiệt độ–giữ ấm, sự kiện–trang trọng; quy ước hợp mưa theo mục 7.2 | Bảng cấu hình có mã, nguồn/giả định, ví dụ tính tay; cả nhóm biết đây là heuristic |
| D6 | Viết `context_fit` trả WeatherFit, OccasionFit và thành phần/lý do | Kết quả trong 0–1; ví dụ mục 7.2 trả WeatherFit = 0.71 và OccasionFit = 1 |
| D7 | Xử lý `unknown`, nhiệt độ/mưa thiếu; kiểm tra ranh giới và đơn vị | Test 20°C, 28°C, mưa 0/1/null, giá trị ngoài 0–1 bị từ chối ở đầu vào; không lọc bớt ứng viên |

**Cửa nghiệm thu v2:** SV 2 gọi được điểm ngữ cảnh, khớp tính tay; SV 3 hiển thị được dữ liệu thiếu đúng nghĩa. Không nối API để thay cho phần điểm chưa hoàn thành.

#### SV 1: Nhiệm vụ tạo v3 và chuẩn bị thực nghiệm — tuần 8–9

| Mã việc | Em tự làm | Bàn giao và cách kiểm tra |
|---|---|---|
| D8 | Hàm `confirm_worn` kiểm tra chủ tủ/thời điểm rồi lưu `last_worn_at` | Chỉ chọn bộ không cập nhật mặc; xác nhận đã mặc mới cập nhật; không cho mốc mặc tương lai so với mốc đang kiểm tra |
| D9 | Tạo snapshot tủ/ngữ cảnh/mốc tham chiếu; phối hợp nhận snapshot lựa chọn từ SV 3 | Gói dữ liệu có mã và mô tả nguồn; chạy lại cho cùng đầu vào; thao tác demo không sửa snapshot nghiên cứu |
| D10 | Kiểm tra dữ liệu trước nghiên cứu chính | Bảng lỗi: thiếu loại, nhãn thiếu, mã trùng, lịch sử mặc không hợp lệ; xử lý trước khi khóa dữ liệu |

**Tuần 10–12:** Cùng tổ chức phiên; chủ trì kiểm tra dữ liệu thiếu, quyền sử dụng và bản bàn giao đã xử lý riêng tư. Viết phần dữ liệu, cách cho điểm ngữ cảnh và giới hạn; không tự đổi nhãn sau khi thấy v2/v3 thua.

**Gói bàn giao cá nhân:** Schema đã duyệt + hàm lưu/lọc/điểm ngữ cảnh/lịch sử mặc + dữ liệu mẫu + test của các việc D1–D10 + bảng lỗi dữ liệu + phần báo cáo tương ứng. **Không chịu trách nhiệm viết giao diện, S3 hoặc script tính thời gian.**

### 8.2. SV 2 — Chủ nhiệm ghép bộ, xếp hạng và cá nhân hóa

**Nhánh:** `feat/outfit-ranking`  
**File/module sở hữu:** `modules/compatibility_scorer/`, `modules/user_preference/`, bảng màu/phong cách, trọng số v1/v2/v3 và `evaluate_simulation.py`.

**Câu hỏi phải trả lời:** “Vì sao bộ A được đưa trước bộ B, và thay đổi đó đến từ thành phần nào?”

#### SV 2: Học tối thiểu trước khi làm

Vòng lặp lồng nhau → tổ hợp áo–quần–giày → hàm tính điểm → `sorted` và xử lý bằng điểm → số đếm bằng dictionary → test so sánh số thực. Chưa cần embedding, deep learning hoặc RL.

#### SV 2: Đầu vào nhận và đầu ra gửi

- Nhận món hợp lệ và hàm ngữ cảnh từ SV 1; nhận lịch sử chọn đã loại trùng từ SV 3; không đọc file log thô trong hàm chấm điểm.
- Gửi SV 3 các hàm sinh/chấm/xếp hạng **toàn bộ ứng viên** cùng `score_parts` và lý do có cơ sở.
- SV 3 dùng những hàm này để lấy tối đa 3 bộ chưa xem. Hai người cùng test chính sách Top-3, nhưng **SV 3 sở hữu trạng thái phiên và danh sách đã xem**.
- Hàm thuật toán không gọi UI, không ghi tủ đồ/log và không tự sửa `available` hoặc `last_worn_at`.

#### SV 2: Nhiệm vụ tạo v1 — tuần 2–5

| Mã việc | Em tự làm | Bàn giao và cách kiểm tra |
|---|---|---|
| R1 | Ghép mọi tổ hợp đúng loại; tạo `outfit_id` ổn định | 2 áo × 2 quần × 1 giày = 4 bộ; thiếu giày = 0; không trùng bộ |
| R2 | Viết bảng màu, bảng tương thích trang trọng; mỗi điểm outfit là trung bình ba cặp áo–quần, áo–giày, quần–giày | Bảng đối xứng, có trường hợp `unknown = 0.5`; tính tay ít nhất 3 bộ rồi đối chiếu code |
| R3 | Tính S1 = 0.6 màu + 0.4 phong cách; sắp điểm giảm, mã tăng khi bằng điểm | Ví dụ 0.8/0.7 cho S1 = 0.76; đổi thời tiết, sự kiện hoặc lịch sử không đổi S1 |
| R4 | Bàn giao hàm và test cùng SV 3 chính sách lấy Top-3 chưa xem | Có 1/2 bộ trả đúng số; 4 bộ trả nhóm 3 rồi nhóm 1; không lặp mã trong một nhóm |

**Cửa nghiệm thu v1:** Giải thích được thứ hạng từng bộ trên tủ nhỏ, không chỉ trình diễn “máy đã gợi ý”. Bảng phong cách là tương thích giữa món; không lén dùng sự kiện trong baseline.

#### SV 2: Nhiệm vụ tạo v2 — tuần 6–7

| Mã việc | Em tự làm | Bàn giao và cách kiểm tra |
|---|---|---|
| R5 | Gọi `context_fit` của SV 1; kết hợp S2 theo mục 7.2 | S1 = 0.76, WeatherFit = 0.71, OccasionFit = 1 cho S2 = 0.817; điểm thành phần lưu đủ |
| R6 | So sánh trên cùng tập ứng viên, cùng S1; tìm ví dụ có/không đổi thứ hạng | Bảng mã bộ, S1, WeatherFit, OccasionFit, S2; giải thích tác động của ngữ cảnh |
| R7 | Đo độ trễ và số ứng viên trên dữ liệu phát triển | Script, cấu hình máy, quy mô tủ và kết quả chạy lại; không gọi ms engine là ms người dùng quyết định |

**Cửa nghiệm thu v2:** Tập mã bộ trước xếp hạng của v1 và v2 giống nhau; khác biệt chỉ là cách ưu tiên. Không thêm ngưỡng loại điểm thấp hoặc thay bảng S1 để làm v2 đẹp hơn.

#### SV 2: Nhiệm vụ tạo v3 — tuần 8–9

| Mã việc | Em tự làm | Bàn giao và cách kiểm tra |
|---|---|---|
| R8 | Tính PreferenceScore từ sáu khóa thuộc tính theo mục 7.4 | Ví dụ số đếm tính tay; hai user không dùng lịch sử lẫn nhau; đổi/hiển thị không tăng số đếm; lịch sử trộn phase chỉ đếm phase được duyệt |
| R9 | Tính phạt từng món và trung bình ba món bằng mốc tham chiếu cố định | Chưa mặc = 0; sau 1 ngày = 2/3 ở món đó; sau 3 ngày = 0; đồ vừa mặc vẫn là ứng viên nếu sẵn sàng |
| R10 | Re-rank tất cả bộ có S2; xử lý cold-start và cấu hình ablation | Lịch sử rỗng hoàn toàn cho thứ tự v2; có mặc nhưng chưa chọn vẫn bị phạt; bộ ngoài Top-3 v2 có thể lên Top-3 v3 |
| R11 | Khóa trọng số và kiểm tra rò rỉ dữ liệu trước pilot cuối | Mọi sự kiện lịch sử có trước cutoff; cùng snapshot/mốc/config cho cùng kết quả |

**Tuần 10–12:** Cùng tổ chức phiên; phân tích khi nào thứ tự thay đổi, vì sao v3 có thể kém hơn; chạy ablation thuật toán trên snapshot cố định. Viết phần phương pháp, công thức, ví dụ và giới hạn. Ablation với người dùng chỉ bổ sung nếu được duyệt và đủ nguồn lực.

**Gói bàn giao cá nhân:** Bộ sinh ứng viên + bộ chấm/xếp hạng v1/v2/v3 + cấu hình + test R1–R11 + script độ trễ + bảng giải thích thứ hạng + phần báo cáo tương ứng. **Không chịu trách nhiệm viết form, timer, lưu lịch sử hoặc tự thu thập toàn bộ nghiên cứu.**

### 8.3. SV 3 — Chủ nhiệm giao diện, tích hợp và đo lường

**Nhánh:** `feat/ui-evaluation`  
**File/module sở hữu:** `app_ui/`, `core/pipeline_manager.py`, `modules/event_log.py`, `evaluate_sessions.py`, cấu hình lịch thử và bản tổng hợp giao thức.

**Câu hỏi phải trả lời:** “Người dùng đã làm gì, phiên kết thúc ra sao, và các con số có tái tạo được từ log không?”

#### SV 3: Học tối thiểu trước khi làm

Streamlit form/button → Session State và rerun → trạng thái phiên → JSONL/CSV → đồng hồ đơn điệu → trung vị, tỷ lệ và chênh lệch theo người. Không học frontend nhiều framework cùng lúc.

#### SV 3: Đầu vào nhận và đầu ra gửi

- Nhận hàm lưu tủ/lọc/điểm ngữ cảnh từ SV 1; hàm ghép/chấm/xếp hạng từ SV 2. Nếu chưa bàn giao, dùng fixture đúng hợp đồng để phát triển UI, ghi rõ là dữ liệu thử.
- Gửi SV 1 đề xuất schema Event/Session và lỗi dữ liệu cần hiển thị; không tự đổi tên trường ở UI.
- Gửi SV 2 lịch sử lựa chọn hợp lệ trước cutoff, kèm thuộc tính lúc chọn; không biến các gợi ý đã hiển thị thành lựa chọn.
- Gửi cả nhóm log, script và bảng kết quả; **hai bạn còn lại phải cùng kiểm tra, không chỉ nhận biểu đồ cuối**.

#### SV 3: Nhiệm vụ tạo v1 — tuần 2–5

| Mã việc | Em tự làm | Bàn giao và cách kiểm tra |
|---|---|---|
| U1 | Một UI Streamlit nhập/sửa tủ, nhập ngữ cảnh; gọi hàm lưu của SV 1 | Nhập dữ liệu hợp lệ lưu được; sai dữ liệu báo đúng; không chép logic lưu tủ vào form |
| U2 | Pipeline gọi lọc → ghép → chấm → bỏ bộ đã xem → tối đa 3 | Test tích hợp với tủ 4 bộ: nhóm 3 rồi nhóm 1; 0 bộ báo lý do, không dựng bộ giả |
| U3 | Trạng thái bắt đầu → xem/đổi → chọn hoặc kết thúc; khóa chốt lặp | Chọn lần đầu kết thúc đồng hồ; đổi không reset; đổi sau khi hết bộ bị vô hiệu hóa |
| U4 | Lưu log ngay từng sự kiện, đo thời gian bằng cùng đồng hồ | Test mốc giả 10 giây/28 giây ra 18.000 ms; đúng một kết quả chọn dù bấm lặp; mở lại đọc được log |
| U5 | Hai câu hỏi sau phiên: phù hợp và hài lòng; chưa có nút xác nhận đã mặc ở v1 | Câu trả lời do người dùng nhập; có thể bỏ qua, lưu null; khảo sát không cộng vào thời gian quyết định |

**Cửa nghiệm thu v1:** Một người ngoài nhóm dùng được luồng cơ bản; các phiên chọn, bỏ dở, lỗi và mất kết nối không bị xóa dấu. Hai câu hỏi đánh giá phải có từ v1, không chờ v3 mới bổ sung rồi so sánh các phiên đo khác nhau.

#### SV 3: Nhiệm vụ tạo v2 — tuần 6–7

| Mã việc | Em tự làm | Bàn giao và cách kiểm tra |
|---|---|---|
| U6 | Chọn phiên bản bằng cấu hình người điều hành trước khi bắt đầu; giữ UI thống nhất | Trong phiên không đổi version/ngữ cảnh; cùng ảnh, số thẻ, nút, câu hỏi; giao diện nghiên cứu không gắn nhãn “bản thông minh hơn” |
| U7 | Lưu metadata phiên vào `session_started` ngay khi bắt đầu; lưu mã cấu hình, snapshot, thứ tự thử, tình huống và nhóm bộ đã trả | Truy một dòng tổng kết về đúng chuỗi sự kiện/ứng viên; đóng tab hoặc reload trước khi chốt vẫn đọc được version/phase/snapshot từ `session_started`; không chỉ lưu tổng thời gian |
| U8 | Viết script tổng hợp và kiểm tra bằng fixture có đáp án tính tay | 4 phiên gồm 2 chọn, 1 bỏ dở, 1 lỗi có completion = 2/4; không biến phiên không chọn thành 0 ms |

**Cửa nghiệm thu v2:** Cùng dữ liệu chạy được v1/v2 bằng một pipeline; kết quả từ log khớp tính tay. Không thêm thao tác tiện lợi chỉ riêng v2.

#### SV 3: Nhiệm vụ tạo v3 và pilot — tuần 8–9

| Mã việc | Em tự làm | Bàn giao và cách kiểm tra |
|---|---|---|
| U9 | Kết nối v2-score → v3-rerank → Top-3; đọc lịch sử trước cutoff | Phiên thử mới vẫn ghi log nhưng không làm đổi snapshot đang dùng cho nghiên cứu |
| U10 | Nối nút xác nhận đã mặc với hàm SV 1, không dùng nút chọn để thay thế | Chốt thử không đổi `last_worn_at`; xác nhận mặc mới gọi lưu; nghiên cứu không buộc người tham gia mặc thật từng bộ |
| U11 | Soạn hướng dẫn thao tác, lịch luân phiên và checklist quan sát; chủ trì kiểm log pilot | 2–3 người thử trước; kiểm đồng hồ, câu hỏi, tủ thiếu, reload; chốt giao thức với giảng viên |

**Tuần 10–12:** Cùng hai bạn tổ chức phiên; chạy script, dựng bảng ghép cặp theo người, đối soát số phiên và dữ liệu thiếu; viết phần tích hợp/phép đo/thực nghiệm. Không để SV 3 một mình tuyển người, làm người quan sát, phân tích và viết toàn bộ báo cáo.

**Gói bàn giao cá nhân:** UI + pipeline + event logger/history reader + test U1–U11 + giao thức/lịch thử + script phân tích + bảng từ log thật + phần báo cáo tương ứng. **Không tự viết lại WeatherFit, S1/S2/S3 hoặc điều chỉnh điểm để làm đẹp kết quả.**

### 8.4. Ranh giới phối hợp: Việc dễ chồng chéo do ai làm?

| Điểm giao nhau | Người làm chính | Người phối hợp / ranh giới |
|---|---|---|
| Thêm/sửa một món | SV 1 lưu/kiểm tra dữ liệu | SV 3 dựng form và hiện lỗi; không có hai cách lưu riêng |
| Hợp đồng dùng chung | SV 1 cập nhật `schema.py` | SV 2 duyệt Outfit/điểm, SV 3 duyệt Event/Session; cả nhóm chấp nhận trước khi đổi |
| Điểm ngữ cảnh | SV 1 tính WeatherFit/OccasionFit | SV 2 chỉ gọi và ghép S2, không tự tạo bảng khác |
| S1/S2/S3 và thứ hạng | SV 2 | SV 3 chỉ điều phối; không có công thức trong UI |
| Danh sách đã xem / Top-3 | SV 3 giữ trạng thái và cắt nhóm | SV 2 bàn giao đủ ứng viên đã chấm; cùng test không lặp |
| Lịch sử đã chọn | SV 3 ghi/đọc/loại trùng | SV 2 dùng để đếm sở thích; SV 1 phối hợp schema/snapshot |
| Lịch sử đã mặc | SV 1 kiểm tra và lưu | SV 3 lấy xác nhận riêng; SV 2 chỉ dùng mốc để tính phạt |
| Khóa dữ liệu và cấu hình | SV 1 dữ liệu, SV 2 thuật toán, SV 3 lịch/giao thức | Chốt cùng một mốc trước nghiên cứu; không ai tự thay giữa đợt |
| Thực nghiệm người dùng | Cả ba theo lịch được chia | SV 3 điều phối, không có nghĩa làm một mình |
| Kết luận đề tài | Cả ba, giảng viên góp ý | Không một người hoặc agent tự diễn giải thay khi chưa đối chiếu log |

**Quy tắc nhận việc:** Khi lỗi thuộc module của bạn khác, gửi đầu vào nhỏ, kết quả mong đợi/thực tế và test tái hiện. Người sở hữu sửa hoặc đồng ý cho hỗ trợ; không “chữa cháy” bằng bản sao hàm trong module mình.

### 8.5. Ghép việc của 3 người sẽ ra phiên bản nào?

| Mốc | SV 1 bàn giao | SV 2 bàn giao | SV 3 bàn giao | Phiên bản cả nhóm nhận được |
|---|---|---|---|---|
| Tuần 1–2 | D1 và dữ liệu 5 món | R1 thử + điểm tay | Schema log đề xuất + form/log thử | Hợp đồng và bài tập chung, chưa là sản phẩm |
| Tuần 3–5 | D2–D4: lưu tủ/lọc hợp lệ | R1–R4: tổ hợp/S1/thứ hạng | U1–U5: UI/Top-3/timer/log/khảo sát | **v1.0: bản quy tắc chạy đầu-cuối và đo được** |
| Tuần 6–7 | D5–D7: điểm ngữ cảnh mềm | R5–R7: S2/so sánh/độ trễ | U6–U8: cùng UI/log/đối soát | **v2.0: thêm ngữ cảnh, chưa cá nhân hóa** |
| Tuần 8–9 | D8–D10: mặc/snapshot/kiểm dữ liệu | R8–R11: sở thích/phạt lặp/khóa cấu hình | U9–U11: tích hợp v3/pilot/giao thức | **v3.0: cá nhân hóa heuristic sẵn sàng kiểm chứng** |
| Tuần 10–12 | Kiểm dữ liệu/quyền riêng tư | Phân tích thứ hạng/ablation | Tổng hợp phiên/bảng ghép cặp | **Bản nghiên cứu: code + dữ liệu được phép bàn giao + phân tích trung thực** |

**Bàn giao không chỉ là gửi code:** Mỗi lần gửi cần tên hàm, đầu vào/đầu ra, một ví dụ chạy được, test và lỗi còn biết. Bạn nhận phải chạy lại trước khi đánh dấu xong.

**Khi chưa có module của bạn:** Dùng fixture 5 món theo schema để làm độc lập, không ngồi chờ đến tuần ghép. Fixture chỉ phục vụ phát triển; trước nghiệm thu phải thay bằng hàm thật và kiểm thử đầu-cuối.

**Không nhầm:** v3 chạy được không đồng nghĩa v3 tốt hơn. Các mốc nghiệm thu xác nhận tính đúng/khả năng đo, không buộc số liệu phải cho thấy cải tiến.

### 8.6. Mỗi người bắt đầu ngay bằng việc gì?

Sau khi tự hoàn thành bài tập chung ở mục 6:

- **SV 1:** Nộp 5 Item + 1 Context, từ điển trường và test lọc một quần đang giặt. Chưa viết API thời tiết.
- **SV 2:** Nhận chính dữ liệu đó, liệt kê 4 bộ trước lọc và 2 bộ sau lọc, tính tay màu/phong cách, viết test R1/R3. Chưa cá nhân hóa.
- **SV 3:** Tạo form/ngữ cảnh + màn hình bộ mẫu, lưu một phiên bắt đầu–đổi–chọn; đề xuất schema log gửi SV 1. Chưa làm dashboard đẹp.
- **Cả nhóm:** Chạy lại bài của nhau, ghi điểm hợp đồng chưa thống nhất và chọn một nhóm trưởng. Tên thật điền vào bảng phân công nội bộ, không bắt buộc công khai thông tin sinh viên trên trang đọc.

### 8.7. Trách nhiệm chung và vai trò nhóm trưởng

- Phỏng vấn khám phá: chia khoảng 5–8 người cho cả nhóm, cùng dùng năm câu ở mục 0.2; phân tích cả người không gặp pain point.
- Dữ liệu mẫu: cả ba chụp/nhập phần được chia; SV 1 kiểm schema, hai bạn kiểm chéo nhãn. Đây là công việc chung, không phải SV 1 nhập đồ cho toàn bộ người tham gia một mình.
- Mỗi người đọc ít nhất một nguồn: SV 1 đọc bài về ngữ cảnh, SV 2 về compatibility/xếp hạng, SV 3 về thời gian chọn/UI; cùng trao đổi các giới hạn trong mục 0.7.
- Thực nghiệm: chia số buổi/người tham gia tương đối đều, dùng cùng kịch bản, không gợi ý đáp án hoặc nói v3 tốt hơn. Tách rõ người vận hành và người quan sát khi có đủ người.
- SV 1 viết dữ liệu/ngữ cảnh; SV 2 viết phương pháp/xếp hạng; SV 3 viết hệ thống/phép đo. Cả ba cùng viết nghiên cứu liên quan, đọc kết quả và chốt kết luận.
- Kiểm tra chéo: SV 1 tính lại điểm của SV 2; SV 2 đối soát log/biểu đồ của SV 3; SV 3 thử đầu vào thiếu/sai của SV 1.
- Nhóm trưởng giữ lịch, nhắc bàn giao và tổng hợp vướng mắc; không tự nhận hết việc khó hoặc làm hộ phần một thành viên chưa hiểu.
- Nếu chậm, giữ lõi quy tắc–ngữ cảnh–heuristic–logging; không mở thêm AI/API. Giảm trang trí hoặc nghiên cứu mở rộng sau khi trao đổi giảng viên, không bỏ đối chứng hay bịa dữ liệu.

### 8.8. Tiêu chí hoàn thành cá nhân và câu hỏi bảo vệ

Một đầu việc chỉ được đánh dấu xong khi: **có đầu ra → có test/ví dụ → bạn nhận chạy được → tác giả giải thích được → ghi phần chưa làm**. “Đã hỏi agent” hoặc “đã viết 80%” không phải bằng chứng hoàn thành.

| Thành viên | Demo cá nhân phải làm được | Câu hỏi phải tự trả lời |
|---|---|---|
| SV 1 | Đổi trạng thái một món; chứng minh lọc đúng; tính tay WeatherFit/OccasionFit; mở lại dữ liệu mặc | Vì sao `null` không phải 0? Tại sao v1 không lọc theo thời tiết? Vì sao đã chọn chưa phải đã mặc? |
| SV 2 | Tính S1/S2/S3 cho một bộ; giải thích A lên/B xuống; chạy cold-start và phạt mềm | Vì sao phải re-rank trước Top-3? Vì sao đồ vừa mặc không bị loại? Ablation cho biết và chưa cho biết gì? |
| SV 3 | Chạy chọn/đổi/bỏ dở/reload; đối soát log; tính lại một bảng từ fixture | Timer có reset khi rerun không? Phiên lỗi nằm ở mẫu số nào? Máy lấy điểm hài lòng từ đâu? |

Cuối kỳ, mỗi người nộp danh sách đầu việc mình sở hữu, bằng chứng kiểm tra, một lỗi đã tự tìm/sửa và phần báo cáo mình viết. Không chấm đóng góp chỉ bằng số dòng code hoặc số commit.

---

## 9. Dữ liệu: Nhỏ, sạch, có quyền sử dụng

### 9.1. Hai bộ dữ liệu chính và một bộ mở rộng tùy chọn

**Bộ A — Dữ liệu học và kiểm thử:**

- 5 món cho bài tập đầu.
- Sau đó tăng lên khoảng 30–50 món mẫu do nhóm tự chụp hoặc được cho phép sử dụng.
- Có đủ áo, quần, giày và một số trường hợp khó.
- Dùng để phát triển quy tắc, sửa lỗi và thử trọng số.

**Bộ B — Dữ liệu kiểm tra xử lý ảnh, chỉ khi mở rộng được duyệt:**

Không thu bộ này trong phạm vi bắt buộc v1/v2/v3. Các yêu cầu sau chỉ áp dụng nếu nhóm thực sự làm nhận dạng ảnh ở nhánh mở rộng.

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
- Mã `P01` chỉ là mã giả nếu nhóm vẫn giữ bảng liên hệ; lưu bảng đó riêng và hạn chế truy cập. Không gọi đây là ẩn danh hoàn toàn.
- Bản công khai mặc định dùng dữ liệu mẫu nhân tạo, schema và script. Chỉ công khai dữ liệu nghiên cứu khi có đồng ý đúng phạm vi và đã rà nguy cơ nhận dạng từ ảnh, timestamp hoặc chi tiết kết hợp; nếu không, bàn giao có kiểm soát cho giảng viên và công bố bảng tổng hợp phù hợp.

---

## 10. Đo thời gian: Định nghĩa trước rồi mới lập trình

### 10.1. Chỉ số chính và chỉ số hỗ trợ

| Chỉ số | Cách hiểu | Vai trò |
|---|---|---|
| `decision_time_ms` | Từ khi bấm bắt đầu phiên, sau khi ngữ cảnh đã được xác nhận, đến khi chốt một bộ | Chỉ số chính của nghiên cứu giao diện |
| `refresh_count` | Số sự kiện yêu cầu nhóm gợi ý khác được ứng dụng chấp nhận trong phiên, kể cả yêu cầu dẫn tới lỗi | Chỉ số phụ chính; không phải số lần thay đồ ngoài đời |
| `completion_rate` | Số phiên chốt được bộ / tổng phiên đã bắt đầu trong nghiên cứu chính | Tránh kết luận “nhanh” do bỏ qua người không chọn được |
| `suitability` | Người dùng đánh giá bộ đã chốt phù hợp nhu cầu/ngữ cảnh, 1–5 | Chất lượng của lựa chọn; chỉ có nếu chọn bộ và trả lời |
| `satisfaction` | Người dùng đánh giá hài lòng với quá trình chọn trong phiên, 1–5 | Trải nghiệm; có thể hỏi cả khi chủ động kết thúc không chọn |
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

Lưu câu trả lời này vào `suitability`. Phiên không chọn được không có điểm đánh giá bộ đã chọn; ghi `null`, không tự gán 1 hoặc 0. Có thể hỏi riêng lý do không chọn. Nếu muốn báo tỷ lệ bộ được đánh giá phù hợp, chốt trước ngưỡng, ví dụ điểm từ 4 trở lên, và luôn ghi rõ mẫu số là các phiên đã chọn có đánh giá.

Câu hỏi hài lòng dùng riêng: **“Bạn hài lòng với quá trình chọn trang phục trong phiên này ở mức nào?”** Lưu vào `satisfaction`:

- 1: Rất không hài lòng.
- 2: Không hài lòng.
- 3: Bình thường.
- 4: Hài lòng.
- 5: Rất hài lòng.

Hỏi sau khi dừng đồng hồ, kể cả khi người dùng chủ động kết thúc không chọn nếu họ còn ở đó. Cho phép bỏ qua; không chọn sẵn 3 hoặc ép trả lời. Phiên lỗi/đóng tab không có câu trả lời giữ `null`. Khi tổng hợp, ghi số câu trả lời và trạng thái phiên; không trộn nhóm trả lời khác nhau rồi quy toàn bộ khác biệt cho thuật toán.

**Không gọi tất cả dữ liệu là “đo tự động khách quan”:** Thời gian và thao tác được tự động ghi theo định nghĩa; hai thang điểm là tự báo cáo chủ quan, được hệ thống lưu lại. Không suy hài lòng từ bấm chọn hoặc ít lần đổi.

`refresh_count` đếm yêu cầu đổi, không đếm lần render lại hoặc từng thẻ trong nhóm. Ví dụ bắt đầu → nhóm 3 → đổi → nhóm 3 khác → chọn có `refresh_count = 1`, không phải 3 hay 6. Khóa nút trong khi xử lý để một yêu cầu không bị ghi hai lần; nếu nút đã vô hiệu hóa vì hết bộ, không phát sinh yêu cầu mới. Những lần đổi chủ động khác nhau vẫn phải được đếm đủ.

Nghiên cứu thăm dò nên báo song song mức phù hợp, hài lòng và tỷ lệ hoàn thành. Chưa có tiêu chí cùng thiết kế phù hợp thì không kết luận đã chứng minh “chất lượng không giảm”; không tìm thấy khác biệt rõ cũng chưa chứng minh hai phiên bản tương đương.

### 10.2. Đồng hồ bắt đầu và kết thúc ở đâu?

Quy trình một phiên:

1. Người dùng kiểm tra ngữ cảnh, chưa thấy gợi ý của phiên.
2. Bấm **Bắt đầu chọn** → tạo phiên và ghi mốc bắt đầu.
3. Hệ thống tạo, hiển thị các bộ.
4. Người dùng chọn ngay hoặc bấm **Đổi bộ khác**.
5. Bấm **Chọn bộ này** → ghi kết quả và kết thúc đồng hồ.
6. Hỏi riêng mức phù hợp và hài lòng 1–5; thời gian trả lời khảo sát không cộng vào thời gian chọn. Nút xác nhận đã mặc là thao tác riêng, không dùng để kết thúc timer.

Trong UI, ghi rõ **“Xác nhận ngữ cảnh và bắt đầu chọn”** cho nút bắt đầu. Như vậy lời mô tả “từ lúc xác nhận ngữ cảnh” và mốc `session_started` là cùng một thao tác, không có khoảng chờ bị tính khác giữa các phiên bản.

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
feedback_submitted
wear_confirmed
```

`outfit_selected` là kết thúc thành công của đồng hồ; `feedback_submitted` lưu hai câu trả lời sau đó, không tính như phiên mới. `wear_confirmed` chỉ ghi nhận người dùng thực sự xác nhận đã mặc và liên kết với cập nhật tủ của SV 1; không tự phát sinh sau mỗi `outfit_selected`.

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
  "phase": "development",
  "scenario_id": "presentation_demo_01",
  "trial_index": 1,
  "order_id": "v1-v2-v3",
  "reference_time": "2026-10-30T07:00:00+07:00",
  "decision_time_ms": 18000,
  "refresh_count": 1,
  "selected_outfit_id": "item_001|item_007|item_012",
  "status": "selected",
  "suitability": 4,
  "satisfaction": 3
}
```

**Dữ liệu trên hoàn toàn minh họa; không đưa các giá trị này vào bảng kết quả thực nghiệm.**

Log sự kiện chi tiết cần thêm mã/thứ tự sự kiện, nhóm outfit đã trả về, điểm tương ứng và mốc thời gian. Chỉ lưu một dòng tổng kết là chưa đủ để kiểm tra hệ thống có đếm lần đổi đúng hay không.

**Hợp đồng Event do SV 3 đề xuất, SV 1 cập nhật vào schema:** `event_id`, `session_id`, `participant_id`, `event_type`, `event_index`, `occurred_at`, `elapsed_ms`, `payload`. `elapsed_ms` là thời gian kể từ mốc bắt đầu theo cùng đồng hồ khi còn phiên; không nối đồng hồ đã mất sau reload. Payload gợi ý lưu danh sách mã bộ theo đúng thứ tự, score_parts và `remaining_count`; payload chọn lưu mã bộ và thuộc tính lúc chọn/snapshot tham chiếu; payload đánh giá lưu hai câu trả lời, cho phép null. Không ghi thông tin nhận dạng trực tiếp.

**Metadata phiên phải bền vững ngay từ đầu:** `session_started.payload` lưu `version`, `config_id`, `phase`, `scenario_id`, `trial_index`, `order_id`, các mã snapshot và `reference_time` ngay khi bấm bắt đầu. Bản tóm tắt cuối phiên chỉ lặp lại các giá trị đó, không phải nơi duy nhất chứa chúng; phiên bị đóng tab hoặc mất kết nối giữa chừng vẫn phải xếp đúng version/phase khi tính completion.

`phase` phân biệt `development`, `practice`, `history_collection`, `pilot`, `main` để dữ liệu test không lẫn nghiên cứu. `trial_index`, `order_id`, `scenario_id` dùng kiểm tra hiệu ứng thứ tự/tình huống. Mỗi phiên main có đúng một bản tóm tắt, nhưng mọi sự kiện thô vẫn giữ lại để đối soát.

**Fixture kiểm tra script, không phải kết quả:** Bốn phiên đã bắt đầu: A chọn sau 18.000 ms, đổi 1 lần; B chọn sau 30.000 ms, đổi 0 lần; C bỏ dở, đổi 2 lần; D lỗi, đổi 0 lần. Completion = 2/4 = 50%; trung vị thời gian của hai phiên chọn = 24.000 ms; số lần đổi trên tất cả phiên là [1, 0, 2, 0]. C/D có `decision_time_ms = null`, không phải 0. Tự tạo fixture này và viết test để script không âm thầm bỏ hai phiên thất bại.

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
2. **Chi phí số hóa là bao nhiêu?** Đo thời gian nhập/sửa thủ công nếu bàn về lợi ích tổng thể. Chỉ đo lỗi nhận dạng ở nhánh mở rộng xử lý ảnh đã được duyệt; không phải yêu cầu làm thêm AI.
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
- Trong nghiên cứu chính, thẻ chỉ hiện cùng mẫu ảnh/thuộc tính áo–quần–giày, không hiện lời khen hoặc điểm tổng khác nhau theo version. Điểm thành phần/lý do vẫn lưu trong log để phân tích; nếu bật lời giải thích riêng thì đó là một yếu tố UI cần đánh giá tách biệt.

Thay đổi có chủ đích:

- v2 so với v1: thêm điểm mềm WeatherFit/OccasionFit vào S1, không thay bộ lọc hoặc tập ứng viên ban đầu.
- v3 so với v2: thêm gói sở thích + phạt lặp, không thay dữ liệu nguồn, giao diện hoặc cách đo.

Không để v1.0 chậm vì giao diện khó dùng, còn v3.0 có ít nút hơn rồi quy toàn bộ cải thiện cho thuật toán.

**Đặc biệt:** Trong thử nghiệm thời gian chọn, cả ba phiên bản dùng cùng metadata đã xác nhận. Nếu triển khai mở rộng tự động nhập ảnh, đánh giá tính năng đó riêng, không gán nó cho v2.0 hoặc thay dữ liệu đầu vào giữa các phiên bản; nếu không, nhóm không biết tác động đến từ xếp hạng hay dữ liệu.

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

Ở snapshot có lịch sử hợp lệ, v3 không sở thích dùng `0.75 × S2 - 0.20 × RotationPenalty`; v3 không phạt dùng `0.75 × S2 + 0.25 × PreferenceScore`. Chỉ đặt thành phần cần tắt bằng 0, không đổi trọng số còn lại hoặc chuyển sang nhánh cold-start, vì đó là can thiệp khác. Trường hợp không có lịch sử thật cần báo riêng; không tạo lịch sử giả để làm ablation người dùng.

**Phần bắt buộc của SV 2:** Hỗ trợ cấu hình tắt từng thành phần và test tác động lên thứ hạng trên dữ liệu cố định. **Phần mở rộng của cả nhóm:** Đo thời gian người dùng dưới các cấu hình ablation. Nếu chưa làm phần mở rộng thì chỉ kết luận về thứ hạng, không gán mức giảm thời gian cho riêng sở thích hoặc riêng phạt lặp.

### 11.8. Cách tổng hợp kết quả ở mức nhập môn

Với mỗi người:

1. Với mỗi người, ghép các phiên hoàn thành theo `scenario_id`: chỉ những tình huống hoàn thành ở cả hai phiên bản đang so sánh mới được dùng để so thời gian; tình huống hoàn thành ở một phía vẫn nằm trong tỷ lệ hoàn thành và bảng mô tả riêng.
2. Tính trung vị thời gian trên các tình huống ghép cặp được ở từng phiên bản, rồi tính chênh lệch cho chính người đó.
3. Tổng hợp chênh lệch trên các người tham gia; nếu số tình huống ghép cặp được quá ít hoặc lệch độ khó, chỉ mô tả thời gian có điều kiện, không suy thành cải thiện tốc độ.
4. Báo cáo song song số phiên hoàn thành, bỏ dở, timeout, lỗi, thiếu kết thúc, điểm phù hợp và hài lòng.
5. Tổng hợp `refresh_count` trên **tất cả phiên main đã bắt đầu** theo người/version, kèm bảng tách theo trạng thái; số lần đổi thấp vì lỗi sớm không phải thành công. Có thể bổ sung bảng chỉ phiên hoàn thành nhưng phải ghi rõ mẫu số.
6. Với hai thang điểm, báo phân bố 1–5 và số câu trả lời/thiếu riêng từng thang; không coi null là 0. Không cộng hoặc lấy trung bình chung hai câu hỏi thành một chỉ số “chất lượng” không định nghĩa trước.

Trung vị là giá trị giữa sau khi sắp xếp, thường ít bị chi phối bởi một phiên quá dài hơn trung bình.

Nếu tính tỷ lệ giảm cho từng người:

```text
reduction_percent = (T_baseline - T_new) / T_baseline × 100
```

Trong đó `T_baseline` và `T_new` phải cùng định nghĩa, cùng người và có đủ dữ liệu hợp lệ. Người không có phiên hoàn thành ở một phía vẫn được báo cáo trong tỷ lệ hoàn thành và số người thiếu cặp; không bị âm thầm biến mất.

Không coi 90 phiên của 10 người là 90 người độc lập. Nếu muốn kiểm định hoặc khoảng tin cậy, trao đổi với giảng viên để chọn phương pháp theo cặp và xử lý việc nhiều phiên thuộc cùng một người.

Bảng kết quả chưa đo nên để đúng như sau:

| Phiên bản | Số người | Hoàn thành / đã bắt đầu | Thời gian chốt (ms) | Số yêu cầu đổi | Phù hợp 1–5 | Hài lòng 1–5 |
|---|---|---|---|---|---|---|
| v1.0 | Chưa đo | Chưa đo | Chưa đo | Chưa đo | Chưa đo | Chưa đo |
| v2.0 | Chưa đo | Chưa đo | Chưa đo | Chưa đo | Chưa đo | Chưa đo |
| v3.0 | Chưa đo | Chưa đo | Chưa đo | Chưa đo | Chưa đo | Chưa đo |

Trước khi điền, chốt cách tổng hợp từng cột và đơn vị. Ưu tiên biểu đồ ghép cặp theo từng người hơn chỉ vẽ ba cột trung bình làm mất khác biệt cá nhân.

---

## 12. Lộ trình gợi ý 12 tuần và các mốc nghiệm thu

Đây là kế hoạch tham khảo, cần điều chỉnh theo lịch học và thời gian được giao. Không bỏ bước kiểm thử để giữ đủ mọi tính năng.

Mã D/R/U trỏ tới nhiệm vụ chi tiết của SV 1/SV 2/SV 3 ở mục 8. Đây là kế hoạch tương đối, không phải ngày cố định hoặc thông báo nhóm đã hoàn thành.

| Tuần | SV 1 phải giao | SV 2 phải giao | SV 3 phải giao | Mốc kiểm tra chung |
|---|---|---|---|---|
| 1 | Cùng phỏng vấn, bài JSON/lọc | Cùng phỏng vấn, bài JSON/lọc | Cùng phỏng vấn, bài JSON/lọc | 5–8 trao đổi khám phá nếu được đồng ý; không tạo kết luận định lượng giả |
| 2 | D1: schema và 5 món | R1 thử, điểm tay | Event/Session đề xuất, UI fixture | Cả ba tự giải thích bài nền, duyệt hợp đồng |
| 3 | D2–D3: lưu/lọc | R1–R2: ghép/bảng quy tắc | U1 và khung U2–U4 | Module chạy độc lập; không đợi đủ cả app mới test |
| 4 | D4: dữ liệu phát triển cùng nhóm | R3–R4: S1/thứ hạng | U2–U4: pipeline/phiên/log | Tủ 4 bộ cho nhóm 3 rồi 1; thiếu giày cho 0 |
| 5 | Sửa lỗi lưu/lọc, duyệt schema đo | Sửa lỗi điểm/bằng điểm | U5, hoàn tất U1–U4 | **Mốc A: v1 đo được, có hai câu hỏi đánh giá** |
| 6 | D5–D6: bảng/điểm ngữ cảnh | R5: kết hợp S2 | U6–U7: so sánh/log đầy đủ | Tính tay và code cùng S2 = 0.817 ở ví dụ |
| 7 | D7: dữ liệu thiếu/ranh giới | R6–R7: đối chiếu ứng viên/độ trễ | U8: script và fixture đối soát | **Mốc B: v1/v2 cùng ứng viên và UI** |
| 8 | D8–D9: mặc/snapshot | R8–R10: sở thích/phạt/re-rank | U9–U10: tích hợp/lịch sử | Cold-start đúng; cả nhóm chuẩn bị lịch sử thật sau khi được đồng ý |
| 9 | D10: rà dữ liệu | R11: khóa tham số | U11: pilot và giao thức | **Mốc C: pilot đạt, lịch sử/config/giao thức đã khóa** |
| 10 | Cùng thu phiên; kiểm dữ liệu | Cùng thu phiên; kiểm thứ hạng | Cùng thu phiên; đối soát log | Người tham gia thật, lưu cả gián đoạn và lỗi |
| 11 | Rà dữ liệu thiếu và bản bàn giao | Phân tích xếp hạng/ablation kỹ thuật | Chạy bảng/biểu đồ theo người | Ba người kiểm một bảng bằng tay; không lấy fixture làm kết quả |
| 12 | Báo cáo dữ liệu/giới hạn | Báo cáo phương pháp/giới hạn | Báo cáo hệ thống/phép đo | **Mốc D: tái lập, bảo vệ cá nhân, kết luận chung đúng phạm vi** |

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
Đầu việc hiện tại: [D1–D10, chọn đúng một việc trong mục 8.1].
Tôi chỉ sở hữu schema đã được nhóm duyệt, lưu tủ, lọc hợp lệ,
điểm ngữ cảnh và lưu xác nhận đã mặc; không viết UI hay S1/S2/S3.
Hãy giúp tôi phân biệt lọc theo user_id/available với chấm điểm mềm.
v1 không lọc thời tiết/sự kiện; v2/v3 giữ cùng bộ lọc đó.
Không coi 'không đi giày trắng khi mưa' là quy tắc cho mọi người.
Cho tôi một bài tập và test với đầu vào/đầu ra để SV 2/SV 3 dùng.
Chưa nối API, nhận dạng ảnh hoặc viết thay toàn bộ module.
```

**SV 2 — Xếp hạng và cá nhân hóa:**

```text
Tôi phụ trách feat/outfit-ranking, nhận dữ liệu hợp lệ từ SV 1.
Đầu việc hiện tại: [R1–R11, chọn đúng một việc trong mục 8.2].
Tôi sở hữu sinh ứng viên và S1/S2/S3; gọi context_fit của SV 1,
không tự viết lại bảng ngữ cảnh, UI, timer hoặc nơi ghi lịch sử.
Hướng dẫn tôi tính tay bằng dữ liệu nhỏ trước khi code.
v3 phải re-rank mọi ứng viên trước Top-3; phạt lặp không loại món.
SV 3 giữ danh sách đã xem và cắt nhóm, tôi bàn giao đủ bộ đã chấm.
Đề xuất test khớp ví dụ và giải thích cold-start, bằng điểm.
Chưa viết cả hệ thống, không nhảy vào embedding hoặc RL.
```

**SV 3 — Giao diện và đo lường:**

```text
Tôi phụ trách feat/ui-evaluation, dùng Streamlit và tích hợp
hàm lọc của SV 1 cùng hàm xếp hạng của SV 2.
Đầu việc hiện tại: [U1–U11, chọn đúng một việc trong mục 8.3].
Tôi chỉ làm UI, pipeline, log/history reader và phân tích phiên;
không chép lại hàm lưu tủ hoặc công thức điểm của hai bạn.
Đo từ nút Xác nhận ngữ cảnh và bắt đầu chọn đến nút Chọn bộ.
Người dùng có thể bấm Đổi nhiều lần và Streamlit sẽ rerun.
Hãy hướng dẫn state/test để timer không reset, không đếm chọn lặp,
không mất dấu phiên tải lại/đóng tab và không lặp bộ đã xem.
Suitability và satisfaction là hai câu hỏi người dùng nhập riêng;
chọn không có nghĩa đã mặc. Không tự sinh câu trả lời còn thiếu.
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
- [ ] Có đường nhập/sửa thuộc tính thủ công; dữ liệu thiếu được ghi nhận đúng.
- [ ] v1 không dùng ngữ cảnh/lịch sử để lọc hoặc chấm điểm; v1/v2/v3 cùng tập ứng viên ban đầu.
- [ ] v3 re-rank toàn bộ ứng viên trước Top-3, phạt lặp không loại món hợp lệ.
- [ ] Chọn bộ và xác nhận đã mặc là hai thao tác tách biệt.
- [ ] v1, v2, v3 chạy lại được với cấu hình rõ ràng; không cần API hoặc mô hình ảnh.

### C. Đo lường

- [ ] Định nghĩa rõ mốc bắt đầu/kết thúc thời gian.
- [ ] Đổi bộ không reset timer.
- [ ] Bấm chọn lặp không tạo nhiều kết quả.
- [ ] `session_started` lưu metadata phiên ngay khi bắt đầu; phiên mất kết nối vẫn xếp đúng version/phase khi tổng hợp.
- [ ] Giữ lại phiên bỏ dở, timeout, lỗi và thiếu kết thúc; completion dùng toàn bộ phiên main đã bắt đầu.
- [ ] Phù hợp (`suitability`) và hài lòng (`satisfaction`) có hai câu hỏi, hai trường riêng; thiếu giữ null.
- [ ] Số lần đổi là số yêu cầu hợp lệ trong UI, không phải số lần mặc thử hoặc số lần render.
- [ ] Phân biệt thời gian engine với thời gian chọn trên giao diện.
- [ ] Không tính Hit Rate@3 bằng một “đáp án” được tạo từ chính Top-3 đã hiển thị.

### D. Thực nghiệm và báo cáo

- [ ] Người tham gia đã đồng ý; dữ liệu phân tích đã được ẩn danh.
- [ ] Có pilot và giao thức nghiên cứu chính được chốt.
- [ ] Có kiểm soát thứ tự thử và điều kiện đầu vào.
- [ ] Lịch sử v3 có trước phiên kiểm tra, chỉ gồm phase được duyệt; không rò rỉ dữ liệu tương lai.
- [ ] So sánh thời gian ghép cặp theo tình huống hoàn thành ở cả hai phiên bản; không so trung vị trên hai tập tình huống khác nhau.
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
