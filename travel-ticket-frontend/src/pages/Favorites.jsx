import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Trash2, MapPin, Star, Calendar } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { formatCurrency } from '../utils/format';

export default function Favorites() {
  const { favorites, toggle } = useFavorites();
  const [activeTab, setActiveTab] = useState('all');

  const tours = favorites.filter(f => f.type === 'tour');
  const tickets = favorites.filter(f => f.type === 'ticket');
  const hotels = favorites.filter(f => f.type === 'hotel');

  const displayed = activeTab === 'all' ? favorites
    : activeTab === 'tour' ? tours
    : activeTab === 'ticket' ? tickets
    : hotels;

  const linkMap = { tour: 'tours', ticket: 'tickets', hotel: 'hotels' };
  const typeLabel = { tour: 'Tour Du Lịch', ticket: 'Vé Vui Chơi', hotel: 'Khách Sạn' };
  const typeBadgeColor = { tour: 'bg-sky-100 text-sky-700', ticket: 'bg-green-100 text-green-700', hotel: 'bg-violet-100 text-violet-700' };

  if (favorites.length === 0) {
    return (
      <div className="min-h-[60vh] bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="text-red-200" />
          </div>
          <h2 className="text-2xl font-black text-slate-700 mb-2">Chưa có mục yêu thích</h2>
          <p className="text-slate-500 mb-8">Nhấn biểu tượng ❤️ để lưu tour, vé, khách sạn yêu thích</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/tours" className="bg-sky-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-sky-700 transition">Khám Phá Tour</Link>
            <Link to="/tickets" className="bg-white border border-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl hover:border-sky-500 transition">Tìm Vé Vui Chơi</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Heart size={28} className="text-red-500 fill-current" />
          <h1 className="text-3xl font-black text-slate-900">Yêu Thích Của Tôi</h1>
          <span className="bg-red-100 text-red-600 font-bold text-sm px-2.5 py-0.5 rounded-full">{favorites.length}</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { id: 'all', label: 'Tất Cả', count: favorites.length },
            { id: 'tour', label: 'Tour', count: tours.length },
            { id: 'ticket', label: 'Vé', count: tickets.length },
            { id: 'hotel', label: 'Khách Sạn', count: hotels.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition ${
                activeTab === tab.id ? 'bg-sky-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:border-sky-400'
              }`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-100'}`}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayed.map(item => (
            <div key={`${item.id}-${item.type}`}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition group">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image || 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400'}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => toggle(item)}
                  className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition shadow"
                  title="Xóa khỏi yêu thích"
                >
                  <Trash2 size={14} />
                </button>
                <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-full ${typeBadgeColor[item.type]}`}>
                  {typeLabel[item.type]}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-black text-slate-900 text-sm leading-tight mb-2 line-clamp-2">{item.name}</h3>
                {item.location && (
                  <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                    <MapPin size={11} /> {item.location}
                  </p>
                )}
                {item.price && (
                  <p className="text-sky-600 font-black text-base mb-3">{formatCurrency(item.price)}</p>
                )}
                <Link
                  to={`/${linkMap[item.type] || 'tours'}/${item.id}`}
                  className="block text-center text-sm font-bold text-sky-600 border border-sky-200 rounded-xl py-2 hover:bg-sky-600 hover:text-white hover:border-sky-600 transition"
                >
                  Xem Chi Tiết
                </Link>
              </div>
            </div>
          ))}
        </div>

        {displayed.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg font-bold">Không có mục nào trong danh mục này</p>
          </div>
        )}
      </div>
    </div>
  );
}

