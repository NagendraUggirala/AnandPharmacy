// src/components/Header/CategorySlider.jsx
import React, { useEffect, useState } from "react";
import { getHeaderData } from "../../api/headerService";

const CategorySlider = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    (async () => {
      const d = await getHeaderData();
      setCats(d.categories || []);
    })();
  }, []);

  return (
    <div className="bg-white shadow-sm border-t py-3">

<div className="category-slider-scroll max-w-[1600px] mx-auto">

        {cats.map((c) => (
          <div
            key={c.id}
            className="
              group flex flex-col items-center cursor-pointer select-none
              min-w-[60px] 
              lg:min-w-0
            "
            onClick={() => console.log(`Open category: ${c.name}`)}
          >
            {/* Icon wrapper */}
            <div
              className="
                flex items-center justify-center 
                bg-gray-100 shadow-sm rounded-2xl
                w-8 h-8

                lg:bg-transparent lg:shadow-none
                lg:w-10 lg:h-10
              "
            >
              <img
                src={c.img}
                alt={c.name}
                className="
                  object-contain
                  w-5 h-5
                  opacity-80
                  group-hover:opacity-100 transition
                  
                  lg:w-7 lg:h-7
                "
              />
            </div>

            {/* Text */}
            <p
              className="
                mt-1 text-[11px] text-gray-700 text-center leading-tight
                truncate max-w-[70px]

                lg:text-sm lg:max-w-[100px]
                lg:group-hover:text-orange-600
              "
            >
              {c.name}
            </p>

            {/* Hover underline (Desktop only) */}
            <div
              className="
                hidden lg:block 
                h-[2px] w-6 rounded-full bg-orange-600 mt-1
                opacity-0 group-hover:opacity-100 transition
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
