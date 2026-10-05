import { useState } from 'react';
import { Search, Filter, RotateCcw, Plane, Clock } from 'lucide-react';
import { MOCK_TOURS } from '../data/mockTours';
import TourCard from '../components/common/TourCard';

const Tours = () => {
  const [selectedDeparture, setSelectedDeparture] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTours = MOCK_TOURS.filter(tour => {
    if (searchQuery && !tour.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedDeparture && tour.departure !== selectedDeparture) {
      return false;
    }
    if (selectedDestination && tour.destination !== selectedDestination) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-8 font-sans">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">Tour Du Lịch Trọn Gói Trong & Nước Ngoài</h1>
          <p className="text-slate-500 text-sm mt-1">Khám phá các hành trình du lịch chất lượng cao bao gồm vé máy bay, khách sạn & ăn uống</p>
        </div>

        {/* Filter & List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT FILTER */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 sticky top-24 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <Filter size={18} className="text-sky-600" /> BỘ LỌC TOUR
                </h3>
                <button 
                  onClick={() => { setSelectedDeparture(''); setSelectedDestination(''); setSearchQuery(''); }}
                  className="text-xs text-sky-600 font-bold hover:underline flex items-center gap-1"
                >
                  <RotateCcw size={12} /> Đặt lại
                </button>
              </div>

              {/* Keyword Search */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Tìm kiếm tên tour</label>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Đà Nẵng, Phú Quốc, Thái Lan..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-sky-600"
                  />
                </div>
              </div>

              {/* Departure Radio */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Điểm khởi hành</label>
                <div className="space-y-1.5">
                  {['', 'Hồ Chí Minh', 'Hà Nội'].map((dep) => (
                    <label key={dep} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                      <input 
                        type="radio" 
                        name="dep" 
                        checked={selectedDeparture === dep}
                        onChange={() => setSelectedDeparture(dep)}
                        className="text-sky-600 focus:ring-sky-500"
                      />
                      <span>{dep === '' ? 'Tất cả nơi khởi hành' : dep}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Destination Radio */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Điểm đến</label>
                <div className="space-y-1.5">
                  {['', 'Đà Nẵng', 'Phú Quốc', 'Sapa', 'Quốc tế'].map((dest) => (
                    <label key={dest} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                      <input 
                        type="radio" 
                        name="dest" 
                        checked={selectedDestination === dest}
                        onChange={() => setSelectedDestination(dest)}
                        className="text-sky-600 focus:ring-sky-500"
                      />
                      <span>{dest === '' ? 'Tất cả điểm đến' : dest}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT LIST */}
          <div className="lg:col-span-9">
            <div className="flex flex-col gap-2">
              {filteredTours.map(tour => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Tours;
