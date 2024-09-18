import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

interface ConfettiProps {
    width: number;
    height: number;
    run: boolean;
}

export const ConfettiComponent: React.FC<ConfettiProps> = ({ width, height, run }) => {
    const [confettiRun, setConfettiRun] = useState(false);

    useEffect(() => {
        if (run) {
            setConfettiRun(true);
            const timer = setTimeout(() => setConfettiRun(false), 5000); // Run confetti for 5 seconds
            return () => clearTimeout(timer);
        } else {
            setConfettiRun(false);
        }
    }, [run]);

    return confettiRun ? (
        <Confetti
            width={width}
            height={height}
        />
    ) : null;
};