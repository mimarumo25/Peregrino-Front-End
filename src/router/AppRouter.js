import React, { useEffect } from "react";
import '../css/styles.scss'
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import { PrivateRoute } from "./PrivateRoutes";
import { PublicRoute } from "./PublicRoutes";
import { DashboardRoutes } from "./DashboardRoutes";
import { decodeToken,url } from "../helpers/auth-token";
import axios from "axios";
import { setLogin } from '../store/slices/login/index'
import { useSelector } from "react-redux";
import { setUserLogged } from "../store/slices/userLogged";

const AppRouter = () => {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(store => store.logged);

  useEffect(() => {
    const cargarUsuario = async() => {
      try {
        const { id } = decodeToken();
        const { data: user } = await axios.get(`${url}users/${id}`);
        if (user?.email) {
          const {_id, identifica, nombres, apellidos, telefono, email, roles, estado } = user;
          const [{ name }] = estado;
          const [role] = roles;
          dispatch(setUserLogged({_id, identifica, nombres, apellidos, telefono, email, roles:role.name, estado:name}))
          dispatch(setLogin(true));
        }else{
          dispatch(setLogin(false));
        }
      } catch (error) {
        console.log(error);
      }
    }
    cargarUsuario()
  }, [isLoggedIn,dispatch]);
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute isAuthenticated={isLoggedIn}>
              <Login isAuthenticated={isLoggedIn} />
            </PublicRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute isAuthenticated={isLoggedIn}>
              <DashboardRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
