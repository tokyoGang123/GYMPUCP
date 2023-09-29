import React, { useState } from "react";
import "./ListaClases.scss";
import FormularioRegistroClase from "../formulariosClases/FormularioRegistroClase";
import AnimatedOpenButton from "../modal/AnimatedOpenButton";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";
import FormularioBusquedaCliente from "../formulariosClases/FormularioBusquedaCliente";

const ListaClases = ({ elementos }) => {

  const [isAgregarClaseModalOpen, setIsAgregarClaseModalOpen] = useState(false);
  const [isBuscarClienteModalOpen, setIsBuscarClienteModalOpen] = useState(false);

  const openAgregarClaseModal = () => {
    setIsAgregarClaseModalOpen(true);
  };

  const openBuscarClienteModal = () => {
    setIsBuscarClienteModalOpen(true);
  };

  const closeAgregarClaseModal = () => {
    setIsAgregarClaseModalOpen(false);
  };

  const closeBuscarClienteModal = () => {
    setIsBuscarClienteModalOpen(false);
  };

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const hoursOfDay = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'];
  const classes = [
    { name: 'Smart Bike', instructor: 'John Doe', capacity: 10, duration: 60 },
    { name: 'Zumba', instructor: 'Jane Smith', capacity: 15, duration: 60 },
    { name: 'Abdominal', instructor: 'Alice Johnson', capacity: 8, duration: 30 },
    { name: 'Jumbo', instructor: 'Bob Williams', capacity: 12, duration: 45 },
  ];

  const [diaSeleccionado, setDiaSeleccionado] = useState(null);

  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const handleClickDia = (indice) => {
    setDiaSeleccionado(indice);
  };

  const horas = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM"];

  const clases = [
    {
      nombre: "Clase de Yoga",
      inscritos: 15,
      entrenador: "Juan Pérez",
    },
    {
      nombre: "Clase de Pilates",
      inscritos: 10,
      entrenador: "María Rodríguez",
    },
    {
      nombre: "Clase de Spinning",
      inscritos: 20,
      entrenador: "Saul Goodman",
    },
    {
      nombre: "Clase de Cardio",
      inscritos: 10,
      entrenador: "Walter White",
    },
    {
      nombre: "Clase de Pilates",
      inscritos: 10,
      entrenador: "María Rodríguez",
    },
    // Agrega más clases según sea necesario
  ];

  const duraciones = ["1 hora", "1 hora", "1 hora", "1 hora", "1 hora"];

  const [asistencias, setAsistencias] = useState(
    Array(5).fill("Asistencia") // Inicialmente, todas las asistencias dicen "Asistencia"
  );

  const [inscripciones, setInscripciones] = useState(
    Array(5).fill("Inscribir") // Inicialmente, todas las asistencias dicen "Asistencia"
  );

  const handleAsistenciaClick = (index) => {
    // Aquí puedes agregar cualquier lógica adicional que desees al hacer clic en asistencia
    // En este caso, no cambiamos el estado de asistencia, pero puedes agregar lógica adicional aquí.
  };

  const handleInscripcionClick = (index) => {
    // Cuando se hace clic en un rectángulo de inscripción, establece mostrarModal en true
  };

  return (
    <div className="contenido-clases">
      <div className="titulo-clase">
        <h2>Horario de clases programadas</h2>
      </div>

      <div className="boton-agregar-clase">
        <button onClick={openAgregarClaseModal}> + Añadir clase</button>
      </div>
      {/*
    <div>
        <label>Filtrar por nombre: </label>
        <input
          type="text"
          placeholder=" Nombre"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />
      </div>
    */}

      <div className="container">
        <div className="rectangulo-grande">
          {diasSemana.map((dia, indice) => (
            <div
              key={dia.nombre}
              className="rectangulo-dia"
              style={{
                backgroundColor:
                  indice === diaSeleccionado ? "purple" : dia.color,
              }}
              onClick={() => handleClickDia(indice)}
            >
              {dia}
            </div>
          ))}
        </div>
      </div>  

      <div className="contenido">
        <div className="rectangulo-horas">
          {horas.map((hora) => (
            <div key={hora} className="rectangulo-hora">
              {hora}
            </div>
          ))}
        </div>    

        <div className="rectangulo-clases">
          {clases.map((clase, index) => (
            <div key={index} className="rectangulo-clase">
              <div className="nombre-clase">{clase.nombre}</div>
              <div className="inscritos">Inscritos: {clase.inscritos}</div>
              <div className="entrenador">Entrenador: {clase.entrenador}</div>
            </div>
          ))}
        </div>

        <div className="rectangulo-duraciones">
          {duraciones.map((duracion, index) => (
            <div key={index} className="rectangulo-duracion">
              {duracion}
            </div>
          ))}
        </div>

        <div className="rectangulo-asistencias">
          {asistencias.map((asistencia, index) => (
            <div key={index} className="rectangulo-asistencia" onClick={() => handleAsistenciaClick(index)}>
              {asistencia}
            </div>
          ))}
        </div>

        <div className="rectangulo-inscripciones">
          {inscripciones.map((inscripcion, index) => (
            <div key={index} className="rectangulo-inscripcion" onClick={() => openBuscarClienteModal()}>
              {inscripcion}
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Botón para abrir el modal */
        /*
        <AnimatedOpenButton handlClick={openModal}>
          Abrir Modal
        </AnimatedOpenButton>
        */}
        <Modal
          handleClose={closeAgregarClaseModal}
          isOpen={isAgregarClaseModalOpen}
          titulo={"Registrar clase"}
        >
          {/* Contenido del modal */}
          <FormularioRegistroClase />
        </Modal>

        <Modal
          handleClose={closeBuscarClienteModal}
          isOpen={isBuscarClienteModalOpen}
          titulo={"Buscar cliente"}
        >
          {/* Contenido del modal */}
          <FormularioBusquedaCliente />
        </Modal>
      </div>
    </div>
  );
};

export default ListaClases;
