import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pencil } from "@phosphor-icons/react";
import Modal from "./Modal";
import UpdatePackage from "./Packages/UpdatePackage";

const API = import.meta.env.VITE_API_URL;

const PackageCard = ({ packageInfo }) => {
  const { title, description, price, fromDate, toDate } = packageInfo;

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

  const user = JSON.parse(localStorage.getItem("userDetails"));
  const packageId = packageInfo.id;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const buyPackage = async () => {
    try {
      if (!user) {
        alert("You need to log in to buy a package.");
        return;
      }

      const response = await axios.post(`${API}/api/packages/buy-package`, {
        userId: user.id,
        packageId: packageId,
      });

      if (response.status === 200) {
        alert("Package purchased successfully");
        const updatedUser = { ...user, PackageId: packageId };
        localStorage.setItem("userDetails", JSON.stringify(updatedUser));
        window.location.reload();
      }
    } catch (error) {
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedFormData = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
    };

    try {
      const response = await axios.put(
        `${API}/api/packages/${packageInfo.id}`,
        formattedFormData
      );

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
      Update
    </button>,
  ];

  const hasPurchased = user && user.PackageId === packageId;

  console.log("Form Data:", formData);

  return (
    <>
      <Modal
        title="Update a package"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        footerButtons={footerButtons}
      >
        <UpdatePackage
          handleChange={handleChange}
          packageInfo={packageInfo}
          formData={formData}
          setFormData={setFormData}
        />
      </Modal>
      <div className="package-card">
        <Link state={{ packageInfo }}>
          <Pencil size={20} className="pencil-icon" onClick={handleOpenModal} />
        </Link>

        <h2 className="package-title">{title}</h2>
        <p className="package-description">{description}</p>
        <div className="package-price">${price.toFixed(2)}</div>
        {hasPurchased && (
          <div style={{ marginBlock: "5px" }}>
            Status:{" "}
            <span className={packageInfo.expired ? "inactive" : "active"}>
              {packageInfo.expired ? "Expired" : "Active"}{" "}
            </span>
          </div>
        )}
        <div className="package-dates">
          <span>From: {formatDate(fromDate)}</span>
          <span>To: {formatDate(toDate)}</span>
        </div>
        <div className="btn-container">
          {hasPurchased && !packageInfo.expired ? (
            <Link
              className="buy-button"
              to="/package-details"
              state={{ packageInfo }}
            >
              View
            </Link>
          ) : (
            <button className="btn default-btn" onClick={buyPackage}>
              Buy Now
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PackageCard;
