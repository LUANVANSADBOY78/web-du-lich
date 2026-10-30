import { useState, useEffect } from "react";
import { 
  Share2, Plus, Search, Edit3, Trash2, DollarSign, 
  Users, Gift, CheckCircle2, RefreshCw, X, Copy, ArrowUpRight
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_REFERRALS = [
  {
    id: 1,
    referrerName: "Nguyễn Văn Tuấn",
    phone: "0912345678",
    refCode: "TUAN2026",
    totalInvited: 24,
    successfulBookings: 18,
    commissionEarned: 5400000,
    commissionPaid: 3600000,
    commissionPending: 1800000,
    status: "active",
    createdAt: "15/01/2026"
  },
  {
    id: 2,
    referrerName: "Trần Mai Phương",
    phone: "0987654321",
    refCode: "PHUONGTRAVEL",
    totalInvited: 38,
    successfulBookings: 30,
    commissionEarned: 9200000,
    commissionPaid: 9200000,
    commissionPending: 0,
    status: "active",
    createdAt: "20/02/2026"
  },
  {
    id: 3,
    referrerName: "Lê Hoàng Long",
    phone: "0903112233",
    refCode: "LONGGO88",
    totalInvited: 12,
    successfulBookings: 8,
    commissionEarned: 2400000,
    commissionPaid: 1000000,
    commissionPending: 1400000,
    status: "active",
    createdAt: "10/05/2026"
  },
  {
    id: 4,
    referrerName: "Vũ Bích Ngọc",
    phone: "0977889900",
    refCode: "NGOCVIP",
    totalInvited: 5,
    successfulBookings: 2,
    commissionEarned: 600000,
    commissionPaid: 0,
    commissionPending: 600000,
    status: "pending",
    createdAt: "01/10/2026"
  }
];

export default function ReferralProgram() {
  const [referrals, setReferrals] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_referrals");
    return saved ? JSON.parse(saved) : INITIAL_REFERRALS;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    referrerName: "",
    phone: "",
    refCode: "",
    commissionEarned: 0,
    status: "active"
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_referrals", JSON.stringify(referrals));
  }, [referrals]);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      referrerName: "",
      phone: "",
      refCode: `REF${Math.floor(1000 + Math.random() * 9000)}`,
      commissionEarned: 0,
      status: "active"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      referrerName: item.referrerName,
      phone: item.phone,
      refCode: item.refCode,
      commissionEarned: item.commissionEarned,
      status: item.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.referrerName || !formData.phone || !formData.refCode) {
      toast.error("Vui lòng nhập đủ thông tin!");
      return;
    }

    if (editingItem) {
      setReferrals(referrals.map(r => r.id === editingItem.id ? { ...r, ...formData } : r));
      toast.success("Cập nhật mã giới thiệu thành công!");
    } else {
      const newR = {
        id: Date.now(),
        ...formData,
        totalInvited: 0,
        successfulBookings: 0,
        commissionPaid: 0,
        commissionPending: 0,
        createdAt: new Date().toLocaleDateString("vi-VN")
      };
      setReferrals([newR, ...referrals]);
      toast.success("Tạo mã tiếp thị giới thiệu mới thành công!");
    }
    setIsModalOpen(false);
  };

  const handlePayCommission = (id, name, pending) => {
    if (pending <= 0) {
      toast.info("Người này hiện không có hoa hồng chờ thanh toán!");
      return;
    }
    if (window.confirm(`Xác nhận thanh toán hoa hồng ${pending.toLocaleString()}đ cho khách ${name}?`)) {
      setReferrals(referrals.map(r => {
        if (r.id === id) {
          return {
            ...r,
            commissionPaid: r.commissionPaid + r.commissionPending,
            commissionPending: 0
          };
        }
        return r;
      }));
      toast.success(`Đã chi trả thành công hoa hồng cho ${name}!`);
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa mã giới thiệu của "${name}"?`)) {
      setReferrals(referrals.filter(r => r.id !== id));
      toast.success("Đã xóa mã giới thiệu!");
    }
  };

  const filtered = referrals.filter(r => {
    const matchSearch = r.referrerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        r.refCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        r.phone.includes(searchTerm);
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalEarned = referrals.reduce((a, b) => a + b.commissionEarned, 0);
  const totalPaid = referrals.reduce((a, b) => a + b.commissionPaid, 0);
  const totalPending = referrals.reduce((a, b) => a + b.commissionPending, 0);
  const totalInvitedAll = referrals.reduce((a, b) => a + b.totalInvited, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <Share2 className="text-sky-600" size={28} />
            Chương Trình Giới Thiệu Khách (Referral Program)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Quản lý mã giới thiệu bạn bè, theo dõi doanh thu tiếp thị liên kết (Affiliate) và quyết toán hoa hồng
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_referrals");
              setReferrals(INITIAL_REFERRALS);
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
            Tạo Mã Giới Thiệu Mới
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng Hoa Hồng Đã Tạo</div>
            <div className="text-2xl font-black text-slate-800 mt-1">
              {(totalEarned / 1000000).toFixed(2)} tr đ
            </div>
          </div>
          <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center font-bold">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đã Thanh Toán Khách</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {(totalPaid / 1000000).toFixed(2)} tr đ
            </div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hoa Hồng Chờ Duyệt Chi</div>
            <div className="text-2xl font-black text-amber-600 mt-1">
              {(totalPending / 1000000).toFixed(2)} tr đ
            </div>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
            ⏳
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lượt Bạn Bè Đăng Ký</div>
            <div className="text-2xl font-black text-blue-600 mt-1">{totalInvitedAll} người</div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
            <Users size={24} />
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên người giới thiệu, mã code, SĐT..."
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
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="pending">Chờ kích hoạt</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Người Giới Thiệu</th>
                <th className="p-4">Mã Giới Thiệu (Ref Code)</th>
                <th className="p-4">Đã Mời / Đã Đặt</th>
                <th className="p-4">Tổng Hoa Hồng</th>
                <th className="p-4">Đã Chi Trả</th>
                <th className="p-4">Chờ Quyết Toán</th>
                <th className="p-4">Trạng Thái</th>
                <th className="p-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{item.referrerName}</div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">{item.phone}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-mono font-bold text-xs bg-sky-50 text-sky-700 px-2.5 py-1 rounded-md border border-sky-100">
                      {item.refCode}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-800">{item.totalInvited} bạn</span>
                    <span className="text-xs text-emerald-600 block">({item.successfulBookings} booking)</span>
                  </td>
                  <td className="p-4 font-black text-slate-800">
                    {item.commissionEarned?.toLocaleString()} đ
                  </td>
                  <td className="p-4 text-emerald-600 font-bold">
                    {item.commissionPaid?.toLocaleString()} đ
                  </td>
                  <td className="p-4">
                    <span className={`font-black ${item.commissionPending > 0 ? "text-amber-600" : "text-slate-400"}`}>
                      {item.commissionPending?.toLocaleString()} đ
                    </span>
                  </td>
                  <td className="p-4">
                    {item.status === "active" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        Hoạt động
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-500">
                        Tạm dừng
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      {item.commissionPending > 0 && (
                        <button
                          onClick={() => handlePayCommission(item.id, item.referrerName, item.commissionPending)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition cursor-pointer"
                          title="Chi trả hoa hồng"
                        >
                          Quyết Toán
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.referrerName)}
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
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-5 space-y-4 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-slate-800 text-lg">
              {editingItem ? "Sửa Mã Giới Thiệu" : "Tạo Mã Tiếp Thị Giới Thiệu"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên Người Giới Thiệu *</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={formData.referrerName}
                  onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số Điện Thoại</label>
                  <input
                    type="text"
                    required
                    placeholder="0912345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mã Code Ref</label>
                  <input
                    type="text"
                    required
                    value={formData.refCode}
                    onChange={(e) => setFormData({ ...formData, refCode: e.target.value.toUpperCase() })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono uppercase"
                  />
                </div>
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
                  Lưu Mã Ref
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
