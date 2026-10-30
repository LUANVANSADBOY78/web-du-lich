import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageSquare, Minimize2, ChevronDown, User, Sparkles, Compass, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_SUGGESTIONS = [
  "1+1 bằng mấy?",
  "Tư vấn Tour Nhật Bản",
  "Tour Hàn Quốc mùa này có gì đẹp?",
  "Giá vé Bà Nà Hills bao nhiêu?",
  "Nên đi Phú Quốc mấy ngày?"
];

// Smart AI Knowledge base & NLP responder
const processAIMessage = (input) => {
  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();

  // 1. Math calculation checking (VD: 1+1, 2 * 5, 100/4, ...)
  const mathRegex = /^(\d+(\.\d+)?)\s*([\+\-\*\/xX÷])\s*(\d+(\.\d+)?)\s*(\?|bằng mấy|bằng bao nhiêu)?$/i;
  const simpleMatch = trimmed.match(mathRegex);
  if (simpleMatch) {
    const num1 = parseFloat(simpleMatch[1]);
    let op = simpleMatch[3];
    const num2 = parseFloat(simpleMatch[4]);
    let result = 0;
    if (op === '+' || op === 'cộng') result = num1 + num2;
    else if (op === '-' || op === 'trừ') result = num1 - num2;
    else if (op === '*' || op === 'x' || op === 'X' || op === 'nhân') result = num1 * num2;
    else if (op === '/' || op === '÷' || op === 'chia') result = num2 !== 0 ? (num1 / num2) : 'không thể chia cho 0';

    return {
      text: `Dạ, kết quả của phép tính ${num1} ${op} ${num2} = **${result}** bạn nhé! 😊\n\nNgoài tính toán, mình là Trợ lý AI du lịch của GoTicket, mình có thể tư vấn lịch trình, so sánh tour và tính toán ngân sách du lịch cho bạn!`,
      tours: null
    };
  }

  // Phép tính có từ ngữ (VD: 1+1 bằng mấy, tính giúp 2 + 2)
  if (lower.includes('1+1') || lower.includes('1 + 1')) {
    return {
      text: `Dạ, **1 + 1 = 2** bạn nhé! 😄\n\nBạn có muốn mình tính toán chi phí tour hoặc tư vấn chuyến đi nào cho 2 người (1+1) không ạ?`,
      tours: null
    };
  }

  // 2. Chào hỏi & giới thiệu
  if (/^(xin chào|chào|hello|hi|chào bạn|chào em|alo)/i.test(lower)) {
    return {
      text: `Xin chào bạn! Rất vui được đồng hành cùng bạn. Mình là **AI Travel Assistant** của GoTicket. Bạn đang lên kế hoạch du lịch ở đâu hay cần mình tư vấn tour, giá vé, khách sạn nào không?`,
      tours: null
    };
  }

  // 3. Tư vấn Tour Nhật Bản
  if (lower.includes('nhật') || lower.includes('japan') || lower.includes('tokyo') || lower.includes('phú sĩ')) {
    return {
      text: `Nhật Bản mùa này đang vào mùa thu lá đỏ Momiji tuyệt đẹp ven hồ Kawaguchiko và núi Phú Sĩ! 🍁\n\nGoTicket đang có chùm **Tour Nhật Bản 6N5Đ Cung Đường Vàng** (Tokyo - Phú Sĩ - Kyoto - Osaka) bay Vietnam Airlines, tặng bữa bò Kobe và tắm khoáng Onsen thư giãn. Bạn có muốn xem chi tiết tour không?`,
      tours: [
        { id: 5, name: "Tour Nhật Bản 6N5Đ: Cung Đường Vàng Mùa Thu", price: 34900000, img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=300" }
      ]
    };
  }

  // 4. Tư vấn Tour Hàn Quốc
  if (lower.includes('hàn quốc') || lower.includes('korea') || lower.includes('seoul') || lower.includes('nami')) {
    return {
      text: `Hàn Quốc là điểm đến cực kỳ lý tưởng! Đảo Nami ngập tràn sắc vàng ngân hạnh, công viên Everland náo nhiệt và trải nghiệm mặc Hanbok chụp ảnh tại Cung điện Gyeongbokgung. Visa chỉ mất 6 ngày xét duyệt.`,
      tours: [
        { id: 4, name: "Tour Hàn Quốc 5N4Đ: Seoul - Đảo Nami - Everland", price: 15890000, img: "https://images.unsplash.com/photo-1546874177-9e664107314e?auto=format&fit=crop&q=80&w=300" }
      ]
    };
  }

  // 5. Tư vấn Tour Đà Nẵng / Bà Nà Hills
  if (lower.includes('đà nẵng') || lower.includes('bà nà') || lower.includes('cầu vàng') || lower.includes('hội an')) {
    return {
      text: `Đà Nẵng - Hội An luôn là lựa chọn hàng đầu cho gia đình và cặp đôi! Vé cáp treo Bà Nà Hills ngắm Cầu Vàng sương mây, tối dạo phố cổ Hội An thả hoa đăng sông Hoài cực chill.`,
      tours: [
        { id: 1, name: "Tour Đà Nẵng - Hội An - Bà Nà Hills 4N3Đ Trọn Gói", price: 4990000, img: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=300" }
      ]
    };
  }

  // 6. Tư vấn Phú Quốc
  if (lower.includes('phú quốc') || lower.includes('hòn thơm') || lower.includes('vinwonders')) {
    return {
      text: `Đi Phú Quốc thì trải nghiệm đi cano 4 đảo, lặn ngắm san hô và đi cáp treo Hòn Thơm vượt biển là tuyệt nhất! Thời gian lý tưởng là 3 ngày 2 đêm hoặc 4 ngày 3 đêm bạn nhé.`,
      tours: [
        { id: 2, name: "Tour Phú Quốc 3N2Đ: Cano 4 Đảo Siêu Tốc & Sunset Sanato", price: 3890000, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=300" }
      ]
    };
  }

  // 7. Vé vui chơi
  if (lower.includes('vé') || lower.includes('cáp treo') || lower.includes('sun world') || lower.includes('safari')) {
    return {
      text: `GoTicket phân phối vé điện tử chính hãng quét mã QR vào cổng không cần xếp hàng:
• **Vé Sun World Bà Nà Hills**: từ 900.000đ (Tặng kèm buffet)
• **Vé VinWonders & Safari Phú Quốc**: từ 650.000đ
• **Cáp treo Hòn Thơm**: từ 600.000đ
Bạn muốn đặt vé cho ngày nào và bao nhiêu người ạ?`,
      tours: null
    };
  }

  // 8. Hỏi về giá, ngân sách, khuyến mãi
  if (lower.includes('giá') || lower.includes('ngân sách') || lower.includes('rẻ') || lower.includes('tiết kiệm') || lower.includes('khuyến mãi') || lower.includes('voucher')) {
    return {
      text: `GoTicket hiện đang có chương trình **Flash Sale Mùa Thu**:
• Giảm ngay **200.000đ** cho đơn đặt tour đầu tiên (Mã: \`GOTRAVEL2026\`)
• Giảm tới **1.000.000đ/nhóm** từ 4 khách khi đặt tour quốc tế
• Miễn phí 100% bảo hiểm du lịch quốc tế trị giá 1 tỷ đồng!`,
      tours: null
    };
  }

  // 9. Hỏi thời tiết, mặc gì, kinh nghiệm
  if (lower.includes('thời tiết') || lower.includes('mặc gì') || lower.includes('mùa nào')) {
    return {
      text: `Thời điểm hiện tại rất đẹp để du lịch:
• **Miền Bắc & Đông Bắc (Sapa, Hà Giang)**: Đang mùa lúa chín và tam giác mạch, se se lạnh 15-20°C, nên mang áo khoác ấm.
• **Đà Nẵng & Miền Trung**: Thời tiết mát dịu, thích hợp tham quan Bà Nà và phố cổ.
• **Phú Quốc & Miền Nam**: Nắng vàng biển êm, biển trong xanh thích hợp tắm biển và lặn san hô.
• **Đông Bắc Á (Nhật Bản, Hàn Quốc)**: Mùa thu se lạnh 12-18°C, lá phong đỏ vàng rực rỡ!`,
      tours: null
    };
  }

  // 10. Trả lời thông minh tự nhiên cho câu hỏi chung (General conversational intelligence)
  return {
    text: `Mình hiểu bạn đang quan tâm về "${trimmed}".\n\nLà Trợ lý Du lịch thông minh, mình có thể:\n1. 🔍 **Gợi ý tour phù hợp** với ngân sách và sở thích của bạn\n2. 🎫 **Tra cứu vé vui chơi** (Bà Nà, VinWonders, Sun World)\n3. 📅 **Lên lịch trình từng ngày** chi tiết và thực tế\n4. 💡 **Giải đáp thắc mắc** về thủ tục visa, hành lý và thời tiết\n\nBạn muốn mình hỗ trợ cụ thể về điều gì tiếp theo nhé? 😊`,
    tours: null
  };
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Xin chào! Tôi là Trợ Lý Du Lịch Thông Minh GoTicket. Tôi có thể giải đáp thắc mắc, tư vấn tour, vé vui chơi hoặc hỗ trợ bạn bất kỳ câu hỏi nào. Bạn cần giúp gì ạ?',
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
    const textToSend = inputValue.trim();
    if (!textToSend) return;

    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInputValue('');
    setIsTyping(true);

    // AI Natural Response Simulation
    setTimeout(() => {
      const response = processAIMessage(textToSend);

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: response.text,
        tours: response.tours,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 700);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-tr from-sky-600 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 relative group cursor-pointer"
          title="Trò chuyện với AI Travel Assistant"
        >
          <Bot size={28} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
          
          <div className="absolute right-16 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
            Chat với AI Tư Vấn Du Lịch ✨
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[380px] sm:w-[410px] h-[550px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
                <Bot size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  AI Travel Assistant
                  <Sparkles size={14} className="text-amber-300" />
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-sky-100 mt-0.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Luôn trực tuyến 24/7
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition text-white/80 hover:text-white"
                title="Thu nhỏ"
              >
                <ChevronDown size={20} />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition text-white/80 hover:text-white"
                title="Đóng"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-1">
                    <Bot size={16} />
                  </div>
                )}

                <div className="max-w-[80%] space-y-2">
                  <div 
                    className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-sky-600 text-white rounded-tr-xs shadow-sm font-medium' 
                        : 'bg-white text-slate-800 rounded-tl-xs shadow-sm border border-slate-100 whitespace-pre-wrap'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Suggested Tours Cards */}
                  {msg.tours && (
                    <div className="space-y-2 pt-1">
                      {msg.tours.map(t => (
                        <Link
                          key={t.id}
                          to={`/tour/${t.id}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-200 hover:border-sky-400 hover:shadow-md transition group"
                        >
                          <img src={t.img} alt={t.name} className="w-14 h-14 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-xs text-slate-800 group-hover:text-sky-600 truncate">{t.name}</h5>
                            <div className="text-xs text-amber-600 font-black mt-1">
                              {t.price?.toLocaleString()} đ
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className={`text-[10px] text-slate-400 px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-1">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2 bg-white rounded-xl border border-slate-100 w-fit">
                <Bot size={15} className="text-sky-500 animate-spin" />
                <span>AI đang soạn câu trả lời...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="p-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto hide-scrollbar">
            {MOCK_SUGGESTIONS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(item)}
                className="px-3 py-1 bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-sky-600 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-100">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2"
            >
              <input 
                type="text"
                placeholder="Nhập câu hỏi, phép tính hoặc địa điểm bạn muốn đi..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white rounded-2xl flex items-center justify-center shadow-md transition cursor-pointer"
              >
                <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
