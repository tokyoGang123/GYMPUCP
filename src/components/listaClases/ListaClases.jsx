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

  return (
    <div className="contenido-clases">
      <div className="titulo-clase">
        <h2>Horario de clases programadas</h2>
      </div>

      <div className="boton-agregar-clase">
        <button onClick={openAgregarClaseModal}> + Añadir clase</button>
      </div>

      <div className="boton-inscribir-cliente">
        <button onClick={openBuscarClienteModal}> Inscribir</button>
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

      <div className="rectangulo-horas">
        {horas.map((hora) => (
          <div key={hora} className="rectangulo-hora">
            {hora}
          </div>
        ))}
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
