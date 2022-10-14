import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteMatricula, getMatriculasAll } from "../../store/slices/matricula/matriculasSlices";
import { getLeccionAll } from "../../store/slices/leccion/leccionSlices";
import { getReclusoAll } from "../../store/slices/recluso/reclusoSlices";
import { MatriculaModal, MatriculaModalEdit } from "../modal";
import RectHTMLTableExcel from 'react-html-table-to-excel'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LoaderSpinner } from "../";

export const Matricula = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [modalShowE, setModalShowE] = useState(false);
  const [datosEdit, setDatosEdit] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  const [value, setValue] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const { list: matriculas } = useSelector((store) => store.matriculaList);

  const eliminarMatricula = (id) => {
    dispatch(deleteMatricula(id));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
  }

  const setAllMatriculasInState = () => {
    setPdfData([]);
    if (!isLoading) {
      matriculas.forEach((matricula, index) => {
        matricula.recluso.forEach((recluso) => {
          matricula.leccion.forEach((leccion) => {
            setPdfData((prev) => {
              return (
                [...prev, {
                  cedula: recluso?.cedula,
                  nombre: recluso?.nombres,
                  apellido: recluso?.apellidos,
                  programa: leccion?.programa[0]?.nombre,
                  leccion: leccion?.nombre,
                  nivel: leccion?.nivel ? leccion.nivel : 'NA',
                  fecha: leccion?.nivel ? leccion.nivel : 'NA',
                  estado: matricula?.estado[0] ? matricula?.estado[0]?.name : 'NA',
                  estadoId: matricula?.estado[0] ? matricula?.estado[0]?._id : 'NA',
                  matriculaId: matricula?._id
                }]
              )
            })
          })
        })
      });
    }

  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getLeccionAll());
    dispatch(getMatriculasAll());
    dispatch(getReclusoAll());
    setIsLoading(false);
  }, [dispatch,matriculas]);

  useEffect(() => {
    setAllMatriculasInState();
  }, [matriculas,dispatch]);

  const modalNewMatricula = () => {
    setModalShow(true);
  };
  const modalEditMatricula = (
    cedula = '',
    nombres = '',
    apellidos = '',
    leccion = '',
    programa = '',
    estado = '',
    nivel = '',
    estadoId = '',
    matriculaId = ''
  ) => {
    setDatosEdit({ cedula, nombres, apellidos, leccion, programa, estado, nivel, estadoId, matriculaId });
    setModalShowE(true);
  };

  const createPdf = () => {

    const doc = new jsPDF();
    const logo = new Image();
    logo.src = '../../../public/assets/logo.jpeg';

    doc.setFont('helvetica', 'bold');
    //text hello
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `Listado General De Matriculas`,
      60,
      35,
    );

    doc.addImage(
      './assets/logo.jpeg',
      45,
      0,
      0,
      0
    );

    autoTable(doc, {
      head: [['Cedula', 'Nombre', 'Apellido', 'Programa', 'Leccion', 'Nivel', 'Fecha', 'Estado']],
      body: pdfData.map(celda => (
        [celda.cedula, celda.nombre, celda.apellido, celda.programa, celda.leccion, celda.nivel, new Date(celda.fecha).toLocaleDateString(), celda.estado]
      )),
      margin: {
        top: 42, right: 14, bottom: 20, left: 14
      },
      theme: 'grid',
      headStyles: { halign: 'center', fillColor: '#8f0000' },
      columnStyles: {
        0: { halign: 'center', },
        1: { halign: 'center', },
        2: { halign: 'center', },
        3: { halign: 'center', },
        4: { halign: 'center', },
        5: { halign: 'center', },
        6: { halign: 'center', },
        7: { halign: 'center', }
      },

    });

    doc.setFont('helvetica', 'normal');
    //text hello
    doc.setFontSize(8);
    doc.setTextColor(1, 1, 1);

    doc.text(
      `Teléfono: +57 323 5909324`,
      10,
      285,
    );

    doc.text(
      `Dirección: Calle 24 Cra 11 y 12 - Barrio margaritas diagonal a la cancha`,
      10,
      290,
    );

    doc.save('Matriculas.pdf');
  }

  return (
    <div className="section">
      <MatriculaModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        keyboard={false}
      />
      <MatriculaModalEdit
        show={modalShowE}
        onHide={() => setModalShowE(false)}
        backdrop="static"
        keyboard={false}
        data={datosEdit}
      />
      <div className="py-2 px-1 d-flex align-items-center justify-content-between flex-column flex-md-row gap-4">
        <button
          onClick={modalNewMatricula}
          data-backdrop="static"
          data-keyboard="false"
          className="btn btn-warning w-10"
          type="button"
        >
          <Icon icon="el:address-book-alt" width="20" /> Nueva Matricula
        </button>
        <div className='d-flex align-items-center justify-content-evenly gap-2 order-3'>
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
            filename="Matriculas"
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
          }} onClick={createPdf}>
            <Icon icon="ant-design:file-pdf-outlined" color="white" width="25" />
          </button>
        </div>
        <div style={{
          width: '300px'
        }}>
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              onChange={handleChange}
              placeholder={`Buscar Matricula por nombre`}
              value={value}
              aria-label="Buscar..."
              aria-describedby="search-addon"
            />
            <button className="input-group-text border-0" id="search-addon">
              <Icon icon="akar-icons:search" color="white" width="20" />
            </button>
          </div>
        </div>

      </div>
      <Table responsive striped style={{
        minWidth: '100%'
      }}
      id="informe"
      >
        <thead>
          <tr>
            <th>Cedula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Programa</th>
            <th>Lección</th>
            <th>Nivel</th>
            <th>Fecha de Matricula</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {/* <tbody>{ (matriculas.length > 0 && !isLoading ) && mapArray() }</tbody> */}
        <tbody>{(matriculas.length > 0 && !isLoading) && (
          pdfData.filter(data => data.cedula.includes(value))
            .map((celda, index) => (
              <tr key={celda.matriculaId}>
                <td>{celda?.cedula}</td>
                <td>{celda?.nombre}</td>
                <td>{celda?.apellido}</td>
                <td>{celda?.programa}</td>
                <td>{celda?.leccion}</td>
                <td>{celda?.nivel ? `${celda?.nivel}` : 'NA'}</td>
                <td>{new Date(celda?.fecha).toLocaleDateString()}</td>
                <td>{celda?.estado ? celda?.estado : 'NA'}</td>
                <td>
                  <div className="col-2 d-flex gap-2">
                    <button
                      onClick={() =>

                        modalEditMatricula(
                          celda?.cedula,
                          celda?.nombre,
                          celda?.apellido,
                          celda?.leccion,
                          celda?.programa,
                          celda?.estado ? celda.estado : 'NA',
                          celda?.nivel ? celda.nivel : 'NA',
                          celda?.estado ? celda.estadoId : 'NA',
                          celda?.matriculaId
                        )
                      }
                      data-backdrop="static"
                      data-keyboard="false"
                      className="btn btn-warning w-10"
                      type="button"
                      tabIndex="0"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Editar"
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
                      onClick={() => eliminarMatricula(celda.matriculaId)}>
                      <Icon icon="fluent:delete-12-regular" width="20" />
                    </button>
                  </div>
                </td>
              </tr>
            )
            )
        )
        }
        </tbody>
      </Table>

      {
        (isLoading && matriculas.length === 0) && <LoaderSpinner />
      }
    </div>
  );
};

export default Matricula;