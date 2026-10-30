import { useState, useEffect } from 'react';
import { 
  Star, Search, CheckCircle, EyeOff, Trash2, Filter, Plus, 
  MessageCircle, Reply, User, Heart, Sparkles, Check, X 
} from 'lucide-react';
import { toast } from 'react-toastify';
import { adminApi } from '../services/adminApi';

const DEFAULT_ADMIN_REVIEWS = [
  { 
    id: 1, 
    userName: 'Trần Minh Quân', 
    productName: 'Tour Nhật Bản 6N5Đ Cung Đường Vàng', 
    reviewableType: 'tour', 
    rating: 5, 
    content: 'Chuyến đi mùa thu Nhật Bản đẹp như mơ! Lễ hội lá đỏ ở hồ Kawaguchiko nhìn ngắm núi Phú Sĩ đẹp ngỡ ngàng. HDV Nam cực kỳ nhiệt tình, am hiểu văn hóa và chụp ảnh cho gia đình siêu có tâm. Đồ ăn bò Kobe và cua tuyết rất ngon!', 
    status: 'approved', 
    createdAt: '14/10/2026', 
    reply: 'Dạ GoTravel xin chân thành cảm ơn anh Quân và gia đình đã tin tưởng đồng hành cùng chúng em!' 
  },
  { 
    id: 2, 
    userName: 'Nguyễn Thị Bích Ngọc', 
    productName: 'Tour Hàn Quốc 5N4Đ Đảo Nami - Everland', 
    reviewableType: 'tour', 
    rating: 5, 
    content: 'Hai vợ chồng mình chọn tour này đi tuần trăng mật và hoàn toàn hài lòng 100%. Đội ngũ làm visa hỗ trợ giấy tờ rất tận tâm, chỉ 6 ngày là có kết quả. Đi tàu Shinkansen êm ru, Nami lá vàng thơ mộng chụp ảnh cháy máy.', 
    status: 'approved', 
    createdAt: '12/10/2026', 
    reply: 'GoTravel chúc mừng hạnh phúc của hai bạn! Chúc anh chị luôn có thật nhiều hành trình ngọt ngào.' 
  },
  { 
    id: 3, 
    userName: 'Bác Lê Văn Thắng', 
    productName: 'Tour Trọn Gói Đà Nẵng - Hội An - Bà Nà 4N3Đ', 
    reviewableType: 'tour', 
    rating: 5, 
    content: 'Tôi và bà xã 68 tuổi lần đầu đi tour. Lúc đầu lo lắng không theo kịp đoàn nhưng hướng dẫn viên và lái xe hỗ trợ rất chu đáo, luôn nhường lối ưu tiên. Đồ ăn ấm nóng, cơm dẻo canh thanh. Khách sạn đệm êm ngủ ngon giấc.', 
    status: 'approved', 
    createdAt: '10/10/2026', 
    reply: 'Kính chúc bác Thắng và bác gái luôn dồi dào sức khỏe, trường thọ và an vui bên con cháu ạ!' 
  },
  { 
    id: 4, 
    userName: 'Võ Thành Đạt', 
    productName: 'Vé Sun World Bà Nà Hills + Buffet Quốc Tế', 
    reviewableType: 'ticket', 
    rating: 5, 
    content: 'Mua vé trên GoTicket rất tiện, nhận mã QR qua Zalo và Email ngay trong 30 giây. Lên cáp treo quét thẳng mã QR không phải xếp hàng mua vé giấy. Buffet nhà hàng Arapang nhiều món ngon.', 
    status: 'approved', 
    createdAt: '08/10/2026', 
    reply: null 
  },
  { 
    id: 5, 
    userName: 'Chị Mai Lan & Gia Đình', 
    productName: 'Vé VinWonders Phú Quốc & Safari Siêu Tiết Kiệm', 
    reviewableType: 'ticket', 
    rating: 5, 
    content: 'Nhà mình có 2 bé nhỏ 6 tuổi và 9 tuổi. Bé nào cũng mê mẩn khu Safari ngắm thú bán hoang dã và xem show nàng tiên cá. Giá vé đặt sớm rẻ hơn mua tại cổng 15%. Rất đáng trải nghiệm!', 
    status: 'approved', 
    createdAt: '05/10/2026', 
    reply: null 
  },
  { 
    id: 6, 
    userName: 'Phan Gia Huy', 
    productName: 'Tour Trung Quốc Cửu Trại Câu - Thành Đô 6N5Đ', 
    reviewableType: 'tour', 
    rating: 5, 
    content: 'Cửu Trại Câu thiên đường nơi hạ giới, nước hồ ngũ sắc trong vắt. Vườn gấu trúc Thành Đô gặp được mấy chú gấu trúc tròn xoe lăn lộn ăn trúc cưng xỉu. Đoàn đi xe đời mới rất êm ái.', 
    status: 'approved', 
    createdAt: '03/10/2026', 
    reply: null 
  },
  { 
    id: 7, 
    userName: 'Đặng Tuấn Kiệt', 
    productName: 'Tour Du Thuyền 5 Sao Genting Dream Singapore', 
    reviewableType: 'tour', 
    rating: 5, 
    content: 'Siêu du thuyền quá to và hoành tráng, các cháu nhỏ nhà mình mê mẩn máng trượt nước và xem kịch xiếc buổi tối. Đồ ăn buffet đổi món liên tục, phòng ban công riêng ngắm biển bình minh tuyệt đẹp.', 
    status: 'approved', 
    createdAt: '01/10/2026', 
    reply: 'Cảm ơn anh Kiệt và gia đình! Genting Dream là một trong những sản phẩm du thuyền 5 sao được yêu thích nhất.' 
  },
  { 
    id: 8, 
    userName: 'Lâm Chí Dũng', 
    productName: 'Tour Tây Ninh Cáp Treo Núi Bà Đen Trong Ngày', 
    reviewableType: 'tour', 
    rating: 5, 
    content: 'Cáp treo hiện đại lên đỉnh Vân Sơn ngắm tượng Phật Tây Bổ Đà Sơn cực kỳ linh thiêng. Vườn hoa bạt ngàn mát mẻ. Đi trong ngày từ Sài Gòn rất thuận tiện và nhẹ nhàng.', 
    status: 'approved', 
    createdAt: '28/09/2026', 
    reply: null 
  },
  { 
    id: 9, 
    userName: 'Dương Thuỳ Chi', 
    productName: 'Khách sạn Vinpearl Resort & Spa Đà Nẵng', 
    reviewableType: 'hotel', 
    rating: 5, 
    content: 'Phòng hướng biển view trọn bãi Non Nước tuyệt đẹp. Bể bơi vô cực rộng rãi, dịch vụ Spa chu đáo. Nhân viên phục vụ nhiệt tình và chuyên nghiệp 10/10.', 
    status: 'approved', 
    createdAt: '25/09/2026', 
    reply: null 
  },
  { 
    id: 10, 
    userName: 'Ngô Thanh Vân', 
    productName: 'Tour Miền Tây Chợ Nổi Cái Răng - Rừng Tràm Trà Sư', 
    reviewableType: 'tour', 
    rating: 5, 
    content: 'Sáng sớm đi xuồng ăn tô bún nước lèo và uống cà phê kho trên sông Cái Răng rất vui. Rừng tràm Trà Sư bèo xanh ngát mắt, chim muông bay rợp trời.', 
    status: 'pending', 
    createdAt: 'Vừa xong', 
    reply: null 
  }
];

const STATUS_OPTS = ['Tất cả', 'approved', 'pending', 'hidden'];
const STATUS_LABELS = { pending: 'Chờ duyệt', approved: 'Đã duyệt', hidden: 'Đã ẩn' };
const STATUS_COLORS = { 
  pending: 'bg-amber-100 text-amber-700', 
  approved: 'bg-emerald-100 text-emerald-700', 
  hidden: 'bg-slate-100 text-slate-500' 
};

export default function Reviews() {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('gotravel_admin_reviews_data');
      return saved ? JSON.parse(saved) : DEFAULT_ADMIN_REVIEWS;
    } catch {
      return DEFAULT_ADMIN_REVIEWS;
    }
  });

  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [starFilter, setStarFilter] = useState('all'); // 'all' | '5' | '4'
  const [typeFilter, setTypeFilter] = useState('Tất cả');
  const [search, setSearch] = useState('');
  
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReviewForm, setNewReviewForm] = useState({
    userName: '',
    productName: 'Tour Nhật Bản 6N5Đ Cung Đường Vàng',
    reviewableType: 'tour',
    rating: 5,
    content: 'Dịch vụ chuẩn 5 sao, hướng dẫn viên nhiệt tình chu đáo, khách sạn đẹp và đồ ăn ngon xuất sắc!'
  });

  const [replyingReview, setReplyingReview] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('gotravel_admin_reviews_data', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  const handleUpdateStatus = (id, status) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    toast.success(`Đã cập nhật trạng thái review: ${STATUS_LABELS[status]}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa review này?')) {
      setReviews(prev => prev.filter(r => r.id !== id));
      toast.info('Đã xóa review');
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewForm.userName.trim() || !newReviewForm.content.trim()) {
      toast.warning('Vui lòng nhập tên khách hàng và nội dung bình luận!');
      return;
    }

    const item = {
      id: Date.now(),
      ...newReviewForm,
      rating: Number(newReviewForm.rating) || 5,
      status: 'approved',
      createdAt: 'Vừa xong',
      reply: 'GoTravel xin cảm ơn quý khách đã gửi đánh giá 5 sao quý báu!'
    };

    setReviews([item, ...reviews]);
    toast.success(`Đã thêm thành công đánh giá 5 sao của ${item.userName}!`);
    setShowAddModal(false);
    setNewReviewForm({
      userName: '',
      productName: 'Tour Nhật Bản 6N5Đ Cung Đường Vàng',
      reviewableType: 'tour',
      rating: 5,
      content: 'Dịch vụ chuẩn 5 sao, hướng dẫn viên nhiệt tình chu đáo, khách sạn đẹp và đồ ăn ngon xuất sắc!'
    });
  };

  const handleSaveReply = (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setReviews(prev => prev.map(r => r.id === replyingReview.id ? { ...r, reply: replyContent.trim() } : r));
    toast.success('Đã gửi phản hồi CSKH tới khách hàng!');
    setReplyingReview(null);
    setReplyContent('');
  };

  const filtered = reviews.filter(r => {
    const matchStatus = statusFilter === 'Tất cả' || r.status === statusFilter;
    const matchType = typeFilter === 'Tất cả' || r.reviewableType === typeFilter;
    const matchStar = starFilter === 'all' || r.rating.toString() === starFilter;
    const matchSearch = r.userName.toLowerCase().includes(search.toLowerCase()) || 
                        r.productName.toLowerCase().includes(search.toLowerCase()) ||
                        r.content.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchType && matchStar && matchSearch;
  });

  const count5Star = reviews.filter(r => r.rating === 5).length;
  const pendingCount = reviews.filter(r => r.status === 'pending').length;

  return (
    <div className="p-6 font-sans space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Star size={24} className="text-amber-500 fill-amber-500" />
            Quản Lý Đánh Giá & Bình Luận 5 Sao
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tổng cộng <strong>{reviews.length} đánh giá</strong> ({count5Star} đánh giá 5 sao chất lượng cao)
            {pendingCount > 0 && <span className="ml-2 text-amber-600 font-bold">• {pendingCount} chờ duyệt</span>}
          </p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 text-sm shadow-sm transition cursor-pointer"
        >
          <Plus size={18} /> + Thêm Đánh Giá 5 Sao Mới
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Tìm theo tên khách, tour, nội dung..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
          {/* Star Filter */}
          <button
            onClick={() => setStarFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${starFilter === 'all' ? 'bg-amber-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600'}`}
          >
            Tất cả sao
          </button>
          <button
            onClick={() => setStarFilter('5')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1 ${starFilter === '5' ? 'bg-amber-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600'}`}
          >
            <Star size={13} className="fill-current" /> 5 Sao ({count5Star})
          </button>

          <span className="text-slate-300">|</span>

          {STATUS_OPTS.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${statusFilter === s ? 'bg-sky-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600'}`}
            >
              {s === 'Tất cả' ? 'Tất cả trạng thái' : STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filtered.map(r => (
          <div key={r.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5 flex-1">
                <div className="w-11 h-11 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center font-black text-white text-base shrink-0 shadow-sm">
                  {r.userName.charAt(0)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-bold text-slate-900 text-base">{r.userName}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
                      {r.reviewableType}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[r.status]}`}>
                      {STATUS_LABELS[r.status]}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-black text-sm">
                      {[...Array(r.rating || 5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                      <span className="ml-1 text-xs">({r.rating}★)</span>
                    </div>
                    <span className="text-xs text-slate-400">{r.createdAt}</span>
                  </div>

                  <div className="text-xs font-bold text-sky-600">{r.productName}</div>
                  <p className="text-sm text-slate-700 leading-relaxed pt-1">{r.content}</p>

                  {/* CSKH Reply */}
                  {r.reply && (
                    <div className="mt-2.5 p-3 bg-sky-50/70 border-l-3 border-sky-500 rounded-r-xl text-xs text-slate-700 space-y-0.5">
                      <div className="font-bold text-sky-800 flex items-center gap-1">
                        <Reply size={13} /> Phản hồi từ GoTravel Chăm Sóc Khách Hàng:
                      </div>
                      <p>{r.reply}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button 
                  onClick={() => { setReplyingReview(r); setReplyContent(r.reply || ''); }}
                  className="px-2.5 py-1.5 bg-slate-50 hover:bg-sky-50 text-sky-600 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-slate-200"
                  title="Trả lời đánh giá này"
                >
                  <Reply size={13} /> {r.reply ? 'Sửa phản hồi' : 'Trả lời'}
                </button>

                {r.status !== 'approved' && (
                  <button 
                    onClick={() => handleUpdateStatus(r.id, 'approved')}
                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-xl transition border border-slate-200" 
                    title="Duyệt đánh giá"
                  >
                    <CheckCircle size={16} />
                  </button>
                )}

                {r.status !== 'hidden' && (
                  <button 
                    onClick={() => handleUpdateStatus(r.id, 'hidden')}
                    className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-xl transition border border-slate-200" 
                    title="Ẩn đánh giá"
                  >
                    <EyeOff size={16} />
                  </button>
                )}

                <button 
                  onClick={() => handleDelete(r.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-xl transition border border-slate-200" 
                  title="Xóa đánh giá"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-400">
            <Star size={40} className="mx-auto mb-2 text-slate-300" />
            <p className="font-bold text-sm">Không tìm thấy đánh giá nào phù hợp với bộ lọc</p>
          </div>
        )}
      </div>

      {/* Modal Thêm Đánh Giá 5 Sao */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
                <Sparkles size={18} className="text-amber-500" />
                Thêm Đánh Giá 5 Sao Mới
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên khách hàng (*)</label>
                <input 
                  type="text" 
                  required
                  placeholder="VD: Nguyễn Tuấn Anh"
                  value={newReviewForm.userName}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, userName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sản phẩm / Chuyến tour</label>
                <select 
                  value={newReviewForm.productName}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, productName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                >
                  <option value="Tour Nhật Bản 6N5Đ Cung Đường Vàng">Tour Nhật Bản 6N5Đ Cung Đường Vàng</option>
                  <option value="Tour Hàn Quốc 5N4Đ Đảo Nami - Everland">Tour Hàn Quốc 5N4Đ Đảo Nami - Everland</option>
                  <option value="Vé Sun World Bà Nà Hills + Buffet Quốc Tế">Vé Sun World Bà Nà Hills + Buffet</option>
                  <option value="Vé VinWonders Phú Quốc All-In-One">Vé VinWonders Phú Quốc All-In-One</option>
                  <option value="Tour Đà Nẵng - Hội An - Bà Nà 4N3Đ">Tour Đà Nẵng - Hội An - Bà Nà 4N3Đ</option>
                  <option value="Tour Cửu Trại Câu Trung Quốc 6N5Đ">Tour Cửu Trại Câu Trung Quốc 6N5Đ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Số sao đánh giá</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewForm({ ...newReviewForm, rating: star })}
                      className="p-1 hover:scale-110 transition"
                    >
                      <Star 
                        size={24} 
                        className={star <= newReviewForm.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"} 
                      />
                    </button>
                  ))}
                  <span className="font-bold text-amber-600 text-sm ml-2">{newReviewForm.rating} / 5 Sao</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung bình luận (*)</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Nhập cảm nhận chân thực của khách hàng về chuyến đi..."
                  value={newReviewForm.content}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, content: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-2 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold text-slate-700"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow"
                >
                  Đăng Đánh Giá
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Trả Lời Đánh Giá */}
      {replyingReview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
                <Reply size={18} className="text-sky-600" />
                Trả Lời Đánh Giá Khách Hàng
              </h3>
              <button onClick={() => setReplyingReview(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1">
              <div>Khách hàng: <strong className="text-slate-800">{replyingReview.userName}</strong></div>
              <div className="text-slate-600 italic">"{replyingReview.content}"</div>
            </div>

            <form onSubmit={handleSaveReply} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung phản hồi từ GoTravel CSKH</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Dạ GoTravel xin cảm ơn quý khách..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-2 justify-end">
                <button 
                  type="button" 
                  onClick={() => setReplyingReview(null)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold text-slate-700"
                >
                  Đóng
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold shadow"
                >
                  Lưu & Gửi Phản Hồi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
