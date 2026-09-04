import React, { useState, useEffect } from 'react';
import {
  Camera,
  Maximize2,
  ShieldAlert,
  Radio,
  Sliders,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Sparkles,
  MapPin
} from 'lucide-react';
import { api } from '../services/api';
import CameraFeedCard from '../components/CameraFeedCard';
import StatusBadge from '../components/StatusBadge';

export default function CctvSurveillance() {
  const [cameras, setCameras] = useState([]);
  const [selectedCam, setSelectedCam] = useState(null);
  const [ptzZoom, setPtzZoom] = useState(1);
  const [ptzAction, setPtzAction] = useState('');

  useEffect(() => {
    async function load() {
      const res = await api.getCctvCameras();
      setCameras(res);
      if (res.length > 0) setSelectedCam(res[0]);
    }
    load();
  }, []);

  const handlePtz = (dir) => {
    setPtzAction(`PTZ: ${dir} applied to ${selectedCam?.id}`);
    setTimeout(() => setPtzAction(''), 2000);
  };

  if (!cameras.length) return <div className="p-8 text-center text-xs">Loading CCTV Feeds...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header (PDF Page 34) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#061e16] via-[#0a2d21] to-[#0e3b2c] p-6 text-white border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-[11px] font-black uppercase tracking-wider animate-pulse">
                Central Optical Surveillance Suite
              </span>
              <span className="text-xs text-emerald-300">AI Computer Vision Edge Nodes</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              CCTV Surveillance & Automated AI Detection
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Integrated multi-facility monitoring across Transfer Stations, MRF Sorting Belts, Weighbridges, and GVPs.
            </p>
          </div>

          {/* Quick Counter (PDF Page 34: 138 Active / 142 Total) */}
          <div className="flex items-center gap-2 bg-emerald-950/80 p-2 rounded-2xl border border-emerald-800/50">
            <div className="text-center px-3 border-r border-emerald-800/50">
              <span className="text-[10px] text-emerald-300 uppercase block font-semibold">Active</span>
              <span className="text-base font-extrabold text-[#a3e635]">138</span>
            </div>
            <div className="text-center px-3 border-r border-emerald-800/50">
              <span className="text-[10px] text-emerald-300 uppercase block font-semibold">Total</span>
              <span className="text-base font-extrabold text-white">142</span>
            </div>
            <div className="text-center px-3">
              <span className="text-[10px] text-rose-300 uppercase block font-semibold">Offline</span>
              <span className="text-base font-extrabold text-rose-400">4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 4 Camera Feeds (PDF Page 34) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cameras.map((cam) => (
          <div
            key={cam.id}
            onClick={() => setSelectedCam(cam)}
            className={`cursor-pointer transition-all ${
              selectedCam?.id === cam.id ? 'ring-2 ring-[#a3e635] rounded-3xl' : ''
            }`}
          >
            <CameraFeedCard
              id={cam.id}
              name={cam.name}
              location={cam.location}
              status={cam.status}
              event={cam.event}
              fps={cam.fps}
              preview={cam.preview}
              hasAiBox={cam.id === 'CAM-04' || cam.id === 'CAM-02'}
              aiLabel={cam.id === 'CAM-04' ? 'ILLEGAL DUMPING DETECTED' : 'PET POLYMER RECOGNIZED'}
            />
          </div>
        ))}
      </div>

      {/* AI Incident Alerts & PTZ Controls (PDF Page 34 Right Rail) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: AI Incident Alerts Stream */}
        <div className="lg:col-span-8 rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100">
            <h3 className="text-base font-bold text-[#0a2d21]">AI Computer Vision Incident Alerts</h3>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              3 High Priority Flags
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-rose-900">Illegal Dumping Detected — Ward 12 (High Priority)</p>
                  <span className="font-mono text-[11px] text-rose-700">14:35 IST</span>
                </div>
                <p className="text-rose-800 text-[11px] mt-0.5">Camera #04: Commercial sacks dropped near flyover pillar. License: MP-09-XX-9102 flagged.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-amber-900">Tipper Hopper Overflow — Central Transfer Station 3</p>
                  <span className="font-mono text-[11px] text-amber-700">14:28 IST</span>
                </div>
                <p className="text-amber-800 text-[11px] mt-0.5">Camera #01: Tipping Bay 3 compactor capacity reached 92%. Secondary hauler requested.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-emerald-900">ANPR Entry Gate Match — Weighbridge Scale 01</p>
                  <span className="font-mono text-[11px] text-emerald-700">14:15 IST</span>
                </div>
                <p className="text-emerald-800 text-[11px] mt-0.5">Camera #02: Truck MH-12-TR-9904 verified against active route BEAT-W04-01.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: PTZ Camera Controls (PDF Page 34) */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100">
              <h3 className="text-sm font-bold text-[#0a2d21]">PTZ Camera Controls</h3>
              <span className="font-mono font-bold text-xs text-[#166534]">{selectedCam?.id || 'CAM-01'}</span>
            </div>

            <p className="text-xs text-emerald-900/70 mb-4 truncate">{selectedCam?.name}</p>

            {/* D-Pad Controller */}
            <div className="w-36 h-36 mx-auto relative rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center shadow-inner">
              <button
                onClick={() => handlePtz('UP')}
                className="absolute top-1 p-2 hover:bg-emerald-200 rounded-full text-emerald-900"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <button
                onClick={() => handlePtz('DOWN')}
                className="absolute bottom-1 p-2 hover:bg-emerald-200 rounded-full text-emerald-900"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
              <button
                onClick={() => handlePtz('LEFT')}
                className="absolute left-1 p-2 hover:bg-emerald-200 rounded-full text-emerald-900"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handlePtz('RIGHT')}
                className="absolute right-1 p-2 hover:bg-emerald-200 rounded-full text-emerald-900"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 rounded-full bg-[#166534] text-white flex items-center justify-center font-bold text-[10px]">
                PTZ
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={() => handlePtz('ZOOM IN')}
                className="px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50 text-xs font-bold text-[#166534] flex items-center gap-1 hover:bg-emerald-100"
              >
                <ZoomIn className="w-3.5 h-3.5" /> Zoom +
              </button>
              <button
                onClick={() => handlePtz('ZOOM OUT')}
                className="px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50 text-xs font-bold text-[#166534] flex items-center gap-1 hover:bg-emerald-100"
              >
                <ZoomOut className="w-3.5 h-3.5" /> Zoom -
              </button>
            </div>
          </div>

          {ptzAction && (
            <p className="mt-3 text-[11px] text-center font-mono font-bold text-[#166534] bg-emerald-50 py-1 rounded-lg">
              {ptzAction}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
