import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deletePrograma, getProgamaAll, searchProgramas } from '../../store/slices/programa/programaSlices';
import { ProgramaModal } from '../modal'

export const Programas = () => {
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);
    const [titleModal, settitleModal] = useState('');
    const [programaEdit, setProgramaEdit] = useState({});
    const { list: programas, total } = useSelector(store => store.progamaList);

    const [desde, setDesde] = useState(0);
  
  const [value, setValue] = useState('');

  const handleSearch = ( e ) => {
      setValue( e.target.value );
      if ( e.target.value <= 0 ) {
        dispatch( getProgamaAll() );
      }
  }

  const handleSubmit = ( e ) => {
    e.preventDefault();
    dispatch( searchProgramas( value ) );
  }

    useEffect(() => {
        try {
            dispatch(getProgamaAll())
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }, [dispatch]);
    const modalNewPrograma = () => {
        setModalShow(true)
        settitleModal('Nueva Programa')
        setProgramaEdit({})
    }
    function eliminarPrograma(id) {
        dispatch(deletePrograma(id))
    }
    const modalEditPrograma = (programa) => {
        setModalShow(true)
        settitleModal('Editar Programa')
        setProgramaEdit(programa)
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
            <ProgramaModal
                show={modalShow}
                title={titleModal}
                onHide={() => setModalShow(false)}
                programa={programaEdit}
                backdrop="static"
                keyboard={false}
            />
            <div className='py-2 d-flex align-items-center justify-content-between'>
                <Button onClick={modalNewPrograma}><Icon icon="ant-design:plus-circle-outlined" width="20" /> Nuevo</Button>
                {/* SEARCH */}
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
              placeholder={`Buscar Programas por Nombre`}
              value={value}
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
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(programas) ?
                        programas.map((programa, i) =>
                            <tr key={i}>
                                <td >{i + 1}</td>
                                <td >{programa?.nombre}</td>
                                <td >{programa?.descripcion}</td>
                                <td className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button
                                        type="button"
                                        className="btn btn-warning mx-1"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Editar"
                                        onClick={() => modalEditPrograma(programa)}
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
                                        onClick={() => eliminarPrograma(programa._id)}>
                                        <Icon icon="fluent:delete-12-regular" width="20" />
                                    </button>
                                </td>
                            </tr>
                        ) : null
                    }
                </tbody>
            </table>
            <div className='d-flex align-items-center justify-content-between mt-4'>

            {/* PAGINATION */}
{
        value.length === 0 && (
        <div className='actions d-flex gap-2'>
          {
            desde > 0 && <button className='btn btn-secondary' onClick={ () => cambiarPagina( -5 ) }>Previos</button>
          }
          {
            ( total > 5 ) && <button className='btn btn-secondary' onClick={ () => cambiarPagina( 5 ) } >Siguientes</button>
          }
        </div>
        )
      }
      {/* PAGINATION */}
          <h3>Paginas: { Math.ceil(total / 5) }</h3>
        </div>
        </div>
    )
}

export default Programas