// src/pages/Medical/HeartCare.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../data/HeartCare.json";

const HeartCare = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const medications = data.medications;
  const featuredMedication = data.featuredMedication;

  const handleAddToCart = (medication, e) => {
    e.stopPropagation();
    setCart([...cart, medication]);
    alert(`${medication.name} added to cart!`);
  };

  const handleCardClick = (route) => navigate(`/${route}`);

  return (
    <div className="min-h-screen bg-cardiac-light">

      {/* Banner */}
      <div className="bg-cardiac-red text-white">
        <div className="max-w-7xl mx-auto px-4 pt-1 pb-6">
          <div className="flex flex-col items-center">
            <img
              src="/assets/Cardiology/Cardiac_care.jpg"
              alt="Cardiac Care Banner"
              className="rounded-lg shadow-2xl w-full max-w-4xl"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/1200x400/DC2626/FFFFFF?text=Cardiac+Care+Medications";
              }}
            />
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Cardiac Medications – The Smarter Choice
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              {
                title: "Clinically Proven",
                sub: "FDA and DCGI approved formulations",
                color: "bg-green-500"
              },
              {
                title: "Same Composition",
                sub: "Identical to branded medications",
                color: "bg-blue-500"
              },
              {
                title: "Significant Savings",
                sub: "Up to 70% cheaper than brands",
                color: "bg-yellow-500"
              }
            ].map((info, i) => (
              <div key={i} className="flex flex-col items-center p-4">
                <div className={`w-12 h-12 ${info.color} text-white rounded-full flex items-center justify-center mb-3`}>✓</div>
                <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                <p className="text-gray-600 text-sm">{info.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medications Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Antiplatelet & Statin Medications
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
          {medications.map((med) => (
            <div
              key={med.id}
              onClick={() => handleCardClick(med.route)}
              className="bg-white rounded-lg shadow-md border hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer">
              <div className="relative">
                <img
                  src={med.image}
                  alt={med.name}
                  className="w-full h-48 object-cover"
                  onError={(e) =>
                    (e.target.src = `https://via.placeholder.com/300x300/DC2626/FFFFFF?text=${encodeURIComponent(
                      med.name
                    )}`)
                  }/>
                <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  Save {med.savings}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 text-gray-900 line-clamp-2">
                  {med.name}
                </h3>

                <p className="text-gray-600 text-sm mb-2">{med.brand}</p>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {med.description}
                </p>

                <p className="text-gray-700 text-xs mb-3">{med.composition}</p>

                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold text-lg">
                    {med.price}
                  </span>

                  <button
                    onClick={(e) => handleAddToCart(med, e)}
                    className="bg-cardiac-red text-white px-3 py-1 rounded text-sm font-semibold hover:bg-cardiac-dark">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Bundle */}
      <div className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Cardiac Bundle
          </h2>

          <div className="max-w-4xl mx-auto">
            <div
              onClick={() => handleCardClick("cardiac-care-bundle")}
              className="bg-white rounded-lg shadow-lg border hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer overflow-hidden">
              <div className="relative">
                <img
                  src={featuredMedication.image}
                  alt="Cardiac Care Combo Pack"
                  className="w-full h-56 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/800x400/DC2626/FFFFFF?text=Cardiac+Care+Bundle";
                  }}
                />
                <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Save {featuredMedication.savings}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-2xl mb-2 text-gray-900">
                  {featuredMedication.name}
                </h3>

                <p className="text-gray-600 mb-3">
                  {featuredMedication.brand}
                </p>

                <p className="text-gray-600 mb-6">
                  {featuredMedication.description}
                </p>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-green-600 font-bold text-2xl">
                      {featuredMedication.price}
                    </p>
                    <p className="text-gray-400 line-through">
                      {featuredMedication.originalPrice}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(featuredMedication, e)}
                    className="bg-cardiac-red text-white px-6 py-3 rounded text-base font-semibold hover:bg-cardiac-dark">
                    Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartCare;
