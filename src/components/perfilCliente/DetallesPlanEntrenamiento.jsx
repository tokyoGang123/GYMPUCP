import React from "react";
import EjercicioDetalle from "./EjercicioDetalle";
import axios from "axios";

export default function DetallesPlanEntrenamiento({ plan }) {
  if (!plan) {
    return null;
  }
  useEffect(() => {
    // Definir la URL y los datos a enviar
    const url = `https://localhost:7147/planesentrenamiento/listarporcliente?idCliente=${idCliente}`;
    const data = { idCliente: 1 };
    axios
      .get(url)
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        // Puedes hacer algo con la respuesta aquí
        setPlanesEntrenamiento(response.data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        // Manejar el error aquí
      });
  }, []); // El segundo parámetro [] indica que este efecto se ejecutará solo una vez, equivalente a componentDidMount en clases de React

  return (
    <div>
      <h2>Detalles del Plan de Entrenamiento</h2>
      <p>Nombre del Cliente: {plan.idCliente}</p>
      <p>Nombre del Plan: {plan.nombre}</p>
      <h3>Ejercicios:</h3>
      <ul>
        {plan.ejercicioPlanes.map((ejercicio) => (
          <EjercicioDetalle key={ejercicio.id} ejercicio={ejercicio} />
        ))}
      </ul>
    </div>
  );
}
