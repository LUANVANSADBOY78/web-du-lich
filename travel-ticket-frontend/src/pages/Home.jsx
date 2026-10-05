import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Flame, Ticket, Compass, Sparkles, Ship, Waves, Mountain, Wifi, Plane, MapPin } from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES_LIST, DESTINATIONS_LIST } from '../data/mockProducts';
import ProductCard from '../components/common/ProductCard';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
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
    if (searchTerm.trim()) {
      navigate(`/tickets?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/tickets');
    }
  };

  const handleSelectSuggestion = (dest) => {
    setSearchTerm(dest);
    setShowSuggestions(false);
    navigate(`/tickets?location=${encodeURIComponent(dest)}`);
  };

  // Helper to get products by category key
  const getProductsByCategory = (categoryKey, limit = 6) => {
    const list = MOCK_PRODUCTS.filter(p => p.category === categoryKey);
    return list.slice(0, limit);
  };

  // Icon mapper
  const renderCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-6 h-6 text-red-500" />;
      case 'Ticket': return <Ticket className="w-6 h-6 text-sky-500" />;
      case 'Compass': return <Compass className="w-6 h-6 text-emerald-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'Ship': return <Ship className="w-6 h-6 text-blue-500" />;
      case 'Waves': return <Waves className="w-6 h-6 text-cyan-500" />;
      case 'Mountain': return <Mountain className="w-6 h-6 text-teal-500" />;
      case 'Wifi': return <Wifi className="w-6 h-6 text-purple-500" />;
      case 'Plane': return <Plane className="w-6 h-6 text-indigo-500" />;
      default: return <Ticket className="w-6 h-6 text-sky-500" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white py-16 md:py-24 overflow-hidden">
        {/* Decorative background imagery */}
        <div className="absolute inset-0 z-0 opacity-25 bg-[url('https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>

        <div className="max-w-[1240px] mx-auto px-4 relative z-10 text-center">
          <span className="inline-block bg-sky-500/20 text-sky-300 border border-sky-400/30 font-bold text-xs px-3.5 py-1.5 rounded-full mb-4 uppercase tracking-wider backdrop-blur-sm">
            Nền tảng vé du lịch hàng đầu
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-white drop-shadow-md">
            Hơn 3000+ Vé Vui Chơi, Đặt Vé Ngay
          </h1>
          <p className="text-base md:text-xl text-sky-100 font-medium mb-8 max-w-2xl mx-auto">
            Giá tốt - Hỗ trợ 24/7 - Vui hết mình
          </p>

          {/* Search Box - Width 650-750px */}
          <div className="max-w-[720px] mx-auto relative">
            <form onSubmit={handleSearchSubmit} className="bg-white p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-2">
              <div className="flex-grow flex items-center bg-slate-50 md:bg-transparent rounded-xl md:rounded-full px-4 py-3 border border-slate-200 md:border-none focus-within:ring-2 focus-within:ring-sky-500">
                <Search size={22} className="text-slate-400 mr-3 shrink-0" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
                  placeholder="Bạn muốn đi đâu? (Đà Nẵng, Phú Quốc, Nha Trang...)" 
                  className="bg-transparent border-none outline-none w-full text-slate-800 font-medium placeholder-slate-400 text-sm md:text-base"
                />
              </div>

              <button 
                type="submit" 
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 px-8 rounded-xl md:rounded-full transition shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 shrink-0 text-base"
              >
                <Search size={18} />
                <span>TÌM KIẾM</span>
              </button>
            </form>

            {/* Autocomplete Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 text-left">
                <div className="p-2 text-xs font-bold text-slate-400 uppercase tracking-wider px-4 py-2 border-b border-slate-100">
                  Gợi ý điểm đến nổi bật
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

          {/* Destination Quick Tags */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-2 text-xs md:text-sm">
            <span className="text-slate-400 font-semibold mr-1">Điểm đến HOT:</span>
            {['Đà Nẵng', 'Phú Quốc', 'Nha Trang', 'Hội An', 'Hà Nội', 'Sapa'].map(city => (
              <button 
                key={city}
                onClick={() => handleSelectSuggestion(city)}
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-3 py-1.5 rounded-full transition backdrop-blur-md border border-white/10"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY ICON STRIP */}
      <div className="max-w-[1240px] mx-auto px-4 -mt-8 relative z-20 mb-12">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 md:p-6 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
          {CATEGORIES_LIST.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.id}`}
              className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-sky-50 transition group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-white flex items-center justify-center mb-2 shadow-sm group-hover:shadow transition border border-slate-100">
                {renderCategoryIcon(cat.icon)}
              </div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-sky-600 text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* MAIN SECTIONS CONTAINER */}
      <div className="max-w-[1240px] mx-auto px-4 space-y-14">
        
        {/* SECTION 1: ƯU ĐÃI NỔI BẬT */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="text-red-500 fill-current" size={26} />
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Ưu Đãi Nổi Bật</h2>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Được đề xuất theo lượt thích và trải nghiệm thực tế của khách hàng
              </p>
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

        {/* SECTION 2: CÔNG VIÊN GIẢI TRÍ */}
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

        {/* SECTION 3: TRẢI NGHIỆM NÊN THỬ */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Trải Nghiệm Nên Thử</h2>
              <p className="text-sm text-slate-500 mt-1">
                Tìm hiểu kiến thức, văn hóa thông qua các hoạt động khám phá địa phương
              </p>
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

        {/* SECTION 4: VÉ XEM SHOW */}
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

        {/* SECTION 5: DU THUYỀN - ẨM THỰC - TOUR TRONG NGÀY */}
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

        {/* SECTION 6: CÔNG VIÊN NƯỚC - SUỐI KHOÁNG NÓNG */}
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

        {/* SECTION 7: CÁP TREO */}
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

        {/* SECTION 8: WIFI - THẺ SIM / ESIM */}
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

        {/* SECTION 9: DỊCH VỤ SÂN BAY */}
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

      </div>
    </div>
  );
};

export default Home;
