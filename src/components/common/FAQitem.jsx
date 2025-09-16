import React, { useState } from 'react';

// Inlined icon component to resolve the import error.
const ChevronDownIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const FaqItem = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="py-6 border-b border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full text-lg font-medium text-left text-gray-900"
            >
                <span>{question}</span>
                <ChevronDownIcon className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="mt-4 pr-12">
                    <p className="text-base text-gray-600">
                        {children}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FaqItem;

