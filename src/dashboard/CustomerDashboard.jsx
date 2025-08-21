import {
  CheckCircle,
  Clock,
  MapPin,
  Package,
  Plus,
  Search,
  Truck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MetricCard from '../components/MetricCard';

const CustomerDashboard = () => {
  // Mock data
  const userStats = {
    totalParcels: 12,
    pendingParcels: 2,
    inTransitParcels: 1,
    deliveredParcels: 9
  };

  const recentParcels = [
    {
      id: 'CP001234',
      trackingNumber: 'CP001234567890',
      status: 'delivered',
      recipient: 'Sarah Johnson',
      deliveryAddress: '123 Main St, New York, NY',
      createdAt: '2024-01-15',
      estimatedDelivery: '2024-01-17'
    },
    {
      id: 'CP001235',
      trackingNumber: 'CP001235567891',
      status: 'in_transit',
      recipient: 'Mike Wilson',
      deliveryAddress: '456 Oak Ave, Los Angeles, CA',
      createdAt: '2024-01-16',
      estimatedDelivery: '2024-01-18'
    },
    {
      id: 'CP001236',
      trackingNumber: 'CP001236567892',
      status: 'pending',
      recipient: 'Emily Davis',
      deliveryAddress: '789 Pine St, Chicago, IL',
      createdAt: '2024-01-17',
      estimatedDelivery: '2024-01-19'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_transit':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-orange-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your parcels and manage your deliveries</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link
          to="/customer/book"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-colors">
              <Plus className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Book New Parcel</h3>
              <p className="text-blue-100">Schedule a pickup for your parcel</p>
            </div>
          </div>
        </Link>

        <Link
          to="/customer/track"
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-colors">
              <Search className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Track Parcel</h3>
              <p className="text-green-100">Track your parcel in real-time</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Parcels"
          value={userStats.totalParcels}
          icon={Package}
          color="blue"
        />
        <MetricCard
          title="In Transit"
          value={userStats.inTransitParcels}
          icon={Truck}
          color="orange"
        />
        <MetricCard
          title="Pending"
          value={userStats.pendingParcels}
          icon={Clock}
          color="red"
        />
        <MetricCard
          title="Delivered"
          value={userStats.deliveredParcels}
          icon={CheckCircle}
          color="green"
        />
      </div>

      {/* Recent Parcels */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Parcels</h2>
          <Link
            to="/customer/parcels"
            className="text-blue-600 hover:text-blue-500 text-sm font-medium"
          >
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {recentParcels.map((parcel) => (
            <div
              key={parcel.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(parcel.status)}
                  <div>
                    <p className="font-medium text-gray-900">{parcel.trackingNumber}</p>
                    <p className="text-sm text-gray-500">to {parcel.recipient}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(parcel.status)}`}>
                  {parcel.status.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="truncate">{parcel.deliveryAddress}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Booked: {new Date(parcel.createdAt).toLocaleDateString()}</span>
                <span>Est. delivery: {new Date(parcel.estimatedDelivery).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        {recentParcels.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No parcels yet</h3>
            <p className="text-gray-500 mb-4">Start by booking your first parcel</p>
            <Link
              to="/customer/book"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Book Parcel
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;