import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Col,
  Subtitle,
} from "@tremor/react";
import dataClases from "./dataClasesDisponibles.json";
import "./DashboardBase.scss";
import ChartDonut from "./ChartDonut";
import SuscripcionesComponent from "./SuscripcionesComponent";
import { useState } from "react";
import axios from "axios";
import WritingContestChart from "./WritingContestChart";
export default function DashboardBase() {
  const [fechaInicio, setFechaInicio] = useState("2000-12-12");
  const [fechaFin, setFechaFin] = useState("2030-12-12");
  const [suscripciones, setSuscripciones] = useState([]);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedFechaInicio = formatDate(fechaInicio);
      const formattedFechaFin = formatDate(fechaFin);

      const response = await axios.get(
        `https://localhost:7147/clientes/listar-suscripciones-por-rango?fechaInicio=${formattedFechaInicio}&fechaFin=${formattedFechaFin}`
      );

      setSuscripciones(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}%2F${month}%2F${year}`;
  };
  return (
    <div className="contenedor-principal-inicio">
      <TabGroup className="mt-2">
        <TabList>
          <Tab>
            <span className=" font-bold">{"Dashboard"}</span>
          </Tab>
          <Tab>
            {" "}
            <span className=" font-bold">{"Detalles"}</span>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="mt-3">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{
                    display: "flex",
                    minWidth: "580px",
                    // alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {"Clases Disponibles"}
                </span>
                <span className="text-2xl font-bold " style={{}}>
                  <form onSubmit={handleSubmit} style={{ display: "flex" }}>
                    <div>
                      <label>Fecha de Inicio:</label>
                      <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Fecha de Fin:</label>
                      <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                      />
                    </div>
                    <button type="submit">Consultar Suscripciones</button>
                  </form>
                </span>
              </div>
              <Grid numItemsLg={6} className="gap-6 mt-6">
                <Col numColSpanLg={2}>
                  {/* KPI sidebar */}
                  <div
                    className="ListaClasesDisponibles"
                    style={{ maxHeight: "600px", overflowY: "auto" }}
                  >
                    {dataClases.map((clase, index) => (
                      <Card
                        className={`mb-6`}
                        decoration="top"
                        decorationColor="indigo"
                        key={clase.id}
                      >
                        <Title>{clase.nombre}</Title>
                        <Subtitle>
                          <b>Fecha:</b> {clase.fecha}
                        </Subtitle>
                        <Subtitle>
                          <b>Capacidad:</b> {clase.capacidad}
                        </Subtitle>
                        <Subtitle>
                          <b>Instructor:</b> {clase.instructor}
                        </Subtitle>
                        <Subtitle>
                          <b>Duración:</b> {clase.duracion}
                        </Subtitle>
                        <Subtitle>
                          <b>Hora:</b> {clase.hora}
                        </Subtitle>
                      </Card>
                    ))}
                  </div>
                </Col>

                {/* Main section */}
                <Col numColSpanLg={4}>
                  <Card className="h-full">
                    <ChartDonut suscripciones={suscripciones} />
                  </Card>
                </Col>
              </Grid>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Card>
                <WritingContestChart></WritingContestChart>
                <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                  <Card>
                    {/* Placeholder to set height */}
                    <div className="h-28" />
                  </Card>
                  <Card>
                    {/* Placeholder to set height */}
                    <div className="h-28" />
                  </Card>
                  <Card>
                    {/* Placeholder to set height */}
                    <div className="h-28" />
                  </Card>
                </Grid>
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
