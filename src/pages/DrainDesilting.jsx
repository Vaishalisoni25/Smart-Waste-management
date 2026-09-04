import React, { useState, useEffect } from 'react';
import {
  Droplets,
  ShieldCheck,
  Truck,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Sparkles,
  Gauge,
  Waves,
  Wind
} from 'lucide-react';
import { api } from '../services/api';
import OperationsMap from '../components/OperationsMap';
import StatusBadge from '../components/StatusBadge';
import BeforeAfterViewer from '../components/BeforeAfterViewer';

export default function DrainDesilting() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await api.getDrainDesiltingData();
      setData(res);
    }
    load();
  }, []);

  if (!data) return <div className="p-8 text-center text-xs">Loading Drain Desilting Command...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Command Header & Pre-Monsoon Telemetry (PDF Page 47 & 48) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#061e16] via-[#0a2d21] to-[#0e3b2c] p-6 text-white border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#a3e635] text-[#061e16] text-[11px] font-extrabold uppercase flex items-center gap-1">
                <Waves className="w-3.5 h-3.5" />
                ASUTOS Monsoon Preparedness Phase 02
              </span>
              <span className="text-xs text-emerald-300">Shift: 05:00 AM - 01:00 PM • JE-08 A. Khan [Face Auth Verified]</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Storm Drain Desilting & Nallah Heavy Operations
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Deep nallah dredging, Super Sucker vacuum culvert clearing, multi-gas telemetry (H2S/CH4), and flood hotspot mitigation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#166534] text-[#a3e635] px-3.5 py-1.5 rounded-xl border border-emerald-500/40 font-bold font-mono">
              Flood Mitigation: 87.5% Cleared
            </span>
          </div>
        </div>
      </div>

      {/* KPI Ribbon (PDF Page 47 & 48) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Network Cleared</p>
          <p className="text-xl font-extrabold text-[#0a2d21] mt-1">{data.networkCleared}</p>
          <span className="text-[10px] text-[#166534] font-bold">184.5 / 210 km</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Silt Extracted</p>
          <p className="text-xl font-extrabold text-[#166534] mt-1">1,842.6 MT</p>
          <span className="text-[10px] text-emerald-700">128.4 MT Today</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Specialized Machines</p>
          <p className="text-xl font-extrabold text-[#84cc16] mt-1">{data.machinesActive}</p>
          <span className="text-[10px] text-emerald-700">12 Super Suckers + 6 JCB</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Flood Points Cleared</p>
          <p className="text-xl font-extrabold text-[#0a2d21] mt-1">{data.floodPointsCleared}</p>
          <span className="text-[10px] text-[#166534] font-bold">Lowland Inundation</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Safety Compliance</p>
          <p className="text-xl font-extrabold text-[#166534] mt-1">{data.safetyCompliance}</p>
          <span className="text-[10px] text-emerald-700">Zero Toxic Gas Incidents</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Crew Muster</p>
          <p className="text-xl font-extrabold text-[#0a2d21] mt-1">145 / 150</p>
          <span className="text-[10px] text-[#166534] font-bold">96.7% Biometric Pass</span>
        </div>
      </div>

      {/* 4 Dedicated Photographic Audit Panels (PDF Page 47 & 49) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Photo 1: Heavy Open Nallah Desilting */}
        <div className="rounded-3xl bg-[#061e16] border border-emerald-800/40 p-3.5 text-white flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#a3e635] uppercase tracking-wider block mb-1">
              Photo 1: Long-Boom Excavator (EX-02)
            </span>
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black mb-2">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=500&q=80"
                alt="Excavator"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-[#a3e635]">
                18.5 MT/HR DREDGING
              </div>
            </div>
            <p className="text-xs font-bold text-white">Central Major Nallah Section B</p>
            <p className="text-[11px] text-emerald-300/80">Depth: 3.8m • Tipper DT-09 Active</p>
          </div>
        </div>

        {/* Photo 2: Super Sucker Vacuum & Jetting Truck */}
        <div className="rounded-3xl bg-[#061e16] border border-emerald-800/40 p-3.5 text-white flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1">
              Photo 2: Super Sucker (SS-02)
            </span>
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black mb-2">
              <img
                src="https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=500&q=80"
                alt="Super Sucker"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-blue-300">
                180 BAR JETTING • -0.92 BAR VAC
              </div>
            </div>
            <p className="text-xs font-bold text-white">Culvert Siphon Extraction</p>
            <p className="text-[11px] text-emerald-300/80">Tank Payload: 5.8 / 7.0 MT</p>
          </div>
        </div>

        {/* Photo 3: Asutos PPE Safety Gang & 4-Gas Detector */}
        <div className="rounded-3xl bg-[#061e16] border border-emerald-800/40 p-3.5 text-white flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              Photo 3: 4-Gas Detector HUD
            </span>
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black mb-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                alt="Gas Detector"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-[#166534] px-2 py-0.5 rounded text-[10px] font-bold text-white">
                100% SAFE GAS AUDIT
              </div>
            </div>
            <p className="text-xs font-bold text-white font-mono">H2S: 0.0 ppm • CO: 1.2 ppm</p>
            <p className="text-[11px] text-emerald-300/80 font-mono">O2: 20.9% • LEL: 0% (Optimal)</p>
          </div>
        </div>

        {/* Photo 4: Before & After Drain Comparison */}
        <div className="rounded-3xl bg-[#061e16] border border-emerald-800/40 p-3.5 text-white flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              Photo 4: Before & After Drain
            </span>
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black mb-2">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=500&q=80"
                alt="Desilted Bed"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-[#166534] px-2 py-0.5 rounded text-[10px] font-bold text-white">
                CERT #DN-884 APPROVED
              </div>
            </div>
            <p className="text-xs font-bold text-white">Silt: 78% Depth → 0% (Cleared)</p>
            <p className="text-[11px] text-emerald-300/80">Sanitized with Lime-Powdered Borders</p>
          </div>
        </div>
      </div>

      {/* Ultrasonic Silt Depth Sensors & Work Order Manifest (PDF Page 47 & 50) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Ultrasonic IoT Chamber Telemetry */}
        <div className="lg:col-span-5 rounded-3xl bg-white p-5 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100">
              <h3 className="text-sm font-bold text-[#0a2d21]">Ultrasonic IoT Chamber Telemetry</h3>
              <span className="text-xs font-bold text-[#166534] bg-emerald-50 px-2 py-0.5 rounded-full">
                Live Sensor Poles
              </span>
            </div>

            <div className="space-y-3">
              {data.sensorTelemetry.map((sen, idx) => (
                <div key={idx} className="p-3 rounded-2xl border border-emerald-100 bg-emerald-50/40">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0a2d21]">{sen.location}</span>
                    <StatusBadge status={sen.status} size="sm" />
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-emerald-950">
                    <div>
                      <span className="text-emerald-800/70 block">Silt Depth:</span>
                      <span className="font-bold">{sen.siltDepth}</span>
                    </div>
                    <div>
                      <span className="text-emerald-800/70 block">Water Flow Velocity:</span>
                      <span className="font-bold">{sen.flowSpeed}</span>
                    </div>
                  </div>
                  <div className="mt-1 pt-1 border-t border-emerald-100 text-[10px] text-emerald-800 flex justify-between font-mono">
                    <span>H2S: {sen.h2sGas}</span>
                    <span>CH4: {sen.ch4Gas}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Desilting Work Orders Ledger */}
        <div className="lg:col-span-7 rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100">
              <h3 className="text-base font-bold text-[#0a2d21]">Desilting Work Orders & Equipment Roster</h3>
              <span className="text-xs font-bold text-[#166534] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                18 Heavy Machines Assigned
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-emerald-50/70 text-emerald-900 uppercase text-[10px] font-bold tracking-wider border-b border-emerald-100">
                  <tr>
                    <th className="py-2.5 px-3">Work Order</th>
                    <th className="py-2.5 px-3">Drain / Nallah Stretch</th>
                    <th className="py-2.5 px-3">Length</th>
                    <th className="py-2.5 px-3">Deployed Machine</th>
                    <th className="py-2.5 px-3">Progress</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50 text-emerald-950">
                  {data.workOrders.map((wo) => (
                    <tr key={wo.woId} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#166534]">{wo.woId}</td>
                      <td className="py-2.5 px-3 font-bold text-[#0a2d21]">{wo.drainName}</td>
                      <td className="py-2.5 px-3">{wo.length}</td>
                      <td className="py-2.5 px-3 font-semibold text-emerald-800">{wo.machine}</td>
                      <td className="py-2.5 px-3 font-bold text-[#166534]">{wo.progress}</td>
                      <td className="py-2.5 px-3 text-right">
                        <StatusBadge status={wo.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
            <span>Silt Disposal Destination: <strong>Municipal Drying Containment Beds (Yard 02)</strong></span>
            <span className="font-bold text-[#166534]">Statutory Engineer Sign-Off ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
