import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import Swal from "sweetalert2";

import { headers, url } from "../../../helpers/auth-token";

export const leccionSlice = createSlice({
  name: "leccion",
  initialState: {
    list: [],
    total: 0
  },
  reducers: {
    setLeccionList: (state, action) => {
      state.list = action.payload;
    },
    setLeccionTotal: (state, action) => {
      state.total = action.payload;
    },
    AddLeccionList: (state, action) => {
      state.list = action.payload;
    }

  },
})
export const { setLeccionList, setLeccionTotal } = leccionSlice.actions;

export default leccionSlice.reducer;

export const getLeccionAll = ( desde = 0, hasta = 0 ) => async (dispatch) => {
  try {
    await axios.get(url + `lecciones?desde=${ desde }&hasta=${ hasta }`)
      .then(res => {
        dispatch(setLeccionList(res.data.lecciones));
        dispatch(setLeccionTotal(res.data.total));
      })
  } catch (error) {
    console.log(error);
  }
}

export const searchLecciones = ( term ) => async (dispatch) => {
  try {
      if ( term.length > 0 ) {
        await axios.get(url + "coleccion/lecciones/" + term, headers() )
          .then(res => {
              dispatch( setLeccionList(res.data) );    
              console.log('ESTAS SON LAS LECCIONES: ', res.data );         
          })
      } else {
        dispatch(getLeccionAll());
      }
  } catch (error) {
      console.log(`Error: ${ error }`);
  }
}

export const addLeccion = (data) => async (dispatch) => {

  axios.post(url + 'lecciones/create', data, headers())
    .then((res) => {
      dispatch(getLeccionAll())
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
export const updateLeccion = (data, id) => async (dispatch) => {

  axios.put(url + 'lecciones/' + id, data, headers())
    .then((res) => {
      dispatch(getLeccionAll())
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
export const deleteLeccion = (id) => async (dispatch) => {
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
      axios.delete(url + 'lecciones/' + id, headers())
        .then((res) => {
          dispatch(getLeccionAll())
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