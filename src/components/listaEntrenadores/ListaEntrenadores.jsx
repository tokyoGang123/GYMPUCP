import React, { useState } from "react";
import "./ListaEntrenadores.scss";
import FormularioRegistroEntrenadores from "../formulariosEntrenadores/FormularioRegistroEntrenador";
import FormularioEditarEntrenador from "../formulariosEntrenadores/FormularioEditarEntrenador";
import AnimatedOpenButton from "../modal/AnimatedOpenButton";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";
const ListaEntrenadores = ({ elementos }) => {
  // Estado para gestionar los filtros
  const [filtroFechaInicio, setFiltroFechaInicio] = useState("");
  const [filtroFechaFin, setFiltroFechaFin] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [elementosFiltrados, setElementosFiltrados] = useState(elementos); // Estado para almacenar elementos filtrados

  // Función para aplicar los filtros
  const aplicarFiltros = () => {
    const elementosFiltrados = elementos.filter((elemento) => {
      const fechaInicio = new Date(elemento.fechaInicio).getTime();
      const fechaFin = new Date(elemento.fechaFin).getTime();

      return (
        elemento.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
        elemento.estado.toString() === filtroEstado &&
        (filtroFechaInicio === "" ||
          fechaInicio >= new Date(filtroFechaInicio).getTime()) &&
        (filtroFechaFin === "" ||
          fechaFin <= new Date(filtroFechaFin).getTime())
      );
    });
    setElementosFiltrados(elementosFiltrados);
  };

  // Función para mostrar la lista completa
  const mostrarListaCompleta = () => {
    setFiltroNombre("");
    setFiltroEstado("");
    setFiltroFechaInicio("");
    setFiltroFechaFin("");
    setElementosFiltrados(elementos);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="contenido-entrenadores">
      <div className="titulo-entrenador">
        <h2>Lista de entrenadores</h2>
      </div>

      <div className="boton-agregar-entrenador">
        <button onClick={openModal}> + Añadir entrenador</button>
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

      
      <table className="tabla-filtrada">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Turno</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {elementos.map((elemento) => (
            <tr key={elemento.dni}>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.apellidoPaterno}</td>
              <td>{elemento.email}</td>
              <td>{elemento.turno}</td>
              <td>
                {/* Aplica la clase CSS condicionalmente */}
                <span className={elemento.estado === 1 ? "activo" : "inactivo"}>
                  {elemento.estado === 1 ? "Activo" : "Inactivo"}
                </span>
              </td>

              <td>
                {/* Agrega las opciones que desees aquí */}
                <button className="boton-editar">
                  <Link to={`perfil/${elemento.id}`}>Editar</Link>
                </button>

                <button className="boton-turno">Turno</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {/* Botón para abrir el modal */
        /*
        <AnimatedOpenButton handlClick={openModal}>
          Abrir Modal
        </AnimatedOpenButton>
        */}
        <Modal
          handleClose={closeModal}
          isOpen={isModalOpen}
          titulo={"REGISTRAR ENTRENADOR"}
        >
          {/* Contenido del modal */}
          <FormularioRegistroEntrenadores />
        </Modal>
      </div>
    </div>
  );
};

export default ListaEntrenadores;