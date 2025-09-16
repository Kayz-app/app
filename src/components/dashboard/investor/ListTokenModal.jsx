import React, { useState, useEffect } from 'react';

// --- INLINED ICONS, HELPERS & COMPONENTS --- //
const XIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> );
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const WalletModal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
                <div className="p-4 border-b flex justify-between items-center"><h3 className="text-lg font-semibold">{title}</h3><button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full"><XIcon className="w-5 h-5" /></button></div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

const ListTokenModal = ({ isOpen, onClose, token, project, onConfirmList, currentUser }) => {
    const [amount, setAmount] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [pricePerToken, setPricePerToken] = useState('');
    const [activeInput, setActiveInput] = useState('total');
    const [error, setError] = useState('');
    const [step, setStep] = useState('input');

    const handleAmountChange = (value) => {
        setAmount(value);
        const numAmount = parseFloat(value);
        if (activeInput === 'total') {
            const numTotalPrice = parseFloat(totalPrice);
            if (numAmount > 0 && numTotalPrice > 0) setPricePerToken((numTotalPrice / numAmount).toFixed(4));
            else setPricePerToken('');
        } else {
            const numPricePerToken = parseFloat(pricePerToken);
            if (numAmount > 0 && numPricePerToken > 0) setTotalPrice((numAmount * numPricePerToken).toFixed(2));
            else setTotalPrice('');
        }
    };

    const handleTotalPriceChange = (value) => {
        setActiveInput('total');
        setTotalPrice(value);
        const numAmount = parseFloat(amount);
        if (numAmount > 0 && parseFloat(value) >= 0) setPricePerToken((parseFloat(value) / numAmount).toFixed(4));
        else setPricePerToken('');
    };

    const handlePricePerTokenChange = (value) => {
        setActiveInput('perToken');
        setPricePerToken(value);
        const numAmount = parseFloat(amount);
        if (numAmount > 0 && parseFloat(value) >= 0) setTotalPrice((numAmount * parseFloat(value)).toFixed(2));
        else setTotalPrice('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!amount || !totalPrice || +amount <= 0 || +totalPrice <= 0) {
            setError('Please enter a valid amount and price.');
            return;
        }
        if (+amount > token.amount) {
            setError(`You cannot list more than your token balance of ${token.amount}.`);
            return;
        }
        setStep('confirm');
    };

    const handleFinalConfirm = () => {
        onConfirmList({
            tokenId: token.tokenId,
            sellerId: currentUser.id,
            projectId: token.projectId,
            amount: +amount,
            price: +totalPrice,
        });
    };

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setAmount('');
                setTotalPrice('');
                setPricePerToken('');
                setError('');
                setActiveInput('total');
                setStep('input');
            }, 300);
        }
    }, [isOpen]);

    if (!isOpen || !project || !token) return null;

    const fee = (parseFloat(totalPrice) || 0) * 0.015;
    const netProceeds = (parseFloat(totalPrice) || 0) - fee;

    return (
        <WalletModal isOpen={isOpen} onClose={onClose} title={`List Token for ${project.title} (${project.tokenTicker})`}>
            {step === 'input' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-sm"><strong>Token Balance:</strong> {token.amount.toLocaleString()}</p>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Amount to Sell</label>
                        <input type="number" value={amount} onChange={(e) => handleAmountChange(e.target.value)} placeholder="e.g., 1000" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price / Token (USD)</label>
                            <input type="number" step="0.0001" value={pricePerToken} onChange={(e) => handlePricePerTokenChange(e.target.value)} onFocus={() => setActiveInput('perToken')} placeholder="e.g., 1.10" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Total Price (USD)</label>
                            <input type="number" step="0.01" value={totalPrice} onChange={(e) => handleTotalPriceChange(e.target.value)} onFocus={() => setActiveInput('total')} placeholder="e.g., 1100" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <p className="text-xs text-gray-500">A 1.5% transaction fee will be deducted upon sale.</p>
                    <div className="flex justify-end space-x-2 pt-2">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Review Listing</button>
                    </div>
                </form>
            )}
            {step === 'confirm' && (
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Listing Details</h3>
                    <p className="text-gray-600 mb-4">Please review and confirm the details of your token listing.</p>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm border">
                        <div className="flex justify-between"><span className="text-gray-600">Amount to List:</span><span className="font-bold">{parseInt(amount).toLocaleString()} {project.tokenTicker}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Asking Price:</span><span className="font-medium">{formatCurrency(parseFloat(totalPrice))}</span></div>
                        <div className="flex justify-between text-red-600"><span className="text-gray-600">Platform Fee (1.5%):</span><span className="font-medium">-{formatCurrency(fee)}</span></div>
                        <div className="flex justify-between border-t mt-2 pt-2"><span className="font-bold">Net Proceeds on Sale:</span><span className="font-bold text-green-600">{formatCurrency(netProceeds)}</span></div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button onClick={() => setStep('input')} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Back</button>
                        <button onClick={handleFinalConfirm} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Confirm & List Token</button>
                    </div>
                </div>
            )}
        </WalletModal>
    );
};

export default ListTokenModal;

