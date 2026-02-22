import React from 'react';
import TransactionModal from '../TransactionModal/TransactionModal';
import EditTransactionForm from '../EditTransactionForm/EditTransactionForm';

// Düzenlenecek transaction objesini prop olarak geçin.
const ModalEditTransaction = ({ isOpen, onClose, transaction }) => {
    if (!isOpen) return null;

    return (
        <TransactionModal onClose={onClose}>
            <EditTransactionForm transaction={transaction} onClose={onClose} />
        </TransactionModal>
    );
};

export default ModalEditTransaction;
