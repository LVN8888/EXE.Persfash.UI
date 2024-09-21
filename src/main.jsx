import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <GoogleOAuthProvider clientId='106073710411-q23pa4i7rk664a4r69gn1b497sta9q0p.apps.googleusercontent.com'>
    <AuthProvider>
      <App />
    </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);
