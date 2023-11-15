import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PasswordComponent from "./components/PasswordComponent";
import WelcomeComponent from "./components/WelcomeComponent"; // Assuming you have this component
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<PasswordComponent />} />
        <Route path="/welcome" element={<WelcomeComponent />} />
      </Routes>
    </React.StrictMode>
  </Router>
);
