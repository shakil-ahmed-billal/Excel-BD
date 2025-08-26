import {
    BarChart3,
    DollarSign,
    Download,
    FileText,
    Filter,
    Package,
    TrendingUp,
    Users
} from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';


const AdminReports = () => {
    const [reportType, setReportType] = useState('overview');
    const [dateRange, setDateRange] = useState('month');
    const [exportFormat, setExportFormat] = useState('pdf');

    // Mock data for charts
    const dailyBookingsData = [
        { date: '2024-01-01', bookings: 45, deliveries: 38, revenue: 1250 },
        { date: '2024-01-02', bookings: 52, deliveries: 42, revenue: 1450 },
        { date: '2024-01-03', bookings: 48, deliveries: 45, revenue: 1320 },
        { date: '2024-01-04', bookings: 61, deliveries: 48, revenue: 1680 },
        { date: '2024-01-05', bookings: 55, deliveries: 52, revenue: 1520 },
        { date: '2024-01-06', bookings: 38, deliveries: 35, revenue: 1100 },
        { date: '2024-01-07', bookings: 42, deliveries: 38, revenue: 1200 }
    ];

    const statusDistribution = [
        { name: 'Delivered', value: 1089, color: '#059669' },
        { name: 'In Transit', value: 234, color: '#2563EB' },
        { name: 'Pending', value: 89, color: '#EA580C' },
        { name: 'Failed', value: 25, color: '#DC2626' }
    ];

    const agentPerformance = [
        { name: 'Mike Wilson', deliveries: 45, rating: 4.8, earnings: 450 },
        { name: 'Sarah Connor', deliveries: 38, rating: 4.9, earnings: 380 },
        { name: 'Tom Anderson', deliveries: 32, rating: 4.6, earnings: 320 },
        { name: 'Lisa Garcia', deliveries: 41, rating: 4.7, earnings: 410 }
    ];

    const revenueData = [
        { month: 'Jan', revenue: 12500, cod: 4500, prepaid: 8000 },
        { month: 'Feb', revenue: 15200, cod: 5200, prepaid: 10000 },
        { month: 'Mar', revenue: 18900, cod: 6900, prepaid: 12000 },
        { month: 'Apr', revenue: 16800, cod: 5800, prepaid: 11000 },
        { month: 'May', revenue: 21300, cod: 7300, prepaid: 14000 },
        { month: 'Jun', revenue: 19600, cod: 6600, prepaid: 13000 }
    ];

    const exportReport = () => {
        console.log(`Exporting ${reportType} report as ${exportFormat}`);
        // Here you would implement the actual export functionality
    };

    const generateReport = () => {
        console.log(`Generating ${reportType} report for ${dateRange}`);
        // Here you would implement the report generation
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-gray-600 mt-2">Generate comprehensive reports and analyze business performance</p>
            </div>

            {/* Report Controls */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                        >
                            <option value="overview">Business Overview</option>
                            <option value="deliveries">Delivery Performance</option>
                            <option value="revenue">Revenue Analysis</option>
                            <option value="agents">Agent Performance</option>
                            <option value="customers">Customer Analytics</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                        >
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="quarter">This Quarter</option>
                            <option value="year">This Year</option>
                            <option value="custom">Custom Range</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={exportFormat}
                            onChange={(e) => setExportFormat(e.target.value)}
                        >
                            <option value="pdf">PDF Report</option>
                            <option value="csv">CSV Data</option>
                            <option value="excel">Excel Spreadsheet</option>
                        </select>
                    </div>

                    <button
                        onClick={generateReport}
                        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                        <BarChart3 className="h-4 w-4" />
                        <span>Generate</span>
                    </button>

                    <button
                        onClick={exportReport}
                        className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                        <Download className="h-4 w-4" />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">$125,430</p>
                            <p className="text-sm text-green-600 mt-1">+15.3% from last month</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Deliveries</p>
                            <p className="text-2xl font-bold text-gray-900">1,437</p>
                            <p className="text-sm text-blue-600 mt-1">+8.7% from last month</p>
                        </div>
                        <Package className="h-8 w-8 text-blue-600" />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Success Rate</p>
                            <p className="text-2xl font-bold text-gray-900">94.2%</p>
                            <p className="text-sm text-green-600 mt-1">+2.1% from last month</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active Agents</p>
                            <p className="text-2xl font-bold text-gray-900">45</p>
                            <p className="text-sm text-orange-600 mt-1">+3 new this month</p>
                        </div>
                        <Users className="h-8 w-8 text-orange-600" />
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Daily Bookings Trend */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Bookings & Deliveries</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dailyBookingsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                            <YAxis />
                            <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
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
                    {/* <ResponsiveContainer width="100%" height={300}>
                        <RechartsPieChart>
                            <Pie
                                data={statusDistribution}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {statusDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </RechartsPieChart>
                    </ResponsiveContainer> */}
                </div>

                {/* Revenue Analysis */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="prepaid" stackId="a" fill="#059669" name="Prepaid" />
                            <Bar dataKey="cod" stackId="a" fill="#EA580C" name="COD" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Agent Performance */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Agents</h3>
                    <div className="space-y-4">
                        {agentPerformance.map((agent, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{agent.name}</p>
                                        <p className="text-sm text-gray-500">{agent.deliveries} deliveries</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center space-x-1 mb-1">
                                        <span className="text-sm font-medium text-gray-900">{agent.rating}</span>
                                        <span className="text-yellow-500">★</span>
                                    </div>
                                    <p className="text-sm text-green-600 font-medium">${agent.earnings}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detailed Reports Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Detailed Analytics</h3>
                        <div className="flex space-x-2">
                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                <Filter className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                <FileText className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-6 font-medium text-gray-900">Metric</th>
                                <th className="text-left py-3 px-6 font-medium text-gray-900">Current Period</th>
                                <th className="text-left py-3 px-6 font-medium text-gray-900">Previous Period</th>
                                <th className="text-left py-3 px-6 font-medium text-gray-900">Change</th>
                                <th className="text-left py-3 px-6 font-medium text-gray-900">Trend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="py-4 px-6 font-medium text-gray-900">Total Bookings</td>
                                <td className="py-4 px-6 text-gray-600">1,248</td>
                                <td className="py-4 px-6 text-gray-600">1,089</td>
                                <td className="py-4 px-6 text-green-600 font-medium">+14.6%</td>
                                <td className="py-4 px-6">
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-medium text-gray-900">Successful Deliveries</td>
                                <td className="py-4 px-6 text-gray-600">1,176</td>
                                <td className="py-4 px-6 text-gray-600">1,025</td>
                                <td className="py-4 px-6 text-green-600 font-medium">+14.7%</td>
                                <td className="py-4 px-6">
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-medium text-gray-900">Failed Deliveries</td>
                                <td className="py-4 px-6 text-gray-600">25</td>
                                <td className="py-4 px-6 text-gray-600">32</td>
                                <td className="py-4 px-6 text-green-600 font-medium">-21.9%</td>
                                <td className="py-4 px-6">
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-medium text-gray-900">Average Delivery Time</td>
                                <td className="py-4 px-6 text-gray-600">2.3 days</td>
                                <td className="py-4 px-6 text-gray-600">2.7 days</td>
                                <td className="py-4 px-6 text-green-600 font-medium">-14.8%</td>
                                <td className="py-4 px-6">
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-medium text-gray-900">Customer Satisfaction</td>
                                <td className="py-4 px-6 text-gray-600">4.7/5</td>
                                <td className="py-4 px-6 text-gray-600">4.5/5</td>
                                <td className="py-4 px-6 text-green-600 font-medium">+4.4%</td>
                                <td className="py-4 px-6">
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                </td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-medium text-gray-900">COD Collection Rate</td>
                                <td className="py-4 px-6 text-gray-600">96.8%</td>
                                <td className="py-4 px-6 text-gray-600">94.2%</td>
                                <td className="py-4 px-6 text-green-600 font-medium">+2.8%</td>
                                <td className="py-4 px-6">
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;