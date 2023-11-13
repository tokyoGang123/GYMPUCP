import React, { useEffect, useState } from "react";
import listaEjercicios from "./dataEjercicios.json";
import "../styles/Ejercicios.scss";
import Modal from "../components/modal/Modal";
import CrearEjercicio from "../components/formularioEjercicios/CrearEjercicio";
import axios from "axios";

export default function Ejercicios() {
  const [tipoEjercicioSeleccionado, setTipoEjercicioSeleccionado] =
    useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const url = "https://localhost:7147/ejercicios/listar";

    axios
      .get(url)
      .then((response) => {
        // Almacena los datos en el estado
        setDatos(response.data);
        console.log("Respuesta del servidorrrrrrrrr:", response.data);
        console.log("Respuesta del servidorrrrrrrrr2:", listaEjercicios);
      })
      .catch((error) => {
        // Maneja los errores aquí
        console.error("Error al realizar la solicitud:", error);
      });
  }, []); // El se
  const tiposEjerciciosLocal = [
    { idTipoEjercicio: 1, nombre: "Piernas" },
    { idTipoEjercicio: 2, nombre: "Espalda" },
    { idTipoEjercicio: 3, nombre: "Bíceps" },
    { idTipoEjercicio: 4, nombre: "Tríceps" },
  ];

  const filtrarEjercicios = (idTipoEjercicio) => {
    setTipoEjercicioSeleccionado(
      tipoEjercicioSeleccionado === idTipoEjercicio ? null : idTipoEjercicio
    );
  };

  const ejerciciosFiltrados = listaEjercicios.filter((ejercicio) => {
    const cumpleFiltroTipo =
      !tipoEjercicioSeleccionado ||
      ejercicio.IdTipoEjercicio === tipoEjercicioSeleccionado;
    const cumpleFiltroBusqueda = ejercicio.Nombre.toLowerCase().includes(
      busqueda.toLowerCase()
    );
    return cumpleFiltroTipo && cumpleFiltroBusqueda;
  });

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="contenedor-pagina-ejercicios">
      <h3> Gestionar ejercicios</h3>
      <div className="contenedor-boton-crear-ejercicio">
        <div className="contenedor-buscador">
          <input
            type="text"
            placeholder="Buscar ejercicio por nombre"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
              marginLeft: "10px",
              width: "106%",
            }}
          />
        </div>
        <button className="boton-crear-ejercicio" onClick={openModal}>
          Crear ejercicio
        </button>
      </div>
      <div className="contenedor-menu-ejercicios">
        <ul className="menu-ejercicios">
          {tiposEjerciciosLocal.map((tipoEjercicio) => (
            <li key={tipoEjercicio.idTipoEjercicio}>
              <a
                onClick={() => filtrarEjercicios(tipoEjercicio.idTipoEjercicio)}
                className={
                  tipoEjercicio.idTipoEjercicio === tipoEjercicioSeleccionado
                    ? "active"
                    : ""
                }
              >
                {tipoEjercicio.nombre}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="contenedor-lista-ejercicios">
        <ul className="lista-ejercicios">
          {ejerciciosFiltrados.map((ejercicio) => (
            <li key={ejercicio.Id}>
              <a href="#">
                {ejercicio.Nombre}
                <img
                  src={ejercicio.imagen}
                  alt={ejercicio.Nombre}
                  style={{ width: "100px", height: "100px" }}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Modal
          handleClose={closeModal}
          isOpen={isModalOpen}
          titulo={"REGISTRAR NUEVO EJERCICIO"}
        >
          {/* Contenido del modal */}
          <CrearEjercicio />
        </Modal>
      </div>
    </div>
  );
}
