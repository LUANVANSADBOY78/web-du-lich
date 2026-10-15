import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, Calendar, MapPin, ChevronRight, 
  Flame, Snowflake, Train, Ship, Compass, Sparkles, RotateCcw,
  Phone, Shield, Award, Star, MessageSquare, PlusCircle, CheckCircle2, ThumbsUp, X, Send, User, Check
} from 'lucide-react';
import { MOCK_TOURS, TOUR_COLLECTIONS, POPULAR_TOUR_DESTINATIONS } from '../data/mockTours';
import TourCard from '../components/common/TourCard';
import { saveReviewForTour } from '../data/mockReviews';
import { toast } from 'react-toastify';

const Tours = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || searchParams.get('q') || '';
  const initialDeparture = searchParams.get('departure') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedDeparture, setSelectedDeparture] = useState(initialDeparture);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    const q = searchParams.get('search') || searchParams.get('q');
    if (q !== null) setSearchQuery(q);
    const cat = searchParams.get('category');
    if (cat !== null) setActiveCategory(cat);
    const dep = searchParams.get('departure');
    if (dep !== null) setSelectedDeparture(dep);
  }, [searchParams]);

  // Quick Review Modal State (Cho phép tên bất kỳ)
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [modalTourId, setModalTourId] = useState('tour-5');
  const [modalAuthor, setModalAuthor] = useState('');
  const [modalRating, setModalRating] = useState(5);
  const [modalTripType, setModalTripType] = useState('Đi cùng gia đình');
  const [modalTitle, setModalTitle] = useState('');
  const [modalComment, setModalComment] = useState('');

  const handleQuickSubmitReview = (e) => {
    e.preventDefault();
    if (!modalAuthor.trim()) {
      toast.warning('Vui lòng nhập tên của bạn (tên bất kỳ hoặc biệt danh)!');
      return;
    }
    if (!modalComment.trim()) {
      toast.warning('Vui lòng nhập nội dung đánh giá!');
      return;
    }

    saveReviewForTour(modalTourId, {
      author: modalAuthor.trim(),
      rating: modalRating,
      tripType: modalTripType,
      title: modalTitle.trim() || 'Trải nghiệm du lịch chất lượng',
      comment: modalComment.trim()
    });

    toast.success(`Cảm ơn bạn "${modalAuthor.trim()}"! Đánh giá của bạn đã được đăng thành công.`);
    setShowReviewModal(false);
    setModalAuthor('');
    setModalTitle('');
    setModalComment('');
    setModalRating(5);
  };

  const filteredTours = MOCK_TOURS.filter(tour => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = tour.name?.toLowerCase().includes(q);
      const matchDest = tour.destination?.toLowerCase().includes(q);
      const matchDeparture = tour.departure?.toLowerCase().includes(q);
      const matchTags = tour.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchDest && !matchDeparture && !matchTags) {
        return false;
      }
    }
    if (selectedDeparture && tour.departure !== selectedDeparture) {
      return false;
    }
    if (selectedDestination) {
      const d = selectedDestination.toLowerCase().trim();
      const matchDest = tour.destination?.toLowerCase().includes(d);
      const matchName = tour.name?.toLowerCase().includes(d);
      if (!matchDest && !matchName) {
        return false;
      }
    }
    if (activeCategory !== 'all' && tour.category !== activeCategory) {
      return false;
    }
    return true;
  });

  const getToursByCategory = (catId, limit = 3) => {
    return MOCK_TOURS.filter(t => t.category === catId).slice(0, limit);
  };

  const getCollectionIcon = (iconName) => {
    switch(iconName) {
      case 'Flame': return <Flame className="text-rose-500" size={24} />;
      case 'Snowflake': return <Snowflake className="text-sky-500" size={24} />;
      case 'Train': return <Train className="text-amber-500" size={24} />;
      case 'Ship': return <Ship className="text-blue-500" size={24} />;
      case 'Compass': return <Compass className="text-emerald-500" size={24} />;
      case 'MapPin': return <MapPin className="text-rose-500" size={24} />;
      default: return <Sparkles className="text-amber-500" size={24} />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-16">
      
      {/* 1. HERO & STATS SECTION (Theo chuẩn iVIVU) */}
      <div className="relative bg-gradient-to-r from-sky-900 via-sky-800 to-blue-900 pt-16 pb-28 px-4 text-white">
        <div className="max-w-[1240px] mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
            Đặt Tour Du Lịch Trong Nước & Quốc Tế
          </h1>
          <p className="text-sky-100 text-base md:text-lg max-w-2xl mx-auto mb-8 font-medium">
            Hơn 1.000+ tour trọn gói chất lượng cao, ưu đãi khởi hành hàng tuần với hỗ trợ chu đáo 24/7
          </p>

          {/* 3 Thống kê nổi bật của iVIVU */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-black text-xl shrink-0">
                1k+
              </div>
              <div>
                <div className="font-black text-white text-base">1.000+ Tour</div>
                <div className="text-xs text-sky-200">Từ tiết kiệm đến cao cấp</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-400/20 text-rose-400 flex items-center justify-center font-black text-xl shrink-0">
                100+
              </div>
              <div>
                <div className="font-black text-white text-base">100+ Ưu đãi</div>
                <div className="text-xs text-sky-200">Giảm giá và ưu đãi theo nhóm</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-black text-xl shrink-0">
                10k+
              </div>
              <div>
                <div className="font-black text-white text-base">10.000+ Lượt đánh giá</div>
                <div className="text-xs text-sky-200">Từ khách hàng đã trải nghiệm</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SEARCH BOX NỔI BẬT */}
      <div className="max-w-[1240px] mx-auto px-4 -mt-14 relative z-20 mb-8">
        <div className="bg-white rounded-3xl shadow-xl p-4 md:p-6 border border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Tên tour / Điểm đến */}
            <div className="relative">
              <label className="text-[11px] font-bold text-slate-500 uppercase mb-1 block">Tìm điểm đến hoặc tên tour</label>
              <div className="flex items-center border border-slate-200 rounded-2xl p-3 bg-slate-50 focus-within:border-sky-500">
                <Search size={18} className="text-sky-600 mr-2 shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Hàn Quốc, Nhật Bản, Đà Nẵng..." 
                  className="bg-transparent w-full outline-none text-xs font-bold text-slate-800" 
                />
              </div>
            </div>

            {/* Nơi khởi hành */}
            <div className="relative">
              <label className="text-[11px] font-bold text-slate-500 uppercase mb-1 block">Nơi khởi hành</label>
              <div className="flex items-center border border-slate-200 rounded-2xl p-3 bg-slate-50">
                <MapPin size={18} className="text-sky-600 mr-2 shrink-0" />
                <select 
                  value={selectedDeparture}
                  onChange={(e) => setSelectedDeparture(e.target.value)}
                  className="bg-transparent w-full outline-none text-xs font-bold text-slate-800"
                >
                  <option value="">Tất cả nơi khởi hành</option>
                  <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Singapore">Singapore (Du thuyền)</option>
                </select>
              </div>
            </div>

            {/* Tháng / Ngày đi */}
            <div className="relative">
              <label className="text-[11px] font-bold text-slate-500 uppercase mb-1 block">Thời gian khởi hành</label>
              <div className="flex items-center border border-slate-200 rounded-2xl p-3 bg-slate-50">
                <Calendar size={18} className="text-sky-600 mr-2 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Tháng 10, 11, 12..." 
                  className="bg-transparent w-full outline-none text-xs font-bold text-slate-800" 
                />
              </div>
            </div>

            {/* Nút tìm kiếm */}
            <div className="flex items-end">
              <button 
                onClick={() => {
                  document.getElementById('danh-sach-tour')?.scrollIntoView({ behavior: 'smooth' });
                  toast.info(`Tìm thấy ${filteredTours.length} tour du lịch phù hợp!`);
                }}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 transition-all text-sm"
              >
                <Search size={18} /> TÌM TOUR NGAY
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 2.5 ĐIỂM ĐẾN THỊNH HÀNH (Trending Destinations - Theo phong cách iVIVU) */}
      <div className="max-w-[1240px] mx-auto px-4 mb-8">
        <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                <h3 className="font-black text-slate-900 text-lg md:text-xl">Điểm Đến Thịnh Hành Nhất</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Bấm vào bất kỳ điểm đến nào để xem trọn gói tour du lịch hấp dẫn</p>
            </div>
            {selectedDestination && (
              <button
                onClick={() => setSelectedDestination('')}
                className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 bg-rose-50 px-3 py-1.5 rounded-full transition"
              >
                <X size={13} /> Bỏ lọc ({selectedDestination})
              </button>
            )}
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {POPULAR_TOUR_DESTINATIONS.map(dest => {
              const isSelected = selectedDestination.toLowerCase() === dest.name.toLowerCase();
              return (
                <button
                  key={dest.name}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedDestination('');
                    } else {
                      setSelectedDestination(dest.name);
                      document.getElementById('danh-sach-tour')?.scrollIntoView({ behavior: 'smooth' });
                      toast.info(`Đang hiển thị tour du lịch tại ${dest.name}`);
                    }
                  }}
                  className={`group flex-shrink-0 flex items-center gap-2.5 p-2 pr-4 rounded-2xl border transition-all text-left ${
                    isSelected 
                      ? 'border-sky-500 bg-sky-50/90 shadow-md shadow-sky-500/10 ring-2 ring-sky-400' 
                      : 'border-slate-100 bg-slate-50 hover:border-sky-200 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm">
                    <img 
                      src={dest.img} 
                      alt={dest.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-sky-600/40 flex items-center justify-center text-white">
                        <Check size={16} className="stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className={`text-xs font-black line-clamp-1 ${isSelected ? 'text-sky-700' : 'text-slate-800 group-hover:text-sky-600'}`}>
                      {dest.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {dest.count}+ tour
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. QUICK FILTER PILLS (Thanh chuyên mục kiểu iVIVU) */}
      <div id="danh-sach-tour" className="max-w-[1240px] mx-auto px-4 mb-10 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex gap-2">
          <button 
            onClick={() => { setActiveCategory('all'); setSelectedDestination(''); }}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-colors ${
              activeCategory === 'all' && !selectedDestination
                ? 'bg-slate-900 text-white' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Tất cả Tour ({MOCK_TOURS.length})
          </button>
          {TOUR_COLLECTIONS.map(col => (
            <button 
              key={col.id}
              onClick={() => { setActiveCategory(col.id); setSelectedDestination(''); }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                activeCategory === col.id 
                  ? 'bg-sky-600 text-white' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {col.title}
            </button>
          ))}
        </div>
      </div>

      {/* 4. CHÙM TOUR NỔI BẬT THEO DANH MỤC (Khi xem Tất Cả) */}
      {activeCategory === 'all' && !searchQuery && !selectedDeparture && !selectedDestination && (
        <div className="max-w-[1240px] mx-auto px-4 space-y-14 mb-16">
          {TOUR_COLLECTIONS.map(col => {
            const tours = getToursByCategory(col.id, 3);
            if (tours.length === 0) return null;

            return (
              <section key={col.id} className="relative">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      {getCollectionIcon(col.icon)}
                      <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                        {col.title}
                      </h2>
                    </div>
                    <p className="text-sm text-slate-500 mt-1 font-medium">{col.subtitle}</p>
                  </div>
                  <button 
                    onClick={() => setActiveCategory(col.id)}
                    className="text-sky-600 font-bold hover:text-sky-700 text-sm flex items-center gap-1 group shrink-0"
                  >
                    Xem thêm <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tours.map(tour => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* 5. TẤT CẢ TOUR & BỘ LỌC CHI TIẾT */}
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="border-t border-slate-200 pt-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                {selectedDestination 
                  ? `Tour Du Lịch Tại ${selectedDestination}` 
                  : activeCategory === 'all' 
                    ? 'Tất Cả Danh Sách Tour' 
                    : TOUR_COLLECTIONS.find(c => c.id === activeCategory)?.title || 'Danh Sách Tour'}
                {selectedDestination && (
                  <span className="text-xs bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full font-bold">
                    Điểm đến đã chọn
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500 mt-1">Tìm thấy {filteredTours.length} hành trình phù hợp</p>
            </div>
            {(searchQuery || selectedDeparture || selectedDestination || activeCategory !== 'all') && (
              <button 
                onClick={() => { setSearchQuery(''); setSelectedDeparture(''); setSelectedDestination(''); setActiveCategory('all'); }}
                className="text-xs text-sky-600 font-bold hover:underline flex items-center gap-1 bg-sky-50 px-3 py-1.5 rounded-lg transition"
              >
                <RotateCcw size={12} /> Xóa bộ lọc
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 my-8">
              <div className="text-5xl mb-3">🏖️</div>
              <h3 className="font-black text-lg text-slate-800 mb-1">Không tìm thấy tour phù hợp</h3>
              <p className="text-sm text-slate-500 mb-4">Hãy thử điều chỉnh lại từ khóa hoặc điểm khởi hành</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedDeparture(''); setSelectedDestination(''); setActiveCategory('all'); }}
                className="bg-sky-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-sky-700 transition"
              >
                Xem tất cả Tour
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 5.5 KHÁCH HÀNG ĐÁNH GIÁ & BÌNH LUẬN (CHÙM TOUR THEO CHUẨN iVIVU) */}
      <div className="max-w-[1240px] mx-auto px-4 mt-16 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-100 text-amber-800 text-xs font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                <Star size={13} className="text-amber-500 fill-current" /> Hơn 10.000+ Lượt Đánh Giá
              </span>
              <span className="text-xs text-slate-500 font-medium">98% du khách hài lòng & muốn quay lại</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Khách Hàng Nói Gì Về GoTicket?
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Hình ảnh & cảm nhận chân thực từ những du khách đã đồng hành trong các hành trình du lịch
            </p>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold px-5 py-3 rounded-2xl shadow-md shadow-sky-600/20 transition-all text-sm self-start md:self-auto"
          >
            <PlusCircle size={17} /> Viết Đánh Giá Của Bạn
          </button>
        </div>

        {/* 4 Cards Đánh Giá Nổi Bật */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-sky-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                    Q
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Trần Minh Quân</h4>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
                      <Check size={12} /> Đã đi tour
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-current" />)}
                </div>
              </div>
              <span className="inline-block text-[11px] bg-sky-50 text-sky-700 font-bold px-2 py-0.5 rounded mb-2">
                Tour Nhật Bản 6N5Đ Mùa Thu
              </span>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                "Lễ hội lá đỏ ở hồ Kawaguchiko ngắm núi Phú Sĩ đẹp ngỡ ngàng, bố mẹ mình lớn tuổi đi rất thoải mái. Hướng dẫn viên tên Nam nhiệt tình, am hiểu văn hóa và chụp ảnh cho gia đình siêu có tâm. Khách sạn chuẩn 4 sao sạch sẽ, tắm onsen thư giãn tuyệt vời!"
              </p>
            </div>
            <a href="/tour/tour-5#danh-gia" className="text-xs font-bold text-sky-600 hover:text-sky-700 mt-4 pt-3 border-t border-slate-100 flex items-center gap-1">
              Xem chi tiết tour & đánh giá →
            </a>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-sky-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                    Y
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Lê Hoàng Yến</h4>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
                      <Check size={12} /> Đã đi tour
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-current" />)}
                </div>
              </div>
              <span className="inline-block text-[11px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded mb-2">
                Tour Hàn Quốc 4N4Đ Mùa Thu
              </span>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                "Nhóm 4 đứa mình vừa đi tour về. Đảo Nami mùa thu cây ngân hạnh vàng rực như trong phim Hàn, công viên Everland rộng và nhiều trò chơi hấp dẫn. Bữa ăn gà hầm sâm và thịt nướng BBQ chuẩn vị Hàn ăn rất no!"
              </p>
            </div>
            <a href="/tour/tour-4#danh-gia" className="text-xs font-bold text-sky-600 hover:text-sky-700 mt-4 pt-3 border-t border-slate-100 flex items-center gap-1">
              Xem chi tiết tour & đánh giá →
            </a>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-sky-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                    N
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Bích Ngọc</h4>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
                      <Check size={12} /> Đã đi tour
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-current" />)}
                </div>
              </div>
              <span className="inline-block text-[11px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded mb-2">
                Tour Trăng Mật Nhật Bản
              </span>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                "Hai vợ chồng mình chọn tour này đi tuần trăng mật và hoàn toàn hài lòng 100%. Đội ngũ làm visa hỗ trợ giấy tờ rất tận tâm, chỉ 6 ngày là có kết quả. Tàu Shinkansen êm ru, Kyoto mùa lá đỏ thơ mộng chụp ảnh cháy máy."
              </p>
            </div>
            <a href="/tour/tour-5#danh-gia" className="text-xs font-bold text-sky-600 hover:text-sky-700 mt-4 pt-3 border-t border-slate-100 flex items-center gap-1">
              Xem chi tiết tour & đánh giá →
            </a>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-sky-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                    H
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Thanh Hương</h4>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
                      <Check size={12} /> Đã đi tour
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-current" />)}
                </div>
              </div>
              <span className="inline-block text-[11px] bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded mb-2">
                Tour Xe Lửa Miền Trung 3N3Đ
              </span>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                "Trải nghiệm đi tàu hỏa ngắm vịnh Lăng Cô và đèo Hải Vân thật sự rất đẹp và thư thái. Khoang tàu sạch sẽ, máy lạnh mát mẻ. Khách sạn ở Đà Nẵng sát biển Mỹ Khê, vé cáp treo Bà Nà Hills trọn gói rất tiện lợi."
              </p>
            </div>
            <a href="/tour/tour-10#danh-gia" className="text-xs font-bold text-sky-600 hover:text-sky-700 mt-4 pt-3 border-t border-slate-100 flex items-center gap-1">
              Xem chi tiết tour & đánh giá →
            </a>
          </div>
        </div>
      </div>

      {/* QUICK REVIEW MODAL (Hỗ trợ nhập TÊN BẤT KỲ) */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative my-8 border border-slate-100 animate-fadeIn">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-2 text-sky-900 font-black text-xl">
              <MessageSquare size={22} className="text-sky-600" />
              Đánh Giá & Nhận Xét Tour
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Bạn có thể nhập <strong>họ tên bất kỳ</strong> (không bắt buộc đăng nhập). Nhận xét sẽ được hiển thị công khai ngay sau khi gửi!
            </p>

            <form onSubmit={handleQuickSubmitReview} className="space-y-4">
              {/* Chọn Tour muốn đánh giá */}
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
                  Chọn tour bạn muốn đánh giá <span className="text-rose-500">*</span>
                </label>
                <select
                  value={modalTourId}
                  onChange={(e) => setModalTourId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-sky-500 font-medium"
                >
                  {MOCK_TOURS.slice(0, 15).map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              {/* Tên người đánh giá (tên bất kỳ) */}
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
                  Họ và tên của bạn (Tên bất kỳ) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={modalAuthor}
                    onChange={(e) => setModalAuthor(e.target.value)}
                    placeholder="Ví dụ: Anh Hoàng Nam, Chị Lan, Bạn Hưng..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-sky-500 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              {/* Số sao */}
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
                  Chất lượng tour:
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setModalRating(s)}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                        <Star
                          size={24}
                          className={s <= modalRating ? 'text-amber-400 fill-current' : 'text-slate-200'}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    {modalRating === 5 ? '5 sao - Tuyệt vời' : `${modalRating} sao`}
                  </span>
                </div>
              </div>

              {/* Loại chuyến đi */}
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
                  Hình thức chuyến đi:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Đi cùng gia đình', 'Đi theo cặp đôi', 'Đi cùng bạn bè', 'Đi một mình'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setModalTripType(type)}
                      className={`text-xs font-bold py-2 px-3 rounded-xl border text-center transition ${
                        modalTripType === type
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-sky-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tiêu đề nhận xét */}
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
                  Tiêu đề nhận xét
                </label>
                <input
                  type="text"
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  placeholder="Ví dụ: Chuyến đi rất vui, phục vụ chu đáo..."
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-sky-500 focus:bg-white transition"
                />
              </div>

              {/* Nội dung nhận xét */}
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
                  Nội dung nhận xét <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={modalComment}
                  onChange={(e) => setModalComment(e.target.value)}
                  placeholder="Chia sẻ chi tiết về dịch vụ khách sạn, xe cộ, các bữa ăn, hướng dẫn viên..."
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-sky-500 focus:bg-white transition leading-relaxed"
                  required
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-black px-6 py-2.5 rounded-xl shadow-lg shadow-rose-500/20 transition-all text-sm"
                >
                  <Send size={15} /> Gửi Đánh Giá Ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. BANNER HỖ TRỢ & GIẢI THƯỞNG THEO CHUẨN iVIVU */}
      <div className="max-w-[1240px] mx-auto px-4 mt-16">
        {/* Support Callout Banner */}
        <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-blue-900 rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden mb-12">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <span className="bg-amber-400 text-slate-900 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
              Hỗ Trợ Tận Tâm 24/7
            </span>
            <h3 className="text-2xl md:text-3xl font-black mb-2">Bạn cần tư vấn hoặc đặt tour theo yêu cầu?</h3>
            <p className="text-sky-200 text-sm max-w-xl">
              Đội ngũ chuyên viên tư vấn giàu kinh nghiệm luôn sẵn sàng giải đáp mọi thắc mắc và hỗ trợ giữ chỗ miễn phí.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10 w-full sm:w-auto">
            <a 
              href="tel:19002045" 
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-slate-900 font-black px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all text-sm"
            >
              <Phone size={18} /> GỌI NGAY: 1900 2045
            </a>
            <span className="text-xs text-sky-200">7h30 – 21h00 hằng ngày</span>
          </div>
        </div>

        {/* Awards & Accreditation Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100">
              <Award size={26} />
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm mb-1">Đại Lý Du Lịch Trực Tuyến Hàng Đầu</h4>
              <p className="text-xs text-slate-500">Vinh danh tại giải thưởng danh giá World Travel Awards 2024</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
              <Shield size={26} />
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm mb-1">Thương Hiệu Truyền Cảm Hứng</h4>
              <p className="text-xs text-slate-500">Đạt chứng nhận APEA khu vực Châu Á - Thái Bình Dương</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Sparkles size={26} />
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm mb-1">Bảo Hiểm Toàn Diện Cathay</h4>
              <p className="text-xs text-slate-500">Tặng bảo hiểm du lịch quốc tế và trong nước trọn gói mọi hành trình</p>
            </div>
          </div>
        </div>

        {/* Office Locations theo phong cách iVIVU */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm mb-10">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-sky-600" />
            <h4 className="font-black text-slate-900 text-base">Hệ Thống Văn Phòng Phục Vụ Trực Tiếp</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="font-bold text-slate-800 text-sm mb-1">Văn phòng TP. Hồ Chí Minh</div>
              <p className="mb-2">Tầng 2, Tòa nhà Anh Đăng, 215 Nam Kỳ Khởi Nghĩa, Phường Xuân Hòa, Quận 3</p>
              <span className="text-sky-600 font-semibold cursor-pointer hover:underline">Xem bản đồ →</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="font-bold text-slate-800 text-sm mb-1">Văn phòng Hà Nội</div>
              <p className="mb-2">Tầng 8, Tòa nhà VietBank, 70-72 Bà Triệu, Phường Cửa Nam, Quận Hoàn Kiếm</p>
              <span className="text-sky-600 font-semibold cursor-pointer hover:underline">Xem bản đồ →</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="font-bold text-slate-800 text-sm mb-1">Văn phòng Cần Thơ</div>
              <p className="mb-2">Tầng 7, Tòa nhà STS, 11B Đại Lộ Hòa Bình, Phường Tân An, Quận Ninh Kiều</p>
              <span className="text-sky-600 font-semibold cursor-pointer hover:underline">Xem bản đồ →</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Tours;
