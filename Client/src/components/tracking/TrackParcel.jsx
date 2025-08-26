import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Truck, 
  AlertCircle,
  Phone,
  User,
  Calendar,
  DollarSign,
  Navigation,
  Share2,
  Download
} from 'lucide-react';

const TrackParcel = () => {
  const { trackingNumber } = useParams();
  const [parcelData, setParcelData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchParcelData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = {
        id: 'CP001234',
        trackingNumber: trackingNumber || 'CP001234567890',
        status: 'in_transit',
        recipient: 'Sarah Johnson',
        recipientPhone: '+1234567891',
        pickupAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          contactName: 'John Doe',
          contactPhone: '+1234567890',
          coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        deliveryAddress: {
          street: '456 Oak Ave',
          city: 'Brooklyn',
          state: 'NY',
          zipCode: '11201',
          contactName: 'Sarah Johnson',
          contactPhone: '+1234567891',
          coordinates: { lat: 40.6782, lng: -73.9442 }
        },
        parcelDetails: {
          type: 'package',
          weight: 2.5,
          dimensions: { length: 30, width: 20, height: 15 },
          value: 150.00,
          description: 'Electronics package'
        },
        paymentType: 'prepaid',
        serviceType: 'express',
        cost: 29.99,
        agentName: 'Mike Wilson',
        agentPhone: '+1234567893',
        estimatedDelivery: '2024-01-19T17:00:00Z',
        createdAt: '2024-01-16T08:45:00Z',
        currentLocation: { lat: 40.7589, lng: -73.9851, address: 'Times Square, NY' },
        statusHistory: [
          { 
            status: 'pending', 
            timestamp: '2024-01-16T08:45:00Z', 
            location: 'New York, NY',
            description: 'Parcel booking confirmed'
          },
          { 
            status: 'assigned', 
            timestamp: '2024-01-16T12:00:00Z', 
            location: 'New York, NY',
            description: 'Assigned to delivery agent Mike Wilson'
          },
          { 
            status: 'picked_up', 
            timestamp: '2024-01-17T10:20:00Z', 
            location: 'New York, NY',
            description: 'Parcel picked up from sender'
          },
          { 
            status: 'in_transit', 
            timestamp: '2024-01-17T15:45:00Z', 
            location: 'Times Square, NY',
            description: 'Parcel is on the way to destination'
          }
        ]
      };
      
      setParcelData(mockData);
      setLoading(false);
    };

    fetchParcelData();
  }, [trackingNumber]);

  const getStatusIcon = (status, isActive = false) => {
    const iconClass = `h-6 w-6 ${isActive ? 'text-white' : 'text-gray-400'}`;
    
    switch (status) {
      case 'delivered':
        return <CheckCircle className={iconClass} />;
      case 'in_transit':
        return <Truck className={iconClass} />;
      case 'picked_up':
        return <Package className={iconClass} />;
      case 'assigned':
        return <User className={iconClass} />;
      case 'pending':
        return <Clock className={iconClass} />;
      case 'failed':
        return <AlertCircle className={iconClass} />;
      default:
        return <Package className={iconClass} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'in_transit':
        return 'bg-blue-500';
      case 'picked_up':
        return 'bg-purple-500';
      case 'assigned':
        return 'bg-orange-500';
      case 'pending':
        return 'bg-gray-400';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const shareTracking = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Track Parcel',
        text: `Track parcel ${trackingNumber}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tracking information...</p>
        </div>
      </div>
    );
  }

  if (!parcelData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Parcel Not Found</h2>
          <p className="text-gray-600">Please check your tracking number and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Track Parcel</h1>
              <p className="text-gray-600">Tracking Number: {parcelData.trackingNumber}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={shareTracking}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Current Status */}
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <div className={`p-3 rounded-full ${getStatusColor(parcelData.status)}`}>
              {getStatusIcon(parcelData.status, true)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 capitalize">
                {parcelData.status.replace('_', ' ')}
              </h3>
              <p className="text-gray-600">
                {parcelData.statusHistory[parcelData.statusHistory.length - 1]?.description}
              </p>
              <p className="text-sm text-gray-500">
                Last updated: {new Date(parcelData.statusHistory[parcelData.statusHistory.length - 1]?.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Live Location
              </h2>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive map will be displayed here</p>
                  <p className="text-sm text-gray-500">Current location: {parcelData.currentLocation.address}</p>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Tracking History</h2>
              <div className="space-y-6">
                {parcelData.statusHistory.map((status, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-full ${
                        index === parcelData.statusHistory.length - 1 
                          ? getStatusColor(status.status)
                          : 'bg-gray-200'
                      }`}>
                        {getStatusIcon(status.status, index === parcelData.statusHistory.length - 1)}
                      </div>
                      {index < parcelData.statusHistory.length - 1 && (
                        <div className="w-0.5 h-12 bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 capitalize">
                          {status.status.replace('_', ' ')}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {new Date(status.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{status.description}</p>
                      <p className="text-gray-500 text-xs mt-1 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {status.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Delivery Information</h3>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-600">Estimated Delivery</p>
                    <p className="font-medium text-gray-900">
                      {new Date(parcelData.estimatedDelivery).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-600">Recipient</p>
                    <p className="font-medium text-gray-900">{parcelData.recipient}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-600">Contact</p>
                    <p className="font-medium text-gray-900">{parcelData.recipientPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Info */}
            {parcelData.agentName && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Delivery Agent</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{parcelData.agentName}</p>
                    <p className="text-sm text-gray-600">{parcelData.agentPhone}</p>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Call Agent</span>
                </button>
              </div>
            )}

            {/* Parcel Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Parcel Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{parcelData.parcelDetails.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">{parcelData.parcelDetails.weight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Value:</span>
                  <span className="font-medium">${parcelData.parcelDetails.value}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium capitalize">{parcelData.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment:</span>
                  <span className={`font-medium ${
                    parcelData.paymentType === 'cod' ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {parcelData.paymentType.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost:</span>
                  <span className="font-medium">${parcelData.cost}</span>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Addresses</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Pickup</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">
                    {parcelData.pickupAddress.street}<br />
                    {parcelData.pickupAddress.city}, {parcelData.pickupAddress.state} {parcelData.pickupAddress.zipCode}
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Delivery</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">
                    {parcelData.deliveryAddress.street}<br />
                    {parcelData.deliveryAddress.city}, {parcelData.deliveryAddress.state} {parcelData.deliveryAddress.zipCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackParcel;