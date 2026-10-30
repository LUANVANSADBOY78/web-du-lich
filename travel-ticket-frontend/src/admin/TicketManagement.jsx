import { useState, useEffect } from "react";
import { 
  Ticket, Plus, Search, Edit2, Trash2, Eye, QrCode, 
  CheckCircle2, XCircle, AlertCircle, RefreshCw, X, Download, Filter
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_TICKETS = [
  {
    id: 1,
    code: "TKT-BANA-001",
    name: "Vé Cáp Treo Bà Nà Hills + Buffet Trưa 80 Món",
    attraction: "Sun World Bà Nà Hills (Đà Nẵng)",
    type: "Vé Người Lớn",
    originalPrice: 1250000,
    price: 990000,
    totalStock: 500,
    sold: 412,
    validUntil: "31/12/2026",
    status: "active", // active, out_of_stock, paused
  },
  {
    id: 2,
    code: "TKT-BANA-002",
    name: "Vé Cáp Treo Bà Nà Hills Trẻ Em (1m - 1m4)",
    attraction: "Sun World Bà Nà Hills (Đà Nẵng)",
    type: "Vé Trẻ Em",
    originalPrice: 950000,
    price: 790000,
    totalStock: 300,
    sold: 198,
    validUntil: "31/12/2026",
    status: "active",
  },
  {
    id: 3,
    code: "TKT-VINW-001",
    name: "Vé VinWonders Phú Quốc Trọn Gói 1 Ngày",
    attraction: "VinWonders Phú Quốc (Kiên Giang)",
    type: "Vé Người Lớn",
    originalPrice: 950000,
    price: 880000,
    totalStock: 400,
    sold: 400,
    validUntil: "15/11/2026",
    status: "out_of_stock",
  },
  {
    id: 4,
    code: "TKT-SAFA-001",
    name: "Vé Vinpearl Safari Phú Quốc (Bao gồm xe bus chuyên dụng)",
    attraction: "Vinpearl Safari Phú Quốc",
    type: "Vé Người Lớn",
    originalPrice: 650000,
    price: 590000,
    totalStock: 350,
    sold: 280,
    validUntil: "30/11/2026",
    status: "active",
  },
  {
    id: 5,
    code: "TKT-FANS-001",
    name: "Vé Cáp Treo Fansipan Legend + Tàu Hỏa Mường Hoa",
    attraction: "Sun World Fansipan Legend (Sa Pa)",
    type: "Vé Người Lớn",
    originalPrice: 900000,
    price: 820000,
    totalStock: 250,
    sold: 165,
    validUntil: "31/12/2026",
    status: "active",
  },
  {
    id: 6,
    code: "TKT-HONT-001",
    name: "Vé Cáp Treo Hòn Thơm 2 Chiều + Công Viên Nước Aquatopia",
    attraction: "Sun World Hòn Thơm (Phú Quốc)",
    type: "Combo Buffet",
    originalPrice: 750000,
    price: 650000,
    totalStock: 200,
    sold: 190,
    validUntil: "25/12/2026",
    status: "active",
  }
];

export default function TicketManagement() {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_tickets");
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterAttraction, setFilterAttraction] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [qrModalTicket, setQrModalTicket] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    attraction: "Sun World Bà Nà Hills (Đà Nẵng)",
    type: "Vé Người Lớn",
    originalPrice: "",
    price: "",
    totalStock: 100,
    validUntil: "31/12/2026",
    status: "active"
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_tickets", JSON.stringify(tickets));
  }, [tickets]);

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingTicket(null);
    setFormData({
      name: "",
      code: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      attraction: "Sun World Bà Nà Hills (Đà Nẵng)",
      type: "Vé Người Lớn",
      originalPrice: "",
      price: "",
      totalStock: 100,
      validUntil: "31/12/2026",
      status: "active"
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (tkt) => {
    setEditingTicket(tkt);
    setFormData({
      name: tkt.name,
      code: tkt.code,
      attraction: tkt.attraction,
      type: tkt.type,
      originalPrice: tkt.originalPrice,
      price: tkt.price,
      totalStock: tkt.totalStock,
      validUntil: tkt.validUntil,
      status: tkt.status
    });
    setIsModalOpen(true);
  };

  // Submit Add or Edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      toast.error("Vui lòng điền tên vé và giá bán!");
      return;
    }

    if (editingTicket) {
      setTickets(tickets.map(t => t.id === editingTicket.id ? {
        ...t,
        ...formData,
        originalPrice: Number(formData.originalPrice) || Number(formData.price),
        price: Number(formData.price),
        totalStock: Number(formData.totalStock)
      } : t));
      toast.success("Cập nhật thông tin vé thành công!");
    } else {
      const newTkt = {
        id: Date.now(),
        ...formData,
        originalPrice: Number(formData.originalPrice) || Number(formData.price),
        price: Number(formData.price),
        totalStock: Number(formData.totalStock),
        sold: 0
      };
      setTickets([newTkt, ...tickets]);
      toast.success("Thêm sản phẩm vé mới thành công!");
    }

    setIsModalOpen(false);
  };

  // Delete Ticket
  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa vé "${name}"?`)) {
      setTickets(tickets.filter(t => t.id !== id));
      toast.success("Đã xóa vé thành công!");
    }
  };

  // Toggle Status
  const handleToggleStatus = (id) => {
    setTickets(tickets.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === "active" ? "paused" : "active";
        toast.success(`Đã đổi trạng thái sang: ${nextStatus === "active" ? "Đang mở bán" : "Tạm dừng"}`);
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  // Filtered List
  const filteredTickets = tickets.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        t.attraction.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAttraction = filterAttraction === "all" || t.attraction.includes(filterAttraction);
    const matchStatus = filterStatus === "all" || t.status === filterStatus;
    return matchSearch && matchAttraction && matchStatus;
  });

  const totalSold = tickets.reduce((acc, t) => acc + (t.sold || 0), 0);
  const totalRevenue = tickets.reduce((acc, t) => acc + ((t.sold || 0) * (t.price || 0)), 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <Ticket className="text-sky-600" size={28} />
            Quản Lý Vé Vui Chơi & Dịch Vụ
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Quản lý danh sách vé tham quan, cáp treo, công viên chủ đề và kiểm soát mã quét QR
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_tickets");
              setTickets(INITIAL_TICKETS);
              toast.success("Đã nạp lại dữ liệu vé chuẩn!");
            }}
            className="p-2.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            title="Làm mới dữ liệu"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md shadow-sky-600/20 transition cursor-pointer"
          >
            <Plus size={18} />
            Thêm Vé Mới
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng Sản Phẩm Vé</div>
            <div className="text-2xl font-black text-slate-800 mt-1">{tickets.length} loại vé</div>
          </div>
          <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center font-bold">
            <Ticket size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đang Mở Bán</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {tickets.filter(t => t.status === "active").length} sản phẩm
            </div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Số Vé Đã Bán</div>
            <div className="text-2xl font-black text-blue-600 mt-1">{totalSold.toLocaleString()} vé</div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
            <Download size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Doanh Thu Vé Ước Tính</div>
            <div className="text-2xl font-black text-amber-600 mt-1">{(totalRevenue / 1000000).toFixed(1)} tr đ</div>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
            💰
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên vé, mã vé, địa điểm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={filterAttraction}
            onChange={(e) => setFilterAttraction(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-sky-500"
          >
            <option value="all">Tất cả địa điểm</option>
            <option value="Bà Nà Hills">Bà Nà Hills</option>
            <option value="Phú Quốc">Phú Quốc</option>
            <option value="Fansipan">Fansipan Sa Pa</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-sky-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang mở bán</option>
            <option value="out_of_stock">Hết vé</option>
            <option value="paused">Tạm dừng</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Mã Vé</th>
                <th className="p-4">Tên Sản Phẩm Vé</th>
                <th className="p-4">Địa Điểm</th>
                <th className="p-4">Giá Bán</th>
                <th className="p-4">Tồn Kho / Đã Bán</th>
                <th className="p-4">Hạn Sử Dụng</th>
                <th className="p-4">Trạng Thái</th>
                <th className="p-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredTickets.length > 0 ? (
                filteredTickets.map((tkt) => {
                  const stockPercent = Math.min(100, Math.round(((tkt.sold || 0) / (tkt.totalStock || 1)) * 100));
                  return (
                    <tr key={tkt.id} className="hover:bg-slate-50/70 transition">
                      <td className="p-4 font-mono font-bold text-xs text-sky-700">
                        {tkt.code}
                      </td>
                      <td className="p-4 max-w-xs">
                        <div className="font-bold text-slate-800 line-clamp-1">{tkt.name}</div>
                        <span className="inline-block mt-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {tkt.type}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600 font-medium text-xs">
                        {tkt.attraction}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-sky-600">
                          {tkt.price?.toLocaleString()} đ
                        </div>
                        {tkt.originalPrice > tkt.price && (
                          <div className="text-xs text-slate-400 line-through">
                            {tkt.originalPrice?.toLocaleString()} đ
                          </div>
                        )}
                      </td>
                      <td className="p-4 min-w-[140px]">
                        <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                          <span>{tkt.sold || 0} đã bán</span>
                          <span className="text-slate-400">Kho: {tkt.totalStock}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              stockPercent >= 100 ? "bg-rose-500" : stockPercent > 70 ? "bg-amber-500" : "bg-emerald-500"
                            }`}
                            style={{ width: `${stockPercent}%` }}
                          />
                        </div>
                      </td>
                      <td className="p-4 text-slate-500 text-xs">
                        {tkt.validUntil}
                      </td>
                      <td className="p-4">
                        {tkt.status === "active" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Đang mở bán
                          </span>
                        ) : tkt.status === "out_of_stock" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            Hết vé
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            Tạm dừng
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setQrModalTicket(tkt)}
                            className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
                            title="Xem mã QR quét thử"
                          >
                            <QrCode size={16} />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(tkt)}
                            className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                            title="Chỉnh sửa vé"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(tkt.id)}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                            title="Bật/Tắt mở bán"
                          >
                            {tkt.status === "active" ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                          </button>
                          <button
                            onClick={() => handleDelete(tkt.id, tkt.name)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Xóa vé"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-400">
                    <Ticket className="mx-auto mb-2 opacity-30" size={40} />
                    Không tìm thấy vé nào phù hợp với bộ lọc.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Ticket className="text-sky-600" size={20} />
                {editingTicket ? "Chỉnh Sửa Thông Tin Vé" : "Thêm Vé Vui Chơi Mới"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên Vé Vui Chơi *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Vé Cáp Treo Bà Nà Hills + Buffet"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mã Vé</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Loại Vé</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  >
                    <option value="Vé Người Lớn">Vé Người Lớn</option>
                    <option value="Vé Trẻ Em">Vé Trẻ Em</option>
                    <option value="Vé Người Cao Tuổi">Vé Người Cao Tuổi</option>
                    <option value="Combo Buffet">Combo Buffet</option>
                    <option value="Vé FastPass VIP">Vé FastPass VIP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Thuộc Khu Du Lịch / Địa Điểm</label>
                <input
                  type="text"
                  value={formData.attraction}
                  onChange={(e) => setFormData({ ...formData, attraction: e.target.value })}
                  placeholder="Ví dụ: Sun World Bà Nà Hills (Đà Nẵng)"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Giá Bán (VNĐ) *</label>
                  <input
                    type="number"
                    required
                    placeholder="900000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Giá Gốc Niêm Yết</label>
                  <input
                    type="number"
                    placeholder="1100000"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số Lượng Kho Vé</label>
                  <input
                    type="number"
                    value={formData.totalStock}
                    onChange={(e) => setFormData({ ...formData, totalStock: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Hạn Dùng Đến</label>
                  <input
                    type="text"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Trạng Thái Mở Bán</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                >
                  <option value="active">Đang mở bán trực tuyến</option>
                  <option value="out_of_stock">Tạm hết vé</option>
                  <option value="paused">Tạm dừng bán</option>
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
                  {editingTicket ? "Lưu Cập Nhật" : "Tạo Vé Mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Preview Modal */}
      {qrModalTicket && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <QrCode size={26} />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Mã Quét Vào Cổng Điện Tử</h3>
            <p className="text-xs text-slate-500 mt-1">{qrModalTicket.name}</p>

            <div className="my-6 p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl inline-block">
              {/* Dynamic QR image */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  `GOTICKET:${qrModalTicket.code}:${qrModalTicket.price}`
                )}`}
                alt="Ticket QR Code"
                className="w-44 h-44 rounded-lg shadow-xs mx-auto"
              />
            </div>

            <div className="text-xs font-mono font-bold text-slate-600 mb-6 bg-slate-100 py-1.5 px-3 rounded-lg">
              CODE: {qrModalTicket.code}
            </div>

            <button
              onClick={() => setQrModalTicket(null)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm rounded-xl transition cursor-pointer"
            >
              Đóng Cửa Sổ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
