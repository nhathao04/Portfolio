import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Map, Coffee, Music, Book, Film } from 'lucide-react';
import styles from './About.module.css';
import img1 from '../assets/solo/1.jpg';
import img2 from '../assets/solo/2.jpg';
import img3 from '../assets/solo/3.jpg';
import img4 from '../assets/solo/4.jpg';
import img5 from '../assets/solo/5.jpg';
import img6 from '../assets/solo/6.jpg';

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    { id: 0, src: img1, alt: "Relaxing by the beach" },
    { id: 1, src: img2, alt: "Exploring the mountains" },
    { id: 2, src: img3, alt: "Coffee shop moments" },
    { id: 3, src: img4, alt: "Traveling abroad" },
    { id: 4, src: img5, alt: "Music festivals" },
    { id: 5, src: img6, alt: "Weekend adventures" }
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

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const slideInRight = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, delay: 0.2 }
  };

  const staggerChildren = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const childVariant = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const personalInterests = [
    { icon: <Coffee size={24} />, name: 'Coffee Enthusiast', description: 'I start my day with a cup of Vietnamese coffee, and explore local cafés on weekends' },
    { icon: <Music size={24} />, name: 'Music Lover', description: 'I attend live music events, music concert whenever possible' },
    { icon: <Map size={24} />, name: 'Travel Explorer', description: 'I\'ve visited Malaysia in 2023' },
    { icon: <Book size={24} />, name: 'Avid Reader', description: 'I enjoy science fiction and philosophy books that expand my perspective' },
    { icon: <Heart size={24} />, name: 'Community Volunteer', description: 'I participate in local education initiatives to teach design to young students' },
    { icon: <Film size={24} />, name: 'Film', description: 'I love romantic and dramatic films.' },

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
          My story, my journey
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
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.h2 
            className={styles.greeting}
            variants={slideInRight}
            initial="initial"
            animate="animate"
          >
            Hello there!
          </motion.h2>
          <motion.p 
            className={styles.bio}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            I'm Thanh Tuyen, a creative soul born and raised in the beautiful highlands of Bao Loc, Vietnam. My journey began in a small town surrounded by coffee plantations, which inspired my love for both creativity and quiet moments of reflection. After moving to Ho Chi Minh city for university, I discovered my passion for digital arts and visual storytelling, which has shaped my personal and professional life ever since.
          </motion.p>

          <motion.p 
            className={styles.bio}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            I'm a cheerful and outgoing person who loves exploring new places and making unforgettable memories. Whether it's a spontaneous road trip or an overseas adventure, I’m always ready to pack my bags and go. I believe life is meant to be enjoyed, and I try to find joy in every moment—especially when it involves good food, great company, and exciting destinations!
          </motion.p>

          <motion.div 
            className={styles.quickInfo}
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.div className={styles.infoItem} variants={childVariant}>
              <span className={styles.infoLabel}>Name:</span>
              <span>Dao Thanh Tuyen</span>
            </motion.div>
            <motion.div className={styles.infoItem} variants={childVariant}>
              <span className={styles.infoLabel}>Email:</span>
              <span>hello@thanhtuyen.com</span>
            </motion.div>
            <motion.div className={styles.infoItem} variants={childVariant}>
              <span className={styles.infoLabel}>Hometown:</span>
              <span>Bao Loc, Vietnam</span>
            </motion.div>
            <motion.div className={styles.infoItem} variants={childVariant}>
              <span className={styles.infoLabel}>Currently:</span>
              <span>Ho Chi Minh City</span>
            </motion.div>
          </motion.div>

          <motion.div 
            className={styles.journeySection}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* <h3 className={styles.sectionTitle}>My Journey</h3>
            <div className={styles.timeline}>
              <motion.div 
                className={styles.timelineItem}
                variants={childVariant}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className={styles.timelineDate}>2015</div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineTitle}>Beginnings</h4>
                  <p className={styles.timelineText}>Left my hometown to study Visual Communication in Hanoi, discovering my passion for digital art and design</p>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.timelineItem}
                variants={childVariant}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className={styles.timelineDate}>2019</div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineTitle}>First Steps</h4>
                  <p className={styles.timelineText}>Joined a creative studio as a junior designer, working on branding projects for local businesses</p>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.timelineItem}
                variants={childVariant}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className={styles.timelineDate}>2021</div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineTitle}>Going Independent</h4>
                  <p className={styles.timelineText}>Started freelancing and traveling Southeast Asia, finding inspiration in diverse cultures and landscapes</p>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.timelineItem}
                variants={childVariant}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <div className={styles.timelineDate}>Now</div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineTitle}>Present Day</h4>
                  <p className={styles.timelineText}>Balancing creative projects with personal growth, always seeking to learn and evolve</p>
                </div>
              </motion.div>
            </div> */}
          </motion.div>

          <motion.div 
            className={styles.interestsSection}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <h3 className={styles.sectionTitle}>Personal Interests</h3>
            <motion.div 
              className={styles.interests}
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              {personalInterests.map((interest, index) => (
                <motion.div 
                  className={styles.interestItem} 
                  key={index}
                  variants={childVariant}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className={styles.interestIcon}>
                    {interest.icon}
                  </div>
                  <div className={styles.interestInfo}>
                    <h4 className={styles.interestName}>{interest.name}</h4>
                    <p className={styles.interestDescription}>{interest.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className={styles.philosophySection}
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <h3 className={styles.sectionTitle}>My Philosophy</h3>
        <div className={styles.philosophyContent}>
          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            I believe that life is a continuous journey of learning and discovery. Every experience, whether challenging or joyful, shapes our perspective and contributes to our growth. In my work and personal life, I strive to remain curious, authentic, and mindful.
          </motion.p>
          {/* <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            I value simplicity, authenticity, and the power of human connection. Technology should enhance our lives without overwhelming us. I'm passionate about creating experiences that feel natural and meaningful.
          </motion.p> */}
        </div>
      </motion.div>

      <motion.div 
        className={styles.statsSection}
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 1.5, staggerChildren: 0.15 }}
      >
        <motion.div className={styles.statItem} variants={childVariant}>
          <motion.span 
            className={styles.statNumber}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            15+
          </motion.span>
          <span className={styles.statLabel}>Countries Visited</span>
        </motion.div>
        <motion.div className={styles.statItem} variants={childVariant}>
          <motion.span 
            className={styles.statNumber}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
          >
            200+
          </motion.span>
          <span className={styles.statLabel}>Coffee Shops Explored</span>
        </motion.div>
        <motion.div className={styles.statItem} variants={childVariant}>
          <motion.span 
            className={styles.statNumber}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            50+
          </motion.span>
          <span className={styles.statLabel}>Books Per Year</span>
        </motion.div>
        <motion.div className={styles.statItem} variants={childVariant}>
          <motion.span 
            className={styles.statNumber}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.9 }}
          >
            5+
          </motion.span>
          <span className={styles.statLabel}>Musical Instruments</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;