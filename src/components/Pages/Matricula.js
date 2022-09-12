import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getReclusoAll } from '../../store/slices/recluso/reclusoSlices';
import MatriculaModal from '../modal/MatriculaModal'

const Matricula = () => {
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);
    const [titleModal, settitleModal] = useState('');
    const { list: reclusos } = useSelector(store => store.reclusoList);
    const [resulData, setResulData] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [recludoMatricual, setRecludoMatricual] = useState([])
    useEffect(() => {
        try {
            dispatch(getReclusoAll())
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }, [dispatch]);
    const modalNewMatricula = (data) => {
        setModalShow(true)
        settitleModal('Matricular Recluso a una Nueva Lección')
        setRecludoMatricual(data)
    }

    const handleOnChange = () => {
        setIsChecked(!isChecked);

    };

    const handleChange = ({ target }) => {
        const { value } = target
        const data = resulData.filter(p => p.cedula.includes(value));
        console.log(data);
        if (value) {
            setResulData(data)
        } else {
            setResulData(reclusos)
        }


    }
    return (
        <div>
            <MatriculaModal
                show={modalShow}
                title={titleModal}
                onHide={() => setModalShow(false)}
                backdrop="static"
                keyboard={false}
                recluso={recludoMatricual}
            />
            <div className='py-2'>
                <div className='row'>
                    <div className='col-4'>
                        <label htmlFor="name" className='form-label'>Buscar por Identificación</label>
                        <InputGroup >
                            <InputGroup.Text id="basic-addon1">
                                <Icon icon="el:search-alt" width="30" />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Identificación"
                                aria-label="identifica"
                                aria-describedby="basic-addon1"
                                name='name'
                                onChange={handleChange}
                                type="number"
                            />
                        </InputGroup>
                    </div>
                </div>
            </div>
            <Table responsive striped>
                <thead>
                    <tr>
                        <th>Matricular</th>
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
                    {Array.isArray(resulData) ?
                        resulData.map((recluso) =>
                            <tr key={recluso._id}>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        label="Activar Matricula"
                                        name="matri"
                                        checked={isChecked}
                                        onChange={handleOnChange}
                                    />
                                </td>
                                <td>{recluso.cedula}</td>
                                <td>{recluso.nombres}</td>
                                <td>{recluso.apellidos}</td>
                                <td>{recluso.nit}</td>
                                <td>{recluso.celda}</td>
                                <td>{recluso.patio}</td>
                                <td>
                                    <div className='col-2'>
                                        {isChecked ?
                                            <button
                                                onClick={() => modalNewMatricula(recluso)}
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
                                            </button> : null
                                        }
                                    </div>
                                </td>
                            </tr>
                        ) : null
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Matricula