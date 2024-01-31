// header.jsx
import React from "react";
import "./Header.css";
import FPTlogo from "./img/FPT_logo.png";

export default function Header() {
  return (
    <header className="header">
      <div className="content">
        <div className="navbar">
          <img src={FPTlogo} alt="FPT Software" />
          <div className="actions">
            <a href="#!" className="btn action-btn">
              Sign In
            </a>
            <div className="language-container">
              {/* Khung biểu hiện ngôn ngữ */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
