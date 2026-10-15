import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, CalendarDays } from 'lucide-react';
import { useState } from 'react';

// Fallback ảnh chuẩn 100% theo điểm đến thực tế nếu ảnh gặp sự cố
const getTourFallbackImage = (tour) => {
  const name = (tour?.name || '').toLowerCase();
  const dest = (tour?.destination || '').toLowerCase();

  if (name.includes('nhật bản') || dest.includes('nhật') || name.includes('fuji') || name.includes('kyoto') || name.includes('osaka')) {
    return 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&q=80&w=800'; // Núi Phú Sĩ & Mùa thu Nhật Bản
  }
  if (name.includes('hàn quốc') || dest.includes('hàn') || name.includes('seoul') || name.includes('nami')) {
    return 'https://images.unsplash.com/photo-1546874177-9e664107314e?auto=format&fit=crop&q=80&w=800'; // Hàn Quốc Mùa Thu Nami
  }
  if (name.includes('cáp nhĩ tân') || name.includes('trượt tuyết') || name.includes('tuyết') || name.includes('kiệu tử sơn')) {
    return 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=800'; // Làng tuyết mùa đông
  }
  if (name.includes('thượng hải') || name.includes('ô trấn') || name.includes('hàng châu') || name.includes('trương gia giới') || name.includes('phượng hoàng cổ trấn') || dest.includes('trung quốc')) {
    return 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800'; // Bến Thượng Hải
  }
  if (name.includes('du thuyền') || name.includes('genting') || name.includes('disney')) {
    return 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800'; // Siêu du thuyền 5 sao
  }
  if (name.includes('xe lửa') || name.includes('tàu')) {
    return 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=800'; // Đường sắt ven biển
  }
  if (name.includes('đài loan') || name.includes('đài bắc')) {
    return 'https://images.unsplash.com/photo-1508247967583-7d982ea01526?auto=format&fit=crop&q=80&w=800'; // Tháp Taipei 101
  }
  if (name.includes('thái lan') || name.includes('bangkok') || name.includes('pattaya') || name.includes('chiang mai')) {
    return 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=800'; // Chùa Wat Arun Bangkok
  }
  if (name.includes('singapore') || name.includes('malaysia')) {
    return 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800'; // Marina Bay Sands
  }
  if (name.includes('đà nẵng') || name.includes('bà nà')) {
    return 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800'; // Cầu Vàng Bà Nà
  }
  if (name.includes('hội an')) {
    return 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800'; // Phố cổ Hội An
  }
  if (name.includes('huế')) {
    return 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=800'; // Đại Nội Huế
  }
  if (name.includes('sapa') || name.includes('fansipan') || name.includes('lào cai')) {
    return 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&q=80&w=800'; // Sapa ruộng bậc thang
  }
  if (name.includes('hà nội')) {
    return 'https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&q=80&w=800'; // Hồ Gươm Hà Nội
  }
  if (name.includes('hạ long') || name.includes('quảng ninh')) {
    return 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800'; // Vịnh Hạ Long
  }
  if (name.includes('ninh bình') || name.includes('tràng an') || name.includes('hang múa')) {
    return 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800'; // Tràng An Ninh Bình
  }
  if (name.includes('hà giang') || name.includes('mã pí lèng') || name.includes('lũng cú')) {
    return 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'; // Đèo Mã Pí Lèng
  }
  if (name.includes('đà lạt') || name.includes('lâm đồng')) {
    return 'https://images.unsplash.com/photo-1501117716987-c8c394bb29df?auto=format&fit=crop&q=80&w=800'; // Đồi thông & hoa Đà Lạt
  }
  if (name.includes('phú quốc')) {
    return 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800'; // Phú Quốc hoàng hôn
  }
  if (name.includes('nha trang')) {
    return 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800'; // Vịnh Nha Trang
  }
  if (name.includes('quy nhơn') || name.includes('phú yên') || name.includes('kỳ co')) {
    return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'; // Kỳ Co Eo Gió
  }
  if (name.includes('phan thiết') || name.includes('mũi né')) {
    return 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800'; // Đồi cát Mũi Né
  }
  if (name.includes('miền tây') || name.includes('cần thơ') || name.includes('bến tre') || name.includes('chợ nổi') || name.includes('an giang')) {
    return 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800'; // Sông nước miền Tây
  }
  if (name.includes('tây ninh') || name.includes('bà đen')) {
    return 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800'; // Núi Bà Đen
  }
  if (name.includes('vũng tàu')) {
    return 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800'; // Bãi biển Vũng Tàu
  }
  return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800';
};

const TourCard = ({ tour }) => {
  const [imgError, setImgError] = useState(false);

  if (!tour) return null;

  const nearestDeparture = tour.departures && tour.departures.length > 0
    ? tour.departures[0].startDate.split('-').reverse().slice(0, 2).join('/')
    : null;

  const displayImage = imgError ? getTourFallbackImage(tour) : (tour.img || getTourFallbackImage(tour));

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full hover:border-sky-300">
      {/* Image Section */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
        <Link to={`/tour/${tour.id}`} className="block w-full h-full">
          <img 
            src={displayImage} 
            alt={tour.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        </Link>
        
        {/* Badge Khuyến Mãi / Điểm Nhấn */}
        {tour.badge && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-600 to-orange-500 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg shadow-md z-10 pointer-events-none">
            {tour.badge}
          </div>
        )}
        
        {/* Rating theo chuẩn iVIVU - Bấm vào để xem đánh giá */}
        {tour.rating && (
          <Link 
            to={`/tour/${tour.id}#danh-gia`}
            title="Bấm để xem và viết đánh giá tour"
            className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-slate-800 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm border border-slate-100 flex items-center gap-1 z-10 hover:bg-sky-50 hover:text-sky-600 transition"
          >
            <span className="text-sky-600 font-black">{tour.rating}</span>
            <span className="text-slate-600 font-medium">{tour.reviewStatus || 'Tuyệt vời'}</span>
            <span className="text-slate-400 font-normal">({tour.reviews})</span>
          </Link>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow relative">
        <Link to={`/tour/${tour.id}`} className="block mb-2 group-hover:text-sky-600 transition-colors">
          <h3 className="font-bold text-[15px] text-slate-800 leading-snug line-clamp-2 min-h-[42px]" title={tour.name}>
            {tour.name}
          </h3>
        </Link>

        {/* Thời gian & Điểm khởi hành */}
        <div className="text-[12px] text-slate-500 mb-2.5 flex items-center gap-2">
          <span className="flex items-center gap-1 font-medium">
            <Clock size={13} className="text-slate-400" /> {tour.duration}
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 font-medium truncate">
            <MapPin size={13} className="text-slate-400 shrink-0" /> Khởi hành {tour.departure}
          </span>
        </div>

        {/* Điểm nhấn / Tags theo phong cách iVIVU */}
        {tour.tags && tour.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tour.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="bg-slate-50 text-slate-600 text-[11px] font-medium px-2 py-0.5 rounded border border-slate-100">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer: Giá & Ngày khởi hành gần nhất */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-end justify-between">
          <div>
            {nearestDeparture && (
              <div className="text-[11px] text-slate-400 flex items-center gap-1 mb-0.5">
                <CalendarDays size={12} className="text-emerald-500" /> Khởi hành ngày {nearestDeparture}
              </div>
            )}
            {tour.oldPrice && (
              <div className="text-xs text-slate-400 line-through">
                {tour.oldPrice.toLocaleString('vi-VN')} đ
              </div>
            )}
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block -mb-1">Giá từ</span>
            <div className="text-lg md:text-xl font-black text-rose-500">
              {tour.price.toLocaleString('vi-VN')} <span className="text-xs font-bold text-rose-500/80">đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
