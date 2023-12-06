import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const defaultUser = {
  name: "Anonymous",
  isAdmin: false,
  isManager: false, // TODO: Update this object when login is possible.
  isCashier: false
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userObj, setUserObj] = useState({...defaultUser});
  
  const value = { userObj, setUserObj};
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};