// header.jsx
import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="content">
        <div className="navbar">
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
