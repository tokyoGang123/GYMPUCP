import { Field, Form, Formik } from "formik";
import axios from "axios"
import React, {useState, useEffect} from "react";
import "./listaAsistenciasEntrenador.scss";

export default function ListaAsistenciasEntrenador({entrenador}) {

  const [filtroFecha, setFiltroFecha] = useState(getFechaActual());
  const [asistencias, setAsistencias] = useState({});
  const [clickTime, setClickTime] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const diasSemana = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];
  const turnos = ['Mañana', 'Tarde', 'Noche'];
  const horarios = ['6:00 - 12:00', '12:00 - 18:00', '18:00 - 23:00'];

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


  const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()+1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Actualizar la hora actual
      const today = new Date();
      setCurrentTime(today.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);



  function getFechaActual() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day = today.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    return `${year}-${month}-${day}`;
  }



  const getFormattedDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}/${formattedMonth}`;
  };
  const generateWeek = (date) => {
    if (!(date instanceof Date)) {
      date = new Date();
    }
    const dayOfWeek = date.getDay();
    const startOfWeek = new Date(date);
    const diff = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    startOfWeek.setDate(date.getDate() - diff);

    const week = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      week.push(currentDate);
    }
    return week;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    return formattedTime;
  };

  const weekDays = generateWeek(new Date(filtroFecha));
  const handleAttendance = (day, turno) => {
    const updatedAsistencias = { ...asistencias };
    if (!updatedAsistencias[day]) {
      updatedAsistencias[day] = {};
    }
    updatedAsistencias[day][turno] = !updatedAsistencias[day][turno];
    setAsistencias(updatedAsistencias);
    if (!clickTime) {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
      setClickTime(formattedTime); 
    }
  };

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
            values.Contratacion
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
            FechaContratacion: values.fechaContratacion,
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
            <div className="contenedor-fecha">
                <label htmlFor="fechaFiltro" className="label2">
                  Fecha{" "}
                </label>
                <Field
                  id="fechaFiltro"
                  name="fechaFiltro"
                  value={filtroFecha}
                  type="date"
                  onChange={(e) => setFiltroFecha(e.target.value)}
                />   
            </div>
            <div className="dias">
              <div className="vacio"></div>
              {weekDays.map((day, index) => (
              <div key={index} >
                <button className={`dia ${isSameDay(day, filtroFecha) ? 
                  'current-day' : ''}`}>
                  {diasSemana[index]}
                </button>
                <div className="fecha">
                  {getFormattedDate(day)}
                </div>
              </div>
            ))}
            </div>
            <div>
            <table className="tabla-asistencias">
              
              <tbody>
                {turnos.map((turno, index) => (
                  <tr key={index}>
                    <div className="fila1">
                      <div className="labelTurno">{turno}</div>
                      <div className="labelHorario">{horarios[index]}</div>
                    </div>
                    {weekDays.map((day, index) => (
                      <td key={index}>
                        <button
                          className={asistencias[day]?.[turno] ? 'asistio' : 'falto'}
                          onClick={() => handleAttendance(day, turno)}
                        >
                          {asistencias[day]?.[turno] ? (
                            <div>
                              <div className="dot">
                                 <span className="material-icons"></span>
                                 
                              </div>
                              <div className="hora-actual">Llegada: {clickTime}</div>
                              </div>
                            ) : (
                              <div className="dot-with-dash"></div>
                            )}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>
            
            
              
            
          </Form>
        )}
      </Formik>
    </div>
  );
}
