import React, { useState } from "react";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";
import FormularioDescuento from "../formularioDescuento/FormularioDescuento";
const ListaDescuentos = ({ elementos }) => {
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
        <h2>Lista de Descuentos</h2>
      </div>

      <div className="boton-agregar-cliente">
        <button onClick={openModal}>
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
                <button className="lista-boton-perfil">
                  {/*<Link to={`perfil/${elemento.id}`}>Perfil</Link>*/}
                  Editar
                </button>

                <button className="lista-boton-clases">
                  {/*<Link to={`lista-sesiones-cliente/${elemento.id}`}>
                    Clases
                  </Link> */}
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
          titulo={"CREAR DESCUENTO"}
              >
                  <FormularioDescuento />
          {/* Contenido del modal */}
          {/*<FormularioRegistroCliente />*/}
        </Modal>
      </div>
    </div>
  );
};
export default ListaDescuentos;
