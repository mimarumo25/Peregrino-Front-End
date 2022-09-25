import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteLeccion, getLeccionAll } from '../../store/slices/leccion/leccionSlices';
import { LeccionModal } from '../modal';

export const Lecciones = () => {
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false);
  const [titleModal, settitleModal] = useState('');
  const [leccionEdit, setLeccionEdit] = useState({});
  const { list: lecciones } = useSelector(store => store.leccionList);
  useEffect(() => {
    try {
      dispatch(getLeccionAll())
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }, [dispatch]);
  const modalNewLeccion = () => {
    setModalShow(true)
    settitleModal('Nueva Lección')
    setLeccionEdit({})
  }
  function eliminarLeccion(id) {
    dispatch(deleteLeccion(id))
  }
  const modalEditLeccion = (leccion) => {
    setModalShow(true)
    settitleModal('Editar Lección')
    setLeccionEdit(leccion)

  }
  return (
    <div>
      <LeccionModal
        show={modalShow}
        title={titleModal}
        onHide={() => setModalShow(false)}
        leccion={leccionEdit}
        programa=""
        backdrop="static"
        keyboard={false}
      />
      <div className='py-2'>
        <Button onClick={modalNewLeccion}><Icon icon="ant-design:plus-circle-outlined" width="20" /> Nuevo</Button>
      </div>
      <table className="table table-hover fs-6">
        <thead>
          <tr>
          <th>Nivel</th>
            <th>Nombre</th>
            <th>Programa</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(lecciones) ?
            lecciones.map((leccion,i) =>
              <tr key={leccion._id}>
                 <td>{leccion.nivel}</td>
                <td>{leccion.nombre}</td>
                <td>{
                  Array.isArray(leccion.programa) ?
                    leccion.programa.map((programa) =>
                      <span key={programa._id}>
                        {programa.nombre}
                      </span>
                    ) : null
                }</td>
                <td>{leccion.descripcion}</td>
                <td className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-warning mx-1"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Editar"
                    onClick={() => modalEditLeccion(leccion)}
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
                    onClick={() => eliminarLeccion(leccion._id)}>
                    <Icon icon="fluent:delete-12-regular" width="20" />
                  </button>
                </td>
              </tr>
            ) : null
          }
        </tbody>
      </table>
      </div>
  )
}

export default Lecciones