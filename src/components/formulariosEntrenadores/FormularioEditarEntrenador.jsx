import React, { useState } from "react";
import axios from "axios";

const CrearEjercicio = () => {
  const [nuevoEjercicio, setNuevoEjercicio] = useState({
    Nombre: "",
    IdTipoEjercicio: 0,
    Series: 0,
    Repeticiones: 0,
    Descanso: 0,
    Archivo: null,
  });
  const [mensaje, setMensaje] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevoEjercicio((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setNuevoEjercicio((prevState) => ({
      ...prevState,
      Archivo: event.target.files[0],
    }));
  };

  const handleCreateEjercicio = () => {
    const formData = new FormData();
    formData.append("Nombre", nuevoEjercicio.Nombre);
    formData.append("IdTipoEjercicio", nuevoEjercicio.IdTipoEjercicio);
    formData.append("Series", nuevoEjercicio.Series);
    formData.append("Repeticiones", nuevoEjercicio.Repeticiones);
    formData.append("Descanso", nuevoEjercicio.Descanso);
    formData.append("Archivo", nuevoEjercicio.Archivo);

    axios
      .post("https://localhost:7147/ejercicios/crear", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setMensaje("Ejercicio creado correctamente");
        setNuevoEjercicio({
          Nombre: "",
          IdTipoEjercicio: 0,
          Series: 0,
          Repeticiones: 0,
          Descanso: 0,
          Archivo: null,
        });
      })
      .catch((error) => {
        setMensaje("Error al crear el ejercicio");
      });
  };

  return (
    <div>
      <h2>Crear Nuevo Ejercicio</h2>
      <input
        type="text"
        placeholder="Nombre"
        name="Nombre"
        value={nuevoEjercicio.Nombre}
        onChange={handleInputChange}
      />
      {/* Agrega más campos de entrada para otros atributos del ejercicio */}
      <input type="file" name="Archivo" onChange={handleFileChange} />
      <button onClick={handleCreateEjercicio}>Crear Ejercicio</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CrearEjercicio;

{
  /*import React, { useState } from "react";
import axios from "axios";

const CrearEjercicio = () => {
  const [ejercicio, setEjercicio] = useState({
    Nombre: "",
    IdTipoEjercicio: 0,
    Series: 0,
    Repeticiones: 0,
    Descanso: 0,
    Archivo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEjercicio({ ...ejercicio, [name]: value });
  };

  const handleFileChange = (e) => {
    setEjercicio({ ...ejercicio, Archivo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Nombre", ejercicio.Nombre);
    formData.append("IdTipoEjercicio", ejercicio.IdTipoEjercicio);
    formData.append("Series", ejercicio.Series);
    formData.append("Repeticiones", ejercicio.Repeticiones);
    formData.append("Descanso", ejercicio.Descanso);
    formData.append("Archivo", ejercicio.Archivo);

    try {
      const response = await axios.post(
        "https://localhost:7147/ejercicios/crear",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Ejercicio creado:", response.data);
      // Manejo de la respuesta (redireccionar, mostrar mensajes, etc.)
    } catch (error) {
      console.error("Error al crear ejercicio:", error);
      // Manejo de errores (mostrar mensajes, etc.)
    }
  };

  return (
    <div>
      <h2>Crear Ejercicio</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="Nombre"
            value={ejercicio.Nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Tipo de Ejercicio:</label>
          <input
            type="number"
            name="IdTipoEjercicio"
            value={ejercicio.IdTipoEjercicio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Series:</label>
          <input
            type="number"
            name="Series"
            value={ejercicio.Series}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Repeticiones:</label>
          <input
            type="number"
            name="Repeticiones"
            value={ejercicio.Repeticiones}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descanso:</label>
          <input
            type="number"
            name="Descanso"
            value={ejercicio.Descanso}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Archivo (imagen):</label>
          <input type="file" name="Archivo" onChange={handleFileChange} />
        </div>
        <div>
          <button type="submit">Crear Ejercicio</button>
        </div>
      </form>
    </div>
  );
};

export default CrearEjercicio;
*/
}

{
  /*}
import { Field, Form, Formik } from "formik";
import axios from "axios";
import React, { useState } from "react";

export default function FormularioEditarEntrenador({ entrenador }) {
  const [success, setSuccess] = useState(false); // Estado para gestionar el éxito del envío
  console.log("first", entrenador);
  function convertirFecha(fecha) {
    const partes = fecha.split("/");
    if (partes.length === 3) {
      const [dia, mes, anio] = partes;
      return `${anio}-${mes}-${dia}`;
    }
    // En caso de que la fecha no sea válida, puedes manejarlo aquí
    return "";
  }

  const fechaNacimientoFormik = convertirFecha(entrenador.fechaNacimiento);
  const fechaIncorporacionFormik = convertirFecha(entrenador.fechaContratacion);
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
          fechaContratacion: fechaIncorporacionFormik || "",
          turno: entrenador.turno || "",
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
            values.fechaContratacion
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
            FechaNacimiento: fechaNacimiento,
            FechaContratacion: fechaIncorporacion,
            Email: values.email,
            Turno: values.turno,
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
            <label htmlFor="dni" className="label1">
              DNI:{" "}
            </label>
            <Field id="dni" name="dni" placeholder="DNI" className="campo" />

            <label htmlFor="nombre" className="label1">
              Nombre:{" "}
            </label>
            <Field
              id="nombre"
              name="nombre"
              placeholder="Nombre"
              className="campo"
            />

            <label htmlFor="primerApellido" className="label1">
              Primer Apellido:{" "}
            </label>
            <Field
              id="primerApellido"
              name="apellidoPaterno"
              placeholder="Primer Apellido"
              className="campo"
            />

            <label htmlFor="segundoApellido" className="label1">
              Segundo Apellido:{" "}
            </label>
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
                <Field id="email" name="email" className="campo-email" />
              </div>

              <div>
                <label htmlFor="turno" className="label3">
                  Turno
                </label>
                <Field as="select" className="options" id="turno" name="turno">
                  <option value=""></option>
                  <option value="1">Mañana</option>
                  <option value="2">Tarde</option>
                  <option value="3">Noche</option>
                </Field>
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
                <label htmlFor="fechaIncorporacion" className="label2">
                  Fecha de incorporación:{" "}
                </label>
                <Field
                  id="fechaIncorporacion"
                  name="fechaContratacion"
                  type="date"
                />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}>
              Guardar
            </button>
            {success && <p>Entrenador actualizado con éxito.</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
*/
}
