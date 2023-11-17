import React, { useState } from "react";
import axios from "axios";

export const CrearEjercicio = () => {
  const [nombre, setNombre] = useState("");
  const [idTipoEjercicio, setIdTipoEjercicio] = useState(0);
  const [series, setSeries] = useState(0);
  const [repeticiones, setRepeticiones] = useState(0);
  const [descanso, setDescanso] = useState(0);
  const [archivo, setArchivo] = useState(null);

  const handleFileChange = (event) => {
    setArchivo(event.target.files[0]);
  };

  const formDataToJson = (formData) => {
    const json = {};
    for (const [key, value] of formData.entries()) {
      json[key] = value;
    }
    return json; // Formato JSON legible con indentación
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("idTipoEjercicio", idTipoEjercicio);
    formData.append("series", series);
    formData.append("repeticiones", repeticiones);
    formData.append("descanso", descanso);
    formData.append("Archivo", archivo); // Asegúrate de que 'archivo' sea el archivo que deseas enviar

    //debugger;
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    const jsonData = formDataToJson(formData);
    console.log("Estoy enviando: ", jsonData);
    try {
      const response = await axios.post(
        "https://localhost:7147/ejercicios/crear",
        jsonData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Ejercicio</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Tipo de Ejercicio:</label>
          <input
            type="number"
            value={idTipoEjercicio}
            onChange={(e) => setIdTipoEjercicio(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>Series:</label>
          <input
            type="number"
            value={series}
            onChange={(e) => setSeries(e.target.value)}
          />
        </div>
        <div>
          <label>Repeticiones:</label>
          <input
            type="number"
            value={repeticiones}
            onChange={(e) => setRepeticiones(e.target.value)}
          />
        </div>
        <div>
          <label>Descanso:</label>
          <input
            type="number"
            value={descanso}
            onChange={(e) => setDescanso(e.target.value)}
          />
        </div>
        <div>
          <label>Archivo:</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
