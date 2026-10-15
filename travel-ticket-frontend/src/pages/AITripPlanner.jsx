import { useState } from 'react';
import { Sparkles, MapPin, Calendar, Users, DollarSign, Loader2, Map, BookOpen } from 'lucide-react';
import { toast } from 'react-toastify';
import { formatCurrency } from '../utils/format';

const PREFERENCES = ['Biển', 'Núi', 'Văn hóa', 'Ẩm thực', 'Mua sắm', 'Giải trí', 'Thiên nhiên', 'Nghỉ dưỡng'];

const SAMPLE_PLAN = [
  {
    day: 1, title: 'Khám Phá Trung Tâm', total: 510000,
    activities: [
      { time: '07:00', desc: 'Ăn sáng Bánh mì Phượng nổi tiếng', icon: '🍞', type: 'food', cost: 35000 },
      { time: '09:00', desc: 'Tham quan Bảo tàng Chăm', icon: '🏛️', type: 'attraction', cost: 60000 },
      { time: '12:00', desc: 'Trưa tại Mỳ Quảng Bà Mua', icon: '🍜', type: 'food', cost: 65000 },
      { time: '14:00', desc: 'Ghé thăm Phố cổ Hội An', icon: '🏮', type: 'attraction', cost: 120000 },
      { time: '19:00', desc: 'Tối tại Chợ đêm Sơn Trà', icon: '🌙', type: 'food', cost: 230000 },
    ]
  },
  {
    day: 2, title: 'Bãi Biển & Thiên Nhiên', total: 940000,
    activities: [
      { time: '06:00', desc: 'Ngắm bình minh biển Mỹ Khê', icon: '🌅', type: 'free', cost: 0 },
      { time: '09:00', desc: 'Cáp treo Bà Nà Hills', icon: '🚡', type: 'attraction', cost: 790000 },
      { time: '12:00', desc: 'Ăn trưa tại Bà Nà Hills', icon: '🍽️', type: 'food', cost: 150000 },
      { time: '18:00', desc: 'Biển Mỹ Khê - thư giãn buổi chiều', icon: '🏖️', type: 'free', cost: 0 },
    ]
  },
  {
    day: 3, title: 'Khám Phá Ẩm Thực', total: 1335000,
    activities: [
      { time: '08:00', desc: 'Bánh xèo, bánh cuốn phố cổ', icon: '🥘', type: 'food', cost: 85000 },
      { time: '10:00', desc: 'Làng cổ Phong Nam', icon: '🌿', type: 'attraction', cost: 50000 },
      { time: '14:00', desc: 'Cooking class ẩm thực Đà Nẵng', icon: '👨‍🍳', type: 'activity', cost: 400000 },
      { time: '19:00', desc: 'Bữa tối tạm biệt tại Sky36', icon: '🌆', type: 'food', cost: 800000 },
    ]
  },
];

const typeColors = {
  food: 'bg-orange-100 text-orange-700',
  attraction: 'bg-sky-100 text-sky-700',
  activity: 'bg-violet-100 text-violet-700',
  free: 'bg-green-100 text-green-700'
};

export default function AITripPlanner() {
  const [form, setForm] = useState({ destination: '', startDate: '', endDate: '', people: 2, budget: '', preferences: [] });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePref = (p) => setForm(prev => ({
    ...prev,
    preferences: prev.preferences.includes(p) ? prev.preferences.filter(x => x !== p) : [...prev.preferences, p]
  }));

  const validate = () => {
    const errs = {};
    if (!form.destination.trim()) errs.destination = 'Vui lòng nhập điểm đến';
    if (!form.startDate) errs.startDate = 'Chọn ngày bắt đầu';
    if (!form.endDate) errs.endDate = 'Chọn ngày kết thúc';
    if (form.startDate && form.endDate && new Date(form.endDate) < new Date(form.startDate))
      errs.endDate = 'Ngày về phải sau ngày đi';
    if (!form.budget) errs.budget = 'Chọn ngân sách';
    return errs;
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setPlan(null);
    setTimeout(() => {
      setPlan(SAMPLE_PLAN);
      setLoading(false);
      toast.success('🎉 Lịch trình AI đã sẵn sàng!');
    }, 2500);
  };

  const totalCost = plan?.reduce((s, d) => s + d.total, 0) || 0;
  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })); };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-sky-600 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Sparkles size={14} /> AI Trip Planner Beta
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-3">Lập Kế Hoạch Du Lịch Bằng AI</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Nhập thông tin chuyến đi, AI sẽ tạo lịch trình chi tiết theo ngày
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <form onSubmit={handleGenerate} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 space-y-5">
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-1.5">Điểm Đến *</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={form.destination} onChange={e => set('destination', e.target.value)}
                  placeholder="Đà Nẵng, Hà Nội, Hội An..."
                  className={`w-full border rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-violet-500 ${errors.destination ? 'border-red-400' : 'border-slate-200'}`} />
              </div>
              {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'startDate', label: 'Ngày Đi *' },
                { name: 'endDate', label: 'Ngày Về *' },
              ].map(({ name, label }) => (
                <div key={name}>
                  <label className="text-sm font-bold text-slate-700 block mb-1.5">{label}</label>
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="date" value={form[name]} onChange={e => set(name, e.target.value)}
                      min={name === 'endDate' ? form.startDate : new Date().toISOString().split('T')[0]}
                      className={`w-full border rounded-xl py-3 pl-9 pr-3 text-sm outline-none focus:border-violet-500 ${errors[name] ? 'border-red-400' : 'border-slate-200'}`} />
                  </div>
                  {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
                </div>
              ))}
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 block mb-1.5">Số Người</label>
              <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-2.5 focus-within:border-violet-500">
                <Users size={16} className="text-slate-400" />
                <button type="button" onClick={() => setForm(p => ({ ...p, people: Math.max(1, p.people - 1) }))}
                  className="w-7 h-7 rounded-full border border-slate-200 text-slate-600 hover:border-violet-500 flex items-center justify-center font-bold">-</button>
                <span className="font-black w-6 text-center">{form.people}</span>
                <button type="button" onClick={() => setForm(p => ({ ...p, people: p.people + 1 }))}
                  className="w-7 h-7 rounded-full border border-slate-200 text-slate-600 hover:border-violet-500 flex items-center justify-center font-bold">+</button>
                <span className="text-sm text-slate-500">người</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 block mb-1.5">Ngân Sách / Người *</label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <select value={form.budget} onChange={e => set('budget', e.target.value)}
                  className={`w-full border rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:border-violet-500 appearance-none bg-white ${errors.budget ? 'border-red-400' : 'border-slate-200'}`}>
                  <option value="">Chọn ngân sách</option>
                  <option value="2m">Tiết kiệm: dưới 2 triệu/người</option>
                  <option value="5m">Trung bình: 2-5 triệu/người</option>
                  <option value="10m">Thoải mái: 5-10 triệu/người</option>
                  <option value="luxury">Cao cấp: trên 10 triệu/người</option>
                </select>
              </div>
              {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">Sở Thích Du Lịch</label>
              <div className="flex flex-wrap gap-2">
                {PREFERENCES.map(p => (
                  <button key={p} type="button" onClick={() => togglePref(p)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                      form.preferences.includes(p) ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}>{p}</button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-sky-600 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60 text-base shadow-md">
              {loading ? (
                <><Loader2 size={20} className="animate-spin" /> Đang tạo lịch trình AI...</>
              ) : (
                <><Sparkles size={20} /> Tạo Lịch Trình Ngay</>
              )}
            </button>
          </form>

          {/* Output */}
          <div>
            {!plan && !loading && (
              <div className="h-full min-h-[400px] flex items-center justify-center bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8 text-center">
                <div>
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="font-black text-slate-600 text-xl mb-2">Lịch Trình Sẽ Hiện Ở Đây</p>
                  <p className="text-slate-400 text-sm">Điền thông tin bên trái và nhấn "Tạo Lịch Trình"</p>
                </div>
              </div>
            )}

            {loading && (
              <div className="h-full min-h-[400px] flex items-center justify-center bg-white rounded-3xl border border-slate-100 p-8 text-center">
                <div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-sky-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Sparkles size={28} className="text-white" />
                  </div>
                  <p className="font-black text-slate-700 text-lg mb-1">AI đang lập kế hoạch...</p>
                  <p className="text-slate-400 text-sm">Phân tích điểm đến và tạo lịch trình tối ưu</p>
                </div>
              </div>
            )}

            {plan && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-violet-600 to-sky-600 text-white rounded-2xl p-5">
                  <h3 className="font-black text-xl mb-1">
                    {form.destination} · {plan.length} Ngày {plan.length - 1} Đêm
                  </h3>
                  <p className="text-white/80 text-sm">
                    Ước tính chi phí: <strong>{formatCurrency(totalCost * form.people)}</strong> cho {form.people} người
                  </p>
                  <div className="flex gap-3 mt-4 flex-wrap">
                    <button className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-bold px-3 py-1.5 rounded-lg transition">
                      <Map size={14} /> Xem bản đồ
                    </button>
                    <button onClick={() => toast.success('Đã lưu kế hoạch!')}
                      className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-bold px-3 py-1.5 rounded-lg transition">
                      <BookOpen size={14} /> Lưu kế hoạch
                    </button>
                  </div>
                </div>

                {plan.map((day) => (
                  <div key={day.day} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                      <h4 className="font-black text-slate-800">Ngày {day.day}: {day.title}</h4>
                      <span className="text-xs font-bold text-sky-600">{formatCurrency(day.total)}</span>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {day.activities.map((a, i) => (
                        <div key={i} className="px-5 py-3.5 flex items-center gap-4">
                          <div className="text-xs text-slate-400 font-bold w-12 shrink-0">{a.time}</div>
                          <span className="text-xl">{a.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800 leading-tight">{a.desc}</p>
                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded mt-0.5 inline-block ${typeColors[a.type]}`}>{a.type}</span>
                          </div>
                          <div className="text-sm font-bold text-slate-600 shrink-0">
                            {a.cost > 0 ? formatCurrency(a.cost) : 'Miễn phí'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

