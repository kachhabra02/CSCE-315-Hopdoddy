import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const defaultUser = {
  name: "Anonymous",
  isManager: false,
  isCashier: false
};

export const useCredentials = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({...defaultUser});

  const login = (/*username, password*/) => {
    console.log("Login validation and setter function here");
  };

  const logout = () => {
    setUser({...defaultUser});
    console.log("Logout function here");
  };
  
  const value = { user, login, logout };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};