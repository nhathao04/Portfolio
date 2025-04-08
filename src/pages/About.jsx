import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Monitor, Palette, Camera, Film } from 'lucide-react';
import styles from './About.module.css';
import Avatar from '../components/ui/Avatar';

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const images = [
    { id: 0, src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0", alt: "Project 1" },
    { id: 1, src: "https://images.unsplash.com/photo-1509631179647-0177331693ae", alt: "Project 2" },
    { id: 2, src: "https://images.unsplash.com/photo-1491947153227-33d59da6c448", alt: "Project 3" },
    { id: 3, src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4", alt: "Project 4" },
    { id: 4, src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", alt: "Project 5" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const getSlideStyles = (index) => {
    const totalSlides = images.length;
    const rotationAngle = (250 / totalSlides) * (index - activeIndex);
    const zIndex = index === activeIndex ? 3 : 1;
    const scale = index === activeIndex ? 1 : 0.7;
    const opacity = Math.cos((rotationAngle * Math.PI) / 180) * 0.5 + 0.5;

    return {
      transform: `rotateY(${rotationAngle}deg) translateZ(300px) scale(${scale})`,
      opacity,
      zIndex
    };
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const skills = [
    { icon: <Palette size={24} />, name: 'UI/UX Design', level: 90 },
    { icon: <Code size={24} />, name: 'Web Development', level: 85 },
    { icon: <Monitor size={24} />, name: 'Brand Identity', level: 80 },
    { icon: <Camera size={24} />, name: 'Photography', level: 75 },
    { icon: <Film size={24} />, name: 'Motion Graphics', level: 70 },
  ];

  return (
    <div className={styles.about}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>
          About <span className="neon-text">Me</span>
        </h1>
        <p className={styles.subtitle}>
          Get to know me better
        </p>
      </motion.div>

      <div className={styles.carousel}>
        <div className={styles.carouselTrack}>
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              className={`${styles.carouselSlide} ${activeIndex === index ? styles.active : ''}`}
              style={getSlideStyles(index)}
              animate={{
                transform: getSlideStyles(index).transform,
                opacity: getSlideStyles(index).opacity,
                zIndex: getSlideStyles(index).zIndex
              }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className={styles.carouselImage}
              />
            </motion.div>
          ))}
        </div>
        <div className={styles.carouselDots}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.carouselDot} ${activeIndex === index ? styles.activeDot : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <motion.div 
          className={styles.infoSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className={styles.greeting}>Hello there!</h2>
          <p className={styles.bio}>
            I'm Thanh Tuyen, a digital designer and creative developer based in Hanoi, Vietnam. I specialize in creating beautiful, functional digital experiences through thoughtful UI/UX design and clean code.
          </p>

          <div className={styles.quickInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Name:</span>
              <span>Thanh Tuyen</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email:</span>
              <span>design@example.com</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Location:</span>
              <span>Bao Loc, Vietnam</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Availability:</span>
              <span>Coffee 24/7</span>
            </div>
          </div>

          <div className={styles.skillsSection}>
            <h3 className={styles.skillsTitle}>My Skills</h3>
            <div className={styles.skills}>
              {skills.map((skill, index) => (
                <div className={styles.skillItem} key={index}>
                  <div className={styles.skillIcon}>
                    {skill.icon}
                  </div>
                  <div className={styles.skillInfo}>
                    <div className={styles.skillNameLevel}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillLevel}>{skill.level}%</span>
                    </div>
                    <div className={styles.skillBar}>
                      <motion.div 
                        className={styles.skillProgress} 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className={styles.statsSection}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className={styles.statItem}>
          <motion.span 
            className={styles.statNumber}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            5+
          </motion.span>
          <span className={styles.statLabel}>Years of Experience</span>
        </div>
        <div className={styles.statItem}>
          <motion.span 
            className={styles.statNumber}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            50+
          </motion.span>
          <span className={styles.statLabel}>Projects Completed</span>
        </div>
        <div className={styles.statItem}>
          <motion.span 
            className={styles.statNumber}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            30+
          </motion.span>
          <span className={styles.statLabel}>Happy Clients</span>
        </div>
        <div className={styles.statItem}>
          <motion.span 
            className={styles.statNumber}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            10+
          </motion.span>
          <span className={styles.statLabel}>Awards Received</span>
        </div>
      </motion.div>
    </div>
  );
};

export default About; 