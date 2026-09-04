import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Camera,
  ShieldAlert,
  Truck,
  MapPin,
  Radio,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import OperationsMap from '../components/OperationsMap';
import StatusBadge from '../components/StatusBadge';
import BeforeAfterViewer from '../components/BeforeAfterViewer';
import CameraFeedCard from '../components/CameraFeedCard';

import { GVP_INCIDENTS } from '../data/mockData';

export default function GvpManagement() {
  const [incidents, setIncidents] = useState(GVP_INCIDENTS || []);
  const [activeGvp, setActiveGvp] = useState(GVP_INCIDENTS?.[0] || null);
  const [dispatchToast, setDispatchToast] = useState('');

  useEffect(() => {
    async function load() {
      const res = await api.getGvpIncidents();
      if (res && res.length > 0) {
        setIncidents(res);
        setActiveGvp(res[0]);
      }
    }
    load();
  }, []);

  const handleDispatch = (gvpId) => {
    setDispatchToast(`🚨 Emergency Patrol Unit RAT-02 dispatched to ${gvpId || activeGvp?.id || 'GVP-01'} with high-pressure washer & tipper!`);
    setTimeout(() => setDispatchToast(''), 4500);
  };

  if (!activeGvp) {
    return <div className="p-8 text-center text-xs">Loading GVP Command Center...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#061e16] via-[#0a2d21] to-[#0e3b2c] p-6 text-white border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-[11px] font-extrabold uppercase animate-pulse">
                Zero-Tolerance GVP Elimination
              </span>
              <span className="text-xs text-emerald-300">AI CCTV & Drone Surveillance Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Garbage Vulnerable Point (GVP) Command Center
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Active Blackspot: <strong className="text-white">{activeGvp.location}</strong> ({activeGvp.id}) • Response Time: <strong className="text-[#a3e635]">{activeGvp.responseTime}</strong>
            </p>
          </div>

          <button
            onClick={() => handleDispatch(activeGvp.id)}
            className="px-6 py-3.5 rounded-full bg-[#a3e635] hover:bg-[#84cc16] text-[#061e16] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#a3e635]/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-[#061e16]" />
            DISPATCH UNIT NOW
          </button>
        </div>
      </div>

      {dispatchToast && (
        <div className="p-4 rounded-2xl bg-[#a3e635] border border-emerald-500 text-[#061e16] font-bold text-xs shadow-lg animate-in fade-in">
          {dispatchToast}
        </div>
      )}

      {/* KPI Cards (PDF Page 20 & 21) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Total Identified GVPs</p>
          <p className="text-2xl font-extrabold text-[#0a2d21] mt-1">48 Spots</p>
          <span className="text-[10px] text-emerald-700">Citywide Baseline</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Remediated & Beautified</p>
          <p className="text-2xl font-extrabold text-[#166534] mt-1">44 Spots</p>
          <span className="text-[10px] text-emerald-700">91.9% Resolution Rate</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Pending In Action</p>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">3 Spots</p>
          <span className="text-[10px] text-amber-700">RAT Units Assigned</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Critical Blackspots</p>
          <p className="text-2xl font-extrabold text-rose-600 mt-1">1 Spot</p>
          <span className="text-[10px] text-rose-700">Live AI CCTV Watch</span>
        </div>
      </div>

      {/* Main Grid: AI CCTV Feed + Before/After Transformation Workstation (PDF Page 21 & 22) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: AI CCTV Surveillance Feed with Bounding Box */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#0a2d21]">Live AI CCTV Video Surveillance Stream</h3>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              ● Active Intrusion
            </span>
          </div>

          <CameraFeedCard
            id="CAM-GVP-04A"
            name="GVP Hotspot #04 — Shastri Flyover Corner"
            location="Ward 04 Perimeter"
            status="LIVE ALERT"
            event="Unauthorized Dumping: Commercial plastic waste unloaded at 04:12 AM"
            fps="30 FPS • AI Vision"
            preview="https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80"
            hasAiBox={true}
            aiLabel="UNAUTHORIZED DUMPING DETECTED"
            onDispatch={() => handleDispatch(activeGvp.id)}
          />
        </div>

        {/* Right: Photographic Before & After Evidence Workstation (PDF Page 21 & 22) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#0a2d21]">GVP Transformation Audit: Before vs After</h3>
            <span className="text-xs font-bold text-[#166534] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Remediation 100% Verified
            </span>
          </div>

          <BeforeAfterViewer
            beforeImage={activeGvp.beforePhoto}
            afterImage={activeGvp.afterPhoto}
            beforeLabel="Before Clearance: Raw Municipal Spillover"
            afterLabel="After Beautification: Decorative Bio-Planters"
            location={activeGvp.location}
            timestamp="04:12 IST (Dumped) → 07:45 IST (Remediated)"
            gps="22.7230° N, 75.8590° E"
            verified={true}
          />
        </div>
      </div>

      {/* Real-time GVP Blackspot Status Roster Table (PDF Page 21 Bottom Grid) */}
      <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-[#0a2d21]">
              Real-Time GVP Blackspot Status Roster & Sign-Off Ledger
            </h3>
            <p className="text-xs text-emerald-900/60">
              Citywide vulnerable dumping points with assigned rapid response units
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
            All 48 Sites Geo-Fenced
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-emerald-50/70 text-emerald-900 uppercase text-[10px] font-bold tracking-wider border-b border-emerald-100">
              <tr>
                <th className="py-3 px-4">GVP ID</th>
                <th className="py-3 px-4">Location & Ward</th>
                <th className="py-3 px-4">Incident Category</th>
                <th className="py-3 px-4">Assigned Vehicle</th>
                <th className="py-3 px-4">Response Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Emergency Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 text-emerald-950">
              {incidents.map((inc) => (
                <tr
                  key={inc.id}
                  onClick={() => setActiveGvp(inc)}
                  className={`hover:bg-emerald-50/50 cursor-pointer transition-colors ${
                    activeGvp.id === inc.id ? 'bg-emerald-50/80 font-medium' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-mono font-bold text-[#166534]">{inc.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-[#0a2d21]">{inc.location}</p>
                    <span className="text-[10px] text-emerald-800/70">{inc.ward} ({inc.zone})</span>
                  </td>
                  <td className="py-3 px-4">{inc.incidentType}</td>
                  <td className="py-3 px-4 font-mono font-semibold">{inc.assignedVehicle}</td>
                  <td className="py-3 px-4">{inc.responseTime}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={inc.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDispatch(inc.id);
                      }}
                      className="px-3 py-1 rounded-full bg-[#166534] text-white font-bold text-[10px] hover:bg-[#0e4b25] transition-colors"
                    >
                      Dispatch
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
