import { useState, useEffect } from 'react';
import { Star, Search, CheckCircle, EyeOff, Trash2, Filter } from 'lucide-react';
import { adminApi } from '../services/adminApi';

const MOCK_REVIEWS = [
  { id: 1, userId: 1, reviewableType: 'tour', reviewableId: 1, rating: 10, content: 'Tour tuyệt vời! Hướng dẫn viên nhiệt tình, thức ăn ngon, khách sạn sạch sẽ. Rất đáng tiền!', status: 'pending', createdAt: '2026-10-01', userName: 'Nguyễn Văn An', productName: 'Tour Phú Quốc 4N3Đ' },
  { id: 2, userId: 2, reviewableType: 'ticket', reviewableId: 1, rating: 9, content: 'Vé Sun World Bà Nà Hills rất dễ mua, quét mã vào cổng nhanh chóng. Trải nghiệm tuyệt vời!', status: 'approved', createdAt: '2026-09-28', userName: 'Trần Thị Bình', productName: 'Vé Sun World Bà Nà Hills' },
  { id: 3, userId: 3, reviewableType: 'tour', reviewableId: 2, rating: 6, content: 'Tour ổn nhưng lịch trình hơi dày, không có nhiều thời gian tự do. Cần cải thiện.', status: 'approved', createdAt: '2026-09-25', userName: 'Lê Minh Cường', productName: 'Tour Hạ Long 3N2Đ' },
  { id: 4, userId: 4, reviewableType: 'hotel', reviewableId: 1, rating: 8, content: 'Khách sạn view biển đẹp, phòng sạch, nhân viên thân thiện. Bữa sáng đa dạng.', status: 'pending', createdAt: '2026-10-03', userName: 'Phạm Thị Dung', productName: 'Khách sạn Mường Thanh Đà Nẵng' },
  { id: 5, userId: 5, reviewableType: 'tour', reviewableId: 3, rating: 3, content: 'Tour bị hủy đột ngột, không báo trước. Dịch vụ quá tệ, không hỗ trợ hoàn tiền đúng hạn.', status: 'hidden', createdAt: '2026-09-20', userName: 'Hoàng Văn Em', productName: 'Tour Sapa 2N1Đ' },
];

const STATUS_OPTS = ['Tất cả', 'pending', 'approved', 'hidden'];
const TYPE_OPTS = ['Tất cả', 'tour', 'ticket', 'hotel'];

const STATUS_LABELS = { pending: 'Chờ duyệt', approved: 'Đã duyệt', hidden: 'Đã ẩn' };
const STATUS_COLORS = { pending: 'bg-amber-100 text-amber-700', approved: 'bg-emerald-100 text-emerald-700', hidden: 'bg-slate-100 text-slate-500' };

const RATING_COLOR = (r) => r >= 9 ? 'text-emerald-600' : r >= 7 ? 'text-sky-600' : r >= 5 ? 'text-amber-600' : 'text-red-600';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [typeFilter, setTypeFilter] = useState('Tất cả');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'Tất cả') params.status = statusFilter;
      if (typeFilter !== 'Tất cả') params.type = typeFilter;
      const res = await adminApi.getReviews(params);
      setReviews(res.data.items);
    } catch {
      let filtered = [...MOCK_REVIEWS];
      if (statusFilter !== 'Tất cả') filtered = filtered.filter(r => r.status === statusFilter);
      if (typeFilter !== 'Tất cả') filtered = filtered.filter(r => r.reviewableType === typeFilter);
      setReviews(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, [statusFilter, typeFilter]);

  const handleUpdateStatus = async (id, status) => {
    try { await adminApi.updateReviewStatus(id, status); } catch {}
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleDelete = async (id) => {
    try { await adminApi.deleteReview(id); } catch {}
    setReviews(prev => prev.filter(r => r.id !== id));
    setDeleteConfirm(null);
  };

  const pendingCount = reviews.filter(r => r.status === 'pending').length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Star size={24} className="text-sky-600" /> Quản Lý Review
          </h1>
          <p className="text-sm text-slate-500 mt-1">{reviews.length} đánh giá{pendingCount > 0 && <span className="ml-2 text-amber-600 font-bold">• {pendingCount} chờ duyệt</span>}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <span className="text-sm font-medium text-slate-600">Trạng thái:</span>
        </div>
        {STATUS_OPTS.map(s => (
          <button key={s}
            onClick={() => { setStatusFilter(s); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition border ${statusFilter === s ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'}`}>
            {s === 'Tất cả' ? 'Tất cả' : STATUS_LABELS[s]}
          </button>
        ))}
        <div className="ml-4 flex items-center gap-2">
          <span className="text-sm font-medium text-slate-600">Loại:</span>
        </div>
        {TYPE_OPTS.map(t => (
          <button key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition border ${typeFilter === t ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
            {t === 'Tất cả' ? 'Tất cả' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <Star size={40} className="mx-auto mb-3 text-slate-200" />
            <div className="font-medium text-slate-400">Không có review nào</div>
          </div>
        ) : (
          reviews.map(r => (
            <div key={r.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0">
                    {(r.userName || r.userId)?.toString().charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <span className="font-bold text-slate-900">{r.userName || `User #${r.userId}`}</span>
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600`}>
                        {r.reviewableType?.toUpperCase()}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[r.status]}`}>
                        {STATUS_LABELS[r.status]}
                      </span>
                      <div className={`flex items-center gap-1 font-black ${RATING_COLOR(r.rating)}`}>
                        <Star size={14} className="fill-current" /> {r.rating}/10
                      </div>
                      <span className="text-xs text-slate-400">{r.createdAt}</span>
                    </div>
                    {r.productName && <div className="text-xs text-sky-600 font-medium mb-2">{r.productName}</div>}
                    <p className="text-sm text-slate-700 leading-relaxed">{r.content}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  {r.status !== 'approved' && (
                    <button onClick={() => handleUpdateStatus(r.id, 'approved')}
                      className="p-2 text-emerald-600 hover:bg-emerald-50 border border-slate-200 rounded-lg transition" title="Duyệt">
                      <CheckCircle size={16} />
                    </button>
                  )}
                  {r.status !== 'hidden' && (
                    <button onClick={() => handleUpdateStatus(r.id, 'hidden')}
                      className="p-2 text-slate-500 hover:bg-slate-100 border border-slate-200 rounded-lg transition" title="Ẩn">
                      <EyeOff size={16} />
                    </button>
                  )}
                  <button onClick={() => setDeleteConfirm(r.id)}
                    className="p-2 text-red-500 hover:bg-red-50 border border-slate-200 rounded-lg transition" title="Xóa">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="text-red-600" size={28} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Xóa Review?</h3>
            <p className="text-slate-500 text-sm mb-6">Review này sẽ bị xóa vĩnh viễn.</p>
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
