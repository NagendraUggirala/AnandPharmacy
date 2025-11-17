import React, { useEffect, useState } from "react";
import { FiChevronDown, FiMapPin } from "react-icons/fi";
import LiveLocationModal from "./LiveLocationModal";

import {
  getPrimaryAddress
} from "../../utils/addressStorage";

export default function LocationSelector() {
  const [open, setOpen] = useState(false);
  const [primary, setPrimary] = useState(null);

  // Update primary on load
  useEffect(() => {
    const load = () => setPrimary(getPrimaryAddress());
    load();

    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  // Address Display
  const displayTitle = primary?.typeTag || "Your Location";
  const displayAddress =
    primary?.fullText ||
    `${primary?.flat || ""} ${primary?.building || ""}`.trim() ||
    "Set delivery location";

  return (
    <>
      {/* ========================= DESKTOP ========================= */}
      <button
        onClick={() => setOpen(true)}
        className="
          hidden lg:flex items-center group cursor-pointer
          px-3 py-1 rounded-md hover:bg-gray-50 transition
        "
      >
        <FiMapPin size={18} className="text-orange-600" />

        <div className="flex flex-col text-left ml-2">
          <span className="text-xs text-gray-500">{displayTitle}</span>
          <span className="text-sm font-medium truncate w-[180px]">
            {displayAddress}
          </span>
        </div>

        <FiChevronDown className="ml-1 text-gray-600" />
      </button>

      {/* ========================= MOBILE ========================= */}
      <div
        onClick={() => setOpen(true)}
        className="
          lg:hidden flex items-center justify-between
          px-5 py-2 bg-white rounded-md border border-gray-200
          active:bg-gray-100 mobile-location-box
        "
      >
        <div className="flex items-center gap-2">
          <FiMapPin size={20} className="text-orange-600" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">{displayTitle}</span>
            <span className="text-sm font-medium truncate max-w-[160px]">
              {displayAddress}
            </span>
          </div>
        </div>

        <FiChevronDown size={18} className="text-gray-500" />
      </div>

      {/* ========================= OPEN MODAL ========================= */}
      {open && <LiveLocationModal onClose={() => setOpen(false)} />}
    </>
  );
}     