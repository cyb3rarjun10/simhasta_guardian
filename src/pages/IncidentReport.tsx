import React, { useState } from 'react';
import { Camera, MapPin, Send, CheckCircle } from 'lucide-react';
import GoogleMap from '../components/GoogleMap';
import LoadingSpinner from '../components/LoadingSpinner';

const IncidentReport: React.FC = () => {
  const [formData, setFormData] = useState({
    type: 'crowd_surge',
    description: '',
    reporterName: '',
    reporterPhone: '',
    locationName: ''
  });
  const [selectedLocation, setSelectedLocation] = useState<{lat: number; lng: number} | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length <= 3) {
      setImages(prev => [...prev, ...files]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLocation) {
      alert('Please select a location on the map');
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate successful submission
    console.log('Incident Report Submitted:', {
      ...formData,
      location: selectedLocation,
      images: images.map(img => img.name),
      timestamp: new Date()
    });

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Report Submitted Successfully</h2>
          <p className="text-gray-600 mb-4">
            Your incident report has been received. Our team will investigate and respond appropriately.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Report ID: #IR{Date.now().toString().slice(-6)}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                type: 'crowd_surge',
                description: '',
                reporterName: '',
                reporterPhone: '',
                locationName: ''
              });
              setSelectedLocation(null);
              setImages([]);
            }}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Report an Incident</h1>
        <p className="text-gray-600 text-sm">
          Help us maintain safety by reporting any incidents or issues you encounter.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Incident Type */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Incident Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          >
            <option value="crowd_surge">Crowd Surge</option>
            <option value="missing_person">Missing Person</option>
            <option value="sanitation">Sanitation Issue</option>
            <option value="medical">Medical Emergency</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Describe the incident in detail..."
            required
          />
        </div>

        {/* Location Selection */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Location (Click on map to select)
          </label>
          <GoogleMap
            zones={[]}
            onLocationSelect={setSelectedLocation}
            selectedLocation={selectedLocation}
            height="h-64"
          />
          {selectedLocation && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">
                Location selected: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
              </span>
            </div>
          )}
          
          <input
            type="text"
            name="locationName"
            value={formData.locationName}
            onChange={handleInputChange}
            className="w-full mt-3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Location name (optional)"
          />
        </div>

        {/* Image Upload */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Images (Optional, max 3)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={images.length >= 3}
                />
                <span className="text-sm text-blue-600 hover:text-blue-700">
                  {images.length >= 3 ? 'Maximum images reached' : 'Click to upload images'}
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB each</p>
            </div>
          </div>
          
          {images.length > 0 && (
            <div className="mt-3 space-y-2">
              {images.map((image, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">{image.name}</span>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reporter Information */}
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Your Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="reporterName"
              value={formData.reporterName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Your full name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="reporterPhone"
              value={formData.reporterPhone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="+91-XXXXXXXXXX"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !selectedLocation}
          className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Report
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default IncidentReport;