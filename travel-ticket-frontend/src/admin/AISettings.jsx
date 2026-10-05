import { useState } from 'react';
import { Save, Bot, MessageCircle, Sliders, CheckCircle } from 'lucide-react';

const AISettings = () => {
  return (
    <div className="p-6 font-sans">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Cài Đặt AI Chatbot</h1>
          <p className="text-sm text-slate-500 mt-1">Cấu hình hành vi, mô hình AI và prompt hệ thống</p>
        </div>
        <button className="px-5 py-2 bg-sky-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-sky-700 shadow-sm transition">
          <Save size={18} />
          Lưu Cài Đặt
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* System Prompt */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Bot size={18} className="text-sky-500" />
              System Prompt (Prompt Hệ Thống)
            </h3>
            <textarea 
              rows={8}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-none"
              defaultValue={`Bạn là AI Travel Assistant của GoTicket.
Nhiệm vụ của bạn là tư vấn khách hàng đặt Tour Du Lịch và Vé Vui Chơi.
Hãy trả lời lịch sự, ngắn gọn và hữu ích.
CHỈ sử dụng dữ liệu từ Database (Tours, Tickets).
KHÔNG bịa đặt giá hoặc thông tin.
Nếu không biết, hãy đề xuất người dùng liên hệ Hotline 1900 xxxx.`}
            />
            <p className="text-xs text-slate-500 mt-2">Được dùng làm chỉ dẫn hệ thống cho mọi cuộc hội thoại.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <MessageCircle size={18} className="text-sky-500" />
              Tin Nhắn Chào Mừng
            </h3>
            <input 
              type="text" 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              defaultValue="Xin chào! Tôi là AI Travel Assistant từ GoTicket. Tôi có thể giúp gì cho chuyến đi sắp tới của bạn?"
            />
          </div>
        </div>

        {/* Configurations */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Sliders size={18} className="text-sky-500" />
              Cấu Hình Mô Hình
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Nhà Cung Cấp LLM</label>
                <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-sky-500">
                  <option value="openai">OpenAI (GPT-4o)</option>
                  <option value="gemini">Google (Gemini 1.5 Pro)</option>
                  <option value="anthropic">Anthropic (Claude 3.5 Sonnet)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">API Key</label>
                <input 
                  type="password" 
                  defaultValue="sk-xxxx-xxxx-xxxx"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide flex justify-between">
                  <span>Temperature (Sáng tạo)</span>
                  <span className="text-sky-600">0.7</span>
                </label>
                <input 
                  type="range" 
                  min="0" max="1" step="0.1" 
                  defaultValue="0.7"
                  className="w-full accent-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Quick Reply Suggestions */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <CheckCircle size={18} className="text-sky-500" />
              Nút Gợi Ý Nhanh
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 bg-sky-50 text-sky-600 text-xs font-bold rounded-lg border border-sky-100 flex items-center gap-1">
                Gợi ý Tour <button className="hover:text-red-500">&times;</button>
              </span>
              <span className="px-3 py-1 bg-sky-50 text-sky-600 text-xs font-bold rounded-lg border border-sky-100 flex items-center gap-1">
                Tìm Vé Vui Chơi <button className="hover:text-red-500">&times;</button>
              </span>
              <span className="px-3 py-1 bg-sky-50 text-sky-600 text-xs font-bold rounded-lg border border-sky-100 flex items-center gap-1">
                Tour Theo Ngân Sách <button className="hover:text-red-500">&times;</button>
              </span>
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Thêm nút gợi ý..." className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-sky-500" />
              <button className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-lg transition">Thêm</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AISettings;
