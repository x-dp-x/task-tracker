import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext/TaskContext.tsx";
import type { Task, Tasks } from "../../context/TaskContext/TaskContext.tsx";

export interface AddTask {
  task: Task;
}

interface EditTask {
  taskId: string;
  task: Task;
}

export interface DeleteTask {
  taskId: string;
}

interface SetTasks {
  tasks: Tasks;
}

export const useTasks = () => {
  const { tasks, setTasks: setTasksState, loaded } = useContext(TaskContext);

  const addTask = ({ task }: AddTask) => {
    const newTasks = [...tasks, { ...task }];
    setTasksState(newTasks);
    return newTasks;
  };

  const editTask = ({ taskId, task }: EditTask) => {
    const taskExists = tasks.filter((item) => item.id === taskId);
    const otherTasks = tasks.filter((item) => item.id !== taskId);

    if (Boolean(taskExists.length)) {
      const editedTasks = [...otherTasks, { ...task }];
      setTasksState(editedTasks);
      return editedTasks;
    }

    return otherTasks;
  };

  const deleteTask = ({ taskId }: DeleteTask) => {
    const otherTasks = tasks.filter((item) => item.id !== taskId);
    setTasksState(otherTasks);
    return otherTasks;
  };

  const setTasks = ({ tasks }: SetTasks) => {
    const newTasks = tasks;
    setTasksState(newTasks);
    return newTasks;
  };

  return {
    tasks,
    setTasks,
    addTask,
    editTask,
    deleteTask,
    loaded,
  };
};
