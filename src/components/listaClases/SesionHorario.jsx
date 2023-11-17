import React, { useState } from "react";
import "./SesionHorario.scss";
import Modal from "../modal/Modal";
import FormularioBusquedaCliente from "../formulariosClases/FormularioBusquedaCliente";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="fila-sesion">
      <div className="cuadro-hora">
        <p>{sesion.horaInicio}</p>
      </div>
      <div className="datos-principales-sesion">
        <h2>Nombre sesion - {sesion.nombreClase}</h2>
        <p>Inscritos: {sesion.cantidadInscritos}</p>
        <p>Aforo: {sesion.aforo}</p>
        <p>Entrenador: {sesion.nombreEntrenador}</p>
      </div>
      <div className="cuadro-duracion">
        <p>{sesion.duracion}</p>
      </div>
      <button className="boton-asistencia">Asistencia</button>

      <button className="boton-inscribir" onClick={() => openModal(sesion.id)}>
        Inscribir
      </button>

      <div>
        <Modal
          handleClose={closeModal}
          isOpen={isModalOpen}
          titulo={"REGISTRAR CLIENTE"}
        >
          {/* Contenido del modal */}
          <FormularioBusquedaCliente sesionId={sesion.id} />
        </Modal>
      </div>
      {/*<p>{sesion.fechaStr}</p>
      <p>{sesion.horaInicio}</p>
      <p>{sesion.horaFin}</p> */}
    </div>
  );
}
