import React from "react";
import { FilterOpts } from "../../context/FilterContext/FilterContext";
import { TaskPriority } from "../../context/TaskContext/TaskContext";
import "./FilterSelection.css";

interface FilterSelectionProps {
  title: string;
  priorityOptions: string[];
  handleFilter(value: FilterOpts): void;
}

export const FilterSelection = ({
  title,
  priorityOptions,
  handleFilter,
}: FilterSelectionProps) => (
  <div className="filter">
    <select
      data-testid="filter-select"
      className="filter__select"
      onChange={(e) =>
        handleFilter({ filterBy: e.target.value as TaskPriority })
      }
    >
      <option key="default" value="">
        {title}
      </option>
      {priorityOptions.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
