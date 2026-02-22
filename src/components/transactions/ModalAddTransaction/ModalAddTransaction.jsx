import React from 'react';
import TransactionModal from '../TransactionModal/TransactionModal';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';

// Eğer Header bileşenini yapan arkadaşın modal state'ine ihtiyacı olursa onClose prop'unu buradan dışarı verebilirsin.
const ModalAddTransaction = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <TransactionModal onClose={onClose}>
            <AddTransactionForm onClose={onClose} />
        </TransactionModal>
    );
};

export default ModalAddTransaction;
