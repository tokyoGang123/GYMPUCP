import React from "react";
import { useNavigate } from "react-router-dom";

import "./UnPlanEntrenamiento.scss";
export default function UnPlanEntrenamiento({ idCliente, plan }) {
  const { id, nombre, ejercicioPlanes } = plan;

  const navigate = useNavigate();
  const dataToSend = {
    id: plan.id,
    idCliente: idCliente,
    nombre: plan.nombre,
  };
  const handleVerClick = () => {
    //onPlanClick(); // You can call the function provided by the parent if necessary
    navigate(`/plan_entrenamiento`, { state: dataToSend }); // Use navigate to redirect to the '/plan_entrenamiento' route
  };
  return (
    <div className="unPlanEntrenamiento" onClick={handleVerClick}>
      <button className="ver-plan-entrenamiento" onl>
        <h3>{nombre}</h3> <h3>ver</h3>
      </button>
      <div></div>
    </div>
  );
}
