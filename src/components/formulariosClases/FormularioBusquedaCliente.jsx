import React, { useState } from 'react';
import axios from "axios";
import "./FormularioBusquedaCliente.scss";

export default function FormularioBusquedaCliente({ sesionId }) {
  const [dni, setDNI] = useState('');
  const [resultado, setResultado] = useState(null);
  //const [sesionId, setSesionId] = useState(null); // Agrega el estado para el ID de la sesión

  const buscarPorDNI = async () => {
    try {
      const response = await axios.get(`https://localhost:7147/clientes/buscar-por-dni?dni=${dni}`);
      const cliente = response.data;
      console.log("Respuesta del servicio:", response.data);
      if (cliente) {
        console.log("Cliente encontrado:", cliente);
        setResultado(cliente);
      } else {
        setResultado(null);
        alert("No se encontró un cliente con el DNI ingresado.");
      }
    } catch (error) {
      console.error("Error al buscar cliente por DNI:", error);
      setResultado(null);
      alert("Ocurrió un error al buscar el cliente.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      buscarPorDNI();
    }
  };

  const registrarClienteEnClase = async () => {
    try {
      // Realiza una solicitud POST al servicio para registrar al cliente en la clase
      await axios.post(`https://localhost:7147/clases/registrar-cliente`, {
        idCliente: resultado.id, // Suponiendo que resultado contiene el cliente encontrado
        idSesion: sesionId // Reemplaza sesionId con el ID de la sesión correspondiente
      });
      
      alert("Cliente registrado en la clase correctamente.");
      // Puedes realizar otras acciones aquí, como actualizar el estado de tu componente.

    } catch (error) {
      console.error("Error al registrar al cliente en la clase:", error);
      alert("Ocurrió un error al registrar al cliente en la clase.");
    }
  };

  return (
    <div className="formulario-registro">
      <label htmlFor="dni">DNI:</label>
      <div>
        <input
          type="text"
          placeholder="Ingrese un DNI"
          value={dni}
          onChange={(e) => setDNI(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {resultado && (
          <div>
            <h2>Resultado:</h2>
            <p>Nombre: {resultado.nombre}</p>
            <p>Apellido: {resultado.apellidoPaterno} {resultado.apellidoMaterno}</p>
            {/* Agrega un campo para ingresar el ID de la sesión */}
            <button type="submit" onClick={registrarClienteEnClase}>Confirmar</button>
          </div>
        )}
      </div>
    </div>
  );
}
