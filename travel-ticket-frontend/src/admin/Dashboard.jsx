import { 
  Users, ClipboardList, Ticket, Banknote, ArrowUpRight, ArrowDownRight,
  TrendingUp, Activity, Package
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export default function Dashboard() {
  const kpis = [
    { title: "Tổng doanh thu", value: "2.5B ₫", icon: <Banknote size={24} />, color: "bg-emerald-500", lightBg: "bg-emerald-50", text: "text-emerald-500", trend: 15.2, isUp: true },
    { title: "Tổng Booking", value: "1,850", icon: <ClipboardList size={24} />, color: "bg-blue-500", lightBg: "bg-blue-50", text: "text-blue-500", trend: 8.5, isUp: true },
    { title: "Vé đã bán", value: "5,420", icon: <Ticket size={24} />, color: "bg-amber-500", lightBg: "bg-amber-50", text: "text-amber-500", trend: -2.4, isUp: false },
    { title: "Khách hàng", value: "3,120", icon: <Users size={24} />, color: "bg-violet-500", lightBg: "bg-violet-50", text: "text-violet-500", trend: 12.0, isUp: true },
  ];

  const revenueData = [
    { month: 'T1', rev: 120 }, { month: 'T2', rev: 150 }, { month: 'T3', rev: 180 }, 
    { month: 'T4', rev: 170 }, { month: 'T5', rev: 210 }, { month: 'T6', rev: 250 },
    { month: 'T7', rev: 310 }, { month: 'T8', rev: 280 }, { month: 'T9', rev: 220 },
    { month: 'T10', rev: 290 }, { month: 'T11', rev: 320 }, { month: 'T12', rev: 380 }
  ];

  const bookingStatusData = [
    { name: 'Đã hoàn thành', value: 65, color: '#10b981' },
    { name: 'Chờ xác nhận', value: 20, color: '#f59e0b' },
    { name: 'Đã hủy', value: 15, color: '#ef4444' }
  ];

  const topProducts = [
    { name: 'Sun World Bà Nà Hills', bookings: 450, rev: '337M ₫' },
    { name: 'VinWonders Phú Quốc', bookings: 320, rev: '272M ₫' },
    { name: 'Cáp Treo Hòn Thơm', bookings: 280, rev: '168M ₫' },
    { name: 'Ký Ức Hội An', bookings: 210, rev: '126M ₫' },
    { name: 'Safari Phú Quốc', bookings: 190, rev: '123M ₫' },
  ];

  const recentBookings = [
    { id: "BK001", customer: "Nguyễn Văn A", total: "1.5M ₫", status: "Đã thanh toán", date: "01/10/2026", statusColor: "bg-emerald-100 text-emerald-700" },
    { id: "BK002", customer: "Trần Văn B", total: "1.2M ₫", status: "Chờ thanh toán", date: "01/10/2026", statusColor: "bg-amber-100 text-amber-700" },
    { id: "BK003", customer: "Lê Thị C", total: "0.9M ₫", status: "Đã xác nhận", date: "01/10/2026", statusColor: "bg-blue-100 text-blue-700" },
    { id: "BK004", customer: "Phạm D", total: "2.1M ₫", status: "Đã thanh toán", date: "30/09/2026", statusColor: "bg-emerald-100 text-emerald-700" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Tổng quan hoạt động kinh doanh</p>
        </div>
        <div className="text-slate-400 text-xs font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          Cập nhật: Hôm nay, 11:30 AM
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{kpi.title}</p>
                <h3 className="text-2xl font-black text-slate-800">{kpi.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${kpi.lightBg} ${kpi.text}`}>
                {kpi.icon}
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className={`font-bold flex items-center mr-2 ${kpi.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                {kpi.isUp ? <ArrowUpRight size={16} className="mr-0.5"/> : <ArrowDownRight size={16} className="mr-0.5"/>}
                {Math.abs(kpi.trend)}%
              </span>
              <span className="text-slate-400 text-xs font-medium">so với tháng trước</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={18} className="text-primary-500" />
              Doanh thu 12 tháng (Triệu VNĐ)
            </h3>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="rev" fill="#0ea5e9" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
            <Activity size={18} className="text-primary-500" />
            Trạng thái Booking
          </h3>
          <div className="h-64 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '12px', color: '#64748b', paddingTop: '20px'}}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
              <span className="text-3xl font-black text-slate-800">1.8K</span>
              <span className="text-xs font-medium text-slate-400">Tổng Booking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tables & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 m-0">Booking mới nhất</h3>
            <a href="#/admin/bookings" className="text-sm font-semibold text-primary-600 hover:text-primary-700">Xem tất cả</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-4">Mã BK</th>
                  <th className="p-4">Khách hàng</th>
                  <th className="p-4">Tổng tiền</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-right">Ngày</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBookings.map((b, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-primary-600">{b.id}</td>
                    <td className="p-4 font-medium text-slate-700">{b.customer}</td>
                    <td className="p-4 font-bold text-slate-800">{b.total}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${b.statusColor}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right text-slate-400 text-xs">{b.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 m-0">
              <Package size={18} className="text-primary-500" />
              Top 5 Sản phẩm
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 mr-4 ${i === 0 ? 'bg-amber-100 text-amber-600' : i === 1 ? 'bg-slate-200 text-slate-600' : i === 2 ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>
                  #{i+1}
                </div>
                <div className="flex-grow overflow-hidden">
                  <div className="font-bold text-slate-800 text-sm truncate group-hover:text-primary-600 transition-colors">{p.name}</div>
                  <div className="text-xs text-slate-500 font-medium">{p.bookings} lượt đặt</div>
                </div>
                <div className="font-black text-emerald-600 text-sm shrink-0 ml-4">
                  {p.rev}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
