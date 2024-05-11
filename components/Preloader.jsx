import styles from '../styles/Preloader.module.css';

function Preloader() {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloader__container}>
        <span className={styles.preloader__round}></span>
      </div>
    </div>
  );
}

export default Preloader;