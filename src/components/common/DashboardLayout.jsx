import React, { useState, useEffect, useRef } from 'react';

// Inlined icon components to resolve the import error.
const KayzeraLogo = (props) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
    </svg>
);

const BellIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const LogOutIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

const MenuIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const XIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const DashboardLayout = ({ children, sidebarItems, activeItem, setActiveItem, onLogout, currentUser, totalBalance }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const notificationContainerRef = useRef(null);

    // FIX: Add a guard clause to handle the case where currentUser is not yet loaded.
    if (!currentUser) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-xl font-semibold text-gray-700">Loading Dashboard...</div>
            </div>
        );
    }

    useEffect(() => {
        // Tailor notifications based on user type
        if (currentUser.type === 'admin') {
            setNotifications([
                { id: 1, text: 'New project "Ikeja Tech Hub" submitted for approval.', read: false, time: '5m ago' },
                { id: 2, text: 'User Bayo Adekunle has submitted KYC documents.', read: false, time: '1h ago' },
                { id: 3, text: 'Eko Atlantic Tower has reached 50% funding.', read: true, time: '4h ago' },
            ]);
        } else { // Default for investor/developer
            setNotifications([
                { id: 1, text: 'Your KYC has been approved.', read: false, time: '2h ago' },
                { id: 2, text: 'Lekki Pearl Residence is now fully funded!', read: false, time: '1d ago' },
                { id: 3, text: 'Welcome to Kayzera! Complete your profile to start investing.', read: true, time: '3d ago' },
            ]);
        }
    }, [currentUser.type]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationContainerRef.current && !notificationContainerRef.current.contains(event.target)) {
                setNotificationsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNavItemClick = (itemName) => {
        setActiveItem(itemName);
        setIsMobileMenuOpen(false);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    const SidebarContent = () => (
        <div className="flex-grow">
            <div className="p-6">
                 <div className="flex items-center gap-2">
                    <KayzeraLogo className="h-8 w-8 text-indigo-600" />
                    <span className="text-xl font-bold text-gray-800">Kayzera</span>
                </div>
            </div>
            <nav className="mt-6">
                {sidebarItems.map(item => (
                    <a
                        key={item.name}
                        href="#"
                        onClick={(e) => {e.preventDefault(); handleNavItemClick(item.name)}}
                        className={`flex items-center py-3 px-6 text-gray-600 transition-colors duration-200 ${activeItem === item.name ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-500' : 'hover:bg-gray-50'}`}
                    >
                        {item.icon}
                        <span className="mx-4 font-medium">{item.name}</span>
                    </a>
                ))}
            </nav>
        </div>
    );

    return (
        <div className="bg-gray-100 flex-1 flex">
            <div className="flex w-full">
                {/* Desktop Sidebar */}
                <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
                    <SidebarContent />
                </aside>

                {/* Mobile Sidebar */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
                )}
                <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-30 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                     <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-1">
                        <XIcon className="h-6 w-6" />
                    </button>
                    <SidebarContent />
                </aside>


                {/* Main Content */}
                <main className="flex-1 flex flex-col h-screen">
                     <div className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10 border-b">
                        <div className="flex items-center">
                             <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden mr-4 p-2 rounded-full text-gray-500 hover:text-indigo-600">
                                <MenuIcon className="h-6 w-6"/>
                            </button>
                            <h1 className="text-2xl font-bold text-gray-800">{activeItem}</h1>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="hidden sm:flex items-center gap-4">
                                <span className="text-gray-700 text-sm">Welcome, {currentUser.name.split(' ')[0]}</span>
                                {currentUser.wallet && (
                                     <div className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1.5 rounded-full">
                                        {formatCurrency(totalBalance)}
                                    </div>
                                )}
                            </div>

                            <div className="relative" ref={notificationContainerRef}>
                                <button
                                    onClick={() => setNotificationsOpen(prev => !prev)}
                                    className="relative p-2 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    title="Notifications"
                                >
                                    <BellIcon className="h-6 w-6" />
                                    {notifications.some(n => !n.read) && (
                                        <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                                    )}
                                </button>
                                {notificationsOpen && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-20 border">
                                        <div className="p-4 flex justify-between items-center border-b">
                                            <h4 className="font-semibold text-gray-800">Notifications</h4>
                                            <button
                                                onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                                                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 disabled:text-gray-400"
                                                disabled={!notifications.some(n => !n.read)}
                                            >
                                                Mark all as read
                                            </button>
                                        </div>
                                        <div className="divide-y max-h-96 overflow-y-auto">
                                            {notifications.length > 0 ? (
                                                notifications.map(notification => (
                                                    <div
                                                        key={notification.id}
                                                        onClick={() => setNotifications(notifications.map(n => n.id === notification.id ? { ...n, read: true } : n))}
                                                        className={`p-4 flex items-start cursor-pointer hover:bg-gray-50 ${!notification.read ? 'bg-indigo-50' : ''}`}
                                                    >
                                                        <div className={`flex-shrink-0 w-2 h-2 mt-1.5 rounded-full ${!notification.read ? 'bg-indigo-500' : 'bg-transparent'}`}></div>
                                                        <div className="ml-3">
                                                            <p className="text-sm text-gray-700">{notification.text}</p>
                                                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-center text-gray-500 py-8">No new notifications.</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={onLogout}
                                className="p-2 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                title="Logout"
                            >
                                <LogOutIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

