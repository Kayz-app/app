import React, { useState } from 'react';

// --- INLINED COMPONENTS --- //
const TwoFactorAuthSettings = ({ enabled }) => {
    const [isEnabled, setIsEnabled] = useState(enabled);
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Two-Factor Authentication (2FA)</h3>
            <div className="flex items-center justify-between">
                <p className="text-gray-600">Protect your account with an extra layer of security.</p>
                <button onClick={() => setIsEnabled(!isEnabled)} className={`${isEnabled ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11`}>
                    <span className={`${isEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full`}/>
                </button>
            </div>
        </div>
    );
};

const PlatformTreasuryAddressSettings = () => (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-400">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Platform Treasury Address</h3>
        <p className="text-sm text-gray-600 mb-4">This is the central address where all platform fees are collected.</p>
        <div className="bg-gray-100 p-3 rounded-md font-mono text-gray-700 break-all text-sm">
            0xPLATFORM_TREASURY_ADDRESS_1234567890ABCDEF
        </div>
    </div>
);
// --- END --- //

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        platformFee: 3.0,
        marketFee: 1.5,
        investmentFee: 1.5,
        newRegistrations: true,
        withdrawalLock: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
    
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Platform Settings</h2>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Developer Fee (%)</label>
                            <input type="number" name="platformFee" value={settings.platformFee} onChange={handleInputChange} step="0.1" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Market Fee (%)</label>
                            <input type="number" name="marketFee" value={settings.marketFee} onChange={handleInputChange} step="0.1" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Investment Fee (%)</label>
                             <input type="number" name="investmentFee" value={settings.investmentFee} onChange={handleInputChange} step="0.1" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                        </div>
                    </div>
                    <hr/>
                    <div className="space-y-4">
                         <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-800">Allow New Registrations</h4>
                            <button type="button" onClick={() => setSettings(p => ({...p, newRegistrations: !p.newRegistrations}))} className={`${settings.newRegistrations ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11`}>
                                <span className={`${settings.newRegistrations ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full`}/>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-800">Emergency Withdrawal Lock</h4>
                            <button type="button" onClick={() => setSettings(p => ({...p, withdrawalLock: !p.withdrawalLock}))} className={`${settings.withdrawalLock ? 'bg-red-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11`}>
                                <span className={`${settings.withdrawalLock ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full`}/>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                         <button type="submit" onClick={(e) => e.preventDefault()} className="bg-indigo-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-indigo-700">Save Settings</button>
                    </div>
                </form>
            </div>
            <div className="space-y-8">
                <TwoFactorAuthSettings enabled={true} />
                <PlatformTreasuryAddressSettings />
            </div>
        </div>
    );
};

export default AdminSettings;
