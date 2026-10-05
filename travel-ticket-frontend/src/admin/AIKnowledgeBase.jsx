import { useState } from 'react';
import { Database, Plus, Search, FileText, Trash2, Edit3 } from 'lucide-react';

const AIKnowledgeBase = () => {
  return (
    <div className="p-6 font-sans">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Knowledge Base (AI Dữ Liệu)</h1>
          <p className="text-sm text-slate-500 mt-1">Huấn luyện AI với các tài liệu, chính sách, và dữ liệu đặc thù của hệ thống</p>
        </div>
        <button className="px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-sky-700 shadow-sm transition">
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
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <div className="font-bold text-sm text-slate-700">Dữ liệu Tour</div>
                  <div className="text-xs text-slate-500">Đồng bộ tự động</div>
                </div>
                <div className="w-10 h-5 bg-emerald-500 rounded-full relative shadow-inner cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <div className="font-bold text-sm text-slate-700">Dữ liệu Vé Vui Chơi</div>
                  <div className="text-xs text-slate-500">Đồng bộ tự động</div>
                </div>
                <div className="w-10 h-5 bg-emerald-500 rounded-full relative shadow-inner cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <div className="font-bold text-sm text-slate-700">Chương Trình Khuyến Mãi</div>
                  <div className="text-xs text-slate-500">Đồng bộ tự động</div>
                </div>
                <div className="w-10 h-5 bg-emerald-500 rounded-full relative shadow-inner cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-lg transition">
              Đồng Bộ Ngay (Sync Now)
            </button>
          </div>
        </div>

        {/* Custom Docs */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">Tài Liệu Thủ Công (Documents)</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Tìm tài liệu..." 
                  className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
            
            <div className="p-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-500 text-xs uppercase tracking-wider">
                    <th className="p-3 font-bold">Tên tài liệu</th>
                    <th className="p-3 font-bold">Cập nhật lúc</th>
                    <th className="p-3 font-bold text-center">Trạng thái</th>
                    <th className="p-3 font-bold text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-slate-100 hover:bg-slate-50/50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-sky-500" />
                        <span className="font-bold text-slate-700">Chính sách hoàn/hủy vé 2026</span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-500 text-xs">01/10/2026</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[11px] font-bold">Đã Train</span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-1">
                        <button className="p-1 text-slate-400 hover:text-sky-600 rounded"><Edit3 size={14} /></button>
                        <button className="p-1 text-slate-400 hover:text-red-600 rounded"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-t border-slate-100 hover:bg-slate-50/50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-sky-500" />
                        <span className="font-bold text-slate-700">Hướng dẫn thanh toán VNPay</span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-500 text-xs">28/09/2026</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[11px] font-bold">Đã Train</span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-1">
                        <button className="p-1 text-slate-400 hover:text-sky-600 rounded"><Edit3 size={14} /></button>
                        <button className="p-1 text-slate-400 hover:text-red-600 rounded"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIKnowledgeBase;
