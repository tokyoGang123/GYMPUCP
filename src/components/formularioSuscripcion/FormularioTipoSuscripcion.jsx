import React, { useState, useEffect } from "react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import Modal1 from "./Modal1";
import "./FormularioTipoSuscripcion.scss";

export default function FormularioSuscripcion() {
  const [formEnviado, setFormEnviado] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBeneficios, setSelectedBeneficios] = useState([]);
  const [beneficiosDisponibles, setBeneficiosDisponibles] = useState([]);
  const [tipoSuscripcionId, setTipoSuscripcionId] = useState(null); // Conservando la variable

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const obtenerBeneficios = async () => {
    try {
      const response = await axios.get("https://localhost:7147/beneficios/listar");
      setBeneficiosDisponibles(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de beneficios:", error);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      obtenerBeneficios();
    }
  }, [isModalOpen]);

  const handleBeneficioChange = (beneficio) => {
    const isSelected = selectedBeneficios.some((b) => b.id === beneficio.id);

    if (isSelected) {
      const updatedBeneficios = selectedBeneficios.filter((b) => b.id !== beneficio.id);
      setSelectedBeneficios(updatedBeneficios);
    } else {
      setSelectedBeneficios([...selectedBeneficios, beneficio]);
    }
  };

  const handleSubmit = async (values, resetForm) => {
    try {
      const fechaInicio = new Date(values.fechaInicio).toLocaleDateString("en-GB");
      const fechaFin = new Date(values.fechaFin).toLocaleDateString("en-GB");

      // Paso 1: Crear el tipo de suscripción
      const tipoSuscripcionResponse = await axios.post("https://localhost:7147/tipo-suscripcion/crear", {
        nombre: values.nombre,
        descripcion: values.descripcion,
        precio: values.precio,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
      });

      setTipoSuscripcionId(tipoSuscripcionResponse.data.id); // Actualizando el ID

      // Paso 2: Asignar los beneficios
      if (tipoSuscripcionId && selectedBeneficios.length > 0) {
        const beneficiosIds = selectedBeneficios.map((beneficio) => beneficio.id);

        const asignarBeneficiosResponse = await axios.put(
          `https://localhost:7147/tipo-suscripcion/asignar-beneficios/${tipoSuscripcionId}`,
          beneficiosIds
        );

        console.log("Respuesta al asignar beneficios:", asignarBeneficiosResponse.data);
      }

      console.log("Tipo de suscripción creado con ID:", tipoSuscripcionId);

      resetForm();
      setFormEnviado(true);
      setTimeout(() => {
        setFormEnviado(false);
      }, 1000);
    } catch (error) {
      console.error("Error al crear el tipo de suscripción:", error);
      alert("Hubo un error al crear el tipo de suscripción");
    }
  };

  return (
    <div className="formulario-registro">
      <Formik
        initialValues={{
          nombre: "",
          descripcion: "",
          precio: "",
          fechaInicio: "",
          fechaFin: "",
        }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="nombre">Nombre: </label>
            <Field id="nombre" name="nombre" placeholder="Nombre" />

            <label htmlFor="descripcion">Descripción: </label>
            <Field id="descripcion" name="descripcion" placeholder="Descripción" />

            <label htmlFor="precio">Precio: </label>
            <Field id="precio" name="precio" placeholder="Precio" />

            <label htmlFor="fechaInicio">Fecha inicio: </label>
            <Field id="fechaInicio" name="fechaInicio" type="date" />

            <label htmlFor="fechaFin">Fecha fin: </label>
            <Field id="fechaFin" name="fechaFin" type="date" />

            <div>
              <label>Beneficios: </label>
              <button type="button" onClick={openModal}>
                Beneficios
              </button>
            </div>

            <div>
              <button type="submit">Guardar</button>
              {formEnviado && (
                <p className="exito">Formulario enviado exitosamente</p>
              )}
            </div>
          </Form>
        )}
      </Formik>

      <Modal1
        handleClose={closeModal}
        isOpen={isModalOpen}
        titulo={"Lista de beneficios"}
      >
        <h2>Seleccionar Beneficios</h2>
        <div>
          {beneficiosDisponibles.map((beneficio) => (
            <label key={beneficio.id}>
              <input
                type="checkbox"
                checked={selectedBeneficios.some((b) => b.id === beneficio.id)}
                onChange={() => handleBeneficioChange(beneficio)}
              />
              {beneficio.descripcion}
            </label>
          ))}
        </div>
      </Modal1>
    </div>
  );
}
