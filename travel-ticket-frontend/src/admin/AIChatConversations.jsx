import { useState } from 'react';
import { MessageSquare, Bot, Search, Filter, Eye, MoreHorizontal, User } from 'lucide-react';

const AIChatConversations = () => {
  const [conversations] = useState([
    { id: 'chat-01', user: 'Khách vãng lai', text: 'Tôi muốn đi Phú Quốc...', date: '2026-10-02 14:30', status: 'resolved' },
    { id: 'chat-02', user: 'nguyenvana@gmail.com', text: 'Cho hỏi tour Hàn Quốc còn chỗ k...', date: '2026-10-02 10:15', status: 'escalated' },
    { id: 'chat-03', user: 'Khách vãng lai', text: 'Chính sách hoàn hủy thế nào?', date: '2026-10-01 19:40', status: 'resolved' },
    { id: 'chat-04', user: 'tranthib@gmail.com', text: 'Tôi có 5 triệu đi đâu chơi...', date: '2026-10-01 08:20', status: 'resolved' },
  ]);

  return (
    <div className="p-6 font-sans">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Quản Lý Hội Thoại AI</h1>
          <p className="text-sm text-slate-500 mt-1">Lịch sử chat của khách hàng với AI Assistant</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 px-3 py-2 rounded-xl flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-700">AI Đang Hoạt Động</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Tìm kiếm nội dung chat..." 
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-sky-500"
            />
          </div>
          <button className="px-3 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-50">
            <Filter size={16} /> Lọc
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-bold">Người dùng</th>
              <th className="p-4 font-bold">Tin nhắn cuối</th>
              <th className="p-4 font-bold">Thời gian</th>
              <th className="p-4 font-bold">Trạng thái</th>
              <th className="p-4 font-bold text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {conversations.map(chat => (
              <tr key={chat.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                      <User size={14} className="text-slate-500" />
                    </div>
                    <span className="font-bold text-slate-700">{chat.user}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-600 truncate max-w-[200px]">{chat.text}</td>
                <td className="p-4 text-slate-500">{chat.date}</td>
                <td className="p-4">
                  {chat.status === 'resolved' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-600">
                      Đã giải quyết
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-600">
                      Chuyển nhân viên
                    </span>
                  )}
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded transition" title="Xem chi tiết">
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AIChatConversations;
