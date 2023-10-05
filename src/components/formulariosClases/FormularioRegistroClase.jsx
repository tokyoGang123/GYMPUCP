import React, { useState } from "react";
import axios from "axios";
import { Field, FieldArray, Form, Formik } from "formik";
import "./FormularioRegistroClases.scss";
import { InputLabel } from "@mui/material";
export default function FormularioRegistroClase() {
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const [formEnviado, setFormEnviado] = useState(false); //estado para mostrar el mensaje de formulario enviado exitosamente

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
              entrenador: "",
            },
          ],
        }}
        onSubmit={async (values, { resetForm }) => {
          await new Promise((r) => setTimeout(r, 500));
          // Formatear la fecha en el formato "dd/MM/yyyy"

          // Realizar la conversión de valores del formulario a formato de Cliente

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
              }), // Formato ISO
              horaInicio: sesion.horaInicio, // Mantener el mismo formato 'hh:mm'
              horaFin: sesion.horaFin, // Mantener el mismo formato 'hh:mm'
              idEntrenador: sesion.entrenador,
            })),
          };

          // Realizar la solicitud POST con Axios
          axios
            .post("https://localhost:7147/clases/crear-clase", clase)
            .then((response) => {
              // Manejar la respuesta aquí si es necesario
              console.log("Respuesta del servicio:", response.data);
              // Mostrar un mensaje de éxito o realizar otras acciones después de la solicitud
              alert("Clase creado exitosamente");
              resetForm();
              setFormEnviado(true);
              setTimeout(() => {
                setFormEnviado(false);
              }, 1000);
            })
            .catch((error) => {
              // Manejar los errores de la solicitud aquí si es necesario
              console.error("Error al crear la clase:", error);
              alert("Hubo un error al crear la clase");
            });

          // Aquí puedes enviar el objeto "cliente" a tu API o realizar cualquier acción necesaria
          // en lugar de mostrarlo con un alert
          alert(JSON.stringify(clase, null, 2));
          resetForm();
          setFormEnviado(true);
          console.log("Valores del formulario", clase);
          setTimeout(() => {
            setFormEnviado(false);
          }, 1000);
        }}
      >
        {(
          { values, setFieldValue } // Agregamos setFieldValue para actualizar "sexo"
        ) => (
          <Form>
            <label htmlFor="nombre">Nombre: </label>
            <Field id="nombre" name="nombre" placeholder="Nombre" />

            <label htmlFor="descripcion">Descripcion: </label>
            <Field
              id="descripcion"
              name="descripcion"
              placeholder="Descripción"
            />

            <label htmlFor="aforo">Aforo: </label>
            <Field id="aforo" name="aforo" placeholder="Aforo" />

            <FieldArray name="sesiones">
              {({ push, remove }) =>
                values.sesiones.map((sesion, index) => (
                  <div key={index} className="sesion">
                    <label htmlFor={`sesiones[${index}].fechaStr`}>
                      Fecha:
                    </label>
                    <Field name={`sesiones[${index}].fechaStr`} type="date" />

                    <label htmlFor={`sesiones[${index}].horaInicio`}>
                      Hora de inicio:
                    </label>
                    <Field name={`sesiones[${index}].horaInicio`} type="time" />

                    <label htmlFor={`sesiones[${index}].horaFin`}>
                      Hora de fin:
                    </label>
                    <Field name={`sesiones[${index}].horaFin`} type="time" />

                    <label htmlFor={`sesiones[${index}].entrenador`}>
                      Entrenador:
                    </label>
                    <Field
                      name={`sesiones[${index}].entrenador`}
                      placeholder="Entrenador"
                    />

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

            {/*<div>
              <InputLabel htmlFor="combo">Selecciona una opción: </InputLabel>
              <select id="combo" value={selectedOption} onChange={handleSelectChange}>
                <option value="">Selecciona una opción</option>
                <option value="opcion1">Opción 1</option>
                <option value="opcion2">Opción 2</option>
                <option value="opcion3">Opción 3</option>
              </select>
              <p>Seleccionaste: {selectedOption}</p>
        </div>*/}
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
