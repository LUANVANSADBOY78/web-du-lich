import { Menu, Search, Bell, Maximize, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Topbar({ toggleSidebar }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <header className="h-16 bg-white shadow-sm border-b border-slate-200 px-4 flex items-center justify-between shrink-0 z-40">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
          <Menu size={20} />
        </button>
        <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-3 py-2 w-64 border border-transparent focus-within:border-primary-500 focus-within:bg-white transition-all">
          <Search size={18} className="text-slate-400 mr-2" />
          <input type="text" placeholder="Tìm kiếm..." className="bg-transparent border-none outline-none w-full text-sm text-slate-700" />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={toggleFullScreen} className="hidden md:flex p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="Toàn màn hình">
          <Maximize size={18} />
        </button>
        
        <div className="relative">
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors relative"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <h4 className="font-bold text-slate-800 text-sm">Thông báo mới (3)</h4>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
                  <div className="font-semibold text-sm text-slate-800">Booking BK005</div>
                  <div className="text-xs text-slate-500 mt-1">Khách hàng mới vừa thanh toán thành công.</div>
                  <div className="text-[10px] text-primary-600 mt-1">Vài giây trước</div>
                </div>
              </div>
              <div className="px-4 py-2 text-center">
                <Link to="/admin/notifications" className="text-primary-600 text-sm font-semibold hover:underline">Xem tất cả</Link>
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-slate-200 mx-1"></div>

        <div className="relative">
          <button 
            onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
            className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center">
              <User size={18} />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-bold text-slate-800 leading-tight">Admin Luan</div>
              <div className="text-xs text-slate-500">Super Admin</div>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
              <Link to="/admin/settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Hồ sơ cá nhân</Link>
              <Link to="/admin/settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Cài đặt</Link>
              <hr className="my-2 border-slate-100" />
              <Link to="/" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">Đăng xuất</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
