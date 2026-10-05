import { ClipboardList } from "lucide-react";

export default function BookingManagement() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <ClipboardList size={40} className="text-blue-500" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Quản lý Booking</h2>
      <p className="text-slate-500 max-w-md">Chức năng Quản lý Booking với các bộ lọc, tabs trạng thái và xem chi tiết đang được xây dựng.</p>
    </div>
  );
}
