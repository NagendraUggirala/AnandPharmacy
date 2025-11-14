import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load saved logged-in user
  useEffect(() => {
    const saved = localStorage.getItem("pharmacy_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
