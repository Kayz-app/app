import React, { useState } from 'react';

// --- INLINED COMPONENTS & ICONS --- //
const ProjectCard = ({ project, onViewDetails }) => {
    const progress = (project.amountRaised / project.fundingGoal) * 100;

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
            <div className="relative">
                <img className="h-56 w-full object-cover" src={project.imageUrl} alt={project.title} />
                 <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                    {project.apy}% APY
                </div>
            </div>
            <div className="p-6">
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">{project.location}</p>
                <h3 className="mt-2 text-xl font-bold text-gray-900">{project.title} ({project.tokenTicker})</h3>
                <p className="mt-2 text-gray-600 h-12 overflow-hidden">{project.description.substring(0, 80)}...</p>
                
                <div className="mt-4">
                     <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                <div className="mt-6 flex justify-between items-center text-sm text-gray-800">
                    <button onClick={() => onViewDetails(project)} className="w-full font-semibold text-white bg-indigo-600 hover:bg-indigo-800 transition-colors py-2 rounded-md">
                        Invest Now
                    </button>
                </div>
            </div>
        </div>
    );
};

// NOTE: This component depends on ProjectDetailsPage, which should be in its own file.
// For simplicity here, it's a placeholder.
const ProjectDetailsPage = (props) => (
    <div>
        <button onClick={props.onBack}>&larr; Back to Properties</button>
        <h1 className="text-2xl font-bold mt-4">{props.project.title}</h1>
        <p>Full project details would be rendered here.</p>
    </div>
);


const PropertiesMarket = ({ projects, currentUser, onInvest }) => {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleViewDetails = (project) => {
        setSelectedProject(project);
    };

    const handleBack = () => {
        setSelectedProject(null);
    };

    if (selectedProject) {
        return <ProjectDetailsPage project={selectedProject} onBack={handleBack} currentUser={currentUser} onInvest={onInvest} />;
    }

    // Add a guard clause to handle the loading state
    if (!projects) {
        return <div className="text-center p-8">Loading properties...</div>;
    }
    
    const activeProjects = projects.filter(p => p.status === 'active' || p.status === 'funded');
    return (
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Available Properties for Investment</h2>
            <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {activeProjects.map(project => (
                    <ProjectCard key={project.id} project={project} onViewDetails={handleViewDetails} />
                ))}
                 {activeProjects.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        <p>There are currently no active properties available for investment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertiesMarket;

