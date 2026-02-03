import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
    const name = "Satya Teja Chukka";
    const letters = name.split("");

    return (
        <section id="home" className="hero">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="hero-bg-circle" style={{ top: '10%', left: '10%', background: 'var(--primary)' }}></div>
                <div className="hero-bg-circle" style={{ bottom: '10%', right: '10%', background: 'var(--secondary)', animationDelay: '2s' }}></div>
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
                    <h1 className="hero-title">
                        {letters.map((letter, index) => (
                            <motion.span
                                key={index}
                                whileHover={{
                                    scale: 1.2,
                                    textShadow: "0px 0px 8px rgb(0, 243, 255)"
                                }}
                                transition={{ type: "spring", stiffness: 300 }}
                                style={{ display: 'inline-block', cursor: 'default' }}
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
