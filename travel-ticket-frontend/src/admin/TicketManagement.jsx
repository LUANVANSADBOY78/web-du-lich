import { Ticket } from "lucide-react";

export default function TicketManagement() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mb-4">
        <Ticket size={40} className="text-primary-500" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Quản lý Vé</h2>
      <p className="text-slate-500 max-w-md">Chức năng Quản lý Vé (CRUD) đang được hoàn thiện. Giao diện này sẽ dùng chung Design System với trang Địa Điểm.</p>
    </div>
  );
}
