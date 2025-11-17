import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { FiX, FiUpload } from "react-icons/fi";
import { uploadPrescriptionToServer } from "../../api/prescriptionService";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "environment",
};

const isMobileDevice = () => {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

const PrescriptionModal = ({ open, close, mode: defaultMode }) => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const [mode, setMode] = useState(defaultMode || "scan");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (open) {
      setMode(defaultMode || "scan");
      setPreview(null);
    }
  }, [open, defaultMode]);

  const capture = useCallback(() => {
    if (!webcamRef.current) return;
    const img = webcamRef.current.getScreenshot();
    if (img) {
      setPreview(img);
      setMode("preview");
    }
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setMode("preview");
    };
    reader.readAsDataURL(file);
  };

  const savePrescription = async () => {
    const res = await uploadPrescriptionToServer(preview);

    if (res.success) {
      const old = JSON.parse(localStorage.getItem("prescriptions") || "[]");

      old.push({
        image: res.url,
        uploadedAt: res.time,
      });

      localStorage.setItem("prescriptions", JSON.stringify(old));

      close();          // closes the modal
      navigate("/cart"); // redirects user to cart page
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-11/12 md:w-[450px] rounded-lg shadow-lg p-5 relative">

        <button className="absolute right-3 top-3 text-gray-500" onClick={close}>
          <FiX size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Prescription Upload</h2>

        {/* ------------------------- SCAN MODE ------------------------- */}
        {mode === "scan" && (
          <div className="flex flex-col items-center">

            {isMobileDevice() ? (
              <label className="w-full h-48 flex flex-col justify-center items-center bg-gray-100 border border-dashed rounded-lg cursor-pointer">
                <span className="text-gray-600">Tap to open camera</span>

                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            ) : (
              <>
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="rounded-lg mb-4 shadow"
                />

                <button
                  onClick={capture}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md w-full"
                >
                  Capture Photo
                </button>
              </>
            )}

            <button
              onClick={() => setMode("upload")}
              className="mt-4 text-sm text-blue-600 underline"
            >
              Upload from device instead
            </button>
          </div>
        )}

        {/* ------------------------- UPLOAD MODE ------------------------- */}
        {mode === "upload" && (
          <div className="flex flex-col items-center">

            <label className="w-full h-48 flex flex-col justify-center items-center bg-gray-100 border border-dashed rounded-lg cursor-pointer">
              <div className="flex flex-col items-center text-gray-500">
                <FiUpload size={40} className="mb-2" />
                <span className="text-gray-600 text-sm">Tap to upload prescription</span>
              </div>

              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>

            {!isMobileDevice() && (
              <button
                className="mt-4 text-sm text-blue-600 underline"
                onClick={() => setMode("scan")}
              >
                Use camera instead
              </button>
            )}
          </div>
        )}

        {/* ------------------------- PREVIEW MODE ------------------------- */}
        {mode === "preview" && (
          <div className="text-center">

            <img src={preview} alt="Preview" className="w-full rounded-lg shadow" />

            <button
              onClick={savePrescription}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md w-full"
            >
              Save Prescription
            </button>

            <button
              onClick={() => setMode(isMobileDevice() ? "upload" : "scan")}
              className="mt-3 text-sm text-blue-600 underline"
            >
              Retake Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionModal;
