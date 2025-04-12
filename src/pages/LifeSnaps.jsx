import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './LifeSnaps.module.css';

// Import images from assets
import friend1 from '../assets/friends/1.jpg';
import friend2 from '../assets/friends/2.jpg';
import friend3 from '../assets/friends/3.jpg';
import friend4 from '../assets/friends/4.jpg';
import friend5 from '../assets/friends/5.jpg';
import friend6 from '../assets/friends/6.jpg';
import friend7 from '../assets/friends/7.jpg';
import friend8 from '../assets/friends/8.jpg';
import friend9 from '../assets/friends/9.jpg';
import friend10 from '../assets/friends/10.jpg';
import friend11 from '../assets/friends/11.jpg';

import school1 from '../assets/school/1.jpg';
import school2 from '../assets/school/2.jpg';
import school3 from '../assets/school/3.jpg';
import school4 from '../assets/school/4.jpg';
import school5 from '../assets/school/5.jpg';
import school6 from '../assets/school/6.jpg';

import aolen1 from '../assets/solo/aolen1.jpg';
import aolen2 from '../assets/solo/aolen2.jpg';
import aolen3 from '../assets/solo/aolen3.jpg';
import aolen4 from '../assets/solo/aolen4.jpg';
import aolen5 from '../assets/solo/8.jpg';
import aolen6 from '../assets/solo/9.jpg';
import aolen7 from '../assets/solo/10.jpg';

const LifeSnaps = () => {
  const [activeCategory, setActiveCategory] = useState('Friends');
  const [selectedImage, setSelectedImage] = useState(null);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  
  const categories = ['Home', 'School', 'Friends'];
  
  // Handle category selection
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };
  
  // Static image data grouped by category
  const allImages = {
    Friends: [
      { id: 'friend-1', src: friend1, alt: "Friends image 1", category: "Friends", description: "Weekend hangout" },
      { id: 'friend-2', src: friend2, alt: "Friends image 2", category: "Friends", description: "Coffee time" },
      { id: 'friend-3', src: friend3, alt: "Friends image 3", category: "Friends", description: "Lunch together" },
      { id: 'friend-4', src: friend4, alt: "Friends image 4", category: "Friends", description: "Study group" },
      { id: 'friend-5', src: friend5, alt: "Friends image 5", category: "Friends", description: "Party night" },
      { id: 'friend-6', src: friend6, alt: "Friends image 6", category: "Friends", description: "Group photo" },
      { id: 'friend-7', src: friend7, alt: "Friends image 7", category: "Friends", description: "Group photo" },
      { id: 'friend-8', src: friend8, alt: "Friends image 8", category: "Friends", description: "Group photo" },
      { id: 'friend-9', src: friend9, alt: "Friends image 9", category: "Friends", description: "Group photo" },
      { id: 'friend-10', src: friend10, alt: "Friends image 10", category: "Friends", description: "Group photo" },
      { id: 'friend-11', src: friend11, alt: "Friends image 11", category: "Friends", description: "Group photo" },
    ],
    School: [
      { id: 'school-1', src: school1, alt: "School image 1", category: "School", description: "Study session" },
      { id: 'school-2', src: school2, alt: "School image 2", category: "School", description: "Flashback" },
      { id: 'school-3', src: school3, alt: "School image 3", category: "School", description: "Good vibes only 💕🏠" },
      { id: 'school-4', src: school4, alt: "School image 4", category: "School", description: "Group photo" },
      { id: 'school-5', src: school5, alt: "School image 5", category: "School", description: "Group photo" },
      { id: 'school-6', src: school6, alt: "School image 6", category: "School", description: "Group photo" },
    ],
    Home: [
      { id: 'home-1', src: aolen1, alt: "Home image 1", category: "Home", description: "Quiet moments" },
      { id: 'home-2', src: aolen2, alt: "Home image 2", category: "Home", description: "Relaxing time" },
      { id: 'home-3', src: aolen3, alt: "Home image 3", category: "Home", description: "Sunday morning" },
      { id: 'home-4', src: aolen4, alt: "Home image 4", category: "Home", description: "Evening tea" },
      { id: 'home-5', src: aolen5, alt: "Home image 5", category: "Home", description: "Group photo" },
      { id: 'home-6', src: aolen6, alt: "Home image 6", category: "Home", description: "Group photo" },
      { id: 'home-7', src: aolen7, alt: "Home image 7", category: "Home", description: "Group photo" },
    ]
  };

  // Touch handlers for images
  const handleTouchStart = (e, image) => {
    // Record the start position
    setTouchStartY(e.touches[0].clientY);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e, image) => {
    // Only trigger selection if it wasn't a significant vertical movement (scroll)
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    
    // Calculate distance moved
    const yDiff = Math.abs(touchEndY - touchStartY);
    const xDiff = Math.abs(touchEndX - touchStartX);
    
    // If vertical movement is minimal and horizontal movement is minimal, consider it a tap
    if (yDiff < 10 && xDiff < 10) {
      handleImageClick(image);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(selectedImage?.id === image.id ? null : image);
  };

  const filteredImages = allImages[activeCategory] || [];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 15 } }
  };

  const hoverVariants = {
    hover: { 
      scale: 1.05, 
      y: -10,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  const imageVariants = {
    hover: { 
      scale: 1.15,
      transition: { duration: 0.4 }
    }
  };

  const overlayVariants = {
    initial: { opacity: 0, y: 50 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Animation for modal
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        delay: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: -30,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className={styles.lifeSnaps}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>
          Life <span className="neon-text">Snaps</span>
        </h1>
        <p className={styles.subtitle}>
          Capturing moments, preserving memories
        </p>
      </motion.div>

      <div className={styles.categoryTabs}>
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`${styles.categoryTab} ${activeCategory === category ? styles.activeTab : ''}`}
            onClick={() => handleCategoryClick(category)}
            whileHover={{ y: -4, transition: { type: "spring", stiffness: 400 } }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <motion.div 
        className={styles.gallery}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeCategory}
      >
        {filteredImages.length > 0 ? (
          <div className={styles.gridView}>
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                className={styles.imageContainer}
                variants={itemVariants}
                whileHover="hover"
                onClick={() => handleImageClick(image)}
                onTouchStart={(e) => handleTouchStart(e, image)}
                onTouchEnd={(e) => handleTouchEnd(e, image)}
                whileTap={{ scale: 0.95 }}
              >
                <div className={styles.imageWrapper}>
                  <motion.img 
                    src={image.src} 
                    alt={image.alt} 
                    className={styles.image}
                    variants={imageVariants}
                  />
                  <motion.div 
                    className={styles.imageOverlay}
                    variants={overlayVariants}
                    initial="initial"
                  >
                    <p className={styles.description}>{image.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={styles.noImages}>
            No images found for {activeCategory} category
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className={styles.modal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className={styles.modalContent}
              variants={modalContentVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className={styles.modalImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { delay: 0.2, duration: 0.3 }
                }}
              />
              <motion.div 
                className={styles.modalInfo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.3, duration: 0.3 }
                }}
              >
                <span className={styles.modalCategory}>{selectedImage.category}</span>
                <p className={styles.modalDescription}>{selectedImage.description}</p>
              </motion.div>
              <motion.button 
                className={styles.closeButton}
                onClick={() => setSelectedImage(null)}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ 
                  opacity: 1, 
                  rotate: 0,
                  transition: { delay: 0.3, duration: 0.3 }
                }}
                whileHover={{ 
                  rotate: 90,
                  scale: 1.1,
                  backgroundColor: "var(--primary)"
                }}
              >
                ×
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LifeSnaps;