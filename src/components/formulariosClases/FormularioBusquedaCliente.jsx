import React, { useState } from 'react';
import { Field, Form, Formik } from "formik";
import "./FormularioBusquedaCliente.scss";
export default function FormularioBusquedaCliente() {

  const [dni, setDNI] = useState('');
  const [resultado, setResultado] = useState(null);

  const buscarPorDNI = () => {
    // Aquí puedes implementar tu propia lógica de búsqueda simulada
    // Esto es solo un ejemplo de cómo podría verse
    const personas = [
      { nombre: 'Juan', dni: 'Gabriel' },
      { nombre: 'María', dni: 'Becerra' },
      { nombre: 'Pedro', dni: 'Pascal' },
    ];

    const personaEncontrada = personas.find((persona) => persona.dni === dni);

    if (personaEncontrada) {
      setResultado(personaEncontrada);
    } else {
      setResultado(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      buscarPorDNI();
    }
  };

  return (
    <div className="formulario-registro">
      <Formik
        initialValues={{
          dni: "",
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
            <label htmlFor="dni">DNI: </label>

            <div>
              <input
                type="text"
                placeholder="Ingrese un DNI"
                value={dni}
                onChange={(e) => setDNI(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {resultado && (
                <div>
                  <h2>Resultado:</h2>
                  <p>Nombre: {resultado.nombre}</p>
                  <p>DNI: {resultado.dni}</p>
                </div>
              )}
            </div>           

            <button type="submit">Confirmar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}