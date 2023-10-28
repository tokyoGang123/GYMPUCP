// FormularioBorrarDescuento.jsx

import React, { useState } from "react";

const FormularioBorrarDescuento = ({ IdDescuento }) => {
  const [borradoExitoso, setBorradoExitoso] = useState(false);

  const handleEliminarDescuento = async () => {
    try {
      const url = `https://localhost:7147/descuentos/borrar?Id=${IdDescuento}`;
      const response = await fetch(url, {
        method: "GET",
        // Agregar más configuraciones de solicitud si es necesario (cabeceras, cuerpo, etc.)
      });

      // Manejar la respuesta, mostrar mensaje de éxito, o manejar errores
      if (response.status === 200) {
        setBorradoExitoso(true);
      }
    } catch (error) {
      console.error("Error al intentar eliminar el descuento:", error);
    }
  };

  return (
    <div className="formulario-registro">
      <p>{`¿Está seguro de eliminar el descuento con ID = ${IdDescuento}?`}</p>
      <button type="submit" onClick={handleEliminarDescuento}>
        Eliminar Descuento
      </button>
      {borradoExitoso && <p>¡El descuento se ha eliminado exitosamente!</p>}
    </div>
  );
};

export default FormularioBorrarDescuento;
