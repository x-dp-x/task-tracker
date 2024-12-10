import { useContext } from "react";
import { FilterContext } from "../../context/FilterContext/FilterContext.tsx";

export const useFilter = () => {
  const { filterOpts, setFilterOpts } = useContext(FilterContext);

  return {
    filterOpts,
    setFilterOpts,
  };
};
