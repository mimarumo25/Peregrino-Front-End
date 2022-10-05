import { Button, InputGroup, Modal, Table } from 'react-bootstrap';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

export const SalidaReclusoModal = (props) => {

    const { list: reclusos } = useSelector(store => store.reclusoList);
    const [resulData, setResulData] = useState([]);
    const [cedula, setCedula] = useState("");
    const [nombreCompleto, setnombreCompleto] = useState("");
  
    const validationReclusoSchema = Yup.object().shape({
        cedula: Yup.number().required("Requerido*"),
        nombres: Yup.string().required("Requerido*"),
        telefono: Yup.string().required("Requerido*"),
        direccion: Yup.string().required("Requerido*"),
        salida: Yup.string().required("Requerido*"),
        observacion: Yup.string().required("Requerido*"),
        fecha: Yup.date().required("")
      
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
        const nuevoNombre = `${nombres} ${apellidos}`;
        setCedula(cedula)
        setnombreCompleto(nuevoNombre);
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
                        Registrar Salida del Recluso
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-4'>
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
                                telefono: "",
                                direccion: "",
                                fecha: "",
                                salida: "",
                                observacion: ""
                            }}
                            enableReinitialize
                            validationSchema={validationReclusoSchema}
                            onSubmit={(values, { resetForm }) => {
                                const { nombres, ...rest } = values;

                                alert(JSON.stringify(values));


                                console.log({ rest });
                                /* dispatch(addMatricula(rest));*/
                                setCedula('')
                                setnombreCompleto('')
                                resetForm()
                            }}
                        >
                            {({ values, errors, touched, handleChange, handleBlur }) => (

                                <Form>
                                    <div className='row'>
                                        <div className='col-6'>
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
                                        <div className="col-6">
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
                                        <div className="col-6">
                                            <b>
                                                <label htmlFor="telefono" className="form-label">Teléfono:</label>
                                            </b>
                                            <Field
                                                name="telefono"
                                                id="telefono"
                                                className="form-control"
                                                placeholder="Teléfono"

                                            />
                                            {errors.telefono && touched.telefono ? (
                                                <div className="text-danger">{errors.telefono}</div>
                                            ) : null}
                                        </div>
                                        <div className="col-6">
                                            <b>
                                                <label htmlFor="direccion" className="form-label">Dirección:</label>
                                            </b>
                                            <Field
                                                name="direccion"
                                                id="direccion"
                                                className="form-control"
                                                placeholder="direccion"

                                            />
                                            {errors.direccion && touched.direccion ? (
                                                <div className="text-danger">{errors.direccion}</div>
                                            ) : null}
                                        </div>

                                    </div>
                                    <div className="row py-2">
                                        <div className="col-6">
                                            <b>
                                                <label htmlFor="fecha" className="form-label">Fecha de Salida:</label>
                                            </b>
                                            <input
                                                type="date"
                                                name="fecha"
                                                id="fecha"
                                                className="form-control"
                                                placeholder="Fecha"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                defaultValue={values.fecha}

                                            />
                                            {errors.fecha && touched.fecha ? (
                                                <div className="text-danger">{errors.fecha}</div>
                                            ) : null}
                                        </div>
                                        <div className="col-6">
                                            <b>
                                                <label htmlFor="salida" className="form-label">Seleccione un Tipo de Salida:</label>
                                            </b>
                                            <Field
                                                as="select"
                                                name="salida"
                                                id="salida"
                                                className="form-control"
                                            >
                                                <option defaultValue={true}>Seleccione Tipo Salida</option>
                                                <option value={"1000"}>Seleccione Tipo Salida</option>
                                                {/*Array.isArray(lecciones) ? lecciones.map((leccion, i) =>
                                                    leccion.programa.map((pro, i) =>
                                                        <option key={i} value={leccion.nombre}>{`Nivel ${leccion.nivel} - ${pro.nombre} - Lección ${leccion.nombre}`}</option>
                                                    )
                                                ) : null*/
                                                }
                                            </Field>
                                            {errors.salida && touched.salida ? (
                                                <div className="text-danger">{errors.salida}</div>
                                            ) : null}
                                        </div>
                                        <div className="row py-2">
                                            <div className="col">
                                                <b>
                                                    <label htmlFor="observacion" className="form-label">Observación:</label>
                                                </b>
                                                <Field
                                                    as="textarea"
                                                    name="observacion"
                                                    id="observacion"
                                                    className="form-control"
                                                    placeholder="Observación"

                                                />
                                                {errors.observacion && touched.observacion ? (
                                                    <div className="text-danger">{errors.observacion}</div>
                                                ) : null}
                                            </div>
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
                                        <button type="submit" id="guardarSalida" className="btn btn-success">
                                            <Icon icon="fluent:save-24-filled" color="white" width="20" />
                                            Guardar Salida
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

export default SalidaReclusoModal;