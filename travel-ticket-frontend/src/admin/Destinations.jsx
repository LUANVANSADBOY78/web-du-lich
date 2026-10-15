import { useState } from 'react';
import { Search, MapPin, Image as ImageIcon, Plus, Edit2, Trash2, X, Save, Globe } from 'lucide-react';
import { toast } from 'react-toastify';

// Ảnh thật từng điểm đến du lịch Việt Nam
const DESTINATION_IMAGES = {
  'Đà Nẵng': 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=400',
  'Phú Quốc': 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=400',
  'Nha Trang': 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=400',
  'Hà Nội': 'https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=400',
  'Hồ Chí Minh': 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=400',
  'Hội An': 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=400',
  'Sapa': 'https://images.unsplash.com/photo-1555921015-c26206080b06?auto=format&fit=crop&q=80&w=400',
  'Quảng Ninh': 'https://images.unsplash.com/photo-1490077476659-095159692ab5?auto=format&fit=crop&q=80&w=400',
  'Quốc tế': 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=400',
  'Huế': 'https://images.unsplash.com/photo-1584553421349-3557471bed79?auto=format&fit=crop&q=80&w=400',
  'Ninh Bình': 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?auto=format&fit=crop&q=80&w=400',
  'Mũi Né': 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?auto=format&fit=crop&q=80&w=400',
};

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=400';

const INITIAL_DESTINATIONS = [
  { id: 1, name: 'Đà Nẵng', region: 'Miền Trung', toursCount: 24, ticketsCount: 18, status: 'active', featured: true },
  { id: 2, name: 'Phú Quốc', region: 'Miền Nam', toursCount: 31, ticketsCount: 22, status: 'active', featured: true },
  { id: 3, name: 'Nha Trang', region: 'Miền Trung', toursCount: 19, ticketsCount: 15, status: 'active', featured: true },
  { id: 4, name: 'Hà Nội', region: 'Miền Bắc', toursCount: 28, ticketsCount: 12, status: 'active', featured: true },
  { id: 5, name: 'Hồ Chí Minh', region: 'Miền Nam', toursCount: 35, ticketsCount: 20, status: 'active', featured: true },
  { id: 6, name: 'Hội An', region: 'Miền Trung', toursCount: 14, ticketsCount: 8, status: 'active', featured: false },
  { id: 7, name: 'Sapa', region: 'Miền Bắc', toursCount: 12, ticketsCount: 5, status: 'active', featured: false },
  { id: 8, name: 'Quảng Ninh', region: 'Miền Bắc', toursCount: 16, ticketsCount: 7, status: 'active', featured: false },
  { id: 9, name: 'Huế', region: 'Miền Trung', toursCount: 10, ticketsCount: 6, status: 'active', featured: false },
  { id: 10, name: 'Ninh Bình', region: 'Miền Bắc', toursCount: 8, ticketsCount: 4, status: 'inactive', featured: false },
  { id: 11, name: 'Mũi Né', region: 'Miền Nam', toursCount: 9, ticketsCount: 5, status: 'inactive', featured: false },
  { id: 12, name: 'Quốc tế', region: 'Quốc tế', toursCount: 45, ticketsCount: 0, status: 'active', featured: false },
];

const EMPTY_FORM = { name: '', region: 'Miền Trung', status: 'active', featured: false };

export default function Destinations() {
  const [destinations, setDestinations] = useState(INITIAL_DESTINATIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imgErrors, setImgErrors] = useState({});

  const filtered = destinations.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || d.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openAdd = () => {
    setEditItem(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (dest) => {
    setEditItem(dest);
    setForm({ name: dest.name, region: dest.region, status: dest.status, featured: dest.featured });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      toast.error('Vui lòng nhập tên điểm đến');
      return;
    }
    if (editItem) {
      setDestinations(prev => prev.map(d => d.id === editItem.id ? { ...d, ...form } : d));
      toast.success('Đã cập nhật điểm đến');
    } else {
      const newDest = {
        id: Date.now(),
        ...form,
        toursCount: 0,
        ticketsCount: 0,
      };
      setDestinations(prev => [...prev, newDest]);
      toast.success('Đã thêm điểm đến mới');
    }
    setShowModal(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Xóa điểm đến "${name}"?`)) {
      setDestinations(prev => prev.filter(d => d.id !== id));
      toast.success('Đã xóa điểm đến');
    }
  };

  const toggleFeatured = (id) => {
    setDestinations(prev => prev.map(d => d.id === id ? { ...d, featured: !d.featured } : d));
  };

  const toggleStatus = (id) => {
    setDestinations(prev => prev.map(d =>
      d.id === id ? { ...d, status: d.status === 'active' ? 'inactive' : 'active' } : d
    ));
    toast.success('Đã cập nhật trạng thái');
  };

  const getImg = (name) => {
    if (imgErrors[name]) return FALLBACK_IMG;
    return DESTINATION_IMAGES[name] || FALLBACK_IMG;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Quản Lý Điểm Đến</h1>
          <p className="text-sm text-slate-500 mt-1">Thêm ảnh đẹp và tọa độ Google Maps cho các điểm đến du lịch</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 transition shadow-sm shrink-0"
        >
          <Plus size={18} /> Thêm Điểm Đến
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Tổng điểm đến', value: destinations.length, color: 'bg-sky-50 text-sky-700' },
          { label: 'Đang hoạt động', value: destinations.filter(d => d.status === 'active').length, color: 'bg-emerald-50 text-emerald-700' },
          { label: 'Nổi bật', value: destinations.filter(d => d.featured).length, color: 'bg-amber-50 text-amber-700' },
          { label: 'Ngừng HĐ', value: destinations.filter(d => d.status === 'inactive').length, color: 'bg-slate-100 text-slate-600' },
        ].map(s => (
          <div key={s.label} className={`${s.color} rounded-2xl p-4 border border-white/60`}>
            <div className="text-2xl font-black">{s.value}</div>
            <div className="text-xs font-medium mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm điểm đến..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 text-sm"
            />
            <Search className="absolute left-3 top-3 text-slate-400" size={16} />
          </div>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none text-slate-700 font-medium"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Ngừng HĐ</option>
          </select>
          <div className="text-sm text-slate-500 font-medium whitespace-nowrap">{filtered.length} điểm đến</div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                <th className="p-4 font-bold">Hình Ảnh</th>
                <th className="p-4 font-bold">Tên Điểm Đến</th>
                <th className="p-4 font-bold">Khu vực</th>
                <th className="p-4 font-bold">Tours / Vé</th>
                <th className="p-4 font-bold">Nổi bật</th>
                <th className="p-4 font-bold">Trạng thái</th>
                <th className="p-4 font-bold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((dest) => (
                <tr key={dest.id} className="hover:bg-slate-50 transition group">
                  <td className="p-4">
                    <div className="w-20 h-14 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative group/img cursor-pointer">
                      <img
                        src={getImg(dest.name)}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                        onError={() => setImgErrors(prev => ({ ...prev, [dest.name]: true }))}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition">
                        <ImageIcon size={16} className="text-white" />
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={15} className="text-sky-600 shrink-0" />
                      <span className="font-bold text-slate-900">{dest.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <Globe size={13} /> {dest.region}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <span className="font-bold text-sky-600">{dest.toursCount}</span>
                      <span className="text-slate-400"> tours · </span>
                      <span className="font-bold text-emerald-600">{dest.ticketsCount}</span>
                      <span className="text-slate-400"> vé</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleFeatured(dest.id)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full transition ${
                        dest.featured
                          ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {dest.featured ? '⭐ Nổi bật' : 'Thường'}
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(dest.id)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full transition ${
                        dest.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {dest.status === 'active' ? 'Hoạt động' : 'Ngừng HĐ'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(dest)}
                        className="p-2 text-slate-400 hover:text-sky-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-sky-300 transition"
                        title="Chỉnh sửa"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(dest.id, dest.name)}
                        className="p-2 text-slate-400 hover:text-red-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-red-300 transition"
                        title="Xóa"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <MapPin size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="font-bold">Không tìm thấy điểm đến</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-lg">
                {editItem ? 'Chỉnh Sửa Điểm Đến' : 'Thêm Điểm Đến Mới'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Preview image */}
              <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-100 mb-2">
                <img
                  src={DESTINATION_IMAGES[form.name] || FALLBACK_IMG}
                  alt={form.name || 'Điểm đến'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1.5">Tên điểm đến *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="VD: Đà Nẵng, Phú Quốc..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1.5">Khu vực</label>
                <select
                  value={form.region}
                  onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sky-500"
                >
                  <option>Miền Bắc</option>
                  <option>Miền Trung</option>
                  <option>Miền Nam</option>
                  <option>Quốc tế</option>
                </select>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-slate-700">Điểm đến nổi bật</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.status === 'active'}
                    onChange={e => setForm(f => ({ ...f, status: e.target.checked ? 'active' : 'inactive' }))}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-slate-700">Hoạt động</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 p-6 pt-0">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition text-sm"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold transition text-sm flex items-center justify-center gap-2"
              >
                <Save size={16} /> {editItem ? 'Lưu thay đổi' : 'Thêm điểm đến'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
