import React, { useState } from "react";
import "./ListaClientes.scss";
import FormularioRegistroCliente from "../formulariosClientes/FormularioRegistroCliente";
import FormularioEditarCliente from "../formulariosClientes/FormularioEditarCliente";
import AnimatedOpenButton from "../modal/AnimatedOpenButton";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";
const ListaClientes = ({ elementos }) => {
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
    <div className="contenido-clientes">
      <div className="titulo-cliente">
        <h2>Lista de Clientes</h2>
      </div>

      <div className="boton-agregar-cliente">
        <button onClick={openModal}> + Registrar Cliente</button>
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

      <div className="lista-filtros">
        <div>
          <label>Fecha de inicio: </label>
          <input
            type="date"
            placeholder="Filtrar por fecha de inicio"
            value={filtroFechaInicio}
            onChange={(e) => setFiltroFechaInicio(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha de fin: </label>
          <input
            type="date"
            placeholder="Filtrar por fecha de fin"
            value={filtroFechaFin}
            onChange={(e) => setFiltroFechaFin(e.target.value)}
          />
        </div>
        <div>
          <label>Filtrar por estado: </label>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
          {/*
        <input
          type="text"
          placeholder="Filtrar por estado"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        />
         */}
        </div>

        <button onClick={aplicarFiltros}>Aplicar Filtros</button>
        <button onClick={mostrarListaCompleta}>Mostrar Lista Completa</button>
      </div>
      <table className="tabla-filtrada">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombres</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {elementosFiltrados.map((elemento) => (
            <tr key={elemento.id}>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.telefono}</td>
              <td>
                {/* Aplica la clase CSS condicionalmente */}
                <span className={elemento.estado === 1 ? "activo" : "inactivo"}>
                  {elemento.estado === 1 ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td>{elemento.fechaInicio}</td>
              <td>{elemento.fechaFin}</td>
              <td>
                {/* Agrega las opciones que desees aquí */}
                <button className="boton-perfil">
                  <Link to={`perfil/${elemento.id}`}>Perfil</Link>
                </button>

                <button className="boton-clases">Clases</button>
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
          titulo={"REGISTRAR CLIENTE"}
        >
          {/* Contenido del modal */}
          <FormularioRegistroCliente />
        </Modal>
      </div>
    </div>
  );
};

export default ListaClientes;
