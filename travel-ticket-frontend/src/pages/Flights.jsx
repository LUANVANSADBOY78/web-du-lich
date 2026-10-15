import { useState } from 'react';
import { Plane, Calendar, Users, Search, ArrowRightLeft, MapPin, Filter, ArrowRight } from 'lucide-react';

const MOCK_FLIGHTS = [
  {
    id: 'f1',
    airline: 'Vietnam Airlines',
    airlineLogo: 'https://cdn.iconscout.com/icon/free/png-256/vietnam-airlines-3628581-3030230.png',
    flightNumber: 'VN-123',
    departure: { time: '08:00', airport: 'SGN', city: 'Hồ Chí Minh' },
    arrival: { time: '10:15', airport: 'HAN', city: 'Hà Nội' },
    duration: '2h 15m',
    type: 'Bay thẳng',
    price: 1550000,
    oldPrice: 1850000,
    baggage: '23kg',
    class: 'Phổ thông'
  },
  {
    id: 'f2',
    airline: 'Vietjet Air',
    airlineLogo: 'https://logos-world.net/wp-content/uploads/2023/01/VietJet-Air-Logo.png',
    flightNumber: 'VJ-456',
    departure: { time: '09:30', airport: 'SGN', city: 'Hồ Chí Minh' },
    arrival: { time: '11:40', airport: 'HAN', city: 'Hà Nội' },
    duration: '2h 10m',
    type: 'Bay thẳng',
    price: 950000,
    baggage: '7kg',
    class: 'Eco'
  },
  {
    id: 'f3',
    airline: 'Bamboo Airways',
    airlineLogo: '',
    flightNumber: 'QH-789',
    departure: { time: '14:00', airport: 'SGN', city: 'Hồ Chí Minh' },
    arrival: { time: '16:15', airport: 'HAN', city: 'Hà Nội' },
    duration: '2h 15m',
    type: 'Bay thẳng',
    price: 1250000,
    baggage: '20kg',
    class: 'Economy Saver'
  }
];

const AirlineBadge = ({ airline, logo }) => {
  const [hasError, setHasError] = useState(false);

  if (logo && !hasError) {
    return (
      <img 
        src={logo} 
        alt={airline} 
        className="max-h-full max-w-full object-contain" 
        onError={() => setHasError(true)} 
      />
    );
  }

  if (airline === 'Vietjet Air') {
    return (
      <div className="flex items-center gap-1 font-black text-base italic tracking-tight">
        <span className="bg-rose-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded">VJ</span>
        <span className="text-rose-600">vietjet<span className="text-amber-500">Air</span></span>
      </div>
    );
  }

  if (airline === 'Bamboo Airways') {
    return (
      <div className="flex items-center gap-1.5 font-black text-sm tracking-tight text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
        <span className="text-base">🎋</span>
        <span>Bamboo <span className="text-sky-700">Airways</span></span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 font-black text-sm tracking-tight text-sky-900 bg-sky-50 px-2.5 py-1 rounded-xl border border-sky-200">
      <span className="text-base">🪷</span>
      <span>Vietnam <span className="text-amber-500">Airlines</span></span>
    </div>
  );
};

const Flights = () => {
  const [tripType, setTripType] = useState('roundtrip'); // 'oneway' or 'roundtrip'

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-12">
      {/* HERO FLIGHT SEARCH */}
      <div className="relative bg-sky-600 pt-10 pb-32 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1920" 
            alt="Flights Background" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        
        <div className="relative max-w-[1240px] mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3">Tìm Kiếm Chuyến Bay Tốt Nhất</h1>
            <p className="text-sky-100 text-sm md:text-base">Đặt vé máy bay nội địa & quốc tế với giá cực ưu đãi từ GoTravel</p>
          </div>

          {/* SEARCH BOX */}
          <div className="bg-white rounded-3xl p-6 shadow-2xl mx-auto max-w-5xl">
            {/* Trip Type Selector */}
            <div className="flex gap-4 mb-6 border-b border-slate-100 pb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="tripType" 
                  checked={tripType === 'oneway'} 
                  onChange={() => setTripType('oneway')}
                  className="w-4 h-4 text-sky-600 focus:ring-sky-500" 
                />
                <span className="text-sm font-bold text-slate-700">Một chiều</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="tripType" 
                  checked={tripType === 'roundtrip'} 
                  onChange={() => setTripType('roundtrip')}
                  className="w-4 h-4 text-sky-600 focus:ring-sky-500" 
                />
                <span className="text-sm font-bold text-slate-700">Khứ hồi</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Departure & Arrival */}
              <div className="md:col-span-5 relative flex items-center border border-slate-200 rounded-2xl bg-slate-50 focus-within:ring-2 focus-within:ring-sky-500 focus-within:bg-white transition-all">
                <div className="flex-1 p-3 px-4">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Điểm Đi</div>
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
                    <Plane className="text-sky-500 shrink-0" size={18} />
                    <input type="text" defaultValue="Hồ Chí Minh (SGN)" className="w-full bg-transparent border-none focus:outline-none font-bold text-slate-800" />
                  </div>
                </div>
                
                <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-sky-600 shadow-sm hover:shadow-md hover:bg-sky-50 z-10">
                  <ArrowRightLeft size={14} />
                </button>

                <div className="flex-1 p-3 px-4 border-l border-slate-200 pl-6">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Điểm Đến</div>
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
                    <MapPin className="text-rose-500 shrink-0" size={18} />
                    <input type="text" defaultValue="Hà Nội (HAN)" className="w-full bg-transparent border-none focus:outline-none font-bold text-slate-800" />
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="md:col-span-4 flex items-center border border-slate-200 rounded-2xl bg-slate-50 focus-within:ring-2 focus-within:ring-sky-500 focus-within:bg-white transition-all">
                <div className="flex-1 p-3 px-4">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Ngày Đi</div>
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
                    <Calendar className="text-slate-500 shrink-0" size={18} />
                    <span>20 Thg 10</span>
                  </div>
                </div>
                {tripType === 'roundtrip' && (
                  <div className="flex-1 p-3 px-4 border-l border-slate-200">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Ngày Về</div>
                    <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
                      <Calendar className="text-slate-500 shrink-0" size={18} />
                      <span>25 Thg 10</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Passengers */}
              <div className="md:col-span-3 flex items-center justify-between border border-slate-200 rounded-2xl bg-slate-50 p-3 px-4 focus-within:ring-2 focus-within:ring-sky-500 focus-within:bg-white transition-all">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Hành Khách & Hạng Vé</div>
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
                    <Users className="text-slate-500 shrink-0" size={18} />
                    <span>1 Người, Phổ thông</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="bg-amber-500 text-white font-black text-base py-4 px-10 rounded-2xl hover:bg-amber-600 transition shadow-lg shadow-amber-500/30 flex items-center gap-2">
                <Search size={20} /> TÌM CHUYẾN BAY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FLIGHT RESULTS */}
      <div className="max-w-[1240px] mx-auto px-4 -mt-10 relative z-10 flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 sticky top-24">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Filter size={18} className="text-sky-600" /> BỘ LỌC TÌM KIẾM
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3">Hãng hàng không</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="rounded text-sky-600 focus:ring-sky-500" defaultChecked /> Vietnam Airlines
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="rounded text-sky-600 focus:ring-sky-500" defaultChecked /> Vietjet Air
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="rounded text-sky-600 focus:ring-sky-500" defaultChecked /> Bamboo Airways
                  </label>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3">Giờ cất cánh</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="rounded text-sky-600 focus:ring-sky-500" /> Sáng (06:00 - 12:00)
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="rounded text-sky-600 focus:ring-sky-500" /> Chiều (12:00 - 18:00)
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" className="rounded text-sky-600 focus:ring-sky-500" /> Tối (18:00 - 24:00)
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex items-center justify-between mb-2">
            <span className="font-bold text-slate-800 text-sm">Tìm thấy {MOCK_FLIGHTS.length} chuyến bay SGN → HAN</span>
            <select className="border border-slate-200 rounded-lg p-2 text-sm text-slate-700 outline-none focus:border-sky-500">
              <option>Sắp xếp: Giá thấp nhất</option>
              <option>Sắp xếp: Giờ cất cánh sớm nhất</option>
              <option>Sắp xếp: Hãng hàng không</option>
            </select>
          </div>

          {MOCK_FLIGHTS.map((flight) => (
            <div key={flight.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:border-sky-300 hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6">
              
              {/* Airline Info */}
              <div className="w-full md:w-32 flex flex-row md:flex-col items-center gap-3 shrink-0">
                <div className="h-10 w-auto min-w-[96px] flex items-center justify-center">
                  <AirlineBadge airline={flight.airline} logo={flight.airlineLogo} />
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-800 text-sm">{flight.airline}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{flight.flightNumber}</div>
                </div>
              </div>

              {/* Time & Route */}
              <div className="flex-1 w-full flex items-center justify-center md:justify-between gap-4 py-4 md:py-0 border-y md:border-y-0 md:border-x border-slate-100 md:px-6">
                <div className="text-center">
                  <div className="text-2xl font-black text-slate-800">{flight.departure.time}</div>
                  <div className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded mt-1">{flight.departure.airport}</div>
                </div>

                <div className="flex flex-col items-center flex-1 max-w-[150px] px-2">
                  <div className="text-[11px] font-bold text-slate-400 mb-1">{flight.duration}</div>
                  <div className="w-full h-px bg-slate-300 relative flex items-center justify-center">
                    <Plane className="text-sky-500 absolute" size={16} />
                  </div>
                  <div className="text-[11px] text-sky-600 font-bold mt-1">{flight.type}</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-black text-slate-800">{flight.arrival.time}</div>
                  <div className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded mt-1">{flight.arrival.airport}</div>
                </div>
              </div>

              {/* Price & Booking */}
              <div className="w-full md:w-40 shrink-0 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
                <div className="text-left md:text-right">
                  {flight.oldPrice && (
                    <div className="text-xs text-slate-400 line-through mb-0.5">{flight.oldPrice.toLocaleString()} đ</div>
                  )}
                  <div className="text-2xl font-black text-amber-500 leading-none">{flight.price.toLocaleString()} đ</div>
                  <div className="text-[11px] text-slate-500 mt-1">/ khách</div>
                </div>
                <button className="bg-amber-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-amber-600 transition shadow-sm whitespace-nowrap">
                  CHỌN
                </button>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Flights;
