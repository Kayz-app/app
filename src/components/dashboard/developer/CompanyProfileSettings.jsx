import React, { useState } from 'react';

const CompanyProfileSettings = ({ profile }) => {
    // Initialize state with profile data, providing fallbacks for safety.
    const [companyProfile, setCompanyProfile] = useState({
        name: profile?.name || '',
        regNumber: profile?.regNumber || '',
        address: profile?.address || '',
        website: profile?.website || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompanyProfile(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Company profile updated!');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Company Profile</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input type="text" name="name" value={companyProfile.name} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                        <input type="text" name="regNumber" value={companyProfile.regNumber} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Company Address</label>
                    <input type="text" name="address" value={companyProfile.address} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Website</label>
                    <input type="url" name="website" value={companyProfile.website} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                </div>
                <div className="flex justify-end pt-2">
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default CompanyProfileSettings;
