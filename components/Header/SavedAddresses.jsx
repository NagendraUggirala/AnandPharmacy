// src/components/Header/SavedAddresses.jsx
import React, { useEffect, useState } from "react";
import {
  loadAddresses,
  removeAddress,
  saveAddresses,
} from "../../utils/addressStorage";

export default function SavedAddresses({ onSelect, onEdit }) {
  const [list, setList] = useState([]);

  /* --------------------------------------------------------
     FETCH FROM API → fallback to LocalStorage
  -------------------------------------------------------- */
  const fetchAddresses = async () => {
    try {
      const res = await fetch("/api/addresses");
      if (res.ok) {
        const data = await res.json();

        // Save API list into local storage
        saveAddresses(data);

        setList(data);
        return;
      }
    } catch (err) {
      console.log("API Load Failed → Using LocalStorage");
    }

    // FALLBACK
    setList(loadAddresses());
  };

  /* --------------------------------------------------------
     ON MOUNT & on "storage" update
  -------------------------------------------------------- */
  useEffect(() => {
    fetchAddresses();

    const refresh = () => setList(loadAddresses());
    window.addEventListener("storage", refresh);

    return () => window.removeEventListener("storage", refresh);
  }, []);

  /* --------------------------------------------------------
     DELETE → API + LocalStorage
  -------------------------------------------------------- */
  const onDelete = async (id) => {
    // Remove locally first
    removeAddress(id);
    setList(loadAddresses());

    // Try API delete
    try {
      await fetch(`/api/addresses/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.log("API Delete Failed → Using LocalStorage only");
    }
  };

  /* --------------------------------------------------------
     UI
  -------------------------------------------------------- */
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
            className="p-3 rounded border flex justify-between items-start bg-white"
          >
            {/* Left Side */}
            <div>
              <div className="text-sm font-medium">{a.typeTag || "Other"}</div>

              <div className="text-xs text-gray-500 max-w-xs">
                {a.fullText ||
                  `${a.flat || ""} ${a.building || ""} ${a.landmark || ""}`}
              </div>

              <div className="text-xs text-gray-400 mt-1">
                {a.receiverName} · {a.phone}
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col gap-2 text-right">
              <button
                className="text-sm text-pink-600"
                onClick={() => onSelect && onSelect(a)}
              >
                Use
              </button>

              <button
                className="text-sm text-gray-600"
                onClick={() => onEdit && onEdit(a)}
              >
                Edit
              </button>

              <button
                className="text-sm text-red-500"
                onClick={() => onDelete(a.id)}
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
