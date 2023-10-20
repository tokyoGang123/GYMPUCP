import React from "react";
import "./Modal.scss";
const estiloBotonCerrar = {
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
};

const Modal = ({ handleClose, children, isOpen, titulo }) => {
  return (
    isOpen && (
      <div className="overlay">
        <div className="modal-container">
          <div className="titulo-modal" style={{alignItems: 'center'}}>
            <h3>{titulo}</h3>
            <div> 
            <button className="close-button" onClick={handleClose}>
              X
            </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
