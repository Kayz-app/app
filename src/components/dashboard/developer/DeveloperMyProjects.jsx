import React from 'react';

// --- INLINED HELPERS --- //
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
// --- END OF INLINED HELPERS --- //

const DeveloperMyProjects = ({ projects = [], onManageProject }) => {
    return (
         <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">My Projects</h2>
             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Funding Goal</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Raised</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {projects.length > 0 ? (
                            projects.map(project => (
                                 <tr key={project.id}>
                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.title} ({project.tokenTicker})</td>
                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(project.fundingGoal)}</td>
                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(project.amountRaised)}</td>
                                     <td className="px-6 py-4 whitespace-nowrap">
                                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                             project.status === 'active' ? 'bg-green-100 text-green-800' :
                                             project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                             project.status === 'funded' ? 'bg-blue-100 text-blue-800' :
                                             'bg-gray-100 text-gray-800'
                                         }`}>
                                             {project.status}
                                         </span>
                                     </td>
                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                         <button onClick={() => onManageProject(project.id)} className="text-indigo-600 hover:text-indigo-900">Manage</button>
                                     </td>
                                 </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                    You have not created any projects yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeveloperMyProjects;

