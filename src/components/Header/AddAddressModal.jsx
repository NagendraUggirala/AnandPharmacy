// src/components/Header/AddAddressModal.jsx

import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import VoiceInput from "./VoiceInput";
import {
  addAddressLocal,
  updateAddressLocal,
} from "../../utils/addressStorage";

export default function AddAddressModal({
  initialCoords,
  editingAddress,
  onSaved,
  onCancel,
}) {
  const [form, setForm] = useState({
    id: null,
    typeTag: "Home",
    flat: "",
    building: "",
    landmark: "",
    fullText: "",
    receiverName: "",
    phone: "",
    lat: null,
    lng: null,
  });

  /* ----------------------- LOAD DATA ----------------------- */
  useEffect(() => {
    const temp = window.__PHARMA_TEMP_SELECTED_LOCATION;
    if (temp) {
      setForm((p) => ({
        ...p,
        lat: temp.lat,
        lng: temp.lng,
        fullText: temp.address || p.fullText,
      }));
      delete window.__PHARMA_TEMP_SELECTED_LOCATION;
    }

    if (editingAddress) {
      setForm(editingAddress);
      return;
    }

    if (initialCoords) {
      setForm((p) => ({
        ...p,
        lat: initialCoords.lat,
        lng: initialCoords.lng,
      }));
    }
  }, [initialCoords, editingAddress]);

  const update = (key, v) => setForm((p) => ({ ...p, [key]: v }));

  /* ----------------------- SAVE FUNCTION ----------------------- */
  const handleSave = async () => {
    const payload = {
      id: form.id || Date.now(),
      ...form,
    };

    if (form.id) {
      updateAddressLocal(payload.id, payload);
    } else {
      addAddressLocal(payload);
    }

    onSaved && onSaved();
  };

  /* ---------------------------------------------------------
     UNIFIED LAYOUT (Desktop popup + Mobile fullscreen)
  --------------------------------------------------------- */

  return (
    <div className="fixed inset-0 z-[1500] bg-black/40 flex items-center justify-center p-0 md:p-4">

      {/* Main Container → Mobile fullscreen / Desktop centered */}
      <div
        className="
          bg-white w-full h-full md:h-auto md:w-full md:max-w-xl md:rounded-2xl
          md:shadow-xl overflow-hidden flex flex-col
          animate-[fadeIn_.25s_ease-out]
        "
      >

        {/* HEADER (Shared for mobile & desktop) */}
        <div className="flex items-center justify-between p-4 border-b shadow-sm">
          <h2 className="text-lg font-semibold">
            {form.id ? "Edit Address" : "Add Address"}
          </h2>
          <button onClick={onCancel}>
            <FiX size={26} className="text-gray-700" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">

          {/* MAP PREVIEW */}
          <div className="bg-gray-100 p-3 border rounded-lg text-sm text-gray-700">
            {form.fullText ||
              (form.lat ? `${form.lat.toFixed(5)}, ${form.lng.toFixed(5)}` : "Location not selected")}
          </div>

          {/* TYPE BUTTONS */}
          <div className="grid grid-cols-3 gap-2">
            {["Home", "Work", "Other"].map((t) => (
              <button
                key={t}
                onClick={() => update("typeTag", t)}
                className={`py-2 border rounded-lg ${
                  form.typeTag === t ? "bg-orange-50 border-orange-600" : ""
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* INPUTS */}
          <input
            className="w-full p-3 border rounded"
            placeholder="Flat / Floor"
            value={form.flat}
            onChange={(e) => update("flat", e.target.value)}
          />

          <input
            className="w-full p-3 border rounded"
            placeholder="Building Name"
            value={form.building}
            onChange={(e) => update("building", e.target.value)}
          />

          <input
            className="w-full p-3 border rounded"
            placeholder="Landmark"
            value={form.landmark}
            onChange={(e) => update("landmark", e.target.value)}
          />

          {/* FULL ADDRESS + VOICE */}
          <label className="text-sm font-medium">Full Address</label>
          <div className="flex gap-2">
            <input
              className="flex-1 p-3 border rounded"
              placeholder="Full address"
              value={form.fullText}
              onChange={(e) => update("fullText", e.target.value)}
            />
            <VoiceInput onResult={(txt) => update("fullText", txt)} />
          </div>

          <input
            className="w-full p-3 border rounded"
            placeholder="Receiver Name"
            value={form.receiverName}
            onChange={(e) => update("receiverName", e.target.value)}
          />

          <input
            className="w-full p-3 border rounded"
            placeholder="Receiver Phone"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />

          {/* ACTION BUTTONS */}
          <button
            className="w-full py-3 bg-orange-600 text-white rounded-xl font-semibold"
            onClick={handleSave}
          >
            Save Address
          </button>

          <button
            className="w-full py-3 border rounded-xl text-gray-700"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
