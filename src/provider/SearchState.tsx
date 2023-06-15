import SearchContext, { searchProps } from "./searchContext";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const SearchState = (props: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const handleShow = (present: boolean) => {
    setShow(present);
  };

  const [search, setSearch] = useState<searchProps>({
    location: "Add location",
    guests: "Add guests",
  });

  const handleSearch = ({
    location = "Add location",
    guests = "Add guests",
  }: searchProps) => {
    setSearch({
      location,
      guests,
    });
  };

  return (
    <SearchContext.Provider value={{ show, handleShow, search, handleSearch }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;
