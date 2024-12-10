import React from "react";
import { TaskPriority, Tasks } from "../../context/TaskContext/TaskContext.tsx";
import { FilterOpts } from "../../context/FilterContext/FilterContext";
import { Task } from "../Task/Task.tsx";
import "./TaskList.css";

interface FilterTasksBy {
  tasks: Tasks;
  filter: TaskPriority | null;
}

const filterTasksBy = ({ tasks, filter }: FilterTasksBy) => {
  return tasks.filter((task) => task.priority === filter);
};

interface TaskListProps {
  tasks: Tasks;
  loaded: Boolean;
  filterOptions: FilterOpts;
}

export const TaskList = ({
  tasks: unfilteredTasks,
  loaded,
  filterOptions,
}: TaskListProps) => {
  console.log(filterOptions);
  const tasks =
    filterOptions.filterBy !== null
      ? filterTasksBy({
          tasks: unfilteredTasks,
          filter: filterOptions.filterBy,
        })
      : unfilteredTasks;

  if (loaded && tasks.length <= 0) {
    return (
      <p className="tasklist__empty-state">
        No tasks! Please use the form to start adding tasks
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
