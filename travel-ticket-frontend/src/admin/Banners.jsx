import { useState, useEffect } from "react";
import { 
  Image as ImageIcon, Plus, Search, Edit3, Trash2, 
  CheckCircle2, XCircle, RefreshCw, X, Link as LinkIcon, Eye
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_BANNERS = [
  {
    id: 1,
    title: "Mùa Thu Đông Bắc Á: Săn Lá Đỏ Hàn Quốc - Nhật Bản Giảm 35%",
    position: "Trang Chủ - Hero Slider",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200",
    targetUrl: "/tours?destination=Japan",
    order: 1,
    clicks: 3420,
    status: "active"
  },
  {
    id: 2,
    title: "Flash Sale 11.11: Vé Cáp Treo Bà Nà Hills Mua 1 Tặng 1 Buffet",
    position: "Trang Vé Vui Chơi - Top Banner",
    imageUrl: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=1200",
    targetUrl: "/tickets?attraction=BanaHills",
    order: 2,
    clicks: 2190,
    status: "active"
  },
  {
    id: 3,
    title: "Phú Quốc Cano 4 Đảo Siêu Tốc Giảm 20% Cho Nhóm Bạn",
    position: "Trang Tour - Banner Quảng Cáo",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
    targetUrl: "/tour/2",
    order: 3,
    clicks: 1480,
    status: "active"
  }
];

export default function Banners() {
  const [banners, setBanners] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_banners");
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    position: "Trang Chủ - Hero Slider",
    imageUrl: "",
    targetUrl: "/tours",
    order: 1,
    status: "active"
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_banners", JSON.stringify(banners));
  }, [banners]);

  const handleOpenAdd = () => {
    setEditingBanner(null);
    setFormData({
      title: "",
      position: "Trang Chủ - Hero Slider",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
      targetUrl: "/tours",
      order: banners.length + 1,
      status: "active"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b) => {
    setEditingBanner(b);
    setFormData({
      title: b.title,
      position: b.position,
      imageUrl: b.imageUrl,
      targetUrl: b.targetUrl,
      order: b.order,
      status: b.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) {
      toast.error("Vui lòng nhập tiêu đề và link ảnh banner!");
      return;
    }

    if (editingBanner) {
      setBanners(banners.map(b => b.id === editingBanner.id ? { ...b, ...formData } : b));
      toast.success("Cập nhật banner thành công!");
    } else {
      const newB = {
        id: Date.now(),
        ...formData,
        clicks: 0
      };
      setBanners([...banners, newB]);
      toast.success("Thêm banner quảng cáo mới thành công!");
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id) => {
    setBanners(banners.map(b => {
      if (b.id === id) {
        const next = b.status === "active" ? "inactive" : "active";
        toast.success(`Đã đổi trạng thái banner sang: ${next === "active" ? "Hiển thị" : "Tạm ẩn"}`);
        return { ...b, status: next };
      }
      return b;
    }));
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Bạn có chắc muốn xóa banner "${title}"?`)) {
      setBanners(banners.filter(b => b.id !== id));
      toast.success("Đã xóa banner!");
    }
  };

  const filtered = banners.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <ImageIcon className="text-sky-600" size={28} />
            Quản Lý Banner & Slider Quảng Cáo
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Điều chỉnh hình ảnh hero slider trang chủ, banner khuyến mãi trang tour và theo dõi lượt click
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_banners");
              setBanners(INITIAL_BANNERS);
              toast.success("Đã khôi phục dữ liệu banner chuẩn!");
            }}
            className="p-2.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            title="Làm mới"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition cursor-pointer"
          >
            <Plus size={18} />
            Thêm Banner Mới
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(b => (
          <div key={b.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:border-sky-300 hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2.5 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold rounded-lg">
                  {b.position}
                </span>
                <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold ${b.status === "active" ? "bg-emerald-500 text-white" : "bg-slate-400 text-white"}`}>
                  {b.status === "active" ? "Hiển thị" : "Đang ẩn"}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-bold text-slate-800 text-sm line-clamp-2 leading-snug">{b.title}</h3>
                <div className="text-xs text-slate-500 flex items-center gap-1 truncate font-mono">
                  <LinkIcon size={12} className="text-sky-600 shrink-0" />
                  {b.targetUrl}
                </div>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">
                👁️ {b.clicks.toLocaleString()} lượt click
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleToggleStatus(b.id)}
                  className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition"
                  title="Bật/Tắt hiển thị"
                >
                  {b.status === "active" ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                </button>
                <button
                  onClick={() => handleOpenEdit(b)}
                  className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(b.id, b.title)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-5 space-y-4 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-slate-800 text-lg">
              {editingBanner ? "Sửa Banner Quảng Cáo" : "Thêm Banner Quảng Cáo Mới"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tiêu Đề Banner *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Giờ Vàng Săn Tour Đà Nẵng"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Vị Trí Hiển Thị</label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                >
                  <option value="Trang Chủ - Hero Slider">Trang Chủ - Hero Slider</option>
                  <option value="Trang Vé Vui Chơi - Top Banner">Trang Vé Vui Chơi - Top Banner</option>
                  <option value="Trang Tour - Banner Quảng Cáo">Trang Tour - Banner Quảng Cáo</option>
                  <option value="Sidebar - Góc Quảng Cáo Nhỏ">Sidebar - Góc Quảng Cáo Nhỏ</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">URL Hình Ảnh Banner *</label>
                <input
                  type="text"
                  required
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Đường Dẫn Đích</label>
                  <input
                    type="text"
                    value={formData.targetUrl}
                    onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Thứ Tự Ưu Tiên</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 font-bold rounded-xl text-sm"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-sky-600 text-white font-bold rounded-xl text-sm"
                >
                  Lưu Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
