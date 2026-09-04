import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  MapPin,
  ScanFace,
  Radio,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Recycle
} from 'lucide-react';
import { CITIES_LIST, USER_ROLES } from '../data/mockData';

export default function Navbar({
  toggleSidebar,
  currentCity,
  setCurrentCity,
  currentUser,
  setCurrentUser,
  openFaceAuth
}) {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showCityMenu, setShowCityMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "RAT-02 dispatched to GVP #04 (Shastri Flyover)", time: "2 min ago", unread: true },
    { id: 2, text: "Weighbridge Scale 01 ANPR logged MH-12-TR-9904", time: "8 min ago", unread: true },
    { id: 3, text: "Ward 08 achieved 96.5% D2D segregation target", time: "24 min ago", unread: false },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-emerald-950/10 bg-white/90 px-4 sm:px-6 backdrop-blur-md">
      {/* Left section: Hamburger & City Switcher */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={toggleSidebar}
          className="rounded-xl p-2 text-emerald-950 hover:bg-emerald-50 lg:hidden transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 text-[#0a2d21]" />
        </button>

        {/* Mobile Brand indicator */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 rounded-xl bg-[#166534] flex items-center justify-center text-[#a3e635]">
            <Recycle className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-[#0a2d21] text-base">Wastex</span>
        </div>

        {/* City Switcher dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setShowCityMenu(!showCityMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f3f7f3] hover:bg-emerald-100/70 text-xs font-bold text-[#0a2d21] border border-emerald-900/10 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#166534]" />
            <span className="truncate max-w-[200px]">{currentCity}</span>
            <ChevronDown className="w-3.5 h-3.5 text-emerald-700" />
          </button>

          {showCityMenu && (
            <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-white p-2 shadow-xl border border-emerald-950/10 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 text-[10px] font-bold text-emerald-800/60 uppercase">Select Municipal Corp</div>
              {CITIES_LIST.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setCurrentCity(city);
                    setShowCityMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                    currentCity === city ? 'bg-[#166534] text-white' : 'text-emerald-950 hover:bg-emerald-50'
                  }`}
                >
                  {city}
                  {currentCity === city && <CheckCircle2 className="w-3.5 h-3.5 text-[#a3e635]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Real-Time IoT Telemetry Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-xs font-semibold text-emerald-800">
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>IoT Fleet: <strong className="text-[#0a2d21]">3,842 / 3,910</strong> Online</span>
        </div>
      </div>

      {/* Right Section: Search, Face Auth, Role Switcher, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block w-44 lg:w-60">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-900/40" />
          <input
            type="text"
            placeholder="Search Ward, Vehicle, QR..."
            className="w-full rounded-full bg-[#f3f7f3] pl-9 pr-4 py-1.5 text-xs text-[#0a2d21] placeholder-emerald-900/40 border border-emerald-900/10 focus:outline-hidden focus:border-[#84cc16] focus:bg-white transition-all"
          />
        </div>

        {/* Biometric Face Auth Button */}
        <button
          onClick={openFaceAuth}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#0a2d21] to-[#144e3b] text-[#a3e635] text-xs font-bold hover:brightness-110 shadow-xs border border-emerald-600/30 transition-all cursor-pointer"
          title="Simulate Supervisor / Crew Face Attendance"
        >
          <ScanFace className="w-4 h-4 text-[#a3e635]" />
          <span className="hidden sm:inline">Face Auth</span>
        </button>

        {/* Role Selector Pill */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-xs font-bold text-[#166534] border border-emerald-200 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Role:</span>
            <span>{currentUser.role}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white p-2 shadow-xl border border-emerald-950/10 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1 text-[10px] font-bold text-emerald-800/60 uppercase">Switch Persona Role</div>
              {USER_ROLES.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setCurrentUser((prev) => ({ ...prev, role }));
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                    currentUser.role === role ? 'bg-[#166534] text-white' : 'text-emerald-950 hover:bg-emerald-50'
                  }`}
                >
                  {role}
                  {currentUser.role === role && <CheckCircle2 className="w-3.5 h-3.5 text-[#a3e635]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-full p-2 text-emerald-950 hover:bg-emerald-50 transition-colors"
          >
            <Bell className="w-4 h-4 text-[#0a2d21]" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white p-3 shadow-xl border border-emerald-950/10 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between px-2 pb-2 border-b border-emerald-100">
                <span className="text-xs font-bold text-[#0a2d21]">IoT Alerts & Incidents</span>
                <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">2 New</span>
              </div>
              <div className="divide-y divide-emerald-50 mt-1">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 text-xs hover:bg-emerald-50/60 rounded-lg transition-colors">
                    <p className="font-semibold text-emerald-950 leading-tight">{n.text}</p>
                    <span className="text-[10px] text-emerald-800/60">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-emerald-950/10">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-[#84cc16]"
          />
        </div>
      </div>
    </header>
  );
}
