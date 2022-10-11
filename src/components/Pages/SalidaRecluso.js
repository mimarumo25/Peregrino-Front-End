import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getReclusoAll } from '../../store/slices/recluso/reclusoSlices';
import { deleteSalidaRecluso, getSalidaReclusoAll } from '../../store/slices/salidaRecluso/salidaReclusoSlices';
import SalidaReclusoModal from '../modal/SalidaReclusoModal';
import RectHTMLTableExcel from 'react-html-table-to-excel'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
export const SalidaRecluso = () => {

  const dispatch = useDispatch();
  const { list: salidaReclusos } = useSelector(store => store.salidaReclusosList);
  const [registros, setRegistros] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [dataEdit, setDataEdit] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState('');
  const modalNewSalida = () => {
    setModalTitle("Registrar Salida del Recluso")
    setModalShow(true);
    setDataEdit({})
  };
  const handleSearch = (e) => {
    setValue(e.target.value);
    if (e.target.value <= 0) {
      dispatch();
    }
  };

  useEffect(() => {   
    setIsLoading(true);
    dispatch(getReclusoAll()); 
    dispatch(getSalidaReclusoAll()); 
    setIsLoading(false);
  }, [dispatch]);
useEffect(() => {
  setDataRegistros()
}, [salidaReclusos]);

const setDataRegistros = () => {
  if ( registros.length === 0 && (registros.length < salidaReclusos.length)&& !isLoading ) {
    salidaReclusos?.forEach(( salidareclusos, index ) => {    
      salidareclusos?.recluso?.forEach(( recluso ) => {
          setRegistros(( prev ) => {
            return (
              [ ...prev,{
                id:salidareclusos?._id,
                idRecluso:recluso._id,
                cedula: recluso?.cedula,
                nombre: recluso?.nombres,
                apellido: recluso?.apellidos,
                direccion: salidareclusos.direccion,
                telefono: salidareclusos?.telefono,
                Fecha_salida: salidareclusos?.fechaSalida,
                tipoSalida:salidareclusos?.salida[0]?.name,
                observacion: salidareclusos?.observacion,
              }]

            )
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
const eliminarSalida = (id) => {
dispatch(deleteSalidaRecluso(id))
}
  return (
    <div>
      <SalidaReclusoModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        keyboard={false}
        title={modalTitle}
        data={dataEdit}
      />

      <div className="py-2 d-flex align-items-center justify-content-between">
        <Button onClick={modalNewSalida}>
          <Icon icon="ant-design:plus-circle-outlined" width="20" /> Nuevo
        </Button>
        <div className='d-flex justify-content-evenly'>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '.2rem'
          }}
            className="form-label"
          >
            Exportar En
          </label>
          <RectHTMLTableExcel type='button' className='btn btn-success mx-2' style={{
            display: 'flex',
            alignItems: 'center',
            gap: '.2rem'
          }}
            id="exportarExcel"
            table="informe"
            filename="SalidasReclusos"
            sheet="Pagina 1"
            buttonText={
              <Icon
                icon="file-icons:microsoft-excel"
                color="white"
                width="25"
              />
            }
          />
          <button type='button' className='btn btn-danger' style={{
            display: 'flex',
            alignItems: 'center',
            gap: '.2rem'
          }} >
            <Icon icon="ant-design:file-pdf-outlined" color="white" width="25" />
          </button>
        </div>
        {/* SEARCH */}
        <form
          style={{
            width: "320px",
            padding: "0 1rem",
          }}
          className="form"
         
        >
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              onChange={handleSearch}
              placeholder={`Buscar Leccion por Nombre`}
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
      <Table responsive striped id='informe'
      style={{
        minWidth: '100%'
      }}>
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
              <div className="d-grid gap-2 d-md-block">
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
