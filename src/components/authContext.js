import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ user: null, isAuthenticated: false });

  useEffect(() => {
    console.log('AuthProvider authState:', authState);
  }, [authState]);

  return <AuthContext.Provider value={{ authState, setAuthState }}>{children}</AuthContext.Provider>;
};

export default AuthContext;