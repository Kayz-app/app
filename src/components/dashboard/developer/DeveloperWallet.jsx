import React, { useState } from 'react';

// --- INLINED COMPONENTS --- //
// Placeholders for CryptoWallet and FiatWallet components
const CryptoWallet = ({ wallet }) => <div>Crypto Wallet Placeholder. USDT: {wallet.usdt}, USDC: {wallet.usdc}</div>;
const FiatWallet = ({ wallet }) => <div>Fiat Wallet Placeholder. NGN: {wallet.ngn}</div>;
// --- END OF INLINED COMPONENTS --- //

const DeveloperWallet = ({ currentUser }) => {
    const [activeTab, setActiveTab] = useState('Crypto');

    // Guard clause to prevent rendering until currentUser data is available
    if (!currentUser) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Loading Wallet...</h2>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Operational Wallet</h2>
            <p className="text-sm text-gray-600 mb-6">Manage company funds and fund project APY wallets.</p>
            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-6">
                    <button onClick={() => setActiveTab('Crypto')} className={`${activeTab === 'Crypto' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500'} py-4 px-1 border-b-2 font-medium text-sm`}>
                        Crypto Wallet
                    </button>
                    <button onClick={() => setActiveTab('Fiat')} className={`${activeTab === 'Fiat' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500'} py-4 px-1 border-b-2 font-medium text-sm`}>
                        Fiat Wallet (NGN)
                    </button>
                </nav>
            </div>
            {activeTab === 'Crypto' ? <CryptoWallet wallet={currentUser.wallet} /> : <FiatWallet wallet={currentUser.wallet} />}
        </div>
    );
};

export default DeveloperWallet;

