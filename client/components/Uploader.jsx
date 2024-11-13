import { CloudArrowUp, X } from "@phosphor-icons/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

const Uploader = ({ file, setFile, fileType }) => {
  const [preview, setPreview] = useState("");
  const [fileName, setFileName] = useState("");

  console.log("file", file);
  useEffect(() => {
    if (file) {
      // If file is a File object
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    } else {
      setPreview("");
      setFileName("");
    }
  }, [file, setFile, fileType]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const clearImage = (e) => {
    e.stopPropagation();
    setFile(null);
    setPreview("");
  };

  return (
    <main
      className="uploader"
      onClick={() => document.querySelector(`.${fileType}`).click()}
    >
      <form>
        <input
          type="file"
          hidden
          name={fileType}
          id={fileType}
          className={fileType}
          multiple={false}
          accept=".jpg, .jpeg, .png"
          onChange={handleFileChange}
        />
      </form>
      {preview ? (
        <div className="image-preview">
          <img src={preview} alt={fileName} className="file-preview" />
          <button className="clear-button" onClick={clearImage} type="button">
            <X className="cross-icon" />
          </button>
        </div>
      ) : (
        <div className="default-preview">
          <CloudArrowUp size={22} />
          <p>Upload Image</p>
        </div>
      )}
    </main>
  );
};

export default Uploader;
