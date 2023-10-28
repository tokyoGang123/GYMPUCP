import React from "react";
import "./Modal1.scss";
const estiloBotonCerrar = {
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
};

const Modal1 = ({ handleClose, children, isOpen, titulo }) => {
  return (
    isOpen && (
      <div className="overlay1">
        <div className="modal-container1">
          <div className="titulo-modal1" style={{alignItems: 'center'}}>
            <h3>{titulo}</h3>
            <div> 
            <button className="close-button1" onClick={handleClose}>
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

export default Modal1;

