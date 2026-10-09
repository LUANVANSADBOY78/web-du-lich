import { useState, useEffect } from 'react';
import { LifeBuoy, Search, AlertCircle, Clock, CheckCircle, X } from 'lucide-react';
import { adminApi } from '../services/adminApi';

const MOCK_TICKETS = [
  { id: 1, ticketCode: 'SP0001', customerName: 'Nguyễn Văn An', customerEmail: 'an@gmail.com', subject: 'Không nhận được vé điện tử', description: 'Tôi đã thanh toán thành công nhưng không nhận được email xác nhận và vé điện tử sau 1 giờ.', category: 'booking', priority: 'high', status: 'open', createdAt: '2026-10-05T08:30:00' },
  { id: 2, ticketCode: 'SP0002', customerName: 'Trần Thị Bình', customerEmail: 'binh@gmail.com', subject: 'Yêu cầu hoàn tiền tour', description: 'Tôi muốn hủy tour và hoàn tiền do có việc đột xuất. Booking BK2410050023.', category: 'refund', priority: 'urgent', status: 'in_progress', createdAt: '2026-10-04T14:20:00' },
  { id: 3, ticketCode: 'SP0003', customerName: 'Lê Minh Cường', customerEmail: 'cuong@gmail.com', subject: 'Hỏi về dịch vụ thêm trên tour', description: 'Tour Phú Quốc có hỗ trợ xe đưa đón từ sân bay không? Tôi cần thêm dịch vụ này.', category: 'general', priority: 'low', status: 'resolved', createdAt: '2026-10-03T10:15:00' },
  { id: 4, ticketCode: 'SP0004', customerName: 'Phạm Thu Hương', customerEmail: 'huong@gmail.com', subject: 'Thanh toán bị lỗi nhưng bị trừ tiền', description: 'Hệ thống báo lỗi nhưng tài khoản ngân hàng bị trừ 5.490.000đ. Mã GD: VCB20261005.', category: 'payment', priority: 'urgent', status: 'open', createdAt: '2026-10-05T09:45:00' },
];

const PRIORITY_CONFIG = {
  urgent: { label: 'Khẩn cấp', color: 'bg-red-100 text-red-700 border-red-200' },
  high: { label: 'Cao', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  medium: { label: 'Trung bình', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  low: { label: 'Thấp', color: 'bg-slate-100 text-slate-600 border-slate-200' },
};

const STATUS_CONFIG = {
  open: { label: 'Mới', color: 'bg-sky-100 text-sky-700', icon: AlertCircle },
  in_progress: { label: 'Đang xử lý', color: 'bg-amber-100 text-amber-700', icon: Clock },
  resolved: { label: 'Đã giải quyết', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
  closed: { label: 'Đã đóng', color: 'bg-slate-100 text-slate-500', icon: X },
};

export default function SupportTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getSupportTickets({ status: statusFilter || undefined, priority: priorityFilter || undefined });
      setTickets(res.data.items);
    } catch {
      let filtered = [...MOCK_TICKETS];
      if (statusFilter) filtered = filtered.filter(t => t.status === statusFilter);
      if (priorityFilter) filtered = filtered.filter(t => t.priority === priorityFilter);
      if (search) filtered = filtered.filter(t => t.subject.toLowerCase().includes(search.toLowerCase()) || t.customerName.toLowerCase().includes(search.toLowerCase()));
      setTickets(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTickets(); }, [statusFilter, priorityFilter, search]);

  const handleUpdateStatus = async (id, status) => {
    try { await adminApi.updateSupportStatus(id, status); } catch {}
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    if (selectedTicket?.id === id) setSelectedTicket(prev => ({ ...prev, status }));
  };

  const urgentCount = tickets.filter(t => t.priority === 'urgent' && t.status === 'open').length;
  const openCount = tickets.filter(t => t.status === 'open').length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <LifeBuoy size={24} className="text-sky-600" /> Quản Lý Support Ticket
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {openCount} ticket mới
            {urgentCount > 0 && <span className="ml-2 text-red-600 font-bold animate-pulse">● {urgentCount} khẩn cấp</span>}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-5 flex flex-wrap gap-3 items-center shadow-sm">
        <div className="relative flex-1 min-w-48">
          <input type="text" placeholder="Tìm ticket, khách hàng..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-sky-500" />
          <Search className="absolute left-2.5 top-2.5 text-slate-400" size={16} />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500">
          <option value="">Tất cả trạng thái</option>
          <option value="open">Mới</option>
          <option value="in_progress">Đang xử lý</option>
          <option value="resolved">Đã giải quyết</option>
          <option value="closed">Đã đóng</option>
        </select>
        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500">
          <option value="">Tất cả độ ưu tiên</option>
          <option value="urgent">Khẩn cấp</option>
          <option value="high">Cao</option>
          <option value="medium">Trung bình</option>
          <option value="low">Thấp</option>
        </select>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : tickets.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <LifeBuoy size={40} className="mx-auto mb-3 text-slate-200" />
            <div className="font-medium text-slate-400">Không có ticket nào</div>
          </div>
        ) : (
          tickets.map(t => {
            const pc = PRIORITY_CONFIG[t.priority] || PRIORITY_CONFIG.medium;
            const sc = STATUS_CONFIG[t.status] || STATUS_CONFIG.open;
            const StatusIcon = sc.icon;
            return (
              <div key={t.id}
                onClick={() => setSelectedTicket(t)}
                className={`bg-white border rounded-2xl p-5 cursor-pointer hover:shadow-md transition ${t.priority === 'urgent' && t.status === 'open' ? 'border-red-300 ring-1 ring-red-200' : 'border-slate-200'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-mono text-xs text-slate-400">#{t.ticketCode}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${pc.color}`}>{pc.label}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${sc.color}`}>
                        <StatusIcon size={11} /> {sc.label}
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t.category}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1.5">{t.subject}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{t.description}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                      <span className="font-medium text-slate-600">{t.customerName}</span>
                      <span>{t.customerEmail}</span>
                      <span>{new Date(t.createdAt).toLocaleString('vi-VN')}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {t.status === 'open' && (
                      <button onClick={(e) => { e.stopPropagation(); handleUpdateStatus(t.id, 'in_progress'); }}
                        className="text-xs font-bold px-3 py-1.5 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-lg transition">
                        Xử lý
                      </button>
                    )}
                    {t.status === 'in_progress' && (
                      <button onClick={(e) => { e.stopPropagation(); handleUpdateStatus(t.id, 'resolved'); }}
                        className="text-xs font-bold px-3 py-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg transition">
                        Đã giải quyết
                      </button>
                    )}
                    {t.status === 'resolved' && (
                      <button onClick={(e) => { e.stopPropagation(); handleUpdateStatus(t.id, 'closed'); }}
                        className="text-xs font-bold px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition">
                        Đóng ticket
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start p-6 border-b sticky top-0 bg-white">
              <div>
                <div className="text-xs text-slate-400 mb-1">#{selectedTicket.ticketCode}</div>
                <h3 className="text-xl font-black text-slate-900">{selectedTicket.subject}</h3>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="p-2 hover:bg-slate-100 rounded-xl transition"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl">
                  <div className="text-xs text-slate-500 mb-1">Khách hàng</div>
                  <div className="font-bold text-slate-900">{selectedTicket.customerName}</div>
                  <div className="text-sm text-slate-500">{selectedTicket.customerEmail}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <div className="text-xs text-slate-500 mb-1">Thông tin ticket</div>
                  <div className="text-sm font-medium">Danh mục: <span className="font-bold text-slate-800">{selectedTicket.category}</span></div>
                  <div className="text-sm font-medium">Tạo lúc: <span className="text-slate-600">{new Date(selectedTicket.createdAt).toLocaleString('vi-VN')}</span></div>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-2 uppercase font-bold">Nội dung</div>
                <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 leading-relaxed">{selectedTicket.description}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-2 uppercase font-bold">Cập nhật trạng thái</div>
                <div className="flex gap-2 flex-wrap">
                  {['open', 'in_progress', 'resolved', 'closed'].map(s => (
                    <button key={s}
                      onClick={() => handleUpdateStatus(selectedTicket.id, s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${selectedTicket.status === s ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'}`}>
                      {STATUS_CONFIG[s]?.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
