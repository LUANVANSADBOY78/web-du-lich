import { useState, useEffect } from "react";
import { 
  Briefcase, Plus, Search, Edit3, Trash2, CheckCircle2, 
  XCircle, RefreshCw, X, Phone, Mail, Building2, Percent
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_PARTNERS = [
  {
    id: 1,
    name: "Tập Đoàn Sun Group",
    code: "PARTNER-SUNG",
    field: "Khu Vui Chơi & Cáp Treo",
    contactPerson: "Nguyễn Thùy Linh (Trưởng phòng B2B)",
    phone: "0236 379 1999",
    email: "b2b.danang@sungroup.com.vn",
    discountRate: 15,
    contractNumber: "HD-SUN-2025/08",
    status: "active"
  },
  {
    id: 2,
    name: "Công Ty Cổ Phần Vinpearl",
    code: "PARTNER-VINP",
    field: "Công Viên & Resort Nghỉ Dưỡng",
    contactPerson: "Lê Minh Tuấn (Phụ trách Đại lý)",
    phone: "1900 23 23 89",
    email: "agency@vinpearl.com",
    discountRate: 18,
    contractNumber: "HD-VIN-2025/12",
    status: "active"
  },
  {
    id: 3,
    name: "Hãng Hàng Không Vietnam Airlines",
    code: "PARTNER-VNA",
    field: "Vé Máy Bay & Hàng Không",
    contactPerson: "Trần Quốc Hưng",
    phone: "024 3832 0320",
    email: "corp.sales@vietnamairlines.com",
    discountRate: 8,
    contractNumber: "HD-VNA-2026/01",
    status: "active"
  },
  {
    id: 4,
    name: "Chuỗi Khách Sạn Mường Thanh Hospitality",
    code: "PARTNER-MUONGT",
    field: "Khách Sạn & Lưu Trú",
    contactPerson: "Vũ Thị Hương",
    phone: "1900 1833",
    email: "reservation@muongthanh.vn",
    discountRate: 20,
    contractNumber: "HD-MT-2025/04",
    status: "active"
  }
];

export default function PartnerManagement() {
  const [partners, setPartners] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_partners");
    return saved ? JSON.parse(saved) : INITIAL_PARTNERS;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    field: "Khu Vui Chơi & Cáp Treo",
    contactPerson: "",
    phone: "",
    email: "",
    discountRate: 15,
    contractNumber: "",
    status: "active"
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_partners", JSON.stringify(partners));
  }, [partners]);

  const handleOpenAdd = () => {
    setEditingPartner(null);
    setFormData({
      name: "",
      code: `PARTNER-${Math.floor(100 + Math.random() * 900)}`,
      field: "Khu Vui Chơi & Cáp Treo",
      contactPerson: "",
      phone: "",
      email: "",
      discountRate: 15,
      contractNumber: `HD-${Math.floor(1000 + Math.random() * 9000)}/2026`,
      status: "active"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingPartner(p);
    setFormData({
      name: p.name,
      code: p.code,
      field: p.field,
      contactPerson: p.contactPerson,
      phone: p.phone,
      email: p.email,
      discountRate: p.discountRate,
      contractNumber: p.contractNumber,
      status: p.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Vui lòng điền đủ tên đối tác và hotline!");
      return;
    }

    if (editingPartner) {
      setPartners(partners.map(p => p.id === editingPartner.id ? { ...p, ...formData, discountRate: Number(formData.discountRate) } : p));
      toast.success("Cập nhật thông tin đối tác thành công!");
    } else {
      const newP = {
        id: Date.now(),
        ...formData,
        discountRate: Number(formData.discountRate)
      };
      setPartners([...partners, newP]);
      toast.success("Thêm đối tác cung cấp mới thành công!");
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id) => {
    setPartners(partners.map(p => {
      if (p.id === id) {
        const next = p.status === "active" ? "paused" : "active";
        toast.success(`Đã đổi trạng thái hợp tác sang: ${next === "active" ? "Đang hợp tác" : "Tạm dừng"}`);
        return { ...p, status: next };
      }
      return p;
    }));
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa đối tác "${name}"?`)) {
      setPartners(partners.filter(p => p.id !== id));
      toast.success("Đã xóa đối tác!");
    }
  };

  const filtered = partners.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchField = filterField === "all" || p.field === filterField;
    return matchSearch && matchField;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <Briefcase className="text-sky-600" size={28} />
            Quản Lý Đối Tác Cung Cấp (Partners & Vendors)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Danh bạ nhà cung cấp dịch vụ du lịch, hợp đồng B2B, hãng hàng không và các tập đoàn khách sạn
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_partners");
              setPartners(INITIAL_PARTNERS);
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
            Thêm Đối Tác Mới
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên đối tác, người liên hệ, mã..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={filterField}
            onChange={(e) => setFilterField(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-sky-500"
          >
            <option value="all">Tất cả lĩnh vực</option>
            <option value="Khu Vui Chơi & Cáp Treo">Khu Vui Chơi & Cáp Treo</option>
            <option value="Công Viên & Resort Nghỉ Dưỡng">Công Viên & Resort Nghỉ Dưỡng</option>
            <option value="Vé Máy Bay & Hàng Không">Vé Máy Bay & Hàng Không</option>
            <option value="Khách Sạn & Lưu Trú">Khách Sạn & Lưu Trú</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Mã Đối Tác</th>
                <th className="p-4">Tên Đối Tác / Doanh Nghiệp</th>
                <th className="p-4">Lĩnh Vực Dịch Vụ</th>
                <th className="p-4">Đại Diện Liên Hệ</th>
                <th className="p-4">Chiết Khấu B2B</th>
                <th className="p-4">Số Hợp Đồng</th>
                <th className="p-4">Trạng Thái</th>
                <th className="p-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition">
                  <td className="p-4 font-mono font-bold text-xs text-sky-700">
                    {p.code}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{p.name}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      {p.field}
                    </span>
                  </td>
                  <td className="p-4 text-xs space-y-0.5">
                    <div className="font-semibold text-slate-800">{p.contactPerson}</div>
                    <div className="text-slate-400 font-mono">{p.phone}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-black text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                      -{p.discountRate}%
                    </span>
                  </td>
                  <td className="p-4 text-xs font-mono text-slate-600">
                    {p.contractNumber}
                  </td>
                  <td className="p-4">
                    {p.status === "active" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        Đang hợp tác
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-500">
                        Tạm dừng
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleToggleStatus(p.id)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        title="Bật/Tắt hợp tác"
                      >
                        {p.status === "active" ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      </button>
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
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
              {editingPartner ? "Sửa Thông Tin Đối Tác" : "Thêm Đối Tác Cung Cấp Mới"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên Đối Tác / Tập Đoàn *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Tập Đoàn Sun Group"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mã Đối Tác</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Chiết Khấu B2B (%)</label>
                  <input
                    type="number"
                    value={formData.discountRate}
                    onChange={(e) => setFormData({ ...formData, discountRate: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Lĩnh Vực</label>
                <select
                  value={formData.field}
                  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                >
                  <option value="Khu Vui Chơi & Cáp Treo">Khu Vui Chơi & Cáp Treo</option>
                  <option value="Công Viên & Resort Nghỉ Dưỡng">Công Viên & Resort Nghỉ Dưỡng</option>
                  <option value="Vé Máy Bay & Hàng Không">Vé Máy Bay & Hàng Không</option>
                  <option value="Khách Sạn & Lưu Trú">Khách Sạn & Lưu Trú</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Người Đại Diện</label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Hotline / SĐT *</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
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
                  Lưu Đối Tác
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
