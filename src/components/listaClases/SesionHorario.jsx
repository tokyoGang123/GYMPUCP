import React from "react";
import "./SesionHorario.scss";
export default function SesionHorario({ sesion }) {
  /*
    sesion ejemplo:
    {
    "id": 4,
    "fecha": "2023-10-03T00:00:00",
    "fechaStr": "03/10/2023",
    "horaInicio": "14:00",
    "horaFin": "14:45",
    "cantidadInscritos": 0,
    "duracion": "45 min",
    "aforo": 50,
    "nombreEntrenador": "Juan Diaz",
    "idEntrenador": 1,
    "idClase": 27
  },



    */
  return (
    <div className="fila-sesion">
      <div className="cuadro-hora">
        <p>{sesion.horaInicio}</p>
      </div>
      <div className="datos-principales-sesion">
        <h2>Nombre sesion - {sesion.id}</h2>
        <p>{sesion.cantidadInscritos}</p>
        <p>{sesion.aforo}</p>
        <p>{sesion.nombreEntrenador}</p>
      </div>
      <div className="cuadro-duracion">
        <p>{sesion.duracion}</p>
      </div>
      <button className="boton-inscribir">Asistencia</button>

      <button className="boton-asistencia">Inscribir</button>

      {/*<p>{sesion.fechaStr}</p>
      <p>{sesion.horaInicio}</p>
      <p>{sesion.horaFin}</p> */}
    </div>
  );
}
