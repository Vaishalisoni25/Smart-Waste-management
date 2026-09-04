import React, { useState, useEffect } from 'react';
import {
  Scale,
  Printer,
  FileText,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  Camera,
  ShieldCheck,
  Search
} from 'lucide-react';
import { api } from '../services/api';
import OperationsMap from '../components/OperationsMap';
import StatusBadge from '../components/StatusBadge';

export default function Weighbridge() {
  const [data, setData] = useState(null);
  const [slipPrinted, setSlipPrinted] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await api.getWeighbridgeData();
      setData(res);
    }
    load();
  }, []);

  const handlePrintSlip = () => {
    setSlipPrinted(true);
    setTimeout(() => setSlipPrinted(false), 3500);
  };

  if (!data) return <div className="p-8 text-center text-xs">Loading Weighbridge Command...</div>;

  const current = data.currentVehicle;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Telemetry Header (PDF Page 31 & 32) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#061e16] via-[#0a2d21] to-[#0e3b2c] p-6 text-white border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#a3e635] text-[#061e16] text-[11px] font-extrabold uppercase">
                Central Municipal Weighbridge • Dual Steel Deck Platform
              </span>
              <span className="text-xs text-emerald-300">ANPR Optical Cameras: 99.8% Match</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Weighbridge Management Command Center
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Automated gross & tare payload computation, electronic slip generation, and landfill diversion accounting.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#166534] text-[#a3e635] px-3.5 py-1.5 rounded-xl border border-emerald-500/40 font-bold font-mono">
              Scale 01 & 02: ONLINE
            </span>
          </div>
        </div>
      </div>

      {slipPrinted && (
        <div className="p-3.5 rounded-2xl bg-[#a3e635]/30 border border-[#a3e635] text-xs font-bold text-[#061e16] text-center animate-in fade-in">
          ✓ Digital Weigh Slip #{current.ticketId} generated and transmitted to Cloud Ledger!
        </div>
      )}

      {/* KPI Ribbon (PDF Page 32 & 33) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Daily Bulk Inward</p>
          <p className="text-2xl font-extrabold text-[#0a2d21] mt-1">{data.dailyInward}</p>
          <span className="text-[10px] text-emerald-700">Gross Intake Today</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Scale 01 (Inbound)</p>
          <p className="text-2xl font-extrabold text-[#166534] mt-1">{data.scale01}</p>
          <span className="text-[10px] text-emerald-700">Gross Weight Platform</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Scale 02 (Outbound)</p>
          <p className="text-2xl font-extrabold text-[#166534] mt-1">{data.scale02}</p>
          <span className="text-[10px] text-emerald-700">Tare Weight Platform</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">ANPR Accuracy</p>
          <p className="text-2xl font-extrabold text-[#0a2d21] mt-1">{data.anprAccuracy}</p>
          <span className="text-[10px] text-emerald-700">OCR License Recognition</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-emerald-950/10 shadow-xs">
          <p className="text-[11px] font-bold text-emerald-900/60 uppercase">Avg Turnaround</p>
          <p className="text-2xl font-extrabold text-[#84cc16] mt-1">{data.avgTurnaround}</p>
          <span className="text-[10px] text-emerald-700">Fast Automated Exit</span>
        </div>
      </div>

      {/* Live Scale Platform & Digital Weigh Slip Generator (PDF Page 32) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Live ANPR Camera Platform Viewport */}
        <div className="lg:col-span-5 rounded-3xl bg-[#061e16] border border-emerald-800/40 p-5 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-900/50">
              <span className="text-xs font-bold text-emerald-300">LIVE ANPR CCTV & SCALE 01</span>
              <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded font-mono">
                REC ● LIVE
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black border border-emerald-900/50">
              <img
                src={current.photoUrl}
                alt="Truck on Scale"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono text-[#a3e635]">
                PLATE: {current.vehicleNo}
              </div>
              <div className="absolute bottom-2 right-2 bg-[#166534] px-2 py-0.5 rounded text-[10px] font-bold text-white">
                {current.anprConfidence}
              </div>
            </div>

            {/* LED Gross Weight Telemetry Dials (PDF Page 32 & 33) */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="p-2.5 rounded-xl bg-[#0a2d21] border border-emerald-800/50">
                <span className="text-[10px] text-emerald-300/70 block uppercase font-semibold">Gross Weight</span>
                <span className="font-mono font-black text-sm sm:text-base text-white">{current.grossWeight}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0a2d21] border border-emerald-800/50">
                <span className="text-[10px] text-emerald-300/70 block uppercase font-semibold">Tare Weight</span>
                <span className="font-mono font-black text-sm sm:text-base text-amber-300">{current.tareWeight}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-950 border border-[#a3e635]/40">
                <span className="text-[10px] text-[#a3e635] block uppercase font-bold">Net Payload</span>
                <span className="font-mono font-black text-sm sm:text-base text-[#a3e635]">{current.netWeight.split(' ')[0]}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-900/50 text-[11px] text-emerald-300/70 flex justify-between">
            <span>Timestamp: {current.timestamp}</span>
            <span>Scale Operator: SI Rajesh K.</span>
          </div>
        </div>

        {/* Right 7 Cols: Digital Weigh Slip Generator (PDF Page 32) */}
        <div className="lg:col-span-7 rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-emerald-100">
              <div>
                <h3 className="text-base font-bold text-[#0a2d21]">Electronic Weigh Slip Generator</h3>
                <p className="text-xs text-emerald-900/60">Official certificate issued under Municipal SWM Rules 2016</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#166534] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {current.ticketId}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-900/60">Vehicle Number</span>
                <p className="font-mono font-bold text-sm text-[#0a2d21]">{current.vehicleNo}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-900/60">Driver Name</span>
                <p className="font-bold text-sm text-[#0a2d21]">{current.driver}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-900/60">Destination</span>
                <p className="font-bold text-sm text-[#166534]">{current.destination}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-900/60">Waste Stream</span>
                <p className="font-semibold text-emerald-950">{current.wasteType}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-900/60">Contamination %</span>
                <p className="font-semibold text-emerald-950">2.1% (Acceptable)</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-900/60">Net Weight MT</span>
                <p className="font-mono font-bold text-[#166534]">13.53 MT</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-900 flex items-center justify-between">
              <div>
                <p className="font-bold text-[#0a2d21]">Digital Weigher Certificate Verified</p>
                <p className="text-[11px] text-emerald-800">Tamper-proof HMAC SHA-256 cloud cryptographic token issued</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-[#166534]" />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-100 flex flex-wrap items-center justify-end gap-3">
            <button
              onClick={handlePrintSlip}
              className="px-5 py-2.5 rounded-full border border-emerald-300 text-[#166534] font-bold text-xs hover:bg-emerald-50 flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print Thermal Slip
            </button>
            <button
              onClick={handlePrintSlip}
              className="px-6 py-2.5 rounded-full bg-[#166534] hover:bg-[#0e4b25] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer active:scale-98"
            >
              <FileText className="w-4 h-4 text-[#a3e635]" />
              Export Signed PDF
            </button>
          </div>
        </div>
      </div>

      {/* Manifest Ledger (PDF Page 32 Bottom Table) */}
      <div className="rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-[#0a2d21]">Recent Weighbridge Transactions Log</h3>
            <p className="text-xs text-emerald-900/60">Real-time secondary haulage weigh tickets</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-emerald-50/70 text-emerald-900 uppercase text-[10px] font-bold tracking-wider border-b border-emerald-100">
              <tr>
                <th className="py-3 px-4">Ticket</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Vehicle ID</th>
                <th className="py-3 px-4">Net Payload</th>
                <th className="py-3 px-4">Waste Classification</th>
                <th className="py-3 px-4">Destination Facility</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 text-emerald-950">
              {data.recentTickets.map((t) => (
                <tr key={t.ticket} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#166534]">{t.ticket}</td>
                  <td className="py-3 px-4 font-mono">{t.time}</td>
                  <td className="py-3 px-4 font-bold text-[#0a2d21]">{t.vehicle}</td>
                  <td className="py-3 px-4 font-bold text-[#166534]">{t.net}</td>
                  <td className="py-3 px-4">{t.stream}</td>
                  <td className="py-3 px-4">{t.bay}</td>
                  <td className="py-3 px-4 text-right">
                    <StatusBadge status="Completed" size="sm" />
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
