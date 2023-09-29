import { Field, Form, Formik } from "formik";
import axios from "axios";
import React, { useState } from "react";

export default function FormularioEditarCliente({ cliente }) {
  const [success, setSuccess] = useState(false); // Estado para gestionar el éxito del envío
  console.log("first", cliente);
  function convertirFecha(fecha) {
    const partes = fecha.split("/");
    if (partes.length === 3) {
      const [dia, mes, anio] = partes;
      return `${anio}-${mes}-${dia}`;
    }
    // En caso de que la fecha no sea válida, puedes manejarlo aquí
    return "";
  }
  const fechaNacimientoFormik = convertirFecha(cliente.fechaNacimiento);
  return (
    <div className="formulario-registro">
      <Formik
        initialValues={{
          nombres: cliente.nombre || "",
          apellidoPaterno: cliente.apellidoPaterno || "",
          apellidoMaterno: cliente.apellidoMaterno || "",
          fechaNacimiento: fechaNacimientoFormik || "",
          telefono: cliente.telefono || "",
          email: cliente.email || "",
          direccion: cliente.direccion || "",
          DNI: cliente.dni || "",
          talla: cliente.talla || "",
          peso: cliente.peso || "",
          sexo: cliente.sexo === 1 ? "Masculino" : "Femenino" || "",
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
          // Realizar la conversión de valores del formulario a formato de Cliente
          const clienteFormateado = {
            Nombre: values.nombres,
            ApellidoPaterno: values.apellidoPaterno,
            ApellidoMaterno: values.apellidoMaterno,
            Sexo: values.sexo === "Masculino" ? 1 : 2,
            FechaNacimiento: fechaNacimiento,
            Telefono: values.telefono,
            Direccion: values.direccion,
            Email: values.email,
            DNI: values.DNI,
            Talla: values.talla,
            Peso: values.peso,
          };
          try {
            // Realiza la solicitud HTTP PUT para actualizar el cliente
            await axios.put(
              `https://localhost:7147/clientes/editar/${cliente.id}`,
              clienteFormateado
            );
            setSuccess(true); // Establece el éxito del envío como verdadero
          } catch (error) {
            console.error("Error al actualizar el cliente:", error);
            console.log("Datos dados:", clienteFormateado);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <label htmlFor="nombres">Nombres: </label>
            <Field id="nombres" name="nombres" placeholder="Nombre" />

            <label htmlFor="apellidoPaterno">Apellido Paterno: </label>
            <Field
              id="apellidoPaterno"
              name="apellidoPaterno"
              placeholder="Apellido Paterno"
            />

            <label htmlFor="apellidoMaterno">Apellido Materno: </label>
            <Field
              id="apellidoMaterno"
              name="apellidoMaterno"
              placeholder="Apellido Materno"
            />
            <label htmlFor="DNI">DNI: </label>
            <Field id="DNI" name="DNI" placeholder="DNI" />
            <label htmlFor="telefono">Teléfono: </label>
            <Field id="telefono" name="telefono" placeholder="Teléfono" />
            <label htmlFor="talla">Talla (cm): </label>
            <Field id="talla" name="talla" placeholder="-" />
            <label htmlFor="direccion">Dirección: </label>
            <Field id="direccion" name="direccion" placeholder="Dirección" />

            <label htmlFor="peso">Peso (Kg): </label>
            <Field id="peso" name="peso" placeholder="-" />

            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="correo@gmail.com"
              type="email"
            />
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento: </label>
            <Field id="fechaNacimiento" name="fechaNacimiento" type="date" />

            <div>
              <label>Sexo: </label>
              <div>
                <label>
                  <Field
                    type="radio"
                    name="sexo"
                    value="Masculino"
                    checked={values.sexo === "Masculino"}
                    onChange={() => setFieldValue("sexo", "Masculino")}
                  />
                  Masculino
                </label>
              </div>
              <div>
                <label>
                  <Field
                    type="radio"
                    name="sexo"
                    value="Femenino"
                    checked={values.sexo === "Femenino"}
                    onChange={() => setFieldValue("sexo", "Femenino")}
                  />
                  Femenino
                </label>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}>
              Guardar
            </button>
            {success && <p>Cliente actualizado con éxito.</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
