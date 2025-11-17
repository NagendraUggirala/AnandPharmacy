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
import Login from "../../pages/Auth/Login"; 
import { getHeaderData } from "../../api/headerService";

const Header = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const [logo, setLogo] = useState("");

  /* ---------------- FETCH LOGO ---------------- */
  useEffect(() => {
    (async () => {
      const d = await getHeaderData();
      setLogo(d.logo);
    })();
  }, []);

  /* ---------------- CART COUNT ---------------- */
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("pharmacy_cart")) || [];
    setCartCount(cart.length);
  }, []);

  useEffect(() => {
    const onUpdate = () => {
      const cart = JSON.parse(localStorage.getItem("pharmacy_cart")) || [];
      setCartCount(cart.length);
    };
    window.addEventListener("storage", onUpdate);
    return () => window.removeEventListener("storage", onUpdate);
  }, []);

  /* ---------------- LOGIN CHECK ---------------- */
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);
useEffect(() => {
  const onStorage = () => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  };
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}, []);
useEffect(() => {
  const u = localStorage.getItem("user");
  setIsLoggedIn(!!u);
}, []);

  /* ---------------- RENDER HEADER ---------------- */
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">

        {/* ===== DESKTOP ===== */}
        <div className="hidden lg:flex items-center justify-between px-4 py-3">

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo || "/assets/logo/nandi-flag.png"}
              className="w-10 h-10 rounded"
              alt="logo"
            />
            <div className="font-semibold text-orange-600 text-lg">
              Anand Pharmacy
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 mx-6">
            <SearchBar />
          </div>

          {/* Right Items */}
          <div className="flex items-center gap-4">

            <LocationSelector />

            {/* LOGIN / PROFILE */}
            
           {/* LOGIN / PROFILE AREA */}
{!isLoggedIn ? (
  <button
    onClick={() => navigate("/login")}
    className="flex items-center gap-2"
  >
    <FiUser size={20} />
    Login
  </button>
) : (
  <div className="relative">
    <button
      onClick={() => setProfileOpen(!profileOpen)}
      className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-md"
    >
      <FiUser size={20} className="text-orange-600" />
      Profile
    </button>

    {profileOpen && (
      <div className="absolute right-0 mt-2 w-44 bg-white shadow-md border rounded-md z-50">
        <button
          onClick={() => navigate("/profile")}
          className="w-full text-left px-4 py-2 hover:bg-orange-50"
        >
          My Account
        </button>

        <button
          onClick={() => navigate("/orders")}
          className="w-full text-left px-4 py-2 hover:bg-orange-50"
        >
          My Orders
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            setIsLoggedIn(false);
            setProfileOpen(false);
            navigate("/");
          }}
          className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    )}
  </div>
)}

            {/* Cart */}
            <div className="relative">
              <button onClick={() => navigate("/cart")}>
                <FiShoppingCart size={22} />
              </button>
              <CartBadge count={cartCount} />
            </div>

            <PrescriptionToggle />
          </div>
        </div>

        {/* ===== MOBILE HEADER ===== */}
        <div className="lg:hidden px-4 py-2 flex items-center justify-between">

          {/* Logo */}
          <img
            src={logo || "/assets/logo/nandi-flag.png"}
            className="w-10 h-10 rounded cursor-pointer"
            onClick={() => navigate("/")}
            alt="logo"
          />

          <div className="flex items-center gap-4">

            {/* LOGIN / PROFILE */}
            {!isLoggedIn ? (
              <button onClick={() => navigate("/login")}>
                <FiUser size={24} />
              </button>
            ) : (
              <button onClick={() => navigate("/profile")}>
                <FiUser size={24} className="text-orange-600" />
              </button>
            )}

            {/* Scanner */}
            <button
              className="p-2 bg-orange-100 rounded-full"
              onClick={() => setMenuOpen(true)}
            >
              <FiCamera size={22} className="text-orange-600" />
            </button>

            {/* Cart */}
            <div className="relative">
              <button onClick={() => navigate("/cart")}>
                <FiShoppingCart size={24} />
              </button>
              <CartBadge count={cartCount} />
            </div>
          </div>
        </div>

        {/* Category */}
        <CategorySlider />

      </header>

      {/* PUSH PAGE */}
      <div className="h-[120px] lg:h-[85px]" />

      {/* MOBILE MENU */}
      <HeaderToggleMenu
        menuOpen={menuOpen}
        closeMenu={() => setMenuOpen(false)}
      />

      {/* LOGIN POPUP (if used anywhere) */}
      {loginOpen && (
        <Login onClose={() => setLoginOpen(false)} />
      )}
    </>
  );
};

export default Header;
