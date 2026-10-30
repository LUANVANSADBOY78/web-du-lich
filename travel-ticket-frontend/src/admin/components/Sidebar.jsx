import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Compass, MapPin, ListTree, Calendar, Archive, UserCheck,
  Package, Ticket, QrCode, ClipboardList, CreditCard, Undo2, Clock,
  Bot, Map, MessageSquare, Database, LineChart, MessageCircle,
  Gift, Zap, Layers, Image as ImageIcon, Award, Share2,
  Users, UserCog, Briefcase, Contact2, Star, HelpCircle, FileText, FileQuestion,
  LifeBuoy, HeadphonesIcon, BarChart3, ShieldCheck, Activity, Settings, LogOut,
  ChevronDown, ChevronRight
} from "lucide-react";
import { useState } from "react";
import './Sidebar.css';

// Đánh dấu rõ menu nào LIVE (đã có) vs SOON (placeholder)
const LIVE_PATHS = new Set([
  '/admin',
  '/admin/tours',
  '/admin/tour-categories',
  '/admin/destinations',
  '/admin/tour-itineraries',
  '/admin/tour-departures',
  '/admin/tour-inventory',
  '/admin/tour-guides',
  '/admin/attractions',
  '/admin/products',
  '/admin/ticket-types',
  '/admin/inventory',
  '/admin/tickets',
  '/admin/checkin',
  '/admin/tour-bookings',
  '/admin/bookings',
  '/admin/payments',
  '/admin/refunds',
  '/admin/waitlist',
  '/admin/ai-chat',
  '/admin/ai-knowledge',
  '/admin/ai-settings',
  '/admin/customers',
  '/admin/vouchers',
  '/admin/reviews',
  '/admin/blog',
  '/admin/support-tickets',
  '/admin/reports',
  '/admin/activity-logs',
]);

function SidebarItem({ item, collapsed }) {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const isLive = LIVE_PATHS.has(item.path);

  return (
    <NavLink
      to={item.path}
      className={`flex items-center rounded-xl px-3 py-2 transition-all duration-200 group/item relative
        ${isActive
          ? 'bg-sky-600 text-white shadow-md'
          : isLive
            ? 'hover:bg-slate-800 hover:text-white text-slate-300'
            : 'hover:bg-slate-800/60 text-slate-500 hover:text-slate-300'
        }`}
      title={collapsed ? item.name : ''}
    >
      <div className="flex items-center justify-center shrink-0">
        {item.icon}
      </div>
      {!collapsed && (
        <span className="ml-3 font-medium text-[13px] whitespace-nowrap flex-1">{item.name}</span>
      )}
      {!collapsed && !isLive && !isActive && (
        <span className="text-[9px] font-black bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded ml-1 shrink-0">SOON</span>
      )}
      {!collapsed && isLive && !isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 ml-1" title="Đã hoạt động" />
      )}
    </NavLink>
  );
}

function SidebarGroup({ group, collapsed }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex flex-col">
      {!collapsed && (
        <button
          onClick={() => setOpen(!open)}
          className="text-[10px] font-bold text-slate-500 px-3 mb-1 uppercase tracking-wider flex items-center justify-between hover:text-slate-400 transition"
        >
          {group.title}
          {open ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
        </button>
      )}
      {(open || collapsed) && (
        <div className="space-y-0.5">
          {group.items.map((item, index) => (
            <SidebarItem key={index} item={item} collapsed={collapsed} />
          ))}
        </div>
      )}
    </div>
  );
}

function Sidebar({ collapsed }) {
  const menuGroups = [
    {
      title: "ADMIN",
      items: [
        { path: "/admin", name: "Dashboard", icon: <LayoutDashboard size={18} /> },
      ]
    },
    {
      title: "TOUR",
      items: [
        { path: "/admin/tours", name: "Tour", icon: <Compass size={18} /> },
        { path: "/admin/tour-categories", name: "Danh mục", icon: <ListTree size={18} /> },
        { path: "/admin/destinations", name: "Điểm đến", icon: <MapPin size={18} /> },
        { path: "/admin/tour-itineraries", name: "Lịch trình", icon: <Map size={18} /> },
        { path: "/admin/tour-departures", name: "Lịch khởi hành", icon: <Calendar size={18} /> },
        { path: "/admin/tour-inventory", name: "Kho chỗ", icon: <Archive size={18} /> },
        { path: "/admin/tour-guides", name: "Hướng dẫn viên", icon: <UserCheck size={18} /> },
      ]
    },
    {
      title: "VÉ VUI CHƠI",
      items: [
        { path: "/admin/attractions", name: "Địa điểm", icon: <MapPin size={18} /> },
        { path: "/admin/products", name: "Sản phẩm vé", icon: <Package size={18} /> },
        { path: "/admin/ticket-types", name: "Loại vé", icon: <ListTree size={18} /> },
        { path: "/admin/inventory", name: "Kho vé", icon: <Archive size={18} /> },
        { path: "/admin/checkin", name: "QR Check-in", icon: <QrCode size={18} /> },
        { path: "/admin/tickets", name: "Ticket Management", icon: <Ticket size={18} /> },
      ]
    },
    {
      title: "BOOKING",
      items: [
        { path: "/admin/tour-bookings", name: "Tour Booking", icon: <ClipboardList size={18} /> },
        { path: "/admin/bookings", name: "Ticket Booking", icon: <Ticket size={18} /> },
        { path: "/admin/payments", name: "Thanh toán", icon: <CreditCard size={18} /> },
        { path: "/admin/refunds", name: "Refund", icon: <Undo2 size={18} /> },
        { path: "/admin/waitlist", name: "Waitlist", icon: <Clock size={18} /> },
      ]
    },
    {
      title: "AI CHATBOT",
      items: [
        { path: "/admin/ai-settings", name: "AI Chatbot", icon: <Bot size={18} /> },
        { path: "/admin/ai-trip-planner", name: "AI Trip Planner", icon: <Map size={18} /> },
        { path: "/admin/ai-chat", name: "Lịch sử Chat", icon: <MessageSquare size={18} /> },
        { path: "/admin/ai-knowledge", name: "Knowledge Base", icon: <Database size={18} /> },
        { path: "/admin/ai-feedback", name: "Feedback AI", icon: <MessageCircle size={18} /> },
        { path: "/admin/ai-stats", name: "Thống kê AI", icon: <LineChart size={18} /> },
      ]
    },
    {
      title: "MARKETING",
      items: [
        { path: "/admin/vouchers", name: "Voucher", icon: <Gift size={18} /> },
        { path: "/admin/flash-sales", name: "Flash Sale", icon: <Zap size={18} /> },
        { path: "/admin/combos", name: "Combo", icon: <Layers size={18} /> },
        { path: "/admin/banners", name: "Banner", icon: <ImageIcon size={18} /> },
        { path: "/admin/membership", name: "Membership", icon: <Award size={18} /> },
        { path: "/admin/referral", name: "Referral", icon: <Share2 size={18} /> },
      ]
    },
    {
      title: "USERS",
      items: [
        { path: "/admin/customers", name: "Customers", icon: <Users size={18} /> },
        { path: "/admin/staff", name: "Staff", icon: <UserCog size={18} /> },
        { path: "/admin/partners", name: "Partners", icon: <Briefcase size={18} /> },
        { path: "/admin/tour-guides-users", name: "Tour Guides", icon: <Contact2 size={18} /> },
      ]
    },
    {
      title: "CONTENT",
      items: [
        { path: "/admin/reviews", name: "Reviews", icon: <Star size={18} /> },
        { path: "/admin/qna", name: "Q&A", icon: <HelpCircle size={18} /> },
        { path: "/admin/blog", name: "Blog", icon: <FileText size={18} /> },
        { path: "/admin/faq", name: "FAQ", icon: <FileQuestion size={18} /> },
      ]
    },
    {
      title: "SUPPORT",
      items: [
        { path: "/admin/support-tickets", name: "Support Ticket", icon: <LifeBuoy size={18} /> },
        { path: "/admin/live-chat", name: "Live Chat", icon: <HeadphonesIcon size={18} /> },
      ]
    },
    {
      title: "HỆ THỐNG",
      items: [
        { path: "/admin/reports", name: "Reports", icon: <BarChart3 size={18} /> },
        { path: "/admin/roles", name: "Roles & Quyền", icon: <ShieldCheck size={18} /> },
        { path: "/admin/activity-logs", name: "Activity Log", icon: <Activity size={18} /> },
        { path: "/admin/settings", name: "Settings", icon: <Settings size={18} /> },
      ]
    }
  ];

  return (
    <div className={`admin-sidebar bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 shadow-xl ${collapsed ? 'w-[72px]' : 'w-[250px]'}`}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-slate-800 shrink-0 px-3">
        {collapsed ? (
          <div className="w-9 h-9 bg-sky-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-base">G</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-600 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-white font-black text-sm">G</span>
            </div>
            <h4 className="font-black text-lg m-0 text-white tracking-tight">
              Go<span className="text-sky-400">Travel</span>
            </h4>
            <span className="text-[9px] bg-sky-600/30 text-sky-400 border border-sky-600/40 px-1.5 py-0.5 rounded font-bold">ADMIN</span>
          </div>
        )}
      </div>

      {/* Legend (chỉ hiện khi không collapse) */}
      {!collapsed && (
        <div className="px-4 py-2 flex items-center gap-3 text-[10px] border-b border-slate-800/50">
          <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Đã hoạt động</span>
          <span className="flex items-center gap-1 text-slate-500"><span className="bg-slate-700 text-slate-400 px-1 rounded text-[9px] font-black">SOON</span> Sắp ra mắt</span>
        </div>
      )}

      {/* Scrollable menu */}
      <div className="flex-grow overflow-y-auto custom-scrollbar py-3 px-2 space-y-4">
        {menuGroups.map((group, idx) => (
          <SidebarGroup key={idx} group={group} collapsed={collapsed} />
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-2 shrink-0 space-y-1">
        <NavLink
          to="/"
          className="flex items-center rounded-xl px-3 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200"
          title={collapsed ? 'Về trang chủ' : ''}
        >
          <LogOut size={18} />
          {!collapsed && <span className="ml-3 font-medium text-sm">Về trang chủ</span>}
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
