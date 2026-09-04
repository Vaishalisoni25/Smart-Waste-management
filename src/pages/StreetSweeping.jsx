import React, { useState, useEffect } from 'react';
import {
  Wind,
  ShieldCheck,
  Truck,
  Droplets,
  CheckCircle2,
  Clock,
  Sparkles,
  Users,
  Activity,
  Award
} from 'lucide-react';
import { api } from '../services/api';
import OperationsMap from '../components/OperationsMap';
import StatusBadge from '../components/StatusBadge';
import BeforeAfterViewer from '../components/BeforeAfterViewer';

export default function StreetSweeping() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await api.getStreetSweepingData();
      setData(res);
    }
    load();
  }, []);

  if (!data) return <div className="p-8 text-center text-xs">Loading Street Sweeping...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Command Header & Shift Telemetry (PDF Page 44 & 45) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#061e16] via-[#0a2d21] to-[#0e3b2c] p-6 text-white border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#a3e635] text-[#061e16] text-[11px] font-extrabold uppercase flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                ASUTOS Municipal Street Sweeping & Air Dust Mitigation
              </span>
              <span className="text-xs text-emerald-300">Shift: 04:00 AM - 12:00 PM • SI-402 Suresh Patil</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Mechanized Sweeping, Anti-Smog & Gang Muster
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Integrated IoT sweeping telemetry, 100% PPE muster verification, and roadside PM10 air quality suppression.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#166534] text-[#a3e635] px-3.5 py-1.5 rounded-xl border border-emerald-500/40 font-bold font-mono">
              Air Quality Impact: -38.4% PM10
            </span>
          </div>
        </div>
      </div>

      {/* KPI Ribbon (PDF Page 44 & 45) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Total Distance</p>
          <p className="text-xl font-extrabold text-[#0a2d21] mt-1">{data.distanceCovered}</p>
          <span className="text-[10px] text-[#166534] font-bold">91.7% Beat Coverage</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Mechanized Sweepers</p>
          <p className="text-xl font-extrabold text-[#166534] mt-1">12 / 12 Active</p>
          <span className="text-[10px] text-emerald-700">142.0 km Swept</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Water Sprinklers</p>
          <p className="text-xl font-extrabold text-[#84cc16] mt-1">8 / 8 Deployed</p>
          <span className="text-[10px] text-emerald-700">112.0 km Mist Sprayed</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Manpower Muster</p>
          <p className="text-xl font-extrabold text-[#0a2d21] mt-1">{data.workersActive}</p>
          <span className="text-[10px] text-[#166534] font-bold">97.7% Biometric Check-In</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Silt Extracted</p>
          <p className="text-xl font-extrabold text-[#0a2d21] mt-1">{data.siltExtracted}</p>
          <span className="text-[10px] text-emerald-700">Containerized to Hub</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">PPE Compliance</p>
          <p className="text-xl font-extrabold text-[#166534] mt-1">{data.ppeCompliance}</p>
          <span className="text-[10px] text-emerald-700">100% Audit Verified</span>
        </div>
      </div>

      {/* 4 Dedicated Photographic Audit Viewports (PDF Page 44, 45, 46) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Photo 1: Mechanized Sweeping Vehicle MS-04 */}
        <div className="rounded-3xl bg-[#061e16] border border-emerald-800/40 p-3.5 text-white flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#a3e635] uppercase tracking-wider block mb-1">
              Photo 1: Vacuum Sweeper (MS-04)
            </span>
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black mb-2">
              <img
                src="https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=500&q=80"
                alt="Sweeper Truck"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-[#a3e635]">
                145 RPM BRUSHES
              </div>
            </div>
            <p className="text-xs font-bold text-white">Hopper: 3.42 / 4.5 MT (76% Full)</p>
            <p className="text-[11px] text-emerald-300/80">Vacuum: 18.4 kPa • Mist Jets Active</p>
          </div>
        </div>

        {/* Photo 2: Water Sprinkler & Mist Cannon SP-02 */}
        <div className="rounded-3xl bg-[#061e16] border border-emerald-800/40 p-3.5 text-white flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1">
              Photo 2: Mist Cannon (SP-02)
            </span>
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black mb-2">
              <img
                src="https://images.unsplash.com/photo-1584447141399-be2412124c05?auto=format&fit=crop&w=500&q=80"
                alt="Mist Cannon"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-blue-300">
                85 L/MIN @ 65 BAR
              </div>
            </div>
            <p className="text-xs font-bold text-white">Water Reserve: 4,600 / 6,000 L</p>
            <p className="text-[11px] text-emerald-300/80">Anti-Smog Dust Suppression</p>
          </div>
        </div>

        {/* Photo 3: Asutos PPE Manual Sweeping Gang */}
        <div className="rounded-3xl bg-[#061e16] border border-emerald-800/40 p-3.5 text-white flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Photo 3: 100% PPE Gang Muster
            </span>
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black mb-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                alt="PPE Gang"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-amber-300">
                210 / 215 MUSTER
              </div>
            </div>
            <p className="text-xs font-bold text-white">High-Vis Reflective Jackets</p>
            <p className="text-[11px] text-emerald-300/80">Safety Helmets, N95 & Boots Verified</p>
          </div>
        </div>

        {/* Photo 4: Before & After Street Audit */}
        <div className="rounded-3xl bg-[#061e16] border border-emerald-800/40 p-3.5 text-white flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              Photo 4: Before & After Audit
            </span>
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black mb-2">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=500&q=80"
                alt="Spotless Asphalt"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-[#166534] px-2 py-0.5 rounded text-[10px] font-bold text-white">
                SI-402 APPROVED
              </div>
            </div>
            <p className="text-xs font-bold text-white">PM10: 242 → 84 (Satisfactory)</p>
            <p className="text-[11px] text-emerald-300/80">2.42 MT Silt / km Extracted</p>
          </div>
        </div>
      </div>

      {/* GIS Route Basemap & Shift Manifest (PDF Page 44 & 46) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <OperationsMap
            title="GIS Street Sweeping Beat Coverage & Telemetry"
            height="420px"
          />
        </div>

        <div className="lg:col-span-6 rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100">
              <h3 className="text-base font-bold text-[#0a2d21]">Ward Sweeping Shift Manifest</h3>
              <span className="text-xs font-bold text-[#166534] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Shift: 04:00 AM - 12:00 PM
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {data.teams.map((t) => (
                <div key={t.id} className="p-3 rounded-2xl border border-emerald-100 bg-emerald-50/40 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#0a2d21]">{t.route}</p>
                    <p className="text-[11px] text-emerald-800/80">{t.workers} Workers • Vehicle: {t.sweeperTruck}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-[#166534]">{t.kmCovered}</p>
                    <StatusBadge status={t.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-100 flex justify-between items-center text-xs text-emerald-900">
            <span>Ward Progress: <strong>Ward 01 (96.4%), Ward 02 (94.2%)</strong></span>
            <span className="font-bold text-[#166534]">100% PPE Verified ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
