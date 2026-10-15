import { useState } from 'react';
import { Search, MapPin, Star, Filter, Users, Calendar, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { formatCurrency } from '../utils/format';

const MOCK_HOTELS = [
  { id: 1, name: 'Vinpearl Resort & Spa Đà Nẵng', location: 'Đà Nẵng', stars: 5, rating: 4.8, reviews: 1234, price: 2800000, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', amenities: ['Pool', 'Spa', 'Restaurant', 'Gym'], priceOld: 3500000 },
  { id: 2, name: 'InterContinental Hà Nội Westlake', location: 'Hà Nội', stars: 5, rating: 4.9, reviews: 987, price: 4500000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', amenities: ['Pool', 'Business', 'Restaurant'], priceOld: 5200000 },
  { id: 3, name: 'Premier Village Phú Quốc Resort', location: 'Phú Quốc', stars: 5, rating: 4.7, reviews: 756, price: 3200000, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', amenities: ['Beach', 'Pool', 'Spa'], priceOld: 4000000 },
  { id: 4, name: 'Fusion Maia Đà Nẵng', location: 'Đà Nẵng', stars: 5, rating: 4.9, reviews: 654, price: 5800000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', amenities: ['Spa', 'Pool', 'Beach'], priceOld: 7000000 },
  { id: 5, name: 'Naman Retreat Đà Nẵng', location: 'Đà Nẵng', stars: 4, rating: 4.6, reviews: 432, price: 1900000, image: 'https://images.unsplash.com/photo-1501117716987-c8c394bb29df?w=600&q=80', amenities: ['Pool', 'Yoga', 'Restaurant'], priceOld: 2400000 },
  { id: 6, name: 'Mường Thanh Grand Nha Trang', location: 'Nha Trang', stars: 4, rating: 4.4, reviews: 893, price: 1200000, image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=80', amenities: ['Pool', 'Beach', 'Restaurant'], priceOld: 1600000 },
  { id: 7, name: 'Silk Sense Hội An River Resort', location: 'Hội An', stars: 5, rating: 4.8, reviews: 521, price: 2200000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80', amenities: ['Pool', 'River View', 'Spa'], priceOld: 2800000 },
  { id: 8, name: 'Sheraton Saigon Hotel & Towers', location: 'Hồ Chí Minh', stars: 5, rating: 4.7, reviews: 1456, price: 3800000, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80', amenities: ['Pool', 'Business', 'Gym'], priceOld: 4500000 },
];

const STARS_OPTIONS = [5, 4, 3, 2, 1];
const AMENITIES = ['Pool', 'Spa', 'Beach', 'Restaurant', 'Gym', 'Business', 'Yoga', 'River View'];
const DESTINATIONS = ['Đà Nẵng', 'Hà Nội', 'Phú Quốc', 'Nha Trang', 'Hội An', 'Hồ Chí Minh'];

export default function Hotels() {
  const [search, setSearch] = useState('');
  const [destination, setDestination] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(2);
  const [priceMax, setPriceMax] = useState(10000000);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sort, setSort] = useState('recommended');
  const [showFilter, setShowFilter] = useState(false);
  const { toggle, isFavorite } = useFavorites();

  const filtered = MOCK_HOTELS
    .filter(h => {
      if (search && !h.name.toLowerCase().includes(search.toLowerCase()) && !h.location.toLowerCase().includes(search.toLowerCase())) return false;
      if (destination && h.location !== destination) return false;
      if (h.price > priceMax) return false;
      if (selectedStars.length > 0 && !selectedStars.includes(h.stars)) return false;
      if (selectedAmenities.length > 0 && !selectedAmenities.every(a => h.amenities.includes(a))) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return 0;
    });

  const toggleStar = (s) => setSelectedStars(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleAmenity = (a) => setSelectedAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Search */}
      <div className="bg-gradient-to-br from-sky-800 to-sky-600 py-14 px-4">
        <div className="max-w-5xl mx-auto text-center text-white mb-8">
          <h1 className="text-4xl font-black mb-2">Khách Sạn Chất Lượng Cao</h1>
          <p className="text-sky-100 text-lg">Hơn 1.000+ khách sạn từ bình dân đến 5 sao trên toàn Việt Nam</p>
        </div>
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="col-span-2 md:col-span-1">
              <label className="text-xs font-bold text-slate-500 block mb-1">ĐIỂM ĐẾN</label>
              <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-sky-500">
                <MapPin size={15} className="text-slate-400 mr-2 shrink-0" />
                <select value={destination} onChange={e => setDestination(e.target.value)} className="flex-1 outline-none text-sm bg-transparent">
                  <option value="">Tất cả điểm đến</option>
                  {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">CHECK-IN</label>
              <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-sky-500">
                <Calendar size={15} className="text-slate-400 mr-2 shrink-0" />
                <input type="date" value={checkin} onChange={e => setCheckin(e.target.value)} className="flex-1 outline-none text-sm bg-transparent" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">CHECK-OUT</label>
              <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-sky-500">
                <Calendar size={15} className="text-slate-400 mr-2 shrink-0" />
                <input type="date" value={checkout} onChange={e => setCheckout(e.target.value)} className="flex-1 outline-none text-sm bg-transparent" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">KHÁCH</label>
              <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5">
                <Users size={15} className="text-slate-400 mr-2 shrink-0" />
                <button type="button" onClick={() => setGuests(g => Math.max(1, g - 1))} className="font-bold text-slate-500 hover:text-sky-600 px-1">-</button>
                <span className="font-bold mx-2 text-sm">{guests}</span>
                <button type="button" onClick={() => setGuests(g => g + 1)} className="font-bold text-slate-500 hover:text-sky-600 px-1">+</button>
                <span className="text-sm text-slate-500 ml-1">khách</span>
              </div>
            </div>
          </div>
          <button className="mt-3 w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition">
            <Search size={18} /> Tìm Khách Sạn
          </button>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 py-10">
        <div className="flex gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-60 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sticky top-24">
              <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                <Filter size={16} /> Bộ Lọc
              </h3>

              <div className="mb-5">
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Giá Tối Đa / Đêm</label>
                <input type="range" min={500000} max={10000000} step={500000}
                  value={priceMax} onChange={e => setPriceMax(+e.target.value)} className="w-full accent-sky-600" />
                <div className="text-sm font-bold text-sky-600 mt-1">{formatCurrency(priceMax)}</div>
              </div>

              <div className="mb-5">
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Hạng Sao</label>
                {STARS_OPTIONS.map(s => (
                  <label key={s} className="flex items-center gap-2 mb-1.5 cursor-pointer">
                    <input type="checkbox" checked={selectedStars.includes(s)} onChange={() => toggleStar(s)}
                      className="rounded accent-sky-600" />
                    <span className="text-yellow-400 text-sm">{'★'.repeat(s)}</span>
                    <span className="text-sm text-slate-600">{s} sao</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Tiện Nghi</label>
                {AMENITIES.map(a => (
                  <label key={a} className="flex items-center gap-2 mb-1.5 cursor-pointer">
                    <input type="checkbox" checked={selectedAmenities.includes(a)} onChange={() => toggleAmenity(a)}
                      className="rounded accent-sky-600" />
                    <span className="text-sm text-slate-600">{a}</span>
                  </label>
                ))}
              </div>

              {(selectedStars.length > 0 || selectedAmenities.length > 0 || priceMax < 10000000) && (
                <button onClick={() => { setSelectedStars([]); setSelectedAmenities([]); setPriceMax(10000000); }}
                  className="mt-4 w-full text-sm text-red-500 hover:text-red-600 font-medium">
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div>
                <p className="text-slate-600 text-sm">{filtered.length} khách sạn tìm thấy</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm tên khách sạn..."
                    className="border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-sm outline-none focus:border-sky-500 w-48" />
                </div>
                <select value={sort} onChange={e => setSort(e.target.value)}
                  className="border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium outline-none bg-white">
                  <option value="recommended">Đề xuất</option>
                  <option value="price_asc">Giá thấp nhất</option>
                  <option value="price_desc">Giá cao nhất</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filtered.map(hotel => (
                <div key={hotel.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition group">
                  <div className="relative sm:w-72 h-52 sm:h-auto shrink-0 overflow-hidden">
                    <img src={hotel.image} alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button
                      onClick={() => toggle({ id: hotel.id, type: 'hotel', name: hotel.name, image: hotel.image, price: hotel.price })}
                      className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition ${
                        isFavorite(hotel.id, 'hotel') ? 'bg-red-500 text-white' : 'bg-white text-slate-400 hover:text-red-500'
                      }`}
                    >
                      <Heart size={15} className={isFavorite(hotel.id, 'hotel') ? 'fill-current' : ''} />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-amber-400 text-white text-xs font-black px-2 py-1 rounded-lg">
                      -{Math.round((1 - hotel.price / hotel.priceOld) * 100)}%
                    </div>
                  </div>

                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-yellow-400 text-sm mb-1">{'★'.repeat(hotel.stars)}</div>
                          <h3 className="font-black text-slate-900 text-base leading-tight">{hotel.name}</h3>
                          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin size={13} /> {hotel.location}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-2 justify-end">
                            <div className="bg-sky-600 text-white font-black text-sm px-2.5 py-1 rounded-lg">{hotel.rating}</div>
                            <div>
                              <div className="text-xs font-bold text-slate-700">Xuất sắc</div>
                              <div className="text-xs text-slate-400">{hotel.reviews.toLocaleString()} đánh giá</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {hotel.amenities.map(a => (
                          <span key={a} className="bg-slate-100 text-slate-600 text-xs font-medium px-2 py-0.5 rounded-full">{a}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-end justify-between mt-4 pt-4 border-t border-slate-50">
                      <div>
                        <div className="text-xs text-slate-400 line-through">{formatCurrency(hotel.priceOld)}</div>
                        <div className="text-2xl font-black text-sky-600">{formatCurrency(hotel.price)}</div>
                        <div className="text-xs text-slate-500">/đêm · Đã bao gồm thuế</div>
                      </div>
                      <Link to={`/hotels/${hotel.id}`}
                        className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-2.5 rounded-xl transition text-sm whitespace-nowrap">
                        Đặt Ngay
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-16 text-slate-400">
                  <div className="text-5xl mb-4">🏨</div>
                  <p className="font-bold text-lg text-slate-600">Không tìm thấy khách sạn phù hợp</p>
                  <p className="text-sm mt-1">Hãy thử thay đổi bộ lọc hoặc điểm đến</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

