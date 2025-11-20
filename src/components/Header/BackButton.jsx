import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/home"); // 🔥 Navigates to Home.jsx route
  };

  return (
    <button
      onClick={goBack}
      className="flex items-center gap-5 px-4 py-5 bg-none text-black rounded-lg  transition"
    >
      <FiArrowLeft size={20} />
      Back
    </button>
  );
};

export default BackButton;
