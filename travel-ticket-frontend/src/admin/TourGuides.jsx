import { useState } from 'react';
import { UserCheck, Plus, Phone, Mail } from 'lucide-react';

export default function TourGuides() {
  const guides = [
    { id: 1, name: "Nguyễn Văn Hùng", phone: "0912345678", email: "hung.nguyen@goticket.vn", language: "Tiếng Anh, Tiếng Việt", exp: "8 năm" },
    { id: 2, name: "Trần Thị Mai", phone: "0923456789", email: "mai.tran@goticket.vn", language: "Tiếng Hàn, Tiếng Việt", exp: "5 năm" },
    { id: 3, name: "Lê Hoàng Nam", phone: "0934567890", email: "nam.le@goticket.vn", language: "Tiếng Nhật", exp: "6 năm" }
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Quản Lý Hướng Dẫn Viên Du Lịch</h1>
          <p className="text-slate-500 text-sm mt-1">Danh sách đội ngũ HDV dẫn đoàn</p>
        </div>
        <button className="bg-sky-600 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 text-sm shadow">
          <Plus size={18} /> Thêm Hướng Dẫn Viên
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map(g => (
          <div key={g.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-lg">
                {g.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">{g.name}</h3>
                <span className="text-xs text-sky-600 font-semibold">{g.exp} kinh nghiệm</span>
              </div>
            </div>
            <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2"><Phone size={14} className="text-slate-400" /> {g.phone}</div>
              <div className="flex items-center gap-2"><Mail size={14} className="text-slate-400" /> {g.email}</div>
              <div className="font-bold text-slate-800 pt-1">Ngôn ngữ: {g.language}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

