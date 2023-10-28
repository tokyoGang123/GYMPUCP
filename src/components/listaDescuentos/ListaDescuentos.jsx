import React, { useState } from "react";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";
import FormularioDescuento from "../formularioDescuento/FormularioDescuento";
import FormularioEditarDescuento from "../formularioDescuento/FormularioEditarDescuento";
import FormularioBorrarDescuento from "../formularioDescuento/FormularioBorrarDescuento";
const ListaDescuentos = ({ elementos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modo, setModo] = useState("agregar"); // Modo por defecto: agregar
  const [idDescuento, setIdDescuento] = useState(null); // ID por defecto: null
  const openModal = (modo, idDescuento = null) => {
    setModo(modo);
    setIdDescuento(idDescuento); // Este ID puede ser el identificador del descuento a editar o borrar
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="contenido-clientes">
      <div className="titulo-cliente">
        <h2>Lista de Descuentos</h2>
      </div>

      <div className="boton-agregar-cliente">
        <button onClick={() => openModal("agregar")}>
          <b>+</b> Añadir descuento
        </button>
      </div>
      {}

      <table className="tabla-filtrada">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Porcentaje</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {elementos.map((elemento) => (
            <tr key={elemento.Id}>
              <td>{elemento.Nombre}</td>
              <td>{parseInt(elemento.Porcentaje)} %</td>
              <td>
                {/* Agrega las opciones que desees aquí */}
                <button
                  onClick={() => openModal("editar", elemento.Id)}
                  className="lista-boton-perfil"
                >
                  Editar
                </button>

                <button
                  onClick={() => openModal("borrar", elemento.Id)}
                  className="lista-boton-clases"
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
          titulo={
            modo === "agregar"
              ? "CREAR DESCUENTO"
              : modo === "editar"
              ? "EDITAR DESCUENTO"
              : "BORRAR DESCUENTO"
          }
        >
          {modo === "agregar" ? (
            <FormularioDescuento />
          ) : modo === "editar" ? (
            <FormularioEditarDescuento
              descuento={elementos.find(
                (descuento) => descuento.Id === idDescuento
              )}
            />
          ) : (
            <FormularioBorrarDescuento IdDescuento={idDescuento} />
          )}
        </Modal>
      </div>
    </div>
  );
};
export default ListaDescuentos;
