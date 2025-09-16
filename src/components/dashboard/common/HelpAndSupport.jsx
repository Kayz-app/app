import React, { useState } from 'react';

// --- SVG ICONS (Inlined to ensure portability) --- //

const ChevronDownIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

const PaperclipIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
);


// --- REUSABLE FAQ ITEM COMPONENT --- //

const FaqItem = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full py-5 text-left">
                <span className="font-semibold text-lg text-gray-800">{question}</span>
                <ChevronDownIcon className={`w-6 h-6 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-5 pr-10 text-gray-600 space-y-4">
                    {children}
                </div>
            )}
        </div>
    );
};


// --- MAIN HELP & SUPPORT COMPONENT --- //

const HelpAndSupport = ({ currentUser }) => {
    const [activeTab, setActiveTab] = useState('FAQ'); // 'FAQ' or 'Live Support'
    const [messages, setMessages] = useState([
        { id: 1, sender: 'support', text: "Welcome to live support! How can we help you today?" },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        
        const userMessage = { id: Date.now(), sender: 'user', text: newMessage };
        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');

        // Mock reply from support for demonstration purposes
        setTimeout(() => {
             const supportReply = { id: Date.now() + 1, sender: 'support', text: "Thank you for your message. An agent will be with you shortly." };
             setMessages(prev => [...prev, supportReply]);
        }, 1500);
    };

    // Renders different FAQs based on whether the user is a developer or an investor
    const renderFaqContent = () => {
        if (currentUser.type === 'developer') {
            return (
                <>
                    <FaqItem question="How do I submit a new project for funding?">
                        <p>Navigate to the "Create New Project" tab in your dashboard. You'll be guided through a form to provide project details, financial projections, legal documents, and property images. Our team will review your submission within 5-7 business days.</p>
                    </FaqItem>
                    <FaqItem question="What are the platform fees for developers?">
                        <p>We charge a one-time platform fee of 3% on the total capital raised for your project. This fee is deducted automatically when you withdraw the funds after a successful funding round. There are no upfront costs to list a project.</p>
                    </FaqItem>
                    <FaqItem question="When can I withdraw the raised capital?">
                        <p>You can initiate a withdrawal of the raised funds as soon as your project's funding goal is met. The funds, minus the platform fee, will be securely transferred to your verified company treasury address from the "Manage Project" page.</p>
                    </FaqItem>
                     <FaqItem question="How is the APY for investors managed?">
                        <p>Each project has a dedicated wallet for APY payments. As the developer, you are responsible for ensuring this wallet is sufficiently funded to cover the monthly APY distributions to your investors. You can deposit funds into this wallet from the "Manage Project" page.</p>
                    </FaqItem>
                </>
            );
        }
        // Default to Investor FAQ
        return (
            <>
                <FaqItem question="How do I invest in a project?">
                    <p>Navigate to the "Marketplace" tab, select "Properties," and click on a project you're interested in. On the project details page, you can enter the amount you wish to invest and complete the transaction.</p>
                </FaqItem>
                 <FaqItem question="What is a Security Token?">
                    <p>A Security Token represents your direct investment in a property. It is locked for the duration of the project term and entitles you to monthly APY (Annual Percentage Yield) payments, which you can claim from the "My Tokens" page.</p>
                </FaqItem>
                 <FaqItem question="What is a Market Token?">
                    <p>A Market Token is paired with your Security Token and provides liquidity. You can list this token for sale on our "Secondary Market" at any time, allowing you to exit your position before the project's lockup period ends.</p>
                </FaqItem>
            </>
        );
    };

    if (!currentUser) {
        return (
            <div className="max-w-4xl mx-auto animate-pulse">
                <div className="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="space-y-4">
                        <div className="h-6 bg-gray-200 rounded w-full"></div>
                        <div className="h-6 bg-gray-200 rounded w-full"></div>
                        <div className="h-6 bg-gray-200 rounded w-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
             <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('FAQ')}
                        className={`${activeTab === 'FAQ' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        FAQ
                    </button>
                    <button
                        onClick={() => setActiveTab('Live Support')}
                        className={`${activeTab === 'Live Support' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Live Support
                    </button>
                </nav>
            </div>

            {activeTab === 'FAQ' && (
                 <div className="bg-white p-8 rounded-lg shadow-md">
                     <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
                     <div className="space-y-2">
                        {renderFaqContent()}
                     </div>
                </div>
            )}

            {activeTab === 'Live Support' && (
                <div className="bg-white rounded-lg shadow-md flex flex-col" style={{height: '600px'}}>
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-bold text-gray-800">Live Support Chat</h2>
                        <p className="text-sm text-green-500 flex items-center"><span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>Online</p>
                    </div>
                    <div className="flex-1 p-6 overflow-y-auto space-y-4">
                        {messages.map(msg => (
                             <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                 <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    {msg.text}
                                 </div>
                             </div>
                        ))}
                    </div>
                    <div className="p-4 bg-gray-50 border-t">
                        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                             <button type="button" className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-200">
                                <PaperclipIcon className="w-5 h-5" />
                            </button>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 block w-full border-gray-300 rounded-full py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-indigo-700">
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default HelpAndSupport;

