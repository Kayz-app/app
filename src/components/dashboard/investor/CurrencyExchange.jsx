import React, { useState, useEffect } from 'react';

// --- INLINED ICONS --- //
const RepeatIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg> );

const CurrencyExchange = ({ currentUser }) => {
    const USD_NGN_RATE = 1500;
    const [fromAmount, setFromAmount] = useState('150,000');
    const [toAmount, setToAmount] = useState('100.00');
    const [fromCurrency, setFromCurrency] = useState('NGN');
    const [toCurrency, setToCurrency] = useState('USDT');

    const handleSwapCurrencies = () => {
        const oldFromAmount = fromAmount;
        setFromAmount(toAmount);
        setToAmount(oldFromAmount);
        
        const oldFromCurrency = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(oldFromCurrency);
    };

    useEffect(() => {
        const numericFrom = parseFloat(String(fromAmount).replace(/,/g, '')) || 0;
        if (numericFrom === 0) {
            setToAmount('');
            return;
        }

        let newToAmount;
        if (fromCurrency === 'NGN') { // NGN -> Crypto
            newToAmount = (numericFrom / USD_NGN_RATE).toFixed(2);
        } else { // Crypto -> NGN
            newToAmount = numericFrom * USD_NGN_RATE;
            newToAmount = newToAmount.toLocaleString('en-US', {maximumFractionDigits: 0});
        }
        setToAmount(newToAmount);

    }, [fromAmount, fromCurrency, toCurrency]);

    const handleFromAmountChange = (e) => {
        let value = e.target.value;
        if (fromCurrency === 'NGN') {
            const numericString = value.replace(/[^0-9]/g, '');
            setFromAmount(numericString ? parseInt(numericString, 10).toLocaleString('en-US') : '');
        } else {
            let cleanValue = value.replace(/[^0-9.]/g, '');
            const parts = cleanValue.split('.');
            if (parts.length > 2) cleanValue = parts[0] + '.' + parts.slice(1).join('');
            setFromAmount(cleanValue);
        }
    };
    
    const renderCurrencySelector = (currency, setCurrency) => {
        const isCrypto = ['USDT', 'USDC'].includes(currency);
        if (isCrypto) {
            return (
                 <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="text-xl font-semibold border-0 focus:ring-0 bg-gray-100 rounded-md p-2">
                    <option>USDT</option>
                    <option>USDC</option>
                </select>
            );
        }
        return <span className="text-xl font-semibold bg-gray-100 rounded-md py-2 px-4">{currency}</span>
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Exchange NGN & Crypto</h2>
            <div className="space-y-2">
                <div className="p-4 border rounded-lg">
                     <label className="text-sm font-medium text-gray-500">You Pay</label>
                     <div className="flex items-center"><input type="text" value={fromAmount} onChange={handleFromAmountChange} className="w-full text-3xl font-bold border-0 p-0 focus:ring-0 bg-transparent" placeholder="0"/>{renderCurrencySelector(fromCurrency, setFromCurrency)}</div>
                </div>
                <div className="flex justify-center py-2"><button onClick={handleSwapCurrencies} className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-indigo-600"><RepeatIcon className="w-6 h-6"/></button></div>
                <div className="p-4 border rounded-lg bg-gray-50">
                    <label className="text-sm font-medium text-gray-500">You Receive (approx.)</label>
                     <div className="flex items-center"><input type="text" value={toAmount} readOnly className="w-full text-3xl font-bold border-0 p-0 focus:ring-0 bg-transparent text-gray-700" placeholder="0"/>{renderCurrencySelector(toCurrency, setToCurrency)}</div>
                </div>
                <div className="pt-2 text-sm text-gray-600 text-center"><p>Rate: 1 {fromCurrency === 'NGN' ? toCurrency : fromCurrency} ≈ {USD_NGN_RATE.toLocaleString()} {fromCurrency === 'NGN' ? fromCurrency : toCurrency}</p><p>Fee: 0.5% (included)</p></div>
                <div className="pt-2"><button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700">Convert</button></div>
            </div>
        </div>
    );
};

export default CurrencyExchange;
