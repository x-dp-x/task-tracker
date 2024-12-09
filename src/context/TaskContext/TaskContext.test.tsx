import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { render } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import {
  TasksProvider,
  TaskPriority,
  TaskContext,
  taskLocalStorageKey,
} from "../../context/TaskContext/TaskContext";

const firstTask = {
  id: uuidv4(),
  title: "First Task",
  description: "Description of the first task",
  priority: TaskPriority.High,
};

const DummyComponent = () => {
  const { tasks, setTasks } = useContext(TaskContext);

  return (
    <div>
      <button onClick={() => setTasks([firstTask])}>set</button>
      {tasks.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};

describe("TaskContext", () => {
  it("should add to localStorage", async () => {
    const spy = jest.spyOn(Storage.prototype, "setItem");
    const { getByRole, getByText } = render(
      <TasksProvider>
        <DummyComponent />
      </TasksProvider>
    );
    userEvent.click(getByRole("button", { name: "set" }));

    await waitFor(() => {
      expect(getByText(firstTask.title)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(spy).toHaveBeenLastCalledWith(
        taskLocalStorageKey,
        JSON.stringify([firstTask])
      );
    });
  });

  it("should get from localStorage", async () => {
    const spy = jest.spyOn(Storage.prototype, "getItem");
    const { getByRole, getByText } = render(
      <TasksProvider>
        <DummyComponent />
      </TasksProvider>
    );

    await waitFor(() => {
      expect(spy).toHaveBeenLastCalledWith(taskLocalStorageKey);
    });

    await waitFor(() => {
      expect(getByText(firstTask.title)).toBeInTheDocument();
    });
  });
});
