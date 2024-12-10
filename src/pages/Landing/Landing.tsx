import React from "react";
import { TaskPriority } from "../../context/TaskContext/TaskContext.tsx";
import { useTasks } from "../../hooks/useTasks/useTasks.ts";
import { TaskList } from "../../components/TaskList/TaskList.tsx";
import { FilterSelection } from "../../components/FilterSelection/FilterSelection.tsx";
import { TaskForm } from "../../components/TaskForm/TaskForm.tsx";

const filterOpts = [TaskPriority.High, TaskPriority.Medium, TaskPriority.Low];

export const LandingPage = () => {
  const { tasks, addTask } = useTasks();

  return (
    <>
      <div className="body">
        <FilterSelection title="Filter By" options={filterOpts} />
        <TaskList tasks={tasks} />
      </div>

      <aside className="aside">
        <TaskForm
          options={filterOpts}
          defaultPriority={TaskPriority.Low}
          handleSubmit={addTask}
        />
      </aside>
    </>
  );
};
