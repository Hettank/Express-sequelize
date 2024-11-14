import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Switch from "react-switch";
import Uploader from "../components/Uploader";

const API = import.meta.env.VITE_API_URL;

const UpdateUser = () => {
  const [cover, setCover] = useState(null);

  const navigate = useNavigate();

  const location = useLocation();
  const user = location.state.user;

  const [formData, setFormData] = useState({ ...user });

  // Converting Image URL to file Blob and File object to render the image in preview
  useEffect(() => {
    if (user.profilePic) {
      const fetchImage = async () => {
        try {
          const response = await axios.get(
            `${API}/uploads/${user.profilePic}`,
            {
              responseType: "blob",
            }
          );
          const file = new File([response.data], user.profilePic, {
            type: response.data.type,
          });
          setCover(file);
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }
      };
      fetchImage();
    }
  }, [user.profilePic]);

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addFormData = new FormData();

    for (const key in formData) {
      addFormData.append(key, formData[key]);
    }

    if (cover && typeof cover !== "string") {
      addFormData.append("cover", cover);
    }

    try {
      const response = await axios.put(
        `${API}/api/users/updateUser/${user.id}`,
        addFormData
      );

      if (response.status === 200) {
        alert("Updated successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="parent-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-control span">
            <label>Profile Pic</label>
            <div className="uploader-container">
              <Uploader file={cover} setFile={setCover} fileType="cover" />
            </div>
          </div>
          <div className="form-control">
            <label>First Name</label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <label>Last Name</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control span">
            <label>Email</label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <label>Phone No</label>
            <input
              type="text"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
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
              id="address"
              rows="3"
              value={formData.address}
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

export default UpdateUser;
