// src/components/Header/Header.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiCamera } from "react-icons/fi";

import SearchBar from "./SearchBar";
import LocationSelector from "./LocationSelector";
import HeaderToggleMenu from "./HeaderToggleMenu";
import CategorySlider from "./CategorySlider";
import CartBadge from "./CartBadge";
import PrescriptionToggle from "./PrescriptionToggle";
import { getHeaderData } from "../../api/headerService";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [logo, setLogo] = useState("");

  // Fetch Logo from API
  useEffect(() => {
    (async () => {
      const d = await getHeaderData();
      setLogo(d.logo);
    })();
  }, []);

  // Load Cart Count
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("pharmacy_cart")) || [];
    setCartCount(cart.length);
  }, []);

  // Live Cart Sync
  useEffect(() => {
    const onStorage = () => {
      const cart = JSON.parse(localStorage.getItem("pharmacy_cart")) || [];
      setCartCount(cart.length);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">

        {/* ---------------- DESKTOP HEADER ---------------- */}
        <div className="hidden lg:flex items-center max-w-10lg mx-auto px-4 py-3 justify-between">
          
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img 
              src={logo || "/assets/logo/nandi-flag.png"} 
              alt="logo" 
              className="w-10 h-10 rounded"
            />

            {/* ❗ Updated Heading */}
            <div className="hidden xl:block">
              <div className="font-semibold text-orange-600 text-lg">
                Anand Pharmacy
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 mx-6">
            <SearchBar />
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-4">
            <LocationSelector />

            <button
              className="hidden xl:flex items-center gap-2 text-gray-700 hover:text-orange-600"
              onClick={() => navigate("/login")}
            >
              <FiUser size={18} />
              <span className="text-sm">Login</span>
            </button>

            <div className="relative">
              <button onClick={() => navigate("/cart")} className="text-gray-800">
                <FiShoppingCart size={22} />
              </button>
              <CartBadge count={cartCount} />
            </div>

            <PrescriptionToggle />
          </div>
        </div>

        {/* ---------------- MOBILE + TABLET HEADER ---------------- */}
        <div className="lg:hidden px-4 py-2">
          <div className="flex items-center justify-between">

            {/* Left Side - Logo */}
            <div className="flex items-center gap-3">
              <img
                src={logo || "/assets/logo/nandi-flag.png"}
                alt="logo"
                className="w-10 h-10 rounded"
                onClick={() => navigate("/")}
              />
            </div>

            {/* Right Side - Profile + Cart + Scanner */}
            <div className="flex items-center gap-4">

              {/* Login */}
              <button onClick={() => navigate("/login")} className="p-2">
                <FiUser size={22} />
              </button>

              {/* Scanner – replaces menu icon */}
              <button 
                onClick={() => setMenuOpen(true)}
                className="p-2 bg-orange-100 rounded-full"
              >
                <FiCamera size={22} className="text-orange-600" />
              </button>

              {/* Cart */}
              <div className="relative">
                <button onClick={() => navigate("/cart")}>
                  <FiShoppingCart size={22} />
                </button>
                <CartBadge count={cartCount} />
              </div>

            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-3">
            <SearchBar mobile />
          </div>
        </div>

        {/* Category Slider */}
        <div className="mt-2">
          <CategorySlider />
        </div>
      </header>

      {/* Push page content down */}
      <div className="h-[120px] lg:h-[80px]" />

      {/* Toggle Menu */}
      <HeaderToggleMenu 
        menuOpen={menuOpen} 
        closeMenu={() => setMenuOpen(false)} 
      />
    </>
  );
};

export default Header;
