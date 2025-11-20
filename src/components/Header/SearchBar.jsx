// src/components/Header/SearchBar.jsx
import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiCamera } from "react-icons/fi";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const videoConstraints = { facingMode: "environment" };

const SearchBar = () => {
  const [q, setQ] = useState("");
  const [openCam, setOpenCam] = useState(false);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/products?search=${encodeURIComponent(q)}`);
  };

  const handleCapture = () => {
    const img = webcamRef.current.getScreenshot();
    console.log("Captured:", img);
    setOpenCam(false);
  };

  return (
    <>
      {/* CAMERA POPUP */}
      {openCam && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">
          <div className="bg-white rounded-xl p-4 w-[100%] max-w-sm text-center shadow-xl">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="rounded-lg w-full"
            />

            <button
              onClick={handleCapture}
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

      {/* SEARCH BAR */}
      <form onSubmit={onSubmit} className="w-full">
        <div
          className="
            flex items-center w-full

            /* MOBILE */
            bg-white border border-gray-200 rounded-full px-4 py-3 shadow-sm
            h-[50px]

            /* DESKTOP */
            lg:bg-gray-100 lg:border-gray-300 lg:rounded-md
            lg:shadow-none lg:h-[42px] lg:px-4 lg:py-2
          "
        >
          {/* Search Icon */}
          <FiSearch
            className="
              text-gray-400 text-lg
              lg:text-sm lg:text-gray-500
            "
          />

          {/* Input */}
          <input
            className="
              w-full ml-3 bg-transparent outline-none
              text-[13px] lg:text-[14px]
            "
            placeholder="Search medicines & health items"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          {/* Camera Icon in a small pill */}
          <button type="button" onClick={() => setOpenCam(true)}>
            <div
              className="
                bg-gray-100 p-1.5 rounded-full flex items-center justify-center
                lg:bg-transparent lg:p-1
              "
            >
              <FiCamera
                className="
                  text-gray-500 text-lg
                  lg:text-base
                "
              />
            </div>
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
