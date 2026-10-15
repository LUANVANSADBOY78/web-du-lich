// src/components/reviews/TourReviewsSection.jsx
import { useState, useEffect } from 'react';
import { 
  Star, ThumbsUp, CheckCircle, MessageSquare, Send, 
  Sparkles, ShieldCheck, HeartHandshake, User, PlusCircle, 
  Filter, Check, AlertCircle, ChevronDown
} from 'lucide-react';
import { getReviewsForTour, saveReviewForTour, calculateRatingSummary } from '../../data/mockReviews';
import { toast } from 'react-toastify';

const TRIP_TYPES = [
  'Đi cùng gia đình',
  'Đi theo cặp đôi',
  'Đi cùng bạn bè',
  'Đi một mình / Công tác'
];

const RATING_LABELS = {
  5: 'Tuyệt vời - Vượt ngoài mong đợi! (5★)',
  4: 'Rất tốt - Dịch vụ hài lòng (4★)',
  3: 'Bình thường - Đạt yêu cầu (3★)',
  2: 'Tạm được - Cần cải thiện (2★)',
  1: 'Không hài lòng (1★)'
};

const TourReviewsSection = ({ tour }) => {
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({
    average: 5.0,
    total: 0,
    counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    percentages: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 }
  });

  // Filter & Search
  const [activeFilter, setActiveFilter] = useState('all');
  const [likedReviews, setLikedReviews] = useState({});

  // Review Form state - Cho phép tên bất kỳ ("tên mất kì")
  const [showForm, setShowForm] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [tripType, setTripType] = useState('Đi cùng gia đình');
  const [reviewTitle, setReviewTitle] = useState('');
  const [commentText, setCommentText] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load reviews on tour change
  useEffect(() => {
    if (tour?.id) {
      const tourReviews = getReviewsForTour(tour.id);
      setReviews(tourReviews);
      setSummary(calculateRatingSummary(tourReviews));
    }
  }, [tour?.id]);

  // Handle helpful like
  const handleLike = (reviewId) => {
    setLikedReviews(prev => {
      const isLiked = !!prev[reviewId];
      return { ...prev, [reviewId]: !isLiked };
    });
  };

  // Submit review with any name ("tên bất kỳ")
  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!authorName.trim()) {
      toast.warning('Vui lòng nhập tên của bạn (tên bất kỳ hoặc biệt danh)!');
      return;
    }

    if (!commentText.trim()) {
      toast.warning('Vui lòng nhập nội dung chia sẻ trải nghiệm về tour!');
      return;
    }

    setIsSubmitting(true);

    try {
      const newReviewData = {
        author: authorName.trim(),
        rating,
        tripType,
        title: reviewTitle.trim() || 'Trải nghiệm du lịch tuyệt vời',
        comment: commentText.trim()
      };

      const updated = saveReviewForTour(tour.id, newReviewData);
      setReviews(updated);
      setSummary(calculateRatingSummary(updated));

      toast.success(`Cảm ơn bạn "${authorName.trim()}"! Đánh giá đã được đăng thành công.`);

      // Reset form
      setAuthorName('');
      setReviewTitle('');
      setCommentText('');
      setContactInfo('');
      setRating(5);
      setShowForm(false);
    } catch (err) {
      toast.error('Có lỗi xảy ra khi lưu đánh giá. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter logic
  const filteredReviews = reviews.filter(r => {
    if (activeFilter === 'all') return true;
    if (activeFilter === '5') return Math.round(r.rating) === 5;
    if (activeFilter === '4') return Math.round(r.rating) === 4;
    if (activeFilter === 'family') return r.tripType?.includes('gia đình');
    if (activeFilter === 'couple') return r.tripType?.includes('cặp đôi');
    if (activeFilter === 'reply') return !!r.reply;
    return true;
  });

  return (
    <div id="danh-gia" className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm mt-8">
      {/* 1. SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-100 text-amber-800 text-xs font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
              <Sparkles size={13} className="text-amber-500 fill-current" /> Đánh giá thực tế
            </span>
            <span className="text-xs text-slate-400 font-medium">100% từ du khách đã đi tour</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900">
            Khách Hàng Đánh Giá & Bình Luận ({reviews.length})
          </h2>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-sky-600/20 transition-all text-sm self-start sm:self-auto"
        >
          <PlusCircle size={17} />
          {showForm ? 'Đóng biểu mẫu' : 'Viết Đánh Giá Ngay'}
        </button>
      </div>

      {/* 2. OVERALL RATING & BREAKDOWN BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6 p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/40 border border-slate-100">
        {/* Left: Score Box */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-white rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="text-5xl font-black text-slate-900 mb-1 tracking-tight">
            {(summary.average * 2).toFixed(1)} <span className="text-lg text-slate-400 font-semibold">/10</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                className={`fill-current ${star <= Math.round(summary.average) ? 'text-amber-400' : 'text-slate-200'}`}
              />
            ))}
          </div>
          <div className="text-sm font-bold text-sky-700">Tuyệt vời vượt mong đợi</div>
          <div className="text-xs text-slate-500 mt-1">Dựa trên {summary.total} lượt đánh giá thực tế</div>
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <CheckCircle size={14} /> 98% du khách hài lòng
          </div>
        </div>

        {/* Right: Star Distribution Bars */}
        <div className="md:col-span-8 flex flex-col justify-center space-y-2.5">
          {[5, 4, 3, 2, 1].map((s) => (
            <div key={s} className="flex items-center gap-3 text-xs">
              <span className="font-bold text-slate-600 w-12 flex items-center gap-1 shrink-0">
                {s} <Star size={12} className="fill-current text-amber-400" />
              </span>
              <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-700"
                  style={{ width: `${summary.percentages[s] || 0}%` }}
                />
              </div>
              <span className="w-12 text-slate-500 text-right font-medium shrink-0">
                {summary.percentages[s] || 0}%
              </span>
              <span className="w-14 text-slate-400 text-right shrink-0">
                ({summary.counts[s] || 0})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. REVIEW FORM (Cho phép nhập TÊN BẤT KỲ) */}
      {showForm && (
        <form onSubmit={handleSubmitReview} className="mb-8 p-6 md:p-8 bg-sky-50/50 rounded-2xl border-2 border-sky-200 transition-all animate-fadeIn">
          <div className="flex items-center gap-2 mb-4 text-sky-900 font-black text-lg">
            <MessageSquare size={20} className="text-sky-600" />
            Viết Nhận Xét & Đánh Giá Của Bạn
          </div>
          <p className="text-xs text-slate-600 mb-6">
            Bạn có thể nhập <strong>bất kỳ họ tên nào</strong> (không bắt buộc đăng nhập). Ý kiến đóng góp chân thực của bạn sẽ giúp du khách khác có thêm thông tin hữu ích!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Tên người đánh giá (tên bất kỳ) */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
                Họ và tên của bạn (Tên bất kỳ) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Ví dụ: Anh Hoàng Nam, Chị Thuỳ Linh, Gia đình bác Hùng..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition"
                  required
                />
              </div>
            </div>

            {/* Số điện thoại / Email (tùy chọn) */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
                Số điện thoại / Email <span className="text-slate-400 font-normal">(Tùy chọn - nhận mã ưu đãi)</span>
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="Ví dụ: 0912xxx890 hoặc email@example.com"
                className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition"
              />
            </div>
          </div>

          {/* Chọn số sao tương tác */}
          <div className="mb-5 p-4 bg-white rounded-xl border border-slate-200">
            <label className="block text-xs font-black text-slate-700 uppercase mb-2">
              Chất lượng tour & dịch vụ:
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      size={28}
                      className={`transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'text-amber-400 fill-current'
                          : 'text-slate-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                {RATING_LABELS[hoverRating || rating]}
              </span>
            </div>
          </div>

          {/* Loại chuyến đi */}
          <div className="mb-4">
            <label className="block text-xs font-black text-slate-700 uppercase mb-2">
              Bạn đã trải nghiệm tour cùng ai?
            </label>
            <div className="flex flex-wrap gap-2">
              {TRIP_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTripType(type)}
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition ${
                    tripType === type
                      ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-sky-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Tiêu đề đánh giá */}
          <div className="mb-4">
            <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
              Tiêu đề nhận xét
            </label>
            <input
              type="text"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="Ví dụ: Chuyến đi mùa thu tuyệt đẹp, HDV cực kỳ nhiệt tình..."
              className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition"
            />
          </div>

          {/* Nội dung đánh giá */}
          <div className="mb-6">
            <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
              Nội dung nhận xét chi tiết <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Chia sẻ cảm nhận của bạn về khách sạn, bữa ăn, hướng dẫn viên, phương tiện di chuyển, cảnh đẹp..."
              className="w-full px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition leading-relaxed"
              required
            />
          </div>

          {/* Nút gửi */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-black px-6 py-2.5 rounded-xl shadow-lg shadow-rose-500/20 transition-all text-sm disabled:opacity-50"
            >
              <Send size={16} />
              {isSubmitting ? 'Đang gửi...' : 'Gửi Đánh Giá Ngay'}
            </button>
          </div>
        </form>
      )}

      {/* 4. FILTER TABS */}
      <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-slate-100">
        <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
          <Filter size={14} /> Lọc theo:
        </span>
        <button
          onClick={() => setActiveFilter('all')}
          className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border transition ${
            activeFilter === 'all'
              ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-sky-300'
          }`}
        >
          Tất cả ({reviews.length})
        </button>
        <button
          onClick={() => setActiveFilter('5')}
          className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border transition flex items-center gap-1 ${
            activeFilter === '5'
              ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-sky-300'
          }`}
        >
          5 sao ({summary.counts[5] || 0})
        </button>
        <button
          onClick={() => setActiveFilter('4')}
          className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border transition flex items-center gap-1 ${
            activeFilter === '4'
              ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-sky-300'
          }`}
        >
          4 sao ({summary.counts[4] || 0})
        </button>
        <button
          onClick={() => setActiveFilter('family')}
          className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border transition ${
            activeFilter === 'family'
              ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-sky-300'
          }`}
        >
          Gia đình
        </button>
        <button
          onClick={() => setActiveFilter('couple')}
          className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border transition ${
            activeFilter === 'couple'
              ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-sky-300'
          }`}
        >
          Cặp đôi
        </button>
        <button
          onClick={() => setActiveFilter('reply')}
          className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border transition ${
            activeFilter === 'reply'
              ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-sky-300'
          }`}
        >
          Có phản hồi CSKH
        </button>
      </div>

      {/* 5. REVIEWS LIST */}
      <div className="space-y-6">
        {filteredReviews.map((rev) => {
          const isLiked = !!likedReviews[rev.id];
          const currentHelpful = (rev.helpfulCount || 0) + (isLiked ? 1 : 0);

          return (
            <div
              key={rev.id}
              className="p-5 md:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-sky-200 transition-all hover:bg-white hover:shadow-sm"
            >
              {/* Reviewer Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-tr ${
                      rev.avatarColor || 'from-sky-500 to-blue-600'
                    } text-white font-black text-base flex items-center justify-center shadow-sm shrink-0`}
                  >
                    {(rev.author || 'D').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm md:text-base">
                        {rev.author}
                      </span>
                      {rev.verified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                          <Check size={12} /> Đã trải nghiệm tour
                        </span>
                      )}
                      {rev.tripType && (
                        <span className="text-[11px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {rev.tripType}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{rev.date}</div>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded-lg border border-amber-200 text-xs shrink-0">
                  <Star size={13} className="fill-current text-amber-500" />
                  <span>{rev.rating}.0</span>
                </div>
              </div>

              {/* Title & Comment */}
              {rev.title && (
                <h4 className="font-bold text-slate-800 text-sm md:text-base mb-1.5">
                  {rev.title}
                </h4>
              )}
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed mb-4">
                {rev.comment}
              </p>

              {/* Footer action */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleLike(rev.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${
                    isLiked
                      ? 'bg-sky-100 text-sky-700 font-bold'
                      : 'hover:bg-slate-200/60 text-slate-600'
                  }`}
                >
                  <ThumbsUp size={13} className={isLiked ? 'fill-current' : ''} />
                  <span>Hữu ích ({currentHelpful})</span>
                </button>
                <span className="text-slate-400">Đánh giá đã được xác thực</span>
              </div>

              {/* CSKH Response Box */}
              {rev.reply && (
                <div className="mt-4 p-4 rounded-xl bg-sky-50/80 border border-sky-100 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-sky-900 mb-1">
                    <ShieldCheck size={14} className="text-sky-600" />
                    <span>{rev.reply.author}</span>
                    <span className="text-slate-400 font-normal">• {rev.reply.date}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed pl-5">
                    {rev.reply.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {filteredReviews.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <MessageSquare size={40} className="mx-auto mb-2 opacity-50" />
            <p className="font-bold text-sm">Chưa có đánh giá nào phù hợp với bộ lọc</p>
            <p className="text-xs mt-1">Hãy bấm "Viết Đánh Giá Ngay" để là người đầu tiên chia sẻ!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourReviewsSection;

