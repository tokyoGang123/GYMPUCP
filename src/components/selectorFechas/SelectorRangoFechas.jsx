import React, { useState } from "react";
import "./SelectorRangoFechas.css";
export default function SelectorRangoFechas() {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const manejarCambioFechaInicio = (e) => {
    const fecha = e.target.valueAsDate;
    setFechaInicio(fecha);
  };

  const manejarCambioFechaFin = (e) => {
    const fecha = e.target.valueAsDate;
    setFechaFin(fecha);
  };

  return (
    <div className="selector-fechas">
      <label>Fecha de inicio: </label>
      <input
        type="date"
        value={fechaInicio ? fechaInicio.toISOString().split("T")[0] : ""}
        onChange={manejarCambioFechaInicio}
      />
      <label>Fecha de fin: </label>
      <input
        type="date"
        value={fechaFin ? fechaFin.toISOString().split("T")[0] : ""}
        onChange={manejarCambioFechaFin}
        min={fechaInicio ? fechaInicio.toISOString().split("T")[0] : ""}
      />
    </div>
  );
}
