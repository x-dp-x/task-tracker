import "./App.css";
import React from "react";
import { TaskPriority } from "../context/TaskContext/TaskContext.tsx";
import { useTasks } from "../hooks/useTasks/useTasks.ts";
import { Task } from "../components/Task/Task.tsx";
import { FilterSelection } from "../components/FilterSelection/FilterSelection.tsx";
import { TaskForm } from "../components/TaskForm/TaskForm.tsx";

const filterLabel = "Select Priority";
const filterOpts = [TaskPriority.High, TaskPriority.Medium, TaskPriority.Low];

export const App = () => {
  const { tasks } = useTasks();

  return (
    <div className="app">
      <div className="body">
        <FilterSelection title={filterLabel} options={filterOpts} />
        {tasks.length > 0 ? (
          <section className="tasklist">
            {tasks.map((task) => (
              <Task key={task.id} {...task} />
            ))}
          </section>
        ) : null}
      </div>

      <aside className="aside">
        <TaskForm />
      </aside>
    </div>
  );
};
