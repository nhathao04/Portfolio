import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, User, Camera, Mail, Instagram, Facebook, Menu, X, ZoomIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import avatar from '../../assets/avatar.jpg';

const Sidebar = () => {
  const location = useLocation();
  const [theme, setTheme] = useState('dark');
  const [isOpen, setIsOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isProcessingToggle, setIsProcessingToggle] = useState(false);

  useEffect(() => {
    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Close sidebar when clicking outside on mobile
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(`.${styles.sidebar}`) && !event.target.closest(`.${styles.menuButton}`)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    // Add event listener to close modal with Escape key
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isAvatarModalOpen) {
        setIsAvatarModalOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      setIsProcessingToggle(false);
    };
  }, [isOpen, isAvatarModalOpen]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    // Prevent scrolling when modal is open
    if (isAvatarModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isAvatarModalOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleSidebar = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Nếu đang xử lý một toggle, bỏ qua
    if (isProcessingToggle) return;
    
    // Đánh dấu đang xử lý
    setIsProcessingToggle(true);
    
    // Thay đổi trạng thái sidebar
    setIsOpen(!isOpen);
    
    // Sau khi hoàn thành, đặt lại trạng thái xử lý
    setTimeout(() => {
      setIsProcessingToggle(false);
    }, 300);
  };

  const openAvatarModal = () => {
    setIsAvatarModalOpen(true);
  };

  const closeAvatarModal = () => {
    setIsAvatarModalOpen(false);
  };

  const navigationLinks = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/about', icon: <User size={20} />, label: 'About Me' },
    { path: '/life-snaps', icon: <Camera size={20} />, label: 'Life Snaps' },
    { path: '/guestbook', icon: <Mail size={20} />, label: 'Guestbook' },
  ];

  const socialLinks = [
    { icon: <Instagram size={18} />, url: 'https://www.instagram.com/_28.thang2_/', label: 'Instagram' },
    { icon: <Facebook size={18} />, url: 'https://www.facebook.com/thanh.tuyen.566921', label: 'Facebook' },
  ];

  return (
    <>
      <button 
        className={styles.menuButton}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`${styles.overlay} ${isOpen ? styles.visible : ''}`} />

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.profile}>
          <div 
            className={styles.avatarContainer}
            onClick={openAvatarModal}
            role="button"
            tabIndex={0}
            aria-label="Open profile picture"
          >
            <img 
              src={avatar}
              alt="Profile" 
              className={styles.avatar}
            />
            <div className={styles.avatarOverlay}>
              <ZoomIn size={24} />
            </div>
          </div>
          <h1 className={styles.name}>Thanh Tuyen</h1>
          <p className={styles.title}>🎓 University student</p>
          <p className={styles.location}>Bao Loc, Vietnam</p>
          
          <div className={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url} 
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <nav className={styles.navigation}>
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.bottomSection}>
          <label 
            className={styles.themeToggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <input 
              type="checkbox"
              checked={theme === 'light'}
              onChange={toggleTheme}
            />
            <div className={styles.slider}>
              <div className={`${styles.star} ${styles.star_1}`}></div>
              <div className={`${styles.star} ${styles.star_2}`}></div>
              <div className={`${styles.star} ${styles.star_3}`}></div>
              <svg className={styles.cloud} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M20,15 Q25,0 45,11 Q60,20 45,30 Q35,35 20,30 Q0,30 10,20 Q15,10 20,15" fill="#fff"/>
              </svg>
            </div>
          </label>
          <button className={styles.workButton}>
            Let's Work Together
          </button>
        </div>
      </aside>

      {/* Avatar Modal */}
      {isAvatarModalOpen && (
        <div className={styles.avatarModal} onClick={closeAvatarModal}>
          <div className={styles.avatarModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeAvatarModal} aria-label="Close modal">
              <X size={24} />
            </button>
            <img 
              src={avatar} 
              alt="Profile" 
              className={styles.avatarLarge}
            />
            <h2 className={styles.modalName}>Thanh Tuyen</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;