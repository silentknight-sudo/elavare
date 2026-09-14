export type ElevatorCategory = 'all' | 'commercial' | 'residential' | 'industrial';

export interface ElevatorProduct {
  id: string;
  name: string;
  category: 'commercial' | 'residential' | 'industrial';
  tagline: string;
  driveType: string;
  badge: string;
  speed: string;
  capacity: string;
  decibel: string;
  description: string;
  keySpecs: {
    label: string;
    value: string;
  }[];
  imageUrl: string;
  imageAlt: string;
  basePriceInr: number;
  availableFinishes: string[];
}

export type InquiryStatus =
  | 'New'
  | 'Feasibility Review'
  | 'Quoting'
  | 'Converted'
  | 'Assigned'
  | 'Survey Scheduled'
  | 'Proposal Sent'
  | 'Closed Won';

export interface Inquiry {
  id: string;
  createdAt: string;
  clientName: string;
  companyName: string;
  phone: string;
  email: string;
  projectType: 'Skyscraper' | 'Penthouse / Luxury' | 'Hospital Stretcher' | 'Logistics Hub';
  floors: number;
  shaftHeight: number;
  speed: number;
  estimatedMotor: string;
  estimatedPayload: string;
  status: InquiryStatus;
  assignedSalesperson?: string;
  followUpDate?: string;
  notes?: string;
  source?: string;
}

export interface Booking {
  id: string;
  createdAt: string;
  clientName: string;
  company: string;
  phone: string;
  email: string;
  siteAddress: string;
  ncrDistrict: 'Gurugram' | 'Noida' | 'New Delhi' | 'Faridabad' | 'Greater Noida';
  surveyDate: string;
  timeSlot: string;
  buildingType: string;
  surveyFeeInr: number;
  paymentStatus: 'Paid' | 'Pending';
  paymentId: string;
  assignedEngineer: string;
}

export interface MaintenanceRecord {
  id: string;
  unitCode: string;
  buildingName: string;
  location: string;
  model: string;
  elevatorName?: string;
  lastServiceDate: string;
  nextScheduledDate: string;
  scheduledDate?: string;
  status: 'Optimal' | 'Inspection Due' | 'Service in Progress' | 'Alert' | 'Scheduled' | 'In-Progress' | 'Completed';
  assignedTechnician: string;
  technician?: string;
  healthScore: number;
  operationalHours: number;
  lastVibrationReading: number;
  notes?: string;
  type?: 'Routine' | 'Emergency' | 'Inspection';
}

export interface TelemetryNode {
  id: string;
  name: string;
  location: string;
  speed: number;
  temperature: number;
  vibration: number;
  energyRecycled: number;
  status: 'SYNCHRONIZED' | 'IN_TRANSIT' | 'HOLD_FLOOR';
  currentFloor: number;
  direction: 'UP' | 'DOWN' | 'IDLE';
}
