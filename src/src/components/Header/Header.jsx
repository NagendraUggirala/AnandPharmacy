// src/components/Header/Header.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiCamera } from "react-icons/fi";

import SearchBar from "./SearchBar";
import LocationSelector from "./LocationSelector";
import HeaderToggleMenu from "./HeaderToggleMenu";
import CategorySlider from "./CategorySlider";
import CartBadge from "./CartBadge";
import Login from "../../pages/Auth/Login";
import PrescriptionToggle from "./PrescriptionToggle";

const Header = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  /* -------------------------------
      CART SYNC
  ------------------------------- */
  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("pharmacy_cart")) || [];
      setCartCount(cart.length);
    };
    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  /* -------------------------------
      LOGIN SYNC
  ------------------------------- */
  const syncLoginState = useCallback(() => {
    setIsLoggedIn(!!localStorage.getItem("user"));
  }, []);

  useEffect(() => {
    syncLoginState();
    window.addEventListener("storage", syncLoginState);
    return () => window.removeEventListener("storage", syncLoginState);
  }, [syncLoginState]);

  const goTo = (path) => {
    setProfileOpen(false);
    navigate(path);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 border-b border-gray-200">
        
        {/* MAIN TOP BAR */}
        <div className="max-w-8xl mx-auto flex items-center justify-between px-3 py-2">
          
          {/* LOGO */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => goTo("/")}
          >
            <img
              src={'/assets/logo/image.png'}
              alt="logo"
              className="logo-img"
            />
            <span className="hidden lg:block font-semibold text-orange-600 text-lg">
              Anand Pharmacy
            </span>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex items-center gap-3">

            {/* LOCATION */}
            <LocationSelector />

            {/* LOGIN / PROFILE */}
            {!isLoggedIn ? (
              <button
                onClick={() => setLoginOpen(true)}   // ⭐ POPUP OPEN HERE
                className="flex items-center gap-1 bg-orange-600 text-white px-3 py-1.5 rounded-md hover:bg-orange-700"
              >
                <FiUser size={18} />
                <span className="hidden md:block">Login</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-md hover:bg-gray-200"
                >
                  <FiUser size={18} className="text-orange-600" />
                  <span className="hidden md:block">Profile</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-10 w-40 bg-white shadow-lg rounded-md border z-50">
                    <button
                      onClick={() => goTo(true)}
                      className="block px-4 py-2 w-full text-left hover:bg-orange-50"
                    >
                      My Account
                    </button>
                    <button
                      onClick={() => goTo(true)}
                      className="block px-4 py-2 w-full text-left hover:bg-orange-50"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={() => {
                        localStorage.removeItem("user");
                        setIsLoggedIn(false);
                        setProfileOpen(false);
                      }}
                      className="block px-4 py-2 w-full text-left text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* MOBILE CAMERA */}
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 bg-orange-100 rounded-full lg:hidden"
            >
              <FiCamera className="text-orange-600" size={20} />
            </button>

            {/* CART */}
            <div className="relative">
              <button
                onClick={() => goTo("/cart")}
                className="flex items-center justify-center"
              >
                <FiShoppingCart size={22} className="text-gray-800" />
              </button>
              <CartBadge count={cartCount} />
            </div>

            {/* PRESCRIPTION BUTTON */}
            <div className="hidden lg:block">
              <PrescriptionToggle />
            </div>
          </div>

        </div>

        {/* SEARCH BAR */}
        <div className="flex justify-center px-3">
          <div className="w-full max-w-lg">
            <SearchBar />
          </div>
        </div>

        {/* CATEGORY SLIDER */}
        <div className="mt-1">
          <CategorySlider />
        </div>
      </header>

      {/* SPACER BELOW HEADER */}
      <div className="h-[120px] lg:h-[90px]" />

      {/* MOBILE SMALL MENU */}
      <HeaderToggleMenu
        menuOpen={menuOpen}
        closeMenu={() => setMenuOpen(false)}
      />

      {/* LOGIN POPUP OVERLAY */}
      {loginOpen && (
        <div className="fixed inset-0 bg-black/60 z-[999] flex justify-center items-center">
          <Login onClose={() => setLoginOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
