import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import Swal from "sweetalert2";

import { headers, url } from "../../../helpers/auth-token";

export const programaSlice = createSlice({
  name: "programa",
  initialState: {
    list: []
  },
  reducers: {
    setProgramaList: (state, action) => {
      state.list = action.payload;
    },
    AddProgramaList: (state, action) => {
      state.list = action.payload;
    }

  },
})
export const { setProgramaList } = programaSlice.actions;

export default programaSlice.reducer;

export const getProgamaAll = () => async (dispatch) => {
  try {
    await axios.get(url + "programa")
      .then(res => {
        dispatch(setProgramaList(res.data))
      })
  } catch (error) {
    console.log(error);
  }
}
export const addPrograma = (data) => async (dispatch) => {

  axios.post(url + 'programa/create', data, headers())
    .then((res) => {
      dispatch(getProgamaAll())
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: res.mesaje,
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
export const updatePrograma = (data, id) => async (dispatch) => {

  axios.put(url + 'programa/' + id, data, headers())
    .then((res) => {
      dispatch(getProgamaAll())
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
export const deletePrograma = (id) => async (dispatch) => {
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
      axios.delete(url + 'programa/' + id, headers())
        .then((res) => {
          dispatch(getProgamaAll())
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