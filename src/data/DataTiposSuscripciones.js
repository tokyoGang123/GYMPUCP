// DataTiposSuscripciones.js

import axios from "axios";

const API_URL = "https://localhost:7147/tipo-suscripcion/listar";

// Función para obtener los datos de tipo suscripción
export async function obtenerTiposSuscripcion() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
}
