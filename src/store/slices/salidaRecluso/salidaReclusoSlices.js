import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import Swal from "sweetalert2";

import { headers, url } from "../../../helpers/auth-token";

export const salidaReclusoSlice = createSlice({
    name: "salidaRecluso",
    initialState: {
        list: [],
    },
    reducers: {
        setSalidaReclusoList: (state, action) => {
            state.list = action.payload;
        }
    },
})
export const { setSalidaReclusoList } = salidaReclusoSlice.actions;

export default salidaReclusoSlice.reducer;

export const getSalidaReclusoAll = (desde) => async (dispatch) => {
    try {
        await axios.get(url + `salidaReclusos`)
            .then(res => {
                dispatch(setSalidaReclusoList(res.data));                
            })
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export const addSalidaRecluso = (recluso, telefono, direccion, fechaSalida, salida, observacion) => async (dispatch) => {
console.log({
    recluso,
    telefono,
    direccion,
    fechaSalida,
    salida,
    observacion
});
    axios.post(url + 'salidaReclusos/create', {
        recluso,
        telefono,
        direccion,
        fechaSalida,
        salida,
        observacion
    }, headers())
        .then((res) => {
            dispatch(getSalidaReclusoAll())
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
export const updateSalidaRecluso = (data, id) => async (dispatch) => {

    axios.put(url + 'salidaReclusos/' + id, data, headers())
        .then((res) => {
            dispatch(getSalidaReclusoAll())
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
export const deleteSalidaRecluso = (id) => async (dispatch) => {
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
            axios.delete(url + 'salidaReclusos/' + id, headers())
                .then((res) => {
                    dispatch(getSalidaReclusoAll())
                    swalWithBootstrapButtons.fire(
                        '¡Eliminado!',
                        'Su archivo ha sido eliminado.',
                        'success'
                    )

                }).catch(function (error) {
                    console.log(error);
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