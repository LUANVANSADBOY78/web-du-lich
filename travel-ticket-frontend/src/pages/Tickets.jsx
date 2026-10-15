import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, RotateCcw, MapPin, Tag } from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES_LIST, DESTINATIONS_LIST } from '../data/mockProducts';
import ProductCard from '../components/common/ProductCard';

const Tickets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  const initialSearch = searchParams.get('search') || searchParams.get('q') || '';
  const initialLocation = searchParams.get('location') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [destFilterInput, setDestFilterInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(slug || '');
  const [sortBy, setSortBy] = useState('popular');
  const [priceMax, setPriceMax] = useState(10000000);

  useEffect(() => {
    const q = searchParams.get('search') || searchParams.get('q');
    if (q !== null) setSearchQuery(q);
    const loc = searchParams.get('location');
    if (loc !== null) setSelectedLocation(loc);
  }, [searchParams]);

  // Helper count products per location
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
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchLoc = (product.location || '').toLowerCase().includes(query);
        const matchDesc = (product.description || '').toLowerCase().includes(query);
        if (!matchName && !matchLoc && !matchDesc) return false;
      }

      // Location Filter with iVIVU intelligent mapping
      if (selectedLocation) {
        const target = selectedLocation.toLowerCase().trim();
        const loc = (product.location || '').toLowerCase();
        const name = (product.name || '').toLowerCase();

        if (target === 'quốc tế') {
          const intlKeys = ['quốc tế', 'thái lan', 'singapore', 'hàn quốc', 'nhật bản', 'trung quốc', 'đài loan', 'du thuyền', 'malaysia', 'bali'];
          const isIntl = intlKeys.some(k => loc.includes(k) || name.includes(k));
          if (!isIntl) return false;
        } else if (target === 'hạ long' || target === 'quảng ninh') {
          if (!loc.includes('hạ long') && !loc.includes('quảng ninh') && !name.includes('hạ long') && !name.includes('quảng ninh')) return false;
        } else if (target === 'sapa' || target === 'lào cai') {
          if (!loc.includes('sapa') && !loc.includes('lào cai') && !name.includes('sapa') && !name.includes('fansipan')) return false;
        } else {
          const matchLoc = loc.includes(target) || target.includes(loc);
          const matchName = name.includes(target);
          if (!matchLoc && !matchName) return false;
        }
      }

      // Category
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (product.price > priceMax) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
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

  const visibleDestinations = useMemo(() => {
    if (!destFilterInput.trim()) return DESTINATIONS_LIST;
    const q = destFilterInput.toLowerCase().trim();
    return DESTINATIONS_LIST.filter(loc => loc.toLowerCase().includes(q));
  }, [destFilterInput]);

  return (
    <div className="bg-slate-50 min-h-screen py-8 font-sans" translate="no">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">Danh Sách Vé Vui Chơi & Trải Nghiệm</h1>
          <p className="text-slate-500 text-sm mt-1">Tìm kiếm và đặt vé công viên, cáp treo, trải nghiệm du lịch chuẩn iVIVU toàn quốc & quốc tế</p>
        </div>

        {/* Main Grid: Left Filter Sidebar + Right Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT FILTER SIDEBAR */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 sticky top-24" translate="no">
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

                {/* Quick filter input for destinations */}
                <input
                  type="text"
                  value={destFilterInput}
                  onChange={(e) => setDestFilterInput(e.target.value)}
                  placeholder="Gõ tìm nhanh điểm đến..."
                  className="w-full mb-2.5 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sky-600 focus:bg-white"
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

                  {visibleDestinations.map((loc) => {
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
                        {count > 0 ? (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            selectedLocation === loc ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {count}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-300">0</span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Tag size={13} className="text-amber-500" /> Danh mục
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
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Khoảng giá tối đa</label>
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
            {/* Toolbar: Counter & Sort */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-slate-600 font-medium">
                Hiển thị <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> sản phẩm phù hợp
                {selectedLocation && (
                  <span className="ml-2 inline-flex items-center gap-1 bg-sky-100 text-sky-800 text-xs font-bold px-2 py-0.5 rounded-full">
                    <MapPin size={11} /> {selectedLocation}
                    <button 
                      onClick={() => setSelectedLocation('')}
                      className="ml-1 text-sky-600 hover:text-sky-900"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <SlidersHorizontal size={16} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-600 shrink-0">Sắp xếp theo:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 py-2 px-3 rounded-xl outline-none focus:border-sky-600"
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
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">Thử thay đổi từ khóa hoặc thiết lập lại bộ lọc để tìm thêm nhiều kết quả tuyệt vời khác.</p>
                <button 
                  onClick={handleResetFilters}
                  className="bg-sky-600 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-sky-700 transition cursor-pointer"
                >
                  Xem tất cả sản phẩm
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
