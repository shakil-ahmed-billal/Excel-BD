import {
    AlertCircle,
    Clock,
    DollarSign,
    Package,
    TrendingUp,
    Truck,
    Users
} from 'lucide-react';

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import MetricCard from '../components/MetricCard';

const AdminDashboard = () => {
    // Mock data - replace with actual API calls
    const metrics = {
        totalParcels: 1248,
        pendingParcels: 89,
        inTransitParcels: 234,
        deliveredParcels: 1089,
        failedParcels: 25,
        totalCOD: 48560,
        totalRevenue: 125430,
        activeAgents: 45
    };

    const chartData = [
        { name: 'Mon', bookings: 45, deliveries: 38 },
        { name: 'Tue', bookings: 52, deliveries: 42 },
        { name: 'Wed', bookings: 48, deliveries: 45 },
        { name: 'Thu', bookings: 61, deliveries: 48 },
        { name: 'Fri', bookings: 55, deliveries: 52 },
        { name: 'Sat', bookings: 38, deliveries: 35 },
        { name: 'Sun', bookings: 42, deliveries: 38 }
    ];

    const statusData = [
        { name: 'Delivered', value: 1089, color: '#059669' },
        { name: 'In Transit', value: 234, color: '#2563EB' },
        { name: 'Pending', value: 89, color: '#EA580C' },
        { name: 'Failed', value: 25, color: '#DC2626' }
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back! Here's your courier management overview.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                    title="Total Parcels"
                    value={metrics.totalParcels.toLocaleString()}
                    icon={Package}
                    trend={{ value: 12.5, isPositive: true }}
                    color="blue"
                />
                <MetricCard
                    title="Active Agents"
                    value={metrics.activeAgents}
                    icon={Truck}
                    trend={{ value: 8.2, isPositive: true }}
                    color="green"
                />
                <MetricCard
                    title="Pending Parcels"
                    value={metrics.pendingParcels}
                    icon={Clock}
                    trend={{ value: -5.1, isPositive: false }}
                    color="orange"
                />
                <MetricCard
                    title="Total Revenue"
                    value={`$${metrics.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    trend={{ value: 15.3, isPositive: true }}
                    color="purple"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Bookings vs Deliveries */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Performance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="bookings"
                                stroke="#2563EB"
                                strokeWidth={2}
                                name="Bookings"
                            />
                            <Line
                                type="monotone"
                                dataKey="deliveries"
                                stroke="#059669"
                                strokeWidth={2}
                                name="Deliveries"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Status Distribution */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Parcel Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={statusData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#2563EB" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Activity & Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Bookings */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                    <div className="space-y-4">
                        {[
                            { id: 'CP001234', customer: 'John Smith', status: 'pending', amount: '$45.00' },
                            { id: 'CP001235', customer: 'Sarah Johnson', status: 'in_transit', amount: '$67.50' },
                            { id: 'CP001236', customer: 'Mike Wilson', status: 'delivered', amount: '$32.25' },
                            { id: 'CP001237', customer: 'Emily Davis', status: 'picked_up', amount: '$58.75' }
                        ].map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="font-medium text-gray-900">{booking.id}</p>
                                        <p className="text-sm text-gray-500">{booking.customer}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                                                booking.status === 'picked_up' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {booking.status.replace('_', ' ')}
                                    </span>
                                    <span className="font-medium text-gray-900">{booking.amount}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                            <div className="flex items-center space-x-3">
                                <Users className="h-5 w-5 text-blue-600" />
                                <span className="text-sm font-medium text-blue-900">Manage Agents</span>
                            </div>
                        </button>
                        <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                            <div className="flex items-center space-x-3">
                                <Package className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-medium text-green-900">View All Parcels</span>
                            </div>
                        </button>
                        <button className="w-full text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                            <div className="flex items-center space-x-3">
                                <TrendingUp className="h-5 w-5 text-orange-600" />
                                <span className="text-sm font-medium text-orange-900">Generate Report</span>
                            </div>
                        </button>
                        <button className="w-full text-left p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                            <div className="flex items-center space-x-3">
                                <AlertCircle className="h-5 w-5 text-red-600" />
                                <span className="text-sm font-medium text-red-900">Failed Deliveries</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
