import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Download,
  FileText,
  CheckCircle2,
  RefreshCw,
  Printer,
  QrCode,
  ShieldCheck,
  Camera,
  Share2,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

import { MUNICIPAL_REPORTS } from '../data/mockData';

export default function ReportsPage() {
  const [reports, setReports] = useState(MUNICIPAL_REPORTS || []);
  const [selectedReport, setSelectedReport] = useState(MUNICIPAL_REPORTS?.[0] || null);
  const [exportToast, setExportToast] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await api.getReports();
      if (res && res.length > 0) {
        setReports(res);
        setSelectedReport(res[0]);
      }
    }
    load();
  }, []);

  const handleExport = (format) => {
    setExportToast(`✓ ${selectedReport?.title || 'Report'} compiled and exported as ${format}!`);
    setTimeout(() => setExportToast(''), 3500);
  };

  const handleSyncPortal = () => {
    setExportToast(`✓ Synced with Central Pollution Control Board (CPCB) & SBM 2.0 National Cloud!`);
    setTimeout(() => setExportToast(''), 3500);
  };

  if (!selectedReport) return <div className="p-8 text-center text-xs">Loading Reports...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & National Portal Integration (PDF Page 41 & 42) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#061e16] via-[#0a2d21] to-[#0e3b2c] p-6 text-white border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#a3e635] text-[#061e16] text-[11px] font-extrabold uppercase">
                SWM 2026 Statutory Reporting & SPCB Portal
              </span>
              <span className="text-xs text-emerald-300">Annual & Monthly Filing 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Statutory Compliance, EPR & Municipal Audits
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Automated compilation under Solid Waste Management Rules 2016 for Central & State Pollution Boards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSyncPortal}
              className="px-4 py-3 rounded-full bg-[#166534] hover:bg-[#0e4b25] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-emerald-500/40 shadow-md cursor-pointer transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-[#a3e635]" />
              Sync SBM Portal API
            </button>
            <button
              onClick={() => handleExport('Master PDF')}
              className="px-5 py-3 rounded-full bg-[#a3e635] hover:bg-[#84cc16] text-[#061e16] font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <Download className="w-4 h-4 text-[#061e16]" />
              Export Master PDF
            </button>
          </div>
        </div>
      </div>

      {exportToast && (
        <div className="p-3.5 rounded-2xl bg-[#a3e635]/30 border border-[#a3e635] text-xs font-bold text-[#061e16] text-center animate-in fade-in">
          {exportToast}
        </div>
      )}

      {/* Main Grid: Report Catalog (Left) + Interactive Document Preview (Center) + Photo Attachments (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Statutory Report Catalog (PDF Page 41 & 42) */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-5 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0a2d21] mb-3">Statutory Report Catalog</h3>
            <div className="space-y-2">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  onClick={() => setSelectedReport(rep)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    selectedReport.id === rep.id
                      ? 'bg-emerald-50/80 border-[#166534] shadow-xs'
                      : 'bg-white border-emerald-900/10 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-[#166534]">{rep.id}</span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-full font-semibold">
                      {rep.period}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-[#0a2d21] mt-1">{rep.title}</h4>
                  <p className="text-[11px] text-emerald-900/70 line-clamp-2 mt-0.5">{rep.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center 5 Cols: Interactive Official Document Preview (PDF Page 41 & 43) */}
        <div className="lg:col-span-5 rounded-3xl bg-white p-6 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b-2 border-emerald-900/20 pb-4 mb-4 text-center">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">
                GOVERNMENT OF MADHYA PRADESH • URBAN DEVELOPMENT
              </span>
              <h3 className="text-base font-black text-[#0a2d21] mt-1">{selectedReport.title}</h3>
              <p className="text-xs text-emerald-900/60">Official Statutory Submission • Period: {selectedReport.period}</p>
            </div>

            {/* High-Level Compliance Benchmarks */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-[10px] text-emerald-800 uppercase font-bold block">Landfill Diversion</span>
                <span className="font-black text-sm text-[#166534]">86.8% (Target: &gt;85%)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-[10px] text-emerald-800 uppercase font-bold block">Doorstep Segregation</span>
                <span className="font-black text-sm text-[#166534]">92.4% (Target: &gt;90%)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-[10px] text-emerald-800 uppercase font-bold block">GVP Remediation</span>
                <span className="font-black text-sm text-[#166534]">91.9% (44/48 Spots)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-[10px] text-emerald-800 uppercase font-bold block">BWG In-Situ</span>
                <span className="font-black text-sm text-[#166534]">95.1% (175 Units)</span>
              </div>
            </div>

            {/* Signature & Verification Block (PDF Page 43) */}
            <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <QrCode className="w-10 h-10 text-[#0a2d21]" />
                <div>
                  <p className="font-bold text-[#0a2d21]">Digitally Authenticated</p>
                  <p className="text-[10px] text-emerald-800 font-mono">SHA-256: 8F2A...99CE</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#166534]">Er. Rajesh Sharma</p>
                <p className="text-[10px] text-emerald-800">Chief Sanitary Officer (ZHO)</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center justify-between gap-2">
            <button
              onClick={() => handleExport('Excel (.xlsx)')}
              className="px-4 py-2 rounded-full border border-emerald-300 text-xs font-bold text-[#166534] hover:bg-emerald-50"
            >
              Export Excel
            </button>
            <button
              onClick={() => handleExport('PDF')}
              className="px-5 py-2 rounded-full bg-[#166534] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0e4b25] shadow-md"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* Right 3 Cols: Photographic Evidence Attachments (PDF Page 41 & 43) */}
        <div className="lg:col-span-3 rounded-3xl bg-white p-5 border border-emerald-950/10 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-[#0a2d21] uppercase mb-3">
              Geotagged Photo Evidence Attachments
            </h3>

            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#061e16] border border-emerald-800/40">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80"
                  alt="Remediated GVP"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-2 text-[9px] font-mono text-[#a3e635] bg-black/70 px-1 rounded">
                  GVP Remediated • 19.0760° N, 72.8777° E
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#061e16] border border-emerald-800/40">
                <img
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80"
                  alt="Doorstep Segregation"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-2 text-[9px] font-mono text-blue-300 bg-black/70 px-1 rounded">
                  Doorstep Grade-A • 12.9716° N, 77.5946° E
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#061e16] border border-emerald-800/40">
                <img
                  src="https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=400&q=80"
                  alt="Weighbridge Scale"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-2 text-[9px] font-mono text-amber-300 bg-black/70 px-1 rounded">
                  Weighbridge ANPR • 28.6139° N, 77.2090° E
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 text-[10px] text-emerald-800/60 text-center">
            All attachments sealed with SHA-256 cloud watermark
          </div>
        </div>
      </div>
    </div>
  );
}
