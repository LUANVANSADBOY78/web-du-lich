import { Link } from 'react-router-dom';
import { Star, Clock, Plane, Check, MapPin, CalendarDays, Heart, Share2, Scale } from 'lucide-react';

const TourCard = ({ tour }) => {
  if (!tour) return null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group mb-6 hover:border-sky-300">
      {/* Image Section - Left (Desktop) */}
      <div className="relative w-full md:w-[320px] shrink-0 aspect-[4/3] md:aspect-auto md:min-h-[240px] overflow-hidden">
        <Link to={`/tour/${tour.id}`} className="block w-full h-full">
          <img 
            src={tour.img} 
            alt={tour.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </Link>
        
        {/* Điểm đánh giá (Score) */}
        {tour.rating && (
          <div className="absolute top-3 left-3 bg-emerald-500 text-white font-bold text-sm px-2.5 py-1 rounded-lg shadow-sm border border-emerald-400">
            {tour.rating}
          </div>
        )}
        
        {/* Badge (Khuyến mãi, v.v.) */}
        {tour.badge && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-black text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-md animate-pulse">
            {tour.badge}
          </div>
        )}
        
        <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-md">
          <Clock size={14} className="text-amber-400" />
          {tour.duration}
        </div>
      </div>

      {/* Content Section - Right */}
      <div className="p-5 flex flex-col flex-grow relative">
        {/* Top actions */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-colors tooltip" title="So sánh Tour">
            <Scale size={18} />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors tooltip" title="Thêm vào yêu thích">
            <Heart size={18} />
          </button>
        </div>

        {/* Meta Info */}
        <div className="text-[13px] font-medium text-slate-500 mb-2.5 flex items-center gap-3">
          <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md">
            <MapPin size={14} className="text-slate-600" />
            <span>KH: <strong className="text-slate-800">{tour.departure}</strong></span>
          </span>
          <span className="flex items-center gap-1.5 bg-sky-50 text-sky-700 px-2.5 py-1 rounded-md">
            <Plane size={14} />
            <span>{tour.vehicle}</span>
          </span>
        </div>
        
        <Link to={`/tour/${tour.id}`} className="block mb-2 group-hover:text-sky-600 transition-colors pr-16">
          <h3 className="font-black text-[20px] text-slate-800 leading-snug line-clamp-2">
            {tour.name}
          </h3>
        </Link>

        {/* Reviews */}
        <div className="flex items-center gap-2 mb-4 text-sm">
          <div className="flex items-center text-amber-400">
            <Star size={15} className="fill-current" />
            <Star size={15} className="fill-current" />
            <Star size={15} className="fill-current" />
            <Star size={15} className="fill-current" />
            <Star size={15} className="fill-current" />
          </div>
          <span className="text-slate-600 font-bold text-xs">{tour.reviews} <span className="font-normal text-slate-500">đánh giá</span></span>
          <span className="text-slate-300">•</span>
          <span className="text-sky-600 font-bold text-xs bg-sky-50 px-2 py-0.5 rounded">{tour.booked} khách đã đặt</span>
        </div>

        {/* Highlights */}
        <div className="space-y-2 mb-5 flex-grow text-[14px] text-slate-600 border-l-2 border-emerald-100 pl-3">
          {(tour.highlights || []).slice(0, 3).map((hl, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{hl}</span>
            </div>
          ))}
        </div>

        {/* Footer (Price & Action) */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col">
            <div className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
              <CalendarDays size={14} /> Giá dành cho 1 khách
            </div>
            <div className="flex items-end gap-2">
              {tour.oldPrice && (
                <div className="text-sm font-semibold text-slate-400 line-through mb-1">
                  {tour.oldPrice.toLocaleString('vi-VN')} đ
                </div>
              )}
              <div className="text-2xl md:text-3xl font-black text-rose-500 tracking-tight">
                {tour.price.toLocaleString('vi-VN')} <span className="text-sm font-bold text-rose-500/70">đ</span>
              </div>
            </div>
          </div>
          <Link 
            to={`/tour/${tour.id}`}
            className="bg-rose-500 text-white font-black text-[15px] py-3 px-8 rounded-xl hover:bg-rose-600 hover:shadow-lg transition-all text-center"
          >
            ĐẶT NGAY
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
