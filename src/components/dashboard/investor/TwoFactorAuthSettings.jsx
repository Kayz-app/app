import React, { useState } from 'react';

const TwoFactorAuthSettings = ({ enabled }) => {
    // This local state simulates the toggle action.
    // In a real app, this would trigger an API call to update the user's security settings on the backend.
    const [isEnabled, setIsEnabled] = useState(enabled);

    const handleToggle = () => {
        // Here you would typically call an API to update the 2FA status.
        // For this demo, we just toggle the local state.
        const newStatus = !isEnabled;
        setIsEnabled(newStatus);
        alert(`Two-Factor Authentication has been ${newStatus ? 'enabled' : 'disabled'}.`);
    };

    return (
        <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Two-Factor Authentication (2FA)</h3>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div>
                    <p className="font-medium text-gray-700">Enable 2FA</p>
                    <p className="text-sm text-gray-500">Protect your account with an extra layer of security.</p>
                </div>
                <button
                    onClick={handleToggle}
                    className={`${isEnabled ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                    <span className={`${isEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}/>
                </button>
            </div>
             {isEnabled && (
                <div className="mt-4 p-4 bg-indigo-50 rounded-md border border-indigo-200">
                    <p className="text-sm text-indigo-800">2FA is now enabled. You will be asked for a verification code from your authenticator app on your next login.</p>
                </div>
            )}
        </div>
    );
};

export default TwoFactorAuthSettings;

