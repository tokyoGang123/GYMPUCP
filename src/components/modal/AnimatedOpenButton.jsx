import React from "react";

const openButtonStyle = {
  fontSize: "1.2rem",
  padding: "20px",
  borderRadius: "50px",
  border: "none",
  backgroundColor: "#5c3aff",
  color: "white",
  cursor: "pointer",
  transition: "transform 0.2s",
};

const AnimatedOpenButton = ({ children, handlClick }) => {
  return (
    <button
      style={openButtonStyle}
      onClick={handlClick}
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)";
      }}
    >
      {children}
    </button>
  );
};

export default AnimatedOpenButton;
