import React from "react";
import { useLocation } from "react-router-dom";

const UpdatePackage = ({ handleChange, formData, setFormData }) => {
  const location = useLocation();
  const { packageInfo } = location.state || {};

  React.useEffect(() => {
    if (packageInfo) {
      setFormData({ ...packageInfo });
    }
  }, [packageInfo]);

  return (
    <form className="create-package-form">
      <div className="form-control">
        <label htmlFor="title">Package Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter package title"
        />
      </div>

      <div className="form-control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Enter package description"
        />
      </div>

      <div className="form-control">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          placeholder="Enter package price"
        />
      </div>

      <div className="form-control">
        <label htmlFor="fromDate">From Date</label>
        <input
          type="date"
          id="fromDate"
          name="fromDate"
          value={formData.fromDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-control">
        <label htmlFor="toDate">To Date</label>
        <input
          type="date"
          id="toDate"
          name="toDate"
          value={formData.toDate}
          onChange={handleChange}
          required
        />
      </div>
    </form>
  );
};

export default UpdatePackage;
