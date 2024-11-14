import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/api/auth/login`, formData);

      console.log(response);

      const user = response.data.user;

      console.log(user);
      localStorage.setItem("userDetails", JSON.stringify(user));

      if (response.status === 200) {
        alert("Login Successful");
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 401)
      ) {
        alert("Invalid email or password. Please try again.");
      } else {
        alert("Invalid email or password. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form-container" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <div
          className="btn-container"
          style={{ display: "flex", gap: "20px", padding: "10px" }}
        >
          <button type="submit">Login</button>
          <Link to="/register">Register account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
