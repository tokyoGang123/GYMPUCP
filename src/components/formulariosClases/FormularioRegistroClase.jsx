import React, { useState } from 'react';
import { Field, Form, Formik } from "formik";
import "./FormularioRegistroClases.scss";
export default function FormularioRegistroClase() {

  const [selectedOption, setSelectedOption] = useState('');
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="formulario-registro">
      <Formik
        initialValues={{
          nombre: "",
          descripcion: "",
          aforo: "",
          fecha: "",
          horaInicio: "",
          horaFin: "",
          Entrenador: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {(
          { values, setFieldValue } // Agregamos setFieldValue para actualizar "sexo"
        ) => (
          <Form>
            <label htmlFor="nombre">Nombre: </label>
            <Field id="nombre" name="nombre" placeholder="Nombre" />

            <label htmlFor="descripcion">Descripcion: </label>
            <Field
              id="descripcion"
              name="descripcion"
              placeholder="Descripción"
            />

            <label htmlFor="aforo">Aforo: </label>
            <Field
              id="aforo"
              name="aforo"
              placeholder="Aforo"
            />

            <label htmlFor="fecha">Fecha: </label>
            <Field id="fecha" name="fecha" type="date" />

            <label htmlFor="horaInicio">Hora inicio: </label>
            <Field id="horaInicio" name="horaInicio" type="time" />

            <label htmlFor="horaFin">Hora fin: </label>
            <Field id="horaFin" name="horaFin" type="time" />

            <div>
              <label htmlFor="combo">Selecciona una opción: </label>
              <select id="combo" value={selectedOption} onChange={handleSelectChange}>
                <option value="">Selecciona una opción</option>
                <option value="opcion1">Opción 1</option>
                <option value="opcion2">Opción 2</option>
                <option value="opcion3">Opción 3</option>
              </select>
              <p>Seleccionaste: {selectedOption}</p>
            </div>            

            <button type="submit">Nuevo</button>
            <button type="submit">Guardar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}