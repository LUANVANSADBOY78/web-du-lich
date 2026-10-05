import { useState } from 'react';
import { Calendar, Plus, Search, CheckCircle2 } from 'lucide-react';

export default function TourDepartures() {
  const departures = [
    { id: 1, tourName: "Tour Đà Nẵng - Bà Nà Hills 4N3Đ", startDate: "15/10/2026", endDate: "18/10/2026", totalSeats: 30, bookedSeats: 22, status: "Còn chỗ" },
    { id: 2, tourName: "Tour Phú Quốc Canô 4 Đảo 3N2Đ", startDate: "18/10/2026", endDate: "20/10/2026", totalSeats: 20, bookedSeats: 20, status: "Hết chỗ" },
    { id: 3, tourName: "Tour Hàn Quốc Seoul 5N4Đ", startDate: "20/10/2026", endDate: "25/10/2026", totalSeats: 25, bookedSeats: 19, status: "Gần hết" },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Quản Lý Lịch Khởi Hành Tour</h1>
          <p className="text-slate-500 text-sm mt-1">Danh sách các chuyến đi sắp khởi hành & chỗ trống</p>
        </div>
        <button className="bg-sky-600 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 text-sm shadow">
          <Plus size={18} /> Thêm Lịch Khởi Hành
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold">
            <tr>
              <th className="p-4">Tên Tour</th>
              <th className="p-4">Ngày khởi hành</th>
              <th className="p-4">Ngày về</th>
              <th className="p-4">Tổng số chỗ</th>
              <th className="p-4">Đã đặt</th>
              <th className="p-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {departures.map(d => (
              <tr key={d.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">{d.tourName}</td>
                <td className="p-4">{d.startDate}</td>
                <td className="p-4">{d.endDate}</td>
                <td className="p-4 font-bold">{d.totalSeats} chỗ</td>
                <td className="p-4 font-bold text-sky-600">{d.bookedSeats} chỗ</td>
                <td className="p-4">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                    d.status === 'Hết chỗ' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

