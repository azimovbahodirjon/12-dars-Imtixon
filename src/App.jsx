import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./pages/Home";
import Details from "./pages/Details";
import RootLayout from "./layout/RootLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { auth } from "./firebase/config";

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: user ? <Home /> : <Navigate to="/login" />,
        },
        {
          path: ":id",
          element: user ? <Details /> : <Navigate to="/login" />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
    },
  ]);

  return <>{isAuthReady && <RouterProvider router={routes} />}</>;
}
