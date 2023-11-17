import React from "react";

export default function EjercicioDetalle({ ejercicio }) {
  const handleEliminarClick = () => {
    // Lógica para eliminar el ejercicio
    // Puedes utilizar algún estado global o una función que se pase como prop
  };

  return (
    <li>
      <p>ID del Ejercicio: {ejercicio.idEjercicio}</p>
      <button onClick={handleEliminarClick}>Eliminar Ejercicio</button>
    </li>
  );
}
