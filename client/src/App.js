import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const expiryTime = decodedToken.exp * 1000; // Convert to milliseconds

    return expiryTime > Date.now();
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isTokenValid()) {
      dispatch(authActions.logout());
    }
  }, [dispatch]);

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sign-in"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/sign-up"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
};

export default App;
