
const MetricCard = ({ title, value, icon: Icon, trend, color }) => {
    const colorClasses = {
        blue: 'bg-blue-500 text-blue-600 bg-blue-50',
        green: 'bg-green-500 text-green-600 bg-green-50',
        orange: 'bg-orange-500 text-orange-600 bg-orange-50',
        red: 'bg-red-500 text-red-600 bg-red-50',
        purple: 'bg-purple-500 text-purple-600 bg-purple-50'
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                    {trend && (
                        <div className="flex items-center mt-2">
                            <span
                                className={`text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {trend.isPositive ? '+' : ''}{trend.value}%
                            </span>
                            <span className="text-xs text-gray-500 ml-1">vs last month</span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[color].split(' ')[2]}`}>
                    <Icon className={`h-6 w-6 ${colorClasses[color].split(' ')[1]}`} />
                </div>
            </div>
        </div>
    );
};

export default MetricCard;
