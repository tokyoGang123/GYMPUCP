import React, { useEffect, useState } from "react";
import axios from "axios";
import elementos from "./dataClientes.json"; // Importa los datos desde el archivo JSON
import ListaClientes from "../components/listaClientes/ListaClientes";
const urlGetClientes = "https://localhost:7147/clientes/listar";
export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get(urlGetClientes)
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  console.log("Estos son los datos leidos desde el JSON: ", clientes);
  return (
    <div className="clientes">
      <ListaClientes elementos={clientes} />
      {/* <ListaClientes elementos={clientes} /> */}
    </div>
  );
}
/*

Primero tengo que instalar el paquete de axios
npm install axios
Segundo lo importo en el archivo donde lo voy a usar

*/