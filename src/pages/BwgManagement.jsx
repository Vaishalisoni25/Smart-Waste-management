import React, { useState, useEffect } from 'react';
import {
  Building2,
  CheckCircle2,
  Clock,
  Sparkles,
  PieChart as PieIcon,
  ShieldCheck,
  AlertTriangle,
  CreditCard,
  FileCheck,
  Truck,
  Filter
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { api } from '../services/api';
import OperationsMap from '../components/OperationsMap';
import StatusBadge from '../components/StatusBadge';
import BeforeAfterViewer from '../components/BeforeAfterViewer';

export default function BwgManagement() {
  const [bwgList, setBwgList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeBwg, setActiveBwg] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await api.getBwgs();
      setBwgList(res);
      if (res.length > 0) setActiveBwg(res[0]);
    }
    load();
  }, []);

  const fractionData = [
    { name: 'Dry Recyclables (To MRF)', value: 62, color: '#84cc16' },
    { name: 'Wet Organic (Bio-Methanation)', value: 30, color: '#166534' },
    { name: 'Inert / Hazardous', value: 8, color: '#ea580c' },
  ];

  const filteredBwgs = selectedCategory === 'All'
    ? bwgList
    : bwgList.filter(b => b.category.toLowerCase() === selectedCategory.toLowerCase());

  if (!activeBwg) {
    return <div className="p-8 text-center text-xs">Loading BWG Management...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#061e16] via-[#0a2d21] to-[#0e3b2c] p-6 text-white border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#a3e635] text-[#061e16] text-[11px] font-extrabold uppercase">
                Statutory SWM Rules 2016 Mandate (&gt;100 kg/day)
              </span>
              <span className="text-xs text-emerald-300">Sanitary Inspector ID-2459 (Active)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Bulk Waste Generator (BWG) Command & Commercial Ledger
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Monitors compliance, on-site bio-composting, dedicated logistics, and commercial user charge realization.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/30 text-[#a3e635] font-mono">
              ₹4,85,000 UCC Realized MTD
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards (PDF Page 23) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Total Registered BWGs</p>
          <p className="text-2xl font-extrabold text-[#0a2d21] mt-1">184 Entities</p>
          <span className="text-[10px] text-emerald-700">Hotels, Tech Parks, Malls</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Daily Inward Intake</p>
          <p className="text-2xl font-extrabold text-[#166534] mt-1">185.4 MT</p>
          <span className="text-[10px] text-emerald-700">Dedicated Fleet Collection</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Segregation Compliance</p>
          <p className="text-2xl font-extrabold text-[#166534] mt-1">94.6%</p>
          <span className="text-[10px] text-emerald-700">In-situ Waste Processing</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Commercial UCC Realized</p>
          <p className="text-2xl font-extrabold text-[#0a2d21] mt-1">₹4,85,000</p>
          <span className="text-[10px] text-emerald-700">92.4% Billing Collection</span>
        </div>
      </div>

      {/* Multi-Stream Fraction Breakdown & Before/After Verification (PDF Page 23 & 24) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Before/After Commercial Storage Bay Audit */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#0a2d21]">
              Commercial Holding Area Verification: {activeBwg.name}
            </h3>
            <span className="text-xs font-bold text-[#166534] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Inspector Verified
            </span>
          </div>

          <BeforeAfterViewer
            beforeImage="https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=700&q=80"
            afterImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=700&q=80"
            beforeLabel="Before: Commercial Segregated Storage Bay"
            afterLabel="After: Discharged, Sanitized & Washed"
            location={`${activeBwg.name} (#${activeBwg.id})`}
            timestamp="07:15 AM (Before) → 07:42 AM (After)"
            gps="18.5204° N, 73.8567° E"
          />
        </div>

        {/* Right 1 Col: Multi-Stream Waste Fraction Breakdown (PDF Page 23 & 24) */}
        <div className="rounded-3xl bg-white p-5 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0a2d21]">Segregated Waste Fraction Breakdown</h3>
            <p className="text-xs text-emerald-900/60 mb-2">Multi-stream classification from 184 BWGs</p>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fractionData}
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {fractionData.map((entry, index) => (
                      <Cell key={`bwg-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 mt-2 text-xs">
              {fractionData.map((f) => (
                <div key={f.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-emerald-950">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: f.color }} />
                    {f.name}
                  </span>
                  <span className="font-bold text-[#0a2d21]">{f.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-100 text-xs">
            <span className="text-emerald-800/70">On-Site Composting Mandate:</span>
            <span className="font-bold text-[#166534] block mt-0.5">175 of 184 Units Compliant (95.1%)</span>
          </div>
        </div>
      </div>

      {/* Commercial & Operational Ledger Table (PDF Page 23 & 24 Bottom Section) */}
      <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-[#0a2d21]">Live Commercial & Operational Ledger</h3>
            <p className="text-xs text-emerald-900/60">
              Bulk generator registry, daily intake tonnage, dedicated vehicles, and UCC billing status
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {['All', 'Hotel', 'Hospital', 'Mall', 'Tech Park', 'Institution', 'Industrial'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#166534] text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-emerald-50/70 text-emerald-900 uppercase text-[10px] font-bold tracking-wider border-b border-emerald-100">
              <tr>
                <th className="py-3 px-4">BWG ID</th>
                <th className="py-3 px-4">Establishment Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Est. vs Actual Waste</th>
                <th className="py-3 px-4">In-situ Composting</th>
                <th className="py-3 px-4">Collection Vehicle</th>
                <th className="py-3 px-4">UCC Monthly Fee</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4 text-right">Enforcement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 text-emerald-950">
              {filteredBwgs.map((bwg) => (
                <tr
                  key={bwg.id}
                  onClick={() => setActiveBwg(bwg)}
                  className={`hover:bg-emerald-50/50 cursor-pointer transition-colors ${
                    activeBwg.id === bwg.id ? 'bg-emerald-50/80 font-medium' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-mono font-bold text-[#166534]">{bwg.id}</td>
                  <td className="py-3 px-4 font-bold text-[#0a2d21]">{bwg.name}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-800">{bwg.category}</td>
                  <td className="py-3 px-4">
                    <span>{bwg.actualWaste}</span>
                    <span className="text-[10px] text-emerald-700 block">Est: {bwg.estimatedWaste}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 font-bold text-[#166534]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold">{bwg.vehicle}</td>
                  <td className="py-3 px-4 font-bold text-[#0a2d21]">{bwg.uccAmount}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={bwg.paymentStatus} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      bwg.enforcement.includes('Notice')
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {bwg.enforcement}
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
