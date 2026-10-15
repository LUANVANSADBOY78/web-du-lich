import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, ChevronRight, Flame, Ticket, Compass, Sparkles,
  Ship, Waves, Mountain, Wifi, Plane, MapPin, Star, Clock,
  Shield, Headphones, CreditCard, ArrowRight
} from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES_LIST, DESTINATIONS_LIST } from '../data/mockProducts';
import { MOCK_TOURS } from '../data/mockTours';
import ProductCard from '../components/common/ProductCard';
import TourCard from '../components/common/TourCard';
import { LOCATION_IMAGES } from '../utils/imageUtils';

const DESTINATION_CARDS = [
  { name: 'Đà Nẵng', count: '120+ vé', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=600' },
  { name: 'Phú Quốc', count: '98+ vé', img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=600' },
  { name: 'Nha Trang', count: '85+ vé', img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=600' },
  { name: 'Hội An', count: '62+ vé', img: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=600' },
  { name: 'Hà Nội', count: '110+ vé', img: 'https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=600' },
  { name: 'Sapa', count: '45+ vé', img: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&q=80&w=600' },
  { name: 'Hồ Chí Minh', count: '145+ vé', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=600' },
  { name: 'Quảng Ninh', count: '70+ vé', img: 'https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&q=80&w=600' },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('ticket');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val.trim().length > 0) {
      const filtered = DESTINATIONS_LIST.filter(dest =>
        dest.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const dest = searchTerm.trim();
    if (searchType === 'tour') navigate(`/tours${dest ? `?search=${encodeURIComponent(dest)}` : ''}`);
    else if (searchType === 'hotel') navigate(`/hotels${dest ? `?search=${encodeURIComponent(dest)}` : ''}`);
    else navigate(`/tickets${dest ? `?search=${encodeURIComponent(dest)}` : ''}`);
  };

  const handleSelectSuggestion = (dest) => {
    setSearchTerm(dest);
    setShowSuggestions(false);
    navigate(`/tickets?location=${encodeURIComponent(dest)}`);
  };

  const getProductsByCategory = (categoryKey, limit = 6) =>
    MOCK_PRODUCTS.filter(p => p.category === categoryKey).slice(0, limit);

  const renderCategoryIcon = (iconName) => {
    const cls = "w-6 h-6";
    switch (iconName) {
      case 'Flame': return <Flame className={`${cls} text-red-500`} />;
      case 'Ticket': return <Ticket className={`${cls} text-sky-500`} />;
      case 'Compass': return <Compass className={`${cls} text-emerald-500`} />;
      case 'Sparkles': return <Sparkles className={`${cls} text-amber-500`} />;
      case 'Ship': return <Ship className={`${cls} text-blue-500`} />;
      case 'Waves': return <Waves className={`${cls} text-cyan-500`} />;
      case 'Mountain': return <Mountain className={`${cls} text-teal-500`} />;
      case 'Wifi': return <Wifi className={`${cls} text-purple-500`} />;
      case 'Plane': return <Plane className={`${cls} text-indigo-500`} />;
      default: return <Ticket className={`${cls} text-sky-500`} />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* ====== 1. HERO SECTION ====== */}
      <section className="relative text-white overflow-hidden" style={{ minHeight: 520 }}>
        {/* Hero background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-950" />

        <div className="max-w-[1240px] mx-auto px-4 relative z-10 pt-16 pb-32 text-center">
          <span className="inline-block bg-sky-500/20 text-sky-300 border border-sky-400/30 font-bold text-xs px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider backdrop-blur-sm">
            🎫 Nền tảng đặt vé du lịch hàng đầu Việt Nam
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-white drop-shadow-lg">
            Khám Phá & Đặt Vé <span className="text-sky-400">Du Lịch</span><br className="hidden md:block" /> Trọn Gói Uy Tín
          </h1>
          <p className="text-base md:text-xl text-sky-100 font-medium mb-10 max-w-2xl mx-auto">
            Hơn 3.000+ vé vui chơi · 500+ tour · 1.000+ khách sạn · Giá tốt nhất 24/7
          </p>

          {/* Search Tab */}
          <div className="max-w-[780px] mx-auto">
            {/* Type Tabs */}
            <div className="flex gap-1 bg-white/10 backdrop-blur-md rounded-2xl p-1 mb-3 w-fit mx-auto">
              {[
                { key: 'ticket', label: '🎟️ Vé vui chơi' },
                { key: 'tour', label: '🧳 Tour du lịch' },
                { key: 'hotel', label: '🏨 Khách sạn' },
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => setSearchType(t.key)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    searchType === t.key
                      ? 'bg-white text-sky-700 shadow-md'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="bg-white p-2 rounded-2xl shadow-2xl flex gap-2">
                <div className="flex-grow flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-400">
                  <Search size={22} className="text-slate-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="Bạn muốn đi đâu? (Đà Nẵng, Phú Quốc, Nha Trang...)"
                    className="bg-transparent border-none outline-none w-full text-slate-800 font-medium placeholder-slate-400 text-sm md:text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 px-8 rounded-xl transition shadow-lg flex items-center justify-center gap-2 shrink-0"
                >
                  <Search size={18} />
                  <span className="hidden sm:inline">TÌM KIẾM</span>
                </button>
              </form>

              {/* Autocomplete */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 text-left">
                  <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase border-b border-slate-100">
                    Gợi ý điểm đến
                  </div>
                  {suggestions.map((dest, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSuggestion(dest)}
                      className="w-full text-left px-4 py-3 hover:bg-sky-50 text-slate-700 font-semibold text-sm flex items-center gap-3 transition"
                    >
                      <MapPin size={16} className="text-sky-600" />
                      <span>Vé vui chơi tại <strong>{dest}</strong></span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick destination tags */}
            <div className="mt-5 flex flex-wrap justify-center items-center gap-2 text-sm">
              <span className="text-white/60 font-medium">HOT:</span>
              {['Đà Nẵng', 'Phú Quốc', 'Nha Trang', 'Hội An', 'Hà Nội', 'Sapa'].map(city => (
                <button
                  key={city}
                  onClick={() => handleSelectSuggestion(city)}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium px-3.5 py-1.5 rounded-full transition backdrop-blur-md border border-white/20 hover:border-white/40"
                >
                  📍 {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== 2. CATEGORY STRIP (nổi lên trên hero) ====== */}
      <div className="max-w-[1240px] mx-auto px-4 -mt-16 relative z-20 mb-12">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 md:p-6 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
          {CATEGORIES_LIST.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-sky-50 transition group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-sky-100 flex items-center justify-center mb-2 shadow-sm group-hover:shadow transition border border-slate-100 group-hover:border-sky-200">
                {renderCategoryIcon(cat.icon)}
              </div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-sky-600 text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ====== 3. TRUST BADGES ====== */}
      <div className="max-w-[1240px] mx-auto px-4 mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Shield className="text-sky-600" size={28} />, title: 'Đặt vé An toàn', desc: 'Thanh toán bảo mật SSL 256-bit' },
            { icon: <Clock className="text-emerald-600" size={28} />, title: 'Xác nhận Tức thì', desc: 'Nhận vé QR qua email ngay lập tức' },
            { icon: <Headphones className="text-amber-600" size={28} />, title: 'Hỗ trợ 24/7', desc: 'Hotline 1900 1234 luôn sẵn sàng' },
            { icon: <CreditCard className="text-purple-600" size={28} />, title: 'Nhiều PTTT', desc: 'Thẻ ATM, Visa, VNPAY, Momo...' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                {item.icon}
              </div>
              <div>
                <div className="font-black text-slate-900 text-sm">{item.title}</div>
                <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 space-y-14">

        {/* ====== 4. ƯU ĐÃI NỔI BẬT ====== */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="text-red-500 fill-current" size={26} />
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Ưu Đãi Nổi Bật</h2>
              </div>
              <p className="text-sm text-slate-500 mt-1">Được đề xuất theo lượt thích và trải nghiệm thực tế của khách hàng</p>
            </div>
            <Link to="/offers" className="text-sky-600 font-bold hover:text-sky-700 text-sm flex items-center gap-1 group shrink-0">
              Xem thêm <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ====== 5. ĐIỂM ĐẾN NỔI BẬT (theo phong cách ivivu) ====== */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="text-sky-600" size={24} />
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Điểm Đến Nổi Bật</h2>
              </div>
              <p className="text-sm text-slate-500 mt-1">Khám phá hàng trăm trải nghiệm tại các điểm đến hàng đầu Việt Nam</p>
            </div>
            <Link to="/tickets" className="text-sky-600 font-bold hover:text-sky-700 text-sm flex items-center gap-1 group shrink-0">
              Tất cả điểm đến <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {DESTINATION_CARDS.slice(0, 4).map((dest, i) => (
              <Link
                key={dest.name}
                to={`/tickets?location=${encodeURIComponent(dest.name)}`}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 ${i === 0 ? 'sm:row-span-2' : ''}`}
                style={{ minHeight: i === 0 ? 320 : 150 }}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 absolute inset-0"
                  style={{ minHeight: i === 0 ? 320 : 150 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-white font-black text-lg leading-tight">{dest.name}</div>
                  <div className="text-white/80 text-xs font-medium mt-0.5">{dest.count}</div>
                </div>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                  Khám phá →
                </div>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            {DESTINATION_CARDS.slice(4).map((dest) => (
              <Link
                key={dest.name}
                to={`/tickets?location=${encodeURIComponent(dest.name)}`}
                className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                style={{ height: 150 }}
              >
                <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-white font-black text-base">{dest.name}</div>
                  <div className="text-white/80 text-xs">{dest.count}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ====== 5.5 TOUR DU LỊCH TRỌN GÓI NỔI BẬT (Phong cách iVIVU) ====== */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="text-sky-600" size={24} />
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Tour Du Lịch Trọn Gói Nổi Bật</h2>
              </div>
              <p className="text-sm text-slate-500 mt-1">Hơn 1.000+ tour giá ưu đãi, khởi hành liên tục từ TP.HCM, Hà Nội & Đà Nẵng</p>
            </div>
            <Link to="/tours" className="text-sky-600 font-bold hover:text-sky-700 text-sm flex items-center gap-1 group shrink-0">
              Xem tất cả tour <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_TOURS.slice(0, 3).map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </section>

        {/* ====== 6. CÔNG VIÊN GIẢI TRÍ ====== */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Công Viên Giải Trí</h2>
              <p className="text-sm text-slate-500 mt-1">Chơi thỏa thích - Vui phấn khích</p>
            </div>
            <Link to="/category/cong-vien" className="text-sky-600 font-bold hover:text-sky-700 text-sm flex items-center gap-1 group shrink-0">
              Xem thêm <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getProductsByCategory('cong-vien', 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ====== 7. BANNER FLASH SALE ====== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/category/cap-treo" className="relative rounded-2xl overflow-hidden group h-48 block">
            <img
              src="https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&q=80&w=800"
              alt="Flash Sale Cáp Treo"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-lg w-fit mb-2">⚡ FLASH SALE</span>
              <div className="text-white font-black text-xl">Cáp Treo Giảm 30%</div>
              <div className="text-white/80 text-sm">Bà Nà Hills · Hòn Thơm · Fansipan</div>
            </div>
          </Link>
          <Link to="/category/show" className="relative rounded-2xl overflow-hidden group h-48 block">
            <img
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=800"
              alt="Show diễn"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="bg-purple-500 text-white text-xs font-black px-2.5 py-1 rounded-lg w-fit mb-2">🎭 HOT SHOW</span>
              <div className="text-white font-black text-xl">Vé Show Diễn Đặc Sắc</div>
              <div className="text-white/80 text-sm">Ký Ức Hội An · Tata Show · AO Show</div>
            </div>
          </Link>
        </div>

        {/* ====== 8. TRẢI NGHIỆM NÊN THỬ ====== */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Trải Nghiệm Nên Thử</h2>
              <p className="text-sm text-slate-500 mt-1">Tìm hiểu văn hóa thông qua các hoạt động khám phá địa phương</p>
            </div>
            <Link to="/category/trai-nghiem" className="text-sky-600 font-bold hover:text-sky-700 text-sm flex items-center gap-1 group shrink-0">
              Xem thêm <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getProductsByCategory('trai-nghiem', 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ====== 9. VÉ XEM SHOW ====== */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Vé Xem Show</h2>
              <p className="text-sm text-slate-500 mt-1">Nghệ thuật thăng hoa nâng tầm cảm xúc</p>
            </div>
            <Link to="/category/show" className="text-sky-600 font-bold hover:text-sky-700 text-sm flex items-center gap-1 group shrink-0">
              Xem thêm <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getProductsByCategory('show', 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ====== 10. DU THUYỀN ====== */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Du Thuyền - Ẩm Thực - Tour Trong Ngày</h2>
              <p className="text-sm text-slate-500 mt-1">Trọn vẹn từng khoảnh khắc</p>
            </div>
            <Link to="/category/tour-du-thuyen" className="text-sky-600 font-bold hover:text-sky-700 text-sm flex items-center gap-1 group shrink-0">
              Xem thêm <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getProductsByCategory('tour-du-thuyen', 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ====== 11. CÔNG VIÊN NƯỚC ====== */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Công Viên Nước - Suối Khoáng Nóng</h2>
              <p className="text-sm text-slate-500 mt-1">Vui chơi sảng khoái - Thư giãn trọn ngày</p>
            </div>
            <Link to="/category/cong-vien-nuoc" className="text-sky-600 font-bold hover:text-sky-700 text-sm flex items-center gap-1 group shrink-0">
              Xem thêm <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getProductsByCategory('cong-vien-nuoc', 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ====== 12. CÁP TREO ====== */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Cáp Treo</h2>
              <p className="text-sm text-slate-500 mt-1">Mỗi tuyến cáp - Một kỳ quan</p>
            </div>
            <Link to="/category/cap-treo" className="text-sky-600 font-bold hover:text-sky-700 text-sm flex items-center gap-1 group shrink-0">
              Xem thêm <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getProductsByCategory('cap-treo', 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ====== 13. WIFI - ESIM ====== */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Wifi - Thẻ Sim / E-Sim</h2>
              <p className="text-sm text-slate-500 mt-1">Nhận ngay Sim điện tử qua mail - Kích hoạt dễ dàng</p>
            </div>
            <Link to="/category/esim" className="text-sky-600 font-bold hover:text-sky-700 text-sm flex items-center gap-1 group shrink-0">
              Xem thêm <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getProductsByCategory('esim', 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ====== 14. DỊCH VỤ SÂN BAY ====== */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Fast Track - Xe Đưa Đón - Phòng Chờ Sân Bay</h2>
              <p className="text-sm text-slate-500 mt-1">Di chuyển thuận lợi theo hành trình của bạn</p>
            </div>
            <Link to="/category/san-bay" className="text-sky-600 font-bold hover:text-sky-700 text-sm flex items-center gap-1 group shrink-0">
              Xem thêm <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getProductsByCategory('san-bay', 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ====== ĐÁNH GIÁ 5 SAO ====== */}
        <section className="bg-slate-50 py-12 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent sm:py-0 mb-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Khách hàng nói gì về chúng tôi?</h2>
              <p className="text-sm text-slate-500 mt-1">Hơn 10,000+ đánh giá 5 sao từ khách hàng</p>
            </div>
            <Link to="/reviews" className="text-sky-600 font-bold hover:text-sky-700 text-sm flex items-center gap-1 group shrink-0">
              Xem tất cả <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 1, name: "Nguyễn Văn A", tour: "Tour Đà Nẵng 3N2Đ", text: "Dịch vụ cực kỳ tốt, HDV nhiệt tình. Khách sạn đẹp và đồ ăn ngon. Chắc chắn sẽ quay lại ủng hộ công ty lần sau!", rating: 5, avatar: "https://i.pravatar.cc/150?u=1" },
              { id: 2, name: "Trần Thị B", tour: "Vé cáp treo Bà Nà", text: "Mua vé nhanh chóng, không phải xếp hàng chờ đợi lâu. Rất tiện lợi và tiết kiệm thời gian. Mình rất hài lòng.", rating: 5, avatar: "https://i.pravatar.cc/150?u=2" },
              { id: 3, name: "Lê Hoàng C", tour: "Tour Thái Lan 5N4Đ", text: "Chuyến đi tuyệt vời, lịch trình hợp lý. Giá cả rất phải chăng so với chất lượng. Cảm ơn GoTravel rất nhiều!", rating: 5, avatar: "https://i.pravatar.cc/150?u=3" }
            ].map(review => (
              <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                    <p className="text-xs text-slate-500">{review.tour}</p>
                  </div>
                </div>
                <div className="flex text-amber-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">"{review.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* ====== 15. CTA BANNER ====== */}
        <section className="bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center" />
          <div className="relative z-10">
            <div className="text-4xl mb-4">🤖</div>
            <h2 className="text-2xl md:text-3xl font-black mb-3">Lên Lịch Trình Cùng AI</h2>
            <p className="text-sky-100 mb-8 max-w-xl mx-auto">
              AI của GoTravel sẽ giúp bạn tạo lịch trình du lịch chi tiết, phù hợp với ngân sách và sở thích trong vài giây.
            </p>
            <Link
              to="/ai-trip-planner"
              className="inline-flex items-center gap-2 bg-white text-sky-700 font-black px-8 py-4 rounded-2xl hover:bg-sky-50 transition shadow-xl text-base"
            >
              Thử ngay miễn phí <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;

