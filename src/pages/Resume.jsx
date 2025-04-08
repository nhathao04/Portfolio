import { motion } from 'framer-motion';
import { Download, Building, Calendar, GraduationCap, Award } from 'lucide-react';
import styles from './Resume.module.css';

const Resume = () => {
  const educationData = [
    {
      id: 1,
      degree: 'Master of Design',
      institution: 'Design Academy of Vietnam',
      period: '2018 - 2020',
      description: 'Specialized in UI/UX design and digital product development',
    },
    {
      id: 2,
      degree: 'Bachelor of Arts',
      institution: 'University of Art & Design',
      period: '2014 - 2018',
      description: 'Major in Graphic Design with focus on digital media',
    },
  ];

  const experienceData = [
    {
      id: 1,
      position: 'Senior UI/UX Designer',
      company: 'Creative Solutions Ltd',
      period: '2020 - Present',
      description: 'Leading design team in creating user-centered digital experiences for various clients',
      responsibilities: [
        'Creating user flows and wireframes',
        'Designing high-fidelity mockups',
        'Conducting user research and testing',
        'Collaborating with development team',
      ],
    },
    {
      id: 2,
      position: 'UI Designer',
      company: 'Digital Agency Vietnam',
      period: '2018 - 2020',
      description: 'Designed interfaces for web and mobile applications',
      responsibilities: [
        'Creating user interfaces for web and mobile',
        'Developing visual design systems',
        'Implementing design guidelines',
        'Collaborating with UX researchers',
      ],
    },
    {
      id: 3,
      position: 'Graphic Designer',
      company: 'Creative Studio',
      period: '2016 - 2018',
      description: 'Worked on brand identity projects and digital marketing materials',
      responsibilities: [
        'Creating brand identity systems',
        'Designing marketing materials',
        'Developing social media visuals',
        'Assisting with website design',
      ],
    },
  ];

  return (
    <div className={styles.resume}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.titleArea}>
          <h1 className={styles.title}>
            My <span className="neon-text">Resume</span>
          </h1>
          <p className={styles.subtitle}>
            My educational and professional journey
          </p>
        </div>
        
        <motion.a 
          href="#" 
          className={styles.downloadBtn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={18} />
          Download CV
        </motion.a>
      </motion.div>

      <div className={styles.content}>
        <motion.div 
          className={styles.section}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.sectionHeader}>
            <Building className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Work Experience</h2>
          </div>

          <div className={styles.timeline}>
            {experienceData.map((item, index) => (
              <motion.div 
                key={item.id}
                className={styles.timelineItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + (0.1 * index) }}
              >
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <h3 className={styles.timelineTitle}>{item.position}</h3>
                    <span className={styles.timelinePeriod}>
                      <Calendar size={14} />
                      {item.period}
                    </span>
                  </div>
                  <h4 className={styles.timelineSubtitle}>{item.company}</h4>
                  <p className={styles.timelineDescription}>{item.description}</p>
                  <ul className={styles.responsibilitiesList}>
                    {item.responsibilities.map((responsibility, rIndex) => (
                      <li key={rIndex}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className={styles.section}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className={styles.sectionHeader}>
            <GraduationCap className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Education</h2>
          </div>

          <div className={styles.timeline}>
            {educationData.map((item, index) => (
              <motion.div 
                key={item.id}
                className={styles.timelineItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + (0.1 * index) }}
              >
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <h3 className={styles.timelineTitle}>{item.degree}</h3>
                    <span className={styles.timelinePeriod}>
                      <Calendar size={14} />
                      {item.period}
                    </span>
                  </div>
                  <h4 className={styles.timelineSubtitle}>{item.institution}</h4>
                  <p className={styles.timelineDescription}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className={styles.section}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className={styles.sectionHeader}>
            <Award className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Skills & Expertise</h2>
          </div>

          <div className={styles.skillsContent}>
            <div className={styles.skillsGrid}>
              <div className={styles.skillCard}>
                <h3 className={styles.skillCategory}>Design</h3>
                <ul className={styles.skillList}>
                  <li>UI/UX Design</li>
                  <li>Wireframing & Prototyping</li>
                  <li>User Research</li>
                  <li>Design Systems</li>
                  <li>Visual Design</li>
                  <li>Brand Identity</li>
                </ul>
              </div>
              
              <div className={styles.skillCard}>
                <h3 className={styles.skillCategory}>Development</h3>
                <ul className={styles.skillList}>
                  <li>HTML & CSS</li>
                  <li>JavaScript</li>
                  <li>React</li>
                  <li>Responsive Design</li>
                  <li>Frontend Development</li>
                  <li>Version Control</li>
                </ul>
              </div>
              
              <div className={styles.skillCard}>
                <h3 className={styles.skillCategory}>Tools</h3>
                <ul className={styles.skillList}>
                  <li>Figma</li>
                  <li>Adobe Creative Suite</li>
                  <li>Sketch</li>
                  <li>VS Code</li>
                  <li>Git</li>
                  <li>Notion</li>
                </ul>
              </div>
              
              <div className={styles.skillCard}>
                <h3 className={styles.skillCategory}>Soft Skills</h3>
                <ul className={styles.skillList}>
                  <li>Team Leadership</li>
                  <li>Project Management</li>
                  <li>Client Communication</li>
                  <li>Problem Solving</li>
                  <li>Time Management</li>
                  <li>Creative Thinking</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume; 