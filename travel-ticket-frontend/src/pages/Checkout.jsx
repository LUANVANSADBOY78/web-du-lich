import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Ticket, QrCode, CreditCard, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    note: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('goticket_cart') || '[]');
    setCartItems(cart);

    const savedUser = JSON.parse(localStorage.getItem('goticket_user') || '{}');
    if (savedUser.name) {
      setCustomerInfo(prev => ({
        ...prev,
        name: savedUser.name || '',
        email: savedUser.email || '',
        phone: savedUser.phone || '0901234567'
      }));
    }
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

  const handleCreateBooking = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error('Vui lòng điền đầy đủ thông tin khách hàng!');
      return;
    }

    const newCode = 'BK' + new Date().getFullYear() + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      id: newCode,
      customerName: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      items: cartItems,
      totalAmount,
      status: 'Paid',
      ticketStatus: 'Issued',
      createdAt: new Date().toISOString(),
      ticketCode: 'TK' + Math.floor(10000000 + Math.random() * 90000000)
    };

    // Save to my bookings
    const myBookings = JSON.parse(localStorage.getItem('goticket_bookings') || '[]');
    myBookings.unshift(newBooking);
    localStorage.setItem('goticket_bookings', JSON.stringify(myBookings));

    // Clear cart
    localStorage.removeItem('goticket_cart');

    setBookingCode(newCode);
    setIsSuccess(true);
    toast.success('Đặt vé thành công! Mã đơn hàng: ' + newCode);
  };

  if (isSuccess) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 font-sans">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle2 size={48} />
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Thanh Toán Thành Công!</h1>
            <p className="text-slate-500 text-sm mb-6">Mã đơn hàng: <strong className="text-sky-600 font-bold text-base">{bookingCode}</strong></p>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 mb-8 text-left space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Khách hàng:</span>
                <span className="font-bold text-slate-900">{customerInfo.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Email nhận vé:</span>
                <span className="font-bold text-slate-900">{customerInfo.email}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Tổng số tiền:</span>
                <span className="font-black text-amber-600 text-base">{totalAmount.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-medium">Trạng thái vé:</span>
                <span className="inline-block bg-emerald-100 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-full">
                  Đã xuất vé QR Code
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/my-bookings" 
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2"
              >
                <QrCode size={18} /> Xem Vé QR Của Tôi
              </Link>
              <Link 
                to="/" 
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-2xl transition"
              >
                Về Trang Chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
      <div className="max-w-[1240px] mx-auto px-4">
        <h1 className="text-3xl font-black text-slate-900 mb-8">Thanh Toán & Nhận Vé QR</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Ticket size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Giỏ hàng của bạn đang trống</h3>
            <p className="text-slate-500 text-sm mb-6">Hãy chọn vé vui chơi hấp dẫn trước khi thanh toán.</p>
            <Link to="/tickets" className="bg-sky-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-sky-700 transition">
              Khám phá vé ngay
            </Link>
          </div>
        ) : (
          <form onSubmit={handleCreateBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT FORM: CUSTOMER INFO & PAYMENT METHOD */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Customer Info Box */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                  <ShieldCheck size={20} className="text-sky-600" /> Thông Tin Người Nhận Vé
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Họ và tên <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      value={customerInfo.name}
                      onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                      placeholder="VD: Nguyễn Văn A"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-sky-600 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email nhận vé QR <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        required
                        value={customerInfo.email}
                        onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})}
                        placeholder="email@domain.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-sky-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Số điện thoại <span className="text-red-500">*</span></label>
                      <input 
                        type="tel" 
                        required
                        value={customerInfo.phone}
                        onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        placeholder="0901234567"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-sky-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Ghi chú (nếu có)</label>
                    <textarea 
                      rows="2"
                      value={customerInfo.note}
                      onChange={e => setCustomerInfo({...customerInfo, note: e.target.value})}
                      placeholder="Yêu cầu đặc biệt cho chuyến đi..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-sky-600 focus:bg-white"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                  <CreditCard size={20} className="text-sky-600" /> Phương Thức Thanh Toán Mô Phỏng
                </h3>

                <div className="space-y-3">
                  <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${paymentMethod === 'qr' ? 'border-sky-600 bg-sky-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <input type="radio" name="pay" checked={paymentMethod === 'qr'} onChange={() => setPaymentMethod('qr')} className="text-sky-600 focus:ring-sky-500" />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">Quét QR Banking (VietQR - Tức thì)</div>
                      <div className="text-xs text-slate-500">Tự động xuất mã QR vé ngay sau khi thanh toán</div>
                    </div>
                  </label>

                  <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${paymentMethod === 'momo' ? 'border-sky-600 bg-sky-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <input type="radio" name="pay" checked={paymentMethod === 'momo'} onChange={() => setPaymentMethod('momo')} className="text-sky-600 focus:ring-sky-500" />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">Ví Điện Tử MoMo / ZaloPay</div>
                      <div className="text-xs text-slate-500">Thanh toán an toàn qua ví điện tử</div>
                    </div>
                  </label>

                  <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${paymentMethod === 'card' ? 'border-sky-600 bg-sky-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <input type="radio" name="pay" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="text-sky-600 focus:ring-sky-500" />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">Thẻ Quốc Tế Visa / MasterCard / JCB</div>
                      <div className="text-xs text-slate-500">Cổng thanh toán thẻ quốc tế bảo mật</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT SUMMARY */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 sticky top-24 space-y-6">
                <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-4">Tóm Tắt Đơn Hàng</h3>

                <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex gap-4 pb-4 border-b border-slate-100 text-sm">
                      <img src={item.img} alt={item.productName} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200" />
                      <div className="flex-grow">
                        <div className="font-bold text-slate-900 leading-tight line-clamp-2">{item.productName}</div>
                        <div className="text-xs text-slate-500 mt-1">Ngày: {item.date}</div>
                        <div className="font-black text-amber-600 mt-1">{item.totalPrice.toLocaleString('vi-VN')} đ</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Tạm tính:</span>
                    <span>{totalAmount.toLocaleString('vi-VN')} đ</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Phí dịch vụ xuất vé:</span>
                    <span className="text-emerald-600 font-bold">Miễn phí</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-base text-slate-900">
                    <span>TỔNG CỘNG:</span>
                    <span className="text-2xl text-amber-600">{totalAmount.toLocaleString('vi-VN')} đ</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-base rounded-2xl transition shadow-xl shadow-sky-600/30 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} /> HOÀN TẤT THANH TOÁN
                </button>

                <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                  Bằng việc bấm hoàn tất, bạn đồng ý với các Điều khoản dịch vụ và Chính sách bảo mật của GoTicket.
                </p>
              </div>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;
