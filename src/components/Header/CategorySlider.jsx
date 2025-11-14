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
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-3 py-2 overflow-x-auto whitespace-nowrap flex gap-6 hide-scroll">
        {cats.map((c) => (
          <div key={c.id} className="flex-shrink-0 w-20 text-center cursor-pointer" onClick={() => alert(`Open category ${c.name}`)}>
            <div className="w-14 h-14 mx-auto rounded-lg bg-gray-100 flex items-center justify-center">
              {c.img ? <img src={c.img} alt={c.name} className="w-10 h-10" /> : <div className="text-2xl">💊</div>}
            </div>
            <div className="text-xs mt-1">{c.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
