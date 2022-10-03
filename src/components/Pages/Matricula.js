import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteMatricula, getMatriculasAll } from "../../store/slices/matricula/matriculasSlices";
import { getLeccionAll } from "../../store/slices/leccion/leccionSlices";
import { getReclusoAll } from "../../store/slices/recluso/reclusoSlices";
import { MatriculaModal, MatriculaModalEdit } from "../modal";

import { LoaderSpinner } from "../";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

export const Matricula = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [modalShowE, setModalShowE] = useState(false);
  const [datosEdit, setDatosEdit] = useState([]);
  const [ pdfData, setPdfData ] = useState([]);

  const [ isLoading, setIsLoading ] = useState( true );

  const { list: matriculas } = useSelector((store) => store.matriculaList);

  const eliminarMatricula = ( id ) => {
    dispatch(deleteMatricula( id ));
  };

  const setAllMatriculasInState = () => {

      if ( pdfData.length === 0 && (pdfData.length < matriculas.length) && !isLoading ) {
        matriculas.forEach(( matricula, index ) => {
          matricula.recluso.forEach(( recluso ) => {
            matricula.leccion.forEach(( leccion ) => {
              setPdfData(( prev ) => {
                return (
                  [ ...prev,{
                    cedula: recluso.cedula,
                    nombre: recluso.nombres,
                    apellido: recluso.apellidos,
                    programa: leccion.programa[0].nombre,
                    leccion: leccion.nombre,
                    nivel: leccion.nivel ? leccion.nivel : 'NA',
                    fecha: leccion.nivel ? leccion.nivel : 'NA',
                    estado: matricula.estado[0] ? matricula.estado[0].name : 'NA',
                    estadoId: matricula.estado[0] ? matricula.estado[0]._id : 'NA',
                    matriculaId: matricula._id
                  }]
                )
              })
            })
          })
        });
      }

  };

  useEffect(() => {
    setIsLoading( true );
    dispatch(getLeccionAll());
    dispatch(getMatriculasAll());
    dispatch(getReclusoAll());
    setIsLoading( false );
  }, [ dispatch ]);

  useEffect(() => {
    setAllMatriculasInState();
  }, [ matriculas ]);

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
      head: [['Cedula', 'Nombre', 'Apellido', 'Programa', 'Leccion', 'Nivel', 'Fecha', 'Estado' ]],
      body: pdfData.map( celda => (
        [ celda.cedula, celda.nombre, celda.apellido, celda.programa, celda.leccion, celda.nivel, new Date(celda.fecha).toLocaleDateString(), celda.estado ]
        )),
      margin: {
        top: 42, right: 14, bottom: 20, left: 14
      }
      
    });

    doc.setFont('helvetica', 'normal');
    //text hello
    doc.setFontSize(14);
    doc.setTextColor(1, 1, 1);

    doc.text(
      `Teléfono: +57 323 5909324`,
      10,
      280,
    );

    doc.text(
      `Dirección: Calle 24 Cra 11 y 12 - Barrio margaritas diagonal a la cancha`,
      10,
      290,
    );

    doc.save('tabla.pdf');
  }

  return (
    <div>
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
        data={ datosEdit }
      />
      <div className="py-2">
        <button
          onClick={modalNewMatricula}
          data-backdrop="static"
          data-keyboard="false"
          className="btn btn-warning w-10"
          type="button"
        >
          <Icon icon="el:address-book-alt" width="20" /> Nueva Matricula
        </button>
      </div>
      <Table responsive striped>
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
        <tbody>{ ( matriculas.length > 0 && !isLoading ) && (
          pdfData.map( ( celda, index) => (
            <tr key={ celda.matriculaId }>
            <td>{celda.cedula}</td>
            <td>{celda.nombre}</td>
            <td>{celda.apellido}</td>
                  <td>{celda.programa}</td>
                  <td>{celda.leccion}</td>
                  <td>{celda.nivel ? `${ celda.nivel }` : 'NA' }</td>
                  <td>{new Date(celda.fecha).toLocaleDateString()}</td>
                  <td>{celda.estado ? celda.estado : 'NA' }</td>
                  <td>
                  <div className="col-2">
                           <button
                            onClick={() =>

                              modalEditMatricula(
                                celda.cedula,
                                celda.nombre,
                                celda.apellido,
                                celda.leccion,
                                celda.programa,
                                celda.estado ? celda.estado : 'NA',
                                celda.nivel ? celda.nivel : 'NA',
                                celda.estado ? celda.estadoId : 'NA',
                                celda.matriculaId
                              )
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
                            onClick={() => eliminarMatricula( celda.matriculaId )}>
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
        ( isLoading && matriculas.length === 0 ) && <LoaderSpinner />
      }

      {
        ( !isLoading && matriculas.length !== 0 ) && <button 
        className="btn btn-primary"
        onClick={ createPdf }>Descargar Pdf</button>
      }
    </div>
  );
};

export default Matricula;