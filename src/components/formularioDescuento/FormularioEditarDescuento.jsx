// FormularioEditarDescuento.jsx

import React, { useState, useEffect } from "react";

const FormularioEditarDescuento = ({ descuento }) => {
  const [datosEditados, setDatosEditados] = useState({
    Nombre: "",
    Descripcion: "",
    Porcentaje: 0,
  });

  useEffect(() => {
    if (descuento) {
      setDatosEditados({
        Nombre: descuento.Nombre || "",
        Descripcion: descuento.Descripcion || "",
        Porcentaje: descuento.Porcentaje || 0,
      });
    }
  }, [descuento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosEditados({ ...datosEditados, [name]: value });
  };

  const handleGuardarEdicion = async () => {
    try {
      const { Nombre, Descripcion, Porcentaje } = datosEditados;
      const url = `https://localhost:7147/descuentos/editar?Id=${
        descuento.Id
      }&Nombre=${encodeURIComponent(Nombre)}&Descripcion=${encodeURIComponent(
        Descripcion
      )}&Porcentaje=${Porcentaje}`;
      const response = await fetch(url, {
        method: "PUT",
        // Agregar más configuraciones de solicitud si es necesario (cabeceras, cuerpo, etc.)
      });

      // Manejar la respuesta, mostrar mensaje de éxito, o manejar errores
    } catch (error) {
      console.error("Error al guardar la edición del descuento:", error);
    }
  };

  return (
    <div className="formulario-registro">
      <label>
        Nombre:
        <input
          type="text"
          name="Nombre"
          value={datosEditados.Nombre}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Descripción:
        <input
          type="text"
          name="Descripcion"
          value={datosEditados.Descripcion}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Porcentaje:
        <input
          type="number"
          name="Porcentaje"
          value={datosEditados.Porcentaje}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit" onClick={handleGuardarEdicion}>
        Guardar Edición
      </button>
    </div>
  );
};

export default FormularioEditarDescuento;
