import { useState, useMemo } from 'react';
import { 
  Plane, Calendar, Users, Search, ArrowRightLeft, MapPin, Filter, 
  ArrowRight, Clock, ShieldCheck, CheckCircle, Sparkles, ChevronDown, 
  ChevronUp, PhoneCall, HelpCircle, Luggage, Coffee, Info, X,
  GraduationCap, Home, Briefcase, Globe, Award, AlertCircle, ShoppingCart, ChevronRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Danh sách sân bay phổ biến
const AIRPORTS = [
  { code: 'SGN', city: 'Hồ Chí Minh', name: 'Sân bay Tân Sơn Nhất' },
  { code: 'HAN', city: 'Hà Nội', name: 'Sân bay Nội Bài' },
  { code: 'DAD', city: 'Đà Nẵng', name: 'Sân bay Đà Nẵng' },
  { code: 'PQC', city: 'Phú Quốc', name: 'Sân bay Phú Quốc' },
  { code: 'CXR', city: 'Nha Trang', name: 'Sân bay Cam Ranh' },
  { code: 'DLI', city: 'Đà Lạt', name: 'Sân bay Liên Khương' },
  { code: 'HPH', city: 'Hải Phòng', name: 'Sân bay Cát Bi' },
  { code: 'UIH', city: 'Quy Nhơn', name: 'Sân bay Phù Cát' },
  { code: 'VII', city: 'Vinh', name: 'Sân bay Vinh' },
  { code: 'HUI', city: 'Huế', name: 'Sân bay Phú Bài' },
  { code: 'VCA', city: 'Cần Thơ', name: 'Sân bay Cần Thơ' },
  { code: 'BKK', city: 'Bangkok', name: 'Sân bay Suvarnabhumi' },
  { code: 'SIN', city: 'Singapore', name: 'Sân bay Changi' },
  { code: 'NRT', city: 'Tokyo', name: 'Sân bay Narita' },
  { code: 'ICN', city: 'Seoul', name: 'Sân bay Incheon' }
];

// Chặng bay nội địa ưu đãi nhất chuẩn iVIVU
const POPULAR_ROUTES = {
  SGN: [
    { from: 'Hồ Chí Minh', to: 'Hà Nội', toCode: 'HAN', price: 799000, oldPrice: 1250000, airline: 'Vietjet Air', img: 'https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=400' },
    { from: 'Hồ Chí Minh', to: 'Đà Nẵng', toCode: 'DAD', price: 499000, oldPrice: 890000, airline: 'Bamboo Airways', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=400' },
    { from: 'Hồ Chí Minh', to: 'Phú Quốc', toCode: 'PQC', price: 399000, oldPrice: 750000, airline: 'Vietjet Air', img: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=400' },
    { from: 'Hồ Chí Minh', to: 'Nha Trang', toCode: 'CXR', price: 399000, oldPrice: 690000, airline: 'Vietnam Airlines', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=400' },
    { from: 'Hồ Chí Minh', to: 'Đà Lạt', toCode: 'DLI', price: 349000, oldPrice: 620000, airline: 'Vietravel Airlines', img: 'https://images.unsplash.com/photo-1501117716987-c8c394bb29df?auto=format&fit=crop&q=80&w=400' },
    { from: 'Hồ Chí Minh', to: 'Quy Nhơn', toCode: 'UIH', price: 449000, oldPrice: 790000, airline: 'Vietnam Airlines', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400' },
  ],
  HAN: [
    { from: 'Hà Nội', to: 'Đà Nẵng', toCode: 'DAD', price: 499000, oldPrice: 850000, airline: 'Vietnam Airlines', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=400' },
    { from: 'Hà Nội', to: 'Hồ Chí Minh', toCode: 'SGN', price: 799000, oldPrice: 1250000, airline: 'Vietjet Air', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=400' },
    { from: 'Hà Nội', to: 'Nha Trang', toCode: 'CXR', price: 699000, oldPrice: 1100000, airline: 'Bamboo Airways', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=400' },
    { from: 'Hà Nội', to: 'Phú Quốc', toCode: 'PQC', price: 899000, oldPrice: 1450000, airline: 'Vietnam Airlines', img: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=400' },
    { from: 'Hà Nội', to: 'Đà Lạt', toCode: 'DLI', price: 799000, oldPrice: 1350000, airline: 'Vietjet Air', img: 'https://images.unsplash.com/photo-1501117716987-c8c394bb29df?auto=format&fit=crop&q=80&w=400' },
    { from: 'Hà Nội', to: 'Quy Nhơn', toCode: 'UIH', price: 599000, oldPrice: 950000, airline: 'Bamboo Airways', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400' },
  ],
  DAD: [
    { from: 'Đà Nẵng', to: 'Hà Nội', toCode: 'HAN', price: 499000, oldPrice: 850000, airline: 'Vietjet Air', img: 'https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=400' },
    { from: 'Đà Nẵng', to: 'Hồ Chí Minh', toCode: 'SGN', price: 499000, oldPrice: 890000, airline: 'Vietnam Airlines', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=400' },
    { from: 'Đà Nẵng', to: 'Cần Thơ', toCode: 'VCA', price: 549000, oldPrice: 920000, airline: 'Vietjet Air', img: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=400' },
  ]
};

// Dữ liệu chuyến bay mẫu phong phú
const SAMPLE_FLIGHTS = [
  {
    id: 'f1',
    airline: 'Vietnam Airlines',
    flightNumber: 'VN-214',
    aircraft: 'Airbus A321 Neo',
    fromCode: 'SGN',
    toCode: 'HAN',
    departure: { time: '06:00', airport: 'SGN', city: 'Hồ Chí Minh' },
    arrival: { time: '08:15', airport: 'HAN', city: 'Hà Nội' },
    duration: '2h 15m',
    type: 'Bay thẳng',
    price: 1350000,
    oldPrice: 1750000,
    baggageHand: '1 kiện 12kg',
    baggageCheck: '1 kiện 23kg',
    mealIncluded: true,
    class: 'Phổ thông Tiết kiệm'
  },
  {
    id: 'f2',
    airline: 'Vietjet Air',
    flightNumber: 'VJ-128',
    aircraft: 'Airbus A320',
    fromCode: 'SGN',
    toCode: 'HAN',
    departure: { time: '07:15', airport: 'SGN', city: 'Hồ Chí Minh' },
    arrival: { time: '09:25', airport: 'HAN', city: 'Hà Nội' },
    duration: '2h 10m',
    type: 'Bay thẳng',
    price: 899000,
    oldPrice: 1190000,
    baggageHand: '1 kiện 7kg',
    baggageCheck: 'Chưa bao gồm',
    mealIncluded: false,
    class: 'Eco Tiết kiệm'
  },
  {
    id: 'f3',
    airline: 'Bamboo Airways',
    flightNumber: 'QH-202',
    aircraft: 'Boeing 787-9 Dreamliner',
    fromCode: 'SGN',
    toCode: 'HAN',
    departure: { time: '09:45', airport: 'SGN', city: 'Hồ Chí Minh' },
    arrival: { time: '12:00', airport: 'HAN', city: 'Hà Nội' },
    duration: '2h 15m',
    type: 'Bay thẳng',
    price: 1190000,
    oldPrice: 1490000,
    baggageHand: '1 kiện 7kg',
    baggageCheck: '1 kiện 20kg',
    mealIncluded: true,
    class: 'Economy Smart'
  },
  {
    id: 'f4',
    airline: 'Vietravel Airlines',
    flightNumber: 'VU-302',
    aircraft: 'Airbus A321',
    fromCode: 'SGN',
    toCode: 'HAN',
    departure: { time: '11:30', airport: 'SGN', city: 'Hồ Chí Minh' },
    arrival: { time: '13:40', airport: 'HAN', city: 'Hà Nội' },
    duration: '2h 10m',
    type: 'Bay thẳng',
    price: 850000,
    oldPrice: 1100000,
    baggageHand: '1 kiện 7kg',
    baggageCheck: 'Chưa bao gồm',
    mealIncluded: false,
    class: 'Phổ thông'
  },
  {
    id: 'f5',
    airline: 'Vietnam Airlines',
    flightNumber: 'VN-256',
    aircraft: 'Boeing 787-10 Dreamliner',
    fromCode: 'SGN',
    toCode: 'HAN',
    departure: { time: '14:00', airport: 'SGN', city: 'Hồ Chí Minh' },
    arrival: { time: '16:15', airport: 'HAN', city: 'Hà Nội' },
    duration: '2h 15m',
    type: 'Bay thẳng',
    price: 1550000,
    oldPrice: 1850000,
    baggageHand: '1 kiện 12kg',
    baggageCheck: '1 kiện 23kg',
    mealIncluded: true,
    class: 'Phổ thông Tiêu chuẩn'
  },
  {
    id: 'f6',
    airline: 'Vietjet Air',
    flightNumber: 'VJ-186',
    aircraft: 'Airbus A321',
    fromCode: 'SGN',
    toCode: 'HAN',
    departure: { time: '17:30', airport: 'SGN', city: 'Hồ Chí Minh' },
    arrival: { time: '19:40', airport: 'HAN', city: 'Hà Nội' },
    duration: '2h 10m',
    type: 'Bay thẳng',
    price: 990000,
    oldPrice: 1290000,
    baggageHand: '1 kiện 7kg',
    baggageCheck: 'Chưa bao gồm',
    mealIncluded: false,
    class: 'Eco'
  },
  {
    id: 'f7',
    airline: 'Bamboo Airways',
    flightNumber: 'QH-244',
    aircraft: 'Airbus A320 Neo',
    fromCode: 'SGN',
    toCode: 'HAN',
    departure: { time: '20:15', airport: 'SGN', city: 'Hồ Chí Minh' },
    arrival: { time: '22:30', airport: 'HAN', city: 'Hà Nội' },
    duration: '2h 15m',
    type: 'Bay thẳng',
    price: 1050000,
    oldPrice: 1350000,
    baggageHand: '1 kiện 7kg',
    baggageCheck: '1 kiện 20kg',
    mealIncluded: true,
    class: 'Economy Flex'
  }
];

// Thông tin hữu ích khi bay (Cẩm nang chuẩn iVIVU)
const TRAVEL_INFOS = [
  {
    title: 'Check-in sân bay bằng sinh trắc học qua VNeID',
    summary: 'Giải pháp tiện lợi giúp hành khách làm thủ tục nhanh hơn, quét khuôn mặt qua cổng an ninh mà không cần mang theo nhiều giấy tờ tùy thân.',
    tag: 'Công nghệ 2026'
  },
  {
    title: 'Nên đến sân bay trước mấy tiếng để làm thủ tục?',
    summary: 'Chuyến bay nội địa: có mặt trước 2 tiếng (đóng quầy trước 40 phút). Chuyến bay quốc tế: có mặt trước 3 tiếng (đóng quầy trước 60 phút).',
    tag: 'Quy định giờ bay'
  },
  {
    title: 'Đã check-in online rồi có cần ra quầy sân bay không?',
    summary: 'Nếu chỉ có hành lý xách tay: bạn có thể dùng thẻ lên máy bay điện tử qua thẳng cổng an ninh. Nếu có hành lý ký gửi: cần ghé quầy gửi hành lý.',
    tag: 'Thủ tục online'
  },
  {
    title: 'Quy định hành lý xách tay và ký gửi các hãng hàng không',
    summary: 'Vietnam Airlines: xách tay 12kg + ký gửi 23kg. Vietjet & Vietravel: xách tay 7kg. Bamboo Airways: xách tay 7kg + ký gửi 20kg từ hạng Flex.',
    tag: 'Hành lý bay'
  },
  {
    title: 'Giấy tờ tùy thân hợp lệ khi đi máy bay nội địa',
    summary: 'Hành khách từ 14 tuổi: CCCD, hộ chiếu hoặc tài khoản VNeID mức 2. Trẻ em dưới 14 tuổi: giấy khai sinh bản gốc/trích lục hoặc thẻ căn cước mới.',
    tag: 'Giấy tờ bay'
  },
  {
    title: 'Hướng dẫn đổi ngày bay, giờ bay và hoàn vé',
    summary: 'Liên hệ GoTravel ít nhất 6 tiếng trước giờ bay để được hỗ trợ kiểm tra điều kiện vé và phí chênh lệch giá vé một cách nhanh chóng.',
    tag: 'Hỗ trợ vé'
  }
];

// Component render Logo Hãng Hàng Không đẹp chuẩn nhận diện
const AirlineBadge = ({ airline }) => {
  if (airline === 'Vietjet Air') {
    return (
      <div className="flex items-center gap-1.5">
        <span className="bg-red-600 text-white text-[11px] font-black px-1.5 py-0.5 rounded shadow-sm">VJ</span>
        <span className="font-black text-sm italic tracking-tight text-red-600">
          vietjet<span className="text-amber-500 font-extrabold">Air</span>
        </span>
      </div>
    );
  }

  if (airline === 'Bamboo Airways') {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-base">🎋</span>
        <span className="font-black text-sm tracking-tight text-emerald-800">
          Bamboo <span className="text-sky-700">Airways</span>
        </span>
      </div>
    );
  }

  if (airline === 'Vietravel Airlines') {
    return (
      <div className="flex items-center gap-1.5">
        <span className="bg-amber-400 text-slate-900 text-[11px] font-black px-1.5 py-0.5 rounded shadow-sm">VU</span>
        <span className="font-black text-sm tracking-tight text-sky-800">
          Vietravel <span className="text-amber-600">Airlines</span>
        </span>
      </div>
    );
  }

  // Vietnam Airlines (Default)
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-base text-amber-500">🪷</span>
      <span className="font-black text-sm tracking-tight text-sky-950">
        Vietnam <span className="text-amber-600">Airlines</span>
      </span>
    </div>
  );
};

const Flights = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  // Search form state
  const [tripType, setTripType] = useState('roundtrip'); // 'oneway' | 'roundtrip'
  const [fromCode, setFromCode] = useState('SGN');
  const [toCode, setToCode] = useState('HAN');
  const [departDate, setDepartDate] = useState('2026-10-20');
  const [returnDate, setReturnDate] = useState('2026-10-25');
  
  // Passenger dropdown
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [seatClass, setSeatClass] = useState('Phổ thông');

  // Filter state
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedTimeRanges, setSelectedTimeRanges] = useState([]);
  const [sortBy, setSortBy] = useState('price_asc');
  const [popularTab, setPopularTab] = useState('SGN');

  // Booking Flight Modal
  const [selectedFlight, setSelectedFlight] = useState(null);

  // Helper tìm tên sân bay
  const fromAirport = AIRPORTS.find(a => a.code === fromCode) || AIRPORTS[0];
  const toAirport = AIRPORTS.find(a => a.code === toCode) || AIRPORTS[1];

  // Swap điểm đi & điểm đến
  const handleSwapAirports = () => {
    const temp = fromCode;
    setFromCode(toCode);
    setToCode(temp);
  };

  // Chọn chặng bay từ bảng ưu đãi
  const handleSelectPopularRoute = (route) => {
    setFromCode(popularTab);
    setToCode(route.toCode);
    window.scrollTo({ top: 40, behavior: 'smooth' });
    toast.info(`Đã chọn chặng bay ${route.from} → ${route.to}`);
  };

  // Lọc danh sách chuyến bay
  const filteredFlights = useMemo(() => {
    return SAMPLE_FLIGHTS.filter(flight => {
      // Hãng hàng không
      if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline)) {
        return false;
      }

      // Giờ cất cánh
      if (selectedTimeRanges.length > 0) {
        const hour = parseInt(flight.departure.time.split(':')[0], 10);
        const matchTime = selectedTimeRanges.some(range => {
          if (range === 'early') return hour >= 0 && hour < 6;
          if (range === 'morning') return hour >= 6 && hour < 12;
          if (range === 'afternoon') return hour >= 12 && hour < 18;
          if (range === 'evening') return hour >= 18 && hour < 24;
          return false;
        });
        if (!matchTime) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'time_asc') return a.departure.time.localeCompare(b.departure.time);
      return 0;
    });
  }, [selectedAirlines, selectedTimeRanges, sortBy]);

  // Đặt vé chuyến bay
  const handleBookFlight = (flight) => {
    const passengerTotal = adults + children;
    const finalPrice = flight.price * passengerTotal + (flight.price * 0.1 * infants);

    addItem({
      id: `flight-${flight.id}-${Date.now()}`,
      name: `Vé máy bay ${flight.airline} (${flight.flightNumber}): ${fromAirport.city} → ${toAirport.city}`,
      price: finalPrice,
      type: 'flight',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=400',
      date: departDate
    });

    toast.success(`Đã thêm chuyến bay ${flight.flightNumber} vào giỏ hàng!`);
    setSelectedFlight(null);
    navigate('/checkout');
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-16">
      
      {/* 1. HERO FLIGHT SEARCH CHUẨN iVIVU */}
      <div className="relative bg-gradient-to-r from-sky-900 via-sky-800 to-blue-900 text-white pt-10 pb-20 px-4 overflow-hidden">
        {/* Background glow and subtle airplane watermark */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1240px] mx-auto relative z-10">
          
          {/* Header Slogan & Trust Stats chuẩn iVIVU */}
          <div className="text-center mb-6">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-sky-200 text-xs font-bold px-4 py-1.5 rounded-full inline-flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-amber-400 fill-current" />
              Giá Tốt – Xuất Vé Ngay – Check-in Online Miễn Phí
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
              Đặt Vé Máy Bay Giá Tốt Nhất
            </h1>
            <p className="text-sky-100 text-xs md:text-sm max-w-xl mx-auto font-normal">
              So sánh giá vé thời gian thực từ Vietnam Airlines, Bamboo Airways, Vietjet Air, Vietravel Airlines
            </p>
          </div>

          {/* 3 Cam kết nhỏ trên Header */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-sky-100 mb-6">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle size={15} className="text-emerald-400" /> Hơn 1 triệu vé đã bán
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              <Award size={15} className="text-amber-400" /> 93% khách cực kỳ hài lòng
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              <PhoneCall size={15} className="text-sky-400" /> Hỗ trợ phản hồi trong 15 phút (1900 2087)
            </div>
          </div>

          {/* MAIN SEARCH BOX */}
          <div className="bg-white text-slate-800 rounded-3xl p-5 md:p-7 shadow-2xl mx-auto max-w-5xl border border-white/40">
            
            {/* Trip Type Radio Buttons */}
            <div className="flex items-center gap-6 mb-5 border-b border-slate-100 pb-3">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-sm text-slate-700">
                <input 
                  type="radio" 
                  name="tripType" 
                  checked={tripType === 'roundtrip'} 
                  onChange={() => setTripType('roundtrip')}
                  className="w-4 h-4 text-sky-600 focus:ring-sky-500" 
                />
                <span>Khứ hồi</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-bold text-sm text-slate-700">
                <input 
                  type="radio" 
                  name="tripType" 
                  checked={tripType === 'oneway'} 
                  onChange={() => setTripType('oneway')}
                  className="w-4 h-4 text-sky-600 focus:ring-sky-500" 
                />
                <span>Một chiều</span>
              </label>
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              
              {/* Departure & Arrival Box */}
              <div className="lg:col-span-5 relative flex items-center border border-slate-200 rounded-2xl bg-slate-50 focus-within:ring-2 focus-within:ring-sky-500 focus-within:bg-white transition-all">
                {/* Điểm đi */}
                <div className="flex-1 p-3 px-4">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Điểm Đi</div>
                  <select
                    value={fromCode}
                    onChange={(e) => setFromCode(e.target.value)}
                    className="w-full bg-transparent font-black text-slate-900 text-sm md:text-base outline-none cursor-pointer"
                  >
                    {AIRPORTS.map(a => (
                      <option key={a.code} value={a.code} disabled={a.code === toCode}>
                        {a.city} ({a.code})
                      </option>
                    ))}
                  </select>
                  <div className="text-[11px] text-slate-400 truncate">{fromAirport.name}</div>
                </div>

                {/* Nút hoán đổi 2 chiều ⇄ */}
                <button 
                  onClick={handleSwapAirports}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-slate-300 rounded-full flex items-center justify-center text-sky-600 shadow-md hover:bg-sky-50 hover:scale-110 transition-all z-10"
                  title="Đổi chiều bay"
                >
                  <ArrowRightLeft size={13} />
                </button>

                {/* Điểm đến */}
                <div className="flex-1 p-3 px-4 border-l border-slate-200 pl-5">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Điểm Đến</div>
                  <select
                    value={toCode}
                    onChange={(e) => setToCode(e.target.value)}
                    className="w-full bg-transparent font-black text-slate-900 text-sm md:text-base outline-none cursor-pointer"
                  >
                    {AIRPORTS.map(a => (
                      <option key={a.code} value={a.code} disabled={a.code === fromCode}>
                        {a.city} ({a.code})
                      </option>
                    ))}
                  </select>
                  <div className="text-[11px] text-slate-400 truncate">{toAirport.name}</div>
                </div>
              </div>

              {/* Ngày Đi & Ngày Về */}
              <div className="lg:col-span-4 flex items-center border border-slate-200 rounded-2xl bg-slate-50 focus-within:ring-2 focus-within:ring-sky-500 focus-within:bg-white transition-all">
                <div className="flex-1 p-3 px-4">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Ngày Đi</div>
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full bg-transparent font-black text-slate-800 text-sm outline-none cursor-pointer"
                  />
                </div>

                {tripType === 'roundtrip' && (
                  <div className="flex-1 p-3 px-4 border-l border-slate-200">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Ngày Về</div>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-transparent font-black text-slate-800 text-sm outline-none cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Hành khách & Hạng vé dropdown */}
              <div className="lg:col-span-3 relative">
                <div 
                  onClick={() => setShowPassengerModal(!showPassengerModal)}
                  className="h-full p-3 px-4 border border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100/70 transition cursor-pointer flex flex-col justify-center"
                >
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Hành Khách & Hạng Vé</div>
                  <div className="font-black text-slate-800 text-sm truncate flex items-center justify-between">
                    <span>{adults + children + infants} Khách, {seatClass}</span>
                    <ChevronDown size={14} className="text-slate-400 shrink-0" />
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {adults} NL{children > 0 && `, ${children} TE`}{infants > 0 && `, ${infants} EB`}
                  </div>
                </div>

                {/* Dropdown Modal chọn hành khách */}
                {showPassengerModal && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-fadeIn">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                      <span className="font-black text-sm text-slate-800">Chọn số hành khách</span>
                      <button onClick={() => setShowPassengerModal(false)} className="text-slate-400 hover:text-slate-600">
                        <X size={16} />
                      </button>
                    </div>

                    {/* Người lớn */}
                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                      <div>
                        <div className="font-bold text-xs text-slate-800">Người lớn</div>
                        <div className="text-[10px] text-slate-400">Từ 12 tuổi trở lên</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-7 h-7 rounded-lg bg-slate-100 font-bold hover:bg-slate-200 text-xs"
                        >-</button>
                        <span className="w-5 text-center font-bold text-sm">{adults}</span>
                        <button 
                          onClick={() => setAdults(adults + 1)}
                          className="w-7 h-7 rounded-lg bg-sky-600 text-white font-bold hover:bg-sky-700 text-xs"
                        >+</button>
                      </div>
                    </div>

                    {/* Trẻ em */}
                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                      <div>
                        <div className="font-bold text-xs text-slate-800">Trẻ em</div>
                        <div className="text-[10px] text-slate-400">Từ 2 đến 11 tuổi</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-7 h-7 rounded-lg bg-slate-100 font-bold hover:bg-slate-200 text-xs"
                        >-</button>
                        <span className="w-5 text-center font-bold text-sm">{children}</span>
                        <button 
                          onClick={() => setChildren(children + 1)}
                          className="w-7 h-7 rounded-lg bg-sky-600 text-white font-bold hover:bg-sky-700 text-xs"
                        >+</button>
                      </div>
                    </div>

                    {/* Em bé */}
                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                      <div>
                        <div className="font-bold text-xs text-slate-800">Em bé</div>
                        <div className="text-[10px] text-slate-400">Dưới 2 tuổi (ngồi chung)</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setInfants(Math.max(0, infants - 1))}
                          className="w-7 h-7 rounded-lg bg-slate-100 font-bold hover:bg-slate-200 text-xs"
                        >-</button>
                        <span className="w-5 text-center font-bold text-sm">{infants}</span>
                        <button 
                          onClick={() => setInfants(infants + 1)}
                          className="w-7 h-7 rounded-lg bg-sky-600 text-white font-bold hover:bg-sky-700 text-xs"
                        >+</button>
                      </div>
                    </div>

                    {/* Hạng ghế */}
                    <div className="pt-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Hạng ghế</div>
                      <select
                        value={seatClass}
                        onChange={(e) => setSeatClass(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none cursor-pointer"
                      >
                        <option value="Phổ thông">Phổ thông (Economy)</option>
                        <option value="Phổ thông đặc biệt">Phổ thông đặc biệt (Premium)</option>
                        <option value="Thương gia">Thương gia (Business)</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setShowPassengerModal(false)}
                      className="w-full mt-3 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 rounded-xl text-xs transition"
                    >
                      Xác Nhận
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Nút Tìm kiếm */}
            <div className="mt-5 flex justify-end">
              <button 
                onClick={() => {
                  window.scrollTo({ top: 480, behavior: 'smooth' });
                  toast.success(`Đang tìm chuyến bay ${fromCode} → ${toCode}...`);
                }}
                className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm md:text-base py-3.5 px-10 rounded-2xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition"
              >
                <Search size={18} /> TÌM CHUYẾN BAY NGAY
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 2. BẢNG VÉ MÁY BAY NỘI ĐỊA ƯU ĐÃI NHẤT (Chuẩn iVIVU) */}
      <div className="max-w-[1240px] mx-auto px-4 my-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-black uppercase text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              ⚡ Săn vé siêu rẻ
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">Vé Máy Bay Nội Địa Ưu Đãi Nhất</h2>
            <p className="text-xs md:text-sm text-slate-500 mt-0.5">
              Giá vé siêu tiết kiệm từ Vietnam Airlines, Bamboo Airways, Vietjet Air, Vietravel Airlines
            </p>
          </div>

          {/* Departure Tabs */}
          <div className="flex items-center gap-2 bg-slate-200/70 p-1 rounded-2xl self-start md:self-auto">
            {[
              { id: 'SGN', label: 'Khởi hành từ TP.HCM' },
              { id: 'HAN', label: 'Khởi hành từ Hà Nội' },
              { id: 'DAD', label: 'Khởi hành từ Đà Nẵng' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setPopularTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  popularTab === tab.id
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Routes Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(POPULAR_ROUTES[popularTab] || POPULAR_ROUTES.SGN).map((route, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectPopularRoute(route)}
              className="group bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all cursor-pointer flex items-center gap-4"
            >
              <img
                src={route.img}
                alt={route.to}
                className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-0.5">
                  <span>{route.from}</span>
                  <ArrowRight size={12} className="text-sky-600" />
                  <span className="text-slate-800 font-black">{route.to}</span>
                </div>
                <div className="text-[11px] text-slate-400 mb-1">{route.airline}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-slate-400 line-through">
                    {route.oldPrice.toLocaleString('vi-VN')} đ
                  </span>
                  <span className="text-lg font-black text-amber-600">
                    {route.price.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>
              <div className="text-sky-600 group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. KẾ HOẠCH RIÊNG, GIÁ ĐẶC BIỆT (Gói vé chuyên biệt theo iVIVU) */}
      <div className="max-w-[1240px] mx-auto px-4 mb-12">
        <div className="bg-gradient-to-br from-sky-50 via-blue-50/40 to-slate-50 rounded-3xl p-8 border border-sky-100">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-black text-slate-900">Kế Hoạch Riêng, Giá Đặc Biệt</h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Tiết kiệm chi phí tối đa - Thực hiện trọn vẹn ước mơ</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                <GraduationCap size={22} />
              </div>
              <h4 className="font-black text-slate-900 text-base mb-1">Vé Du Học</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Đặt vé du học sinh với mức giá đặc quyền. Miễn phí thêm 1 kiện hành lý 23kg (tổng 46kg gửi).
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <Home size={22} />
              </div>
              <h4 className="font-black text-slate-900 text-base mb-1">Vé Định Cư</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Săn vé giá tốt cho cả gia đình định cư Mỹ, Canada, Úc, châu Âu. Đổi ngày linh hoạt.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                <Briefcase size={22} />
              </div>
              <h4 className="font-black text-slate-900 text-base mb-1">Xuất Khẩu Lao Động</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gói vé chuyên biệt dành cho người lao động đi Nhật Bản, Đài Loan, Hàn Quốc chi phí thấp nhất.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <Globe size={22} />
              </div>
              <h4 className="font-black text-slate-900 text-base mb-1">Săn Vé Quốc Tế</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vé bay du lịch & thăm thân quốc tế giá rẻ, hỗ trợ tư vấn visa và nối chuyến 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FLIGHT SEARCH RESULTS LIST & FILTER SIDEBAR */}
      <div className="max-w-[1240px] mx-auto px-4 mb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT FILTER SIDEBAR */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 sticky top-24">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <Filter size={16} className="text-sky-600" /> BỘ LỌC CHUYẾN BAY
                </h3>
                {(selectedAirlines.length > 0 || selectedTimeRanges.length > 0) && (
                  <button 
                    onClick={() => {
                      setSelectedAirlines([]);
                      setSelectedTimeRanges([]);
                    }}
                    className="text-xs text-sky-600 font-bold hover:underline"
                  >
                    Xóa lọc
                  </button>
                )}
              </div>

              {/* Hãng hàng không */}
              <div className="mb-5">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2.5">
                  Hãng Hàng Không
                </h4>
                <div className="space-y-2 text-xs">
                  {['Vietnam Airlines', 'Vietjet Air', 'Bamboo Airways', 'Vietravel Airlines'].map(airline => (
                    <label key={airline} className="flex items-center gap-2 text-slate-700 cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        checked={selectedAirlines.includes(airline)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedAirlines([...selectedAirlines, airline]);
                          else setSelectedAirlines(selectedAirlines.filter(a => a !== airline));
                        }}
                        className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4"
                      />
                      <span>{airline}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Giờ cất cánh */}
              <div>
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2.5">
                  Giờ Cất Cánh
                </h4>
                <div className="space-y-2 text-xs">
                  {[
                    { id: 'early', label: 'Sáng sớm (00:00 - 06:00)' },
                    { id: 'morning', label: 'Buổi sáng (06:00 - 12:00)' },
                    { id: 'afternoon', label: 'Buổi chiều (12:00 - 18:00)' },
                    { id: 'evening', label: 'Buổi tối (18:00 - 24:00)' }
                  ].map(time => (
                    <label key={time.id} className="flex items-center gap-2 text-slate-700 cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        checked={selectedTimeRanges.includes(time.id)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedTimeRanges([...selectedTimeRanges, time.id]);
                          else setSelectedTimeRanges(selectedTimeRanges.filter(t => t !== time.id));
                        }}
                        className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4"
                      />
                      <span>{time.label}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT FLIGHT RESULTS */}
          <div className="flex-1 space-y-4">
            {/* Header info & Sort bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs md:text-sm font-bold text-slate-800">
                Chuyến bay: <span className="text-sky-600">{fromAirport.city} ({fromCode})</span> → <span className="text-sky-600">{toAirport.city} ({toCode})</span>
                <span className="text-slate-400 font-normal ml-2">({filteredFlights.length} chuyến bay khả dụng)</span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs font-bold text-slate-500">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 py-1.5 px-3 rounded-xl outline-none focus:border-sky-600 cursor-pointer"
                >
                  <option value="price_asc">Giá: Thấp đến Cao</option>
                  <option value="price_desc">Giá: Cao đến Thấp</option>
                  <option value="time_asc">Giờ cất cánh sớm nhất</option>
                </select>
              </div>
            </div>

            {/* Flight Cards List */}
            {filteredFlights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:border-sky-300 hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6"
              >
                {/* Airline & Aircraft */}
                <div className="w-full md:w-36 flex flex-row md:flex-col items-center md:items-start gap-2 shrink-0">
                  <AirlineBadge airline={flight.airline} />
                  <div className="text-[11px] text-slate-400 font-medium">
                    {flight.flightNumber} • {flight.aircraft}
                  </div>
                </div>

                {/* Schedule & Duration */}
                <div className="flex-1 w-full flex items-center justify-between gap-4 py-3 md:py-0 border-y md:border-y-0 md:border-x border-slate-100 md:px-6">
                  {/* Departure */}
                  <div className="text-center md:text-left">
                    <div className="text-2xl font-black text-slate-900">{flight.departure.time}</div>
                    <div className="text-xs font-bold text-slate-600">{fromCode}</div>
                    <div className="text-[11px] text-slate-400 truncate">{fromAirport.city}</div>
                  </div>

                  {/* Flight Line */}
                  <div className="flex flex-col items-center flex-1 max-w-[140px] px-2">
                    <div className="text-[10px] font-bold text-slate-400 mb-1">{flight.duration}</div>
                    <div className="w-full h-px bg-slate-300 relative flex items-center justify-center">
                      <Plane size={15} className="text-sky-600 absolute" />
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-1">{flight.type}</div>
                  </div>

                  {/* Arrival */}
                  <div className="text-center md:text-right">
                    <div className="text-2xl font-black text-slate-900">{flight.arrival.time}</div>
                    <div className="text-xs font-bold text-slate-600">{toCode}</div>
                    <div className="text-[11px] text-slate-400 truncate">{toAirport.city}</div>
                  </div>
                </div>

                {/* Amenities & Baggage */}
                <div className="hidden xl:flex flex-col gap-1 text-[11px] text-slate-500 w-32 shrink-0">
                  <div className="flex items-center gap-1">
                    <Luggage size={13} className="text-slate-400" />
                    <span>XT: {flight.baggageHand}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Luggage size={13} className="text-sky-500" />
                    <span>KG: {flight.baggageCheck}</span>
                  </div>
                  {flight.mealIncluded && (
                    <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <Coffee size={13} />
                      <span>Có suất ăn</span>
                    </div>
                  )}
                </div>

                {/* Price & Booking Button */}
                <div className="w-full md:w-44 shrink-0 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
                  <div className="text-left md:text-right">
                    {flight.oldPrice && (
                      <div className="text-xs text-slate-400 line-through">
                        {flight.oldPrice.toLocaleString('vi-VN')} đ
                      </div>
                    )}
                    <div className="text-2xl font-black text-amber-600">
                      {flight.price.toLocaleString('vi-VN')} đ
                    </div>
                    <div className="text-[10px] text-slate-400">/ khách (Đã gồm thuế phí)</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedFlight(flight)}
                      className="bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold py-2 px-3 rounded-xl border border-sky-200 transition"
                    >
                      Chi tiết
                    </button>
                    <button
                      onClick={() => handleBookFlight(flight)}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xs py-2 px-5 rounded-xl shadow-md shadow-amber-500/25 transition whitespace-nowrap"
                    >
                      CHỌN VÉ
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredFlights.length === 0 && (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
                <Plane size={36} className="mx-auto text-slate-300 mb-3" />
                <h3 className="text-lg font-bold text-slate-800 mb-1">Không tìm thấy chuyến bay phù hợp</h3>
                <p className="text-xs text-slate-500">Hãy thử đổi hãng hàng không hoặc khung giờ cất cánh khác.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. THÔNG TIN HỮU ÍCH KHI ĐI MÁY BAY (Cẩm nang chuẩn iVIVU) */}
      <div className="max-w-[1240px] mx-auto px-4 mb-16">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-black uppercase text-sky-600 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
                Cẩm Nang Du Lịch
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">Thông Tin Hữu Ích Khi Đi Máy Bay</h2>
              <p className="text-xs text-slate-500 mt-0.5">Tổng hợp những thông tin cần biết để đặt vé và bay thuận tiện hơn</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRAVEL_INFOS.map((info, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-sky-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    {info.tag}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-2 mb-2 leading-snug">
                    {info.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {info.summary}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center text-xs font-bold text-sky-600 group cursor-pointer">
                  <span>Tìm hiểu thêm</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. MODAL CHI TIẾT CHUYẾN BAY */}
      {selectedFlight && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AirlineBadge airline={selectedFlight.airline} />
                <span className="text-xs font-bold text-slate-400">• {selectedFlight.flightNumber}</span>
              </div>
              <button 
                onClick={() => setSelectedFlight(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 bg-slate-50 p-3 rounded-xl">
                <span>Chặng: {fromAirport.city} ({fromCode}) → {toAirport.city} ({toCode})</span>
                <span className="text-sky-600">{selectedFlight.type}</span>
              </div>

              <div className="border-l-2 border-sky-500 pl-4 space-y-4 ml-2">
                <div>
                  <div className="text-lg font-black text-slate-900">{selectedFlight.departure.time} - {fromAirport.city} ({fromCode})</div>
                  <div className="text-xs text-slate-500">{fromAirport.name}</div>
                </div>
                <div className="text-xs text-slate-400 font-bold">
                  Thời gian bay: {selectedFlight.duration} • Tàu bay {selectedFlight.aircraft}
                </div>
                <div>
                  <div className="text-lg font-black text-slate-900">{selectedFlight.arrival.time} - {toAirport.city} ({toCode})</div>
                  <div className="text-xs text-slate-500">{toAirport.name}</div>
                </div>
              </div>

              <div className="bg-sky-50 p-3 rounded-xl text-xs space-y-1 text-slate-700">
                <div className="font-bold text-sky-900 mb-1">Dịch vụ & Tiện ích kèm theo:</div>
                <div>• Hành lý xách tay: <strong>{selectedFlight.baggageHand}</strong></div>
                <div>• Hành lý ký gửi: <strong>{selectedFlight.baggageCheck}</strong></div>
                <div>• Hạng vé: <strong>{selectedFlight.class}</strong></div>
                <div>• Suất ăn & nước uống: <strong>{selectedFlight.mealIncluded ? 'Đã bao gồm' : 'Không kèm theo'}</strong></div>
                <div>• Check-in trực tuyến: <strong>Miễn phí trước 24h</strong></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <div className="text-xs text-slate-400">Giá vé trọn gói:</div>
                <div className="text-2xl font-black text-amber-600">
                  {selectedFlight.price.toLocaleString('vi-VN')} đ
                </div>
              </div>
              <button
                onClick={() => handleBookFlight(selectedFlight)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-sm px-7 py-3 rounded-xl shadow-lg shadow-orange-500/25 hover:from-amber-600 hover:to-orange-600 transition"
              >
                Đặt Vé Ngay
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Flights;
