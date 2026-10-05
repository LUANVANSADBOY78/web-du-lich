import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, QrCode, Calendar, CheckCircle2, XCircle, Search } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('goticket_bookings') || '[]');
    setBookings(list);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">Vé & Đơn Hàng Của Tôi</h1>
          <p className="text-slate-500 text-sm mt-1">Danh sách vé điện tử (QR Code) đã mua và trạng thái booking</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Ticket size={56} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Bạn chưa có đơn đặt vé nào</h3>
            <p className="text-slate-500 text-sm mb-6">Hãy trải nghiệm các điểm đến hấp dẫn cùng GoTicket.</p>
            <Link to="/tickets" className="bg-sky-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-sky-700 transition">
              Đặt vé ngay
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT BOOKINGS LIST */}
            <div className="lg:col-span-7 space-y-4">
              {bookings.map((booking) => (
                <div 
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  className={`bg-white rounded-3xl p-6 shadow-sm border transition-all cursor-pointer ${
                    selectedBooking?.id === booking.id ? 'border-sky-600 ring-2 ring-sky-600/20' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs text-slate-400 font-medium">Mã booking:</span>
                      <h3 className="text-base font-black text-sky-600">{booking.id}</h3>
                    </div>
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 size={13} /> {booking.status === 'Paid' ? 'Đã Thanh Toán' : 'Đã Xác Nhận'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {booking.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <img src={item.img} alt={item.productName} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200" />
                        <div>
                          <div className="font-bold text-slate-900 text-sm line-clamp-1">{item.productName}</div>
                          <div className="text-xs text-slate-500 mt-0.5">Ngày đi: {item.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Tổng tiền: <strong className="text-amber-600 font-black text-sm">{booking.totalAmount.toLocaleString('vi-VN')} đ</strong></span>
                    <button className="text-sky-600 font-bold flex items-center gap-1 hover:underline">
                      <QrCode size={14} /> Xem Mã Vé QR
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT TICKET QR CODE DISPLAY */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 sticky top-24 text-center space-y-6">
                {selectedBooking ? (
                  <>
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vé Điện Tử QR Code</span>
                      <h3 className="text-xl font-black text-slate-900 mt-1">{selectedBooking.id}</h3>
                    </div>

                    {/* QR Code Graphic Display */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 inline-block mx-auto shadow-inner">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(selectedBooking.ticketCode || selectedBooking.id)}`}
                        alt="QR Ticket Code" 
                        className="w-44 h-44 mx-auto rounded-lg"
                      />
                      <div className="mt-3 text-xs font-mono font-bold text-slate-700 tracking-widest uppercase">
                        Mã vé: {selectedBooking.ticketCode || 'TK9840291'}
                      </div>
                    </div>

                    <div className="text-left bg-sky-50/70 p-4 rounded-2xl border border-sky-100 text-xs space-y-2 text-slate-700">
                      <div><strong>Khách hàng:</strong> {selectedBooking.customerName}</div>
                      <div><strong>Email:</strong> {selectedBooking.email}</div>
                      <div><strong>Số điện thoại:</strong> {selectedBooking.phone}</div>
                      <div><strong>Trạng thái vé:</strong> <span className="text-emerald-600 font-bold">Hợp lệ - Sẵn sàng check-in</span></div>
                    </div>

                    <p className="text-[11px] text-slate-400">
                      Xuất trình mã QR này trực tiếp tại cổng soát vé hoặc máy quét tự động tại điểm tham quan.
                    </p>
                  </>
                ) : (
                  <div className="py-12 text-slate-400">
                    <QrCode size={48} className="mx-auto mb-3 opacity-40" />
                    <p className="text-sm font-medium">Chọn một đơn hàng bên trái để xem thông tin Vé QR Code chi tiết.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
