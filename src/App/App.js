import React from "react";
import { TasksProvider } from "../context/TaskContext/TaskContext.tsx";
import { FilterProvider } from "../context/FilterContext/FilterContext.tsx";
import { LandingPage } from "../pages/Landing/Landing.tsx";

import "./App.css";
import "./reset.css";

export const App = () => (
  <div className="app">
    <FilterProvider>
      <TasksProvider>
        <LandingPage />
      </TasksProvider>
    </FilterProvider>
  </div>
);
