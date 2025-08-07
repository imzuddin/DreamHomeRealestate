import React, { createContext, useState, useContext } from 'react';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);

  const login = (userRole) => setRole(userRole);
  const logout = () => setRole(null);

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
