import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageSquare, Minimize2, ChevronDown, User, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_SUGGESTIONS = [
  "Gợi ý Tour",
  "Tìm Vé Vui Chơi",
  "Tour Theo Ngân Sách",
  "Tour Trong Nước",
  "Chính Sách Hủy"
];

const MOCK_TOURS_SUGGESTION = [
  {
    id: "tour-2",
    name: "Tour Phú Quốc 3N2Đ - Canô 4 Đảo Siêu Tốc",
    price: 3890000,
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "tour-1",
    name: "Tour Đà Nẵng - Bà Nà Hills - Cầu Vàng",
    price: 4990000,
    img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=200"
  }
];

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Xin chào! Tôi là AI Travel Assistant từ GoTicket. Tôi có thể giúp gì cho chuyến đi sắp tới của bạn?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiText = "Xin lỗi, hiện tại tôi chưa hiểu rõ ý của bạn. Bạn có thể nói rõ hơn về ngân sách hoặc điểm đến không?";
      let aiTours = null;
      let lowerInput = userMessage.text.toLowerCase();

      if (lowerInput.includes('phú quốc') || lowerInput.includes('đà nẵng') || lowerInput.includes('gợi ý tour')) {
        aiText = "Dựa trên yêu cầu của bạn, tôi tìm thấy một vài tour nổi bật rất phù hợp. Bạn có thể tham khảo nhé:";
        aiTours = MOCK_TOURS_SUGGESTION;
      } else if (lowerInput.includes('ngân sách')) {
        aiText = "Tuyệt! Với ngân sách của bạn, chúng tôi có các chuyến đi 3N2Đ và 4N3Đ rất tối ưu. Bạn muốn đi biển hay lên núi?";
      } else if (lowerInput.includes('chính sách')) {
        aiText = "Chính sách hủy của GoTravel: Hủy trước 7 ngày (Hoàn 100%), Hủy trước 3 ngày (Hoàn 50%), Hủy trong vòng 3 ngày (Không hoàn tiền). Bạn cần hỗ trợ thêm thông tin gì không?";
      } else if (lowerInput.includes('tìm vé vui chơi') || lowerInput.includes('vé vui chơi')) {
        aiText = "Hệ thống của chúng tôi có rất nhiều vé vui chơi hấp dẫn như Sun World Bà Nà Hills, VinWonders Phú Quốc, và Cáp treo Hòn Thơm. Bạn muốn đi chơi ở khu vực nào?";
      } else if (lowerInput.includes('tour trong nước')) {
        aiText = "Chúng tôi có các tour trong nước hấp dẫn trải dài từ Bắc chí Nam: Sapa, Hạ Long, Đà Nẵng, Nha Trang, Phú Quốc. Bạn thích đi vùng nào nhất?";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiText,
        tours: aiTours,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setTimeout(() => {
      document.getElementById('chatbot-input')?.focus();
    }, 100);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center z-50 group"
        >
          <Sparkles size={24} className="group-hover:animate-pulse" />
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[360px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 to-blue-600 p-4 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">AI Travel Assistant</h3>
                <p className="text-[11px] text-sky-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block"></span>
                  Luôn trực tuyến
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronDown size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 bg-slate-50 p-4 overflow-y-auto flex flex-col gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-slate-200 text-slate-500' : 'bg-sky-100 text-sky-600'}`}>
                  {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>

                {/* Message Content */}
                <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                  <div className={`p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-sky-600 text-white rounded-tr-sm' : 'bg-white text-slate-700 rounded-tl-sm border border-slate-100'}`}>
                    {msg.text}
                  </div>
                  
                  {/* Attached Tour Cards */}
                  {msg.tours && (
                    <div className="mt-2 space-y-2 w-full">
                      {msg.tours.map(tour => (
                        <Link key={tour.id} to={`/tour/${tour.id}`} className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-100 hover:border-sky-300 transition-colors shadow-sm">
                          <img src={tour.img} alt={tour.name} className="w-14 h-14 rounded-lg object-cover" />
                          <div>
                            <div className="text-[11px] font-bold text-slate-800 line-clamp-2 leading-snug">{tour.name}</div>
                            <div className="text-[12px] font-black text-orange-500 mt-1">{tour.price.toLocaleString()}đ</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 mt-1 mx-1">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 flex-row">
                <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm border border-slate-100 shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className="bg-white border-t border-slate-100 p-2 overflow-x-auto whitespace-nowrap hide-scrollbar flex gap-2">
            {MOCK_SUGGESTIONS.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                className="inline-block px-3 py-1.5 bg-slate-50 text-sky-600 text-[11px] font-semibold rounded-full border border-sky-100 hover:bg-sky-50 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5 focus-within:border-sky-400 focus-within:ring-1 focus-within:ring-sky-400 transition-all">
              <textarea
                id="chatbot-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Nhập tin nhắn..."
                className="flex-1 max-h-24 bg-transparent border-none text-[13px] resize-none focus:outline-none p-1.5 hide-scrollbar placeholder:text-slate-400"
                rows={1}
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0 disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-sky-600 transition-colors"
              >
                <Send size={14} className="ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
