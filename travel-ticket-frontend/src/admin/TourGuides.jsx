import { useState, useEffect } from 'react';
import { 
  UserCheck, Plus, Phone, Mail, Edit3, Trash2, Search, 
  Award, Globe, CheckCircle, Clock, X, Calendar, UserPlus, MapPin
} from 'lucide-react';
import { toast } from 'react-toastify';

const INITIAL_GUIDES = [
  { id: 1, name: "Nguyễn Văn Hùng", phone: "0912345678", email: "hung.nguyen@goticket.vn", language: "Tiếng Anh, Tiếng Việt", exp: "8 năm", status: "Sẵn sàng", rating: 5.0, toursCount: 42, location: "Hà Nội" },
  { id: 2, name: "Trần Thị Mai", phone: "0923456789", email: "mai.tran@goticket.vn", language: "Tiếng Hàn, Tiếng Việt", exp: "5 năm", status: "Đang dẫn tour", rating: 4.9, toursCount: 36, location: "Đà Nẵng" },
  { id: 3, name: "Lê Hoàng Nam", phone: "0934567890", email: "nam.le@goticket.vn", language: "Tiếng Nhật, Tiếng Anh", exp: "6 năm", status: "Sẵn sàng", rating: 5.0, toursCount: 51, location: "Hồ Chí Minh" },
  { id: 4, name: "Phạm Hồng Phúc", phone: "0945678901", email: "phuc.pham@goticket.vn", language: "Tiếng Trung, Tiếng Việt", exp: "7 năm", status: "Sẵn sàng", rating: 4.8, toursCount: 39, location: "Hà Nội" },
  { id: 5, name: "Đặng Thị Thảo", phone: "0956789012", email: "thao.dang@goticket.vn", language: "Tiếng Pháp, Tiếng Anh", exp: "4 năm", status: "Nghỉ phép", rating: 4.9, toursCount: 28, location: "Đà Lạt" }
];

export default function TourGuides() {
  const [guides, setGuides] = useState(() => {
    try {
      const saved = localStorage.getItem('gotravel_admin_guides');
      return saved ? JSON.parse(saved) : INITIAL_GUIDES;
    } catch {
      return INITIAL_GUIDES;
    }
  });

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingGuide, setEditingGuide] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assigningGuide, setAssigningGuide] = useState(null);
  const [selectedTour, setSelectedTour] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    language: 'Tiếng Việt, Tiếng Anh',
    exp: '3 năm',
    status: 'Sẵn sàng',
    location: 'Hà Nội'
  });

  useEffect(() => {
    try {
      localStorage.setItem('gotravel_admin_guides', JSON.stringify(guides));
    } catch (e) {
      console.error(e);
    }
  }, [guides]);

  const handleOpenAdd = () => {
    setEditingGuide(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      language: 'Tiếng Việt, Tiếng Anh',
      exp: '3 năm',
      status: 'Sẵn sàng',
      location: 'Hà Nội'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (guide) => {
    setEditingGuide(guide);
    setFormData({
      name: guide.name,
      phone: guide.phone,
      email: guide.email,
      language: guide.language,
      exp: guide.exp,
      status: guide.status || 'Sẵn sàng',
      location: guide.location || 'Hà Nội'
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.warning('Vui lòng điền tên và số điện thoại HDV!');
      return;
    }

    if (editingGuide) {
      setGuides(prev => prev.map(g => g.id === editingGuide.id ? { ...g, ...formData } : g));
      toast.success(`Đã cập nhật thông tin HDV: ${formData.name}`);
    } else {
      const newGuide = {
        id: Date.now(),
        ...formData,
        rating: 5.0,
        toursCount: 0
      };
      setGuides(prev => [newGuide, ...prev]);
      toast.success(`Đã thêm thành công HDV: ${formData.name}`);
    }
    setShowModal(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa Hướng dẫn viên "${name}"?`)) {
      setGuides(prev => prev.filter(g => g.id !== id));
      toast.info(`Đã xóa HDV ${name}`);
    }
  };

  const handleAssignTour = (e) => {
    e.preventDefault();
    if (!selectedTour) {
      toast.warning('Vui lòng chọn tour cần phân công!');
      return;
    }
    setGuides(prev => prev.map(g => g.id === assigningGuide.id ? { ...g, status: 'Đang dẫn tour', toursCount: (g.toursCount || 0) + 1 } : g));
    toast.success(`Đã phân công HDV ${assigningGuide.name} phụ trách đoàn ${selectedTour}!`);
    setShowAssignModal(false);
  };

  const filteredGuides = guides.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) || 
                        g.language.toLowerCase().includes(search.toLowerCase()) ||
                        g.phone.includes(search);
    const matchStatus = statusFilter === 'all' || g.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Quản Lý Hướng Dẫn Viên Du Lịch</h1>
          <p className="text-slate-500 text-sm mt-1">Đội ngũ {guides.length} HDV chuyên nghiệp dẫn đoàn trong & ngoài nước</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 text-sm shadow-sm transition cursor-pointer"
        >
          <Plus size={18} /> Thêm Hướng Dẫn Viên
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Tìm theo tên, ngôn ngữ, SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
          {['all', 'Sẵn sàng', 'Đang dẫn tour', 'Nghỉ phép'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                statusFilter === status 
                  ? 'bg-sky-600 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status === 'all' ? 'Tất cả trạng thái' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map(g => (
          <div key={g.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4 hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-black flex items-center justify-center text-xl shadow-md">
                  {g.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                    {g.name}
                    <Award size={15} className="text-amber-500 fill-amber-500" />
                  </h3>
                  <div className="flex items-center gap-2 text-xs mt-0.5">
                    <span className="text-sky-600 font-semibold">{g.exp} kinh nghiệm</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-amber-500 font-bold">★ {g.rating}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                g.status === 'Sẵn sàng' 
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                  : g.status === 'Đang dẫn tour'
                    ? 'bg-amber-50 text-amber-600 border border-amber-200'
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
              }`}>
                {g.status}
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2"><Phone size={14} className="text-slate-400" /> <span className="font-semibold">{g.phone}</span></div>
              <div className="flex items-center gap-2"><Mail size={14} className="text-slate-400" /> <span>{g.email}</span></div>
              <div className="flex items-center gap-2"><MapPin size={14} className="text-slate-400" /> <span>Khu vực: <strong>{g.location}</strong></span></div>
              <div className="flex items-center gap-2 pt-1"><Globe size={14} className="text-sky-500" /> <span className="font-bold text-slate-800">Ngôn ngữ: {g.language}</span></div>
              <div className="text-[11px] text-slate-400 pt-1">Đã hoàn thành: <strong>{g.toursCount || 0} tour</strong> dẫn đoàn</div>
            </div>

            {/* Actions Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button 
                onClick={() => { setAssigningGuide(g); setShowAssignModal(true); }}
                className="flex-1 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1"
              >
                <Calendar size={13} /> Phân công
              </button>
              <button 
                onClick={() => handleOpenEdit(g)}
                className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-sky-600 rounded-xl transition"
                title="Chỉnh sửa"
              >
                <Edit3 size={15} />
              </button>
              <button 
                onClick={() => handleDelete(g.id, g.name)}
                className="p-1.5 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition"
                title="Xóa"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
          <p className="text-slate-500">Không tìm thấy hướng dẫn viên nào phù hợp.</p>
        </div>
      )}

      {/* Modal Thêm / Sửa HDV */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-lg">
                {editingGuide ? 'Chỉnh Sửa Hướng Dẫn Viên' : 'Thêm Hướng Dẫn Viên Mới'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Họ và Tên (*)</label>
                <input 
                  type="text" 
                  required
                  placeholder="VD: Nguyễn Văn Hùng"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Số điện thoại (*)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="0912..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Khu vực</label>
                  <select 
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                    <option value="Đà Lạt">Đà Lạt</option>
                    <option value="Phú Quốc">Phú Quốc</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email liên hệ</label>
                <input 
                  type="email" 
                  placeholder="ten@goticket.vn"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kinh nghiệm</label>
                  <input 
                    type="text" 
                    placeholder="VD: 5 năm"
                    value={formData.exp}
                    onChange={(e) => setFormData({ ...formData, exp: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Trạng thái</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                  >
                    <option value="Sẵn sàng">Sẵn sàng nhận tour</option>
                    <option value="Đang dẫn tour">Đang dẫn tour</option>
                    <option value="Nghỉ phép">Nghỉ phép</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ngôn ngữ thông thạo</label>
                <input 
                  type="text" 
                  placeholder="VD: Tiếng Anh, Tiếng Nhật, Tiếng Việt"
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-3 flex gap-2 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold shadow transition"
                >
                  {editingGuide ? 'Lưu Thay Đổi' : 'Thêm Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Phân công Tour */}
      {showAssignModal && assigningGuide && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-lg">Phân Công Tour Dẫn Đoàn</h3>
              <button onClick={() => setShowAssignModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Phân công cho HDV: <strong className="text-sky-600">{assigningGuide.name}</strong> ({assigningGuide.language})
            </p>

            <form onSubmit={handleAssignTour} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Chọn Tour Khởi Hành Gần Nhất</label>
                <select 
                  required
                  value={selectedTour}
                  onChange={(e) => setSelectedTour(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                >
                  <option value="">-- Chọn chuyến tour --</option>
                  <option value="Tour Nhật Bản 6N5Đ - Khởi hành 05/11">Tour Nhật Bản 6N5Đ - Khởi hành 05/11 (28 khách)</option>
                  <option value="Tour Hàn Quốc Mùa Thu 5N4Đ - Khởi hành 08/11">Tour Hàn Quốc Mùa Thu 5N4Đ - Khởi hành 08/11 (24 khách)</option>
                  <option value="Tour Đà Nẵng - Hội An - Bà Nà 4N3Đ - Khởi hành 02/11">Tour Đà Nẵng - Hội An - Bà Nà 4N3Đ - Khởi hành 02/11 (35 khách)</option>
                  <option value="Tour Cửu Trại Câu Trung Quốc 6N5Đ - Khởi hành 12/11">Tour Cửu Trại Câu Trung Quốc 6N5Đ - Khởi hành 12/11 (20 khách)</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition"
                >
                  Đóng
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold shadow transition"
                >
                  Xác Nhận Phân Công
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
