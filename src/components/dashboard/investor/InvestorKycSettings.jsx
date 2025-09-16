import React, { useState } from 'react';

// --- INLINED ICONS --- //
// To ensure portability, these SVG icons are defined directly within the component.
const CheckCircleIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
);
const ClockIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
);
const FileUpIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
);
// --- END OF ICONS --- //

const InvestorKycSettings = ({ status }) => {
    // This local state simulates the KYC status change upon form submission.
    // In a real app, this would be managed by a global state provider (like Context or Redux).
    const [kycStatus, setKycStatus] = useState(status);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, this would involve uploading files to a secure server
        // and then updating the user's status based on the API response.
        // For this demo, we'll just simulate the "pending" state.
        setKycStatus('Pending');
        alert('Your KYC documents have been submitted for review.');
    };

    // Render content based on KYC status
    if (kycStatus === 'Verified') {
        return (
            <div className="p-6 bg-green-50 rounded-lg border border-green-200 flex items-center">
                <CheckCircleIcon className="w-8 h-8 text-green-500 mr-4"/>
                <div>
                    <h3 className="text-lg font-semibold text-green-800">KYC Verified</h3>
                    <p className="text-green-700">Your account is fully verified. You have access to all platform features.</p>
                </div>
            </div>
        );
    }

    if (kycStatus === 'Pending') {
        return (
             <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200 flex items-center">
                <ClockIcon className="w-8 h-8 text-yellow-500 mr-4"/>
                <div>
                    <h3 className="text-lg font-semibold text-yellow-800">KYC Pending Review</h3>
                    <p className="text-yellow-700">Your documents have been submitted and are under review. This usually takes 24-48 hours.</p>
                </div>
            </div>
        );
    }

    // Default view: The KYC submission form
    return (
        <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Submit KYC Documents</h3>
            <p className="text-sm text-gray-600 mb-6">To access wallet features and start investing, please complete your KYC verification.</p>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Government-Issued ID</label>
                    <p className="text-xs text-gray-500 mb-2">(e.g., National ID Card, Passport, Driver's License)</p>
                     <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <FileUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="id-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                                    <span>Upload a file</span>
                                    <input id="id-upload" name="id-upload" type="file" className="sr-only"/>
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                        </div>
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Proof of Address</label>
                    <p className="text-xs text-gray-500 mb-2">(e.g., Utility Bill, Bank Statement)</p>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                             <FileUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="address-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                                    <span>Upload a file</span>
                                    <input id="address-upload" name="address-upload" type="file" className="sr-only"/>
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                        </div>
                    </div>
                </div>
                 <div className="flex justify-end pt-2">
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Submit for Verification</button>
                </div>
            </form>
        </div>
    );
};

export default InvestorKycSettings;

