import React from "react";
import elementos from "./dataClientes.json"; // Importa los datos desde el archivo JSON
import ListaClientes from "../components/listaClientes/ListaClientes";
export default function Clientes() {
  return (
    <div className="clientes">
      <ListaClientes elementos={elementos} />
    </div>
  );
}
