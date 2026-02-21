import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
    const name = "Satya Teja Chukka";
    const letters = name.split("");
    const [isWaving, setIsWaving] = useState(false);
    const [tiltStyles, setTiltStyles] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleDeviceOrientation = (event) => {
            // gamma is left/right tilt [-90, 90]
            // beta is front/back tilt [-180, 180]
            const gamma = event.gamma;
            const beta = event.beta;

            if (gamma !== null && beta !== null) {
                // Constrain values to a reasonable range and multiply to exaggerate the movement slightly
                const maxTilt = 20; // max px to move
                const xTilt = Math.min(Math.max(gamma, -30), 30) / 30 * maxTilt;
                // Subtract 45 from beta to assume holding phone at a slight angle is 'zero'
                const yTilt = Math.min(Math.max(beta - 45, -30), 30) / 30 * maxTilt;

                setTiltStyles({ x: xTilt, y: yTilt });
            }
        };

        // Check if DeviceOrientation is supported and request permission if needed (iOS 13+)
        if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('deviceorientation', handleDeviceOrientation);
            }
        };
    }, []);

    const handleTap = () => {
        if (isWaving) return;
        setIsWaving(true);
        // Reset state after the full wave completes
        setTimeout(() => setIsWaving(false), letters.length * 40 + 600);
    };

    return (
        <section id="home" className="hero overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <motion.div 
                    className="hero-bg-circle" 
                    animate={{ x: tiltStyles.x * -1.5, y: tiltStyles.y * -1.5 }}
                    transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
                    style={{ top: '10%', left: '10%', background: 'var(--primary)' }}
                ></motion.div>
                <motion.div 
                    className="hero-bg-circle" 
                    animate={{ x: tiltStyles.x * 2, y: tiltStyles.y * 2 }}
                    transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
                    style={{ bottom: '10%', right: '10%', background: 'var(--secondary)', animationDelay: '2s' }}
                ></motion.div>
            </div>

            <div className="container hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-xl text-[var(--primary)] font-medium mb-4">
                        Hello, I'm
                    </h2>
                    <h1 
                        className="hero-title"
                        onClick={handleTap}
                        style={{ cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
                        aria-label="Interactive name: tap for animation"
                    >
                        {letters.map((letter, index) => (
                            <motion.span
                                key={index}
                                animate={isWaving ? {
                                    scale: [1, 1.25, 1],
                                    textShadow: [
                                        "0px 0px 0px transparent",
                                        "0px 0px 12px rgb(0, 243, 255)",
                                        "0px 0px 0px transparent"
                                    ],
                                    color: ["var(--text-main)", "#fff", "var(--text-main)"]
                                } : {}}
                                transition={isWaving ? {
                                    duration: 0.5,
                                    delay: index * 0.035,
                                    ease: "easeInOut"
                                } : { type: "spring", stiffness: 300 }}
                                whileHover={{
                                    scale: 1.2,
                                    textShadow: "0px 0px 8px rgb(0, 243, 255)"
                                }}
                                style={{ display: 'inline-block' }}
                                className={`hero-title-letter ${letter === " " ? "mr-4" : ""}`}
                            >
                                {letter === " " ? "\u00A0" : letter}
                            </motion.span>
                        ))}
                    </h1>
                    <h3 className="hero-subtitle">
                        B.Tech CSE (AI & ML) Student
                    </h3>
                    <p className="hero-desc">
                        Building backend APIs and machine-learning applications using Python, FastAPI, and core ML libraries.
                    </p>

                    <motion.div 
                        className="hero-badge"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <span className="hero-badge-dot"></span>
                        Open to Software Engineering & ML Internships
                    </motion.div>

                    <div className="flex justify-center gap-4">
                        <a href="#projects" className="btn btn-primary">
                            View Work
                        </a>
                        <a href="#contact" className="btn btn-outline glass-panel">
                            Contact Me
                        </a>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="scroll-indicator"
            >
                <ArrowDown />
            </motion.div>
        </section>
    );
};

export default Hero;
