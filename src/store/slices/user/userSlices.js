import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { headers, url } from "../../../helpers/auth-token";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        list: [],
        total: 0
    },
    reducers: {
        setUserList: (state, action) => {
            state.list = action.payload;
        },
        setUserTotal: (state, action) => {
            state.total = action.payload;
        }
    },
})
export const { setUserList, setUserTotal } = userSlice.actions;

export default userSlice.reducer;

export const getUsersAll = ( desde ) => async (dispatch) => {
    try {
        await axios.get(url + "users")
            .then(res => {
                dispatch(setUserList(res.data.usuarios));
                dispatch(setUserTotal(res.data.total));
            })
    } catch (error) {
        console.log(error);
    }
    //const [role] = roles;
    //dispatch(setUserList({_id, identifica, nombres, apellidos, telefono, email, roles:role.name}))
}

export const searchUsers = ( term ) => async (dispatch) => {
    try {
        if ( term.length > 0 ) {
          await axios.get(url + "coleccion/usuarios/" + term, headers() )
            .then(res => {
                dispatch(setUserList(res.data))     
                console.log('ESTOS SON LOS USUARIOS: ', res.data );         
            })
        } else {
          dispatch(getUsersAll());
        }
    } catch (error) {
        console.log(`Error: ${ error }`);
    }
  }