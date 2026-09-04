import React, { useState, useEffect } from 'react';
import {
  Zap,
  ShieldAlert,
  Clock,
  Truck,
  CheckCircle2,
  Radio,
  Sparkles,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import OperationsMap from '../components/OperationsMap';
import StatusBadge from '../components/StatusBadge';
import BeforeAfterViewer from '../components/BeforeAfterViewer';
import CameraFeedCard from '../components/CameraFeedCard';

export default function RapidActionTeam() {
  const [data, setData] = useState(null);
  const [dispatchToast, setDispatchToast] = useState('');

  useEffect(() => {
    async function load() {
      const res = await api.getRatData();
      setData(res);
    }
    load();
  }, []);

  const handleDispatch = (ticketId) => {
    setDispatchToast(`🚨 Emergency Patrol Unit PATROL-02 DISPATCHED to ${ticketId || 'Sector 4'}! ETA: 6 mins.`);
    setTimeout(() => setDispatchToast(''), 4500);
  };

  if (!data) return <div className="p-8 text-center text-xs">Loading Rapid Action Team...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header (PDF Page 29) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#061e16] via-[#0a2d21] to-[#0e3b2c] p-6 text-white border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[11px] font-black uppercase tracking-wider animate-pulse">
                Emergency Dispatch Console — SWM 2026
              </span>
              <span className="text-xs text-emerald-300">Supervisor SI-402 Rajesh Sharma [Biometric Verified]</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Rapid Action Team (RAT) & Flying Squad Command
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Active Fleet: <strong>08/08 Units Online</strong> • Average Response: <strong className="text-[#a3e635]">14.2 Mins</strong> (&lt;30 min SLA) • Critical Alerts: <strong className="text-rose-400">3 Pending</strong>
            </p>
          </div>

          <button
            onClick={() => handleDispatch('SECTOR-4')}
            className="px-6 py-3.5 rounded-full bg-[#a3e635] hover:bg-[#84cc16] text-[#061e16] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#a3e635]/20 flex items-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5"
          >
            <ShieldAlert className="w-4 h-4 text-[#061e16]" />
            DISPATCH UNIT NOW
          </button>
        </div>
      </div>

      {dispatchToast && (
        <div className="p-4 rounded-2xl bg-[#a3e635] text-[#061e16] font-bold text-xs shadow-lg animate-in fade-in">
          {dispatchToast}
        </div>
      )}

      {/* KPI Ribbon (PDF Page 29 & 30) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Active Response Units</p>
          <p className="text-2xl font-extrabold text-[#166534] mt-1">08 / 08</p>
          <span className="text-[10px] text-emerald-700">100% Deployed On-Road</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Average Response Time</p>
          <p className="text-2xl font-extrabold text-[#0a2d21] mt-1">14.2 Mins</p>
          <span className="text-[10px] text-[#166534]">SLA Target &lt; 30 Mins</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Active Critical Alerts</p>
          <p className="text-2xl font-extrabold text-rose-600 mt-1">3 Incidents</p>
          <span className="text-[10px] text-rose-700">Units Dispatched</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Resolved Today</p>
          <p className="text-2xl font-extrabold text-[#166534] mt-1">25 Cleared</p>
          <span className="text-[10px] text-emerald-700">Cleaned & Sanitized</span>
        </div>
      </div>

      {/* Main Grid: GIS Basemap + AI CCTV Feed + Before/After (PDF Page 29 & 30) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: Emergency Patrol Basemap */}
        <div className="lg:col-span-6">
          <OperationsMap
            title="Real-Time 3D GIS Digital Twin & Patrol Tracking"
            height="460px"
          />
        </div>

        {/* Right 6 Cols: AI CCTV Urgent Alert + Before/After Remediation */}
        <div className="lg:col-span-6 space-y-4">
          <CameraFeedCard
            id="RAT-AI-01"
            name="AI CCTV Incident Alert: Sector 4 Corner"
            location="Ward 12, Sec 4"
            status="CRITICAL"
            event="Unauthorized Dumping Detected: 2.5 MT commercial waste spillover"
            preview="https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=600&q=80"
            hasAiBox={true}
            aiLabel="CRITICAL SPILLOVER DETECTED"
            onDispatch={() => handleDispatch('RAT-2026-0419')}
          />

          <BeforeAfterViewer
            beforeImage="https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=600&q=80"
            afterImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
            beforeLabel="Before Remediation: Roadside Spillover"
            afterLabel="After Remediation: 100% Cleared & Sanitized"
            location="Market Cross (GVP #012)"
            timestamp="08:12:04 IST (Logged) → 08:38:15 IST (Cleared)"
            gps="18.5204° N, 73.8567° E"
          />
        </div>
      </div>

      {/* Incident Dispatch & Statutory Clearance Ledger (PDF Page 29 Bottom Grid) */}
      <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-[#0a2d21]">Incident Dispatch Registry & Closure Sign-Offs</h3>
            <p className="text-xs text-emerald-900/60">Live ticket queue, alert origins, and assigned rapid units</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-emerald-50/70 text-emerald-900 uppercase text-[10px] font-bold tracking-wider border-b border-emerald-100">
              <tr>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Alert Source</th>
                <th className="py-3 px-4">Location & Ward</th>
                <th className="py-3 px-4">Waste Vol.</th>
                <th className="py-3 px-4">Assigned Unit</th>
                <th className="py-3 px-4">Driver / Biometric</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Sign-Off</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 text-emerald-950">
              {data.incidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#166534]">{inc.id}</td>
                  <td className="py-3 px-4 font-semibold text-[#0a2d21]">{inc.type}</td>
                  <td className="py-3 px-4">{inc.gvp}</td>
                  <td className="py-3 px-4 font-bold">1.8 MT</td>
                  <td className="py-3 px-4 font-mono font-semibold">PATROL-02</td>
                  <td className="py-3 px-4 text-[#166534] font-medium">Vikram Singh [VERIFIED]</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={inc.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDispatch(inc.id)}
                      className="px-3 py-1 rounded-full bg-[#166534] text-white font-bold text-[10px] hover:bg-[#0e4b25]"
                    >
                      Clear / Sign
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
