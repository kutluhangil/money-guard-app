import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authOperations';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastError } from '../../utils/toast';
import { createPortal } from 'react-dom';
import Icon from '../Icon/Icon';
import styles from './Header.module.css';


export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const email = useSelector((state) => state.auth.user?.email);
  const username = email ? email.split('@')[0] : 'User';

  const handleLogout = async () => {
    try {
  await dispatch(logout());
    } catch (error) {
      toastError(`Çıkış yapılırken bir hata oluştu: ${error}`);
    } finally {
      setOpen(false);
      navigate('/login');
    }
  };

  // Modal dışına (karanlık alana) tıklayınca kapatma
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };
  // 🌟 PROFESYONEL DETAY: ESC ile kapatma ve arka plan kaydırmasını kilitleme
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.body.style.overflow = 'hidden'; // Arka planı kilitle
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto'; // Kilidi kaldır
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <header className={styles.header}>
      {/* Logo ve Marka İsmi */}
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}>
  <Icon name="icon-icon-logo" width={28} height={28} />
</div>
        <h2 className={styles.logoText}>Money Guard</h2>
      </div>

      {/* Kullanıcı Adı ve Çıkış */}
      <div className={styles.userSection}>
        <span className={styles.userName}>{username}</span>
        
<button 
  onClick={() => setOpen(true)}
  className={styles.exitButton}
  aria-label="Exit"
>
  <Icon name="icon-icon-exit" width={24} height={24} />
  <span className={styles.exitText}>Exit</span>
</button>
      </div>

      {/* Çıkış Onay Modalı */}
    {open && createPortal(
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.modalCard}>
            
            {/* Modal İçi Logo (Sadece Tablet/Desktop'ta görünecek) */}
            <div className={styles.modalLogoContainer}>
              <Icon name="icon-icon-logo" width={36} height={36} />
              <h2 className={styles.modalLogoText}>Money Guard</h2>
            </div>

            <p className={styles.confirmText}>
              Are you sure you want to log out?
            </p>

            <div className={styles.buttonGroup}>
              <button onClick={handleLogout} className={styles.btnPrimary}>
                LOGOUT
              </button>
              <button onClick={() => setOpen(false)} className={styles.btnSecondary}>
                CANCEL
              </button>
            </div>
            
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}