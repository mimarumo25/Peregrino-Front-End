import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
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
  const [modalTitle, setModalTitle] = useState("");
  const [dataEdit, setDataEdit] = useState({});
  const modalNewSalida = () => {
    setModalTitle("Registrar Salida del Recluso")
    setModalShow(true);
    setDataEdit({})
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
  }, [dispatch]);
  useEffect(() => {
    setDataRegistros()
  }, [salidaReclusos]);


  const setDataRegistros = () => {
    if (registros.length === 0 && (registros.length < salidaReclusos.length)) {
      salidaReclusos?.forEach((salidareclusos, index) => {
        salidareclusos?.recluso.forEach((recluso) => {
          salidareclusos?.salida.forEach((salida) => {
            setRegistros((prev) => {
              return (
                [...prev, {
                  id:salidareclusos?._id,
                  idRecluso:recluso._id,
                  cedula: recluso?.cedula,
                  nombre: recluso?.nombres,
                  apellido: recluso?.apellidos,
                  telefono: salidareclusos?.telefono,
                  direccion: salidareclusos?.direccion,
                  Fecha_salida: salidareclusos?.fechaSalida,
                  tipoSalida: salida?.name,
                  observacion: salidareclusos?.observacion,

                }]
              )
            })
          })
        })
      });
    }
  }
  const modalEditSalida = (registro) => {
    setDataEdit(registro)
    setModalTitle("Editar Salida Recluso")
    setModalShow(true);
  }
  const eliminarSalida = () => {

  }
      <Table responsive striped>
        <thead>
          <tr>
            <th>Cedula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Telefono</th>
            <th>Dirección</th>
            <th>Fecha Salida</th>
            <th>Tipo Salida</th>
            <th>Observación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {/* <tbody>{ (matriculas.length > 0 && !isLoading ) && mapArray() }</tbody> */}
        <tbody>
          {
          registros?.map( ( salida) => (
          <tr key={salida.id}>
            <td>{salida.cedula}</td>
            <td>{salida.nombre}</td>
            <td>{salida.apellido}</td>
            <td>{salida.telefono}</td>
            <td>{salida.direccion}</td>
            <td>{salida.Fecha_salida}</td>
            <td>{salida.tipoSalida}</td>
            <td>{salida.observacion }</td>
            <td>
              <div className="col-2">
                <button
                  onClick={() =>

                    modalEditSalida(salida)
                  }
                  data-backdrop="static"
                  data-keyboard="false"
                  className="btn btn-warning w-10"
                  type="button"
                  tabIndex="0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Matricular"
                >
                  <Icon icon="el:address-book-alt" width="20" />
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  tabIndex="0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Eliminar"
                  onClick={() => eliminarSalida(salida.id)}>
                  <Icon icon="fluent:delete-12-regular" width="20" />
                </button>
              </div>
            </td>
          </tr>
          )
          )
          
      }
        </tbody>
      </Table>
    </div>
  )
}
