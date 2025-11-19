import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StomachData from "../../data/Stomach.json";
  // ✅ Correct connection

const Stomach = () => {

  const [activeCategory, setActiveCategory] = useState("top_rated");
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState({});
  const [loading, setLoading] = useState(true);

  /* --------------------------------------------------------
      LOAD JSON FROM IMPORT + LOCAL STORAGE
  --------------------------------------------------------*/
useEffect(() => {
  try {
    let data = StomachData;

    // If JSON contains "product", use product
    if (StomachData.product) {
      data = StomachData.product;
    }

    // Save to storage if not saved already
    if (!localStorage.getItem("stomach_products")) {
      localStorage.setItem("stomach_products", JSON.stringify(data));
    }

    const stored = JSON.parse(localStorage.getItem("stomach_products"));

    setProducts(stored?.[activeCategory] || []);
    setLoading(false);
  } catch (error) {
    console.error("Error loading JSON:", error);
    setLoading(false);
  }
}, [activeCategory]);


  /* --------------------------------------------------------
      ADD / REMOVE QTY
  --------------------------------------------------------*/
  const increment = (id) => {
    setQty((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrement = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 0,
    }));
  };

  /* --------------------------------------------------------
      CATEGORY TABS
  --------------------------------------------------------*/
  const tabs = [
    { key: "top_rated", label: "Top Rated" },
    { key: "recommendations", label: "Recommended" },
    { key: "tablets", label: "Tablets" },
    { key: "powders", label: "Powders" },
    { key: "syrups", label: "Syrups" },
    { key: "ors", label: "ORS" },
    { key: "kids", label: "Kids" },
    { key: "elder", label: "Elder" },
    { key: "ayurvedic", label: "Ayurvedic Tonics" }
  ];

  if (loading)
    return <p className="text-center text-lg p-4">Loading Products...</p>;

  return (
    <div className="w-full p-4">
      
      {/* TABS */}
      <div className="overflow-x-auto whitespace-nowrap pb-3 mb-4 border-b">
        {tabs.map((tab) => (
          <button
            key ={tab.key}
            onClick={() => setActiveCategory(tab.key)}
            className={`px-4 py-2 mr-3 font-semibold rounded-lg ${
              activeCategory === tab.key
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CATEGORY TITLE */}
      <h2 className="text-2xl font-bold mb-3 capitalize">
        {activeCategory.replaceAll("_", " ")}
      </h2>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white p-3 pb-4 rounded-2xl shadow-lg border relative hover:shadow-xl transition"
          >
            {/* ADD / COUNTER */}
            <div className="absolute bottom-8 right-5 z-10">
              {!qty[item.id] ? (
                <button
                  onClick={() => increment(item.id)}
                  className="bg-white border border-orange-500 text-orange-500 px-4 py-1 rounded-xl shadow-sm text-sm font-bold hover:bg-orange-600 hover:text-white transition"
                >
                  ADD
                </button>
              ) : (
                <div className="bg-white border border-orange-500 rounded-xl shadow-sm flex items-center px-3 py-1">
                  <button
                    onClick={() => decrement(item.id)}
                    className="text-green-600 font-bold text-lg px-1"
                  >
                    −
                  </button>
                  <span className="px-2 font-semibold">{qty[item.id]}</span>
                  <button
                    onClick={() => increment(item.id)}
                    className="text-red-500 font-bold text-lg px-1"
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            {/* IMAGE */}
            <div className="w-full h-40 flex justify-center items-center mb-3">
              <img
                src={item.images || item.images?.[0]}
                alt={item.name}
                className="h-full object-contain"
              />
            </div>

            {/* PRICE BOX */}
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-green-700 text-white px-3 py-1 rounded-lg font-bold text-lg">
                  ₹{item.final_price}
                </span>
                <span className="line-through text-gray-400">
                  ₹{item.cost}
                </span>
              </div>
              <p className="text-green-700 font-semibold text-sm mt-1">
                ₹{item.cost - item.final_price} OFF
              </p>
            </div>

            {/* NAME */}
            <h3 className="font-semibold text-sm mt-2 leading-tight line-clamp-2">
              {item.name}
            </h3>

            {/* PACK SIZE */}
            <p className="text-gray-500 text-xs mt-1">
              {item?.highlights?.pack_size || "Standard"}
            </p>

            {/* USE TAG */}
            {item.uses && (
              <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-md">
                {item.uses[0]}
              </span>
            )}

            {/* RATING */}
            <div className="flex items-center text-sm mt-3">
              <span className="text-green-700 font-bold">⭐ {item.rating}</span>
              <span className="text-gray-500 text-xs ml-1">(1.7k)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stomach;
