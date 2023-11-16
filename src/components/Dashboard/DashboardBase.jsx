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
export default function DashboardBase() {
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
                <span
                  className="text-2xl font-bold "
                  style={{  }}
                >
                  {"Suscripciones Actuales - Noviembre - 2023"}
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
                    <ChartDonut />
                  </Card>
                </Col>
              </Grid>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Card>
                <div className="h-96" />
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
