import { useState } from 'react';
import { Search, MapPin, Image as ImageIcon, Plus, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { DESTINATIONS_LIST } from '../data/mockProducts';

export default function Destinations() {
  const [searchTerm, setSearchTerm] = useState('');

  // We mock the admin list based on our existing constants to show them it works
  const mockAdminDestinations = DESTINATIONS_LIST.map((name, index) => ({
    id: index + 1,
    name,
    img: 'https://images.unsplash.com/photo-1555920361-0475302fbf83?auto=format&fit=crop&q=80&w=200',
    toursCount: Math.floor(Math.random() * 20) + 1,
    status: 'Hoạt động'
  }));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Quản Lý Điểm Đến (Destinations)</h1>
          <p className="text-sm text-slate-500 mt-1">Thêm hình ảnh và tọa độ Google Maps cho các điểm đến</p>
        </div>
        <button className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition shadow-sm">
          <Plus size={18} /> Thêm Điểm Đến Mới
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50">
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Tìm kiếm điểm đến..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 text-sm"
            />
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-bold">Hình Ảnh</th>
                <th className="p-4 font-bold">Tên Điểm Đến</th>
                <th className="p-4 font-bold">Số lượng Tour/Vé</th>
                <th className="p-4 font-bold">Trạng thái</th>
                <th className="p-4 font-bold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockAdminDestinations
                .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((dest) => (
                <tr key={dest.id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="w-16 h-12 bg-slate-200 rounded-lg overflow-hidden border border-slate-200 relative group cursor-pointer">
                      <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center transition">
                        <ImageIcon size={16} className="text-white" />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-slate-800 flex items-center gap-2 mt-2">
                    <MapPin size={16} className="text-sky-600" /> {dest.name}
                  </td>
                  <td className="p-4 text-slate-600 text-sm font-medium">
                    {dest.toursCount} sản phẩm
                  </td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                      {dest.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-sky-600 transition bg-white border border-slate-200 rounded-lg shadow-sm mr-2">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 transition bg-white border border-slate-200 rounded-lg shadow-sm">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
