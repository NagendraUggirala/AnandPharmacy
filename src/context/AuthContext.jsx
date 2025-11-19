import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);



  const loginUser = (data) => {
    setUser(data);
    localStorage.setItem("pharmacy_user", JSON.stringify(data));
  };

const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("pharmacy_user");
  };
  // Restore login from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pharmacy_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
