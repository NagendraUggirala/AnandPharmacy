import React from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category") || "all";

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-orange-600">
        Showing results for: {category.replace("-", " ").toUpperCase()}
      </h1>

      {/* Display category products here */}
    </div>
  );
}
