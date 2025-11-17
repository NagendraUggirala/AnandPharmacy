// src/components/Header/SearchBar.jsx
import React, { useState, useEffect } from "react";
import { FiSearch, FiCamera } from "react-icons/fi";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
  facingMode: "environment", // mobile back camera + laptop default camera
};

const SearchBar = ({ mobile = false }) => {
  const [q, setQ] = useState("");
  const [openCam, setOpenCam] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => {
      if (q.length > 1) {
        // Suggestion API placeholder
      }
    }, 300);
    return () => clearTimeout(id);
  }, [q]);

  const onSubmit = (e) => {
    e?.preventDefault();
    if (!q) return;
    navigate(`/products?search=${encodeURIComponent(q)}`);
  };

  // 🔥 Capture image from webcam
  const handleCapture = (webcamRef) => {
    const img = webcamRef.current.getScreenshot();
    console.log("Captured Image:", img);
    setOpenCam(false);
    alert("Image captured (processing will be added later)");
  };

  // Webcam Reference
  const webcamRef = React.useRef(null);

  // ------------------- MOBILE SEARCH BAR -------------------
  if (mobile) {
    return (
      <>
        {/* 📸 CAMERA MODAL */}
        {openCam && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-4 w-[90%] max-w-md text-center">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="rounded-lg w-full"
              />

              <button
                onClick={() => handleCapture(webcamRef)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg mt-3 w-full"
              >
                Capture
              </button>

              <button
                onClick={() => setOpenCam(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-2 w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* SEARCH BAR UI */}
        <form onSubmit={onSubmit} className="flex gap-2 items-center w-full">
          <div className="flex-1 bg-white p-2 rounded-full flex items-center shadow-sm border border-gray-200">

            <FiSearch className="text-gray-400 text-sm" />

            <input
              className="ml-2 w-full outline-none text-sm"
              placeholder="Search medicines & health items"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />

            <button type="button" onClick={() => setOpenCam(true)}>
              <FiCamera className="text-gray-400 text-base" />
            </button>
          </div>

          <button
            type="submit"
            className="hidden sm:block bg-orange-600 text-white px-3 py-1.5 text-sm rounded-md"
          >
            Go
          </button>
        </form>
      </>
    );
  }

  // ------------------- DESKTOP SEARCH BAR -------------------
  return (
    <>
      {/* 📸 CAMERA POPUP */}
      {openCam && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-4 w-[400px] text-center">

            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="rounded-lg w-full"
            />

            <button
              onClick={() => handleCapture(webcamRef)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg mt-3 w-full"
            >
              Capture
            </button>

            <button
              onClick={() => setOpenCam(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-2 w-full"
            >
              Close
            </button>

          </div>
        </div>
      )}

      {/* DESKTOP SEARCH BAR UI */}
      <form onSubmit={onSubmit} className="w-full">
        <div className="bg-gray-100 rounded-md px-3 py-1.5 flex items-center border border-gray-300">

          <FiSearch size={15} className="text-gray-500" />

          <input
            className="ml-3 w-full bg-transparent outline-none text-sm"
            placeholder="Search medicines, brands, health products"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <button type="button" onClick={() => setOpenCam(true)}>
            <FiCamera size={16} className="text-gray-500" />
          </button>

        </div>
      </form>
    </>
  );
};

export default SearchBar;
