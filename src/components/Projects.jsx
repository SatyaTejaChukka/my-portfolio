import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

/* ------------------ Animation Variants ------------------ */

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
    },
  },
};


/* ------------------ Data ------------------ */

const projectsData = [
  /* ---------- AI / ML Projects ---------- */

  {
    id: 1,
    title: 'Stroke Prediction App',
    category: 'AI',
    image: '🧠',
    description:
      'Machine learning application to predict stroke risk using patient health data, with model training, evaluation, and a simple backend interface.',
    tech: ['Python', 'Pandas', 'Numpy', 'FastAPI', 'Scikit-learn', 'Machine Learning'],
    github: 'https://github.com/SatyaTejaChukka',
    demo: 'https://stroke-prediction-app.vercel.app/',
  },
  {
    id: 2,
    title: 'House Price Prediction',
    category: 'AI',
    image: '🏠',
    description:
      'Regression-based machine learning project for predicting house prices with data preprocessing and model evaluation.',
    tech: ['Python', 'Pandas', 'Numpy', 'Flask', 'Scikit-learn', 'Regression'],
    github: 'https://github.com/SatyaTejaChukka',
    demo: 'https://bostonhousepricing-qi28.onrender.com/',
  },
  {
    id: 3,
    title: 'Traffic Accident Prediction',
    category: 'AI',
    image: '🚦',
    description:
      'Machine learning project for predicting traffic accident severity using historical accident data and feature-based analysis.',
    tech: ['Python', 'Pandas', 'FastAPI', 'Scikit-learn', 'Machine Learning'],
    github: 'https://github.com/SatyaTejaChukka/traffic-accident',
    demo: 'https://traffic-accident-prediction.vercel.app/',
  },
  {
    id: 4,
    title: 'Namaste Codes to ICD-11 Mapping',
    category: 'AI',
    image: '🩺',
    description:
      'Data processing project that maps Indian Namaste medical codes to ICD-11 standards using structured datasets and rule-based logic.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Data Processing', 'Healthcare Data'],
    github: 'https://github.com/SatyaTejaChukka/namaste_to_icd',
    demo: 'https://namaste-to-icd11.vercel.app/',
  },

  /* ---------- Web / Frontend Projects ---------- */

  {
    id: 5,
    title: 'Bloch Sphere Explorer',
    category: 'Web',
    image: '⚛️',
    description:
      'Interactive web application for visualizing multi-qubit quantum states using Bloch spheres and basic quantum metrics.',
    tech: ['React', 'JavaScript', 'Three.js', 'Qiskit'],
    github: 'https://github.com/SatyaTejaChukka',
    demo: 'https://bloch-sphere-explorer.vercel.app/',
  },
  {
    id: 6,
    title: 'Interview Master',
    category: 'Web',
    image: '🎤',
    description:
      'Web-based application to help users prepare for interviews by organizing questions, tracking progress, and practicing responses.',
    tech: ['React', 'JavaScript', 'Frontend Development'],
    github: 'https://github.com/SatyaTejaChukka/interviewmaster',
    demo: 'https://interview-master.vercel.app/',
  },
  {
    id: 7,
    title: 'Money Manage',
    category: 'Web',
    image: '💰',
    description:
      'Personal finance management application for tracking income, expenses, and basic budgeting in a simple user interface.',
    tech: ['React', 'JavaScript', 'FastAPI', 'PostgreSQL', 'Frontend Development'],
    github: 'https://github.com/SatyaTejaChukka/money_manage',
    demo: 'https://money-manage-app.vercel.app/',
  },
];

const CATEGORIES = ['All', 'Web', 'AI'];


/* ------------------ Component ------------------ */

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects =
    filter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Title */}
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured <span className="text-gradient">Projects</span>
        </motion.h2>

        {/* Filters */}
        <div className="filter-container">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          key={filter}
          layout
          className="projects-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={cardVariants}
                className="relative project-card glass-panel group overflow-hidden"
                whileHover={{ y: -8, boxShadow: '0 12px 30px rgba(0, 243, 255, 0.15)' }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Image / Emoji Reveal */}
                <motion.div
                  className="project-img text-6xl mb-6"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.15, rotate: 2 }}
                  transition={{ type: 'spring', stiffness: 120 }}
                >
                  {project.image}
                </motion.div>

                {/* Base Content */}
                <div className="project-info">
                  <span className="text-xs font-bold text-[var(--primary)] mb-2 block">
                    {project.category.toUpperCase()}
                  </span>

                  <h3 className="project-title">
                    {project.title}
                  </h3>

                  <p className="text-[var(--text-muted)] text-sm">
                    {project.description}
                  </p>

                  <div className="project-tech-list">
                    {project.tech.map((t) => (
                      <span key={t} className="project-tech-pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="project-actions">
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-btn"
                        title="View Live Demo"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={16} />
                        Live
                      </motion.a>
                    )}

                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-btn"
                      title="View Source Code"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} />
                      Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
