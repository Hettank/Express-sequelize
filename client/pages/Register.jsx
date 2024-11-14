import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/api/auth/register`, formData);

      if (response.status === 201) {
        alert("Registration Successfull..");

        setFormData({
          username: "",
          email: "",
          password: "",
        });

        navigate("/");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form-container" onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className="form-control">
          <label>Username</label>
          <input
            type="text"
            value={formData.username}
            name="username"
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
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
          <button type="submit">Register</button>
          <Link to="/login">Login to account</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
