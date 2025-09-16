import React from 'react';

const TreasuryAddressSettings = ({ address }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-400">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Treasury Payout Address</h3>
            <p className="text-sm text-gray-600 mb-4">This is the secure, verified address where funds from your completed projects will be sent.</p>
            <div className="bg-gray-100 p-3 rounded-md font-mono text-gray-700 break-all text-sm">
                {address || 'No address set'}
            </div>
            <div className="mt-4">
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 text-sm font-medium">
                    Request Address Change
                </button>
            </div>
        </div>
    );
};

export default TreasuryAddressSettings;
