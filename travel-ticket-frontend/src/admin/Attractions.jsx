import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, X, AlertTriangle, MapPin } from "lucide-react";
import { toast } from "react-toastify";

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

const initialData = [
  { id: 1, name: "Sun World Bà Nà Hills", location: "Đà Nẵng", status: "Hoạt động", category: "Công viên giải trí" },
  { id: 2, name: "VinWonders Phú Quốc", location: "Phú Quốc", status: "Hoạt động", category: "Công viên giải trí" },
  { id: 3, name: "Ký Ức Hội An", location: "Hội An", status: "Tạm ngưng", category: "Vé xem show" },
];

export default function Attractions() {
  const [items, setItems] = useLocalStorage("goticket_attractions", initialData);
  const [search, setSearch] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", location: "", category: "Công viên giải trí", status: "Hoạt động" });
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Filtered items
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleShowModal = (item = null) => {
    if (item) {
      setEditItem(item);
      setFormData(item);
    } else {
      setEditItem(null);
      setFormData({ name: "", location: "", category: "Công viên giải trí", status: "Hoạt động" });
    }
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    if (editItem) {
      setItems(items.map(i => i.id === editItem.id ? { ...formData, id: editItem.id } : i));
      toast.success("Cập nhật địa điểm thành công!");
    } else {
      const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
      setItems([...items, { ...formData, id: newId }]);
      toast.success("Thêm địa điểm mới thành công!");
    }
    setShowModal(false);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    setItems(items.filter((x) => x.id !== deleteId));
    toast.success("Xóa địa điểm thành công!");
    setShowConfirm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Quản lý Địa điểm</h1>
          <p className="text-slate-500 text-sm mt-1">Danh sách các khu vui chơi, điểm tham quan</p>
        </div>
        <button onClick={() => handleShowModal()} className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-xl flex items-center gap-2 transition-colors shadow-sm">
          <Plus size={18} /> Thêm địa điểm
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm theo tên, vị trí..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
              <Filter size={16} /> Lọc
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-4 w-12"><input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" /></th>
                <th className="p-4">Tên địa điểm</th>
                <th className="p-4">Vị trí</th>
                <th className="p-4">Danh mục</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <MapPin size={48} className="text-slate-200 mb-3" />
                      <p>Không tìm thấy dữ liệu phù hợp</p>
                    </div>
                  </td>
                </tr>
              ) : filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4"><input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" /></td>
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{item.name}</div>
                    <div className="text-xs text-slate-400">ID: #{item.id}</div>
                  </td>
                  <td className="p-4 text-slate-600">{item.location}</td>
                  <td className="p-4 text-slate-600">{item.category}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${item.status === 'Hoạt động' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleShowModal(item)} className="p-1.5 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Sửa">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => confirmDelete(item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <div>Hiển thị {filteredItems.length > 0 ? 1 : 0} đến {filteredItems.length} của {filteredItems.length} mục</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed">Trước</button>
            <button className="px-3 py-1 bg-primary-600 text-white rounded-lg font-medium shadow-sm">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed">Sau</button>
          </div>
        </div>
      </div>

      {/* Modal form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-lg text-slate-800">{editItem ? 'Cập nhật địa điểm' : 'Thêm địa điểm mới'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Tên địa điểm <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" placeholder="VD: Sun World Bà Nà Hills" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Tỉnh/Thành phố <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" placeholder="VD: Đà Nẵng, Phú Quốc..." required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Danh mục</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
                    <option>Công viên giải trí</option>
                    <option>Vé xem show</option>
                    <option>Cáp treo</option>
                    <option>Tour trong ngày</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Trạng thái</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
                    <option>Hoạt động</option>
                    <option>Tạm ngưng</option>
                  </select>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  Hủy bỏ
                </button>
                <button type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 shadow-sm transition-colors">
                  {editItem ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">Xác nhận xóa</h3>
              <p className="text-slate-500 text-sm">Bạn có chắc chắn muốn xóa địa điểm này? Hành động này không thể hoàn tác.</p>
              
              <div className="mt-6 flex justify-center gap-3">
                <button onClick={() => setShowConfirm(false)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
                  Hủy
                </button>
                <button onClick={handleDelete} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 shadow-sm transition-colors">
                  Xóa ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
