import { useState, useEffect } from "react";
import { 
  Ticket, Plus, Search, CheckCircle2, Clock, XCircle, 
  RefreshCw, X, QrCode, Download, Eye, Send, AlertCircle
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_BOOKINGS = [
  {
    id: 1,
    bookingCode: "BK-TKT-99120",
    customerName: "Nguyễn Thu Hà",
    customerPhone: "0912345678",
    customerEmail: "thuha@gmail.com",
    ticketName: "Vé Cáp Treo Bà Nà Hills + Buffet Trưa 80 Món",
    attraction: "Sun World Bà Nà Hills",
    quantity: 2,
    totalPrice: 1980000,
    paymentStatus: "paid", // paid, pending, refunded
    ticketStatus: "issued", // issued, used, cancelled
    usedAt: null,
    createdAt: "30/10/2026 10:25"
  },
  {
    id: 2,
    bookingCode: "BK-TKT-99119",
    customerName: "Lê Minh Quân",
    customerPhone: "0987112233",
    customerEmail: "minhquan@gmail.com",
    ticketName: "Vé VinWonders Phú Quốc Trọn Gói 1 Ngày",
    attraction: "VinWonders Phú Quốc",
    quantity: 4,
    totalPrice: 3520000,
    paymentStatus: "paid",
    ticketStatus: "used",
    usedAt: "30/10/2026 09:15 (Cổng 02)",
    createdAt: "29/10/2026 19:40"
  },
  {
    id: 3,
    bookingCode: "BK-TKT-99118",
    customerName: "Trần Bảo An",
    customerPhone: "0909556677",
    customerEmail: "baoan.tran@yahoo.com",
    ticketName: "Vé Cáp Treo Fansipan Legend + Tàu Hỏa",
    attraction: "Sun World Fansipan",
    quantity: 1,
    totalPrice: 820000,
    paymentStatus: "pending",
    ticketStatus: "issued",
    usedAt: null,
    createdAt: "30/10/2026 08:50"
  },
  {
    id: 4,
    bookingCode: "BK-TKT-99117",
    customerName: "Đỗ Quốc Cường",
    customerPhone: "0934123789",
    customerEmail: "cuong.do@gmail.com",
    ticketName: "Vé Vinpearl Safari Phú Quốc",
    attraction: "Vinpearl Safari",
    quantity: 2,
    totalPrice: 1180000,
    paymentStatus: "refunded",
    ticketStatus: "cancelled",
    usedAt: null,
    createdAt: "28/10/2026 14:10"
  }
];

export default function BookingManagement() {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_ticket_bookings");
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterTicketStatus, setFilterTicketStatus] = useState("all");
  const [filterPayment, setFilterPayment] = useState("all");

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrModalItem, setQrModalItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    ticketName: "Vé Cáp Treo Bà Nà Hills + Buffet",
    attraction: "Sun World Bà Nà Hills",
    quantity: 2,
    totalPrice: 1980000,
    paymentStatus: "paid",
    ticketStatus: "issued"
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_ticket_bookings", JSON.stringify(bookings));
  }, [bookings]);

  const handleOpenAdd = () => {
    setFormData({
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      ticketName: "Vé Cáp Treo Bà Nà Hills + Buffet",
      attraction: "Sun World Bà Nà Hills",
      quantity: 2,
      totalPrice: 1980000,
      paymentStatus: "paid",
      ticketStatus: "issued"
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.ticketName) {
      toast.error("Vui lòng điền đủ thông tin đơn vé!");
      return;
    }

    const now = new Date();
    const newBk = {
      id: Date.now(),
      bookingCode: `BK-TKT-${Math.floor(10000 + Math.random() * 90000)}`,
      ...formData,
      quantity: Number(formData.quantity) || 1,
      totalPrice: Number(formData.totalPrice) || 0,
      usedAt: null,
      createdAt: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    };

    setBookings([newBk, ...bookings]);
    toast.success("Tạo đơn đặt vé thành công!");
    setIsModalOpen(false);
  };

  const handleResend = (code, email) => {
    toast.success(`Đã gửi lại vé điện tử & QR Code tới email ${email} thành công!`);
  };

  const handleCheckInNow = (id) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} (Quầy Admin)`;
    setBookings(bookings.map(b => {
      if (b.id === id) {
        toast.success(`Đã quét vào cổng thành công cho đơn ${b.bookingCode}`);
        return { ...b, ticketStatus: "used", usedAt: timeStr };
      }
      return b;
    }));
  };

  const filtered = bookings.filter(b => {
    const matchSearch = b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        b.customerPhone.includes(searchTerm) ||
                        b.ticketName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTicketStatus = filterTicketStatus === "all" || b.ticketStatus === filterTicketStatus;
    const matchPayment = filterPayment === "all" || b.paymentStatus === filterPayment;
    return matchSearch && matchTicketStatus && matchPayment;
  });

  const totalRevenue = bookings
    .filter(b => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <Ticket className="text-sky-600" size={28} />
            Quản Lý Đơn Đặt Vé (Ticket Bookings)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Theo dõi đơn mua vé vui chơi trực tuyến, trạng thái quét QR vào cổng và hỗ trợ gửi lại vé điện tử
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_ticket_bookings");
              setBookings(INITIAL_BOOKINGS);
              toast.success("Đã khôi phục dữ liệu đơn vé chuẩn!");
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
            Tạo Đơn Đặt Vé Mới
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng Doanh Thu Vé</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {(totalRevenue / 1000000).toFixed(2)} tr đ
            </div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
            💰
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vé Đã Phát Hành</div>
            <div className="text-2xl font-black text-sky-600 mt-1">
              {bookings.filter(b => b.ticketStatus === "issued").length} đơn
            </div>
          </div>
          <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center font-bold">
            <Ticket size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đã Quét Vào Cổng</div>
            <div className="text-2xl font-black text-blue-600 mt-1">
              {bookings.filter(b => b.ticketStatus === "used").length} đơn
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tỷ Lệ Check-in</div>
            <div className="text-2xl font-black text-amber-600 mt-1">
              {Math.round((bookings.filter(b => b.ticketStatus === "used").length / (bookings.length || 1)) * 100)}%
            </div>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
            ⚡
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo mã đơn, tên khách, số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-sky-500"
          >
            <option value="all">Tất cả thanh toán</option>
            <option value="paid">Đã thanh toán</option>
            <option value="pending">Chờ thanh toán</option>
            <option value="refunded">Đã hoàn tiền</option>
          </select>

          <select
            value={filterTicketStatus}
            onChange={(e) => setFilterTicketStatus(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-sky-500"
          >
            <option value="all">Tất cả trạng thái vé</option>
            <option value="issued">Đã phát hành (Chưa quét)</option>
            <option value="used">Đã sử dụng / Check-in</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Mã Đơn Vé</th>
                <th className="p-4">Khách Hàng</th>
                <th className="p-4">Sản Phẩm Vé</th>
                <th className="p-4">Số Lượng</th>
                <th className="p-4">Tổng Tiền</th>
                <th className="p-4">Thanh Toán</th>
                <th className="p-4">Tình Trạng Vé</th>
                <th className="p-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4 font-mono font-bold text-xs text-sky-700">
                      {item.bookingCode}
                      <div className="text-[11px] font-sans text-slate-400 mt-0.5">{item.createdAt}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{item.customerName}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{item.customerPhone}</div>
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="font-bold text-slate-800 line-clamp-1">{item.ticketName}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.attraction}</div>
                    </td>
                    <td className="p-4 font-bold text-slate-800">
                      {item.quantity} vé
                    </td>
                    <td className="p-4 font-black text-slate-800 text-base">
                      {item.totalPrice?.toLocaleString()} đ
                    </td>
                    <td className="p-4">
                      {item.paymentStatus === "paid" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <CheckCircle2 size={12} />
                          Đã thanh toán
                        </span>
                      ) : item.paymentStatus === "pending" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100">
                          <Clock size={12} />
                          Chờ TT
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100">
                          Đã hoàn tiền
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {item.ticketStatus === "issued" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-600 border border-sky-100">
                          <Ticket size={13} />
                          Chưa sử dụng
                        </span>
                      ) : item.ticketStatus === "used" ? (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <CheckCircle2 size={13} />
                            Đã check-in
                          </span>
                          <div className="text-[10px] text-slate-400 mt-1">{item.usedAt}</div>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500">
                          Đã hủy
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setQrModalItem(item)}
                          className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
                          title="Xem mã QR vé"
                        >
                          <QrCode size={16} />
                        </button>
                        <button
                          onClick={() => handleResend(item.bookingCode, item.customerEmail)}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                          title="Gửi lại vé qua Email"
                        >
                          <Send size={16} />
                        </button>
                        {item.ticketStatus === "issued" && (
                          <button
                            onClick={() => handleCheckInNow(item.id)}
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition cursor-pointer"
                            title="Xác nhận khách vào cổng"
                          >
                            Quét Vào
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-400">
                    <Ticket className="mx-auto mb-2 opacity-30" size={40} />
                    Không tìm thấy đơn đặt vé nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Booking */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Ticket className="text-sky-600" size={20} />
                Tạo Đơn Mua Vé Mới
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
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Nhận Vé</label>
                <input
                  type="email"
                  placeholder="khachhang@gmail.com"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên Vé Vui Chơi *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Vé Cáp Treo Bà Nà Hills + Buffet"
                  value={formData.ticketName}
                  onChange={(e) => setFormData({ ...formData, ticketName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số Lượng Vé</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tổng Tiền (VNĐ) *</label>
                  <input
                    type="number"
                    required
                    value={formData.totalPrice}
                    onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-sky-600 focus:outline-none focus:border-sky-500"
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
                  Tạo Đơn Vé
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {qrModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <QrCode size={26} />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Vé Điện Tử & Mã QR Check-in</h3>
            <p className="text-xs text-slate-500 mt-1">{qrModalItem.ticketName}</p>

            <div className="my-6 p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl inline-block">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  `GOTICKET:BOOKING:${qrModalItem.bookingCode}:${qrModalItem.quantity}`
                )}`}
                alt="Booking Ticket QR"
                className="w-44 h-44 rounded-lg shadow-xs mx-auto"
              />
            </div>

            <div className="text-xs font-mono font-bold text-slate-600 mb-6 bg-slate-100 py-1.5 px-3 rounded-lg">
              MÃ ĐƠN: {qrModalItem.bookingCode} ({qrModalItem.quantity} vé)
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  toast.success("Đã tải xuống vé PDF!");
                }}
                className="flex-1 py-2.5 bg-sky-50 text-sky-600 hover:bg-sky-100 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-1"
              >
                <Download size={15} />
                Tải Vé PDF
              </button>
              <button
                onClick={() => setQrModalItem(null)}
                className="py-2.5 px-5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition cursor-pointer"
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
