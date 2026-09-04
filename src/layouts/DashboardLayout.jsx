import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import FaceAuthModal from '../components/FaceAuthModal';
import { CURRENT_USER, CITIES_LIST } from '../data/mockData';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentCity, setCurrentCity] = useState(CITIES_LIST[0]);
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);
  const [faceAuthOpen, setFaceAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f7f4] text-[#0d281e] flex flex-col font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        currentUser={currentUser}
      />

      {/* Main Container shifted by sidebar width */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-68'
        }`}
      >
        {/* Top Navbar */}
        <Navbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          currentCity={currentCity}
          setCurrentCity={setCurrentCity}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          openFaceAuth={() => setFaceAuthOpen(true)}
        />

        {/* Page Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet context={{ currentUser, currentCity, openFaceAuth: () => setFaceAuthOpen(true) }} />
        </main>

        {/* Municipal Footer */}
        <footer className="mt-auto border-t border-emerald-950/10 bg-white/70 px-6 py-4 text-center text-xs text-emerald-900/60">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 Wastex Smart Waste Management System. All rights reserved.</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#166534]" />
              CPCB / SBM 2.0 Real-time Central Cloud Sync: <strong className="text-emerald-950">Active</strong>
            </span>
          </div>
        </footer>
      </div>

      {/* Global Face Auth Biometric Modal */}
      <FaceAuthModal
        isOpen={faceAuthOpen}
        onClose={() => setFaceAuthOpen(false)}
        role={currentUser.role}
        targetUser={{
          name: currentUser.name,
          id: "SUP-8042",
          zone: currentUser.zone,
          shift: "06:00 AM - 02:00 PM"
        }}
      />
    </div>
  );
}
