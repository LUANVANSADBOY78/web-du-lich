import { useState, useEffect } from "react";
import {
  ShieldCheck, Users, Plus, Edit2, Trash2, Check, Lock, Save,
  AlertCircle, Shield, Key, RotateCcw
} from "lucide-react";
import { toast } from "react-toastify";

const MODULES = [
  { id: "tours", name: "Quản Lý Tour Du Lịch", desc: "Tạo tour, lịch trình, giá bán, hướng dẫn viên" },
  { id: "tickets", name: "Vé Vui Chơi & Kho Chỗ", desc: "Quản lý điểm đến, loại vé, kho barcode, check-in" },
  { id: "bookings", name: "Đơn Đặt & Đặt Chỗ", desc: "Xem đơn hàng, hủy chỗ, đổi ngày, waitlist" },
  { id: "payments", name: "Thanh Toán & Hoàn Tiền", desc: "Duyệt giao dịch, hoàn tiền VNPay/Momo, hóa đơn VAT" },
  { id: "marketing", name: "Khuyến Mãi & Voucher", desc: "Flash sale, combo, banner, chương trình affiliate" },
  { id: "users", name: "Khách Hàng & Nhân Sự", desc: "Tài khoản khách, nhân viên, đối tác đại lý" },
  { id: "content", name: "Đánh Giá & Hỏi Đáp (Q&A)", desc: "Duyệt review 5 sao, trả lời Q&A, bài viết blog" },
  { id: "support", name: "Live Chat & Hỗ Trợ", desc: "Hộp thư trực tuyến, tiếp nhận ticket CSKH" },
  { id: "system", name: "Cấu Hình & Phân Quyền", desc: "Cài đặt cổng thanh toán, API key, log hệ thống" }
];

const ACTIONS = [
  { id: "view", label: "Xem" },
  { id: "create", label: "Thêm" },
  { id: "edit", label: "Sửa" },
  { id: "delete", label: "Xóa" },
  { id: "export", label: "Xuất file" }
];

const INITIAL_ROLES = [
  {
    id: "super_admin",
    name: "Super Admin",
    description: "Toàn quyền quản trị cao nhất, truy cập mọi module và cấu hình hệ thống.",
    userCount: 2,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
    isSystem: true,
    permissions: MODULES.reduce((acc, m) => {
      acc[m.id] = ["view", "create", "edit", "delete", "export"];
      return acc;
    }, {})
  },
  {
    id: "tour_manager",
    name: "Quản Lý Tour & Vé",
    description: "Quản lý sản phẩm tour, lịch khởi hành, kho vé và phân công hướng dẫn viên.",
    userCount: 5,
    color: "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300",
    isSystem: false,
    permissions: {
      tours: ["view", "create", "edit", "delete", "export"],
      tickets: ["view", "create", "edit", "delete", "export"],
      bookings: ["view", "create", "edit", "export"],
      payments: ["view"],
      marketing: ["view", "create", "edit"],
      users: ["view"],
      content: ["view", "create", "edit"],
      support: ["view"],
      system: []
    }
  },
  {
    id: "accountant",
    name: "Kế Toán & Thu Chi",
    description: "Kiểm soát dòng tiền thanh toán, thực hiện hoàn tiền và xuất hóa đơn VAT.",
    userCount: 3,
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
    isSystem: false,
    permissions: {
      tours: ["view"],
      tickets: ["view"],
      bookings: ["view", "export"],
      payments: ["view", "create", "edit", "delete", "export"],
      marketing: ["view"],
      users: ["view"],
      content: ["view"],
      support: ["view"],
      system: []
    }
  },
  {
    id: "support_agent",
    name: "Chuyên Viên CSKH",
    description: "Hỗ trợ khách hàng qua Live Chat, trả lời Q&A và giải đáp khiếu nại.",
    userCount: 8,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
    isSystem: false,
    permissions: {
      tours: ["view"],
      tickets: ["view"],
      bookings: ["view", "edit"],
      payments: ["view"],
      marketing: ["view"],
      users: ["view"],
      content: ["view", "create", "edit"],
      support: ["view", "create", "edit", "delete"],
      system: []
    }
  }
];

export default function RolesManagement() {
  const [roles, setRoles] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_roles");
    return saved ? JSON.parse(saved) : INITIAL_ROLES;
  });

  const [activeRoleId, setActiveRoleId] = useState("tour_manager");
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [newRoleData, setNewRoleData] = useState({
    name: "",
    description: "",
    copyFrom: "support_agent"
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_roles", JSON.stringify(roles));
  }, [roles]);

  const activeRole = roles.find((r) => r.id === activeRoleId) || roles[0];

  const handleTogglePermission = (moduleId, actionId) => {
    if (activeRole.isSystem) {
      toast.warning("Vai trò Super Admin sở hữu toàn bộ quyền và không thể gỡ bỏ!");
      return;
    }

    const currentModulePerms = activeRole.permissions[moduleId] || [];
    const hasPerm = currentModulePerms.includes(actionId);

    const updatedModulePerms = hasPerm
      ? currentModulePerms.filter((a) => a !== actionId)
      : [...currentModulePerms, actionId];

    const updatedRole = {
      ...activeRole,
      permissions: {
        ...activeRole.permissions,
        [moduleId]: updatedModulePerms
      }
    };

    setRoles(roles.map((r) => (r.id === activeRole.id ? updatedRole : r)));
  };

  const handleToggleAllForModule = (moduleId) => {
    if (activeRole.isSystem) return;

    const currentModulePerms = activeRole.permissions[moduleId] || [];
    const allActionIds = ACTIONS.map((a) => a.id);
    const hasAll = allActionIds.every((a) => currentModulePerms.includes(a));

    const updatedRole = {
      ...activeRole,
      permissions: {
        ...activeRole.permissions,
        [moduleId]: hasAll ? [] : allActionIds
      }
    };

    setRoles(roles.map((r) => (r.id === activeRole.id ? updatedRole : r)));
  };

  const handleSaveRoleChanges = () => {
    localStorage.setItem("gotravel_admin_roles", JSON.stringify(roles));
    toast.success(`Đã lưu cập nhật ma trận quyền cho vai trò "${activeRole.name}"!`);
  };

  const handleCreateNewRole = (e) => {
    e.preventDefault();
    if (!newRoleData.name.trim()) {
      toast.error("Vui lòng nhập tên vai trò!");
      return;
    }

    const templateRole = roles.find((r) => r.id === newRoleData.copyFrom) || roles[0];
    const newId = `role_${Date.now()}`;
    const newRole = {
      id: newId,
      name: newRoleData.name,
      description: newRoleData.description || "Vai trò tùy chỉnh hệ thống GoTravel.",
      userCount: 0,
      color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300",
      isSystem: false,
      permissions: JSON.parse(JSON.stringify(templateRole.permissions))
    };

    setRoles([...roles, newRole]);
    setActiveRoleId(newId);
    setIsAddRoleModalOpen(false);
    setNewRoleData({ name: "", description: "", copyFrom: "support_agent" });
    toast.success("Tạo vai trò mới thành công!");
  };

  const handleDeleteRole = (roleId) => {
    const roleToDelete = roles.find((r) => r.id === roleId);
    if (!roleToDelete) return;
    if (roleToDelete.isSystem) {
      toast.error("Không thể xóa vai trò mặc định của hệ thống!");
      return;
    }

    if (window.confirm(`Bạn có chắc muốn xóa vai trò "${roleToDelete.name}"?`)) {
      setRoles(roles.filter((r) => r.id !== roleId));
      setActiveRoleId("super_admin");
      toast.success("Đã xóa vai trò!");
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="text-sky-600" /> Phân Quyền & Vai Trò Hệ Thống (Roles & Permissions)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Thiết lập vai trò quản trị viên, phân chia quyền hạn truy cập module và hành động chi tiết
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_roles");
              setRoles(INITIAL_ROLES);
              setActiveRoleId("tour_manager");
              toast.info("Đã khôi phục ma trận quyền mặc định!");
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition"
          >
            <RotateCcw size={14} /> Mẫu dữ liệu
          </button>
          <button
            onClick={() => setIsAddRoleModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl shadow-sm transition"
          >
            <Plus size={18} /> Thêm Vai Trò Mới
          </button>
        </div>
      </div>

      {/* Roles Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((r) => {
          const isSelected = r.id === activeRoleId;
          return (
            <div
              key={r.id}
              onClick={() => setActiveRoleId(r.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition relative flex flex-col justify-between ${
                isSelected
                  ? "bg-sky-50/50 dark:bg-sky-950/20 border-sky-500 dark:border-sky-500 shadow-sm ring-2 ring-sky-500/20"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.color}`}>
                    {r.name}
                  </span>
                  {r.isSystem ? (
                    <span title="Vai trò hệ thống bảo vệ" className="text-slate-400">
                      <Lock size={14} />
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRole(r.id);
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {r.description}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1">
                  <Users size={12} /> {r.userCount} tài khoản
                </span>
                {isSelected && (
                  <span className="text-sky-600 font-bold flex items-center gap-1 text-[11px]">
                    <Check size={12} /> Đang chọn
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Permission Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50 dark:bg-slate-800/40">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Key size={18} className="text-sky-600" />
              Chi Tiết Phân Quyền: <span className="text-sky-600">{activeRole.name}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Tích chọn các hành động được phép thực thi trong từng module nghiệp vụ
            </p>
          </div>

          <button
            onClick={handleSaveRoleChanges}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-sm shadow-sm transition"
          >
            <Save size={16} /> Lưu Ma Trận Quyền
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 text-xs uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 w-1/3">Module / Chức năng</th>
                {ACTIONS.map((act) => (
                  <th key={act.id} className="px-4 py-4 text-center">
                    {act.label}
                  </th>
                ))}
                <th className="px-4 py-4 text-center">Chọn tất cả</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {MODULES.map((m) => {
                const currentPerms = activeRole.permissions[m.id] || [];
                const hasAll = ACTIONS.every((a) => currentPerms.includes(a.id));
                return (
                  <tr key={m.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4">
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white block">
                          {m.name}
                        </span>
                        <span className="text-xs text-slate-400">{m.desc}</span>
                      </div>
                    </td>

                    {ACTIONS.map((act) => {
                      const isChecked = currentPerms.includes(act.id);
                      return (
                        <td key={act.id} className="px-4 py-4 text-center">
                          <input
                            type="checkbox"
                            disabled={activeRole.isSystem}
                            checked={isChecked}
                            onChange={() => handleTogglePermission(m.id, act.id)}
                            className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500 cursor-pointer disabled:cursor-not-allowed"
                          />
                        </td>
                      );
                    })}

                    <td className="px-4 py-4 text-center">
                      <button
                        type="button"
                        disabled={activeRole.isSystem}
                        onClick={() => handleToggleAllForModule(m.id)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
                          hasAll
                            ? "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                            : "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
                        }`}
                      >
                        {hasAll ? "Bỏ chọn" : "Tất cả"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Role */}
      {isAddRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="text-sky-600" /> Thêm Vai Trò Người Dùng Mới
            </h2>

            <form onSubmit={handleCreateNewRole} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Tên vai trò mới
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Điều phối viên Tour, Trưởng phòng Marketing..."
                  value={newRoleData.name}
                  onChange={(e) => setNewRoleData({ ...newRoleData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Mô tả nhiệm vụ
                </label>
                <textarea
                  rows={3}
                  placeholder="Mô tả phạm vi trách nhiệm và công việc chính..."
                  value={newRoleData.description}
                  onChange={(e) => setNewRoleData({ ...newRoleData, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Sao chép quyền ban đầu từ vai trò
                </label>
                <select
                  value={newRoleData.copyFrom}
                  onChange={(e) => setNewRoleData({ ...newRoleData, copyFrom: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddRoleModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-sm"
                >
                  Tạo vai trò
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
