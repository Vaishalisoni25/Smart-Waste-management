// API service layer for Smart Waste Management
// Ready to be toggled to real Express / MongoDB backend endpoints

import axios from 'axios';
import * as mockData from '../data/mockData';

// Simulated latency helper to mimic real IoT network responses
const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

// Flag to switch to live backend when API is deployed
const USE_MOCK = true;
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Auth
  login: async (credentials) => {
    if (USE_MOCK) {
      await delay(200);
      return {
        token: "jwt_token_demo_wastex_2026",
        user: { ...mockData.CURRENT_USER, role: credentials.role || "Admin" },
        status: "success"
      };
    }
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // Dashboard Overview
  getDashboardOverview: async () => {
    if (USE_MOCK) {
      await delay();
      return {
        config: mockData.APP_CONFIG,
        kpis: mockData.COMMAND_KPIS,
        markers: mockData.MAP_MARKERS,
        hourlyTrend: mockData.HOURLY_COLLECTION_DATA,
        wardPerformance: mockData.WARD_PERFORMANCE_DATA,
        wasteDistribution: mockData.WASTE_STREAM_DISTRIBUTION,
        circularEconomy: mockData.CIRCULAR_ECONOMY_DATA,
        uccPaymentModes: mockData.UCC_PAYMENT_MODES,
      };
    }
    const response = await apiClient.get('/dashboard/overview');
    return response.data;
  },

  // GIS & Geotagging
  getGisData: async () => {
    if (USE_MOCK) {
      await delay();
      return {
        layers: mockData.GIS_LAYERS,
        records: mockData.GIS_RECORDS,
        markers: mockData.MAP_MARKERS,
      };
    }
    const res = await apiClient.get('/gis');
    return res.data;
  },

  // Routes
  getRoutes: async () => {
    if (USE_MOCK) {
      await delay();
      return mockData.ACTIVE_ROUTES;
    }
    const res = await apiClient.get('/routes');
    return res.data;
  },

  allocateRoute: async (allocationPayload) => {
    if (USE_MOCK) {
      await delay(250);
      return { success: true, message: "Route successfully allocated!", data: allocationPayload };
    }
    const res = await apiClient.post('/routes/allocate', allocationPayload);
    return res.data;
  },

  // Waste Collection Field Properties
  getCollectionProperties: async () => {
    if (USE_MOCK) {
      await delay();
      return mockData.FIELD_PROPERTIES;
    }
    const res = await apiClient.get('/collection');
    return res.data;
  },

  confirmCollection: async (houseId, data) => {
    if (USE_MOCK) {
      await delay(150);
      return { success: true, houseId, updated: data };
    }
    const res = await apiClient.post(`/collection/${houseId}/confirm`, data);
    return res.data;
  },

  // GVP Incidents
  getGvpIncidents: async () => {
    if (USE_MOCK) {
      await delay();
      return mockData.GVP_INCIDENTS;
    }
    const res = await apiClient.get('/gvp');
    return res.data;
  },

  dispatchRatUnit: async (gvpId, unitId) => {
    if (USE_MOCK) {
      await delay(200);
      return { success: true, message: `Emergency RAT unit ${unitId || 'RAT-02'} dispatched to ${gvpId}!` };
    }
    const res = await apiClient.post('/gvp/dispatch', { gvpId, unitId });
    return res.data;
  },

  // Bulk Waste Generators
  getBwgs: async () => {
    if (USE_MOCK) {
      await delay();
      return mockData.BWG_LIST;
    }
    const res = await apiClient.get('/bwg');
    return res.data;
  },

  // Transfer Station
  getTransferStationData: async () => {
    if (USE_MOCK) {
      await delay();
      return mockData.TRANSFER_STATION_DATA;
    }
    const res = await apiClient.get('/transfer-station');
    return res.data;
  },

  // MRF
  getMrfData: async () => {
    if (USE_MOCK) {
      await delay();
      return mockData.MRF_DATA;
    }
    const res = await apiClient.get('/mrf');
    return res.data;
  },

  // Rapid Action Team
  getRatData: async () => {
    if (USE_MOCK) {
      await delay();
      return {
        teams: mockData.RAT_TEAMS,
        incidents: mockData.RAT_INCIDENTS,
      };
    }
    const res = await apiClient.get('/rat');
    return res.data;
  },

  // Weighbridge
  getWeighbridgeData: async () => {
    if (USE_MOCK) {
      await delay();
      return mockData.WEIGHBRIDGE_DATA;
    }
    const res = await apiClient.get('/weighbridge');
    return res.data;
  },

  // CCTV
  getCctvCameras: async () => {
    if (USE_MOCK) {
      await delay();
      return mockData.CCTV_CAMERAS;
    }
    const res = await apiClient.get('/cctv');
    return res.data;
  },

  // UCC / User Charges
  getUccData: async () => {
    if (USE_MOCK) {
      await delay();
      return mockData.UCC_DATA;
    }
    const res = await apiClient.get('/ucc');
    return res.data;
  },

  // Complaints
  getComplaints: async () => {
    if (USE_MOCK) {
      await delay();
      return mockData.COMPLAINTS_DATA;
    }
    const res = await apiClient.get('/complaints');
    return res.data;
  },

  // City Performance
  getCityPerformance: async () => {
    if (USE_MOCK) {
      await delay();
      return mockData.CITY_PERFORMANCE_DATA;
    }
    const res = await apiClient.get('/city-performance');
    return res.data;
  },

  // Reports
  getReports: async () => {
    if (USE_MOCK) {
      await delay();
      return mockData.MUNICIPAL_REPORTS;
    }
    const res = await apiClient.get('/reports');
    return res.data;
  },

  // Street Sweeping
  getStreetSweepingData: async () => {
    if (USE_MOCK) {
      await delay();
      return mockData.STREET_SWEEPING_DATA;
    }
    const res = await apiClient.get('/street-sweeping');
    return res.data;
  },

  // Drain Desilting
  getDrainDesiltingData: async () => {
    if (USE_MOCK) {
      await delay();
      return mockData.DRAIN_DESILTING_DATA;
    }
    const res = await apiClient.get('/drain-desilting');
    return res.data;
  },
};
