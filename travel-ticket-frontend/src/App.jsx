import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import TicketDetail from "./pages/TicketDetail";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import MyTours from "./pages/MyTours";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import MyBookings from "./pages/MyBookings";
import Flights from "./pages/Flights";
import TravelMap from "./pages/TravelMap";

import AdminLayout from "./admin/components/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Attractions from "./admin/Attractions";
import TourManagement from "./admin/TourManagement";
import TourCollections from "./admin/TourCollections";
import TourDepartures from "./admin/TourDepartures";
import TourBookings from "./admin/TourBookings";
import TourGuides from "./admin/TourGuides";
import TourReports from "./admin/TourReports";
import TicketManagement from "./admin/TicketManagement";
import BookingManagement from "./admin/BookingManagement";

import AIChatConversations from "./admin/AIChatConversations";
import AIKnowledgeBase from "./admin/AIKnowledgeBase";
import AISettings from "./admin/AISettings";

const PlaceholderPage = ({ title }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 m-6">
    <h2 className="text-2xl font-black text-slate-900 mb-2">{title}</h2>
    <p className="text-slate-500 text-sm">Module này đang được xây dựng theo kiến trúc Full-stack. Dự kiến ra mắt trong phiên bản tiếp theo.</p>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Client Customer Frontend Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="ticket/:id" element={<TicketDetail />} />
        <Route path="tours" element={<Tours />} />
        <Route path="tour/:id" element={<TourDetail />} />
        {/* NEW CLIENT ROUTES */}
        <Route path="travel-map" element={<TravelMap />} />
        <Route path="flights" element={<Flights />} />
        <Route path="ve-may-bay" element={<Flights />} />
        <Route path="ai-trip-planner" element={<div className="p-10 text-center"><h2 className="text-2xl font-bold">AI Trip Planner</h2><p>Đang tải giao diện AI lên lịch trình...</p></div>} />
        <Route path="compare-tours" element={<div className="p-10 text-center"><h2 className="text-2xl font-bold">So sánh Tour</h2><p>Đang xây dựng bảng so sánh 3 tour...</p></div>} />
        <Route path="my-trips" element={<div className="p-10 text-center"><h2 className="text-2xl font-bold">My Trips</h2><p>Trang tổng hợp mọi booking của chuyến đi.</p></div>} />
        <Route path="recently-viewed" element={<div className="p-10 text-center"><h2 className="text-2xl font-bold">Đã Xem Gần Đây</h2><p>Lịch sử các tour/vé bạn đã xem.</p></div>} />

        <Route path="my-tours" element={<MyTours />} />
        <Route path="category/:slug" element={<Tickets />} />
        <Route path="offers" element={<Tickets />} />
        <Route path="favorites" element={<Tickets />} />
        <Route path="favorites/tours" element={<MyTours />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="my-bookings" element={<MyBookings />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Login />} />
        <Route path="support" element={<PlaceholderPage title="Trung Tâm Hỗ Trợ Khách Hàng" />} />
      </Route>
      
      {/* Admin Management System Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        
        {/* TOUR */}
        <Route path="tours" element={<TourManagement />} />
        <Route path="tour-categories" element={<TourCollections />} />
        <Route path="destinations" element={<PlaceholderPage title="Điểm đến" />} />
        <Route path="tour-itineraries" element={<PlaceholderPage title="Lịch trình" />} />
        <Route path="tour-departures" element={<TourDepartures />} />
        <Route path="tour-inventory" element={<PlaceholderPage title="Kho chỗ" />} />
        <Route path="tour-guides" element={<TourGuides />} />
        
        {/* VÉ VUI CHƠI */}
        <Route path="attractions" element={<Attractions />} />
        <Route path="products" element={<Attractions />} />
        <Route path="ticket-types" element={<PlaceholderPage title="Loại vé" />} />
        <Route path="inventory" element={<PlaceholderPage title="Kho vé" />} />
        <Route path="checkin" element={<PlaceholderPage title="QR Check-in" />} />
        <Route path="tickets" element={<TicketManagement />} />

        {/* BOOKING */}
        <Route path="tour-bookings" element={<TourBookings />} />
        <Route path="bookings" element={<BookingManagement />} />
        <Route path="payments" element={<PlaceholderPage title="Thanh toán" />} />
        <Route path="refunds" element={<PlaceholderPage title="Refund" />} />
        <Route path="waitlist" element={<PlaceholderPage title="Waitlist" />} />

        {/* AI CHATBOT */}
        <Route path="ai-chat" element={<AIChatConversations />} />
        <Route path="ai-knowledge" element={<AIKnowledgeBase />} />
        <Route path="ai-settings" element={<AISettings />} />
        <Route path="ai-trip-planner" element={<PlaceholderPage title="AI Trip Planner Admin" />} />
        <Route path="ai-feedback" element={<PlaceholderPage title="Feedback AI" />} />
        <Route path="ai-stats" element={<PlaceholderPage title="Thống kê AI" />} />

        {/* MARKETING */}
        <Route path="vouchers" element={<PlaceholderPage title="Voucher" />} />
        <Route path="flash-sales" element={<PlaceholderPage title="Flash Sale" />} />
        <Route path="combos" element={<PlaceholderPage title="Combo" />} />
        <Route path="banners" element={<PlaceholderPage title="Banner" />} />
        <Route path="membership" element={<PlaceholderPage title="Membership" />} />
        <Route path="referral" element={<PlaceholderPage title="Referral" />} />

        {/* USERS */}
        <Route path="customers" element={<PlaceholderPage title="Customers" />} />
        <Route path="staff" element={<PlaceholderPage title="Staff" />} />
        <Route path="partners" element={<PlaceholderPage title="Partners" />} />
        <Route path="tour-guides-users" element={<PlaceholderPage title="Tour Guides (Users)" />} />

        {/* CONTENT */}
        <Route path="reviews" element={<PlaceholderPage title="Reviews" />} />
        <Route path="qna" element={<PlaceholderPage title="Q&A" />} />
        <Route path="blog" element={<PlaceholderPage title="Blog" />} />
        <Route path="faq" element={<PlaceholderPage title="FAQ" />} />

        {/* SUPPORT */}
        <Route path="support-tickets" element={<PlaceholderPage title="Support Ticket" />} />
        <Route path="live-chat" element={<PlaceholderPage title="Live Chat" />} />

        {/* SYSTEM */}
        <Route path="reports" element={<TourReports />} />
        <Route path="roles" element={<PlaceholderPage title="Phân quyền" />} />
        <Route path="activity-logs" element={<PlaceholderPage title="Nhật ký hoạt động" />} />
        <Route path="settings" element={<PlaceholderPage title="Cài đặt" />} />
      </Route>
      
      {/* Fallback Catch-All Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
