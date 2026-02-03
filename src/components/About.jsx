import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import profileImg from '../assets/profile.png';

const About = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const skills = [
        { name: 'Python / C++', level: 90 },
        { name: 'Machine Learning / AI', level: 85 },
        { name: 'FastAPI / Flask', level: 80 },
        { name: 'Git / GitHub', level: 75 },
        { name: 'React.js / HTML / CSS', level: 85 },
    ];

    return (
        <section id="about" className="section bg-[var(--bg-dark)]">
            <div className="container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="about-grid"
                >
                    {/* Profile Image */}
                    <div className="profile-img-container group">
                        <div className="profile-img glass-panel overflow-hidden">
                            <img
                                src={profileImg}
                                alt="Satya Teja Chukka"
                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="section-title about-title text-left md:text-left mb-4">
                            About <span className="text-gradient">Me</span>
                        </h2>
                        <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
                            I am a B.Tech CSE (AI & ML) student (Class of 2027) with a strong foundation in Computer Science, Networking, and Software Engineering.
                            I have experience building full-stack applications and ML solutions using technologies like FastAPI, Docker, and AWS.
                            I am actively seeking internships to apply my problem-solving and development skills in real-world projects.
                        </p>

                        <div className="space-y-6">
                            {skills.map((skill, index) => (
                                <div key={skill.name} className="skill-bar-container">
                                    <div className="skill-info">
                                        <span className="font-medium">{skill.name}</span>
                                        <span className="text-[var(--text-muted)]">{skill.level}%</span>
                                    </div>
                                    <div className="skill-track">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={inView ? { width: `${skill.level}%` } : {}}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                            className="skill-progress"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
