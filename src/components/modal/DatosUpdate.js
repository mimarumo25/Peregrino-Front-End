import { Icon } from '@iconify/react';
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { updateUserDatos } from '../../store/slices/user/userSlices';
export const DatosUpdate = (props) => {
    const { _id, nombres, apellidos, email, telefono } = props.data;
    const dispatch =useDispatch()
    const validationReclusoSchema = Yup.object().shape({
        nombres: Yup.string().required("Requerido*"),
        apellidos: Yup.string().required("Requerido*"),
        email: Yup.string().email("Email Invalido: ejemplo - miemail@mail.com").required("Requerido*"),
        telefono: Yup.string().required("Requerido*"),
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
                            nombres: nombres || "",
                            apellidos: apellidos || "",
                            telefono: telefono || "",
                            email: email || "",
                        }}
                        validationSchema={validationReclusoSchema}
                        enableReinitialize
                        onSubmit={(values, { resetForm }) => {
                            dispatch(updateUserDatos(values, _id))
                            resetForm();
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="row">
                                    <div className="col">
                                        <b>
                                            <label htmlFor="nombres">Nombres:</label>
                                        </b>
                                        <Field
                                            name="nombres"
                                            id="nombres"
                                            className="form-control"
                                            placeholder='Nombres'
                                        />
                                        {errors.nombres && touched.nombres ? (
                                            <div className="text-danger">{errors.nombres}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="row py-2">
                                    <div className="col">
                                        <b>
                                            <label htmlFor="apellidos">Apellidos:</label>
                                        </b>
                                        <Field
                                            name="apellidos"
                                            id="apellidos"
                                            className="form-control"
                                            placeholder='Apellidos'
                                        />
                                        {errors.apellidos && touched.apellidos ? (
                                            <div className="text-danger">{errors.apellidos}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="row py-2">
                                    <div className="col">
                                        <b>
                                            <label htmlFor="telefono">Teléfono:</label>
                                        </b>
                                        <Field
                                            name="telefono"
                                            id="telefono"
                                            className="form-control"
                                            placeholder='Teléfono'
                                        />
                                        {errors.telefono && touched.telefono ? (
                                            <div className="text-danger">{errors.telefono}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="row py-2">
                                    <div className="col">
                                        <b>
                                            <label htmlFor="email">Email:</label>
                                        </b>
                                        <Field
                                            name="email"
                                            id="email"
                                            className="form-control"
                                            placeholder='Email'
                                        />
                                        {errors.email && touched.email ? (
                                            <div className="text-danger">{errors.email}</div>
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
