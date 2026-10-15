import { Link } from 'react-router-dom';
import { Star, Heart, CheckCircle2, Zap, QrCode } from 'lucide-react';
import { useState } from 'react';
import { getProductImage } from '../../utils/imageUtils';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  // Lấy ảnh đúng cho sản phẩm - tự động theo location/category
  const imgSrc = imgError
    ? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
    : getProductImage(product);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group relative">
      {/* Image container with ratio 4:3 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Link to={`/ticket/${product.id}`} className="block w-full h-full">
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        </Link>

        {/* Top left badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-red-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg shadow-sm tracking-wide z-10 pointer-events-none">
            {product.badge}
          </div>
        )}

        {/* Top right heart favorite icon */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white/80 hover:bg-white text-slate-600 hover:text-red-500 shadow-sm'
          }`}
          title="Thêm vào yêu thích"
        >
          <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
        </button>

        {/* Location tag on bottom left of image */}
        <div className="absolute bottom-2.5 left-2.5 bg-slate-900/70 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full pointer-events-none">
          {product.location}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title max 2 lines */}
        <Link to={`/ticket/${product.id}`} className="group-hover:text-sky-600 transition-colors">
          <h3 className="font-bold text-slate-800 text-[15px] leading-snug mb-2 line-clamp-2 min-h-[42px]">
            {product.name}
          </h3>
        </Link>

        {/* Rating and Booking count */}
        <div className="flex items-center gap-2 mb-3 text-xs flex-wrap">
          <div className="flex items-center bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded border border-amber-200/60">
            <Star size={12} className="fill-current text-amber-500 mr-1" />
            <span>{product.rating || 9.8}</span>
            <span className="ml-1 text-[11px] font-normal text-amber-600">Tuyệt vời</span>
          </div>
          <span className="text-slate-400">({product.reviews || 45})</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-medium whitespace-nowrap">{product.booked || '1k+'} đã đặt</span>
        </div>

        {/* Features bullet items */}
        <div className="space-y-1 mb-4 flex-grow text-[12px] text-slate-600">
          {(product.features || [
            "⚡ Xác nhận đơn hàng tức thì",
            "✓ Không hoàn hủy hoặc thay đổi",
            "▣ Quét QR trực tiếp tại cổng"
          ]).slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-center text-slate-600 truncate">
              <span className="mr-1.5 font-bold shrink-0">
                {feat.startsWith("⚡") ? <Zap size={12} className="inline text-amber-500" /> :
                 feat.startsWith("▣") ? <QrCode size={12} className="inline text-sky-600" /> :
                 <CheckCircle2 size={12} className="inline text-emerald-500" />}
              </span>
              <span className="truncate">{feat.replace(/^[⚡✓▣]\s*/, '')}</span>
            </div>
          ))}
        </div>

        {/* Price & Action Button */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-400 font-medium mb-0.5">Giá chỉ từ</span>
              <div className="flex flex-wrap items-baseline gap-1.5">
                {product.oldPrice && (
                  <span className="text-xs text-slate-400 line-through font-normal">
                    {product.oldPrice.toLocaleString('vi-VN')} đ
                  </span>
                )}
                <span className="text-[19px] font-black text-amber-600 tracking-tight leading-none">
                  {product.price.toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>

            <Link
              to={`/ticket/${product.id}`}
              className="bg-amber-50 text-amber-700 hover:bg-amber-500 hover:text-white border border-amber-200 hover:border-amber-500 text-xs font-bold py-1.5 px-3 rounded-lg transition-all shadow-sm shrink-0"
              style={{ whiteSpace: 'nowrap' }}
            >
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
