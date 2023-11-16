import { Card, DonutChart, Title } from "@tremor/react";
import React, { useState } from "react";

export default function ChartDonut() {
  const [value, setValue] = useState(null);
  const dataSuscripciones = [
    { nombre: "VIP", cantidad: 20, color: "#FF0000" },
    { nombre: "Básico", cantidad: 25, color: "#00FF00" },
    { nombre: "Premium", cantidad: 25, color: "#0000FF" },
    { nombre: "Gratuito", cantidad: 18, color: "#FFFF00" },
    { nombre: "Gold", cantidad: 70, color: "#00FFFF" },
  ];

  return (
    <Card className="mx-auto h-full border border-purple-300 p-4 flex flex-row">
      <div
        className="flex flex-col items-left mr-2 w-78"
        style={{
          width: "20%",
        }}
      >
        <span className="text-1xl font-bold">Total:{158}</span>
        {dataSuscripciones.map((suscripcion) => (
          <div
            className="flex flex-row items-center mb-4"
            key={suscripcion.nombre}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: suscripcion.color }}
            ></div>
            <div className="ml-2">{suscripcion.nombre}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <DonutChart
          data={dataSuscripciones}
          category="cantidad"
          index="nombre"
          colors={[
            "green",
            "yellow",
            "red",
            "blue",
            "orange",
            "purple",
            "pink",
            "brown",
            "gray",
            "cyan",
          ]}
          style={{
            width: "80%",
            height: "90%",
          }}
        ></DonutChart>
      </div>
    </Card>
  );
}
