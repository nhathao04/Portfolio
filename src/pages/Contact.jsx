import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, Instagram, Facebook, Github } from 'lucide-react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      value: 'Hanoi, Vietnam',
    },
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: 'design@example.com',
      link: 'mailto:design@example.com',
    },
    {
      icon: <Phone size={20} />,
      label: 'Phone',
      value: '+84 123 456 789',
      link: 'tel:+84123456789',
    },
  ];

  const socialLinks = [
    { 
      icon: <Instagram size={20} />, 
      url: 'https://www.instagram.com/_28.thang2_/', 
      label: 'Instagram', 
      color: '#E4405F' 
    },
    { 
      icon: <Facebook size={20} />, 
      url: 'https://www.facebook.com/thanh.tuyen.566921', 
      label: 'Facebook', 
      color: '#1877F2' 
    },
    { 
      icon: <Github size={20} />, 
      url: '#', 
      label: 'Github', 
      color: '#333' 
    },
  ];

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={styles.contact}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>
          Get In <span className="neon-text">Touch</span>
        </h1>
        <p className={styles.subtitle}>
          Have a project in mind? Let's talk about it.
        </p>
      </motion.div>

      <div className={styles.content}>
        <motion.div 
          className={styles.contactInfo}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.infoContainer}>
            <h2 className={styles.infoTitle}>Contact Information</h2>
            <p className={styles.infoSubtitle}>
              Feel free to reach out to me any time. I'm open to opportunities, collaborations, and interesting projects.
            </p>

            <div className={styles.infoItems}>
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index} 
                  className={styles.infoItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                >
                  <div className={styles.infoIcon}>
                    {item.icon}
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>{item.label}</span>
                    {item.link ? (
                      <a href={item.link} className={styles.infoValue}>{item.value}</a>
                    ) : (
                      <span className={styles.infoValue}>{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.socialLinks}>
              <h3 className={styles.socialTitle}>Find me on</h3>
              <div className={styles.socialIcons}>
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    style={{ backgroundColor: `${link.color}20` }}
                    whileHover={{ y: -5, backgroundColor: `${link.color}30` }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.contactForm}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Send Message</h2>
            
            {isSubmitted && (
              <motion.div 
                className={styles.successMessage}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit}>
              <motion.div className={styles.formGroup} variants={itemVariants}>
                <label htmlFor="name" className={styles.label}>Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="John Doe"
                />
              </motion.div>

              <motion.div className={styles.formGroup} variants={itemVariants}>
                <label htmlFor="email" className={styles.label}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="john@example.com"
                />
              </motion.div>

              <motion.div className={styles.formGroup} variants={itemVariants}>
                <label htmlFor="subject" className={styles.label}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Project Inquiry"
                />
              </motion.div>

              <motion.div className={styles.formGroup} variants={itemVariants}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={styles.textarea}
                  placeholder="Hello, I would like to discuss a project with you..."
                  rows={5}
                />
              </motion.div>

              <motion.button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send size={16} />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact; 