import React, { useState } from 'react';

// --- INLINED PLACEHOLDER COMPONENTS --- //
// In the final application, you would import the actual components like this:
// import InvestorKycSettings from './InvestorKycSettings';
// import TwoFactorAuthSettings from './TwoFactorAuthSettings';

const PlaceholderComponent = ({ title, children }) => (
    <div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <div className="p-4 bg-gray-50 border rounded-md">
            {children || <p>This is a placeholder. The actual component content will be displayed here.</p>}
        </div>
    </div>
);

const InvestorKycSettings = ({ status }) => (
    <PlaceholderComponent title="KYC Verification">
        <p>Current KYC Status: <strong>{status || 'Not available'}</strong></p>
    </PlaceholderComponent>
);

const TwoFactorAuthSettings = ({ enabled }) => (
     <PlaceholderComponent title="Two-Factor Authentication (2FA)">
        <p>2FA is currently <strong>{enabled ? 'Enabled' : 'Disabled'}</strong>.</p>
    </PlaceholderComponent>
);
// --- END OF PLACEHOLDERS --- //


const InvestorSettings = ({ currentUser }) => {
    const [activeTab, setActiveTab] = useState('KYC');

    // Add a guard clause to prevent errors if currentUser data is not yet available.
    if (!currentUser) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-500">Loading user settings...</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Settings</h2>
            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('KYC')}
                        className={`${activeTab === 'KYC' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        KYC Verification
                    </button>
                    <button
                        onClick={() => setActiveTab('2FA')}
                        className={`${activeTab === '2FA' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        Two-Factor Auth
                    </button>
                </nav>
            </div>
            
            {/* Render the content based on the active tab */}
            <div>
                {activeTab === 'KYC' 
                    ? <InvestorKycSettings status={currentUser.kycStatus} /> 
                    : <TwoFactorAuthSettings enabled={currentUser.twoFactorEnabled} />}
            </div>
        </div>
    );
};

export default InvestorSettings;

