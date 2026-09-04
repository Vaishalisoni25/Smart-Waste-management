import React, { useState } from 'react';
import { Camera, Radio, Maximize2, ShieldAlert, Cpu } from 'lucide-react';

export default function CameraFeedCard({
  id = "CAM-01",
  name = "Tipping Bay 1 & 2",
  location = "Central Transfer Station",
  status = "LIVE",
  event = "ANPR Recognized: MP-09-GE-8422",
  fps = "30 FPS • 4K",
  preview,
  hasAiBox = true,
  aiLabel = "UNAUTHORIZED DUMPING DETECTED",
  onDispatch
}) {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#061e16] border border-emerald-900/40 text-white shadow-md flex flex-col group">
      {/* Top Telemetry Bar */}
      <div className="px-4 py-3 bg-[#0a2d21]/90 backdrop-blur-md flex items-center justify-between border-b border-emerald-900/50">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span className="text-xs font-black tracking-wider text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-800/40">
            {status}
          </span>
          <span className="text-xs font-semibold text-white truncate">{name}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-emerald-300/80">
          <span>{fps}</span>
          <button 
            onClick={() => setFullscreen(!fullscreen)}
            className="p-1 hover:text-white rounded-lg hover:bg-emerald-900/50 transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Video / Snapshot Feed Viewport */}
      <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
        <img
          src={preview}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
        />

        {/* Scan lines / Grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {/* AI Bounding Box Overlay if alert */}
        {hasAiBox && (
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-rose-500 rounded-lg bg-rose-500/10 pointer-events-none animate-pulse">
            <div className="absolute -top-5 left-0 bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-t tracking-wider flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              {aiLabel}
            </div>
            {/* Corner crosshairs */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-white" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-white" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-white" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-white" />
          </div>
        )}

        {/* Camera HUD Overlays */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-emerald-300 border border-emerald-500/20">
          REC ● 2026-09-04 09:14:22 IST
        </div>

        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs text-white">
          <p className="font-semibold text-[#a3e635] flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#a3e635] animate-pulse" />
            {location}
          </p>
          <p className="text-[11px] text-emerald-200/80">{event}</p>
        </div>
      </div>

      {/* Action Footer if alert */}
      {onDispatch && (
        <div className="p-3 bg-[#0a2d21] border-t border-emerald-900/60 flex items-center justify-between">
          <span className="text-xs text-rose-300 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            Immediate clearance needed
          </span>
          <button
            onClick={onDispatch}
            className="px-4 py-1.5 rounded-full bg-[#a3e635] text-[#061e16] font-bold text-xs hover:bg-[#84cc16] transition-all shadow-md active:scale-95"
          >
            Dispatch Unit Now
          </button>
        </div>
      )}
    </div>
  );
}
