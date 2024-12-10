import React, { ReactNode, useState } from "react";
import { TaskPriority } from "../TaskContext/TaskContext";

export interface FilterOpts {
  filterBy: TaskPriority | null;
}

export interface FilterContextProps {
  filterOpts: FilterOpts;
  setFilterOpts(value: FilterOpts): void;
}

export const FilterContext = React.createContext<FilterContextProps>({
  filterOpts: {
    filterBy: null,
  },
  setFilterOpts: () => ({
    filterBy: null,
  }),
});

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [filterOpts, setFilterOpts] = useState<FilterOpts>({
    filterBy: null,
  });

  return (
    <FilterContext.Provider
      value={{
        filterOpts,
        setFilterOpts,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
