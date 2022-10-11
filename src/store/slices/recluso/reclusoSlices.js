import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import Swal from "sweetalert2";

import { headers, url } from "../../../helpers/auth-token";

export const reclusoSlice = createSlice({
    name: "recluso",
    initialState: {
        list: [],
        total: 0
    },
    reducers: {
        setReclusoList: (state, action) => {
            state.list = action.payload;
        },
        setReclusoTotal: (state, action) => {
          state.total = action.payload;
        },
        AddReclusoList: (state, action) => {
            state.list = action.payload;
        }
        
    },
})
export const { setReclusoList, setReclusoTotal } = reclusoSlice.actions;

export default reclusoSlice.reducer;

export const getReclusoAll = ( desde ) => async (dispatch) => {
    try {
        await axios.get(url + `Recluso?desde=${ desde }`)
            .then(res => {
                dispatch(setReclusoList(res.data.reclusos));
                dispatch(setReclusoTotal(res.data.total));   
            })
    } catch (error) {
        console.log(`Error: ${ error }`);
    }
    //const [role] = roles;
    //dispatch(setUserList({_id, identifica, nombres, apellidos, telefono, email, roles:role.name}))
}

export const searchReclusos = ( term ) => async (dispatch) => {
  try {
      if ( term.length > 0 ) {
        await axios.get(url + "coleccion/reclusos/" + term, headers() )
          .then(res => {
              dispatch(setReclusoList(res.data))     
              console.log('ESTOS SON LOS RECLUSOS: ', res.data );         
          })
      } else {
        dispatch(getReclusoAll());
      }
  } catch (error) {
      console.log(`Error: ${ error }`);
  }
}

export const addRecluso = (data) => async (dispatch) => {
  
        axios.post(url+'recluso/create', data, headers())
        .then((res) => {
           dispatch(getReclusoAll())
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.data.mesaje,
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
export const updateRecluso = (data,id) => async (dispatch) => {
  
    axios.put(url+'recluso/'+id, data, headers())
    .then((res) => {
       dispatch(getReclusoAll())
       console.log(res.data.mensaje)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: res.data.mensaje,
        showConfirmButton: false,
        timer: 1500
      })

    }).catch(function (error) {
      const {mensaje}=error.response.data
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: mensaje,
          })
      });

}
export const deleteRecluso = (id) => async (dispatch) => {
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
            axios.delete(url+'recluso/'+id, headers())
            .then((res) => {        
               dispatch(getReclusoAll())
               swalWithBootstrapButtons.fire(
                '¡Eliminado!',
                'Su archivo ha sido eliminado.',
                'success'
              )
        
            }).catch(function (error) {
              console.log( error );
              const {mensaje}=error.response.data
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