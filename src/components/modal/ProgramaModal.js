import { Modal, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addPrograma, updatePrograma } from '../../store/slices/programa/programaSlices'


export const ProgramaModal = (props) => {    
    const { _id, nombre, descripcion } = props.programa
    const dispatch = useDispatch();


    const validationReclusoSchema = Yup.object().shape({
        nombre: Yup.string().required("Requerido*"),
        descripcion: Yup.string().required("Requerido*"),
    })

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
                            nombre: nombre || "",
                            descripcion: descripcion || "",
                        }}
                        validationSchema={validationReclusoSchema}
                        onSubmit={(values, { resetForm }) => {
                            if (_id) {
                                dispatch(updatePrograma(values, _id))
                            } else {
                                dispatch(addPrograma(values))
                            }
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="row">
                                    <div className="col">
                                        <b>
                                            <label htmlFor="nombre">Nombre Programa:</label>
                                        </b>
                                        <Field
                                            name="nombre"
                                            id="nombre"
                                            className="form-control"
                                            placeholder="Nombre Programa"
                                        />
                                        {errors.nombre && touched.nombre ? (
                                            <div className="text-danger">{errors.nombre}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col">
                                    <b>
                                        <label htmlFor="descripcion">Descripción:</label>
                                    </b>
                                    <Field
                                        as="textarea"
                                        name="descripcion"
                                        id="descripcion"
                                        className="form-control"
                                        placeholder="Descripción"
                                    />
                                    {errors.descripcion && touched.descripcion ? (
                                        <div className="text-danger">{errors.descripcion}</div>
                                    ) : null}
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

export default ProgramaModal;