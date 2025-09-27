import React, { useState } from 'react';
import { Car, Calculator, Info, AlertCircle } from 'lucide-react';

const Tariff = () => {
  const [activeTab, setActiveTab] = useState('oneway');

  const oneWayTariff = [
    { vehicle: 'SEDAN', rate: '₹14/KM', driverBata: '₹400', additional: 'One way Toll' },
    { vehicle: 'ETIOS', rate: '₹14/KM', driverBata: '₹400', additional: 'One way Toll' },
    { vehicle: 'SUV', rate: '₹19/KM', driverBata: '₹400', additional: 'One way Toll' },
    { vehicle: 'INNOVA', rate: '₹20/KM', driverBata: '₹400', additional: 'One way Toll' }
  ];

  const roundTripTariff = [
    { vehicle: 'SEDAN', rate: '₹13/KM', driverBata: '₹400', additional: 'Up & Down Toll' },
    { vehicle: 'ETIOS', rate: '₹13/KM', driverBata: '₹400', additional: 'Up & Down Toll' },
    { vehicle: 'SUV', rate: '₹18/KM', driverBata: '₹400', additional: 'Up & Down Toll' },
    { vehicle: 'INNOVA', rate: '₹18/KM', driverBata: '₹400', additional: 'Up & Down Toll' }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tariff Details</h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl shadow-lg p-2 flex">
            <button
              onClick={() => setActiveTab('oneway')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'oneway'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              One Way Tariff
            </button>
            <button
              onClick={() => setActiveTab('roundtrip')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'roundtrip'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Round Trip Tariff
            </button>
          </div>
        </div>

        {/* Tariff Tables */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <h3 className="text-2xl font-bold text-center">
              {activeTab === 'oneway' ? 'One Way Tariff' : 'Round Trip Tariff'}
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Vehicle Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rate/KM</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Driver Bata</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Additional Charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {(activeTab === 'oneway' ? oneWayTariff : roundTripTariff).map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <Car className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-gray-900">{row.vehicle}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-blue-600 font-semibold">{row.rate}</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">{row.driverBata}</td>
                    <td className="px-6 py-4 text-orange-600 font-medium">{row.additional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Notes */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Info className="h-6 w-6 text-blue-600" />
              <h4 className="text-lg font-bold text-gray-900">Drop Trip Terms</h4>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>• Driver Bata: ₹400</li>
              <li>• Waiting Charges: ₹120 per hour</li>
              <li>• <strong>Minimum billing: 130 KM</strong></li>
              <li>• Hill station charges: ₹300</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Info className="h-6 w-6 text-green-600" />
              <h4 className="text-lg font-bold text-gray-900">Round Trip Terms</h4>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>• Driver Bata: ₹500 per day</li>
              <li>• <strong>Minimum billing: 250 KM</strong></li>
              <li>• Bangalore pickup: 300kms minimum</li>
              <li>• Any other state: 250kms minimum</li>
            </ul>
          </div>
        </div>

        {/* Additional Charges */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-8">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="h-6 w-6 text-orange-600" />
            <h4 className="text-xl font-bold text-gray-900">Additional Information</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h5 className="font-semibold mb-2">Extra Charges:</h5>
              <ul className="space-y-1">
                <li>• Toll fees (as applicable)</li>
                <li>• Inter-State Permit charges</li>
                <li>• GST charges (if any)</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Important Notes:</h5>
              <ul className="space-y-1">
                <li>• 1 day = 1 calendar day (12 AM to 12 AM)</li>
                <li>• Luggage policy at driver's discretion</li>
                <li>• Taxis are passenger vehicles only</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Tariff;
