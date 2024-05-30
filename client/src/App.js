import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import LoginScreen from "./components/LoginScreenNewBing";
import AdminHome from "./components/AdminHome";
import CustomerHome from "./components/CustomerHome";
import { useSelector } from "react-redux";
import ForgotPass from "./components/ForgotPass";
import ResetPassword from "./components/ResetPass";

const App = () => {
  const user = useSelector((state) => state.auth.user); // Get user from Redux store

  return (
    <Routes>
      {/* <Route path="/" element={<ReportViewer />} /> */}
      <Route path="/" element={<LoginScreen />} />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route
        path="/AdminHome"
        element={
          // Redirect to login screen if user is not logged in
          user ? (
            user.role === "admin" ? (
              <AdminHome />
            ) : (
              <CustomerHome />
            )
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

export default App;
