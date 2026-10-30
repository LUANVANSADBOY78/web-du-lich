import { useState, useEffect } from "react";
import {
  HelpCircle, MessageCircle, Search, Plus, Edit3, Trash2, CheckCircle2,
  Clock, Eye, EyeOff, Sparkles, Send, User, RotateCcw, Pin
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_QNA = [
  {
    id: 1,
    authorName: "Nguyễn Hoàng Nam",
    authorEmail: "hoangnam.travel@gmail.com",
    category: "Tour du lịch",
    question: "Tour Đà Nẵng 4N3Đ đã bao gồm vé cáp treo Bà Nà Hills và ăn trưa buffet trên đỉnh Bà Nà chưa ạ?",
    createdAt: "2026-10-28 09:15",
    status: "answered", // pending, answered
    isPublished: true,
    isPinned: true,
    answer: {
      answeredBy: "CSKH GoTravel (Thảo My)",
      answeredAt: "2026-10-28 10:00",
      content: "Dạ chào anh Nam! Giá tour Đà Nẵng 4N3Đ tại GoTravel ĐÃ BAO GỒM trọn gói vé cáp treo khứ hồi Bà Nà Hills và 01 bữa buffet trưa tiêu chuẩn quốc tế tại nhà hàng Morin trên đỉnh Bà Nà rồi ạ. Anh không cần trả thêm bất kỳ phụ phí nào khi tham quan điểm này."
    }
  },
  {
    id: 2,
    authorName: "Vũ Thanh Hằng",
    authorEmail: "hang.vu@yahoo.com",
    category: "Chính sách hoàn hủy",
    question: "Nếu tôi đặt vé Sun World Hòn Thơm mà hôm đó trời mưa to bão không đi được thì có được hoàn tiền hoặc đổi ngày không?",
    createdAt: "2026-10-29 14:20",
    status: "answered",
    isPublished: true,
    isPinned: false,
    answer: {
      answeredBy: "Admin Quản Trị",
      answeredAt: "2026-10-29 15:30",
      content: "Chào bạn Thanh Hằng! Trong trường hợp thời tiết xấu bất khả kháng hoặc cáp treo tạm ngừng vận hành theo thông báo của Ban quản lý, GoTravel hỗ trợ bạn đổi ngày sử dụng hoàn toàn MIỄN PHÍ hoặc hoàn 100% tiền vé qua tài khoản đã thanh toán trong 24h làm việc ạ."
    }
  },
  {
    id: 3,
    authorName: "Lê Minh Trí",
    authorEmail: "minhtri91@outlook.com",
    category: "Vé vui chơi",
    question: "Vé VinWonders Phú Quốc mua trên GoTravel có cần in ra giấy không hay quét mã QR trên điện thoại là vào cổng được luôn?",
    createdAt: "2026-10-30 08:45",
    status: "answered",
    isPublished: true,
    isPinned: true,
    answer: {
      answeredBy: "CSKH GoTravel (Hải Đăng)",
      answeredAt: "2026-10-30 09:10",
      content: "Chào anh Trí! Vé của GoTravel là vé điện tử trực tiếp (E-ticket). Sau khi thanh toán thành công, hệ thống gửi mã QR về Email và Zalo của anh, anh chỉ cần đưa màn hình điện thoại quét trực tiếp tại cổng kiểm soát là vào được ngay, không cần in giấy ạ."
    }
  },
  {
    id: 4,
    authorName: "Trần Bảo Ngọc",
    authorEmail: "baongoc.pham@gmail.com",
    category: "Tour du lịch",
    question: "Gia đình tôi có bé 3 tuổi và người già 75 tuổi có thích hợp đi tour Vịnh Hạ Long du thuyền ngủ đêm không?",
    createdAt: "2026-10-30 11:10",
    status: "pending",
    isPublished: false,
    isPinned: false,
    answer: null
  },
  {
    id: 5,
    authorName: "Đoàn Quốc Cường",
    authorEmail: "cuongdoan@fpt.edu.vn",
    category: "Thanh toán",
    question: "Tôi có xuất hóa đơn đỏ VAT cho công ty khi mua tour và vé số lượng lớn được không?",
    createdAt: "2026-10-30 11:35",
    status: "pending",
    isPublished: false,
    isPinned: false,
    answer: null
  }
];

export default function QnAManagement() {
  const [qnaList, setQnaList] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_qna");
    return saved ? JSON.parse(saved) : INITIAL_QNA;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedQnA, setSelectedQnA] = useState(null);
  const [answerContent, setAnswerContent] = useState("");
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const [isNewQuestionModalOpen, setIsNewQuestionModalOpen] = useState(false);

  const [newQuestionData, setNewQuestionData] = useState({
    authorName: "",
    authorEmail: "",
    category: "Tour du lịch",
    question: ""
  });

  useEffect(() => {
    localStorage.setItem("gotravel_admin_qna", JSON.stringify(qnaList));
  }, [qnaList]);

  const handleOpenAnswerModal = (item) => {
    setSelectedQnA(item);
    setAnswerContent(item.answer ? item.answer.content : "");
    setIsAnswerModalOpen(true);
  };

  const handleSaveAnswer = (e) => {
    e.preventDefault();
    if (!answerContent.trim()) {
      toast.error("Vui lòng nhập nội dung câu trả lời!");
      return;
    }

    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    setQnaList(
      qnaList.map((q) =>
        q.id === selectedQnA.id
          ? {
              ...q,
              status: "answered",
              isPublished: true,
              answer: {
                answeredBy: "CSKH GoTravel (Admin)",
                answeredAt: timeStr,
                content: answerContent
              }
            }
          : q
      )
    );

    toast.success("Đã đăng câu trả lời và duyệt công khai câu hỏi!");
    setIsAnswerModalOpen(false);
  };

  const handleTogglePublish = (id) => {
    setQnaList(
      qnaList.map((q) =>
        q.id === id ? { ...q, isPublished: !q.isPublished } : q
      )
    );
    toast.info("Đã thay đổi trạng thái hiển thị trên website!");
  };

  const handleTogglePin = (id) => {
    setQnaList(
      qnaList.map((q) =>
        q.id === id ? { ...q, isPinned: !q.isPinned } : q
      )
    );
    toast.success("Đã cập nhật trạng thái ghim nổi bật!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa câu hỏi này khỏi hệ thống?")) {
      setQnaList(qnaList.filter((q) => q.id !== id));
      toast.success("Đã xóa câu hỏi!");
    }
  };

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionData.authorName.trim() || !newQuestionData.question.trim()) {
      toast.error("Vui lòng điền đầy đủ tên và câu hỏi!");
      return;
    }

    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newQ = {
      id: Date.now(),
      ...newQuestionData,
      createdAt: timeStr,
      status: "pending",
      isPublished: false,
      isPinned: false,
      answer: null
    };

    setQnaList([newQ, ...qnaList]);
    toast.success("Đã thêm câu hỏi của khách hàng!");
    setIsNewQuestionModalOpen(false);
    setNewQuestionData({
      authorName: "",
      authorEmail: "",
      category: "Tour du lịch",
      question: ""
    });
  };

  const handleAIAssist = () => {
    if (!selectedQnA) return;
    const cat = selectedQnA.category;
    let template = "";
    if (cat.includes("Tour")) {
      template = `Chào bạn ${selectedQnA.authorName}! Cảm ơn bạn đã quan tâm đến dịch vụ tour của GoTravel. Lịch trình hoàn toàn phù hợp và an toàn cho đoàn gia đình, có hướng dẫn viên hỗ trợ chu đáo tận tình trong suốt chuyến đi. Bạn có thể liên hệ hotline 1900 6868 để nhận lịch trình chi tiết nhé ạ!`;
    } else if (cat.includes("Vé")) {
      template = `Chào bạn ${selectedQnA.authorName}! Vé tham quan trên GoTravel là vé điện tử quét mã QR trực tiếp qua cổng kiểm soát, không cần xếp hàng đổi vé giấy. Vé có giá trị đúng ngày bạn đã chọn và được bảo hiểm du lịch đầy đủ ạ.`;
    } else if (cat.includes("Thanh toán") || cat.includes("hoàn")) {
      template = `Chào bạn ${selectedQnA.authorName}! GoTravel hỗ trợ xuất hóa đơn điện tử VAT đầy đủ theo thông tin doanh nghiệp ngay trong ngày và chính sách hoàn hủy linh hoạt theo điều kiện ban hành ạ.`;
    } else {
      template = `Chào bạn ${selectedQnA.authorName}! Đội ngũ chuyên viên tư vấn GoTravel rất vui lòng hỗ trợ bạn. Bộ phận CSKH sẽ liên hệ với bạn trong ít phút để giải đáp chi tiết nhất nhé ạ.`;
    }
    setAnswerContent(template);
    toast.info("Đã tạo câu trả lời mẫu gợi ý từ AI!");
  };

  const filteredQnA = qnaList.filter((item) => {
    const matchSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.answer && item.answer.content.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    const matchCat = categoryFilter === "all" || item.category === categoryFilter;

    return matchSearch && matchStatus && matchCat;
  });

  const totalCount = qnaList.length;
  const pendingCount = qnaList.filter((q) => q.status === "pending").length;
  const answeredCount = qnaList.filter((q) => q.status === "answered").length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="text-sky-600" /> Quản Lý Hỏi Đáp Du Khách (Q&A)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Tiếp nhận câu hỏi từ khách hàng, phản hồi hỗ trợ tư vấn và duyệt hiển thị lên website
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_qna");
              setQnaList(INITIAL_QNA);
              toast.info("Đã khôi phục dữ liệu hỏi đáp mẫu!");
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition"
          >
            <RotateCcw size={14} /> Mẫu dữ liệu
          </button>
          <button
            onClick={() => setIsNewQuestionModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl shadow-sm transition"
          >
            <Plus size={18} /> Thêm Câu Hỏi Mới
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-slate-500 uppercase">Tổng câu hỏi</span>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{totalCount}</p>
          <span className="text-xs text-sky-600 font-medium">Toàn thời gian</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-amber-500 uppercase">Chờ giải đáp</span>
          <p className="text-2xl font-bold text-amber-500 mt-1">{pendingCount}</p>
          <span className="text-xs text-slate-500">Cần phản hồi ngay</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-emerald-600 uppercase">Đã trả lời</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{answeredCount}</p>
          <span className="text-xs text-slate-500">Đã tư vấn chu đáo</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-semibold text-blue-600 uppercase">Tỷ lệ phản hồi</span>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {totalCount > 0 ? Math.round((answeredCount / totalCount) * 100) : 100}%
          </p>
          <span className="text-xs text-slate-500">Trung bình dưới 30 phút</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo nội dung câu hỏi, tên người hỏi, câu trả lời..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ giải đáp</option>
          <option value="answered">Đã trả lời</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="all">Tất cả chủ đề</option>
          <option value="Tour du lịch">Tour du lịch</option>
          <option value="Vé vui chơi">Vé vui chơi</option>
          <option value="Chính sách hoàn hủy">Chính sách hoàn hủy</option>
          <option value="Thanh toán">Thanh toán</option>
        </select>
      </div>

      {/* QnA List */}
      <div className="space-y-4">
        {filteredQnA.length > 0 ? (
          filteredQnA.map((item) => (
            <div
              key={item.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border transition shadow-sm p-6 space-y-4 ${
                item.isPinned
                  ? "border-amber-300 dark:border-amber-800/80 bg-amber-50/20 dark:bg-amber-950/10"
                  : "border-slate-200 dark:border-slate-800"
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center font-bold">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {item.authorName}
                      </span>
                      {item.isPinned && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400">
                          <Pin size={11} /> Ghim nổi bật
                        </span>
                      )}
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                        {item.category}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock size={12} /> {item.createdAt} • {item.authorEmail}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.status === "answered" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                      <CheckCircle2 size={12} /> Đã trả lời
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 animate-pulse">
                      <Clock size={12} /> Chờ trả lời
                    </span>
                  )}

                  <button
                    onClick={() => handleTogglePublish(item.id)}
                    title={item.isPublished ? "Đang hiện trên web (Nhấn để ẩn)" : "Đang ẩn (Nhấn để hiện)"}
                    className={`p-2 rounded-xl border transition ${
                      item.isPublished
                        ? "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900"
                        : "text-slate-400 bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700"
                    }`}
                  >
                    {item.isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>

                  <button
                    onClick={() => handleTogglePin(item.id)}
                    title={item.isPinned ? "Bỏ ghim" : "Ghim lên đầu trang web"}
                    className={`p-2 rounded-xl border transition ${
                      item.isPinned
                        ? "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-900"
                        : "text-slate-400 bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700"
                    }`}
                  >
                    <Pin size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    title="Xóa câu hỏi"
                    className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-slate-800 dark:text-slate-200 font-medium text-sm border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-sky-600 mr-2">Hỏi:</span>
                {item.question}
              </div>

              {/* Answer Text */}
              {item.answer ? (
                <div className="bg-sky-50/60 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs text-sky-700 dark:text-sky-300 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={14} className="text-sky-500" />
                      Phản hồi bởi: {item.answer.answeredBy}
                    </span>
                    <span className="text-slate-400 font-normal">{item.answer.answeredAt}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.answer.content}
                  </p>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleOpenAnswerModal(item)}
                      className="text-xs font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 flex items-center gap-1"
                    >
                      <Edit3 size={13} /> Sửa câu trả lời
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <button
                    onClick={() => handleOpenAnswerModal(item)}
                    className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium shadow-sm transition"
                  >
                    <Send size={15} /> Trả lời câu hỏi này
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-slate-900 p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400">
            Không tìm thấy câu hỏi hoặc giải đáp nào phù hợp.
          </div>
        )}
      </div>

      {/* Modal Answer */}
      {isAnswerModalOpen && selectedQnA && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <MessageCircle className="text-sky-600" /> Soạn Câu Trả Lời Du Khách
            </h2>
            <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 mb-4 text-xs space-y-1">
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Người hỏi: {selectedQnA.authorName} ({selectedQnA.authorEmail})
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                <span className="font-bold">Câu hỏi:</span> {selectedQnA.question}
              </p>
            </div>

            <form onSubmit={handleSaveAnswer} className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Nội dung phản hồi chính thức từ CSKH
                </label>
                <button
                  type="button"
                  onClick={handleAIAssist}
                  className="flex items-center gap-1.5 text-xs text-sky-600 hover:text-sky-700 font-semibold bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1 rounded-lg border border-sky-200 dark:border-sky-800"
                >
                  <Sparkles size={13} /> Gợi ý mẫu AI
                </button>
              </div>

              <textarea
                rows={5}
                required
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                placeholder="Nhập nội dung giải đáp rõ ràng, tận tình cho khách hàng..."
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 leading-relaxed"
              />

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAnswerModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-sm"
                >
                  <Send size={15} /> Duyệt & Đăng câu trả lời
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Question */}
      {isNewQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Plus className="text-sky-600" /> Thêm Câu Hỏi Mới Của Khách Hàng
            </h2>

            <form onSubmit={handleCreateQuestion} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Họ và tên khách hàng
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Nguyễn Văn A"
                  value={newQuestionData.authorName}
                  onChange={(e) =>
                    setNewQuestionData({ ...newQuestionData, authorName: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Email liên hệ
                </label>
                <input
                  type="email"
                  placeholder="VD: customer@gmail.com"
                  value={newQuestionData.authorEmail}
                  onChange={(e) =>
                    setNewQuestionData({ ...newQuestionData, authorEmail: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Chủ đề / Danh mục
                </label>
                <select
                  value={newQuestionData.category}
                  onChange={(e) =>
                    setNewQuestionData({ ...newQuestionData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Tour du lịch">Tour du lịch</option>
                  <option value="Vé vui chơi">Vé vui chơi</option>
                  <option value="Chính sách hoàn hủy">Chính sách hoàn hủy</option>
                  <option value="Thanh toán">Thanh toán</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Nội dung câu hỏi
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Nhập nội dung thắc mắc của khách..."
                  value={newQuestionData.question}
                  onChange={(e) =>
                    setNewQuestionData({ ...newQuestionData, question: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewQuestionModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-sm"
                >
                  Tạo câu hỏi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
