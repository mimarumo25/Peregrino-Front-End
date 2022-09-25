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

export const Matricula = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [modalShowE, setModalShowE] = useState(false);
  const [datosEdit, setDatosEdit] = useState([]);

  const [ isLoading, setIsLoading ] = useState( true );

  const { list: matriculas } = useSelector((store) => store.matriculaList);

  const eliminarMatricula = ( id ) => {
    dispatch(deleteMatricula( id ));
  };

  const mapArray = () => {
    let mat = [];

    let newMat = matriculas.map((matricula, index) => {
      // console.log({ matricula });
      return (
        <tr key={ matricula._id }>
          {matricula.recluso.map((recluso) => {
            return (
              <>
                <td>{recluso.cedula}</td>
                <td>{recluso.nombres}</td>
                <td>{recluso.apellidos}</td>
                {matricula.leccion.map((leccion) => {
                  return (
                    <>
                      <td>{leccion.programa[0].nombre}</td>
                      <td>{leccion.nombre}</td>
                      <td>{ leccion.nivel ? `${ leccion.nivel }` : 'NA' }</td>
                      <td>
                        {new Date(matricula.createdAt).toLocaleDateString()}
                      </td>
                      <td>{  matricula.estado[0] ? matricula.estado[0].name : 'NA' }</td>
                      <td>
                        <div className="col-2">
                          <button
                            onClick={() =>
                              modalEditMatricula(
                                recluso.cedula,
                                recluso.nombres,
                                recluso.apellidos,
                                leccion.nombre,
                                leccion.programa[0].nombre,
                                matricula.estado[0] ? matricula.estado[0].name : 'NA',
                                leccion.nivel ? leccion.nivel : 'NA',
                                matricula.estado[0] ? matricula.estado[0]._id : 'NA',
                                matricula._id
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
                            onClick={() => eliminarMatricula( matricula._id )}>
                            <Icon icon="fluent:delete-12-regular" width="20" />
                          </button>
                        </div>
                      </td>
                    </>
                  );
                })}
              </>
            );
          })}
        </tr>
      );
    });

    newMat.forEach((item) => {
      mat.push(item);
    });

    return mat;
  };

  useEffect(() => {
    setIsLoading( true );
    dispatch(getLeccionAll());
    dispatch(getMatriculasAll());
    dispatch(getReclusoAll());
    setIsLoading( false );
  }, [ dispatch ]);

  useEffect(() => {
    mapArray();
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
    setModalShowE(true);
    setDatosEdit({ cedula, nombres, apellidos, leccion, programa, estado, nivel, estadoId, matriculaId });
  };

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
        <tbody>{ (matriculas.length > 0 && !isLoading ) && mapArray() }</tbody>
      </Table>

      {
        ( isLoading && matriculas.length === 0 ) && <LoaderSpinner />
      }
    </div>
  );
};

export default Matricula;




/* 
matricula.recluso.map((recluso) =>
                                matricula.leccion.map((leccion) =>
                                    leccion.programa.map((programa) =>
                                        matricula.estado.map((estado) =>
                                            <tr key={matricula._id}>
                                                <td>{recluso.cedula}</td>
                                                <td>{recluso.nombres}</td>
                                                <td>{recluso.apellidos}</td>
                                                <td>{programa.nombre}</td>
                                                <td>{leccion.nombre}</td>
                                                <td>{new Date(matricula.createdAt).toLocaleDateString()}</td>
                                                <td>{estado.name}</td>
                                                <td>
                                                    <div className='col-2'>
                                                        <button
                                                            onClick={() => modalEditMatricula(
                                                                recluso.cedula,
                                                                recluso.nombres,
                                                                recluso.apellidos,
                                                                leccion,
                                                                programa.nombre,
                                                                estado.name
                                                            )}
                                                            data-backdrop="static"
                                                            data-keyboard="false"
                                                            className='btn btn-warning w-10'
                                                            type="button"
                                                            tabIndex="0"
                                                            data-bs-toggle="tooltip"
                                                            data-bs-placement="top"
                                                            title="Matricular"
                                                        >
                                                            <Icon icon="el:address-book-alt" width="20" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                )

*/
