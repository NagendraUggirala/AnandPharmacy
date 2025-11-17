import React, { useState } from "react";
import {
  FiPhoneCall,
  FiMic,
  FiX,
  FiPlus,
  FiChevronRight,
  FiCrosshair,
} from "react-icons/fi";

import LocationMapModal from "./LocationMapModal";
import AddAddressModal from "./AddAddressModal";
import SavedAddresses from "./SavedAddresses";

import { saveVoiceInstruction } from "../../utils/addressStorage";

export default function LiveLocationModal({ onClose }) {
  const [step, setStep] = useState("main");
  const [coords, setCoords] = useState(null);
  const [recording, setRecording] = useState(false);

  const recordInstructions = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.lang = "en-IN";

    rec.onstart = () => setRecording(true);
    rec.onend = () => setRecording(false);

    rec.onresult = (e) => {
      const spoken = e.results[0][0].transcript;
      saveVoiceInstruction(spoken);
      setStep("add");
    };

    rec.start();
  };

  const useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setStep("map");
      },
      () => {}
    );
  };

  const callHelpline = () => (window.location.href = "tel:+919000000000");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[2000]">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* POPUP CARD */}
      <div
        className="
          relative bg-white rounded-2xl shadow-xl
          w-[90%] max-w-2xl 
          max-h-[90vh] overflow-y-auto
          animate-[scaleIn_0.2s_ease]
        "
      >
        {/* HEADER */}
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Location</h2>
          <button onClick={onClose}>
            <FiX className="text-xl text-gray-600" />
          </button>
        </div>

        {/* SEARCH BOX */}
        <div className="px-5 pt-4">
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl border">
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
              placeholder="Search Address"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {/* MAIN BUTTONS */}
        <div className="px-5 mt-4 space-y-3">

          {/* Use Current Location */}
          <button
            onClick={useCurrentLocation}
            className="
              w-full bg-white border rounded-xl px-4 py-4 
              flex items-center justify-between
            "
          >
            <div className="flex items-center gap-3">
              <FiCrosshair className="text-pink-600 text-xl" />
              <span className="text-[15px] font-medium">
                Use my Current Location
              </span>
            </div>
          </button>

          {/* Add New Address */}
          <button
            onClick={() => setStep("add")}
            className="
              w-full bg-white border rounded-xl px-4 py-4
              flex items-center justify-between
            "
          >
            <div className="flex items-center gap-3">
              <FiPlus className="text-pink-600 text-xl" />
              <span className="text-[15px] font-medium">Add New Address</span>
            </div>
            <FiChevronRight className="text-gray-500" />
          </button>

          {/* Request From Friend */}
          <button
            onClick={() =>
              window.open("https://wa.me/?text=Share your address")
            }
            className="
              w-full bg-white border rounded-xl px-4 py-4
              flex items-center justify-between
            "
          >
            <div className="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                className="w-6 h-6"
              />
              <span className="text-[15px] font-medium">
                Request address from friend
              </span>
            </div>
            <FiChevronRight className="text-gray-500" />
          </button>
        </div>

        {/* RECORD + HELPLINE — SIDE BY SIDE */}
        <div className="px-5 mt-4 flex gap-4">
          {/* Record */}
          <button
            onClick={recordInstructions}
            className={`
              flex-1 border rounded-xl py-3 
              flex items-center justify-center gap-2 text-sm
              ${recording ? "bg-red-50" : "bg-white"}
            `}
          >
            <FiMic className="text-pink-600" />
            <span>Record</span>
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

        {/* SAVED ADDRESSES LIST */}
        <div className="px-5 pb-6">
          <SavedAddresses
            onSelect={() => {}}
            onEdit={(addr) => setStep({ mode: "edit", data: addr })}
          />
        </div>

        {/* MAP & ADD ADDRESS MODALS */}
        {step === "map" && (
          <LocationMapModal
            initialCoords={coords}
            onCancel={() => setStep("main")}
            onConfirm={() => setStep("add")}
          />
        )}

        {step === "add" && (
          <AddAddressModal
            initialCoords={coords}
            editingAddress={null}
            onSaved={() => setStep("main")}
            onCancel={() => setStep("main")}
          />
        )}

        {typeof step === "object" && step.mode === "edit" && (
          <AddAddressModal
            editingAddress={step.data}
            onSaved={() => setStep("main")}
            onCancel={() => setStep("main")}
          />
        )}
      </div>
    </div>
  );
}
