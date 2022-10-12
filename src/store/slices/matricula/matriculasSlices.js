import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import Swal from "sweetalert2";

import { headers, url } from "../../../helpers/auth-token";

export const matricualasSlice = createSlice({
  name: "matricula",
  initialState: {
    list: []
  },
  reducers: {
    setMatriculasList: (state, action) => {
      state.list = action.payload;
    }

  },
})
export const { setMatriculasList } = matricualasSlice.actions;

export default matricualasSlice.reducer;

export const getMatriculasAll = () => async (dispatch) => {
  try {
    await axios.get(url + "matriculas")
      .then(res => {
        dispatch(setMatriculasList(res.data))
      })
  } catch (error) {
    console.log(error);
  }
}
export const addMatricula = (data) => async (dispatch) => {

  axios.post(url + 'matriculas/create', data, headers())
    .then((res) => {
      dispatch(getMatriculasAll())
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: res.data.mesaje,
        showConfirmButton: false,
        timer: 1500
      })

    }).catch(function (error) {
      const { message } = error.response.data
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
      })
    });

}
export const updateMatricula = (data, id) => async (dispatch) => {  
  axios.put(url + 'matriculas/' + id, data, headers())
    .then((res) => {
      dispatch(getMatriculasAll())
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
export const deleteMatricula = (id) => async (dispatch) => {
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
      axios.delete(url + 'matriculas/' + id, headers())
        .then((res) => {
          dispatch(getMatriculasAll())
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