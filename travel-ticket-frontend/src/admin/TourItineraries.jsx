import { useState } from 'react';
import { Clock, MapPin, Plus, Edit3, Trash2, Calendar, Coffee, Utensils, Bed, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const INITIAL_ITINERARIES = [
  {
    tourName: "Tour Nhật Bản 6N5Đ Mùa Thu Vàng",
    days: [
      { day: 1, title: "Hà Nội - Tokyo (Bay Vietnam Airlines)", desc: "Đoàn tập trung tại sân bay Nội Bài, đáp chuyến bay đi Tokyo. Đến sân bay Narita xe đón đoàn về khách sạn nghỉ ngơi.", meals: "Tối trên máy bay", hotel: "Khách sạn 4 sao Tokyo" },
      { day: 2, title: "Tokyo - Núi Phú Sĩ - Làng Cổ Oshino Hakkai", desc: "Tham quan biểu tượng Núi Phú Sĩ tráng lệ, ghé thăm làng cổ dưới chân núi nước trong vắt, trải nghiệm tắm khoáng nóng Onsen truyền thống.", meals: "Sáng / Trưa / Tối (Bò Wagyu)", hotel: "Resort Onsen Phú Sĩ" },
      { day: 3, title: "Hồ Kawaguchiko - Thung lũng Owakudani - Kyoto", desc: "Ngắm lá phong đỏ Momiji ven hồ Kawaguchiko, thưởng thức trứng đen trường thọ tại thung lũng núi lửa Owakudani, trải nghiệm tàu siêu tốc Shinkansen tới Kyoto.", meals: "Sáng / Trưa / Tối", hotel: "Khách sạn 4 sao Kyoto" },
      { day: 4, title: "Kyoto - Rừng Trúc Arashiyama - Chùa Vàng Kinkakuji - Osaka", desc: "Dạo bước giữa rừng trúc xanh rì Arashiyama, chiêm bái Chùa Vàng rực rỡ soi bóng mặt nước, di chuyển về Osaka tự do mua sắm tại phố Shinsaibashi.", meals: "Sáng / Trưa / Tối (Lẩu Cua Tuyết)", hotel: "Khách sạn 4 sao Osaka" },
      { day: 5, title: "Lâu Đài Osaka - Mua sắm Dotonbori", desc: "Chụp ảnh kỷ niệm tại Lâu Đài Osaka tráng lệ, thưởng thức ẩm thực đường phố bánh bạch tuộc Takoyaki tại Dotonbori.", meals: "Sáng / Trưa", hotel: "Khách sạn 4 sao Osaka" },
      { day: 6, title: "Osaka (Sân bay Kansai) - Hà Nội", desc: "Xe đưa đoàn ra sân bay quốc tế Kansai làm thủ tục đáp chuyến bay về Việt Nam. Kết thúc chuyến đi tốt đẹp.", meals: "Sáng", hotel: "Về Việt Nam" }
    ]
  }
];

export default function TourItineraries() {
  const [selectedTour, setSelectedTour] = useState(INITIAL_ITINERARIES[0]);
  const [days, setDays] = useState(INITIAL_ITINERARIES[0].days);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDay, setNewDay] = useState({ title: '', desc: '', meals: 'Sáng / Trưa / Tối', hotel: 'Khách sạn 4 sao' });

  const handleAddDay = (e) => {
    e.preventDefault();
    if (!newDay.title.trim()) {
      toast.warning('Vui lòng nhập tiêu đề ngày!');
      return;
    }
    const dayItem = {
      day: days.length + 1,
      ...newDay
    };
    setDays([...days, dayItem]);
    toast.success(`Đã thêm Ngày ${dayItem.day} vào lịch trình!`);
    setShowAddModal(false);
    setNewDay({ title: '', desc: '', meals: 'Sáng / Trưa / Tối', hotel: 'Khách sạn 4 sao' });
  };

  const handleDeleteDay = (dayNum) => {
    if (window.confirm(`Xóa lịch trình Ngày ${dayNum}?`)) {
      setDays(days.filter(d => d.day !== dayNum).map((d, idx) => ({ ...d, day: idx + 1 })));
      toast.info(`Đã xóa Ngày ${dayNum}`);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Quản Lý Lịch Trình Chi Tiết Tour</h1>
          <p className="text-slate-500 text-sm mt-1">Lập và cấu hình lịch trình từng ngày cho các tour du lịch</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 text-sm shadow transition cursor-pointer"
        >
          <Plus size={18} /> Thêm Ngày Mới
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Đang xem lịch trình của:</label>
        <select 
          className="w-full sm:w-96 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-sky-500"
          value={selectedTour.tourName}
          onChange={(e) => {}}
        >
          <option value="Tour Nhật Bản 6N5Đ Mùa Thu Vàng">Tour Nhật Bản 6N5Đ Mùa Thu Vàng (6 Ngày)</option>
          <option value="Tour Hàn Quốc 5N4Đ Đảo Nami - Everland">Tour Hàn Quốc 5N4Đ Đảo Nami - Everland (5 Ngày)</option>
          <option value="Tour Đà Nẵng - Hội An - Bà Nà Hills 4N3Đ">Tour Đà Nẵng - Hội An - Bà Nà Hills 4N3Đ (4 Ngày)</option>
        </select>
      </div>

      {/* Itinerary Timeline */}
      <div className="space-y-4">
        {days.map((item) => (
          <div key={item.day} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 hover:border-sky-300 transition flex flex-col md:flex-row gap-5">
            <div className="flex items-center md:items-start gap-3 md:w-36 shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white font-black text-lg flex items-center justify-center shadow-md">
                N{item.day}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase">Lịch trình</span>
                <div className="font-black text-slate-800 text-sm">Ngày {item.day}</div>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                <button 
                  onClick={() => handleDeleteDay(item.day)}
                  className="text-slate-400 hover:text-red-500 p-1 transition"
                  title="Xóa ngày này"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                  <Utensils size={13} className="text-amber-500" />
                  <span>Bữa ăn: <strong>{item.meals}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                  <Bed size={13} className="text-sky-500" />
                  <span>Nghỉ đêm: <strong>{item.hotel}</strong></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="font-black text-slate-900 text-lg">Thêm Lịch Trình Ngày {days.length + 1}</h3>
            <form onSubmit={handleAddDay} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tiêu đề ngày (*)</label>
                <input 
                  type="text" 
                  required
                  placeholder="VD: Tokyo - Tham quan Tháp Truyền Hình Skytree"
                  value={newDay.title}
                  onChange={(e) => setNewDay({ ...newDay, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả chi tiết hoạt động</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Mô tả các điểm ghé thăm, trải nghiệm nổi bật..."
                  value={newDay.desc}
                  onChange={(e) => setNewDay({ ...newDay, desc: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bữa ăn</label>
                  <input 
                    type="text" 
                    value={newDay.meals}
                    onChange={(e) => setNewDay({ ...newDay, meals: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Khách sạn</label>
                  <input 
                    type="text" 
                    value={newDay.hotel}
                    onChange={(e) => setNewDay({ ...newDay, hotel: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
              <div className="pt-2 flex gap-2 justify-end">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold">Hủy</button>
                <button type="submit" className="px-5 py-2 bg-sky-600 text-white rounded-xl font-bold shadow">Lưu Ngày</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
