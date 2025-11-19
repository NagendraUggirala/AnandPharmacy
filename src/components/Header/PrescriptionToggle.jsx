import React, { useState } from "react";
import { FiCamera, FiUpload } from "react-icons/fi";
import PrescriptionModal from "./PrescriptionModal";

const PrescriptionToggle = () => {
  const [open, setOpen] = useState(false);
  const [uploadMode, setUploadMode] = useState("scan");

  return (
    <>
      <div className="flex items-center gap-2">

        {/* Scan Button */}
        <button
          onClick={() => {
            setUploadMode("scan");
            setOpen(true);
          }}
          className="px-3 py-1 bg-gray-100 rounded-md flex items-center gap-2 hover:bg-gray-200"
        >
          <FiCamera /> Scan
        </button>

        {/* Upload Button */}
        <button
          onClick={() => {
            setUploadMode("upload");
            setOpen(true);
          }}
          className="px-3 py-1 bg-gray-100 rounded-md flex items-center gap-2 hover:bg-gray-200"
        >
          <FiUpload /> Upload
        </button>
      </div>

      {/* Modal */}
      <PrescriptionModal
        open={open}
        close={() => setOpen(false)}
        mode={uploadMode}
      />
    </>
  );
};

export default PrescriptionToggle;
