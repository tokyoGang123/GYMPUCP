import { Card, DonutChart, Title } from "@tremor/react";
import React, { useState } from "react";

export default function ChartDonut({ suscripciones }) {
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
        {suscripciones.map((suscripcion, index) => (
          <div
            className="flex flex-row items-center mb-4"
            key={suscripcion.idTipoSuscripcion}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: dataSuscripciones.color }}
            ></div>
            <div className="ml-2">{suscripcion.tipoSuscripcion}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <DonutChart
          data={suscripciones}
          category="cantidad"
          index="tipoSuscripcion"
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
