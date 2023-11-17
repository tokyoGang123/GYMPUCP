import React, { useState, useEffect } from "react";
import jsonData from "./dataa.json"; // Ajusta la ruta según la ubicación de tu archivo

const ImageViewer = () => {
  return (
    <div>
      <h2>Galería de Imágenes:</h2>
      {jsonData.length > 0 ? (
        <div>
          {jsonData.map((image, index) => (
            <div key={index}>
              <h3>{"titulo"}</h3>
              <img
                src={`data:image/jpg;base64,${image.archivoBase64}`}
                alt={"titulo de la iamgen"}
                style={{ maxWidth: "100%" }}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No se pudieron cargar las imágenes.</p>
      )}
    </div>
  );
};

export default ImageViewer;
