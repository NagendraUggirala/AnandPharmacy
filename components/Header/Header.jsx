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
import { getHeaderData } from "../../api/headerService";

const Header = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [logo, setLogo] = useState("");

  useEffect(() => {
    (async () => {
      const d = await getHeaderData();
      setLogo(d.logo);
    })();
  }, []);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("pharmacy_cart")) || [];
      setCartCount(cart.length);
    };
    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

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
        {/* MAIN HEADER */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-2">
          {/* LEFT — LOGO */}
          <div
            className="flex items-center gap-6 cursor-pointer"
            onClick={() => goTo("/")}
          >
            <img
              src={logo || "/assets/logo/nandi-flag.png"}
              alt="logo"
              className="logo-img"
            />
            <span className="hidden lg:block font-semibold text-orange-600 text-lg">
              Anand Pharmacy
            </span>
          </div>

          {/* CENTER — SEARCH BAR */}

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* LOCATION */}
            <div className="hidden lg:block">
              <LocationSelector />
            </div>

            {/* LOGIN / PROFILE */}
            {!isLoggedIn ? (
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-1 bg-orange-600 text-white px-3 lg:px-4 py-1.5 rounded-md text-sm hover:bg-orange-700"
              >
                <FiUser size={18} />
                <span className="hidden lg:block">Login</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-md hover:bg-gray-200"
                >
                  <FiUser size={18} className="text-orange-600" />
                  <span className="hidden lg:block">Profile</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md border shadow-lg z-[999]">
                    <button
                      onClick={() => goTo("/profile")}
                      className="block w-full px-4 py-2 text-left hover:bg-orange-50"
                    >
                      My Account
                    </button>
                    <button
                      onClick={() => goTo("/orders")}
                      className="block w-full px-4 py-2 text-left hover:bg-orange-50"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={() => {
                        localStorage.removeItem("user");
                        setIsLoggedIn(false);
                        setProfileOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* MOBILE CAMERA BUTTON */}
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

            {/* PRESCRIPTION BUTTON (DESKTOP) */}
            <div className="hidden lg:block">
              <PrescriptionToggle />
            </div>
          </div>
        </div>
   <div className="w-full flex justify-center mt-2 mb-2 px-3">
  <div className="searchbar-container">
    <SearchBar />
  </div>
</div>



        {/* CATEGORY SLIDER */}
        <div className="mt-1">
          <CategorySlider />
        </div>
      </header>

      {/* SPACER */}
      <div className="h-[120px] lg:h-[90px]" />

      {/* MOBILE MENU */}
      <HeaderToggleMenu
        menuOpen={menuOpen}
        closeMenu={() => setMenuOpen(false)}
      />

      {/* LOGIN POPUP */}
      {loginOpen && (
        <div className="fixed inset-0 bg-white overflow-y-auto z-[999]">
          <Login onClose={() => setLoginOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
