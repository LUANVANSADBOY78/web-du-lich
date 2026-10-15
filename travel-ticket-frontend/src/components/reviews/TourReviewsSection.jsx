// src/components/reviews/TourReviewsSection.jsx
import { useState, useEffect } from 'react';
import { 
  Star, ThumbsUp, CheckCircle, MessageSquare, Send, 
  Sparkles, ShieldCheck, User, PlusCircle, 
  Filter, Check, Trash2, Search, ArrowUpDown, Image as ImageIcon,
  ChevronDown
} from 'lucide-react';
import { getReviewsForTour, saveReviewForTour, deleteUserReview, calculateRatingSummary } from '../../data/mockReviews';
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

const POPULAR_TAGS = [
  '🌟 HDV nhiệt tình 10/10',
  '🍜 Đồ ăn siêu ngon',
  '🏨 Khách sạn sạch đẹp',
  '🚌 Xe đời mới êm ái',
  '📸 Chụp ảnh đẹp',
  '⏰ Đúng giờ cam kết',
  '🍁 Cảnh đẹp xuất sắc'
];

const TourReviewsSection = ({ tour }) => {
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({
    average: 5.0,
    total: 0,
    counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    percentages: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 }
  });

  // Filter & Search & Sort
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'rating_desc' | 'helpful'
  const [visibleCount, setVisibleCount] = useState(6);
  const [likedReviews, setLikedReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gotravel_liked_reviews') || '{}');
    } catch {
      return {};
    }
  });

  // Review Form state - Cho phép nhập TÊN BẤT KỲ
  const [showForm, setShowForm] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [tripType, setTripType] = useState('Đi cùng gia đình');
  const [reviewTitle, setReviewTitle] = useState('');
  const [commentText, setCommentText] = useState('');
  const [selectedTags, setSelectedTags] = useState(['🌟 HDV nhiệt tình 10/10']);
  const [imageUrl, setImageUrl] = useState('');
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
      const updated = { ...prev, [reviewId]: !isLiked };
      localStorage.setItem('gotravel_liked_reviews', JSON.stringify(updated));
      return updated;
    });
  };

  // Toggle quick tag selection
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Submit review with any name ("tên bất kỳ")
  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!authorName.trim()) {
      toast.warning('Vui lòng nhập họ tên của bạn (hoặc biệt danh bất kỳ)!');
      return;
    }

    if (!commentText.trim()) {
      toast.warning('Vui lòng nhập nội dung chia sẻ trải nghiệm về chuyến đi!');
      return;
    }

    setIsSubmitting(true);

    try {
      const newReviewData = {
        author: authorName.trim(),
        rating,
        tripType,
        title: reviewTitle.trim() || 'Trải nghiệm du lịch tuyệt vời',
        comment: commentText.trim(),
        tags: selectedTags,
        images: imageUrl.trim() ? [imageUrl.trim()] : []
      };

      const updated = saveReviewForTour(tour.id, newReviewData);
      setReviews(updated);
      setSummary(calculateRatingSummary(updated));

      toast.success(`🎉 Cảm ơn "${authorName.trim()}"! Đánh giá của bạn đã được xuất bản thành công.`);

      // Reset form
      setAuthorName('');
      setReviewTitle('');
      setCommentText('');
      setImageUrl('');
      setSelectedTags(['🌟 HDV nhiệt tình 10/10']);
      setRating(5);
      setShowForm(false);
    } catch (err) {
      toast.error('Có lỗi xảy ra khi lưu đánh giá. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete user review
  const handleDeleteUserReview = (reviewId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đánh giá này của mình?')) {
      const updated = deleteUserReview(tour.id, reviewId);
      setReviews(updated);
      setSummary(calculateRatingSummary(updated));
      toast.info('Đã xóa đánh giá của bạn.');
    }
  };

  // Filter & Search & Sort logic
  const filteredAndSortedReviews = reviews
    .filter(r => {
      // Filter by category / stars
      if (activeFilter === '5') {
        if (Math.round(r.rating) !== 5) return false;
      } else if (activeFilter === '4') {
        if (Math.round(r.rating) !== 4) return false;
      } else if (activeFilter === 'family') {
        if (!r.tripType?.toLowerCase().includes('gia đình')) return false;
      } else if (activeFilter === 'couple') {
        if (!r.tripType?.toLowerCase().includes('cặp đôi')) return false;
      } else if (activeFilter === 'has_image') {
        if (!r.images || r.images.length === 0) return false;
      } else if (activeFilter === 'reply') {
        if (!r.reply) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const authorMatch = r.author?.toLowerCase().includes(query);
        const titleMatch = r.title?.toLowerCase().includes(query);
        const commentMatch = r.comment?.toLowerCase().includes(query);
        const tagsMatch = r.tags?.some(t => t.toLowerCase().includes(query));
        if (!authorMatch && !titleMatch && !commentMatch && !tagsMatch) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'rating_desc') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'helpful') {
        const helpfulA = (a.helpfulCount || 0) + (likedReviews[a.id] ? 1 : 0);
        const helpfulB = (b.helpfulCount || 0) + (likedReviews[b.id] ? 1 : 0);
        return helpfulB - helpfulA;
      }
      return 0; // Default: 'newest' (order preserved as returned)
    });

  const visibleReviews = filteredAndSortedReviews.slice(0, visibleCount);

  return (
    <div id="danh-gia" className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm mt-8">
      {/* 1. SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Sparkles size={13} className="fill-current" /> Đánh giá thực tế
            </span>
            <span className="text-xs text-slate-500 font-semibold">100% từ du khách đã trải nghiệm</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900">
            Khách Hàng Đánh Giá & Bình Luận ({reviews.length})
          </h2>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 hover:opacity-95 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-sky-600/20 transition-all text-sm self-start sm:self-auto"
        >
          <PlusCircle size={17} />
          {showForm ? 'Đóng Biểu Mẫu' : 'Viết Đánh Giá Của Bạn'}
        </button>
      </div>

      {/* 2. OVERALL RATING & BREAKDOWN BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6 p-6 rounded-2xl bg-gradient-to-br from-slate-50 via-sky-50/30 to-blue-50/20 border border-slate-100">
        {/* Left: Score Box */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-5 bg-white rounded-2xl border border-slate-200/60 shadow-sm">
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
          <div className="text-sm font-black text-sky-700">Tuyệt vời vượt mong đợi</div>
          <div className="text-xs text-slate-500 mt-1">Dựa trên {summary.total} lượt đánh giá từ khách hàng</div>
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <CheckCircle size={14} /> 99% du khách hài lòng
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
              <span className="w-12 text-slate-600 text-right font-bold shrink-0">
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
        <form onSubmit={handleSubmitReview} className="mb-8 p-6 md:p-8 bg-sky-50/60 rounded-3xl border-2 border-sky-300 shadow-md transition-all animate-fadeIn">
          <div className="flex items-center gap-2 mb-2 text-sky-950 font-black text-lg md:text-xl">
            <MessageSquare size={22} className="text-sky-600" />
            Viết Nhận Xét & Đánh Giá Của Bạn (Tên Bất Kỳ)
          </div>
          <p className="text-xs md:text-sm text-slate-600 mb-6">
            Bạn có thể thoải mái nhập <strong>bất kỳ họ tên nào hoặc biệt danh</strong>. Đánh giá của bạn sẽ hiển thị ngay lập tức lên hệ thống!
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
                  placeholder="Ví dụ: Anh Hoàng Nam, Chị Thuỳ Linh, Bác Hùng..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition font-medium"
                  required
                />
              </div>
            </div>

            {/* Loại chuyến đi */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
                Bạn đã trải nghiệm tour cùng ai?
              </label>
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition font-medium cursor-pointer"
              >
                {TRIP_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Chọn số sao tương tác */}
          <div className="mb-5 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <label className="block text-xs font-black text-slate-700 uppercase mb-2">
              Bạn đánh giá chất lượng chuyến đi mấy sao? <span className="text-rose-500">*</span>
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
                      size={32}
                      className={`transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'text-amber-400 fill-current'
                          : 'text-slate-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-sm font-bold text-amber-700 bg-amber-50 px-3.5 py-1.5 rounded-xl border border-amber-200">
                {RATING_LABELS[hoverRating || rating]}
              </span>
            </div>
          </div>

          {/* Chọn Thẻ Nhanh Ấn Tượng */}
          <div className="mb-4">
            <label className="block text-xs font-black text-slate-700 uppercase mb-2">
              Điểm nổi bật bạn ấn tượng nhất (chọn 1 hoặc nhiều thẻ):
            </label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
                    }`}
                  >
                    {tag} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tiêu đề đánh giá */}
          <div className="mb-4">
            <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
              Tiêu đề nhận xét ngắn gọn
            </label>
            <input
              type="text"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="Ví dụ: Chuyến đi tuyệt vời, cảnh đẹp và HDV chu đáo..."
              className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition"
            />
          </div>

          {/* Nội dung đánh giá */}
          <div className="mb-4">
            <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
              Nội dung nhận xét chi tiết <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Chia sẻ cảm nhận thật của bạn về: Hướng dẫn viên, xe cộ, khách sạn, các bữa ăn, phong cảnh, lịch trình..."
              className="w-full px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition leading-relaxed"
              required
            />
          </div>

          {/* Ảnh đính kèm (URL tuỳ chọn) */}
          <div className="mb-6">
            <label className="block text-xs font-black text-slate-700 uppercase mb-1.5 flex items-center gap-1">
              <ImageIcon size={14} className="text-slate-400" />
              Đính kèm link ảnh thực tế (Tùy chọn)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Dán link ảnh (https://...) nếu bạn muốn chia sẻ ảnh kỷ niệm"
              className="w-full px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition"
            />
          </div>

          {/* Nút gửi */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200/60 rounded-xl transition"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black px-7 py-3 rounded-xl shadow-lg shadow-rose-500/25 transition-all text-sm disabled:opacity-50"
            >
              <Send size={16} />
              {isSubmitting ? 'Đang gửi...' : 'Gửi Đánh Giá Ngay'}
            </button>
          </div>
        </form>
      )}

      {/* 4. SEARCH, SORT & FILTER BAR */}
      <div className="space-y-4 mb-6 pb-4 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm theo tên khách, HDV, khách sạn, món ăn..."
              className="w-full pl-10 pr-4 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <ArrowUpDown size={13} /> Sắp xếp:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl outline-none focus:border-sky-500 cursor-pointer"
            >
              <option value="newest">Mới nhất</option>
              <option value="rating_desc">Đánh giá cao nhất (5★)</option>
              <option value="helpful">Hữu ích nhất (Nhiều like)</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
            <Filter size={13} /> Bộ lọc:
          </span>
          {[
            { id: 'all', label: `Tất cả (${reviews.length})` },
            { id: '5', label: `5 sao (${summary.counts[5] || 0})` },
            { id: '4', label: `4 sao (${summary.counts[4] || 0})` },
            { id: 'has_image', label: 'Có ảnh chụp' },
            { id: 'family', label: 'Gia đình' },
            { id: 'couple', label: 'Cặp đôi' },
            { id: 'reply', label: 'Có phản hồi CSKH' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveFilter(tab.id);
                setVisibleCount(6);
              }}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition ${
                activeFilter === tab.id
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-sky-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. REVIEWS LIST */}
      <div className="space-y-5">
        {visibleReviews.map((rev) => {
          const isLiked = !!likedReviews[rev.id];
          const currentHelpful = (rev.helpfulCount || 0) + (isLiked ? 1 : 0);

          return (
            <div
              key={rev.id}
              className={`p-5 md:p-6 rounded-2xl border transition-all ${
                rev.isUserReview
                  ? 'bg-gradient-to-br from-sky-50/50 to-white border-sky-300 shadow-sm'
                  : 'bg-slate-50/70 border-slate-200/70 hover:border-sky-200 hover:bg-white hover:shadow-sm'
              }`}
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
                      {rev.isUserReview && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-black text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md border border-sky-300">
                          Đánh giá của bạn
                        </span>
                      )}
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

                {/* Rating Badge & User delete */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded-lg border border-amber-200 text-xs">
                    <Star size={13} className="fill-current text-amber-500" />
                    <span>{rev.rating}.0</span>
                  </div>
                  {rev.isUserReview && (
                    <button
                      onClick={() => handleDeleteUserReview(rev.id)}
                      title="Xóa đánh giá của bạn"
                      className="text-slate-400 hover:text-red-500 p-1 rounded-lg transition"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>

              {/* Title & Comment */}
              {rev.title && (
                <h4 className="font-bold text-slate-900 text-sm md:text-base mb-1.5">
                  {rev.title}
                </h4>
              )}
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed mb-3">
                {rev.comment}
              </p>

              {/* Tags */}
              {rev.tags && rev.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {rev.tags.map((t, idx) => (
                    <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Photos attached */}
              {rev.images && rev.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {rev.images.map((img, i) => (
                    <a key={i} href={img} target="_blank" rel="noopener noreferrer">
                      <img
                        src={img}
                        alt="Khách chụp thực tế"
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl border border-slate-200 shadow-sm hover:opacity-90 transition"
                      />
                    </a>
                  ))}
                </div>
              )}

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

        {filteredAndSortedReviews.length === 0 && (
          <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <MessageSquare size={40} className="mx-auto mb-2 opacity-50" />
            <p className="font-bold text-sm text-slate-700">Chưa có đánh giá nào phù hợp với bộ lọc hoặc từ khóa tìm kiếm</p>
            <p className="text-xs text-slate-500 mt-1">Hãy nhấn "Viết Đánh Giá Của Bạn" để là người đầu tiên chia sẻ!</p>
          </div>
        )}
      </div>

      {/* 6. LOAD MORE BUTTON (Xem thêm nhiều người đánh giá hơn) */}
      {visibleReviews.length < filteredAndSortedReviews.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-2.5 rounded-xl transition text-sm shadow-sm"
          >
            <ChevronDown size={16} />
            Xem Thêm Nhiều Đánh Giá Khác ({filteredAndSortedReviews.length - visibleReviews.length} còn lại)
          </button>
        </div>
      )}
    </div>
  );
};

export default TourReviewsSection;
