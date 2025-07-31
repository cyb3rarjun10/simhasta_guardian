export interface CrowdZone {
  id: string;
  name: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  coordinates: { lat: number; lng: number }[];
  occupancy: number;
}

export interface Alert {
  id: string;
  type: 'crowd' | 'health' | 'safety' | 'weather';
  message: string;
  severity: 'info' | 'warning' | 'danger';
  timestamp: Date;
}

export interface IncidentReport {
  id: string;
  type: 'crowd_surge' | 'missing_person' | 'sanitation' | 'medical' | 'other';
  description: string;
  location: { lat: number; lng: number };
  locationName: string;
  images: string[];
  reporterName: string;
  reporterPhone: string;
  timestamp: Date;
  status: 'pending' | 'investigating' | 'resolved';
}

export interface SOSAlert {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  emergencyContact: string;
  location: { lat: number; lng: number };
  timestamp: Date;
  status: 'active' | 'responded' | 'resolved';
}

export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  mobileNumber: string;
  purpose: 'general' | 'food' | 'medical' | 'sanitation';
  timestamp: Date;
  status: 'completed' | 'pending';
}

export interface SevaRequest {
  id: string;
  type: 'darshan' | 'lost_found' | 'medical_help' | 'volunteer';
  requesterName: string;
  mobileNumber: string;
  description: string;
  preferredTime?: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'completed';
}

export interface BinStatus {
  id: string;
  location: string;
  coordinates: { lat: number; lng: number };
  fillLevel: number;
  lastEmptied: Date;
  batteryLevel: number;
  status: 'normal' | 'warning' | 'critical';
}

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  language: 'en' | 'hi';
}