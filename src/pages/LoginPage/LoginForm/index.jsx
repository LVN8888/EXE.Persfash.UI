import React from "react";
import LoginForm from "../../../components/partials/Login/LoginForm";
import AuthHeader from "../../../components/partials/AuthHeader";
import { ToastContainer } from "react-toastify";

const LoginFormPage = () => {
  return (
    <div>
      <AuthHeader />
      <LoginForm />
      <ToastContainer />
    </div>
  );
};

export default LoginFormPage;
