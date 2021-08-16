import React, { useContext, useEffect, createContext, useState } from "react";
import { auth } from "../firebase";
// create a context
const AuthContext = createContext();

// use the context
export const useAuth = () => useContext(AuthContext);

// AuthProvider Component
const AuthProvider = ({ children }) => {
  // setting state
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // sign up function
  const signup = (email, password) => {
    // firebase handles user creation
    return auth.createUserWithEmailAndPassword(email, password);
  };

  // login function
  const login = (email, password) => {
    // firebase handles user creation
    return auth.signInWithEmailAndPassword(email, password);
  };

  //logout function
  const logout = () => {
    // firebase handles user logout
    return auth.signOut();
  };

  // reset password function
  const resetPassword = (email) => {
    // firebase handles user password reset
    return auth.sendPasswordResetEmail(email);
  };

  // update password function
  const UpdateEmail = (email) => {
    // firebase handles user email update
    return currentUser.updateEmail(email);
  };

  // update password function
  const updatePassword = (password) => {
    // firebase handles user password update
    return currentUser.updatePassword(password);
  };

  // handling side-effects
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // object of current user
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updatePassword,
    UpdateEmail,
  };

  //AuthProvider component return
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
