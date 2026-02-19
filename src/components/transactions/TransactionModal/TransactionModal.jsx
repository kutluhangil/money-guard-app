import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { VscClose } from 'react-icons/vsc';
import styles from './TransactionModal.module.css';

// Sadece transactions için tekrar kullanılabilir modal alt yapısı
// Backdrop tıklamaları, Escape tuşu ve full-screen mobil görünümü ayarları
const TransactionModal = ({ children, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        // Modal arkasında sayfanın kaymasını engelle
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalStyle;
        };
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Eğer modal-root yoksa güvenli şekilde document.body'ye ekle
    const modalRoot = document.getElementById('modal-root') || document.body;

    return createPortal(
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose} type="button" aria-label="Close modal">
                    <VscClose size={24} />
                </button>
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default TransactionModal;
