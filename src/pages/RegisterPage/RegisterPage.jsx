import styles from './RegisterPage.module.css';
import RegisterForm from '../../features/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className={styles.wrapper}>
      {/* Background Glow Effects */}
      <div className={`${styles.bgGlow} ${styles.bgGlow1}`} aria-hidden="true"></div>
      <div className={`${styles.bgGlow} ${styles.bgGlow2}`} aria-hidden="true"></div>
      <div className={`${styles.bgGlow} ${styles.bgGlow3}`} aria-hidden="true"></div>
      <div className={`${styles.bgGlow} ${styles.bgGlow4}`} aria-hidden="true"></div>
      <div className={`${styles.bgGlow} ${styles.bgGlow5}`} aria-hidden="true"></div>
      
      {/* Dollar Decorative Images */}
      <img 
        src="/images/dolartablet.png" 
        alt="" 
        aria-hidden="true"
        className={`${styles.dollarImage} ${styles.dollarLeft}`}
      />
      <img 
        src="/images/dolardestop2.png" 
        alt="" 
        aria-hidden="true"
        className={`${styles.dollarImage} ${styles.dollarRight}`}
      />
      
      {/* Glassmorphism Card */}
      <div className={styles.card}>
        <RegisterForm />
      </div>
    </div>
  );
}
