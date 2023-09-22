import { Field, Form, Formik } from "formik";
import React from "react";

export default function FormularioEditarCliente() {
  return (
    <div className="formulario-registro">
      <Formik
        initialValues={{
          nombres: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
          fechaNacimiento: "",
          telefono: "",
          email: "",
          direccion: "",
          DNI: "",
          talla: "",
          peso: "",
          sexo: "",
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

            <label htmlFor="talla">Talla: </label>
            <Field id="talla" name="talla" placeholder="-" />

            <label htmlFor="peso">Peso: </label>
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

            <button type="submit">Guardar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
