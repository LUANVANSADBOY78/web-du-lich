import { useState } from "react";
import { 
  LineChart, Sparkles, MessageSquare, Zap, DollarSign, 
  Clock, TrendingUp, Users, ArrowUpRight, BarChart3, 
  Calendar, Download, RefreshCw, Layers
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell 
} from "recharts";
import { toast } from "react-toastify";

const DAILY_DATA = [
  { day: "24/10", queries: 320, tokens: 48000, bookings: 42, cost: 0.96 },
  { day: "25/10", queries: 410, tokens: 62000, bookings: 58, cost: 1.24 },
  { day: "26/10", queries: 390, tokens: 59000, bookings: 51, cost: 1.18 },
  { day: "27/10", queries: 540, tokens: 81000, bookings: 76, cost: 1.62 },
  { day: "28/10", queries: 620, tokens: 94000, bookings: 89, cost: 1.88 },
  { day: "29/10", queries: 750, tokens: 112000, bookings: 112, cost: 2.24 },
  { day: "30/10", queries: 880, tokens: 135000, bookings: 135, cost: 2.70 }
];

const TOP_TOPICS = [
  { topic: "Tour Đà Nẵng & Vé Bà Nà Hills", count: 480, percentage: 35 },
  { topic: "Tour Phú Quốc Cano 4 Đảo", count: 320, percentage: 23 },
  { topic: "Tour Hàn Quốc & Nhật Bản Mùa Thu", count: 260, percentage: 19 },
  { topic: "Tính toán chi phí & Hỏi phép tính (1+1)", count: 180, percentage: 13 },
  { topic: "Chính sách đổi trả & Vé QR", count: 140, percentage: 10 }
];

const MODEL_USAGE = [
  { name: "Gemini 1.5 Pro", value: 55, color: "#4f46e5" },
  { name: "GPT-4o Mini", value: 35, color: "#0ea5e9" },
  { name: "Claude 3.5", value: 10, color: "#f59e0b" }
];

export default function AIStats() {
  const [timeRange, setTimeRange] = useState("7days");

  const totalQueries = DAILY_DATA.reduce((a, b) => a + b.queries, 0);
  const totalTokens = DAILY_DATA.reduce((a, b) => a + b.tokens, 0);
  const totalBookings = DAILY_DATA.reduce((a, b) => a + b.bookings, 0);
  const totalCostUSD = DAILY_DATA.reduce((a, b) => a + b.cost, 0).toFixed(2);
  const totalCostVND = (Number(totalCostUSD) * 25400).toLocaleString();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <BarChart3 className="text-sky-600" size={28} />
            Thống Kê Hiệu Năng AI (AI Statistics & Analytics)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Báo cáo chi tiết số lượng truy vấn, chi phí token LLM, độ trễ và tỷ lệ chuyển đổi đơn hàng qua AI
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700"
          >
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua</option>
            <option value="90days">Quý này</option>
          </select>
          <button
            onClick={() => toast.success("Đã xuất báo cáo phân tích AI sang định dạng Excel/PDF!")}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-2.5 rounded-xl transition cursor-pointer"
          >
            <Download size={16} />
            Xuất Báo Cáo
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng Truy Vấn Khách</div>
            <div className="text-2xl font-black text-slate-800 mt-1">{totalQueries.toLocaleString()} câu</div>
            <div className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-0.5">
              <TrendingUp size={12} /> +18.4% so với tuần trước
            </div>
          </div>
          <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center font-bold">
            <MessageSquare size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lượng Token Tiêu Thụ</div>
            <div className="text-2xl font-black text-indigo-600 mt-1">{(totalTokens / 1000).toFixed(0)}k Tokens</div>
            <div className="text-xs text-slate-400 mt-1">Ước tính: ~${totalCostUSD} ({totalCostVND}đ)</div>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
            <Zap size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đơn Booking Từ AI</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">{totalBookings} đơn hàng</div>
            <div className="text-xs text-emerald-600 font-bold mt-1">Tỷ lệ chốt đơn: 15.6%</div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tốc Độ Phản Hồi TB</div>
            <div className="text-2xl font-black text-blue-600 mt-1">0.68 giây</div>
            <div className="text-xs text-blue-600 font-semibold mt-1">Độ trễ thấp, thời gian thực</div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
            <Clock size={24} />
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-base">Tần Suất Trò Chuyện & Chốt Booking Theo Ngày</h3>
              <p className="text-xs text-slate-400">Theo dõi sự tăng trưởng hội thoại tương tác của khách</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-bold text-sky-600">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> Truy vấn AI
              </span>
              <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Đơn Booking
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DAILY_DATA}>
                <defs>
                  <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="queries" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorQueries)" />
                <Area type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorBookings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LLM Model Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-base mb-1">Mô Hình LLM Sử Dụng</h3>
            <p className="text-xs text-slate-400 mb-4">Tỷ trọng phân bổ tải công việc AI</p>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MODEL_USAGE}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {MODEL_USAGE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100">
            {MODEL_USAGE.map((m, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                  {m.name}
                </span>
                <span className="font-bold text-slate-800">{m.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Topics */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 text-base mb-1">Top Chủ Đề Khách Quan Tâm Nhất</h3>
        <p className="text-xs text-slate-400 mb-5">Dữ liệu phân tích tự động từ các cuộc trò chuyện của du khách</p>

        <div className="space-y-4">
          {TOP_TOPICS.map((item, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">{index + 1}. {item.topic}</span>
                <span className="text-sky-600 font-bold">{item.count} lượt ({item.percentage}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full"
                  style={{ width: `${item.percentage * 2.5}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
