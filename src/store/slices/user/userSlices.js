import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import Swal from "sweetalert2";
import { headers, url } from "../../../helpers/auth-token";
import { getUser } from "../userLogged";

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
}
export const addUser = (data) => async (dispatch) => {
  
    axios.post(url+'users/create', data, headers())
    .then((res) => {
       dispatch(getUsersAll())
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: res.data.mesage,
        showConfirmButton: false,
        timer: 2000
      })

    }).catch(function (error) {
      const {message}=error.response.data
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
          })
      });

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
  export const updateUserDatos = (data, id) => async (dispatch) => {

    axios.put(url + 'users/datos/' + id, data, headers())
        .then((res) => {
            dispatch(getUsersAll())
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.data.mensaje,
                showConfirmButton: false,
                timer: 1500
            })
            dispatch(getUser())

        }).catch(function (error) {
            const { mensaje } = error.response.data
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: mensaje,
            })
        });

}
export const updateUser = (data, id) => async (dispatch) => {

    axios.put(url + 'users/' + id, data, headers())
        .then((res) => {
            dispatch(getUsersAll())
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.data.mensaje,
                showConfirmButton: false,
                timer: 1500
            })

        }).catch(function (error) {
            const { mensaje } = error.response.data
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: mensaje,
            })
        });

}
export const updateUserPass = (data, id) => async (dispatch) => {

    axios.put(url + 'users/pass/' + id, data, headers())
        .then((res) => {
            dispatch(getUsersAll())
            console.log(res.data.mensaje)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.data.mensaje,
                showConfirmButton: false,
                timer: 1500
            })

        }).catch(function (error) {
            const { mensaje } = error.response.data
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: mensaje,
            })
        });

}
export const deleteUser = (id) => async (dispatch) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
  
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Si, Eliminar!',
      cancelButtonText: '¡No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(url + 'users/' + id, headers())
          .then((res) => {
            dispatch(getUsersAll())
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
              'Su archivo ha sido eliminado.',
              'success'
            )
  
          }).catch(function (error) {
            const { mensaje } = error.response.data
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: mensaje,
            })
          });
  
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu archivo imaginario está a salvo :)',
          'error'
        )
      }
    })
  }