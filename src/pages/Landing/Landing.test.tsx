import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { LandingPage } from "./Landing.tsx";
import { FilterProvider } from "../../context/FilterContext/FilterContext.tsx";
import { TasksProvider } from "../../context/TaskContext/TaskContext.tsx";

const firstTask = {
  title: "first title",
  desc: "first desc",
};

const secondTask = {
  title: "second title",
  desc: "second desc",
};

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe("LandingPage", () => {
  describe("Populating a task using the form", () => {
    it("Should add a task to the list", async () => {
      const { getByPlaceholderText, getByText } = render(
        <FilterProvider>
          <TasksProvider>
            <LandingPage />
          </TasksProvider>
        </FilterProvider>
      );

      await userEvent.type(getByPlaceholderText("Task Title"), firstTask.title);
      await userEvent.type(
        getByPlaceholderText("Task Description"),
        firstTask.desc
      );
      await userEvent.click(getByText("Add task!"));

      await waitFor(() => {
        expect(getByText(firstTask.title)).toBeVisible();
        expect(getByText(firstTask.desc)).toBeVisible();
      });
    });
  });

  describe("Setting a filter option", () => {
    it("Should refine the list", async () => {
      const { getByPlaceholderText, getByText, queryByText, getByTestId } =
        render(
          <FilterProvider>
            <TasksProvider>
              <LandingPage />
            </TasksProvider>
          </FilterProvider>
        );

      // Add first task
      await userEvent.type(getByPlaceholderText("Task Title"), firstTask.title);
      await userEvent.type(
        getByPlaceholderText("Task Description"),
        firstTask.desc
      );
      await fireEvent.change(getByTestId("task-form-select"), {
        target: { value: "Medium" },
      });
      await userEvent.click(getByText("Add task!"));

      // Add second task
      await userEvent.type(
        getByPlaceholderText("Task Title"),
        secondTask.title
      );
      await userEvent.type(
        getByPlaceholderText("Task Description"),
        secondTask.desc
      );
      await fireEvent.change(getByTestId("task-form-select"), {
        target: { value: "High" },
      });
      await userEvent.click(getByText("Add task!"));

      // Filter to High
      await fireEvent.change(getByTestId("filter-select"), {
        target: { value: "High" },
      });

      await waitFor(() => {
        expect(getByText(secondTask.title)).toBeVisible();
        expect(getByText(secondTask.desc)).toBeVisible();
        expect(queryByText(firstTask.title)).not.toBeInTheDocument();
        expect(queryByText(firstTask.desc)).not.toBeInTheDocument();
      });
    });
  });

  describe("Clicking delete on a task", () => {
    it("Should remove an item from the list", async () => {
      const { getByPlaceholderText, getByText, queryByText, getByTestId } =
        render(
          <FilterProvider>
            <TasksProvider>
              <LandingPage />
            </TasksProvider>
          </FilterProvider>
        );

      // Add first task
      await userEvent.type(getByPlaceholderText("Task Title"), firstTask.title);
      await userEvent.type(
        getByPlaceholderText("Task Description"),
        firstTask.desc
      );
      await fireEvent.change(getByTestId("task-form-select"), {
        target: { value: "Medium" },
      });
      await userEvent.click(getByText("Add task!"));

      await waitFor(() => {
        expect(getByText(firstTask.title)).toBeVisible();
        expect(getByText(firstTask.desc)).toBeVisible();
      });

      // Remove first task
      await userEvent.click(getByText("delete"));

      await waitFor(() => {
        expect(queryByText(firstTask.title)).not.toBeInTheDocument();
        expect(queryByText(firstTask.desc)).not.toBeInTheDocument();
      });
    });
  });
});
