import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ListaSesionesCliente.scss";
export default function ListaSesionesCliente() {
  const params = useParams();
  const idCliente = params.id;
  const [cliente, setCliente] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [sesionesLeidas, setSesionesLeidas] = useState([]); // Estado para almacenar los clientes leídos desde el JSON
  // Estado para gestionar los filtros
  const [filtroFechaInicio, setFiltroFechaInicio] = useState("");
  const [filtroFechaFin, setFiltroFechaFin] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [elementosFiltrados, setElementosFiltrados] = useState(sesionesLeidas);
  const [loading, setLoading] = useState(true); // Estado de carga
  const urlGetSesionesCliente = `https://localhost:7147/clases/listar-sesiones-clientes?idCliente=${idCliente}`;
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

  useEffect(() => {
    axios
      .get(urlGetSesionesCliente)
      .then((response) => {
        setSesionesLeidas(response.data);
        setLoading(false); // Marcar como cargado una vez que los datos estén disponibles
      })
      .catch((error) => {
        setError(error);
        setLoading(false); // Marcar como cargado en caso de error
      });
  }, []);
  // Simula una demora de carga de 2 segundos (ajusta el valor según sea necesario)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2000 milisegundos (2 segundos)
  }, []);
  // Renderizar solo cuando los datos estén disponibles y no haya errores
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los datos.</div>;
  }
  // Función para aplicar los filtros
  const aplicarFiltros = () => {
    const elementosFiltrados = sesionesLeidas.filter((elemento) => {
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
        filtroFechaInicio === "" || fechaInicio === new Date(filtroFechaInicio);

      // Comprueba si el nombre, el estado y el tipo coinciden con los filtros
      const nombreCoincide =
        filtroNombre === ""
          ? true
          : elemento.nombreClase
              .toLowerCase()
              .includes(filtroNombre.toLowerCase());
      return nombreCoincide && fechasDentroDelRango;
    });

    setElementosFiltrados(elementosFiltrados);
  };

  // Función para mostrar la lista completa
  const mostrarListaCompleta = () => {
    setFiltroNombre("");
    setFiltroFechaInicio("");
    setFiltroFechaFin("");
    setElementosFiltrados(sesionesLeidas);
  };
  console.log("Filtrados:", elementosFiltrados);

  return (
    <div className="PerfilCliente">
      {console.log("cleinteeeeee: ", cliente)}
      <h2>LISTA DE CLASES</h2>
      <h3>
        Cliente: {cliente.nombre} {cliente.apellidoPaterno}{" "}
        {cliente.apellidoMaterno}
      </h3>

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
          <button onClick={aplicarFiltros}>Aplicar Filtros</button>
        </div>
        <div>
          <button onClick={mostrarListaCompleta}>Mostrar Lista Completa</button>
        </div>
      </div>
      <table className="tabla-filtrada">
        <thead>
          <tr>
            <th>Clase</th>
            <th>Fecha</th>
            <th>Hora de Inicio</th>
            <th>Hora Fin</th>
            <th>Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {elementosFiltrados.map((elemento) => (
            <tr key={elemento.id}>
              <td>{elemento.nombreClase}</td>
              <td>{elemento.fechaSesion}</td>
              <td>{elemento.horaInicioSesion}</td>
              <td>{elemento.horaFinSesion}</td>
              <td>{elemento.asistio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
