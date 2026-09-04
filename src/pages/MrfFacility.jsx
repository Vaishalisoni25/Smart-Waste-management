import React, { useState, useEffect } from 'react';
import {
  Factory,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity,
  Boxes,
  Maximize2
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { api } from '../services/api';
import StatusBadge from '../components/StatusBadge';

export default function MrfFacility() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await api.getMrfData();
      setData(res);
    }
    load();
  }, []);

  if (!data) return <div className="p-8 text-center text-xs">Loading MRF Facility...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Efficiency Telemetry (PDF Page 26 & 27) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#061e16] via-[#0a2d21] to-[#0e3b2c] p-6 text-white border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#a3e635] text-[#061e16] text-[11px] font-extrabold uppercase">
                Integrated Material Recovery Facility (MRF-01)
              </span>
              <span className="text-xs text-emerald-300">5-Stage AI Optical Sorting Line</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Material Recovery Facility (MRF) Digital-Twin
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Automated optical polymer identification, multi-fraction extraction, and circular commodity baling.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#166534] text-[#a3e635] px-3.5 py-1.5 rounded-xl border border-emerald-500/40 font-bold font-mono">
              Baled Inventory: {data.baledInventory}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards (PDF Page 27) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Daily Infeed Intake</p>
          <p className="text-2xl font-extrabold text-[#0a2d21] mt-1">{data.dailyIntake}</p>
          <span className="text-[10px] text-emerald-700">Dry Packaging Waste</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Recovery Efficiency</p>
          <p className="text-2xl font-extrabold text-[#166534] mt-1">{data.recoveryEfficiency}</p>
          <span className="text-[10px] text-emerald-700">High-Purity Off-Take</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Landfill Rejection</p>
          <p className="text-2xl font-extrabold text-[#0a2d21] mt-1">{data.landfillRejection}</p>
          <span className="text-[10px] text-[#166534]">Restricted &lt; 15%</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">NIR Sorter Purity</p>
          <p className="text-2xl font-extrabold text-[#166534] mt-1">{data.sorterPurity}</p>
          <span className="text-[10px] text-emerald-700">AI Polymer Accuracy</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Baled On Hand</p>
          <p className="text-2xl font-extrabold text-[#84cc16] mt-1">{data.baledInventory}</p>
          <span className="text-[10px] text-emerald-700">Ready for Off-Takers</span>
        </div>
      </div>

      {/* 5-Stage Automated Mechanical Line Digital-Twin (PDF Page 26 & 27) */}
      <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-[#0a2d21]">Automated Mechanical Line Digital-Twin</h3>
            <p className="text-xs text-emerald-900/60">Real-time stage-by-stage conveyor and optical sorter telemetry</p>
          </div>
          <span className="text-xs font-bold text-[#166534] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Conveyor Speed: 2.2 m/s
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {data.stages.map((stage, i) => (
            <div
              key={stage.step}
              className="relative p-4 rounded-2xl border border-emerald-950/10 bg-gradient-to-b from-white to-emerald-50/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-[#166534] bg-emerald-100 px-2 py-0.5 rounded-md">
                    Stage {stage.step}
                  </span>
                  <StatusBadge status={stage.status} size="sm" />
                </div>
                <h4 className="font-bold text-sm text-[#0a2d21] mt-1">{stage.name}</h4>
                <p className="text-[11px] text-emerald-900/70 mt-1 leading-snug">{stage.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs font-semibold text-emerald-950">
                <span>Load: <strong>{stage.load}</strong></span>
                <span className="text-[#166534] font-mono">{stage.speed || stage.accuracy || stage.pressure}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commodity Valorization & Photographic Quality Control Viewports (PDF Page 28) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Photographic Viewports */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-[#061e16] border border-emerald-800/40 group aspect-video">
            <img
              src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=700&q=80"
              alt="Optical Sorting Belt"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            <div className="absolute top-3 left-3 rounded-lg bg-[#166534] text-[#a3e635] text-xs font-bold px-2.5 py-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              Automated NIR Optical Sorting Belt
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
              <p className="font-bold text-[#a3e635]">AI Vision: Multi-Stream Plastic Detection</p>
              <p className="text-[11px] text-emerald-200">Polymer Purity: 96.2% • Conveyor 02</p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden bg-[#061e16] border border-emerald-800/40 group aspect-video">
            <img
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=700&q=80"
              alt="Baled Warehouse"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            <div className="absolute top-3 left-3 rounded-lg bg-[#0a2d21] text-white text-xs font-bold px-2.5 py-1 flex items-center gap-1.5">
              <Boxes className="w-3.5 h-3.5 text-[#a3e635]" />
              Baled Recyclables Staging Warehouse
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
              <p className="font-bold text-white">185 MT Wire-Tied Bales Ready for Off-Takers</p>
              <p className="text-[11px] text-emerald-200">Paper (OCC), PET, HDPE Barcode Tagged</p>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Commodity Valorization & Market Revenue Table (PDF Page 28) */}
        <div className="lg:col-span-7 rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100">
              <div>
                <h3 className="text-base font-bold text-[#0a2d21]">Commodity Valorization & Yield Analytics</h3>
                <p className="text-xs text-emerald-900/60">Market rates and revenue realization per fraction</p>
              </div>
              <span className="text-xs font-bold text-[#166534] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Total Dry Intake: 420.5 MT
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-emerald-50/70 text-emerald-900 uppercase text-[10px] font-bold tracking-wider border-b border-emerald-100">
                  <tr>
                    <th className="py-2.5 px-3">Recovered Commodity</th>
                    <th className="py-2.5 px-3">Yield %</th>
                    <th className="py-2.5 px-3">Extracted Today</th>
                    <th className="py-2.5 px-3 text-right">Market Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50 text-emerald-950">
                  {data.commodities.map((c) => (
                    <tr key={c.name} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-[#0a2d21]">{c.name}</td>
                      <td className="py-2.5 px-3 font-bold text-[#166534]">{c.percentage}%</td>
                      <td className="py-2.5 px-3">{c.tonsToday} MT</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-[#0a2d21]">{c.ratePerKg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
            <span>Primary Off-Takers: <strong>Ultratech Cement (RDF), Century Paper (OCC)</strong></span>
            <span className="font-bold text-[#166534]">EPR Portal Synced ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
