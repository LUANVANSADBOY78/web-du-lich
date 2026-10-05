import { useState, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES_LIST, DESTINATIONS_LIST } from '../data/mockProducts';
import ProductCard from '../components/common/ProductCard';

const Tickets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  const initialSearch = searchParams.get('search') || '';
  const initialLocation = searchParams.get('location') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedCategory, setSelectedCategory] = useState(slug || '');
  const [sortBy, setSortBy] = useState('popular');
  const [priceMax, setPriceMax] = useState(2500000);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchLoc = product.location.toLowerCase().includes(query);
        if (!matchName && !matchLoc) return false;
      }

      // Location
      if (selectedLocation && product.location !== selectedLocation) {
        return false;
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
      return b.id - a.id; // default popular / newest
    });
  }, [searchQuery, selectedLocation, selectedCategory, priceMax, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setSelectedCategory('');
    setPriceMax(2500000);
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 font-sans">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">Danh Sách Vé Vui Chơi & Trải Nghiệm</h1>
          <p className="text-slate-500 text-sm mt-1">Tìm kiếm và lọc các sản phẩm du lịch theo ý muốn của bạn</p>
        </div>

        {/* Main Grid: Left Filter Sidebar + Right Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT FILTER SIDEBAR */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 sticky top-24">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <Filter size={18} className="text-sky-600" /> BỘ LỌC TÌM KIẾM
                </h3>
                <button 
                  onClick={handleResetFilters}
                  className="text-xs text-sky-600 font-bold hover:underline flex items-center gap-1"
                  title="Xóa bộ lọc"
                >
                  <RotateCcw size={12} /> Đặt lại
                </button>
              </div>

              {/* Search keyword input */}
              <div className="mb-6">
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
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Địa điểm</label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer hover:text-sky-600">
                    <input 
                      type="radio" 
                      name="location" 
                      checked={selectedLocation === ''} 
                      onChange={() => setSelectedLocation('')}
                      className="text-sky-600 focus:ring-sky-500"
                    />
                    <span>Tất cả địa điểm</span>
                  </label>
                  {DESTINATIONS_LIST.map((loc) => (
                    <label key={loc} className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer hover:text-sky-600">
                      <input 
                        type="radio" 
                        name="location" 
                        checked={selectedLocation === loc} 
                        onChange={() => setSelectedLocation(loc)}
                        className="text-sky-600 focus:ring-sky-500"
                      />
                      <span>{loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Danh mục</label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer hover:text-sky-600">
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
                    <label key={cat.id} className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer hover:text-sky-600">
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
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Khoảng giá tối đa</label>
                  <span className="text-xs font-black text-amber-600">{priceMax.toLocaleString('vi-VN')} đ</span>
                </div>
                <input 
                  type="range" 
                  min="100000" 
                  max="2500000" 
                  step="50000"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

            </div>
          </div>

          {/* RIGHT PRODUCTS LIST */}
          <div className="lg:col-span-9 space-y-6">
            {/* Toolbar: Counter & Sort */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-slate-600 font-medium">
                Hiển thị <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> sản phẩm phù hợp
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
                  className="bg-sky-600 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-sky-700 transition"
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
