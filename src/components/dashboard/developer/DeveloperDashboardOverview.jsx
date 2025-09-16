import React, { useMemo } from 'react';

// --- INLINED ICONS & COMPONENTS --- //
const DollarSignIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const ZapIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);
const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const TrendingUpIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
);
const WalletIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h12v-6"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>
);

const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
const formatNgnCurrency = (amount) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);

const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className="bg-indigo-100 text-indigo-600 rounded-full p-3 mr-4">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);
// --- END OF INLINED COMPONENTS --- //

const DeveloperDashboardOverview = ({ currentUser, projects = [], portfolios = {} }) => {
    const stats = useMemo(() => {
        const totalCapitalRaised = projects.reduce((sum, p) => sum + (p.amountRaised || 0), 0);
        const activeProjects = projects.filter(p => p.status === 'active' || p.status === 'funded').length;
        
        const projectIds = new Set(projects.map(p => p.id));
        const investorIds = new Set();
        Object.values(portfolios).forEach(portfolio => {
            if (portfolio && portfolio.tokens) {
                portfolio.tokens.forEach(token => {
                    if (projectIds.has(token.projectId)) {
                        investorIds.add(token.originalOwnerId);
                    }
                });
            }
        });
        const totalInvestors = investorIds.size;

        const upcomingPayout = projects.reduce((sum, p) => {
            if (p.status === 'active' || p.status === 'funded') {
                return sum + ((p.amountRaised || 0) * ((p.apy || 0) / 100)) / 12;
            }
            return sum;
        }, 0);

        return { totalCapitalRaised, activeProjects, totalInvestors, upcomingPayout };
    }, [projects, portfolios]);

    const cryptoBalance = (currentUser?.wallet?.usdt || 0) + (currentUser?.wallet?.usdc || 0);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Capital Raised" value={formatCurrency(stats.totalCapitalRaised)} icon={<DollarSignIcon className="w-6 h-6" />} />
                <StatCard title="Active Projects" value={stats.activeProjects} icon={<ZapIcon className="w-6 h-6" />} />
                <StatCard title="Total Investors" value={stats.totalInvestors} icon={<UserIcon className="w-6 h-6" />} />
                <StatCard title="Next Month APY Payout" value={formatCurrency(stats.upcomingPayout)} icon={<TrendingUpIcon className="w-6 h-6" />} />
                <StatCard title="NGN Balance" value={formatNgnCurrency(currentUser?.wallet?.ngn || 0)} icon={<WalletIcon className="w-6 h-6" />} />
                <StatCard title="Crypto Balance" value={formatCurrency(cryptoBalance)} icon={<WalletIcon className="w-6 h-6" />} />
            </div>
            {/* Additional content like charts or project summaries can be added here */}
        </div>
    );
};

export default DeveloperDashboardOverview;

