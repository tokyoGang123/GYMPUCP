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
      </Routes>
    </Router>
  );
}

export default App;
