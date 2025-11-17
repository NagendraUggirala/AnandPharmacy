import React, { useState, useEffect, useRef } from "react";
import { verifyOtpAPI, sendOtpAPI } from "../../api/authService";
import OtpPopupCard from "./OtpPopupCard";

const OtpVerify = ({ identifier, onClose }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [otpValue, setOtpValue] = useState(null);

  const refs = useRef([]);

  // TIMER
  useEffect(() => {
    const control = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(control);
  }, []);

  // ---------------------------
  // ⭐ HANDLE MANUAL TYPING
  // ---------------------------
  const handleOtpInput = (value, idx) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    if (value && idx < 5) refs.current[idx + 1]?.focus();
  };

  // ---------------------------
  // ⭐ HANDLE PASTE (CTRL + V)
  // ---------------------------
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(paste)) return;

    const digits = paste.split("");
    setOtp(digits);

    digits.forEach((d, i) => {
      refs.current[i].value = d;
    });

    refs.current[5]?.focus();
  };

  // ---------------------------
  // ⭐ AUTO-FILL OTP when generated
  // ---------------------------
  useEffect(() => {
    if (!otpValue) return;

    if (/^\d{6}$/.test(otpValue)) {
      const digits = otpValue.split("");

      setOtp(digits);

      digits.forEach((d, i) => {
        if (refs.current[i]) refs.current[i].value = d;
      });

      refs.current[5]?.focus();
    }
  }, [otpValue]);

  // ---------------------------
  // ⭐ VERIFY OTP
  // ---------------------------
  const handleVerify = async () => {
    const code = otp.join("");

    const res = await verifyOtpAPI(identifier, code);
    if (res.success) {
      localStorage.setItem("user", JSON.stringify({ identifier }));
      window.location.href = "/";
    }
  };

  // ---------------------------
  // ⭐ RESEND OTP
  // ---------------------------
  const resendOtp = async () => {
    const res = await sendOtpAPI(identifier);
    if (res.success) {
      setOtpValue(res.otp);
      setTimer(30);
    }
  };

  return (
    <>
      {/* OTP Popup */}
      {otpValue && (
        <OtpPopupCard otp={otpValue} onClose={() => setOtpValue(null)} />
      )}

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[2000] p-4">

        {/* Main Box */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex w-[750px] h-[420px] max-lg:flex-col max-lg:w-full max-lg:h-auto">

          {/* LEFT (Orange Box) */}
          <div className="w-[55%] p-8 text-white bg-gradient-to-br from-orange-500 to-orange-700 relative max-lg:w-full max-lg:p-6 max-lg:rounded-b-2xl">

            <button
              onClick={onClose}
              className="absolute top-5 left-5 text-2xl max-lg:hidden"
            >
              ←
            </button>

            <h2 className="text-3xl font-bold mt-10 max-lg:mt-4 max-lg:text-2xl">
              OTP Verification
            </h2>

            <p className="text-sm mt-1 opacity-90 max-lg:text-center">
              OTP sent to <span className="font-bold">{identifier}</span>
            </p>

            {/* OTP INPUT BOXES */}
            <div className="flex gap-4 mt-8 justify-center max-sm:gap-2">

              {otp.map((val, i) => (
                <input
                  key={i}
                  ref={(el) => (refs.current[i] = el)}
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleOtpInput(e.target.value, i)}
                  onPaste={handlePaste}
                  className="
                    w-12 h-12 rounded-full bg-white text-black text-xl font-bold text-center
                    shadow-md border-2 border-transparent 
                    hover:bg-green-300 hover:border-green-600
                    focus:bg-green-400 focus:border-green-700 transition-all
                    max-sm:w-10 max-sm:h-10 max-sm:text-lg
                  "
                />
              ))}

            </div>

            {/* TIMER */}
            <p className="mt-6 text-lg text-center font-semibold max-sm:text-base">
              00:{String(timer).padStart(2, "0")}
            </p>

            {/* RESEND */}
            {timer === 0 && (
              <button
                onClick={resendOtp}
                className="block mx-auto text-sm underline text-white mt-2"
              >
                Send OTP Again
              </button>
            )}

            {/* VERIFY BUTTON */}
            <button
              onClick={handleVerify}
              className="mt-6 mx-auto w-40 py-2 bg-white text-orange-700 font-bold rounded-full hover:bg-gray-200 block"
            >
              Verify OTP
            </button>
          </div>

          {/* RIGHT WHITE PANEL */}
          <div className="w-[45%] bg-white text-center p-6 relative max-lg:hidden">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-2xl text-gray-600"
            >
              ×
            </button>

            <img
              src="https://cdn-icons-png.flaticon.com/512/104/104588.png"
              className="w-24 mx-auto mt-10"
              alt="illustration"
            />

            <p className="mt-6 text-xl font-semibold">
              Order faster & easier <br /> every time
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpVerify;
