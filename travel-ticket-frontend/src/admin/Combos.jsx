import { useState, useEffect } from "react";
import { 
  Layers, Plus, Search, Edit3, Trash2, CheckCircle2, 
  XCircle, RefreshCw, X, Tag, Hotel, Plane, Ticket
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_COMBOS = [
  {
    id: 1,
    name: "Combo Đà Nẵng: Vé Máy Bay Khứ Hồi + Khách Sạn 4 Sao Biển Mỹ Khê 3N2Đ",
    code: "COMBO-DN-4STAR",
    destination: "Đà Nẵng",
    originalPrice: 4200000,
    price: 3190000,
    includes: ["Vé máy bay khứ hồi Vietjet/VNA", "2 đêm khách sạn 4 sao gần biển", "Buffet sáng mỗi ngày", "Tặng vé Cầu Vàng Bà Nà Hills"],
    soldCount: 142,
    status: "active"
  },
  {
    id: 2,
    name: "Combo Phú Quốc Nghỉ Dưỡng: Resort 5 Sao + Vé VinWonders & Safari",
    code: "COMBO-PQ-5STAR",
    destination: "Phú Quốc",
    originalPrice: 6500000,
    price: 4890000,
    includes: ["3N2Đ Vinpearl Resort & Spa", "Vé không giới hạn VinWonders & Safari", "Đưa đón sân bay 2 chiều", "Miễn phí bữa sáng"],
    soldCount: 98,
    status: "active"
  },
  {
    id: 3,
    name: "Combo Sa Pa Săn Mây: Xe Limousine Khứ Hồi + Khách Sạn View Núi + Vé Cáp Treo Fansipan",
    code: "COMBO-SAPA-FANS",
    destination: "Sa Pa",
    originalPrice: 3200000,
    price: 2450000,
    includes: ["Xe Limousine Dcar 2 chiều Hà Nội - Sa Pa", "2N1Đ Hotel 4 sao trung tâm", "Vé cáp treo Fansipan Legend 2 chiều"],
    soldCount: 215,
    status: "active"
  }
];

export default function Combos() {
  const [combos, setCombos] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_combos");
    return saved ? JSON.parse(saved) : INITIAL_COMBOS;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCombo, setEditingCombo] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    destination: "Đà Nẵng",
    originalPrice: 3500000,
    price: 2800000,
    includes: "Vé máy bay khứ hồi, Khách sạn 4 sao, Ăn sáng buffet",
    status: "active"
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_combos", JSON.stringify(combos));
  }, [combos]);

  const handleOpenAdd = () => {
    setEditingCombo(null);
    setFormData({
      name: "",
      code: `COMBO-${Math.floor(100 + Math.random() * 900)}`,
      destination: "Đà Nẵng",
      originalPrice: 3500000,
      price: 2800000,
      includes: "Vé máy bay, Khách sạn 4 sao, Vé vui chơi",
      status: "active"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditingCombo(c);
    setFormData({
      name: c.name,
      code: c.code,
      destination: c.destination,
      originalPrice: c.originalPrice,
      price: c.price,
      includes: c.includes.join(", "),
      status: c.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      toast.error("Vui lòng nhập tên và giá combo!");
      return;
    }

    const includesArr = formData.includes.split(",").map(s => s.trim()).filter(Boolean);

    if (editingCombo) {
      setCombos(combos.map(c => c.id === editingCombo.id ? {
        ...c,
        ...formData,
        originalPrice: Number(formData.originalPrice),
        price: Number(formData.price),
        includes: includesArr
      } : c));
      toast.success("Cập nhật combo thành công!");
    } else {
      const newC = {
        id: Date.now(),
        ...formData,
        originalPrice: Number(formData.originalPrice),
        price: Number(formData.price),
        includes: includesArr,
        soldCount: 0
      };
      setCombos([newC, ...combos]);
      toast.success("Thêm gói combo du lịch mới thành công!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa combo "${name}"?`)) {
      setCombos(combos.filter(c => c.id !== id));
      toast.success("Đã xóa combo!");
    }
  };

  const filtered = combos.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <Layers className="text-sky-600" size={28} />
            Quản Lý Combo Du Lịch (Gói Vé + Khách Sạn)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Kết hợp vé máy bay, khách sạn và vé vui chơi thành gói trọn gói tiết kiệm cho du khách
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_combos");
              setCombos(INITIAL_COMBOS);
              toast.success("Đã khôi phục dữ liệu combo chuẩn!");
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
            Tạo Combo Mới
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên combo, địa điểm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition"
          />
        </div>
        <div className="text-xs font-bold text-slate-400">
          Tổng cộng: {combos.length} gói combo
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(c => (
          <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-sky-300 hover:shadow-md transition p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
                  {c.code}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Đã bán {c.soldCount} gói
                </span>
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-2 leading-snug">{c.name}</h3>
              <div className="text-xs text-slate-500 mb-3 font-semibold">📍 Điểm đến: {c.destination}</div>

              <div className="space-y-1.5 mb-4 bg-slate-50 p-3 rounded-xl">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bao gồm:</div>
                {c.includes.map((inc, i) => (
                  <div key={i} className="text-xs text-slate-700 flex items-center gap-1.5">
                    <span className="text-emerald-500">✓</span> {inc}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-black text-sky-600 text-lg">
                  {c.price?.toLocaleString()} đ
                </div>
                {c.originalPrice > c.price && (
                  <div className="text-xs text-slate-400 line-through">
                    {c.originalPrice?.toLocaleString()} đ
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(c)}
                  className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(c.id, c.name)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-5 space-y-4 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-slate-800 text-lg">
              {editingCombo ? "Sửa Gói Combo" : "Tạo Gói Combo Du Lịch Mới"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên Combo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Combo Đà Nẵng 3N2Đ Vé Bay + Khách Sạn"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Điểm Đến</label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mã Combo</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Giá Bán (VNĐ) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-sky-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Giá Gốc (VNĐ)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Các Dịch Vụ Bao Gồm (phân cách bởi dấu phẩy)</label>
                <textarea
                  rows={2}
                  value={formData.includes}
                  onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
                  placeholder="Vé máy bay khứ hồi, Khách sạn 4 sao, Ăn sáng buffet"
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
                  Lưu Combo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
