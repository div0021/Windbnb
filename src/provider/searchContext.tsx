import { createContext, useContext } from "react";

export type searchProps = {
  location: string;
  guests: string | number;
};

export interface SearchContextType {
  show: boolean;
  handleShow: (present: boolean) => void;
  search: searchProps;
  handleSearch: ({ location, guests }: searchProps) => void;
}

const searchContext = createContext<SearchContextType | null>(null);
export default searchContext;
export const useSearchContext = () =>
  useContext(searchContext) as SearchContextType;
