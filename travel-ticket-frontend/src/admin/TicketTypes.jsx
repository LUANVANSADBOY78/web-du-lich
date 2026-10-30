import { useState, useEffect } from "react";
import { 
  ListTree, Plus, Search, Edit3, Trash2, CheckCircle2, 
  XCircle, RefreshCw, X, Ticket
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_TYPES = [
  {
    id: 1,
    name: "Vé Người Lớn",
    code: "TKT-ADULT",
    description: "Áp dụng cho du khách cao từ 1m40 trở lên hoặc từ 12 tuổi trở lên.",
    discountPercent: 0,
    status: "active",
    count: 14
  },
  {
    id: 2,
    name: "Vé Trẻ Em",
    code: "TKT-CHILD",
    description: "Áp dụng cho trẻ em có chiều cao từ 1m00 đến dưới 1m40.",
    discountPercent: 25,
    status: "active",
    count: 12
  },
  {
    id: 3,
    name: "Vé Người Cao Tuổi",
    code: "TKT-SENIOR",
    description: "Áp dụng cho người Việt Nam từ 60 tuổi trở lên (xuất trình CCCD khi vào cổng).",
    discountPercent: 15,
    status: "active",
    count: 6
  },
  {
    id: 4,
    name: "Combo Vé + Buffet Ẩm Thực",
    code: "TKT-COMBO-BUFFET",
    description: "Bao gồm vé cáp treo/vào cổng + 01 suất ăn buffet ẩm thực Á - Âu tại nhà hàng.",
    discountPercent: 10,
    status: "active",
    count: 8
  },
  {
    id: 5,
    name: "Vé VIP Fast-Track (Lối Đi Ưu Tiên)",
    code: "TKT-VIP-FAST",
    description: "Lối đi riêng ưu tiên không phải xếp hàng chờ đợi tại ga cáp treo và các trò chơi cảm giác mạnh.",
    discountPercent: 0,
    status: "active",
    count: 4
  }
];

export default function TicketTypes() {
  const [types, setTypes] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_ticket_types");
    return saved ? JSON.parse(saved) : INITIAL_TYPES;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    discountPercent: 0,
    status: "active"
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_ticket_types", JSON.stringify(types));
  }, [types]);

  const handleOpenAdd = () => {
    setEditingType(null);
    setFormData({
      name: "",
      code: `TKT-CAT-${Math.floor(100 + Math.random() * 900)}`,
      description: "",
      discountPercent: 0,
      status: "active"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingType(t);
    setFormData({
      name: t.name,
      code: t.code,
      description: t.description,
      discountPercent: t.discountPercent,
      status: t.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Vui lòng nhập tên loại vé!");
      return;
    }

    if (editingType) {
      setTypes(types.map(t => t.id === editingType.id ? { ...t, ...formData } : t));
      toast.success("Cập nhật loại vé thành công!");
    } else {
      const newT = {
        id: Date.now(),
        ...formData,
        count: 0
      };
      setTypes([...types, newT]);
      toast.success("Thêm loại vé mới thành công!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa loại vé "${name}"?`)) {
      setTypes(types.filter(t => t.id !== id));
      toast.success("Đã xóa loại vé!");
    }
  };

  const filtered = types.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <ListTree className="text-sky-600" size={28} />
            Quản Lý Phân Loại Vé (Ticket Types)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Cấu hình các hạng vé: Vé Người lớn, Vé Trẻ em, Vé Người cao tuổi, Combo Buffet & FastPass
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_ticket_types");
              setTypes(INITIAL_TYPES);
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
            Thêm Loại Vé Mới
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc mã loại vé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition"
          />
        </div>
        <div className="text-xs font-bold text-slate-400">
          Tổng cộng: {types.length} danh mục loại vé
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(t => (
          <div key={t.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-sky-300 hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md">
                  {t.code}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {t.count} sản phẩm vé
                </span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">{t.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">{t.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                {t.discountPercent > 0 ? (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Ưu đãi -{t.discountPercent}%
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-slate-400">Giá chuẩn</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(t.id, t.name)}
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
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-5 space-y-4">
            <h3 className="font-bold text-slate-800 text-lg">
              {editingType ? "Chỉnh Sửa Loại Vé" : "Thêm Loại Vé Mới"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên Loại Vé *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Vé Học Sinh - Sinh Viên"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mã Code Phân Loại</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mô Tả & Điều Kiện Áp Dụng</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">% Giảm Giá Định Mức (Nếu có)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discountPercent}
                  onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
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
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
