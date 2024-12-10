import React from "react";
import { render } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";

import { TaskList } from "./TaskList.tsx";
import { TaskPriority } from "../../context/TaskContext/TaskContext.tsx";

describe("TaskList", () => {
  describe("With no tasks, and no filter", () => {
    it("Should render nothing where loading has not completed", async () => {
      const { queryByText } = render(
        <TaskList
          tasks={[]}
          loaded={false}
          filterOptions={{
            filterBy: null,
          }}
        />
      );

      await waitFor(() => {
        expect(
          queryByText("No tasks! Please use the form to start adding tasks")
        ).not.toBeInTheDocument();
      });
    });

    it("Should render empty state where loading has completed", async () => {
      const { getByText } = render(
        <TaskList
          tasks={[]}
          loaded={true}
          filterOptions={{
            filterBy: null,
          }}
        />
      );

      await waitFor(() => {
        expect(
          getByText("No tasks! Please use the form to start adding tasks")
        ).toBeInTheDocument();
      });
    });
  });

  describe("With tasks, but no filter", () => {
    it("Should render unfiltered tasks ", async () => {
      const { getByText } = render(
        <TaskList
          tasks={[
            {
              id: "1",
              title: "First",
              description: "First Desc",
              priority: TaskPriority.High,
            },
          ]}
          loaded={true}
          filterOptions={{
            filterBy: null,
          }}
        />
      );

      await waitFor(() => {
        expect(getByText("First")).toBeInTheDocument();
      });
    });
  });

  describe("With tasks, and filter", () => {
    it("Should render a task with the correct filter", async () => {
      const { getByText, queryByText } = render(
        <TaskList
          tasks={[
            {
              id: "1",
              title: "First",
              description: "First Desc",
              priority: TaskPriority.High,
            },
            {
              id: "2",
              title: "Second",
              description: "Second Desc",
              priority: TaskPriority.Medium,
            },
          ]}
          loaded={true}
          filterOptions={{
            filterBy: TaskPriority.High,
          }}
        />
      );

      await waitFor(() => {
        expect(getByText("First")).toBeInTheDocument();
        expect(queryByText("Second")).not.toBeInTheDocument();
      });
    });
  });
});
