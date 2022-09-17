import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getMatriculasAll} from '../../store/slices/matricula/matriculasSlices';
import { getLeccionAll } from '../../store/slices/leccion/leccionSlices';
import {getReclusoAll} from "../../store/slices/recluso/reclusoSlices"
import MatriculaModal from "../modal/MatriculaModal"
import MatriculaModalEdit from '../modal/MatriculaModalEdit';

const Matricula = () => {
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);
    const [modalShowE, setModalShowE] = useState(false);
    const [datosEdit, setDatosEdit] = useState([]);
    const { list: matriculas } = useSelector(store => store.matriculaList);
    useEffect(() => {
            dispatch(getLeccionAll())
            dispatch(getMatriculasAll()) 
            dispatch(getReclusoAll())     
    }, [dispatch]);
    const modalNewMatricula = () => {
        setModalShow(true)
    }
    const modalEditMatricula = (cedula, nombres, apellidos, leccion, programa,estado) => {
        setModalShowE(true)
        setDatosEdit({ cedula, nombres, apellidos, leccion,programa, estado });
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
                data={datosEdit}
            />
            <div className='py-2'>
                <button
                    onClick={modalNewMatricula}
                    data-backdrop="static"
                    data-keyboard="false"
                    className='btn btn-warning w-10'
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
                        <th>Fecha de Matricula</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(matriculas) ?
                        matriculas.map((matricula) =>
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
                            )
                        ) : null
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Matricula