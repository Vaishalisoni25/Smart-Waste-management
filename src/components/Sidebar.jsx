import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Route,
  Trash2,
  AlertTriangle,
  Building2,
  RefreshCw,
  Factory,
  Zap,
  Scale,
  Camera,
  CreditCard,
  MessageSquareWarning,
  Award,
  FileSpreadsheet,
  Wind,
  Droplets,
  Smartphone,
  LogOut,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Recycle
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard, badge: 'Live' },
  { path: '/gis', label: 'GIS & Geotagging', icon: MapPin },
  { path: '/routes', label: 'Route Management', icon: Route },
  { path: '/collection', label: 'Waste Collection', icon: Trash2 },
  { path: '/driver-hud', label: 'In-Cab Driver HUD', icon: Smartphone, highlight: true },
  { path: '/gvp', label: 'GVP Management', icon: AlertTriangle, count: 4 },
  { path: '/bwg', label: 'Bulk Waste Gen. (BWG)', icon: Building2 },
  { path: '/transfer-station', label: 'Transfer Station', icon: RefreshCw },
  { path: '/mrf', label: 'MRF Facility', icon: Factory },
  { path: '/rapid-action', label: 'Rapid Action Team', icon: Zap, alert: true },
  { path: '/weighbridge', label: 'Weighbridge', icon: Scale },
  { path: '/cctv', label: 'CCTV Surveillance', icon: Camera },
  { path: '/ucc', label: 'User Charges (UCC)', icon: CreditCard },
  { path: '/complaints', label: 'Complaint Redressal', icon: MessageSquareWarning },
  { path: '/kpi', label: 'KPI & City Index', icon: Award },
  { path: '/reports', label: 'Statutory Reports', icon: FileSpreadsheet },
  { path: '/street-sweeping', label: 'Street Sweeping', icon: Wind },
  { path: '/drain-desilting', label: 'Drain Desilting', icon: Droplets },
];

export default function Sidebar({ isOpen, setIsOpen, isCollapsed, setIsCollapsed, currentUser }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#07241a] text-white border-r border-emerald-900/60 shadow-2xl transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-68'} w-72`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-900/70 bg-[#051c14]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#84cc16] to-[#166534] flex items-center justify-center text-[#061e16] shadow-md shrink-0">
              <Recycle className="w-6 h-6 stroke-[2.5]" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                  Wastex
                  <span className="text-[10px] font-bold text-[#a3e635] bg-[#a3e635]/20 px-1.5 py-0.5 rounded border border-[#a3e635]/30">
                    PRO
                  </span>
                </span>
                <span className="text-[10px] font-medium text-emerald-300/80 tracking-wider uppercase truncate">
                  Smart Waste & IoT
                </span>
              </div>
            )}
          </div>

          {/* Collapse Toggle for Desktop */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-7 h-7 rounded-lg bg-emerald-900/60 text-emerald-300 hover:text-white hover:bg-emerald-800 items-center justify-center transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-400/60">
            {!isCollapsed && "Core Operations"}
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#a3e635] text-[#061e16] shadow-md shadow-[#a3e635]/15 font-bold'
                      : item.highlight
                      ? 'bg-[#144e3b]/80 text-[#a3e635] hover:bg-[#166534] hover:text-white border border-[#a3e635]/30'
                      : 'text-emerald-100 hover:bg-[#0e3b2c] hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-[#061e16]' : item.highlight ? 'text-[#a3e635]' : 'text-emerald-300'
                    }`} />
                    
                    {!isCollapsed && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}

                    {!isCollapsed && item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-950/80 text-[#a3e635] font-bold">
                        {item.badge}
                      </span>
                    )}

                    {!isCollapsed && item.count && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                        {item.count}
                      </span>
                    )}

                    {!isCollapsed && item.alert && (
                      <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-ping" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* User Card & Logout in Footer */}
        <div className="p-3 border-t border-emerald-900/60 bg-[#051c14]/90">
          <div className={`flex items-center gap-3 p-2 rounded-xl bg-emerald-950/60 border border-emerald-900/40 ${isCollapsed ? 'justify-center' : ''}`}>
            <img
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
              alt="User"
              className="w-8 h-8 rounded-lg object-cover ring-1 ring-[#a3e635]/50 shrink-0"
            />
            {!isCollapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{currentUser?.name || "Er. Rajesh Sharma"}</p>
                <p className="text-[10px] text-[#a3e635] font-medium truncate">{currentUser?.role || "Admin"} • {currentUser?.zone || "Zone 1"}</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
