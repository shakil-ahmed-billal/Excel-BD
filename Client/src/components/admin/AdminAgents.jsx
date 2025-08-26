import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  MapPin,
  Phone,
  Mail,
  Package,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  Activity
} from 'lucide-react';

const AdminAgents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data - replace with actual API calls
  const agents = [
    {
      id: 'agent1',
      name: 'Mike Wilson',
      email: 'mike.wilson@courierpro.com',
      phone: '+1234567896',
      isActive: true,
      rating: 4.8,
      totalDeliveries: 245,
      completedToday: 8,
      assignedParcels: 3,
      currentLocation: { lat: 40.7128, lng: -74.0060, address: 'Manhattan, NY' },
      joinedDate: '2023-06-15',
      performance: {
        onTimeDeliveries: 92,
        customerRating: 4.8,
        totalEarnings: 2450.00,
        thisMonthEarnings: 450.00
      },
      recentDeliveries: [
        { id: 'CP001234', status: 'delivered', time: '2 hours ago' },
        { id: 'CP001235', status: 'in_transit', time: '4 hours ago' },
        { id: 'CP001236', status: 'delivered', time: '6 hours ago' }
      ]
    },
    {
      id: 'agent2',
      name: 'Sarah Connor',
      email: 'sarah.connor@courierpro.com',
      phone: '+1234567897',
      isActive: true,
      rating: 4.9,
      totalDeliveries: 189,
      completedToday: 6,
      assignedParcels: 2,
      currentLocation: { lat: 40.6782, lng: -73.9442, address: 'Brooklyn, NY' },
      joinedDate: '2023-08-20',
      performance: {
        onTimeDeliveries: 95,
        customerRating: 4.9,
        totalEarnings: 1890.00,
        thisMonthEarnings: 380.00
      },
      recentDeliveries: [
        { id: 'CP001237', status: 'delivered', time: '1 hour ago' },
        { id: 'CP001238', status: 'picked_up', time: '3 hours ago' }
      ]
    },
    {
      id: 'agent3',
      name: 'Tom Anderson',
      email: 'tom.anderson@courierpro.com',
      phone: '+1234567898',
      isActive: false,
      rating: 4.6,
      totalDeliveries: 156,
      completedToday: 0,
      assignedParcels: 1,
      currentLocation: { lat: 40.7589, lng: -73.9851, address: 'Times Square, NY' },
      joinedDate: '2023-09-10',
      performance: {
        onTimeDeliveries: 88,
        customerRating: 4.6,
        totalEarnings: 1560.00,
        thisMonthEarnings: 120.00
      },
      recentDeliveries: [
        { id: 'CP001239', status: 'assigned', time: '8 hours ago' }
      ]
    },
    {
      id: 'agent4',
      name: 'Lisa Garcia',
      email: 'lisa.garcia@courierpro.com',
      phone: '+1234567899',
      isActive: true,
      rating: 4.7,
      totalDeliveries: 203,
      completedToday: 5,
      assignedParcels: 0,
      currentLocation: { lat: 40.8176, lng: -73.9182, address: 'Bronx, NY' },
      joinedDate: '2023-07-05',
      performance: {
        onTimeDeliveries: 90,
        customerRating: 4.7,
        totalEarnings: 2030.00,
        thisMonthEarnings: 320.00
      },
      recentDeliveries: [
        { id: 'CP001240', status: 'delivered', time: '30 minutes ago' },
        { id: 'CP001241', status: 'delivered', time: '2 hours ago' }
      ]
    }
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && agent.isActive) ||
                         (statusFilter === 'inactive' && !agent.isActive);
    return matchesSearch && matchesStatus;
  });

  const viewAgentDetails = (agent) => {
    setSelectedAgent(agent);
    setShowModal(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agent Management</h1>
            <p className="text-gray-600 mt-2">Manage delivery agents and their performance</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Agent</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Agents</p>
              <p className="text-2xl font-bold text-gray-900">{agents.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Agents</p>
              <p className="text-2xl font-bold text-gray-900">{agents.filter(a => a.isActive).length}</p>
            </div>
            <Activity className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {(agents.reduce((sum, agent) => sum + agent.rating, 0) / agents.length).toFixed(1)}
              </p>
            </div>
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Deliveries</p>
              <p className="text-2xl font-bold text-gray-900">
                {agents.reduce((sum, agent) => sum + agent.totalDeliveries, 0)}
              </p>
            </div>
            <Package className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search agents..."
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
              <option value="all">All Agents</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-600">
              {filteredAgents.length} of {agents.length} agents
            </span>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${agent.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className={`text-xs font-medium ${agent.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                        {agent.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-900">{agent.rating}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{agent.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{agent.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{agent.currentLocation.address}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-lg font-bold text-blue-600">{agent.totalDeliveries}</p>
                  <p className="text-xs text-blue-600">Total Deliveries</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-lg font-bold text-green-600">{agent.completedToday}</p>
                  <p className="text-xs text-green-600">Today</p>
                </div>
              </div>

              {/* Performance Indicators */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">On-time Deliveries</span>
                  <span className="font-medium text-gray-900">{agent.performance.onTimeDeliveries}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${agent.performance.onTimeDeliveries}%` }}
                  />
                </div>
              </div>

              {/* Current Status */}
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-gray-600">Assigned Parcels</span>
                <span className={`font-medium ${agent.assignedParcels > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                  {agent.assignedParcels} parcels
                </span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => viewAgentDetails(agent)}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'No agents have been added yet'
            }
          </p>
        </div>
      )}

      {/* Agent Details Modal */}
      {showModal && selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedAgent.name}</h2>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-2">
                        <span className={`w-3 h-3 rounded-full ${selectedAgent.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                        <span className={`text-sm font-medium ${selectedAgent.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                          {selectedAgent.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-900">{selectedAgent.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contact & Basic Info */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedAgent.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedAgent.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedAgent.currentLocation.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Joined Date</span>
                        <span className="text-sm font-medium text-gray-900">
                          {new Date(selectedAgent.joinedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Deliveries</span>
                        <span className="text-sm font-medium text-gray-900">{selectedAgent.totalDeliveries}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Completed Today</span>
                        <span className="text-sm font-medium text-gray-900">{selectedAgent.completedToday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Assigned Parcels</span>
                        <span className="text-sm font-medium text-gray-900">{selectedAgent.assignedParcels}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">On-time Deliveries</span>
                          <span className="text-sm font-medium text-gray-900">{selectedAgent.performance.onTimeDeliveries}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${selectedAgent.performance.onTimeDeliveries}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Customer Rating</span>
                          <span className="text-sm font-medium text-gray-900">{selectedAgent.performance.customerRating}/5</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full" 
                            style={{ width: `${(selectedAgent.performance.customerRating / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Earnings</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Earnings</span>
                        <span className="text-sm font-medium text-gray-900">${selectedAgent.performance.totalEarnings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">This Month</span>
                        <span className="text-sm font-medium text-green-600">${selectedAgent.performance.thisMonthEarnings}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Recent Deliveries</h3>
                    <div className="space-y-3">
                      {selectedAgent.recentDeliveries.map((delivery, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              delivery.status === 'delivered' ? 'bg-green-500' :
                              delivery.status === 'in_transit' ? 'bg-blue-500' :
                              delivery.status === 'picked_up' ? 'bg-purple-500' :
                              'bg-gray-400'
                            }`} />
                            <span className="text-sm text-gray-900">{delivery.id}</span>
                          </div>
                          <div className="text-right">
                            <p className={`text-xs font-medium capitalize ${
                              delivery.status === 'delivered' ? 'text-green-600' :
                              delivery.status === 'in_transit' ? 'text-blue-600' :
                              delivery.status === 'picked_up' ? 'text-purple-600' :
                              'text-gray-600'
                            }`}>
                              {delivery.status.replace('_', ' ')}
                            </p>
                            <p className="text-xs text-gray-500">{delivery.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAgents;