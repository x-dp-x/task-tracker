import "./App.css";
import React from "react";
import { useTasks } from "../hooks/useTasks/useTasks.ts";
import { Task } from "../components/Task/Task.tsx";

export const App = () => {
  const { tasks } = useTasks();

  return (
    <div className="app">
      <div className="body">
        {tasks.length > 0 ? (
          <section className="tasklist">
            {tasks.map((task) => (
              <Task key={task.id} {...task} />
            ))}
          </section>
        ) : null}
      </div>
    </div>
  );
};
