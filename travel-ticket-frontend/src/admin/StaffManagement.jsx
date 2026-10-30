import { useState, useEffect } from "react";
import { 
  UserCog, Plus, Search, Edit3, Trash2, ShieldCheck, 
  CheckCircle2, XCircle, RefreshCw, X, Mail, Phone, Calendar
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_STAFF = [
  {
    id: 1,
    name: "Lê Hoàng Luân",
    code: "STF-001",
    role: "Super Admin (Quản Trị Tối Cao)",
    department: "Ban Giám Đốc",
    email: "luan.le@gotravel.vn",
    phone: "0901234567",
    joinedDate: "01/01/2024",
    status: "active"
  },
  {
    id: 2,
    name: "Nguyễn Thị Thu Thảo",
    code: "STF-002",
    role: "Tour Operator (Điều Hành Tour)",
    department: "Phòng Tour & Tuyến",
    email: "thao.nguyen@gotravel.vn",
    phone: "0912345678",
    joinedDate: "15/03/2024",
    status: "active"
  },
  {
    id: 3,
    name: "Phạm Minh Hùng",
    code: "STF-003",
    role: "Accountant (Kế Toán & Thu Chi)",
    department: "Phòng Tài Chính - Kế Toán",
    email: "hung.pham@gotravel.vn",
    phone: "0987654321",
    joinedDate: "10/06/2024",
    status: "active"
  },
  {
    id: 4,
    name: "Trần Bảo Ngọc",
    code: "STF-004",
    role: "CSKH & Live Chat Support",
    department: "Phòng Chăm Sóc Khách Hàng",
    email: "ngoc.tran@gotravel.vn",
    phone: "0933445566",
    joinedDate: "01/09/2024",
    status: "active"
  },
  {
    id: 5,
    name: "Đỗ Gia Huy",
    code: "STF-005",
    role: "Ticket Specialist (Quản Lý Vé)",
    department: "Phòng Vé Vui Chơi",
    email: "huy.do@gotravel.vn",
    phone: "0944556677",
    joinedDate: "15/11/2024",
    status: "active"
  }
];

export default function StaffManagement() {
  const [staffList, setStaffList] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_staff");
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    role: "Tour Operator (Điều Hành Tour)",
    department: "Phòng Tour & Tuyến",
    email: "",
    phone: "",
    status: "active"
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_staff", JSON.stringify(staffList));
  }, [staffList]);

  const handleOpenAdd = () => {
    setEditingStaff(null);
    setFormData({
      name: "",
      code: `STF-${Math.floor(100 + Math.random() * 900)}`,
      role: "Tour Operator (Điều Hành Tour)",
      department: "Phòng Tour & Tuyến",
      email: "",
      phone: "",
      status: "active"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s) => {
    setEditingStaff(s);
    setFormData({
      name: s.name,
      code: s.code,
      role: s.role,
      department: s.department,
      email: s.email,
      phone: s.phone,
      status: s.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Vui lòng nhập tên và email nhân viên!");
      return;
    }

    if (editingStaff) {
      setStaffList(staffList.map(s => s.id === editingStaff.id ? { ...s, ...formData } : s));
      toast.success("Cập nhật thông tin nhân viên thành công!");
    } else {
      const newS = {
        id: Date.now(),
        ...formData,
        joinedDate: new Date().toLocaleDateString("vi-VN")
      };
      setStaffList([...staffList, newS]);
      toast.success("Thêm nhân viên mới thành công!");
    }
    setIsModalOpen(false);
  };

  const handleToggleLock = (id) => {
    setStaffList(staffList.map(s => {
      if (s.id === id) {
        const next = s.status === "active" ? "locked" : "active";
        toast.success(`Đã ${next === "active" ? "mở khóa" : "khóa"} tài khoản nhân viên ${s.name}`);
        return { ...s, status: next };
      }
      return s;
    }));
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa nhân viên "${name}"?`)) {
      setStaffList(staffList.filter(s => s.id !== id));
      toast.success("Đã xóa nhân viên!");
    }
  };

  const filtered = staffList.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.phone.includes(searchTerm);
    const matchDept = filterDept === "all" || s.department === filterDept;
    return matchSearch && matchDept;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <UserCog className="text-sky-600" size={28} />
            Quản Lý Nhân Viên Nội Bộ (Staff Management)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Danh sách nhân viên, tài khoản phân quyền truy cập hệ thống và phòng ban phụ trách
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_staff");
              setStaffList(INITIAL_STAFF);
              toast.success("Đã khôi phục dữ liệu nhân viên chuẩn!");
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
            Thêm Nhân Viên Mới
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên nhân viên, email, SĐT, mã NV..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-medium focus:outline-none focus:border-sky-500"
          >
            <option value="all">Tất cả phòng ban</option>
            <option value="Ban Giám Đốc">Ban Giám Đốc</option>
            <option value="Phòng Tour & Tuyến">Phòng Tour & Tuyến</option>
            <option value="Phòng Tài Chính - Kế Toán">Phòng Tài Chính - Kế Toán</option>
            <option value="Phòng Chăm Sóc Khách Hàng">Phòng Chăm Sóc Khách Hàng</option>
            <option value="Phòng Vé Vui Chơi">Phòng Vé Vui Chơi</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Mã NV</th>
                <th className="p-4">Họ Và Tên</th>
                <th className="p-4">Chức Vụ & Quyền Hạn</th>
                <th className="p-4">Phòng Ban</th>
                <th className="p-4">Liên Hệ</th>
                <th className="p-4">Ngày Tham Gia</th>
                <th className="p-4">Trạng Thái</th>
                <th className="p-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition">
                  <td className="p-4 font-mono font-bold text-xs text-sky-700">
                    {s.code}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{s.name}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-xs text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                      {s.role}
                    </span>
                  </td>
                  <td className="p-4 text-xs font-medium text-slate-600">
                    {s.department}
                  </td>
                  <td className="p-4 text-xs text-slate-600 space-y-0.5">
                    <div className="flex items-center gap-1 font-mono">
                      <Mail size={12} className="text-slate-400" /> {s.email}
                    </div>
                    <div className="flex items-center gap-1 font-mono">
                      <Phone size={12} className="text-slate-400" /> {s.phone}
                    </div>
                  </td>
                  <td className="p-4 text-xs text-slate-500">
                    {s.joinedDate}
                  </td>
                  <td className="p-4">
                    {s.status === "active" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        Đang làm việc
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100">
                        Đã khóa
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleToggleLock(s.id)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        title={s.status === "active" ? "Khóa tài khoản" : "Mở khóa"}
                      >
                        {s.status === "active" ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      </button>
                      <button
                        onClick={() => handleOpenEdit(s)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id, s.name)}
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
              {editingStaff ? "Sửa Thông Tin Nhân Viên" : "Thêm Nhân Viên Mới"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Họ Và Tên *</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mã Nhân Viên</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số Điện Thoại</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Công Ty *</label>
                <input
                  type="email"
                  required
                  placeholder="nhanvien@gotravel.vn"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phòng Ban</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Ban Giám Đốc">Ban Giám Đốc</option>
                    <option value="Phòng Tour & Tuyến">Phòng Tour & Tuyến</option>
                    <option value="Phòng Tài Chính - Kế Toán">Phòng Tài Chính - Kế Toán</option>
                    <option value="Phòng Chăm Sóc Khách Hàng">Phòng Chăm Sóc Khách Hàng</option>
                    <option value="Phòng Vé Vui Chơi">Phòng Vé Vui Chơi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Chức Vụ</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
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
                  Lưu Nhân Viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
