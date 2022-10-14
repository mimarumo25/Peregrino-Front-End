import { Button, InputGroup, Modal, Table } from 'react-bootstrap';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { addMatricula } from '../../store/slices/matricula/matriculasSlices';


export const MatriculaModal = (props) => {

    const dispatch = useDispatch()
    const { list: lecciones } = useSelector(store => store.leccionList);
    const { list: reclusos } = useSelector(store => store.reclusoList);
    const [resulData, setResulData] = useState([]);
    const [cedula, setCedula] = useState("");
    const [nombreCompleto, setnombreCompleto] = useState("");
    const validationReclusoSchema = Yup.object().shape({
        cedula: Yup.number().required("Requerido*"),
        nombres: Yup.string().required("Requerido*"),
        leccion: Yup.string().required("Requerido*"),
    });

    const handleChange = ({ target }) => {
        const { value } = target
        const data = reclusos.filter(p => p.cedula.includes(value))
        if (value) {
            setResulData(data)
        } else {
            setResulData(reclusos)
        }
    }
    const addRecluso = (recluso) => {
        const { cedula, nombres, apellidos } = recluso;
        const nuevoNombre = `${ nombres } ${ apellidos }`;
        setCedula(cedula)
        setnombreCompleto( nuevoNombre );
    }
    
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter"
                    >
                        Matricular Recluso a una Nueva Lección
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <label htmlFor="name" className='form-label'>Buscar por Identificación</label>
                                <InputGroup >
                                    <InputGroup.Text id="basic-addon1">
                                        <Icon icon="el:search-alt" width="30" />
                                    </InputGroup.Text>
                                    <input
                                        type="text"
                                        className='form-control'
                                        placeholder='Identificación'
                                        name='busqueda'
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                            </div>
                        </div>
                        <Formik
                            initialValues={{
                                cedula: cedula,
                                nombres: nombreCompleto,
                                leccion: "",
                            }}
                            enableReinitialize
                            validationSchema={validationReclusoSchema}
                            onSubmit={(values, { resetForm }) => {
                                // console.log(cedula, values.leccion);
                                // console.log('Values', values );
                                const { nombres, ...rest } = values;

                                dispatch( addMatricula( rest ) );
                            }}
                        >
                            {({ values, errors, touched, handleChange, handleBlur }) => (

                                <Form>
                                    <div className='row d-flex flex-column flex-sm-row'>
                                        <div className='col'>
                                            <b>
                                                <label htmlFor="cedula" className="form-label">Cedula:</label>
                                            </b>
                                            <input
                                                name="cedula"
                                                id="cedula"
                                                type="number"
                                                className="form-control"
                                                placeholder="Cedula"
                                                disabled
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={cedula}
                                            />
                                            {errors.cedula && touched.cedula ? (
                                                <div className="text-danger">{errors.cedula}</div>
                                            ) : null}
                                        </div>
                                        <div className="col">
                                            <b>
                                                <label htmlFor="nombres" className="form-label">Nombre Completo:</label>
                                            </b>
                                            <Field
                                                name="nombres"
                                                id="nombres"
                                                className="form-control"
                                                placeholder="Nombres"
                                                disabled
                                            />
                                            {errors.nombres && touched.nombres ? (
                                                <div className="text-danger">{errors.nombres}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="row py-2">
                                        <div className="col">
                                            <b>
                                                <label htmlFor="leccion" className="form-label">Seleccione una Lección:</label>
                                            </b>
                                            <Field
                                                as="select"
                                                name="leccion"
                                                id="leccion"
                                                className="form-control"
                                            >
                                                <option defaultValue={true}>Seleccione una Lección</option>
                                                {Array.isArray(lecciones) ? lecciones.map((leccion, i) =>
                                                    leccion.programa.map((pro, i) =>
                                                        <option key={i} value={leccion.nombre}>{`Nivel ${leccion.nivel} - ${pro.nombre} - Lección ${leccion.nombre}`}</option>
                                                    )
                                                ) : null
                                                }
                                            </Field>
                                            {errors.leccion && touched.leccion ? (
                                                <div className="text-danger">{errors.leccion}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <Table responsive striped>
                                        <thead>
                                            <tr>
                                                <th>Cedula</th>
                                                <th>Nombres</th>
                                                <th>Apellidos</th>
                                                <th>Nit</th>
                                                <th>Celda</th>
                                                <th>Patio</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(resulData) ?
                                                resulData.map((recluso) =>
                                                    <tr key={recluso._id}>
                                                        <td>{recluso.cedula}</td>
                                                        <td>{recluso.nombres}</td>
                                                        <td>{recluso.apellidos}</td>
                                                        <td>{recluso.nit}</td>
                                                        <td>{recluso.celda}</td>
                                                        <td>{recluso.patio}</td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className='btn btn-success'
                                                                onClick={() => addRecluso(recluso)}
                                                            >
                                                                add
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ) : null
                                            }
                                        </tbody>
                                    </Table>

                                    <Modal.Footer>
                                        <button type="submit" id="guardar" className="btn btn-success">
                                            <Icon icon="fluent:save-24-filled" color="white" width="20" />
                                            Matricular
                                        </button>
                                        <Button onClick={props.onHide} className="btn btn-danger">
                                            Cancelar
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Modal.Body>

            </Modal>
        </div >
    )
}

export default MatriculaModal;