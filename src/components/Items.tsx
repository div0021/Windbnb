import data from "../db/stays.json";
import { useSearchContext } from "../provider/searchContext";
import ListItem from "./ListItem";
import { useState, useEffect } from "react";

const Items = () => {
  const { search } = useSearchContext();
  const [stays, setStays] = useState<string>("");

  const [width, setWidth] = useState<number>(window.innerWidth);

  const data1 = data.filter((el) => {
    const guest = Number(search.guests.toString().split(" ")[0]);
    return (
      el.city === search.location.split(", ")[0] &&
      el.country === search.location.split(", ")[1] &&
      el.maxGuests >= guest
    );
  });

  const data11 = [];
  const data12 = [];
  const data13 = [];

  if (width > 1279) {
    for (let i = 0; i < data1.length; i++) {
      if (i % 3 === 0) {
        data11.push(data1[i]);
      } else if (i % 3 === 1) {
        data12.push(data1[i]);
      } else if (i % 3 === 2) {
        data13.push(data1[i]);
      }
    }
  } else if (width > 767) {
    for (let i = 0; i < data1.length; i++) {
      if (i % 2 === 0) {
        data11.push(data1[i]);
      } else if (i % 2 === 1) {
        data12.push(data1[i]);
      }
    }
    data13.length = 0;
  } else {
    for (let i = 0; i < data1.length; i++) {
      data11.push(data1[i]);
    }
    data12.length = 0;
    data13.length = 0;
  }

  const handleStays = (num: number) => {
    let stay = "";
    if (num === 0) {
      stay = "Sorry! No stay";
    } else if (num === 1) {
      stay = num + " stay";
    } else {
      stay = num - 1 + "+ stays";
    }

    setStays(stay);
  };

  useEffect(() => {
    handleStays(data1.length);
    //eslint-disable-next-line
  }, [search]);

  window.addEventListener("resize", () => {
    if (
      window.innerWidth === 769 ||
      window.innerWidth === 766 ||
      window.innerWidth === 1278 ||
      innerWidth === 1280
    ) {
      setWidth(window.innerWidth);
    }
  });

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Stays in Finland</h1>
        <span className="text-sm">{stays}</span>
      </div>

      <div className="md:grid grid-cols-2 gap-5 xl:grid-cols-3">
        <div className="xl:space-y-2">
          {data11.map((el, index) => (
            <ListItem
              key={index}
              title={el.title}
              superHost={el.superHost}
              photo={el.photo}
              beds={el.beds}
              rating={el.rating}
              type={el.type}
            />
          ))}
        </div>
        <div className="xl:space-y-2">
          {data12.map((el, index) => (
            <ListItem
              key={index}
              title={el.title}
              superHost={el.superHost}
              photo={el.photo}
              beds={el.beds}
              rating={el.rating}
              type={el.type}
            />
          ))}
        </div>
        <div className="xl:space-y-2">
          {data13.map((el, index) => (
            <ListItem
              key={index}
              title={el.title}
              superHost={el.superHost}
              photo={el.photo}
              beds={el.beds}
              rating={el.rating}
              type={el.type}
            />
          ))}
        </div>
        {/* {data1.map((el, index) => (
        <ListItem
          key={index}
          title={el.title}
          superHost={el.superHost}
          photo={el.photo}
          beds={el.beds}
          rating={el.rating}
          type={el.type}
        />
      ))} */}
      </div>
    </div>
  );
};

export default Items;
