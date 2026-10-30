import { useState, useEffect } from "react";
import {
  Search, Plus, Edit2, Trash2, CheckCircle2, XCircle, AlertCircle,
  Phone, Mail, Award, Globe, Star, Calendar, MapPin, Eye, RotateCcw
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_GUIDES = [
  {
    id: 1,
    code: "HDV-001",
    fullName: "Nguyễn Văn Hùng",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phone: "0912345678",
    email: "hung.nguyen@gotravel.vn",
    gender: "Nam",
    birthYear: 1990,
    licenseType: "Thẻ Quốc Tế",
    languages: ["Tiếng Việt", "Tiếng Anh", "Tiếng Pháp"],
    experienceYears: 8,
    totalTours: 142,
    rating: 4.9,
    status: "available", // available, on_tour, on_leave, inactive
    currentTour: null,
    bio: "Chuyên tuyến Miền Trung và Di sản văn hóa. Nhiệt tình, am hiểu lịch sử sâu sắc."
  },
  {
    id: 2,
    code: "HDV-002",
    fullName: "Trần Thị Mai Anh",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    phone: "0934567890",
    email: "maianh.tran@gotravel.vn",
    gender: "Nữ",
    birthYear: 1994,
    licenseType: "Thẻ Quốc Tế",
    languages: ["Tiếng Việt", "Tiếng Hàn", "Tiếng Anh"],
    experienceYears: 5,
    totalTours: 98,
    rating: 4.95,
    status: "on_tour",
    currentTour: "Tour Đà Nẵng - Bà Nà Hills 4N3Đ (28/10 - 31/10)",
    bio: "Tươi vui, hoạt náo, chuyên phục vụ đoàn khách quốc tế và gia đình."
  },
  {
    id: 3,
    code: "HDV-003",
    fullName: "Lê Hoàng Long",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phone: "0978901234",
    email: "long.le@gotravel.vn",
    gender: "Nam",
    birthYear: 1988,
    licenseType: "Thẻ Quốc Tế",
    languages: ["Tiếng Việt", "Tiếng Trung", "Tiếng Anh"],
    experienceYears: 11,
    totalTours: 230,
    rating: 4.85,
    status: "available",
    currentTour: null,
    bio: "Chuyên tour leo núi, trekking Tây Bắc và caravan xuyên Việt."
  },
  {
    id: 4,
    code: "HDV-004",
    fullName: "Phạm Thùy Linh",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    phone: "0945678901",
    email: "linh.pham@gotravel.vn",
    gender: "Nữ",
    birthYear: 1996,
    licenseType: "Thẻ Nội Địa",
    languages: ["Tiếng Việt", "Tiếng Anh"],
    experienceYears: 3,
    totalTours: 46,
    rating: 4.7,
    status: "on_leave",
    currentTour: null,
    bio: "Tận tâm, chu đáo, am hiểu ẩm thực miền Tây sông nước."
  },
  {
    id: 5,
    code: "HDV-005",
    fullName: "Đỗ Minh Tuấn",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    phone: "0987654321",
    email: "tuan.do@gotravel.vn",
    gender: "Nam",
    birthYear: 1992,
    licenseType: "Thẻ Quốc Tế",
    languages: ["Tiếng Việt", "Tiếng Nhật", "Tiếng Anh"],
    experienceYears: 6,
    totalTours: 115,
    rating: 4.9,
    status: "on_tour",
    currentTour: "Tour Phú Quốc Grand World - Cáp Treo Hòn Thơm 3N2Đ",
    bio: "Kinh nghiệm phục vụ du khách Nhật Bản, cẩn thận, đúng giờ tuyệt đối."
  }
];

export default function TourGuideUsers() {
  const [guides, setGuides] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_guides");
    return saved ? JSON.parse(saved) : INITIAL_GUIDES;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [langFilter, setLangFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState(null);
  const [selectedGuideForTour, setSelectedGuideForTour] = useState(null);

  const [formData, setFormData] = useState({
    code: "",
    fullName: "",
    phone: "",
    email: "",
    gender: "Nam",
    birthYear: 1995,
    licenseType: "Thẻ Quốc Tế",
    languages: "Tiếng Việt, Tiếng Anh",
    experienceYears: 3,
    rating: 5.0,
    status: "available",
    bio: ""
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_guides", JSON.stringify(guides));
  }, [guides]);

  const handleOpenModal = (guide = null) => {
    if (guide) {
      setEditingGuide(guide);
      setFormData({
        code: guide.code,
        fullName: guide.fullName,
        phone: guide.phone,
        email: guide.email,
        gender: guide.gender,
        birthYear: guide.birthYear,
        licenseType: guide.licenseType,
        languages: guide.languages.join(", "),
        experienceYears: guide.experienceYears,
        rating: guide.rating,
        status: guide.status,
        bio: guide.bio || ""
      });
    } else {
      setEditingGuide(null);
      setFormData({
        code: `HDV-00${guides.length + 1}`,
        fullName: "",
        phone: "",
        email: "",
        gender: "Nam",
        birthYear: 1995,
        licenseType: "Thẻ Quốc Tế",
        languages: "Tiếng Việt, Tiếng Anh",
        experienceYears: 2,
        rating: 5.0,
        status: "available",
        bio: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      toast.error("Vui lòng nhập họ và tên HDV!");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Vui lòng nhập số điện thoại!");
      return;
    }

    const langs = formData.languages
      .split(",")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (editingGuide) {
      setGuides(
        guides.map((g) =>
          g.id === editingGuide.id
            ? {
                ...g,
                ...formData,
                languages: langs,
                experienceYears: Number(formData.experienceYears) || 0
              }
            : g
        )
      );
      toast.success("Cập nhật thông tin HDV thành công!");
    } else {
      const newGuide = {
        id: Date.now(),
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
        ...formData,
        languages: langs,
        experienceYears: Number(formData.experienceYears) || 0,
        totalTours: 0,
        currentTour: null
      };
      setGuides([newGuide, ...guides]);
      toast.success("Thêm hướng dẫn viên mới thành công!");
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id, currentStatus) => {
    const nextStatus =
      currentStatus === "available"
        ? "on_leave"
        : currentStatus === "on_leave"
        ? "inactive"
        : "available";
    setGuides(
      guides.map((g) => (g.id === id ? { ...g, status: nextStatus } : g))
    );
    toast.info("Đã chuyển đổi trạng thái HDV!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hướng dẫn viên này?")) {
      setGuides(guides.filter((g) => g.id !== id));
      toast.success("Đã xóa hướng dẫn viên!");
    }
  };

  const filteredGuides = guides.filter((g) => {
    const matchSearch =
      g.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.phone.includes(searchTerm) ||
      g.languages.some((l) => l.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchStatus = statusFilter === "all" || g.status === statusFilter;
    const matchLang =
      langFilter === "all" ||
      g.languages.some((l) => l.toLowerCase().includes(langFilter.toLowerCase()));

    return matchSearch && matchStatus && matchLang;
  });

  const getStatusBadge = (status, currentTour) => {
    switch (status) {
      case "available":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Sẵn sàng nhận tour
          </span>
        );
      case "on_tour":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400" title={currentTour}>
            <MapPin size={12} /> Đang dẫn tour
          </span>
        );
      case "on_leave":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
            <Calendar size={12} /> Nghỉ phép
          </span>
        );
      case "inactive":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400">
            <XCircle size={12} /> Tạm ngưng
          </span>
        );
    }
  };

  const countAvailable = guides.filter((g) => g.status === "available").length;
  const countOnTour = guides.filter((g) => g.status === "on_tour").length;
  const countOnLeave = guides.filter((g) => g.status === "on_leave").length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="text-sky-600" /> Quản Lý Hướng Dẫn Viên (Tour Guides)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Hồ sơ đội ngũ hướng dẫn viên, ngôn ngữ, bằng cấp, số tour và phân công dẫn đoàn
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_guides");
              setGuides(INITIAL_GUIDES);
              toast.info("Đã khôi phục dữ liệu HDV mẫu!");
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition"
          >
            <RotateCcw size={14} /> Mẫu dữ liệu
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl shadow-sm transition"
          >
            <Plus size={18} /> Thêm HDV Mới
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 uppercase">Tổng HDV</span>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{guides.length}</p>
          <span className="text-xs text-sky-600 font-medium">Toàn hệ thống</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-emerald-600 uppercase">Sẵn sàng nhận tour</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{countAvailable}</p>
          <span className="text-xs text-slate-500">Đang rảnh rỗi</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-blue-600 uppercase">Đang dẫn đoàn</span>
          <p className="text-2xl font-bold text-blue-600 mt-1">{countOnTour}</p>
          <span className="text-xs text-slate-500">Đang trên tuyến tour</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-amber-600 uppercase">Nghỉ phép / Khác</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">{countOnLeave}</p>
          <span className="text-xs text-slate-500">Tạm hoãn nhận tour</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên, mã HDV, SĐT, ngoại ngữ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="available">Sẵn sàng nhận tour</option>
          <option value="on_tour">Đang dẫn tour</option>
          <option value="on_leave">Nghỉ phép</option>
          <option value="inactive">Tạm ngưng</option>
        </select>
        <select
          value={langFilter}
          onChange={(e) => setLangFilter(e.target.value)}
          className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="all">Tất cả ngoại ngữ</option>
          <option value="Tiếng Anh">Tiếng Anh</option>
          <option value="Tiếng Trung">Tiếng Trung</option>
          <option value="Tiếng Hàn">Tiếng Hàn</option>
          <option value="Tiếng Nhật">Tiếng Nhật</option>
          <option value="Tiếng Pháp">Tiếng Pháp</option>
        </select>
      </div>

      {/* Guide Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 text-xs uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-5 py-4">HDV / Mã số</th>
                <th className="px-5 py-4">Liên hệ</th>
                <th className="px-5 py-4">Thẻ & Ngoại ngữ</th>
                <th className="px-5 py-4">Kinh nghiệm & Rating</th>
                <th className="px-5 py-4">Trạng thái hiện tại</th>
                <th className="px-5 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredGuides.length > 0 ? (
                filteredGuides.map((guide) => (
                  <tr key={guide.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={guide.avatar}
                          alt={guide.fullName}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                        />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{guide.fullName}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                              {guide.code}
                            </span>
                            <span className="text-xs text-slate-400">
                              {guide.gender}, {guide.birthYear}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                          <Phone size={12} className="text-sky-500" /> {guide.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Mail size={12} className="text-slate-400" /> {guide.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1.5">
                        <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                          {guide.licenseType}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {guide.languages.map((lang, idx) => (
                            <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Star size={13} className="text-amber-400 fill-amber-400" />
                          <span className="font-bold text-slate-800 dark:text-white">{guide.rating}</span>
                          <span className="text-slate-400">({guide.totalTours} tours)</span>
                        </div>
                        <span className="text-xs text-slate-500 block">
                          {guide.experienceYears} năm kinh nghiệm
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        {getStatusBadge(guide.status, guide.currentTour)}
                        {guide.currentTour && (
                          <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 max-w-[200px] truncate" title={guide.currentTour}>
                            {guide.currentTour}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {guide.currentTour && (
                          <button
                            onClick={() => setSelectedGuideForTour(guide)}
                            title="Xem chi tiết tour đang dẫn"
                            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition"
                          >
                            <Eye size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleToggleStatus(guide.id, guide.status)}
                          title="Đổi trạng thái sẵn sàng"
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded-lg transition"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                        <button
                          onClick={() => handleOpenModal(guide)}
                          title="Chỉnh sửa thông tin"
                          className="p-1.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(guide.id)}
                          title="Xóa HDV"
                          className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    Không tìm thấy hướng dẫn viên nào phù hợp với bộ lọc.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Guide */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Award className="text-sky-600" />
              {editingGuide ? "Cập Nhật Thông Tin HDV" : "Thêm Hướng Dẫn Viên Mới"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Mã HDV
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Họ & Tên HDV
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Số Điện Thoại
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Giới tính
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Năm sinh
                  </label>
                  <input
                    type="number"
                    value={formData.birthYear}
                    onChange={(e) => setFormData({ ...formData, birthYear: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Loại thẻ HDV
                  </label>
                  <select
                    value={formData.licenseType}
                    onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Thẻ Quốc Tế">Thẻ Quốc Tế</option>
                    <option value="Thẻ Nội Địa">Thẻ Nội Địa</option>
                    <option value="Thẻ Tại Điểm">Thẻ Tại Điểm</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Ngoại ngữ (cách nhau bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  placeholder="Tiếng Việt, Tiếng Anh, Tiếng Nhật..."
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Số năm kinh nghiệm
                  </label>
                  <input
                    type="number"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Trạng thái
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="available">Sẵn sàng nhận tour</option>
                    <option value="on_tour">Đang dẫn tour</option>
                    <option value="on_leave">Nghỉ phép</option>
                    <option value="inactive">Tạm ngưng</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Giới thiệu / Sở trường
                </label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-sm"
                >
                  {editingGuide ? "Lưu thay đổi" : "Thêm mới HDV"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal View Tour info */}
      {selectedGuideForTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <MapPin className="text-blue-500" /> Tuyến Tour Đang Dẫn
            </h3>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-2">
              HDV: {selectedGuideForTour.fullName} ({selectedGuideForTour.code})
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl p-4 mt-3">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                {selectedGuideForTour.currentTour}
              </p>
              <div className="mt-3 text-xs text-blue-700 dark:text-blue-300 space-y-1">
                <p>• Trạng thái đoàn: Đang di chuyển</p>
                <p>• Số lượng khách: 28 khách</p>
                <p>• Hotline HDV: {selectedGuideForTour.phone}</p>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedGuideForTour(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-200"
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
