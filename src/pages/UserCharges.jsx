import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  Send,
  Printer,
  Sparkles,
  Smartphone,
  PieChart as PieIcon,
  Search,
  Filter
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { api } from '../services/api';
import OperationsMap from '../components/OperationsMap';
import StatusBadge from '../components/StatusBadge';

export default function UserCharges() {
  const [data, setData] = useState(null);
  const [receiptSentToast, setReceiptSentToast] = useState('');

  useEffect(() => {
    async function load() {
      const res = await api.getUccData();
      setData(res);
    }
    load();
  }, []);

  const handleSendReceipt = (billId) => {
    setReceiptSentToast(`✓ WhatsApp & SMS e-receipt dispatched for ${billId}!`);
    setTimeout(() => setReceiptSentToast(''), 3500);
  };

  if (!data) return <div className="p-8 text-center text-xs">Loading UCC Financial Suite...</div>;

  const paymentMix = [
    { name: 'UPI / Dynamic QR', value: 62, color: '#166534' },
    { name: 'Handheld POS Card Swipe', value: 22, color: '#84cc16' },
    { name: 'Doorstep Cash Thermal', value: 12, color: '#f59e0b' },
    { name: 'Citizen Web Portal', value: 4, color: '#0284c7' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header (PDF Page 35 & 36) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#061e16] via-[#0a2d21] to-[#0e3b2c] p-6 text-white border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#a3e635] text-[#061e16] text-[11px] font-extrabold uppercase">
                Municipal User Charge Collection (UCC) Portal
              </span>
              <span className="text-xs text-emerald-300">14/14 Active POS Terminals Online</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              User Charges Collection (UCC) & Realization
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Contactless spot UPI payments, gate QR verification, and real-time revenue accounting across 49,000 properties.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#166534] text-[#a3e635] px-3.5 py-1.5 rounded-xl border border-emerald-500/40 font-bold font-mono">
              Collected Today: {data.today}
            </span>
          </div>
        </div>
      </div>

      {receiptSentToast && (
        <div className="p-3.5 rounded-2xl bg-[#a3e635]/30 border border-[#a3e635] text-xs font-bold text-[#061e16] text-center animate-in fade-in">
          {receiptSentToast}
        </div>
      )}

      {/* KPI Ribbon (PDF Page 35 & 36) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Total Billed Demand</p>
          <p className="text-xl sm:text-2xl font-extrabold text-[#0a2d21] mt-1">{data.totalBilled}</p>
          <span className="text-[10px] text-emerald-700">49,000 Properties</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Realized Revenue MTD</p>
          <p className="text-xl sm:text-2xl font-extrabold text-[#166534] mt-1">{data.realized}</p>
          <span className="text-[10px] text-[#166534] font-bold">75.2% Realization</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Collected Today</p>
          <p className="text-xl sm:text-2xl font-extrabold text-[#84cc16] mt-1">{data.today}</p>
          <span className="text-[10px] text-emerald-700">2,965 Transacting Units</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Overdue Arrears</p>
          <p className="text-xl sm:text-2xl font-extrabold text-rose-600 mt-1">{data.arrears}</p>
          <span className="text-[10px] text-rose-700">12,150 Defaulters</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Handheld POS Ready</p>
          <p className="text-xl sm:text-2xl font-extrabold text-[#166534] mt-1">{data.posOnline}</p>
          <span className="text-[10px] text-emerald-700">Instant Cloud Sync</span>
        </div>
      </div>

      {/* Spot UPI Payment & Gate Embedded QR Audit Viewports (PDF Page 35 & 36) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Doorstep Collection & Spot UPI Payment Viewport */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-5 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100">
              <h3 className="text-xs font-bold text-[#0a2d21] uppercase">Spot UPI / Contactless Payment</h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                AUDIT LOG
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-[#061e16] border border-emerald-800/40">
              <img
                src="https://images.unsplash.com/photo-1556742049-0a67e5577f84?auto=format&fit=crop&w=600&q=80"
                alt="POS Payment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
                <p className="font-bold text-[#a3e635]">Field Handheld Bluetooth POS</p>
                <p className="text-[10px] text-emerald-200">Resident scans Bharat QR beside segregated bin</p>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
              <div className="flex justify-between font-bold text-[#0a2d21]">
                <span>Standard Household Tariff:</span>
                <span className="text-[#166534]">₹50.00 / month</span>
              </div>
              <p className="text-[11px] text-emerald-800 mt-0.5">Commercial rate: ₹150 - ₹500 / month</p>
            </div>
          </div>
        </div>

        {/* Center 4 Cols: Gate Embedded QR Scan Viewport (PDF Page 35 & 37) */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-5 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100">
              <h3 className="text-xs font-bold text-[#0a2d21] uppercase">Gate Embedded QR Verification</h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                PLAQUE SCAN
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-[#061e16] border border-emerald-800/40 flex items-center justify-center p-4">
              <div className="p-4 rounded-2xl bg-white border-2 border-[#166534] shadow-lg flex flex-col items-center justify-center text-center">
                <QrCode className="w-24 h-24 text-[#0a2d21]" />
                <span className="font-mono text-xs font-bold text-[#0a2d21] mt-1">QR-HSE-W04-0842</span>
                <span className="text-[10px] text-emerald-800">SCANNED: 2026-09-04 10:20:15 IST</span>
              </div>
            </div>

            <div className="mt-3 text-xs space-y-1 text-emerald-900">
              <div className="flex justify-between">
                <span className="text-emerald-800/70">GPS Lat/Long:</span>
                <span className="font-mono">18.5204° N, 73.8567° E</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-800/70">Automatic Ledger Sync:</span>
                <span className="font-bold text-[#166534]">Verified ✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Payment Channel Mix Donut Chart (PDF Page 35 & 37) */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-5 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100">
              <h3 className="text-xs font-bold text-[#0a2d21] uppercase">Payment Channels</h3>
              <span className="text-[10px] text-emerald-800 font-bold">MTD BREAKDOWN</span>
            </div>

            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMix}
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {paymentMix.map((entry, index) => (
                      <Cell key={`pay-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 mt-1 text-xs">
              {paymentMix.map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-emerald-950">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.name}
                  </span>
                  <span className="font-bold text-[#0a2d21]">{p.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Property Billing & E-Receipt Ledger (PDF Page 35 & 37 Bottom Grid) */}
      <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-[#0a2d21]">
              Live Property Billing & E-Receipt Ledger
            </h3>
            <p className="text-xs text-emerald-900/60">
              Registry linking GIS property IDs, collection amounts, thermal receipt tokens, and WhatsApp delivery
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-emerald-50/70 text-emerald-900 uppercase text-[10px] font-bold tracking-wider border-b border-emerald-100">
              <tr>
                <th className="py-3 px-4">GIS Property ID</th>
                <th className="py-3 px-4">Resident / Entity</th>
                <th className="py-3 px-4">Ward / Block</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Mode</th>
                <th className="py-3 px-4">Receipt Token</th>
                <th className="py-3 px-4 text-right">E-Challan / SMS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 text-emerald-950">
              {data.billingRecords.map((bill) => (
                <tr key={bill.billId} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#166534]">{bill.billId}</td>
                  <td className="py-3 px-4 font-bold text-[#0a2d21]">{bill.citizen}</td>
                  <td className="py-3 px-4">{bill.ward}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-800">{bill.category}</td>
                  <td className="py-3 px-4 font-mono font-black text-[#0a2d21]">{bill.amount}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={bill.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-emerald-700">REC-{bill.billId.split('-')[2]}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleSendReceipt(bill.billId)}
                      className="px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-[#166534] font-bold text-[10px] flex items-center gap-1 ml-auto border border-emerald-200"
                    >
                      <Send className="w-3 h-3" />
                      Send SMS
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
