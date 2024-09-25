import React from "react";
import { Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage/index.jsx";
import RegisterPage from "./pages/RegisterPage/index.jsx";
import LoginPage from "./pages/LoginPage/index.jsx";
import HomePage from "./pages/HomePage/index.jsx";
import PlanPage from "./pages/PlanPage/index.jsx";
import PayMentSuccessPage from "./pages/PaymentPage/PaymentSuccessPage/index.jsx";
import ReviewPaymentPage from "./pages/PaymentPage/ReviewPaymentPage/index.jsx";
import LoginFormPage from "./pages/LoginPage/LoginForm/index.jsx";
import SupportPage from "./pages/SupportPage/index.jsx";
import WardrobePage from "./pages/WardobePage/index.jsx";
import { NotFoundPage } from "./pages/NotFoundPage/index.jsx";
import { ForgotPasswordPage } from "./pages/PasswordPage/ForgotPasswordPage/index.jsx";
import { ResetPasswordPage } from "./pages/PasswordPage/ResetPasswordPage/index.jsx";
import { CustomerInformationPage } from "./pages/CustomerInformationPage/index.jsx";
import { ChangePasswordPage } from "./pages/PasswordPage/ChangePasswordPage/index.jsx";
import { WelcomePage } from "./pages/StarterPage/WelcomePage/index.jsx";
import { ProfileSetupPage } from "./pages/StarterPage/ProfileSetupPage/index.jsx";
import { CustomerEditProfileSetupPage } from "./pages/CustomerEditProfileSetupPage/index.jsx";
import AdminPage from "./pages/AdminPage/index.jsx";
import Dashboard from "./components/partials/Admin/components/Dashboard.jsx";
import DashboardPage from "./components/partials/Admin/pages/DashboardPage.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-form" element={<LoginFormPage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/support" element={<SupportPage/>} />
        <Route path="/payment/payment-success" element={<PayMentSuccessPage />} />
        <Route path="/payment/payment-review" element={<ReviewPaymentPage />} />
        <Route path="/wardrobe" element={<WardrobePage/>} />
        <Route path="/customer/customer-info" element={<CustomerInformationPage />} />
        <Route path="/customer/edit-profile-setup" element={<CustomerEditProfileSetupPage />} />
        <Route path="/payment/payment-success" element={<PayMentSuccessPage />} />
        <Route path="/payment/payment-review" element={<ReviewPaymentPage />} />
        <Route path="/password/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/password/reset-password" element={<ResetPasswordPage />} />
        <Route path="/password/change-password" element={<ChangePasswordPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/profile-setup" element={<ProfileSetupPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/admin/*" element={<AdminPage/>} />
      </Routes>
    </div>
  );
}

export default App;
