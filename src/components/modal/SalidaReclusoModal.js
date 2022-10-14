import { Button, InputGroup, Modal, Table } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../helpers/auth-token";
import {
  addSalidaRecluso,
  updateSalidaRecluso,
} from "../../store/slices/salidaRecluso/salidaReclusoSlices";

export const SalidaReclusoModal = (props) => {
  const {
    idRecluso,
    id,
    cedula: ced,
    nombre,
    apellido,
    telefono,
    direccion,
    Fecha_salida,
    tipoSalida,
    observacion,
  } = props.data;
  const { list: reclusos } = useSelector((store) => store.reclusoList);
  const [tipoSalidas, setTipoSalidas] = useState({});
  const [resulData, setResulData] = useState([]);
  const [cedula, setCedula] = useState("");
  const [idR, setIdR] = useState();
  const [nombreCompleto, setNombreCompleto] = useState("");
  const dispatch = useDispatch();

  const validationReclusoSchema = Yup.object().shape({
    cedula: Yup.string().required("Requerido*"),
    nombres: Yup.string().required("Requerido*"),
    telefono: Yup.string().required("Requerido*"),
    direccion: Yup.string().required("Requerido*"),
    salida: Yup.string().required("Requerido*"),
    observacion: Yup.string().required("Requerido*"),
    fecha: Yup.date().required(""),
  });
  useEffect(() => {
    const cargaTipoSalida = async () => {
      try {
        await axios.get(url + `estado/tiposalida`).then((res) => {
          setTipoSalidas(res.data);
        });
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    cargaTipoSalida();
    setCedula(ced);
    console.log({nombre, apellido});
    if ( !nombre && !apellido ) {
      setNombreCompleto('Nombres');
    } else {
      setNombreCompleto(`${nombre} ${apellido}`);
    }
    setIdR(idRecluso);
  }, [tipoSalida, props]);
  const handleChange = ({ target }) => {
    const { value } = target;
    const data = reclusos.filter((p) => p.cedula.includes(value));
    if (value) {
      setResulData(data);
    } else {
      setResulData(reclusos);
    }
  };
  const addRecluso = (recluso) => {
    const { _id, cedula, nombres, apellidos } = recluso;
    const nuevoNombre = `${nombres} ${apellidos}`;
    setCedula(cedula);
    setNombreCompleto(nuevoNombre);
    setIdR(_id);
  };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id="exampleModal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-4">
                <label htmlFor="name" className="form-label">
                  Buscar por Identificación
                </label>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">
                    <Icon icon="el:search-alt" width="30" />
                  </InputGroup.Text>
                  {id ? null : (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Identificación"
                      name="busqueda"
                      onChange={handleChange}
                    />
                  )}
                </InputGroup>
              </div>
            </div>
            <Formik
              initialValues={{
                recluso: idR || "",
                cedula: cedula || "",
                nombres: nombreCompleto || "",
                telefono: telefono || "",
                direccion: direccion || "",
                fecha: Fecha_salida || "",
                salida: tipoSalida || "",
                observacion: observacion || "",
              }}
              enableReinitialize
              validationSchema={validationReclusoSchema}
              onSubmit={(values, { resetForm }) => {
                if (id) {
                  dispatch(
                    updateSalidaRecluso(values, id)
                  );
                } else {
                  dispatch(
                    addSalidaRecluso(
                      values.recluso,
                      values.telefono,
                      values.direccion,
                      values.fecha,
                      values.salida,
                      values.observacion
                    )
                  );
                }
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <div className="row">
                    <div className="col-6">
                      <Field name="recluso" id="id" type="hidden" />
                      <b>
                        <label htmlFor="cedula" className="form-label">
                          Cedula:
                        </label>
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
                        <label htmlFor="nombres" className="form-label">
                          Nombre Completo:
                        </label>
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
                        <label htmlFor="telefono" className="form-label">
                          Teléfono:
                        </label>
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
                        <label htmlFor="direccion" className="form-label">
                          Dirección:
                        </label>
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
                        <label htmlFor="fecha" className="form-label">
                          Fecha de Salida:
                        </label>
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
                        <label htmlFor="salida" className="form-label">
                          Seleccione un Tipo de Salida:
                        </label>
                      </b>
                      <Field
                        as="select"
                        name="salida"
                        id="salida"
                        className="form-control"
                      >
                        <option defaultValue={true}>
                          Seleccione Tipo Salida
                        </option>

                        {Array.isArray(tipoSalidas)
                          ? tipoSalidas.map((tipo) => (
                              <option key={tipo._id} value={tipo._id}>
                                {tipo.name}
                              </option>
                            ))
                          : null}
                      </Field>
                      {errors.salida && touched.salida ? (
                        <div className="text-danger">{errors.salida}</div>
                      ) : null}
                    </div>
                    <div className="row py-2">
                      <div className="col">
                        <b>
                          <label htmlFor="observacion" className="form-label">
                            Observación:
                          </label>
                        </b>
                        <Field
                          as="textarea"
                          name="observacion"
                          id="observacion"
                          className="form-control"
                          placeholder="Observación"
                        />
                        {errors.observacion && touched.observacion ? (
                          <div className="text-danger">
                            {errors.observacion}
                          </div>
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
                      {Array.isArray(resulData)
                        ? resulData.map((recluso) => (
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
                                  className="btn btn-success"
                                  onClick={() => addRecluso(recluso)}
                                >
                                  add
                                </button>
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </Table>

                  <Modal.Footer>
                    <button
                      type="submit"
                      id="guardarSalida"
                      className="btn btn-success"
                      data-mdb-toggle="modal"
                      data-mdb-target="#exampleModal"
                    >
                      <Icon
                        icon="fluent:save-24-filled"
                        color="white"
                        width="20"
                      />
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
    </div>
  );
};

export default SalidaReclusoModal;
