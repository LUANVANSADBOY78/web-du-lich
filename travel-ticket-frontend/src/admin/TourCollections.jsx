import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, GripVertical, CheckSquare, Eye, EyeOff, X, Layers, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_SECTIONS = [
  {
    id: 1,
    title: "Tour Nhật Bản và Hàn Quốc",
    subtitle: "Văn hóa, ẩm thực và cảnh sắc đặc trưng theo từng mùa",
    visible: true,
    tours: [
      { id: "t1", name: "Tour Hàn Quốc 5N4Đ Mùa Thu Vàng" },
      { id: "t2", name: "Tour Nhật Bản 6N5Đ Cung Đường Vàng" },
      { id: "t3", name: "Tour Hàn Quốc Đảo Nami - Everland" }
    ]
  },
  {
    id: 2,
    title: "Mùa Thu Vàng Rực Rỡ",
    subtitle: "Khám phá sắc thu lãng mạn khắp thế giới",
    visible: true,
    tours: [
      { id: "t4", name: "Tour Bắc Kinh - Thượng Hải - Hàng Châu 7N6Đ" },
      { id: "t5", name: "Tour Châu Âu 5 Nước 9N8Đ" }
    ]
  },
  {
    id: 3,
    title: "Tour Trong Nước Khuyến Mãi Hot",
    subtitle: "Khám phá vẻ đẹp Việt Nam với chi phí tối ưu",
    visible: true,
    tours: [
      { id: "t6", name: "Tour Đà Nẵng - Hội An - Bà Nà 4N3Đ" },
      { id: "t7", name: "Tour Phú Quốc Cano 4 Đảo 3N2Đ" },
      { id: "t8", name: "Tour Sapa Đỉnh Fansipan 3N2Đ" }
    ]
  }
];

const AVAILABLE_SAMPLE_TOURS = [
  { id: "t10", name: "Tour Miền Tây Chợ Nổi Cái Răng 2N1Đ" },
  { id: "t11", name: "Tour Singapore - Malaysia 5N4Đ Đẳng Cấp" },
  { id: "t12", name: "Tour Thái Lan Bangkok - Pattaya 5N4Đ" },
  { id: "t13", name: "Tour Cửu Trại Câu Trung Quốc 6N5Đ Mùa Thu" },
  { id: "t14", name: "Tour Du Thuyền 5 Sao Genting Dream Singapore" },
  { id: "t15", name: "Tour Tây Ninh Cáp Treo Núi Bà Đen Trong Ngày" }
];

export default function TourCollections() {
  const [sections, setSections] = useState(() => {
    try {
      const saved = localStorage.getItem('gotravel_admin_sections');
      return saved ? JSON.parse(saved) : INITIAL_SECTIONS;
    } catch {
      return INITIAL_SECTIONS;
    }
  });

  const [showSectionModal, setShowSectionModal] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [sectionForm, setSectionForm] = useState({ title: '', subtitle: '', visible: true });

  const [showAddTourModal, setShowAddTourModal] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [selectedTourName, setSelectedTourName] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('gotravel_admin_sections', JSON.stringify(sections));
    } catch (e) {
      console.error(e);
    }
  }, [sections]);

  // Section Modal Handlers
  const handleOpenAddSection = () => {
    setEditingSection(null);
    setSectionForm({ title: '', subtitle: '', visible: true });
    setShowSectionModal(true);
  };

  const handleOpenEditSection = (sec) => {
    setEditingSection(sec);
    setSectionForm({ title: sec.title, subtitle: sec.subtitle, visible: sec.visible });
    setShowSectionModal(true);
  };

  const handleSaveSection = (e) => {
    e.preventDefault();
    if (!sectionForm.title.trim()) {
      toast.warning('Vui lòng nhập tiêu đề Section!');
      return;
    }

    if (editingSection) {
      setSections(prev => prev.map(s => s.id === editingSection.id ? { ...s, ...sectionForm } : s));
      toast.success(`Đã cập nhật Section: "${sectionForm.title}"`);
    } else {
      const newSec = {
        id: Date.now(),
        ...sectionForm,
        tours: []
      };
      setSections(prev => [newSec, ...prev]);
      toast.success(`Đã thêm mới Section: "${sectionForm.title}"`);
    }
    setShowSectionModal(false);
  };

  const handleDeleteSection = (id, title) => {
    if (window.confirm(`Bạn có chắc muốn xóa Section "${title}" khỏi trang chủ?`)) {
      setSections(prev => prev.filter(s => s.id !== id));
      toast.info(`Đã xóa Section: ${title}`);
    }
  };

  const handleToggleVisible = (id) => {
    setSections(prev => prev.map(s => {
      if (s.id === id) {
        const nextState = !s.visible;
        toast.info(`Section đã ${nextState ? 'HIỂN THỊ' : 'ẨN'} trên trang chủ.`);
        return { ...s, visible: nextState };
      }
      return s;
    }));
  };

  // Add Tour to Section
  const handleOpenAddTour = (sectionId) => {
    setActiveSectionId(sectionId);
    setSelectedTourName(AVAILABLE_SAMPLE_TOURS[0].name);
    setShowAddTourModal(true);
  };

  const handleSaveAddTour = (e) => {
    e.preventDefault();
    if (!selectedTourName) return;

    setSections(prev => prev.map(s => {
      if (s.id === activeSectionId) {
        const newTourItem = {
          id: `t-${Date.now()}`,
          name: selectedTourName
        };
        return { ...s, tours: [...s.tours, newTourItem] };
      }
      return s;
    }));

    toast.success(`Đã gán "${selectedTourName}" vào bộ sưu tập!`);
    setShowAddTourModal(false);
  };

  const handleRemoveTourFromSection = (sectionId, tourId, tourName) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        return { ...s, tours: s.tours.filter(t => t.id !== tourId) };
      }
      return s;
    }));
    toast.info(`Đã gỡ "${tourName}" khỏi section.`);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Bộ Sưu Tập Tour Trang Chủ</h1>
          <p className="text-slate-500 text-sm mt-1">Quản lý và sắp xếp các Section / Chuyên đề tour hiển thị ngoài trang chủ</p>
        </div>
        <button 
          onClick={handleOpenAddSection}
          className="bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 shadow-sm transition cursor-pointer"
        >
          <Plus size={18} /> THÊM SECTION MỚI
        </button>
      </div>

      <div className="grid gap-6">
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            
            {/* Section Header */}
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <GripVertical className="text-slate-400 cursor-grab" size={20} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-slate-900 leading-none">{section.title}</h3>
                    {!section.visible && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-600">Đang ẩn</span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs mt-1">{section.subtitle}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button 
                  onClick={() => handleToggleVisible(section.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                    section.visible 
                      ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100' 
                      : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                  }`}
                  title="Bật/Tắt hiển thị ngoài trang chủ"
                >
                  {section.visible ? <Eye size={14} /> : <EyeOff size={14} />} 
                  {section.visible ? 'HIỆN' : 'ẨN'}
                </button>

                <button 
                  onClick={() => handleOpenEditSection(section)}
                  className="text-sky-600 hover:bg-sky-50 px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                >
                  <Edit3 size={14} /> SỬA
                </button>

                <button 
                  onClick={() => handleDeleteSection(section.id, section.title)}
                  className="text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                >
                  <Trash2 size={14} /> XÓA
                </button>
              </div>
            </div>

            {/* Section Body */}
            <div className="p-4">
              <div className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center justify-between">
                <span>Tour hiển thị trong Section ({section.tours.length})</span>
                <span className="text-[11px] text-sky-600 font-semibold">Tự động đồng bộ với trang chủ</span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.tours.map(tour => (
                  <div 
                    key={tour.id} 
                    className="flex items-center justify-between gap-2 p-2.5 border border-slate-200 rounded-xl bg-slate-50 hover:border-sky-300 transition group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <CheckSquare size={16} className="text-sky-600 shrink-0" />
                      <span className="font-semibold text-sm text-slate-800 truncate">{tour.name}</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveTourFromSection(section.id, tour.id, tour.name)}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-1 transition"
                      title="Gỡ tour này"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                {/* Nút Thêm Tour Vào Section */}
                <button
                  type="button"
                  onClick={() => handleOpenAddTour(section.id)}
                  className="flex items-center justify-center gap-2 p-2.5 border border-dashed border-sky-300 rounded-xl bg-sky-50/50 hover:bg-sky-100/50 transition cursor-pointer text-sky-700 font-bold text-sm"
                >
                  <Plus size={16} />
                  <span>+ Thêm Tour Vào Section</span>
                </button>
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {/* Modal Thêm / Sửa Section */}
      {showSectionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-lg">
                {editingSection ? 'Chỉnh Sửa Bộ Sưu Tập Tour' : 'Thêm Section Trang Chủ Mới'}
              </h3>
              <button onClick={() => setShowSectionModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveSection} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tiêu Đề Section (*)</label>
                <input 
                  type="text" 
                  required
                  placeholder="VD: Tour Đông Bắc Mùa Lúa Chín"
                  value={sectionForm.title}
                  onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả phụ</label>
                <input 
                  type="text" 
                  placeholder="VD: Khám phá ruộng bậc thang kỳ vĩ tại Mù Cang Chải..."
                  value={sectionForm.subtitle}
                  onChange={(e) => setSectionForm({ ...sectionForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox"
                  id="sectionVisible"
                  checked={sectionForm.visible}
                  onChange={(e) => setSectionForm({ ...sectionForm, visible: e.target.checked })}
                  className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500 cursor-pointer"
                />
                <label htmlFor="sectionVisible" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Hiển thị ngay trên trang chủ khách hàng
                </label>
              </div>

              <div className="pt-2 flex gap-2 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowSectionModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold shadow transition"
                >
                  {editingSection ? 'Lưu Thay Đổi' : 'Tạo Section'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Thêm Tour Vào Section */}
      {showAddTourModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-lg">Gán Tour Vào Bộ Sưu Tập</h3>
              <button onClick={() => setShowAddTourModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAddTour} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Chọn Tour Cần Gán Vào Section</label>
                <select 
                  value={selectedTourName}
                  onChange={(e) => setSelectedTourName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                >
                  {AVAILABLE_SAMPLE_TOURS.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex gap-2 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowAddTourModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition"
                >
                  Đóng
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold shadow transition"
                >
                  Xác Nhận Thêm Tour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
