import { useState, useEffect } from "react";
import { 
  Map, Plus, Search, Eye, Edit3, Trash2, Star, 
  Calendar, DollarSign, Sparkles, Download, CheckCircle2, 
  X, RefreshCw, Compass, MapPin, Users
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_TRIP_PLANS = [
  {
    id: 1,
    title: "Khám Phá Đà Nẵng - Hội An Lãng Mạn 4N3Đ",
    destination: "Đà Nẵng - Hội An",
    days: 4,
    budget: "5.000.000đ - 7.000.000đ",
    travelers: "Cặp đôi (2 người)",
    style: "Nghỉ dưỡng & Check-in",
    highlightSpots: ["Cầu Vàng Bà Nà", "Phố Cổ Hội An", "Bán Đảo Sơn Trà", "Chợ Đêm Helio"],
    views: 1420,
    generatedBy: "AI Assistant (Khách: tuan.nguyen)",
    isFeatured: true,
    createdAt: "29/10/2026"
  },
  {
    id: 2,
    title: "Phú Quốc Thiên Đường Biển Đảo 3N2Đ Siêu Tiết Kiệm",
    destination: "Phú Quốc",
    days: 3,
    budget: "3.500.000đ - 4.500.000đ",
    travelers: "Nhóm bạn (4 người)",
    style: "Trải nghiệm & Khám phá",
    highlightSpots: ["Cano 4 Đảo", "Sunset Sanato", "Cáp Treo Hòn Thơm", "Chợ Đêm Phú Quốc"],
    views: 980,
    generatedBy: "AI Assistant (Khách: hoang.mai)",
    isFeatured: true,
    createdAt: "28/10/2026"
  },
  {
    id: 3,
    title: "Chinh Phục Tây Bắc: Sapa - Fansipan Săn Mây 3N2Đ",
    destination: "Sa Pa - Lào Cai",
    days: 3,
    budget: "4.000.000đ - 5.500.000đ",
    travelers: "Gia đình (3 người)",
    style: "Thiên nhiên & Văn hóa",
    highlightSpots: ["Đỉnh Fansipan", "Bản Cát Cát", "Đèo Ô Quy Hồ", "Thung Lũng Mường Hoa"],
    views: 650,
    generatedBy: "AI Assistant (Khách: lan.anh)",
    isFeatured: false,
    createdAt: "27/10/2026"
  },
  {
    id: 4,
    title: "Hàn Quốc Mùa Thu Lá Đỏ: Seoul - Nami - Everland 5N4Đ",
    destination: "Hàn Quốc (Seoul)",
    days: 5,
    budget: "15.000.000đ - 18.000.000đ",
    travelers: "Cặp đôi (2 người)",
    style: "Chụp ảnh & Mua sắm",
    highlightSpots: ["Đảo Nami", "Cung Điện Gyeongbokgung", "Công Viên Everland", "Tháp N Seoul"],
    views: 2150,
    generatedBy: "AI Assistant (Khách: quoc.bao)",
    isFeatured: true,
    createdAt: "26/10/2026"
  }
];

export default function AITripPlannerAdmin() {
  const [plans, setPlans] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_ai_plans");
    return saved ? JSON.parse(saved) : INITIAL_TRIP_PLANS;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStyle, setFilterStyle] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingPlan, setViewingPlan] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    days: 3,
    budget: "4.000.000đ - 6.000.000đ",
    travelers: "Gia đình",
    style: "Nghỉ dưỡng & Check-in",
    highlightSpots: "Cầu Vàng, Phố Cổ, Biển Mỹ Khê",
    isFeatured: true
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_ai_plans", JSON.stringify(plans));
  }, [plans]);

  const handleOpenAdd = () => {
    setEditingPlan(null);
    setFormData({
      title: "",
      destination: "",
      days: 3,
      budget: "4.000.000đ - 6.000.000đ",
      travelers: "Gia đình",
      style: "Nghỉ dưỡng & Check-in",
      highlightSpots: "Bà Nà Hills, Phố Cổ Hội An",
      isFeatured: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      title: plan.title,
      destination: plan.destination,
      days: plan.days,
      budget: plan.budget,
      travelers: plan.travelers,
      style: plan.style,
      highlightSpots: plan.highlightSpots.join(", "),
      isFeatured: plan.isFeatured
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.destination) {
      toast.error("Vui lòng điền tiêu đề và điểm đến!");
      return;
    }

    const spotsArray = formData.highlightSpots.split(",").map(s => s.trim()).filter(Boolean);

    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? {
        ...p,
        ...formData,
        days: Number(formData.days),
        highlightSpots: spotsArray
      } : p));
      toast.success("Cập nhật lịch trình AI thành công!");
    } else {
      const newPlan = {
        id: Date.now(),
        ...formData,
        days: Number(formData.days),
        highlightSpots: spotsArray,
        views: 1,
        generatedBy: "Admin Quản Trị",
        createdAt: new Date().toLocaleDateString("vi-VN")
      };
      setPlans([newPlan, ...plans]);
      toast.success("Tạo lịch trình AI mẫu thành công!");
    }
    setIsModalOpen(false);
  };

  const handleToggleFeatured = (id) => {
    setPlans(plans.map(p => {
      if (p.id === id) {
        const next = !p.isFeatured;
        toast.success(next ? "Đã ghim lịch trình lên Nổi Bật!" : "Đã bỏ ghim lịch trình");
        return { ...p, isFeatured: next };
      }
      return p;
    }));
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Bạn có chắc muốn xóa lịch trình "${title}"?`)) {
      setPlans(plans.filter(p => p.id !== id));
      toast.success("Đã xóa lịch trình AI!");
    }
  };

  const filtered = plans.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStyle = filterStyle === "all" || p.style === filterStyle;
    return matchSearch && matchStyle;
  });

  const totalViews = plans.reduce((a, b) => a + (b.views || 0), 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <Sparkles className="text-indigo-600" size={28} />
            Quản Trị AI Trip Planner
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Quản lý các kế hoạch du lịch do AI tự động lập trình cho khách hàng và điều chỉnh mẫu gợi ý
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_ai_plans");
              setPlans(INITIAL_TRIP_PLANS);
              toast.success("Đã khôi phục dữ liệu mẫu!");
            }}
            className="p-2.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            title="Làm mới"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition cursor-pointer"
          >
            <Plus size={18} />
            Tạo Lịch Trình AI Mẫu
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng Lịch Trình AI</div>
            <div className="text-2xl font-black text-slate-800 mt-1">{plans.length} chuyến đi</div>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
            <Compass size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đang Ghim Nổi Bật</div>
            <div className="text-2xl font-black text-amber-500 mt-1">
              {plans.filter(p => p.isFeatured).length} lịch trình
            </div>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
            <Star size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lượt Khách Tham Khảo</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">{totalViews.toLocaleString()} lượt</div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
            <Eye size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Độ Hài Lòng AI Plan</div>
            <div className="text-2xl font-black text-blue-600 mt-1">98.2%</div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
            ⭐
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tiêu đề, địa điểm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={filterStyle}
            onChange={(e) => setFilterStyle(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Tất cả phong cách</option>
            <option value="Nghỉ dưỡng & Check-in">Nghỉ dưỡng & Check-in</option>
            <option value="Trải nghiệm & Khám phá">Trải nghiệm & Khám phá</option>
            <option value="Thiên nhiên & Văn hóa">Thiên nhiên & Văn hóa</option>
            <option value="Chụp ảnh & Mua sắm">Chụp ảnh & Mua sắm</option>
          </select>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(plan => (
          <div key={plan.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-300 hover:shadow-md transition p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-lg flex items-center gap-1">
                    <MapPin size={12} />
                    {plan.destination}
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg flex items-center gap-1">
                    <Calendar size={12} />
                    {plan.days} Ngày {plan.days - 1} Đêm
                  </span>
                </div>
                <button
                  onClick={() => handleToggleFeatured(plan.id)}
                  className={`p-1.5 rounded-lg transition ${plan.isFeatured ? "text-amber-500 bg-amber-50" : "text-slate-300 hover:text-amber-500"}`}
                  title="Ghim nổi bật"
                >
                  <Star size={18} className={plan.isFeatured ? "fill-amber-500" : ""} />
                </button>
              </div>

              <h3 className="font-bold text-slate-800 text-base mb-2 leading-snug">{plan.title}</h3>

              <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl">
                <div className="flex justify-between">
                  <span className="text-slate-400">Ngân sách dự kiến:</span>
                  <span className="font-bold text-emerald-600">{plan.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Đối tượng:</span>
                  <span className="font-medium text-slate-700">{plan.travelers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phong cách:</span>
                  <span className="font-medium text-indigo-600">{plan.style}</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Địa Điểm Điểm Nhấn:</div>
                <div className="flex flex-wrap gap-1.5">
                  {plan.highlightSpots.map((spot, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-md">
                      📍 {spot}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                👁️ {plan.views} lượt xem • {plan.createdAt}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setViewingPlan(plan)}
                  className="px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Eye size={14} />
                  Xem Chi Tiết
                </button>
                <button
                  onClick={() => handleOpenEdit(plan)}
                  className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(plan.id, plan.title)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg p-5 space-y-4 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <Sparkles className="text-indigo-600" size={20} />
              {editingPlan ? "Chỉnh Sửa Lịch Trình AI" : "Tạo Lịch Trình AI Mẫu Mới"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tiêu Đề Lịch Trình *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Du Lịch Đà Nẵng 4N3Đ Cùng Người Thương"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Điểm Đến *</label>
                  <input
                    type="text"
                    required
                    placeholder="Đà Nẵng, Phú Quốc..."
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số Ngày Đi</label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={formData.days}
                    onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ngân Sách Dự Kiến</label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Đối Tượng Phù Hợp</label>
                  <input
                    type="text"
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phong Cách Chuyến Đi</label>
                <select
                  value={formData.style}
                  onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                >
                  <option value="Nghỉ dưỡng & Check-in">Nghỉ dưỡng & Check-in</option>
                  <option value="Trải nghiệm & Khám phá">Trải nghiệm & Khám phá</option>
                  <option value="Thiên nhiên & Văn hóa">Thiên nhiên & Văn hóa</option>
                  <option value="Chụp ảnh & Mua sắm">Chụp ảnh & Mua sắm</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Các Điểm Check-in Nổi Bật (Phân cách bởi dấu phẩy)</label>
                <input
                  type="text"
                  placeholder="Bà Nà Hills, Cầu Vàng, Phố Cổ Hội An..."
                  value={formData.highlightSpots}
                  onChange={(e) => setFormData({ ...formData, highlightSpots: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-bold rounded-xl text-sm"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  {editingPlan ? "Lưu Thay Đổi" : "Tạo Lịch Trình"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal View Detail */}
      {viewingPlan && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-in zoom-in-95 duration-200 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg">
                  Lịch Trình AI Lên Sẵn
                </span>
                <h3 className="font-bold text-slate-800 text-lg mt-2">{viewingPlan.title}</h3>
                <p className="text-xs text-slate-500">{viewingPlan.destination} • {viewingPlan.days} Ngày</p>
              </div>
              <button onClick={() => setViewingPlan(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 py-2 border-y border-slate-100 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Dự trù kinh phí:</span>
                <span className="font-bold text-emerald-600">{viewingPlan.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Đối tượng du lịch:</span>
                <span className="font-medium text-slate-800">{viewingPlan.travelers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phong cách:</span>
                <span className="font-medium text-indigo-600">{viewingPlan.style}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Điểm đến đã lên lịch chi tiết:</span>
                <div className="flex flex-wrap gap-1.5">
                  {viewingPlan.highlightSpots.map((spot, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg font-medium">
                      🎯 {spot}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => toast.success("Đã xuất lịch trình PDF cho khách!")}
                className="flex-1 py-2.5 bg-indigo-50 text-indigo-600 font-bold text-xs rounded-xl hover:bg-indigo-100 transition flex items-center justify-center gap-1.5"
              >
                <Download size={15} />
                Tải Bản Lịch Trình PDF
              </button>
              <button
                onClick={() => setViewingPlan(null)}
                className="py-2.5 px-6 bg-slate-800 text-white font-bold text-xs rounded-xl hover:bg-slate-900 transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
