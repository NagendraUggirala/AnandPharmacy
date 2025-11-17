import React, { useState } from "react";
import OtpVerify from "./OtpVerify";
import { sendOtpAPI } from "../../api/authService";
import OtpPopupCard from "./OtpPopupCard";

const Login = ({ onClose }) => {
  const [identifier, setIdentifier] = useState("");
  const [step, setStep] = useState("login");
  const [otpValue, setOtpValue] = useState(null);
  const [error, setError] = useState("");

  const isPhone = /^\d+$/.test(identifier);
  const isEmail = identifier.includes("@");

  const handleInput = (e) => {
    let value = e.target.value.trim();
    setError("");

    if (/^\d+$/.test(value)) {
      if (value.length > 10) {
        setError("Phone number cannot exceed 10 digits");
        value = value.slice(0, 10);
      }
    }

    setIdentifier(value);
  };

  const handleSendOtp = async () => {
    if (!identifier) return setError("Please enter phone or email");

    if (isPhone && identifier.length !== 10)
      return setError("Enter valid 10-digit phone number");

    if (isEmail && !/\S+@\S+\.\S+/.test(identifier))
      return setError("Enter a valid email address");

    const res = await sendOtpAPI(identifier);

    if (res.success) {
      setOtpValue(res.otp);
      setStep("otp");
    }
  };

  return (
    <>
      {otpValue && <OtpPopupCard otp={otpValue} onClose={() => setOtpValue(null)} />}

      {step === "login" && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[2000] px-3">
          
          {/* MAIN CARD */}
          <div className="w-[750px] max-w-full bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fadeIn">

            {/* LEFT ORANGE PANEL */}
            <div className="w-full md:w-[55%] bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 md:p-10">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Anand Pharmacy</h1>
              
              <p className="text-lg md:text-xl font-semibold mb-6 leading-snug">
                Fastest Delivery <br /> in your Area*
              </p>

              {/* INPUT */}
              <div className="flex items-center bg-white rounded-full shadow px-4 py-3">
                {isPhone && (
                  <span className="px-2 py-1 text-black font-bold border-r border-gray-300">
                    +91
                  </span>
                )}

                <input
                  type="text"
                  placeholder="Enter Phone or Email"
                  className="flex-1 ml-2 p-1 text-black rounded-full outline-none bg-transparent"
                  value={identifier}
                  onChange={handleInput}
                />
              </div>

              {error && <p className="text-yellow-200 text-sm mt-2">{error}</p>}

              {/* CONTINUE BUTTON */}
              <button
                onClick={handleSendOtp}
                className="w-full mt-6 py-3 rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm md:text-base"
              >
                Continue
              </button>

              <p className="text-xs mt-4 opacity-90">
                By continuing, you agree to our Terms of Service & Privacy Policy
              </p>
            </div>

            {/* RIGHT WHITE PANEL (HIDDEN IN MOBILE) */}
            <div className="hidden md:flex w-[45%] bg-white p-6 text-center relative flex-col items-center">
              <button
                onClick={onClose}
                className="absolute top-3 right-4 text-2xl text-gray-500"
              >
                ×
              </button>

              <img
                src="https://cdn-icons-png.flaticon.com/512/104/104588.png"
                className="w-24 mt-10"
                alt=""
              />

              <p className="mt-6 text-xl font-semibold">
                Order faster & easier <br /> every time
              </p>
            </div>

            {/* CLOSE BUTTON FOR MOBILE */}
            <button
              onClick={onClose}
              className="md:hidden text-white text-3xl absolute right-6 top-6"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {step === "otp" && (
        <OtpVerify identifier={identifier} onClose={() => setStep("login")} />
      )}
    </>
  );
};

export default Login;
