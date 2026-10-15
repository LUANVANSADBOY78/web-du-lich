import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Filter, SlidersHorizontal, Search, RotateCcw, MapPin, Tag, 
  Sparkles, Zap, ShieldCheck, Clock, Ticket, ChevronRight, Eye, 
  ShoppingCart, Star, CheckCircle, ArrowRight, X, Plus, Minus,
  HelpCircle, ChevronDown, ChevronUp, Flame, Compass, Waves, Ship, Mountain, Wifi, Plane
} from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES_LIST, DESTINATIONS_LIST } from '../data/mockProducts';
import ProductCard from '../components/common/ProductCard';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

// Danh sách điểm đến nổi bật có ảnh đẹp chuẩn phong cách iVIVU
const POPULAR_TICKET_DESTINATIONS = [
  { name: 'Đà Nẵng', count: 8, img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=400', tag: 'Cầu Vàng Bà Nà' },
  { name: 'Phú Quốc', count: 9, img: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=400', tag: 'VinWonders & Safari' },
  { name: 'Nha Trang', count: 6, img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=400', tag: 'Vinpearl Harbour' },
  { name: 'Sapa', count: 4, img: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&q=80&w=400', tag: 'Fansipan Legend' },
  { name: 'Tây Ninh', count: 3, img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=400', tag: 'Núi Bà Đen' },
  { name: 'Hồ Chí Minh', count: 7, img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=400', tag: 'Du Thuyền Sông Sài Gòn' },
  { name: 'Hà Nội', count: 6, img: 'https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=400', tag: 'Tàu Hỏa & Thủy Cung' },
  { name: 'Quảng Ninh', count: 5, img: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=400', tag: 'Yoko Onsen & Vịnh Hạ Long' },
  { name: 'Singapore', count: 5, img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=400', tag: 'Universal Studios & Gardens' },
  { name: 'Thái Lan', count: 6, img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=400', tag: 'Safari World Bangkok' },
];

// Danh sách từ khóa tìm kiếm nhanh
const TRENDING_KEYWORDS = [
  'Sun World Bà Nà Hills',
  'VinWonders Phú Quốc',
  'Cáp Treo Núi Bà Đen',
  'Fansipan Legend Sapa',
  'Hop On Hop Off Sài Gòn',
  'Show Ký Ức Hội An',
  'Universal Studios Singapore',
  'Ăn Tối Du Thuyền'
];

// FAQ Câu hỏi thường gặp
const FAQS = [
  {
    q: 'Vé điện tử (e-ticket / QR code) sử dụng như thế nào tại điểm tham quan?',
    a: 'Sau khi thanh toán thành công, hệ thống GoTravel sẽ gửi mã vé điện tử QR qua Email và SMS trong vòng 15 giây. Khi đến điểm tham quan, bạn chỉ cần mở màn hình điện thoại quét trực tiếp tại cổng soát vé tự động hoặc quầy vé nhanh mà không cần xếp hàng mua vé giấy.'
  },
  {
    q: 'Tôi có bắt buộc phải in vé ra giấy không?',
    a: 'Hơn 95% các điểm tham quan như VinWonders, Sun World, Cáp treo, Xe bus 2 tầng... đều chấp nhận quét mã QR trực tiếp trên màn hình điện thoại thông minh. Một số ít dịch vụ quốc tế có quy định riêng sẽ được ghi chú rõ trong phần "Thông tin quan trọng" trên trang vé.'
  },
  {
    q: 'Giá vé trẻ em được tính theo độ tuổi hay chiều cao?',
    a: 'Tại hầu hết các khu du lịch và công viên giải trí ở Việt Nam (như VinWonders, Sun World), giá vé trẻ em được tính theo CHIỀU CAO (thường từ 100cm đến 140cm). Trẻ em dưới 100cm thường được miễn phí hoàn toàn vé vào cổng.'
  },
  {
    q: 'Tôi có thể đổi ngày sử dụng hoặc hoàn hủy vé đã mua được không?',
    a: 'Chính sách hoàn hủy tùy thuộc vào từng loại vé và nhà cung cấp. Nhiều vé có chính sách "Miễn phí hủy trước 24h - 48h", một số vé khuyến mãi Flash Sale sẽ không áp dụng hoàn hủy. Bạn có thể kiểm tra huy hiệu chính sách được hiển thị rõ ràng trên từng thẻ sản phẩm.'
  },
  {
    q: 'Đặt vé trên GoTravel có rẻ hơn mua trực tiếp tại quầy không?',
    a: 'Chắc chắn có! GoTravel là đối tác chiến lược cấp 1 của VinWonders, Sun World, Sentosa... nên luôn có mức giá ưu đãi rẻ hơn từ 10% đến 35% so với giá niêm yết tại quầy, đi kèm nhiều voucher giảm giá độc quyền và tặng kèm voucher ẩm thực.'
  }
];

const Tickets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const initialSearch = searchParams.get('search') || searchParams.get('q') || '';
  const initialLocation = searchParams.get('location') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [destFilterInput, setDestFilterInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(slug || '');
  const [sortBy, setSortBy] = useState('popular');
  const [priceMax, setPriceMax] = useState(10000000);
  
  // View mode: 'curated' (Các chuyên mục chuẩn iVIVU) | 'all' (Toàn bộ lưới có bộ lọc)
  const [viewMode, setViewMode] = useState('curated');

  // Quick View Modal State (Chức năng xem nhanh & đặt vé tức thì)
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickQuantities, setQuickQuantities] = useState({});

  // Countdown timer for Flash Sale
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 48, seconds: 15 });

  // Accordion FAQ state
  const [openFaq, setOpenFaq] = useState(0);

  // Sync searchParams
  useEffect(() => {
    const q = searchParams.get('search') || searchParams.get('q');
    if (q !== null) {
      setSearchQuery(q);
      setViewMode('all'); // Tự chuyển sang view bộ lọc nếu có tìm kiếm
    }
    const loc = searchParams.get('location');
    if (loc !== null) {
      setSelectedLocation(loc);
      setViewMode('all');
    }
  }, [searchParams]);

  // Flash Sale countdown tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 3, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Location counts
  const locationCounts = useMemo(() => {
    const counts = {};
    DESTINATIONS_LIST.forEach(loc => {
      const target = loc.toLowerCase().trim();
      counts[loc] = MOCK_PRODUCTS.filter(p => {
        const pLoc = (p.location || '').toLowerCase();
        const pName = (p.name || '').toLowerCase();
        if (target === 'quốc tế') {
          const intlKeys = ['quốc tế', 'thái lan', 'singapore', 'hàn quốc', 'nhật bản', 'trung quốc', 'đài loan', 'du thuyền', 'malaysia', 'bali'];
          return intlKeys.some(k => pLoc.includes(k) || pName.includes(k));
        }
        if (target === 'hạ long' || target === 'quảng ninh') {
          return pLoc.includes('hạ long') || pLoc.includes('quảng ninh') || pName.includes('hạ long') || pName.includes('quảng ninh');
        }
        if (target === 'sapa' || target === 'lào cai') {
          return pLoc.includes('sapa') || pLoc.includes('lào cai') || pName.includes('sapa') || pName.includes('fansipan');
        }
        return pLoc.includes(target) || target.includes(pLoc) || pName.includes(target);
      }).length;
    });
    return counts;
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchLoc = (product.location || '').toLowerCase().includes(query);
        const matchDesc = (product.description || '').toLowerCase().includes(query);
        if (!matchName && !matchLoc && !matchDesc) return false;
      }

      if (selectedLocation) {
        const target = selectedLocation.toLowerCase().trim();
        const loc = (product.location || '').toLowerCase();
        const name = (product.name || '').toLowerCase();

        if (target === 'quốc tế') {
          const intlKeys = ['quốc tế', 'thái lan', 'singapore', 'hàn quốc', 'nhật bản', 'trung quốc', 'đài loan', 'du thuyền', 'malaysia', 'bali'];
          if (!intlKeys.some(k => loc.includes(k) || name.includes(k))) return false;
        } else if (target === 'hạ long' || target === 'quảng ninh') {
          if (!loc.includes('hạ long') && !loc.includes('quảng ninh') && !name.includes('hạ long') && !name.includes('quảng ninh')) return false;
        } else if (target === 'sapa' || target === 'lào cai') {
          if (!loc.includes('sapa') && !loc.includes('lào cai') && !name.includes('sapa') && !name.includes('fansipan')) return false;
        } else {
          if (!loc.includes(target) && !target.includes(loc) && !name.includes(target)) return false;
        }
      }

      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      if (product.price > priceMax) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'reviews') return (b.reviews || 0) - (a.reviews || 0);
      return b.id - a.id;
    });
  }, [searchQuery, selectedLocation, selectedCategory, priceMax, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setSelectedCategory('');
    setDestFilterInput('');
    setPriceMax(10000000);
    setSortBy('popular');
    setSearchParams({});
  };

  const handleSelectDestination = (destName) => {
    setSelectedLocation(destName);
    setViewMode('all');
    window.scrollTo({ top: 520, behavior: 'smooth' });
  };

  const handleTrendingClick = (kw) => {
    setSearchQuery(kw);
    setViewMode('all');
    window.scrollTo({ top: 520, behavior: 'smooth' });
  };

  // Quick view helper
  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
    // Khởi tạo số lượng 1 vé người lớn mặc định
    const initialQ = {};
    if (product?.ticketTypes && product.ticketTypes.length > 0) {
      initialQ[product.ticketTypes[0].id] = 1;
    }
    setQuickQuantities(initialQ);
  };

  const handleUpdateQuickQuantity = (typeId, delta) => {
    setQuickQuantities(prev => {
      const current = prev[typeId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [typeId]: next };
    });
  };

  const quickTotal = useMemo(() => {
    if (!quickViewProduct || !quickViewProduct.ticketTypes) return quickViewProduct?.price || 0;
    let sum = 0;
    quickViewProduct.ticketTypes.forEach(t => {
      const q = quickQuantities[t.id] || 0;
      sum += (t.price || quickViewProduct.price) * q;
    });
    return sum > 0 ? sum : quickViewProduct.price;
  }, [quickViewProduct, quickQuantities]);

  const handleAddToCartQuick = () => {
    if (!quickViewProduct) return;
    const totalCount = Object.values(quickQuantities).reduce((a, b) => a + b, 0);
    const quantity = totalCount > 0 ? totalCount : 1;
    
    addItem({
      id: quickViewProduct.id,
      name: quickViewProduct.name,
      price: quickViewProduct.price,
      type: 'ticket',
      image: quickViewProduct.img,
      quantity
    });

    toast.success(`Đã thêm ${quantity} vé "${quickViewProduct.name}" vào giỏ hàng!`);
    setQuickViewProduct(null);
  };

  const handleBookNowQuick = () => {
    handleAddToCartQuick();
    navigate('/checkout');
  };

  // Phân nhóm các chủ đề chuẩn theo iVIVU
  const themeRecommended = useMemo(() => {
    // Được đề xuất theo lượt thích và trải nghiệm thực tế
    return MOCK_PRODUCTS.filter(p => [1, 10, 8, 9, 21, 18].includes(p.id));
  }, []);

  const themeThemeParks = useMemo(() => {
    // Chơi thỏa thích - Vui phấn khích (Công viên giải trí)
    return MOCK_PRODUCTS.filter(p => [2, 4, 42, 45, 41, 44].includes(p.id));
  }, []);

  const themeDiscovery = useMemo(() => {
    // Tìm hiểu kiến thức, văn hóa địa phương
    return MOCK_PRODUCTS.filter(p => [11, 12, 13, 14, 15, 16].includes(p.id));
  }, []);

  const themeShows = useMemo(() => {
    // Nghệ thuật thăng hoa nâng tầm cảm xúc (Show diễn)
    return MOCK_PRODUCTS.filter(p => [5, 17, 18, 19, 20, 21].includes(p.id));
  }, []);

  const themeCruises = useMemo(() => {
    // Trọn vẹn từng khoảnh khắc (Du thuyền & ẩm thực)
    return MOCK_PRODUCTS.filter(p => [9, 22, 23, 24, 40].includes(p.id));
  }, []);

  const themeOnsenSpa = useMemo(() => {
    // Vui chơi sảng khoái - Thư giãn trọn ngày (Suối khoáng nóng & Onsen)
    return MOCK_PRODUCTS.filter(p => [25, 26, 27, 28, 29, 30].includes(p.id));
  }, []);

  const themeCableCars = useMemo(() => {
    // Mỗi tuyến cáp - Một kỳ quan (Cáp treo kỷ lục)
    return MOCK_PRODUCTS.filter(p => [8, 6, 7, 1, 31, 32].includes(p.id));
  }, []);

  const themeEsimTravel = useMemo(() => {
    // Nhận ngay Sim điện tử qua mail & tiện ích sân bay
    return MOCK_PRODUCTS.filter(p => [33, 34, 35, 36, 38, 39].includes(p.id));
  }, []);

  // Helper render một hàng chủ đề chuẩn iVIVU
  const renderCuratedRow = (title, subtitle, badgeText, products) => (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          {badgeText && (
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-2">
              <Sparkles size={13} className="text-amber-500 fill-current" /> {badgeText}
            </span>
          )}
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500 mt-1 font-medium">{subtitle}</p>}
        </div>
        <button
          onClick={() => {
            setViewMode('all');
            window.scrollTo({ top: 520, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1 text-sm font-bold text-sky-600 hover:text-sky-700 transition group self-start sm:self-auto"
        >
          Xem tất cả <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onQuickView={handleOpenQuickView} 
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-16 font-sans">
      
      {/* 1. HERO BANNER CHUẨN PHONG CÁCH iVIVU */}
      <div className="relative bg-gradient-to-r from-sky-900 via-sky-800 to-blue-900 text-white pt-12 pb-16 px-4 overflow-hidden">
        {/* Background decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1240px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-sky-200 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Ticket size={14} className="text-amber-400" />
            Hơn 3.000+ Lựa Chọn Vé Vui Chơi Giá Tốt Nhất
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
            Hơn 3000+ Vé Vui Chơi, Đặt Vé Ngay
          </h1>
          <p className="text-sky-100 text-sm md:text-base max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Trải nghiệm vui hết mình với lựa chọn vé vui chơi giá tốt tại GoTravel. Đặt nhanh, nhận vé điện tử QR tức thì, hỗ trợ 24/7 cùng nhiều ưu đãi hấp dẫn!
          </p>

          {/* Search Box */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-2.5 shadow-2xl flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setViewMode('all');
                    window.scrollTo({ top: 520, behavior: 'smooth' });
                  }
                }}
                placeholder="Tìm kiếm công viên, cáp treo, show diễn, địa điểm (Bà Nà, VinWonders...)"
                className="w-full pl-12 pr-10 py-3.5 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-sm p-1"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => {
                setViewMode('all');
                window.scrollTo({ top: 520, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black px-8 py-3.5 rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 text-sm shrink-0"
            >
              <Search size={18} /> Tìm Vé Ngay
            </button>
          </div>

          {/* Trending Search Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-sky-200 font-bold flex items-center gap-1">
              <Flame size={13} className="text-amber-400 fill-current" /> Xu hướng:
            </span>
            {TRENDING_KEYWORDS.map(kw => (
              <button
                key={kw}
                onClick={() => handleTrendingClick(kw)}
                className="bg-white/10 hover:bg-white/20 border border-white/15 text-white px-3 py-1 rounded-full transition cursor-pointer backdrop-blur-sm"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. LIVE COUNTDOWN FLASH SALE GIỜ VÀNG (Interactive Feature) */}
      <div className="max-w-[1240px] mx-auto px-4 -mt-6 relative z-20 mb-10">
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 rounded-3xl p-6 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-white/30">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
              <Zap size={32} className="fill-current animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-900 text-[11px] font-black uppercase px-2.5 py-0.5 rounded-md shadow-sm">
                  Flash Sale Hôm Nay
                </span>
                <span className="text-xs text-rose-100 font-semibold">Ưu đãi giảm đến 40%</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black mt-1">Giờ Vàng Săn Vé Vui Chơi Giá Sốc</h3>
            </div>
          </div>

          {/* Countdown timer blocks */}
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
            <Clock size={18} className="text-amber-400 mr-1" />
            <span className="text-xs font-bold text-rose-100 mr-2">Kết thúc sau:</span>
            <div className="flex items-center gap-1.5 font-mono font-black text-lg">
              <span className="bg-white text-slate-900 px-2.5 py-1 rounded-lg shadow-sm">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-white text-slate-900 px-2.5 py-1 rounded-lg shadow-sm">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-white text-rose-600 px-2.5 py-1 rounded-lg shadow-sm">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4">
        
        {/* 3. TOP ĐIỂM ĐẾN VUI CHƠI HÀNG ĐẦU (Destination Grid) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Điểm Đến Vui Chơi Nổi Bật</h2>
              <p className="text-slate-500 text-sm mt-0.5">Khám phá các điểm du lịch giải trí được yêu thích nhất cả nước</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {POPULAR_TICKET_DESTINATIONS.map((dest) => (
              <div
                key={dest.name}
                onClick={() => handleSelectDestination(dest.name)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-black text-base md:text-lg leading-tight group-hover:text-amber-300 transition-colors">
                    {dest.name}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-slate-200 mt-1">
                    <span className="truncate text-[11px] text-amber-200">{dest.tag}</span>
                    <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full font-bold text-[10px]">
                      {dest.count} vé
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. CHẾ ĐỘ XEM: CHUYÊN MỤC iVIVU vs TẤT CẢ VÉ & BỘ LỌC */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-8">
          <div className="flex items-center gap-2 bg-slate-200/70 p-1 rounded-2xl">
            <button
              onClick={() => setViewMode('curated')}
              className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${
                viewMode === 'curated'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ✨ Chuyên Mục Nổi Bật iVIVU
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                viewMode === 'all'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Filter size={13} /> Tất Cả Vé & Bộ Lọc Chi Tiết ({filteredProducts.length})
            </button>
          </div>

          {selectedLocation && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Đang lọc theo:</span>
              <span className="bg-sky-100 text-sky-800 font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin size={12} /> {selectedLocation}
                <button 
                  onClick={() => setSelectedLocation('')}
                  className="ml-1 text-sky-600 hover:text-sky-900 font-bold"
                >
                  ✕
                </button>
              </span>
            </div>
          )}
        </div>

        {/* 5. GIAO DIỆN VIEW THEO CHUYÊN MỤC CHUẨN iVIVU */}
        {viewMode === 'curated' && !searchQuery && !selectedLocation && (
          <div>
            {/* Hàng 1: Đề xuất theo lượt thích */}
            {renderCuratedRow(
              'Được Đề Xuất Theo Lượt Thích & Trải Nghiệm Thực Tế',
              'Các điểm vui chơi hot nhất được du khách đánh giá cao và đặt nhiều nhất tuần qua',
              'Top Đề Xuất',
              themeRecommended
            )}

            {/* Hàng 2: Công viên giải trí & Theme park */}
            {renderCuratedRow(
              'Chơi Thỏa Thích - Vui Phấn Khích',
              'Hệ thống công viên chủ đề, thế giới giải trí hàng đầu Việt Nam & Đông Nam Á',
              'Theme Parks & Vui Chơi',
              themeThemeParks
            )}

            {/* Hàng 3: Khám phá văn hóa & trải nghiệm địa phương */}
            {renderCuratedRow(
              'Tìm Hiểu Kiến Thức, Văn Hóa Qua Khám Phá Địa Phương',
              'Tour xe bus 2 tầng ngắm phố, tàu hỏa hoài niệm và các bảo tàng, thủy cung kỳ thú',
              'Văn Hóa & Trải Nghiệm',
              themeDiscovery
            )}

            {/* Hàng 4: Show diễn nghệ thuật */}
            {renderCuratedRow(
              'Nghệ Thuật Thăng Hoa Nâng Tầm Cảm Xúc',
              'Những đại show thực cảnh, nhạc nước và biểu diễn ánh sáng triệu đô đẳng cấp',
              'Show Diễn Đỉnh Cao',
              themeShows
            )}

            {/* Hàng 5: Du thuyền & Ẩm thực */}
            {renderCuratedRow(
              'Trọn Vẹn Từng Khoảnh Khắc',
              'Ăn tối lãng mạn trên những du thuyền 5 sao ngắm hoàng hôn và sông nước lung linh',
              'Du Thuyền & Ẩm Thực',
              themeCruises
            )}

            {/* Hàng 6: Suối khoáng nóng Onsen */}
            {renderCuratedRow(
              'Vui Chơi Sảng Khoái - Thư Giãn Trọn Ngày',
              'Nghỉ dưỡng phục hồi năng lượng tại các thiên đường khoáng nóng Onsen chuẩn Nhật',
              'Khoáng Nóng & Spa',
              themeOnsenSpa
            )}

            {/* Hàng 7: Tuyến Cáp Treo kỷ lục */}
            {renderCuratedRow(
              'Mỗi Tuyến Cáp - Một Kỳ Quan',
              'Chinh phục nóc nhà Đông Dương, đỉnh Núi Bà Đen và ngắm biển từ cáp treo vượt biển',
              'Cáp Treo Kỷ Lục',
              themeCableCars
            )}

            {/* Hàng 8: eSIM & Tiện ích */}
            {renderCuratedRow(
              'eSIM Du Lịch Điện Tử & Dịch Vụ Sân Bay Tiện Lợi',
              'Kích hoạt dễ dàng qua Email, kết nối tốc độ cao và phòng chờ thương gia VIP',
              'Kết Nối & Di Chuyển',
              themeEsimTravel
            )}
          </div>
        )}

        {/* 6. GIAO DIỆN VIEW LƯỚI & BỘ LỌC CHI TIẾT */}
        {(viewMode === 'all' || searchQuery || selectedLocation) && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT FILTER SIDEBAR */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 sticky top-24">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <Filter size={18} className="text-sky-600" /> BỘ LỌC TÌM KIẾM
                  </h3>
                  <button 
                    onClick={handleResetFilters}
                    className="text-xs text-sky-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    title="Xóa bộ lọc"
                  >
                    <RotateCcw size={12} /> Đặt lại
                  </button>
                </div>

                {/* Search keyword input */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Từ khóa tìm kiếm</label>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tên vé, địa điểm..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-sky-600 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Destination Filter */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin size={13} className="text-sky-600" /> Địa điểm ({DESTINATIONS_LIST.length})
                    </label>
                    {selectedLocation && (
                      <span 
                        onClick={() => setSelectedLocation('')}
                        className="text-[11px] text-rose-500 font-bold hover:underline cursor-pointer"
                      >
                        Bỏ chọn
                      </span>
                    )}
                  </div>

                  <input
                    type="text"
                    value={destFilterInput}
                    onChange={(e) => setDestFilterInput(e.target.value)}
                    placeholder="Gõ tìm nhanh điểm đến..."
                    className="w-full mb-2 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sky-600 focus:bg-white"
                  />

                  <div className="space-y-1 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                    <label className={`flex items-center justify-between p-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                      selectedLocation === '' ? 'bg-sky-50 text-sky-700' : 'text-slate-700 hover:bg-slate-50'
                    }`}>
                      <div className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          name="location" 
                          checked={selectedLocation === ''} 
                          onChange={() => setSelectedLocation('')}
                          className="text-sky-600 focus:ring-sky-500"
                        />
                        <span>Tất cả địa điểm</span>
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded-full">
                        {MOCK_PRODUCTS.length}
                      </span>
                    </label>

                    {DESTINATIONS_LIST
                      .filter(loc => !destFilterInput.trim() || loc.toLowerCase().includes(destFilterInput.toLowerCase().trim()))
                      .map((loc) => {
                        const count = locationCounts[loc] || 0;
                        return (
                          <label 
                            key={loc} 
                            className={`flex items-center justify-between p-1.5 rounded-lg text-xs cursor-pointer transition ${
                              selectedLocation === loc 
                                ? 'bg-sky-50 text-sky-700 font-bold' 
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <input 
                                type="radio" 
                                name="location" 
                                checked={selectedLocation === loc} 
                                onChange={() => setSelectedLocation(loc)}
                                className="text-sky-600 focus:ring-sky-500"
                              />
                              <span className="truncate">{loc}</span>
                            </div>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                              selectedLocation === loc ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {count}
                            </span>
                          </label>
                        );
                      })}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Tag size={13} className="text-amber-500" /> Danh mục hoạt động
                  </label>
                  <div className="space-y-1 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                    <label className={`flex items-center gap-2 p-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                      selectedCategory === '' ? 'bg-sky-50 text-sky-700' : 'text-slate-700 hover:bg-slate-50'
                    }`}>
                      <input 
                        type="radio" 
                        name="category" 
                        checked={selectedCategory === ''} 
                        onChange={() => setSelectedCategory('')}
                        className="text-sky-600 focus:ring-sky-500"
                      />
                      <span>Tất cả danh mục</span>
                    </label>
                    {CATEGORIES_LIST.map((cat) => (
                      <label 
                        key={cat.id} 
                        className={`flex items-center gap-2 p-1.5 rounded-lg text-xs cursor-pointer transition ${
                          selectedCategory === cat.id 
                            ? 'bg-sky-50 text-sky-700 font-bold' 
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="category" 
                          checked={selectedCategory === cat.id} 
                          onChange={() => setSelectedCategory(cat.id)}
                          className="text-sky-600 focus:ring-sky-500"
                        />
                        <span>{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Max Price Slider Filter */}
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Giá tối đa / vé</label>
                    <span className="text-xs font-black text-rose-500">{priceMax.toLocaleString('vi-VN')} đ</span>
                  </div>
                  <input 
                    type="range" 
                    min="100000" 
                    max="15000000" 
                    step="100000"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-sky-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-bold">
                    <span>100.000 đ</span>
                    <span>15.000.000 đ</span>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT PRODUCTS LIST */}
            <div className="lg:col-span-9 space-y-6">
              {/* Toolbar */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-slate-600 font-medium">
                  Hiển thị <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> sản phẩm vé phù hợp
                  {selectedLocation && (
                    <span className="ml-2 inline-flex items-center gap-1 bg-sky-100 text-sky-800 text-xs font-bold px-2 py-0.5 rounded-full">
                      <MapPin size={11} /> {selectedLocation}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <SlidersHorizontal size={16} className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-600 shrink-0">Sắp xếp:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 py-2 px-3 rounded-xl outline-none focus:border-sky-600 cursor-pointer"
                  >
                    <option value="popular">Nổi bật / Bán chạy</option>
                    <option value="rating">Đánh giá cao nhất</option>
                    <option value="price-asc">Giá: Thấp đến Cao</option>
                    <option value="price-desc">Giá: Cao đến Thấp</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
                  <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-4 text-sky-600 font-bold">
                    <Search size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy vé phù hợp</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">Hãy thử thay đổi từ khóa tìm kiếm hoặc thiết lập lại bộ lọc giá.</p>
                  <button 
                    onClick={handleResetFilters}
                    className="bg-sky-600 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-sky-700 transition cursor-pointer"
                  >
                    Xem tất cả vé vui chơi
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onQuickView={handleOpenQuickView}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 7. 4 CAM KẾT VÀNG ĐẶT VÉ GO TRAVEL / iVIVU (Trust Badges) */}
        <div className="my-16 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black uppercase text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Tại sao nên chọn GoTravel?
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">Dịch Vụ Đặt Vé Uy Tín Số 1</h2>
            <p className="text-xs text-slate-500 mt-1">Hơn 500.000+ du khách đã tin tưởng đồng hành cùng chúng tôi mỗi năm</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center mb-3 shadow-md shadow-sky-600/20">
                <Zap size={24} />
              </div>
              <h4 className="font-black text-slate-900 text-base mb-1">Xuất Vé QR Tức Thì</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nhận vé điện tử qua Email và SMS trong 15 giây. Quét mã QR trực tiếp tại cổng, không cần xếp hàng mua vé giấy.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-3 shadow-md shadow-amber-500/20">
                <Ticket size={24} />
              </div>
              <h4 className="font-black text-slate-900 text-base mb-1">Cam Kết Giá Tốt Nhất</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Đối tác cấp 1 chính hãng của VinWonders, Sun World, USS Sentosa... Luôn có giá ưu đãi và quà tặng ẩm thực kèm theo.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-md shadow-emerald-600/20">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-black text-slate-900 text-base mb-1">Đổi Trả & Hủy Linh Hoạt</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hỗ trợ đổi ngày sử dụng linh hoạt và hoàn hủy miễn phí theo từng loại vé trước ngày khởi hành.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-3 shadow-md shadow-purple-600/20">
                <Clock size={24} />
              </div>
              <h4 className="font-black text-slate-900 text-base mb-1">Hỗ Trợ 24/7 Tận Tâm</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Đội ngũ chăm sóc khách hàng hỗ trợ tức thời qua Hotline 1900 2087 và Zalo suốt hành trình du lịch của bạn.
              </p>
            </div>
          </div>
        </div>

        {/* 8. CÂU HỎI THƯỜNG GẶP (FAQ Accordion) */}
        <div className="mb-12 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle size={20} className="text-sky-600" />
            <h2 className="text-2xl font-black text-slate-900">Câu Hỏi Thường Gặp Về Vé Vui Chơi</h2>
          </div>
          <p className="text-xs text-slate-500 mb-6">Giải đáp thắc mắc thường gặp khi đặt vé trực tuyến tại GoTravel</p>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full text-left p-4.5 bg-slate-50/70 hover:bg-slate-100/70 font-bold text-sm text-slate-800 flex items-center justify-between gap-4 transition"
                  >
                    <span>{idx + 1}. {faq.q}</span>
                    {isOpen ? <ChevronUp size={18} className="text-sky-600 shrink-0" /> : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-4.5 bg-white text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 9. MODAL XEM NHANH & ĐẶT VÉ TRỰC TIẾP (Interactive Feature) */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
            {/* Modal Header */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl bg-slate-100">
              <img
                src={quickViewProduct.img}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 bg-slate-900/70 hover:bg-slate-900 text-white w-9 h-9 rounded-full flex items-center justify-center transition shadow-lg"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-3 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                <MapPin size={12} className="inline mr-1 text-amber-400" />
                {quickViewProduct.location}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2 leading-tight">
                {quickViewProduct.name}
              </h3>

              <div className="flex items-center gap-3 text-xs mb-4">
                <div className="flex items-center bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-200">
                  <Star size={13} className="fill-current text-amber-500 mr-1" />
                  <span>{quickViewProduct.rating || 9.8}</span>
                </div>
                <span className="text-slate-500 font-medium">({quickViewProduct.reviews || 72} đánh giá thực tế)</span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-bold">{quickViewProduct.booked || '2.5k+'} khách đã đặt</span>
              </div>

              <p className="text-xs md:text-sm text-slate-600 mb-6 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Danh sách các loại vé (Ticket Types) */}
              <div className="mb-6">
                <h4 className="font-black text-slate-800 text-sm uppercase tracking-wider mb-3">
                  Chọn Loại Vé & Số Lượng:
                </h4>

                <div className="space-y-2.5">
                  {(quickViewProduct.ticketTypes || [
                    { id: 't1', name: 'Vé vào cổng tiêu chuẩn', price: quickViewProduct.price, oldPrice: quickViewProduct.oldPrice }
                  ]).map((type) => {
                    const count = quickQuantities[type.id] || 0;
                    return (
                      <div
                        key={type.id}
                        className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 hover:border-sky-300 transition"
                      >
                        <div className="flex-1">
                          <div className="font-bold text-slate-800 text-sm">{type.name}</div>
                          <div className="flex items-baseline gap-2 mt-0.5">
                            {type.oldPrice && (
                              <span className="text-xs text-slate-400 line-through">
                                {type.oldPrice.toLocaleString('vi-VN')} đ
                              </span>
                            )}
                            <span className="font-black text-amber-600 text-sm">
                              {type.price.toLocaleString('vi-VN')} đ
                            </span>
                          </div>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleUpdateQuickQuantity(type.id, -1)}
                            className="w-7 h-7 rounded-lg bg-white text-slate-700 font-bold flex items-center justify-center hover:bg-slate-200 transition"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-8 text-center font-black text-sm text-slate-800">
                            {count}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQuickQuantity(type.id, 1)}
                            className="w-7 h-7 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center hover:bg-sky-700 transition"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Total & Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Tổng thanh toán dự kiến:</span>
                  <span className="text-2xl font-black text-amber-600">
                    {quickTotal.toLocaleString('vi-VN')} đ
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleAddToCartQuick}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold px-5 py-3 rounded-xl border border-sky-200 transition text-sm"
                  >
                    <ShoppingCart size={16} /> Thêm Giỏ Hàng
                  </button>
                  <button
                    type="button"
                    onClick={handleBookNowQuick}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black px-6 py-3 rounded-xl shadow-lg shadow-orange-500/25 transition text-sm"
                  >
                    Đặt Vé Ngay <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Tickets;
