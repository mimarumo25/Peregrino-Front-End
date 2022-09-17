import { Button, InputGroup, Modal} from 'react-bootstrap';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { getLeccionAll } from '../../store/slices/leccion/leccionSlices';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { url } from '../../helpers/auth-token';

const MatriculaModalEdit = (props) => {

    const dispatch = useDispatch()
    const { list: lecciones } = useSelector(store => store.leccionList);
   const { cedula, nombres, apellidos, leccion, programa:pro, estado } = props.data
    const [estadoMatricula, setEstadoMatricula] = useState({});
    const [leccionDatos, setLeccionDatos] = useState([]);
    
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
        const estadoMatricula = async () => {
            try {
              const { data } = await axios.get(`${url}estado/estadoMatricula`);
              setEstadoMatricula(data);
            } catch (error) {
              console.log(error);
            }
          }
          estadoMatricula();
          if(leccion){
          const data = lecciones.filter(l => l.nombre !==leccion.nombre)
          setLeccionDatos(data)
        }
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
                                       disabled
                                    />
                                </InputGroup>
                            </div>
                        </div>
                        <Formik
                            initialValues={{
                                cedula: cedula,
                                nombres: nombres +" " + apellidos,
                                leccion:"",

                            }}
                            validationSchema={validationReclusoSchema}
                            onSubmit={(values, { resetForm }) => {
                                console.log(values);
                                resetForm()
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
                                                <option value={leccion.nombre}>{`Nivel ${leccion.nivel} - Programa ${pro} - Lección ${leccion.nombre}`}</option>
                                                {Array.isArray(leccionDatos) ? leccionDatos.map((lec, i) =>
                                                    leccion.programa.map((prog, i) =>
                                                        <option key={i} value={lec.nombre}>{`Nivel ${lec.nivel} - Programa ${prog.nombre} - Lección ${lec.nombre}`}</option>
                                                    )
                                                ) : null
                                                }
                                            </Field>
                                            {errors.leccion && touched.leccion ? (
                                                <div className="text-danger">{errors.leccion}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <Modal.Footer>
                                        <button type="submit" id="actualizar" className="btn btn-warning">
                                            <Icon icon="fluent:save-24-filled"  width="20" />
                                           Actualizar Matricula
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

export default MatriculaModalEdit