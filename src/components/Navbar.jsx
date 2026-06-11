import React, { useState, useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const THEME_STORAGE_KEY = 'theme-preference';
const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

const getSystemTheme = () => {
    if (typeof window === 'undefined' || !window.matchMedia) {
        return 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getInitialThemePreference = () => {
    if (typeof window === 'undefined') {
        return 'system';
    }
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light' || stored === 'system') {
        return stored;
    }
    return 'system';
};

const ThemeToggle = ({ resolvedTheme, themePreference, themeLabel, onToggle }) => (
    <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.9 }}
        className="theme-toggle"
        title={`Theme: ${themeLabel}`}
        aria-label={`Theme: ${themeLabel}. Click to change`}
        data-tooltip={`Theme: ${themeLabel}`}
    >
        {resolvedTheme === 'dark' ? (
            <Sun size={20} className="text-yellow-400" />
        ) : (
            <Moon size={20} className="text-[var(--primary)]" />
        )}
        {themePreference === 'system' && (
            <span className="theme-toggle-system">
                <Monitor size={14} />
            </span>
        )}
    </motion.button>
);

const Navbar = () => {
    const initialThemePreference = getInitialThemePreference();
    const [isScrolled, setIsScrolled] = useState(false);
    const [themePreference, setThemePreference] = useState(initialThemePreference);
    const [resolvedTheme, setResolvedTheme] = useState(
        initialThemePreference === 'system'
            ? getSystemTheme()
            : initialThemePreference
    );
    const [activeSection, setActiveSection] = useState('home');

    const themeLabel = themePreference === 'system'
        ? 'System'
        : themePreference === 'dark'
            ? 'Dark'
            : 'Light';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const nextResolved =
            themePreference === 'system' ? getSystemTheme() : themePreference;
        // Sync resolved theme when preference changes (not a subscription)
        // eslint-disable-next-line react-hooks/set-state-in-effect -- theme preference drives resolved theme
        setResolvedTheme(nextResolved);
        document.documentElement.setAttribute('data-theme', nextResolved);
        localStorage.setItem(THEME_STORAGE_KEY, themePreference);
    }, [themePreference]);

    useEffect(() => {
        if (themePreference !== 'system' || !window.matchMedia) {
            return undefined;
        }
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (event) => {
            const next = event.matches ? 'dark' : 'light';
            setResolvedTheme(next);
            document.documentElement.setAttribute('data-theme', next);
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }

        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }, [themePreference]);

    useEffect(() => {
        let rafId = 0;

        const getSections = () =>
            navLinks.map((link) => document.querySelector(link.href)).filter(Boolean);

        const getNavOffset = () => {
            const nav = document.querySelector('.navbar');
            return (nav ? nav.offsetHeight : 80) + 8;
        };

        const updateActive = () => {
            const sections = getSections();
            if (!sections.length) {
                return;
            }

            const offset = getNavOffset();
            const scrollPosition =
                (window.scrollY || document.documentElement.scrollTop) + offset;

            let current = sections[0].id;
            for (const section of sections) {
                if (scrollPosition >= section.offsetTop) {
                    current = section.id;
                }
            }

            const pageBottom =
                window.innerHeight + (window.scrollY || document.documentElement.scrollTop);
            const docHeight = document.documentElement.scrollHeight;
            if (pageBottom >= docHeight - 2) {
                current = sections[sections.length - 1].id;
            }

            setActiveSection(current);
        };

        const handleScroll = () => {
            if (rafId) {
                return;
            }
            rafId = window.requestAnimationFrame(() => {
                rafId = 0;
                updateActive();
            });
        };

        updateActive();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        window.addEventListener('load', handleScroll);

        return () => {
            if (rafId) {
                window.cancelAnimationFrame(rafId);
            }
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            window.removeEventListener('load', handleScroll);
        };
    }, []);

    const toggleTheme = () => {
        const order = ['dark', 'light', 'system'];
        const currentIndex = order.indexOf(themePreference);
        const nextTheme = order[(currentIndex + 1) % order.length];
        setThemePreference(nextTheme);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <a href="#home" className="nav-logo text-gradient">
                    SatyaTeja
                </a>

                {/* Desktop Nav Links + Theme Toggle */}
                <div className="nav-links">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.replace('#', '');
                        return (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className={`nav-link ${isActive ? 'active' : ''}`}
                                aria-current={isActive ? 'page' : undefined}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {link.name}
                                <motion.span
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary)] origin-left"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>
                        );
                    })}
                    <ThemeToggle
                        resolvedTheme={resolvedTheme}
                        themePreference={themePreference}
                        themeLabel={themeLabel}
                        onToggle={toggleTheme}
                    />
                </div>

                {/* Resume button — desktop only */}
                <div className="nav-right">
                    <motion.a
                        href={`${import.meta.env.BASE_URL}Satya_Teja_Latest_Resume.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-button-wrapper"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="resume-button-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="resume-icon">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            <span className="resume-text">View Resume</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="resume-arrow">
                                <path d="M7 7h10v10"></path>
                                <path d="M7 17 17 7"></path>
                            </svg>
                        </div>
                    </motion.a>
                </div>

                {/* Mobile: theme toggle only — navigation lives in bottom pill bar */}
                <div className="nav-mobile-actions">
                    <ThemeToggle
                        resolvedTheme={resolvedTheme}
                        themePreference={themePreference}
                        themeLabel={themeLabel}
                        onToggle={toggleTheme}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
