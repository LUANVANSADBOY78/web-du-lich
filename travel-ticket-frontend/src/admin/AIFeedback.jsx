import { useState, useEffect } from "react";
import { 
  MessageCircle, Star, ThumbsUp, ThumbsDown, Search, 
  CheckCircle2, AlertTriangle, RefreshCw, X, Plus, Trash2, 
  Sparkles, Filter, ArrowUpRight
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_FEEDBACK = [
  {
    id: 1,
    customerName: "Nguyễn Minh Quang",
    customerPhone: "0912384756",
    userQuery: "1+1 bằng mấy và có tour nào cho 2 người không?",
    aiResponse: "Dạ, kết quả của phép tính 1 + 1 = 2 bạn nhé! Mình xin gợi ý Tour Phú Quốc 3N2Đ Cano 4 Đảo hoặc Tour Đà Nẵng 4N3Đ rất lãng mạn cho 2 người.",
    rating: 5,
    type: "positive", // positive (thumbs up), negative (thumbs down)
    comment: "AI trả lời nhanh, hài hước và gợi ý tour 2 người rất đúng ý mình!",
    status: "retrained", // new, reviewed, retrained
    createdAt: "30/10/2026 11:20"
  },
  {
    id: 2,
    customerName: "Trần Mai Anh",
    customerPhone: "0987654321",
    userQuery: "Tour Hàn Quốc mùa thu có cần visa không và chi phí bao nhiêu?",
    aiResponse: "Tour Hàn Quốc 5N4Đ Seoul - Nami của GoTicket có giá 15.890.000đ. Hệ thống hỗ trợ làm Visa trọn gói trong 6 ngày làm việc.",
    rating: 5,
    type: "positive",
    comment: "Thông tin visa rõ ràng, giá minh bạch.",
    status: "reviewed",
    createdAt: "30/10/2026 09:45"
  },
  {
    id: 3,
    customerName: "Lê Hoàng Phúc",
    customerPhone: "0903112233",
    userQuery: "Có vé cáp treo Fansipan buổi tối không?",
    aiResponse: "Cáp treo Fansipan Legend thường hoạt động từ 7h30 đến 17h30 hàng ngày để đảm bảo an toàn sương mù, không hoạt động vào ban đêm bạn nhé.",
    rating: 4,
    type: "positive",
    comment: "Rất chi tiết và an tâm khi lên kế hoạch.",
    status: "new",
    createdAt: "29/10/2026 16:30"
  },
  {
    id: 4,
    customerName: "Đinh Văn Tiến",
    customerPhone: "0944119988",
    userQuery: "Tôi muốn đi tour 10 người được giảm bao nhiêu?",
    aiResponse: "Dạ tôi chưa rõ ý bạn. Bạn đang tìm Tour du lịch, Vé vui chơi hay Khách sạn?",
    rating: 2,
    type: "negative",
    comment: "AI trước đây chưa hiểu câu hỏi về số lượng người đoàn đông.",
    status: "retrained",
    createdAt: "28/10/2026 14:15"
  }
];

export default function AIFeedback() {
  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_ai_feedbacks");
    return saved ? JSON.parse(saved) : INITIAL_FEEDBACK;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    userQuery: "",
    aiResponse: "",
    rating: 5,
    type: "positive",
    comment: ""
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_ai_feedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);

  const handleOpenAdd = () => {
    setFormData({
      customerName: "",
      userQuery: "",
      aiResponse: "",
      rating: 5,
      type: "positive",
      comment: ""
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.userQuery || !formData.comment) {
      toast.error("Vui lòng nhập câu hỏi và nội dung nhận xét!");
      return;
    }

    const newFb = {
      id: Date.now(),
      ...formData,
      customerPhone: "09" + Math.floor(10000000 + Math.random() * 90000000),
      rating: Number(formData.rating),
      status: "new",
      createdAt: new Date().toLocaleDateString("vi-VN") + " " + new Date().toLocaleTimeString("vi-VN", { hour: '2-digit', minute: '2-digit' })
    };

    setFeedbacks([newFb, ...feedbacks]);
    toast.success("Thêm feedback đánh giá AI thành công!");
    setIsModalOpen(false);
  };

  const handleRetrainAI = (item) => {
    setFeedbacks(feedbacks.map(f => {
      if (f.id === item.id) {
        return { ...f, status: "retrained" };
      }
      return f;
    }));
    toast.success(`Đã nạp câu hỏi "${item.userQuery}" vào Knowledge Base để huấn luyện lại AI!`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa phản hồi này?")) {
      setFeedbacks(feedbacks.filter(f => f.id !== id));
      toast.success("Đã xóa phản hồi!");
    }
  };

  const filtered = feedbacks.filter(f => {
    const matchSearch = f.userQuery.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        f.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        f.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRating = filterRating === "all" || f.rating === Number(filterRating);
    const matchStatus = filterStatus === "all" || f.status === filterStatus;
    return matchSearch && matchRating && matchStatus;
  });

  const positiveCount = feedbacks.filter(f => f.rating >= 4).length;
  const avgRating = (feedbacks.reduce((a, b) => a + b.rating, 0) / (feedbacks.length || 1)).toFixed(1);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <MessageCircle className="text-sky-600" size={28} />
            Đánh Giá & Phản Hồi AI (Feedback AI)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Ghi nhận ý kiến khách hàng về độ chính xác của AI Chatbot, xử lý phản hồi tiêu cực và huấn luyện lại dữ liệu
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_ai_feedbacks");
              setFeedbacks(INITIAL_FEEDBACK);
              toast.success("Đã khôi phục dữ liệu chuẩn!");
            }}
            className="p-2.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            title="Làm mới"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition cursor-pointer"
          >
            <Plus size={18} />
            Thêm Feedback Mới
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Điểm Đánh Giá TB</div>
            <div className="text-2xl font-black text-amber-500 mt-1 flex items-center gap-1.5">
              {avgRating} <Star size={20} className="fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
            ⭐
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tỷ Lệ Hài Lòng (CSAT)</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {Math.round((positiveCount / (feedbacks.length || 1)) * 100)}%
            </div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
            <ThumbsUp size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đã Huấn Luyện Lại Prompt</div>
            <div className="text-2xl font-black text-indigo-600 mt-1">
              {feedbacks.filter(f => f.status === "retrained").length} câu hỏi
            </div>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
            <Sparkles size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cần Tối Ưu Thêm</div>
            <div className="text-2xl font-black text-rose-600 mt-1">
              {feedbacks.filter(f => f.rating <= 2).length} phản hồi
            </div>
          </div>
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center font-bold">
            <AlertTriangle size={24} />
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo câu hỏi, tên khách, nội dung..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-sky-500"
          >
            <option value="all">Tất cả số sao</option>
            <option value="5">5 sao ⭐⭐⭐⭐⭐</option>
            <option value="4">4 sao ⭐⭐⭐⭐</option>
            <option value="2">2 sao hoặc thấp hơn</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-sky-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="new">Mới nhận</option>
            <option value="reviewed">Đã kiểm duyệt</option>
            <option value="retrained">Đã huấn luyện lại</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-sky-300 transition">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-800 text-sm">{item.customerName}</span>
                <span className="text-xs text-slate-400 font-mono">{item.customerPhone}</span>
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < item.rating ? "fill-amber-400" : "text-slate-200 fill-slate-200"}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {item.status === "retrained" ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 flex items-center gap-1">
                    <Sparkles size={12} />
                    Đã nạp AI Retrain
                  </span>
                ) : item.status === "reviewed" ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    Đã xem
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">
                    Mới gửi
                  </span>
                )}
                <span className="text-slate-400">{item.createdAt}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-500 uppercase tracking-wide text-[10px] mb-1">Câu hỏi của khách:</div>
                <p className="text-slate-800 font-medium">"{item.userQuery}"</p>
              </div>
              <div className="bg-sky-50/60 p-3 rounded-xl border border-sky-100">
                <div className="font-bold text-sky-600 uppercase tracking-wide text-[10px] mb-1">AI Đã Trả Lời:</div>
                <p className="text-slate-700">{item.aiResponse}</p>
              </div>
            </div>

            <div className="bg-amber-50/40 p-3 rounded-xl border border-amber-100 text-xs mb-3">
              <span className="font-bold text-amber-800">💬 Nhận xét của khách: </span>
              <span className="text-slate-700 italic">"{item.comment}"</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              {item.status !== "retrained" && (
                <button
                  onClick={() => handleRetrainAI(item)}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                  title="Đưa vào Knowledge Base để chatbot học lại"
                >
                  <Sparkles size={14} />
                  Nạp Vào Huấn Luyện AI
                </button>
              )}
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                title="Xóa phản hồi"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Feedback */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-5 space-y-4 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-slate-800 text-lg">Ghi Nhận Phản Hồi AI Mới</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên Khách Hàng</label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Câu Hỏi Của Khách *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: 1+1 bằng mấy hoặc Tư vấn tour Đà Nẵng"
                  value={formData.userQuery}
                  onChange={(e) => setFormData({ ...formData, userQuery: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Câu Trả Lời Của AI</label>
                <textarea
                  rows={2}
                  value={formData.aiResponse}
                  onChange={(e) => setFormData({ ...formData, aiResponse: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số Sao (1 - 5)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 sao)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 sao)</option>
                    <option value={3}>⭐⭐⭐ (3 sao)</option>
                    <option value={2}>⭐⭐ (2 sao)</option>
                    <option value={1}>⭐ (1 sao)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Loại Phản Hồi</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="positive">Tích cực (Khen ngợi)</option>
                    <option value="negative">Cần cải thiện</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nội Dung Nhận Xét Cụ Thể *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ghi nhận đánh giá chi tiết..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 font-bold rounded-xl text-sm"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-sky-600 text-white font-bold rounded-xl text-sm"
                >
                  Lưu Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
