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
        <Route path="not-found" element={<NotFound />} />
        <Route path="clientes/perfil/:id" element={<PerfilCliente />} />
  
      </Routes>
    </Router>
  );
}

export default App;
