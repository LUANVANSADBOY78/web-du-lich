import { useState } from "react";
import { Plus, Edit, Trash2, GripVertical, CheckSquare, Square, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

export default function TourCollections() {
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Tour Nhật Bản và Hàn Quốc",
      subtitle: "Văn hóa, ẩm thực và cảnh sắc đặc trưng theo từng mùa",
      visible: true,
      tours: [
        { id: "t1", name: "Tour Hàn Quốc 5N4Đ" },
        { id: "t2", name: "Tour Nhật Bản 6N5Đ" },
        { id: "t3", name: "Tour Hàn Quốc mùa thu" }
      ]
    },
    {
      id: 2,
      title: "Mùa Thu Vàng",
      subtitle: "Khám phá sắc thu lãng mạn khắp thế giới",
      visible: true,
      tours: [
        { id: "t4", name: "Tour Bắc Kinh - Thượng Hải" },
        { id: "t5", name: "Tour Châu Âu 9N8Đ" }
      ]
    }
  ]);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Bộ Sưu Tập Tour</h1>
          <p className="text-slate-500 text-sm mt-1">Quản lý các Section / Chuyên đề tour hiển thị trên trang chủ</p>
        </div>
        <button className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 shadow-sm transition">
          <Plus size={18} /> THÊM SECTION
        </button>
      </div>

      <div className="grid gap-6">
        {sections.map((section, index) => (
          <div key={section.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            
            {/* Section Header */}
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GripVertical className="text-slate-400 cursor-grab active:cursor-grabbing" size={20} />
                <div>
                  <h3 className="font-bold text-lg text-slate-900 leading-none">{section.title}</h3>
                  <p className="text-slate-500 text-xs mt-1">{section.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-slate-500 hover:bg-slate-200 p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition">
                  {section.visible ? <Eye size={14} /> : <EyeOff size={14} />} {section.visible ? 'HIỆN' : 'ẨN'}
                </button>
                <button className="text-sky-600 hover:bg-sky-50 p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition">
                  <Edit size={14} /> SỬA
                </button>
                <button className="text-red-600 hover:bg-red-50 p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition">
                  <Trash2 size={14} /> XÓA
                </button>
              </div>
            </div>

            {/* Section Body */}
            <div className="p-4">
              <div className="text-xs font-bold text-slate-400 uppercase mb-3">Tour hiển thị ({section.tours.length})</div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.tours.map(tour => (
                  <div key={tour.id} className="flex items-center gap-2 p-2.5 border border-slate-200 rounded-xl bg-slate-50 hover:border-sky-300 transition cursor-pointer">
                    <CheckSquare size={16} className="text-sky-600" />
                    <span className="font-semibold text-sm text-slate-700 truncate">{tour.name}</span>
                  </div>
                ))}
                
                <div className="flex items-center justify-center gap-2 p-2.5 border border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 transition cursor-pointer text-slate-500">
                  <Plus size={16} />
                  <span className="font-semibold text-sm">Thêm Tour</span>
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
