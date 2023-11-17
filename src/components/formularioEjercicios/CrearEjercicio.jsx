import React, { useState } from "react";
import "./CrearEjercicio.scss";
const CrearEjercicio = () => {
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    idTipoEjercicio: "",
    series: "",
    repeticiones: "",
    descanso: "",
    archivo: null,
  });
  const tiposEjerciciosLocal = [
    { idTipoEjercicio: 2, nombre: "Piernas" },
    { idTipoEjercicio: 3, nombre: "Espalda" },
    { idTipoEjercicio: 4, nombre: "Bíceps" },
    { idTipoEjercicio: 5, nombre: "Tríceps" },
  ];
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      archivo: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch("https://localhost:7147/ejercicios/crear", {
        method: "POST",
        body: data,
      });

      // Manejo de la respuesta del servidor si es necesario
      console.log("Respuesta del servidor:", response);
      alert("Ejercicio creado correctamente");
    } catch (error) {
      console.error("Hubo un error al enviar la solicitud:", error);
      alert("Error al crear el ejercicio");
    }
  };

  return (
    <form className="crear-ejercicio-form" onSubmit={handleSubmit}>
      {/* <label>Crear Nuevo Ejercicio</label>
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleInputChange}
        placeholder="ID"
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "16px",
          marginLeft: "10px",
          width: "100%",
        }}
      /> */}
      <label>Nombre del ejercicio:</label>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleInputChange}
        placeholder="Nombre"
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "16px",
          marginLeft: "10px",
          width: "100%",
        }}
      />
      <label htmlFor="idTipoEjercicio">Tipo de Ejercicio:</label>
      <select
        name="idTipoEjercicio"
        value={formData.idTipoEjercicio}
        onChange={handleInputChange}
        className="input-field"
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "16px",
          marginLeft: "10px",
          width: "106%",
        }}
      >
        <option value="">Seleccionar tipo</option>
        {tiposEjerciciosLocal.map((tipo) => (
          <option key={tipo.idTipoEjercicio} value={tipo.idTipoEjercicio}>
            {tipo.nombre}
          </option>
        ))}
      </select>
      <label>Series:</label>
      <input
        type="text"
        name="series"
        value={formData.series}
        onChange={handleInputChange}
        placeholder="Series"
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "16px",
          marginLeft: "10px",
          width: "100%",
        }}
      />
      <label>Repeticiones:</label>
      <input
        type="text"
        name="repeticiones"
        value={formData.repeticiones}
        onChange={handleInputChange}
        placeholder="Repeticiones"
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "16px",
          marginLeft: "10px",
          width: "100%",
        }}
      />
      <label>Descanso:</label>
      <input
        type="text"
        name="descanso"
        value={formData.descanso}
        onChange={handleInputChange}
        placeholder="Descanso (segundos)"
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "16px",
          marginLeft: "10px",
          width: "100%",
        }}
      />
      <label>Imagen:</label>
      <input
        type="file"
        name="archivo"
        onChange={handleFileChange}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "16px",
          marginLeft: "10px",
          width: "100%",
        }}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default CrearEjercicio;

{
  /*
import React, { useState } from 'react';

const CrearEjercicio = () => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    idTipoEjercicio: '',
    series: '',
    repeticiones: '',
    descanso: '',
    archivo: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      archivo: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('https://localhost:7147/ejercicios/crear', {
        method: 'POST',
        body: data,
      });

      // Manejo de la respuesta del servidor si es necesario
      console.log('Respuesta del servidor:', response);
    } catch (error) {
      console.error('Hubo un error al enviar la solicitud:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleInputChange}
        placeholder="ID"
      />
      
      <input
        type="file"
        name="archivo"
        onChange={handleFileChange}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default CrearEjercicio;

*/
}
{
  /* Resto de tus campos de formulario */
}
