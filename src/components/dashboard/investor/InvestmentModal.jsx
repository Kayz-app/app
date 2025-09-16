import React, { useState } from 'react';

// --- INLINED ICONS & HELPERS --- //
const CheckCircleIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> );
const XIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> );
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);

const InvestmentModal = ({ isOpen, onClose, onConfirm, project, details }) => {
    const [status, setStatus] = useState('confirm'); // confirm, processing, success, error

    const handleConfirm = () => {
        setStatus('processing');
        setTimeout(() => {
            try {
                onConfirm();
                setStatus('success');
            } catch (e) {
                setStatus('error');
            }
        }, 2000);
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => setStatus('confirm'), 300);
    };

    if (!isOpen) return null;

    const renderContent = () => {
        switch (status) {
            case 'processing':
                return (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <h4 className="font-semibold text-lg text-gray-800">Processing Transaction</h4>
                        <p className="text-gray-600">Please wait, confirming your investment...</p>
                    </div>
                );
            case 'success':
                return (
                     <div className="text-center py-8">
                        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h4 className="font-semibold text-lg text-gray-800">Investment Successful!</h4>
                        <p className="text-gray-600">You are now a fractional owner of {project.title}.</p>
                        <button onClick={handleClose} className="mt-6 bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700">View My Tokens</button>
                    </div>
                );
            case 'error':
                 return (
                     <div className="text-center py-8">
                        <XIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h4 className="font-semibold text-lg text-red-600">Investment Failed</h4>
                        <p className="text-gray-600">Something went wrong. Please try again.</p>
                        <button onClick={handleClose} className="mt-6 bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300">Close</button>
                    </div>
                );
            case 'confirm':
            default:
                return (
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Your Investment</h3>
                        <p className="text-gray-600 mb-4">You are about to invest in <strong>{project.title}</strong>. Please review the details.</p>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm border">
                            <div className="flex justify-between"><span className="text-gray-600">Investment:</span><span className="font-medium">{formatCurrency(details.numericInvestmentAmount)}</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">Fee (1.5%):</span><span className="font-medium">{formatCurrency(details.fee)}</span></div>
                            <div className="flex justify-between border-t mt-2 pt-2"><span className="font-bold">Total:</span><span className="font-bold">{formatCurrency(details.totalDebit)}</span></div>
                            <hr className="my-2"/>
                            <div className="flex justify-between"><span className="text-gray-600">Tokens to Receive:</span><span className="font-bold text-indigo-600">{details.tokensToReceive.toLocaleString(undefined, { maximumFractionDigits: 2 })} {project.tokenTicker}</span></div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button onClick={handleClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                            <button onClick={handleConfirm} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Confirm</button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">{renderContent()}</div>
            </div>
        </div>
    );
};

export default InvestmentModal;
