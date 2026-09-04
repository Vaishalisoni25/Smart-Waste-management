// Smart Waste Management & IoT Operations Mock Database
// Wastex-themed modern environmental municipal dataset

export const APP_CONFIG = {
  appName: "Wastex Smart City",
  tagline: "Intelligent Municipal Waste & Circular Economy Operations",
  city: "Indore Municipal Corporation",
  state: "Madhya Pradesh",
  systemVersion: "v4.8.2-PRO",
  iotStatus: "ALL SYSTEMS OPERATIONAL",
  devicesOnline: "3,842 / 3,910",
  lastSync: "Just now",
};

export const CITIES_LIST = [
  "Indore Smart City (Swachh #1)",
  "Navi Mumbai Municipal Corp",
  "Bengaluru Bruhat Smart Waste",
  "Surat Clean City Eco-Zone",
  "Bhopal Municipal Green Mission"
];

export const USER_ROLES = [
  "Admin",
  "Supervisor",
  "Driver",
  "Helper",
  "Surveyor",
  "Authority",
  "Sanitary Inspector"
];

export const CURRENT_USER = {
  name: "Er. Rajesh Sharma",
  role: "Admin",
  designation: "Chief Sanitation Officer & IoT Director",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  zone: "Zone 1 - Central Eco",
  email: "rajesh.sharma@wastex.gov.in"
};

// Overview KPIs
export const COMMAND_KPIS = [
  {
    id: "waste_collected",
    title: "Total Waste Collected",
    value: "1,428.5",
    unit: "MT",
    change: "+4.8%",
    isPositive: true,
    subtitle: "Daily Target: 1,500 MT",
    icon: "Trash2",
    color: "emerald"
  },
  {
    id: "d2d_coverage",
    title: "D2D Coverage",
    value: "95.2%",
    unit: "",
    change: "+1.4%",
    isPositive: true,
    subtitle: "148,200 / 155,600 Households",
    icon: "Home",
    color: "lime"
  },
  {
    id: "segregation_compliance",
    title: "Segregation Compliance",
    value: "91.8%",
    unit: "",
    change: "+2.3%",
    isPositive: true,
    subtitle: "Source 3-Way Segregation",
    icon: "Boxes",
    color: "forest"
  },
  {
    id: "landfill_diversion",
    title: "Landfill Diversion",
    value: "86.8%",
    unit: "",
    change: "+5.1%",
    isPositive: true,
    subtitle: "1,240 MT Diverted via MRF/Compost",
    icon: "Recycle",
    color: "emerald"
  },
  {
    id: "gvp_resolution",
    title: "GVP Resolution",
    value: "91.9%",
    unit: "",
    change: "+8.2%",
    isPositive: true,
    subtitle: "44 of 48 Hotspots Cleared",
    icon: "MapPinCheck",
    color: "amber"
  },
  {
    id: "ucc_collection",
    title: "UCC Collection",
    value: "₹18,42,500",
    unit: "",
    change: "+12.4%",
    isPositive: true,
    subtitle: "Day Realization: ₹1,48,250",
    icon: "CreditCard",
    color: "lime"
  },
  {
    id: "complaints_resolved",
    title: "Complaints Resolved",
    value: "98.4%",
    unit: "",
    change: "+0.6%",
    isPositive: true,
    subtitle: "401 / 420 (Avg SLA: 2.1 hrs)",
    icon: "CheckCircle2",
    color: "emerald"
  },
  {
    id: "vehicles_active",
    title: "Vehicles Active",
    value: "38 / 42",
    unit: "Trucks",
    change: "90.5%",
    isPositive: true,
    subtitle: "4 in Maintenance / Standby",
    icon: "Truck",
    color: "forest"
  }
];

// Operational Map Locations (Centered on Indore: lat ~22.7196, lng 75.8577)
export const MAP_MARKERS = [
  // Vehicles
  {
    id: "v-01",
    type: "vehicle",
    label: "Compactor Truck #402",
    lat: 22.7240,
    lng: 75.8640,
    status: "active",
    color: "orange",
    details: { driver: "Mohan Lal", route: "BEAT-W04-01", load: "74%", speed: "24 km/h", status: "En route to Transfer Station" }
  },
  {
    id: "v-02",
    type: "vehicle",
    label: "Tipper Auto #108",
    lat: 22.7150,
    lng: 75.8520,
    status: "active",
    color: "orange",
    details: { driver: "Suresh Yadav", route: "BEAT-W02-03", load: "88%", speed: "18 km/h", status: "D2D Collection Ongoing" }
  },
  {
    id: "v-03",
    type: "vehicle",
    label: "Mechanical Sweeper #07",
    lat: 22.7310,
    lng: 75.8710,
    status: "active",
    color: "orange",
    details: { driver: "Karan Verma", route: "RING-RD-NORTH", load: "45%", speed: "12 km/h", status: "Active Sweeping" }
  },
  {
    id: "v-04",
    type: "vehicle",
    label: "Rapid Action Unit #02",
    lat: 22.7090,
    lng: 75.8610,
    status: "active",
    color: "orange",
    details: { driver: "Inspector Vikram", route: "RAT-PATROL-Z1", load: "20%", speed: "35 km/h", status: "GVP Response" }
  },

  // Facilities
  {
    id: "ts-01",
    type: "transfer_station",
    label: "Central Transfer Station (CTS)",
    lat: 22.7350,
    lng: 75.8820,
    status: "completed",
    color: "green",
    details: { capacity: "78%", intakeToday: "240 MT", haulersActive: 6, weighbridge: "Online" }
  },
  {
    id: "ts-02",
    type: "transfer_station",
    label: "Palasia Eco Transfer Bay",
    lat: 22.7210,
    lng: 75.8890,
    status: "completed",
    color: "green",
    details: { capacity: "62%", intakeToday: "185 MT", haulersActive: 4, weighbridge: "Online" }
  },
  {
    id: "mrf-01",
    type: "mrf",
    label: "GreenTech Integrated MRF Plant",
    lat: 22.7480,
    lng: 75.8950,
    status: "completed",
    color: "green",
    details: { intake: "420.5 MT", efficiency: "88.4%", baled: "185 MT", purity: "96.2%" }
  },
  {
    id: "wte-01",
    type: "processing_plant",
    label: "Devguradia Bio-Methanation & RDF Plant",
    lat: 22.6850,
    lng: 75.9120,
    status: "completed",
    color: "green",
    details: { powerGen: "11.2 MW/h", compostOut: "140 MT", methaneYield: "98.5%" }
  },

  // Bulk Waste Generators (BWG)
  {
    id: "bwg-01",
    type: "bwg",
    label: "Sheraton Grand Hotel & Convention",
    lat: 22.7280,
    lng: 75.8560,
    status: "bwg",
    color: "blue",
    details: { category: "Hotel", wasteEst: "3.2 MT/day", actual: "3.1 MT", onSiteCompost: "Active", compliance: "98%" }
  },
  {
    id: "bwg-02",
    type: "bwg",
    label: "Apollo Super Specialty Hospital",
    lat: 22.7390,
    lng: 75.8690,
    status: "bwg",
    color: "blue",
    details: { category: "Hospital", wasteEst: "2.8 MT/day", actual: "2.6 MT", biomedicalReg: "Segregated", compliance: "100%" }
  },
  {
    id: "bwg-03",
    type: "bwg",
    label: "Phoenix Citadel Mega Mall",
    lat: 22.7120,
    lng: 75.8980,
    status: "bwg",
    color: "blue",
    details: { category: "Mall", wasteEst: "6.5 MT/day", actual: "6.2 MT", dryWasteContract: "MRF Direct", compliance: "96%" }
  },

  // GVPs (Garbage Vulnerable Points)
  {
    id: "gvp-01",
    type: "gvp",
    label: "GVP #04: Shastri Market Flyover Corner",
    lat: 22.7230,
    lng: 75.8590,
    status: "issue",
    color: "red",
    details: { severity: "Critical", dumpVol: "2.4 MT", incident: "Night Dumping", vehicleAssigned: "RAT-02", eta: "8 mins" }
  },
  {
    id: "gvp-02",
    type: "gvp",
    label: "GVP #12: Old Railway Crossing Yard",
    lat: 22.7180,
    lng: 75.8480,
    status: "pending",
    color: "yellow",
    details: { severity: "Warning", dumpVol: "1.1 MT", incident: "C&D Waste Encroachment", vehicleAssigned: "Tipper-14", eta: "22 mins" }
  },
  {
    id: "gvp-03",
    type: "gvp",
    label: "GVP #09: Anand Nagar Service Road",
    lat: 22.7050,
    lng: 75.8750,
    status: "completed",
    color: "green",
    details: { severity: "Resolved", dumpVol: "Cleared", incident: "Beautified with flower planter boxes", certified: "Yes" }
  }
];

// Analytics Charts Data
export const HOURLY_COLLECTION_DATA = [
  { time: "06:00", wet: 45, dry: 32, mixed: 4, target: 80 },
  { time: "07:00", wet: 120, dry: 85, mixed: 8, target: 190 },
  { time: "08:00", wet: 240, dry: 180, mixed: 14, target: 400 },
  { time: "09:00", wet: 310, dry: 235, mixed: 18, target: 520 },
  { time: "10:00", wet: 280, dry: 210, mixed: 15, target: 480 },
  { time: "11:00", wet: 190, dry: 150, mixed: 9, target: 330 },
  { time: "12:00", wet: 110, dry: 95, mixed: 6, target: 200 },
  { time: "13:00", wet: 70, dry: 55, mixed: 3, target: 120 },
];

export const WARD_PERFORMANCE_DATA = [
  { ward: "Ward 01", compliance: 96.4, diversion: 89.2, collection: 82.4 },
  { ward: "Ward 02", compliance: 94.8, diversion: 87.5, collection: 78.1 },
  { ward: "Ward 03", compliance: 92.1, diversion: 84.8, collection: 91.0 },
  { ward: "Ward 04", compliance: 95.5, diversion: 91.2, collection: 86.3 },
  { ward: "Ward 05", compliance: 89.3, diversion: 82.0, collection: 74.5 },
  { ward: "Ward 06", compliance: 93.7, diversion: 88.4, collection: 95.2 },
  { ward: "Ward 07", compliance: 90.8, diversion: 85.1, collection: 69.8 },
  { ward: "Ward 08", compliance: 97.2, diversion: 93.0, collection: 88.9 },
];

export const WASTE_STREAM_DISTRIBUTION = [
  { name: "Wet Biodegradable", value: 54, color: "#166534" },
  { name: "Dry Recyclable", value: 34, color: "#84cc16" },
  { name: "Domestic Hazardous", value: 4, color: "#f59e0b" },
  { name: "Sanitary Waste", value: 5, color: "#065f46" },
  { name: "Inert / Non-Recyclable", value: 3, color: "#94a3b8" },
];

export const CIRCULAR_ECONOMY_DATA = [
  { name: "Bio-Methanation / Compost", percentage: 48, mt: 685.6, color: "#15803d" },
  { name: "MRF Material Recovery", percentage: 28, mt: 399.9, color: "#84cc16" },
  { name: "Refuse Derived Fuel (RDF)", percentage: 14, mt: 200.0, color: "#0d9488" },
  { name: "Scientific Sanitary Landfill", percentage: 10, mt: 143.0, color: "#64748b" },
];

export const UCC_PAYMENT_MODES = [
  { name: "UPI QR / Digital", value: 62, color: "#166534" },
  { name: "Handheld POS Terminal", value: 22, color: "#84cc16" },
  { name: "Cash with Digital Receipt", value: 12, color: "#f59e0b" },
  { name: "Citizen Portal / Net Banking", value: 4, color: "#0284c7" },
];

// GIS Datasets
export const GIS_LAYERS = [
  { id: "zones", name: "Zone Boundaries", count: 4, active: true },
  { id: "wards", name: "Ward Boundaries", count: 18, active: true },
  { id: "routes", name: "Active Collection Routes", count: 42, active: true },
  { id: "gvp", name: "GVP Hotspots", count: 48, active: true },
  { id: "bwg", name: "Bulk Waste Generators", count: 184, active: true },
  { id: "transfer", name: "Transfer Stations", count: 6, active: true },
  { id: "mrf", name: "MRF Processing Facilities", count: 3, active: true },
  { id: "drains", name: "Storm Water Drains", count: 24, active: false }
];

export const GIS_RECORDS = [
  { id: "GIS-101", name: "Zone 1 Central Corridor", type: "Zone Boundary", ward: "Ward 1-5", area: "18.4 sq km", households: 42800, status: "Active" },
  { id: "GIS-102", name: "Ward 04 Residential Core", type: "Ward Boundary", ward: "Ward 04", area: "3.2 sq km", households: 8450, status: "Active" },
  { id: "GIS-103", name: "BEAT-W04-01 Route Polyline", type: "Route", ward: "Ward 04", area: "4.8 km length", households: 1240, status: "Active" },
  { id: "GIS-104", name: "Shastri Market Vulnerable Point", type: "GVP", ward: "Ward 04", area: "120 sq m", households: 0, status: "Critical Issue" },
  { id: "GIS-105", name: "Sheraton Grand Multi-Complex", type: "BWG", ward: "Ward 03", area: "45,000 sq m", households: 0, status: "Compliant" },
  { id: "GIS-106", name: "Drain Trunk Line #02", type: "Drain", ward: "Ward 07", area: "6.2 km length", households: 0, status: "Desilting" },
];

// Routes Management
export const ACTIVE_ROUTES = [
  {
    id: "BEAT-W04-01",
    truck: "TRUCK-402 (Compactor)",
    collector: "COL-8821",
    driver: "Mohan Lal",
    helper: "Rameshwar Rao",
    distance: "4.8 km",
    completion: 60.4,
    stopsTotal: 180,
    stopsCompleted: 108,
    etaMin: "32 min remaining",
    status: "In Progress",
    ward: "Ward 04",
    zone: "Zone 1",
    startTime: "06:30 AM",
    sequence: [
      { name: "Depot Departure", type: "start", time: "06:30 AM", done: true },
      { name: "Sector A Blocks (Stops 1-40)", type: "stop", time: "07:15 AM", done: true },
      { name: "Sector B Market Hub (Stops 41-90)", type: "stop", time: "08:10 AM", done: true },
      { name: "Sector C Landmark: City Hospital Corner", type: "landmark", time: "08:45 AM", done: true },
      { name: "GVP Hotspot Inspection #04", type: "gvp", time: "09:05 AM", done: false },
      { name: "Sector D Enclave (Stops 91-180)", type: "stop", time: "09:40 AM", done: false },
      { name: "Central Transfer Station Unload", type: "end", time: "10:15 AM", done: false },
    ]
  },
  {
    id: "BEAT-W02-03",
    truck: "TRUCK-108 (Tipper)",
    collector: "COL-6512",
    driver: "Suresh Yadav",
    helper: "Dinesh K",
    distance: "3.6 km",
    completion: 88.0,
    stopsTotal: 140,
    stopsCompleted: 123,
    etaMin: "12 min remaining",
    status: "In Progress",
    ward: "Ward 02",
    zone: "Zone 1",
    startTime: "06:45 AM",
    sequence: [
      { name: "Depot Departure", type: "start", time: "06:45 AM", done: true },
      { name: "Old Palasia Lane 1-8", type: "stop", time: "07:30 AM", done: true },
      { name: "Commercial High Street", type: "stop", time: "08:20 AM", done: true },
      { name: "Transfer Station Intake", type: "end", time: "09:15 AM", done: false },
    ]
  },
  {
    id: "BEAT-W08-02",
    truck: "TRUCK-215 (Twin Bin Compactor)",
    collector: "COL-9014",
    driver: "Ashok Verma",
    helper: "Vinod S",
    distance: "5.4 km",
    completion: 100,
    stopsTotal: 210,
    stopsCompleted: 210,
    etaMin: "Route Completed",
    status: "Completed",
    ward: "Ward 08",
    zone: "Zone 2",
    startTime: "06:00 AM",
    sequence: [
      { name: "Depot Departure", type: "start", time: "06:00 AM", done: true },
      { name: "Vijay Nagar Phase 1", type: "stop", time: "07:00 AM", done: true },
      { name: "Vijay Nagar Phase 2", type: "stop", time: "08:15 AM", done: true },
      { name: "CTS Unload & Wash Bay", type: "end", time: "09:10 AM", done: true },
    ]
  }
];

// Waste Collection Field Worker Data
export const FIELD_PROPERTIES = [
  {
    houseId: "HSE-W04-0982",
    qrId: "QR-IMC-88391",
    resident: "Dr. Ananya Mukherjee",
    address: "Flat 402, Green Orchid Heights, Ward 04",
    category: "Residential",
    uccStatus: "Paid (Valid till Dec 2026)",
    collectionStatus: "Collected",
    segregationScore: "Grade A (100% Segregated)",
    weights: { wet: 2.4, dry: 1.8, sanitary: 0.2, hazardous: 0.0 },
    gps: "22.7241° N, 75.8643° E",
    timestamp: "08:42:15 AM",
    photoDry: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80",
    photoWet: "https://images.unsplash.com/photo-1584447141399-be2412124c05?auto=format&fit=crop&w=400&q=80",
    photoMixed: null
  },
  {
    houseId: "HSE-W04-0983",
    qrId: "QR-IMC-88392",
    resident: "Mr. Sunil V. Singhania",
    address: "Bungalow #14, Silver Oak Avenue, Ward 04",
    category: "Residential",
    uccStatus: "Arrears Due (₹300)",
    collectionStatus: "Pending",
    segregationScore: "Grade B (Minor mixed paper)",
    weights: { wet: 3.1, dry: 2.2, sanitary: 0.0, hazardous: 0.1 },
    gps: "22.7248° N, 75.8651° E",
    timestamp: "Pending",
    photoDry: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=400&q=80",
    photoWet: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=400&q=80",
    photoMixed: null
  },
  {
    houseId: "HSE-W04-0984",
    qrId: "QR-IMC-88393",
    resident: "Pooja Provision & Bakery",
    address: "Shop 7, Main Ring Road Market, Ward 04",
    category: "Commercial",
    uccStatus: "Paid",
    collectionStatus: "Flagged Issue",
    segregationScore: "Non-Segregated (Mixed)",
    weights: { wet: 1.0, dry: 0.5, mixed: 8.4, hazardous: 0.0 },
    gps: "22.7252° N, 75.8660° E",
    timestamp: "08:55:10 AM",
    photoDry: null,
    photoWet: null,
    photoMixed: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=400&q=80"
  }
];

// GVP Management
export const GVP_INCIDENTS = [
  {
    id: "GVP-W04-01",
    location: "Shastri Market Flyover Corner",
    ward: "Ward 04",
    zone: "Zone 1",
    status: "Critical",
    incidentType: "Illegal Night Commercial Dumping",
    assignedVehicle: "RAT-02 (Rapid Patrol)",
    responseTime: "7.2 mins",
    detectedBy: "AI CCTV Cam #04",
    beforePhoto: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=500&q=80",
    afterPhoto: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=500&q=80",
    lastEvent: "AI Flagged: Commercial sacks unloaded at 04:12 AM"
  },
  {
    id: "GVP-W02-09",
    location: "Old Palasia Railway Crossing Lot",
    ward: "Ward 02",
    zone: "Zone 1",
    status: "Pending",
    incidentType: "C&D Debris & Garden Trim Waste",
    assignedVehicle: "Tipper-14 (En route)",
    responseTime: "14.5 mins",
    detectedBy: "Citizen Grievance #8821",
    beforePhoto: "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=500&q=80",
    afterPhoto: "https://images.unsplash.com/photo-1584447141399-be2412124c05?auto=format&fit=crop&w=500&q=80",
    lastEvent: "Inspection team verified: 1.4 MT C&D scrap"
  },
  {
    id: "GVP-W08-03",
    location: "Vijay Nagar Service Road Green Belt",
    ward: "Ward 08",
    zone: "Zone 2",
    status: "Resolved",
    incidentType: "Dumping Eliminated & Beautified",
    assignedVehicle: "RAT-01",
    responseTime: "Completed",
    detectedBy: "Sanitary Inspector Routine",
    beforePhoto: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=500&q=80",
    afterPhoto: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=500&q=80",
    lastEvent: "Permanently resolved: Geo-fenced & Tree Plantation installed"
  }
];

// Bulk Waste Generators
export const BWG_LIST = [
  {
    id: "BWG-01",
    name: "Sheraton Grand Hotel",
    category: "Hotel",
    estimatedWaste: "3.5 MT",
    actualWaste: "3.2 MT",
    compliance: "98.5%",
    vehicle: "BWG-LOG-01",
    uccAmount: "₹45,000",
    paymentStatus: "Paid",
    enforcement: "Certified Swachh BWG"
  },
  {
    id: "BWG-02",
    name: "Apollo Multi-Specialty Hospital",
    category: "Hospital",
    estimatedWaste: "2.8 MT",
    actualWaste: "2.7 MT",
    compliance: "100%",
    vehicle: "BIO-MED-03",
    uccAmount: "₹38,000",
    paymentStatus: "Paid",
    enforcement: "Compliant"
  },
  {
    id: "BWG-03",
    name: "Phoenix Citadel Shopping Mall",
    category: "Mall",
    estimatedWaste: "6.8 MT",
    actualWaste: "6.4 MT",
    compliance: "95.2%",
    vehicle: "BWG-LOG-04",
    uccAmount: "₹82,000",
    paymentStatus: "Paid",
    enforcement: "Compliant"
  },
  {
    id: "BWG-04",
    name: "Infosys Super SEZ Campus",
    category: "Tech Park",
    estimatedWaste: "4.2 MT",
    actualWaste: "4.0 MT",
    compliance: "99.1%",
    vehicle: "BWG-LOG-02",
    uccAmount: "₹56,000",
    paymentStatus: "Paid",
    enforcement: "Zero-Waste Certified"
  },
  {
    id: "BWG-05",
    name: "Indian Institute of Technology (IIT)",
    category: "Institution",
    estimatedWaste: "3.0 MT",
    actualWaste: "2.8 MT",
    compliance: "97.4%",
    vehicle: "BWG-LOG-05",
    uccAmount: "₹32,000",
    paymentStatus: "Paid",
    enforcement: "On-site Composting Active"
  },
  {
    id: "BWG-06",
    name: "Sanwer Road Metal & Casting Works",
    category: "Industrial",
    estimatedWaste: "8.5 MT",
    actualWaste: "8.1 MT",
    compliance: "88.2%",
    vehicle: "IND-TRK-09",
    uccAmount: "₹95,000",
    paymentStatus: "Overdue",
    enforcement: "Notice Issued #NIT-402"
  }
];

// Transfer Station Live Queue
export const TRANSFER_STATION_DATA = {
  dailyInward: "642.5 MT",
  compactorCapacity: "78%",
  activeHaulers: "18 / 24",
  weighbridgeStatus: "Online (Scale 01 & 02)",
  bays: [
    { bayNo: "Bay 01", status: "Tipping Active", truck: "TRUCK-402", load: "8.4 MT", eta: "4 min" },
    { bayNo: "Bay 02", status: "Compacting", truck: "TRUCK-310", load: "9.1 MT", eta: "6 min" },
    { bayNo: "Bay 03", status: "Ready / Idle", truck: "Queue: TRUCK-108", load: "--", eta: "1 min" },
    { bayNo: "Bay 04", status: "Hauler Hookup", truck: "HAULER-99 (Prime)", load: "24 MT", eta: "8 min" },
  ],
  manifest: [
    { id: "MNF-4481", time: "09:12 AM", truck: "TRUCK-402", ward: "Ward 04", weight: "8.42 MT", stream: "Wet Biodegradable", bay: "Bay 01" },
    { id: "MNF-4480", time: "09:05 AM", truck: "TRUCK-310", ward: "Ward 02", weight: "6.85 MT", stream: "Dry Recyclables", bay: "Bay 02" },
    { id: "MNF-4479", time: "08:52 AM", truck: "TRUCK-194", ward: "Ward 07", weight: "9.20 MT", stream: "Mixed Household", bay: "Bay 01" },
    { id: "MNF-4478", time: "08:40 AM", truck: "TRUCK-220", ward: "Ward 08", weight: "7.94 MT", stream: "Wet Biodegradable", bay: "Bay 03" },
  ]
};

// MRF Facility
export const MRF_DATA = {
  dailyIntake: "420.5 MT",
  recoveryEfficiency: "88.4%",
  landfillRejection: "11.6%",
  sorterPurity: "96.2%",
  baledInventory: "185 MT",
  stages: [
    { step: "01", name: "Trommel Screen", description: "Rotary sizing (<80mm organic fines separation)", status: "Optimal", speed: "18 RPM", load: "84%" },
    { step: "02", name: "Ballistic Separator", description: "Splits 2D flat paper/film from 3D rigid plastics", status: "Optimal", speed: "220 strokes/m", load: "79%" },
    { step: "03", name: "NIR Optical Sorter", description: "Near-infrared polymer classification (PET/HDPE/PP)", status: "Active", accuracy: "98.4%", load: "91%" },
    { step: "04", name: "Eddy Current & Overband", description: "Magnetic iron + Non-ferrous aluminium recovery", status: "Optimal", extraction: "100%", load: "70%" },
    { step: "05", name: "Auto Baling Press", description: "High-density hydraulic cubes (500 kg/bale)", status: "Packing", pressure: "210 Bar", load: "88%" }
  ],
  commodities: [
    { name: "Corrugated Cardboard", percentage: 34, tonsToday: 142.9, ratePerKg: "₹14.50" },
    { name: "PET Bottles (Clear)", percentage: 22, tonsToday: 92.5, ratePerKg: "₹38.00" },
    { name: "HDPE Rigid Plastics", percentage: 14, tonsToday: 58.8, ratePerKg: "₹34.00" },
    { name: "Mixed Office Paper", percentage: 12, tonsToday: 50.4, ratePerKg: "₹11.20" },
    { name: "RDF (Refuse Fuel)", percentage: 10, tonsToday: 42.0, ratePerKg: "₹3.80" },
    { name: "Aluminium & Metal", percentage: 8, tonsToday: 33.6, ratePerKg: "₹92.00" },
  ]
};

// Rapid Action Team
export const RAT_TEAMS = [
  { id: "RAT-01", vehicle: "Patrol Bolero #01", commander: "SI Deepak Rao", location: "Sector 3 Square", status: "Available", avgResponse: "11.4 min", resolvedToday: 6 },
  { id: "RAT-02", vehicle: "Patrol Bolero #02", commander: "SI Vikram Solanki", location: "Shastri Market (En route)", status: "Dispatched", avgResponse: "9.8 min", resolvedToday: 8 },
  { id: "RAT-03", vehicle: "Quick Tipper #03", commander: "SI Ankit Chouhan", location: "Geeta Bhawan Depot", status: "Available", avgResponse: "13.2 min", resolvedToday: 4 },
  { id: "RAT-04", vehicle: "Flying Squad #04", commander: "SI Priya Rathore", location: "Bhawarkua Circle", status: "Patrolling", avgResponse: "12.0 min", resolvedToday: 7 },
];

export const RAT_INCIDENTS = [
  { id: "INC-889", time: "09:04 AM", gvp: "GVP #04 Shastri Flyover", type: "Unauthorized Night Dumping", priority: "Critical", status: "Unit En Route", eta: "6 min" },
  { id: "INC-888", time: "08:22 AM", gvp: "GVP #12 Old Railway Yard", type: "C&D Rubble Blockage", priority: "High", status: "Investigation", eta: "15 min" },
  { id: "INC-887", time: "07:15 AM", gvp: "Anand Nagar Corner", type: "Overflowing Bin Point", priority: "Medium", status: "Resolved", eta: "Cleared in 14 min" },
];

// Weighbridge Live Data
export const WEIGHBRIDGE_DATA = {
  dailyInward: "1,428.5 MT",
  scale01: "ONLINE",
  scale02: "ONLINE",
  anprAccuracy: "99.8%",
  avgTurnaround: "42 sec",
  currentVehicle: {
    vehicleNo: "MP-09-GE-8422",
    ticketId: "WB-2026-0904-4412",
    driver: "Harishankar Dubey",
    grossWeight: "22,450 kg",
    tareWeight: "8,920 kg",
    netWeight: "13,530 kg (13.53 MT)",
    wasteType: "Dry Recyclables (MRF Input)",
    destination: "GreenTech MRF Bay 2",
    timestamp: "09:14:32 AM",
    anprConfidence: "99.9% Match",
    photoUrl: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=500&q=80"
  },
  recentTickets: [
    { ticket: "WB-4412", time: "09:14 AM", vehicle: "MP-09-GE-8422", net: "13.53 MT", stream: "Dry Waste", bay: "MRF Bay 2" },
    { ticket: "WB-4411", time: "09:08 AM", vehicle: "MP-09-HH-3011", net: "8.45 MT", stream: "Wet Biodegradable", bay: "Bio-Methanation" },
    { ticket: "WB-4410", time: "09:01 AM", vehicle: "MP-09-TR-7712", net: "11.20 MT", stream: "Mixed Waste", bay: "Tipping Bay 1" },
    { ticket: "WB-4409", time: "08:52 AM", vehicle: "MP-09-KL-5044", net: "7.90 MT", stream: "Wet Biodegradable", bay: "Bio-Methanation" },
  ]
};

// CCTV Feeds
export const CCTV_CAMERAS = [
  {
    id: "CAM-01",
    name: "Transfer Station — Tipping Bay 1 & 2",
    location: "Central Transfer Station",
    status: "LIVE",
    fps: "30 FPS • 4K HDR",
    event: "ANPR Recognized: MP-09-GE-8422",
    preview: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "CAM-02",
    name: "MRF Plant — Optical NIR Infeed Belt",
    location: "GreenTech MRF Hub",
    status: "LIVE",
    fps: "30 FPS • AI Polymer Detection",
    event: "Purity Index: 96.4% • PET sorting active",
    preview: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "CAM-03",
    name: "Bio-Methanation Plant — Feedstock Hoppers",
    location: "Devguradia Eco Complex",
    status: "LIVE",
    fps: "25 FPS • Thermal IR",
    event: "Digester Temp: 54.2°C • Gas flow normal",
    preview: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "CAM-04",
    name: "GVP Hotspot #04 — Shastri Flyover",
    location: "Ward 04 Perimeter",
    status: "LIVE",
    fps: "30 FPS • AI Intrusion",
    event: "ALERT: Dumping Attempt Detected (RAT-02 notified)",
    preview: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=600&q=80"
  }
];

// User Charges / UCC
export const UCC_DATA = {
  totalBilled: "₹24,50,000",
  realized: "₹18,42,500",
  today: "₹1,48,250",
  arrears: "₹6,07,500",
  posOnline: "14 / 14 Online",
  collectionRate: "75.2%",
  billingRecords: [
    { billId: "UCC-2026-8941", citizen: "Rajendra Mittal", ward: "Ward 01", category: "Residential", amount: "₹150", status: "Paid via UPI", date: "Today, 08:30 AM" },
    { billId: "UCC-2026-8940", citizen: "Radisson Blu Hotel", ward: "Ward 04", category: "BWG Commercial", amount: "₹45,000", status: "Paid via POS", date: "Today, 08:15 AM" },
    { billId: "UCC-2026-8939", citizen: "Gupta Sweets & Bakers", ward: "Ward 02", category: "Commercial", amount: "₹800", status: "Paid via UPI", date: "Today, 07:55 AM" },
    { billId: "UCC-2026-8938", citizen: "Anurag Kashyap", ward: "Ward 07", category: "Residential", amount: "₹300", status: "Arrears Due", date: "Pending 15 Days" },
    { billId: "UCC-2026-8937", citizen: "Apollo Hospital", ward: "Ward 03", category: "BWG Healthcare", amount: "₹38,000", status: "Paid Online", date: "Yesterday" },
  ]
};

// Complaints Redressal
export const COMPLAINTS_DATA = {
  total: 420,
  open: 7,
  inProgress: 12,
  resolved: 401,
  slaRate: "98.4%",
  list: [
    { id: "CMP-4821", citizen: "Neeta Saxena", location: "Sector 4, Plot 18, Ward 04", category: "Missed D2D Collection", priority: "High", team: "Beat 04 Tipper", date: "04 Sep 08:15 AM", status: "In Progress", sla: "1.4 hrs remaining" },
    { id: "CMP-4820", citizen: "Mahesh Agrawal", location: "Near Palasia Bus Stop, Ward 02", category: "Litter on Road / Sweeping", priority: "Medium", team: "Sweeper Team #07", date: "04 Sep 07:40 AM", status: "Resolved", sla: "Completed (42 min)" },
    { id: "CMP-4819", citizen: "Kavita Rao", location: "Shastri Market Flyover", category: "Open Dumping Report", priority: "Critical", team: "RAT-02 Patrol", date: "04 Sep 07:10 AM", status: "In Progress", sla: "Dispatched" },
    { id: "CMP-4818", citizen: "Vivek Joshi", location: "Drain Line 3, Ward 06", category: "Drain Clogging / Overflow", priority: "High", team: "Desilting Squad A", date: "03 Sep 05:30 PM", status: "Resolved", sla: "Completed" },
  ]
};

// KPI & City Performance
export const CITY_PERFORMANCE_DATA = {
  overallScore: "98.4%",
  indexLabel: "SWM Compliance & Cleanliness Index",
  breakdown: [
    { label: "D2D Segregation at Source", score: "92.4%", target: "95%", status: "On Track" },
    { label: "Scientific Landfill Diversion", score: "86.8%", target: "85%", status: "Exceeded" },
    { label: "GVP Elimination & Beautification", score: "91.9%", target: "90%", status: "Target Met" },
    { label: "Bulk Waste On-Site Processing", score: "95.1%", target: "90%", status: "Exceeded" },
    { label: "Grievance Redressal SLA", score: "98.4%", target: "95%", status: "Exceeded" },
    { label: "EPR Plastic Waste Channelization", score: "94.0%", target: "90%", status: "Exceeded" },
  ],
  wardLeaderboard: [
    { rank: 1, ward: "Ward 08 (Vijay Nagar)", score: "98.6%", households: "12,400", segregation: "96.5%" },
    { rank: 2, ward: "Ward 01 (Sarafa Heritage)", score: "97.8%", households: "9,800", segregation: "95.2%" },
    { rank: 3, ward: "Ward 04 (Palasia Hub)", score: "96.4%", households: "11,200", segregation: "94.8%" },
    { rank: 4, ward: "Ward 02 (Chhavani Eco)", score: "95.5%", households: "10,100", segregation: "93.1%" },
    { rank: 5, ward: "Ward 06 (Annapurna Enclave)", score: "94.8%", households: "13,600", segregation: "92.4%" },
  ]
};

// Reports
export const MUNICIPAL_REPORTS = [
  {
    id: "REP-01",
    title: "Form-IV Annual SWM Compliance Filing",
    category: "CPCB / Statutory",
    period: "FY 2025-26",
    generatedOn: "01 Sep 2026",
    size: "4.8 MB",
    status: "Signed & Certified",
    description: "Annual statutory return under Solid Waste Management Rules 2016 for Central Pollution Control Board."
  },
  {
    id: "REP-02",
    title: "Daily Municipal Mass Balance Audit",
    category: "Operations",
    period: "03 Sep 2026",
    generatedOn: "04 Sep 2026",
    size: "1.9 MB",
    status: "Audit Verified",
    description: "Inward vs Processed vs Diverted material reconciliation across all 6 transfer bays and MRF plants."
  },
  {
    id: "REP-03",
    title: "D2D Segregation Compliance Scorecard",
    category: "Field Operations",
    period: "August 2026",
    generatedOn: "02 Sep 2026",
    size: "3.2 MB",
    status: "Published",
    description: "18-ward granular audit on 3-bin source segregation, defaulter properties, and sanitary inspectors' log."
  },
  {
    id: "REP-04",
    title: "GVP Zero-Tolerance Certification",
    category: "Environmental",
    period: "Q2 2026",
    generatedOn: "28 Aug 2026",
    size: "2.5 MB",
    status: "Certified",
    description: "Photographic before/after proof and IoT sensor verification for 44 eliminated dumping hotspots."
  },
  {
    id: "REP-05",
    title: "Plastic Waste & EPR Registry Ledger",
    category: "Recycling / EPR",
    period: "Monthly - Aug 2026",
    generatedOn: "31 Aug 2026",
    size: "5.1 MB",
    status: "EPR Portal Synced",
    description: "Traceable certificate ledger for 420 MT plastic channelized to cement kilns & registered recyclers."
  },
];

// Street Sweeping
export const STREET_SWEEPING_DATA = {
  workersActive: "210 / 215",
  vehiclesActive: "20 / 20",
  coverage: "91.7%",
  distanceCovered: "348.5 km",
  siltExtracted: "24.6 MT",
  ppeCompliance: "100%",
  teams: [
    { id: "SWP-01", route: "MG Road Heritage Corridor", workers: 14, sweeperTruck: "SWEEP-04", kmCovered: "28.4 km", status: "Completed", ppe: "100% Verified" },
    { id: "SWP-02", route: "Ring Road Express Section A", workers: 18, sweeperTruck: "SWEEP-07", kmCovered: "42.1 km", status: "Active", ppe: "100% Verified" },
    { id: "SWP-03", route: "AB Road Commercial Stretch", workers: 22, sweeperTruck: "SWEEP-09", kmCovered: "35.8 km", status: "Active", ppe: "100% Verified" },
    { id: "SWP-04", route: "Palasia Residential Sectors", workers: 16, sweeperTruck: "Manual Teams", kmCovered: "19.5 km", status: "Completed", ppe: "100% Verified" },
  ]
};

// Drain Desilting
export const DRAIN_DESILTING_DATA = {
  networkCleared: "87.9%",
  siltExtracted: "1,842.6 MT",
  machinesActive: "18 / 18",
  floodPointsCleared: "28 / 32",
  safetyCompliance: "100%",
  sensorTelemetry: [
    { location: "Kahn River Trunk Sump #01", siltDepth: "18 cm (Max: 45 cm)", flowSpeed: "1.8 m/s", h2sGas: "2.1 ppm (Safe < 10)", ch4Gas: "0.4% (Safe < 1%)", status: "Normal" },
    { location: "Saraswati Channel Culvert #04", siltDepth: "32 cm (Max: 45 cm)", flowSpeed: "1.2 m/s", h2sGas: "4.5 ppm (Warning)", ch4Gas: "0.8% (Safe < 1%)", status: "Desilting Needed" },
    { location: "Pardesipura Storm Drain #09", siltDepth: "12 cm (Max: 45 cm)", flowSpeed: "2.4 m/s", h2sGas: "1.4 ppm (Safe)", ch4Gas: "0.2% (Safe)", status: "Optimal Flow" },
  ],
  workOrders: [
    { woId: "WO-DESILT-881", drainName: "Kahn River Channel Section B", length: "1.4 km", machine: "Super Sucker Machine #02", progress: "92%", status: "Active" },
    { woId: "WO-DESILT-880", drainName: "Bypass Storm Collector Culvert", length: "850 m", machine: "JCB Excavator #05", progress: "100%", status: "Completed" },
    { woId: "WO-DESILT-879", drainName: "Saraswati Canal Outlet Junction", length: "2.1 km", machine: "Grab Dredger #01", progress: "64%", status: "In Progress" },
  ]
};
