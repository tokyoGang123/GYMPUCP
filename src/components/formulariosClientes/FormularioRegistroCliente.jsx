  import React, { useState } from "react";
  import axios from "axios";
  import { Field, Form, Formik } from "formik";
  import "./FormularioRegistroCliente.scss";
  export default function FormularioRegistroCliente() {
    const [formEnviado, setFormEnviado] = useState(false); //estado para mostrar el mensaje de formulario enviado exitosamente

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
          validate={(valoresIngresados) => {
            let errores = {};
            // Validaciones para nombres
            if (!valoresIngresados.nombres) {
              errores.nombres = "Por favor ingresa el nombre";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valoresIngresados.nombres)) {
              errores.nombres =
                "El nombre solo puede contener letras y espacios en blanco";
            }
            // Validaciones para apellido paterno
            if (!valoresIngresados.apellidoPaterno) {
              errores.apellidoPaterno = "Por favor ingresa el apellido paterno";
            } else if (
              !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valoresIngresados.apellidoPaterno)
            ) {
              errores.apellidoPaterno =
                "El apellido paterno solo puede contener letras y espacios en blanco";
            }
            // Validaciones para apellido materno
            if (!valoresIngresados.apellidoMaterno) {
              errores.apellidoMaterno = "Por favor ingresa el apellido materno";
            } else if (
              !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valoresIngresados.apellidoMaterno)
            ) {
              errores.apellidoMaterno =
                "El apellido materno solo puede contener letras y espacios en blanco";
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
            // Validaciones para email
            if (!valoresIngresados.email) {
              errores.email = "Por favor ingresa el email";
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                valoresIngresados.email
              )
            ) {
              errores.correo = "Debe ingresar un correo válido";
            }
            // Validaciones para talla
            if (!valoresIngresados.talla) {
              errores.talla = "Por favor ingresa la talla";
            } else if (!/^\d{1,3}$/.test(valoresIngresados.talla)) {
              errores.talla = "La talla solo puede contener 3 digitos ";
            }
            // Validaciones para peso
            if (!valoresIngresados.peso) {
              errores.peso = "Por favor ingresa el peso";
            } else if (!/^\d{1,3}$/.test(valoresIngresados.peso)) {
              errores.peso = "El peso solo puede contener hasta 3 dígitos";
            }
            // Validaciones para sexo
            // Validaciones para sexo
            if (!valoresIngresados.sexo) {
              errores.sexo = "Por favor selecciona el sexo";
            } else if (
              valoresIngresados.sexo !== "Masculino" &&
              valoresIngresados.sexo !== "Femenino"
            ) {
              errores.sexo =
                "Por favor selecciona una opción válida para el sexo";
            }

            // Validaciones para teléfono
            if (!valoresIngresados.telefono) {
              errores.telefono = "Por favor ingresa el teléfono";
            } else if (!/^[0-9]{1,9}$/.test(valoresIngresados.telefono)) {
              errores.telefono = "El teléfono solo puede contener números";
            }
            // Validaciones para dirección
            if (!valoresIngresados.direccion) {
              errores.direccion = "Por favor ingresa la dirección";
            } else if (
              !/^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/.test(valoresIngresados.direccion)
            ) {
              errores.direccion =
                "La dirección solo puede contener letras, números y espacios en blanco";
            }

            // Validaciones para DNI
            if (!valoresIngresados.DNI) {
              errores.DNI = "Por favor ingresa el DNI";
            } else if (!/^[0-9]{1,9}$/.test(valoresIngresados.DNI)) {
              errores.DNI = "El DNI solo puede contener números";
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
            // Realizar la conversión de valores del formulario a formato de Cliente
            const cliente = {
              Nombre: values.nombres,
              ApellidoPaterno: values.apellidoPaterno,
              ApellidoMaterno: values.apellidoMaterno,
              Sexo: values.sexo === "Masculino" ? 1 : 2,
              FechaNacimiento: fechaNacimiento,
              Telefono: values.telefono,
              Direccion: values.direccion,
              Email: values.email,
              DNI: values.DNI,
            };

            // Realizar la solicitud POST con Axios
            axios
              .post("https://localhost:7147/clientes/crear", cliente)
              .then((response) => {
                // Manejar la respuesta aquí si es necesario
                console.log("Respuesta del servicio:", response.data);
                // Mostrar un mensaje de éxito o realizar otras acciones después de la solicitud
                alert("Cliente creado exitosamente");
                resetForm();
                setFormEnviado(true);
                setTimeout(() => {
                  setFormEnviado(false);
                }, 1000);
              })
              .catch((error) => {
                // Manejar los errores de la solicitud aquí si es necesario
                console.error("Error al crear el cliente:", error);
                alert("Hubo un error al crear el cliente");
              });

            // Aquí puedes enviar el objeto "cliente" a tu API o realizar cualquier acción necesaria
            // en lugar de mostrarlo con un alert
            alert(JSON.stringify(cliente, null, 2));
            resetForm();
            setFormEnviado(true);
            console.log("Valores del formulario", cliente);
            setTimeout(() => {
              setFormEnviado(false);
            }, 1000);
          }}
        >
          {(
            { values, errors, touched, setFieldValue, resetForm } // Agregamos setFieldValue para actualizar "sexo"
          ) => (
            <Form>
              <label htmlFor="nombres">Nombres: </label>
              <Field id="nombres" name="nombres" placeholder="Nombre" />
              {errors.nombres && touched.nombres && (
                <div className="error-message">{errors.nombres}</div>
              )}

              <label htmlFor="apellidoPaterno">Apellido Paterno: </label>
              <Field
                id="apellidoPaterno"
                name="apellidoPaterno"
                placeholder="Apellido Paterno"
              />
              {errors.apellidoPaterno && touched.apellidoPaterno && (
                <div className="error-message">{errors.apellidoPaterno}</div>
              )}

              <label htmlFor="apellidoMaterno">Apellido Materno: </label>
              <Field
                id="apellidoMaterno"
                name="apellidoMaterno"
                placeholder="Apellido Materno"
              />
              {errors.apellidoMaterno && touched.apellidoMaterno && (
                <div className="error-message">{errors.apellidoMaterno}</div>
              )}

              <label htmlFor="talla">Talla: </label>
              <Field id="talla" name="talla" placeholder="-" />
              {errors.talla && touched.talla && (
                <div className="error-message">{errors.talla}</div>
              )}

              <label htmlFor="peso">Peso: </label>
              <Field id="peso" name="peso" placeholder="-" />
              {errors.peso && touched.peso && (
                <div className="error-message">{errors.peso}</div>
              )}

              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="correo@gmail.com"
                type="email"
              />
              {errors.email && touched.email && (
                <div className="error-message">{errors.email}</div>
              )}
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento: </label>
              <Field id="fechaNacimiento" name="fechaNacimiento" type="date" />
              {errors.fechaNacimiento && touched.fechaNacimiento && (
                <div className="error-message">{errors.fechaNacimiento}</div>
              )}
              <label htmlFor="telefono">Teléfono: </label>
              <Field id="telefono" name="telefono" placeholder="Teléfono" />
              {errors.telefono && touched.telefono && (
                <div className="error-message">{errors.telefono}</div>
              )}
              <label htmlFor="direccion">Dirección: </label>
              <Field id="direccion" name="direccion" placeholder="Dirección" />
              {touched.direccion && (
                <div className="error-message">{errors.direccion}</div>
              )}
              <label htmlFor="DNI">DNI: </label>
              <Field id="DNI" name="DNI" placeholder="DNI" />
              {errors.DNI && touched.DNI && (
                <div className="error-message">{errors.DNI}</div>
              )}

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
              {errors.sexo && touched.sexo && (
                <div className="error-message">{errors.sexo}</div>
              )}

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
