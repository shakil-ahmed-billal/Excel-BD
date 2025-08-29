import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Truck, 
  AlertCircle,
  Eye,
  Download,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import useAxiosPublic from '@/hooks/useAxiosPublic';

const ParcelHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const {user} = useAuth();
  const axiosPublic = useAxiosPublic();

  const [parcelData , setParcelData] = useState([]);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await axiosPublic.get(`/api/parcel/customer/${user.customerId}`);
        setParcelData(response.data);
      } catch (error) {
        console.error("Error fetching parcels:", error);
      }
    };
    fetchParcels();

  }, [axiosPublic, user]);

  console.log(parcelData);

  // Mock data - replace with actual API calls
  const parcels = [
    {
      id: 'CP001234',
      trackingNumber: 'CP001234567890',
      status: 'delivered',
      recipient: 'Sarah Johnson',
      recipientPhone: '+1234567891',
      pickupAddress: '123 Main St, New York, NY 10001',
      deliveryAddress: '456 Oak Ave, Brooklyn, NY 11201',
      parcelType: 'package',
      weight: 2.5,
      value: 150.00,
      paymentType: 'prepaid',
      serviceType: 'express',
      createdAt: '2024-01-15T10:30:00Z',
      estimatedDelivery: '2024-01-17T16:00:00Z',
      actualDelivery: '2024-01-17T14:30:00Z',
      cost: 29.99,
      agentName: 'Mike Wilson',
      statusHistory: [
        { status: 'pending', timestamp: '2024-01-15T10:30:00Z', location: 'New York, NY' },
        { status: 'assigned', timestamp: '2024-01-15T14:00:00Z', location: 'New York, NY' },
        { status: 'picked_up', timestamp: '2024-01-16T09:15:00Z', location: 'New York, NY' },
        { status: 'in_transit', timestamp: '2024-01-16T11:30:00Z', location: 'Manhattan, NY' },
        { status: 'delivered', timestamp: '2024-01-17T14:30:00Z', location: 'Brooklyn, NY' }
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_transit':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'picked_up':
        return <Package className="h-5 w-5 text-purple-500" />;
      case 'assigned':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'picked_up':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'assigned':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
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

  const filteredParcels = parcels.filter(parcel => {
    const matchesSearch = parcel.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parcel.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || parcel.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const parcelDate = new Date(parcel.createdAt);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - parcelDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case 'today':
          matchesDate = daysDiff === 0;
          break;
        case 'week':
          matchesDate = daysDiff <= 7;
          break;
        case 'month':
          matchesDate = daysDiff <= 30;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Parcel History</h1>
        <p className="text-gray-600 mt-2">Track and manage all your parcel bookings</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by tracking number or recipient..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="picked_up">Picked Up</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {/* Export Button */}
          <button className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
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
                    {getStatusIcon(parcel.status)}
                    <div>
                      <h3 className="font-semibold text-gray-900">{parcel.trackingNumber}</h3>
                      <p className="text-sm text-gray-500">to {parcel.recipient}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(parcel.status)}`}>
                    {parcel.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/customer/track/${parcel.trackingNumber}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Track Parcel"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {/* Addresses */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">PICKUP ADDRESS</p>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{parcel.pickupAddress}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">DELIVERY ADDRESS</p>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{parcel.deliveryAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Parcel Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getParcelTypeIcon(parcel.parcelType)}</span>
                    <span className="text-sm text-gray-600 capitalize">{parcel.parcelType}</span>
                  </div>
                  <p className="text-sm text-gray-600">Weight: {parcel.weight} kg</p>
                  <p className="text-sm text-gray-600">Value: ${parcel.value}</p>
                  <p className="text-sm text-gray-600 capitalize">Service: {parcel.serviceType}</p>
                  {parcel.agentName && (
                    <p className="text-sm text-gray-600">Agent: {parcel.agentName}</p>
                  )}
                </div>

                {/* Payment & Dates */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      parcel.paymentType === 'cod' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {parcel.paymentType.toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-gray-900">${parcel.cost}</span>
                  </div>
                  {parcel.paymentType === 'cod' && parcel.codAmount && (
                    <p className="text-sm text-orange-600 font-medium">COD: ${parcel.codAmount}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Booked: {new Date(parcel.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Est. Delivery: {new Date(parcel.estimatedDelivery).toLocaleDateString()}
                  </p>
                  {parcel.actualDelivery && (
                    <p className="text-xs text-green-600 font-medium">
                      Delivered: {new Date(parcel.actualDelivery).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Status Timeline */}
              <div className="border-t pt-4">
                <p className="text-xs text-gray-500 mb-3">STATUS TIMELINE</p>
                <div className="flex items-center space-x-4 overflow-x-auto">
                  {parcel.statusHistory.map((status, index) => (
                    <div key={index} className="flex items-center space-x-2 min-w-0 flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full ${
                        index === parcel.statusHistory.length - 1 ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                      <div className="text-xs">
                        <p className="font-medium text-gray-900 capitalize">
                          {status.status.replace('_', ' ')}
                        </p>
                        <p className="text-gray-500">
                          {new Date(status.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      {index < parcel.statusHistory.length - 1 && (
                        <div className="w-8 h-0.5 bg-gray-300 mx-2" />
                      )}
                    </div>
                  ))}
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
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'You haven\'t booked any parcels yet'
            }
          </p>
          <Link
            to="/customer/book"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Package className="h-4 w-4 mr-2" />
            Book New Parcel
          </Link>
        </div>
      )}
    </div>
  );
};

export default ParcelHistory;