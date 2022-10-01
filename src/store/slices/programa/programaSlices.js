import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import Swal from "sweetalert2";

import { headers, url } from "../../../helpers/auth-token";

export const programaSlice = createSlice({
  name: "programa",
  initialState: {
    list: [],
    total: 0
  },
  reducers: {
    setProgramaList: (state, action) => {
      state.list = action.payload;
    },
    setProgramaTotal: (state, action) => {
      state.total = action.payload;
    },
    AddProgramaList: (state, action) => {
      state.list = action.payload;
    }

  },
})
export const { setProgramaList, setProgramaTotal } = programaSlice.actions;

export default programaSlice.reducer;

export const getProgamaAll = ( desde ) => async (dispatch) => {
  try {
    await axios.get(url + `programa?desde=${ desde }`)
      .then(res => {
        dispatch(setProgramaList(res.data.programas));
        dispatch(setProgramaTotal(res.data.total));
      })
  } catch (error) {
    console.log(error);
  }
};

export const searchProgramas = ( term ) => async (dispatch) => {
  try {
      if ( term.length > 0 ) {
        await axios.get(url + "coleccion/programas/" + term, headers() )
          .then(res => {
              dispatch(setProgramaList(res.data))     
              console.log('ESTOS SON LOS PROGRAMAS: ', res.data );         
          })
      } else {
        dispatch(getProgamaAll());
      }
  } catch (error) {
      console.log(`Error: ${ error }`);
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