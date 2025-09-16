import React, { useState } from 'react';

// --- INLINED ICONS, HELPERS & COMPONENTS --- //
const ArrowLeftIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> );
const TrendingUpIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> );
const ClockIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> );
const UserIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> );
const CheckCircleIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> );
const SparklesIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3Z"/><path d="M3 21L4.5 16.5L9 15L4.5 13.5L3 9"/><path d="M21 21L19.5 16.5L15 15L19.5 13.5L21 9"/></svg> );
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);

// NOTE: These modal components should be in their own files and imported.
// For this example, they are placeholders.
const InvestmentModal = ({ isOpen, onClose, onConfirm }) => isOpen ? <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white p-8 rounded-lg shadow-xl"><h2 className="text-xl font-bold mb-4">Confirm Investment</h2><p>Investment details would be shown here.</p><div className="flex justify-end gap-4 mt-6"><button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button><button onClick={onConfirm} className="px-4 py-2 bg-indigo-600 text-white rounded">Confirm</button></div></div></div> : null;
const AIChatModal = ({ isOpen, onClose }) => isOpen ? <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="bg-white p-8 rounded-lg shadow-xl"><h2 className="text-xl font-bold mb-4">AI Chat</h2><p>The AI chat interface would be here.</p><div className="flex justify-end gap-4 mt-6"><button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Close</button></div></div></div> : null;

const ProjectDetailsPage = ({ project, onBack, currentUser, onInvest }) => {
    // Guard clause to prevent crash if data is not ready
    if (!project || !currentUser) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="text-gray-500">Loading project details...</div>
            </div>
        );
    }

    const [mainImage, setMainImage] = useState(project.images[0]);
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [isInvestmentModalOpen, setInvestmentModalOpen] = useState(false);
    const [isGeminiChatOpen, setGeminiChatOpen] = useState(false);
    
    const isKycVerified = currentUser.kycStatus === 'Verified';
    const stablecoinBalance = (currentUser.wallet.usdt || 0) + (currentUser.wallet.usdc || 0);
    const numericInvestmentAmount = parseFloat(investmentAmount.replace(/,/g, '')) || 0;
    const pricePerToken = project.fundingGoal > 0 && project.tokenSupply > 0 ? project.fundingGoal / project.tokenSupply : 1;
    const tokensToReceive = numericInvestmentAmount > 0 ? numericInvestmentAmount / pricePerToken : 0;
    const fee = numericInvestmentAmount * 0.015;
    const totalDebit = numericInvestmentAmount + fee;
    const progress = (project.amountRaised / project.fundingGoal) * 100;
    
    const isDeveloper = currentUser && currentUser.type === 'developer';
    const isFunded = project.status === 'funded';

    const handleAmountChange = (e) => {
        const value = e.target.value;
        const numericString = value.replace(/[^0-9]/g, '');
        let numericValue = parseInt(numericString, 10);

        if (isNaN(numericValue)) {
            setInvestmentAmount('');
            return;
        }

        const maxInvestment = Math.floor(stablecoinBalance / 1.015);
        if (numericValue > maxInvestment) {
            numericValue = maxInvestment;
        }
        setInvestmentAmount(numericValue > 0 ? numericValue.toLocaleString('en-US') : '');
    };

    const handleConfirmInvest = () => {
        onInvest(project.id, numericInvestmentAmount);
    };

    return (
        <div>
            <button onClick={onBack} className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Properties
            </button>
            
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <div className="p-4 md:p-6">
                        <img src={mainImage} alt="Main project view" className="w-full h-96 object-cover rounded-lg shadow-md"/>
                        <div className="flex space-x-2 mt-4">
                            {project.images.map((img, index) => (
                                <img 
                                    key={index}
                                    src={img} 
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${mainImage === img ? 'border-indigo-500' : 'border-transparent hover:border-gray-300'}`}
                                    onClick={() => setMainImage(img)}
                                />
                            ))}
                        </div>
                    </div>
                    
                    <div className="p-4 md:p-6 flex flex-col">
                         <div className="flex-grow">
                            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">{project.location}</p>
                            <h1 className="mt-1 text-3xl font-bold text-gray-900">{project.title} ({project.tokenTicker})</h1>
                            <p className="mt-4 text-gray-600 text-base">{project.description}</p>
                            
                            <div className="mt-6 grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-gray-800 bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center font-semibold"><TrendingUpIcon className="w-5 h-5 mr-2 text-indigo-500"/>APY:<span className="ml-auto font-bold text-lg text-green-600">{project.apy}%</span></div>
                                <div className="flex items-center font-semibold"><ClockIcon className="w-5 h-5 mr-2 text-indigo-500"/>Term:<span className="ml-auto">{project.term} Months</span></div>
                                <div className="flex items-center font-semibold"><UserIcon className="w-5 h-5 mr-2 text-indigo-500"/>Developer:<span className="ml-auto">{project.developerName}</span></div>
                                <div className="flex items-center font-semibold"><CheckCircleIcon className="w-5 h-5 mr-2 text-indigo-500"/>Status:<span className="ml-auto capitalize">{project.status}</span></div>
                            </div>
                        </div>

                         <div className="mt-8">
                             <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                             <div className="flex justify-between text-sm text-gray-600 mb-4">
                                <span><strong>Raised:</strong> {formatCurrency(project.amountRaised)}</span>
                                <span><strong>Goal:</strong> {formatCurrency(project.fundingGoal)}</span>
                            </div>

                             <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                                 <h3 className="font-bold text-lg text-gray-800">Invest in this Project</h3>
                                 <div className="mt-4">
                                    <input 
                                        type="text"
                                        placeholder={isFunded ? "This project is fully funded" : "Enter amount (USD)"} 
                                        value={investmentAmount}
                                        onChange={handleAmountChange}
                                        className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                                        disabled={isFunded || isDeveloper}
                                    />
                                    <div className="mt-2 text-sm text-gray-500 text-right">
                                        Available Balance: <strong>{formatCurrency(stablecoinBalance)}</strong>
                                    </div>
                                 </div>
                                {numericInvestmentAmount > 0 && !isFunded && (
                                    <div className="mt-4 text-sm space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tokens to Receive:</span>
                                            <span className="font-bold text-indigo-600">{tokensToReceive.toLocaleString(undefined, { maximumFractionDigits: 2 })} {project.tokenTicker}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Investment Amount:</span>
                                            <span className="font-medium text-gray-800">{formatCurrency(numericInvestmentAmount)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Platform Fee (1.5%):</span>
                                            <span className="font-medium text-gray-800">{formatCurrency(fee)}</span>
                                        </div>
                                        <div className="flex justify-between border-t pt-2 mt-2">
                                            <span className="font-bold text-gray-800">Total Debit:</span>
                                            <span className="font-bold text-gray-900">{formatCurrency(totalDebit)}</span>
                                        </div>
                                    </div>
                                )}
                                 <div className="mt-4">
                                     <button 
                                        onClick={() => setInvestmentModalOpen(true)} 
                                        className="w-full bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        disabled={isDeveloper || isFunded || !investmentAmount || numericInvestmentAmount <= 0 || totalDebit > stablecoinBalance || !isKycVerified}
                                     >
                                        {isDeveloper ? "Developers cannot invest" : isFunded ? "Project Fully Funded" : !isKycVerified ? "Verify KYC to Invest" : "Invest Now"}
                                     </button>
                                     <button 
                                        onClick={() => setGeminiChatOpen(true)}
                                        className="mt-2 w-full flex items-center justify-center bg-transparent text-indigo-600 px-6 py-2 rounded-md font-semibold hover:bg-indigo-50 border border-indigo-200 transition-colors"
                                     >
                                        <SparklesIcon className="w-5 h-5 mr-2" /> Ask AI about this Property
                                     </button>
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
             <InvestmentModal 
                isOpen={isInvestmentModalOpen}
                onClose={() => setInvestmentModalOpen(false)}
                onConfirm={handleConfirmInvest}
                project={project}
                details={{ numericInvestmentAmount, fee, totalDebit, tokensToReceive }}
            />
             <AIChatModal 
                isOpen={isGeminiChatOpen}
                onClose={() => setGeminiChatOpen(false)}
                project={project}
            />
        </div>
    );
};

export default ProjectDetailsPage;

