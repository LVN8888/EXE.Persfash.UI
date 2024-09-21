import React from "react";
import Register from "../../components/partials/Register";
import AuthHeader from "../../components/partials/AuthHeader";
import { ToastContainer } from "react-toastify";

const RegisterPage = () => {
  return (
    <div>
      <AuthHeader />
      <Register />
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
