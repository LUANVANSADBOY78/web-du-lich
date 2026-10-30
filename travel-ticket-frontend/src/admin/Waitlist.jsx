import { useState, useEffect } from "react";
import { 
  Clock, Plus, Search, CheckCircle2, BellRing, UserCheck, 
  Trash2, RefreshCw, X, AlertCircle, ArrowRight, Star
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_WAITLIST = [
  {
    id: 1,
    code: "WL-2026-091",
    customerName: "Nguyễn Hải Đăng",
    customerPhone: "0908123987",
    customerEmail: "haidang@gmail.com",
    tourName: "Tour Hàn Quốc 5N4Đ: Seoul - Nami - Everland",
    desiredDate: "20/10/2026",
    passengers: 2,
    priority: "VIP", // VIP, Normal
    status: "waiting", // waiting, notified, booked, cancelled
    notes: "Khách kỷ niệm ngày cưới, sẵn sàng thanh toán ngay khi có khách hủy chỗ.",
    createdAt: "29/10/2026 15:20"
  },
  {
    id: 2,
    code: "WL-2026-090",
    customerName: "Vũ Phương Linh",
    customerPhone: "0981122334",
    customerEmail: "phuonglinh.vu@gmail.com",
    tourName: "Tour Phú Quốc Cano 4 Đảo 3N2Đ",
    desiredDate: "18/10/2026",
    passengers: 4,
    priority: "Normal",
    status: "notified",
    notes: "Nhóm bạn thân 4 người, cần phòng gia đình.",
    createdAt: "28/10/2026 11:00"
  },
  {
    id: 3,
    code: "WL-2026-089",
    customerName: "Lê Minh Trí",
    customerPhone: "0934567812",
    customerEmail: "minhtri.le@outlook.com",
    tourName: "Tour Nhật Bản 6N5Đ Cung Đường Vàng Mùa Thu",
    desiredDate: "15/11/2026",
    passengers: 2,
    priority: "VIP",
    status: "booked",
    notes: "Đã có chỗ trống từ khách hủy, đã thanh toán thành công chuyển sang Booking.",
    createdAt: "27/10/2026 09:30"
  },
  {
    id: 4,
    code: "WL-2026-088",
    customerName: "Trịnh Tuyết Mai",
    customerPhone: "0912983746",
    customerEmail: "tuyetmai@gmail.com",
    tourName: "Vé Cáp Treo Fansipan Legend Sa Pa",
    desiredDate: "30/10/2026",
    passengers: 5,
    priority: "Normal",
    status: "waiting",
    notes: "Đoàn công ty cần 5 vé combo buffet.",
    createdAt: "26/10/2026 17:40"
  }
];

export default function Waitlist() {
  const [waitlist, setWaitlist] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_waitlist");
    return saved ? JSON.parse(saved) : INITIAL_WAITLIST;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    tourName: "",
    desiredDate: "15/11/2026",
    passengers: 2,
    priority: "Normal",
    notes: ""
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_waitlist", JSON.stringify(waitlist));
  }, [waitlist]);

  const handleOpenAdd = () => {
    setFormData({
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      tourName: "",
      desiredDate: "15/11/2026",
      passengers: 2,
      priority: "Normal",
      notes: ""
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.tourName) {
      toast.error("Vui lòng điền đủ tên khách và tour mong muốn!");
      return;
    }

    const now = new Date();
    const newWl = {
      id: Date.now(),
      code: `WL-2026-${Math.floor(100 + Math.random() * 900)}`,
      ...formData,
      passengers: Number(formData.passengers) || 1,
      status: "waiting",
      createdAt: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    };

    setWaitlist([newWl, ...waitlist]);
    toast.success("Thêm khách vào danh sách chờ thành công!");
    setIsModalOpen(false);
  };

  const handleNotifyCustomer = (item) => {
    setWaitlist(waitlist.map(w => {
      if (w.id === item.id) {
        return { ...w, status: "notified" };
      }
      return w;
    }));
    toast.success(`Đã gửi SMS & Email thông báo có chỗ trống tới khách ${item.customerName} (${item.customerPhone})!`);
  };

  const handleConvertToBooking = (item) => {
    setWaitlist(waitlist.map(w => {
      if (w.id === item.id) {
        return { ...w, status: "booked" };
      }
      return w;
    }));
    toast.success(`Đã chuyển đổi thành công yêu cầu ${item.code} sang Đơn Booking chính thức!`);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa khách "${name}" khỏi danh sách chờ?`)) {
      setWaitlist(waitlist.filter(w => w.id !== id));
      toast.success("Đã xóa khỏi danh sách chờ!");
    }
  };

  const filtered = waitlist.filter(item => {
    const matchSearch = item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.customerPhone.includes(searchTerm) ||
                        item.tourName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPriority = filterPriority === "all" || item.priority === filterPriority;
    const matchStatus = filterStatus === "all" || item.status === filterStatus;
    return matchSearch && matchPriority && matchStatus;
  });

  const waitingCount = waitlist.filter(w => w.status === "waiting").length;
  const vipCount = waitlist.filter(w => w.priority === "VIP" && w.status === "waiting").length;
  const bookedCount = waitlist.filter(w => w.status === "booked").length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <Clock className="text-sky-600" size={28} />
            Quản Lý Danh Sách Chờ (Waitlist)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Ghi nhận khách đăng ký chờ các chuyến đi hết chỗ, tự động báo khi có vé/chỗ nhả ra
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_waitlist");
              setWaitlist(INITIAL_WAITLIST);
              toast.success("Đã nạp lại dữ liệu danh sách chờ chuẩn!");
            }}
            className="p-2.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            title="Khôi phục mặc định"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md shadow-sky-600/20 transition cursor-pointer"
          >
            <Plus size={18} />
            Thêm Khách Vào Hàng Chờ
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đang Chờ Chỗ Trống</div>
            <div className="text-2xl font-black text-amber-600 mt-1">{waitingCount} khách</div>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
            <Clock size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Khách Ưu Tiên VIP</div>
            <div className="text-2xl font-black text-purple-600 mt-1">{vipCount} khách</div>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold">
            <Star size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chuyển Đổi Thành Công</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">{bookedCount} Booking</div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
            <UserCheck size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tỷ Lệ Giữ Chân Khách</div>
            <div className="text-2xl font-black text-sky-600 mt-1">82.4%</div>
          </div>
          <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center font-bold">
            🎯
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên khách, SĐT, tour..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-sky-500"
          >
            <option value="all">Tất cả mức ưu tiên</option>
            <option value="VIP">Khách VIP</option>
            <option value="Normal">Tiêu chuẩn</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-sky-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="waiting">Đang chờ</option>
            <option value="notified">Đã thông báo có chỗ</option>
            <option value="booked">Đã chốt Booking</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Mã Hàng Chờ</th>
                <th className="p-4">Khách Hàng</th>
                <th className="p-4">Tour / Vé Cần Chỗ</th>
                <th className="p-4">Số Chỗ</th>
                <th className="p-4">Ngày Dự Kiến</th>
                <th className="p-4">Ưu Tiên</th>
                <th className="p-4">Trạng Thái</th>
                <th className="p-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4 font-mono font-bold text-xs text-sky-700">
                      {item.code}
                      <div className="text-[11px] font-sans text-slate-400 mt-0.5">{item.createdAt}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{item.customerName}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{item.customerPhone}</div>
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="font-bold text-slate-800 line-clamp-1">{item.tourName}</div>
                      {item.notes && (
                        <div className="text-xs text-slate-500 mt-0.5 italic line-clamp-1">"{item.notes}"</div>
                      )}
                    </td>
                    <td className="p-4 font-bold text-slate-800">
                      {item.passengers} khách
                    </td>
                    <td className="p-4 text-xs font-medium text-slate-700">
                      {item.desiredDate}
                    </td>
                    <td className="p-4">
                      {item.priority === "VIP" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                          <Star size={12} className="fill-purple-600" />
                          Ưu Tiên VIP
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
                          Tiêu Chuẩn
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {item.status === "waiting" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100">
                          <Clock size={13} />
                          Đang chờ
                        </span>
                      ) : item.status === "notified" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-600 border border-sky-100">
                          <BellRing size={13} />
                          Đã báo có chỗ
                        </span>
                      ) : item.status === "booked" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <CheckCircle2 size={13} />
                          Đã chốt Booking
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500">
                          Đã hủy
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {item.status === "waiting" && (
                          <button
                            onClick={() => handleNotifyCustomer(item)}
                            className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold text-xs rounded-lg flex items-center gap-1 transition cursor-pointer"
                            title="Gửi thông báo có chỗ"
                          >
                            <BellRing size={13} />
                            Báo Có Chỗ
                          </button>
                        )}
                        {item.status !== "booked" && (
                          <button
                            onClick={() => handleConvertToBooking(item)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition cursor-pointer"
                            title="Chốt thành đơn Booking"
                          >
                            Chốt Đơn
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(item.id, item.customerName)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                          title="Xóa yêu cầu"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-400">
                    <Clock className="mx-auto mb-2 opacity-30" size={40} />
                    Không tìm thấy khách nào trong danh sách chờ.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Waitlist */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Clock className="text-sky-600" size={20} />
                Thêm Khách Vào Danh Sách Chờ
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên Khách Hàng *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số Điện Thoại *</label>
                  <input
                    type="text"
                    required
                    placeholder="0912345678"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tour Hoặc Vé Quan Tâm *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Tour Hàn Quốc 5N4Đ Seoul"
                  value={formData.tourName}
                  onChange={(e) => setFormData({ ...formData, tourName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ngày Dự Kiến</label>
                  <input
                    type="text"
                    value={formData.desiredDate}
                    onChange={(e) => setFormData({ ...formData, desiredDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số Chỗ Cần</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.passengers}
                    onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mức Ưu Tiên</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  >
                    <option value="Normal">Tiêu chuẩn</option>
                    <option value="VIP">Khách VIP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ghi Chú Đặc Biệt</label>
                <textarea
                  rows={2}
                  placeholder="Yêu cầu riêng của khách (phòng đơn, kỷ niệm cưới...)"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-bold rounded-xl transition text-sm cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition text-sm cursor-pointer"
                >
                  Lưu Vào Hàng Chờ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
