import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layout
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GisPage from './pages/GisPage';
import RouteManagement from './pages/RouteManagement';
import WasteCollection from './pages/WasteCollection';
import DriverHudPage from './pages/DriverHudPage';
import GvpManagement from './pages/GvpManagement';
import BwgManagement from './pages/BwgManagement';
import TransferStation from './pages/TransferStation';
import MrfFacility from './pages/MrfFacility';
import RapidActionTeam from './pages/RapidActionTeam';
import Weighbridge from './pages/Weighbridge';
import CctvSurveillance from './pages/CctvSurveillance';
import UserCharges from './pages/UserCharges';
import ComplaintRedressal from './pages/ComplaintRedressal';
import CityPerformance from './pages/CityPerformance';
import ReportsPage from './pages/ReportsPage';
import StreetSweeping from './pages/StreetSweeping';
import DrainDesilting from './pages/DrainDesilting';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Auth Route */}
        <Route path="/login" element={<Login />} />

        {/* Main Application with Wastex Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/gis" element={<GisPage />} />
          <Route path="/routes" element={<RouteManagement />} />
          <Route path="/collection" element={<WasteCollection />} />
          <Route path="/driver-hud" element={<DriverHudPage />} />
          <Route path="/gvp" element={<GvpManagement />} />
          <Route path="/bwg" element={<BwgManagement />} />
          <Route path="/transfer-station" element={<TransferStation />} />
          <Route path="/mrf" element={<MrfFacility />} />
          <Route path="/rapid-action" element={<RapidActionTeam />} />
          <Route path="/weighbridge" element={<Weighbridge />} />
          <Route path="/cctv" element={<CctvSurveillance />} />
          <Route path="/ucc" element={<UserCharges />} />
          <Route path="/complaints" element={<ComplaintRedressal />} />
          <Route path="/kpi" element={<CityPerformance />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/street-sweeping" element={<StreetSweeping />} />
          <Route path="/drain-desilting" element={<DrainDesilting />} />
        </Route>

        {/* Fallback to Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
