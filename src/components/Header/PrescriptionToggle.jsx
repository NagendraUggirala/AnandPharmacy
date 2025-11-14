// src/components/Header/PrescriptionToggle.jsx
import React, { useState } from "react";
import { FiCamera, FiUpload } from "react-icons/fi";

/**
 * Simple toggle UI for desktop header to open scan/upload
 * Use real webcam/ocr integration later.
 */
const PrescriptionToggle = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          setOpen(true);
          alert("Open prescription scanner (implement webcam/ocr)");
        }}
        className="px-3 py-1 bg-gray-100 rounded-md flex items-center gap-2"
      >
        <FiCamera /> Scan
      </button>

      <label className="px-3 py-1 bg-gray-100 rounded-md flex items-center gap-2 cursor-pointer">
        <FiUpload /> Upload
        <input
          type="file"
          accept="image/*,application/pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            alert(`Prescription uploaded: ${f.name}`);
            // Here you could open PrescriptionModal to parse file
          }}
        />
      </label>
    </div>
  );
};

export default PrescriptionToggle;
