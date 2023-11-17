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
  const [pesoInicial, setPesoInicial] = useState(""); // Nuevo estado para el peso inicial  del plan
  const [error, setError] = useState("");
  const [fechaInicio, setFechaInicio] = useState(""); // Nuevo estado para la fecha de inicio del plan
  const [fechaFin, setFechaFin] = useState(""); // Nuevo estado para la fecha de fin del plan
  const [seriesInput, setSeriesInput] = useState(0);
  const [repeticionesInput, setRepeticionesInput] = useState(0);
  const [descansoInput, setDescansoInput] = useState(0);
  const [ejercicioInputs, setEjercicioInputs] = useState({});
  const [clientesLeidos, setClientesLeidos] = useState([]);
  console.log("adadasdasdasda", nombre);
  const urlGetClientes = "https://localhost:7147/clientes/listar";
  useEffect(() => {
    axios
      .get(urlGetClientes)
      .then((response) => {
        setClientesLeidos(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  console.log("tengooooooooo", clientesLeidos);
  const clienteEncontradoActual = clientesLeidos.find(
    (item) => item.id == idCliente
  );
  /* */
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
      if (
        !nuevoPlanNombre.trim() ||
        ejercicioPlanes.length === 0 ||
        !fechaInicio ||
        !fechaFin
      ) {
        setError("Por favor, completa todos los campos.");
        console.error("Por favor, completa todos los campos.");
        alert("Por favor, completa todos los campos.");
        return;
      }
      setError(""); // Limpiar el mensaje de error
      // Crear un nuevo plan con los ejercicios seleccionados
      const fechaFormateadaInicio = new Date(fechaInicio).toLocaleDateString(
        "en-GB"
      ); // Ajusta según el formato deseado
      const fechaFormateadaFin = new Date(fechaFin).toLocaleDateString("en-GB"); // Ajusta según el formato deseado
      const nuevoPlan = {
        id: 0,
        nombre: nuevoPlanNombre,
        pesoInicial: parseFloat(pesoInicial),
        //la fecha de inicio se debe de obtener del sistema y convertirse a string en formato dd/mm/yyyy, en la siguiente linea
        fechaInicio: fechaFormateadaInicio,
        //la fecha de fin se debe de obtener del sistema y convertirse a string en formato dd/mm/yyyy, en la siguiente linea
        fechaFin: fechaFormateadaFin,
        idCliente,
        ejercicioPlanes: ejercicioPlanes.map((ejercicioPlan) => ({
          idEjercicio: ejercicioPlan.idEjercicio,
          series: parseInt(
            ejercicioInputs[ejercicioPlan.idEjercicio]?.series || 0
          ),
          repeticiones:
            parseInt(
              ejercicioInputs[ejercicioPlan.idEjercicio]?.repeticiones
            ) || 0,
          descanso:
            parseFloat(ejercicioInputs[ejercicioPlan.idEjercicio]?.descanso) ||
            0,
        })),
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

      alert("Nuevo plan creado:", nuevoPlan);
      console.log("first alert", nuevoPlan);
      setNuevoPlanNombre("");
      setEjercicioPlanes([]);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          // Manejar el caso específico de ya haber un plan activo
          alert("Ya hay un plan activo para este cliente.");
        } else {
          // Manejar otros errores de respuesta del servidor
          alert("Error del servidor: " + error.response.data);
        }
      } else {
        // Manejar errores de red o cualquier otro tipo de error
        console.error("Error al crear el nuevo plan:", error.message);
      }
    }
  };
  if (!clienteEncontradoActual) {
    // Mientras clienteEncontradoActual no tenga valor, puedes mostrar un mensaje de carga
    return <p>Cargando...</p>;
  }
  // Si el ID es 0, mostrar la interfaz para crear un nuevo plan
  if (id === 0) {
    return (
      <div className="contenedor-vista-plan-entrenamiento">
        <h2 className="titulo-1">Detalles del Plan de Entrenamiento</h2>
        <div className="contenedor-vista-plan-entrenamiento-general">
          <div className="contenedor-vista-plan-entrenamiento-ejercicios">
            <div className="datos-cliente-plan">
              <p className="nombre-cliente">
                Cliente:{" "}
                <span className="borde-suave">
                  {clienteEncontradoActual.nombre}{" "}
                  {clienteEncontradoActual.apellidoPaterno}{" "}
                  {clienteEncontradoActual.apellidoMaterno}
                </span>
              </p>
              <label
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "rgb(0, 0, 0)",
                  marginTop: "2px",
                  textAlign: "left",
                }}
              >
                Nombre del Nuevo Plan:<br></br>
                <input
                  type="text"
                  value={nuevoPlanNombre}
                  onChange={(e) => setNuevoPlanNombre(e.target.value)}
                  style={{
                    border: "1px solid #766e6e",
                    padding: "0.2rem 1rem",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    width: "400px",
                  }}
                />
              </label>
              <label
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "rgb(0, 0, 0)",
                  marginTop: "2px",
                  textAlign: "left",
                }}
              >
                Peso inicial:<br></br>
                <input
                  type="text"
                  value={pesoInicial}
                  onChange={(e) => setPesoInicial(e.target.value)}
                  style={{
                    border: "1px solid #766e6e",
                    padding: "0.2rem 1rem",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    width: "100px",
                  }}
                />
                Kg
              </label>
              <label
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "rgb(0, 0, 0)",
                  marginTop: "2px",
                  textAlign: "left",
                }}
              >
                Fecha Inicio:<br></br>
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  style={{
                    border: "1px solid #766e6e",
                    padding: "0.2rem 1rem",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
              <label
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "rgb(0, 0, 0)",
                  marginTop: "2px",
                  textAlign: "left",
                }}
              >
                Fecha Fin:<br></br>
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  style={{
                    border: "1px solid #766e6e",
                    padding: "0.2rem 1rem",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </label>
            </div>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "rgb(0, 0, 0)",
              }}
            >
              Selecciona Ejercicios:
            </h2>
            <ul
              className="form-container"
              style={{ listStyleType: "none", padding: "1rem" }}
            >
              {ejercicios.map((ejercicio) => (
                <li key={ejercicio.id} className="form-item">
                  <label className="form-label">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={ejercicioPlanes.some(
                        (ejercicioPlan) =>
                          ejercicioPlan.idEjercicio === ejercicio.id
                      )}
                      onChange={() => {
                        setEjercicioPlanes((prev) =>
                          prev.some((p) => p.idEjercicio === ejercicio.id)
                            ? prev.filter((p) => p.idEjercicio !== ejercicio.id)
                            : [
                                ...prev,
                                {
                                  idEjercicio: ejercicio.id,
                                  series: seriesInput,
                                  repeticiones: repeticionesInput,
                                  descanso: descansoInput,
                                },
                              ]
                        );
                      }}
                    />

                    {/* Inputs al lado de cada checkbox */}
                    <input
                      type="text"
                      value={ejercicio.nombre}
                      className="numeric-input-name"
                      readOnly
                    />

                    <input
                      type="number"
                      value={ejercicioInputs[ejercicio.id]?.series || "Series"}
                      onChange={(e) =>
                        setEjercicioInputs((prev) => ({
                          ...prev,
                          [ejercicio.id]: {
                            ...prev[ejercicio.id],
                            series: e.target.value,
                          },
                        }))
                      }
                      placeholder="Series"
                      className="numeric-input"
                    />

                    <input
                      type="number"
                      value={
                        ejercicioInputs[ejercicio.id]?.repeticiones ||
                        "Repeticiones"
                      }
                      onChange={(e) =>
                        setEjercicioInputs((prev) => ({
                          ...prev,
                          [ejercicio.id]: {
                            ...prev[ejercicio.id],
                            repeticiones: e.target.value,
                          },
                        }))
                      }
                      placeholder="Repeticiones"
                      className="numeric-input"
                    />
                    <input
                      type="number"
                      value={
                        ejercicioInputs[ejercicio.id]?.descanso || "Descanso"
                      }
                      onChange={(e) =>
                        setEjercicioInputs((prev) => ({
                          ...prev,
                          [ejercicio.id]: {
                            ...prev[ejercicio.id],
                            descanso: e.target.value,
                          },
                        }))
                      }
                      placeholder="Descanso (seg)"
                      className="numeric-input"
                    />
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
      <h2 className="titulo-1">Detalles del Plan de Entrenamiento</h2>
      <div className="contenedor-vista-plan-entrenamiento-general">
        <div className="contenedor-vista-plan-entrenamiento-ejercicios">
          <div className="datos-cliente-plan">
            <p className="nombre-cliente">
              Cliente:{" "}
              <span className="borde-suave">
                {clienteEncontradoActual.nombre}{" "}
                {clienteEncontradoActual.apellidoPaterno}{" "}
                {clienteEncontradoActual.apellidoMaterno}
              </span>
            </p>
            <p className="nombre-plan">
              Nombre del plan: <span className="borde-suave">{nombre}</span>
            </p>
          </div>
          <ul className="un-contenedor-lista-ejercicios">
            {ejercicioPlanes.map((ejercicio, index) => {
              const ejercicioEncontrado = ejercicios.find(
                (e) => e.id === ejercicio.idEjercicio
              );

              return (
                <li
                  key={index}
                  style={{
                    padding: "15px",
                    marginBottom: "15px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {ejercicioEncontrado && (
                    <>
                      <p style={{ width: "25%", margin: "0 0 5px" }}>
                        <b> {ejercicioEncontrado.nombre}</b>
                      </p>
                      <p style={{ width: "25%", margin: "0 0 5px" }}>
                        <b>{ejercicio.series} </b> series
                      </p>
                      <p style={{ width: "25%", margin: "0 0 5px" }}>
                        <b>{ejercicio.repeticiones}</b> repeticiones
                      </p>
                      <p style={{ width: "25%", margin: "0 0 5px" }}>
                        Descanso: <b>{ejercicio.descanso}</b> seg
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
