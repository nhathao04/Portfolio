import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowDown, Download, ArrowRight, Star, Github } from 'lucide-react';
import styles from './Home.module.css';
import profileImage from '../assets/solo/8.jpg';

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
  
  const nameCharacters = "Thanh Tuyen".split("");
  
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + (i * 0.05),
        duration: 0.5,
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    })
  };
  
  const descriptionText = "I'm glad you're here. This is where I share a bit about who I am, what I do, and the things I'm passionate about. Feel free to look around and get to know me better. Thanks for visiting!";
  const descriptionWords = descriptionText.split(" ");
  
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5 + (i * 0.03),
        duration: 0.3,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    })
  };
  
  const floatingStars = Array(5).fill().map((_, i) => ({
    id: i,
    top: `${10 + Math.random() * 70}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 12 + 6,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 5
  }));

  return (
    <div className={styles.home}>
      <div className={styles.starsContainer}>
        {floatingStars.map(star => (
          <motion.div
            key={star.id}
            className={styles.floatingStar}
            style={{
              top: star.top,
              left: star.left,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2], 
              scale: [0.8, 1.2, 0.8],
              y: [0, -15, 0]
            }}
            transition={{
              delay: star.delay,
              duration: star.duration,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Star size={star.size} />
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className={styles.hero}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className={styles.heroContent}>
          <motion.div className={styles.greeting} variants={itemVariants}>
            <motion.span 
              className={styles.caption}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.span 
                className={styles.wave}
                animate={{ rotate: [0, 20, -20, 20, 0] }}
                transition={{ delay: 1, duration: 0.8, repeat: 2, repeatDelay: 1 }}
              >
                👋
              </motion.span>
              <motion.span className={styles.greetingText}>
                Hi there, welcome to my personal page!
              </motion.span>
            </motion.span>
          </motion.div>

          <motion.h1 className={styles.title} variants={itemVariants}>
            <motion.span className={styles.imText}>
              I'm{" "}
            </motion.span>
            <div className={styles.nameWrapper}>
              {nameCharacters.map((char, index) => (
                <motion.span
                  key={index}
                  className={styles.nameChar}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    display: 'inline-block',
                    color: 'transparent',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    backgroundImage: 'linear-gradient(90deg, #fe53c0, #836bea, #fe53c0)',
                    backgroundSize: '200% auto',
                    fontWeight: '800'
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            <div className={styles.description}>
              {descriptionWords.map((word, index) => (
                <motion.span
                  key={index}
                  className={styles.word}
                  custom={index}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {word}{' '}
                </motion.span>
              ))}
            </div>
          </motion.h1>

          <motion.div className={styles.actionWrapper} variants={itemVariants}>
            <div className={styles.actions}>
              <motion.a 
                href="#portfolio" 
                className={styles.workLink}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(109, 74, 255, 0.25)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>My Works</span> 
                <motion.span 
                  className={styles.arrowIcon}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </motion.a>
              <motion.a 
                href="/cv.pdf" 
                className={styles.downloadLink}
                whileHover={{ 
                  color: "var(--primary)",
                  x: 5
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Download CV</span>
                <motion.span 
                  className={styles.arrowDownIcon}
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                >
                  <Download size={16} />
                </motion.span>
              </motion.a>
              
              {/* <motion.a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.githubLink}
                whileHover={{ scale: 1.1, color: "var(--primary)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
              </motion.a> */}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className={styles.profileImageContainer}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
        >
          <motion.div 
            className={styles.imageFrame}
            animate={{ 
              boxShadow: [
                "0 0 0 3px rgba(255, 51, 102, 0.3)", 
                "0 0 0 6px rgba(112, 0, 255, 0.2)", 
                "0 0 0 3px rgba(255, 51, 102, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <img src={profileImage} alt="Thanh Tuyen" className={styles.profileImage} />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.scrollCircle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div 
          className={styles.circle}
          animate={{ borderColor: ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.1)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={16} className={styles.circleIcon} />
          </motion.div>
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
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home; 