import React from "react";

interface FilterSelectionProps {
  title: string;
  options: string[];
}

export const FilterSelection = ({ title, options }: FilterSelectionProps) => (
  <div className="filter">
    <select>
      <option key="default" value="">
        {title}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
