import { useState, useEffect } from "react";
import { 
  Undo2, Plus, Search, CheckCircle2, Clock, XCircle, 
  RefreshCw, X, AlertCircle, ArrowDownLeft, ShieldAlert
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_REFUNDS = [
  {
    id: 1,
    refundCode: "REF-2026-0081",
    customerName: "Hoàng Văn Nam",
    customerPhone: "0918273645",
    orderTitle: "Tour Phú Quốc Cano 4 Đảo 3N2Đ",
    orderCode: "BK-TOUR-9912",
    originalAmount: 3890000,
    refundAmount: 3500000,
    penaltyFee: 390000,
    reason: "Gia đình có việc gấp đột xuất, hủy trước 7 ngày theo chính sách",
    bankName: "Vietcombank",
    bankAccount: "1029384756",
    bankOwner: "HOANG VAN NAM",
    status: "pending", // pending, approved, completed, rejected
    requestDate: "30/10/2026 08:30"
  },
  {
    id: 2,
    refundCode: "REF-2026-0080",
    customerName: "Lê Thu Thảo",
    customerPhone: "0909123456",
    orderTitle: "Vé Cáp Treo Fansipan Legend Sa Pa (x2)",
    orderCode: "BK-TKT-4412",
    originalAmount: 1640000,
    refundAmount: 1640000,
    penaltyFee: 0,
    reason: "Thời tiết sương mù gió bão, cáp treo tạm ngừng hoạt động (Lỗi khách quan)",
    bankName: "Techcombank",
    bankAccount: "19034827189012",
    bankOwner: "LE THU THAO",
    status: "completed",
    requestDate: "29/10/2026 14:15"
  },
  {
    id: 3,
    refundCode: "REF-2026-0079",
    customerName: "Phạm Quốc Tuấn",
    customerPhone: "0934567890",
    orderTitle: "Tour Đà Nẵng - Hội An 4N3Đ",
    orderCode: "BK-TOUR-3819",
    originalAmount: 4990000,
    refundAmount: 4000000,
    penaltyFee: 990000,
    reason: "Đổi lịch công tác sang tháng 11",
    bankName: "MBBank",
    bankAccount: "08392019382",
    bankOwner: "PHAM QUOC TUAN",
    status: "approved",
    requestDate: "29/10/2026 10:00"
  },
  {
    id: 4,
    refundCode: "REF-2026-0078",
    customerName: "Ngô Quang Huy",
    customerPhone: "0971239876",
    orderTitle: "Vé VinWonders Phú Quốc",
    orderCode: "BK-TKT-1928",
    originalAmount: 880000,
    refundAmount: 0,
    penaltyFee: 880000,
    reason: "Yêu cầu hủy sau khi vé đã quét vào cổng (Sai quy định)",
    bankName: "VPBank",
    bankAccount: "982736451",
    bankOwner: "NGO QUANG HUY",
    status: "rejected",
    requestDate: "28/10/2026 16:45"
  }
];

export default function Refunds() {
  const [refunds, setRefunds] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_refunds");
    return saved ? JSON.parse(saved) : INITIAL_REFUNDS;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    orderTitle: "",
    orderCode: "",
    originalAmount: "",
    refundAmount: "",
    penaltyFee: 0,
    reason: "",
    bankName: "Vietcombank",
    bankAccount: "",
    bankOwner: ""
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_refunds", JSON.stringify(refunds));
  }, [refunds]);

  const handleOpenAdd = () => {
    setFormData({
      customerName: "",
      customerPhone: "",
      orderTitle: "",
      orderCode: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      originalAmount: "",
      refundAmount: "",
      penaltyFee: 0,
      reason: "",
      bankName: "Vietcombank",
      bankAccount: "",
      bankOwner: ""
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.refundAmount) {
      toast.error("Vui lòng điền đủ thông tin hoàn tiền!");
      return;
    }

    const now = new Date();
    const newRef = {
      id: Date.now(),
      refundCode: `REF-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      originalAmount: Number(formData.originalAmount) || Number(formData.refundAmount),
      refundAmount: Number(formData.refundAmount),
      penaltyFee: Number(formData.penaltyFee) || 0,
      status: "pending",
      requestDate: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    };

    setRefunds([newRef, ...refunds]);
    toast.success("Tạo yêu cầu hoàn tiền thành công!");
    setIsModalOpen(false);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setRefunds(refunds.map(r => {
      if (r.id === id) {
        let msg = "";
        if (newStatus === "approved") msg = "Đã duyệt yêu cầu hoàn tiền!";
        if (newStatus === "completed") msg = "Đã xác nhận hoàn tiền thành công về tài khoản khách!";
        if (newStatus === "rejected") msg = "Đã từ chối yêu cầu hoàn tiền!";
        toast.success(msg);
        return { ...r, status: newStatus };
      }
      return r;
    }));
  };

  const filtered = refunds.filter(r => {
    const matchSearch = r.refundCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        r.customerPhone.includes(searchTerm) ||
                        r.orderCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalRefunded = refunds
    .filter(r => r.status === "completed")
    .reduce((sum, r) => sum + r.refundAmount, 0);

  const pendingRefunds = refunds.filter(r => r.status === "pending").length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <Undo2 className="text-sky-600" size={28} />
            Quản Lý Hoàn Tiền (Refunds)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Xử lý yêu cầu hoàn tiền tour, vé vui chơi, áp dụng chính sách hủy vé và chuyển khoản trả khách
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_refunds");
              setRefunds(INITIAL_REFUNDS);
              toast.success("Đã khôi phục dữ liệu hoàn tiền chuẩn!");
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
            Tạo Yêu Cầu Hoàn Tiền
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đã Hoàn Tất Trả Khách</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {(totalRefunded / 1000000).toFixed(2)} tr đ
            </div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
            <ArrowDownLeft size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đang Chờ Kế Toán Duyệt</div>
            <div className="text-2xl font-black text-amber-600 mt-1">{pendingRefunds} yêu cầu</div>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
            <Clock size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đã Duyệt - Chờ Chuyển</div>
            <div className="text-2xl font-black text-blue-600 mt-1">
              {refunds.filter(r => r.status === "approved").length} yêu cầu
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Từ Chối Hoàn Tiền</div>
            <div className="text-2xl font-black text-rose-600 mt-1">
              {refunds.filter(r => r.status === "rejected").length} yêu cầu
            </div>
          </div>
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center font-bold">
            <ShieldAlert size={24} />
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo mã hoàn tiền, tên khách, mã đơn..."
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
            <option value="pending">Chờ duyệt</option>
            <option value="approved">Đã duyệt (Chờ chuyển)</option>
            <option value="completed">Đã hoàn tất</option>
            <option value="rejected">Từ chối</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Mã Hoàn Tiền</th>
                <th className="p-4">Khách Hàng</th>
                <th className="p-4">Đơn Hàng & Lý Do</th>
                <th className="p-4">Số Tiền Hoàn</th>
                <th className="p-4">Tài Khoản Thụ Hưởng</th>
                <th className="p-4">Trạng Thái</th>
                <th className="p-4 text-center">Xử Lý</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4 font-mono font-bold text-xs text-sky-700">
                      {item.refundCode}
                      <div className="text-[11px] font-sans text-slate-400 mt-0.5">{item.requestDate}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{item.customerName}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{item.customerPhone}</div>
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="font-bold text-slate-800 line-clamp-1">{item.orderTitle}</div>
                      <div className="text-xs text-slate-500 mt-0.5 italic line-clamp-2">"{item.reason}"</div>
                    </td>
                    <td className="p-4">
                      <div className="font-black text-rose-600 text-base">
                        {item.refundAmount?.toLocaleString()} đ
                      </div>
                      {item.penaltyFee > 0 && (
                        <div className="text-[11px] text-slate-400">
                          Phí hủy: {item.penaltyFee?.toLocaleString()} đ
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-800 text-xs">{item.bankName}</div>
                      <div className="font-mono text-xs text-slate-600 mt-0.5">{item.bankAccount}</div>
                      <div className="text-[11px] text-slate-400 uppercase font-semibold">{item.bankOwner}</div>
                    </td>
                    <td className="p-4">
                      {item.status === "completed" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <CheckCircle2 size={13} />
                          Đã hoàn tất
                        </span>
                      ) : item.status === "approved" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
                          <CheckCircle2 size={13} />
                          Đã duyệt (Chờ CK)
                        </span>
                      ) : item.status === "pending" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100">
                          <Clock size={13} />
                          Chờ duyệt
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100">
                          <XCircle size={13} />
                          Từ chối
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1.5">
                        {item.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(item.id, "approved")}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition cursor-pointer"
                            >
                              Duyệt
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(item.id, "rejected")}
                              className="px-2.5 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-lg transition cursor-pointer"
                            >
                              Từ Chối
                            </button>
                          </>
                        )}
                        {item.status === "approved" && (
                          <button
                            onClick={() => handleUpdateStatus(item.id, "completed")}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition cursor-pointer"
                          >
                            Xác Nhận Đã CK
                          </button>
                        )}
                        {item.status === "completed" && (
                          <span className="text-xs text-slate-400 italic">Đã xử lý xong</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400">
                    <Undo2 className="mx-auto mb-2 opacity-30" size={40} />
                    Không tìm thấy yêu cầu hoàn tiền nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Refund */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Undo2 className="text-sky-600" size={20} />
                Tạo Yêu Cầu Hoàn Tiền Mới
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
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số Điện Thoại</label>
                  <input
                    type="text"
                    placeholder="0912345678"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Dịch Vụ Hủy *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Tour Phú Quốc 3N2Đ"
                  value={formData.orderTitle}
                  onChange={(e) => setFormData({ ...formData, orderTitle: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số Tiền Hoàn (VNĐ) *</label>
                  <input
                    type="number"
                    required
                    placeholder="3500000"
                    value={formData.refundAmount}
                    onChange={(e) => setFormData({ ...formData, refundAmount: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-rose-600 focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phí Hủy Phạt (Nếu có)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.penaltyFee}
                    onChange={(e) => setFormData({ ...formData, penaltyFee: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Lý Do Hoàn Tiền</label>
                <textarea
                  rows={2}
                  placeholder="Lý do hủy đơn của khách..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ngân Hàng</label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số Tài Khoản</label>
                  <input
                    type="text"
                    placeholder="102938475"
                    value={formData.bankAccount}
                    onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Chủ Tài Khoản</label>
                  <input
                    type="text"
                    placeholder="NGUYEN VAN A"
                    value={formData.bankOwner}
                    onChange={(e) => setFormData({ ...formData, bankOwner: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase focus:outline-none focus:border-sky-500"
                  />
                </div>
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
                  Gửi Yêu Cầu Hoàn Tiền
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
