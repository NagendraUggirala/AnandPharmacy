// src/pages/Auth/OtpVerify.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpVerify() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const mobile = localStorage.getItem("mobile"); // from Login screen

  const handleVerify = () => {
    if (otp.length !== 6) {
      alert("Please enter 6-digit OTP");
      return;
    }

    // ---- MOCK OTP VERIFICATION ----
    if (otp === "123456") {
      // Save logged in user
      localStorage.setItem(
        "user",
        JSON.stringify({ mobile: mobile })
      );

      alert("OTP Verified Successfully!");

      navigate("/"); // redirect → Header detects & shows profile
    } else {
      alert("Incorrect OTP, try again");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div
        className="p-8 rounded-2xl shadow-lg w-full max-w-md text-center"
        style={{
          background: "linear-gradient(135deg, #e2a52bff, #ff69b4)",
          color: "white",
        }}
      >
        <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>

        <p className="opacity-90 mb-4">
          OTP sent to <span className="font-bold">{mobile}</span>
        </p>

        <input
          type="text"
          maxLength="6"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="w-full p-3 rounded-xl mb-6 text-black text-center text-lg focus:outline-none"
          placeholder="Enter 6-digit OTP"
        />

        <button
          onClick={handleVerify}
          className="w-full py-3 text-lg font-semibold rounded-xl 
                     bg-white text-red-700 hover:bg-gray-200 transition"
        >
          Verify OTP
        </button>

        <p className="mt-4 text-sm">Use OTP: <b>123456</b></p>
      </div>
    </div>
  );
}
