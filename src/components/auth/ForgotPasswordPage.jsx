import React from 'react';

// Inlined components to resolve import errors.
const KayzeraLogo = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#6366f1', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#4f46e5', stopOpacity: 1}} />
      </linearGradient>
    </defs>
    <path d="M4 4H8V20H4V4Z" fill="url(#logoGradient)" />
    <path d="M9 11L16 4L20 8L13 15V20H9V11Z" fill="url(#logoGradient)" />
  </svg>
);

const AuthPage = ({ children, title, setPage }) => {
    return (
        <div className="bg-gray-100 flex flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <a href="#" onClick={(e) => { e.preventDefault(); setPage('landing'); }} className="flex justify-center items-center gap-2 no-underline">
                    <KayzeraLogo className="h-10 w-auto"/>
                    <span className="text-3xl font-bold text-gray-800">Kayzera</span>
                </a>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{title}</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
                    {children}
                </div>
            </div>
        </div>
    );
};

const ForgotPasswordPage = ({ setPage }) => {
    return (
        <AuthPage title="Reset your password" setPage={setPage}>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email address</label>
                    <input type="email" required className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                 <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Send Reset Link</button>
                </div>
            </form>
             <div className="text-sm text-center mt-4">
                <p className="text-gray-600">Remembered your password? <a href="#" onClick={() => setPage('login')} className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</a></p>
            </div>
        </AuthPage>
    );
};

export default ForgotPasswordPage;

