import styles from '../styles/Preloader.module.css';

function Preloader() {
  return (
    <div className={styles.container}>
    <div className="preloader">
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
    </div>
  );
}

export default Preloader;