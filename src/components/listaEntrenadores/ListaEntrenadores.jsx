import React, { useEffect, useState } from "react";
import "./ListaEntrenadores.scss";
import { Link, useParams } from "react-router-dom";
import FormularioRegistroEntrenadores from "../formulariosEntrenadores/FormularioRegistroEntrenador";
import FormularioEditarEntrenador from "../formulariosEntrenadores/FormularioEditarEntrenador";
import ListaAsistenciasEntrenador from "../asistenciaEntrenadores/listaAsistenciasEntrenador";
import AnimatedOpenButton from "../modal/AnimatedOpenButton";
import Modal1 from "../modal/Modal";
import Modal2 from "../modal/Modal";
import Modal3 from "../modal/ModalB";
import axios from "axios";

const ListaEntrenadores = ({ elementos }) => {
  // Estado para gestionar los filtros
  const params = useParams();
  const idEntrenador = params.id;
  const [entrenador, setEntrenador] = useState(null);
  const [entrenadorAEditar, setEntrenador2] = useState(null);
  const [entrenadoresLeidos, setEntrenadoresLeidos] = useState([]);
  const [error, setError] = useState(null);
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

  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);

  const openModal1 = () => {
    setIsModal1Open(true);
  };
  const openModal2 = () => {
    setIsModal2Open(true);
  };
  const openModal3 = () => {
    setIsModal3Open(true);
  };

  const closeModal1 = () => {
    setIsModal1Open(false);
  };

  const closeModal2 = () => {
    setIsModal2Open(false);
  };

  const closeModal3 = () => {
    setIsModal3Open(false);
  };

  useEffect(() => {
    const entrenadorEncontrado = entrenadoresLeidos.find(
      (item) => item.id == idEntrenador
    );

    if (entrenadorEncontrado) {
      setEntrenador(entrenadorEncontrado);
    }
  }, [idEntrenador, entrenadoresLeidos]);

  return (
    <div className="contenido-entrenadores">
      <div className="titulo-entrenador">
        <h2>Lista de entrenadores</h2>
      </div>

      <div className="boton-agregar-entrenador">
        <button onClick={openModal1}> + Añadir entrenador</button>
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
            <th>DNI</th>
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
            <tr key={elemento.id}>
              <td>{elemento.dni}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.apellidoPaterno}</td>
              <td>{elemento.email}</td>
              <td>
                {elemento.turno === 1
                  ? "Mañana"
                  : elemento.turno === 2
                  ? "Tarde"
                  : elemento.turno === 3
                  ? "Noche"
                  : ""}
              </td>

              <td>
                {/* Aplica la clase CSS condicionalmente */}
                <span className={elemento.estado !== 2 ? "Inactivo" : "Activo"}>
                  {elemento.estado !== 2 ? "Inactivo" : "Activo"}
                </span>
              </td>

              <td>
                {/* Agrega las opciones que desees aquí */}
                <button
                  className="boton-editar"
                  onClick={() => {
                    setEntrenador2(elemento);
                    openModal2();
                  }}
                >
                  Editar
                </button>

                <button
                  className="boton-turno"
                  onClick={() => {
                    setEntrenador2(elemento);
                    openModal3();
                  }}
                >
                  Asistencia
                </button>
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
        <Modal1
          handleClose={closeModal1}
          isOpen={isModal1Open}
          titulo={"REGISTRAR ENTRENADOR"}
        >
          {/* Contenido del modal */}
          <FormularioRegistroEntrenadores />
        </Modal1>

        <Modal2
          handleClose={closeModal2}
          isOpen={isModal2Open}
          titulo={"EDITAR ENTRENADOR"}
        >
          {/* Contenido del modal */}
          <FormularioEditarEntrenador entrenador={entrenadorAEditar} />
        </Modal2>

        <Modal3
          handleClose={closeModal3}
          isOpen={isModal3Open}
          titulo={
            entrenadorAEditar
              ? `Asistencia de ${entrenadorAEditar.nombre} ${entrenadorAEditar.apellidoPaterno}`
              : "Asistencia del Entrenador"
          }
        >
          {/* Contenido del modal */}
          <ListaAsistenciasEntrenador entrenador={entrenadorAEditar} />
        </Modal3>
      </div>
    </div>
  );
};

export default ListaEntrenadores;
