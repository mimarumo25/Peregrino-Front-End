import { Button, Modal } from 'react-bootstrap';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { useEffect } from 'react';
import { getLeccionAll } from '../../store/slices/leccion/leccionSlices';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';

const ReclusoModal = (props) => {
    const { cedula, nombres, apellidos } = props.recluso
    const dispatch = useDispatch()
    const { list: lecciones } = useSelector(store => store.leccionList);
    const validationReclusoSchema = Yup.object().shape({
        cedula: Yup.number().required("Requerido*"),
        nombres: Yup.string().required("Requerido*"),
        apellidos: Yup.string().required("Requerido*"),
    })

    useEffect(() => {
        try {
            dispatch(getLeccionAll())
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }, [dispatch]);
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
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <Formik
                            initialValues={{
                                cedula: cedula || "",
                                nombres: nombres + " " + apellidos || "",

                            }}
                            validationSchema={validationReclusoSchema}
                            onSubmit={(values, { resetForm }) => {

                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <div className='row'>
                                        <div className='col'>
                                            <b>
                                                <label htmlFor="cedula" className="form-label">Cedula:</label>
                                            </b>
                                            <Field
                                                name="cedula"
                                                id="cedula"
                                                type="number"
                                                className="form-control"
                                                placeholder="Cedula"
                                                disabled
                                            />
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
                                        </div>
                                    </div>
                                    <div className="row py-2">
                                        <div className="col">
                                            <b>
                                                <label htmlFor="leccion" className="form-label">Seleccione una Lección:</label>
                                            </b>
                                            <Field
                                                as="select"
                                                name="programa"
                                                id="programa"
                                                className="form-control"
                                            >
                                                <option defaultValue={true}>Seleccione una Lección</option>
                                                {Array.isArray(lecciones) ? lecciones.map((leccion, i) =>
                                                    leccion.programa.map((pro, i) =>
                                                        <option key={i} value={leccion.nombre}>{`${pro.nombre} -${leccion.nombre}`}</option>
                                                    )
                                                ) : null
                                                }
                                            </Field>
                                            {errors.programa && touched.programa ? (
                                                <div className="text-danger">{errors.programa}</div>
                                            ) : null}
                                        </div>
                                    </div>
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

export default ReclusoModal