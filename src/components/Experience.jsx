import React, { useState, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import SpotlightCard from './SpotlightCard';


/* ------------------ Data ------------------ */

const experiences = [
  {
    id: 1,
    role: 'B.Tech in CSE (AI & ML)',
    company: 'Gayatri Vidya Parishad College of Engineering',
    period: '2023 - Present',
    description:
      'CGPA: 8.79. Coursework: DSA, Computer Networks, OS, DBMS, OOP, ML, Probability & Statistics.',
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
    role: 'Schooling',
    company: 'Gnanodaya R.C.M High School',
    period: '2014 - 2021',
    description:
      'Completed primary and secondary education with a strong foundation in academics.',
  },


  // {
  //   id: 4,
  //   role: 'Member',
  //   company: 'Rotaract Club',
  //   period: 'Aug 2024 - Present',
  //   description:
  //     'Organized and participated in multiple community events, building teamwork and leadership skills.',
  // },
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

/* ------------------ Variants ------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: (direction) => ({
    opacity: 0,
    y: 40,
    x: direction > 0 ? 60 : -60,
    rotate: direction > 0 ? 2 : -2,
    scale: 0.98,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const dotVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { type: 'spring', stiffness: 200 },
  },
  active: {
    scale: 1.15,
    boxShadow: '0 0 30px rgba(0, 243, 255, 0.6)',
  },
  hover: {
    scale: 1.3,
    boxShadow: '0 0 20px rgba(0, 243, 255, 0.6)',
  },
};

const cardVariants = {
  hidden: {
    opacity: 0.75,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  hover: {
    boxShadow: '0 18px 50px rgba(0, 243, 255, 0.25)',
  },

};

/* ------------------ Timeline Item ------------------ */

const TimelineItem = ({
  exp,
  index,
  isActive,
  onEnter,
  hoveredId,
  setHoveredId,
  reduceMotion,
}) => {
  const itemRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['0.9 1', '0.2 0'],
  });

  const isRight = index % 2 !== 0;
  const direction = isRight ? 1 : -1;

  const parallaxX = useSpring(
    useTransform(scrollYProgress, [0, 1], isRight ? [12, -8] : [-12, 8]),
    { stiffness: 120, damping: 22 }
  );

  const parallaxY = useSpring(
    useTransform(scrollYProgress, [0, 1], [14, -14]),
    { stiffness: 120, damping: 22 }
  );

  return (
    <motion.article
      ref={itemRef}
      className="timeline-item"
      variants={itemVariants}
      custom={direction}
      style={{ flexDirection: isRight ? 'row' : 'row-reverse' }}
      onViewportEnter={() => onEnter(exp.id)}
      onHoverStart={() => setHoveredId(exp.id)}
      onHoverEnd={() => setHoveredId(null)}
      viewport={{ amount: 0.55 }}
    >
      {/* Dot */}
      <motion.div
        className="timeline-dot"
        variants={dotVariants}
        initial="hidden"
        whileInView="visible"
        animate={hoveredId === exp.id || isActive ? 'active' : 'visible'}
        whileHover="hover"
      >
        <span className="timeline-dot-ring" />
      </motion.div>

      <div style={{ flex: 1 }} />

      {/* Card */}
      <motion.div
        className="timeline-content"
        style={{
          x: reduceMotion ? 0 : parallaxX,
          y: reduceMotion ? 0 : parallaxY,
        }}
      >
        <SpotlightCard color="rgba(189, 0, 255, 0.12)" className="timeline-card-spotlight">
          <motion.div
            className="glass-panel p-6 rounded-xl timeline-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ amount: 0.55 }}
          >
            <div className="timeline-card-header">
              <div className="timeline-company">
                <Briefcase size={18} />
                <span>{exp.company}</span>
              </div>
              <div className="timeline-period">
                <Calendar size={14} />
                <span>{exp.period}</span>
              </div>
            </div>

            <h3 className="timeline-role">{exp.role}</h3>
            <p className="timeline-description">{exp.description}</p>
          </motion.div>
        </SpotlightCard>

      </motion.div>
    </motion.article>
  );
};

/* ------------------ Main Component ------------------ */

const Experience = () => {
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [activeId, setActiveId] = useState(experiences[0]?.id ?? null);

  /* ✅ Scroll-linked timeline line */
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  const lineHeight = useTransform(
    smoothProgress,
    (v) => `${v * 100}%`
  );

  return (
    <section id="experience" className="section bg-[var(--bg-dark)]">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Education & <span className="text-gradient">Experience</span>
        </motion.h2>

        <motion.div
          ref={timelineRef}
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* ✅ Animated Timeline Glow Line */}
          <motion.div
            className="timeline-line-gradient"
            style={{
              height: lineHeight,
              boxShadow: '0 0 30px rgba(0,243,255,0.75)',
            }}
          />

          {experiences.map((exp, index) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              index={index}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              isActive={activeId === exp.id}
              onEnter={setActiveId}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;