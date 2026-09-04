import React, { useState, useEffect } from 'react';
import { ScanFace, CheckCircle2, ShieldCheck, UserCheck, AlertCircle, X } from 'lucide-react';

export default function FaceAuthModal({
  isOpen,
  onClose,
  onSuccess,
  role = "Supervisor",
  targetUser = {
    name: "Alex Chen / Rajesh Sharma",
    id: "SUP-8042",
    zone: "Zone 1, Ward 04",
    shift: "06:00 AM - 02:00 PM"
  }
}) {
  const [scanning, setScanning] = useState(true);
  const [driverChecked, setDriverChecked] = useState(false);
  const [helperChecked, setHelperChecked] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setScanning(true);
      setCompleted(false);
      const t1 = setTimeout(() => {
        setDriverChecked(true);
      }, 1200);
      const t2 = setTimeout(() => {
        setHelperChecked(true);
      }, 2000);
      const t3 = setTimeout(() => {
        setScanning(false);
        setCompleted(true);
      }, 2600);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#061e16] border border-emerald-500/30 text-white shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0a2d21] border-b border-emerald-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#a3e635]/20 text-[#a3e635] flex items-center justify-center border border-[#a3e635]/40">
              <ScanFace className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Biometric Face Authentication</h3>
              <p className="text-[11px] text-emerald-300/80">AI Computer Vision Attendance Verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-emerald-300 hover:text-white hover:bg-emerald-800/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Scanner Simulator */}
        <div className="p-6 flex flex-col items-center">
          <div className="relative w-56 h-56 rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-black flex items-center justify-center shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
              alt="Face Auth"
              className={`h-full w-full object-cover transition-opacity ${scanning ? 'opacity-80' : 'opacity-100'}`}
            />

            {/* Futuristic Scanning Reticle */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#a3e635]" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#a3e635]" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#a3e635]" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#a3e635]" />

              {/* Scanning laser line */}
              {scanning && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#a3e635] to-transparent animate-bounce shadow-[0_0_12px_#a3e635]" />
              )}
            </div>

            {/* Status Overlay */}
            <div className="absolute bottom-2 inset-x-2 bg-black/70 backdrop-blur-sm py-1 px-2 rounded-lg text-center">
              <span className="text-[11px] font-mono font-semibold text-[#a3e635]">
                {scanning ? "MATCHING FACIAL EMBEDDINGS (99.8%)..." : "FACE RECOGNIZED: " + targetUser.id}
              </span>
            </div>
          </div>

          {/* User Telemetry Card */}
          <div className="w-full mt-5 rounded-2xl bg-[#0a2d21]/80 border border-emerald-800/50 p-3.5 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Officer / Name:</span>
              <span className="font-bold text-white">{targetUser.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Assigned Ward:</span>
              <span className="font-semibold text-[#a3e635]">{targetUser.zone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">Shift Timing:</span>
              <span className="text-white">{targetUser.shift}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300/70">GPS Lock:</span>
              <span className="text-emerald-200">22.7196° N, 75.8577° E (&lt;4.2m)</span>
            </div>
          </div>

          {/* Crew Muster Verification Checks */}
          <div className="w-full mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
              driverChecked 
                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200' 
                : 'bg-[#0a2d21]/40 border-emerald-900/40 text-emerald-400/60'
            }`}>
              <UserCheck className={`w-4 h-4 ${driverChecked ? 'text-[#a3e635]' : 'text-emerald-600'}`} />
              <div>
                <p className="font-semibold">Driver Face</p>
                <p className="text-[10px] text-emerald-300/80">{driverChecked ? 'Checked-In ✓' : 'Detecting...'}</p>
              </div>
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
              helperChecked 
                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200' 
                : 'bg-[#0a2d21]/40 border-emerald-900/40 text-emerald-400/60'
            }`}>
              <UserCheck className={`w-4 h-4 ${helperChecked ? 'text-[#a3e635]' : 'text-emerald-600'}`} />
              <div>
                <p className="font-semibold">Helper Face</p>
                <p className="text-[10px] text-emerald-300/80">{helperChecked ? 'Checked-In ✓' : 'Detecting...'}</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            disabled={scanning}
            onClick={() => {
              if (onSuccess) onSuccess();
              onClose();
            }}
            className={`w-full mt-5 py-3 rounded-full font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
              completed
                ? 'bg-[#a3e635] text-[#061e16] hover:bg-[#84cc16] cursor-pointer hover:shadow-emerald-500/20'
                : 'bg-emerald-900/50 text-emerald-400 cursor-not-allowed'
            }`}
          >
            {completed ? (
              <>
                <ShieldCheck className="w-4 h-4" />
                Authenticate & Proceed to Operations
              </>
            ) : (
              'Verifying Facial Biometrics...'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
