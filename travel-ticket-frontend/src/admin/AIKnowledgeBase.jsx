import { useState, useEffect } from 'react';
import { 
  Database, Plus, Search, FileText, Trash2, Edit3, 
  RefreshCw, CheckCircle, Clock, X, Eye, Sparkles, BookOpen 
} from 'lucide-react';
import { toast } from 'react-toastify';

const INITIAL_DOCS = [
  { id: 1, title: 'Chính sách hoàn/hủy vé và đổi ngày tour 2026', category: 'Chính sách', updatedAt: '01/10/2026', status: 'Đã Train', content: 'Khách hàng được hoàn 100% tiền cọc nếu hủy tour trước 15 ngày khởi hành. Trường hợp bất khả kháng (thiên tai, dịch bệnh) sẽ được bảo lưu hoặc hoàn tiền theo quy định hàng không.' },
  { id: 2, title: 'Hướng dẫn thanh toán VNPay / Thẻ tín dụng & Momo', category: 'Hướng dẫn', updatedAt: '28/09/2026', status: 'Đã Train', content: 'Hệ thống hỗ trợ thanh toán qua cổng VNPay-QR, thẻ ATM nội địa của hơn 30 ngân hàng, thẻ quốc tế Visa/Mastercard và ví Momo với mã giảm giá tự động áp dụng.' },
  { id: 3, title: 'Quy định hành lý máy bay & thủ tục Visa các nước', category: 'Thủ tục', updatedAt: '15/09/2026', status: 'Đã Train', content: 'Tour quốc tế tiêu chuẩn bao gồm 20kg - 23kg hành lý ký gửi và 7kg hành lý xách tay. Thủ tục visa Nhật Bản, Hàn Quốc được GoTravel hỗ trợ chuẩn bị và nộp hồ sơ trọn gói.' },
  { id: 4, title: 'Chính sách bảo hiểm du lịch quốc tế Bảo Việt 2026', category: 'Bảo hiểm', updatedAt: '10/09/2026', status: 'Đã Train', content: 'Mọi du khách tham gia tour GoTravel đều được cấp bảo hiểm du lịch quốc tế với hạn mức bồi thường lên tới 1.000.000.000 VNĐ/người/vụ.' }
];

export default function AIKnowledgeBase() {
  const [docs, setDocs] = useState(() => {
    try {
      const saved = localStorage.getItem('gotravel_admin_ai_docs');
      return saved ? JSON.parse(saved) : INITIAL_DOCS;
    } catch {
      return INITIAL_DOCS;
    }
  });

  const [search, setSearch] = useState('');
  const [syncSources, setSyncSources] = useState({
    tours: true,
    tickets: true,
    promos: true
  });
  const [isSyncing, setIsSyncing] = useState(false);

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [docForm, setDocForm] = useState({ title: '', category: 'Chính sách', content: '', status: 'Đã Train' });

  const [viewingDoc, setViewingDoc] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('gotravel_admin_ai_docs', JSON.stringify(docs));
    } catch (e) {
      console.error(e);
    }
  }, [docs]);

  // Toggle sync sources
  const handleToggleSync = (sourceKey, title) => {
    setSyncSources(prev => {
      const next = !prev[sourceKey];
      toast.info(`Đã ${next ? 'BẬT' : 'TẮT'} đồng bộ tự động: ${title}`);
      return { ...prev, [sourceKey]: next };
    });
  };

  // Sync now button
  const handleSyncNow = () => {
    setIsSyncing(true);
    toast.info('Đang đồng bộ và nạp dữ liệu vào mô hình AI...');
    setTimeout(() => {
      setIsSyncing(false);
      toast.success('Đã đồng bộ thành công dữ liệu Tour, Vé vui chơi & Khuyến mãi vào AI Chatbot!');
    }, 1500);
  };

  // Document modal handlers
  const handleOpenAdd = () => {
    setEditingDoc(null);
    setDocForm({ title: '', category: 'Chính sách', content: '', status: 'Đã Train' });
    setShowModal(true);
  };

  const handleOpenEdit = (doc) => {
    setEditingDoc(doc);
    setDocForm({ title: doc.title, category: doc.category || 'Chính sách', content: doc.content || '', status: doc.status });
    setShowModal(true);
  };

  const handleSaveDoc = (e) => {
    e.preventDefault();
    if (!docForm.title.trim()) {
      toast.warning('Vui lòng nhập tên tài liệu!');
      return;
    }

    if (editingDoc) {
      setDocs(prev => prev.map(d => d.id === editingDoc.id ? { 
        ...d, 
        ...docForm, 
        updatedAt: 'Vừa xong' 
      } : d));
      toast.success(`Đã cập nhật tài liệu AI: "${docForm.title}"`);
    } else {
      const newDoc = {
        id: Date.now(),
        ...docForm,
        updatedAt: 'Vừa xong'
      };
      setDocs(prev => [newDoc, ...prev]);
      toast.success(`Đã thêm tài liệu mới vào Knowledge Base: "${docForm.title}"`);
    }
    setShowModal(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Bạn có chắc muốn xóa tài liệu AI "${title}"?`)) {
      setDocs(prev => prev.filter(d => d.id !== id));
      toast.info(`Đã xóa tài liệu: ${title}`);
    }
  };

  const filteredDocs = docs.filter(d => 
    d.title.toLowerCase().includes(search.toLowerCase()) || 
    (d.content && d.content.toLowerCase().includes(search.toLowerCase())) ||
    (d.category && d.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 font-sans space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            Knowledge Base (AI Dữ Liệu)
            <Sparkles size={20} className="text-amber-500" />
          </h1>
          <p className="text-sm text-slate-500 mt-1">Huấn luyện AI với các tài liệu, chính sách, và dữ liệu đặc thù của hệ thống GoTravel</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm transition cursor-pointer"
        >
          <Plus size={18} />
          Thêm Tài Liệu Mới
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sync Sources */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Database size={18} className="text-sky-500" />
              Nguồn Dữ Liệu Tự Động
            </h3>
            
            <div className="space-y-3">
              {/* Tour sync */}
              <div 
                onClick={() => handleToggleSync('tours', 'Dữ liệu Tour')}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100/70 transition"
              >
                <div>
                  <div className="font-bold text-sm text-slate-700">Dữ liệu Tour Du Lịch</div>
                  <div className="text-xs text-slate-500">Đồng bộ giá, lịch trình, điểm đến</div>
                </div>
                <div className={`w-11 h-6 rounded-full relative transition-colors ${syncSources.tours ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${syncSources.tours ? 'right-0.5' : 'left-0.5'}`}></div>
                </div>
              </div>

              {/* Ticket sync */}
              <div 
                onClick={() => handleToggleSync('tickets', 'Dữ liệu Vé Vui Chơi')}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100/70 transition"
              >
                <div>
                  <div className="font-bold text-sm text-slate-700">Dữ liệu Vé Vui Chơi</div>
                  <div className="text-xs text-slate-500">Bà Nà, VinWonders, Sun World</div>
                </div>
                <div className={`w-11 h-6 rounded-full relative transition-colors ${syncSources.tickets ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${syncSources.tickets ? 'right-0.5' : 'left-0.5'}`}></div>
                </div>
              </div>

              {/* Promo sync */}
              <div 
                onClick={() => handleToggleSync('promos', 'Chương Trình Khuyến Mãi')}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100/70 transition"
              >
                <div>
                  <div className="font-bold text-sm text-slate-700">Chương Trình Khuyến Mãi</div>
                  <div className="text-xs text-slate-500">Voucher & Mã giảm giá Flash Sale</div>
                </div>
                <div className={`w-11 h-6 rounded-full relative transition-colors ${syncSources.promos ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${syncSources.promos ? 'right-0.5' : 'left-0.5'}`}></div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="mt-4 w-full py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-700 text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} />
              {isSyncing ? "Đang huấn luyện AI..." : "Đồng Bộ Ngay (Sync Now)"}
            </button>
          </div>
        </div>

        {/* Custom Docs */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h3 className="font-bold text-slate-800 text-base">Tài Liệu Thủ Công ({filteredDocs.length})</h3>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Tìm tài liệu theo tên, nội dung..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
            
            <div className="p-2 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-500 text-xs uppercase tracking-wider">
                    <th className="p-3 font-bold">Tên tài liệu</th>
                    <th className="p-3 font-bold">Danh mục</th>
                    <th className="p-3 font-bold">Cập nhật</th>
                    <th className="p-3 font-bold text-center">Trạng thái</th>
                    <th className="p-3 font-bold text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredDocs.map(doc => (
                    <tr key={doc.id} className="border-t border-slate-100 hover:bg-slate-50/70 transition">
                      <td className="p-3">
                        <div 
                          onClick={() => setViewingDoc(doc)}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <FileText size={16} className="text-sky-500 shrink-0" />
                          <span className="font-bold text-slate-700 group-hover:text-sky-600 transition line-clamp-1">{doc.title}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600">
                          {doc.category || 'Tài liệu'}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 text-xs whitespace-nowrap">{doc.updatedAt}</td>
                      <td className="p-3 text-center">
                        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-bold border border-emerald-200">
                          {doc.status}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-1">
                          <button 
                            onClick={() => setViewingDoc(doc)}
                            className="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg hover:bg-slate-100 transition"
                            title="Xem chi tiết"
                          >
                            <Eye size={15} />
                          </button>
                          <button 
                            onClick={() => handleOpenEdit(doc)}
                            className="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg hover:bg-slate-100 transition"
                            title="Sửa tài liệu"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button 
                            onClick={() => handleDelete(doc.id, doc.title)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition"
                            title="Xóa tài liệu"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredDocs.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm">
                  Không tìm thấy tài liệu nào phù hợp.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Thêm / Sửa Tài Liệu */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-lg">
                {editingDoc ? 'Chỉnh Sửa Tài Liệu AI' : 'Thêm Tài Liệu Mới Vào AI'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveDoc} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên tài liệu / Tiêu đề (*)</label>
                <input 
                  type="text" 
                  required
                  placeholder="VD: Chính sách đưa đón sân bay và giờ check-in..."
                  value={docForm.title}
                  onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Danh mục tài liệu</label>
                <select 
                  value={docForm.category}
                  onChange={(e) => setDocForm({ ...docForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                >
                  <option value="Chính sách">Chính sách & Quy định</option>
                  <option value="Hướng dẫn">Hướng dẫn thanh toán / Đặt vé</option>
                  <option value="Thủ tục">Thủ tục Visa / Giấy tờ</option>
                  <option value="Bảo hiểm">Bảo hiểm du lịch</option>
                  <option value="Hỏi đáp thường gặp">Hỏi đáp thường gặp (FAQ)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung chi tiết cho AI huấn luyện</label>
                <textarea 
                  rows={5}
                  required
                  placeholder="Nhập nội dung đầy đủ để chatbot học và trả lời khách hàng chính xác nhất..."
                  value={docForm.content}
                  onChange={(e) => setDocForm({ ...docForm, content: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-2 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold shadow transition"
                >
                  {editingDoc ? 'Lưu Thay Đổi' : 'Nạp Vào AI'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xem Chi Tiết Tài Liệu */}
      {viewingDoc && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-sky-600" />
                <h3 className="font-black text-slate-900 text-base">{viewingDoc.title}</h3>
              </div>
              <button onClick={() => setViewingDoc(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>Danh mục: <strong className="text-slate-800">{viewingDoc.category}</strong></span>
                <span>•</span>
                <span>Cập nhật: <strong>{viewingDoc.updatedAt}</strong></span>
                <span>•</span>
                <span className="text-emerald-600 font-bold">✓ Đã huấn luyện vào AI</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                {viewingDoc.content}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                onClick={() => setViewingDoc(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
