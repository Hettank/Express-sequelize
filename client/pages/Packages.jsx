import axios from "axios";
import React, { useEffect, useState } from "react";
import PackageCard from "../components/PackageCard";
import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "@phosphor-icons/react";
import Modal from "../components/Modal";
import CreatePackage from "../components/Packages/CreatePackage";

const API = import.meta.env.VITE_API_URL;

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    fromDate: "",
    toDate: "",
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/api/packages`);

        let today = new Date();

        let fetchedData = response.data.map((packageInfo) => {
          if (today > new Date(packageInfo.toDate)) {
            packageInfo.expired = true;
          } else {
            packageInfo.expired = false;
          }

          return packageInfo;
        });
        setPackages(fetchedData);
      } catch (error) {
        console.log("Error getting packages", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/api/packages/`, formData);

      if (response.status === 201) {
        alert("Package Created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const footerButtons = [
    <button
      key="cancel"
      className="btn danger-btn"
      onClick={handleCloseModal}
      style={{ flex: "1" }}
    >
      Cancel
    </button>,
    <button
      key="create"
      type="submit"
      form="create-package-form"
      className="btn default-btn"
      style={{ flex: "1" }}
      onClick={handleSubmit}
    >
      Create
    </button>,
  ];

  return (
    <div style={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ArrowLeft onClick={() => navigate(-1)} size={20} />
        <button className="btn default-btn" onClick={handleOpenModal}>
          Create Package
        </button>
      </div>

      <Modal
        title="Create a package"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        footerButtons={footerButtons}
      >
        <CreatePackage handleChange={handleChange} formData={formData} />
      </Modal>

      <div className="packages-container">
        {packages.map((packageInfo) => (
          <PackageCard key={packageInfo.id} packageInfo={packageInfo} />
        ))}
      </div>
    </div>
  );
};

export default Packages;
