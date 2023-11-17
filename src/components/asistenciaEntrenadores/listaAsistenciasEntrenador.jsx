import { Field, Form, Formik } from "formik";
import axios from "axios"
import React, {useState, useEffect} from "react";
import "./listaAsistenciasEntrenador.scss";

export default function ListaAsistenciasEntrenador({entrenador}) {

  const [asistenciasRegistradas, setAsistenciasRegistradas] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState(getFechaActual());
  const [asistencias, setAsistencias] = useState({});
  const [clickTime, setClickTime] = useState("");
  const [tableTime, setTableTime] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const diasSemana = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];
  const turnos = ['Mañana', 'Tarde', 'Noche'];
  const horarios = ['6:00 - 12:00', '12:00 - 18:00', '18:00 - 23:00'];
  const sonFechasIguales = (datetime, date) => {
    return datetime.toISOString().split('T')[0] === date.toISOString().split('T')[0];
  };

  const [success, setSuccess] = useState(false); // Estado para gestionar el éxito del envío
  //console.log("first", entrenador);
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
    clearInterval(interval)
    
    const fetchAsistencias = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7147/entrenadores/listar-asistencias?idEntrenador=${entrenador.id}`
        );
        console.log("Lista...", response);
        const asistenciasObtenidas = response.data;
        // Create a copy of the current state
        const asistenciasActualizadas = { ...asistencias };
        
        // Iterate over the obtained asistencias and update the state
        asistenciasObtenidas.forEach(asistencia => {
          const partes = asistencia.fechaAsistencia.split(/[/ ]+/);
          const fechaIntercambiada = `${partes[1]}/${partes[0]}/${partes[2]} ${partes[3]}`;

          let fechaAsistencia = new Date(fechaIntercambiada);

          let hora = fechaAsistencia.getHours();
          let minutos = fechaAsistencia.getMinutes();
          let horaLLegadaString = `${hora}:${minutos}`;
          
          fechaAsistencia.setHours(19, 0, 0, 0);

          const diaSemanaAsistencia = diasSemana[fechaAsistencia.getDay() - 1]; // -1 porque los días de la semana empiezan en 0
          const turnoAsistencia = asistencia.turno - 1;

          const key = `${fechaAsistencia.toString()}`;
          const key2 = `${turnos[turnoAsistencia]}`

        // Verificar que la asistencia sea válida antes de actualizar el estado

          if (!asistenciasActualizadas[key]){
            asistenciasActualizadas[key] = {};
          }
          if (!asistenciasActualizadas[key][key2]) {
            asistenciasActualizadas[key][key2] = asistencia['asistio'] ? true : false;
            asistenciasActualizadas[key]["llegada"] = horaLLegadaString;
          }

        });
        //asistenciasActualizadas["Thu Nov 09 2023 19:00:00 GMT-0500 (hora estándar de Perú)"] = {};
        //asistenciasActualizadas["Thu Nov 09 2023 19:00:00 GMT-0500 (hora estándar de Perú)"]["Mañana"] = true;
        // Update the state with the new information
        console.log("Cambio por effect", asistenciasActualizadas);
        setAsistencias(asistenciasActualizadas);
      } catch (error) {
        console.error('Error al obtener las asistencias:', error);
      }
    };
  
    fetchAsistencias();
  }, [entrenador.id]);
  

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

  const registrarAsistencia = async (entrenadorId, fecha, turno, n) => {
    try {
      const response = await axios.put(
        `https://localhost:7147/entrenadores/registrar-asistencia?id=${entrenadorId}&turno=${n}`,
        
      );
      console.log("Asistencia registrada con éxito:", response.data);
    } catch (error) {
      console.error("Error al registrar asistencia:", error);
    }
  };

  const weekDays = generateWeek(new Date(filtroFecha));
  const handleAttendance = (day, turno, n) => {
    // Verificar si la fecha del día actual es igual a la fecha que se está procesando
    let currentDate = new Date();
    const selectedDate = new Date(filtroFecha);
    const isSameDate = isSameDay(currentDate, selectedDate);
    let selectedDay = new Date(day);
    const day1 = currentDate.getDay();
    const day2 = selectedDay.getDay();

    // Obtener la hora actual
    const currentHour = currentDate.getHours();
    const turnoHoras = getTurnoHoras(turno); // Obtener las horas asociadas al turno

    // Si las fechas no son iguales, los días no son iguales o el turno no corresponde a la hora actual, no permitir marcar la asistencia
    if (!isSameDate || day1 !== day2 || currentHour < turnoHoras[0] || currentHour >= turnoHoras[1] || entrenador.estado ==1 || entrenador.estado == 0 ) {
        console.log("No se puede marcar la asistencia para esta fecha o turno");
        return;
    }

    // Resto de la función para marcar la asistencia...
  
    new Date(filtroFecha).setHours(19, 0, 0, 0);
    console.log("LLegue...");
    const updatedAsistencias = { ...asistencias };
    if (!updatedAsistencias[day]) {
        updatedAsistencias[day] = {};
        console.log("Cambio 1...");
    }
    updatedAsistencias[day][turno] = !updatedAsistencias[day][turno];
    console.log("Cambio por click", updatedAsistencias);
    setAsistencias(updatedAsistencias);
    if (!clickTime) {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        setClickTime(formattedTime);
    }
    console.log("Entrenador: ", entrenador.id);
    console.log("n: ", n);
    registrarAsistencia(entrenador.id, day, turno, n);
};
  
  const getTurnoHoras = (turno) => {
    switch (turno) {
        case 'Mañana':
            return [6, 12];
        case 'Tarde':
            return [12, 18];
        case 'Noche':
            return [18, 23];
        default:
            return [0, 0]; // En caso de turno no reconocido
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
                {turnos.map((turno, index1) => (
                  <tr key={index1}>
                    <div className="fila1">
                      <div className="labelTurno">{turno}</div>
                      <div className="labelHorario">{horarios[index1]}</div>
                    </div>
                    {weekDays.map((day, index) => (
                      <td key={index}>
                        <button
                          className={asistencias[day]?.[turno] ? 'asistio' : 'falto'}
                          onClick={() => handleAttendance(day, turno, index1+1)}
                        >
                          {asistencias[day]?.[turno] ? (
                            <div>
                              <div className="dot">
                                 <span className="material-icons"></span>
                                 
                              </div>
                              <div className="hora-actual">Llegada: {currentTime}</div>
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
