import styles from './LoginPage.module.css';
import LoginForm from '../../features/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      {/* Background Glow Effects */}
      <div className={`${styles.bgGlow} ${styles.bgGlow1}`} aria-hidden="true"></div>
      <div className={`${styles.bgGlow} ${styles.bgGlow2}`} aria-hidden="true"></div>
      <div className={`${styles.bgGlow} ${styles.bgGlow3}`} aria-hidden="true"></div>
      <div className={`${styles.bgGlow} ${styles.bgGlow4}`} aria-hidden="true"></div>
      <div className={`${styles.bgGlow} ${styles.bgGlow5}`} aria-hidden="true"></div>
      
      {/* Coin Decorative Images */}
      <img 
        src="/images/coins-tablet1.png" 
        alt="" 
        aria-hidden="true"
        className={`${styles.coinImage} ${styles.coinLeft}`}
      />
      <img 
        src="/images/coins-render 2.png" 
        alt="" 
        aria-hidden="true"
        className={`${styles.coinImage} ${styles.coinRight}`}
      />
      
      {/* Glassmorphism Card */}
      <div className={styles.card}>
        <LoginForm />
      </div>
    </div>
  );
}
