import { ArrowLeft } from "@phosphor-icons/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PackageDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { packageInfo } = location.state || {};

  if (!packageInfo) {
    return <div>No package details found.</div>;
  }

  const { title, description, price, fromDate, toDate } = packageInfo;
  return (
    <>
      <ArrowLeft onClick={() => navigate(-1)} size={20} />
      <div className="package-details-container">
        <h1>{title}</h1>
        <p>{description}</p>
        <div>Price: ${price.toFixed(2)}</div>
        <div>From: {new Date(fromDate).toLocaleDateString("en-US")}</div>
        <div>To: {new Date(toDate).toLocaleDateString("en-US")}</div>
      </div>
    </>
  );
};

export default PackageDetails;
