import { useState, useEffect, useRef } from "react";
import {
  HeadphonesIcon, MessageSquare, Search, Send, CheckCircle2,
  Clock, Phone, Mail, User, Sparkles, AlertCircle, RefreshCw, Paperclip
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_CONVERSATIONS = [
  {
    id: 1,
    customerName: "Nguyễn Thùy Trang",
    customerPhone: "0981234567",
    customerEmail: "trang.nguyen@gmail.com",
    currentPage: "Tour Đà Nẵng 4N3Đ Khởi Hành Từ TP.HCM",
    status: "active", // active, waiting, resolved
    isOnline: true,
    unreadCount: 1,
    lastUpdated: "Vừa xong",
    messages: [
      {
        id: 101,
        sender: "customer",
        text: "Dạ em chào anh/chị, em muốn hỏi đoàn 6 người lớn đi ngày 15/11 còn chỗ không ạ?",
        time: "10:32"
      },
      {
        id: 102,
        sender: "agent",
        agentName: "Admin Luan",
        text: "Dạ chào bạn Thùy Trang! Tuyến Đà Nẵng 4N3Đ ngày 15/11 hiện tại bên mình còn đúng 8 chỗ cuối cùng nha bạn.",
        time: "10:33"
      },
      {
        id: 103,
        sender: "customer",
        text: "Nếu đặt cả 6 vé cùng lúc có được giảm thêm voucher nhóm không anh?",
        time: "10:35"
      }
    ]
  },
  {
    id: 2,
    customerName: "Lê Văn Hào",
    customerPhone: "0918765432",
    customerEmail: "vanhao.le@yahoo.com",
    currentPage: "Vé Sun World Bà Nà Hills - Cáp Treo Khứ Hồi",
    status: "waiting",
    isOnline: true,
    unreadCount: 2,
    lastUpdated: "5 phút trước",
    messages: [
      {
        id: 201,
        sender: "customer",
        text: "Cho mình hỏi vé cáp treo Bà Nà mua trên web có bao gồm buffet trưa chưa vậy shop?",
        time: "10:25"
      },
      {
        id: 202,
        sender: "customer",
        text: "Alo shop ơi, hỗ trợ gấp giúp mình với ạ!",
        time: "10:30"
      }
    ]
  },
  {
    id: 3,
    customerName: "Trần Mai Phương",
    customerPhone: "0903112233",
    customerEmail: "phuongtran@hotmail.com",
    currentPage: "Tour Phú Quốc 3N2Đ Nghỉ Dưỡng Vinpearl",
    status: "resolved",
    isOnline: false,
    unreadCount: 0,
    lastUpdated: "1 giờ trước",
    messages: [
      {
        id: 301,
        sender: "customer",
        text: "Mình đã nhận được vé điện tử và mã QR qua email rồi nha. Cảm ơn tư vấn viên nhiều!",
        time: "09:15"
      },
      {
        id: 302,
        sender: "agent",
        agentName: "Admin Luan",
        text: "Dạ vâng ạ! GoTravel chúc chị và gia đình có một chuyến đi Phú Quốc thật nhiều niềm vui và ý nghĩa ạ!",
        time: "09:16"
      }
    ]
  }
];

const CANNED_REPLIES = [
  "Dạ chào quý khách! GoTravel có thể hỗ trợ thông tin gì cho chuyến đi của bạn ạ?",
  "Dạ tuyến tour này hiện vẫn còn chỗ ạ. Em xin phép giữ chỗ tạm thời cho mình nhé!",
  "Vé điện tử và mã QR sẽ gửi tức thì về Email và Zalo của quý khách sau khi thanh toán ạ.",
  "GoTravel có áp dụng mã giảm giá 10% cho khách đặt tour đoàn từ 4 người trở lên ạ."
];

export default function LiveChatAdmin() {
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem("gotravel_admin_livechat");
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [activeId, setActiveId] = useState(1);
  const [inputText, setInputText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("gotravel_admin_livechat", JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, conversations]);

  const activeChat = conversations.find((c) => c.id === activeId) || conversations[0];

  const handleSendMessage = (textToSend = null) => {
    const content = textToSend || inputText;
    if (!content.trim() || !activeChat) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newMsg = {
      id: Date.now(),
      sender: "agent",
      agentName: "Admin Luan",
      text: content.trim(),
      time: timeStr
    };

    setConversations(
      conversations.map((c) =>
        c.id === activeChat.id
          ? {
              ...c,
              unreadCount: 0,
              status: "active",
              lastUpdated: "Vừa xong",
              messages: [...c.messages, newMsg]
            }
          : c
      )
    );

    if (!textToSend) setInputText("");
    toast.success("Đã gửi tin nhắn!");
  };

  const handleResolveChat = (id) => {
    setConversations(
      conversations.map((c) =>
        c.id === id ? { ...c, status: "resolved", unreadCount: 0 } : c
      )
    );
    toast.info("Đã đánh dấu cuộc trò chuyện là Hoàn tất!");
  };

  const handleSimulateCustomerReply = () => {
    if (!activeChat) return;
    const replies = [
      "Vâng em cảm ơn anh nhiều nhé, em sẽ thanh toán luôn bây giờ ạ!",
      "Dạ em xem lại lịch trình rồi, dịch vụ rất ổn ạ.",
      "Ok shop, có gì mình sẽ nhờ bạn hỗ trợ thêm nha!"
    ];
    const randReply = replies[Math.floor(Math.random() * replies.length)];
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const customerMsg = {
      id: Date.now(),
      sender: "customer",
      text: randReply,
      time: timeStr
    };

    setConversations(
      conversations.map((c) =>
        c.id === activeChat.id
          ? {
              ...c,
              unreadCount: c.id === activeId ? 0 : c.unreadCount + 1,
              status: "active",
              lastUpdated: "Vừa xong",
              messages: [...c.messages, customerMsg]
            }
          : c
      )
    );
    toast.info("Đã nhận tin nhắn mới từ khách hàng!");
  };

  const filteredConversations = conversations.filter((c) => {
    const matchSearch =
      c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.customerPhone.includes(searchTerm) ||
      c.messages.some((m) => m.text.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HeadphonesIcon className="text-sky-600" /> Hộp Thư Trực Tuyến & CSKH (Live Chat)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Trò chuyện trực tiếp và hỗ trợ tư vấn du khách theo thời gian thực
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateCustomerReply}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/60 dark:text-sky-300 dark:hover:bg-sky-900/60 border border-sky-200 dark:border-sky-800 rounded-xl transition"
          >
            <RefreshCw size={13} /> Thử nghiệm khách nhắn tin
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("gotravel_admin_livechat");
              setConversations(INITIAL_CONVERSATIONS);
              toast.info("Đã khôi phục hội thoại mẫu!");
            }}
            className="px-3 py-1.5 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 rounded-xl transition"
          >
            Mẫu dữ liệu
          </button>
        </div>
      </div>

      {/* Main Chat Box Container */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-0">
        {/* Left List of Chats */}
        <div className="w-full md:w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Tìm khách hàng hoặc tin nhắn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-white"
              />
            </div>
            <div className="flex gap-1 text-[11px]">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  statusFilter === "all"
                    ? "bg-sky-600 text-white"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Tất cả ({conversations.length})
              </button>
              <button
                onClick={() => setStatusFilter("waiting")}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  statusFilter === "waiting"
                    ? "bg-amber-500 text-white"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Chờ trả lời ({conversations.filter((c) => c.status === "waiting").length})
              </button>
              <button
                onClick={() => setStatusFilter("resolved")}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  statusFilter === "resolved"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Đã xong
              </button>
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredConversations.map((c) => {
              const isSelected = c.id === activeChat?.id;
              const lastMsg = c.messages[c.messages.length - 1];
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setActiveId(c.id);
                    setConversations(
                      conversations.map((item) =>
                        item.id === c.id ? { ...item, unreadCount: 0 } : item
                      )
                    );
                  }}
                  className={`p-3.5 cursor-pointer transition flex items-start gap-3 ${
                    isSelected
                      ? "bg-sky-50/80 dark:bg-sky-950/40 border-l-4 border-sky-600"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 text-sm">
                      {c.customerName.charAt(0)}
                    </div>
                    {c.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {c.customerName}
                      </span>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {c.lastUpdated}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {lastMsg ? lastMsg.text : "Chưa có tin nhắn"}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                          c.status === "active"
                            ? "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
                            : c.status === "waiting"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        }`}
                      >
                        {c.status === "active" ? "Đang chat" : c.status === "waiting" ? "Đang chờ" : "Đã xong"}
                      </span>

                      {c.unreadCount > 0 && (
                        <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                          {c.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Chat View */}
        {activeChat ? (
          <div className="flex-1 flex flex-col min-w-0 bg-slate-50/40 dark:bg-slate-900/40">
            {/* Chat Header */}
            <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center font-bold shrink-0">
                  <User size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {activeChat.customerName}
                    <span className="text-xs font-normal text-emerald-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Trực tuyến
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    Đang xem: <span className="text-sky-600 dark:text-sky-400 font-medium">{activeChat.currentPage}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 mr-2">
                  <span className="flex items-center gap-1"><Phone size={12} /> {activeChat.customerPhone}</span>
                </div>
                {activeChat.status !== "resolved" && (
                  <button
                    onClick={() => handleResolveChat(activeChat.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-xl transition"
                  >
                    <CheckCircle2 size={14} /> Hoàn tất hỗ trợ
                  </button>
                )}
              </div>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeChat.messages.map((msg) => {
                const isAgent = msg.sender === "agent";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAgent ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[10px] font-semibold text-slate-400">
                        {isAgent ? "CSKH - Admin Luan" : activeChat.customerName}
                      </span>
                      <span className="text-[10px] text-slate-400">• {msg.time}</span>
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                        isAgent
                          ? "bg-sky-600 text-white rounded-tr-none"
                          : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Canned Responses */}
            <div className="px-4 py-2 bg-white/80 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto custom-scrollbar">
              <span className="text-[11px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
                <Sparkles size={12} className="text-amber-500" /> Trả lời nhanh:
              </span>
              {CANNED_REPLIES.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(reply)}
                  className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-sky-950 dark:hover:text-sky-300 transition shrink-0"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Nhập nội dung tư vấn khách hàng (Nhấn Enter để gửi)..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white rounded-xl font-medium flex items-center gap-1.5 transition shadow-sm"
              >
                <Send size={16} /> Gửi
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            Chọn một cuộc hội thoại để bắt đầu hỗ trợ
          </div>
        )}
      </div>
    </div>
  );
}
