import { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowRight, Bot, Sun, TreePine, Compass, ArrowUp, X, Minimize2, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = { id: Date.now() + 1, sender: "ai", text: "" };
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes("biển") || lowerText.includes("phú quốc")) {
        aiResponse.text = "Phú Quốc là một lựa chọn tuyệt vời cho gia đình! Tôi có thể gợi ý cho bạn một lịch trình 4 ngày 3 đêm bao gồm vui chơi tại VinWonders, lặn ngắm san hô và thưởng thức hải sản tại làng chài Hàm Ninh. Bạn muốn xem chi tiết tour hay đặt vé vui chơi trước?";
        aiResponse.tour = {
          id: "tour-pq",
          name: "Tour Phú Quốc 4N3Đ: Khám Phá Đảo Ngọc & VinWonders",
          price: 5490000,
          date: "Khởi hành hàng ngày",
          img: "https://images.unsplash.com/photo-1586521995568-39abaa0c2311?auto=format&fit=crop&q=80&w=400"
        };
      } else if (lowerText.includes("đà lạt") || lowerText.includes("trốn phố")) {
        aiResponse.text = "Đà Lạt cuối tuần này thời tiết rất đẹp (khoảng 18-22 độ C). Một kỳ nghỉ thư thả nhâm nhi cà phê và ngắm hoàng hôn tại Trại Mát sẽ giúp bạn sạc lại năng lượng. Bạn dự định đi cùng ai?";
      } else {
        aiResponse.text = "Ý tưởng tuyệt vời! Để mình gợi ý chi tiết hơn, bạn dự định đi khoảng mấy ngày và mức ngân sách cho mỗi người là bao nhiêu?";
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const SUGGESTIONS = [
    {
      icon: <Sun className="w-5 h-5 text-sky-500" />,
      title: "Đi biển cùng gia đình",
      desc: "Phú Quốc • 4 ngày 3 đêm"
    },
    {
      icon: <TreePine className="w-5 h-5 text-emerald-500" />,
      title: "Trốn phố vài ngày",
      desc: "Đà Lạt • Cuối tuần thư thả"
    },
    {
      icon: <Compass className="w-5 h-5 text-amber-500" />,
      title: "Chưa biết đi đâu",
      desc: "Cùng GoTravel AI tìm cảm hứng"
    }
  ];

  return (
    <div className="relative w-full h-[calc(100vh-68px)] flex items-center justify-center font-sans overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&q=80&w=1920')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1240px] px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* LEFT TEXT */}
        <div className="lg:w-1/2 text-white">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-teal-400 w-5 h-5" />
            <span className="text-sm font-bold tracking-widest text-teal-400 uppercase">Người bạn đồng hành du lịch</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Chuyến đi của bạn.<br />
            <span className="text-teal-400">Để GoTravel AI cùng lo.</span>
          </h1>
          <p className="text-lg text-slate-200 leading-relaxed max-w-md">
            Chia sẻ ý tưởng của bạn. GoTravel AI sẽ gợi ý điểm đến, lịch trình và dịch vụ phù hợp trong một cuộc trò chuyện.
          </p>
        </div>

        {/* RIGHT CHAT CARD */}
        <div className="lg:w-1/2 w-full max-w-[520px]">
          <div className="bg-white rounded-[24px] shadow-2xl p-6 md:p-8 flex flex-col h-[550px]">
            
            {messages.length === 0 ? (
              // INITIAL STATE
              <div className="flex-1 flex flex-col h-full overflow-y-auto hide-scrollbar">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Chào bạn, mình là GoTravel AI</h2>
                    <p className="text-slate-500 text-sm">Cùng nghĩ về chuyến đi tiếp theo nhé.</p>
                  </div>
                  <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center shrink-0">
                    <Bot className="w-8 h-8 text-sky-600" />
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-slate-800 mb-3">Bạn đang hình dung một chuyến đi như thế nào?</h3>
                  <div className="space-y-3">
                    {SUGGESTIONS.map((sug, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleSend(sug.title)}
                        className="w-full bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all rounded-2xl p-4 flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
                            {sug.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-slate-900">{sug.title}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{sug.desc}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-500 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // CHAT HISTORY STATE
              <div className="flex-1 overflow-y-auto mb-4 space-y-6 hide-scrollbar pr-2">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-2 sticky top-0 bg-white z-10">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center shrink-0">
                    <Bot className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">GoTravel AI</h3>
                    <p className="text-[11px] text-emerald-500">Đang trực tuyến</p>
                  </div>
                </div>

                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl p-4 text-[15px] leading-relaxed shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-slate-900 text-white rounded-tr-sm' 
                        : 'bg-slate-100 text-slate-800 rounded-tl-sm'
                    }`}>
                      {msg.text}
                      
                      {msg.tour && (
                        <div className="mt-4 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                          <img src={msg.tour.img} alt={msg.tour.name} className="w-full h-32 object-cover" />
                          <div className="p-3">
                            <div className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">{msg.tour.name}</div>
                            <div className="text-[12px] text-slate-500 mt-1">{msg.tour.date}</div>
                            <div className="font-black text-amber-600 text-base mt-2">{msg.tour.price.toLocaleString()}đ</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 px-4 py-3.5 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* BOTTOM INPUT AREA */}
            <div className="shrink-0 pt-2 border-t border-slate-100">
              <div className="relative bg-slate-50 border border-slate-200 rounded-2xl flex flex-col focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100 transition-all">
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Hoặc kể GoTravel AI nghe ý tưởng của bạn..."
                  className="w-full bg-transparent resize-none border-none outline-none px-4 py-4 text-[15px] text-slate-800 placeholder-slate-400 hide-scrollbar"
                  rows={2}
                />
                <div className="flex justify-between items-center px-4 pb-3">
                  <div className="text-[11px] text-slate-400">Đi đâu • Khi nào • Cùng ai</div>
                  <button 
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center disabled:bg-slate-300 transition-colors shadow-md hover:bg-amber-600"
                  >
                    <ArrowUp size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>
              {messages.length === 0 && (
                <div className="text-center text-[12px] text-slate-400 mt-4">
                  Không cần có sẵn một kế hoạch hoàn chỉnh.
                </div>
              )}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
