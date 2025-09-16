import React, { useMemo } from 'react';

const AdminCompliance = ({ users = {} }) => {
    const pendingKycUsers = useMemo(() => {
        return Object.values(users).filter(user => user.kycStatus === 'Pending' || user.kycStatus === 'Not Submitted');
    }, [users]);
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">KYC/AML Compliance Queue</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pendingKycUsers.map(user => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name} ({user.email})</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                         user.kycStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                     }`}>{user.kycStatus}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                     <button className="text-indigo-600 hover:text-indigo-900 text-xs">View Docs</button>
                                     <button className="bg-green-500 text-white px-3 py-1 rounded-md text-xs">Approve</button>
                                     <button className="bg-red-500 text-white px-3 py-1 rounded-md text-xs">Reject</button>
                                </td>
                            </tr>
                        ))}
                        {pendingKycUsers.length === 0 && (
                            <tr><td colSpan="3" className="text-center py-8 text-gray-500">No users pending KYC.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCompliance;
