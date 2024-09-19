import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import "./Confetti.scss";

interface ConfettiProps {
    width: number;
    height: number;
    run: boolean;
}

export const ConfettiComponent: React.FC<ConfettiProps> = ({ width, height, run }) => {
    const [confettiRun, setConfettiRun] = useState(false);
    const [confettiOpacity, setConfettiOpacity] = useState(1);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (run) {
            setConfettiRun(true);
            setConfettiOpacity(1); // Reset opacity to 1 when confetti starts
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setConfettiOpacity(0); // Start fading out
                setTimeout(() => {
                    setConfettiRun(false);
                }, 5000); // Wait for the fade to complete before setting confettiRun to false
            }, 10000); // 3 seconds before starting to fade
        } else {
            setConfettiRun(false);
            setConfettiOpacity(0); // Ensure confetti is invisible when run is false
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [run]);

    return confettiRun ? (
        <div className="confetti-fade" style={{ opacity: confettiOpacity }}>
            <Confetti
                width={width}
                height={height}
            />
        </div>
    ) : null;
};