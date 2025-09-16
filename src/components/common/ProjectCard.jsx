import React from 'react';

// Inlined helper functions and icon components to resolve import errors.
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

const ClockIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrendingUpIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ProjectCard = ({ project, onViewDetails }) => {
    // Add a guard clause to handle cases where the project prop might be undefined.
    if (!project) {
        // This renders a placeholder/skeleton card to prevent crashes and improve UX.
        return (
            <div className="rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col bg-gray-50 animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-4 flex-grow flex flex-col">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
                    <div className="h-2 bg-gray-300 rounded w-full my-4"></div>
                    <div className="mt-auto pt-4">
                         <div className="h-10 bg-gray-300 rounded w-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    const fundingPercentage = (project.currentFunding / project.fundingGoal) * 100;
    const isFunded = project.status === 'funded';
    const cardColorClass = isFunded ? 'bg-green-50' : 'bg-white';
    
    return (
        <div className={`rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col transition-transform hover:scale-105 ${cardColorClass}`}>
            <div className="relative">
                <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                {isFunded && (
                     <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">FUNDED</div>
                )}
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-gray-800">{project.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{project.location}</p>

                <div className="flex justify-between items-center my-3 text-sm">
                    <div className="flex items-center">
                        <TrendingUpIcon className="w-4 h-4 mr-1 text-green-500" />
                        <span className="font-semibold text-gray-700">{project.expectedApy}% APY</span>
                    </div>
                     <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1 text-blue-500" />
                        <span className="font-semibold text-gray-700">{project.term} Years</span>
                    </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${fundingPercentage}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                    <span>{formatCurrency(project.currentFunding)}</span>
                    <span>{formatCurrency(project.fundingGoal)}</span>
                </div>
                
                <div className="mt-auto pt-4">
                     <button 
                        onClick={() => onViewDetails(project)}
                        disabled={isFunded}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isFunded ? 'Fully Funded' : 'View Details'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;

