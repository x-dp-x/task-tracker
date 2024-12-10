import React from "react";
import { TaskPriority } from "../../context/TaskContext/TaskContext.tsx";
import { useTasks } from "../../hooks/useTasks/useTasks.ts";
import { useFilter } from "../../hooks/useFilter/useFilter.ts";
import { TaskList } from "../../components/TaskList/TaskList.tsx";
import { FilterSelection } from "../../components/FilterSelection/FilterSelection.tsx";
import { TaskForm } from "../../components/TaskForm/TaskForm.tsx";

const priorityOpts = [TaskPriority.High, TaskPriority.Medium, TaskPriority.Low];

export const LandingPage = () => {
  const { tasks, addTask, loaded } = useTasks();
  const { filterOpts, setFilterOpts } = useFilter();

  return (
    <>
      <div className="body">
        <FilterSelection
          title="Filter By"
          priorityOptions={priorityOpts}
          handleFilter={setFilterOpts}
        />
        <TaskList tasks={tasks} loaded={loaded} filterOptions={filterOpts} />
      </div>

      <aside className="aside">
        <TaskForm
          options={priorityOpts}
          defaultPriority={TaskPriority.Low}
          handleSubmit={addTask}
        />
      </aside>
    </>
  );
};
