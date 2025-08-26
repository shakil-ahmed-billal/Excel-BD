import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  UserPlus, 
  Eye, 
  Edit, 
  Download,
  Calendar,
  MapPin,
  User,
  Phone,
  DollarSign,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle
} from 'lucide-react';

const AdminParcels = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Mock data - replace with actual API calls
  const parcels = [
    {
      id: 'CP001234',
      trackingNumber: 'CP001234567890',
      status: 'in_transit',
      customer: 'John Smith',
      customerPhone: '+1234567890',
      customerEmail: 'john@example.com',
      recipient: 'Sarah Johnson',
      recipientPhone: '+1234567891',
      pickupAddress: '123 Main St, New York, NY 10001',
      deliveryAddress: '456 Oak Ave, Brooklyn, NY 11201',
      parcelType: 'package',
      weight: 2.5,
      value: 150.00,
      paymentType: 'cod',
      codAmount: 150.00,
      serviceType: 'express',
      cost: 29.99,
      agentId: 'agent1',
      agentName: 'Mike Wilson',
      createdAt: '2024-01-15T10:30:00Z',
      estimatedDelivery: '2024-01-17T16:00:00Z',
      priority: 'high'
    },
    {
      id: 'CP001235',
      trackingNumber: 'CP001235567891',
      status: 'pending',
      customer: 'Emily Davis',
      customerPhone: '+1234567892',
      customerEmail: 'emily@example.com',
      recipient: 'David Wilson',
      recipientPhone: '+1234567893',
      pickupAddress: '789 Pine St, Manhattan, NY 10002',
      deliveryAddress: '321 Cedar Ave, Queens, NY 11101',
      parcelType: 'fragile',
      weight: 1.8,
      value: 300.00,
      paymentType: 'prepaid',
      serviceType: 'standard',
      cost: 25.99,
      agentId: null,
      agentName: null,
      createdAt: '2024-01-16T08:45:00Z',
      estimatedDelivery: '2024-01-19T17:00:00Z',
      priority: 'medium'
    },
    {
      id: 'CP001236',
      trackingNumber: 'CP001236567892',
      status: 'delivered',
      customer: 'Lisa Brown',
      customerPhone: '+1234567894',
      customerEmail: 'lisa@example.com',
      recipient: 'Mark Johnson',
      recipientPhone: '+1234567895',
      pickupAddress: '654 Elm St, Bronx, NY 10451',
      deliveryAddress: '987 Maple Ave, Staten Island, NY 10301',
      parcelType: 'electronics',
      weight: 3.2,
      value: 500.00,
      paymentType: 'prepaid',
      serviceType: 'overnight',
      cost: 49.99,
      agentId: 'agent2',
      agentName: 'Sarah Connor',
      createdAt: '2024-01-14T16:20:00Z',
      estimatedDelivery: '2024-01-15T12:00:00Z',
      actualDelivery: '2024-01-15T11:30:00Z',
      priority: 'high'
    }
  ];

  const agents = [
    { id: 'agent1', name: 'Mike Wilson', phone: '+1234567896', activeDeliveries: 3 },
    { id: 'agent2', name: 'Sarah Connor', phone: '+1234567897', activeDeliveries: 2 },
    { id: 'agent3', name: 'Tom Anderson', phone: '+1234567898', activeDeliveries: 1 },
    { id: 'agent4', name: 'Lisa Garcia', phone: '+1234567899', activeDeliveries: 0 }
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
        return <User className="h-5 w-5 text-orange-500" />;
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

  const assignAgent = (parcelId, agentId) => {
    console.log(`Assigning agent ${agentId} to parcel ${parcelId}`);
    setShowAssignModal(false);
    // Here you would make an API call to assign the agent
  };

  const exportParcels = () => {
    console.log('Exporting parcels...');
    // Here you would implement CSV/PDF export functionality
  };

  const filteredParcels = parcels.filter(parcel => {
    const matchesSearch = parcel.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parcel.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        <h1 className="text-3xl font-bold text-gray-900">Parcel Management</h1>
        <p className="text-gray-600 mt-2">Monitor and manage all parcel deliveries</p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
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
          <button
            onClick={exportParcels}
            className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>

          {/* Results Count */}
          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-600">
              {filteredParcels.length} of {parcels.length} parcels
            </span>
          </div>
        </div>
      </div>

      {/* Parcels Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Parcel</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Customer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Agent</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Payment</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredParcels.map((parcel) => (
                <tr key={parcel.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{getParcelTypeIcon(parcel.parcelType)}</span>
                      <div>
                        <p className="font-medium text-gray-900">{parcel.trackingNumber}</p>
                        <p className="text-sm text-gray-500">to {parcel.recipient}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(parcel.priority)}`}>
                            {parcel.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{parcel.customer}</p>
                      <p className="text-sm text-gray-500">{parcel.customerPhone}</p>
                      <p className="text-sm text-gray-500">{parcel.customerEmail}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(parcel.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(parcel.status)}`}>
                        {parcel.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {parcel.agentName ? (
                      <div>
                        <p className="font-medium text-gray-900">{parcel.agentName}</p>
                        <p className="text-sm text-gray-500">Assigned</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedParcel(parcel);
                          setShowAssignModal(true);
                        }}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                      >
                        <UserPlus className="h-4 w-4" />
                        <span className="text-sm">Assign</span>
                      </button>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        parcel.paymentType === 'cod' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {parcel.paymentType.toUpperCase()}
                      </span>
                      <p className="text-sm text-gray-900 mt-1">${parcel.cost}</p>
                      {parcel.paymentType === 'cod' && (
                        <p className="text-sm text-orange-600">COD: ${parcel.codAmount}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm text-gray-900">
                        {new Date(parcel.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Est: {new Date(parcel.estimatedDelivery).toLocaleDateString()}
                      </p>
                      {parcel.actualDelivery && (
                        <p className="text-sm text-green-600">
                          Delivered: {new Date(parcel.actualDelivery).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Track">
                        <MapPin className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredParcels.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No parcels found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'No parcels have been created yet'
              }
            </p>
          </div>
        )}
      </div>

      {/* Assign Agent Modal */}
      {showAssignModal && selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Assign Agent to {selectedParcel.trackingNumber}
            </h3>
            <div className="space-y-3 mb-6">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => assignAgent(selectedParcel.id, agent.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{agent.name}</p>
                      <p className="text-sm text-gray-500">{agent.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {agent.activeDeliveries} active
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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

export default AdminParcels;