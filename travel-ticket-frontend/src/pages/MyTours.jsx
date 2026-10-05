import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Calendar, Clock, CheckCircle2, User, ChevronRight } from 'lucide-react';

const MyTours = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('goticket_cart') || '[]');
    // Filter items that have adultQty / tour details
    const tourItems = cart.filter(item => item.productId && (item.adultQty || item.productId.toString().startsWith('tour')));
    setTours(tourItems);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">Tour Du Lịch Của Tôi</h1>
          <p className="text-slate-500 text-sm mt-1">Danh sách tour trọn gói đã đăng ký và lịch khởi hành sắp tới</p>
        </div>

        {/* Status Tabs */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 mb-8 max-w-md">
          {[
            { id: 'upcoming', label: 'Tour sắp đi' },
            { id: 'completed', label: 'Đã hoàn thành' },
            { id: 'cancelled', label: 'Đã hủy' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition ${
                activeTab === t.id ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tours.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Compass size={56} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Bạn chưa đăng ký tour nào</h3>
            <p className="text-slate-500 text-sm mb-6">Khám phá các tour du lịch hấp dẫn trong & ngoài nước ngay hôm nay.</p>
            <Link to="/tours" className="bg-sky-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-sky-700 transition">
              Khám phá Tour ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {tours.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 items-center">
                <img src={item.img} alt={item.productName} className="w-full md:w-48 h-32 rounded-2xl object-cover border border-slate-200 shrink-0" />
                <div className="flex-grow space-y-2">
                  <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit font-bold">
                    <CheckCircle2 size={13} /> Đã Đăng Ký Thành Công
                  </div>
                  <h3 className="font-black text-slate-900 text-lg">{item.productName}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1"><Calendar size={14} className="text-sky-600" /> Ngày khởi hành: <strong>{item.date}</strong></span>
                    <span className="flex items-center gap-1"><User size={14} className="text-sky-600" /> Số khách: <strong>{item.adultQty || 1} người lớn, {item.childQty || 0} trẻ em</strong></span>
                  </div>
                </div>
                <div className="text-right shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                  <div className="text-xs text-slate-400 font-medium">Tổng chi phí</div>
                  <div className="text-2xl font-black text-amber-600 mb-3">{(item.totalPrice || 0).toLocaleString('vi-VN')} đ</div>
                  <Link to={`/tour/${item.productId}`} className="inline-flex items-center gap-1 text-xs font-bold bg-sky-50 text-sky-700 py-2 px-4 rounded-xl hover:bg-sky-600 hover:text-white transition">
                    Chi tiết tour <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTours;

