import { Warning, X } from 'phosphor-react';
import { useState } from 'react';
import styles from './ModalConfirmation.module.css';

interface IModalConfirmation {
    title?: string;
    warning?: string;
    modalIsOpen?: boolean;
    closeModal: () => void;
    action: (value: string) => void;
}

export function ModalConfirmation({
    title,
    warning,
    modalIsOpen,
    closeModal,
    action
}: IModalConfirmation) {
    
    function handleCloseModal(value: string) {
        closeModal();
        action(value);        
    }

    return (
        <>
            <div className={`${styles.modalBackground} ${modalIsOpen && styles.open}`}></div>
            <div className={`${styles.modal} ${modalIsOpen && styles.open}`}>
                <div className={styles.modalHeader}>
                    {title}
                    <X size={22} onClick={closeModal} />
                </div>
                <div className={styles.modalContent}>
                    <Warning size={58} color="#E25858" />
                    {warning}
                </div>

                <div className={styles.modalFooter}>
                    <button onClick={() => handleCloseModal('cancel')}>
                        cancelar
                    </button>
                    <button onClick={() => handleCloseModal('confirm')}>
                        confirmar
                    </button>
                </div>
            </div>
        </>
    )
    
}