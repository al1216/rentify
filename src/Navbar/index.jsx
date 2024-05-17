import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Index() {
  let navigate = useNavigate(null);
  let email = localStorage.getItem("email");
  let onClickLoginBtn = () => {
    navigate("/login");
  };

  let onClickSignupBtn = () => {
    navigate("/signup");
  };

  let onClickLogoutBtn = () => {
    localStorage.clear();
    navigate(0);
  }
  return (
    <div className="navbar">
      <h1 className="headingOfSite">Rentify</h1>
      {email === null && (
        <div className="loginbuttonsOnNavbar">
          <div className="login-btn-navbar">
            <p
              className="login-caption-navbar"
              onClick={() => onClickLoginBtn()}
            >
              Login
            </p>
          </div>
          <div className="signup-btn-navbar">
            <p
              className="signup-caption-navbar"
              onClick={() => onClickSignupBtn()}
            >
              Sign Up
            </p>
          </div>
        </div>
      )}
      {email !== null && (
        <div className="loginbuttonsOnNavbar">
          <div className="signup-btn-navbar">
            <p
              className="signup-caption-navbar"
              onClick={() => onClickLogoutBtn()}
            >
              Logout
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
