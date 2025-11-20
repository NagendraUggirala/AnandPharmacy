import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: 1, name: "All", img: "/assets/category-icons/all.png" },
  { id: 2, name: "Baby Care", img: "/assets/category-icons/baby-care.png" },
  { id: 3, name: "Skin Care", img: "/assets/category-icons/skin-care.png" },
  { id: 4, name: "Diabetes Care", img: "/assets/category-icons/diabetes-care.png" },
  { id: 5, name: "Cardiac Care", img: "/assets/category-icons/heart-care.png" },
  { id: 6, name: "Stomach Care", img: "/assets/category-icons/stomach-care.png" },
  { id: 7, name: "Pain Relief", img: "/assets/category-icons/pain-relief.png" },
  { id: 8, name: "Liver Care", img: "/assets/category-icons/liver-care.png" },
  { id: 9, name: "Oral Care", img: "/assets/category-icons/oral-care.png" },
  { id: 10, name: "Respiratory", img: "/assets/category-icons/respiratory.png" },
  { id: 11, name: "Sexual Health", img: "/assets/category-icons/sexual-health.png" },
  { id: 12, name: "Elderly Care", img: "/assets/category-icons/elderly-care.png" },
  { id: 13, name: "Cold & Immunity", img: "/assets/category-icons/immunity.png" },
  { id: 14, name: "Women Health", img: "/assets/category-icons/women-health.png" },
  { id: 15, name: "Covid Essentials", img: "/assets/category-icons/covid.png" },
  { id: 16, name: "First Aid", img: "/assets/category-icons/first-aid.png" },
];

export default function CategorySlider() {
  const [active, setActive] = useState(1);
  const navigate = useNavigate();

  const goToCategory = (cat) => {
    setActive(cat.id);
    const slug = cat.name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/home/${slug}`);
  };

  return (
    <div className="w-full bg-white border-b py-6 ">

      <div
        className="
          flex items-center gap-5 px-4 
          whitespace-nowrap 
          overflow-x-auto lg:overflow-x-visible 
          lg:justify-center 
          no-scrollbar
        "
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => goToCategory(cat)}
            className="flex flex-col items-center text-center shrink-0 group"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className={`
                w-8 h-8 object-contain mb-1 transition-all
                ${active === cat.id ? "opacity-100 scale-105" : "opacity-70 group-hover:opacity-100"}
              `}
            />
            <span
              className={`
                text-[13px] leading-tight
                ${active === cat.id ? "font-semibold text-gray-800" : "text-gray-600"}
              `}
            >
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
