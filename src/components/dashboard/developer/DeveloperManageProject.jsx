import React, { useState } from 'react';

// --- INLINED ICONS & COMPONENTS --- //
const ArrowLeftIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);
const DollarSignIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const CheckCircleIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const BuildingIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16"/><path d="M2 11h20"/><path d="M3 22V6l8-4 8 4v16"/><path d="M15 22V11l-7-3.5L1 11v11"/><path d="M11 22V11"/><path d="m11 6.5-4 2"/><path d="m19 6.5-4 2"/></svg>
);
const WalletIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h12v-6"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>
);
const WalletModal = ({ children, ...props }) => <div>{children}</div>;
const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className="bg-indigo-100 text-indigo-600 rounded-full p-3 mr-4">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
// --- END OF INLINED COMPONENTS --- //

const DeveloperManageProject = ({ project, onBack }) => {
    const [modalOpen, setModalOpen] = useState(false);

    // Guard clause to prevent crash if project data is not yet available.
    if (!project) {
        return (
            <div>
                <button onClick={onBack} className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    Back to Projects
                </button>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800">Loading project details...</h2>
                </div>
            </div>
        );
    }

    const isFullyFunded = project.amountRaised >= project.fundingGoal;
    const monthlyApyCost = (project.amountRaised * (project.apy / 100)) / 12;
    const listingFee = project.amountRaised * 0.03;
    const netWithdrawal = project.amountRaised - listingFee;

    const handleWithdraw = () => {
        alert(`Initiating withdrawal...\n\nTotal Raised: ${formatCurrency(project.amountRaised)}\nPlatform Fee (3%): -${formatCurrency(listingFee)}\n\nNet Payout to Treasury: ${formatCurrency(netWithdrawal)}`);
    };

    return (
        <div>
             <button onClick={onBack} className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Projects
            </button>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{project.title} ({project.tokenTicker})</h2>
                        <p className="text-gray-500">{project.location}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Project APY</p>
                        <p className="text-2xl font-bold text-green-600">{project.apy}%</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Raised" value={formatCurrency(project.amountRaised)} icon={<DollarSignIcon className="w-6 h-6" />} />
                <StatCard title="Funding Goal" value={formatCurrency(project.fundingGoal)} icon={<CheckCircleIcon className="w-6 h-6" />} />
                <StatCard title="Tokens Minted" value={`${project.amountRaised.toLocaleString()} / ${project.tokenSupply.toLocaleString()}`} icon={<BuildingIcon className="w-6 h-6" />} />
                <StatCard title="APY Wallet Balance" value={formatCurrency(project.projectWalletBalance)} icon={<WalletIcon className="w-6 h-6" />} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                 <h3 className="text-xl font-bold text-gray-800 mb-6">Project Actions</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="border p-6 rounded-lg">
                        <h4 className="font-bold text-lg mb-2">APY Distribution</h4>
                        <p className="text-sm text-gray-600 mb-4">Fund the project wallet to pay monthly returns to your investors.</p>
                        <div className="text-sm mb-4">
                            <p><strong>Est. Monthly APY Cost:</strong> {formatCurrency(monthlyApyCost)}</p>
                        </div>
                        <button onClick={() => setModalOpen(true)} className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-medium">
                            Deposit Funds to APY Wallet
                        </button>
                    </div>

                    <div className="border p-6 rounded-lg">
                        <h4 className="font-bold text-lg mb-2">Capital Management</h4>
                        <p className="text-sm text-gray-600 mb-4">Once funded, withdraw the capital to begin development.</p>
                        <div className="text-sm mb-4 bg-gray-50 p-3 rounded-md border">
                            <div className="flex justify-between"><span>Net Payout:</span> <strong>{formatCurrency(netWithdrawal)}</strong></div>
                        </div>
                        <button 
                            disabled={!isFullyFunded}
                            onClick={handleWithdraw}
                            className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 font-medium disabled:bg-gray-300"
                        >
                            {isFullyFunded ? `Withdraw Funds` : 'Funding Goal Not Met'}
                        </button>
                    </div>
                 </div>
            </div>

             <WalletModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`Deposit to ${project.title} Wallet`}>
                 <p>Deposit functionality placeholder.</p>
             </WalletModal>
        </div>
    );
};

export default DeveloperManageProject;

