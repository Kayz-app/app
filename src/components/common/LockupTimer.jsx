import React, { useState, useEffect } from 'react';

const LockupTimer = ({ lockupEndDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(lockupEndDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000 * 60); // Update every minute is sufficient

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval] && interval !== 'days') {
            return;
        }
        timerComponents.push(
            <span key={interval} className="text-center">
                <div className="text-2xl font-bold">{timeLeft[interval]}</div>
                <div className="text-xs uppercase">{interval}</div>
            </span>
        );
    });

    return (
        <div className="flex justify-center space-x-4 text-gray-700">
            {timerComponents.length ? timerComponents : <span>Lockup period ended.</span>}
        </div>
    );
};

export default LockupTimer;
