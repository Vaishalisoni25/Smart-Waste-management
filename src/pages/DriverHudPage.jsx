import React, { useState } from 'react';
import {
  Navigation,
  QrCode,
  Truck,
  Layers,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  RefreshCw,
  Camera,
  ArrowRight,
  Sparkles,
  Smartphone,
  ChevronLeft
} from 'lucide-react';
import OperationsMap from '../components/OperationsMap';
import Modal from '../components/Modal';

export default function DriverHudPage() {
  const [activeModal, setActiveModal] = useState(null); // 'qr' | 'segregation' | 'obstacle' | 'transfer'
  const [completedStops, setCompletedStops] = useState(68);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header with Mobile Persona Note */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#166534] text-[#a3e635] text-xs font-bold mb-2">
            <Smartphone className="w-3.5 h-3.5" />
            Driver & Helper In-Cab Mobile View (PDF Page 4 & 14)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0a2d21]">
            Driver Route Navigation & Field Workstation
          </h1>
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-[#a3e635] text-[#061e16] font-bold text-xs shadow-md animate-in fade-in">
          {toastMessage}
        </div>
      )}

      {/* Futuristic In-Cab Mobile Frame / Tablet View */}
      <div className="overflow-hidden rounded-3xl bg-[#061e16] text-white border-4 border-emerald-800/60 shadow-2xl">
        {/* Mobile Status Bar */}
        <div className="px-6 py-3 bg-[#041610] border-b border-emerald-900/60 flex items-center justify-between text-xs font-mono text-emerald-300">
          <div className="flex items-center gap-4">
            <span>10:28 AM</span>
            <span className="flex items-center gap-1.5 text-emerald-200">
              <Truck className="w-3.5 h-3.5 text-[#a3e635]" />
              Tipper Auto-04 (TRUCK-108)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>Ward: 12</span>
            <span className="text-[#a3e635]">● 82% Battery</span>
          </div>
        </div>

        {/* Live Shift Progress Ribbon (PDF Page 16: Live Progress Ribbon) */}
        <div className="px-6 py-4 bg-[#0a2d21] border-b border-emerald-800/40">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-emerald-200">
              Live Shift: {completedStops}/150 Stops Completed (45%)
            </span>
            <span className="text-[#a3e635] font-bold font-mono">2.9 km / 60.4%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-emerald-950 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#166534] to-[#a3e635] rounded-full transition-all duration-500"
              style={{ width: `${(completedStops / 150) * 100}%` }}
            />
          </div>
        </div>

        {/* Turn-by-Turn Navigation HUD Banner (PDF Page 4 & 14) */}
        <div className="p-6 bg-gradient-to-r from-[#0e3b2c] to-[#144e3b] border-b border-emerald-700/40 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#a3e635] text-[#061e16] flex items-center justify-center shrink-0 shadow-lg shadow-[#a3e635]/20">
            <Navigation className="w-8 h-8 rotate-[-45deg]" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              150 m <span className="text-[#a3e635]">LEFT on OAK AVENUE</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 font-semibold mt-1">
              NEXT STOP: #42: Greenfield Apartments - BWG (Bulk Waste Generator)
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-emerald-300/80">
              <span>ETA: 10:30 AM</span>
              <span>Target QR: QR-BWG-W12-042</span>
            </div>
          </div>
        </div>

        {/* In-Cab Map & Active Breadcrumbs */}
        <div className="relative h-[380px] w-full bg-black">
          <OperationsMap
            height="380px"
            title="In-Cab Live GIS Navigation Feed"
            showControls={false}
          />

          {/* Floating Next Stops Chips on top of map */}
          <div className="absolute top-4 left-4 right-4 z-1000 flex gap-2 overflow-x-auto pb-1">
            <div className="px-3 py-1.5 rounded-xl bg-emerald-950/90 backdrop-blur-md border border-emerald-500/50 text-xs flex items-center gap-2 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#a3e635]" />
              <span>Stop #40: Completed</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-emerald-950/90 backdrop-blur-md border border-emerald-500/50 text-xs flex items-center gap-2 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#a3e635]" />
              <span>Stop #41: Completed</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#a3e635] text-[#061e16] font-bold text-xs flex items-center gap-2 shrink-0 shadow-lg">
              <MapPin className="w-3.5 h-3.5" />
              <span>Stop #42: Greenfield (Target)</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-xs flex items-center gap-2 shrink-0 text-emerald-300">
              <span>Stop #43: Sunrise Mall</span>
            </div>
          </div>
        </div>

        {/* 4 In-Cab Quick Action Buttons (PDF Page 4 & 14 Bottom Dock) */}
        <div className="p-4 bg-[#041610] grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Button 1: Arrived & Scan QR */}
          <button
            onClick={() => setActiveModal('qr')}
            className="p-3.5 rounded-2xl bg-gradient-to-b from-[#0e3b2c] to-[#0a2d21] hover:from-[#144e3b] hover:to-[#0e3b2c] border border-emerald-600/40 text-center flex flex-col items-center gap-2 shadow-md group transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#a3e635]/20 text-[#a3e635] group-hover:bg-[#a3e635] group-hover:text-[#061e16] flex items-center justify-center transition-colors">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">
              Arrived & Scan QR
            </span>
          </button>

          {/* Button 2: Log Waste Segregation */}
          <button
            onClick={() => setActiveModal('segregation')}
            className="p-3.5 rounded-2xl bg-gradient-to-b from-[#0e3b2c] to-[#0a2d21] hover:from-[#144e3b] hover:to-[#0e3b2c] border border-emerald-600/40 text-center flex flex-col items-center gap-2 shadow-md group transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#a3e635]/20 text-[#a3e635] group-hover:bg-[#a3e635] group-hover:text-[#061e16] flex items-center justify-center transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">
              Log Waste Segregation
            </span>
          </button>

          {/* Button 3: Report Road Obstacle */}
          <button
            onClick={() => setActiveModal('obstacle')}
            className="p-3.5 rounded-2xl bg-gradient-to-b from-[#0e3b2c] to-[#0a2d21] hover:from-[#144e3b] hover:to-[#0e3b2c] border border-emerald-600/40 text-center flex flex-col items-center gap-2 shadow-md group transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 group-hover:bg-amber-400 group-hover:text-black flex items-center justify-center transition-colors">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">
              Report Obstacle
            </span>
          </button>

          {/* Button 4: Navigate to Transfer Station */}
          <button
            onClick={() => setActiveModal('transfer')}
            className="p-3.5 rounded-2xl bg-gradient-to-b from-[#0e3b2c] to-[#0a2d21] hover:from-[#144e3b] hover:to-[#0e3b2c] border border-emerald-600/40 text-center flex flex-col items-center gap-2 shadow-md group transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 group-hover:bg-purple-300 group-hover:text-black flex items-center justify-center transition-colors">
              <RefreshCw className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">
              To Transfer Stn
            </span>
          </button>
        </div>
      </div>

      {/* Modal 1: Arrived & Scan QR Code */}
      <Modal
        isOpen={activeModal === 'qr'}
        onClose={() => setActiveModal(null)}
        title="Scan Property QR Code"
        maxWidth="max-w-md"
      >
        <div className="p-4 text-center space-y-4 text-[#0a2d21]">
          <div className="w-48 h-48 mx-auto rounded-2xl border-4 border-dashed border-[#166534] bg-emerald-50 p-3 flex flex-col items-center justify-center relative">
            <QrCode className="w-32 h-32 text-[#0a2d21]" />
            <div className="absolute inset-x-4 h-1 bg-[#166534] animate-bounce" />
          </div>
          <div>
            <h4 className="font-bold text-base">QR-HSE-W12-0042 Verified</h4>
            <p className="text-xs text-emerald-800">Greenfield Apartments, Flat 402 • UCC Status: <strong>PAID (₹50)</strong></p>
          </div>
          <button
            onClick={() => {
              setCompletedStops((prev) => prev + 1);
              setActiveModal(null);
              triggerToast('✓ Stop #42 Verified and Logged to Central Municipal Database!');
            }}
            className="w-full py-3 rounded-full bg-[#166534] text-white font-bold text-xs uppercase"
          >
            Confirm Arrival & Check-In
          </button>
        </div>
      </Modal>

      {/* Modal 2: Log Waste Segregation */}
      <Modal
        isOpen={activeModal === 'segregation'}
        onClose={() => setActiveModal(null)}
        title="Log Waste Segregation Categories"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-[#0a2d21] text-xs">
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="font-bold text-emerald-950">Property: Greenfield Apartments #42</span>
            <p className="text-emerald-800 text-[11px]">Category: Bulk Waste Generator (Residential)</p>
          </div>

          <div className="space-y-2.5">
            <label className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-white">
              <span className="font-bold text-[#166534]">🌿 Wet Organic Waste (Bio)</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#166534]" />
            </label>
            <label className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-white">
              <span className="font-bold text-[#166534]">📦 Dry Recyclables (Paper/Plastics)</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#166534]" />
            </label>
            <label className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-white">
              <span className="font-bold text-amber-700">⚠️ Domestic Hazardous</span>
              <input type="checkbox" className="w-4 h-4 accent-amber-600" />
            </label>
            <label className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-white">
              <span className="font-bold text-rose-700">🚫 Mixed Waste (Contaminated)</span>
              <input type="checkbox" className="w-4 h-4 accent-rose-600" />
            </label>
          </div>

          <button
            onClick={() => {
              setActiveModal(null);
              triggerToast('✓ Segregation logged: Grade A (100% Segregated)');
            }}
            className="w-full py-3 rounded-full bg-[#166534] text-white font-bold text-xs uppercase"
          >
            Submit Segregation Log
          </button>
        </div>
      </Modal>

      {/* Modal 3: Report Road Obstacle */}
      <Modal
        isOpen={activeModal === 'obstacle'}
        onClose={() => setActiveModal(null)}
        title="Report Road Obstacle / Delay"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-[#0a2d21] text-xs">
          <p className="text-emerald-800">Alert the Control Room about unexpected beat interruptions:</p>
          <div className="grid grid-cols-2 gap-2">
            {['Heavy Traffic Jam', 'Road Construction', 'Vehicle Breakdown', 'Tree Fall / Waterlogging'].map((obs) => (
              <button
                key={obs}
                onClick={() => {
                  setActiveModal(null);
                  triggerToast(`⚠️ Incident logged: ${obs}. Alternative bypass calculated!`);
                }}
                className="p-3 rounded-xl border border-emerald-200 text-left font-bold text-emerald-950 hover:bg-emerald-50 hover:border-[#166534]"
              >
                {obs}
              </button>
            ))}
          </div>
        </div>
      </Modal>

      {/* Modal 4: Navigate to Transfer Station */}
      <Modal
        isOpen={activeModal === 'transfer'}
        onClose={() => setActiveModal(null)}
        title="Navigate to Central Transfer Station (TS-01)"
        maxWidth="max-w-md"
      >
        <div className="p-4 text-center space-y-4 text-[#0a2d21]">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <h4 className="font-bold text-base text-[#0a2d21]">TS-01 Tipping Bay Token Generated</h4>
            <p className="font-mono text-sm text-[#166534] font-bold mt-1">WB-TOKEN-8821-W04</p>
            <p className="text-xs text-emerald-800 mt-2">Destination: Central Transfer Station Bay 01</p>
            <p className="text-xs text-emerald-800">Distance: 3.4 km • Est. Transit: 12 mins</p>
          </div>
          <button
            onClick={() => {
              setActiveModal(null);
              triggerToast('✓ Navigation lock to TS-01 engaged. Scale 01 pre-notified!');
            }}
            className="w-full py-3 rounded-full bg-[#166534] text-white font-bold text-xs uppercase"
          >
            Start GPS Navigation to TS-01
          </button>
        </div>
      </Modal>
    </div>
  );
}
