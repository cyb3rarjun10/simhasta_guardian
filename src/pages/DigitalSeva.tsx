import React, { useState } from 'react';
import { Heart, CreditCard, CheckCircle, Users, Search, HelpCircle } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const DigitalSeva: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'donate' | 'services'>('donate');
  const [donationForm, setDonationForm] = useState({
    donorName: '',
    amount: '',
    mobileNumber: '',
    purpose: 'general'
  });
  const [serviceForm, setServiceForm] = useState({
    type: 'darshan',
    requesterName: '',
    mobileNumber: '',
    description: '',
    preferredTime: ''
  });
  const [donationLoading, setDonationLoading] = useState(false);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [serviceSuccess, setServiceSuccess] = useState(false);

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!donationForm.donorName || !donationForm.amount || !donationForm.mobileNumber) {
      alert('Please fill all required fields');
      return;
    }

    setDonationLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Simulate successful payment
    console.log('Donation Processed:', {
      ...donationForm,
      amount: parseFloat(donationForm.amount),
      timestamp: new Date(),
      paymentId: `PAY${Date.now()}`,
      status: 'completed'
    });

    setDonationLoading(false);
    setDonationSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setDonationSuccess(false);
      setDonationForm({
        donorName: '',
        amount: '',
        mobileNumber: '',
        purpose: 'general'
      });
    }, 3000);
  };

  const handleServiceRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!serviceForm.requesterName || !serviceForm.mobileNumber || !serviceForm.description) {
      alert('Please fill all required fields');
      return;
    }

    setServiceLoading(true);

    // Simulate request processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Service Request Submitted:', {
      ...serviceForm,
      timestamp: new Date(),
      status: 'pending'
    });

    setServiceLoading(false);
    setServiceSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setServiceSuccess(false);
      setServiceForm({
        type: 'darshan',
        requesterName: '',
        mobileNumber: '',
        description: '',
        preferredTime: ''
      });
    }, 3000);
  };

  const donationAmounts = [100, 500, 1000, 2000, 5000];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Heart className="w-6 h-6 text-orange-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Digital Seva</h1>
        </div>
        <p className="text-gray-600 text-sm">
          Contribute to the holy gathering through donations and request spiritual services.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="flex">
          <button
            onClick={() => setActiveTab('donate')}
            className={`flex-1 p-4 text-center font-medium transition-colors ${
              activeTab === 'donate'
                ? 'bg-orange-600 text-white rounded-tl-xl'
                : 'text-gray-600 hover:text-orange-600'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <CreditCard className="w-5 h-5" />
              Donations
            </div>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 p-4 text-center font-medium transition-colors ${
              activeTab === 'services'
                ? 'bg-orange-600 text-white rounded-tr-xl'
                : 'text-gray-600 hover:text-orange-600'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Services
            </div>
          </button>
        </div>
      </div>

      {activeTab === 'donate' && (
        <div className="space-y-6">
          {donationSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-green-900 mb-2">Donation Successful!</h2>
              <p className="text-green-700 mb-2">
                Thank you for your generous contribution of ₹{donationForm.amount}
              </p>
              <p className="text-sm text-green-600">
                Payment ID: PAY{Date.now().toString().slice(-8)}
              </p>
            </div>
          ) : (
            <>
              {/* Impact Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
                  <div className="text-2xl font-bold text-orange-600">₹12.5L</div>
                  <div className="text-sm text-gray-600">Total Raised</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
                  <div className="text-2xl font-bold text-blue-600">2,847</div>
                  <div className="text-sm text-gray-600">Donors</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
                  <div className="text-2xl font-bold text-green-600">50k+</div>
                  <div className="text-sm text-gray-600">Meals Served</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border text-center">
                  <div className="text-2xl font-bold text-purple-600">15</div>
                  <div className="text-sm text-gray-600">Medical Camps</div>
                </div>
              </div>

              {/* Donation Form */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Make a Donation</h2>
                
                <form onSubmit={handleDonationSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Donor Name
                    </label>
                    <input
                      type="text"
                      value={donationForm.donorName}
                      onChange={(e) => setDonationForm(prev => ({ ...prev, donorName: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose
                    </label>
                    <select
                      value={donationForm.purpose}
                      onChange={(e) => setDonationForm(prev => ({ ...prev, purpose: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="general">General Fund</option>
                      <option value="food">Food Distribution</option>
                      <option value="medical">Medical Aid</option>
                      <option value="sanitation">Sanitation Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Donation Amount
                    </label>
                    <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
                      {donationAmounts.map(amount => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setDonationForm(prev => ({ ...prev, amount: amount.toString() }))}
                          className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                            donationForm.amount === amount.toString()
                              ? 'bg-orange-600 text-white border-orange-600'
                              : 'border-gray-300 text-gray-700 hover:border-orange-300'
                          }`}
                        >
                          ₹{amount}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      value={donationForm.amount}
                      onChange={(e) => setDonationForm(prev => ({ ...prev, amount: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter custom amount"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={donationForm.mobileNumber}
                      onChange={(e) => setDonationForm(prev => ({ ...prev, mobileNumber: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="+91-XXXXXXXXXX"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={donationLoading}
                    className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
                  >
                    {donationLoading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Proceed to Payment
                      </>
                    )}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'services' && (
        <div className="space-y-6">
          {serviceSuccess ? (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-blue-900 mb-2">Service Request Submitted!</h2>
              <p className="text-blue-700 mb-2">
                Your {serviceForm.type} request has been received and is being processed.
              </p>
              <p className="text-sm text-blue-600">
                Request ID: #SR{Date.now().toString().slice(-6)}
              </p>
            </div>
          ) : (
            <>
              {/* Available Services */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-5 h-5 text-orange-600" />
                      <h3 className="font-medium text-gray-900">Darshan Booking</h3>
                    </div>
                    <p className="text-sm text-gray-600">Book special darshan slots and VIP access</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Search className="w-5 h-5 text-blue-600" />
                      <h3 className="font-medium text-gray-900">Lost & Found</h3>
                    </div>
                    <p className="text-sm text-gray-600">Report lost items or find missing belongings</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="w-5 h-5 text-red-600" />
                      <h3 className="font-medium text-gray-900">Medical Help</h3>
                    </div>
                    <p className="text-sm text-gray-600">Request medical assistance or support</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <HelpCircle className="w-5 h-5 text-green-600" />
                      <h3 className="font-medium text-gray-900">Volunteer Support</h3>
                    </div>
                    <p className="text-sm text-gray-600">Get help from event volunteers</p>
                  </div>
                </div>
              </div>

              {/* Service Request Form */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Request a Service</h2>
                
                <form onSubmit={handleServiceRequest} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Type
                    </label>
                    <select
                      value={serviceForm.type}
                      onChange={(e) => setServiceForm(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="darshan">Darshan Booking</option>
                      <option value="lost_found">Lost & Found</option>
                      <option value="medical_help">Medical Help</option>
                      <option value="volunteer">Volunteer Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={serviceForm.requesterName}
                      onChange={(e) => setServiceForm(prev => ({ ...prev, requesterName: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={serviceForm.mobileNumber}
                      onChange={(e) => setServiceForm(prev => ({ ...prev, mobileNumber: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="+91-XXXXXXXXXX"
                      required
                    />
                  </div>

                  {serviceForm.type === 'darshan' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        value={serviceForm.preferredTime}
                        onChange={(e) => setServiceForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Please describe your request in detail..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={serviceLoading}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
                  >
                    {serviceLoading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <Users className="w-5 h-5" />
                        Submit Request
                      </>
                    )}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DigitalSeva;