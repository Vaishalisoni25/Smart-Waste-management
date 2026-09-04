import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  Scale,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Wind,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import OperationsMap from '../components/OperationsMap';
import StatusBadge from '../components/StatusBadge';

export default function TransferStation() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await api.getTransferStationData();
      setData(res);
    }
    load();
  }, []);

  if (!data) return <div className="p-8 text-center text-xs">Loading Transfer Station Command...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Telemetry Header (PDF Page 25 & 26) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#061e16] via-[#0a2d21] to-[#0e3b2c] p-6 text-white border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#a3e635] text-[#061e16] text-[11px] font-extrabold uppercase">
                Central Transfer Hub (TS-01) • 4 RORO Tipping Bays
              </span>
              <span className="text-xs text-emerald-300">ANPR Boom Barriers Online</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Transfer Station Monitoring & Dispatch Command
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Primary collection consolidation, stationary compactor density control, and long-haul hauler logistics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#166534] text-[#a3e635] px-3.5 py-1.5 rounded-xl border border-emerald-500/40 font-bold flex items-center gap-1.5">
              <Scale className="w-4 h-4" />
              Weighbridge: ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* KPI Ribbon (PDF Page 25 & 26) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Daily Inward Intake</p>
          <p className="text-2xl font-extrabold text-[#0a2d21] mt-1">{data.dailyInward}</p>
          <span className="text-[10px] text-emerald-700">Primary Ward Tippers</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Compactor Capacity</p>
          <p className="text-2xl font-extrabold text-[#166534] mt-1">{data.compactorCapacity}</p>
          <span className="text-[10px] text-emerald-700">High-Density Hydraulic Press</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Active Hook-Lift Haulers</p>
          <p className="text-2xl font-extrabold text-[#0a2d21] mt-1">{data.activeHaulers}</p>
          <span className="text-[10px] text-emerald-700">Intermodal RORO Hauling</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Bio-Odor Scrubber</p>
          <p className="text-2xl font-extrabold text-[#166534] mt-1">100% Safe</p>
          <span className="text-[10px] text-emerald-700">Zero Ammonia/VOC Emissions</span>
        </div>
      </div>

      {/* Regional GIS Inflow/Outflow Map & 4 Tipping Bays (PDF Page 25 & 26) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: GIS Logistics Map */}
        <div className="lg:col-span-2">
          <OperationsMap
            title="Regional Inflow / Outflow Haulage Corridor"
            height="460px"
          />
        </div>

        {/* Right 1 Col: Live Tipping Bays & Compactor Status */}
        <div className="rounded-3xl bg-white p-5 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-emerald-100">
              <h3 className="text-sm font-bold text-[#0a2d21]">Tipping Pit & Compactor Bays</h3>
              <span className="text-xs font-bold text-[#166534] bg-emerald-50 px-2 py-0.5 rounded-full">
                4/4 Operational
              </span>
            </div>

            <div className="space-y-3">
              {data.bays.map((bay) => (
                <div key={bay.bayNo} className="p-3 rounded-2xl border border-emerald-950/10 bg-emerald-50/40">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0a2d21]">{bay.bayNo}</span>
                    <StatusBadge status={bay.status} size="sm" />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-emerald-950">
                    <span className="font-mono text-emerald-800">{bay.truck}</span>
                    <span className="font-bold">{bay.load}</span>
                  </div>
                  <div className="mt-1 text-[11px] text-emerald-700 flex justify-between">
                    <span>ETA: {bay.eta}</span>
                    <span>Hydraulic: 210 Bar</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental Controls Telemetry */}
          <div className="mt-4 pt-3 border-t border-emerald-100 space-y-2 text-xs">
            <div className="flex items-center justify-between text-emerald-900 font-semibold">
              <span className="flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-[#166534]" />
                Bio-Filter Air Pressure:
              </span>
              <span className="font-bold text-[#166534]">-45 Pa (Negative Pressure)</span>
            </div>
            <div className="flex items-center justify-between text-emerald-900 font-semibold">
              <span>H2S Scrubber Sensor:</span>
              <span className="font-bold text-[#166534]">0.0 ppm (Optimal)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Inflow / Outflow Manifest Grid (PDF Page 25 Bottom Grid) */}
      <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-[#0a2d21]">
              Real-Time Inflow / Outflow Tipping Manifest Grid
            </h3>
            <p className="text-xs text-emerald-900/60">
              Automated weighbridge gross/tare logging and downstream dispatch tokens
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-emerald-50/70 text-emerald-900 uppercase text-[10px] font-bold tracking-wider border-b border-emerald-100">
              <tr>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Weigh Timestamp</th>
                <th className="py-3 px-4">Vehicle Reg. No.</th>
                <th className="py-3 px-4">Origin Ward</th>
                <th className="py-3 px-4">Inward Net Weight</th>
                <th className="py-3 px-4">Waste Stream</th>
                <th className="py-3 px-4 text-right">Assigned Hopper</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 text-emerald-950">
              {data.manifest.map((m) => (
                <tr key={m.id} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#166534]">{m.id}</td>
                  <td className="py-3 px-4 font-mono">{m.time}</td>
                  <td className="py-3 px-4 font-bold text-[#0a2d21]">{m.truck}</td>
                  <td className="py-3 px-4">{m.ward}</td>
                  <td className="py-3 px-4 font-bold text-[#166534]">{m.weight}</td>
                  <td className="py-3 px-4">{m.stream}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-100 font-bold text-[#0a2d21]">
                      {m.bay}
                    </span>
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
