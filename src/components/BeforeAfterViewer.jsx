import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export default function BeforeAfterViewer({
  beforeImage,
  afterImage,
  beforeLabel = "Before Remediation (Spillover)",
  afterLabel = "After Remediation (Beautified)",
  location = "Market Cross #012",
  timestamp = "08:12 IST → 08:38 IST",
  gps = "18.5204° N, 73.8567° E",
  verified = true
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeTab, setActiveTab] = useState('split'); // 'split' | 'side'

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-emerald-950/10 shadow-sm p-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-emerald-100/80">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm text-[#0a2d21]">{location}</h4>
            {verified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified Clearance
              </span>
            )}
          </div>
          <p className="text-xs text-emerald-800/70">{gps} • {timestamp}</p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-emerald-50 p-1 rounded-xl border border-emerald-100 text-xs">
          <button
            onClick={() => setActiveTab('split')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeTab === 'split'
                ? 'bg-[#166534] text-white shadow-xs'
                : 'text-emerald-800 hover:text-[#166534]'
            }`}
          >
            Interactive Slider
          </button>
          <button
            onClick={() => setActiveTab('side')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeTab === 'side'
                ? 'bg-[#166534] text-white shadow-xs'
                : 'text-emerald-800 hover:text-[#166534]'
            }`}
          >
            Side by Side
          </button>
        </div>
      </div>

      {activeTab === 'split' ? (
        /* Slider comparison view */
        <div className="relative h-64 md:h-72 w-full select-none overflow-hidden rounded-2xl bg-emerald-950">
          {/* After image (base) */}
          <img
            src={afterImage}
            alt="After"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute top-3 right-3 z-10 rounded-lg bg-[#0a2d21]/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-[#a3e635] border border-[#a3e635]/30">
            ✓ {afterLabel}
          </div>

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={beforeImage}
              alt="Before"
              className="absolute inset-0 h-full w-full object-cover max-w-none"
              style={{ width: '100%' }}
            />
            <div className="absolute top-3 left-3 z-10 rounded-lg bg-rose-950/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-rose-300 border border-rose-500/30">
              ⚠ {beforeLabel}
            </div>
          </div>

          {/* Slider line & handle */}
          <div
            className="absolute bottom-0 top-0 z-20 w-1 bg-white cursor-ew-resize shadow-md"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#166534] border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
              ↔
            </div>
          </div>

          {/* Hidden range input overlay */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
      ) : (
        /* Side by Side view */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative h-60 overflow-hidden rounded-2xl bg-emerald-950 group">
            <img
              src={beforeImage}
              alt="Before"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            <div className="absolute top-3 left-3 rounded-lg bg-rose-900/90 px-2.5 py-1 text-xs font-semibold text-rose-200 border border-rose-500/30">
              ⚠ {beforeLabel}
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-xs text-white/90">
              <p className="font-semibold">Raw Waste Identified</p>
              <p className="text-[11px] text-rose-200">Burned watermark: {gps}</p>
            </div>
          </div>

          <div className="relative h-60 overflow-hidden rounded-2xl bg-emerald-950 group">
            <img
              src={afterImage}
              alt="After"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            <div className="absolute top-3 right-3 rounded-lg bg-[#0a2d21]/90 px-2.5 py-1 text-xs font-semibold text-[#a3e635] border border-[#a3e635]/30">
              ✓ {afterLabel}
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-xs text-white/90">
              <p className="font-semibold text-[#a3e635]">100% Cleared & Beautified</p>
              <p className="text-[11px] text-emerald-200">Bio-planters & CCTV Pole Verified</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
