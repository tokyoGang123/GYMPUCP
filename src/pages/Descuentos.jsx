import React, { useEffect, useState } from "react";
import axios from "axios";
import elementos from "./dataClientes.json"; // Importa los datos desde el archivo JSON
import ListaClientes from "../components/listaClientes/ListaClientes";
import ListaDescuentos from "../components/listaDescuentos/ListaDescuentos";
const urlGetDescuentos = "https://localhost:7147/descuentos/listar-todos";

export default function Descuentos() {
  const [descuentos, setDescuentos] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get(urlGetDescuentos)
      .then((response) => {
        setDescuentos(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  console.log("-------------------------------------------");
  console.log("Estos son los datos leidos desde el JSON: ", descuentos);
  console.log("-------------------------------------------");
  return (
    <div className="clientes">
      <ListaDescuentos elementos={descuentos} />
      {/* <ListaClientes elementos={clientes} /> */}
    </div>
  );
}
