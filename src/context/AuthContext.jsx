import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Auth: Initializing...");
    
    // Safety timeout to prevent white screen hang
    const timer = setTimeout(() => {
      if (loading) {
        console.warn("Auth: Initialization timed out. Proceeding as guest.");
        setLoading(false);
      }
    }, 2000);

    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("Auth: State changed", user ? user.email : "Guest");
        setCurrentUser(user);
        setLoading(false);
        clearTimeout(timer);
      }, (error) => {
        console.error("Auth: Error in listener", error);
        setLoading(false);
        clearTimeout(timer);
      });

      return () => {
        unsubscribe();
        clearTimeout(timer);
      };
    } catch (err) {
      console.error("Auth: Failed to set up listener", err);
      setLoading(false);
      clearTimeout(timer);
    }
  }, []);

  const signup = (email, password, displayName) => {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      return updateProfile(userCredential.user, { displayName });
    });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    googleLogin
  };

  // We always render the Provider, and components can handle 'loading' if they need to.
  // This prevents the whole app from being blank if the provider is stuck.
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
