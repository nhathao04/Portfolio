import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, ArrowRight } from 'lucide-react';
import styles from './Home.module.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className={styles.home}>
      <motion.div 
        className={styles.hero}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className={styles.greeting} variants={itemVariants}>
          <span className={styles.caption}>Let's create!</span>
        </motion.div>

        <motion.h1 className={styles.title} variants={itemVariants}>
          I'm <span className={styles.name}>Thanh Tuyen</span><br />
          Digital designer and <br />
          illustrator.
        </motion.h1>

        <motion.div className={styles.actionWrapper} variants={itemVariants}>
          <div className={styles.actions}>
            <a href="#portfolio" className={styles.workLink}>
              <span>My Works</span> 
              <span className={styles.arrowIcon}>
                <ArrowRight size={16} />
              </span>
            </a>
            <a href="#resume" className={styles.downloadLink}>
              <span>Download CV</span>
              <span className={styles.arrowDownIcon}>
                <Download size={16} />
              </span>
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.scrollCircle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <div className={styles.circle}>
          <ArrowDown size={16} className={styles.circleIcon} />
          <div className={styles.circleText}>
            <svg viewBox="0 0 100 100" width="90" height="90">
              <defs>
                <path
                  id="circle"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text fontSize="8.5">
                <textPath xlinkHref="#circle">
                  SCROLL DOWN • SCROLL DOWN • SCROLL DOWN •
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home; 