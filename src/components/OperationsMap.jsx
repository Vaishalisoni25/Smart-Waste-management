import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Filter, Layers, Navigation, ShieldAlert, Sparkles, Truck, Building2, MapPin } from 'lucide-react';
import StatusBadge from './StatusBadge';

// Fix Leaflet default marker icons issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom colored pin creator
const createCustomMarker = (color = 'green', type = 'dot') => {
  const colorMap = {
    green: { bg: '#166534', border: '#84cc16', ring: '#a3e635' },
    orange: { bg: '#ea580c', border: '#fdba74', ring: '#fed7aa' },
    red: { bg: '#dc2626', border: '#fca5a5', ring: '#fecaca' },
    yellow: { bg: '#d97706', border: '#fde68a', ring: '#fef3c7' },
    blue: { bg: '#0284c7', border: '#7dd3fc', ring: '#bae6fd' },
  };

  const c = colorMap[color] || colorMap.green;

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
      ">
        <span style="
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 9999px;
          background-color: ${c.ring};
          opacity: 0.75;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        "></span>
        <div style="
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          background-color: ${c.bg};
          border: 2px solid white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="width: 6px; height: 6px; border-radius: 9999px; background-color: ${c.border};"></div>
        </div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
};

export default function OperationsMap({
  markers = [],
  height = '460px',
  center = [22.7240, 75.8640],
  zoom = 13,
  title = "Live Municipal Operations & Fleet Telemetry",
  showControls = true
}) {
  const [filterType, setFilterType] = useState('all');
  const [activeZone, setActiveZone] = useState('all');

  const filteredMarkers = markers.filter((m) => {
    if (filterType !== 'all' && m.type !== filterType) return false;
    return true;
  });

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-emerald-950/10 shadow-sm flex flex-col">
      {/* Header Bar */}
      <div className="px-6 py-4 bg-gradient-to-r from-[#0a2d21] to-[#0e3b2c] text-white flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#a3e635]/20 text-[#a3e635] flex items-center justify-center border border-[#a3e635]/30">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              {title}
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#a3e635] bg-[#a3e635]/15 px-2.5 py-0.5 rounded-full border border-[#a3e635]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse" />
                Sub-10m GPS
              </span>
            </h3>
            <p className="text-xs text-emerald-300/80">Real-time vector GIS overlay with live vehicle trajectories</p>
          </div>
        </div>

        {showControls && (
          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter pills */}
            <div className="flex items-center bg-[#061e16]/60 p-1 rounded-xl border border-emerald-800/60 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterType === 'all'
                    ? 'bg-[#a3e635] text-[#061e16] shadow-xs'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                All ({markers.length})
              </button>
              <button
                onClick={() => setFilterType('vehicle')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterType === 'vehicle'
                    ? 'bg-[#a3e635] text-[#061e16] shadow-xs'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                Vehicles
              </button>
              <button
                onClick={() => setFilterType('gvp')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterType === 'gvp'
                    ? 'bg-[#a3e635] text-[#061e16] shadow-xs'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                GVPs
              </button>
              <button
                onClick={() => setFilterType('bwg')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterType === 'bwg'
                    ? 'bg-[#a3e635] text-[#061e16] shadow-xs'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                BWGs
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map Content */}
      <div style={{ height }} className="w-full relative">
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          {filteredMarkers.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={createCustomMarker(marker.color, marker.type)}
            >
              <Popup>
                <div className="p-3.5 min-w-[240px] text-[#0d281e]">
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-emerald-100">
                    <span className="font-bold text-sm text-[#0a2d21]">{marker.label}</span>
                    <StatusBadge status={marker.status} size="sm" />
                  </div>
                  {marker.details && (
                    <div className="space-y-1.5 text-xs text-emerald-950">
                      {Object.entries(marker.details).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-emerald-800/70 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="font-semibold text-emerald-900">{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px] text-emerald-800">
                    <span>GPS: {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}</span>
                    <span className="font-semibold text-[#166534]">● Live</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend Overlay */}
        <div className="absolute bottom-4 right-4 z-1000 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-lg border border-emerald-900/10 text-xs flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c] ring-2 ring-orange-200" />
            <span className="font-medium text-emerald-950">Vehicle Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#166534] ring-2 ring-emerald-200" />
            <span className="font-medium text-emerald-950">Facility / Cleared</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626] ring-2 ring-rose-200" />
            <span className="font-medium text-emerald-950">Critical GVP</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] ring-2 ring-sky-200" />
            <span className="font-medium text-emerald-950">BWG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
