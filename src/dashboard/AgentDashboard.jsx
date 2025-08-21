import {
    AlertCircle,
    CheckCircle,
    Clock,
    MapPin,
    Navigation,
    Package,
    Route
} from 'lucide-react';
import MetricCard from '../components/MetricCard';

const AgentDashboard = () => {
    // Mock data
    const agentStats = {
        assignedParcels: 8,
        completedToday: 5,
        pendingPickups: 3,
        totalEarnings: 245.50
    };

    const assignedParcels = [
        {
            id: 'CP001234',
            trackingNumber: 'CP001234567890',
            status: 'assigned',
            customer: 'John Smith',
            phone: '+1234567890',
            pickupAddress: '123 Main St, New York, NY',
            deliveryAddress: '456 Oak Ave, Brooklyn, NY',
            priority: 'high',
            estimatedTime: '2:30 PM',
            codAmount: 45.00
        },
        {
            id: 'CP001235',
            trackingNumber: 'CP001235567891',
            status: 'picked_up',
            customer: 'Sarah Johnson',
            phone: '+1234567891',
            pickupAddress: '789 Pine St, Manhattan, NY',
            deliveryAddress: '321 Cedar Ave, Queens, NY',
            priority: 'medium',
            estimatedTime: '4:15 PM',
            codAmount: 0
        },
        {
            id: 'CP001236',
            trackingNumber: 'CP001236567892',
            status: 'assigned',
            customer: 'Mike Wilson',
            phone: '+1234567892',
            pickupAddress: '654 Elm St, Bronx, NY',
            deliveryAddress: '987 Maple Ave, Staten Island, NY',
            priority: 'low',
            estimatedTime: '6:00 PM',
            codAmount: 75.25
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'assigned':
                return 'bg-blue-100 text-blue-800';
            case 'picked_up':
                return 'bg-purple-100 text-purple-800';
            case 'in_transit':
                return 'bg-orange-100 text-orange-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const updateParcelStatus = (parcelId, newStatus) => {
        // Mock status update - replace with actual API call
        console.log(`Updating parcel ${parcelId} to ${newStatus}`);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage your assigned deliveries and track your performance</p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                    title="Assigned Today"
                    value={agentStats.assignedParcels}
                    icon={Package}
                    color="blue"
                />
                <MetricCard
                    title="Completed Today"
                    value={agentStats.completedToday}
                    icon={CheckCircle}
                    color="green"
                />
                <MetricCard
                    title="Pending Pickups"
                    value={agentStats.pendingPickups}
                    icon={Clock}
                    color="orange"
                />
                <MetricCard
                    title="Today's Earnings"
                    value={`$${agentStats.totalEarnings}`}
                    icon={Package}
                    color="purple"
                />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group">
                    <div className="flex items-center space-x-4">
                        <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-colors">
                            <Route className="h-6 w-6" />
                        </div>
                        <div className="text-left">
                            <h3 className="text-lg font-semibold">Optimize Route</h3>
                            <p className="text-blue-100">Get the best delivery route</p>
                        </div>
                    </div>
                </button>

                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group">
                    <div className="flex items-center space-x-4">
                        <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-colors">
                            <Navigation className="h-6 w-6" />
                        </div>
                        <div className="text-left">
                            <h3 className="text-lg font-semibold">Start Navigation</h3>
                            <p className="text-green-100">Navigate to next delivery</p>
                        </div>
                    </div>
                </button>
            </div>

            {/* Assigned Parcels */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Assigned Parcels</h2>
                    <span className="text-sm text-gray-500">{assignedParcels.length} parcels</span>
                </div>

                <div className="space-y-4">
                    {assignedParcels.map((parcel) => (
                        <div
                            key={parcel.id}
                            className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="font-medium text-gray-900">{parcel.trackingNumber}</h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(parcel.status)}`}>
                                            {parcel.status.replace('_', ' ')}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(parcel.priority)}`}>
                                            {parcel.priority} priority
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">Customer: {parcel.customer}</p>
                                    <p className="text-sm text-gray-600">Phone: {parcel.phone}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">ETA: {parcel.estimatedTime}</p>
                                    {parcel.codAmount > 0 && (
                                        <p className="text-sm text-green-600 font-medium">COD: ${parcel.codAmount}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <div className="flex space-x-2">
                                    {parcel.status === 'assigned' && (
                                        <button
                                            onClick={() => updateParcelStatus(parcel.id, 'picked_up')}
                                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Mark Picked Up
                                        </button>
                                    )}
                                    {parcel.status === 'picked_up' && (
                                        <button
                                            onClick={() => updateParcelStatus(parcel.id, 'in_transit')}
                                            className="px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
                                        >
                                            In Transit
                                        </button>
                                    )}
                                    {parcel.status === 'in_transit' && (
                                        <button
                                            onClick={() => updateParcelStatus(parcel.id, 'delivered')}
                                            className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Mark Delivered
                                        </button>
                                    )}
                                </div>
                                <div className="flex space-x-2">
                                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Navigation className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                                        <AlertCircle className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {assignedParcels.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No parcels assigned</h3>
                        <p className="text-gray-500">Check back later for new assignments</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgentDashboard;