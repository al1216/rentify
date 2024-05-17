import React from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStoryContext from "../hooks/useProductContext";

export default function Form() {
  const navigate = useNavigate();
  let {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
  } = useStoryContext();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/api/login`,
        {
          email,
          password,
        }
      );
      console.log(response.data);

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("email", response.data.email);
        navigate("/");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="form-login">
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <img src="email.png" alt="" className="email-icon" />
              </td>
              <td>
                <input
                  required
                  type="email"
                  name="email"
                  className="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <img src="password.png" alt="" className="password-icon" />
              </td>
              <td>
                <input
                  required
                  type="password"
                  name="password"
                  className="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="login-link">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up</span>
        </p>
        <div className="button-wrapper-login">
          <button type="submit" className="login-btn">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
