import { useState, useEffect } from "react";
import { 
  CreditCard, Plus, Search, CheckCircle2, Clock, XCircle, 
  ArrowUpRight, Download, RefreshCw, X, Eye, DollarSign, ShieldCheck, AlertCircle
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_PAYMENTS = [
  {
    id: 1,
    txnRef: "TXN-VNP-984210",
    customerName: "Nguyễn Văn Tuấn",
    customerPhone: "0912345678",
    customerEmail: "tuan.nguyen@gmail.com",
    orderType: "Tour Du Lịch",
    orderTitle: "Tour Đà Nẵng - Hội An - Bà Nà Hills 4N3Đ",
    amount: 9980000,
    gateway: "VNPay QR",
    bankCode: "NCB",
    status: "success", // success, pending, failed
    createdAt: "30/10/2026 10:15",
  },
  {
    id: 2,
    txnRef: "TXN-MOMO-772194",
    customerName: "Trần Thị Mai Phương",
    customerPhone: "0987654321",
    customerEmail: "phuong.tran@yahoo.com",
    orderType: "Vé Vui Chơi",
    orderTitle: "Vé Cáp Treo Bà Nà Hills + Buffet (x2)",
    amount: 1980000,
    gateway: "MoMo E-Wallet",
    bankCode: "MOMO",
    status: "success",
    createdAt: "30/10/2026 09:40",
  },
  {
    id: 3,
    txnRef: "TXN-ZALO-331092",
    customerName: "Lê Hoàng Long",
    customerPhone: "0903112233",
    customerEmail: "long.le@gmail.com",
    orderType: "Tour Du Lịch",
    orderTitle: "Tour Hàn Quốc 5N4Đ: Seoul - Nami - Everland",
    amount: 15890000,
    gateway: "ZaloPay",
    bankCode: "ZALOPAY",
    status: "pending",
    createdAt: "30/10/2026 09:10",
  },
  {
    id: 4,
    txnRef: "TXN-VISA-440219",
    customerName: "Đỗ Minh Khang",
    customerPhone: "0944556677",
    customerEmail: "khang.do@outlook.com",
    orderType: "Tour Du Lịch",
    orderTitle: "Tour Nhật Bản 6N5Đ Cung Đường Vàng",
    amount: 34900000,
    gateway: "Thẻ Quốc Tế (Visa/Master)",
    bankCode: "VISA",
    status: "success",
    createdAt: "29/10/2026 21:30",
  },
  {
    id: 5,
    txnRef: "TXN-BANK-110293",
    customerName: "Vũ Bích Ngọc",
    customerPhone: "0977889900",
    customerEmail: "ngoc.vu@gmail.com",
    orderType: "Vé Vui Chơi",
    orderTitle: "Vé VinWonders Phú Quốc Trọn Gói (x3)",
    amount: 2640000,
    gateway: "Chuyển Khoản Ngân Hàng",
    bankCode: "Vietcombank",
    status: "failed",
    createdAt: "29/10/2026 18:05",
  }
];

export default function Payments() {
  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_payments");
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterGateway, setFilterGateway] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    orderType: "Tour Du Lịch",
    orderTitle: "",
    amount: "",
    gateway: "VNPay QR",
    bankCode: "NCB",
    status: "success"
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_payments", JSON.stringify(payments));
  }, [payments]);

  const handleOpenAdd = () => {
    setFormData({
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      orderType: "Tour Du Lịch",
      orderTitle: "",
      amount: "",
      gateway: "VNPay QR",
      bankCode: "NCB",
      status: "success"
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.amount || !formData.orderTitle) {
      toast.error("Vui lòng điền đủ thông tin giao dịch!");
      return;
    }

    const now = new Date();
    const newTxn = {
      id: Date.now(),
      txnRef: `TXN-${formData.gateway.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      ...formData,
      amount: Number(formData.amount),
      createdAt: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    };

    setPayments([newTxn, ...payments]);
    toast.success("Tạo biên lai giao dịch thành công!");
    setIsModalOpen(false);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setPayments(payments.map(p => {
      if (p.id === id) {
        toast.success(`Đã đổi trạng thái giao dịch sang: ${newStatus === 'success' ? 'Thành công' : newStatus === 'failed' ? 'Thất bại' : 'Chờ xử lý'}`);
        return { ...p, status: newStatus };
      }
      return p;
    }));
  };

  const filtered = payments.filter(p => {
    const matchSearch = p.txnRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.customerPhone.includes(searchTerm) ||
                        p.orderTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGateway = filterGateway === "all" || p.gateway.includes(filterGateway);
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchGateway && matchStatus;
  });

  const totalRevenue = payments
    .filter(p => p.status === "success")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <CreditCard className="text-sky-600" size={28} />
            Quản Lý Thanh Toán & Giao Dịch
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Theo dõi dòng tiền trực tuyến qua VNPay, MoMo, ZaloPay, Thẻ ngân hàng & cấp biên lai thanh toán
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_payments");
              setPayments(INITIAL_PAYMENTS);
              toast.success("Đã khôi phục dữ liệu giao dịch chuẩn!");
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
            Tạo Giao Dịch Thu Tiền
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng Đã Thu Thành Công</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {(totalRevenue / 1000000).toFixed(2)} tr đ
            </div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Giao Dịch Thành Công</div>
            <div className="text-2xl font-black text-slate-800 mt-1">
              {payments.filter(p => p.status === "success").length} GD
            </div>
          </div>
          <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center font-bold">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đang Chờ Khách Chuyển</div>
            <div className="text-2xl font-black text-amber-600 mt-1">
              {(pendingAmount / 1000000).toFixed(2)} tr đ
            </div>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
            <Clock size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tỷ Lệ Thanh Toán Tự Động</div>
            <div className="text-2xl font-black text-blue-600 mt-1">98.5%</div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
            <ShieldCheck size={24} />
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo mã GD, tên khách, SĐT..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={filterGateway}
            onChange={(e) => setFilterGateway(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-sky-500"
          >
            <option value="all">Tất cả cổng thanh toán</option>
            <option value="VNPay">VNPay QR</option>
            <option value="MoMo">MoMo</option>
            <option value="ZaloPay">ZaloPay</option>
            <option value="Visa">Thẻ Visa/Master</option>
            <option value="Chuyển Khoản">Chuyển Khoản</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-sky-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="success">Thành công</option>
            <option value="pending">Chờ thanh toán</option>
            <option value="failed">Thất bại</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Mã Giao Dịch</th>
                <th className="p-4">Khách Hàng</th>
                <th className="p-4">Đơn Hàng / Dịch Vụ</th>
                <th className="p-4">Số Tiền (VNĐ)</th>
                <th className="p-4">Cổng Thanh Toán</th>
                <th className="p-4">Thời Gian</th>
                <th className="p-4">Trạng Thái</th>
                <th className="p-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4 font-mono font-bold text-xs text-sky-700">
                      {item.txnRef}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{item.customerName}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{item.customerPhone}</div>
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="font-semibold text-slate-800 line-clamp-1">{item.orderTitle}</div>
                      <span className="inline-block mt-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {item.orderType}
                      </span>
                    </td>
                    <td className="p-4 font-black text-slate-800 text-base">
                      {item.amount?.toLocaleString()} đ
                    </td>
                    <td className="p-4">
                      <div className="text-xs font-bold text-slate-700">{item.gateway}</div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">{item.bankCode}</div>
                    </td>
                    <td className="p-4 text-slate-500 text-xs whitespace-nowrap">
                      {item.createdAt}
                    </td>
                    <td className="p-4">
                      {item.status === "success" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <CheckCircle2 size={13} />
                          Thành công
                        </span>
                      ) : item.status === "pending" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100">
                          <Clock size={13} />
                          Chờ xử lý
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100">
                          <XCircle size={13} />
                          Thất bại
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedTxn(item)}
                          className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
                          title="Xem biên lai chi tiết"
                        >
                          <Eye size={16} />
                        </button>
                        {item.status !== "success" && (
                          <button
                            onClick={() => handleUpdateStatus(item.id, "success")}
                            className="px-2 py-1 text-xs font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition cursor-pointer"
                            title="Xác nhận đã nhận tiền"
                          >
                            Xác Nhận Thu
                          </button>
                        )}
                        {item.status === "success" && (
                          <button
                            onClick={() => {
                              toast.success(`Đã xuất hóa đơn điện tử cho giao dịch ${item.txnRef}`);
                            }}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                            title="Xuất hóa đơn điện tử"
                          >
                            <Download size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-400">
                    <CreditCard className="mx-auto mb-2 opacity-30" size={40} />
                    Không tìm thấy giao dịch nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Payment */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <CreditCard className="text-sky-600" size={20} />
                Tạo Biên Lai Thu Tiền Mới
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
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên Dịch Vụ / Tour / Vé *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Tour Đà Nẵng 4N3Đ hoặc Vé Bà Nà Hills x2"
                  value={formData.orderTitle}
                  onChange={(e) => setFormData({ ...formData, orderTitle: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số Tiền Thu (VNĐ) *</label>
                  <input
                    type="number"
                    required
                    placeholder="5000000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-sky-600 focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Cổng Thanh Toán</label>
                  <select
                    value={formData.gateway}
                    onChange={(e) => setFormData({ ...formData, gateway: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  >
                    <option value="VNPay QR">VNPay QR</option>
                    <option value="MoMo E-Wallet">MoMo E-Wallet</option>
                    <option value="ZaloPay">ZaloPay</option>
                    <option value="Thẻ Quốc Tế (Visa/Master)">Thẻ Quốc Tế (Visa/Master)</option>
                    <option value="Chuyển Khoản Ngân Hàng">Chuyển Khoản Ngân Hàng</option>
                    <option value="Tiền Mặt Tại Quầy">Tiền Mặt Tại Quầy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Trạng Thái Giao Dịch</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                >
                  <option value="success">Thành công (Đã nhận tiền)</option>
                  <option value="pending">Chờ khách thanh toán</option>
                  <option value="failed">Thất bại</option>
                </select>
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
                  Xác Nhận Lưu Giao Dịch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Receipt Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="text-center mb-5 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 size={26} />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">Biên Lai Giao Dịch Điện Tử</h3>
              <p className="text-xs font-mono text-slate-400 mt-1">{selectedTxn.txnRef}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Khách hàng:</span>
                <span className="font-bold text-slate-800">{selectedTxn.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Số điện thoại:</span>
                <span className="font-mono text-slate-700">{selectedTxn.customerPhone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Dịch vụ:</span>
                <span className="font-semibold text-slate-800 text-right max-w-[200px] truncate">{selectedTxn.orderTitle}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Cổng thanh toán:</span>
                <span className="font-bold text-sky-600">{selectedTxn.gateway}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Thời gian giao dịch:</span>
                <span className="text-slate-700 text-xs">{selectedTxn.createdAt}</span>
              </div>
              <div className="flex justify-between items-center py-2 bg-slate-50 px-3 rounded-xl">
                <span className="font-bold text-slate-700">Tổng thanh toán:</span>
                <span className="text-xl font-black text-emerald-600">{selectedTxn.amount?.toLocaleString()} đ</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  toast.success("Đã tải xuống file hóa đơn PDF");
                }}
                className="flex-1 py-2.5 bg-sky-50 text-sky-600 hover:bg-sky-100 font-bold text-sm rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download size={16} />
                Tải Hóa Đơn PDF
              </button>
              <button
                onClick={() => setSelectedTxn(null)}
                className="py-2.5 px-5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm rounded-xl transition cursor-pointer"
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
