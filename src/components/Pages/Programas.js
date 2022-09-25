import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deletePrograma, getProgamaAll } from '../../store/slices/programa/programaSlices';
import { ProgramaModal } from '../modal'

export const Programas = () => {
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);
    const [titleModal, settitleModal] = useState('');
    const [programaEdit, setProgramaEdit] = useState({});
    const { list: programas } = useSelector(store => store.progamaList);
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
            <div className='py-2'>
                <Button onClick={modalNewPrograma}><Icon icon="ant-design:plus-circle-outlined" width="20" /> Nuevo</Button>
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
                                <td >{programa.nombre}</td>
                                <td >{programa.descripcion}</td>
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
            
        </div>
    )
}

export default Programas