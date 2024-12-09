import React, { ReactNode, useState } from "react";

enum FilterTypes {
  Priority,
}

interface FilterOpts {
  filterBy?: FilterTypes;
}

export interface FilterContextProps {
  filterOpts: FilterOpts;
  setFilterOpts(value: FilterOpts): void;
}

export const FilterContext = React.createContext<FilterContextProps>({
  filterOpts: {},
  setFilterOpts: () => [],
});

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [filterOpts, setFilterOpts] = useState<FilterOpts>({});

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
