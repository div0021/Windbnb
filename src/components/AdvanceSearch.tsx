import { useRef, MouseEvent } from "react";
import { useSearchContext } from "../provider/searchContext";
import { useState, FocusEvent, ChangeEvent } from "react";

type inputProps = {
  location: string;
  guests: number | string;
};
const AdvanceSearch = () => {
  const arr = [
    "Helsinki, Finland",
    "Turku, Finland",
    "Oulu, Finland",
    "Vaasa, Finland",
  ];

  const ref = useRef<HTMLDivElement>(null);
  const [places, setPlaces] = useState<inputProps>({
    location: "Add location",
    guests: "Add guests",
  });
  const [turn, setTurn] = useState<boolean>(false);

  const [counter1, setCounter1] = useState<number>(0);

  const [counter2, setCounter2] = useState<number>(0);

  const { show, handleShow, handleSearch } = useSearchContext();

  show && ref.current?.classList.add("top-0");

  const handleCloseClick = () => {
    ref.current?.classList.remove("top-0");
    ref.current?.classList.add("-top-[40rem]");
    handleShow(false);
  };

  const handleSelectClick = (e: MouseEvent<HTMLDivElement>) => {
    const value = e.currentTarget.childNodes[1].textContent;
    setPlaces((pre) => {
      return {
        ...pre,
        location: value as string,
      };
    });
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    const target = e.target;
    // console.log(target.type);
    let value = "";
    if (target.value === "Add guests") {
      value = "0";
    } else {
      value = Number(target.value.split(" ")[0]).toString();
    }

    setPlaces((pre) => {
      return {
        ...pre,
        guests: value,
      };
    });
    target.type = "number";
    setTurn(true);
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value
      ? target.value !== "Add guests"
        ? Number(target.value)
        : 0
      : undefined;
    //  console.log('blur ' , value)
    target.type = "text";
    let temp = "";
    if (!value) {
      temp = "Add guests";
    } else if (value === 1) {
      temp = target.value + " guest";
    } else {
      temp = target.value + " guests";
    }
    setPlaces((pre) => {
      return {
        ...pre,
        guests: temp,
      };
    });
    if (counter1 + counter2 !== value) {
      setCounter1(0);
      setCounter2(0);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let guest = Number(e.target.value);
    if (guest > 9) {
      guest = Number(guest.toString().split("")[1]);
    } else if (guest < 0) {
      guest = 0;
    }

    // console.log(guest);
    setPlaces((pre) => {
      return {
        ...pre,
        guests: guest,
      };
    });
  };

  const handleButtonClick = () => {
    const temp = places.guests.toString();
    handleSearch({
      location: places.location,
      guests: temp,
    });

    handleCloseClick();
    setTimeout(() => {
      setPlaces({
        location: "Add location",
        guests: "Add guests",
      });
      setCounter1(0);
      setCounter2(0);
      setTurn(false);
    }, 1500);
  };

  return (
    <div
      ref={ref}
      className="bg-white fixed -top-[40rem] w-[23.5rem] micro:w-[23.5rem] smini:w-[100dvw] h-[35rem] z-20 font-mulish text-[#333333] transition-all duration-1000 ease-in-out"
    >
      <div className="p-3 big:p-10 big:pb-3 pt-5  flex flex-col justify-between h-full">
        <div className="space-y-5">
          <div className="flex justify-between">
            <p className="font-bold text-xs">Edit your search</p>
            <span
              className="material-symbols-rounded cursor-pointer"
              onClick={handleCloseClick}
            >
              close
            </span>
          </div>

          <div className="flex flex-col big:grid big:grid-cols-2 big:gap-x-4 divide-y divide-[#f2f2f2] shadow-md big:shadow-none justify-center rounded-2xl space-y-1">
            <div
              className="p-3 pl-5 pr-5  rounded-2xl border border-transparent space-y-1 hover:border-black cursor-pointer active:border-black transition-colors duration-500 ease-in-out big:shadow-md"
              onClick={() => setTurn(false)}
            >
              <p className="text-[10px] font-extrabold">Location</p>
              <p className="text-sm">{places.location}</p>
            </div>
            <div>
              <div
                className="p-3 pl-5 pr-5 space-y-1 border border-transparent hover:border-black rounded-2xl cursor-pointer transition-colors duration-500 ease-in-out big:shadow-md"
                onClick={() => setTurn(true)}
              >
                <p className="text-[10px] font-extrabold">Guest</p>
                <input
                  type="text"
                  name="guests"
                  className="outline-none hover:outline-none text-[#828282] focus:text-[#333333] font-normal text-sm focus:font-bold"
                  id="guests"
                  placeholder="Add Guests"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={places.guests}
                />
              </div>
            </div>
          </div>

          <div className="p-3 pl-5 pr-5 big:grid big:grid-cols-2 big:gap-x-10">
            <div className="space-y-5">
              {!turn &&
                arr.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer flex space-x-2"
                      onClick={handleSelectClick}
                    >
                      <span className="material-symbols-rounded">
                        location_on
                      </span>
                      <p className="text[#4f4f4f]">{el}</p>
                    </div>
                  );
                })}
            </div>
            <div>
              {turn && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <p className="text-[#333333] font-bold text-sm">Adults</p>
                      <p className="font-medium text-[#bdbdbd] text-sm">
                        Ages 13 or above
                      </p>
                    </div>

                    <div className="flex space-x-3 items-center">
                      <button
                        className="rounded-lg border cursor-pointer border-[#828282] p-1 pl-3 pr-3"
                        onClick={() => {
                          const check =
                            (counter1 === 0 ? counter1 : counter1 - 1) +
                            counter2;

                          if (check === 0) {
                            setPlaces((pre) => {
                              return {
                                ...pre,
                                guests: "Add guests",
                              };
                            });
                          } else if (check === 1) {
                            setPlaces((pre) => {
                              return {
                                ...pre,
                                guests: check + " guest",
                              };
                            });
                          } else {
                            setPlaces((pre) => {
                              return {
                                ...pre,
                                guests: check + " guests",
                              };
                            });
                          }

                          setCounter1((pre) => {
                            if (pre === 0) {
                              return 0;
                            } else {
                              return pre - 1;
                            }
                          });
                        }}
                      >
                        -
                      </button>
                      <span className="text-lg  font-bold">{counter1}</span>
                      <button
                        className="rounded-lg border cursor-pointer border-[#828282] p-1 pl-3 pr-3"
                        onClick={() => {
                          const check = counter1 + counter2 + 1;
                          if (check < 10) {
                            if (check === 1) {
                              setPlaces((pre) => {
                                return {
                                  ...pre,
                                  guests: check + " guest",
                                };
                              });
                            } else {
                              setPlaces((pre) => {
                                return {
                                  ...pre,
                                  guests: check + " guests",
                                };
                              });
                            }

                            setCounter1((pre) => {
                              if (pre >= 10) {
                                return 10;
                              } else {
                                return pre + 1;
                              }
                            });
                          } else {
                            alert("Max capacity reached");
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="space-y-1">
                      <p className="text-[#333333] font-bold text-sm">
                        Children
                      </p>
                      <p className="font-medium text-[#bdbdbd] text-sm">
                        Ages 2-12
                      </p>
                    </div>

                    <div className="flex space-x-3 items-center">
                      <button
                        className="rounded-lg border cursor-pointer border-[#828282] p-1 pl-3 pr-3"
                        onClick={() => {
                          const check =
                            (counter2 === 0 ? counter2 : counter2 - 1) +
                            counter1;

                          if (check === 0) {
                            setPlaces((pre) => {
                              return {
                                ...pre,
                                guests: "Add guests",
                              };
                            });
                          } else if (check === 1) {
                            setPlaces((pre) => {
                              return {
                                ...pre,
                                guests: check + " guest",
                              };
                            });
                          } else {
                            setPlaces((pre) => {
                              return {
                                ...pre,
                                guests: check + " guests",
                              };
                            });
                          }

                          setCounter2((pre) => {
                            if (pre === 0) {
                              return 0;
                            } else {
                              return pre - 1;
                            }
                          });
                        }}
                      >
                        -
                      </button>
                      <span className="text-lg  font-bold">{counter2}</span>
                      <button
                        className="rounded-lg border cursor-pointer border-[#828282] p-1 pl-3 pr-3"
                        onClick={() => {
                          const check = counter1 + counter2 + 1;
                          if (check < 10) {
                            if (check === 1) {
                              setPlaces((pre) => {
                                return {
                                  ...pre,
                                  guests: check + " guest",
                                };
                              });
                            } else {
                              setPlaces((pre) => {
                                return {
                                  ...pre,
                                  guests: check + " guests",
                                };
                              });
                            }

                            setCounter2((pre) => {
                              if (pre >= 10) {
                                return 10;
                              } else {
                                return pre + 1;
                              }
                            });
                          } else {
                            alert("Max capacity reached");
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="bg-[#eb5757]/90 p-3 pr-5 pl-5 flex space-x-3 text-[#f2f2f2] font-bold cursor-pointer rounded-2xl hover:scale-110 transition-transform duration-500 ease-in-out"
            onClick={handleButtonClick}
          >
            <span className="material-symbols-rounded">search</span>{" "}
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvanceSearch;
