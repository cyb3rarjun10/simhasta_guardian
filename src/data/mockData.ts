import { CrowdZone, Alert, IncidentReport, SOSAlert, Donation, SevaRequest, BinStatus } from '../types';

export const mockCrowdZones: CrowdZone[] = [
  {
    id: '1',
    name: 'Main Ghat Area',
    level: 'high',
    occupancy: 85,
    coordinates: [
      { lat: 22.7196, lng: 75.8577 },
      { lat: 22.7206, lng: 75.8587 },
      { lat: 22.7196, lng: 75.8597 },
      { lat: 22.7186, lng: 75.8587 }
    ]
  },
  {
    id: '2',
    name: 'Food Court',
    level: 'medium',
    occupancy: 60,
    coordinates: [
      { lat: 22.7176, lng: 75.8567 },
      { lat: 22.7186, lng: 75.8577 },
      { lat: 22.7176, lng: 75.8587 },
      { lat: 22.7166, lng: 75.8577 }
    ]
  },
  {
    id: '3',
    name: 'Parking Area',
    level: 'low',
    occupancy: 25,
    coordinates: [
      { lat: 22.7156, lng: 75.8547 },
      { lat: 22.7166, lng: 75.8557 },
      { lat: 22.7156, lng: 75.8567 },
      { lat: 22.7146, lng: 75.8557 }
    ]
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'crowd',
    message: 'High crowd density detected at Main Ghat. Consider alternative routes.',
    severity: 'warning',
    timestamp: new Date(Date.now() - 10 * 60 * 1000)
  },
  {
    id: '2',
    type: 'health',
    message: 'Medical assistance station available at Food Court entrance.',
    severity: 'info',
    timestamp: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: '3',
    type: 'weather',
    message: 'Temperature rising. Stay hydrated and seek shade.',
    severity: 'warning',
    timestamp: new Date(Date.now() - 45 * 60 * 1000)
  }
];

export const mockIncidentReports: IncidentReport[] = [
  {
    id: '1',
    type: 'crowd_surge',
    description: 'Sudden crowd movement causing difficulty in movement',
    location: { lat: 22.7196, lng: 75.8577 },
    locationName: 'Main Ghat Area',
    images: [],
    reporterName: 'Rajesh Kumar',
    reporterPhone: '+91-9876543210',
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    status: 'investigating'
  },
  {
    id: '2',
    type: 'sanitation',
    description: 'Overflowing dustbin needs immediate attention',
    location: { lat: 22.7176, lng: 75.8567 },
    locationName: 'Food Court',
    images: [],
    reporterName: 'Priya Sharma',
    reporterPhone: '+91-9876543211',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    status: 'resolved'
  }
];

export const mockSOSAlerts: SOSAlert[] = [
  {
    id: '1',
    userId: 'user123',
    userName: 'Amit Patel',
    userPhone: '+91-9876543212',
    emergencyContact: '+91-9876543213',
    location: { lat: 22.7186, lng: 75.8587 },
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    status: 'active'
  }
];

export const mockDonations: Donation[] = [
  {
    id: '1',
    donorName: 'Vikram Singh',
    amount: 1000,
    mobileNumber: '+91-9876543214',
    purpose: 'general',
    timestamp: new Date(Date.now() - 120 * 60 * 1000),
    status: 'completed'
  },
  {
    id: '2',
    donorName: 'Meera Devi',
    amount: 500,
    mobileNumber: '+91-9876543215',
    purpose: 'food',
    timestamp: new Date(Date.now() - 180 * 60 * 1000),
    status: 'completed'
  }
];

export const mockSevaRequests: SevaRequest[] = [
  {
    id: '1',
    type: 'darshan',
    requesterName: 'Sunita Gupta',
    mobileNumber: '+91-9876543216',
    description: 'Request for VIP darshan booking',
    preferredTime: '06:00 AM',
    timestamp: new Date(Date.now() - 240 * 60 * 1000),
    status: 'approved'
  }
];

export const mockBinStatus: BinStatus[] = [
  {
    id: '1',
    location: 'Main Ghat - North',
    coordinates: { lat: 22.7200, lng: 75.8580 },
    fillLevel: 85,
    lastEmptied: new Date(Date.now() - 4 * 60 * 60 * 1000),
    batteryLevel: 65,
    status: 'warning'
  },
  {
    id: '2',
    location: 'Food Court - Central',
    coordinates: { lat: 22.7180, lng: 75.8570 },
    fillLevel: 45,
    lastEmptied: new Date(Date.now() - 2 * 60 * 60 * 1000),
    batteryLevel: 88,
    status: 'normal'
  },
  {
    id: '3',
    location: 'Parking Area - East',
    coordinates: { lat: 22.7160, lng: 75.8550 },
    fillLevel: 95,
    lastEmptied: new Date(Date.now() - 6 * 60 * 60 * 1000),
    batteryLevel: 22,
    status: 'critical'
  }
];