import React, { useEffect, useState } from "react";
import axios from "axios";
import elementos from "./dataEntrenadores.json"; // Importa los datos desde el archivo JSON
import ListaEntrenadores from "../components/listaEntrenadores/ListaEntrenadores";
const urlGetEntrenadores = "https://localhost:7147/entrenadores/listar";
export default function Entrenadores() {
  const [entrenadores, setEntrenadores] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get(urlGetEntrenadores)
      .then((response) => {
        setEntrenadores(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  console.log("-------------------------------------------");
  console.log("Estos son los datos leidos desde el JSON: ", entrenadores);
  console.log("-------------------------------------------");
  return (
    <div className="entrenadores">
      <ListaEntrenadores elementos={elementos} />
      {/* <ListaClientes elementos={clientes} /> */}
    </div>
  );
}
