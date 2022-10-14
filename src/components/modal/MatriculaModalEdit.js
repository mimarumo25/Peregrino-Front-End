import { Button,Modal} from 'react-bootstrap';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { getLeccionAll } from '../../store/slices/leccion/leccionSlices';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { url } from '../../helpers/auth-token';
import { updateMatricula } from '../../store/slices/matricula/matriculasSlices';

export const MatriculaModalEdit = ( props ) => {

    const dispatch = useDispatch()
    const { list: lecciones } = useSelector(store => store.leccionList);
    const { cedula, nombres, apellidos, leccion, programa:pro, estado: estadoName, nivel, estadoId, matriculaId } = props.data;
    const [estadoMatricula, setEstadoMatricula] = useState([]);
    const [leccionDatos, setLeccionDatos] = useState([]);
    const [estadoDatos, setEstadoDatos] = useState([]);
    
    const validationReclusoSchema = Yup.object().shape({
        cedula: Yup.number().required("Requerido*"),
        nombres: Yup.string().required("Requerido*"),
        leccion: Yup.string().required("Requerido*"),
    })

    useEffect(() => {
        try {
            dispatch(getLeccionAll())
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }

        const getEstadoMatricula = async () => {
            try {
              const { data } = await axios.get(`${url}estado/estadoMatricula`);
              setEstadoMatricula(data);
            } catch (error) {
              console.log(error);
            }
          }

          getEstadoMatricula();

          if( leccion ) {
          const data = lecciones.filter(l => l.nombre !== leccion );
          console.log({ data });
          setLeccionDatos(data);
          }

          if ( estadoName ) {
            const data = estadoMatricula.filter( e => e.name !== estadoName );
            setEstadoDatos( data );
          }

        // console.log({ props });
    }, [dispatch, leccion]);

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
                        Editar Matricula del Recluso
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <Formik
                            initialValues={{
                                cedula: cedula,
                                nombres: nombres +" " + apellidos,
                                leccion: leccion,
                                estado: estadoId
                            }}
                            enableReinitialize
                            validationSchema={validationReclusoSchema}
                            onSubmit={(values, { resetForm }) => {
                                const { nombres, ...rest } = values;
                                dispatch( updateMatricula( rest, matriculaId ));
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
                                                <option value={ leccion }>{`Nivel ${ nivel } - Programa ${ pro } - Lección ${ leccion }`}</option>
                                                {
                                                    leccionDatos.length > 0 ? leccionDatos.map(( lec, index ) => (
                                                        <option key={ index } value={ lec?.nombre }>{`Nivel ${ leccion?.nivel } - Programa ${ lec?.programa[0]?.nombre } - Lección ${ lec?.nombre }`}</option>
                                                    )) : <h2>Loading</h2>
                                                }
                                            </Field>
                                            {errors.leccion && touched.leccion ? (
                                                <div className="text-danger">{errors.leccion}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    {/* Seleccionar estado */}
                                    <div className="row py-2">
                                        <div className="col">
                                            <b>
                                                <label htmlFor="leccion" className="form-label">Seleccione una Estado:</label>
                                            </b>
                                            <Field
                                                as="select"
                                                name="estado"
                                                id="estado"
                                                className="form-control"
                                            >
                                                <option value={ estadoId }>{`Estado: ${ estadoName }`}</option>
                                                {/* <option value={leccion.nombre}>{`Nivel - Programa ${ pro.nombre } - Lección ${leccion.nombre}`}</option> */}

                                                {
                                                    estadoDatos ? estadoDatos.map(( estado ) => (
                                                        <option value={ estado._id }>{`Estado: ${ estado.name }`}</option>
                                                    )) : <h2>Loading</h2>
                                                }
                                               
                                            </Field>
                                            {errors.leccion && touched.leccion ? (
                                                <div className="text-danger">{errors.leccion}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <Modal.Footer>
                                        <button 
                                        type="submit" 
                                        id="actualizar" 
                                        className="btn btn-warning">
                                            <Icon icon="fluent:save-24-filled"  width="20" />
                                           Actualizar Matricula
                                        </button>
                                        <Button onClick={ props.onHide } className="btn btn-danger">
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

export default MatriculaModalEdit