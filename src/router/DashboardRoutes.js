import { Home } from "../components";
import { Dashboard, Informes, Internos, Lecciones, Usuarios, Programas, Matricula } from "../components/Pages";

import { Routes, Route, Navigate } from "react-router-dom";
import { SalidaRecluso } from "../components/Pages/SalidaRecluso";
import { Profile } from "../components/Profile";

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
          <Route path="/salidas" element={<SalidaRecluso/>} />
          <Route path="/profiles" element={<Profile/>} />
          <Route path="/informes" element={<Informes />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};


