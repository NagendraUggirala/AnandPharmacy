// src/components/Header/SearchBar.jsx
import React, { useState, useEffect } from "react";
import { FiSearch, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ mobile = false }) => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => {
      if (q && q.length > 1) {
        // placeholder for suggestion API
      }
    }, 300);
    return () => clearTimeout(id);
  }, [q]);

  const onSubmit = (e) => {
    e?.preventDefault();
    if (!q) return;
    navigate(`/products?search=${encodeURIComponent(q)}`);
  };

  if (mobile) {
    return (
      <form onSubmit={onSubmit} className="flex gap-2 items-center">
        <div className="flex-1 bg-white p-3 rounded-full flex items-center shadow-sm">
          <FiSearch className="text-gray-400" />
          <input
            className="ml-3 w-full outline-none"
            placeholder="Search for medicines, brands or symptoms"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="button" onClick={() => alert("Open camera scanner (mobile)")}>
            <FiCamera className="text-gray-400" />
          </button>
        </div>
        <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded-md hidden sm:block">Search</button>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="bg-gray-100 rounded-lg px-3 py-2 flex items-center">
        <FiSearch size={18} className="text-gray-500" />
        <input
          className="ml-3 w-full bg-transparent outline-none"
          placeholder="Search for Products, Brands and More"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="button" onClick={() => alert("Open camera scanner")}>
          <FiCamera className="text-gray-500" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
