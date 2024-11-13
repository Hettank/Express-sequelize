import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Uploader from "../components/Uploader";

const API = import.meta.env.VITE_API_URL;

// const validationSchema = Yup.object({
//   firstName: Yup.string()
//     .required("Name is required")
//     .min(2, "First Name must be at least 2 characters"),
//   lastName: Yup.string()
//     .required("Name is required")
//     .min(2, "Last Name must be at least 2 characters"),
//   email: Yup.string().required("Email is required"),
//   password: Yup.string().required("Password is required"),
//   address: Yup.string().required("Password is required"),
// });

const CreateUser = () => {
  const navigate = useNavigate();

  const [cover, setCover] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    status: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addFormData = new FormData();

    for (const key in formData) {
      addFormData.append(key, formData[key]);
    }

    if (cover) {
      addFormData.append("cover", cover);
    }

    try {
      const response = await axios.post(`${API}/api/users`, addFormData);
      console.log(response.data);
      if (response.status === 201) {
        alert("Success");
        navigate("/");
      }
    } catch (error) {
      console.log("Error occurred:", error.message);
    }
  };

  return (
    <div className="parent-container">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-control span">
            <label>Profile Pic</label>
            <div className="uploader-container">
              <Uploader file={cover} setFile={setCover} fileType="cover" />
            </div>
          </div>
          <div className="form-control">
            <label>First Name</label>
            <input type="text" name="firstName" onChange={handleInputChange} />
          </div>
          <div className="form-control">
            <label>Last Name</label>
            <input type="text" name="lastName" onChange={handleInputChange} />
          </div>
          <div className="form-control span">
            <label>Email</label>
            <input type="text" name="email" onChange={handleInputChange} />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <label>Phone No</label>
            <input type="text" name="phone" onChange={handleInputChange} />
          </div>
          <div className="switch-control span">
            <label>Status</label>
            <Switch
              checked={formData.status}
              onChange={(checked) =>
                setFormData({ ...formData, status: checked })
              }
              onColor="#037e69"
              offColor="#d9d9d9"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={40}
              className="react-switch-handle"
              id="material-switch"
            />
          </div>
          <div className="form-control span">
            <label>Address</label>
            <textarea
              name="address"
              rows="3"
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="btn-container">
            <button className="btn default-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
