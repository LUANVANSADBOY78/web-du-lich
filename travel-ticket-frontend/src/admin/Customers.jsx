import { useState, useEffect } from 'react';
import { Search, Users, Lock, Unlock, Eye, Mail, Phone, Filter } from 'lucide-react';
import { adminApi } from '../services/adminApi';

const MOCK_CUSTOMERS = [
  { id: 1, fullName: 'Nguyễn Văn An', email: 'an.nguyen@gmail.com', phoneNumber: '0901234567', isActive: true, createdAt: '2026-01-15' },
  { id: 2, fullName: 'Trần Thị Bình', email: 'binh.tran@gmail.com', phoneNumber: '0912345678', isActive: true, createdAt: '2026-02-20' },
  { id: 3, fullName: 'Lê Minh Cường', email: 'cuong.le@gmail.com', phoneNumber: '0923456789', isActive: false, createdAt: '2026-03-10' },
  { id: 4, fullName: 'Phạm Thị Dung', email: 'dung.pham@gmail.com', phoneNumber: '0934567890', isActive: true, createdAt: '2026-04-05' },
  { id: 5, fullName: 'Hoàng Văn Em', email: 'em.hoang@gmail.com', phoneNumber: '0945678901', isActive: true, createdAt: '2026-05-12' },
  { id: 6, fullName: 'Vũ Thị Phương', email: 'phuong.vu@gmail.com', phoneNumber: '0956789012', isActive: true, createdAt: '2026-06-01' },
  { id: 7, fullName: 'Đặng Minh Quân', email: 'quan.dang@gmail.com', phoneNumber: '0967890123', isActive: false, createdAt: '2026-07-15' },
  { id: 8, fullName: 'Bùi Thị Lan', email: 'lan.bui@gmail.com', phoneNumber: '0978901234', isActive: true, createdAt: '2026-08-20' },
];

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 20;

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getCustomers({ page, pageSize, search });
      setCustomers(res.data.items);
      setTotal(res.data.total);
    } catch {
      const filtered = MOCK_CUSTOMERS.filter(c =>
        !search || c.fullName.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
      );
      setCustomers(filtered);
      setTotal(filtered.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCustomers(); }, [page, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleToggleActive = async (id) => {
    try {
      await adminApi.toggleCustomerActive(id);
    } catch {}
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const activeCount = customers.filter(c => c.isActive).length;
  const lockedCount = customers.filter(c => !c.isActive).length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Users size={24} className="text-sky-600" /> Quản Lý Khách Hàng
          </h1>
          <p className="text-sm text-slate-500 mt-1">Tổng cộng {total.toLocaleString()} khách hàng</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="text-2xl font-black text-slate-900">{total.toLocaleString()}</div>
          <div className="text-sm text-slate-500 mt-1">Tổng khách hàng</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="text-2xl font-black text-emerald-600">{activeCount}</div>
          <div className="text-sm text-slate-500 mt-1">Đang hoạt động</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="text-2xl font-black text-red-600">{lockedCount}</div>
          <div className="text-sm text-slate-500 mt-1">Đã khóa</div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex gap-4">
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Tìm tên, email, SĐT..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 text-sm"
              />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            </div>
            <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition">
              Tìm
            </button>
          </form>
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
                  <th className="p-4 font-bold">Khách hàng</th>
                  <th className="p-4 font-bold">Liên hệ</th>
                  <th className="p-4 font-bold">Ngày đăng ký</th>
                  <th className="p-4 font-bold">Trạng thái</th>
                  <th className="p-4 font-bold text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customers.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center font-black text-white text-sm">
                          {c.fullName?.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{c.fullName}</div>
                          <div className="text-xs text-slate-400">ID #{c.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600 mb-1">
                        <Mail size={13} className="text-slate-400" /> {c.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Phone size={13} className="text-slate-400" /> {c.phoneNumber || '—'}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString('vi-VN') : '—'}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {c.isActive ? '● Hoạt động' : '● Đã khóa'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-sky-600 border border-slate-200 rounded-lg mr-2 transition" title="Xem chi tiết">
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleToggleActive(c.id)}
                        title={c.isActive ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                        className={`p-2 border rounded-lg transition ${c.isActive ? 'text-orange-500 hover:text-orange-700 hover:bg-orange-50 border-slate-200' : 'text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 border-slate-200'}`}
                      >
                        {c.isActive ? <Lock size={16} /> : <Unlock size={16} />}
                      </button>
                    </td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-slate-400">
                      <Users size={40} className="mx-auto mb-3 opacity-30" />
                      <div className="font-medium">Không tìm thấy khách hàng nào</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 flex justify-between items-center bg-slate-50">
          <span className="text-sm text-slate-600">
            Hiển thị {customers.length} / {total} khách hàng
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm disabled:opacity-40 hover:bg-slate-100 transition font-medium"
            >← Trước</button>
            <span className="px-3 py-1.5 bg-sky-600 text-white rounded-lg text-sm font-bold min-w-[36px] text-center">{page}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page * pageSize >= total}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm disabled:opacity-40 hover:bg-slate-100 transition font-medium"
            >Sau →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
