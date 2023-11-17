import React, { useState, useEffect } from "react";
import axios from "axios";
import { Field, FieldArray, Form, Formik } from "formik";
import "./FormularioRegistroClases.scss";
import { InputLabel } from "@mui/material";

export default function FormularioRegistroClase() {
  const [entrenadores, setEntrenadores] = useState([]);
  const [formEnviado, setFormEnviado] = useState(false);

  useEffect(() => {
    // Obtener la lista de entrenadores desde tu API
    axios
      .get("https://localhost:7147/entrenadores/listar")
      .then((response) => {
        setEntrenadores(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de entrenadores:", error);
      });
  }, []);

  return (
    <div className="formulario-registro">
      <Formik
        initialValues={{
          nombre: "",
          descripcion: "",
          aforo: "",
          sesiones: [
            {
              fechaStr: "",
              horaInicio: "",
              horaFin: "",
              entrenador: "", // Campo para seleccionar el entrenador de esta sesión
            },
          ],
        }}
        onSubmit={async (values, { resetForm }) => {
          await new Promise((r) => setTimeout(r, 500));

          // Realizar la conversión de valores del formulario a formato de Clase
          const clase = {
            nombre: values.nombre,
            descripcion: values.descripcion,
            aforo: values.aforo,
            sesiones: values.sesiones.map((sesion) => ({
              ...sesion,
              fechaStr: new Date(sesion.fechaStr).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }),
              horaInicio: sesion.horaInicio,
              horaFin: sesion.horaFin,
              idEntrenador: sesion.entrenador,
            })),
          };

          // Realizar la solicitud POST con Axios
          axios
            .post("https://localhost:7147/clases/crear-clase", clase)
            .then((response) => {
              console.log("Respuesta del servicio:", response.data);
              alert("Clase creada exitosamente");
              resetForm();
              setFormEnviado(true);
              setTimeout(() => {
                setFormEnviado(false);
              }, 1000);
            })
            .catch((error) => {
              console.error("Error al crear la clase:", error);
              alert("Hubo un error al crear la clase");
            });

          alert(JSON.stringify(clase, null, 2));
          resetForm();
          setFormEnviado(true);
          console.log("Valores del formulario", clase);
          setTimeout(() => {
            setFormEnviado(false);
          }, 1000);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <label htmlFor="nombre">Nombre: </label>
            <Field id="nombre" name="nombre" placeholder="Nombre" />

            <label htmlFor="descripcion">Descripcion: </label>
            <Field id="descripcion" name="descripcion" placeholder="Descripción" />

            <label htmlFor="aforo">Aforo: </label>
            <Field id="aforo" name="aforo" placeholder="Aforo" />

            <FieldArray name="sesiones">
              {({ push, remove }) =>
                values.sesiones.map((sesion, index) => (
                  <div key={index} className="sesion">
                    <label htmlFor={`sesiones[${index}].fechaStr`}>Fecha:</label>
                    <Field name={`sesiones[${index}].fechaStr`} type="date" />

                    <label htmlFor={`sesiones[${index}].horaInicio`}>Hora de inicio:</label>
                    <Field name={`sesiones[${index}].horaInicio`} type="time" />

                    <label htmlFor={`sesiones[${index}].horaFin`}>Hora de fin:</label>
                    <Field name={`sesiones[${index}].horaFin`} type="time" />

                    <div>
                      <label htmlFor={`sesiones[${index}].entrenador`}>Entrenador:</label>
                      <select
                        id={`sesiones[${index}].entrenador`}
                        name={`sesiones[${index}].entrenador`}
                        value={sesion.entrenador}
                        onChange={(e) => setFieldValue(`sesiones[${index}].entrenador`, e.target.value)}
                      >
                        <option value="">Selecciona un entrenador</option>
                        {entrenadores.map((entrenador) => (
                          <option key={entrenador.id} value={entrenador.id}>
                            {entrenador.nombre} {entrenador.apellidoPaterno} {entrenador.apellidoMaterno}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Botones de agregar y eliminar */}
                    {index === values.sesiones.length - 1 && (
                      <button type="button" onClick={() => push({})}>
                        Agregar Sesión
                      </button>
                    )}

                    {index !== values.sesiones.length - 1 && (
                      <button type="button" onClick={() => remove(index)}>
                        Eliminar Sesión
                      </button>
                    )}
                  </div>
                ))
              }
            </FieldArray>

            <button type="submit">Guardar</button>
            {formEnviado && (
              <p className="exito">Formulario enviado exitosamente</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
