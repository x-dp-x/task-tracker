import "./App.css";
import React from "react";
import { useTasks } from "../hooks/useTasks/useTasks.ts";

export const App = () => {
  const { tasks } = useTasks();

  return <div className="App">{tasks.length ? "" : null}</div>;
};
