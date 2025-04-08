import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import styles from './Portfolio.module.css';

const categories = ['All', 'UI/UX Design', 'Web Development', 'Branding', 'Motion'];

const projects = [
  {
    id: 1,
    title: 'Modern E-commerce App',
    category: 'UI/UX Design',
    description: 'A modern e-commerce app designed for a seamless shopping experience.',
    imageUrl: '#',
  },
  {
    id: 2,
    title: 'Brand Identity Design',
    category: 'Branding',
    description: 'Complete brand identity design for a tech startup.',
    imageUrl: '#',
  },
  {
    id: 3,
    title: 'Financial Dashboard',
    category: 'Web Development',
    description: 'Interactive dashboard for financial data visualization.',
    imageUrl: '#',
  },
  {
    id: 4,
    title: 'Product Animation',
    category: 'Motion',
    description: '3D animation showcasing product features.',
    imageUrl: '#',
  },
  {
    id: 5,
    title: 'Travel App UI',
    category: 'UI/UX Design',
    description: 'User interface design for a travel planning application.',
    imageUrl: '#',
  },
  {
    id: 6,
    title: 'SaaS Website Redesign',
    category: 'Web Development',
    description: 'Complete redesign of a software-as-a-service website.',
    imageUrl: '#',
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className={styles.portfolio}>
      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My <span className="neon-text">Portfolio</span>
      </motion.h1>

      <motion.p 
        className={styles.subtitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Explore my latest projects and creative works
      </motion.p>

      <motion.div 
        className={styles.categories}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryBtn} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </motion.div>

      <motion.div 
        className={styles.projectsGrid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id}
              className={styles.projectCard}
              onClick={() => handleProjectClick(project)}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className={styles.projectImage}>
                <div className={styles.imageOverlay}>
                  <button className={styles.viewProject}>
                    View Project
                  </button>
                </div>
              </div>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectCategory}>{project.category}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <button className={styles.closeBtn} onClick={closeModal}>
                &times;
              </button>
              
              <div className={styles.modalImage}>
                {/* Project image would go here */}
              </div>
              
              <div className={styles.modalDetails}>
                <h2>{selectedProject.title}</h2>
                <p className={styles.modalCategory}>{selectedProject.category}</p>
                <p className={styles.modalDescription}>{selectedProject.description}</p>
                
                <div className={styles.modalActions}>
                  <a href="#" className={styles.liveLink}>
                    View Live
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio; 