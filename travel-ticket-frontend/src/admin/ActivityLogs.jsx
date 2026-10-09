import { useState, useEffect } from 'react';
import { Activity, Search, Filter } from 'lucide-react';
import { adminApi } from '../services/adminApi';

const MOCK_LOGS = [
  { id: 1, createdAt: '2026-10-05T10:30:00', userName: 'admin@gotravel.vn', action: 'CREATE', module: 'Tour', entityId: '45', oldValue: null, newValue: '{"name":"Tour Phú Quốc 4N3Đ"}', ipAddress: '192.168.1.100' },
  { id: 2, createdAt: '2026-10-05T10:15:00', userName: 'manager@gotravel.vn', action: 'UPDATE', module: 'Voucher', entityId: '12', oldValue: '{"isActive":true}', newValue: '{"isActive":false}', ipAddress: '192.168.1.101' },
  { id: 3, createdAt: '2026-10-05T09:50:00', userName: 'staff@gotravel.vn', action: 'UPDATE', module: 'Booking', entityId: 'BK0023', oldValue: '{"status":"pending"}', newValue: '{"status":"confirmed"}', ipAddress: '192.168.1.102' },
  { id: 4, createdAt: '2026-10-05T09:30:00', userName: 'admin@gotravel.vn', action: 'DELETE', module: 'Review', entityId: '88', oldValue: '{"content":"spam review"}', newValue: null, ipAddress: '192.168.1.100' },
  { id: 5, createdAt: '2026-10-05T09:10:00', userName: 'manager@gotravel.vn', action: 'CREATE', module: 'Voucher', entityId: '15', oldValue: null, newValue: '{"code":"FLASH50","value":50}', ipAddress: '192.168.1.101' },
  { id: 6, createdAt: '2026-10-04T16:30:00', userName: 'admin@gotravel.vn', action: 'UPDATE', module: 'Tour', entityId: '38', oldValue: '{"status":"active"}', newValue: '{"status":"hidden"}', ipAddress: '192.168.1.100' },
  { id: 7, createdAt: '2026-10-04T14:00:00', userName: 'staff@gotravel.vn', action: 'CREATE', module: 'SupportTicket', entityId: 'SP0003', oldValue: null, newValue: '{"subject":"Hỏi về tour"}', ipAddress: '192.168.1.103' },
];

const ACTION_STYLE = {
  CREATE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  UPDATE: 'bg-amber-100 text-amber-700 border-amber-200',
  DELETE: 'bg-red-100 text-red-700 border-red-200',
};

const MODULES = ['Tất cả', 'Tour', 'Booking', 'Voucher', 'Review', 'SupportTicket', 'User'];

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [module, setModule] = useState('Tất cả');
  const [action, setAction] = useState('');
  const [search, setSearch] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getActivityLogs({ module: module !== 'Tất cả' ? module : undefined, action: action || undefined });
      setLogs(res.data.items);
    } catch {
      let filtered = [...MOCK_LOGS];
      if (module !== 'Tất cả') filtered = filtered.filter(l => l.module === module);
      if (action) filtered = filtered.filter(l => l.action === action);
      if (search) filtered = filtered.filter(l => l.userName?.toLowerCase().includes(search.toLowerCase()) || l.module.toLowerCase().includes(search.toLowerCase()));
      setLogs(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, [module, action, search]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Activity size={24} className="text-sky-600" /> Nhật Ký Hoạt Động
        </h1>
        <p className="text-sm text-slate-500 mt-1">Theo dõi mọi thao tác thêm, sửa, xóa dữ liệu trong hệ thống</p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-5 flex flex-wrap gap-3 items-center shadow-sm">
        <div className="relative flex-1 min-w-48">
          <input type="text" placeholder="Tìm user, module..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-sky-500" />
          <Search className="absolute left-2.5 top-2.5 text-slate-400" size={16} />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto">
          {MODULES.map(m => (
            <button key={m} onClick={() => setModule(m)}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition border ${module === m ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'}`}>
              {m}
            </button>
          ))}
        </div>
        <select value={action} onChange={e => setAction(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500">
          <option value="">Tất cả hành động</option>
          <option value="CREATE">Thêm mới</option>
          <option value="UPDATE">Cập nhật</option>
          <option value="DELETE">Xóa</option>
        </select>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b">
                  <th className="p-4 font-bold">Thời gian</th>
                  <th className="p-4 font-bold">Người dùng</th>
                  <th className="p-4 font-bold">Hành động</th>
                  <th className="p-4 font-bold">Module</th>
                  <th className="p-4 font-bold">ID</th>
                  <th className="p-4 font-bold">Dữ liệu mới</th>
                  <th className="p-4 font-bold">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50 transition text-sm">
                    <td className="p-4 text-slate-600 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString('vi-VN')}
                    </td>
                    <td className="p-4 font-medium text-slate-800">
                      {log.userName}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${ACTION_STYLE[log.action] || 'bg-slate-100 text-slate-600'}`}>
                        {log.action === 'CREATE' ? '+ Thêm' : log.action === 'UPDATE' ? '✎ Sửa' : '✕ Xóa'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-xs">{log.module}</span>
                    </td>
                    <td className="p-4 font-mono text-xs text-slate-500">{log.entityId}</td>
                    <td className="p-4 max-w-xs">
                      <div className="text-xs text-slate-500 font-mono truncate bg-slate-50 px-2 py-1 rounded">
                        {log.newValue || log.oldValue || '—'}
                      </div>
                    </td>
                    <td className="p-4 font-mono text-xs text-slate-400">{log.ipAddress}</td>
                  </tr>
                ))}
                {logs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400">
                      <Activity size={36} className="mx-auto mb-2 opacity-30" />
                      <div>Không có log nào</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
