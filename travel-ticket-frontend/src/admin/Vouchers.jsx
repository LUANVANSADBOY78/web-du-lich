import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Tag, X } from 'lucide-react';
import { adminApi } from '../services/adminApi';

const MOCK_VOUCHERS = [
  { id: 1, code: 'SUMMER30', name: 'Giảm 30% mùa hè', type: 'percent', value: 30, minOrderValue: 5000000, maxDiscount: 2000000, usageLimit: 100, usedCount: 45, isActive: true, startDate: '2026-07-01', endDate: '2026-08-31' },
  { id: 2, code: 'WELCOME500K', name: 'Chào mừng -500K', type: 'fixed', value: 500000, minOrderValue: 2000000, maxDiscount: 500000, usageLimit: 50, usedCount: 12, isActive: true, startDate: '2026-01-01', endDate: '2026-12-31' },
  { id: 3, code: 'VIP20', name: 'VIP giảm 20%', type: 'percent', value: 20, minOrderValue: 10000000, maxDiscount: 3000000, usageLimit: 30, usedCount: 30, isActive: false, startDate: '2026-01-01', endDate: '2026-06-30' },
  { id: 4, code: 'TETHOLIDAY', name: 'Tết Holiday', type: 'fixed', value: 1000000, minOrderValue: 8000000, maxDiscount: 1000000, usageLimit: 200, usedCount: 88, isActive: true, startDate: '2026-01-20', endDate: '2026-02-15' },
];

const EMPTY_FORM = {
  code: '', name: '', type: 'percent', value: '', minOrderValue: '',
  maxDiscount: '', usageLimit: 1, startDate: '', endDate: '', isActive: true
};

export default function Vouchers() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getVouchers({ search });
      setVouchers(res.data.items);
    } catch {
      const filtered = MOCK_VOUCHERS.filter(v =>
        !search || v.code.toLowerCase().includes(search.toLowerCase()) || v.name.toLowerCase().includes(search.toLowerCase())
      );
      setVouchers(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVouchers(); }, [search]);

  const openAdd = () => { setEditingVoucher(null); setFormData(EMPTY_FORM); setShowModal(true); };
  const openEdit = (v) => { setEditingVoucher(v); setFormData({ ...v }); setShowModal(true); };

  const handleSave = async () => {
    if (!formData.code || !formData.name || !formData.value) return;
    try {
      if (editingVoucher) {
        try { await adminApi.updateVoucher(editingVoucher.id, formData); } catch {}
        setVouchers(prev => prev.map(v => v.id === editingVoucher.id ? { ...v, ...formData } : v));
      } else {
        const newVoucher = { id: Date.now(), ...formData, usedCount: 0 };
        try {
          const res = await adminApi.createVoucher(formData);
          setVouchers(prev => [res.data, ...prev]);
        } catch {
          setVouchers(prev => [newVoucher, ...prev]);
        }
      }
    } catch {}
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    try { await adminApi.deleteVoucher(id); } catch {}
    setVouchers(prev => prev.filter(v => v.id !== id));
    setDeleteConfirm(null);
  };

  const setField = (key, val) => setFormData(p => ({ ...p, [key]: val }));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Tag size={24} className="text-sky-600" /> Quản Lý Voucher
          </h1>
          <p className="text-sm text-slate-500 mt-1">{vouchers.length} voucher trong hệ thống</p>
        </div>
        <button onClick={openAdd} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 transition shadow-sm">
          <Plus size={18} /> Thêm Voucher
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="text-2xl font-black text-sky-600">{vouchers.length}</div>
          <div className="text-sm text-slate-500 mt-1">Tổng voucher</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="text-2xl font-black text-emerald-600">{vouchers.filter(v => v.isActive).length}</div>
          <div className="text-sm text-slate-500 mt-1">Đang hoạt động</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="text-2xl font-black text-amber-600">{vouchers.reduce((s, v) => s + v.usedCount, 0)}</div>
          <div className="text-sm text-slate-500 mt-1">Lượt sử dụng</div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <div className="relative w-full max-w-md">
            <input type="text" placeholder="Tìm mã, tên voucher..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 text-sm" />
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b">
                  <th className="p-4 font-bold">Mã Voucher</th>
                  <th className="p-4 font-bold">Giá trị</th>
                  <th className="p-4 font-bold">Thời hạn</th>
                  <th className="p-4 font-bold">Đã dùng</th>
                  <th className="p-4 font-bold">Trạng thái</th>
                  <th className="p-4 font-bold text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vouchers.map(v => (
                  <tr key={v.id} className="hover:bg-slate-50 transition">
                    <td className="p-4">
                      <div className="font-mono font-black text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg inline-block text-sm border border-sky-200">{v.code}</div>
                      <div className="text-xs text-slate-500 mt-1">{v.name}</div>
                    </td>
                    <td className="p-4 font-bold text-emerald-700 text-sm">
                      {v.type === 'percent' ? `-${v.value}%` : `-${Number(v.value).toLocaleString()}đ`}
                      <div className="text-xs text-slate-500 font-normal">Đơn từ {Number(v.minOrderValue).toLocaleString()}đ</div>
                    </td>
                    <td className="p-4 text-xs text-slate-600">
                      <div>{v.startDate}</div>
                      <div className="text-slate-400">→ {v.endDate}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-bold text-slate-700">{v.usedCount} / {v.usageLimit}</div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1.5">
                        <div className="bg-sky-600 h-1.5 rounded-full transition-all" style={{ width: `${Math.min((v.usedCount / v.usageLimit) * 100, 100)}%` }}></div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${v.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {v.isActive ? '● Đang hoạt động' : '○ Đã tắt'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => openEdit(v)} className="p-2 text-slate-400 hover:text-sky-600 border border-slate-200 rounded-lg mr-2 transition" title="Sửa">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => setDeleteConfirm(v.id)} className="p-2 text-slate-400 hover:text-red-600 border border-slate-200 rounded-lg transition" title="Xóa">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
              <h3 className="text-xl font-black text-slate-900">{editingVoucher ? 'Sửa Voucher' : 'Thêm Voucher Mới'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Mã Voucher *</label>
                  <input type="text" value={formData.code} onChange={e => setField('code', e.target.value.toUpperCase())}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-500 font-mono font-bold"
                    placeholder="VD: SUMMER30" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Loại giảm giá</label>
                  <select value={formData.type} onChange={e => setField('type', e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-500">
                    <option value="percent">Phần trăm (%)</option>
                    <option value="fixed">Số tiền cố định (đ)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Tên Voucher *</label>
                <input type="text" value={formData.name} onChange={e => setField('name', e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-500"
                  placeholder="VD: Giảm 30% mùa hè" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Giá trị giảm *</label>
                  <input type="number" value={formData.value} onChange={e => setField('value', e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-500"
                    placeholder={formData.type === 'percent' ? '30' : '500000'} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Giới hạn dùng</label>
                  <input type="number" value={formData.usageLimit} onChange={e => setField('usageLimit', parseInt(e.target.value))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Ngày bắt đầu</label>
                  <input type="date" value={formData.startDate} onChange={e => setField('startDate', e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Ngày kết thúc</label>
                  <input type="date" value={formData.endDate} onChange={e => setField('endDate', e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Đơn hàng tối thiểu (đ)</label>
                  <input type="number" value={formData.minOrderValue} onChange={e => setField('minOrderValue', e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Giảm tối đa (đ)</label>
                  <input type="number" value={formData.maxDiscount} onChange={e => setField('maxDiscount', e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-500" />
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div className={`w-10 h-5 rounded-full transition-colors ${formData.isActive ? 'bg-sky-600' : 'bg-slate-300'} relative`}
                  onClick={() => setField('isActive', !formData.isActive)}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${formData.isActive ? 'left-5' : 'left-0.5'}`}></div>
                </div>
                <span className="text-sm font-medium text-slate-700">Kích hoạt ngay</span>
              </label>
            </div>
            <div className="flex gap-3 p-6 border-t">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition">Hủy</button>
              <button onClick={handleSave} className="flex-1 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold transition">
                {editingVoucher ? 'Cập nhật' : 'Thêm Voucher'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="text-red-600" size={28} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Xóa Voucher?</h3>
            <p className="text-slate-500 text-sm mb-6">Voucher sẽ bị xóa khỏi hệ thống và không thể khôi phục.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition">Hủy</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition">Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
