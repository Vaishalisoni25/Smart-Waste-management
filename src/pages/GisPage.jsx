import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Layers,
  Plus,
  Camera,
  QrCode,
  CheckCircle2,
  Filter,
  Search,
  Building,
  Home,
  AlertTriangle,
  Upload,
  Sparkles,
  Compass
} from 'lucide-react';
import { api } from '../services/api';
import OperationsMap from '../components/OperationsMap';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

const GEOTAGGING_TYPES = [
  "Zone Boundary",
  "Ward Boundary",
  "Block Boundary",
  "Route Mapping",
  "GVP",
  "BWG",
  "Residential",
  "Commercial",
  "Institutional",
  "Industrial",
  "Others"
];

export default function GisPage() {
  const [data, setData] = useState(null);
  const [selectedType, setSelectedType] = useState('Residential');
  const [selectedZone, setSelectedZone] = useState('Zone 1');
  const [selectedWard, setSelectedWard] = useState('Ward 04');
  const [propertyId, setPropertyId] = useState('P-123456');
  const [qrGenerated, setQrGenerated] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [records, setRecords] = useState([]);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await api.getGisData();
      setData(res);
      setRecords(res.records || []);
    }
    load();
  }, []);

  const handleSaveAsset = (e) => {
    e.preventDefault();
    const newRecord = {
      id: `GIS-${Math.floor(100 + Math.random() * 900)}`,
      name: `${selectedType} Asset #${propertyId}`,
      type: selectedType,
      ward: selectedWard,
      area: "3.2 sq km",
      households: selectedType === 'Residential' ? 120 : 0,
      status: "Active"
    };
    setRecords([newRecord, ...records]);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-[#166534] text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5" />
            Sub-10m Accuracy Field Surveyor Basemap
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0a2d21] tracking-tight">
            GIS & Geotagging Management
          </h1>
          <p className="text-xs sm:text-sm text-emerald-900/60 mt-1">
            Ward boundaries, road lengths, waste generator entrances, and GVP spatial coordinates.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-full bg-[#166534] hover:bg-[#0e4b25] text-white font-bold text-xs flex items-center gap-2 shadow-md self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Tag New Asset
        </button>
      </div>

      {/* Surveyor Questionnaire & Filter Bar (PDF Page 6-12) */}
      <div className="rounded-3xl bg-white p-5 border border-emerald-950/10 shadow-xs">
        <div className="text-xs font-bold uppercase tracking-wider text-emerald-900/70 mb-3 flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#166534]" />
          Surveyor Interface Questionnaire & Filters
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* City */}
          <div>
            <label className="block text-[11px] font-bold text-emerald-950 uppercase mb-1">1.2.1 City Name</label>
            <select className="w-full rounded-xl bg-emerald-50/70 border border-emerald-900/15 px-3 py-2 text-xs font-semibold text-[#0a2d21]">
              <option>Indore Smart City (Swachh #1)</option>
              <option>Navi Mumbai Municipal Corp</option>
              <option>Bengaluru Bruhat Smart Waste</option>
            </select>
          </div>

          {/* Zone */}
          <div>
            <label className="block text-[11px] font-bold text-emerald-950 uppercase mb-1">Zone Boundary</label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full rounded-xl bg-emerald-50/70 border border-emerald-900/15 px-3 py-2 text-xs font-semibold text-[#0a2d21]"
            >
              <option value="Zone 1">Zone 1 (Central Green)</option>
              <option value="Zone 2">Zone 2 (Eastern Corridor)</option>
              <option value="Zone 3">Zone 3 (Northern Commercial)</option>
              <option value="Zone 4">Zone 4 (Suburban Eco)</option>
            </select>
          </div>

          {/* Ward */}
          <div>
            <label className="block text-[11px] font-bold text-emerald-950 uppercase mb-1">Ward Boundary</label>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="w-full rounded-xl bg-emerald-50/70 border border-emerald-900/15 px-3 py-2 text-xs font-semibold text-[#0a2d21]"
            >
              <option value="Ward 01">Ward 01 - Sarafa Heritage</option>
              <option value="Ward 02">Ward 02 - Chhavani Eco</option>
              <option value="Ward 04">Ward 04 - Palasia Commercial Hub</option>
              <option value="Ward 08">Ward 08 - Vijay Nagar Residential</option>
            </select>
          </div>

          {/* Geo-tagging Type Dropdown (From PDF Page 6) */}
          <div>
            <label className="block text-[11px] font-bold text-[#166534] uppercase mb-1">1.2.2 Geo-Tagging Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full rounded-xl bg-emerald-100/70 border-2 border-[#166534] px-3 py-2 text-xs font-bold text-[#0a2d21]"
            >
              {GEOTAGGING_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Map + Right-Side Field Surveyor Tagging Console (PDF Page 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: GIS Interactive Map */}
        <div className="lg:col-span-2">
          {data ? (
            <OperationsMap
              markers={data.markers || []}
              height="540px"
              title="Field Surveyor Geotagging & Route Asset Mapping"
            />
          ) : (
            <div className="h-96 rounded-3xl bg-emerald-950/10 flex items-center justify-center">
              Loading Basemap...
            </div>
          )}
        </div>

        {/* Right 1 Col: Field Surveyor Geotagging Tablet UI (PDF Page 7) */}
        <div className="rounded-3xl bg-white p-5 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-emerald-100">
              <span className="text-xs font-bold text-[#0a2d21] uppercase tracking-wide">
                Surveyor Asset Registration
              </span>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                GPS Lock: ±2m
              </span>
            </div>

            {/* Quick Type Selection Pills */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {['Residential', 'Commercial', 'Institutional', 'BWG', 'GVP', 'Route'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    selectedType === type
                      ? 'bg-[#166534] text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-950 hover:bg-emerald-100'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  {type}
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveAsset} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-emerald-950 mb-1">
                  Property / Asset GIS ID
                </label>
                <input
                  type="text"
                  value={propertyId}
                  onChange={(e) => setPropertyId(e.target.value)}
                  className="w-full rounded-xl bg-emerald-50/70 border border-emerald-900/15 px-3 py-2 text-xs font-mono font-semibold"
                />
              </div>

              {/* Entrance QR Code Generator (PDF Page 12: Embedded QR code at Entrance Gate) */}
              <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-emerald-200 p-1 flex items-center justify-center">
                    <QrCode className="w-9 h-9 text-[#0a2d21]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0a2d21]">Entrance Gate QR</p>
                    <p className="text-[10px] text-emerald-800 font-mono">QR-IMC-{propertyId}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-xs font-bold text-[#166534] hover:bg-emerald-100"
                >
                  Scan / Print
                </button>
              </div>

              {/* Photographic Audit (PDF Page 8, 9, 10, 11) */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-3 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/40 text-center cursor-pointer hover:bg-emerald-50">
                  <Camera className="w-5 h-5 text-[#166534] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-emerald-900 block">1A. Start Point Photo</span>
                  <span className="text-[9px] text-emerald-700">GPS Watermarked</span>
                </div>
                <div className="p-3 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/40 text-center cursor-pointer hover:bg-emerald-50">
                  <Camera className="w-5 h-5 text-[#166534] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-emerald-900 block">2A. Landmark Photo</span>
                  <span className="text-[9px] text-emerald-700">GPS Watermarked</span>
                </div>
              </div>

              {savedToast && (
                <div className="p-2 rounded-xl bg-[#a3e635]/30 border border-[#a3e635] text-xs font-bold text-[#061e16] text-center">
                  ✓ Asset Geotagged and Linked to Ward GIS!
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-full bg-[#a3e635] hover:bg-[#84cc16] text-[#061e16] font-extrabold text-xs uppercase tracking-wider shadow-md active:scale-98 transition-all cursor-pointer"
              >
                Save & Geotag Asset
              </button>
            </form>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-100 text-[11px] text-emerald-800/70 flex items-center justify-between">
            <span>Accuracy: &lt; 4.2m RMS</span>
            <span>Surveyor ID: SUR-049</span>
          </div>
        </div>
      </div>

      {/* GIS Authority Data Table (Exact Schema from PDF Page 8, 9, 10, 11, 12) */}
      <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-[#0a2d21]">
              # Dashboard for Admin / Authority / Member — GIS Registry
            </h3>
            <p className="text-xs text-emerald-900/60">
              Official boundary, route, and waste generator tagging records with photographic logs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
              Total Records: {records.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-emerald-50/70 text-emerald-900 uppercase text-[10px] font-bold tracking-wider border-b border-emerald-100">
              <tr>
                <th className="py-3 px-3">GIS ID</th>
                <th className="py-3 px-3">Asset / Name</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Ward / Zone</th>
                <th className="py-3 px-3">Start Point (Lat, Long)</th>
                <th className="py-3 px-3">Landmark Photo</th>
                <th className="py-3 px-3">Coverage (Area/km)</th>
                <th className="py-3 px-3">Est. Time</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 text-emerald-950">
              {records.map((rec, i) => (
                <tr key={rec.id || i} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-[#166534]">{rec.id}</td>
                  <td className="py-3 px-3 font-semibold text-[#0a2d21]">{rec.name}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100/60 font-semibold text-[11px] text-emerald-900">
                      {rec.type}
                    </span>
                  </td>
                  <td className="py-3 px-3">{rec.ward} ({selectedZone})</td>
                  <td className="py-3 px-3 font-mono text-[11px]">22.7241°N, 75.8643°E</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-[#166534] font-bold text-[11px]">
                      <Camera className="w-3 h-3" />
                      View Photo
                    </span>
                  </td>
                  <td className="py-3 px-3">{rec.area}</td>
                  <td className="py-3 px-3">35 Mins</td>
                  <td className="py-3 px-3">
                    <StatusBadge status={rec.status} size="sm" />
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
