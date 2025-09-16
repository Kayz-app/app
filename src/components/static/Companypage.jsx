import React, { useState } from 'react';

// Inlined components and icons to resolve import errors.
// In a full project, these would be in separate, imported files.

const DollarSignIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182.553-.44 1.282-.659 2.003-.659.725 0 1.45.22 2.003.659l.879.659m0-4.879l-1.124-1.316a1.125 1.125 0 00-1.745 0l-1.124 1.316m11.358 4.879l-1.124-1.316a1.125 1.125 0 00-1.745 0l-1.124 1.316m0 0l-1.124 1.316a1.125 1.125 0 000 1.745l1.124 1.316m3.49-4.879l1.124 1.316a1.125 1.125 0 010 1.745l-1.124 1.316m0 0l-1.124 1.316a1.125 1.125 0 01-1.745 0l-1.124-1.316m-3.49 4.879l-1.124 1.316a1.125 1.125 0 01-1.745 0l-1.124-1.316" />
    </svg>
);

const ZapIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
);

const ShieldCheckIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);

const ArrowRightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
    </svg>
);

const SparklesIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.456-2.456L12.75 18l1.178-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);

const TrendingUpIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.75-.625m3.75.625V3.375" />
    </svg>
);

const ChevronDownIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

const ProjectCard = ({ project, onViewDetails }) => {
    if (!project) {
        return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-40 bg-gray-300"></div>
                <div className="p-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-300 rounded w-full"></div>
                </div>
            </div>
        );
    }
    const fundingPercentage = (project.currentFunding / project.fundingGoal) * 100;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 duration-300">
            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 truncate">{project.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{project.location}</p>
                
                <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="font-semibold text-gray-700">Funding Progress</span>
                        <span className="font-bold text-green-600">${project.currentFunding.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${fundingPercentage}%` }}></div>
                    </div>
                </div>

                <div className="mt-5 flex justify-between text-center">
                    <div>
                        <p className="text-gray-500 text-sm">Expected APY</p>
                        <p className="font-bold text-lg text-gray-800">{project.expectedApy}%</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Lock-up Period</p>
                        <p className="font-bold text-lg text-gray-800">{project.lockupPeriod} Days</p>
                    </div>
                </div>

                <button 
                    onClick={onViewDetails} 
                    className="w-full mt-5 bg-indigo-600 text-white py-2.5 rounded-md hover:bg-indigo-700 transition-colors font-semibold"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

const FaqItem = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 py-6">
            <dt>
                <button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-start justify-between text-left text-gray-400">
                    <span className="font-medium text-lg text-gray-900">{question}</span>
                    <span className="ml-6 flex h-7 items-center">
                        <ChevronDownIcon className={`h-6 w-6 transform transition-transform duration-200 ${isOpen ? '-rotate-180' : 'rotate-0'}`} />
                    </span>
                </button>
            </dt>
            {isOpen && (
                <dd className="mt-2 pr-12">
                    <div className="text-base text-gray-600 space-y-4">{children}</div>
                </dd>
            )}
        </div>
    );
};


const LandingPage = ({ setPage, projects }) => {
    return (
        <div className="bg-gray-50 flex flex-col flex-1">
            <div className="flex-grow">
                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                                <span className="block">Invest in Nigeria's Future.</span>
                                <span className="block text-indigo-600">Hedged in USD.</span>
                            </h1>
                            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
                                Kayzera is a tokenized real estate platform that allows you to buy fractional ownership in premium properties, protecting your capital from inflation.
                            </p>
                            <div className="mt-8 flex justify-center gap-4">
                                <button onClick={() => setPage('register')} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg">
                                    Get Started
                                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                                </button>
                                <button onClick={() => document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center justify-center px-6 py-3 border border-indigo-200 text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50">
                                    View Projects
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800">A New Era of Real Estate Investing</h2>
                            <p className="mt-2 text-lg text-gray-600">Accessible, Liquid, and Secure.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="p-6">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                                    <DollarSignIcon className="h-6 w-6"/>
                                </div>
                                <h3 className="mt-5 text-lg font-medium text-gray-900">Inflation Hedge</h3>
                                <p className="mt-2 text-base text-gray-500">Invest and earn returns in USD stablecoins, mitigating local currency risks and preserving your wealth.</p>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                                    <ZapIcon className="h-6 w-6"/>
                                </div>
                                <h3 className="mt-5 text-lg font-medium text-gray-900">Instant Liquidity</h3>
                                <p className="mt-2 text-base text-gray-500">Our secondary market allows you to trade your "Market Tokens" with other investors before the project term ends.</p>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                                    <ShieldCheckIcon className="h-6 w-6"/>
                                </div>
                                <h3 className="mt-5 text-lg font-medium text-gray-900">Blockchain Transparency</h3>
                                <p className="mt-2 text-base text-gray-500">Every transaction is recorded on a secure ledger, ensuring complete transparency and trust for all parties.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HOW IT WORKS: DUAL TOKEN SYSTEM */}
                <div id="how-it-works" className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800">Unlock Liquidity with Our Dual-Token System</h2>
                            <p className="mt-2 text-lg text-gray-600">Every investment provides you with two distinct types of tokens, balancing long-term growth with immediate flexibility.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-indigo-100 rounded-full mr-4">
                                        <ShieldCheckIcon className="w-6 h-6 text-indigo-600"/>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Security Tokens</h3>
                                </div>
                                <p className="text-gray-600">This token represents your core ownership in the property. It is locked for the project's term and generates your monthly APY returns. Think of it as your proof of ownership and your key to long-term wealth building.</p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-indigo-100 rounded-full mr-4">
                                        <TrendingUpIcon className="w-6 h-6 text-indigo-600"/>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Market Tokens</h3>
                                </div>
                                <p className="text-gray-600">Paired 1:1 with your Security Tokens, these are designed for liquidity. You can sell your Market Tokens to other investors on our Secondary Market at any time, allowing you to exit your position before the project's lockup period ends.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI-Powered Features Section */}
                <div className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                             <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
                                <SparklesIcon className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800">Powered by AI for Smarter Investing</h2>
                            <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">Kayzera leverages cutting-edge AI to provide deeper insights and streamline the investment process for everyone.</p>
                        </div>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Due Diligence</h3>
                                <p className="text-gray-600">Our platform delivers a meticulous, high-level analysis of every property—highlighting both opportunities and risks with unparalleled precision. Gain the clarity and confidence to act decisively.</p>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Generative Project Proposals</h3>
                                <p className="text-gray-600">For developers, our platform leverages generative AI to transform your project details into polished, persuasive descriptions and proposals, saving you hours and elevating your pitch.</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Featured Projects Section */}
                <div id="featured-projects" className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800">Featured Investment Opportunities</h2>
                            <p className="mt-2 text-lg text-gray-600">Carefully vetted projects from reputable developers.</p>
                        </div>
                        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                            {(projects || []).filter(p => p.status === 'active' || p.status === 'funded').slice(0, 3).map(project => (
                                 <ProjectCard key={project.id} project={project} onViewDetails={() => setPage('login')} />
                            ))}
                        </div>
                    </div>
                </div>

                 {/* Compliance Section */}
                <div id="compliance" className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                        <ShieldCheckIcon className="h-16 w-16 mx-auto text-indigo-600" />
                        <h2 className="mt-4 text-3xl font-bold text-gray-800">Legal & Regulatory Compliance</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                            Operating with integrity and transparency is at the core of our mission.
                        </p>
                        <div className="mt-12 text-left space-y-8 text-lg text-gray-700">
                             <p>
                               We are committed to operating in full compliance with all relevant Nigerian laws and regulations. We believe that a strong regulatory framework is essential for building trust and ensuring the long-term success of our platform and the protection of our users.
                             </p>
                             <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                                 <h3 className="font-bold text-xl text-gray-800 mb-2">Regulatory Engagement</h3>
                                 <p>
                                    We will work closely with the <span className="font-semibold">Securities and Exchange Commission (SEC) Nigeria</span> to ensure that our platform meets all of the requirements for a crowdfunding portal and that our tokenized offerings are structured as compliant securities.
                                 </p>
                             </div>
                             <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                                  <h3 className="font-bold text-xl text-gray-800 mb-2">Security & User Protection</h3>
                                 <p>
                                    We will adhere to all <span className="font-semibold">Anti-Money Laundering (AML)</span> and <span className="font-semibold">Know Your Customer (KYC)</span> regulations. This involves a robust verification process for all users to prevent fraud and ensure a secure investment environment for everyone on the platform.
                                 </p>
                             </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div id="faq" className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
                        </div>
                        <FaqItem question="How do I invest in a project?">
                            <p>First, complete your KYC verification in the settings. Once verified, navigate to the "Marketplace" tab, select "Properties," and click on a project you're interested in. On the project details page, you can enter the amount you wish to invest and complete the transaction from your funded wallet.</p>
                        </FaqItem>
                         <FaqItem question="What is a Security Token?">
                            <p>A Security Token represents your direct investment in a property. It is locked for the duration of the project term and entitles you to monthly APY (Annual Percentage Yield) payments, which you can claim from the "My Tokens" page in your dashboard.</p>
                        </FaqItem>
                         <FaqItem question="What is a Market Token?">
                            <p>A Market Token is paired with your Security Token and provides liquidity. You can list this token for sale on our "Secondary Market" at any time, allowing you to exit your position before the project's lockup period ends.</p>
                        </FaqItem>
                        <FaqItem question="How do I submit a new project for funding?">
                            <p>After creating a developer account, navigate to the "Create New Project" tab in your dashboard. You'll be guided through a form to provide project details, financial projections, legal documents, and property images. Our team will review your submission within 5-7 business days.</p>
                        </FaqItem>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;

