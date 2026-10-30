import { useState, useEffect } from "react";
import { 
  Archive, Plus, Search, Edit3, Trash2, AlertTriangle, 
  CheckCircle2, XCircle, RefreshCw, X, TrendingUp, Layers, Users, Calendar
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_TOUR_INVENTORY = [
  {
    id: 1,
    tourName: "Tour Đà Nẵng - Hội An - Bà Nà Hills 4N3Đ",
    departureDate: "15/10/2026",
    totalSlots: 30,
    bookedSlots: 22,
    heldSlots: 3,
    remainingSlots: 5,
    status: "available", // available, low, full
    guideName: "Trần Anh Tuấn"
  },
  {
    id: 2,
    tourName: "Tour Phú Quốc Cano 4 Đảo 3N2Đ",
    departureDate: "18/10/2026",
    totalSlots: 20,
    bookedSlots: 20,
    heldSlots: 0,
    remainingSlots: 0,
    status: "full",
    guideName: "Lê Minh Trí"
  },
  {
    id: 3,
    tourName: "Tour Hàn Quốc 5N4Đ: Seoul - Nami - Everland",
    departureDate: "20/10/2026",
    totalSlots: 25,
    bookedSlots: 19,
    heldSlots: 4,
    remainingSlots: 2,
    status: "low",
    guideName: "Hoàng Gia Bảo"
  },
  {
    id: 4,
    tourName: "Tour Nhật Bản 6N5Đ Cung Đường Vàng",
    departureDate: "25/10/2026",
    totalSlots: 24,
    bookedSlots: 15,
    heldSlots: 2,
    remainingSlots: 7,
    status: "available",
    guideName: "Vũ Phương Linh"
  }
];

export default function TourInventory() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_tour_inventory");
    return saved ? JSON.parse(saved) : INITIAL_TOUR_INVENTORY;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    tourName: "",
    departureDate: "15/11/2026",
    totalSlots: 30,
    bookedSlots: 0,
    heldSlots: 0,
    guideName: "Trần Anh Tuấn"
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_tour_inventory", JSON.stringify(items));
  }, [items]);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      tourName: "",
      departureDate: "15/11/2026",
      totalSlots: 30,
      bookedSlots: 0,
      heldSlots: 0,
      guideName: "Trần Anh Tuấn"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      tourName: item.tourName,
      departureDate: item.departureDate,
      totalSlots: item.totalSlots,
      bookedSlots: item.bookedSlots,
      heldSlots: item.heldSlots,
      guideName: item.guideName
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tourName) {
      toast.error("Vui lòng điền tên tour!");
      return;
    }

    const total = Number(formData.totalSlots);
    const booked = Number(formData.bookedSlots);
    const held = Number(formData.heldSlots);
    const rem = Math.max(0, total - booked - held);
    let st = "available";
    if (rem === 0) st = "full";
    else if (rem <= 5) st = "low";

    if (editingItem) {
      setItems(items.map(i => i.id === editingItem.id ? {
        ...i,
        ...formData,
        totalSlots: total,
        bookedSlots: booked,
        heldSlots: held,
        remainingSlots: rem,
        status: st
      } : i));
      toast.success("Cập nhật kho chỗ thành công!");
    } else {
      const newItem = {
        id: Date.now(),
        ...formData,
        totalSlots: total,
        bookedSlots: booked,
        heldSlots: held,
        remainingSlots: rem,
        status: st
      };
      setItems([newItem, ...items]);
      toast.success("Thêm kho chỗ khởi hành thành công!");
    }
    setIsModalOpen(false);
  };

  const handleQuickAddSlot = (id, delta) => {
    setItems(items.map(i => {
      if (i.id === id) {
        const newTotal = Math.max(i.bookedSlots + i.heldSlots, i.totalSlots + delta);
        const rem = newTotal - i.bookedSlots - i.heldSlots;
        let st = "available";
        if (rem === 0) st = "full";
        else if (rem <= 5) st = "low";
        toast.success(`Đã cập nhật tổng chỗ: ${newTotal}`);
        return {
          ...i,
          totalSlots: newTotal,
          remainingSlots: rem,
          status: st
        };
      }
      return i;
    }));
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa kho chỗ cho tour ${name}?`)) {
      setItems(items.filter(i => i.id !== id));
      toast.success("Đã xóa!");
    }
  };

  const filtered = items.filter(i => {
    const matchSearch = i.tourName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        i.guideName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "all" || i.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalSlotsAll = items.reduce((a, b) => a + b.totalSlots, 0);
  const totalBookedAll = items.reduce((a, b) => a + b.bookedSlots, 0);
  const totalRemAll = items.reduce((a, b) => a + b.remainingSlots, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <Archive className="text-sky-600" size={28} />
            Quản Lý Kho Chỗ Tour (Seat Inventory)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Điều phối quota số chỗ ngồi trên xe/máy bay theo từng lịch khởi hành tour
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_tour_inventory");
              setItems(INITIAL_TOUR_INVENTORY);
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
            Mở Thêm Kho Chỗ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng Chỗ Phân Bổ</div>
            <div className="text-2xl font-black text-slate-800 mt-1">{totalSlotsAll} ghế</div>
          </div>
          <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center font-bold">
            <Users size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chỗ Đã Bán</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">{totalBookedAll} ghế</div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chỗ Còn Trống</div>
            <div className="text-2xl font-black text-amber-600 mt-1">{totalRemAll} ghế</div>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
            <AlertTriangle size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên tour, HDV..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-sky-500"
          >
            <option value="all">Tất cả tình trạng</option>
            <option value="available">Còn nhiều chỗ</option>
            <option value="low">Sắp hết chỗ</option>
            <option value="full">Đã kín chỗ</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Tên Tour Du Lịch</th>
                <th className="p-4">Khởi Hành</th>
                <th className="p-4">HDV Phụ Trách</th>
                <th className="p-4">Tổng Quota</th>
                <th className="p-4">Đã Đặt</th>
                <th className="p-4">Đang Giữ</th>
                <th className="p-4">Còn Trống</th>
                <th className="p-4">Tình Trạng</th>
                <th className="p-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="p-4 font-bold text-slate-800">{item.tourName}</td>
                  <td className="p-4 text-xs font-semibold text-sky-700">{item.departureDate}</td>
                  <td className="p-4 text-xs font-medium text-slate-600">{item.guideName}</td>
                  <td className="p-4 font-bold text-slate-800">{item.totalSlots} chỗ</td>
                  <td className="p-4 font-bold text-emerald-600">{item.bookedSlots} chỗ</td>
                  <td className="p-4 text-xs font-bold text-amber-600">{item.heldSlots} chỗ</td>
                  <td className="p-4 font-black text-base text-slate-800">{item.remainingSlots} chỗ</td>
                  <td className="p-4">
                    {item.status === "available" ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">Còn chỗ</span>
                    ) : item.status === "low" ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600">Sắp hết ({item.remainingSlots})</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600">Hết chỗ</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleQuickAddSlot(item.id, 5)}
                        className="px-2 py-1 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-md text-xs font-bold transition cursor-pointer"
                        title="Tăng thêm 5 chỗ"
                      >
                        +5 chỗ
                      </button>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.tourName)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-5 space-y-4">
            <h3 className="font-bold text-slate-800 text-lg">
              {editingItem ? "Sửa Quota Kho Chỗ" : "Mở Thêm Kho Chỗ Tour"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên Tour *</label>
                <input
                  type="text"
                  required
                  value={formData.tourName}
                  onChange={(e) => setFormData({ ...formData, tourName: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ngày Khởi Hành</label>
                  <input
                    type="text"
                    value={formData.departureDate}
                    onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tổng Số Chỗ</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.totalSlots}
                    onChange={(e) => setFormData({ ...formData, totalSlots: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Hướng Dẫn Viên</label>
                <input
                  type="text"
                  value={formData.guideName}
                  onChange={(e) => setFormData({ ...formData, guideName: e.target.value })}
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
