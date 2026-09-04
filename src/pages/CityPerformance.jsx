import React, { useState, useEffect } from 'react';
import {
  Award,
  Star,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  PieChart as PieIcon,
  ShieldCheck,
  ChevronRight,
  Boxes
} from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip
} from 'recharts';
import { api } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import BeforeAfterViewer from '../components/BeforeAfterViewer';

export default function CityPerformance() {
  const [perfData, setPerfData] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await api.getCityPerformance();
      setPerfData(res);
    }
    load();
  }, []);

  if (!perfData) return <div className="p-8 text-center text-xs">Loading Executive KPI Suite...</div>;

  const radarData = [
    { subject: 'D2D Coverage', score: 95.2, fullMark: 100 },
    { subject: 'Segregation', score: 92.4, fullMark: 100 },
    { subject: 'Landfill Diversion', score: 86.8, fullMark: 100 },
    { subject: 'GVP Elimination', score: 91.9, fullMark: 100 },
    { subject: 'BWG In-Situ', score: 95.1, fullMark: 100 },
    { subject: 'Grievance SLA', score: 98.4, fullMark: 100 },
  ];

  const circularData = [
    { name: 'Bio-Methanation / Compost', value: 48, color: '#15803d' },
    { name: 'MRF Material Recovery', value: 28, color: '#84cc16' },
    { name: 'Refuse-Derived Fuel (RDF)', value: 14, color: '#0d9488' },
    { name: 'Sanitary Landfill Inerts', value: 10, color: '#64748b' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & 7-Star GFC Rating (PDF Page 38 & 39) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#061e16] via-[#0a2d21] to-[#0e3b2c] p-6 text-white border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#a3e635] text-[#061e16] text-[11px] font-extrabold uppercase flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#061e16]" />
                7-Star Garbage Free City (GFC) Benchmark
              </span>
              <span className="text-xs text-emerald-300">Statutory Compliance 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Executive KPI & City Performance Scorecard
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              National Swachh Survekshan statutory audit, circular economy diversion, and ward-wise compliance index.
            </p>
          </div>

          {/* Central Circular Index (PDF Page 38: 98.4% SWM Compliance) */}
          <div className="flex items-center gap-4 bg-emerald-950/80 px-5 py-3 rounded-2xl border border-emerald-500/40 shrink-0">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#166534] to-[#a3e635] flex items-center justify-center p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-[#061e16] flex items-center justify-center">
                <span className="text-xs font-black text-[#a3e635]">98.4%</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-black text-white">SWM Compliance Index</p>
              <p className="text-[11px] text-emerald-300/80">7-Star Certified Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Statutory Scorecards (PDF Page 40) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {perfData.breakdown.slice(0, 5).map((item) => (
          <div key={item.label} className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
            <p className="text-[11px] font-bold text-emerald-900/60 uppercase">{item.label}</p>
            <p className="text-2xl font-extrabold text-[#166534] mt-1">{item.score}</p>
            <span className="text-[10px] text-emerald-700 font-semibold">{item.status} ({item.target})</span>
          </div>
        ))}
      </div>

      {/* Radar Chart & Circular Economy Flow (PDF Page 39 & 40) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ward Compliance Radar */}
        <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-emerald-100">
              <h3 className="text-base font-bold text-[#0a2d21]">Multi-Axis SWM Compliance Radar</h3>
              <span className="text-xs font-bold text-[#166534] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Citywide Average: 93.8%
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" stroke="#1e293b" fontSize={11} fontStyle="bold" />
                  <PolarRadiusAxis angle={30} domain={[60, 100]} />
                  <Radar name="City Score" dataKey="score" stroke="#166534" fill="#84cc16" fillOpacity={0.4} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Circular Economy Flow */}
        <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-emerald-100">
              <h3 className="text-base font-bold text-[#0a2d21]">Circular Economy Mass Balance Breakdown</h3>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                1,428.5 MT Intake
              </span>
            </div>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={circularData}
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {circularData.map((entry, index) => (
                      <Cell key={`circ-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 mt-2 text-xs">
              {circularData.map((c) => (
                <div key={c.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-emerald-950">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    {c.name}
                  </span>
                  <span className="font-bold text-[#0a2d21]">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ward Leaderboard Table (PDF Page 40) */}
      <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-[#0a2d21]">Ward Performance Leaderboard Ranking</h3>
            <p className="text-xs text-emerald-900/60">Top ranking wards under Swachh Survekshan SWM metrics</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-emerald-50/70 text-emerald-900 uppercase text-[10px] font-bold tracking-wider border-b border-emerald-100">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Ward Name</th>
                <th className="py-3 px-4">SWM Score</th>
                <th className="py-3 px-4">Households</th>
                <th className="py-3 px-4">Segregation Rate</th>
                <th className="py-3 px-4 text-right">Standing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 text-emerald-950">
              {perfData.wardLeaderboard.map((w) => (
                <tr key={w.rank} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-sm">
                    {w.rank === 1 ? '🥇 #1' : w.rank === 2 ? '🥈 #2' : w.rank === 3 ? '🥉 #3' : `#${w.rank}`}
                  </td>
                  <td className="py-3 px-4 font-bold text-[#0a2d21]">{w.ward}</td>
                  <td className="py-3 px-4 font-extrabold text-[#166534] text-sm">{w.score}</td>
                  <td className="py-3 px-4">{w.households}</td>
                  <td className="py-3 px-4 font-semibold">{w.segregation}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Grade A+
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
