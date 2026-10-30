import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import TicketDetail from "./pages/TicketDetail";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import MyTours from "./pages/MyTours";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import MyBookings from "./pages/MyBookings";
import Flights from "./pages/Flights";
import TravelMap from "./pages/TravelMap";
import AIChat from "./pages/AIChat";
import Trains from "./pages/Trains";
import Hotels from "./pages/Hotels";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import AITripPlanner from "./pages/AITripPlanner";
import Blog from "./pages/Blog";

import AdminLayout from "./admin/components/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Attractions from "./admin/Attractions";
import TourManagement from "./admin/TourManagement";
import TourCollections from "./admin/TourCollections";
import Destinations from "./admin/Destinations";
import TourDepartures from "./admin/TourDepartures";
import TourBookings from "./admin/TourBookings";
import TourGuides from "./admin/TourGuides";
import TourReports from "./admin/TourReports";
import TicketManagement from "./admin/TicketManagement";
import BookingManagement from "./admin/BookingManagement";

import AIChatConversations from "./admin/AIChatConversations";
import AIKnowledgeBase from "./admin/AIKnowledgeBase";
import AISettings from "./admin/AISettings";
import Customers from "./admin/Customers";
import Vouchers from "./admin/Vouchers";
import Reviews from "./admin/Reviews";
import SupportTickets from "./admin/SupportTickets";
import Reports from "./admin/Reports";
import ActivityLogs from "./admin/ActivityLogs";

import TourItineraries from "./admin/TourItineraries";
import QRCheckin from "./admin/QRCheckin";
import Inventory from "./admin/Inventory";
import Payments from "./admin/Payments";
import Refunds from "./admin/Refunds";
import Waitlist from "./admin/Waitlist";
import TourInventory from "./admin/TourInventory";
import TicketTypes from "./admin/TicketTypes";

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
        <Route path="tours/:id" element={<TourDetail />} />
        <Route path="tour/:id" element={<TourDetail />} />
        <Route path="du-lich" element={<Tours />} />
        <Route path="du-lich/:id" element={<TourDetail />} />
        <Route path="hotels" element={<Hotels />} />
        <Route path="hotels/:id" element={<Hotels />} />
        <Route path="cart" element={<Cart />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="profile" element={<Profile />} />
        <Route path="ai-trip-planner" element={<AITripPlanner />} />
        <Route path="travel-map" element={<TravelMap />} />
        <Route path="flights" element={<Flights />} />
        <Route path="ve-may-bay" element={<Flights />} />
        <Route path="trains" element={<Trains />} />
        <Route path="ve-tau" element={<Trains />} />
        <Route path="combos" element={<PlaceholderPage title="Combo Du Lịch" />} />
        <Route path="blog" element={<Blog />} />
        <Route path="cam-nang" element={<Blog />} />
        <Route path="compare-tours" element={<PlaceholderPage title="So sánh Tour" />} />
        <Route path="my-trips" element={<PlaceholderPage title="My Trips" />} />
        <Route path="recently-viewed" element={<PlaceholderPage title="Đã Xem Gần Đây" />} />
        <Route path="my-tours" element={<MyTours />} />
        <Route path="category/:slug" element={<Tickets />} />
        <Route path="offers" element={<Tickets />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="my-bookings" element={<MyBookings />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="support" element={<PlaceholderPage title="Trung Tâm Hỗ Trợ Khách Hàng" />} />
        <Route path="ai-chat" element={<AIChat />} />
      </Route>

      {/* Admin Management System Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />

        {/* TOUR */}
        <Route path="tours" element={<TourManagement />} />
        <Route path="tour-categories" element={<TourCollections />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="tour-itineraries" element={<TourItineraries />} />
        <Route path="tour-departures" element={<TourDepartures />} />
        <Route path="tour-inventory" element={<TourInventory />} />
        <Route path="tour-guides" element={<TourGuides />} />
        <Route path="tour-reports" element={<TourReports />} />

        {/* VÉ VUI CHƠI */}
        <Route path="attractions" element={<Attractions />} />
        <Route path="products" element={<Attractions />} />
        <Route path="ticket-types" element={<TicketTypes />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="checkin" element={<QRCheckin />} />
        <Route path="tickets" element={<TicketManagement />} />

        {/* BOOKING */}
        <Route path="tour-bookings" element={<TourBookings />} />
        <Route path="bookings" element={<BookingManagement />} />
        <Route path="payments" element={<Payments />} />
        <Route path="refunds" element={<Refunds />} />
        <Route path="waitlist" element={<Waitlist />} />

        {/* AI CHATBOT */}
        <Route path="ai-chat" element={<AIChatConversations />} />
        <Route path="ai-knowledge" element={<AIKnowledgeBase />} />
        <Route path="ai-settings" element={<AISettings />} />
        <Route path="ai-trip-planner" element={<PlaceholderPage title="AI Trip Planner Admin" />} />
        <Route path="ai-feedback" element={<PlaceholderPage title="Feedback AI" />} />
        <Route path="ai-stats" element={<PlaceholderPage title="Thống kê AI" />} />

        {/* MARKETING */}
        <Route path="vouchers" element={<Vouchers />} />
        <Route path="flash-sales" element={<PlaceholderPage title="Flash Sale" />} />
        <Route path="combos" element={<PlaceholderPage title="Combo du lịch" />} />
        <Route path="banners" element={<PlaceholderPage title="Banner & Quảng cáo" />} />
        <Route path="membership" element={<PlaceholderPage title="Membership" />} />
        <Route path="referral" element={<PlaceholderPage title="Referral Program" />} />

        {/* USERS */}
        <Route path="customers" element={<Customers />} />
        <Route path="staff" element={<PlaceholderPage title="Nhân viên - Staff" />} />
        <Route path="partners" element={<PlaceholderPage title="Đối tác - Partners" />} />
        <Route path="tour-guides-users" element={<PlaceholderPage title="Tour Guides" />} />

        {/* CONTENT */}
        <Route path="reviews" element={<Reviews />} />
        <Route path="qna" element={<PlaceholderPage title="Q&A" />} />
        <Route path="blog" element={<Blog />} />
        <Route path="faq" element={<PlaceholderPage title="FAQ" />} />

        {/* SUPPORT */}
        <Route path="support-tickets" element={<SupportTickets />} />
        <Route path="live-chat" element={<PlaceholderPage title="Live Chat" />} />

        {/* SYSTEM */}
        <Route path="reports" element={<Reports />} />
        <Route path="roles" element={<PlaceholderPage title="Phân quyền - Roles & Permissions" />} />
        <Route path="activity-logs" element={<ActivityLogs />} />
        <Route path="settings" element={<PlaceholderPage title="Cài đặt hệ thống" />} />
      </Route>

      {/* Fallback Catch-All Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
