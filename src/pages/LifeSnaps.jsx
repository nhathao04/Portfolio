import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LifeSnaps.module.css';

const LifeSnaps = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1609151162377-794faf68b02f",
      alt: "Family Gathering",
      category: "Family",
      description: "Weekend family dinner"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717",
      alt: "Friends Hangout",
      category: "Friends",
      description: "Coffee time with friends"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1609151354345-17db9e036d0b",
      alt: "Birthday Party",
      category: "Celebration",
      description: "My 25th birthday"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc",
      alt: "Travel Memory",
      category: "Travel",
      description: "Trip to the mountains"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
      alt: "Beach Day",
      category: "Travel",
      description: "Summer beach day"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1516475429286-465d815a0df7",
      alt: "Game Night",
      category: "Friends",
      description: "Board game night"
    }
  ];

  const handleImageClick = (image) => {
    setSelectedImage(selectedImage?.id === image.id ? null : image);
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

      <motion.div 
        className={styles.gallery}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className={`${styles.imageContainer} ${selectedImage?.id === image.id ? styles.selected : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleImageClick(image)}
            layoutId={`image-${image.id}`}
          >
            <div className={styles.imageWrapper}>
              <img 
                src={image.src} 
                alt={image.alt} 
                className={styles.image}
              />
              <motion.div 
                className={styles.imageOverlay}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className={styles.category}>{image.category}</span>
                <p className={styles.description}>{image.description}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className={styles.modalContent}
              layoutId={`image-${selectedImage.id}`}
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className={styles.modalImage}
              />
              <div className={styles.modalInfo}>
                <span className={styles.modalCategory}>{selectedImage.category}</span>
                <p className={styles.modalDescription}>{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LifeSnaps; 