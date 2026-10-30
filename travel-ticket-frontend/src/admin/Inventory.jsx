import { useState, useEffect } from "react";
import { 
  Archive, Plus, Search, Edit3, Trash2, AlertTriangle, 
  CheckCircle2, XCircle, RefreshCw, X, TrendingUp, Layers, ArrowUpRight
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_INVENTORY = [
  {
    id: 1,
    batchCode: "LOT-BANA-202610A",
    productName: "Vé Cáp Treo Bà Nà Hills + Buffet",
    attraction: "Sun World Bà Nà Hills",
    appliedDate: "30/10/2026",
    totalCapacity: 600,
    released: 485,
    remaining: 115,
    unitPrice: 990000,
    status: "available", // available, low_stock, out_of_stock, locked
    supplier: "Sun Group Da Nang",
  },
  {
    id: 2,
    batchCode: "LOT-BANA-202610B",
    productName: "Vé Cáp Treo Bà Nà Hills Trẻ Em",
    attraction: "Sun World Bà Nà Hills",
    appliedDate: "30/10/2026",
    totalCapacity: 300,
    released: 285,
    remaining: 15,
    unitPrice: 790000,
    status: "low_stock",
    supplier: "Sun Group Da Nang",
  },
  {
    id: 3,
    batchCode: "LOT-VINW-202610C",
    productName: "Vé VinWonders Phú Quốc Trọn Gói",
    attraction: "VinWonders Phú Quốc",
    appliedDate: "31/10/2026",
    totalCapacity: 500,
    released: 500,
    remaining: 0,
    unitPrice: 880000,
    status: "out_of_stock",
    supplier: "Vinpearl Kiên Giang",
  },
  {
    id: 4,
    batchCode: "LOT-SAFA-202610D",
    productName: "Vé Vinpearl Safari Phú Quốc",
    attraction: "Vinpearl Safari",
    appliedDate: "31/10/2026",
    totalCapacity: 400,
    released: 220,
    remaining: 180,
    unitPrice: 590000,
    status: "available",
    supplier: "Vinpearl Kiên Giang",
  },
  {
    id: 5,
    batchCode: "LOT-FANS-202611A",
    productName: "Vé Cáp Treo Fansipan Legend Sa Pa",
    attraction: "Sun World Fansipan",
    appliedDate: "01/11/2026",
    totalCapacity: 350,
    released: 120,
    remaining: 230,
    unitPrice: 820000,
    status: "available",
    supplier: "Sun World Fansipan",
  },
  {
    id: 6,
    batchCode: "LOT-HONT-202611B",
    productName: "Vé Cáp Treo Hòn Thơm 2 Chiều",
    attraction: "Sun World Hòn Thơm",
    appliedDate: "02/11/2026",
    totalCapacity: 250,
    released: 235,
    remaining: 15,
    unitPrice: 650000,
    status: "low_stock",
    supplier: "Sun World Hòn Thơm",
  }
];

export default function Inventory() {
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_inventory");
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterAttraction, setFilterAttraction] = useState("all");

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [adjustModalItem, setAdjustModalItem] = useState(null);
  const [adjustAmount, setAdjustAmount] = useState(50);

  // Form State
  const [formData, setFormData] = useState({
    batchCode: "",
    productName: "",
    attraction: "Sun World Bà Nà Hills",
    appliedDate: "30/10/2026",
    totalCapacity: 200,
    unitPrice: 850000,
    supplier: "Sun Group"
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_inventory", JSON.stringify(inventory));
  }, [inventory]);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      batchCode: `LOT-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getMonth() + 1}`,
      productName: "",
      attraction: "Sun World Bà Nà Hills",
      appliedDate: new Date().toISOString().slice(0, 10).split('-').reverse().join('/'),
      totalCapacity: 300,
      unitPrice: 800000,
      supplier: "Sun Group"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      batchCode: item.batchCode,
      productName: item.productName,
      attraction: item.attraction,
      appliedDate: item.appliedDate,
      totalCapacity: item.totalCapacity,
      unitPrice: item.unitPrice,
      supplier: item.supplier
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productName) {
      toast.error("Vui lòng điền tên sản phẩm vé!");
      return;
    }

    if (editingItem) {
      setInventory(inventory.map(item => {
        if (item.id === editingItem.id) {
          const cap = Number(formData.totalCapacity);
          const rel = item.released;
          const rem = Math.max(0, cap - rel);
          let st = "available";
          if (rem === 0) st = "out_of_stock";
          else if (rem <= 30) st = "low_stock";

          return {
            ...item,
            ...formData,
            totalCapacity: cap,
            remaining: rem,
            status: st,
            unitPrice: Number(formData.unitPrice)
          };
        }
        return item;
      }));
      toast.success("Cập nhật lô kho vé thành công!");
    } else {
      const cap = Number(formData.totalCapacity);
      const newItem = {
        id: Date.now(),
        ...formData,
        totalCapacity: cap,
        released: 0,
        remaining: cap,
        unitPrice: Number(formData.unitPrice),
        status: cap > 30 ? "available" : "low_stock"
      };
      setInventory([newItem, ...inventory]);
      toast.success("Nhập kho lô vé mới thành công!");
    }

    setIsModalOpen(false);
  };

  const handleAdjustStock = () => {
    if (!adjustModalItem) return;
    const added = Number(adjustAmount);
    setInventory(inventory.map(item => {
      if (item.id === adjustModalItem.id) {
        const newCap = item.totalCapacity + added;
        const newRem = Math.max(0, item.remaining + added);
        let st = "available";
        if (newRem === 0) st = "out_of_stock";
        else if (newRem <= 30) st = "low_stock";
        return {
          ...item,
          totalCapacity: newCap,
          remaining: newRem,
          status: st
        };
      }
      return item;
    }));
    toast.success(`Đã bổ sung +${added} vé vào kho "${adjustModalItem.productName}"`);
    setAdjustModalItem(null);
  };

  const handleDelete = (id, code) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa lô kho ${code}?`)) {
      setInventory(inventory.filter(i => i.id !== id));
      toast.success("Đã xóa lô kho vé!");
    }
  };

  const handleToggleLock = (id) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === "locked" ? (item.remaining > 30 ? "available" : "low_stock") : "locked";
        toast.success(`Đã ${nextStatus === "locked" ? "khóa xuất vé" : "mở khóa xuất vé"}`);
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const filtered = inventory.filter(item => {
    const matchSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.batchCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.attraction.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "all" || item.status === filterStatus;
    const matchAttraction = filterAttraction === "all" || item.attraction.includes(filterAttraction);
    return matchSearch && matchStatus && matchAttraction;
  });

  const totalRemaining = inventory.reduce((a, b) => a + b.remaining, 0);
  const totalReleased = inventory.reduce((a, b) => a + b.released, 0);
  const lowStockCount = inventory.filter(i => i.status === "low_stock" || i.status === "out_of_stock").length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <Archive className="text-sky-600" size={28} />
            Quản Lý Kho Vé & Hạn Mức Ngày (Inventory)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Kiểm soát số lượng vé nhập khẩu, theo dõi tồn kho theo ngày và cảnh báo hết vé tức thời
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_inventory");
              setInventory(INITIAL_INVENTORY);
              toast.success("Đã nạp lại dữ liệu kho vé chuẩn!");
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
            Nhập Kho Vé Mới
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng Vé Còn Lại</div>
            <div className="text-2xl font-black text-slate-800 mt-1">{totalRemaining.toLocaleString()} vé</div>
          </div>
          <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center font-bold">
            <Layers size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vé Đã Xuất / Đã Bán</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">{totalReleased.toLocaleString()} vé</div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cảnh Báo Sắp Hết</div>
            <div className="text-2xl font-black text-amber-600 mt-1">{lowStockCount} lô vé</div>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
            <AlertTriangle size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tỷ Lệ Bán Hết</div>
            <div className="text-2xl font-black text-blue-600 mt-1">
              {Math.round((totalReleased / (totalReleased + totalRemaining || 1)) * 100)}%
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
            <ArrowUpRight size={24} />
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo mã lô, tên vé, khu vui chơi..."
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
            <option value="VinWonders">VinWonders</option>
            <option value="Fansipan">Fansipan</option>
            <option value="Hòn Thơm">Hòn Thơm</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-sky-500"
          >
            <option value="all">Tất cả tình trạng</option>
            <option value="available">Tồn kho an toàn</option>
            <option value="low_stock">Sắp hết hàng</option>
            <option value="out_of_stock">Đã hết vé</option>
            <option value="locked">Đã khóa</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Mã Lô Kho</th>
                <th className="p-4">Sản Phẩm Vé</th>
                <th className="p-4">Ngày Áp Dụng</th>
                <th className="p-4">Tổng Hạn Mức</th>
                <th className="p-4">Đã Xuất Vé</th>
                <th className="p-4">Tồn Kho Khả Dụng</th>
                <th className="p-4">Tình Trạng</th>
                <th className="p-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.length > 0 ? (
                filtered.map((item) => {
                  const percent = Math.min(100, Math.round((item.released / item.totalCapacity) * 100));
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition">
                      <td className="p-4 font-mono font-bold text-xs text-sky-700">
                        {item.batchCode}
                        <div className="text-[11px] font-sans text-slate-400 font-normal mt-0.5">{item.supplier}</div>
                      </td>
                      <td className="p-4 max-w-xs">
                        <div className="font-bold text-slate-800 line-clamp-1">{item.productName}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{item.attraction}</div>
                      </td>
                      <td className="p-4 text-xs font-medium text-slate-700">
                        {item.appliedDate}
                      </td>
                      <td className="p-4 font-bold text-slate-800">
                        {item.totalCapacity} vé
                      </td>
                      <td className="p-4 text-emerald-600 font-bold">
                        {item.released} vé
                      </td>
                      <td className="p-4 min-w-[130px]">
                        <div className="font-black text-slate-800 text-base">
                          {item.remaining} <span className="text-xs font-normal text-slate-500">vé</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
                          <div 
                            className={`h-full rounded-full ${
                              item.remaining === 0 ? "bg-rose-500" : item.remaining <= 30 ? "bg-amber-500" : "bg-emerald-500"
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        {item.status === "available" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <CheckCircle2 size={13} />
                            Dồi dào
                          </span>
                        ) : item.status === "low_stock" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100">
                            <AlertTriangle size={13} />
                            Sắp hết ({item.remaining})
                          </span>
                        ) : item.status === "out_of_stock" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100">
                            <XCircle size={13} />
                            Hết hàng
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                            Đã khóa
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => { setAdjustModalItem(item); setAdjustAmount(50); }}
                            className="px-2.5 py-1 text-xs font-bold bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-lg transition cursor-pointer"
                            title="Thêm số lượng vào kho"
                          >
                            + Nhập Thêm
                          </button>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                            title="Sửa lô kho"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleToggleLock(item.id)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                            title={item.status === "locked" ? "Mở khóa" : "Khóa xuất vé"}
                          >
                            {item.status === "locked" ? <CheckCircle2 size={16} className="text-emerald-500" /> : <XCircle size={16} />}
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.batchCode)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Xóa lô"
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
                    <Archive className="mx-auto mb-2 opacity-30" size={40} />
                    Không tìm thấy lô kho vé nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Lot */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Archive className="text-sky-600" size={20} />
                {editingItem ? "Chỉnh Sửa Lô Kho Vé" : "Nhập Kho Lô Vé Mới"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên Sản Phẩm Vé *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Vé Cáp Treo Bà Nà Hills + Buffet Trưa"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mã Lô Nhập Kho</label>
                  <input
                    type="text"
                    value={formData.batchCode}
                    onChange={(e) => setFormData({ ...formData, batchCode: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ngày Áp Dụng</label>
                  <input
                    type="text"
                    value={formData.appliedDate}
                    onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tổng Số Lượng Nhập</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.totalCapacity}
                    onChange={(e) => setFormData({ ...formData, totalCapacity: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Giá Nhập Gốc (VNĐ)</label>
                  <input
                    type="number"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Khu Vui Chơi</label>
                  <input
                    type="text"
                    value={formData.attraction}
                    onChange={(e) => setFormData({ ...formData, attraction: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nhà Cung Cấp / Đối Tác</label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
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
                  {editingItem ? "Lưu Thay Đổi" : "Xác Nhận Nhập Kho"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Adjust Stock Modal */}
      {adjustModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-sm w-full p-6 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-slate-800 text-lg mb-1">Bổ Sung Số Lượng Vé Vào Kho</h3>
            <p className="text-xs text-slate-500 mb-4">{adjustModalItem.productName} ({adjustModalItem.batchCode})</p>

            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số lượng vé muốn nhập thêm</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={adjustAmount}
                  onChange={(e) => setAdjustAmount(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-sky-600 focus:outline-none focus:border-sky-500"
                />
                <span className="text-sm font-semibold text-slate-500">vé</span>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              {[20, 50, 100, 200].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAdjustAmount(val)}
                  className="flex-1 py-1 bg-slate-100 hover:bg-sky-50 hover:text-sky-600 text-xs font-bold text-slate-600 rounded-lg transition"
                >
                  +{val}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setAdjustModalItem(null)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-bold rounded-xl transition text-sm cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleAdjustStock}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl transition text-sm cursor-pointer"
              >
                Cộng Vào Kho
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
