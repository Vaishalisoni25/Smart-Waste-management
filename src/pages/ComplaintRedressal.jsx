import React, { useState, useEffect } from 'react';
import {
  MessageSquareWarning,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertTriangle,
  User,
  MapPin,
  Camera,
  Send,
  Search,
  Filter
} from 'lucide-react';
import { api } from '../services/api';
import OperationsMap from '../components/OperationsMap';
import StatusBadge from '../components/StatusBadge';

import { COMPLAINTS_DATA } from '../data/mockData';

export default function ComplaintRedressal() {
  const [complaintData, setComplaintData] = useState(COMPLAINTS_DATA || null);
  const [selectedTicket, setSelectedTicket] = useState(COMPLAINTS_DATA?.list?.[0] || null);
  const [resolveToast, setResolveToast] = useState('');

  useEffect(() => {
    async function load() {
      const res = await api.getComplaints();
      if (res) {
        setComplaintData(res);
        if (res.list?.length > 0) setSelectedTicket(res.list[0]);
      }
    }
    load();
  }, []);

  const handleResolve = () => {
    setResolveToast(`✓ Ticket ${selectedTicket?.id || ''} marked as RESOLVED! Citizen notified via SMS.`);
    setTimeout(() => setResolveToast(''), 3500);
  };

  if (!complaintData || !selectedTicket) {
    return <div className="p-8 text-center text-xs">Loading Grievance Redressal...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header (PDF Page 37) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#061e16] via-[#0a2d21] to-[#0e3b2c] p-6 text-white border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#a3e635] text-[#061e16] text-[11px] font-extrabold uppercase">
                Citizen 311 Grievance Redressal Portal
              </span>
              <span className="text-xs text-emerald-300">Statutory 24-Hour SLA Guarantee</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Complaint Redressal & Field Investigation
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Geo-tagged citizen grievance dispatch, escalation matrices, and photographic proof verification.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#166534] text-[#a3e635] px-3.5 py-1.5 rounded-xl border border-emerald-500/40 font-bold">
              SLA Adherence: 94.8%
            </span>
          </div>
        </div>
      </div>

      {resolveToast && (
        <div className="p-3.5 rounded-2xl bg-[#a3e635]/30 border border-[#a3e635] text-xs font-bold text-[#061e16] text-center animate-in fade-in">
          {resolveToast}
        </div>
      )}

      {/* KPI Ribbon (PDF Page 37) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Total Complaints Logged</p>
          <p className="text-2xl font-extrabold text-[#0a2d21] mt-1">{complaintData.total}</p>
          <span className="text-[10px] text-emerald-700">Citizen App & Toll Free</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Resolved Today</p>
          <p className="text-2xl font-extrabold text-[#166534] mt-1">385</p>
          <span className="text-[10px] text-emerald-700">Photographic Evidence</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">In Progress / Pending</p>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">92</p>
          <span className="text-[10px] text-amber-700">Units on Route</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">SLA Compliance Rate</p>
          <p className="text-2xl font-extrabold text-[#166534] mt-1">{complaintData.slaRate}</p>
          <span className="text-[10px] text-emerald-700">&lt; 24 Hour Resolution</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Avg Resolution Time</p>
          <p className="text-2xl font-extrabold text-[#84cc16] mt-1">3.4 hrs</p>
          <span className="text-[10px] text-emerald-700">Fast Response</span>
        </div>
      </div>

      {/* Main Grid: Ticket Queue + GIS Map + Ticket Resolution Evidence Inspector (PDF Page 37) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Grievance Ticket Queue */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-5 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100">
              <h3 className="text-sm font-bold text-[#0a2d21]">Grievance Ticket Queue</h3>
              <span className="text-xs font-bold text-[#166534] bg-emerald-50 px-2 py-0.5 rounded-full">
                {complaintData.list.length} Tickets
              </span>
            </div>

            <div className="space-y-2.5">
              {complaintData.list.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicket(t)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    selectedTicket.id === t.id
                      ? 'bg-emerald-50/80 border-[#166534] shadow-xs'
                      : 'bg-white border-emerald-900/10 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-[#166534]">{t.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      t.priority === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {t.priority}
                    </span>
                  </div>
                  <p className="font-bold text-xs text-[#0a2d21] mt-1">{t.category}</p>
                  <p className="text-[11px] text-emerald-900/70 truncate">{t.location}</p>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-emerald-100 text-[10px] text-emerald-800">
                    <span>Citizen: {t.citizen}</span>
                    <StatusBadge status={t.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center 4 Cols: GIS Grievance Heatmap & Route Overlay */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <OperationsMap
            title="GIS Grievance Heatmap & Overlay"
            height="340px"
            showControls={false}
          />
          <div className="p-3.5 rounded-2xl bg-white border border-emerald-950/10 text-xs flex justify-between items-center">
            <span className="font-semibold text-emerald-950">Active Incident Dispatch:</span>
            <span className="font-bold text-[#166534]">Beat 04 Tipper En Route</span>
          </div>
        </div>

        {/* Right 4 Cols: Ticket Resolution & Evidence Inspector (PDF Page 37) */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-5 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100">
              <h3 className="text-sm font-bold text-[#0a2d21]">Ticket Resolution Inspector</h3>
              <span className="font-mono font-bold text-xs text-[#166534]">{selectedTicket.id}</span>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#061e16] border border-emerald-800/40 mb-3">
              <img
                src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=500&q=80"
                alt="Citizen Evidence"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white">
                Citizen Photo Evidence
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-[10px] text-white/90">
                <p className="font-mono">GPS: 28.6139° N, 77.2090° E</p>
                <p>Logged: {selectedTicket.date}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-emerald-950">
              <div className="flex justify-between">
                <span className="text-emerald-800/70">Category:</span>
                <span className="font-bold">{selectedTicket.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-800/70">Citizen:</span>
                <span>{selectedTicket.citizen}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-800/70">Assigned Team:</span>
                <span className="font-semibold text-[#166534]">{selectedTicket.team}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-800/70">Resolution SLA:</span>
                <span className="font-mono text-emerald-800">{selectedTicket.sla}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-100 space-y-2">
            <button
              onClick={handleResolve}
              className="w-full py-2.5 rounded-full bg-[#166534] hover:bg-[#0e4b25] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Resolve & Send SMS Closure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
