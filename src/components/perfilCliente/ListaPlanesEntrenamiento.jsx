import React, { useEffect, useState } from "react";
import axios from "axios";
import UnPlanEntrenamiento from "./UnPlanEntrenamiento";
import { useNavigate } from "react-router-dom";
import "./ListaPlanesEntrenamiento.scss";
export default function ListaPlanesEntrenamiento({ idCliente }) {
  const [planesEntrenamiento, setPlanesEntrenamiento] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  useEffect(() => {
    // Definir la URL y los datos a enviar
    const url = `https://localhost:7147/planesentrenamiento/listarporcliente?idCliente=${idCliente}`;
    axios
      .get(url)
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        // Puedes hacer algo con la respu esta aquí
        setPlanesEntrenamiento(response.data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        // Manejar el error aquí
      });
  }, []); // El segundo parámetro [] indica que este efecto se ejecutará solo una vez, equivalente a componentDidMount en clases de React
  const navigate = useNavigate();
  const dataToSend = {
    id: 0,
    idCliente: idCliente,
    nombre: "",
  };
  const handleVerClick = () => {
    //onPlanClick(); // You can call the function provided by the parent if necessary
    navigate(`/plan_entrenamiento`, { state: dataToSend }); // Use navigate to redirect to the '/plan_entrenamiento' route
  };
  return (
    // Tu componente React aquí
    // lA estructura del dato recibido es:
    <div className="contenedor-lista-planes-entrenamiento">
      <h4 className="subtitulo">Mis planes de entrenamiento</h4>
      ---------------------------------------------------------
      <ul>
        {planesEntrenamiento.map((plan) => (
          // Pasar el prop idCliente y plan al componente UnPlanEntrenamiento
          <UnPlanEntrenamiento
            key={plan.id}
            idCliente={idCliente}
            plan={plan}
          ></UnPlanEntrenamiento>
        ))}
      </ul>
      <ul>
        <button
          className="boton-crear-plan-entrenamiento"
          onClick={handleVerClick}
        >
          <h3>
            <b>Crear nuevo plan</b>
          </h3>
        </button>
      </ul>
    </div>
  );
}
