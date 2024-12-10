import React, { useState } from "react";
import type { Task as TaskInterface } from "../../context/TaskContext/TaskContext.tsx";
import { useTasks } from "../../hooks/useTasks/useTasks.ts";
import "./Task.css";

export const Task = ({ id, title, description, priority }: TaskInterface) => {
  const [inEditMode, setInEditMode] = useState(false);
  const { deleteTask } = useTasks();

  return (
    <div key={id} className="task">
      <div className="task__content">
        <p className="task__priority">{priority}</p>
        <h3 className="task__title">{title}</h3>
        <p className="task__desc">{description}</p>
      </div>
      <div className="task__actions">
        <button
          className="task__btn"
          onClick={() => {
            setInEditMode(true);
          }}
        >
          edit
        </button>
        <button
          className="task__btn"
          onClick={() => {
            deleteTask({ taskId: id });
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
};
