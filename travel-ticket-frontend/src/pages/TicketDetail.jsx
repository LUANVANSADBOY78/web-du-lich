import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, CheckCircle2, Zap, QrCode, ShieldAlert, Heart, Calendar, Plus, Minus, ShoppingCart, CreditCard, ChevronRight, Award } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import TourReviewsSection from '../components/reviews/TourReviewsSection';
import { toast } from 'react-toastify';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // Quantities per ticket type
  const [quantities, setQuantities] = useState({});
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const found = MOCK_PRODUCTS.find(p => p.id === parseInt(id)) || MOCK_PRODUCTS[0];
    setProduct(found);
    setSelectedImg(found.img);
    
    // Initialize quantities
    const initialQty = {};
    if (found.ticketTypes) {
      found.ticketTypes.forEach((tt, idx) => {
        initialQty[tt.id || idx] = idx === 0 ? 1 : 0; // default 1 for first ticket type
      });
    }
    setQuantities(initialQty);
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
        <p className="text-slate-500 font-semibold">Đang tải thông tin vé...</p>
      </div>
    );
  }

  const handleQtyChange = (typeId, delta) => {
    setQuantities(prev => {
      const current = prev[typeId] || 0;
      const updated = Math.max(0, current + delta);
      return { ...prev, [typeId]: updated };
    });
  };

  // Compute total price
  const calculateTotal = () => {
    if (!product.ticketTypes) return product.price;
    return product.ticketTypes.reduce((sum, tt, idx) => {
      const qty = quantities[tt.id || idx] || 0;
      return sum + (qty * tt.price);
    }, 0);
  };

  const totalQuantity = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPrice = calculateTotal();

  const handleAddToCart = () => {
    if (totalQuantity === 0) {
      toast.error('Vui lòng chọn ít nhất 1 vé!');
      return;
    }
    
    // Save to localStorage cart
    const cartItem = {
      productId: product.id,
      productName: product.name,
      img: product.img,
      date: selectedDate,
      quantities,
      ticketTypes: product.ticketTypes,
      totalPrice
    };

    const existingCart = JSON.parse(localStorage.getItem('goticket_cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('goticket_cart', JSON.stringify(existingCart));

    toast.success('Đã thêm sản phẩm vào giỏ hàng!');
  };

  const handleBuyNow = () => {
    if (totalQuantity === 0) {
      toast.error('Vui lòng chọn ít nhất 1 vé!');
      return;
    }
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 font-sans">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-sky-600">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link to="/tickets" className="hover:text-sky-600">Vé vui chơi</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* TOP PRODUCT OVERVIEW SECTION */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: GALLERY (1 Large + 4 Thumbnails) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img 
                src={selectedImg} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {(product.gallery && product.gallery.length > 0 ? product.gallery : [product.img, product.img, product.img, product.img]).map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(imgUrl)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition ${
                    selectedImg === imgUrl ? 'border-sky-600 ring-2 ring-sky-600/30' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: OVERVIEW INFO & QUICK PURCHASE */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">
                <MapPin size={14} /> {product.location} • {product.categoryName || 'Vé vui chơi'}
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-4">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mb-6 flex-wrap text-sm">
                <div className="flex items-center bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded-lg border border-amber-200">
                  <Star size={16} className="fill-current text-amber-500 mr-1" />
                  <span>{product.rating} / 10</span>
                  <span className="ml-1 text-xs text-amber-600 font-normal">Xuất sắc</span>
                </div>
                <span className="text-slate-400">|</span>
                <span className="text-slate-600 font-medium">{product.reviews} đánh giá chân thực</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-600 font-semibold">{product.booked} đã đặt thành công</span>
              </div>

              {/* Feature Badges */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 mb-6">
                {(product.features || [
                  "⚡ Xác nhận đơn hàng tức thì trong vòng 5 phút",
                  "✓ Nhận vé điện tử QR Code trực tiếp qua email",
                  "▣ Xuất trình mã tại cổng không cần xếp hàng"
                ]).map((feat, idx) => (
                  <div key={idx} className="flex items-center text-xs md:text-sm text-slate-700 font-medium">
                    <span className="mr-2 text-sky-600 font-bold">
                      {feat.startsWith("⚡") ? <Zap size={16} className="text-amber-500" /> : 
                       feat.startsWith("▣") ? <QrCode size={16} className="text-sky-600" /> : 
                       <CheckCircle2 size={16} className="text-emerald-500" />}
                    </span>
                    <span>{feat.replace(/^[⚡✓▣]\s*/, '')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Banner */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium block">Giá chỉ từ</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-black text-amber-600">
                    {product.price.toLocaleString('vi-VN')} đ
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {product.oldPrice.toLocaleString('vi-VN')} đ
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                  Tiết kiệm đến {Math.round((1 - product.price / (product.oldPrice || product.price * 1.2)) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TICKET SELECTION & QUANTITY CALCULATOR */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80 mb-8">
          <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Calendar className="text-sky-600" size={24} /> Chọn Ngày Sử Dụng & Loại Vé
          </h2>

          {/* Date Picker */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-700 mb-2">Ngày sử dụng dịch vụ</label>
            <input 
              type="date" 
              value={selectedDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-slate-800 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-600/20 text-sm max-w-xs"
            />
          </div>

          {/* Ticket Types Options */}
          <div className="space-y-4 mb-8">
            <label className="block text-sm font-bold text-slate-700 mb-2">Các tùy chọn gói vé</label>
            {(product.ticketTypes || [
              { id: 't1', name: 'Vé người lớn (trên 1m4)', price: product.price, oldPrice: product.oldPrice },
              { id: 't2', name: 'Vé trẻ em (1m - 1m4)', price: Math.round(product.price * 0.75) }
            ]).map((tt, idx) => {
              const typeId = tt.id || idx;
              const qty = quantities[typeId] || 0;
              return (
                <div key={typeId} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/80 gap-4">
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">{tt.name}</h4>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-bold text-amber-600 text-lg">{tt.price.toLocaleString('vi-VN')} đ</span>
                      {tt.oldPrice && (
                        <span className="text-xs text-slate-400 line-through">{tt.oldPrice.toLocaleString('vi-VN')} đ</span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleQtyChange(typeId, -1)}
                      disabled={qty === 0}
                      className="w-10 h-10 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition font-bold"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-black text-lg text-slate-900">{qty}</span>
                    <button 
                      onClick={() => handleQtyChange(typeId, 1)}
                      className="w-10 h-10 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition font-bold"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary & Checkout Action Buttons */}
          <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng tiền thanh toán ({totalQuantity} vé)</div>
              <div className="text-3xl font-black text-amber-600 mt-1">
                {totalPrice.toLocaleString('vi-VN')} đ
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                onClick={handleAddToCart}
                className="flex-1 md:flex-none py-3.5 px-6 rounded-2xl bg-white border border-sky-600 text-sky-700 font-bold hover:bg-sky-50 transition flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingCart size={18} /> THÊM VÀO GIỎ
              </button>
              
              <button 
                onClick={handleBuyNow}
                className="flex-1 md:flex-none py-3.5 px-8 rounded-2xl bg-sky-600 text-white font-bold hover:bg-sky-700 transition flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30"
              >
                <CreditCard size={18} /> ĐẶT NGAY
              </button>
            </div>
          </div>
        </div>

        {/* DETAILED TABS & DESCRIPTION */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/80">
          {/* Tab Headers */}
          <div className="flex border-b border-slate-200 gap-4 md:gap-8 mb-6 overflow-x-auto text-sm font-bold">
            {[
              { id: 'info', label: 'Thông tin dịch vụ' },
              { id: 'highlights', label: 'Điểm nổi bật' },
              { id: 'terms', label: 'Chính sách & Điều khoản' },
              { id: 'reviews', label: 'Đánh giá khách hàng' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id ? 'border-sky-600 text-sky-600 font-black' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="text-slate-700 leading-relaxed text-sm md:text-base space-y-4">
            {activeTab === 'info' && (
              <div className="space-y-4">
                <p>{product.description}</p>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <h4 className="font-bold text-slate-900">Vé đã bao gồm:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                    <li>Vé vào cửa và trải nghiệm theo mô tả gói vé đã chọn.</li>
                    <li>Mã QR điện tử nhận trực tiếp qua Email hoặc tin nhắn Zalo/SMS.</li>
                    <li>Hỗ trợ kỹ thuật và hướng dẫn sử dụng 24/7 từ GoTicket.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'highlights' && (
              <ul className="space-y-3">
                {(product.highlights || [
                  "Trải nghiệm trò chơi đỉnh cao đạt nhiều kỷ lục thế giới.",
                  "Không gian check-in chụp ảnh tuyệt đẹp cho cả gia đình.",
                  "Quy trình quét mã QR đơn giản vào cửa trực tiếp."
                ]).map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-sky-50/50 p-3 rounded-xl border border-sky-100/60">
                    <Award className="text-sky-600 shrink-0 mt-0.5" size={18} />
                    <span className="font-semibold text-slate-800">{hl}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-200">
                  <ShieldAlert size={20} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-900">Chính sách hủy vé & hoàn tiền:</h4>
                    <p className="text-amber-800 mt-1">Vé đã đặt không hỗ trợ hoàn tiền hoặc thay đổi ngày sử dụng sau khi đơn hàng được xác nhận. Vui lòng kiểm tra kỹ thông tin trước khi đặt.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="pt-2">
                <TourReviewsSection tour={{ id: `ticket-${product.id}`, name: product.name }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
