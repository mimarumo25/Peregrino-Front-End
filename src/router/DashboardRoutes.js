import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../components/Pages/Dashboard";
import Home from "../components/Home";
import Informes from "../components/Pages/Informes";
import Internos from "../components/Pages/Internos";
import Lecciones from "../components/Pages/Lecciones";
import Usuarios from "../components/Pages/Usuarios";
import Programas from "../components/Pages/Programas";
import Matricula from "../components/Pages/Matricula";




export const DashboardRoutes = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/internos" element={<Internos />} />
          <Route path="/programas" element={<Programas />} />
          <Route path="/lecciones" element={<Lecciones />} />
          <Route path="/matriculas" element={<Matricula />} />
          <Route path="/informes" element={<Informes />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};


