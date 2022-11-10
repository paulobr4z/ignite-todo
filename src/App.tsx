import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Header } from './components/Header';
import { InputTask } from './components/InputTask';
import { TaskList } from './components/TaskList';
import { ModalConfirmation } from './components/ModalConfirmation';
import { ITask } from './types';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './global.css'

function App() {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [inpuValue, setInputValue] = useState<string | undefined>('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState('');
    const [action, setAction] = useState('');

    function getInputValue(value:string | undefined) {
        setInputValue(value);
    }

    useEffect(() => {
        let tasklist = JSON.parse(localStorage.getItem('todo') || '')

        setTasks(tasklist);        
    }, [])

    function creatNewTask() {
        const newTask = {
            id: uuid(),
            title: inpuValue,
            done: false            
        }

        setTasks([...tasks, newTask]);
        localStorage.setItem('todo', JSON.stringify([...tasks, newTask]))
    }

    useEffect(() => {
        if (inpuValue === '') return;

        creatNewTask();
    }, [inpuValue]);

    function selectTask(id:string) {
        setModalIsOpen(true);
        setSelectedTask(id);
    }

    function confimation(action: string) {
        setAction(action)
    }

    useEffect(() => {
        deleteTask(selectedTask);
    }, [action])

    function deleteTask(id:string) {
        if (action === 'confirm') {
            const updatedList = tasks.filter(task => task.id !== id);
            setTasks(updatedList);
            localStorage.setItem('todo', JSON.stringify(updatedList))
        }
        setAction('');
    }

    function doneTask(id:string) {
        const taskIndex = tasks.findIndex(task => task.id === id);

        const updateTaskDone = [...tasks];

        updateTaskDone[taskIndex].done = !updateTaskDone[taskIndex].done;

        setTasks(updateTaskDone);
        localStorage.setItem('todo', JSON.stringify(updateTaskDone))
    }

    return (
        <div>
            <ToastContainer position="top-right" />

            <ModalConfirmation
                title='Aviso'
                warning='Deseja excluir a tarefa?'
                modalIsOpen={modalIsOpen}
                closeModal={() => setModalIsOpen(false)}
                action={(value) => confimation(value)}
            />

            <Header />

            <div className='container'>
                <InputTask inputValue={(value) => getInputValue(value)} />
                <TaskList 
                    taskList={tasks}
                    deleteTask={selectTask}
                    doneTask={doneTask}
                />
            </div>
        </div>
    )
}

export default App
