import React, { useState } from 'react';
import { 
  Package, 
  MapPin, 
  Phone, 
  Navigation, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Filter,
  Search,
  Route,
  Camera,
  QrCode
} from 'lucide-react';
import toast from 'react-hot-toast';

const AgentParcels = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API calls
  const parcels = [
    {
      id: 'CP001234',
      trackingNumber: 'CP001234567890',
      status: 'assigned',
      priority: 'high',
      customer: 'John Smith',
      customerPhone: '+1234567890',
      recipient: 'Sarah Johnson',
      recipientPhone: '+1234567891',
      pickupAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      deliveryAddress: {
        street: '456 Oak Ave',
        city: 'Brooklyn',
        state: 'NY',
        zipCode: '11201',
        coordinates: { lat: 40.6782, lng: -73.9442 }
      },
      parcelDetails: {
        type: 'package',
        weight: 2.5,
        value: 150.00,
        description: 'Electronics package'
      },
      paymentType: 'cod',
      codAmount: 150.00,
      estimatedTime: '2:30 PM',
      distance: '5.2 km',
      createdAt: '2024-01-17T08:00:00Z'
    },
    {
      id: 'CP001235',
      trackingNumber: 'CP001235567891',
      status: 'picked_up',
      priority: 'medium',
      customer: 'Mike Wilson',
      customerPhone: '+1234567892',
      recipient: 'Emily Davis',
      recipientPhone: '+1234567893',
      pickupAddress: {
        street: '789 Pine St',
        city: 'Manhattan',
        state: 'NY',
        zipCode: '10002',
        coordinates: { lat: 40.7589, lng: -73.9851 }
      },
      deliveryAddress: {
        street: '321 Cedar Ave',
        city: 'Queens',
        state: 'NY',
        zipCode: '11101',
        coordinates: { lat: 40.7282, lng: -73.7949 }
      },
      parcelDetails: {
        type: 'fragile',
        weight: 1.8,
        value: 300.00,
        description: 'Glass artwork'
      },
      paymentType: 'prepaid',
      estimatedTime: '4:15 PM',
      distance: '8.7 km',
      createdAt: '2024-01-17T09:30:00Z'
    },
    {
      id: 'CP001236',
      trackingNumber: 'CP001236567892',
      status: 'in_transit',
      priority: 'low',
      customer: 'Lisa Brown',
      customerPhone: '+1234567894',
      recipient: 'David Wilson',
      recipientPhone: '+1234567895',
      pickupAddress: {
        street: '654 Elm St',
        city: 'Bronx',
        state: 'NY',
        zipCode: '10451',
        coordinates: { lat: 40.8176, lng: -73.9182 }
      },
      deliveryAddress: {
        street: '987 Maple Ave',
        city: 'Staten Island',
        state: 'NY',
        zipCode: '10301',
        coordinates: { lat: 40.6331, lng: -74.1737 }
      },
      parcelDetails: {
        type: 'document',
        weight: 0.5,
        value: 50.00,
        description: 'Legal documents'
      },
      paymentType: 'prepaid',
      estimatedTime: '6:00 PM',
      distance: '12.3 km',
      createdAt: '2024-01-17T11:00:00Z'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'picked_up':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'in_transit':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getParcelTypeIcon = (type) => {
    switch (type) {
      case 'document':
        return '📄';
      case 'package':
        return '📦';
      case 'fragile':
        return '🔍';
      case 'electronics':
        return '💻';
      default:
        return '📦';
    }
  };

  const updateParcelStatus = (parcelId, newStatus) => {
    toast.success(`Parcel ${parcelId} status updated to ${newStatus.replace('_', ' ')}`);
    // Here you would make an API call to update the status
  };

  const openNavigation = (address) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${address.coordinates.lat},${address.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const scanQRCode = (parcelId) => {
    toast.success(`QR Code scanned for parcel ${parcelId}`);
    // Here you would implement QR code scanning functionality
  };

  const filteredParcels = parcels.filter(parcel => {
    const matchesSearch = parcel.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parcel.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parcel.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || parcel.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Parcels</h1>
        <p className="text-gray-600 mt-2">Manage your assigned deliveries and pickups</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center space-x-3">
            <Route className="h-6 w-6" />
            <div className="text-left">
              <h3 className="font-semibold">Optimize Route</h3>
              <p className="text-blue-100 text-sm">Get best delivery sequence</p>
            </div>
          </div>
        </button>

        <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center space-x-3">
            <Navigation className="h-6 w-6" />
            <div className="text-left">
              <h3 className="font-semibold">Start Navigation</h3>
              <p className="text-green-100 text-sm">Navigate to next stop</p>
            </div>
          </div>
        </button>

        <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center space-x-3">
            <QrCode className="h-6 w-6" />
            <div className="text-left">
              <h3 className="font-semibold">Scan QR Code</h3>
              <p className="text-purple-100 text-sm">Quick parcel verification</p>
            </div>
          </div>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search parcels..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <Filter className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="assigned">Assigned</option>
              <option value="picked_up">Picked Up</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Total: {filteredParcels.length} parcels</span>
          </div>
        </div>
      </div>

      {/* Parcels List */}
      <div className="space-y-4">
        {filteredParcels.map((parcel) => (
          <div key={parcel.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getParcelTypeIcon(parcel.parcelDetails.type)}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{parcel.trackingNumber}</h3>
                      <p className="text-sm text-gray-500">
                        {parcel.customer} → {parcel.recipient}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(parcel.status)}`}>
                      {parcel.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(parcel.priority)}`}>
                      {parcel.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">ETA: {parcel.estimatedTime}</p>
                  <p className="text-sm text-gray-500">{parcel.distance}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Pickup Address */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">PICKUP ADDRESS</p>
                  <div className="flex items-start space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        {parcel.pickupAddress.street}<br />
                        {parcel.pickupAddress.city}, {parcel.pickupAddress.state} {parcel.pickupAddress.zipCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-3 w-3" />
                    <span>{parcel.customerPhone}</span>
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">DELIVERY ADDRESS</p>
                  <div className="flex items-start space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        {parcel.deliveryAddress.street}<br />
                        {parcel.deliveryAddress.city}, {parcel.deliveryAddress.state} {parcel.deliveryAddress.zipCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-3 w-3" />
                    <span>{parcel.recipientPhone}</span>
                  </div>
                </div>
              </div>

              {/* Parcel Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Weight:</span>
                    <p className="font-medium">{parcel.parcelDetails.weight} kg</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Value:</span>
                    <p className="font-medium">${parcel.parcelDetails.value}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Payment:</span>
                    <p className={`font-medium ${
                      parcel.paymentType === 'cod' ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {parcel.paymentType.toUpperCase()}
                    </p>
                  </div>
                  {parcel.paymentType === 'cod' && (
                    <div>
                      <span className="text-gray-500">COD Amount:</span>
                      <p className="font-medium text-orange-600">${parcel.codAmount}</p>
                    </div>
                  )}
                </div>
                {parcel.parcelDetails.description && (
                  <div className="mt-2">
                    <span className="text-gray-500 text-sm">Description:</span>
                    <p className="text-sm text-gray-700">{parcel.parcelDetails.description}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  {parcel.status === 'assigned' && (
                    <>
                      <button
                        onClick={() => updateParcelStatus(parcel.id, 'picked_up')}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <Package className="h-4 w-4" />
                        <span>Mark Picked Up</span>
                      </button>
                      <button
                        onClick={() => scanQRCode(parcel.id)}
                        className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                      >
                        <QrCode className="h-4 w-4" />
                        <span>Scan QR</span>
                      </button>
                    </>
                  )}
                  {parcel.status === 'picked_up' && (
                    <button
                      onClick={() => updateParcelStatus(parcel.id, 'in_transit')}
                      className="px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                    >
                      <Clock className="h-4 w-4" />
                      <span>In Transit</span>
                    </button>
                  )}
                  {parcel.status === 'in_transit' && (
                    <>
                      <button
                        onClick={() => updateParcelStatus(parcel.id, 'delivered')}
                        className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Mark Delivered</span>
                      </button>
                      <button
                        onClick={() => updateParcelStatus(parcel.id, 'failed')}
                        className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <span>Mark Failed</span>
                      </button>
                    </>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => openNavigation(parcel.status === 'assigned' ? parcel.pickupAddress : parcel.deliveryAddress)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Navigate"
                  >
                    <Navigation className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Call Customer">
                    <Phone className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Take Photo">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredParcels.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No parcels found</h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'No parcels assigned to you yet'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default AgentParcels;