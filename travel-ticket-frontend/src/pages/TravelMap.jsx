import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Navigation, Search, Filter, Compass, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 16.0544,
  lng: 108.2022 // Đà Nẵng
};

const MOCK_DESTINATIONS = [
  { id: 1, name: 'Bà Nà Hills', lat: 15.9977, lng: 107.9892, type: 'Công viên', rating: 4.8, reviews: '3.2K', img: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0', tours: 5, tickets: 4, price: 750000, province: 'Đà Nẵng' },
  { id: 2, name: 'Phố cổ Hội An', lat: 15.8801, lng: 108.3380, type: 'Văn hóa', rating: 4.9, reviews: '5.1K', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b', tours: 8, tickets: 2, price: 450000, province: 'Quảng Nam' },
  { id: 3, name: 'Vịnh Hạ Long', lat: 20.9101, lng: 107.1839, type: 'Biển', rating: 4.7, reviews: '4.5K', img: 'https://images.unsplash.com/photo-1528127269322-539801943592', tours: 12, tickets: 3, price: 1200000, province: 'Quảng Ninh' },
  { id: 4, name: 'Fansipan', lat: 22.3039, lng: 103.7753, type: 'Núi', rating: 4.8, reviews: '2.8K', img: 'https://images.unsplash.com/photo-1582845689626-d621516eeb70', tours: 6, tickets: 1, price: 850000, province: 'Lào Cai' }
];

const TravelMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
  });

  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!isLoaded) return <div className="h-screen flex items-center justify-center font-bold text-slate-500">Đang tải bản đồ...</div>;

  return (
    <div className="h-[calc(100vh-68px)] flex flex-col md:flex-row bg-white overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <div className="w-full md:w-[400px] h-full border-r border-slate-200 flex flex-col shadow-xl z-10 shrink-0 bg-slate-50">
        
        {/* Search Header */}
        <div className="p-5 bg-white border-b border-slate-200">
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2 mb-4">
            <Compass className="text-sky-600" /> Bản Đồ Du Lịch
          </h1>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Bạn muốn đi đâu? (Đà Nẵng, Phú Quốc...)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <Search size={18} className="text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
            <button className="whitespace-nowrap px-3 py-1.5 bg-sky-100 text-sky-700 font-bold text-xs rounded-lg border border-sky-200 flex items-center gap-1.5">
              Tất cả
            </button>
            <button className="whitespace-nowrap px-3 py-1.5 bg-white text-slate-600 font-bold text-xs rounded-lg border border-slate-200 hover:bg-slate-50">
              🏖 Biển
            </button>
            <button className="whitespace-nowrap px-3 py-1.5 bg-white text-slate-600 font-bold text-xs rounded-lg border border-slate-200 hover:bg-slate-50">
              🏔 Núi
            </button>
            <button className="whitespace-nowrap px-3 py-1.5 bg-white text-slate-600 font-bold text-xs rounded-lg border border-slate-200 hover:bg-slate-50">
              🎡 Vui chơi
            </button>
          </div>
        </div>

        {/* List Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {MOCK_DESTINATIONS.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map(dest => (
            <div 
              key={dest.id} 
              className={`bg-white rounded-2xl p-3 border cursor-pointer transition shadow-sm ${activeMarker?.id === dest.id ? 'border-sky-500 ring-1 ring-sky-500' : 'border-slate-200 hover:border-sky-300'}`}
              onClick={() => {
                setActiveMarker(dest);
                if (map) map.panTo({ lat: dest.lat, lng: dest.lng });
              }}
            >
              <div className="flex gap-3">
                <img src={dest.img} className="w-20 h-20 rounded-xl object-cover shrink-0" alt={dest.name} />
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-sky-600 uppercase tracking-wide mb-0.5">{dest.province}</div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight mb-1">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2">
                    <Star size={12} className="text-amber-500 fill-current" />
                    <span className="font-bold text-slate-700">{dest.rating}</span>
                    <span>({dest.reviews} quan tâm)</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{dest.tours} Tour</span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{dest.tickets} Vé</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAP AREA */}
      <div className="flex-1 relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={6}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            styles: [
              { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }
            ]
          }}
        >
          {MOCK_DESTINATIONS.map(dest => (
            <Marker
              key={dest.id}
              position={{ lat: dest.lat, lng: dest.lng }}
              onClick={() => setActiveMarker(dest)}
              icon={{
                url: dest.type === 'Biển' ? 'https://cdn-icons-png.flaticon.com/512/3284/3284649.png' : 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                scaledSize: new window.google.maps.Size(32, 32)
              }}
            />
          ))}

          {activeMarker && (
            <InfoWindow
              position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
              onCloseClick={() => setActiveMarker(null)}
            >
              <div className="p-1 max-w-[240px] font-sans">
                <img src={activeMarker.img} alt={activeMarker.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                <h3 className="font-black text-slate-900 text-base leading-tight mb-1">{activeMarker.name}</h3>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-3">
                  <Star size={12} className="text-amber-500 fill-current" /> {activeMarker.rating} ({activeMarker.reviews}) • {activeMarker.province}
                </div>
                
                <div className="flex justify-between items-end mb-4 bg-slate-50 p-2 rounded-lg">
                  <div>
                    <div className="text-[10px] text-slate-500 font-medium">Giá tour / vé từ</div>
                    <div className="font-black text-amber-600 text-sm">{activeMarker.price.toLocaleString()} đ</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link to={`/tours?destination=${activeMarker.id}`} className="bg-sky-600 text-white font-bold text-xs py-2 rounded-lg text-center hover:bg-sky-700 transition">
                    Xem Tour
                  </Link>
                  <button className="bg-slate-100 text-slate-700 font-bold text-xs py-2 rounded-lg text-center hover:bg-slate-200 transition flex items-center justify-center gap-1">
                    <Navigation size={12} /> Chỉ đường
                  </button>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

    </div>
  );
};

export default TravelMap;
