import React, { useState } from "react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import "./FormularioRegistroEntrenador.scss";
export default function FormularioRegistroEntrenador() {
  const [formEnviado, setFormEnviado] = useState(false); //estado para mostrar el mensaje de formulario enviado exitosamente
  return (
    <div className="formulario-registro">
      <Formik
        initialValues={{
          dni: "",
          nombre: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
          fechaNacimiento: "",
          email: "",
          fechaContratacion: "",
        }}
        validate={(valoresIngresados) => {
          let errores = {};
          // Validaciones para nombres

          if (!valoresIngresados.nombre) {
            errores.nombre = "Por favor ingresa el nombre";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valoresIngresados.nombre)) {
            errores.nombre =
              "El nombre solo puede contener letras y espacios en blanco";
          }
          // Validaciones para apellido paterno
          if (!valoresIngresados.apellidoPaterno) {
            errores.apellidoPaterno = "Por favor ingresa el primer apellido";
          } else if (
            !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valoresIngresados.apellidoPaterno)
          ) {
            errores.apellidoPaterno =
              "El primer apellido solo puede contener letras y espacios en blanco";
          }
          // Validaciones para apellido materno
          if (!valoresIngresados.apellidoMaterno) {
            errores.apellidoMaterno = "Por favor ingresa el segundo apellido";
          } else if (
            !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valoresIngresados.apellidoMaterno)
          ) {
            errores.apellidoMaterno =
              "El segundo nombre solo puede contener letras y espacios en blanco";
          }
          // Validaciones para fecha de nacimiento
          if (!valoresIngresados.fechaNacimiento) {
            errores.fechaNacimiento =
              "Por favor ingresa la fecha de nacimiento";
          } else if (
            !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(
              valoresIngresados.fechaNacimiento
            )
          ) {
            errores.fechaNacimiento =
              "La fecha de nacimiento debe tener el formato YYYY-MM-DD";
          }
          if (!valoresIngresados.fechaContratacion) {
            errores.fechaContratacion =
              "Por favor ingresa la fecha de contratación";
          } else if (
            !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(
              valoresIngresados.fechaContratacion
            )
          ) {
            errores.fechaContratacion =
              "La fecha de incorporación debe tener el formato YYYY-MM-DD";
          }
          // Validaciones para email
          if (!valoresIngresados.email) {
            errores.email = "Por favor ingresa el email";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              valoresIngresados.email
            )
          ) {
            errores.email = "Debe ingresar un correo válido";
          }

          return errores;
        }}
        onSubmit={async (values, { resetForm }) => {
          await new Promise((r) => setTimeout(r, 500));
          // Formatear la fecha en el formato "dd/MM/yyyy"
          const fechaNacimiento = new Date(
            values.fechaNacimiento
          ).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          const fechaContratacion = new Date(
            values.fechaContratacion
          ).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          // Realizar la conversión de valores del formulario a formato de Cliente
          const entrenador = {
            nombre: values.nombre,
            apellidoPaterno: values.apellidoPaterno,
            apellidoMaterno: values.apellidoMaterno,
            fechaNacimiento: fechaNacimiento,
            fechaContratacion: fechaContratacion,
            email: values.email,
          };

          // Realizar la solicitud POST con Axios
          axios
            .post("https://localhost:7147/entrenadores/crear", entrenador)
            .then((response) => {
              // Manejar la respuesta aquí si es necesario
              console.log("Respuesta del servicio:", response.data);
              // Mostrar un mensaje de éxito o realizar otras acciones después de la solicitud
              alert("Entrenador creado exitosamente");
              resetForm();
              setFormEnviado(true);
              setTimeout(() => {
                setFormEnviado(false);
              }, 1000);
            })
            .catch((error) => {
              // Manejar los errores de la solicitud aquí si es necesario
              console.error("Error al crear el entrenador:", error);
              alert("Hubo un error al crear el entrenador");
            });

          // Aquí puedes enviar el objeto "cliente" a tu API o realizar cualquier acción necesaria
          // en lugar de mostrarlo con un alert
          alert(JSON.stringify(entrenador, null, 2));
          resetForm();
          setFormEnviado(true);
          console.log("Valores del formulario entrenador", entrenador);
          setTimeout(() => {
            setFormEnviado(false);
          }, 1000);
        }}
      >
        {(
          { values, errors, touched, setFieldValue, resetForm } // Agregamos setFieldValue para actualizar "sexo"
        ) => (
          <Form>
            <label htmlFor="dni" className="label1">
              DNI:{" "}
            </label>
            <Field id="dni" name="dni" className="campo" />
            {errors.dni && touched.dni && (
              <div className="error-message">{errors.dni}</div>
            )}

            <label htmlFor="nombre" className="label1">
              Nombre:{" "}
            </label>
            <Field id="nombre" name="nombre" className="campo" />
            {errors.nombre && touched.nombre && (
              <div className="error-message">{errors.nombre}</div>
            )}

            <label htmlFor="apellidoPaterno" className="label1">
              Primer Apellido:{" "}
            </label>
            <Field
              id="apellidoPaterno"
              name="apellidoPaterno"
              className="campo"
            />
            {errors.apellidoPaterno && touched.apellidoPaterno && (
              <div className="error-message">{errors.apellidoPaterno}</div>
            )}

            <label htmlFor="apellidoMaterno" className="label1">
              Segundo Apellido:{" "}
            </label>
            <Field
              id="apellidoMaterno"
              name="apellidoMaterno"
              className="campo"
            />
            {errors.apellidoMaterno && touched.apellidoMaterno && (
              <div className="error-message">{errors.apellidoMaterno}</div>
            )}

            <div className="columna">
              <div>
                <label htmlFor="email" className="label2">
                  Email
                </label>
                <Field id="email" name="email" type="email" />
                {errors.email && touched.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              <div>
                <label htmlFor="turno" className="label2">
                  Turno
                </label>
                <select className="options">
                  <option value=""></option>
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noche">Noche</option>
                </select>
              </div>
            </div>

            <div className="columna">
              <div>
                <label htmlFor="fechaNacimiento" className="label2">
                  Fecha de Nacimiento:{" "}
                </label>
                <Field
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  type="date"
                  className="campo"
                />
                {errors.fechaNacimiento && touched.fechaNacimiento && (
                  <div className="error-message">{errors.fechaNacimiento}</div>
                )}
              </div>
              <div>
                <label htmlFor="fechaContratacion" className="label2">
                  Fecha de incorporación:{" "}
                </label>
                <Field
                  id="fechaContratacion"
                  name="fechaContratacion"
                  type="date"
                  className="campo"
                />
                {errors.fechaContratacion && touched.fechaContratacion && (
                  <div className="error-message">
                    {errors.fechaContratacion}
                  </div>
                )}
              </div>
            </div>

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
