import React, { useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'Schooling',
    company: 'Gnanodaya R.C.M High School',
    period: '2014 - 2021',
    description:
      'Completed primary and secondary education with a strong foundation in academics.',
  },
  {
    id: 2,
    role: 'Intermediate - MPC',
    company: 'Sasi Junior College',
    period: '2021 - 2023',
    description:
      'Completed intermediate education with Mathematics, Physics, and Chemistry as core subjects.',
  },
  {
    id: 3,
    role: 'B.Tech in CSE (AI & ML)',
    company: 'Gayatri Vidya Parishad College of Engineering',
    period: '2023 - 2027 (Expected)',
    description:
      'CGPA: 8.79. Coursework: DSA, Computer Networks, OS, DBMS, OOP, ML, Probability & Statistics.',
  },
  {
    id: 4,
    role: 'Member',
    company: 'Rotaract Club',
    period: 'Aug 2024 - Present',
    description:
      'Organized and participated in multiple community events, building teamwork and leadership skills.',
  },
  // {
  //   id: 5,
  //   role: 'Certifications',
  //   company: 'IBM & Coursera',
  //   period: '2024',
  //   description:
  //     'Python Basics for Data Science (IBM), Supervised Machine Learning (Coursera).',
  // },
];

/* ------------------ Variants ------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const dotVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { type: 'spring', stiffness: 200 },
  },
  hover: {
    scale: 1.3,
    boxShadow: '0 0 20px rgba(0, 243, 255, 0.6)',
  },
};

const cardVariants = {
  hover: {
    boxShadow: '0 12px 30px rgba(0, 243, 255, 0.2)',
    borderColor: 'var(--primary)',
    y: -4,
  },
};

/* ------------------ Component ------------------ */

const Experience = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [hoveredId, setHoveredId] = useState(null);

  // Timeline line animation based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="section bg-[var(--bg-dark)]">
      <div className="container">
        {/* Title */}
        <motion.h2
          className="section-title"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Education & <span className="text-gradient">Experience</span>
        </motion.h2>

        {/* Timeline */}
        <motion.div
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Animated Timeline Line */}
          <motion.div
            className="timeline-line-gradient"
            style={{ height: lineHeight }}
          />

          {experiences.map((exp, index) => (
            <motion.article
              key={exp.id}
              variants={itemVariants}
              className="timeline-item"
              style={{
                flexDirection: index % 2 === 0 ? 'row-reverse' : 'row',
              }}
              onHoverStart={() => setHoveredId(exp.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              {/* Timeline Dot with Gradient */}
              <motion.div
                className="timeline-dot"
                variants={dotVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                animate={hoveredId === exp.id ? 'hover' : 'visible'}
              >
                <motion.div
                  className="timeline-dot-inner"
                  animate={{
                    boxShadow: hoveredId === exp.id
                      ? '0 0 25px rgba(0, 243, 255, 0.8), 0 0 15px rgba(189, 0, 255, 0.4)'
                      : '0 0 15px rgba(0, 243, 255, 0.4)',
                  }}
                />
              </motion.div>

              <div style={{ flex: 1 }} />

              {/* Content */}
              <div className="timeline-content">
                <motion.div
                  className="glass-panel p-6 rounded-xl relative h-full flex flex-col justify-center focus-within:ring-2 focus-within:ring-[var(--primary)] timeline-card"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="timeline-card-header">
                    <div className="timeline-company">
                      <Briefcase size={18} className="shrink-0" />
                      <span>{exp.company}</span>
                    </div>
                    <div className="timeline-period">
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <h3 className="timeline-role">
                    {exp.role}
                  </h3>

                  <p className="timeline-description">
                    {exp.description}
                  </p>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
