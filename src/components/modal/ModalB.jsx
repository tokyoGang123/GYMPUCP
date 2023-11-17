import React from "react";
import "./ModalB.scss";
const estiloBotonCerrar = {
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
};

const ModalB = ({ handleClose, children, isOpen, titulo }) => {
  return (
    isOpen && (
      <div className="overlayB">
        <div className="modal-containerB">
          <div className="titulo-modalB" style={{alignItems: 'center'}}>
            <h3>{titulo}</h3>
            <div> 
            <button className="close-buttonB" onClick={handleClose}>
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

export default ModalB;
