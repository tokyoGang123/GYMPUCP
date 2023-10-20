import { Field, Form, Formik } from "formik";
import axios from "axios"
import React, {useState} from "react";

export default function FormularioEditarEntrenador({entrenador}) {

  const [success, setSuccess] = useState(false); // Estado para gestionar el éxito del envío
  console.log("first", entrenador);
  function convertirFecha(fecha) {
    const partes = 1;
    if (partes.length === 3) {
      const [dia, mes, anio] = partes;
      return `${anio}-${mes}-${dia}`;
    }
    // En caso de que la fecha no sea válida, puedes manejarlo aquí
    return "";
  }

  const fechaNacimientoFormik = convertirFecha(entrenador.fechaNacimiento);
  const fechaIncorporacionFormik = convertirFecha(entrenador.fechaIncorporacion);
  return (
    <div className="formulario-registro">
      <Formik
        initialValues={{
          dni: entrenador.dni || "",
          nombre: entrenador.nombre || "",
          apellidoPaterno: entrenador.apellidoPaterno || "",
          apellidoMaterno: entrenador.apellidoMaterno,
          fechaNacimiento: fechaNacimientoFormik || "",
          email: entrenador.email || "",
          fechaIncorporacion: fechaIncorporacionFormik || "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          // Formatear la fecha en el formato "dd/MM/yyyy"
          const fechaNacimiento = new Date(
            values.fechaNacimiento
          ).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          const fechaIncorporacion = new Date(
            values.fechaIncorporacion
          ).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          // Realizar la conversión de valores del formulario a formato de Cliente
          const entrenadorFormateado = {
            DNI: values.dni,
            Nombre: values.nombre,
            ApellidoPaterno: values.apellidoPaterno,
            ApellidoMaterno: values.apellidoMaterno,
            FechaNacimiento: values.fechaNacimiento,
            FechaIncorporacion: values.fechaIncorporacion,
            Email: values.email,
          };
          try {
            // Realiza la solicitud HTTP PUT para actualizar el cliente
            await axios.put(
              `https://localhost:7147/entrenadores/editar/${entrenador.id}`,
              entrenadorFormateado
            );
            setSuccess(true); // Establece el éxito del envío como verdadero
          } catch (error) {
            console.error("Error al actualizar el entrenador:", error);
            console.log("Datos dados:", entrenadorFormateado);
          } finally {
            setSubmitting(false);
          }
        }}

        >
        {(
          { isSubmitting, values, setFieldValue } // Agregamos setFieldValue para actualizar "sexo"
        ) => (
          <Form>

            <label htmlFor="dni" className="label1">DNI: </label>
            <Field id="dni" name="DNI" placeholder="DNI" className="campo" />

            <label htmlFor="nombre" className="label1" >Nombre: </label>
            <Field id="nombre" name="nombre" placeholder="Nombre" 
            className="campo"/>

            <label htmlFor="primerApellido" className="label1">Primer Apellido: </label>
            <Field
              id="primerApellido"
              name="apellidoPaterno"
              placeholder="Primer Apellido"
              className="campo"
            />

            <label htmlFor="segundoApellido" className="label1">Segundo Apellido: </label>
            <Field
              id="segundoApellido"
              name="apellidoMaterno"
              placeholder="Segundo Apellido"
              className="campo"
            />


            <div className="columna">
              <div>
                <label htmlFor="email" className="label2">
                  Email
                </label>
                <Field id="email" name="email" className= "campo-email"/>
                
              </div>

              <div>
                <label htmlFor="turno" className="label3">
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
                  
                />
                
              </div>
              <div>
                <label htmlFor="fechaContratacion" className="label2">
                  Fecha de incorporación:{" "}
                </label>
                <Field
                  id="fechaContratacion"
                  name="fechaIncorporacion"
                  type="date"
                  
                />
               
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}>Guardar</button>
            {success && <p>Cliente actualizado con éxito.</p>}

          </Form>
        )}
      </Formik>
    </div>
  );
}
