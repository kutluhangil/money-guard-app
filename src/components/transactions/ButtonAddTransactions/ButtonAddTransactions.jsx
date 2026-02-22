import React from 'react';
import { FiPlus } from 'react-icons/fi';
import styles from './ButtonAddTransactions.module.css';

// Ekranın sağ alt köşesine sabit
// Tıklanınca -> ModalAddTransaction açılır
// Mobil, tablet ve masaüstünde sorunsuz çalışmalı
const ButtonAddTransactions = ({ onClick }) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            aria-label="Add transaction"
            type="button"
        >
            <FiPlus className={styles.icon} />
        </button>
    );
};

export default ButtonAddTransactions;
