import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Radio,
  Sparkles,
  Calendar,
  Clock,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  ShieldAlert,
  Truck,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  Flame,
  Zap,
  Boxes
} from 'lucide-react';
import { api } from '../services/api';
import KpiCard from '../components/KpiCard';
import OperationsMap from '../components/OperationsMap';
import StatusBadge from '../components/StatusBadge';

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await api.getDashboardOverview();
      setData(res);
      setLoading(false);
    }
    load();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#166534] border-t-[#a3e635] rounded-full animate-spin" />
          <p className="text-xs font-bold text-emerald-900">Loading Smart Waste Command Center...</p>
        </div>
      </div>
    );
  }

  const { config, kpis, markers, hourlyTrend, wardPerformance, wasteDistribution, circularEconomy, uccPaymentModes } = data;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. TOP HERO SECTION (Wastex-inspired Large Deep Forest Green Section) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#061e16] via-[#0a2d21] to-[#0e3b2c] p-6 sm:p-8 lg:p-10 text-white shadow-xl border border-emerald-800/40">
        {/* Background photo & overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-right opacity-15 pointer-events-none mix-blend-luminosity"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80')` }}
        />
        <div className="absolute inset-0 bg-wastex-grid-dark pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a3e635]/15 border border-[#a3e635]/30 text-xs font-bold text-[#a3e635]">
              <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse" />
              {config.iotStatus} • {config.city}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              Smart Waste Management Command Center
            </h1>

            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
              Monitor, manage and optimize city-wide door-to-door collection, GPS vehicle tracking, GVP blackspot elimination, and resource recovery from one unified intelligent platform.
            </p>

            {/* Quick Status Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-emerald-300/80">
              <div className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#a3e635]" />
                <span>IoT Devices Online: <strong className="text-white">{config.devicesOnline}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Last Sync: <strong className="text-white">{config.lastSync}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Shift: <strong className="text-white">Morning (06:00 - 14:00)</strong></span>
              </div>
            </div>
          </div>

          {/* Lime Green CTA Button */}
          <div className="flex flex-col sm:flex-row items-stretch lg:items-center gap-3 shrink-0">
            <a
              href="#live-map"
              className="px-6 py-3.5 rounded-full bg-[#a3e635] hover:bg-[#84cc16] text-[#061e16] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#a3e635]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              View Live Operations
            </a>
            <button
              onClick={() => navigate('/rapid-action')}
              className="px-5 py-3.5 rounded-full bg-[#061e16]/80 hover:bg-[#061e16] text-rose-300 border border-rose-500/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
              RAT SOS Dispatch
            </button>
          </div>
        </div>
      </div>

      {/* 2. KPI SECTION (8 Modern Cards) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#0a2d21]">Operational Telemetry & Performance KPIs</h2>
            <p className="text-xs text-emerald-900/60">Real-time SWM indicators against Swachh Survekshan benchmarks</p>
          </div>
          <span className="text-xs font-semibold text-[#166534] bg-emerald-100/60 px-2.5 py-1 rounded-full">
            Updated Real-time
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => (
            <KpiCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              unit={kpi.unit}
              change={kpi.change}
              isPositive={kpi.isPositive}
              subtitle={kpi.subtitle}
              icon={kpi.icon}
              theme={idx === 0 || idx === 3 ? 'forest' : 'light'}
            />
          ))}
        </div>
      </div>

      {/* 3. LIVE OPERATIONS MAP SECTION */}
      <div id="live-map" className="scroll-mt-20">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-[#0a2d21]">Live City GIS & Fleet Vector Basemap</h2>
            <p className="text-xs text-emerald-900/60">Sub-10m tracking of GPS auto-tippers, compactor trucks, and facilities</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => navigate('/routes')}
              className="text-[#166534] font-bold hover:underline flex items-center gap-1"
            >
              Route Details <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <OperationsMap markers={markers} height="480px" />
      </div>

      {/* 4. ANALYTICS & CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Waste Collection Trend */}
        <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#0a2d21]">Morning Collection Volume Trend</h3>
              <p className="text-xs text-emerald-900/60">Hourly door-to-door intake by stream (MT)</p>
            </div>
            <span className="text-xs font-bold text-[#166534] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Peak: 09:00 AM
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="wetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#166534" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#166534" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="dryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#84cc16" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#84cc16" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7ede7" vertical={false} />
                <XAxis dataKey="time" stroke="#718096" fontSize={11} />
                <YAxis stroke="#718096" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#061e16', borderRadius: '12px', color: '#fff', border: 'none' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="wet" name="Wet Bio-Waste (MT)" stroke="#166534" fillOpacity={1} fill="url(#wetGrad)" />
                <Area type="monotone" dataKey="dry" name="Dry Recyclable (MT)" stroke="#84cc16" fillOpacity={1} fill="url(#dryGrad)" />
                <Area type="monotone" dataKey="mixed" name="Mixed / Inerts (MT)" stroke="#ea580c" fillOpacity={0.3} fill="#ea580c" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ward Segregation Compliance Bar Chart */}
        <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#0a2d21]">Ward Segregation & Diversion Score</h3>
              <p className="text-xs text-emerald-900/60">Percentage compliance across Wards 01 to 08</p>
            </div>
            <button
              onClick={() => navigate('/kpi')}
              className="text-xs font-bold text-[#166534] hover:underline"
            >
              Full Leaderboard →
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wardPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7ede7" vertical={false} />
                <XAxis dataKey="ward" stroke="#718096" fontSize={11} />
                <YAxis domain={[70, 100]} stroke="#718096" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#061e16', borderRadius: '12px', color: '#fff', border: 'none' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="compliance" name="Segregation %" fill="#166534" radius={[6, 6, 0, 0]} />
                <Bar dataKey="diversion" name="Landfill Diversion %" fill="#84cc16" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 5. CIRCULAR ECONOMY & UCC REVENUE BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Waste Stream Breakdown Donut */}
        <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm flex flex-col">
          <h3 className="text-base font-bold text-[#0a2d21] mb-1">Waste Stream Composition</h3>
          <p className="text-xs text-emerald-900/60 mb-4">Source segregation proportion across city</p>
          
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteDistribution}
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {wasteDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 mt-2 text-xs">
            {wasteDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-emerald-950">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold text-[#0a2d21]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Circular Economy Processing Destinations */}
        <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm flex flex-col">
          <h3 className="text-base font-bold text-[#0a2d21] mb-1">Mass Balance Circular Flow</h3>
          <p className="text-xs text-emerald-900/60 mb-4">Processing channels for 1,428.5 MT total intake</p>

          <div className="space-y-3.5 my-auto">
            {circularEconomy.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-950">{item.name}</span>
                  <span className="font-bold text-[#0a2d21]">{item.percentage}% ({item.mt} MT)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-emerald-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs">
            <span className="text-emerald-800/70">Statutory Diversion Benchmark:</span>
            <span className="font-bold text-emerald-700">86.8% (Target: &gt;85%)</span>
          </div>
        </div>

        {/* UCC Payment Mode Mix */}
        <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm flex flex-col">
          <h3 className="text-base font-bold text-[#0a2d21] mb-1">UCC Digital Payment Mix</h3>
          <p className="text-xs text-emerald-900/60 mb-4">₹18,42,500 collection realization channels</p>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={uccPaymentModes}
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {uccPaymentModes.map((entry, index) => (
                    <Cell key={`ucc-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 mt-2 text-xs">
            {uccPaymentModes.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-emerald-950">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold text-[#0a2d21]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. QUICK ACTIONS & RECENT VEHICLE DISPATCH GRID */}
      <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-[#0a2d21]">Live Vehicle Fleet Operations</h3>
            <p className="text-xs text-emerald-900/60">38 Active collection compactor tippers & sweeper machines</p>
          </div>
          <button
            onClick={() => navigate('/routes')}
            className="px-4 py-1.5 rounded-full bg-emerald-50 text-[#166534] font-bold text-xs hover:bg-emerald-100 transition-colors"
          >
            Manage All Routes →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-emerald-50/70 text-emerald-900 uppercase text-[10px] font-bold tracking-wider border-b border-emerald-100">
              <tr>
                <th className="py-3 px-4">Vehicle ID</th>
                <th className="py-3 px-4">Driver / Crew</th>
                <th className="py-3 px-4">Beat Code</th>
                <th className="py-3 px-4">Payload Load</th>
                <th className="py-3 px-4">Current Speed</th>
                <th className="py-3 px-4">Operational Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 text-emerald-950">
              <tr className="hover:bg-emerald-50/40 transition-colors">
                <td className="py-3 px-4 font-bold text-[#0a2d21] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#166534]" />
                  TRUCK-402 (Compactor)
                </td>
                <td className="py-3 px-4">Mohan Lal (COL-8821)</td>
                <td className="py-3 px-4 font-mono font-semibold">BEAT-W04-01</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-emerald-100 rounded-full overflow-hidden">
                      <div className="w-[74%] h-full bg-[#166534]" />
                    </div>
                    <span className="font-bold">74% (8.4 MT)</span>
                  </div>
                </td>
                <td className="py-3 px-4">24 km/h</td>
                <td className="py-3 px-4">
                  <StatusBadge status="En Route Transfer Station" size="sm" />
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => navigate('/routes')}
                    className="text-[#166534] font-bold hover:underline"
                  >
                    Track Beat
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-emerald-50/40 transition-colors">
                <td className="py-3 px-4 font-bold text-[#0a2d21] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#166534]" />
                  TRUCK-108 (Tipper Auto)
                </td>
                <td className="py-3 px-4">Suresh Yadav (COL-6512)</td>
                <td className="py-3 px-4 font-mono font-semibold">BEAT-W02-03</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-emerald-100 rounded-full overflow-hidden">
                      <div className="w-[88%] h-full bg-amber-500" />
                    </div>
                    <span className="font-bold">88% (2.2 MT)</span>
                  </div>
                </td>
                <td className="py-3 px-4">18 km/h</td>
                <td className="py-3 px-4">
                  <StatusBadge status="D2D Collection Active" size="sm" />
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => navigate('/collection')}
                    className="text-[#166534] font-bold hover:underline"
                  >
                    View Stops
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-emerald-50/40 transition-colors">
                <td className="py-3 px-4 font-bold text-[#0a2d21] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#166534]" />
                  RAT-02 (Patrol Bolero)
                </td>
                <td className="py-3 px-4">SI Vikram Solanki</td>
                <td className="py-3 px-4 font-mono font-semibold">RAT-PATROL-Z1</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-emerald-100 rounded-full overflow-hidden">
                      <div className="w-[20%] h-full bg-[#166534]" />
                    </div>
                    <span className="font-bold">20%</span>
                  </div>
                </td>
                <td className="py-3 px-4">35 km/h</td>
                <td className="py-3 px-4">
                  <StatusBadge status="Dispatched (GVP #04)" size="sm" />
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => navigate('/rapid-action')}
                    className="text-rose-600 font-bold hover:underline"
                  >
                    SOS Detail
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
