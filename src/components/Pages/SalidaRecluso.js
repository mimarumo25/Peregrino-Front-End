import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getReclusoAll } from '../../store/slices/recluso/reclusoSlices';
import { getSalidaReclusoAll } from '../../store/slices/salidaRecluso/salidaReclusoSlices';
import SalidaReclusoModal from '../modal/SalidaReclusoModal';

export const SalidaRecluso = () => {

  const dispatch = useDispatch();
  const { list: salidaReclusos } = useSelector(store => store.salidaReclusosList);
  const [registros, setRegistros] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  console.log({salidaReclusos});
  const modalNewSalida = () => {
    setModalShow(true);
  };
  /*const handleSearch = (e) => {
    setValue(e.target.value);
    if (e.target.value <= 0) {
      dispatch();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchLecciones(value));
  };*/
  useEffect(() => {   
    dispatch(getReclusoAll()); 
    dispatch(getSalidaReclusoAll()); 
    setDataRegistros()
  }, [ dispatch]);

  const paginacionOptions = {
    rowsPerPageText: 'Filas por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
}
const setDataRegistros = () => {
  if ( registros.length === 0 && (registros.length < salidaReclusos.length) ) {
    salidaReclusos.forEach(( salidareclusos, index ) => {
      salidareclusos.recluso.forEach(( recluso ) => {
        salidareclusos.salida.forEach(( salida ) => {
          setRegistros(( prev ) => {
            return (
              [ ...prev,{
                cedula: recluso.cedula,
               
               
              }]
            )
          })
        })
      })
    });
  }
}
/*const columnas = [

    {
        name: 'NOMBRE',
        selector: row => row.nombre,
        sortable: true,
    },
    {
        name: 'DESCRIPCIÓN',
        selector: row => row.descripcion,
        sortable: true,
        grow: 3
    },
    {
        name: 'Acciones',
        cell: row => <td className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
                type="button"
                className="btn btn-warning mx-1"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Editar"
                onClick={() => modalEditPrograma(row)}
            >
                <Icon icon="bx:edit" width="20" />
            </button>
            <button
                type="button"
                className="btn btn-danger"
                tabIndex="0"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Eliminar"
                onClick={() => eliminarPrograma(row._id)}>
                <Icon icon="fluent:delete-12-regular" width="20" />
            </button>
        </td>
    }
]*/
  return (
    <div>
      <SalidaReclusoModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        keyboard={false}
      />
      <div className="py-2">
        <button
          onClick={modalNewSalida}
          data-backdrop="static"
          data-keyboard="false"
          className="btn btn-warning w-10"
          type="button"
        >
          <Icon icon="el:address-book-alt" width="20" /> Nueva Salida
        </button>
      </div>
      {/* SEARCH *
         <form
          style={{
            width: "320px",
            padding: "0 1rem",
          }}
          className="form"
          onSubmit={handleSubmit}
        >
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              onChange={handleSearch}
              placeholder={`Buscar Recluso por Cedula`}
              value={value}
              aria-label="Buscar..."
              aria-describedby="search-addon"
            />
            <button className="input-group-text border-0" id="search-addon">
              <Icon icon="akar-icons:search" color="white" width="20" />
            </button>
          </div>
        </form>
        */}
      {/* SEARCH */}

    </div>
  )
}
