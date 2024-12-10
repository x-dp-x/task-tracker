import React from "react";
import { Tasks } from "../../context/TaskContext/TaskContext.tsx";
import { Task } from "../Task/Task.tsx";
import "./TaskList.css";

interface TaskListProps {
  tasks: Tasks;
  loaded: Boolean;
}

export const TaskList = ({ tasks, loaded }: TaskListProps) => {
  if (loaded && tasks.length <= 0) {
    return (
      <p className="tasklist__empty-state">
        No tasks yet! Please use the form to start adding tasks
      </p>
    );
  }

  return (
    <section className="tasklist">
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
    </section>
  );
};
