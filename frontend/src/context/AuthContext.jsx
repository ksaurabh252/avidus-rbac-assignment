import { createContext, useState } from "react";

// Create authentication context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    // Restore user session if data exists
    if (storedUser && token) {
      return JSON.parse(storedUser);
    }

    return null;
  });

  // Login user and save data to localStorage
  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  // Logout user and clear stored data
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
