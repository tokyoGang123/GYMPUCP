import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../navBar/Navbar";
import dataClientes from "./clientes.json";
import "./PerfilCliente.scss";
import Modal from "../modal/Modal";
import FormularioRegistroCliente from "../formulariosClientes/FormularioRegistroCliente";
import FormularioEditarCliente from "../formulariosClientes/FormularioEditarCliente";
import Tab from "../Tabs/Tab.jsx";
import ListaPlanesEntrenamiento from "./ListaPlanesEntrenamiento.jsx";
const urlGetClientes = "https://localhost:7147/clientes/listar";

export default function PerfilCliente() {
  const params = useParams();
  const idCliente = params.id;
  const [cliente, setCliente] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [clientesLeidos, setClientesLeidos] = useState([]); // Estado para almacenar los clientes leídos desde el JSON
  useEffect(() => {
    axios
      .get(urlGetClientes)
      .then((response) => {
        setClientesLeidos(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Buscar el cliente por ID en el JSON
    //const clienteEncontrado = dataClientes.find(
    const clienteEncontrado = clientesLeidos.find(
      (item) => item.id == idCliente
    );

    if (clienteEncontrado) {
      setCliente(clienteEncontrado);
    }
    //}, [idCliente, dataClientes]);
  }, [idCliente, clientesLeidos]);

  // Renderizar el componente de perfil
  if (!cliente) {
    return <div>Cargando...</div>;
    //return <div>No se encontró el cliente.</div>;
  }
  return (
    <div className="contenedor-perfil-cliente">
      <div className="PerfilCliente">
        {console.log("cleinteeeeee: ", cliente)}
        <h2>Perfil del Cliente</h2>
        <div className="contenedor-botones">
          <div className="boton-agregar-cliente">
            <button onClick={openModal}> Editar Cliente</button>
          </div>
          <div className="boton-agregar-cliente">
            <button onClick={openModal}>
              {" "}
              <Link
                to={`/clientes/perfil/${cliente.id}/historial-suscripciones`}
              >
                Ver historial de suscripciones
              </Link>
            </button>
          </div>
        </div>

        <div>
          <label>Nombre completo:</label>
          <input
            type="text"
            value={`${cliente.nombre} ${cliente.apellidoPaterno} ${cliente.apellidoMaterno}`}
            readOnly
          />
        </div>

        <div>
          <label>DNI:</label>
          <input type="text" value={cliente.dni} readOnly />
        </div>

        <div>
          <label>Teléfono:</label>
          <input type="text" value={cliente.telefono} readOnly />
        </div>

        <div>
          <label>Correo electrónico:</label>
          <input type="text" value={cliente.email} readOnly />
        </div>

        <div>
          <label>Dirección:</label>
          <input type="text" value={cliente.direccion} readOnly />
        </div>

        <div>
          <label>Cumpleaños:</label>
          <input type="text" value={cliente.fechaNacimiento} readOnly />
        </div>

        <div>
          <label>Talla (cm):</label>
          <input type="text" value={cliente.talla} readOnly />
        </div>

        <div>
          <label>Peso (Kg):</label>
          <input type="text" value={cliente.peso} readOnly />
          {console.log("pesoooooooo:", typeof cliente.peso)}
          {console.log("nombre:", cliente.nombre)}
        </div>
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
            titulo={"EDITAR CLIENTE"}
          >
            {/* Contenido del modal */}
            <FormularioEditarCliente cliente={cliente} />
          </Modal>
        </div>
      </div>
      <div className="divider-vertical"></div>
      <div className="PerfilCliente-suscripciones">
        <Tab>
          <div label="Suscripción">
            Detalles de su Suscripciónactual y sus beneficios
          </div>
          <div label="Plan de entrenamiento">
            <ListaPlanesEntrenamiento
              idCliente={idCliente}
            ></ListaPlanesEntrenamiento>
          </div>
        </Tab>
      </div>
    </div>
  );
}
