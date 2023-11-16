import React from "react";
import {
  Card,
  Text,
  Metric,
  Flex,
  ProgressBar,
  Title,
  Subtitle,
} from "@tremor/react";
//import "@tremor/react";
import dataClases from "./dataClasesDisponibles.json";
import TabListBase from "./TabListBase";
import ChartDonut from "./ChartDonut";
export default function Dashboard() {
  const data = [
    { name: "Smart Bike", value: 20 },
    { name: "Yoga Matutino", value: 15 },
    { name: "Entrenamiento Funcional", value: 25 },
    { name: "Pilates en Pareja", value: 10 },
    { name: "Running Club", value: 30 },
  ];
  return (
    <div class="flex flex-row">
      <div class="flex flex-col w-1/2 mt-10">
        <Card className="max-w-xs mx-auto">
          <Text>Sales</Text>
          <Metric>$ 345,743</Metric>
        </Card>
        <Card className="max-w-xs mx-auto">
          <Text>Salesss</Text>
          <Metric>$ 71,465</Metric>
          <Flex className="mt-4">
            <Text>32% of annual target</Text>
            <Text>$ 225,000</Text>
          </Flex>
          <ProgressBar value={32} className="mt-2" />
        </Card>
        <div className="ListaClasesDisponibles">
          {dataClases.map((clase) => (
            <Card
              className="max-w-xs mx-auto mb-4"
              decoration="top"
              decorationColor="indigo"
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
      </div>
     
      <div className="flex flex-col w-1/2 mt-10 mr-10">
        <ChartDonut className="w-1" />
      </div>
    </div>
  );
}
