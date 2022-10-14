import { Icon } from '@iconify/react';
import { Formik, Form, Field } from "formik";
import { Modal, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addUser, updateUser } from '../../store/slices/user/userSlices';


export const UserModal = (props) => {
    const dispatch = useDispatch()
    const { _id, identifica, nombres, apellidos, telefono, email, roles: rol } = props.userEdit

    const validationUserSchema = Yup.object().shape({
        identifica: Yup.string().required("Requerido*").max(10, 'Maximo 10 digitos'),
        nombres: Yup.string().required("Requerido*"),
        apellidos: Yup.string().required("Requerido*"),
        email: Yup.string().email().required("Requerido*"),
        telefono: Yup.number().required("Requerido*"),
        roles: Yup.string().required("Requerido"),
        password: Yup.string().min(6, "Minimo 6 Caracteres"),
        repitPassword: Yup.string().min(6, "Minimo 6 Caracteres").oneOf([Yup.ref('password'), null], 'Las contraseñas no Coinciden')
    })

    return (
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
                        identifica: identifica || "",
                        nombres: nombres || "",
                        apellidos: apellidos || "",
                        telefono: telefono || "",
                        email: email || "",
                        password: "",
                        repitPassword: "",
                        roles: "",
                    }}
                    validationSchema={validationUserSchema}
                    onSubmit={(values, { resetForm }) => {
                        if (_id) {
                            const roles = [values.roles]
                            const dataUpdatre = {
                                identifica: values.identifica,
                                nombres: values.nombres,
                                apellidos: values.apellidos,
                                telefono: values.telefono,
                                email: values.email,
                                roles
                            }
                            dispatch(updateUser(dataUpdatre, _id))
                        } else {
                            const roles = [values.roles]
                            const data = {
                                identifica: values.identifica,
                                nombres: values.nombres,
                                apellidos: values.apellidos,
                                telefono: values.telefono,
                                email: values.email,
                                password: values.password,
                                roles
                            }
                            dispatch(addUser(data))
                        }

                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Card className="my-3">
                                <Card.Header>Datos Personales</Card.Header>
                                <Card.Body>
                                    <div className="row d-flex flex-column flex-sm-row">
                                        <div className="col col-sm-4">
                                            <b>
                                                <label htmlFor="identifica">Identificación:</label>
                                            </b>
                                            <Field
                                                name="identifica"
                                                id="identifica"
                                                type="number"
                                                className="form-control"
                                                placeholder="Identificación"
                                            />
                                            {errors.identifica && touched.identifica ? (
                                                <div className="text-danger">{errors.identifica}</div>
                                            ) : null}
                                        </div>
                                        <div className="col col-sm-4">
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
                                        <div className="col col-sm-4">
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
                                    </div>
                                    <div className="row my-2 d-flex flex-column flex-sm-row">
                                        <div className="col col-sm-4">
                                            <b>
                                                <label htmlFor="telefono">Teléfono:</label>
                                            </b>
                                            <Field
                                                name="telefono"
                                                id="telefono"
                                                type="number"
                                                className="form-control"
                                                placeholder="Teléfono"
                                            />
                                            {errors.identifica && touched.identifica ? (
                                                <div className="text-danger">{errors.identifica}</div>
                                            ) : null}
                                        </div>
                                        <div className="col col-sm-4">
                                            <b>
                                                <label htmlFor="email">Email:</label>
                                            </b>
                                            <Field
                                                name="email"
                                                id="email"
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                            />
                                            {errors.email && touched.email ? (
                                                <div className="text-danger">{errors.email}</div>
                                            ) : null}
                                        </div>
                                        {!_id ?
                                            <div className="col col-sm-4">
                                                <b>
                                                    <label htmlFor="password">
                                                        Contraseña:
                                                    </label>
                                                </b>
                                                <Field
                                                    name="password"
                                                    id="password"
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Contraseña"
                                                />
                                                {errors.password && touched.password ? (
                                                    <div className="text-danger">{errors.password}</div>
                                                ) : null}
                                            </div> :
                                            <div className="col col-sm-4">
                                                <b>
                                                    <label htmlFor="roles">Roles:</label>
                                                </b>
                                                <Field
                                                    as="select"
                                                    name="roles"
                                                    id="roles"
                                                    multiple={false}
                                                    className="form-control"
                                                >
                                                    <option defaultValue={true}>Seleccione un Rol</option>
                                                    {Array.isArray(props.roles) ? props.roles.map((rol, i) =>
                                                        <option key={i} value={rol.name}>{rol.name}</option>
                                                    ) : null
                                                    }
                                                </Field>
                                                {errors.roles && touched.roles ? (
                                                    <div className="error">{errors.roles}</div>
                                                ) : null}
                                            </div>
                                        }

                                    </div>
                                    {!_id ?
                                        <div className="row my-2 d-flex flex-column flex-sm-row">

                                            <div className="col col-sm-6">
                                                <b>
                                                    <label htmlFor="repitPassword">
                                                        Confirmar Contraseña:
                                                    </label>
                                                </b>
                                                <Field
                                                    name="repitPassword"
                                                    id="repitPassword"
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Confirmar Contraseña"
                                                />
                                                {errors.repitPassword && touched.repitPassword ? (
                                                    <div className="text-danger">{errors.repitPassword}</div>
                                                ) : null}
                                            </div>
                                            <div className="col col-sm-6">
                                                <b>
                                                    <label htmlFor="roles">Roles:</label>
                                                </b>
                                                <Field
                                                    as="select"
                                                    name="roles"
                                                    id="roles"
                                                    className="form-control"
                                                    multiple={false}
                                                >
                                                    <option defaultValue={true}>Seleccione un Rol</option>
                                                    {
                                                        Array.isArray(props.roles) ? props.roles.map((rol, i) =>
                                                            <option key={i} value={rol.name}>{rol.name}</option>
                                                        ) : null
                                                    }


                                                </Field>
                                                {errors.roles && touched.roles ? (
                                                    <div className="error">{errors.roles}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        : null
                                    }
                                </Card.Body>
                            </Card>
                            <Modal.Footer>
                                <button type="submit" id="guardar" className="btn btn-success">
                                    <Icon icon="fluent:save-24-filled" color="white" width="20" />
                                    {_id ? "Actualizar" : "Guardar"}
                                </button>
                                <Button onClick={props.onHide} className="btn btn-danger">
                                    Cancelar
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal >
    )
}

export default UserModal