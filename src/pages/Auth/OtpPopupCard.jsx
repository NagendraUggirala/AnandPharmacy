import React from "react";

const OtpPopupCard = ({ otp, onClose }) => {
  const copyOtp = () => {
    navigator.clipboard.writeText(otp);
  };

  return (
    <div className="fixed top-6 right-6 bg-white shadow-xl rounded-xl p-4 border z-[3000] w-64">
      <div className="font-bold text-lg text-orange-600 mb-2">Your OTP</div>

      <div className="text-2xl font-extrabold tracking-widest text-gray-800 text-center">
        {otp}
      </div>

      <button
        onClick={copyOtp}
        className="mt-3 w-full bg-orange-600 text-white rounded-lg py-1 text-sm hover:bg-orange-700"
      >
        Copy OTP
      </button>

      <button
        onClick={onClose}
        className="mt-2 w-full text-gray-500 text-sm hover:text-black"
      >
        Close
      </button>
    </div>
  );
};

export default OtpPopupCard;
