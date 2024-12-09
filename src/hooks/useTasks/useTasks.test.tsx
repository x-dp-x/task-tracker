import React from "react";
import { v4 as uuidv4 } from "uuid";
import { render } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import {
  TasksProvider,
  TaskPriority,
} from "../../context/TaskContext/TaskContext";
import { useTasks } from "./useTasks";

const firstTask = {
  id: uuidv4(),
  title: "First Task",
  description: "Description of the first task",
  priority: TaskPriority.High,
};
const overwrittenTitle = "Overwrite";
const secondTask = {
  id: uuidv4(),
  title: "Second Task",
  description: "Description of the second task",
  priority: TaskPriority.High,
};

const DummyComponent = () => {
  const { tasks = [], setTasks, addTask, editTask, deleteTask } = useTasks();
  const setTaskHandler = () => setTasks({ tasks: [firstTask, secondTask] });
  const addTaskHandler = () => addTask({ task: firstTask });
  const deleteTaskHandler = () => deleteTask({ taskId: firstTask.id });
  const editTaskHandler = () =>
    editTask({
      taskId: firstTask.id,
      task: {
        ...firstTask,
        title: overwrittenTitle,
      },
    });

  return (
    <div>
      <button onClick={setTaskHandler}>set</button>
      <button onClick={addTaskHandler}>add</button>
      <button onClick={editTaskHandler}>edit</button>
      <button onClick={deleteTaskHandler}>delete</button>
      {tasks.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};

beforeEach(() => {
  localStorage.clear();
});

describe("useTasks", () => {
  it("should not render any tasks", () => {
    const { queryByText } = render(
      <TasksProvider>
        <DummyComponent />
      </TasksProvider>
    );

    expect(queryByText(firstTask.title)).not.toBeInTheDocument();
  });

  it("should add a task", async () => {
    const { getByRole, getByText } = render(
      <TasksProvider>
        <DummyComponent />
      </TasksProvider>
    );
    userEvent.click(getByRole("button", { name: "add" }));

    await waitFor(() => {
      expect(getByText(firstTask.title)).toBeInTheDocument();
    });
  });

  it("should edit the task", async () => {
    const { queryByText, getByRole, getByText } = render(
      <TasksProvider>
        <DummyComponent />
      </TasksProvider>
    );
    userEvent.click(getByRole("button", { name: "add" }));
    userEvent.click(getByRole("button", { name: "edit" }));

    await waitFor(() => {
      expect(queryByText(firstTask.title)).not.toBeInTheDocument();
      expect(getByText(overwrittenTitle)).toBeInTheDocument();
    });
  });

  it("should delete the task", async () => {
    const { queryByText, getByRole } = render(
      <TasksProvider>
        <DummyComponent />
      </TasksProvider>
    );
    userEvent.click(getByRole("button", { name: "add" }));
    userEvent.click(getByRole("button", { name: "delete" }));

    await waitFor(() => {
      expect(queryByText(firstTask.title)).not.toBeInTheDocument();
      expect(queryByText(overwrittenTitle)).not.toBeInTheDocument();
    });
  });

  it("should set all tasks", async () => {
    const { getByRole, getByText } = render(
      <TasksProvider>
        <DummyComponent />
      </TasksProvider>
    );
    userEvent.click(getByRole("button", { name: "set" }));

    await waitFor(() => {
      expect(getByText(firstTask.title)).toBeInTheDocument();
      expect(getByText(secondTask.title)).toBeInTheDocument();
    });
  });
});
