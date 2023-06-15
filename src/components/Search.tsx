import { ChangeEvent, FocusEvent } from "react";
import { useSearchContext } from "../provider/searchContext";

const Search = () => {
  const { handleShow, search, handleSearch } = useSearchContext();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    // console.log('in change ',value)
    if (value > 9) {
      value = Number(value.toString().split("")[1]);
    } else if (value < 0) {
      value = 0;
    }

    handleSearch({ location: search.location, guests: value });
  };

  const handleClick = () => {
    handleShow(true);
  };
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    const target = e.target;
    target.value = target.value.split(" ")[0];
    //  console.log(target.value);
    target.type = "number";
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = Number(target.value);
    // console.log('blur ' ,target.value)
    target.type = "text";
    let temp = "";
    if (value === 1) {
      temp = target.value + " guest";
    } else {
      temp = target.value + " guests";
    }
    handleSearch({ location: search.location, guests: temp });
  };
  return (
    <div className="font-mulish flex justify-center items-center">
      <div className="rounded-2xl w-72 h-14 grid grid-cols-6 divide-x shadow-md">
        <div className="flex justify-center items-center col-span-3 divide-[#f2f2f2]/50">
          <span className="font-normal text-sm text-[#333333]">
            {search.location}
          </span>
        </div>
        <div className="col-span-2 flex justify-center items-center">
          <input
            className="appearance-none w-20 hover:outline-none outline-none text-sm text-[#bdbdbd] focus:text-[#333333]"
            value={search.guests}
            onChange={handleChange}
            type="text"
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Add Guest"
          />
        </div>
        <div
          className="col-span-1 flex justify-center items-center cursor-pointer"
          onClick={handleClick}
        >
          <span className="material-symbols-rounded text-[#eb5757]/90 hover:scale-150 transition-transform duration-500 ease-in-out">
            search
          </span>
        </div>
      </div>
    </div>
  );
};

export default Search;
