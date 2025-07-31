import React, { useState, useEffect } from 'react';
import { AlertTriangle, Users, Clock, Thermometer, Navigation } from 'lucide-react';
import GoogleMap from '../components/GoogleMap';
import LoadingSpinner from '../components/LoadingSpinner';
import NotificationBanner from '../components/NotificationBanner';
import { mockCrowdZones, mockAlerts } from '../data/mockData';
import { Alert } from '../types';

const Home: React.FC = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather] = useState({ temp: 26, condition: 'Clear' });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<Alert | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    
    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Simulate periodic alerts
    const alertInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance of new alert
        const newAlert: Alert = {
          id: Date.now().toString(),
          type: 'crowd',
          message: 'New crowd update: Main Ghat area experiencing high density.',
          severity: 'warning',
          timestamp: new Date()
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
        setNotification(newAlert);
      }
    }, 45000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
      clearInterval(alertInterval);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading live data..." />
      </div>
    );
  }

  const highCrowdZones = mockCrowdZones.filter(zone => zone.level === 'high' || zone.level === 'critical');

  return (
    <div className="p-4 space-y-6">
      {notification && (
        <NotificationBanner
          type={notification.severity === 'danger' ? 'error' : notification.severity}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Pilgrims</p>
              <p className="text-lg font-bold text-gray-900">2.3L+</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">High Density</p>
              <p className="text-lg font-bold text-gray-900">{highCrowdZones.length} Areas</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Time</p>
              <p className="text-lg font-bold text-gray-900">
                {currentTime.toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Thermometer className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="text-lg font-bold text-gray-900">{weather.temp}°C</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Crowd Map */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Live Crowd Status</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live Updates
            </div>
          </div>
        </div>
        <div className="p-4">
          <GoogleMap zones={mockCrowdZones} height="h-80" />
          
          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Low Density</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Medium Density</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>High Density</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-700 rounded"></div>
              <span>Critical</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Alerts */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Live Alerts & Updates</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  alert.severity === 'danger' 
                    ? 'bg-red-100' 
                    : alert.severity === 'warning' 
                    ? 'bg-yellow-100' 
                    : 'bg-blue-100'
                }`}>
                  {alert.type === 'crowd' && <Users className="w-4 h-4 text-red-600" />}
                  {alert.type === 'health' && <AlertTriangle className="w-4 h-4 text-blue-600" />}
                  {alert.type === 'weather' && <Thermometer className="w-4 h-4 text-yellow-600" />}
                  {alert.type === 'safety' && <Navigation className="w-4 h-4 text-green-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 mb-1">{alert.message}</p>
                  <p className="text-xs text-gray-500">
                    {alert.timestamp.toLocaleTimeString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Highlights */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Highlights</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <p className="text-sm text-gray-700">Best bathing time: 4:00 AM - 6:00 AM (Low crowd)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <p className="text-sm text-gray-700">Free medical camp active at Main Ghat entrance</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <p className="text-sm text-gray-700">Special prasad distribution: 12:00 PM - 2:00 PM</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <p className="text-sm text-gray-700">Evening aarti: 6:30 PM at main temple</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;