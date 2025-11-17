import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (mobile.length === 10) {
      localStorage.setItem("mobile", mobile);
      navigate("/otp-verify");
    } else {
      alert("Enter valid 10–digit mobile number");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="p-8 rounded-2xl shadow-lg w-full max-w-md"
        style={{
          background: "linear-gradient(135deg, #e2a52bff, #ff69b4)",
          color: "white",
        }}
      >
        <h1 className="text-3xl font-bold mb-2 text-start text-orange-700">
          Anandh Pharma
        </h1>

        <h1 className="text-xl font-semibold mb-6 text-start opacity-90">
          Lowest Prices Everyday In 10 Mins*
        </h1>

        <label className="text-white mb-2 block font-medium">
          Mobile Number
        </label>

        <input
          type="text"
          maxLength="10"
          value={mobile}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
          className="w-full p-3 rounded-xl mb-6 text-black focus:outline-none"
          placeholder="Enter mobile number"
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 text-lg font-semibold rounded-xl 
                     bg-white text-red-700 hover:bg-gray-200 transition"
        >
          Login
        </button>

        <p className="text-center mt-2">
          By continuing, you agree to our
        </p>

        <h6 className="text-center text-pink-700">
          Terms of Service & Privacy Policy
        </h6>
      </div>
    </div>
  );
}
