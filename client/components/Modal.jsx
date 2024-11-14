import { X } from "@phosphor-icons/react";
import React from "react";

const Modal = ({ title, children, footerButtons, onClose, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-header">
          <h1>{title}</h1>
          <X
            style={{ cursor: "pointer" }}
            size={28}
            weight="bold"
            fill="#FFFFFF"
            onClick={onClose}
          />
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">{footerButtons}</div>
      </div>
    </div>
  );
};

export default Modal;
