import { ElevatorProduct, Inquiry, Booking, MaintenanceRecord, TelemetryNode } from '../types';

export const INITIAL_PRODUCTS: ElevatorProduct[] = [
  {
    id: 'veloce-x',
    name: 'Veloce-X Traction',
    category: 'commercial',
    tagline: 'Ultra-velocity high-rise passenger transit',
    driveType: 'Gearless PMSM',
    badge: 'Premium High-Rise',
    speed: '4.0 m/s Speed',
    capacity: '1,600 kg (21 Persons)',
    decibel: '< 48 dBA Whisper',
    description: 'Ultra-smooth high-velocity vertical movement engineered with Italian curved glass, acoustic dampening, and vibration cancellation below 0.08 m/s².',
    keySpecs: [
      { label: 'Capacity', value: '1,600 kg (21 Persons)' },
      { label: 'Ride Decibel', value: '< 48 dBA Whisper' },
      { label: 'Max Travel Height', value: '320 Meters' },
      { label: 'Drive Efficiency', value: '96.4% Permanent Magnet' }
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQB2SfNsT4X_BiCsjZUtKT7xCZ4hHl0Q-J9AM75xY-HVrgVg70BhS15ag30IU7zg_rnpc23rBJptnINoL2px8INC1Dd8N3UQWT3l7C6ZyuhhRm73AZTmFDxNfWDLbItkiCIqYGAXG6NCTa21X9u9k3G8i7a7zE0QwBiSeYooPgDfWAgRTvg-s-hJvmkTyKTf-0moF5oPtH3ZCX7VIfLL7ejVpW_hPqKPo84rRacAZUJ7dTVT3tCcA',
    imageAlt: 'Futuristic high-speed passenger elevator cabin interior featuring illuminated smoked glass panoramic curved walls, brushed titanium handrails, and sleek cyan LED ambient lighting in an NCR skyscraper.',
    basePriceInr: 3450000,
    availableFinishes: ['Smoked Glass & Obsidian', 'Brushed Titanium', 'Rose Gold Mirror', 'Satin Steel']
  },
  {
    id: 'titan-pro',
    name: 'Titan-Pro Heavy Cargo',
    category: 'industrial',
    tagline: 'High-torque hydraulic & traction industrial hoist',
    driveType: 'High-Torque Hydraulic / Traction',
    badge: 'Industrial Duty',
    speed: '1.5 m/s Payload Speed',
    capacity: '5,000 kg (Payload)',
    decibel: '< 58 dBA Controlled',
    description: 'Rigid steel skeleton with reinforced chequered flooring, designed for automated forklift ingress, logistics depots, and multi-tier pharmaceutical distribution.',
    keySpecs: [
      { label: 'Entry Opening', value: '3.2m Telescopic Bi-Parting' },
      { label: 'Drive Platform', value: 'Synchronized Dual Ram' },
      { label: 'Platform Deck', value: '6mm Diamond Anti-Slip Steel' },
      { label: 'Forklift Rating', value: 'Class C3 Heavy Loading' }
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD01UJIwKFa3Oo2MgJscOpBaTzcEJXq9_ycohG7Gfb1A0AkEmaRS5AggEbgo6PZCfTVc6NbtaWa__F06JqZAEOg7ef4L5njfCao_zKJx1UtfETUCS2ujTPEUtmjZLTz0mUdSNEOuQLSE43xn3UDJE2LgEtAHB0FfI_JLaUFpsB5QupDucvGznLxWYEbw5zGbH3a8-SowNF_8jtKSUOQgAu8NjebRQb0h8S3JpHShNpIMJsqL62oQWk',
    imageAlt: 'Industrial heavy duty cargo elevator with diamond steel reinforced flooring, heavy mechanical hoist cables, hydraulic stabilizers, and forklift access ramp in an NCR automated warehouse.',
    basePriceInr: 4800000,
    availableFinishes: ['Reinforced Galvanized Steel', 'Industrial Polyurethane Coated', 'Anti-Corrosion Marine Spec']
  },
  {
    id: 'aether-smart',
    name: 'Aether-Smart Neural',
    category: 'commercial',
    tagline: 'Destination dispatching with edge AI telemetry',
    driveType: 'Predictive Cloud AI PMSM',
    badge: 'Autonomous AI',
    speed: '3.5 m/s Adaptive',
    capacity: '1,350 kg (18 Persons)',
    decibel: '< 46 dBA Whisper',
    description: 'Touchless destination dispatching with facial credentialing, dynamic traffic routing during peak NCR business hours, and 35% regenerative power feed.',
    keySpecs: [
      { label: 'Wait Reduction', value: '42% Shorter Queue' },
      { label: 'Telemetry', value: 'Live 10ms Node Ping' },
      { label: 'Access Protocol', value: 'BLE, RFID & Biometric' },
      { label: 'Smart Dispatch', value: 'Aether-Dispatch 2.0 AI Core' }
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnU1kqc29ftPWgaXqbKvOAWvgMR-RrqVZH-ipSf3EdFhN0S08FUEApiuo-W6AwYAYh5DD87W9fT-QClNvkWl1hqfs4ANuJXURzD_l1V_lqPyyixfbeP-UCf_q1qXRvCPk89xtrDz_IU185r8lJ_XIEwq0unsiRr4PMGN-O6fFh1adoN1lAW-s9S4bPtK8VHk6QkqkcRhi3s7HzbYHqdqcqk9sgi3WFTmsbmjWeI84k-FUAzhHrBp8',
    imageAlt: 'Smart elevator cabin with integrated holographic touchscreen glass control panels, facial recognition camera sensor arrays, and ambient cyan telemetry data projections in Gurugram tech campus.',
    basePriceInr: 3950000,
    availableFinishes: ['Cyber Glass & Cyan Glow', 'Matte Architectural Charcoal', 'Smart Transparent OLED']
  },
  {
    id: 'aura-prestige',
    name: 'Aura-Prestige Penthouse',
    category: 'residential',
    tagline: 'Presidential bespoke luxury and quiet elegance',
    driveType: 'Mag-Lev Damper Whisper Drive',
    badge: 'Presidential Luxury',
    speed: '2.5 m/s Velvet Smooth',
    capacity: '1,000 kg (13 Persons)',
    decibel: '< 39 dBA Ultra-Silent',
    description: 'Hand-crafted Italian Statuario stone, acoustic noise dampening, private biometric penthouse locks, and magnetic levitation dampers for pure tactile silence.',
    keySpecs: [
      { label: 'Custom Finishes', value: 'Statuario Marble / Titanium Gold' },
      { label: 'Private Access', value: 'Encrypted Biometrics' },
      { label: 'Flooring', value: 'Bookmatched Italian Calacatta' },
      { label: 'Air Purification', value: 'Medical-Grade HEPA + Ionizer' }
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEmTMdfL5LMgnF7imTkn8FufUxs6ZTktVcvO33sv1ASO_ykjGMFOBS3L5k3vi37oK-SJIK0IFWRkD8FqD_mNvSs2RMCG4zv99sqq_iRUxe8EBXdoW6rPC1OKsF54ieSaO9r9u89875YFdriK8o03HKZ9wnSwhSnPYZ28f4bvaW3vNT5BROBRM7RL5QDKUH_bz43Y8YVr_cro7c6xgSMls5amEAMdaoxQHGpvijIzVP9m3xxjyxBvQ',
    imageAlt: 'Ultra luxury private penthouse elevator car with Italian statuario backlit marble walls, warm gold leaf titanium accents, warm indirect chandelier lighting, and cashmere leather bench.',
    basePriceInr: 5200000,
    availableFinishes: ['Statuario White Marble & Gold', 'Emperador Dark & Bronze', 'Champagne Leather & Teak']
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'INQ-9041',
    createdAt: '2026-09-12 11:30',
    clientName: 'Sanjay Chawla',
    companyName: 'DLF CyberCity Developers',
    phone: '+91 98110 44219',
    email: 's.chawla@dlfcommercial.com',
    projectType: 'Skyscraper',
    floors: 42,
    shaftHeight: 147,
    speed: 4.0,
    estimatedMotor: 'PMSM Gearless 37.2 kW',
    estimatedPayload: '1,600 kg (21 Pass.)',
    status: 'Survey Scheduled',
    assignedSalesperson: 'Rajesh Sharma (Lead NCR Architect)',
    followUpDate: '2026-09-16',
    notes: 'Requires dual-car high-speed bank with Aether-Smart destination dispatching.',
    source: 'Website 3D Sizing Calculator'
  },
  {
    id: 'INQ-9038',
    createdAt: '2026-09-11 16:45',
    clientName: 'Rohit Singhania',
    companyName: 'The Magnolias Residences',
    phone: '+91 99991 88200',
    email: 'rohit@singhaniagroup.in',
    projectType: 'Penthouse / Luxury',
    floors: 28,
    shaftHeight: 98,
    speed: 2.5,
    estimatedMotor: 'PMSM Gearless 22.0 kW',
    estimatedPayload: '1,000 kg (13 Pass.)',
    status: 'Proposal Sent',
    assignedSalesperson: 'Ananya Sen (Luxury Accounts)',
    followUpDate: '2026-09-15',
    notes: 'Aura-Prestige customized with bookmatched Calacatta Gold marble and private retinal entry.',
    source: 'Direct Consultation'
  },
  {
    id: 'INQ-9035',
    createdAt: '2026-09-10 09:15',
    clientName: 'Dr. Meera Nambiar',
    companyName: 'Medanta Health Super-Specialty',
    phone: '+91 98201 12399',
    email: 'm.nambiar@medanta.org',
    projectType: 'Hospital Stretcher',
    floors: 16,
    shaftHeight: 56,
    speed: 2.5,
    estimatedMotor: 'PMSM Gearless 18.5 kW',
    estimatedPayload: '2,000 kg (Stretcher Bed)',
    status: 'Assigned',
    assignedSalesperson: 'Vikram Malhotra (Institutional Lead)',
    followUpDate: '2026-09-17',
    notes: 'Infection-control antimicrobial UV-C cabin with backup 4-hour uninterrupted ARD battery.',
    source: 'MEP Referral'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BKG-7721',
    createdAt: '2026-09-13 14:20',
    clientName: 'Sunil Mathur',
    company: 'Godrej Properties NCR',
    phone: '+91 98102 99011',
    email: 's.mathur@godrejproperties.com',
    siteAddress: 'Sector 43, Golf Course Road, Gurugram',
    ncrDistrict: 'Gurugram',
    surveyDate: '2026-09-18',
    timeSlot: '11:00 AM - 01:00 PM',
    buildingType: 'Mixed Commercial Tower (36 Floors)',
    surveyFeeInr: 2500,
    paymentStatus: 'Paid',
    paymentId: 'pay_RZP_991823a7',
    assignedEngineer: 'Harpreet Singh (Chief Hoistway Inspector)'
  },
  {
    id: 'BKG-7719',
    createdAt: '2026-09-12 10:05',
    clientName: 'Kabir Bedi',
    company: 'ATS Greens Estates',
    phone: '+91 97118 34091',
    email: 'k.bedi@atsestates.com',
    siteAddress: 'Sector 150, Noida-Greater Noida Expressway',
    ncrDistrict: 'Noida',
    surveyDate: '2026-09-19',
    timeSlot: '02:30 PM - 04:30 PM',
    buildingType: 'High-End Residential Penthouse Tower',
    surveyFeeInr: 2500,
    paymentStatus: 'Paid',
    paymentId: 'pay_RZP_448102bc',
    assignedEngineer: 'Arunav Roy (Senior Structural Surveyor)'
  }
];

export const INITIAL_MAINTENANCE: MaintenanceRecord[] = [
  {
    id: 'MNT-101',
    unitCode: 'ELV-CYB-04A',
    buildingName: 'DLF CyberCity Tower C',
    location: 'Sector 29, Gurugram',
    model: 'Veloce-X 4.0 m/s',
    lastServiceDate: '2026-08-25',
    nextScheduledDate: '2026-09-25',
    status: 'Optimal',
    assignedTechnician: 'Gurpreet Chawla (Rapid Team 1)',
    healthScore: 99.4,
    operationalHours: 4210,
    lastVibrationReading: 0.02
  },
  {
    id: 'MNT-102',
    unitCode: 'ELV-NOI-12B',
    buildingName: 'Logix Technova Hub',
    location: 'Sector 62, Noida',
    model: 'Aether-Smart Neural 3.5 m/s',
    lastServiceDate: '2026-08-18',
    nextScheduledDate: '2026-09-18',
    status: 'Inspection Due',
    assignedTechnician: 'Dinesh Sharma (Noida Dispatch)',
    healthScore: 95.8,
    operationalHours: 5120,
    lastVibrationReading: 0.04
  },
  {
    id: 'MNT-103',
    unitCode: 'ELV-AER-01C',
    buildingName: 'Worldmark 3 Aerocity',
    location: 'Aerocity, New Delhi',
    model: 'Aura-Prestige Presidential',
    lastServiceDate: '2026-09-02',
    nextScheduledDate: '2026-10-02',
    status: 'Optimal',
    assignedTechnician: 'Kapil Verma (VIP Tech)',
    healthScore: 98.9,
    operationalHours: 2890,
    lastVibrationReading: 0.01
  },
  {
    id: 'MNT-104',
    unitCode: 'ELV-OKH-08D',
    buildingName: 'Apex Industrial Logistics Park',
    location: 'Okhla Phase III, New Delhi',
    model: 'Titan-Pro 5,000kg Freight',
    lastServiceDate: '2026-08-10',
    nextScheduledDate: '2026-09-16',
    status: 'Alert',
    assignedTechnician: 'Manish Tyagi (Heavy Hoist Team)',
    healthScore: 89.2,
    operationalHours: 8400,
    lastVibrationReading: 0.07
  }
];

export const TELEMETRY_NODES: TelemetryNode[] = [
  {
    id: 'node-dlf',
    name: 'DLF CyberCity Tower C [Live]',
    location: 'Cyber City, Gurugram',
    speed: 3.98,
    temperature: 41.2,
    vibration: 0.03,
    energyRecycled: 148.6,
    status: 'SYNCHRONIZED',
    currentFloor: 24,
    direction: 'UP'
  },
  {
    id: 'node-noida',
    name: 'Noida Tech Corridor Sector 62',
    location: 'Noida Hub',
    speed: 3.42,
    temperature: 39.8,
    vibration: 0.02,
    energyRecycled: 112.4,
    status: 'IN_TRANSIT',
    currentFloor: 18,
    direction: 'DOWN'
  },
  {
    id: 'node-aerocity',
    name: 'Worldmark Aerocity Presidential Hub',
    location: 'Aerocity, New Delhi',
    speed: 2.50,
    temperature: 38.5,
    vibration: 0.01,
    energyRecycled: 94.2,
    status: 'HOLD_FLOOR',
    currentFloor: 12,
    direction: 'IDLE'
  }
];
