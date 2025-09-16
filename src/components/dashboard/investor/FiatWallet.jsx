import React, { useState } from 'react';

// --- INLINED ICONS, HELPERS & COMPONENTS --- //
const ArrowDownLeftIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m17 17-10-10"/><path d="M17 7v10H7"/></svg> );
const ArrowUpRightIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17V7h10"/><path d="M7 7l10 10"/></svg> );
const XIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> );
const formatNgnCurrency = (amount) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);

const WalletModal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
                <div className="p-4 border-b flex justify-between items-center"><h3 className="text-lg font-semibold">{title}</h3><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><XIcon className="w-5 h-5" /></button></div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};


const FiatWallet = ({ wallet }) => {
    const [modalConfig, setModalConfig] = useState({ isOpen: false, action: null });
    const [ngnAmount, setNgnAmount] = useState('');

    if (!wallet) {
        return <div className="text-center p-8">Loading NGN wallet...</div>;
    }
    
    const openModal = (action) => {
        setNgnAmount('');
        setModalConfig({ isOpen: true, action });
    };
    const closeModal = () => setModalConfig({ isOpen: false, action: null });

    const handleNgnChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setNgnAmount(value ? parseInt(value, 10).toLocaleString('en-US') : '');
    };

    return (
        <div>
            <div className="p-4 border rounded-lg max-w-md mx-auto">
                <h3 className="text-lg font-bold">NGN Wallet</h3>
                <p className="text-3xl font-semibold text-gray-800 mt-2">{formatNgnCurrency(wallet.ngn)}</p>
                <p className="text-sm text-gray-500">Available Balance</p>
                <div className="mt-4 flex space-x-2">
                    <button onClick={() => openModal('Deposit')} className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                        <ArrowDownLeftIcon className="w-4 h-4 mr-1"/> Deposit
                    </button>
                    <button onClick={() => openModal('Withdraw')} className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        <ArrowUpRightIcon className="w-4 h-4 mr-1"/> Withdraw
                    </button>
                </div>
            </div>

            <WalletModal isOpen={modalConfig.isOpen} onClose={closeModal} title={`${modalConfig.action} NGN`}>
                {modalConfig.action === 'Deposit' && (
                    <div className="text-sm text-gray-700 space-y-3">
                        <p>To deposit NGN, please make a bank transfer to the following account:</p>
                        <div className="bg-gray-100 p-3 rounded-md">
                            <p><strong>Bank:</strong> Wema Bank</p>
                            <p><strong>Account Number:</strong> 0123456789</p>
                            <p><strong>Account Name:</strong> Kayzera Funding</p>
                        </div>
                        <p className="text-xs text-red-600"><strong>Important:</strong> Please use your email address as the transfer reference for faster processing.</p>
                    </div>
                )}
                {modalConfig.action === 'Withdraw' && (
                    <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                            <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                                <option>GTBank</option>
                                <option>Zenith Bank</option>
                                <option>Access Bank</option>
                                <option>Wema Bank</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Account Number</label>
                            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Amount (NGN)</label>
                            <input 
                                type="text" 
                                placeholder="0" 
                                value={ngnAmount}
                                onChange={handleNgnChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                            />
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Request Withdrawal</button>
                    </form>
                )}
            </WalletModal>
        </div>
    );
};

export default FiatWallet;

