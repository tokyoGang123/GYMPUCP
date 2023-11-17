import React from "react";
import { BarChart, Card, Title } from "@tremor/react";

const jsonData = [
  {
    mes: "Noviembre",
    data: [
      { tipoSuscripcion: "Suscripcion tipo premium", montoVendido: 72 },
      { tipoSuscripcion: "Tipo de suscripción estandar", montoVendido: 92 },
      { tipoSuscripcion: "Suscripción tipo premium", montoVendido: 78 },
      { tipoSuscripcion: "Suscripción tipo vip", montoVendido: 64 },
      { tipoSuscripcion: "Suscripción base mensual", montoVendido: 68 },
      { tipoSuscripcion: "Suscripción tipo vip", montoVendido: 54 },
    ],
  },
  {
    mes: "Octubre",
    data: [
      { tipoSuscripcion: "Suscripcion tipo premium", montoVendido: 88 },
      { tipoSuscripcion: "Tipo de suscripción estandar", montoVendido: 76 },
      { tipoSuscripcion: "Suscripción tipo premium", montoVendido: 95 },
      { tipoSuscripcion: "Suscripción tipo vip", montoVendido: 69 },
      { tipoSuscripcion: "Suscripción base mensual", montoVendido: 52 },
      { tipoSuscripcion: "Suscripción tipo vip", montoVendido: 62 },
    ],
  },
  {
    mes: "Septiembre",
    data: [
      { tipoSuscripcion: "Suscripcion tipo premium", montoVendido: 75 },
      { tipoSuscripcion: "Tipo de suscripción estandar", montoVendido: 80 },
      { tipoSuscripcion: "Suscripción tipo premium", montoVendido: 60 },
      { tipoSuscripcion: "Suscripción tipo vip", montoVendido: 51 },
      { tipoSuscripcion: "Suscripción base mensual", montoVendido: 89 },
      { tipoSuscripcion: "Suscripción tipo vip", montoVendido: 71 },
    ],
  },
  {
    mes: "Agosto",
    data: [
      { tipoSuscripcion: "Suscripcion tipo premium", montoVendido: 93 },
      { tipoSuscripcion: "Tipo de suscripción estandar", montoVendido: 59 },
      { tipoSuscripcion: "Suscripción tipo premium", montoVendido: 76 },
      { tipoSuscripcion: "Suscripción tipo vip", montoVendido: 84 },
      { tipoSuscripcion: "Suscripción base mensual", montoVendido: 68 },
      { tipoSuscripcion: "Suscripción tipo vip", montoVendido: 57 },
    ],
  },
];

const valueFormatter = (number) =>
  `S/ ${new Intl.NumberFormat("us").format(number).toString()}`;

const WritingContestChart = () => {
  const flattenedData = flattenData(jsonData);

  return (
    <Card>
      <Title> Ingresos de los últimos 4 meses </Title>
      <BarChart
        className="mt-6"
        data={flattenedData}
        index="mes"
        categories={getUniqueCategories(flattenedData)}
        colors={["red", "blue", "yellow", "green", "purple"]}
        valueFormatter={valueFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
};

const flattenData = (jsonData) => {
  return jsonData.map((item) => ({
    ...item.data.reduce((acc, entry) => {
      acc[entry.tipoSuscripcion] = entry.montoVendido;
      return acc;
    }, {}),
    mes: item.mes,
  }));
};

const getUniqueCategories = (flattenedData) => {
  const allCategories = flattenedData.reduce((acc, item) => {
    Object.keys(item).forEach((key) => {
      if (key !== "mes" && !acc.includes(key)) {
        acc.push(key);
      }
    });
    return acc;
  }, []);
  return allCategories;
};

export default WritingContestChart;
