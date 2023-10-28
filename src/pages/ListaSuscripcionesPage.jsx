import React, { useEffect, useState } from "react";
import axios from "axios";
import elementos from "./dataClientes.json"; // Importa los datos desde el archivo JSON
import ListaSuscripciones from "../components/listaSuscripciones/ListaSuscripciones";

const urlGetListaSucripciones =
  "https://localhost:7147/tipo-suscripcion/listar-todos";
export default function ListaSuscripcionesPage() {
  const [listaSuscripciones, setListaSuscripciones] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get(urlGetListaSucripciones)
      .then((response) => {
        setListaSuscripciones(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  console.log("-------------------------------------------");
  console.log(
    "Estos son los datos leidos desde el JSON suscrip: ",
    listaSuscripciones
  );
  console.log("-------------------------------------------");
  return (
    <div className="clientes">
      <ListaSuscripciones elementos={listaSuscripciones} />
      {/* <ListaClientes elementos={clientes} /> */}
    </div>
  );
}
