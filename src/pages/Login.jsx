import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recycle, ScanFace, ShieldCheck, ArrowRight, Lock, Mail, UserCheck, Sparkles } from 'lucide-react';
import { USER_ROLES } from '../data/mockData';
import FaceAuthModal from '../components/FaceAuthModal';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('rajesh.sharma@wastex.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState('Admin');
  const [rememberMe, setRememberMe] = useState(true);
  const [faceModalOpen, setFaceModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#061e16] text-white">
      {/* Left Photographic & Branding Hero (Wastex visual theme) */}
      <div className="relative flex-1 min-h-[420px] lg:min-h-screen flex flex-col justify-between p-8 lg:p-14 overflow-hidden bg-cover bg-center"
           style={{
             backgroundImage: `linear-gradient(to bottom, rgba(6, 30, 22, 0.85), rgba(10, 45, 33, 0.95)), url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1600&q=80')`
           }}>
        
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-wastex-grid-dark pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#a3e635] text-[#061e16] flex items-center justify-center shadow-lg shadow-[#a3e635]/20">
            <Recycle className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Wastex
              <span className="text-xs font-bold text-[#061e16] bg-[#a3e635] px-2 py-0.5 rounded-full">
                SMART CITY
              </span>
            </h1>
            <p className="text-xs font-medium text-emerald-300">Intelligent Municipal SWM Command Center</p>
          </div>
        </div>

        {/* Middle Hero Content */}
        <div className="relative z-10 my-auto py-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#a3e635]/15 border border-[#a3e635]/30 text-xs font-bold text-[#a3e635] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            7-Star Garbage Free City (GFC) Operating System
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Waste Less. Live More Sustainable.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-emerald-200/80 leading-relaxed">
            Monitor door-to-door collection, track GPS vehicle fleets in real-time, eliminate GVPs, and power the circular economy through IoT intelligence.
          </p>

          {/* Quick Metrics highlight */}
          <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-emerald-800/60">
            <div>
              <p className="text-2xl font-extrabold text-[#a3e635]">95.2%</p>
              <p className="text-xs text-emerald-300/80">D2D Beat Coverage</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white">1,428 MT</p>
              <p className="text-xs text-emerald-300/80">Daily Intake Processed</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#a3e635]">98.4%</p>
              <p className="text-xs text-emerald-300/80">SWM Compliance Index</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-emerald-300/60 flex items-center justify-between">
          <span>Official Swachh Survekshan SWM Portal</span>
          <span>Ver 4.8.2-PRO</span>
        </div>
      </div>

      {/* Right Login Card */}
      <div className="w-full lg:w-[480px] bg-white text-[#0d281e] flex flex-col justify-center p-8 sm:p-12 lg:p-14">
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#166534]">Access Control</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2d21] mt-1">Welcome Back</h2>
            <p className="text-xs text-emerald-900/60 mt-1">Enter your municipal credentials to access the command suite.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Persona Role Select */}
            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase mb-1.5">
                Role Persona
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl bg-emerald-50/70 border border-emerald-900/15 px-3.5 py-2.5 text-xs font-semibold text-[#0a2d21] focus:outline-hidden focus:border-[#84cc16] focus:bg-white"
              >
                {USER_ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Email / User ID */}
            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase mb-1.5">
                Officer Email / User ID
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-700/60" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-emerald-50/70 border border-emerald-900/15 pl-10 pr-3.5 py-2.5 text-xs font-semibold text-[#0a2d21] focus:outline-hidden focus:border-[#84cc16] focus:bg-white"
                  placeholder="name@wastex.gov.in"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-emerald-950 uppercase mb-1.5">
                Password / Passcode
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-700/60" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-emerald-50/70 border border-emerald-900/15 pl-10 pr-3.5 py-2.5 text-xs font-semibold text-[#0a2d21] focus:outline-hidden focus:border-[#84cc16] focus:bg-white"
                  placeholder="••••••••••••"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-emerald-900/80">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#166534] accent-[#166534]"
                />
                Remember this device
              </label>
              <a href="#" className="font-semibold text-[#166534] hover:underline">Forgot passcode?</a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-full bg-[#166534] hover:bg-[#0e4b25] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 active:scale-98 transition-all cursor-pointer"
            >
              {loading ? "Authenticating..." : "Login to Command Center"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-emerald-900/10" />
            </div>
            <span className="relative bg-white px-3 text-[11px] font-bold uppercase text-emerald-900/50">
              OR BIOMETRIC ATTENDANCE
            </span>
          </div>

          {/* Biometric Face Auth Button */}
          <button
            type="button"
            onClick={() => setFaceModalOpen(true)}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#0a2d21] to-[#144e3b] text-[#a3e635] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-98 transition-all cursor-pointer border border-emerald-600/30"
          >
            <ScanFace className="w-4 h-4 text-[#a3e635]" />
            Face Authentication Demo
          </button>

          <p className="text-center text-[11px] text-emerald-900/50 mt-6">
            Authorized municipal personnel only. All access events are GPS geo-tagged and logged under SWM Rules 2016.
          </p>
        </div>
      </div>

      {/* Biometric Modal */}
      <FaceAuthModal
        isOpen={faceModalOpen}
        onClose={() => setFaceModalOpen(false)}
        onSuccess={() => navigate('/')}
        role={role}
        targetUser={{
          name: "Supervisor Alex Chen",
          id: "SUP-8042",
          zone: "Zone 1, Ward 04",
          shift: "06:00 AM - 02:00 PM"
        }}
      />
    </div>
  );
}
