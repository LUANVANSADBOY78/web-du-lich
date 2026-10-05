import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Calendar, Clock, Plane, CheckCircle2, ShieldCheck, UserCheck, ChevronRight, Award, ShoppingCart, CreditCard } from 'lucide-react';
import { MOCK_TOURS } from '../data/mockTours';
import { toast } from 'react-toastify';

const TourDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [adultQty, setAdultQty] = useState(1);
  const [childQty, setChildQty] = useState(0);

  useEffect(() => {
    const found = MOCK_TOURS.find(t => t.id === id) || MOCK_TOURS[0];
    setTour(found);
    if (found.departures && found.departures.length > 0) {
      setSelectedDate(found.departures[0].startDate);
    }
  }, [id]);

  if (!tour) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
        <p className="text-slate-500 font-semibold">Đang tải thông tin tour...</p>
      </div>
    );
  }

  const childPrice = Math.round(tour.price * 0.7);
  const totalPrice = (adultQty * tour.price) + (childQty * childPrice);

  const handleBookTour = () => {
    if (!selectedDate) {
      toast.error('Vui lòng chọn ngày khởi hành tour!');
      return;
    }

    const cartItem = {
      productId: tour.id,
      productName: tour.name,
      img: tour.img,
      date: selectedDate,
      adultQty,
      childQty,
      totalPrice
    };

    const existingCart = JSON.parse(localStorage.getItem('goticket_cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('goticket_cart', JSON.stringify(existingCart));

    toast.success('Đã thêm tour vào đơn đặt!');
    navigate('/checkout');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 font-sans">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-sky-600">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link to="/tours" className="hover:text-sky-600">Tour du lịch</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-semibold truncate max-w-xs">{tour.name}</span>
        </nav>

        {/* HERO TOUR OVERVIEW */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Image */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img src={tour.img} alt={tour.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-amber-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow">
                {tour.badge || 'Tour HOT'}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs font-bold text-sky-600 mb-2 flex-wrap">
                <span className="bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Plane size={14} /> Điểm khởi hành: {tour.departure}
                </span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Clock size={14} /> Thời gian: {tour.duration}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-4">
                {tour.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6 text-sm">
                <div className="flex items-center bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded-lg border border-amber-200">
                  <Star size={16} className="fill-current text-amber-500 mr-1" />
                  <span>{tour.rating} / 10</span>
                </div>
                <span className="text-slate-400">|</span>
                <span className="text-slate-600 font-medium">{tour.reviews} đánh giá</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-600 font-semibold">{tour.booked} khách đã đi</span>
              </div>

              {/* Highlights */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 mb-6">
                <h4 className="font-bold text-slate-900 text-sm mb-2">Điểm Nổi Bật Của Tour:</h4>
                {tour.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-700 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium block">Giá tour trọn gói từ</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-black text-amber-600">
                    {tour.price.toLocaleString('vi-VN')} đ
                  </span>
                  {tour.oldPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {tour.oldPrice.toLocaleString('vi-VN')} đ
                    </span>
                  )}
                </div>
              </div>
              <span className="bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl">
                Tiết kiệm {Math.round((1 - tour.price / (tour.oldPrice || tour.price * 1.2)) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* BOOKING CALCULATOR & DATE SELECTOR */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 mb-8">
          <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Calendar className="text-sky-600" size={24} /> Chọn Ngày Khởi Hành & Số Khách
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Departure Dates Selector */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">Chọn lịch khởi hành có sẵn:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tour.departures.map((dep) => (
                  <button
                    key={dep.startDate}
                    onClick={() => setSelectedDate(dep.startDate)}
                    className={`py-3 px-4 rounded-2xl font-bold text-xs md:text-sm border transition text-center ${
                      selectedDate === dep.startDate 
                        ? 'bg-sky-600 text-white border-sky-600 shadow-md' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-500'
                    }`}
                  >
                    <div>{dep.startDate.split('-').reverse().join('/')}</div>
                    <div className={`text-[10px] font-normal mt-0.5 ${dep.status === 'Còn chỗ' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {dep.status}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 mb-3">Số lượng hành khách:</label>
              
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <div className="font-bold text-slate-800 text-sm">Người lớn (12+ tuổi)</div>
                  <div className="text-xs text-amber-600 font-bold">{tour.price.toLocaleString('vi-VN')} đ / khách</div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setAdultQty(Math.max(1, adultQty - 1))}
                    className="w-9 h-9 rounded-xl bg-white border border-slate-300 font-bold flex items-center justify-center"
                  >-</button>
                  <span className="font-black text-base w-6 text-center">{adultQty}</span>
                  <button 
                    onClick={() => setAdultQty(adultQty + 1)}
                    className="w-9 h-9 rounded-xl bg-white border border-slate-300 font-bold flex items-center justify-center"
                  >+</button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <div className="font-bold text-slate-800 text-sm">Trẻ em (5 - 11 tuổi)</div>
                  <div className="text-xs text-amber-600 font-bold">{childPrice.toLocaleString('vi-VN')} đ / khách</div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setChildQty(Math.max(0, childQty - 1))}
                    className="w-9 h-9 rounded-xl bg-white border border-slate-300 font-bold flex items-center justify-center"
                  >-</button>
                  <span className="font-black text-base w-6 text-center">{childQty}</span>
                  <button 
                    onClick={() => setChildQty(childQty + 1)}
                    className="w-9 h-9 rounded-xl bg-white border border-slate-300 font-bold flex items-center justify-center"
                  >+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng tiền tour ({adultQty + childQty} khách)</div>
              <div className="text-3xl font-black text-amber-600 mt-1">
                {totalPrice.toLocaleString('vi-VN')} đ
              </div>
            </div>

            <button 
              onClick={handleBookTour}
              className="w-full md:w-auto py-4 px-10 rounded-2xl bg-sky-600 text-white font-bold hover:bg-sky-700 transition flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 text-base"
            >
              <CreditCard size={20} /> ĐẶT TOUR NGAY
            </button>
          </div>
        </div>

        {/* DAY BY DAY ITINERARY TIMELINE */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80">
          <h2 className="text-xl font-black text-slate-900 mb-6 border-b border-slate-100 pb-4">
            Lịch Trình Tour Chi Tiết
          </h2>

          <div className="space-y-6">
            {tour.itinerary.map((dayItem) => (
              <div key={dayItem.day} className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                  D{dayItem.day}
                </div>
                <div className="flex-grow bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                  <h3 className="font-bold text-slate-900 text-base">{dayItem.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{dayItem.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TourDetail;
