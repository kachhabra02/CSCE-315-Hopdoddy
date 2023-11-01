import React, { createContext, useContext, useState } from 'react';

const CredContext = createContext();

export const useCredentials = () => {
  return useContext(CredContext);
};

export const CredProvider = ({ children }) => {
  const [cred, setCredentials] = useState({
    name: "Anonymous",
    isManager: false,
    isCashier: false
  });
  
  // Login and logout logic here
  
  const value = {
    isManager,
    isCashier
  };
  
  return <CredContext.Provider value={value}>{children}</CredContext.Provider>;
};