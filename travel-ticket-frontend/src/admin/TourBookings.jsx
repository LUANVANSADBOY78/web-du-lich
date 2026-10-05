import { useState } from 'react';
import { ClipboardList, CheckCircle2, Clock, XCircle, Search } from 'lucide-react';
import { toast } from 'react-toastify';

export default function TourBookings() {
  const [bookings, setBookings] = useState([
    { id: 'TBK2026001', tourName: 'Tour Đà Nẵng 4N3Đ', customer: 'Nguyễn Văn A', phone: '0901234567', departureDate: '15/10/2026', totalGuests: 2, totalAmount: '9,980,000 đ', status: 'Đã thanh toán' },
    { id: 'TBK2026002', tourName: 'Tour Hàn Quốc 5N4Đ', customer: 'Trần Thị B', phone: '0987654321', departureDate: '20/10/2026', totalGuests: 4, totalAmount: '59,960,000 đ', status: 'Chờ xác nhận' }
  ]);

  const handleConfirm = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Đã xác nhận' } : b));
    toast.success('Đã xác nhận thành công đơn đặt tour ' + id);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Quản Lý Đơn Đặt Tour</h1>
          <p className="text-slate-500 text-sm mt-1">Danh sách booking tour khách hàng đăng ký</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold">
            <tr>
              <th className="p-4">Mã Đơn</th>
              <th className="p-4">Tên Tour</th>
              <th className="p-4">Khách Hàng</th>
              <th className="p-4">Ngày Đi</th>
              <th className="p-4">Số Khách</th>
              <th className="p-4">Tổng Tiền</th>
              <th className="p-4">Trạng Thái</th>
              <th className="p-4 text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {bookings.map(b => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-sky-600">{b.id}</td>
                <td className="p-4 font-bold text-slate-900">{b.tourName}</td>
                <td className="p-4">
                  <div>{b.customer}</div>
                  <div className="text-xs text-slate-400">{b.phone}</div>
                </td>
                <td className="p-4">{b.departureDate}</td>
                <td className="p-4 font-bold">{b.totalGuests} người</td>
                <td className="p-4 font-black text-amber-600">{b.totalAmount}</td>
                <td className="p-4">
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                    {b.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleConfirm(b.id)} className="bg-sky-600 text-white font-bold text-xs py-1.5 px-3 rounded-lg hover:bg-sky-700">
                    Xác nhận
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

