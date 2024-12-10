import React from "react";
import type { Task as TaskInterface } from "../../context/TaskContext/TaskContext.tsx";

export const Task = ({ id, title, description, priority }: TaskInterface) => (
  <div key={id} className="task">
    <p className="task__priority">{priority}</p>
    <h3 className="task__title">{title}</h3>
    <p className="task__desc">{description}</p>
  </div>
);
