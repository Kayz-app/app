import React from 'react';

// Inlined ShieldCheckIcon to resolve the import error.
const ShieldCheckIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
  </svg>
);

const KycRequired = ({ setActiveDashboardItem }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg mx-auto">
      <ShieldCheckIcon className="w-16 h-16 mx-auto text-yellow-500" />
      <h2 className="text-2xl font-bold text-gray-800 mt-4">KYC Verification Required</h2>
      <p className="text-gray-600 mt-2">
        To access your wallet, deposit funds, withdraw earnings, or invest in projects, you must complete your KYC (Know Your Customer) verification. This is a mandatory step for security and regulatory compliance.
      </p>
      <button
        onClick={() => setActiveDashboardItem('Settings')}
        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
      >
        Go to Settings to Complete KYC
      </button>
    </div>
  );
};

export default KycRequired;

