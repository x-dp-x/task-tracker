import React, { ReactNode, useState } from "react";

enum TaskPriority {
  Low,
  Medium,
  High,
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
}

type Tasks = Task[] | [];

export interface TaskContextProps {
  tasks: Tasks;
  setTasks(value: Tasks): void;
}

export const TaskContext = React.createContext<TaskContextProps>({
  tasks: [],
  setTasks: () => [],
});

interface TaskProviderProps {
  children: ReactNode;
}

export const TasksProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Tasks>([]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
