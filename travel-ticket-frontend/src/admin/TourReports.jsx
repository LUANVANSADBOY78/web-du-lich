import { BarChart3, TrendingUp, Compass, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TourReports() {
  const chartData = [
    { month: 'T1', rev: 450 }, { month: 'T2', rev: 520 }, { month: 'T3', rev: 610 },
    { month: 'T4', rev: 580 }, { month: 'T5', rev: 720 }, { month: 'T6', rev: 890 },
    { month: 'T7', rev: 950 }, { month: 'T8', rev: 880 }, { month: 'T9', rev: 710 },
    { month: 'T10', rev: 840 }, { month: 'T11', rev: 920 }, { month: 'T12', rev: 1100 }
  ];

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Báo Cáo & Thống Kê Doanh Thu Tour</h1>
        <p className="text-slate-500 text-sm mt-1">Phân tích tăng trưởng doanh thu & số lượng khách đi tour</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">Tổng Doanh Thu Tour</span>
          <div className="text-3xl font-black text-amber-600 mt-1">9.18 Tỷ ₫</div>
          <span className="text-xs font-bold text-emerald-600 mt-2 inline-block">+18.4% so với năm ngoái</span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">Tổng Khách Đã Khởi Hành</span>
          <div className="text-3xl font-black text-sky-600 mt-1">12,450 Khách</div>
          <span className="text-xs font-bold text-emerald-600 mt-2 inline-block">+22.1% tăng trưởng</span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">Tour Bán Chạy Nhất</span>
          <div className="text-xl font-black text-slate-900 mt-1">Tour Hàn Quốc 5N4Đ</div>
          <span className="text-xs font-bold text-slate-500 mt-2 inline-block">4.1k lượt đăng ký</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-6 flex items-center gap-2">
          <BarChart3 size={18} className="text-sky-600" /> Biểu Đồ Doanh Thu Tour Theo Tháng (Triệu ₫)
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px' }} />
              <Bar dataKey="rev" fill="#0284c7" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

