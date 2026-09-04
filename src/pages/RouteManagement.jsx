import React, { useState, useEffect } from 'react';
import {
  Route,
  Truck,
  User,
  Clock,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  MapPin
} from 'lucide-react';
import { api } from '../services/api';
import OperationsMap from '../components/OperationsMap';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

export default function RouteManagement() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  // Form states for Route Allocation modal
  const [allocForm, setAllocForm] = useState({
    routeId: 'BEAT-W04-01',
    vehicleId: 'TRUCK-402 (Compactor)',
    driverName: 'Suresh Kumar',
    helperName: 'Ravi Singh',
    collectorId: 'COL-8492',
    ward: 'Ward 04',
    zone: 'Zone 1',
    startTime: '06:30 AM'
  });

  useEffect(() => {
    async function load() {
      const res = await api.getRoutes();
      setRoutes(res);
      if (res.length > 0) setSelectedRoute(res[0]);
    }
    load();
  }, []);

  const handleAllocateSubmit = (e) => {
    e.preventDefault();
    setSuccessToast(`✓ Route ${allocForm.routeId} successfully allocated to ${allocForm.vehicleId}!`);
    setModalOpen(false);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  if (!selectedRoute) {
    return <div className="p-8 text-center text-xs">Loading routes...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. TOP HEADER & TELEMETRY BAR (PDF Page 15) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#061e16] via-[#0a2d21] to-[#0e3b2c] p-6 text-white border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#a3e635] text-[#061e16] text-[11px] font-extrabold uppercase">
                Supervisor Route Allocation & Telemetry
              </span>
              <span className="text-xs text-emerald-300">Biometric Face-Auth Verified</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Smart Route Management & Beat Tracking
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Active Driver: <strong className="text-white">{selectedRoute.driver}</strong> • Collector ID: <strong className="text-[#a3e635]">{selectedRoute.collector}</strong> • Vehicle: <strong className="text-white">{selectedRoute.truck}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 rounded-full bg-[#a3e635] hover:bg-[#84cc16] text-[#061e16] font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Allocate Route
            </button>
            <button
              onClick={() => setSuccessToast('🚨 Breakdown SOS triggered! Standby recovery truck dispatched to current GPS coordinates.')}
              className="px-4 py-3 rounded-full bg-rose-950/80 text-rose-200 hover:bg-rose-900 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
              SOS Breakdown
            </button>
          </div>
        </div>
      </div>

      {successToast && (
        <div className="p-3.5 rounded-2xl bg-[#a3e635]/25 border border-[#a3e635] text-xs font-bold text-[#061e16] animate-in fade-in">
          {successToast}
        </div>
      )}

      {/* 2. ROUTE STATISTICS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Active Beat</p>
          <p className="text-lg font-extrabold text-[#0a2d21] font-mono mt-1">{selectedRoute.id}</p>
          <span className="text-[10px] text-emerald-700">{selectedRoute.ward}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Assigned Truck</p>
          <p className="text-base font-extrabold text-[#0a2d21] truncate mt-1">{selectedRoute.truck.split(' ')[0]}</p>
          <span className="text-[10px] text-emerald-700">Compactor 14m³</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Beat Length</p>
          <p className="text-lg font-extrabold text-[#0a2d21] mt-1">{selectedRoute.distance}</p>
          <span className="text-[10px] text-emerald-700">Covered: 2.9 km</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Completion</p>
          <p className="text-lg font-extrabold text-[#166534] mt-1">{selectedRoute.completion}%</p>
          <span className="text-[10px] text-emerald-700">{selectedRoute.stopsCompleted}/{selectedRoute.stopsTotal} Stops</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Est. Remaining</p>
          <p className="text-lg font-extrabold text-[#0a2d21] mt-1">{selectedRoute.etaMin.split(' ')[0]} min</p>
          <span className="text-[10px] text-emerald-700">On Track SLA</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Beat Status</p>
          <div className="mt-1.5">
            <StatusBadge status={selectedRoute.status} size="sm" />
          </div>
        </div>
      </div>

      {/* 3. ROUTE TRAJECTORY MAP & TURN-BY-TURN HUD (PDF Page 15 & 16) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Map */}
        <div className="lg:col-span-2">
          <OperationsMap
            title={`Live Beat Trajectory — ${selectedRoute.id}`}
            height="460px"
          />
        </div>

        {/* Turn-by-Turn Sequence Checklist */}
        <div className="rounded-3xl bg-white p-5 border border-emerald-950/10 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100">
            <div>
              <h3 className="text-sm font-bold text-[#0a2d21]">Route Stop Sequence</h3>
              <p className="text-[11px] text-emerald-900/60">Start → D2D Stops → Landmarks → GVP → Transfer</p>
            </div>
            <span className="text-xs font-bold text-[#166534] bg-emerald-50 px-2 py-0.5 rounded-full">
              {selectedRoute.sequence.filter(s => s.done).length} / {selectedRoute.sequence.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {selectedRoute.sequence.map((step, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                  step.done
                    ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950'
                    : 'bg-white border-emerald-900/10 text-emerald-900/80 hover:border-emerald-300'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                  step.done ? 'bg-[#166534] text-white' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {step.done ? '✓' : idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className={`text-xs font-bold truncate ${step.done ? 'text-[#0a2d21]' : 'text-emerald-900'}`}>
                      {step.name}
                    </p>
                    <span className="text-[10px] font-semibold text-emerald-700 shrink-0">{step.time}</span>
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded mt-1 inline-block ${
                    step.type === 'start' ? 'bg-blue-100 text-blue-800' :
                    step.type === 'gvp' ? 'bg-rose-100 text-rose-800' :
                    step.type === 'end' ? 'bg-purple-100 text-purple-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {step.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs">
            <span className="text-emerald-800/70">Route Adherence:</span>
            <span className="font-bold text-[#166534]">98.2% Verified GPS</span>
          </div>
        </div>
      </div>

      {/* 4. ALLOCATION MODAL (PDF Page 15: Allocate Route by Collector ID) */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Allocate Route & Vehicle Assignment"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleAllocateSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase mb-1">Select Route ID</label>
              <select
                value={allocForm.routeId}
                onChange={(e) => setAllocForm({ ...allocForm, routeId: e.target.value })}
                className="w-full rounded-xl bg-emerald-50/70 border border-emerald-900/15 px-3 py-2 text-xs font-bold"
              >
                <option value="BEAT-W04-01">BEAT-W04-01 (Palasia Market to MRF)</option>
                <option value="BEAT-W02-03">BEAT-W02-03 (Chhavani Eco to CTS)</option>
                <option value="BEAT-W08-02">BEAT-W08-02 (Vijay Nagar Phase 1)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase mb-1">Vehicle Assignment</label>
              <select
                value={allocForm.vehicleId}
                onChange={(e) => setAllocForm({ ...allocForm, vehicleId: e.target.value })}
                className="w-full rounded-xl bg-emerald-50/70 border border-emerald-900/15 px-3 py-2 text-xs font-bold"
              >
                <option value="TRUCK-402 (Compactor)">TRUCK-402 (Heavy Compactor)</option>
                <option value="TRUCK-108 (Tipper)">TRUCK-108 (Twin Bin Tipper)</option>
                <option value="TRUCK-215 (Twin Bin)">TRUCK-215 (Hydraulic Tipper)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase mb-1">Driver Name</label>
              <input
                type="text"
                value={allocForm.driverName}
                onChange={(e) => setAllocForm({ ...allocForm, driverName: e.target.value })}
                className="w-full rounded-xl bg-emerald-50/70 border border-emerald-900/15 px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase mb-1">Helper Name</label>
              <input
                type="text"
                value={allocForm.helperName}
                onChange={(e) => setAllocForm({ ...allocForm, helperName: e.target.value })}
                className="w-full rounded-xl bg-emerald-50/70 border border-emerald-900/15 px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase mb-1">Collector ID</label>
              <input
                type="text"
                value={allocForm.collectorId}
                onChange={(e) => setAllocForm({ ...allocForm, collectorId: e.target.value })}
                className="w-full rounded-xl bg-emerald-50/70 border border-emerald-900/15 px-3 py-2 text-xs font-mono font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase mb-1">Ward</label>
              <input
                type="text"
                value={allocForm.ward}
                readOnly
                className="w-full rounded-xl bg-emerald-100/50 border border-emerald-900/15 px-3 py-2 text-xs font-semibold text-emerald-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase mb-1">Start Time</label>
              <input
                type="text"
                value={allocForm.startTime}
                onChange={(e) => setAllocForm({ ...allocForm, startTime: e.target.value })}
                className="w-full rounded-xl bg-emerald-50/70 border border-emerald-900/15 px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
            <strong>Target Waste Generators:</strong> 320 D2D points (180 Residential + 14 Commercial BWG)
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-emerald-100">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-full border border-emerald-200 text-xs font-semibold text-emerald-900 hover:bg-emerald-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#166534] hover:bg-[#0e4b25] text-white text-xs font-bold uppercase tracking-wide shadow-md"
            >
              Confirm Allocation
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
