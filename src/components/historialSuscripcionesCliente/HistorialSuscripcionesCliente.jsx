import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { obtenerTiposSuscripcion } from "../../data/DataTiposSuscripciones";
import "./HistorialSuscripcionesCliente.scss";
//Este componente mostrar el historial de suscripciones de un cliente en particular
//del siguiente api : https://localhost:7147/clientes/historial-suscripciones/idCLiente

export default function HistorialSuscripcionesCliente() {
  const params = useParams();
  const idCliente = params.id;
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState(null);
  const [suscripcionesLeidas, setSuscripcionesLeidas] = useState([]); // Estado para almacenar los clientes leídos desde el JSON
  const [tiposSuscripcion, setTiposSuscripcion] = useState([]);
  // Estado para gestionar los filtros
  const [filtroFechaInicio, setFiltroFechaInicio] = useState("");
  const [filtroFechaFin, setFiltroFechaFin] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [elementosFiltrados, setElementosFiltrados] =
    useState(suscripcionesLeidas);
  const urlGetSuscripcionesCliente = `https://localhost:7147/clientes/historial-suscripciones/${idCliente}`;
  useEffect(() => {
    axios
      .get(urlGetSuscripcionesCliente)
      .then((response) => {
        setSuscripcionesLeidas(response.data);
      })
      .catch((error) => {
        setError(error);
      });

    // Llama a la función obtenerTiposSuscripcion
    obtenerTiposSuscripcion()
      .then((tiposSuscripcion) => {
        setTiposSuscripcion(tiposSuscripcion);
      })
      .catch((error) => {
        console.error("Error al obtener tipos de suscripción:", error);
      });
  }, []);
  /********************** */
  /*CLIENTES*/
  const urlGetCliente = `https://localhost:7147/clientes/${idCliente}`;

  useEffect(() => {
    axios
      .get(urlGetCliente) // Utiliza el nuevo URL para obtener un solo cliente
      .then((response) => {
        setCliente(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [idCliente]); // Añade idCliente como dependencia para actualizar cuando cambie

  if (!cliente) {
    return <div>No se encontró el cliente.</div>;
  } else {
    console.log("cliente único traído", cliente);
    console.log("Tipos de suscripción:", tiposSuscripcion);
  }
  // Función para aplicar los filtros
  const aplicarFiltros = () => {
    const elementosFiltrados = suscripcionesLeidas.filter((elemento) => {
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
        filtroEstado === "" ? true : elemento.estado == filtroEstado;

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
    setElementosFiltrados(suscripcionesLeidas);
  };
  console.log("Filtrados:", elementosFiltrados);

  /** Obtener precio de acuerdo a l tipo de suscripcion */
  const obtenerPrecioPorTipoSuscripcion = (idTipoSuscripcion) => {
    // Busca el tipo de suscripción por su ID
    const tipoSuscripcion = tiposSuscripcion.find(
      (tipo) => tipo.id === idTipoSuscripcion
    );

    // Si se encuentra el tipo de suscripción, devuelve su precio, de lo contrario, devuelve un mensaje predeterminado
    return tipoSuscripcion ? tipoSuscripcion.precio : "No encontrado";
  };
  return (
    <div className="PerfilCliente">
      <div className="titulo-cliente">
        <h2>HISTORIAL DE SUSCRIPCIONES</h2>
        <h3>
          Cliente: {cliente.nombre} {cliente.apellidoPaterno}{" "}
          {cliente.apellidoMaterno}
        </h3>
      </div>

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
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="1">Inactivo</option>
            <option value="0">Activo</option>
          </select>
        </div>

        <button onClick={aplicarFiltros}>Aplicar Filtros</button>
        <button onClick={mostrarListaCompleta}>Mostrar Lista Completa</button>
      </div>
      <table className="tabla-filtrada">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Fecha Inicio</th>
            <th>Fecha de Fin</th>
            <th>Estado</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {elementosFiltrados.map((elemento) => (
            <tr key={elemento.id}>
              <td>{elemento.idTipoSuscripcion}</td>
              <td>{elemento.fechaInicio}</td>
              <td>{elemento.fechaFin}</td>
              <td>
                {/* Aplica la clase CSS condicionalmente */}
                <span className={elemento.estado == 1 ? "inactivo" : "activo"}>
                  {elemento.estado === 1 ? "Inactivo" : "Activo"}
                </span>
              </td>
              <td>
                {obtenerPrecioPorTipoSuscripcion(elemento.idTipoSuscripcion)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
