import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from "../Utils/constants";

const useGoogleSignIn = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const signinWithGoogle = async () => {
    setLoading(true);
    console.log('firebaseConfig -------------->',firebaseConfig)
    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setLoading(false);
      return result.user;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError(error);
      setLoading(false);
      return null;
    }
  };

  return {
    user,
    error,
    loading,
    signinWithGoogle,
  };
};

export default useGoogleSignIn;
