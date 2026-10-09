import { Link } from 'react-router-dom';
import { Search, Train, Calendar, Users, Map as MapIcon, Info } from 'lucide-react';

export default function Trains() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="bg-sky-600 p-8 text-white text-center shadow-lg">
        <h1 className="text-3xl font-black mb-2 flex items-center justify-center gap-2">
          <Train size={32} /> Đặt Vé Tàu Hỏa Trực Tuyến
        </h1>
        <p className="text-sky-100">Giá tốt nhất - Đặt vé nhanh chóng - Thanh toán an toàn</p>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Điểm Đi</label>
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-800">
              Hà Nội
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Điểm Đến</label>
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-800">
              Đà Nẵng
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Ngày Đi</label>
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-800 flex items-center gap-2">
              <Calendar size={18} className="text-slate-400" /> 15/10/2026
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Hành Khách</label>
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-800 flex items-center gap-2">
              <Users size={18} className="text-slate-400" /> 1 Người Lớn
            </div>
          </div>
          <div className="flex items-end">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-[46px] px-8 rounded-xl flex items-center justify-center gap-2 transition w-full md:w-auto shadow-md shadow-orange-500/30">
              <Search size={18} /> TÌM VÉ
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center flex flex-col items-center">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <MapIcon className="text-sky-600" /> Bản Đồ Tuyến Đường Sắt Việt Nam
          </h2>
          <div className="w-full max-w-3xl border border-slate-100 rounded-2xl overflow-hidden p-2 bg-slate-50 shadow-inner">
            {/* Using a placeholder map similar to the screenshot for now */}
            <img src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?auto=format&fit=crop&q=80&w=1200" alt="Bản đồ đường sắt" className="w-full h-auto rounded-xl" />
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
            <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100">
              <div className="w-10 h-10 bg-sky-200 text-sky-700 rounded-full flex items-center justify-center mb-3">
                <Train size={20} />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Mạng lưới rộng khắp</h3>
              <p className="text-sm text-slate-600">Phủ sóng toàn bộ trục đường sắt Bắc Nam với hàng trăm ga tàu.</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <div className="w-10 h-10 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center mb-3">
                <Info size={20} />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Thông tin minh bạch</h3>
              <p className="text-sm text-slate-600">Giá vé, sơ đồ ghế ngồi và thời gian khởi hành được cập nhật liên tục.</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <div className="w-10 h-10 bg-emerald-200 text-emerald-700 rounded-full flex items-center justify-center mb-3">
                <Calendar size={20} />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Giữ chỗ tức thì</h3>
              <p className="text-sm text-slate-600">Xác nhận vé điện tử ngay qua email và tin nhắn điện thoại.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
