import React from 'react';

const StatCard = ({ icon, title, value, color }) => {
    const colorClasses = {
        indigo: 'bg-indigo-100 text-indigo-600',
        green: 'bg-green-100 text-green-600',
        blue: 'bg-blue-100 text-blue-600',
        red: 'bg-red-100 text-red-600',
    };
    
    return (
        <div className="bg-white p-5 rounded-lg shadow flex items-start">
            <div className={`p-3 rounded-full mr-4 ${colorClasses[color]}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;
