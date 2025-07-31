import React, { useState } from 'react';
import { QrCode, Shield, Phone, AlertTriangle, CheckCircle, User } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

interface UserProfile {
  id: string;
  name: string;
  age: number;
  phone: string;
  emergencyContact: string;
  medicalConditions: string[];
  address: string;
}

const Emergency: React.FC = () => {
  const [qrInput, setQrInput] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [sosLoading, setSosLoading] = useState(false);
  const [sosSuccess, setSosSuccess] = useState(false);

  const mockUser: UserProfile = {
    id: 'user123',
    name: 'Amit Patel',
    age: 45,
    phone: '+91-9876543212',
    emergencyContact: '+91-9876543213',
    medicalConditions: ['Diabetes', 'High BP'],
    address: 'Ahmedabad, Gujarat'
  };

  const handleQrScan = async () => {
    if (!qrInput.trim()) {
      alert('Please enter a QR code or user ID');
      return;
    }

    setLoading(true);
    
    // Simulate QR code scanning
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate user lookup
    if (qrInput.includes('user123') || qrInput === 'user123') {
      setUserProfile(mockUser);
    } else {
      alert('User not found. Please check the QR code.');
    }
    
    setLoading(false);
  };

  const handleSOS = async () => {
    if (!userProfile) return;

    setSosLoading(true);
    
    // Simulate SOS alert submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('SOS Alert Sent:', {
      userId: userProfile.id,
      userName: userProfile.name,
      userPhone: userProfile.phone,
      emergencyContact: userProfile.emergencyContact,
      location: { lat: 22.7196, lng: 75.8577 }, // Current location would be from GPS
      timestamp: new Date()
    });

    setSosLoading(false);
    setSosSuccess(true);

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      setSosSuccess(false);
      setUserProfile(null);
      setQrInput('');
    }, 5000);
  };

  const simulateQrCode = () => {
    setQrInput('simhastha_user123_emergency_band');
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Emergency Band Scanner</h1>
        </div>
        <p className="text-gray-600 text-sm">
          Scan emergency bands to access user profiles and send SOS alerts to response teams.
        </p>
      </div>

      {sosSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-lg font-semibold text-green-900">SOS Alert Sent Successfully!</h2>
          </div>
          <p className="text-green-700 text-sm">
            Emergency response team has been notified. Help is on the way.
          </p>
          <p className="text-green-600 text-xs mt-2">
            Alert ID: #SOS{Date.now().toString().slice(-6)}
          </p>
        </div>
      )}

      {!userProfile ? (
        <>
          {/* QR Code Scanner */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Scan Emergency Band</h2>
              <p className="text-gray-600 text-sm">
                Enter the QR code data from the emergency band or user ID
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  QR Code Data / User ID
                </label>
                <input
                  type="text"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter QR code or user ID"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleQrScan}
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      <QrCode className="w-5 h-5" />
                      Scan Code
                    </>
                  )}
                </button>
                
                <button
                  onClick={simulateQrCode}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Demo Code
                </button>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-900">Emergency Services</p>
                    <p className="text-sm text-red-700">Police, Fire, Ambulance</p>
                  </div>
                </div>
                <a
                  href="tel:108"
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Call 108
                </a>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-900">Event Control Room</p>
                    <p className="text-sm text-orange-700">Simhastha Coordination</p>
                  </div>
                </div>
                <a
                  href="tel:102"
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Call 102
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* User Profile and SOS */
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">User Profile Found</h2>
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Name</label>
                <p className="text-lg font-semibold text-gray-900">{userProfile.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Age</label>
                <p className="text-lg font-semibold text-gray-900">{userProfile.age} years</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone</label>
                <p className="text-lg font-semibold text-gray-900">{userProfile.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Emergency Contact</label>
                <p className="text-lg font-semibold text-gray-900">{userProfile.emergencyContact}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Address</label>
              <p className="text-gray-900">{userProfile.address}</p>
            </div>

            {userProfile.medicalConditions.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Medical Conditions</label>
                <div className="flex flex-wrap gap-2">
                  {userProfile.medicalConditions.map((condition, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="bg-red-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-900">Emergency Action Required?</h3>
              </div>
              <p className="text-sm text-red-700">
                Click the button below to immediately alert emergency response teams and notify the user's emergency contact.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSOS}
                disabled={sosLoading}
                className="flex-1 bg-red-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
              >
                {sosLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5" />
                    SEND SOS ALERT
                  </>
                )}
              </button>
              
              <button
                onClick={() => {
                  setUserProfile(null);
                  setQrInput('');
                }}
                className="px-6 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emergency;