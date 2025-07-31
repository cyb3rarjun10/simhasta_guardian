import React, { useState, useEffect } from 'react';
import { AlertTriangle, Users, Heart, Trash2, RefreshCw, Battery, MapPin, Clock } from 'lucide-react';
import { mockIncidentReports, mockSOSAlerts, mockDonations, mockSevaRequests, mockBinStatus } from '../data/mockData';
import { IncidentReport, SOSAlert, Donation, SevaRequest, BinStatus } from '../types';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'incidents' | 'sos' | 'donations' | 'services' | 'iot'>('incidents');
  const [incidents, setIncidents] = useState<IncidentReport[]>(mockIncidentReports);
  const [sosAlerts, setSosAlerts] = useState<SOSAlert[]>(mockSOSAlerts);
  const [donations] = useState<Donation[]>(mockDonations);
  const [sevaRequests] = useState<SevaRequest[]>(mockSevaRequests);
  const [binStatuses, setBinStatuses] = useState<BinStatus[]>(mockBinStatus);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate real-time updates
      setBinStatuses(prev => prev.map(bin => ({
        ...bin,
        fillLevel: Math.min(100, bin.fillLevel + Math.random() * 5),
        batteryLevel: Math.max(0, bin.batteryLevel - Math.random() * 2)
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const tabs = [
    { id: 'incidents', label: 'Incidents', count: incidents.length },
    { id: 'sos', label: 'SOS Alerts', count: sosAlerts.filter(s => s.status === 'active').length },
    { id: 'donations', label: 'Donations', count: donations.length },
    { id: 'services', label: 'Services', count: sevaRequests.length },
    { id: 'iot', label: 'IoT Status', count: binStatuses.filter(b => b.status === 'critical').length }
  ];

  const updateIncidentStatus = (id: string, newStatus: IncidentReport['status']) => {
    setIncidents(prev => prev.map(incident =>
      incident.id === id ? { ...incident, status: newStatus } : incident
    ));
  };

  const updateSOSStatus = (id: string, newStatus: SOSAlert['status']) => {
    setSosAlerts(prev => prev.map(alert =>
      alert.id === id ? { ...alert, status: newStatus } : alert
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'pending':
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'investigating':
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
      case 'completed':
      case 'responded':
      case 'normal':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBinStatusIcon = (bin: BinStatus) => {
    if (bin.fillLevel >= 90) return '🔴';
    if (bin.fillLevel >= 70) return '🟡';
    return '🟢';
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <p className="text-sm text-red-600">Active Incidents</p>
              <p className="text-xl font-bold text-red-900">
                {incidents.filter(i => i.status !== 'resolved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-orange-600" />
            <div>
              <p className="text-sm text-orange-600">SOS Alerts</p>
              <p className="text-xl font-bold text-orange-900">
                {sosAlerts.filter(s => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-sm text-green-600">Total Donations</p>
              <p className="text-xl font-bold text-green-900">
                ₹{donations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600">Service Requests</p>
              <p className="text-xl font-bold text-blue-900">
                {sevaRequests.filter(s => s.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Trash2 className="w-6 h-6 text-purple-600" />
            <div>
              <p className="text-sm text-purple-600">Critical Bins</p>
              <p className="text-xl font-bold text-purple-900">
                {binStatuses.filter(b => b.status === 'critical').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-0 p-4 text-center font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="truncate">{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border">
        {activeTab === 'incidents' && (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Incident Reports</h2>
            <div className="space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(incident.status)}`}>
                          {incident.status}
                        </span>
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full capitalize">
                          {incident.type.replace('_', ' ')}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{incident.description}</h3>
                      <p className="text-sm text-gray-600">
                        📍 {incident.locationName || `${incident.location.lat.toFixed(4)}, ${incident.location.lng.toFixed(4)}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        📞 {incident.reporterName} - {incident.reporterPhone}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {incident.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {incident.status === 'pending' && (
                        <button
                          onClick={() => updateIncidentStatus(incident.id, 'investigating')}
                          className="px-3 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        >
                          Investigate
                        </button>
                      )}
                      {incident.status === 'investigating' && (
                        <button
                          onClick={() => updateIncidentStatus(incident.id, 'resolved')}
                          className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sos' && (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">SOS Alerts</h2>
            <div className="space-y-4">
              {sosAlerts.map((alert) => (
                <div key={alert.id} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(alert.status)}`}>
                          {alert.status}
                        </span>
                        <span className="text-red-600 font-bold">⚠️ EMERGENCY</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{alert.userName}</h3>
                      <p className="text-sm text-gray-600">📞 {alert.userPhone}</p>
                      <p className="text-sm text-gray-600">🚨 Emergency Contact: {alert.emergencyContact}</p>
                      <p className="text-sm text-gray-600">
                        📍 {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {alert.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {alert.status === 'active' && (
                        <button
                          onClick={() => updateSOSStatus(alert.id, 'responded')}
                          className="px-3 py-1 text-xs bg-orange-600 text-white rounded hover:bg-orange-700"
                        >
                          Respond
                        </button>
                      )}
                      {alert.status === 'responded' && (
                        <button
                          onClick={() => updateSOSStatus(alert.id, 'resolved')}
                          className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Donations</h2>
            <div className="grid gap-4">
              {donations.map((donation) => (
                <div key={donation.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{donation.donorName}</h3>
                      <p className="text-sm text-gray-600">📞 {donation.mobileNumber}</p>
                      <p className="text-sm text-gray-600 capitalize">Purpose: {donation.purpose.replace('_', ' ')}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {donation.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">₹{donation.amount.toLocaleString()}</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(donation.status)}`}>
                        {donation.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Requests</h2>
            <div className="space-y-4">
              {sevaRequests.map((request) => (
                <div key={request.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full capitalize">
                          {request.type.replace('_', ' ')}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{request.requesterName}</h3>
                      <p className="text-sm text-gray-600">📞 {request.mobileNumber}</p>
                      {request.preferredTime && (
                        <p className="text-sm text-gray-600">⏰ Preferred Time: {request.preferredTime}</p>
                      )}
                      <p className="text-sm text-gray-700 mt-2">{request.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {request.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'iot' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">IoT Bin Monitoring</h2>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-600">Auto-refresh (30s)</span>
                </label>
                <button
                  onClick={() => window.location.reload()}
                  className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {binStatuses.map((bin) => (
                <div key={bin.id} className={`p-4 rounded-lg border-2 ${
                  bin.status === 'critical' ? 'border-red-200 bg-red-50' :
                  bin.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                  'border-green-200 bg-green-50'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getBinStatusIcon(bin)}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{bin.location}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{bin.coordinates.lat.toFixed(4)}, {bin.coordinates.lng.toFixed(4)}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(bin.status)}`}>
                      {bin.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Fill Level</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              bin.fillLevel >= 90 ? 'bg-red-500' :
                              bin.fillLevel >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${bin.fillLevel}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{bin.fillLevel.toFixed(0)}%</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Battery</p>
                      <div className="flex items-center gap-2">
                        <Battery className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium">{bin.batteryLevel.toFixed(0)}%</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Last Emptied</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">
                          {Math.floor((Date.now() - bin.lastEmptied.getTime()) / (1000 * 60 * 60))}h ago
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;