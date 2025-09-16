 import React, { useState } from 'react';

// --- INLINED ICONS & COMPONENTS TO RESOLVE IMPORT ERRORS --- //

const EyeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const TrendingUpIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.75-.625m3.75.625l-6.25 3.75" />
    </svg>
);

const WalletIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 3V9M3 12V9" />
  </svg>
);

const SettingsIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995a6.473 6.473 0 010 1.248c0 .38-.146.755-.438.995l1.003.827c.48.398.665 1.047.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995a6.473 6.473 0 010-1.248c0-.38-.146-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const LifeBuoyIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
);

const MenuIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const XIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DashboardLayout = ({ sidebarItems, activeItem, setActiveItem, onLogout, currentUser, totalBalance, children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
                {/* Overlay */}
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
                {/* Sidebar */}
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button onClick={() => setSidebarOpen(false)} className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <XIcon className="h-6 w-6 text-white" />
                        </button>
                    </div>
                    {/* Sidebar content */}
                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        {/* Sidebar items */}
                    </div>
                </div>
            </div>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <div className="flex flex-col h-0 flex-1 bg-gray-800">
                        {/* Sidebar content */}
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
                    <button onClick={() => setSidebarOpen(true)} className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none md:hidden">
                        <MenuIcon className="h-6 w-6" />
                    </button>
                    {/* Header content */}
                </div>
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};


// --- Main Investor Dashboard Component --- //

// Placeholder components for features not yet built
const Placeholder = ({ title }) => <div className="bg-white p-8 rounded-lg shadow-md"><h2 className="text-2xl font-bold">{title}</h2><p>This component is under construction.</p></div>;
const InvestorDashboardOverview = (props) => <Placeholder title="Dashboard Overview" {...props} />;
const InvestorMyTokens = (props) => <Placeholder title="My Tokens" {...props} />;
const InvestorMarketplace = (props) => <Placeholder title="Marketplace" {...props} />;
const InvestorWallet = (props) => <Placeholder title="Wallet" {...props} />;
const InvestorSettings = (props) => <Placeholder title="Settings" {...props} />;
const HelpAndSupport = () => <Placeholder title="Help & Support" />;
const KycRequired = ({ setActiveDashboardItem }) => (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold">KYC Required</h2>
        <p className="mt-4">Please complete your KYC verification in the Settings tab to access this feature.</p>
        <button onClick={() => setActiveDashboardItem('Settings')} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md">Go to Settings</button>
    </div>
);


const InvestorDashboard = ({ currentUser, onLogout, projects, portfolios, marketListings, onInvest, onClaimApy, onListToken, totalBalance, onUpdateUser }) => {
    const [activeItem, setActiveItem] = useState('Dashboard');
    
    if (!currentUser) {
        return <div className="flex h-screen items-center justify-center"><p>Loading...</p></div>;
    }

    const sidebarItems = [
        { name: 'Dashboard', icon: <EyeIcon className="h-5 w-5" /> },
        { name: 'My Tokens', icon: <TrendingUpIcon className="h-5 w-5" /> },
        { name: 'Marketplace', icon: <TrendingUpIcon className="h-5 w-5" /> },
        { name: 'Wallet', icon: <WalletIcon className="h-5 w-5" /> },
        { name: 'Settings', icon: <SettingsIcon className="h-5 w-5" /> },
        { name: 'Help & Support', icon: <LifeBuoyIcon className="h-5 w-5" /> },
    ];
    
    const renderContent = () => {
        const isKycVerified = currentUser.kycStatus === 'Verified';

        switch (activeItem) {
            case 'Dashboard':
                return <InvestorDashboardOverview currentUser={currentUser} portfolios={portfolios} projects={projects} />;
            case 'My Tokens':
                return isKycVerified ? <InvestorMyTokens currentUser={currentUser} portfolios={portfolios} projects={projects} onClaimApy={onClaimApy} onListToken={onListToken} /> : <KycRequired setActiveDashboardItem={setActiveItem} />;
            case 'Marketplace':
                 return isKycVerified ? <InvestorMarketplace currentUser={currentUser} marketListings={marketListings} projects={projects} onInvest={onInvest} portfolios={portfolios} /> : <KycRequired setActiveDashboardItem={setActiveItem} />;
            case 'Wallet':
                return isKycVerified ? <InvestorWallet currentUser={currentUser} /> : <KycRequired setActiveDashboardItem={setActiveItem} />;
            case 'Settings':
                return <InvestorSettings currentUser={currentUser} onUpdateUser={onUpdateUser} />;
            case 'Help & Support':
                return <HelpAndSupport />;
            default:
                return <InvestorDashboardOverview currentUser={currentUser} portfolios={portfolios} projects={projects} />;
        }
    };

    return (
        <DashboardLayout
            sidebarItems={sidebarItems}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            onLogout={onLogout}
            currentUser={currentUser}
            totalBalance={totalBalance}
        >
            {renderContent()}
        </DashboardLayout>
    );
};

export default InvestorDashboard;


