import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import Swal from "sweetalert2";
import { decodeToken, saveToken, url } from "../../../helpers/auth-token";
import { setLogin } from "../login";

export const userLoggedSlice = createSlice({
    name: "userLogge",
    initialState: {
        list:[],
    },
    reducers: {
        setUserLogged: (state, action) => {
            state.list= action.payload;
        }
    },
})
export const {setUserLogged}= userLoggedSlice.actions;

export default userLoggedSlice.reducer;


export const loginEmailPassword = (email, password) => {
    return async (dispatch) => {
      await axios
        .post(url + "auth/signin", {
          email: email,
          password: password,
        })
        .then(function (response) {
          let dato = response.data;
          saveToken(dato.token);
          Swal.fire("Bienvenido!", "Inicio de sesión exitoso!", "success");
          getUser(dispatch);
  
        })
        .catch(function (error) {
          console.error("Error en la consulta : " + error);
          Swal.fire("Error!", "Contraseña o email incorrecto!", "error");
        });
    };
  };

  const getUser = async (dispatch) => {
    try {
      const { id } = decodeToken();
      await axios.get(`${url}users/${id}`)
        .then(res => {
          const user = res.data;
          const { identifica, nombres, apellidos, telefono, email, roles, estado } = user;
          const [{ name }] = estado;
          const [role] = roles;
          dispatch(setUserLogged({identifica, nombres, apellidos, telefono, email, roles:role.name, name}))
          dispatch(setLogin(true))
         
        })
    } catch (error) {
      console.log(error);
    }
  }