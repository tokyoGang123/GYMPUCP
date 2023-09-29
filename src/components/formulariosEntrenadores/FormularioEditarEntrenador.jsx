import { Field, Form, Formik } from "formik";
import React from "react";

export default function FormularioEditarEntrenador() {
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
          sexo: "",
          fechaIncorporacion: ""
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {(
          { values, setFieldValue } // Agregamos setFieldValue para actualizar "sexo"
        ) => (
          <Form>

            <label htmlFor="dni">DNI: </label>
            <Field id="dni" name="dni" placeholder="DNI" />

            <label htmlFor="nombre">Nombre: </label>
            <Field id="nombre" name="nombre" placeholder="Nombre" />

            <label htmlFor="primerApellido">Primer Apellido: </label>
            <Field
              id="primerApellido"
              name="primerApellido"
              placeholder="Primer Apellido"
            />

            <label htmlFor="segundoApellido">Segundo Apellido: </label>
            <Field
              id="segundoApellido"
              name="segundoApellido"
              placeholder="Segundo Apellido"
            />


            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="correo@gmail.com"
              type="email"
            />

            <label htmlFor="turno">Turno</label>
            <Field
              id="turno"
              name="turno"
              placeholder="Turno"
            />


            <label htmlFor="fechaNacimiento">Fecha de Nacimiento: </label>
            <Field id="fechaNacimiento" name="fechaNacimiento" type="date" />

            <label htmlFor="fechaIncorporacion">Fecha de incorporación: </label>
            <Field id="fechaIncorporacion" name="fechaIncorporacion" type="date" />


            <button type="submit">Cancelar</button>
            <button type="submit">Guardar</button>

          </Form>
        )}
      </Formik>
    </div>
  );
}
