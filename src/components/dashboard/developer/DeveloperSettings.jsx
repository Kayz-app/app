import React from 'react';

// --- INLINED COMPONENTS --- //
// Placeholders for the actual setting components
const CompanyProfileSettings = ({ profile }) => <div>Company Profile Placeholder. Name: {profile.name}</div>;
const TwoFactorAuthSettings = ({ enabled }) => <div>2FA Placeholder. Status: {enabled ? 'On' : 'Off'}</div>;
const TreasuryAddressSettings = ({ address }) => <div>Treasury Address Placeholder: {address}</div>;
// --- END OF INLINED COMPONENTS --- //

const DeveloperSettings = ({ currentUser }) => {
    // A guard clause is important in case currentUser is loading
    if (!currentUser) {
        return <div>Loading settings...</div>;
    }

    return (
        <div className="space-y-8">
            <CompanyProfileSettings profile={currentUser.companyProfile} />
            <TwoFactorAuthSettings enabled={currentUser.twoFactorEnabled} />
            <TreasuryAddressSettings address={currentUser.treasuryAddress} />
        </div>
    );
};

export default DeveloperSettings;
