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
    <div className="bg-white shadow-sm border-t">

      {/* ---------------- DESKTOP VIEW (Flipkart + Zepto style) ---------------- */}
 {/* ---------------- DESKTOP VIEW (Zepto Style) ---------------- */}
<div className="hidden lg:flex max-w-7xl mx-auto px-6 py-3 gap-10 border-b bg-white">

  {cats.map((c) => (
    <div
      key={c.id}
      className="group flex flex-col items-center cursor-pointer"
      onClick={() => console.log(`Open category: ${c.name}`)}
    >
      {/* Icon small like Zepto (22-26px) */}
      <img
        src={c.img}
        alt={c.name}
        className="w-6 h-6 object-contain opacity-70 group-hover:opacity-100 transition"
      />

      {/* Text below */}
      <p className="text-xs mt-1 text-gray-600 group-hover:text-purple-600">
        {c.name}
      </p>

      {/* Underline highlight (Zepto effect) */}
      <div className="h-[2px] w-5 rounded-full bg-purple-600 mt-1 opacity-0 group-hover:opacity-100 transition"></div>
    </div>
  ))}

</div>


      {/* ---------------- MOBILE VIEW (Zepto scrollable) ---------------- */}
{/* ---------------- MOBILE / TABLET VIEW (Zepto App Style) ---------------- */}
<div className="lg:hidden px-3 py-4 overflow-x-auto hide-scroll flex items-center gap-5 whitespace-nowrap">

  {cats.map((c) => (
    <div
      key={c.id}
      className="flex flex-col items-center cursor-pointer min-w-[70px]"
      onClick={() => console.log(`Open: ${c.name}`)}
    >
      {/* Icon Container */}
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center shadow-sm">
        <img
          src={c.img}
          alt={c.name}
          className="w-10 h-10 object-contain"
        />
      </div>

      {/* Name */}
      <p className="text-[11px] mt-1 text-center text-gray-700 leading-tight">
        {c.name}
      </p>
    </div>
  ))}

</div>

    </div>
  );
};

export default CategorySlider;
