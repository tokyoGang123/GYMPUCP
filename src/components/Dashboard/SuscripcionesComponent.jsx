import React, { useState } from "react";
import axios from "axios";

const SuscripcionesComponent = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [suscripciones, setSuscripciones] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedFechaInicio = formatDate(fechaInicio);
      const formattedFechaFin = formatDate(fechaFin);

      const response = await axios.get(
        `https://localhost:7147/clientes/listar-suscripciones-por-rango?fechaInicio=${formattedFechaInicio}&fechaFin=${formattedFechaFin}`
      );

      setSuscripciones(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}%2F${month}%2F${year}`;
  };

  return (
    <div>
      <h2>Suscripciones</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fecha de Inicio:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha de Fin:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>
        <button type="submit">Consultar Suscripciones</button>
      </form>

      {error && <div>Error al cargar las suscripciones</div>}

      <ul>
        {suscripciones.map((suscripcion) => (
          <li key={suscripcion.idTipoSuscripcion}>
            {`Tipo de Suscripción: ${suscripcion.tipoSuscripcion}, Cantidad: ${suscripcion.cantidad}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuscripcionesComponent;
