import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Compass, MapPin, ListTree, Calendar, Archive, UserCheck,
  Package, Ticket, QrCode, ClipboardList, CreditCard, Undo2, Clock,
  Bot, Map, MessageSquare, Database, LineChart, MessageCircle,
  Gift, Zap, Layers, Image as ImageIcon, Award, Share2,
  Users, UserCog, Briefcase, Contact2, Star, HelpCircle, FileText, FileQuestion,
  LifeBuoy, HeadphonesIcon, BarChart3, ShieldCheck, Activity, Settings, LogOut
} from "lucide-react";
import './Sidebar.css';

function Sidebar({ collapsed }) {
  const location = useLocation();

  const menuGroups = [
    {
      title: "ADMIN",
      items: [
        { path: "/admin", name: "Dashboard", icon: <LayoutDashboard size={20} /> },
      ]
    },
    {
      title: "TOUR",
      items: [
        { path: "/admin/tours", name: "Tour", icon: <Compass size={20} /> },
        { path: "/admin/tour-categories", name: "Danh mục", icon: <ListTree size={20} /> },
        { path: "/admin/destinations", name: "Điểm đến", icon: <MapPin size={20} /> },
        { path: "/admin/tour-itineraries", name: "Lịch trình", icon: <Map size={20} /> },
        { path: "/admin/tour-departures", name: "Lịch khởi hành", icon: <Calendar size={20} /> },
        { path: "/admin/tour-inventory", name: "Kho chỗ", icon: <Archive size={20} /> },
        { path: "/admin/tour-guides", name: "Hướng dẫn viên", icon: <UserCheck size={20} /> },
      ]
    },
    {
      title: "VÉ VUI CHƠI",
      items: [
        { path: "/admin/attractions", name: "Địa điểm", icon: <MapPin size={20} /> },
        { path: "/admin/products", name: "Sản phẩm", icon: <Package size={20} /> },
        { path: "/admin/ticket-types", name: "Loại vé", icon: <ListTree size={20} /> },
        { path: "/admin/inventory", name: "Kho vé", icon: <Archive size={20} /> },
        { path: "/admin/checkin", name: "QR Check-in", icon: <QrCode size={20} /> },
      ]
    },
    {
      title: "BOOKING",
      items: [
        { path: "/admin/tour-bookings", name: "Tour Booking", icon: <ClipboardList size={20} /> },
        { path: "/admin/bookings", name: "Ticket Booking", icon: <Ticket size={20} /> },
        { path: "/admin/payments", name: "Thanh toán", icon: <CreditCard size={20} /> },
        { path: "/admin/refunds", name: "Refund", icon: <Undo2 size={20} /> },
        { path: "/admin/waitlist", name: "Waitlist", icon: <Clock size={20} /> },
      ]
    },
    {
      title: "AI",
      items: [
        { path: "/admin/ai-settings", name: "AI Chatbot", icon: <Bot size={20} /> },
        { path: "/admin/ai-trip-planner", name: "AI Trip Planner", icon: <Map size={20} /> },
        { path: "/admin/ai-chat", name: "Lịch sử Chat", icon: <MessageSquare size={20} /> },
        { path: "/admin/ai-knowledge", name: "Knowledge Base", icon: <Database size={20} /> },
        { path: "/admin/ai-feedback", name: "Feedback AI", icon: <MessageCircle size={20} /> },
        { path: "/admin/ai-stats", name: "Thống kê AI", icon: <LineChart size={20} /> },
      ]
    },
    {
      title: "MARKETING",
      items: [
        { path: "/admin/vouchers", name: "Voucher", icon: <Gift size={20} /> },
        { path: "/admin/flash-sales", name: "Flash Sale", icon: <Zap size={20} /> },
        { path: "/admin/combos", name: "Combo", icon: <Layers size={20} /> },
        { path: "/admin/banners", name: "Banner", icon: <ImageIcon size={20} /> },
        { path: "/admin/membership", name: "Membership", icon: <Award size={20} /> },
        { path: "/admin/referral", name: "Referral", icon: <Share2 size={20} /> },
      ]
    },
    {
      title: "USERS",
      items: [
        { path: "/admin/customers", name: "Customers", icon: <Users size={20} /> },
        { path: "/admin/staff", name: "Staff", icon: <UserCog size={20} /> },
        { path: "/admin/partners", name: "Partners", icon: <Briefcase size={20} /> },
        { path: "/admin/tour-guides-users", name: "Tour Guides", icon: <Contact2 size={20} /> },
      ]
    },
    {
      title: "CONTENT",
      items: [
        { path: "/admin/reviews", name: "Reviews", icon: <Star size={20} /> },
        { path: "/admin/qna", name: "Q&A", icon: <HelpCircle size={20} /> },
        { path: "/admin/blog", name: "Blog", icon: <FileText size={20} /> },
        { path: "/admin/faq", name: "FAQ", icon: <FileQuestion size={20} /> },
      ]
    },
    {
      title: "SUPPORT",
      items: [
        { path: "/admin/support-tickets", name: "Support Ticket", icon: <LifeBuoy size={20} /> },
        { path: "/admin/live-chat", name: "Live Chat", icon: <HeadphonesIcon size={20} /> },
      ]
    },
    {
      title: "HỆ THỐNG",
      items: [
        { path: "/admin/reports", name: "REPORT", icon: <BarChart3 size={20} /> },
        { path: "/admin/roles", name: "ROLES", icon: <ShieldCheck size={20} /> },
        { path: "/admin/activity-logs", name: "ACTIVITY LOG", icon: <Activity size={20} /> },
        { path: "/admin/settings", name: "SETTINGS", icon: <Settings size={20} /> },
      ]
    }
  ];

  return (
    <div className={`admin-sidebar bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 shadow-xl ${collapsed ? 'w-[80px]' : 'w-[260px]'}`}>
      <div className="h-16 flex items-center justify-center border-b border-slate-800 shrink-0">
        <h4 className="font-black text-xl m-0 text-white tracking-tight">
          {collapsed ? 'G' : <><span className="text-white">Go</span><span className="text-sky-400">Ticket</span></>}
        </h4>
      </div>
      <div className="flex-grow overflow-y-auto custom-scrollbar p-3 space-y-6">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="flex flex-col">
            {!collapsed && <div className="text-[10px] font-bold text-slate-500 px-3 mb-2 uppercase tracking-wider">{group.title}</div>}
            <div className="space-y-1">
              {group.items.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink 
                    key={index}
                    to={item.path} 
                    className={`flex items-center rounded-xl px-3 py-2 transition-all duration-200 ${isActive ? 'bg-sky-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'}`}
                    title={collapsed ? item.name : ''}
                  >
                    <div className="flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    {!collapsed && <span className="ml-3 font-medium text-[13px] whitespace-nowrap">{item.name}</span>}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800 p-3 shrink-0">
        <NavLink to="/" className="flex items-center rounded-xl px-3 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200">
          <div className="flex items-center justify-center shrink-0">
            <LogOut size={20} />
          </div>
          {!collapsed && <span className="ml-3 font-medium text-sm whitespace-nowrap">Về trang chủ</span>}
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
