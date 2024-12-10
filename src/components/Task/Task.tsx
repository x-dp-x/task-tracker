import React, { useState, memo } from "react";
import type { Task as TaskInterface } from "../../context/TaskContext/TaskContext.tsx";
import { useTasks } from "../../hooks/useTasks/useTasks.ts";
import "./Task.css";

const _Task = ({ id, title, description, priority }: TaskInterface) => {
  // TODO: use the inEditMode state to conditionally render a form if in edit mode
  // TODO: call editTask from the useTasks hook when saving edit form
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

export const Task = memo(_Task);
