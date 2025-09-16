import React, { useState } from 'react';

// --- INLINED HELPERS & ICONS --- //
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
// --- END --- //

const AdminProjectApprovals = ({ projects = [], onUpdateProjectStatus }) => {
    const [viewingProject, setViewingProject] = useState(null);
    const [activeSubTab, setActiveSubTab] = useState('Pending');

    if (viewingProject) {
        return (
            <AdminProjectDetails 
                project={viewingProject}
                onUpdateProjectStatus={onUpdateProjectStatus}
                onBack={() => setViewingProject(null)}
            />
        );
    }
    
    const pendingProjects = projects.filter(p => p.status === 'pending');
    const approvedProjects = projects.filter(p => ['active', 'funded', 'completed'].includes(p.status));

    const renderTable = (projectList, isPending) => (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Developer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{isPending ? 'Funding Goal' : 'Funding Progress'}</th>
                        {!isPending && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                     {projectList.map(project => (
                         <tr key={project.id}>
                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.title} ({project.tokenTicker})</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.developerName}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {isPending ? formatCurrency(project.fundingGoal) : `${formatCurrency(project.amountRaised)} / ${formatCurrency(project.fundingGoal)}`}
                             </td>
                             {!isPending && (
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        project.status === 'active' ? 'bg-green-100 text-green-800' :
                                        project.status === 'funded' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {project.status}
                                    </span>
                                </td>
                             )}
                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                 <button onClick={() => setViewingProject(project)} className="text-indigo-600 hover:text-indigo-900">{isPending ? 'View Details' : 'Monitor'}</button>
                             </td>
                         </tr>
                    ))}
                    {projectList.length === 0 && (
                         <tr><td colSpan={isPending ? 4 : 5} className="text-center py-8 text-gray-500">{isPending ? 'No projects are pending approval.' : 'No projects have been approved yet.'}</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Project Management</h2>
            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-6">
                    <button onClick={() => setActiveSubTab('Pending')} className={`${activeSubTab === 'Pending' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500'} py-4 px-1 border-b-2 font-medium text-sm`}>
                        Pending Approvals
                        {pendingProjects.length > 0 && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">{pendingProjects.length}</span>}
                    </button>
                    <button onClick={() => setActiveSubTab('Approved')} className={`${activeSubTab === 'Approved' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500'} py-4 px-1 border-b-2 font-medium text-sm`}>
                        Approved Projects
                    </button>
                </nav>
            </div>
            {activeSubTab === 'Pending' ? renderTable(pendingProjects, true) : renderTable(approvedProjects, false)}
        </div>
    );
};

// Placeholder for AdminProjectDetails to avoid import error if it's in another file
const AdminProjectDetails = ({ project, onUpdateProjectStatus, onBack }) => (
    <div>
        <h2>Details for {project.title}</h2>
        <button onClick={onBack}>Back</button>
        <button onClick={() => onUpdateProjectStatus(project.id, 'active')}>Approve</button>
        <button onClick={() => onUpdateProjectStatus(project.id, 'rejected')}>Reject</button>
    </div>
);

export default AdminProjectApprovals;
