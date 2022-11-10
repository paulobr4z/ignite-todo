import { PlusCircle } from 'phosphor-react'
import { FormEvent, useRef, useState } from 'react';
import styles from './InputTask.module.css';

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface IInputTask {
    inputValue: (title: string | undefined) => void;
}

export function InputTask({
    inputValue
}: IInputTask) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState('');

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget?.value);
    };

    function getInputValue() {
        if (value === '') {
            toast.error("Tarefa em branco!");
            return;            
        }
        inputValue(value);
        setValue('');
    }

    return (
        <div className={styles.wrapper}>


            <input
                type="text"
                placeholder='Adicione uma nova tarefa'
                onChange={handleChange}
                value={value}
            />
            <button
                className={styles.submitTask}
                onClick={getInputValue}
                onKeyDown={getInputValue}
            >
                Criar
                <PlusCircle size={18} color='#fff' />
            </button>
        </div>
    )
    
}