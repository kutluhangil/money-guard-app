import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addTransaction } from '../../../redux/transactions/operations';
import styles from './AddTransactionForm.module.css';

const schema = yup.object().shape({
    type: yup.string().oneOf(['income', 'expense']).required(),
    amount: yup.number()
        .transform((value) => Number.isNaN(value) ? null : value)
        .nullable()
        .required('Amount is required')
        .positive('Must be positive'),
    date: yup.date().required('Date is required'),
    category: yup.string().when('type', {
        is: 'expense',
        then: () => yup.string().required('Category is required'),
        otherwise: () => yup.string().notRequired(),
    }),
    comment: yup.string().required('Comment is required'),
});

const DEFAULT_CATEGORIES = [
    'Main expenses', 'Products', 'Car', 'Self care', 'Child care',
    'Household products', 'Education', 'Leisure', 'Other expenses', 'Entertainment'
];

// Başarılı dispatch işleminden sonra TransactionsList otomatik olarak güncellenecek
// çünkü bileşen ilgili transactions slice'ını dinliyor.
// Eğer slice yapısı değişirse sadece bu dosyadaki selector'ı güncellemek yeterli.
const AddTransactionForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const [isExpense, setIsExpense] = useState(true);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            type: 'expense',
            amount: '',
            date: new Date(),
            category: '',
            comment: '',
        },
    });

    const handleToggle = () => {
        const newType = isExpense ? 'income' : 'expense';
        setIsExpense(!isExpense);
        setValue('type', newType);
        if (newType === 'income') {
            setValue('category', '');
        }
    };

    const onSubmit = async (data) => {
        try {
            // Gerekirse backend için tarihi ve tipi burada formatla
            const payload = { ...data };
            await dispatch(addTransaction(payload)).unwrap();
            // Başarılıysa -> modalı kapat ve listeyi yenile
            onClose();
        } catch (error) {
            // Backend hatası varsa -> toast bildirimini göster
            console.error('Failed to add transaction:', error);
            alert('Error adding transaction'); // Gerçek bir toast bildirimi eklenecek
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Add transaction</h2>

            <div className={styles.toggleContainer}>
                <span className={isExpense ? styles.inactiveLabel : styles.activeLabelIncome}>Income</span>
                <label className={styles.switch}>
                    <input type="checkbox" checked={isExpense} onChange={handleToggle} />
                    <span className={styles.slider}>
                        <span className={styles.sliderIcon}>{isExpense ? '-' : '+'}</span>
                    </span>
                </label>
                <span className={isExpense ? styles.activeLabelExpense : styles.inactiveLabel}>Expense</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                {isExpense && (
                    <div className={styles.field}>
                        <select {...register('category')} className={styles.input} defaultValue="">
                            <option value="" disabled hidden>Select a category</option>
                            {DEFAULT_CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {errors.category && <span className={styles.error}>{errors.category.message}</span>}
                    </div>
                )}

                <div className={styles.row}>
                    <div className={styles.field}>
                        <input type="number" step="0.01" placeholder="0.00" {...register('amount')} className={`${styles.input} ${styles.amountInput}`} />
                        {errors.amount && <span className={styles.error}>{errors.amount.message}</span>}
                    </div>

                    <div className={styles.field}>
                        <Controller
                            control={control}
                            name="date"
                            render={({ field }) => (
                                <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="dd.MM.yyyy"
                                    className={`${styles.input} ${styles.dateInput}`}
                                />
                            )}
                        />
                        {errors.date && <span className={styles.error}>{errors.date.message}</span>}
                    </div>
                </div>

                <div className={styles.field}>
                    <input type="text" placeholder="Comment" {...register('comment')} className={styles.input} />
                    {errors.comment && <span className={styles.error}>{errors.comment.message}</span>}
                </div>

                <div className={styles.actions}>
                    <button type="submit" className={styles.submitButton}>ADD</button>
                    <button type="button" onClick={onClose} className={styles.cancelButton}>CANCEL</button>
                </div>
            </form>
        </div>
    );
};

export default AddTransactionForm;
