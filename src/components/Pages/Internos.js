import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteRecluso, getReclusoAll } from '../../store/slices/recluso/reclusoSlices';
import { ReclusoModal } from '../modal';
import { Icon } from '@iconify/react';
import { Button } from 'react-bootstrap';

export const Internos = () => {
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false);
  const [titleModal, settitleModal] = useState('');
  const [reclusoEdit, setreclusoEdit] = useState({});
  const { list: reclusos } = useSelector(store => store.reclusoList);

  useEffect(() => {
    try {
      console.log('Se ejecuta el');
      dispatch(getReclusoAll())
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }, [dispatch]);
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
  return (
    <div>
      <ReclusoModal
        show={modalShow}
        title={titleModal}
        onHide={() => setModalShow(false)}
        recluso={reclusoEdit}
        backdrop="static"
        keyboard={false}
      />
      <div className='py-2'>
        <Button onClick={modalNewRecluso}><Icon icon="ant-design:plus-circle-outlined" width="20" /> Nuevo</Button>
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
    </div>
  )
}

export default Internos