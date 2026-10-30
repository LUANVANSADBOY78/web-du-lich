import { useState, useEffect } from "react";
import {
  FileQuestion, Search, Plus, Edit2, Trash2, CheckCircle2, XCircle,
  ChevronDown, ChevronUp, ArrowUpDown, Eye, EyeOff, RotateCcw, HelpCircle
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_FAQS = [
  {
    id: 1,
    category: "Đặt vé & Tour",
    question: "Làm thế nào để đặt vé tham quan hoặc tour trên GoTravel?",
    answer: "Quý khách chỉ cần chọn điểm đến hoặc dịch vụ mong muốn, chọn ngày khởi hành/tham quan và số lượng khách, sau đó bấm 'Đặt ngay'. Điền thông tin người liên hệ và tiến hành thanh toán trực tuyến qua VNPAY, Momo, Thẻ ATM hoặc chuyển khoản ngân hàng. Ngay sau khi thanh toán, mã vé QR điện tử sẽ được gửi tức thì về Email và SMS/Zalo của bạn.",
    orderIndex: 1,
    isActive: true
  },
  {
    id: 2,
    category: "Đặt vé & Tour",
    question: "Tôi có thể đặt tour trước bao lâu và khi nào nhận được xác nhận?",
    answer: "Quý khách có thể đặt tour trước từ 3 tháng đến 24 giờ trước giờ khởi hành. Đơn hàng được xác nhận ngay tức thì kèm theo hợp đồng điện tử và số điện thoại của trưởng đoàn/hướng dẫn viên điều phối.",
    orderIndex: 2,
    isActive: true
  },
  {
    id: 3,
    category: "Thanh toán & Hóa đơn",
    question: "GoTravel hỗ trợ những hình thức thanh toán nào?",
    answer: "Hệ thống hỗ trợ đa dạng phương thức thanh toán an toàn, bảo mật tiêu chuẩn PCI-DSS bao gồm: Thẻ ATM nội địa (Internet Banking), Thẻ quốc tế Visa/MasterCard/JCB, Ví điện tử Momo, ZaloPay, VNPay-QR và Chuyển khoản ngân hàng 24/7 có tự động khớp lệnh.",
    orderIndex: 3,
    isActive: true
  },
  {
    id: 4,
    category: "Thanh toán & Hóa đơn",
    question: "Tôi có được xuất hóa đơn VAT điện tử cho công ty không?",
    answer: "Có. Khi tiến hành thanh toán, quý khách chỉ cần tích chọn 'Yêu cầu xuất hóa đơn công ty' và điền Tên công ty, Mã số thuế, Địa chỉ. Hóa đơn VAT điện tử hợp lệ sẽ được gửi vào email của quý khách trong vòng 24 - 48 giờ làm việc.",
    orderIndex: 4,
    isActive: true
  },
  {
    id: 5,
    category: "Quy định & Hoàn hủy",
    question: "Chính sách hủy tour hoặc hủy vé được quy định như thế nào?",
    answer: "Đối với vé tham quan: Hầu hết vé được miễn phí hoàn hủy hoặc đổi ngày trước 24 giờ so với giờ sử dụng (trừ vé khuyến mãi đặc biệt).\nĐối với Tour: Hủy trước 7 ngày miễn phí 100%, hủy từ 3-6 ngày phí 30%, hủy trước 1-2 ngày phí 50%. Quý khách có thể gửi yêu cầu hoàn tiền trực tiếp tại mục 'Quản lý vé' hoặc liên hệ hotline CSKH.",
    orderIndex: 5,
    isActive: true
  },
  {
    id: 6,
    category: "Thành viên & Ưu đãi",
    question: "Chương trình tích điểm GoPoints và thăng hạng thành viên hoạt động ra sao?",
    answer: "Mỗi 100.000 VNĐ chi tiêu đặt vé hoặc tour, quý khách sẽ được tích lũy 100 GoPoints. Điểm có thể dùng để khấu trừ trực tiếp vào đơn hàng sau hoặc đổi các mã voucher giảm giá, vé tham quan miễn phí và các đặc quyền nâng hạng phòng/xe đưa đón.",
    orderIndex: 6,
    isActive: true
  }
];

export default function FAQManagement() {
  const [faqs, setFaqs] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_faqs");
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  const [formData, setFormData] = useState({
    category: "Đặt vé & Tour",
    question: "",
    answer: "",
    orderIndex: 1,
    isActive: true
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_faqs", JSON.stringify(faqs));
  }, [faqs]);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingFaq(item);
      setFormData({
        category: item.category,
        question: item.question,
        answer: item.answer,
        orderIndex: item.orderIndex,
        isActive: item.isActive
      });
    } else {
      setEditingFaq(null);
      setFormData({
        category: "Đặt vé & Tour",
        question: "",
        answer: "",
        orderIndex: faqs.length + 1,
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error("Vui lòng điền đầy đủ câu hỏi và câu trả lời!");
      return;
    }

    if (editingFaq) {
      setFaqs(
        faqs.map((f) =>
          f.id === editingFaq.id
            ? { ...f, ...formData, orderIndex: Number(formData.orderIndex) || 1 }
            : f
        )
      );
      toast.success("Cập nhật câu hỏi FAQ thành công!");
    } else {
      const newFaq = {
        id: Date.now(),
        ...formData,
        orderIndex: Number(formData.orderIndex) || faqs.length + 1
      };
      setFaqs([...faqs, newFaq]);
      toast.success("Thêm câu hỏi FAQ mới thành công!");
    }
    setIsModalOpen(false);
  };

  const handleToggleActive = (id) => {
    setFaqs(
      faqs.map((f) => (f.id === id ? { ...f, isActive: !f.isActive } : f))
    );
    toast.info("Đã thay đổi trạng thái kích hoạt FAQ!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) {
      setFaqs(faqs.filter((f) => f.id !== id));
      toast.success("Đã xóa câu hỏi thường gặp!");
    }
  };

  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  const filteredFaqs = faqs
    .filter((f) => {
      const matchSearch =
        f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = categoryFilter === "all" || f.category === categoryFilter;
      return matchSearch && matchCat;
    })
    .sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileQuestion className="text-sky-600" /> Quản Lý Câu Hỏi Thường Gặp (FAQ)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Tổng hợp câu trả lời cho các thắc mắc phổ biến của du khách về dịch vụ, thanh toán, hủy đổi
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_faqs");
              setFaqs(INITIAL_FAQS);
              toast.info("Đã khôi phục danh sách FAQ mẫu!");
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition"
          >
            <RotateCcw size={14} /> Mẫu dữ liệu
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl shadow-sm transition"
          >
            <Plus size={18} /> Thêm FAQ Mới
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 uppercase">Tổng số câu hỏi</span>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{faqs.length}</p>
          <span className="text-xs text-sky-600 font-medium">Toàn hệ thống</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-emerald-600 uppercase">Đang hiển thị</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            {faqs.filter((f) => f.isActive).length}
          </p>
          <span className="text-xs text-slate-500">Du khách thấy trên web</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 uppercase">Đang tạm ẩn</span>
          <p className="text-2xl font-bold text-amber-500 mt-1">
            {faqs.filter((f) => !f.isActive).length}
          </p>
          <span className="text-xs text-slate-500">Chờ cập nhật</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-blue-600 uppercase">Danh mục chủ đề</span>
          <p className="text-2xl font-bold text-blue-600 mt-1">{categories.length}</p>
          <span className="text-xs text-slate-500">Phân loại rõ ràng</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm nội dung câu hỏi hoặc câu trả lời FAQ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-white"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="all">Tất cả chủ đề ({faqs.length})</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c} ({faqs.filter((f) => f.category === c).length})
            </option>
          ))}
        </select>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl border transition shadow-sm overflow-hidden ${
                  isExpanded
                    ? "border-sky-300 dark:border-sky-800"
                    : "border-slate-200 dark:border-slate-800"
                }`}
              >
                {/* Header row */}
                <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="flex items-center gap-3 text-left flex-1 group"
                  >
                    <span className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 font-bold text-xs flex items-center justify-center shrink-0">
                      #{item.orderIndex}
                    </span>
                    <div className="space-y-0.5">
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium mr-2">
                        {item.category}
                      </span>
                      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition inline">
                        {item.question}
                      </h3>
                    </div>
                  </button>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleActive(item.id)}
                      title={item.isActive ? "Đang bật hiển thị" : "Đang tắt hiển thị"}
                      className={`p-2 rounded-xl border transition ${
                        item.isActive
                          ? "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900"
                          : "text-slate-400 bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700"
                      }`}
                    >
                      {item.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>

                    <button
                      onClick={() => handleOpenModal(item)}
                      title="Chỉnh sửa câu hỏi"
                      className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-xl transition"
                    >
                      <Edit2 size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      title="Xóa câu hỏi"
                      className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition"
                    >
                      <Trash2 size={16} />
                    </button>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                    >
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Answer */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30">
                    <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed pl-10 border-l-2 border-sky-400">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white dark:bg-slate-900 p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400">
            Không tìm thấy câu hỏi thường gặp nào phù hợp với bộ lọc.
          </div>
        )}
      </div>

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FileQuestion className="text-sky-600" />
              {editingFaq ? "Cập Nhật Câu Hỏi Thường Gặp" : "Thêm Câu Hỏi Thường Gặp Mới"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Danh mục chủ đề
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Đặt vé & Tour">Đặt vé & Tour</option>
                    <option value="Thanh toán & Hóa đơn">Thanh toán & Hóa đơn</option>
                    <option value="Quy định & Hoàn hủy">Quy định & Hoàn hủy</option>
                    <option value="Thành viên & Ưu đãi">Thành viên & Ưu đãi</option>
                    <option value="Hướng dẫn sử dụng">Hướng dẫn sử dụng</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Thứ tự sắp xếp
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.orderIndex}
                    onChange={(e) => setFormData({ ...formData, orderIndex: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Nội dung câu hỏi
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Làm sao để được xuất hóa đơn VAT?"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Câu trả lời chi tiết
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Nhập nội dung giải đáp rõ ràng..."
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500"
                />
                <label htmlFor="isActive" className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                  Hiển thị công khai trên website cho khách hàng
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-sm"
                >
                  {editingFaq ? "Lưu thay đổi" : "Thêm mới FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
