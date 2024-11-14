import React from "react";

const API = import.meta.env.VITE_API_URL;

const CreatePackage = ({ handleChange, formData }) => {
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

export default CreatePackage;
