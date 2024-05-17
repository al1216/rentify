import React from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStoryContext from "../hooks/useProductContext";

export default function SignupForm() {
  const navigate = useNavigate();
  let { formData, setFormData } = useStoryContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/api/signup`,
        formData
      );
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("email", response.data.email);
      navigate("/");
    } catch (error) {
      console.error("Signup error", error.response.data);
      // Handle signup error (e.g., show error message)
    }
  };

  return (
    <div className="form-signup">
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <img src="name.png" alt="" className="name-icon" />
              </td>
              <td>
                <input
                  type="text"
                  name="Fname"
                  className="name"
                  placeholder="First Name"
                  autoFocus
                  value={formData.Fname}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <img src="name.png" alt="" className="name-icon" />
              </td>
              <td>
                <input
                  type="text"
                  name="Lname"
                  className="name"
                  placeholder="Last Name"
                  value={formData.Lname}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <img src="email.png" alt="" className="email-icon" />
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  className="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <img src="phone.png" alt="" className="phone-icon" />
              </td>
              <td>
                <input
                  type="tel"
                  name="phone"
                  className="phone"
                  placeholder="Mobile"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <img src="password.png" alt="" className="password-icon" />
              </td>
              <td>
                <input
                  type="password"
                  name="password"
                  className="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p className="login-signup">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Log in</span>
        </p>
        <div className="button-wrapper-signup">
          <button type="submit" className="signup-btn">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}
