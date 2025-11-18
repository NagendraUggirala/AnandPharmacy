// src/components/Header/SavedAddresses.jsx
import React, { useEffect, useState } from "react";
import {
  loadAddresses,
  removeAddress,
  saveAddresses,
  setPrimaryAddress,
} from "../../utils/addressStorage";
import { FiCheck } from "react-icons/fi";

export default function SavedAddresses({ onSelect, onEdit, onClose }) {
  const [list, setList] = useState([]);

  /* --------------------------------------------------------
     LOAD + SORT (Primary First)
  -------------------------------------------------------- */
  const refreshList = () => {
    const data = loadAddresses();

    const sorted = [
      ...data.filter((a) => a.primary),
      ...data.filter((a) => !a.primary),
    ];

    setList(sorted);
  };

  /* --------------------------------------------------------
     INITIAL + LIVE REFRESH
  -------------------------------------------------------- */
  useEffect(() => {
    refreshList();

    const reSync = () => refreshList();
    window.addEventListener("storage", reSync);

    return () => window.removeEventListener("storage", reSync);
  }, []);

  /* --------------------------------------------------------
     DELETE — Instant delete
  -------------------------------------------------------- */
  const handleDelete = (id) => {
    removeAddress(id);
    refreshList();
  };

  /* --------------------------------------------------------
     USE — Set Primary + Update UI + Close Modal
  -------------------------------------------------------- */
  const handleUse = (addr) => {
    // 1️⃣ Make selected address PRIMARY
    setPrimaryAddress(addr.id);

    // 2️⃣ Update UI everywhere
    window.dispatchEvent(new Event("storage"));

    // 3️⃣ Notify parent (LiveLocationModal)
    if (onSelect) onSelect(addr);

    // 4️⃣ Close modal
    if (onClose) onClose();

    // 5️⃣ Refresh list so primary moves to top
    refreshList();
  };

  return (
    <div>
      <h4 className="text-sm font-semibold mb-2">Saved Addresses</h4>

      <div className="space-y-3">
        {list.length === 0 && (
          <div className="text-sm text-gray-500">No saved addresses.</div>
        )}

        {list.map((a) => (
          <div
            key={a.id}
            className={`p-3 rounded-xl border bg-white flex justify-between items-start shadow-sm transition
              ${a.primary ? "border-orange-500 bg-orange-50" : "border-gray-200"}
            `}
          >
            {/* LEFT SECTION */}
            <div className="w-[70%]">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">{a.typeTag || "Other"}</div>

                {/* PRIMARY BADGE */}
                {a.primary && (
                  <span className="text-xs text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FiCheck size={12} /> Primary
                  </span>
                )}
              </div>

              <div className="text-xs text-gray-500 max-w-xs mt-1">
                {a.fullText ||
                  `${a.flat || ""} ${a.building || ""} ${a.landmark || ""}`.trim()}
              </div>

              <div className="text-xs text-gray-400 mt-1">
                {a.receiverName} · {a.phone}
              </div>
            </div>

            {/* RIGHT BUTTON GROUP */}
            <div className="flex flex-col gap-2 text-right">

              {/* USE BUTTON (hide for primary) */}
              {!a.primary && (
                <button
                  className="text-sm text-orange-600 hover:text-orange-700"
                  onClick={() => handleUse(a)}
                >
                  Use
                </button>
              )}

              {/* EDIT */}
              <button
                className="text-sm text-gray-600 hover:text-gray-800"
                onClick={() => onEdit && onEdit(a)}
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                className="text-sm text-red-500 hover:text-red-700"
                onClick={() => handleDelete(a.id)}
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
