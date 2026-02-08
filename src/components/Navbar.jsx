import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Monitor, ChevronRight } from 'lucide-react';
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

const Navbar = () => {
    const initialThemePreference = getInitialThemePreference();
    const [isOpen, setIsOpen] = useState(false);
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

                {/* Desktop Menu */}
                <div className="nav-links hidden md:flex">
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
                    <motion.button
                        onClick={toggleTheme}
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
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-btn">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-full left-0 w-full mobile-menu"
                >
                    <div className="mobile-menu-panel glass-panel">
                        <div className="mobile-menu-header">
                            <span>Menu</span>
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="theme-toggle"
                                aria-label={`Theme: ${themeLabel}. Click to change`}
                                title={`Theme: ${themeLabel}`}
                                data-tooltip={`Theme: ${themeLabel}`}
                            >
                                {resolvedTheme === 'dark' ? (
                                    <Sun size={18} className="text-yellow-400" />
                                ) : (
                                    <Moon size={18} className="text-[var(--primary)]" />
                                )}
                                {themePreference === 'system' && (
                                    <span className="theme-toggle-system">
                                        <Monitor size={12} />
                                    </span>
                                )}
                            </button>
                        </div>

                        <div className="mobile-menu-links">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href.replace('#', '');
                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        className={`mobile-menu-link ${isActive ? 'active' : ''}`}
                                        aria-current={isActive ? 'page' : undefined}
                                        onClick={() => setIsOpen(false)}
                                        whileHover={{ x: 6 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>{link.name}</span>
                                        <span className="mobile-menu-arrow" aria-hidden="true">
                                            <ChevronRight size={16} />
                                        </span>
                                </motion.a>
                            );
                            })}
                        </div>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
