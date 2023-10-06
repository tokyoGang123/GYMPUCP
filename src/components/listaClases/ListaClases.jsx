import React, { useState } from "react";
import "./ListaClases.scss";
import FormularioRegistroClase from "../formulariosClases/FormularioRegistroClase";
import AnimatedOpenButton from "../modal/AnimatedOpenButton";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";
import ClasesSemanales from "../formulariosClases/ClasesSemanales";

const ListaClases = ({ elementos }) => {
  const [isAgregarClaseModalOpen, setIsAgregarClaseModalOpen] = useState(false);
  const [isBuscarClienteModalOpen, setIsBuscarClienteModalOpen] =
    useState(false);

  const openAgregarClaseModal = () => {
    setIsAgregarClaseModalOpen(true);
  };

  const closeAgregarClaseModal = () => {
    setIsAgregarClaseModalOpen(false);
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
      </div>
      {/*<h2>Horario</h2>*/}
      <ClasesSemanales></ClasesSemanales>
    </div>
  );
};

export default ListaClases;
