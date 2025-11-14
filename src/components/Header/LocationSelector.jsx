// src/components/Header/LocationSelector.jsx
import React, { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";

const LocationSelector = () => {
  const [label, setLabel] = useState("Select Location");

  useEffect(() => {
    const saved = localStorage.getItem("user_location");
    if (saved) {
      setLabel(saved);
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const l = "Your Area";
          setLabel(l);
          localStorage.setItem("user_location", l);
        },
        () => setLabel("Select Location"),
        { timeout: 7000 }
      );
    }
  }, []);

  return (
    <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-600">
      <FiMapPin /> <span>{label}</span>
    </button>
  );
};

export default LocationSelector;
