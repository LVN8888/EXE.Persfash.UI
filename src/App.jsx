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
import DashboardPage from "./components/partials/Admin/pages/DashboardPage.jsx";
import UserManagementPage from "./components/partials/Admin/pages/UserManagementPage.jsx";
import ProtectedRoute from "./RouteConfig/ProtectedRoute.jsx";
import PublicRoute from "./RouteConfig/PublicRoute.jsx";
import FashionItemsManagementPage from "./components/partials/Admin/pages/FashionItemsManagementPage.jsx";
import SubscriptionManagementPage from "./components/partials/Admin/pages/SubscriptionManagementPage.jsx";
import { SearchResultPage } from "./pages/SearchResultPage/index.jsx";

function App() {
  return (
    <div>
      <Routes>
        {/* Route requires login */}
        <Route element={<ProtectedRoute requiredRole="Customer" />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route
            path="/payment/payment-success"
            element={<PayMentSuccessPage />}
          />
          <Route
            path="/payment/payment-review/:subscriptionId"
            element={<ReviewPaymentPage />}
          />
          <Route path="/wardrobe" element={<WardrobePage />} />
          <Route
            path="/customer/customer-info"
            element={<CustomerInformationPage />}
          />
          <Route
            path="/customer/edit-profile-setup"
            element={<CustomerEditProfileSetupPage />}
          />
           <Route
            path="/search-results"
            element={<SearchResultPage />}
          />
          <Route
            path="/password/change-password"
            element={<ChangePasswordPage />}
          />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/profile-setup" element={<ProfileSetupPage />} />
        </Route>

        {/* Route for Admin */}
        <Route element={<ProtectedRoute requiredRole="Admin" />}>
          <Route path="/admin" element={<DashboardPage />} />
          <Route
            path="/admin/user-management"
            element={<UserManagementPage />}
          />
          <Route
            path="/admin/fashion-item-management"
            element={<FashionItemsManagementPage />}
          />
          <Route
            path="/admin/subscription-management"
            element={<SubscriptionManagementPage />}
          />
        </Route>

        {/* Public Route*/}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-form" element={<LoginFormPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/password/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route
            path="/password/reset-password"
            element={<ResetPasswordPage />}
          />
        </Route>

        {/*Dac Biet*/}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
