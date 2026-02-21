import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, User, MousePointer2, CheckCircle } from 'lucide-react';

const EMAIL_ADDRESS = 'satyateja671@gmail.com';
const RESUME_URL = `${import.meta.env.BASE_URL}Satya_Teja_Latest_Resume.pdf`;

const validateEmail = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
        return 'Email is required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
        return 'Enter a valid email address.';
    }
    return '';
};

const validateField = (name, value) => {
    const trimmed = value.trim();
    if (name === 'name') {
        if (!trimmed) {
            return 'Name is required.';
        }
        if (trimmed.length < 2) {
            return 'Name must be at least 2 characters.';
        }
    }
    if (name === 'email') {
        return validateEmail(value);
    }
    if (name === 'message') {
        if (!trimmed) {
            return 'Message is required.';
        }
        if (trimmed.length < 10) {
            return 'Message should be at least 10 characters.';
        }
    }
    return '';
};

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [copied, setCopied] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (touched[name]) {
            setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
        }
        if (status === 'invalid') {
            setStatus('');
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const validateForm = () => {
        const nextErrors = {
            name: validateField('name', formData.name),
            email: validateField('email', formData.email),
            message: validateField('message', formData.message),
        };
        setErrors(nextErrors);
        setTouched({ name: true, email: true, message: true });
        return !Object.values(nextErrors).some(Boolean);
    };

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL_ADDRESS);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy email:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('');

        if (!validateForm()) {
            setStatus('invalid');
            return;
        }
        setStatus('sending');

        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxVLDlMZIOcNqq1NzD323h_HGgLjCya0x6y3QOu1YEg0xqU4P3DN25msSqOgCHxEAlP/exec";

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors", // Important for Google Apps Script
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setErrors({});
            setTouched({});
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            console.error("Error:", error);
            setStatus('error');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    return (
        <section id="contact" className="section">
            <div className="container">
                <h2 className="section-title">
                    Get In <span className="text-gradient">Touch</span>
                </h2>

                <div className="contact-grid">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6">Let's Talk</h3>
                        <p className="text-[var(--text-muted)] mb-8">
                            Have a project in mind or just want to say hi? Feel free to reach out.
                            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>

                        <div className="space-y-6">
                            <a href={`mailto:${EMAIL_ADDRESS}`} className="contact-item group">
                                <div className="p-2">
                                    <Mail size={24} className="text-[var(--primary)] group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="contact-item-content">
                                    <h4 className="font-bold">Email</h4>
                                    <p className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">{EMAIL_ADDRESS}</p>
                                </div>
                                <div className="contact-inline-actions">
                                    <button
                                        type="button"
                                        className="copy-email-btn"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleCopyEmail();
                                        }}
                                        aria-label="Copy email address"
                                    >
                                        Copy
                                    </button>
                                </div>
                                <span className="contact-click" aria-hidden="true">
                                    <MousePointer2 size={18} />
                                </span>
                            </a>

                            <a href="tel:+916301304206" className="contact-item group">
                                <div className="p-2">
                                    <Phone size={24} className="text-[var(--primary)] group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="contact-item-content">
                                    <h4 className="font-bold">Phone</h4>
                                    <p className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">+91 6301304206</p>
                                </div>
                                <span className="contact-click" aria-hidden="true">
                                    <MousePointer2 size={18} />
                                </span>
                            </a>

                            <a href="https://wa.me/916301304206" target="_blank" rel="noopener noreferrer" className="contact-item group">
                                <div className="p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--primary)] group-hover:scale-110 transition-transform">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </div>
                                <div className="contact-item-content">
                                    <h4 className="font-bold">WhatsApp</h4>
                                    <p className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">+91 6301304206</p>
                                </div>
                                <span className="contact-click" aria-hidden="true">
                                    <MousePointer2 size={18} />
                                </span>
                            </a>
                        </div>

                        {/* Resume Button */}
                        <div className="mt-auto pt-12 border-t-2 border-[var(--glass-border)] flex justify-center" style={{ marginTop: '50px' }}>
                            <motion.a
                                href={RESUME_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="resume-button-wrapper"
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.97 }}
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

                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel contact-form-container"
                    >
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label className="form-label" htmlFor="contact-name">Name</label>
                                <div className="input-wrapper">
                                    <User size={20} className="input-icon" />
                                    <input
                                        type="text"
                                        name="name"
                                        id="contact-name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        className={`form-input ${errors.name ? 'input-error' : ''}`}
                                        placeholder="Your Name"
                                        aria-invalid={Boolean(errors.name)}
                                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                                    />
                                </div>
                                {errors.name && (
                                    <p id="contact-name-error" className="form-error" role="alert">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="contact-email">Email</label>
                                <div className="input-wrapper">
                                    <Mail size={20} className="input-icon" />
                                    <input
                                        type="email"
                                        name="email"
                                        id="contact-email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        className={`form-input ${errors.email ? 'input-error' : ''}`}
                                        placeholder="your@email.com"
                                        aria-invalid={Boolean(errors.email)}
                                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                                    />
                                </div>
                                {errors.email && (
                                    <p id="contact-email-error" className="form-error" role="alert">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="contact-message">Message</label>
                                <textarea
                                    name="message"
                                    id="contact-message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    rows="4"
                                    className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                                    placeholder="Your message..."
                                    aria-invalid={Boolean(errors.message)}
                                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                                ></textarea>
                                {errors.message && (
                                    <p id="contact-message-error" className="form-error" role="alert">
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="btn btn-primary w-full flex items-center justify-center gap-2"
                                style={{ width: '100%' }}
                            >
                                {status === 'sending' ? 'Sending...' : (
                                    <>
                                        Send Message <Send size={18} />
                                    </>
                                )}
                            </button>

                            <div
                                className="form-status"
                                role={status === 'error' || status === 'invalid' ? 'alert' : 'status'}
                                aria-live={status === 'error' || status === 'invalid' ? 'assertive' : 'polite'}
                            >
                                {status === 'success' && (
                                    <div className="form-success">
                                        <CheckCircle size={18} />
                                        <span>Message sent successfully!</span>
                                        <div className="confetti" aria-hidden="true">
                                            {Array.from({ length: 12 }).map((_, index) => (
                                                <span key={index} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {status === 'error' && (
                                    <p className="text-red-400 text-center">Failed to send message. Please try again.</p>
                                )}
                                {status === 'invalid' && (
                                    <p className="text-amber-400 text-center">Please fix the highlighted fields.</p>
                                )}
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
            <div
                className={`copy-toast ${copied ? 'show' : ''}`}
                role="status"
                aria-live="polite"
            >
                Email copied to clipboard
            </div>
        </section>
    );
};

export default Contact;
