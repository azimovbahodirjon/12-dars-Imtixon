import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return children;
}
