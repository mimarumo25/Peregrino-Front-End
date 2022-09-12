import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { url } from "../../../helpers/auth-token";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        list: []
    },
    reducers: {
        setUserList: (state, action) => {
            state.list = action.payload;
        }
    },
})
export const { setUserList } = userSlice.actions;

export default userSlice.reducer;

export const getUsersAll = () => async (dispatch) => {
    try {
        await axios.get(url + "users")
            .then(res => {
                dispatch(setUserList(res.data))              
            })
    } catch (error) {
        console.log(error);
    }



    //const [role] = roles;
    //dispatch(setUserList({_id, identifica, nombres, apellidos, telefono, email, roles:role.name}))
}