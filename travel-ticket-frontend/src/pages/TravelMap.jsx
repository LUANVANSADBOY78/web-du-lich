import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { 
  Navigation, Search, Compass, Star, Layers, MapPin, 
  Plane, Ticket, ChevronRight, X, RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { VIETNAM_DESTINATIONS, getDestKeyword } from '../data/mockDestinations';
import { mapService } from '../services/mapService';

export { getDestKeyword };

// Fix Leaflet default icon issues in bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Google Maps style marker
const createCustomMarker = (isSelected, price, name) => {
  return L.divIcon({
    className: 'custom-google-marker',
    html: `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(-50%, -100%);
        cursor: pointer;
        transition: transform 0.2s ease;
      ">
        <div style="
          background: ${isSelected ? '#0284c7' : '#e11d48'};
          color: white;
          font-weight: 800;
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.35);
          border: 2px solid white;
          white-space: nowrap;
          margin-bottom: 2px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          letter-spacing: -0.2px;
        ">
          ${price}
        </div>
        <div style="
          width: 22px;
          height: 22px;
          background: ${isSelected ? '#0284c7' : '#e11d48'};
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 4px 8px rgba(0,0,0,0.4);
        "></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

const DEFAULT_CENTER = [16.0, 107.5];

// Map camera animator helper
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom, { animate: true, duration: 0.8 });
  return null;
};

const TravelMap = () => {
  const [destinations, setDestinations] = useState(VIETNAM_DESTINATIONS);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all'); // 'all' | 'bac' | 'trung' | 'nam'
  const [selectedType, setSelectedType] = useState('all');
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(6.2);
  const [mapStyle, setMapStyle] = useState('roadmap'); // 'roadmap' | 'satellite' | 'terrain'

  // Fetch destinations from API with fallback
  useEffect(() => {
    let isMounted = true;
    mapService.getDestinations().then(data => {
      if (isMounted && data && Array.isArray(data) && data.length > 0) {
        setDestinations(data);
        setIsApiLoaded(true);
      }
    }).catch(() => {
      // Fallback already in place
    });
    return () => { isMounted = false; };
  }, []);

  // Google Maps Tile URLs
  const getGoogleTileUrl = () => {
    switch (mapStyle) {
      case 'satellite':
        return 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
      case 'terrain':
        return 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}';
      default:
        return 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
    }
  };

  const handleMarkerClick = (dest) => {
    setActiveMarker(dest);
    setMapCenter([dest.lat, dest.lng]);
    setMapZoom(11);
  };

  // Zoom to region
  const handleRegionChange = (reg) => {
    setSelectedRegion(reg);
    if (reg === 'bac') {
      setMapCenter([21.2, 105.8]);
      setMapZoom(7.2);
    } else if (reg === 'trung') {
      setMapCenter([15.6, 108.2]);
      setMapZoom(6.8);
    } else if (reg === 'nam') {
      setMapCenter([10.2, 105.8]);
      setMapZoom(7.4);
    } else {
      setMapCenter(DEFAULT_CENTER);
      setMapZoom(6.2);
    }
  };

  // Counts by region
  const totalCount = destinations.length;
  const bacCount = useMemo(() => destinations.filter(d => d.region === 'bac').length, [destinations]);
  const trungCount = useMemo(() => destinations.filter(d => d.region === 'trung').length, [destinations]);
  const namCount = useMemo(() => destinations.filter(d => d.region === 'nam').length, [destinations]);

  // Filtered list
  const filteredDestinations = useMemo(() => {
    return destinations.filter(d => {
      const matchSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.province.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRegion = selectedRegion === 'all' || d.region === selectedRegion;
      const matchType = selectedType === 'all' || d.type === selectedType;
      return matchSearch && matchRegion && matchType;
    });
  }, [destinations, searchTerm, selectedRegion, selectedType]);

  return (
    <div className="h-[calc(100vh-68px)] flex flex-col md:flex-row bg-white overflow-hidden font-sans">
      
      {/* SIDEBAR TÌM KIẾM & DANH SÁCH 63 TỈNH THÀNH */}
      <div className="w-full md:w-[420px] h-full border-r border-slate-200 flex flex-col shadow-xl z-10 shrink-0 bg-slate-50">
        
        <div className="p-4 bg-white border-b border-slate-200">
          <div className="flex items-center justify-between mb-2.5">
            <h1 className="text-base font-black text-slate-900 flex items-center gap-1.5">
              <Compass className="text-sky-600" size={19} /> Bản Đồ Du Lịch Việt Nam
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full">
                {totalCount} Tỉnh Thành
              </span>
              {isApiLoaded && (
                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1" title="Đã kết nối API ASP.NET Core">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> API Live
                </span>
              )}
            </div>
          </div>
          
          {/* Ô tìm kiếm */}
          <div className="relative mb-2.5">
            <input 
              type="text" 
              placeholder="Tìm theo tỉnh thành, tên địa danh du lịch..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
            />
            <Search size={15} className="text-slate-400 absolute left-3 top-2.5" />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Lọc theo VÙNG MIỀN (Bắc - Trung - Nam) */}
          <div className="grid grid-cols-4 gap-1 mb-2 bg-slate-100 p-1 rounded-xl">
            {[
              { id: 'all', label: `Tất Cả (${totalCount})` },
              { id: 'bac', label: `Bắc (${bacCount})` },
              { id: 'trung', label: `Trung (${trungCount})` },
              { id: 'nam', label: `Nam (${namCount})` }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => handleRegionChange(tab.id)}
                className={`py-1.5 rounded-lg text-xs font-bold transition text-center ${
                  selectedRegion === tab.id 
                    ? 'bg-white text-sky-600 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Lọc theo LOẠI HÌNH TRẢI NGHIỆM */}
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            {[
              { id: 'all', label: 'Tất cả loại' },
              { id: 'Biển', label: '🏖 Biển đảo' },
              { id: 'Núi', label: '🏔 Núi rừng' },
              { id: 'Văn hóa', label: '🏛 Văn hóa' },
              { id: 'Sinh thái', label: '🌿 Sinh thái' },
              { id: 'Vui chơi', label: '🎡 Vui chơi' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-bold transition border ${
                  selectedType === tab.id 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Danh sách cards cuộn mượt */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-1">
            <span>KẾT QUẢ ({filteredDestinations.length} / {totalCount})</span>
            <span 
              className="text-sky-600 cursor-pointer hover:underline" 
              onClick={() => { setSearchTerm(''); setSelectedRegion('all'); setSelectedType('all'); }}
            >
              Đặt lại
            </span>
          </div>

          {filteredDestinations.map(dest => (
            <div 
              key={dest.id} 
              className={`bg-white rounded-2xl p-2.5 border cursor-pointer transition-all shadow-sm hover:shadow-md ${
                activeMarker?.id === dest.id 
                  ? 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/40' 
                  : 'border-slate-200 hover:border-sky-300'
              }`}
              onClick={() => handleMarkerClick(dest)}
            >
              <div className="flex gap-3">
                <img 
                  src={dest.img} 
                  className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-inner" 
                  alt={dest.name} 
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wide truncate">
                      {dest.province} • {dest.type}
                    </span>
                    <span className="text-xs font-black text-rose-500 shrink-0">
                      Từ {dest.priceFormatted}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight mb-1 truncate" title={dest.name}>
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1.5">
                    <Star size={11} className="text-amber-500 fill-current" />
                    <span className="font-bold text-slate-700">{dest.rating}</span>
                    <span>({dest.reviews} quan tâm)</span>
                  </div>

                  {/* NÚT BẤM INTERACTIVE: XEM TOUR & XEM VÉ */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <Link
                      to={`/tours?search=${encodeURIComponent(getDestKeyword(dest))}`}
                      onClick={(e) => e.stopPropagation()}
                      title={`Xem danh sách ${dest.tours} tour tại ${dest.name}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white px-2 py-0.5 rounded-lg border border-sky-200 transition-all shadow-xs group/tour cursor-pointer"
                    >
                      <Plane size={11} className="group-hover/tour:translate-x-0.5 transition-transform" />
                      <span>{dest.tours} Tour</span>
                      <ChevronRight size={10} className="opacity-50 group-hover/tour:opacity-100" />
                    </Link>

                    <Link
                      to={`/tickets?search=${encodeURIComponent(getDestKeyword(dest))}`}
                      onClick={(e) => e.stopPropagation()}
                      title={`Xem ${dest.tickets} vé vui chơi tại ${dest.name}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-50 text-amber-800 hover:bg-amber-500 hover:text-white px-2 py-0.5 rounded-lg border border-amber-200 transition-all shadow-xs group/ticket cursor-pointer"
                    >
                      <Ticket size={11} className="group-hover/ticket:translate-x-0.5 transition-transform" />
                      <span>{dest.tickets} Vé</span>
                      <ChevronRight size={10} className="opacity-50 group-hover/ticket:opacity-100" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredDestinations.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Compass size={40} className="mx-auto mb-2 text-slate-300" />
              <p className="font-bold text-sm">Không tìm thấy địa điểm nào</p>
              <p className="text-xs mt-1">Thử từ khóa khác hoặc bấm Tất cả để xem toàn bộ 63 tỉnh thành</p>
            </div>
          )}
        </div>
      </div>

      {/* KHU VỰC BẢN ĐỒ GOOGLE MAPS */}
      <div className="flex-1 relative z-0 h-full">
        {/* Layer Switcher Control */}
        <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-md rounded-2xl p-1.5 shadow-lg border border-slate-200 flex items-center gap-1">
          <button
            onClick={() => setMapStyle('roadmap')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              mapStyle === 'roadmap' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <MapPin size={13} /> Bản đồ
          </button>
          <button
            onClick={() => setMapStyle('satellite')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              mapStyle === 'satellite' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Layers size={13} /> Vệ tinh
          </button>
          <button
            onClick={() => setMapStyle('terrain')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              mapStyle === 'terrain' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            🏔 Địa hình
          </button>
        </div>

        <MapContainer center={DEFAULT_CENTER} zoom={mapZoom} style={{ width: '100%', height: '100%' }}>
          <ChangeView center={mapCenter} zoom={mapZoom} />
          
          {/* Tile Layer Google Maps chuẩn nét */}
          <TileLayer
            attribution='&copy; Google Maps'
            url={getGoogleTileUrl()}
            maxZoom={20}
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          />

          {filteredDestinations.map(dest => {
            const isSelected = activeMarker?.id === dest.id;
            return (
              <Marker
                key={dest.id}
                position={[dest.lat, dest.lng]}
                icon={createCustomMarker(isSelected, dest.priceFormatted, dest.name)}
                eventHandlers={{ click: () => handleMarkerClick(dest) }}
              >
                <Popup>
                  <div className="p-1 max-w-[260px] font-sans">
                    <img 
                      src={dest.img} 
                      alt={dest.name} 
                      className="w-full h-32 object-cover rounded-xl mb-2 shadow-sm" 
                    />
                    <div className="text-[10px] font-bold text-sky-600 uppercase mb-0.5">
                      {dest.province} • {dest.type}
                    </div>
                    <h3 className="font-black text-slate-900 text-base leading-tight mb-1">
                      {dest.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2">
                      <Star size={12} className="text-amber-500 fill-current" /> 
                      <span className="font-bold text-slate-800">{dest.rating}</span> 
                      <span>({dest.reviews} quan tâm)</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">Giá tour / vé từ</div>
                        <div className="font-black text-rose-500 text-sm">
                          {dest.price.toLocaleString('vi-VN')} đ
                        </div>
                      </div>
                      <div className="text-right text-[11px] text-slate-500 font-medium">
                        <div><strong className="text-sky-600 font-black">{dest.tours}</strong> tour có sẵn</div>
                        <div><strong className="text-amber-600 font-black">{dest.tickets}</strong> vé vui chơi</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="grid grid-cols-2 gap-1.5">
                        <Link 
                          to={`/tours?search=${encodeURIComponent(getDestKeyword(dest))}`} 
                          className="bg-sky-600 text-white font-bold text-xs py-2 px-2 rounded-xl text-center hover:bg-sky-700 transition flex items-center justify-center gap-1 shadow-xs"
                          style={{ textDecoration: 'none' }}
                        >
                          <Plane size={12} /> {dest.tours} Tour
                        </Link>
                        <Link 
                          to={`/tickets?search=${encodeURIComponent(getDestKeyword(dest))}`} 
                          className="bg-amber-500 text-white font-bold text-xs py-2 px-2 rounded-xl text-center hover:bg-amber-600 transition flex items-center justify-center gap-1 shadow-xs"
                          style={{ textDecoration: 'none' }}
                        >
                          <Ticket size={12} /> {dest.tickets} Vé
                        </Link>
                      </div>
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${dest.lat},${dest.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-100 text-slate-700 font-bold text-xs py-2 rounded-xl text-center hover:bg-slate-200 transition flex items-center justify-center gap-1.5 border border-slate-200"
                        style={{ textDecoration: 'none' }}
                      >
                        <Navigation size={12} className="text-sky-600" /> Chỉ đường Google Maps
                      </a>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Floating Detail Card khi chọn điểm đến trên bản đồ */}
        {activeMarker && (
          <div className="absolute bottom-5 left-4 right-4 md:left-6 md:right-auto md:w-[460px] z-[1000] bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-sky-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button
              onClick={() => setActiveMarker(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full p-1 transition cursor-pointer"
              title="Đóng bảng thông tin"
            >
              <X size={15} />
            </button>
            <div className="flex gap-3.5 items-center">
              <img
                src={activeMarker.img}
                alt={activeMarker.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm"
              />
              <div className="flex-1 min-w-0 pr-6">
                <div className="text-[10px] font-bold text-sky-600 uppercase tracking-wide">
                  {activeMarker.province} • {activeMarker.type}
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug truncate" title={activeMarker.name}>
                  {activeMarker.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1 font-bold text-amber-500">
                    <Star size={11} className="fill-current" /> {activeMarker.rating}
                  </span>
                  <span>•</span>
                  <span className="font-bold text-rose-500">
                    Từ {activeMarker.priceFormatted}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100">
              <Link
                to={`/tours?search=${encodeURIComponent(getDestKeyword(activeMarker))}`}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-2 px-2 rounded-xl text-center transition flex items-center justify-center gap-1 shadow-sm"
              >
                <Plane size={12} /> {activeMarker.tours} Tour
              </Link>
              <Link
                to={`/tickets?search=${encodeURIComponent(getDestKeyword(activeMarker))}`}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2 px-2 rounded-xl text-center transition flex items-center justify-center gap-1 shadow-sm"
              >
                <Ticket size={12} /> {activeMarker.tickets} Vé
              </Link>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${activeMarker.lat},${activeMarker.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 px-1 rounded-xl text-center transition flex items-center justify-center gap-1 border border-slate-200"
              >
                <Navigation size={12} className="text-sky-600" /> Chỉ đường
              </a>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default TravelMap;
