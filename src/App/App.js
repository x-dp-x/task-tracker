import React from "react";
import { TaskPriority } from "../context/TaskContext/TaskContext.tsx";
import { useTasks } from "../hooks/useTasks/useTasks.ts";
import { Task } from "../components/Task/Task.tsx";
import { FilterSelection } from "../components/FilterSelection/FilterSelection.tsx";
import { TaskForm } from "../components/TaskForm/TaskForm.tsx";
import "./App.css";

const filterOpts = [TaskPriority.High, TaskPriority.Medium, TaskPriority.Low];

export const App = () => {
  const { tasks } = useTasks();

  return (
    <div className="app">
      <div className="body">
        <FilterSelection options={filterOpts} />
        {tasks.length > 0 ? (
          <section className="tasklist">
            {tasks.map((task) => (
              <Task key={task.id} {...task} />
            ))}
          </section>
        ) : (
          <p className="tasklist__empty-state">
            No tasks yet! Please use the form to start adding tasks
          </p>
        )}
      </div>

      <aside className="aside">
        <TaskForm options={filterOpts} />
      </aside>
    </div>
  );
};
