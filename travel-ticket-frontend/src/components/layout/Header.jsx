import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Heart, Ticket, Phone, HelpCircle, User, ChevronDown, LogOut, QrCode, Compass, Sparkles, Flame, ShieldAlert, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTourSubmenu, setShowTourSubmenu] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('goticket_user');
    if (savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('goticket_user');
    setIsLoggedIn(false);
    setUser(null);
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm font-sans">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-[1240px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <Phone size={13} className="text-amber-400" /> Hotline Hỗ Trợ 24/7: <strong className="text-white font-bold">1900 1234</strong>
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">Nền tảng Đặt Vé Vui Chơi & Tour Du Lịch Trọn Gói Uy Tín</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-medium">
            <Link to="/support" className="hover:text-amber-400 transition flex items-center gap-1">
              <HelpCircle size={13} /> Trung tâm hỗ trợ
            </Link>
            <Link to="/login?role=admin" className="text-amber-400 hover:underline font-bold flex items-center gap-1">
              <ShieldAlert size={13} /> Quản trị Admin (admin@goticket.vn)
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1240px] mx-auto px-4 h-[68px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
            G
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Go<span className="text-sky-600">Ticket</span>
          </span>
        </Link>

        {/* Center Nav Menu */}
        <nav className="hidden lg:flex items-center gap-1 font-semibold text-[15px] text-slate-700 relative">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `px-3.5 py-2 rounded-lg transition ${isActive ? 'text-sky-600 bg-sky-50 font-bold' : 'hover:text-sky-600 hover:bg-slate-50'}`
            }
          >
            Trang chủ
          </NavLink>

          {/* TOUR DU LỊCH SUBMENU DROPDOWN */}
          <div 
            className="relative"
            onMouseEnter={() => setShowTourSubmenu(true)}
            onMouseLeave={() => setShowTourSubmenu(false)}
          >
            <NavLink 
              to="/tours" 
              className={({ isActive }) => 
                `px-3.5 py-2 rounded-lg transition flex items-center gap-1 ${isActive ? 'text-sky-600 bg-sky-50 font-bold' : 'hover:text-sky-600 hover:bg-slate-50'}`
              }
            >
              <Compass size={16} className="text-sky-600" />
              <span>Tour Du Lịch</span>
              <ChevronDown size={14} />
            </NavLink>

            {showTourSubmenu && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <Link to="/tours?type=trong-nuoc" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600">🇻🇳 Tour Trong Nước</Link>
                <Link to="/tours?type=nuoc-ngoai" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600">✈️ Tour Nước Ngoài (Hàn, Nhật, Thái...)</Link>
                <Link to="/tours?category=khuyen-mai" className="block px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50">🔥 Tour Khuyến Mãi Giảm Giá</Link>
                <Link to="/tours?category=du-thuyen" className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600">🚢 Tour Du Thuyền 5 Sao</Link>
                <Link to="/tours?category=cao-cap" className="block px-4 py-2 text-xs font-bold text-amber-600 hover:bg-amber-50">⭐ Tour Du Lịch Cao Cấp</Link>
              </div>
            )}
          </div>

          <NavLink 
            to="/tickets" 
            className={({ isActive }) => 
              `px-3.5 py-2 rounded-lg transition ${isActive ? 'text-sky-600 bg-sky-50 font-bold' : 'hover:text-sky-600 hover:bg-slate-50'}`
            }
          >
            Vé vui chơi
          </NavLink>

          <NavLink 
            to="/flights" 
            className={({ isActive }) => 
              `px-3.5 py-2 rounded-lg transition ${isActive ? 'text-sky-600 bg-sky-50 font-bold' : 'hover:text-sky-600 hover:bg-slate-50'}`
            }
          >
            Vé Máy Bay
          </NavLink>

          <NavLink 
            to="/travel-map" 
            className={({ isActive }) => 
              `px-3.5 py-2 rounded-lg transition ${isActive ? 'text-sky-600 bg-sky-50 font-bold' : 'hover:text-sky-600 hover:bg-slate-50'}`
            }
          >
            Bản Đồ Du Lịch
          </NavLink>

          <NavLink 
            to="/my-tours" 
            className={({ isActive }) => 
              `px-3.5 py-2 rounded-lg transition ${isActive ? 'text-sky-600 bg-sky-50 font-bold' : 'hover:text-sky-600 hover:bg-slate-50'}`
            }
          >
            Tour Của Tôi
          </NavLink>

          <NavLink 
            to="/offers" 
            className="px-3.5 py-2 rounded-lg text-amber-600 hover:bg-amber-50 font-bold transition flex items-center gap-1"
          >
            <Flame size={15} className="text-amber-500 fill-current" />
            Ưu đãi
          </NavLink>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link 
            to="/favorites" 
            className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-full transition relative"
            title="Yêu thích"
          >
            <Heart size={21} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </Link>

          <Link 
            to="/my-bookings" 
            className="p-2 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-full transition relative hidden sm:flex"
            title="Vé QR & Booking"
          >
            <Ticket size={21} />
          </Link>

          {/* Theme Toggle (Sáng / Tối) */}
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-600 hover:text-amber-500 hover:bg-slate-100 rounded-full transition relative"
            title={isDark ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
          >
            {isDark ? <Sun size={21} className="text-amber-400" /> : <Moon size={21} className="text-slate-600" />}
          </button>

          {isLoggedIn ? (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 border border-slate-200 rounded-full p-1.5 pl-3 hover:border-sky-500 hover:shadow-sm transition bg-white"
              >
                <span className="text-sm font-bold text-slate-800 hidden sm:block">
                  {user?.name || "Khách hàng"}
                </span>
                <div className="w-7 h-7 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                  {(user?.name || "K").charAt(0)}
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <div className="font-bold text-slate-900 text-sm">{user?.name}</div>
                    <div className="text-xs text-slate-500 truncate">{user?.email}</div>
                  </div>
                  <Link to="/my-tours" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 font-medium">Tour đã đặt</Link>
                  <Link to="/my-bookings" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 font-medium">Vé QR điện tử</Link>
                  <Link to="/favorites" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 font-medium">Danh sách yêu thích</Link>
                  <hr className="my-1.5 border-slate-100" />
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold">Đăng xuất</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                to="/login" 
                className="text-sm font-semibold text-slate-700 hover:text-sky-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition"
              >
                Đăng nhập
              </Link>
              <Link 
                to="/login?mode=register" 
                className="text-sm font-bold bg-sky-600 text-white hover:bg-sky-700 px-4 py-2 rounded-xl shadow-sm transition hidden sm:inline-block"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

