import React, { useState, useEffect, useRef } from 'react';

// --- INLINED ICONS, HELPERS & API CALL --- //
const XIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> );
const SparklesIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3Z"/><path d="M3 21L4.5 16.5L9 15L4.5 13.5L3 9"/><path d="M21 21L19.5 16.5L15 15L19.5 13.5L21 9"/></svg> );
const BotIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg> );
const UserIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> );
const SendIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg> );
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const callAIAPI = async (payload) => {
    // This is a placeholder for the actual API call logic.
    console.log("Calling AI API with payload:", payload);
    await new Promise(res => setTimeout(res, 1500)); // Simulate network delay
    return `This is a simulated AI response based on your query about "${payload.contents[0].parts[0].text}". In a real scenario, this would contain a detailed analysis.`;
};


const AIChatModal = ({ isOpen, onClose, project }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        if(isOpen && project) { // Add a check for project existence
            setMessages([{ 
                sender: 'bot', 
                text: `Hi! How can I help you with the "${project.title}" property?` 
            }]);
            setInput('');
            setIsLoading(false);
        }
    }, [isOpen, project]); // Depend on the whole project object

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const systemPrompt = `You are a helpful real estate investment assistant for Kayzera. Your purpose is to answer user questions about a specific property. Be professional, encouraging, and base your answers on the provided context. Never give financial advice.
            Context:
            - Title: ${project.title}
            - Location: ${project.location}
            - Description: ${project.description}
            - Funding Goal: ${formatCurrency(project.fundingGoal)}
            - APY: ${project.apy}%`;

            const payload = {
                contents: [{ parts: [{ text: input }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
            };

            const responseText = await callAIAPI(payload);
            const botMessage = { sender: 'bot', text: responseText };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            const errorMessage = { sender: 'bot', text: "Sorry, I encountered an error. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen || !project) return null; // Add a guard clause here

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col" style={{height: '80vh', maxHeight: '700px'}}>
                <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
                    <div className="flex items-center">
                         <SparklesIcon className="w-6 h-6 text-indigo-600 mr-3"/>
                         <h3 className="text-lg font-semibold text-gray-800">Ask AI about {project.title}</h3>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200">
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-100">
                    {messages.map((msg, index) => (
                         <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center flex-shrink-0"><BotIcon className="w-5 h-5" /></div>}
                            <div className={`max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border'}`}>
                               <p className="text-sm">{msg.text}</p>
                            </div>
                            {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center flex-shrink-0"><UserIcon className="w-5 h-5" /></div>}
                         </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-start gap-3 justify-start">
                             <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center flex-shrink-0"><BotIcon className="w-5 h-5" /></div>
                             <div className="max-w-md lg:max-w-lg px-4 py-3 rounded-lg bg-white text-gray-800 rounded-bl-none border"><div className="flex items-center space-x-1"><span className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span><span className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span><span className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-pulse"></span></div></div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 bg-white border-t rounded-b-lg">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." className="flex-1 block w-full border-gray-300 rounded-full py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100" disabled={isLoading} />
                        <button type="submit" className="bg-indigo-600 text-white p-2.5 rounded-full font-semibold hover:bg-indigo-700 disabled:bg-indigo-300" disabled={isLoading}><SendIcon className="w-5 h-5" /></button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AIChatModal;

