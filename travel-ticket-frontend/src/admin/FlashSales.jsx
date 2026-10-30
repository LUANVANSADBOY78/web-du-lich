import { useState, useEffect } from "react";
import { 
  Zap, Plus, Search, Edit3, Trash2, Clock, 
  CheckCircle2, XCircle, RefreshCw, X, Flame, Tag, Calendar
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_FLASH_SALES = [
  {
    id: 1,
    name: "Giờ Vàng Mùa Thu: Săn Tour Đông Bắc Á Giảm 35%",
    code: "FS-AUTUMN-01",
    appliedType: "Tour Du Lịch",
    targetItem: "Tour Hàn Quốc 5N4Đ & Tour Nhật Bản 6N5Đ",
    discountPercent: 35,
    originalPrice: 15890000,
    salePrice: 10328500,
    totalSlots: 50,
    soldSlots: 42,
    startDate: "30/10/2026 00:00",
    endDate: "31/10/2026 23:59",
    status: "active" // active, upcoming, expired
  },
  {
    id: 2,
    name: "Flash Sale 11.11: Vé Cáp Treo Bà Nà Hills Mua 1 Tặng 1 Buffet",
    code: "FS-BANA-1111",
    appliedType: "Vé Vui Chơi",
    targetItem: "Vé Cáp Treo Bà Nà Hills",
    discountPercent: 25,
    originalPrice: 990000,
    salePrice: 742500,
    totalSlots: 200,
    soldSlots: 185,
    startDate: "28/10/2026 08:00",
    endDate: "02/11/2026 23:59",
    status: "active"
  },
  {
    id: 3,
    name: "Cuối Tuần Rực Rỡ: Tour Phú Quốc Cano 4 Đảo",
    code: "FS-PQ-WEEKEND",
    appliedType: "Tour Du Lịch",
    targetItem: "Tour Phú Quốc 3N2Đ",
    discountPercent: 30,
    originalPrice: 3890000,
    salePrice: 2723000,
    totalSlots: 30,
    soldSlots: 30,
    startDate: "25/10/2026 00:00",
    endDate: "28/10/2026 23:59",
    status: "expired"
  },
  {
    id: 4,
    name: "Siêu Sale Black Friday 2026: Trọn Gói Vé Sun World & VinWonders",
    code: "FS-BLACK-FRIDAY",
    appliedType: "Vé Vui Chơi",
    targetItem: "Tất cả các sản phẩm vé toàn quốc",
    discountPercent: 40,
    originalPrice: 850000,
    salePrice: 510000,
    totalSlots: 500,
    soldSlots: 0,
    startDate: "20/11/2026 00:00",
    endDate: "27/11/2026 23:59",
    status: "upcoming"
  }
];

export default function FlashSales() {
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_flash_sales");
    return saved ? JSON.parse(saved) : INITIAL_FLASH_SALES;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    appliedType: "Tour Du Lịch",
    targetItem: "",
    discountPercent: 20,
    originalPrice: 1000000,
    totalSlots: 50,
    startDate: "30/10/2026 00:00",
    endDate: "05/11/2026 23:59",
    status: "active"
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_flash_sales", JSON.stringify(sales));
  }, [sales]);

  const handleOpenAdd = () => {
    setEditingSale(null);
    setFormData({
      name: "",
      code: `FS-${Math.floor(1000 + Math.random() * 9000)}`,
      appliedType: "Tour Du Lịch",
      targetItem: "Tour Đà Nẵng - Hội An 4N3Đ",
      discountPercent: 25,
      originalPrice: 4990000,
      totalSlots: 30,
      startDate: "30/10/2026 00:00",
      endDate: "05/11/2026 23:59",
      status: "active"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingSale(item);
    setFormData({
      name: item.name,
      code: item.code,
      appliedType: item.appliedType,
      targetItem: item.targetItem,
      discountPercent: item.discountPercent,
      originalPrice: item.originalPrice,
      totalSlots: item.totalSlots,
      startDate: item.startDate,
      endDate: item.endDate,
      status: item.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.targetItem) {
      toast.error("Vui lòng điền đủ tên chiến dịch và sản phẩm áp dụng!");
      return;
    }

    const orig = Number(formData.originalPrice);
    const disc = Number(formData.discountPercent);
    const saleP = Math.round(orig * (1 - disc / 100));

    if (editingSale) {
      setSales(sales.map(s => s.id === editingSale.id ? {
        ...s,
        ...formData,
        originalPrice: orig,
        discountPercent: disc,
        salePrice: saleP,
        totalSlots: Number(formData.totalSlots)
      } : s));
      toast.success("Cập nhật chiến dịch Flash Sale thành công!");
    } else {
      const newSale = {
        id: Date.now(),
        ...formData,
        originalPrice: orig,
        discountPercent: disc,
        salePrice: saleP,
        totalSlots: Number(formData.totalSlots),
        soldSlots: 0
      };
      setSales([newSale, ...sales]);
      toast.success("Tạo chiến dịch Flash Sale thành công!");
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id) => {
    setSales(sales.map(s => {
      if (s.id === id) {
        const next = s.status === "active" ? "expired" : "active";
        toast.success(`Đã đổi trạng thái chiến dịch sang: ${next === "active" ? "Đang diễn ra" : "Tạm dừng"}`);
        return { ...s, status: next };
      }
      return s;
    }));
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa chiến dịch "${name}"?`)) {
      setSales(sales.filter(s => s.id !== id));
      toast.success("Đã xóa chiến dịch!");
    }
  };

  const filtered = sales.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.targetItem.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const activeCount = sales.filter(s => s.status === "active").length;
  const totalSlotsAll = sales.reduce((a, b) => a + b.totalSlots, 0);
  const totalSoldAll = sales.reduce((a, b) => a + (b.soldSlots || 0), 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <Zap className="text-amber-500 fill-amber-500" size={28} />
            Quản Lý Chiến Dịch Flash Sale Giờ Vàng
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Thiết lập các chương trình siêu giảm giá có thời gian đếm ngược và giới hạn số suất mua
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_flash_sales");
              setSales(INITIAL_FLASH_SALES);
              toast.success("Đã khôi phục dữ liệu Flash Sale chuẩn!");
            }}
            className="p-2.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            title="Khôi phục"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition cursor-pointer"
          >
            <Plus size={18} />
            Tạo Flash Sale Mới
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đang Diễn Ra (Live)</div>
            <div className="text-2xl font-black text-amber-500 mt-1 flex items-center gap-1.5">
              {activeCount} chiến dịch <Flame size={20} className="fill-amber-500" />
            </div>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
            <Zap size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Số Suất Mở Bán</div>
            <div className="text-2xl font-black text-slate-800 mt-1">{totalSlotsAll} suất</div>
          </div>
          <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center font-bold">
            <Tag size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Số Suất Đã Săn Thành Công</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">{totalSoldAll} suất</div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tỷ Lệ Cháy Hàng</div>
            <div className="text-2xl font-black text-rose-600 mt-1">
              {Math.round((totalSoldAll / (totalSlotsAll || 1)) * 100)}%
            </div>
          </div>
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center font-bold">
            🔥
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên chiến dịch, mã code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-amber-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang diễn ra (Active)</option>
            <option value="upcoming">Sắp diễn ra</option>
            <option value="expired">Đã kết thúc</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Mã Code</th>
                <th className="p-4">Tên Chiến Dịch Flash Sale</th>
                <th className="p-4">Sản Phẩm Áp Dụng</th>
                <th className="p-4">Mức Giảm</th>
                <th className="p-4">Giá Flash Sale</th>
                <th className="p-4">Tiến Độ Cháy Hàng</th>
                <th className="p-4">Thời Gian Đếm Ngược</th>
                <th className="p-4">Trạng Thái</th>
                <th className="p-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map(item => {
                const percent = Math.min(100, Math.round(((item.soldSlots || 0) / item.totalSlots) * 100));
                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4 font-mono font-bold text-xs text-amber-700">
                      {item.code}
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="font-bold text-slate-800 line-clamp-1">{item.name}</div>
                      <span className="inline-block mt-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {item.appliedType}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-medium text-slate-700 max-w-xs truncate">
                      {item.targetItem}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-rose-50 text-rose-600 font-black text-xs rounded-lg border border-rose-200">
                        -{item.discountPercent}%
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-black text-slate-800 text-base">
                        {item.salePrice?.toLocaleString()} đ
                      </div>
                      <div className="text-xs text-slate-400 line-through">
                        {item.originalPrice?.toLocaleString()} đ
                      </div>
                    </td>
                    <td className="p-4 min-w-[140px]">
                      <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                        <span>{item.soldSlots || 0} đã bán</span>
                        <span className="text-slate-400">/{item.totalSlots}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${percent >= 100 ? "bg-rose-500" : percent > 70 ? "bg-amber-500" : "bg-emerald-500"}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </td>
                    <td className="p-4 text-xs text-slate-500">
                      <div>Từ: {item.startDate}</div>
                      <div>Đến: {item.endDate}</div>
                    </td>
                    <td className="p-4">
                      {item.status === "active" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <Flame size={12} className="fill-amber-500" />
                          Đang diễn ra
                        </span>
                      ) : item.status === "upcoming" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          <Clock size={12} />
                          Sắp mở bán
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500">
                          Đã kết thúc
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleToggleStatus(item.id)}
                          className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                          title="Bật/Tắt Flash Sale"
                        >
                          <Zap size={16} />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
                          title="Chỉnh sửa"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg p-5 space-y-4 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <Zap className="text-amber-500 fill-amber-500" size={20} />
              {editingSale ? "Sửa Chiến Dịch Flash Sale" : "Tạo Chiến Dịch Flash Sale Mới"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên Chiến Dịch Flash Sale *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Giờ Vàng Săn Tour Đà Nẵng 50%"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mã Flash Sale Code</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Áp Dụng Cho</label>
                  <select
                    value={formData.appliedType}
                    onChange={(e) => setFormData({ ...formData, appliedType: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Tour Du Lịch">Tour Du Lịch</option>
                    <option value="Vé Vui Chơi">Vé Vui Chơi</option>
                    <option value="Khách Sạn">Khách Sạn</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sản Phẩm Cụ Thể Áp Dụng *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Tour Phú Quốc Cano 4 Đảo hoặc Vé Bà Nà Hills"
                  value={formData.targetItem}
                  onChange={(e) => setFormData({ ...formData, targetItem: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">% Giảm Giá</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={formData.discountPercent}
                    onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Giá Gốc (VNĐ)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số Suất Mở Bán</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.totalSlots}
                    onChange={(e) => setFormData({ ...formData, totalSlots: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Bắt Đầu</label>
                  <input
                    type="text"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kết Thúc</label>
                  <input
                    type="text"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-bold rounded-xl text-sm"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  {editingSale ? "Lưu Chiến Dịch" : "Kích Hoạt Flash Sale"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
