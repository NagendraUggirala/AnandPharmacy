import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DiabetesBanner from '../../components/Banners/DiabetesBanner';
import DiabetesData from "../../data/Diabetes.json";

const DiabetesCare = () => {
  const [activeCategory, setActiveCategory] = useState("top_rated");
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState({});
  const [loading, setLoading] = useState(true);

  /* ---------------------- LOAD JSON ---------------------- */
  useEffect(() => {
    try {
      let data = DiabetesData.product || DiabetesData;

      if (!localStorage.getItem("diabetes_products")) {
        localStorage.setItem("diabetes_products", JSON.stringify(data));
      }

      const stored = JSON.parse(localStorage.getItem("diabetes_products"));
      setProducts(stored?.[activeCategory] || []);
      setLoading(false);
    } catch (error) {
      console.error("Error loading JSON:", error);
      setLoading(false);
    }
  }, [activeCategory]);

  /* ---------------------- QTY HANDLERS ---------------------- */
  const increment = (id) =>
    setQty((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  const decrement = (id) =>
    setQty((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 0,
    }));

  /* ---------------------- CATEGORY TABS ---------------------- */
  const tabs = [
    { key: "top_rated", label: "Top Rated" },
    { key: "recommendations", label: "Recommended" },
    { key: "tablets", label: "Tablets" },
    { key: "insulin", label: "Insulin" },
    { key: "glucometer", label: "Glucometer" },
    { key: "syrups", label:"Syrups"}
  ];

  if (loading) return <p className="text-center text-lg p-4">Loading products...</p>;

  return (


    <div className="w-full p-4">

      {/* TABS */}
      <div className="overflow-x-auto whitespace-nowrap pb-3 mb-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveCategory(tab.key)}
            className={`px-4 py-2 mr-3 font-semibold rounded-lg ${
              activeCategory === tab.key
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-3 capitalize">
        {activeCategory.replaceAll("_", " ")}
      </h2>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((item) => (
          <Link
            to={`/ProductDetail/DiabetesCareDetail/${item.id}`}
            key={item.id}
            className="block"
          >
            <div className="bg-white p-3 pb-4 rounded-2xl shadow-lg border relative hover:shadow-xl transition">

              {/* DISCOUNT BADGE */}
              {item.cost > item.final_price && (
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
                  Save {Math.round(((item.cost - item.final_price) / item.cost) * 100)}%
                </div>
              )}

              {/* ADD / COUNTER */}
              <div className="absolute bottom-8 right-5 z-20">
                {!qty[item.id] ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      increment(item.id);
                    }}
                    className="bg-white border border-blue-500 text-blue-500 px-4 py-1 rounded-xl shadow-sm text-sm font-bold hover:bg-blue-600 hover:text-white transition"
                  >
                    ADD
                  </button>
                ) : (
                  <div className="bg-white border border-blue-500 rounded-xl shadow-sm flex items-center px-3 py-1">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        decrement(item.id);
                      }}
                      className="text-blue-600 font-bold text-lg px-1"
                    >
                      −
                    </button>

                    <span className="px-1 font-semibold">{qty[item.id]}</span>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        increment(item.id);
                      }}
                      className="text-blue-600 font-bold text-lg px-1"
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
                  <span className="bg-blue-700 text-white px-3 py-1 rounded-lg font-bold text-lg">
                    ₹{Math.round(item.final_price)}
                  </span>

                  <span className="line-through text-gray-400">
                    ₹{Math.round(item.cost)}
                  </span>
                </div>

                <p className="text-blue-700 font-semibold text-sm mt-1">
                  ₹{Math.round(item.cost - item.final_price)} OFF
                </p>
              </div>

              {/* NAME */}
              <h3 className="font-semibold text-sm mt-2 leading-tight line-clamp-2">
                {item.name}
              </h3>

              {/* PACK SIZE */}
              <p className="text-gray-500 text-xs mt-1">
                {item.highlights?.pack_size || "Standard"}
              </p>

              {/* USE TAG */}
              {item.uses && (
                <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-md">
                  {item.uses[0]}
                </span>
              )}

              {/* RATING */}
              <div className="flex items-center text-sm mt-3">
                <span className="text-blue-700 font-bold">⭐ {item.rating}</span>
                <span className="text-gray-500 text-xs ml-1">(1.5k)</span>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DiabetesCare;
