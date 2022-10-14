import { Modal, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addRecluso, updateRecluso } from '../../store/slices/recluso/reclusoSlices';

export const ReclusoModal = (props) => {
    
    const { _id, cedula, nombres, apellidos, nit, celda, patio } = props.recluso
    const dispatch = useDispatch();
    const validationReclusoSchema = Yup.object().shape({
        cedula: Yup.number().required("Requerido*"),
        nombres: Yup.string().required("Requerido*"),
        apellidos: Yup.string().required("Requerido*"),
        nit: Yup.number().required("Requerido*"),
        celda: Yup.string().required("Requerido*"),
        patio: Yup.string().required("Requerido")
    })
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            cedula: cedula || "",
                            nombres: nombres || "",
                            apellidos: apellidos || "",
                            nit: nit || "",
                            celda: celda || "",
                            patio: patio || ""
                        }}
                        validationSchema={validationReclusoSchema}
                        onSubmit={(values, { resetForm }) => {
                            if (_id) {
                                dispatch(updateRecluso(values, _id))
                            } else {
                                dispatch(addRecluso(values))
                            }
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="row d-flex flex-column flex-sm-row">
                                    <div className="col col-sm-6">
                                        <b>
                                            <label htmlFor="cedula">Cedula:</label>
                                        </b>
                                        <Field
                                            name="cedula"
                                            id="cedula"
                                            type="number"
                                            className="form-control"
                                            placeholder="Cedula"
                                        />
                                        {errors.cedula && touched.cedula ? (
                                            <div className="text-danger">{errors.cedula}</div>
                                        ) : null}
                                    </div>
                                    <div className="col col-sm-6">
                                        <b>
                                            <label htmlFor="nombres">Nombres:</label>
                                        </b>
                                        <Field
                                            name="nombres"
                                            id="nombres"
                                            className="form-control"
                                            placeholder="Nombres"
                                        />
                                        {errors.nombres && touched.nombres ? (
                                            <div className="text-danger">{errors.nombres}</div>
                                        ) : null}
                                    </div>

                                </div>
                                <div className='row d-flex flex-column flex-sm-row'>
                                    <div className="col col-sm-6">
                                        <b>
                                            <label htmlFor="apellidos">Apellidos:</label>
                                        </b>
                                        <Field
                                            name="apellidos"
                                            id="apellidos"
                                            className="form-control"
                                            placeholder="Apellidos"
                                        />
                                        {errors.apellidos && touched.apellidos ? (
                                            <div className="text-danger">{errors.apellidos}</div>
                                        ) : null}
                                    </div>
                                    <div className="col col-sm-6">
                                        <b>
                                            <label htmlFor="nit">Nit:</label>
                                        </b>
                                        <Field
                                            name="nit"
                                            id="nit"
                                            type="number"
                                            className="form-control"
                                            placeholder="Nit"
                                        />
                                        {errors.nit && touched.nit ? (
                                            <div className="text-danger">{errors.nit}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="row d-flex flex-column flex-sm-row">
                                    <div className="col col-sm-6">
                                        <b>
                                            <label htmlFor="celda">Celda:</label>
                                        </b>
                                        <Field
                                            name="celda"
                                            id="celda"
                                            className="form-control"
                                            placeholder="Celda"
                                        />
                                        {errors.celda && touched.celda ? (
                                            <div className="text-danger">{errors.celda}</div>
                                        ) : null}
                                    </div>
                                    <div className="col col-sm-6">
                                        <b>
                                            <label htmlFor="patio">Patio:</label>
                                        </b>
                                        <Field
                                            name="patio"
                                            id="patio"
                                            className="form-control"
                                            placeholder="Patio"
                                        />
                                        {errors.patio && touched.patio ? (
                                            <div className="text-danger">{errors.patio}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div>
                                    <Modal.Footer>
                                        <button type="submit" id="guardar" className="btn btn-success">
                                            <Icon icon="fluent:save-24-filled" color="white" width="20" />
                                            {_id ? "Actualizar" : "Guardar"}
                                        </button>
                                        <Button onClick={props.onHide} className="btn btn-danger">
                                            Cancelar
                                        </Button>
                                    </Modal.Footer>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default ReclusoModal