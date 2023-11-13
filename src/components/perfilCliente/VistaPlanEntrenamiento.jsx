import React, { useEffect, useState } from "react";
import UnPlanEntrenamiento from "./UnPlanEntrenamiento";
import axios from "axios";
import "./VistaPlanEntrenamiento.scss";
import ListaPlanesEntrenamiento from "./ListaPlanesEntrenamiento";
export default function VistaPlanEntrenamiento({ id, idCliente, nombre }) {
  const [planesEntrenamiento, setPlanesEntrenamiento] = useState([]);
  const [ejercicioPlanes, setEjercicioPlanes] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);
  const [nuevoPlanNombre, setNuevoPlanNombre] = useState(""); // Nuevo estado para el nombre del plan
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7147/planesentrenamiento/listarporcliente?idCliente=${idCliente}`
        );
        setPlanesEntrenamiento(response.data);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    fetchData();
  }, [idCliente]);

  useEffect(() => {
    const planSeleccionado = planesEntrenamiento.find((plan) => plan.id === id);
    setEjercicioPlanes((prevEjercicioPlanes) => {
      return planSeleccionado?.ejercicioPlanes || prevEjercicioPlanes;
    });
  }, [planesEntrenamiento, id]);

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7147/ejercicios/listar"
        );
        setEjercicios(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de ejercicios:", error);
      }
    };

    fetchEjercicios();
  }, []);

  const handleCrearNuevoPlan = async () => {
    try {
      // Validar que los campos no estén vacíos
      if (!nuevoPlanNombre.trim() || ejercicioPlanes.length === 0) {
        setError("Por favor, completa todos los campos.");
        console.error("Por favor, completa todos los campos.");
        alert("Por favor, completa todos los campos.");
        return;
      }
      setError(""); // Limpiar el mensaje de error
      // Crear un nuevo plan con los ejercicios seleccionados
      const nuevoPlan = {
        id: 0,
        nombre: nuevoPlanNombre,
        idCliente,
        ejercicioPlanes,
      };

      // Realizar la solicitud para crear el nuevo plan
      const response = await axios.post(
        "https://localhost:7147/planesentrenamiento/crear",
        nuevoPlan
      );

      console.log("Nuevo plan creado:", response.data);

      // Actualizar la lista de planes después de la creación del nuevo plan
      setPlanesEntrenamiento([...planesEntrenamiento, response.data]);
      console.log(
        "Al crear el nuevo plan, planesEntrenamiento:",
        response.data
      );
      setNuevoPlanNombre("");
      setEjercicioPlanes([]);
    } catch (error) {
      console.error("Error al crear el nuevo plan:", error);
    }
  };

  // Si el ID es 0, mostrar la interfaz para crear un nuevo plan
  if (id === 0) {
    return (
      <div className="contenedor-vista-plan-entrenamiento">
        <h2>Detalles del Plan de Entrenamiento</h2>
        <div className="contenedor-vista-plan-entrenamiento-general">
          <div className="contenedor-vista-plan-entrenamiento-ejercicios">
            <p style={{ marginBottom: "10px", fontSize: "16px" }}>
              ID del Cliente: {idCliente}
            </p>
            <label style={{ display: "block", marginBottom: "10px" }}>
              Nombre del Nuevo Plan:
              <input
                type="text"
                value={nuevoPlanNombre}
                onChange={(e) => setNuevoPlanNombre(e.target.value)}
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                  marginLeft: "0px",
                  width: "70%",
                }}
              />
            </label>
            <h3 style={{ marginBottom: "10px" }}>Selecciona Ejercicios:</h3>
            <ul style={{ listStyleType: "none", padding: "0" }}>
              {ejercicios.map((ejercicio) => (
                <li key={ejercicio.id} style={{ marginBottom: "5px" }}>
                  <label style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={ejercicioPlanes.some(
                        (ejercicioPlan) =>
                          ejercicioPlan.idEjercicio === ejercicio.id
                      )}
                      onChange={() => {
                        setEjercicioPlanes((prev) =>
                          prev.some((p) => p.idEjercicio === ejercicio.id)
                            ? prev.filter((p) => p.idEjercicio !== ejercicio.id)
                            : [...prev, { idEjercicio: ejercicio.id }]
                        );
                      }}
                      style={{
                        marginRight: "5px",
                        appearance: "none",
                        width: "20px",
                        height: "20px",
                        borderRadius: "5px",
                        border: "2px solid #3498db",
                        backgroundColor: ejercicioPlanes.some(
                          (p) => p.idEjercicio === ejercicio.id
                        )
                          ? "rgb(174, 129, 247)"
                          : "transparent",
                        cursor: "pointer",
                        outline: "none",
                        transition: "background-color 0.3s ease",
                      }}
                    />
                    {ejercicio.nombre}
                  </label>
                </li>
              ))}
            </ul>
            <button
              onClick={handleCrearNuevoPlan}
              style={{
                backgroundColor: "#ae81f7",
                color: "white",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "10px",
              }}
            >
              Crear Nuevo Plan
            </button>
            {error && (
              <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
            )}
          </div>
          <ListaPlanesEntrenamiento idCliente={idCliente} />

          {/*
        <ul>
          {planesEntrenamiento.map((plan) => (
            <UnPlanEntrenamiento
              className="un-plan-entrenamiento"
              key={plan.id}
              idCliente={idCliente}
              plan={plan}
            />
          ))}
        </ul> */}
        </div>
      </div>
    );
  }

  // Si el ID no es 0, mostrar los detalles del plan existente
  return (
    <div className="contenedor-vista-plan-entrenamiento">
      <h2>Detalles del Plan de Entrenamiento</h2>
      <div className="contenedor-vista-plan-entrenamiento-general">
        <div className="contenedor-vista-plan-entrenamiento-ejercicios">
          <p>
            <h3>Nombre del plan: {nombre}</h3>
          </p>
          <p>ID del Plan: {id}</p>
          <p>ID del Cliente: {idCliente}</p>
          <h3
            style={{ fontSize: "24px", color: "black", marginBottom: "10px" }}
          >
            Ejercicios:
          </h3>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {ejercicioPlanes.map((ejercicio, index) => {
              const ejercicioEncontrado = ejercicios.find(
                (e) => e.id === ejercicio.idEjercicio
              );

              return (
                <li
                  key={index}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    padding: "15px",
                    marginBottom: "15px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      margin: "0 0 10px",
                    }}
                  >
                   
                  </p>
                  {ejercicioEncontrado && (
                    <>
                      <h4 style={{ margin: "0 0 5px" }}>
                        Nombre: {ejercicioEncontrado.nombre}
                      </h4>
                      <p style={{ margin: "0 0 5px" }}>
                        Series: {ejercicioEncontrado.series}
                      </p>
                      <p style={{ margin: "0 0 5px" }}>
                        Repeticiones: {ejercicioEncontrado.repeticiones}
                      </p>
                      <p style={{ margin: "0 0 5px" }}>
                        Descanso: {ejercicioEncontrado.descanso}
                      </p>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <ListaPlanesEntrenamiento idCliente={idCliente} />
        {/*
         <ul>
          {planesEntrenamiento.map((plan) => (
            <UnPlanEntrenamiento
              className="un-plan-entrenamiento"
              key={plan.id}
              idCliente={idCliente}
              plan={plan}
            />
          ))}
        </ul> */}
      </div>
    </div>
  );
}
