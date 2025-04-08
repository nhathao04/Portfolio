import styles from './Avatar.module.css';

const Avatar = () => {
  return (
    <div className={styles.avatar}>
      <div className={styles.characterContainer}>
        <img 
          src="https://i.imgur.com/3jf8OvK.png" 
          alt="3D character avatar" 
          className={styles.character}
        />
      </div>
    </div>
  );
};

export default Avatar; 