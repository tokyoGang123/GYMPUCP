import React from "react";
import { useLocation } from "react-router-dom";
import VistaPlanEntrenamiento from "../components/perfilCliente/VistaPlanEntrenamiento";
export default function PlanEntrenamiento() {
  const { state } = useLocation();
  const id = state && state.id;
  const idCliente = state && state.idCliente;
  const nombre = state && state.nombre;

  // Usa el ID en la lógica para cargar los detalles del plan con ese ID

  return (
    <div
      className="contenedor-plan-entrenamiento"
      style={{
        //border: "5px solid blue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <VistaPlanEntrenamiento id={id} idCliente={idCliente} nombre={nombre} />
    </div>
  );
}
