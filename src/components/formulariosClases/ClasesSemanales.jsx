import React, { useState } from "react";
import axios from "axios";
import SesionHorario from "../listaClases/SesionHorario";

function ClasesSemanales() {
  const [dataSesiones, setData] = useState([]);

  const handleButtonClick = (id) => {
    // Vamos a armar la petición GET de listar sesiones con un valo dinámico de id (que representa el día (0,1,2,3,4,5,6))
    const urlGetListarSesiones = `https://localhost:7147/clases/listar/sesiones?diaSemana=${id}`;

    // Realiza la solicitud GET al servicio
    axios
      .get(urlGetListarSesiones)
      .then((response) => {
        // Ordena los datos por hora de inicio antes de actualizar el estado
        const listaSesionesOrdenadas = response.data.sort((a, b) => {
          return a.horaInicio.localeCompare(b.horaInicio);
        });
        setData(listaSesionesOrdenadas); // Actualiza el estado con los datos ordenados
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
      });
  };

  return (
    <div>
      <h1>Clases Semanales</h1>
      <div>
        <button onClick={() => handleButtonClick(0)}>DOMINGO</button>
        <button onClick={() => handleButtonClick(1)}>LUNES</button>
        <button onClick={() => handleButtonClick(2)}>MARTES</button>
        <button onClick={() => handleButtonClick(3)}>MIÉRCOLES</button>
        <button onClick={() => handleButtonClick(4)}>JUEVES</button>
        <button onClick={() => handleButtonClick(5)}>VIERNES</button>
        <button onClick={() => handleButtonClick(6)}>SABADO</button>
      </div>
      <h2>Resultados:</h2>
      <ul>
        {dataSesiones.map((item) => (
          // Agregamos la propiedad "key" para que React pueda identificar cada elemento de la lista
          <SesionHorario sesion={item} />
        ))}
      </ul>
    </div>
  );
}

export default ClasesSemanales;
