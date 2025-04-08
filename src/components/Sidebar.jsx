import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, User, FileText, Mail, Camera } from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { path: '/', icon: <Home size={24} />, label: 'Home' },
    { path: '/portfolio', icon: <Briefcase size={24} />, label: 'Portfolio' },
    { path: '/about', icon: <User size={24} />, label: 'About' },
    { path: '/life-snaps', icon: <Camera size={24} />, label: 'Life Snaps' },
    { path: '/resume', icon: <FileText size={24} />, label: 'Resume' },
    { path: '/contact', icon: <Mail size={24} />, label: 'Contact' },
  ];

  return (
    <div className={styles.sidebar}>
      {links.map((link) => (
        <Link
          to={link.path}
          key={link.path}
          className={`${styles.link} ${location.pathname === link.path ? styles.active : ''}`}
        >
          {link.icon}
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar; 