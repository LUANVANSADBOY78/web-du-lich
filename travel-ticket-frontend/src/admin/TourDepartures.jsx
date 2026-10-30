import { useState, useEffect } from 'react';
import { Calendar, Plus, Search, CheckCircle2, Edit3, Trash2, X, AlertCircle, Users } from 'lucide-react';
import { toast } from 'react-toastify';

const INITIAL_DEPARTURES = [
  { id: 1, tourName: "Tour Đà Nẵng - Hội An - Bà Nà Hills 4N3Đ", startDate: "15/11/2026", endDate: "18/11/2026", totalSeats: 30, bookedSeats: 22, price: 4990000, status: "Còn chỗ", guide: "Nguyễn Văn Hùng" },
  { id: 2, tourName: "Tour Phú Quốc Cano 4 Đảo 3N2Đ", startDate: "18/11/2026", endDate: "20/11/2026", totalSeats: 20, bookedSeats: 20, price: 3890000, status: "Hết chỗ", guide: "Trần Thị Mai" },
  { id: 3, tourName: "Tour Hàn Quốc Seoul - Đảo Nami 5N4Đ", startDate: "20/11/2026", endDate: "25/11/2026", totalSeats: 25, bookedSeats: 19, price: 15890000, status: "Gần hết", guide: "Lê Hoàng Nam" },
  { id: 4, tourName: "Tour Nhật Bản Cung Đường Vàng 6N5Đ", startDate: "22/11/2026", endDate: "27/11/2026", totalSeats: 28, bookedSeats: 15, price: 34900000, status: "Còn chỗ", guide: "Nguyễn Văn Hùng" },
  { id: 5, tourName: "Tour Cửu Trại Câu Trung Quốc 6N5Đ", startDate: "25/11/2026", endDate: "30/11/2026", totalSeats: 22, bookedSeats: 8, price: 18990000, status: "Còn chỗ", guide: "Phạm Hồng Phúc" },
  { id: 6, tourName: "Tour Sapa Đỉnh Fansipan 3N2Đ", startDate: "28/11/2026", endDate: "30/11/2026", totalSeats: 35, bookedSeats: 33, price: 2990000, status: "Gần hết", guide: "Đặng Thị Thảo" }
];

const TOUR_OPTIONS = [
  "Tour Đà Nẵng - Hội An - Bà Nà Hills 4N3Đ",
  "Tour Phú Quốc Cano 4 Đảo 3N2Đ",
  "Tour Hàn Quốc Seoul - Đảo Nami 5N4Đ",
  "Tour Nhật Bản Cung Đường Vàng 6N5Đ",
  "Tour Cửu Trại Câu Trung Quốc 6N5Đ",
  "Tour Sapa Đỉnh Fansipan 3N2Đ",
  "Tour Du Thuyền 5 Sao Genting Dream Singapore",
  "Tour Miền Tây Chợ Nổi Cái Răng 2N1Đ"
];

export default function TourDepartures() {
  const [departures, setDepartures] = useState(() => {
    try {
      const saved = localStorage.getItem('gotravel_admin_departures');
      return saved ? JSON.parse(saved) : INITIAL_DEPARTURES;
    } catch {
      return INITIAL_DEPARTURES;
    }
  });

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    tourName: TOUR_OPTIONS[0],
    startDate: '',
    endDate: '',
    totalSeats: 30,
    bookedSeats: 0,
    price: 4990000,
    status: 'Còn chỗ',
    guide: 'Nguyễn Văn Hùng'
  });

  useEffect(() => {
    try {
      localStorage.setItem('gotravel_admin_departures', JSON.stringify(departures));
    } catch (e) {
      console.error(e);
    }
  }, [departures]);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      tourName: TOUR_OPTIONS[0],
      startDate: '01/12/2026',
      endDate: '05/12/2026',
      totalSeats: 30,
      bookedSeats: 0,
      price: 4990000,
      status: 'Còn chỗ',
      guide: 'Nguyễn Văn Hùng'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      tourName: item.tourName,
      startDate: item.startDate,
      endDate: item.endDate,
      totalSeats: item.totalSeats,
      bookedSeats: item.bookedSeats,
      price: item.price || 4990000,
      status: item.status,
      guide: item.guide || 'Nguyễn Văn Hùng'
    });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate) {
      toast.warning('Vui lòng nhập ngày khởi hành và ngày về!');
      return;
    }

    if (editingItem) {
      setDepartures(prev => prev.map(d => d.id === editingItem.id ? { ...d, ...formData } : d));
      toast.success(`Đã cập nhật lịch khởi hành: ${formData.tourName}`);
    } else {
      const newItem = {
        id: Date.now(),
        ...formData
      };
      setDepartures([newItem, ...departures]);
      toast.success(`Đã thêm lịch khởi hành mới: ${formData.tourName} (${formData.startDate})`);
    }
    setShowModal(false);
  };

  const handleDelete = (id, name, date) => {
    if (window.confirm(`Bạn có chắc muốn xóa lịch khởi hành "${name}" ngày ${date}?`)) {
      setDepartures(prev => prev.filter(d => d.id !== id));
      toast.info('Đã xóa lịch khởi hành');
    }
  };

  const handleQuickStatusChange = (id) => {
    setDepartures(prev => prev.map(d => {
      if (d.id === id) {
        let nextStatus = 'Còn chỗ';
        if (d.status === 'Còn chỗ') nextStatus = 'Gần hết';
        else if (d.status === 'Gần hết') nextStatus = 'Hết chỗ';
        else nextStatus = 'Còn chỗ';
        toast.info(`Trạng thái chuyển sang: ${nextStatus}`);
        return { ...d, status: nextStatus };
      }
      return d;
    }));
  };

  const filtered = departures.filter(d => {
    const matchSearch = d.tourName.toLowerCase().includes(search.toLowerCase()) || 
                        d.startDate.includes(search) ||
                        (d.guide && d.guide.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Calendar size={24} className="text-sky-600" />
            Quản Lý Lịch Khởi Hành Tour
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Tổng cộng <strong>{departures.length} lịch khởi hành</strong> trong tháng & cập nhật số chỗ trống realtime
          </p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 text-sm shadow-sm transition cursor-pointer"
        >
          <Plus size={18} /> + Thêm Lịch Khởi Hành
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Tìm theo tên tour, ngày, HDV..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
          {['all', 'Còn chỗ', 'Gần hết', 'Hết chỗ'].map(status => (
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

      {/* Table */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold">
            <tr>
              <th className="p-4">Tên Tour</th>
              <th className="p-4">Ngày khởi hành</th>
              <th className="p-4">Ngày về</th>
              <th className="p-4">HDV Dẫn Đoàn</th>
              <th className="p-4">Tổng số chỗ</th>
              <th className="p-4">Đã đặt</th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filtered.map(d => (
              <tr key={d.id} className="hover:bg-slate-50/70 transition">
                <td className="p-4">
                  <div className="font-bold text-slate-900">{d.tourName}</div>
                  <div className="text-xs text-amber-600 font-bold mt-0.5">{d.price?.toLocaleString()} đ/khách</div>
                </td>
                <td className="p-4 font-bold text-sky-700">{d.startDate}</td>
                <td className="p-4 text-slate-600">{d.endDate}</td>
                <td className="p-4 text-xs font-semibold text-slate-700">{d.guide || 'Chưa gán'}</td>
                <td className="p-4 font-bold text-slate-800">{d.totalSeats} chỗ</td>
                <td className="p-4 font-bold text-sky-600">
                  {d.bookedSeats} chỗ 
                  <span className="text-xs text-slate-400 font-normal ml-1">
                    (còn {Math.max(0, d.totalSeats - d.bookedSeats)})
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleQuickStatusChange(d.id)}
                    title="Bấm để đổi nhanh trạng thái"
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                      d.status === 'Hết chỗ' 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : d.status === 'Gần hết'
                          ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                          : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    }`}
                  >
                    {d.status}
                  </button>
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button 
                      onClick={() => handleOpenEdit(d)}
                      className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition"
                      title="Chỉnh sửa"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(d.id, d.tourName, d.startDate)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            <p className="font-bold">Không tìm thấy lịch khởi hành nào phù hợp.</p>
          </div>
        )}
      </div>

      {/* Modal Thêm / Sửa Lịch Khởi Hành */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-lg">
                {editingItem ? 'Chỉnh Sửa Lịch Khởi Hành' : 'Thêm Lịch Khởi Hành Tour Mới'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Chọn Tour Du Lịch (*)</label>
                <select 
                  value={formData.tourName}
                  onChange={(e) => setFormData({ ...formData, tourName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 font-bold text-slate-800"
                >
                  {TOUR_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ngày khởi hành (*)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="VD: 15/11/2026"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ngày về (*)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="VD: 18/11/2026"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tổng số chỗ mở bán</label>
                  <input 
                    type="number" 
                    min={1}
                    value={formData.totalSeats}
                    onChange={(e) => setFormData({ ...formData, totalSeats: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Số chỗ đã đặt</label>
                  <input 
                    type="number" 
                    min={0}
                    value={formData.bookedSeats}
                    onChange={(e) => setFormData({ ...formData, bookedSeats: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Giá tour (VNĐ/Khách)</label>
                  <input 
                    type="number" 
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Trạng thái chỗ</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                  >
                    <option value="Còn chỗ">Còn chỗ</option>
                    <option value="Gần hết">Gần hết chỗ</option>
                    <option value="Hết chỗ">Hết chỗ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hướng dẫn viên dẫn đoàn</label>
                <select 
                  value={formData.guide}
                  onChange={(e) => setFormData({ ...formData, guide: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                >
                  <option value="Nguyễn Văn Hùng">Nguyễn Văn Hùng (8 năm kinh nghiệm - Tiếng Anh)</option>
                  <option value="Trần Thị Mai">Trần Thị Mai (5 năm kinh nghiệm - Tiếng Hàn)</option>
                  <option value="Lê Hoàng Nam">Lê Hoàng Nam (6 năm kinh nghiệm - Tiếng Nhật)</option>
                  <option value="Phạm Hồng Phúc">Phạm Hồng Phúc (7 năm kinh nghiệm - Tiếng Trung)</option>
                </select>
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
                  {editingItem ? 'Lưu Lịch Trình' : 'Tạo Lịch Khởi Hành'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
