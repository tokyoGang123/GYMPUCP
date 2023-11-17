import React, { useState } from "react";
import axios from "axios";

export default function FormularioDescuento() {
  const [formEnviado, setFormEnviado] = useState(false); // Estado para mostrar el mensaje de formulario enviado exitosamente
  const [valores, setValores] = useState({
    nombre: "",
    descripcion: "",
    porcentaje: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValores({
      ...valores,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, descripcion, porcentaje } = valores;

    // Realizar la solicitud POST con Axios
    axios
      .post(
        `https://localhost:7147/descuentos/crear?nombre=${nombre}&descripcion=${descripcion}&porcentaje=${porcentaje}`
      )
      .then((response) => {
        // Manejar la respuesta aquí si es necesario
        console.log("Respuesta del servicio:", response.data);
        // Mostrar un mensaje de éxito o realizar otras acciones después de la solicitud
        alert("Descuento creado exitosamente");
        setValores({
          nombre: "",
          descripcion: "",
          porcentaje: "",
        });
        setFormEnviado(true);
        setTimeout(() => {
          setFormEnviado(false);
        }, 1000);
      })
      .catch((error) => {
        // Manejar los errores de la solicitud aquí si es necesario
        console.error("Error al crear el descuento:", error);
        alert("Hubo un error al crear el descuento");
      });
  };

  return (
    <div className="formulario-registro">
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre: </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={valores.nombre}
          onChange={handleInputChange}
          placeholder="Nombre del descuento"
        />
        <label htmlFor="descripcion">Descripción: </label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          value={valores.descripcion}
          onChange={handleInputChange}
          placeholder="Descripción del descuento"
        />
        <label htmlFor="porcentaje">Porcentaje: </label>
        <input
          type="number"
          id="porcentaje"
          name="porcentaje"
          value={valores.porcentaje}
          onChange={handleInputChange}
          placeholder="Porcentaje del descuento"
        />
        %
        <br />
        <br />
        <button type="submit">Enviar</button>
        {formEnviado && (
          <p className="exito">Formulario enviado exitosamente</p>
        )}
      </form>
    </div>
  );
}
