import data from "../db/stays.json";
import { useSearchContext } from "../provider/searchContext";
import ListItem from "./ListItem";
import { useState, useEffect } from "react";

const Items = () => {
  const { search } = useSearchContext();
  const [stays, setStays] = useState<string>("");

  const [width, setWidth] = useState<number>(window.innerWidth);

  const data1 = data.filter((el) => {
    let guest = 0;

    if (search.guests.toString() === "Add guests") {
      guest = 0;
    } else {
      guest = Number(search.guests.toString().split(" ")[0]);
    }

    if (search.location === "Add location") {
      return el.maxGuests >= guest;
    }

    return (
      el.city === search.location.split(", ")[0] &&
      el.country === search.location.split(", ")[1] &&
      el.maxGuests >= guest
    );
  });
  // console.log(data1)
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
    setWidth(window.innerWidth);
  });

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Stays in Finland</h1>
        <span className="text-sm">{stays}</span>
      </div>

      {/* Not Available Section */}
      {data1.length === 0 && (
        <div
          className="bg-cover bg-no-repeat micro:w-[94dvw] esm:w-[94dvw] vsm:w-[72dvw] md:w-[95dvw] big:w-[88.5dvw] lg:w-[80dvw] h-96 rounded-xl flex justify-center items-center flex-col space-y-3"
          style={{
            background:
              "url(https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80)",
          }}
        >
          <p className="text-4xl font-bold">😔 Sorry</p>
          <p className="text-4xl font-bold">Not Available</p>
        </div>
      )}

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
      </div>
    </div>
  );
};

export default Items;
