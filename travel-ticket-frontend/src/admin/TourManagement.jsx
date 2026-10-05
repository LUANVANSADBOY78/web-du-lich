import { useState } from "react";
import { Plus, Search, Filter, Edit, Trash2, X, AlertTriangle, Compass, MapPin, Clock } from "lucide-react";
import { toast } from "react-toastify";
import { MOCK_TOURS } from "../data/mockTours";

// Local storage helper
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export default function TourManagement() {
  const [tours, setTours] = useLocalStorage("goticket_admin_tours", MOCK_TOURS);
  const [search, setSearch] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "", departure: "Hồ Chí Minh", destination: "Đà Nẵng", duration: "3 Ngày 2 Đêm", price: 3500000, badge: "HOT"
  });
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const filteredTours = tours.filter(tour => 
    tour.name.toLowerCase().includes(search.toLowerCase()) || 
    tour.destination.toLowerCase().includes(search.toLowerCase())
  );

  const handleShowModal = (item = null) => {
    if (item) {
      setEditItem(item);
      setFormData(item);
    } else {
      setEditItem(null);
      setFormData({
        name: "", departure: "Hồ Chí Minh", destination: "Đà Nẵng", duration: "3 Ngày 2 Đêm", price: 3500000, badge: "HOT"
      });
    }
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      toast.error("Vui lòng điền tên tour và giá tour!");
      return;
    }

    if (editItem) {
      setTours(tours.map(t => t.id === editItem.id ? { ...formData, id: editItem.id } : t));
      toast.success("Cập nhật tour thành công!");
    } else {
      const newId = 'tour-' + (tours.length + 1);
      setTours([...tours, { ...formData, id: newId, img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800", rating: 9.8, reviews: 10, booked: "10" }]);
      toast.success("Thêm tour mới thành công!");
    }
    setShowModal(false);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    setTours(tours.filter((x) => x.id !== deleteId));
    toast.success("Xóa tour thành công!");
    setShowConfirm(false);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Quản Lý Tour Du Lịch</h1>
          <p className="text-slate-500 text-sm mt-1">Danh sách tour trọn gói trong nước & quốc tế</p>
        </div>
        <button onClick={() => handleShowModal()} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 shadow-sm transition">
          <Plus size={18} /> Thêm Tour Mới
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm tên tour, điểm đến..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-sky-600"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-4">Hình ảnh & Tên Tour</th>
                <th className="p-4">Khởi hành</th>
                <th className="p-4">Thời gian</th>
                <th className="p-4">Giá trọn gói</th>
                <th className="p-4">Đã bán</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTours.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">
                    Chưa có tour nào phù hợp.
                  </td>
                </tr>
              ) : filteredTours.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={t.img} alt={t.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                      <div className="max-w-md">
                        <div className="font-bold text-slate-900 truncate">{t.name}</div>
                        <div className="text-xs text-sky-600 font-semibold">Mã: {t.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-700">{t.departure}</td>
                  <td className="p-4 font-semibold text-slate-700">{t.duration}</td>
                  <td className="p-4 font-black text-amber-600">{Number(t.price).toLocaleString('vi-VN')} đ</td>
                  <td className="p-4 text-slate-600">{t.booked || 0} khách</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleShowModal(t)} className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition" title="Sửa">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => confirmDelete(t.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Xóa">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-900">{editItem ? 'Cập nhật Tour' : 'Thêm Tour Mới'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tên Tour <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-sky-600"
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Điểm khởi hành</label>
                  <input 
                    type="text" 
                    value={formData.departure} 
                    onChange={e => setFormData({...formData, departure: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Điểm đến</label>
                  <input 
                    type="text" 
                    value={formData.destination} 
                    onChange={e => setFormData({...formData, destination: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Thời gian (VD: 3N2Đ)</label>
                  <input 
                    type="text" 
                    value={formData.duration} 
                    onChange={e => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Giá tour (VNĐ)</label>
                  <input 
                    type="number" 
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-amber-600 outline-none"
                  />
                </div>
              </div>

              {/* IMAGE UPLOAD UI */}
              <div className="border-t border-slate-100 pt-4 mt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">ẢNH ĐẠI DIỆN</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      placeholder="Nhập URL ảnh đại diện..."
                      value={formData.img || ""} 
                      onChange={e => setFormData({...formData, img: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none mb-2"
                    />
                    <button type="button" className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-1.5 px-3 rounded-lg transition">
                      [ Chọn ảnh / Upload ]
                    </button>
                  </div>
                  <div className="w-24 h-24 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 shrink-0 flex items-center justify-center text-[10px] text-slate-400 font-bold">
                    {formData.img ? (
                      <img src={formData.img} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      "PREVIEW"
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">ALBUM ẢNH</label>
                <button type="button" className="text-xs bg-sky-100 hover:bg-sky-200 text-sky-700 font-bold py-1.5 px-3 rounded-lg transition mb-3">
                  [ + Thêm nhiều ảnh ]
                </button>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {[1, 2, 3, 4].map(idx => (
                    <div key={idx} className="w-16 h-16 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-[10px] text-slate-400 shrink-0">
                      Ảnh {idx}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl">Hủy</button>
                <button type="submit" className="px-5 py-2 text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow">Lưu Tour</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 text-center max-w-sm w-full">
            <div className="w-14 h-14 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertTriangle size={28} />
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-1">Xác nhận xóa tour</h3>
            <p className="text-slate-500 text-xs mb-6">Bạn có chắc chắn muốn xóa tour này khỏi hệ thống?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl">Hủy</button>
              <button onClick={handleDelete} className="flex-1 py-2 text-sm font-bold text-white bg-red-600 rounded-xl">Xóa Ngay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
