import React, { ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export enum TaskPriority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
}

export type Tasks = Task[] | [];

export interface TaskContextProps {
  tasks: Tasks;
  setTasks(value: Tasks): void;
  loaded: Boolean;
}

export const TaskContext = React.createContext<TaskContextProps>({
  tasks: [],
  setTasks: () => [],
  loaded: false,
});

interface TaskProviderProps {
  children: ReactNode;
}

export const taskLocalStorageKey = "_task_context_app_";

export const TasksProvider = ({ children }: TaskProviderProps) => {
  const [hasReadStore, setHasReadStore] = useState(false);
  const [tasks, setTasks] = useState<Tasks>([]);

  useEffect(() => {
    const tasksFromStore = localStorage.getItem(taskLocalStorageKey);
    const tasks = Boolean(tasksFromStore) && JSON.parse(tasksFromStore || "");
    tasks && setTasks(tasks);
    setHasReadStore(true);
  }, []);

  useEffect(() => {
    if (hasReadStore) {
      localStorage.setItem(taskLocalStorageKey, JSON.stringify(tasks));
    }
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        loaded: hasReadStore,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
