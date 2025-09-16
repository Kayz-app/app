import React, { useState } from 'react';

// NOTE: The actual component files for CryptoWallet and FiatWallet
// must be created and imported for this to work in a real app.
// For this example, they are included as placeholder functions.

const PlaceholderWallet = ({ title }) => (
    <div className="mt-6">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-500">Wallet details would be rendered here.</p>
    </div>
);

const CryptoWallet = (props) => <PlaceholderWallet title="Crypto Wallet" {...props} />;
const FiatWallet = (props) => <PlaceholderWallet title="Fiat Wallet" {...props} />;


const InvestorWallet = ({ currentUser }) => {
    const [activeTab, setActiveTab] = useState('Crypto');

    // Add a guard clause to handle the loading state
    if (!currentUser) {
        return <div className="text-center p-8">Loading wallet...</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">My Wallet</h2>
            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('Crypto')}
                        className={`${activeTab === 'Crypto' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Crypto Wallet
                    </button>
                    <button
                        onClick={() => setActiveTab('Fiat')}
                        className={`${activeTab === 'Fiat' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Fiat Wallet (NGN)
                    </button>
                </nav>
            </div>
            {activeTab === 'Crypto' ? <CryptoWallet wallet={currentUser.wallet} /> : <FiatWallet wallet={currentUser.wallet} />}
        </div>
    );
};

export default InvestorWallet;

