import { Modal, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { getProgamaAll } from '../../store/slices/programa/programaSlices';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addLeccion, updateLeccion } from '../../store/slices/leccion/leccionSlices';

export const LeccionModal = (props) => {
    const [nombrePrograma, setNombrePrograma] = useState('');
    const [programaEditar, setProgramaEditar] = useState([]);
    const { _id, nombre = '', nivel, programa, descripcion } = props.leccion;
    const dispatch = useDispatch();
    const { list: programas } = useSelector(store => store.progamaList);

    useEffect(() => {
        // setNombrePrograma(props.programa);
        if (_id) {
            const [{ nombre = 'LPP' }] = programa;
            setNombrePrograma(nombre);
            const programaEdit = programas.filter(p => p?.nombre !== nombre )
            setProgramaEditar(programaEdit)
        }else{
            setNombrePrograma("")
        }
        dispatch(getProgamaAll())
    }, [_id, dispatch]);

    const validationReclusoSchema = Yup.object().shape({
        nombre: Yup.string().required("Requerido*"),
        nivel:Yup.number().required("Requerido*").max(15,'El nivel de las lecciones debe ser menor de 16').min(1,"Debe ingresar lecciones mayor a 0"),
        descripcion: Yup.string().required("Requerido*"),
        programa: Yup.string("Por Favor Selecciones un Programa").required("Requerido*"),
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
                            nivel: nivel || "",
                            programa: nombrePrograma || "",
                            descripcion: descripcion || "",
                        }}
                        validationSchema={ validationReclusoSchema }
                        enableReinitialize
                        onSubmit={(values, { resetForm }) => {
                            console.log({ values });
                            if (_id) {
                                dispatch(updateLeccion(values, _id))
                            } else {
                                dispatch(addLeccion(values))
                            }
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="row">
                                    <div className="col">
                                        <b>
                                            <label htmlFor="nombre">Nombre Lección:</label>
                                        </b>
                                        <Field
                                            name="nombre"
                                            id="nombre"
                                            className="form-control"
                                            placeholder="Nombre Lección"
                                        />
                                        {errors.nombre && touched.nombre ? (
                                            <div className="text-danger">{errors.nombre}</div>
                                        ) : null}
                                    </div>
                                </div>
                                {_id ?
                                    (<div className="col">
                                        <b>
                                            <label htmlFor="programa">Progama de la Lección:</label>
                                        </b>
                                        <Field
                                            as="select"
                                            name="programa"
                                            id="programa"
                                            className="form-control"
                                        >
                                            {Array.isArray(programaEditar) && nombrePrograma ? programaEditar.map((prog, i) =>
                                            {
                                                console.log({ nombrePrograma });
                                                return (
                                                    <>  
                                            <option value={ !nombrePrograma ? 'LPP' : nombrePrograma }>{nombrePrograma}</option>
                                            <option key={prog?.nombre} value={prog?.nombre}>{prog?.nombre}</option>
                                            </>
                                                )
                                            }
                                            ) : null
                                            }
                                        </Field>
                                        {errors.programa && touched.programa ? (
                                            <div className="text-danger">{errors?.programa}</div>
                                        ) : null}
                                    </div>)
                                    : (<div className="col">
                                        <b>
                                            <label htmlFor="programa">Progama de la Lección:</label>
                                        </b>
                                        <Field
                                            as="select"
                                            name="programa"
                                            id="programa"
                                            className="form-control"
                                        >
                                            <option defaultValue={false}>Seleccione un Programa</option>
                                            {
                                                Array.isArray(programas) ? programas.map((prog, i) =>
                                                    <option key={prog?.nombre} value={prog?.nombre}>{prog?.nombre}</option>
                                                ) : null
                                            }
                                        </Field>
                                        {errors.programa && touched.programa ? (
                                            <div className="text-danger">{errors?.programa}</div>
                                        ) : null}
                                    </div>)
                                }
                                                                <div className="col">
                                    <b>
                                        <label htmlFor="nivel">Nivel de la lección:</label>
                                    </b>
                                    <Field
                                        type="number"
                                        name="nivel"
                                        id="nivel"
                                        className="form-control"
                                        placeholder="Nivel"
                                        max="15"
                                        min="1"
                                    />
                                    {errors.nivel && touched.nivel ? (
                                        <div className="text-danger">{errors.nivel}</div>
                                    ) : null}
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

export default LeccionModal