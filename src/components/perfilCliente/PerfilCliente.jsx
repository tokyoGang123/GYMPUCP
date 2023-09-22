import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navBar/Navbar";
import dataClientes from "./clientes.json";
import "./PerfilCliente.scss";
export default function PerfilCliente() {
  const params = useParams();
  const idCliente = params.id;
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    // Buscar el cliente por ID en el JSON
    const clienteEncontrado = dataClientes.find(
      (item) => item.id === idCliente
    );

    if (clienteEncontrado) {
      setCliente(clienteEncontrado);
    }
  }, [idCliente, dataClientes]);

  // Renderizar el componente de perfil
  if (!cliente) {
    return <div>No se encontró el cliente.</div>;
  }
  return (
    <div className="PerfilCliente">
      <h2>Perfil del Cliente</h2>
      <button>Editar Cliente</button>

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
        <input type="text" value={cliente.DNI} readOnly />
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
        <label>Talla:</label>
        <input type="text" value={cliente.talla} readOnly />
      </div>

      <div>
        <label>Peso:</label>
        <input type="text" value={cliente.peso} readOnly />
      </div>
    </div>
  );
}
