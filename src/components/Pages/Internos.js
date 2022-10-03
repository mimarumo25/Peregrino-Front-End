import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteRecluso, getReclusoAll, searchReclusos } from '../../store/slices/recluso/reclusoSlices';
import { ReclusoModal } from '../modal';
import { Icon } from '@iconify/react';
import { Button } from 'react-bootstrap';
import { Search } from '../Search';

export const Internos = () => {
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false);
  const [titleModal, settitleModal] = useState('');
  const [reclusoEdit, setreclusoEdit] = useState({});
  const { list: reclusos, total } = useSelector(store => store.reclusoList);
  const [desde, setDesde] = useState(0);
  const [countPage ,setCountPage] = useState(1);

  const [value, setValue] = useState('');

  const handleSearch = ( e ) => {
      setValue( e.target.value );
      if ( e.target.value <= 0 ) {
        dispatch( getReclusoAll() );
      }
  }

  const handleSubmit = ( e ) => {
    e.preventDefault();
    dispatch( searchReclusos( value ) );
  }

  useEffect(() => {
    try {
      if ( desde < 0 ) {
        dispatch(getReclusoAll(0));
      } else if ( desde >= total && total !== 0 ) {
        setDesde( prevDesde => prevDesde - 5 );
      } else {
        dispatch(getReclusoAll( desde ));
      }
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }, [dispatch, desde]);

  const modalNewRecluso = () => {
    setModalShow(true)
    settitleModal('Nuevo Recluso')
    setreclusoEdit({})
  }
  function eliminarRecluso(id) {
    dispatch(deleteRecluso(id))
  }
  const modalEditRecluso = (recluso) => {
    setModalShow(true);
    settitleModal('Editar Recluso');
    setreclusoEdit(recluso);
    console.log( recluso );
    recluso={reclusoEdit};
  }

  const cambiarPagina = ( valor ) => {
    if ( desde === 0 && valor > 0 ) {
      setDesde(+5);
      return;
    }

    if ( valor < 0 && desde < 0 ) {
      setDesde(0);
    } else if ( desde >= total ) {
      setDesde( prevDesde => prevDesde - valor );
    } else {
      setDesde( prevDesde => prevDesde + valor );
    }

  }

  return (
    <div>
      {/* <h2>{ ( desde < 0 ) ? 0 : desde }/{ total }</h2> */}

      <ReclusoModal
        show={modalShow}
        title={titleModal}
        onHide={() => setModalShow(false)}
        recluso={reclusoEdit}
        backdrop="static"
        keyboard={false}
      />
      <div className='py-2 d-flex align-items-center justify-content-between'>
        <Button onClick={modalNewRecluso}><Icon icon="ant-design:plus-circle-outlined" width="20" /> Nuevo</Button>
        {/* <Search term='Reclusos' /> */}
        {/* SEARCH */}
        <form style={{
        width: '320px',
        padding: '0 1rem'
    }} className="form" onSubmit={ handleSubmit }>
    <div className="input-group">
      <input
        type="search"
        className="form-control"
        onChange={ handleSearch }
        placeholder={`Buscar Recluso por Cedula`}
        value={ value }
        aria-label="Buscar..."
        aria-describedby="search-addon"
      />
      <button className="input-group-text border-0" id="search-addon">
        <Icon icon="akar-icons:search" color="white" width="20" />
      </button>
    </div>
    </form>
        {/* SEARCH */}
      </div>
      <table className="table table-hover fs-6">
        <thead>
          <tr>
            <th>Cedula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Nit</th>
            <th>Celda</th>
            <th>Patio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(reclusos) ?
            reclusos.map((recluso) =>
              <tr key={recluso._id}>
                <td>{recluso.cedula}</td>
                <td>{recluso.nombres}</td>
                <td>{recluso.apellidos}</td>
                <td>{recluso.nit}</td>
                <td>{recluso.celda}</td>
                <td>{recluso.patio}</td>
                <td className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-warning mx-1"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Editar"
                    onClick={() => modalEditRecluso(recluso)}
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
                    onClick={() => eliminarRecluso(recluso._id)}>
                    <Icon icon="fluent:delete-12-regular" width="20" />
                  </button>
                </td>
              </tr>
            ) : null
          }
        </tbody>
      </table>
      <div className='d-flex align-items-center justify-content-between mt-4'>
      {
        value.length === 0 && (
        <div className='actions d-flex gap-2'>
          {
            desde > 0 && <button className='btn btn-secondary' onClick={ () => {
              cambiarPagina( -5 );
              setCountPage( prev => prev - 1 )
            }}>Previos</button>
          }
          {
            !(countPage >= Math.ceil(total / 5)) && (
              <button className='btn btn-secondary' onClick={ () => {
                cambiarPagina( 5 );
                setCountPage( prev => prev + 1 );
              } } >Siguientes</button>
            )
          }
        </div>
        )
      }
        <h2>Paginas: { countPage }/{ Math.ceil(total / 5) }</h2>
        </div>

    </div>
  )
}

export default Internos