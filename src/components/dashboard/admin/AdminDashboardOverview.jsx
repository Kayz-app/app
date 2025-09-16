import React from 'react';

// Inlined components and icons to resolve import errors.
const BuildingIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
);
const UserIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
    </svg>
);
const DollarSignIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182.553-.44 1.282-.659 2.003-.659.725 0 1.45.22 2.003.659l.879.659m0-4.879l-1.124-1.316a1.125 1.125 0 00-1.745 0l-1.124 1.316m11.358 4.879l-1.124-1.316a1.125 1.125 0 00-1.745 0l-1.124 1.316m0 0l-1.124 1.316a1.125 1.125 0 000 1.745l1.124 1.316m3.49-4.879l1.124 1.316a1.125 1.125 0 010 1.745l-1.124 1.316m0 0l-1.124 1.316a1.125 1.125 0 01-1.745 0l-1.124-1.316m-3.49 4.879l-1.124 1.316a1.125 1.125 0 01-1.745 0l-1.124-1.316" />
    </svg>
);
const ShieldCheckIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);

const StatCard = ({ title, value, icon, color }) => (
    <div className={`${color} text-white p-6 rounded-lg shadow-lg`}>
        <div className="flex items-center">
            <div className="flex-shrink-0">{icon}</div>
            <div className="ml-5 w-0 flex-1">
                <dl>
                    <dt className="text-sm font-medium text-gray-200 truncate">{title}</dt>
                    <dd className="text-2xl font-bold">{value}</dd>
                </dl>
            </div>
        </div>
    </div>
);


const AdminDashboardOverview = ({ projects, users }) => {
    if (!projects || !users) {
        return <div className="text-center p-8">Loading dashboard data...</div>;
    }

    const totalProjects = projects.length;
    const totalUsers = users.length;
    const totalPlatformValue = projects.reduce((sum, project) => sum + project.fundingGoal, 0);
    const pendingKyc = users.filter(u => u.kycStatus === 'Pending').length;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Admin Overview</h1>
                <p className="text-gray-500">Platform-wide statistics and key metrics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={totalUsers}
                    icon={<UserIcon className="h-6 w-6 text-white" />}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Total Projects"
                    value={totalProjects}
                    icon={<BuildingIcon className="h-6 w-6 text-white" />}
                    color="bg-indigo-500"
                />
                <StatCard
                    title="Total Platform Value"
                    value={`$${(totalPlatformValue / 1000000).toFixed(2)}M`}
                    icon={<DollarSignIcon className="h-6 w-6 text-white" />}
                    color="bg-green-500"
                />
                 <StatCard
                    title="Pending KYC Verifications"
                    value={pendingKyc}
                    icon={<ShieldCheckIcon className="h-6 w-6 text-white" />}
                    color="bg-yellow-500"
                    />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Users</h3>
                    <ul className="divide-y divide-gray-200">
                        {users.slice(-5).reverse().map(user => (
                            <li key={user.id} className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                                <span className="text-sm text-gray-600 capitalize">{user.type}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Projects Awaiting Approval</h3>
                     <ul className="divide-y divide-gray-200">
                        {projects.filter(p => p.status === 'pending').slice(0, 5).map(project => (
                             <li key={project.id} className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{project.title}</p>
                                    <p className="text-sm text-gray-500">Goal: ${project.fundingGoal.toLocaleString()}</p>
                                </div>
                                <button className="text-sm text-indigo-600 font-semibold hover:underline">Review</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardOverview;

