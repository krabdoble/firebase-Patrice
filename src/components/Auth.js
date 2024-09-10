import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Auth =() => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("firebaseToken");

    if (token) {
      navigate("/protected/");
    }
  }, [])

  const signInWithGoogle = async () => {
    try {
      const a = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("firebaseToken", a._tokenResponse.idToken);

      navigate("/protected");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await signOut(auth);

    localStorage.removeItem("firebaseToken");
  };

  return (
    <div>
      <h1>Auth</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>

      <button onClick={logout}>Log out</button>
    </div>
  );
}


