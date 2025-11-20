// src/components/Header/AddAddressModal.jsx
import React, { useEffect, useState } from "react";
import { FiPhoneCall, FiMic, FiX } from "react-icons/fi";
import VoiceInput from "./VoiceInput";
import { addAddressLocal, updateAddressLocal } from "../../utils/addressStorage";

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

  /* ----------------------- RECORDING STATE ----------------------- */
  const [recording, setRecording] = useState(false);

  /* ----------------------- RECORD VOICE ----------------------- */
  const recordInstructions = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition");
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = "en-IN";

    rec.onstart = () => setRecording(true);
    rec.onend = () => setRecording(false);

    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;

      // Append or replace address
      setForm((p) => ({
        ...p,
        fullText: p.fullText
          ? p.fullText + " " + text
          : text,
      }));
    };

    rec.start();
  };

  /* ----------------------- HELPLINE ----------------------- */
  const callHelpline = () => {
    window.location.href = "tel:+911234567890";
  };

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

  /* ----------------------- SAVE ----------------------- */
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

  return (
    <div className="fixed inset-0 z-[1500] bg-black/40 flex items-center justify-center p-0 md:p-4">
      <div
        className="
          bg-white w-full h-full md:h-auto md:w-full md:max-w-xl md:rounded-2xl
          md:shadow-xl overflow-hidden flex flex-col
          animate-[fadeIn_.25s_ease-out]
        "
      >
        {/* HEADER */}
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
              (form.lat
                ? `${form.lat.toFixed(5)}, ${form.lng.toFixed(5)}`
                : "Location not selected")}
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

          {/* RECORD + HELPLINE */}
          <div className="px-1 mt-2 flex gap-4">
            {/* Record */}
            <button
              onClick={recordInstructions}
              className={`
                flex-1 border rounded-xl py-3 
                flex items-center justify-center gap-2 text-sm
                ${recording ? "bg-red-50" : "bg-white"}
              `}
            >
              <FiMic className="text-orange-600" />
              <span>{recording ? "Recording..." : "Record"}</span>
            </button>

            {/* Helpline */}
            <button
              onClick={callHelpline}
              className="
                flex-1 border rounded-xl py-3 
                flex items-center justify-center gap-2 text-sm bg-white
              "
            >
              <FiPhoneCall className="text-green-600" />
              <span>Helpline</span>
            </button>
          </div>

          {/* FULL ADDRESS */}
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

          {/* NAME + MOBILE */}
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
          <div className="flex items-center gap-4 w-full mt-10">
            <button
              className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-semibold"
              onClick={handleSave}
            >
              Save Address
            </button>

            <button
              className="flex-1 py-3 border rounded-xl text-gray-700"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
