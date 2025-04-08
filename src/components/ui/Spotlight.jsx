import { useState, useEffect } from 'react';
import styles from './Spotlight.module.css';

const Spotlight = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    // Set initial position in the top right corner
    setPosition({ 
      x: window.innerWidth * 0.85,
      y: window.innerHeight * 0.15 
    });

    const handleResize = () => {
      setPosition({ 
        x: window.innerWidth * 0.85,
        y: window.innerHeight * 0.15 
      });
    };

    const handleMouseMove = (e) => {
      if (isHovering) {
        // Only update on mouse move if hovering
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovering]);

  return (
    <div 
      className={styles.spotlightContainer}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        // Reset to top right when not hovering
        setPosition({ 
          x: window.innerWidth * 0.85,
          y: window.innerHeight * 0.15 
        });
      }}
    >
      <div 
        className={styles.spotlightEffect}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: 0.7,
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      <div 
        className={styles.mainSpotlight}
        style={{
          left: `${window.innerWidth * 0.85}px`,
          top: `${window.innerHeight * 0.15}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  );
};

export default Spotlight; 