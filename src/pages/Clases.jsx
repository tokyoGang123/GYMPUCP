import React from "react";
import ListaClases from "../components/listaClases/ListaClases";
import elementos from "./dataClientes.json"; // Importa los datos desde el archivo JSON

export default function Clases() {
  return (
    <div className="clases">
      <ListaClases elementos={elementos} />
    </div>
  );
}
