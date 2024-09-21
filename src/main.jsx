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
  <GoogleOAuthProvider clientId='758503744205-dsdvki2sdmn0cm90316md5djc6afncuf.apps.googleusercontent.com'>
    <AuthProvider>
      <App />
    </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);
