import React, { useState, useEffect } from 'react';
import {
  Trash2,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Camera,
  MapPin,
  Sparkles,
  ShieldCheck,
  Search,
  Check,
  X,
  Clock,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import OperationsMap from '../components/OperationsMap';
import StatusBadge from '../components/StatusBadge';

import { FIELD_PROPERTIES } from '../data/mockData';

export default function WasteCollection() {
  const [properties, setProperties] = useState(FIELD_PROPERTIES || []);
  const [activeProperty, setActiveProperty] = useState(FIELD_PROPERTIES?.[0] || null);
  const [confirmStatus, setConfirmStatus] = useState('');

  useEffect(() => {
    async function load() {
      const res = await api.getCollectionProperties();
      if (res && res.length > 0) {
        setProperties(res);
        setActiveProperty(res[0]);
      }
    }
    load();
  }, []);

  const handleConfirm = () => {
    setConfirmStatus(`✓ Collection confirmed for ${activeProperty?.houseId || ''}! Saved to Cloud Ledger.`);
    setTimeout(() => setConfirmStatus(''), 3500);
  };

  const handleFlagIssue = () => {
    setConfirmStatus(`⚠️ Non-compliance violation flagged for ${activeProperty?.houseId || ''}! Inspection notice sent.`);
    setTimeout(() => setConfirmStatus(''), 3500);
  };

  if (!activeProperty) {
    return <div className="p-8 text-center text-xs">Loading collection module...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. TOP EXECUTIVE TELEMETRY & COVERAGE KPIS (PDF Page 18 & 19) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#061e16] via-[#0a2d21] to-[#0e3b2c] p-6 text-white border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#a3e635] text-[#061e16] text-[11px] font-extrabold uppercase">
                Ward 04 Central • Morning Beat (06:00 - 14:00)
              </span>
              <span className="text-xs text-emerald-300">Supervisor SI-402 Verified</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Door to Door (D2D) Segregated Collection
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Field-worker friendly workstation with live QR scanner audit and real-time photographic proof.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-emerald-300 font-semibold">
              Live GPS Lock: <strong>22.7241° N, 75.8643° E</strong>
            </span>
          </div>
        </div>
      </div>

      {confirmStatus && (
        <div className="p-3.5 rounded-2xl bg-[#a3e635]/30 border border-[#a3e635] text-xs font-bold text-[#061e16] animate-in fade-in">
          {confirmStatus}
        </div>
      )}

      {/* KPI Ribbon (PDF Page 18 & 19: Stream Intake Breakdown) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Total Properties</p>
          <p className="text-xl font-extrabold text-[#0a2d21] mt-1">1,180 / 1,240</p>
          <span className="text-[11px] text-[#166534] font-bold">95.2% Covered</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Segregation Purity</p>
          <p className="text-xl font-extrabold text-[#166534] mt-1">91.8%</p>
          <span className="text-[11px] text-emerald-700">Target: &gt;90% SWM</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Wet Waste (Bio)</p>
          <p className="text-xl font-extrabold text-[#166534] mt-1">18.4 MT</p>
          <span className="text-[11px] text-emerald-700">To Bio-Methanation</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Dry Recyclable</p>
          <p className="text-xl font-extrabold text-[#84cc16] mt-1">9.6 MT</p>
          <span className="text-[11px] text-emerald-700">Direct to MRF Plant</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Route Punctuality</p>
          <p className="text-xl font-extrabold text-[#0a2d21] mt-1">98.4%</p>
          <span className="text-[11px] text-[#166534] font-bold">On-Time Arrival</span>
        </div>
      </div>

      {/* 2. MAIN D2D WORKSTATION (PDF Page 18: Map + Photographic Proof Viewports + Active Property) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Vector Basemap with Colored Pins */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <OperationsMap
            title="D2D Street Vector Basemap"
            height="340px"
            showControls={false}
          />

          {/* Map Pin Legend */}
          <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-bold text-emerald-950">
              <span className="w-2.5 h-2.5 rounded-full bg-[#166534]" /> Collected (Green)
            </span>
            <span className="flex items-center gap-1.5 font-bold text-emerald-950">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pending (Yellow)
            </span>
            <span className="flex items-center gap-1.5 font-bold text-emerald-950">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Non-Compliant (Red)
            </span>
          </div>
        </div>

        {/* Center 7 Cols: Active Property Card & Photographic Audit Viewports */}
        <div className="lg:col-span-7 rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            {/* Active Property Card Header */}
            <div className="flex flex-wrap items-start justify-between gap-2 pb-4 mb-4 border-b border-emerald-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#166534] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {activeProperty.houseId}
                  </span>
                  <span className="font-bold text-sm text-[#0a2d21]">
                    {activeProperty.resident}
                  </span>
                </div>
                <p className="text-xs text-emerald-900/70 mt-1">{activeProperty.address}</p>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                  UCC: {activeProperty.uccStatus}
                </span>
                <p className="text-[10px] font-mono text-emerald-700 mt-1">{activeProperty.qrId}</p>
              </div>
            </div>

            {/* 3 Dedicated Photographic Audit Viewports (PDF Page 18 & 19) */}
            <div className="text-xs font-bold text-[#0a2d21] uppercase tracking-wider mb-2">
              Mandatory Photographic Verification Audit
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Viewport 1: Wet Waste Photo */}
              <div className="relative rounded-2xl overflow-hidden bg-[#061e16] border border-emerald-800/40 group aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1584447141399-be2412124c05?auto=format&fit=crop&w=400&q=80"
                  alt="Wet Waste"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                <span className="absolute top-2 left-2 rounded-md bg-[#166534] text-[#a3e635] text-[10px] font-extrabold px-1.5 py-0.5">
                  96% Purity Grade A
                </span>
                <div className="absolute bottom-2 left-2 right-2 text-[10px] text-white/90">
                  <p className="font-bold text-[#a3e635]">Wet Bio-Waste</p>
                  <p className="font-mono text-[9px] text-emerald-200">GPS: 22.7241°N, 75.8643°E</p>
                </div>
              </div>

              {/* Viewport 2: Dry Waste Photo */}
              <div className="relative rounded-2xl overflow-hidden bg-[#061e16] border border-emerald-800/40 group aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80"
                  alt="Dry Waste"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                <span className="absolute top-2 left-2 rounded-md bg-blue-900 text-blue-200 text-[10px] font-extrabold px-1.5 py-0.5">
                  94% Recyclable
                </span>
                <div className="absolute bottom-2 left-2 right-2 text-[10px] text-white/90">
                  <p className="font-bold text-blue-300">Dry Packaging</p>
                  <p className="font-mono text-[9px] text-emerald-200">GPS: 22.7241°N, 75.8643°E</p>
                </div>
              </div>

              {/* Viewport 3: Mixed / Incident Warning Card */}
              <div className="relative rounded-2xl overflow-hidden bg-rose-950/40 border border-rose-500/50 p-3 flex flex-col justify-between aspect-4/3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                    Warning Flag
                  </span>
                  <Camera className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Capture Contamination</p>
                  <p className="text-[10px] text-rose-200/80 mt-0.5">Flag unsegregated mixed fractions</p>
                </div>
                <button
                  type="button"
                  onClick={handleFlagIssue}
                  className="w-full py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] uppercase tracking-wider transition-colors"
                >
                  Flag Mixed Defaulter
                </button>
              </div>
            </div>

            {/* Waste Stream Weight Telemetry */}
            <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Wet (kg)</span>
                <span className="font-black text-sm text-[#0a2d21]">2.4 kg</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Dry (kg)</span>
                <span className="font-black text-sm text-[#0a2d21]">1.8 kg</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Hazardous</span>
                <span className="font-black text-sm text-[#0a2d21]">0.0 kg</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Sanitary</span>
                <span className="font-black text-sm text-[#0a2d21]">0.2 kg</span>
              </div>
            </div>
          </div>

          {/* Action Dock (PDF Page 16: Confirm Collection & Flag Issue) */}
          <div className="mt-6 pt-4 border-t border-emerald-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleFlagIssue}
                className="px-4 py-2.5 rounded-full border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors"
              >
                Property Locked / Refused
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleConfirm}
                className="px-6 py-2.5 rounded-full bg-[#166534] hover:bg-[#0e4b25] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all active:scale-98"
              >
                <CheckCircle2 className="w-4 h-4 text-[#a3e635]" />
                Confirm Collection (Save & Next)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. HOUSEHOLD COLLECTION & UCC LEDGER (PDF Page 18 & 19 Bottom Grid) */}
      <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-[#0a2d21]">
              Household Collection & User Charge (UCC) Ledger
            </h3>
            <p className="text-xs text-emerald-900/60">
              Verified property logs linking QR tokens, arrival timestamps, and segregation grades
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#166534] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Audited Today: 82 / 135
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-emerald-50/70 text-emerald-900 uppercase text-[10px] font-bold tracking-wider border-b border-emerald-100">
              <tr>
                <th className="py-3 px-3">House ID / QR Code</th>
                <th className="py-3 px-3">Resident & Address</th>
                <th className="py-3 px-3">Time Visited</th>
                <th className="py-3 px-3">Collector ID</th>
                <th className="py-3 px-3">Segregation Grade</th>
                <th className="py-3 px-3">UCC Payment Status</th>
                <th className="py-3 px-3 text-right">Action / Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 text-emerald-950">
              {properties.map((prop, idx) => (
                <tr
                  key={prop.houseId || idx}
                  onClick={() => setActiveProperty(prop)}
                  className={`hover:bg-emerald-50/50 cursor-pointer transition-colors ${
                    activeProperty.houseId === prop.houseId ? 'bg-emerald-50/80 font-medium' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-mono font-bold text-[#166534]">
                    <div>{prop.houseId}</div>
                    <span className="text-[10px] text-emerald-800/60">{prop.qrId}</span>
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-bold text-[#0a2d21]">{prop.resident}</p>
                    <p className="text-[11px] text-emerald-900/70 truncate max-w-[220px]">{prop.address}</p>
                  </td>
                  <td className="py-3 px-3 font-mono text-emerald-800">{prop.timestamp}</td>
                  <td className="py-3 px-3 font-mono">COL-8821</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900">
                      {prop.segregationScore}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      prop.uccStatus.includes('Paid') ? 'bg-emerald-50 text-[#166534] border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {prop.uccStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      className="px-3 py-1 rounded-full bg-[#166534] text-white font-bold text-[10px] hover:bg-[#0e4b25]"
                    >
                      Audit
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
