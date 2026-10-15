import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Calendar, Clock, Plane, CheckCircle2, ShieldCheck, UserCheck, ChevronRight, Award, ShoppingCart, CreditCard, Image as ImageIcon, Check } from 'lucide-react';
import { MOCK_TOURS } from '../data/mockTours';
import { toast } from 'react-toastify';
import TourReviewsSection from '../components/reviews/TourReviewsSection';

// Tạo lịch trình mẫu chi tiết theo điểm đến nếu tour chưa cấu hình riêng
const getDefaultItinerary = (tour) => {
  const durationStr = tour?.duration || '3 ngày 2 đêm';
  const dest = tour?.destination || 'điểm đến';
  const dep = tour?.departure || 'Hồ Chí Minh';
  const days = parseInt(durationStr) || 3;

  const res = [];
  for (let i = 1; i <= days; i++) {
    if (i === 1) {
      res.push({
        day: 1,
        title: `Ngày 1: Khởi hành từ ${dep} -> Khám phá ${dest}`,
        detail: `Xe và hướng dẫn viên đón đoàn tại điểm hẹn, bắt đầu hành trình đến ${dest}. Làm thủ tục nhận phòng khách sạn tiêu chuẩn 4 sao, dùng bữa trưa đặc sản và tham quan các danh lam thắng cảnh tiêu biểu.`
      });
    } else if (i === days) {
      res.push({
        day: i,
        title: `Ngày ${i}: Mua sắm đặc sản -> Tạm biệt ${dest} -> Về lại ${dep}`,
        detail: `Dùng bữa sáng buffet tại khách sạn. Quý khách tự do dạo phố, chụp ảnh và mua sắm quà lưu niệm đặc sản. Xe đưa đoàn ra sân bay/ga tàu về lại ${dep}. Hướng dẫn viên chia tay và hẹn gặp lại quý khách!`
      });
    } else {
      res.push({
        day: i,
        title: `Ngày ${i}: Trải nghiệm điểm nhấn & Văn hóa ẩm thực ${dest}`,
        detail: `Thưởng thức bữa sáng phong phú. Đoàn khởi hành tham quan các kỳ quan, di tích văn hóa lịch sử và khu vui chơi giải trí hàng đầu. Thưởng thức ẩm thực địa phương đặc sắc, tự do khám phá phố đêm lung linh.`
      });
    }
  }
  return res;
};

const TourDetail = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [adultQty, setAdultQty] = useState(1);
  const [childQty, setChildQty] = useState(0);

  useEffect(() => {
    const key = id || slug;
    const found = MOCK_TOURS.find(t => t.id === key || t.code === key || t.slug === key) || MOCK_TOURS[0];
    if (found) {
      setTour(found);
      if (found.departures && found.departures.length > 0) {
        setSelectedDate(found.departures[0].startDate);
      } else {
        setSelectedDate('2026-10-25');
      }
    }

    if (window.location.hash === '#danh-gia') {
      setTimeout(() => {
        document.getElementById('danh-gia')?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  }, [id, slug]);

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

  const itinerary = (tour.itinerary && tour.itinerary.length > 0)
    ? tour.itinerary
    : getDefaultItinerary(tour);

  const highlights = (tour.highlights && tour.highlights.length > 0)
    ? tour.highlights
    : [
        `Khám phá trọn vẹn cảnh sắc thiên nhiên và văn hóa đặc trưng tại ${tour.destination || 'điểm đến'}`,
        'Nghỉ dưỡng tiêu chuẩn khách sạn 4 - 5 sao tiện nghi, sang trọng',
        'Thưởng thức trọn vẹn ẩm thực đặc sản phong phú địa phương',
        'Hướng dẫn viên chuyên nghiệp, nhiệt tình hỗ trợ suốt tuyến'
      ];

  const departures = (tour.departures && tour.departures.length > 0)
    ? tour.departures
    : [
        { startDate: '2026-10-25', endDate: '2026-10-28', adultPrice: tour.price, status: 'Còn chỗ' },
        { startDate: '2026-11-05', endDate: '2026-11-08', adultPrice: tour.price, status: 'Còn chỗ' },
        { startDate: '2026-11-18', endDate: '2026-11-21', adultPrice: tour.price, status: 'Còn chỗ' }
      ];

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

        {/* HEADER SECTION */}
        <div className="mb-6 flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-sky-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded">Mã Tour: {tour.id}</span>
              <button 
                onClick={() => document.getElementById('danh-gia')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center bg-amber-50 text-amber-800 font-bold px-2 py-1 rounded text-[11px] border border-amber-200 hover:bg-amber-100 transition cursor-pointer"
                title="Bấm để xem và viết đánh giá từ khách hàng"
              >
                <Star size={12} className="fill-current text-amber-500 mr-1" />
                {tour.rating} Tuyệt vời ({tour.reviews} đánh giá)
              </button>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
              {tour.name}
            </h1>
          </div>
          <div className="text-left lg:text-right">
            <p className="text-sm text-slate-500 font-medium mb-1">Giá chỉ từ</p>
            <div className="text-3xl font-black text-rose-500">{tour.price.toLocaleString('vi-VN')} đ</div>
          </div>
        </div>

        {/* GALLERY */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8 rounded-2xl overflow-hidden relative">
          <div className="md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto h-full">
            <img 
              src={tour.img} 
              alt={tour.name} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&q=80&w=800';
              }}
            />
          </div>
          {/* Mock additional images */}
          <div className="hidden md:block aspect-[4/3] h-full">
            <img src="https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gallery 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="hidden md:block aspect-[4/3] h-full">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gallery 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="hidden md:block aspect-[4/3] h-full">
            <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gallery 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="hidden md:block aspect-[4/3] h-full relative">
            <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gallery 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button className="bg-white/20 backdrop-blur-md text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 hover:bg-white/30 transition">
                <ImageIcon size={18} /> Xem tất cả ảnh
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Quick Info Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2">
                <Clock className="text-sky-600" size={20} />
                <div>
                  <div className="text-[11px] text-slate-500 font-bold uppercase">Thời gian</div>
                  <div className="font-semibold text-slate-800 text-sm">{tour.duration}</div>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden md:block"></div>
              <div className="flex items-center gap-2">
                <Plane className="text-sky-600" size={20} />
                <div>
                  <div className="text-[11px] text-slate-500 font-bold uppercase">Phương tiện</div>
                  <div className="font-semibold text-slate-800 text-sm">{tour.vehicle}</div>
                </div>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden md:block"></div>
              <div className="flex items-center gap-2">
                <MapPin className="text-sky-600" size={20} />
                <div>
                  <div className="text-[11px] text-slate-500 font-bold uppercase">Điểm khởi hành</div>
                  <div className="font-semibold text-slate-800 text-sm">{tour.departure}</div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6">Trải nghiệm đáng mong đợi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium text-sm leading-relaxed">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6 border-b border-slate-100 pb-4">
                Lịch trình chi tiết
              </h2>
              <div className="space-y-8">
                {itinerary.map((dayItem, idx) => (
                  <div key={dayItem.day} className="relative pl-10">
                    {/* Timeline Line */}
                    {idx !== itinerary.length - 1 && (
                      <div className="absolute left-[19px] top-8 bottom-[-24px] w-0.5 bg-slate-200"></div>
                    )}
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-sky-100 border-4 border-white flex items-center justify-center text-sky-600 font-black text-sm shadow-sm z-10">
                      {dayItem.day}
                    </div>
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                      <h3 className="font-bold text-slate-900 text-lg mb-2">{dayItem.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{dayItem.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            {(tour.includes || tour.excludes) && (
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-black text-slate-900 mb-6 border-b border-slate-100 pb-4">
                  Dịch vụ bao gồm & Không bao gồm
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tour.includes && (
                    <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
                      <h3 className="font-bold text-emerald-800 text-sm uppercase mb-3 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-600" /> Giá tour bao gồm
                      </h3>
                      <ul className="space-y-2">
                        {tour.includes.map((inc, i) => (
                          <li key={i} className="text-xs md:text-sm text-slate-700 flex items-start gap-2">
                            <span className="text-emerald-500 font-bold mt-0.5">•</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {tour.excludes && (
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                      <h3 className="font-bold text-slate-700 text-sm uppercase mb-3 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-slate-500" /> Giá tour chưa bao gồm
                      </h3>
                      <ul className="space-y-2">
                        {tour.excludes.map((exc, i) => (
                          <li key={i} className="text-xs md:text-sm text-slate-600 flex items-start gap-2">
                            <span className="text-slate-400 font-bold mt-0.5">•</span>
                            <span>{exc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* REVIEWS & RATINGS SECTION */}
            <TourReviewsSection tour={tour} />

          </div>

          {/* SIDEBAR BOOKING */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80 sticky top-24">
              <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="text-sky-600" size={20} /> Lịch Khởi Hành & Giá
              </h2>

              {/* Lịch khởi hành table / list */}
              <div className="mb-6 space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase">Chọn ngày đi</label>
                <div className="grid grid-cols-1 gap-2">
                  {departures.map((dep) => (
                    <button
                      key={dep.startDate}
                      onClick={() => setSelectedDate(dep.startDate)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-semibold transition ${
                        selectedDate === dep.startDate 
                          ? 'border-sky-600 bg-sky-50 text-sky-700' 
                          : 'border-slate-200 text-slate-700 hover:border-sky-400'
                      }`}
                    >
                      <span>{dep.startDate.split('-').reverse().join('/')}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${dep.status === 'Còn chỗ' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {dep.status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Passenger Selector */}
              <div className="mb-6 space-y-4">
                <label className="block text-xs font-bold text-slate-700 uppercase">Số lượng khách</label>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Người lớn</div>
                    <div className="text-xs text-rose-500 font-bold">{tour.price.toLocaleString('vi-VN')} đ</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setAdultQty(Math.max(1, adultQty - 1))} className="w-8 h-8 rounded-full bg-slate-100 font-bold flex items-center justify-center hover:bg-slate-200 text-slate-600">-</button>
                    <span className="font-black text-sm w-4 text-center">{adultQty}</span>
                    <button onClick={() => setAdultQty(adultQty + 1)} className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-bold flex items-center justify-center hover:bg-sky-200">+</button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Trẻ em (5-11 tuổi)</div>
                    <div className="text-xs text-rose-500 font-bold">{childPrice.toLocaleString('vi-VN')} đ</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setChildQty(Math.max(0, childQty - 1))} className="w-8 h-8 rounded-full bg-slate-100 font-bold flex items-center justify-center hover:bg-slate-200 text-slate-600">-</button>
                    <span className="font-black text-sm w-4 text-center">{childQty}</span>
                    <button onClick={() => setChildQty(childQty + 1)} className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-bold flex items-center justify-center hover:bg-sky-200">+</button>
                  </div>
                </div>
              </div>

              {/* Total & Submit */}
              <div className="border-t border-slate-100 pt-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-600">Tổng tiền</span>
                  <span className="text-2xl font-black text-rose-500">{totalPrice.toLocaleString('vi-VN')} đ</span>
                </div>
              </div>

              <button 
                onClick={handleBookTour}
                className="w-full py-4 rounded-xl bg-rose-500 text-white font-black hover:bg-rose-600 transition flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30"
              >
                ĐẶT NGAY
              </button>

              <div className="mt-4 text-center space-y-2">
                <p className="text-[11px] text-slate-500">Bằng cách nhấn Đặt ngay, bạn đồng ý với Điều khoản & Dịch vụ của chúng tôi.</p>
                <p className="text-[11px] text-emerald-600 font-semibold flex items-center justify-center gap-1"><ShieldCheck size={14} /> Thanh toán an toàn và bảo mật</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
