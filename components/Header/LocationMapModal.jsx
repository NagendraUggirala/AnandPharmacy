import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { FiX } from "react-icons/fi";

import {
  saveLastMapLocation,
  loadLastMapLocation,
} from "../../utils/addressStorage";

const DEFAULT_CENTER = { lat: 17.385, lng: 78.4867 };
const MAP_HEIGHT = 420;

export default function LocationMapModal({
  initialCoords,
  onCancel,
  onConfirm,
}) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [addrText, setAddrText] = useState("");

  const startMarker = initialCoords || loadLastMapLocation() || DEFAULT_CENTER;
  const [marker, setMarker] = useState(startMarker);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries: ["places"],
  });

  const mapCenter = useMemo(() => marker, []);

  /* ===============================
     Reverse Geocode (Debounced)
  =============================== */
  const debouncedFetch = useRef(null);

  const fetchAddress = useCallback((lat, lng) => {
    if (!window.google || !window.google.maps) return;

    if (debouncedFetch.current) clearTimeout(debouncedFetch.current);

    debouncedFetch.current = setTimeout(async () => {
      const geocoder = new window.google.maps.Geocoder();
      const result = await geocoder.geocode({ location: { lat, lng } });

      if (result && result[0]) {
        setAddrText(result[0].formatted_address);
      }
    }, 300);
  }, []);

  useEffect(() => {
    fetchAddress(marker.lat, marker.lng);
  }, [marker, fetchAddress]);

  const onMapClick = (e) => {
    const pos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarker(pos);
    markerRef.current?.setPosition(pos);
  };

  const onPinDrag = (e) => {
    const pos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarker(pos);
  };

  const saveSelectedLocation = () => {
    const payload = {
      lat: marker.lat,
      lng: marker.lng,
      address: addrText,
    };

    saveLastMapLocation(payload);
    window.__PHARMA_TEMP_SELECTED_LOCATION = payload;

    onConfirm && onConfirm(payload);
  };

  if (!isLoaded) return null;

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      ></div>

      {/* POPUP CARD */}
      <div
        className="
          relative bg-white rounded-2xl shadow-2xl
          w-[92%] max-w-2xl max-h-[92vh] 
          overflow-hidden animate-[scaleIn_0.25s_ease-out]
        "
      >
        {/* HEADER + SEARCH BAR */}
        <div className="p-5 border-b bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Location Information</h2>
            <button onClick={onCancel}>
              <FiX className="text-xl text-gray-600" />
            </button>
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl border location-search-box">
            <svg width="18" height="18">
              <circle cx="8" cy="8" r="7" stroke="#777" />
              <line
                x1="12.5"
                y1="12.5"
                x2="17"
                y2="17"
                stroke="#777"
                strokeWidth="1.3"
              />
            </svg>
            <input
              placeholder="Search a new address"
              className="bg-transparent w-full text-sm outline-none"
            />
          </div>
        </div>

        {/* MAP SECTION */}
        <div className="relative border-b">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: MAP_HEIGHT }}
            center={mapCenter}
            zoom={17}
            onLoad={(map) => (mapRef.current = map)}
            onClick={onMapClick}
          >
            <Marker
              position={marker}
              draggable
              onDragEnd={onPinDrag}
              onLoad={(mk) => (markerRef.current = mk)}
            />
          </GoogleMap>

          {/* Move map instruction */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 px-5 py-2 bg-purple-600 text-white rounded-lg shadow">
            Move the map to adjust your location
          </div>
        </div>

        {/* ADDRESS + CONFIRM SECTION */}
        <div className="p-5 bg-white">
          <div className="text-sm font-semibold mb-1">Selected Location</div>
          <div className="bg-gray-100 p-3 rounded text-sm">{addrText}</div>

          {/* Confirm Button */}
          <button
            onClick={saveSelectedLocation}
            className="mt-4 w-full bg-pink-600 text-white py-3 rounded-xl font-semibold text-[15px] shadow"
          >
            Confirm & Continue
          </button>

          {/* Cancel Button */}
          <button
            onClick={onCancel}
            className="mt-2 w-full border py-3 rounded-xl text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
