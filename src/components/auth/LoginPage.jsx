import React, { useState } from 'react';

// Inlined KayzeraLogo and AuthPage components to resolve the import error.
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


const LoginPage = ({ setPage, setCurrentUser, users }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const user = Object.values(users).find(u => u.email === email);
        if (user && user.password === password) {
            setCurrentUser(user);
        } else {
            setError('Invalid email or password.');
        }
    };

    const loginAs = (userEmail) => {
        const user = Object.values(users).find(u => u.email === userEmail);
        if (user) {
            setCurrentUser(user);
        }
    };
    
    return (
        <AuthPage title="Sign in to your account" setPage={setPage}>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                    <div className="mt-1">
                        <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                </div>
                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1">
                        <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                </div>
                 <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <a href="#" onClick={() => setPage('forgotPassword')} className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                    </div>
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign in</button>
                </div>
            </form>
             <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
                    <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with a demo</span></div>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-3">
                    <button onClick={() => loginAs('investor@demo.com')} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">Login as Investor (Verified)</button>
                    <button onClick={() => loginAs('buyer@demo.com')} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">Login as Investor (Unverified)</button>
                    <button onClick={() => loginAs('developer@demo.com')} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">Login as Developer</button>
                    <button onClick={() => loginAs('admin@demo.com')} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">Login as Admin</button>
                </div>
            </div>
            <div className="text-sm text-center mt-4">
                <p className="text-gray-600">Don't have an account? <a href="#" onClick={() => setPage('register')} className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a></p>
            </div>
        </AuthPage>
    );
};

export default LoginPage;

