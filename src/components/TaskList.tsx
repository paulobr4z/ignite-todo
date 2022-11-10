import { Trash } from 'phosphor-react';
import styles from './TaskList.module.css';
import clipboard from '../assets/clipboard.svg';
import { useEffect, useState } from 'react';
import { ITask, ITaskList } from '../types';

export function TaskList({
    taskList,
    deleteTask,
    doneTask
}: ITaskList) {
    const [qtDone, setQtDone] = useState(0);

    useEffect(() => {
        function getQtDone() {
            let qtDone = taskList.filter(task => task.done == true);
            setQtDone(qtDone.length);
        }
        getQtDone();
    }, [taskList])

    return (
        <div className={styles.taskList}>

            <header>
                <span>
                    <strong>Tarefas criadas</strong>
                    <p>{taskList.length}</p>
                </span>
                <span>
                    <strong>Concluídas</strong>
                    <p>{qtDone} de {taskList.length}</p>
                </span>

            </header>

            {
                taskList.length < 1 ? (
                    <div className={styles.emptyList}>
                        <img src={clipboard} alt="clipboard" />
                        <strong>Você ainda não tem tarefas cadastradas</strong>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </div>

                ) : (
                    <div>
                        {taskList.map(task => (
                            <div key={task.id} className={styles.task}>
                                <div
                                    onClick={() => doneTask(task.id)}
                                    className={task.done ? styles.checked : styles.checkbox}
                                >
                                    <span></span>
                                </div>
                                <p>{task.title}</p>
                                <button 
                                    className={styles.deleteTask}
                                    onClick={() => deleteTask(task.id)}
                                >
                                    <Trash size={22}  color="#808080"/>
                                </button>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
    
}