import React, { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
 
const GEO_API = "https://nominatim.openstreetmap.org/reverse?format=jsonv2";
 
const LocationSelector = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    const saved = localStorage.getItem("user_location_full");
 
    if (saved) {
      setLocation(JSON.parse(saved));
    } else {
      fetchLiveLocation();
    }
  }, []);
 
  const fetchLiveLocation = () => {
    setLoading(true);
 
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }
 
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `${GEO_API}&lat=${coords.latitude}&lon=${coords.longitude}`
          );
          const data = await res.json();
          const address = data.address || {};
 
          const loc = {
            area:
              address.suburb ||
              address.neighbourhood ||
              address.village ||
              "Your Area",
            district: address.county || address.district || "",
            state: address.state || "",
            pincode: address.postcode || "",
            country: address.country || "",
          };
 
          setLocation(loc);
          localStorage.setItem("user_location_full", JSON.stringify(loc));
        } catch (err) {
          console.error("Location fetch error:", err);
        }
        setLoading(false);
      },
      (error) => {
        console.log("Location denied:", error);
        setLoading(false);
      },
      { timeout: 8000 }
    );
  };
 
  // ------------------- Display Text -------------------
  const topText = location
    ? `${location.area}, ${location.state}`
    : "Select Location";
 
  const subText =
    location &&
    `${location.district}, ${location.pincode}, ${location.country}`;
 
  return (
<button
      onClick={fetchLiveLocation}
      className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-600"
>
<FiMapPin size={18} className="text-orange-600" />
 
      <div className="flex flex-col text-left leading-tight">
<span className="font-medium">{topText}</span>
 
        {/* Show sub-location only if location exists */}
        {location && (
<span className="text-[10px] text-gray-500">{subText}</span>
        )}
</div>
</button>
  );
};
 
export default LocationSelector;