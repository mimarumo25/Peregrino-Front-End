import { Icon } from '@iconify/react';
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import * as Yup from 'yup';
export const UpdatePassword = (props) => {
    
    const validationReclusoSchema = Yup.object().shape({
        password: Yup.string().required("Requerido*"),
        respitPassword: Yup.string().required("Requerido*").min(6,"Minimo 6 Caracteres"),
        passwordActual: Yup.string().required("Requerido*").min(6,"Minimo 6 Caracteres"),
    });
    return (
        <div>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" >
                        <b>{props.title}</b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            password: "",
                            respitPassword: "",
                            passwordActual: ""
                        }}
                        validationSchema={validationReclusoSchema}
                        enableReinitialize
                        onSubmit={(values, { resetForm }) => {
                            alert(JSON.stringify(values))
                        }}

                    >
                        {({ errors, touched, values, handleChange }) => (
                            <Form>
                                <div className="row py-2">
                                    <div className="col">
                                        <b>
                                            <label htmlFor="passwordActual">Contraseña Actual:</label>
                                        </b>
                                        <Field
                                            type="password"
                                            name="passwordActual"
                                            id="passwordActual"
                                            className="form-control"
                                            placeholder='Contraseña Actual'
                                        />
                                        {errors.passwordActual && touched.passwordActual ? (
                                            <div className="text-danger">{errors.passwordActual}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <b>
                                            <label htmlFor="password">Nueva Contraseña:</label>
                                        </b>
                                        <Field
                                            type="password"
                                            name="password"
                                            id="nompasswordbres"
                                            className="form-control"
                                            placeholder='Nueva Contraseña'
                                        />
                                        {errors.password && touched.password ? (
                                            <div className="text-danger">{errors.password}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="row py-2">
                                    <div className="col">
                                        <b>
                                            <label htmlFor="respitPassword">Confirmar Nueva Contraseña:</label>
                                        </b>
                                        <Field
                                            type="password"
                                            name="respitPassword"
                                            id="respitPassword"
                                            className="form-control"
                                            placeholder='Confirmar Nueva Contraseña'
                                        />
                                        {errors.respitPassword && touched.respitPassword ? (
                                            <div className="text-danger">{errors.respitPassword}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <Modal.Footer>
                                    <button type="submit" id="guardar" className="btn btn-success">
                                        <Icon icon="fluent:save-24-filled" color="white" width="20" />
                                        Actualizar
                                    </button>
                                    <Button onClick={props.onHide} className="btn btn-danger">
                                        Cancelar
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>

            </Modal>
        </div>
    )
}
