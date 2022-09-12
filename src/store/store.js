import { configureStore } from "@reduxjs/toolkit";
import logged from "./slices/login/index"
import userLogged from './slices/userLogged'
import userList from './slices/user/userSlices'
import reclusoList from './slices/recluso/reclusoSlices'
import leccionList from './slices/leccion/leccionSlices'
import progamaList from './slices/programa/programaSlices'

export default configureStore({
    reducer: {
        logged,
        userLogged,
        userList,
        reclusoList,
        leccionList,
        progamaList,
        
        
    }
}
)