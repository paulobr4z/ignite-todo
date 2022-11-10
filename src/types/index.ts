export interface ITask {
    id: string;
    title: string | undefined;
    done: boolean;
}

export interface ITaskList {
    taskList: ITask[]
    deleteTask: (id: string) => void;
    doneTask: (id: string) => void;
}