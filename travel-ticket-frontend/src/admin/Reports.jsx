import { useState, useEffect } from 'react';
import { BarChart3, Download, TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Calendar } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { adminApi } from '../services/adminApi';

const PERIODS = [
  { value: 'today', label: 'Hôm nay' },
  { value: '7days', label: '7 ngày' },
  { value: 'month', label: '30 ngày' },
  { value: 'quarter', label: 'Quý' },
  { value: 'year', label: 'Năm' },
];

const MOCK_REVENUE_DATA = [
  { name: 'T1', tour: 450, ticket: 220, hotel: 180, flight: 150, train: 80, combo: 60 },
  { name: 'T2', tour: 500, ticket: 250, hotel: 200, flight: 180, train: 100, combo: 75 },
  { name: 'T3', tour: 600, ticket: 300, hotel: 230, flight: 200, train: 120, combo: 90 },
  { name: 'T4', tour: 750, ticket: 380, hotel: 300, flight: 250, train: 150, combo: 110 },
  { name: 'T5', tour: 900, ticket: 450, hotel: 380, flight: 300, train: 180, combo: 130 },
  { name: 'T6', tour: 1100, ticket: 550, hotel: 450, flight: 350, train: 200, combo: 160 },
  { name: 'T7', tour: 1300, ticket: 650, hotel: 520, flight: 400, train: 220, combo: 180 },
  { name: 'T8', tour: 1100, ticket: 580, hotel: 480, flight: 360, train: 200, combo: 155 },
  { name: 'T9', tour: 800, ticket: 420, hotel: 350, flight: 280, train: 160, combo: 120 },
  { name: 'T10', tour: 700, ticket: 350, hotel: 300, flight: 240, train: 140, combo: 100 },
  { name: 'T11', tour: 600, ticket: 300, hotel: 250, flight: 200, train: 120, combo: 90 },
  { name: 'T12', tour: 800, ticket: 400, hotel: 320, flight: 260, train: 150, combo: 120 },
];

const MODULE_COLORS = {
  tour: '#0ea5e9', ticket: '#f59e0b', hotel: '#10b981',
  flight: '#6366f1', train: '#ef4444', combo: '#ec4899'
};

const MODULE_PIE = [
  { name: 'Tour', value: 42, color: '#0ea5e9' },
  { name: 'Ticket', value: 22, color: '#f59e0b' },
  { name: 'Khách sạn', value: 18, color: '#10b981' },
  { name: 'Máy bay', value: 11, color: '#6366f1' },
  { name: 'Tàu', value: 5, color: '#ef4444' },
  { name: 'Combo', value: 2, color: '#ec4899' },
];

const TOP_TOURS = [
  { name: 'Tour Phú Quốc 4N3Đ - Nghỉ Dưỡng & Khám Phá', revenue: 1250, bookings: 45 },
  { name: 'Tour Hạ Long 3N2Đ - Du Thuyền Hạng Sang', revenue: 980, bookings: 38 },
  { name: 'Tour Đà Nẵng - Hội An 3N2Đ', revenue: 850, bookings: 52 },
  { name: 'Tour Sapa 2N1Đ - Chinh Phục Fansipan', revenue: 620, bookings: 67 },
  { name: 'Tour Hàn Quốc 6N5Đ - Seoul & Jeju', revenue: 3800, bookings: 22 },
];

const formatCurrency = (val) => {
  if (val >= 1000) return `${(val/1000).toFixed(1)}B`;
  return `${val}M`;
};

export default function Reports() {
  const [period, setPeriod] = useState('year');
  const [chartData, setChartData] = useState(MOCK_REVENUE_DATA);
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getRevenueReport(period);
      setChartData(res.data);
    } catch {
      setChartData(MOCK_REVENUE_DATA);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReports(); }, [period]);

  const totalRevenue = chartData.reduce((s, d) => s + d.tour + d.ticket + (d.hotel || 0) + (d.flight || 0) + (d.train || 0), 0);

  const KPI_CARDS = [
    { label: 'Tổng doanh thu', value: `${totalRevenue.toLocaleString()}M đ`, change: '+12.5%', up: true, icon: DollarSign, color: 'text-sky-600 bg-sky-100' },
    { label: 'Tổng Booking', value: '8,542', change: '+8.3%', up: true, icon: ShoppingCart, color: 'text-emerald-600 bg-emerald-100' },
    { label: 'Khách hàng mới', value: '1,285', change: '+5.7%', up: true, icon: Users, color: 'text-amber-600 bg-amber-100' },
    { label: 'Doanh thu TB/Booking', value: '3.6M đ', change: '-2.1%', up: false, icon: Calendar, color: 'text-purple-600 bg-purple-100' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <BarChart3 size={24} className="text-sky-600" /> Báo Cáo & Thống Kê
          </h1>
          <p className="text-sm text-slate-500 mt-1">Tổng quan doanh thu và hiệu suất hệ thống</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-white border border-slate-200 rounded-xl p-1">
            {PERIODS.map(p => (
              <button key={p.value} onClick={() => setPeriod(p.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition ${period === p.value ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>
                {p.label}
              </button>
            ))}
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((kpi, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${kpi.color}`}>
              <kpi.icon size={20} />
            </div>
            <div className="text-2xl font-black text-slate-900 mb-1">{kpi.value}</div>
            <div className="text-sm text-slate-500 mb-2">{kpi.label}</div>
            <div className={`flex items-center gap-1 text-xs font-bold ${kpi.up ? 'text-emerald-600' : 'text-red-600'}`}>
              {kpi.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {kpi.change} so với kỳ trước
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="font-black text-slate-900 mb-5">Doanh Thu Theo Module (Triệu đ)</h2>
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                {Object.entries(MODULE_COLORS).map(([key, color]) => (
                  <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={formatCurrency} />
              <Tooltip formatter={(v) => [`${v}M đ`]} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
              <Legend />
              <Area type="monotone" dataKey="tour" name="Tour" stroke={MODULE_COLORS.tour} fill={`url(#grad-tour)`} strokeWidth={2} />
              <Area type="monotone" dataKey="ticket" name="Vé vui chơi" stroke={MODULE_COLORS.ticket} fill={`url(#grad-ticket)`} strokeWidth={2} />
              <Area type="monotone" dataKey="hotel" name="Khách sạn" stroke={MODULE_COLORS.hotel} fill={`url(#grad-hotel)`} strokeWidth={2} />
              <Area type="monotone" dataKey="flight" name="Máy bay" stroke={MODULE_COLORS.flight} fill={`url(#grad-flight)`} strokeWidth={2} />
              <Area type="monotone" dataKey="train" name="Tàu hỏa" stroke={MODULE_COLORS.train} fill={`url(#grad-train)`} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Module Pie */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-black text-slate-900 mb-5">Tỷ Trọng Doanh Thu</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={MODULE_PIE} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                dataKey="value" nameKey="name" label={({ name, value }) => `${name} ${value}%`} labelLine={true}>
                {MODULE_PIE.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Tours */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-black text-slate-900 mb-5">Top 5 Tour Doanh Thu Cao</h2>
          <div className="space-y-3">
            {TOP_TOURS.map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${i === 0 ? 'bg-amber-400 text-white' : i === 1 ? 'bg-slate-400 text-white' : i === 2 ? 'bg-orange-400 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-800 truncate">{t.name}</div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1">
                    <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: `${(t.revenue / TOP_TOURS[0].revenue) * 100}%` }}></div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-black text-slate-900 text-sm">{t.revenue}M</div>
                  <div className="text-xs text-slate-400">{t.bookings} đơn</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
