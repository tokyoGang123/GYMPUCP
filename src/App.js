import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import NotFound from "./pages/NotFound";
import Navbar from "./components/navBar/Navbar";
import Ejercicios from "./pages/Ejercicios";
import Entrenadores from "./pages/Entrenadores";
import Clientes from "./pages/Clientes";
import Suscripcion from "./pages/Suscripcion";
import Clases from "./pages/Clases";
import PerfilCliente from "./components/perfilCliente/PerfilCliente";
import HistorialSuscripcionesCliente from "./components/historialSuscripcionesCliente/HistorialSuscripcionesCliente";
import ListaSesionesCliente from "./components/listaSesionesCliente/ListaSesionesCliente";
import Descuentos from "./pages/Descuentos";
import ListaSuscripcionesPage from "./pages/ListaSuscripcionesPage";
import PlanEntrenamiento from "./pages/PlanEntrenamiento";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="clases" element={<Clases />} />
        <Route path="ejercicios" element={<Ejercicios />} />
        <Route path="entrenadores" element={<Entrenadores />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="suscripcion" element={<Suscripcion />} />
        <Route
          path="suscripcion/lista-suscripciones"
          element={<ListaSuscripcionesPage />}
        />
        <Route path="suscripcion/descuentos" element={<Descuentos />} />
        <Route path="not-found" element={<NotFound />} />
        <Route path="clientes/perfil/:id" element={<PerfilCliente />} />
        <Route
          path="clientes/lista-sesiones-cliente/:id"
          element={<ListaSesionesCliente />}
        />
        <Route path="plan_entrenamiento" element={<PlanEntrenamiento />} />
        <Route
          path="clientes/perfil/:id/historial-suscripciones"
          element={<HistorialSuscripcionesCliente />}
        />
      </Routes>
    </Router>
  );
}

export default App;
