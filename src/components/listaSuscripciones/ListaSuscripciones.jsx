import React, { useState } from "react";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";
import FormularioTipoSuscripcion from "../formularioSuscripcion/FormularioTipoSuscripcion";
const ListaSuscripciones = ({ elementos }) => {
  // Estado para gestionar los filtros
  const [filtroFechaInicio, setFiltroFechaInicio] = useState("");
  const [filtroFechaFin, setFiltroFechaFin] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [elementosFiltrados, setElementosFiltrados] = useState(elementos); // Estado para almacenar elementos filtrados

  // Función para aplicar los filtros
  const aplicarFiltros = () => {
    const elementosFiltrados = elementos.filter((elemento) => {
      // En caso als fechas sean del tipo null, se les pone como ""
      elemento.fechaInicio = elemento.fechaInicio || "";
      elemento.fechaFin = elemento.fechaFin || "";
      // Convierte la fecha de inicio y fecha de fin en objetos Date
      const fechaInicioStr = elemento.fechaInicio; // Supongamos que fechaInicioStr es "15/09/2023"
      const fechaFinStr = elemento.fechaFin; // Supongamos que fechaFinStr es "20/09/2023"
      // Separar la fecha en día, mes y año
      const fechaInicioParts = fechaInicioStr.split("/"); // [ "15", "09", "2023" ]
      const fechaFinParts = fechaFinStr.split("/"); // [ "20", "09", "2023" ]
      // Crear una nueva cadena en formato "YYYY-MM-DD"
      const fechaInicioFormatted = `${fechaInicioParts[2]}-${fechaInicioParts[1]}-${fechaInicioParts[0]}`;
      const fechaFinFormatted = `${fechaFinParts[2]}-${fechaFinParts[1]}-${fechaFinParts[0]}`;
      const fechaInicio = new Date(fechaInicioFormatted);
      const fechaFin = new Date(fechaFinFormatted);

      const fechasDentroDelRango =
        (filtroFechaInicio === "" ||
          fechaInicio >= new Date(filtroFechaInicio)) &&
        (filtroFechaFin === "" || fechaFin <= new Date(filtroFechaFin));

      // Comprueba si el nombre, el estado y el tipo coinciden con los filtros
      const nombreCoincide =
        filtroNombre === ""
          ? true
          : elemento.nombre.toLowerCase().includes(filtroNombre.toLowerCase());

      //const estadoCoincide = elemento.estado == filtroEstado;
      const estadoCoincide =
        filtroEstado === "" ? true : parseInt(filtroEstado) === elemento.estado;
      console.log(
        "#####Vemos el valor y tipo de elemento.estado: ",
        elemento.estado,
        " - ",
        typeof elemento.estado
      );
      console.log(
        "#####Vemos el valor y tipo de filtroEstado: ",
        filtroEstado,
        " - ",
        typeof filtroEstado
      );

      return estadoCoincide && nombreCoincide && fechasDentroDelRango;
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
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function transformarFecha(fechaOriginal) {
    // Parsea la fecha original en un objeto Date
    var fechaObj = new Date(fechaOriginal);

    // Obtiene el nombre del mes en formato abreviado en mayúsculas
    var nombreMesAbreviado = fechaObj
      .toLocaleString("default", { month: "short" })
      .toUpperCase();

    // Obtiene el año
    var ano = fechaObj.getFullYear();

    // Combina el mes y el año en el formato deseado
    var fechaTransformada = nombreMesAbreviado + "-" + ano;

    return fechaTransformada;
  }
  const borrarElemento = (elementoId) => {
    const elementosActualizados = elementosFiltrados.filter(
      (elemento) => elemento.id !== elementoId
    );
    setElementosFiltrados(elementosActualizados);
  };
  return (
    <div className="contenido-clientes">
      <div className="titulo-cliente">
        <h2>Lista de Suscripciones</h2>
      </div>

      <div className="boton-agregar-cliente">
        <button onClick={openModal}>
          <b>+</b> Registrar Tipo Suscripción
        </button>
      </div>

      {}

      <div className="lista-filtros">
        <div>
          <label>Filtrar por nombre: </label>

          <input
            type="text"
            placeholder=" Nombre"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha de inicio: </label>
          <input
            type="date"
            value={filtroFechaInicio}
            placeholder="Filtrar por fecha de inicio"
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
            onChange={(e) => setFiltroEstado(parseInt(e.target.value))}
          >
            <option value="">Todos</option>
            <option value="1">Inactivo</option>
            <option value="2">Activo</option>
          </select>
        </div>

        <button onClick={aplicarFiltros}>Aplicar Filtros</button>
        <button onClick={mostrarListaCompleta}>Mostrar Lista Completa</button>
      </div>
      <table className="tabla-filtrada">
        <thead>
          <tr>
            <th>Tipo de Suscripción</th>
            <th>Fecha de inicio</th>
            <th>Fecha de Fin</th>
            <th>Cantidad de suscriptores</th>
            <th>Estado</th>
            <th>Precio base </th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {elementosFiltrados.map((elemento) => (
            <tr key={elemento.nombre}>
              <td>{elemento.nombre}</td>
              <td>{elemento.fechaInicio}</td>
              <td>{elemento.fechaFin}</td>
              <td>{elemento.cantidadSuscriptores}</td>
              <td>
                {/* Aplica la clase CSS condicionalmente */}
                <span className={elemento.estado == 1 ? "inactivo" : "activo"}>
                  {elemento.estado === 1 ? "Inactivo" : "Activo"}
                </span>
              </td>
              <td>S/. {elemento.precio}</td>
              <td>
                {/* Agrega las opciones que desees aquí */}
                <button className="lista-boton-perfil">
                  <Link to={`perfil/${elemento.id}`}>Editar</Link>
                </button>

                <button
                  className="lista-boton-borrar"
                  onClick={() => borrarElemento(elemento.id)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Modal
          handleClose={closeModal}
          isOpen={isModalOpen}
          titulo={"REGISTRAR TIPO DE SUSCRIPCION"}
        >
          {/* Contenido del modal */}
          <FormularioTipoSuscripcion />
        </Modal>
      </div>
    </div>
  );
};

export default ListaSuscripciones;
