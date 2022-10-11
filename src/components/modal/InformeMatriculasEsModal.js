import { Modal, Button, Table } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import RectHTMLTableExcel from 'react-html-table-to-excel'
import { useState } from 'react';

export const InformeMatriculasEsModal = (props) => {

    const validationReclusoSchema = Yup.object().shape({
        cedula: Yup.string().required("Requerido*"),
        leccion: Yup.string().required("Requerido*"),
    });
    const [data, setData] = useState({});

    const createPdf = (matriculasFiltradas) => {

        const doc = new jsPDF();
        const logo = new Image();
        logo.src = '../../../public/assets/logo.jpeg';

        doc.setFont('helvetica', 'bold');
        //text hello
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text(
            `Informe de Lecciones Matriculadas por Recluso`,
            60,
            35,
        );

        doc.addImage(
            './assets/logo.jpeg',
            45,
            0,
            0,
            0
        );

        autoTable(doc, {
            head: [['Cedula', 'Nombre', 'Apellido', 'Programa', 'Leccion', 'Nivel', 'Estado']],
            body: matriculasFiltradas.map(celda => (
                [celda.cedula, celda.nombre, celda.apellido, celda.programa, celda.leccion, celda.nivel, celda.estado]
            )),
            margin: {
                top: 42, right: 14, bottom: 20, left: 14
            },
            theme: 'grid',
            headStyles: { halign: 'center', fillColor: '#8f0000' },
            columnStyles: {
                6: {
                    halign: 'center',
                    cellWidth: 40,
                },
            },
        });

        doc.setFont('helvetica', 'normal');
        //text hello
        doc.setFontSize(8);
        doc.setTextColor(1, 1, 1);

        doc.text(
            `Teléfono: +57 323 5909324`,
            10,
            285,
        );

        doc.text(
            `Dirección: Calle 24 Cra 11 y 12 - Barrio margaritas diagonal a la cancha`,
            10,
            290,
        );

        doc.save('Matriculas por leccion.pdf');
    }

    const filtrarDatosRegistros = (data) => {
        const { cedula } = data;
        const matriculasFiltradas = props.matriculas
            .filter(matricula => matricula.cedula.toLocaleLowerCase() === cedula.toLocaleLowerCase());
        setData(matriculasFiltradas)
    }
    const generarPdef = () => {
        if (data) {
            createPdf(data)
        }

    }

    return (
        <div>
            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" >
                        <b> Generar Informe de Lecciones Matriculadas por Recluso</b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            cedula: ""
                        }}
                        validationSchema={validationReclusoSchema}
                        enableReinitialize
                        onSubmit={(values, { resetForm }) => {

                        }}

                    >
                        {({ errors, touched, values, handleChange }) => (
                            <Form>
                                <div className='row py-2 d-flex align-items-end justify-content-between'>
                                    <div className="col-4">
                                        <b>
                                            <label htmlFor="cedula">Ingrese Cédula del Recluso:</label>
                                        </b>
                                        <Field
                                            placeholder="Cédula"
                                            name="cedula"
                                            id="cedula"
                                            className="form-control"
                                        >

                                        </Field>
                                        {errors.leccion && touched.leccion ? (
                                            <div className="text-danger">{errors.leccion}</div>
                                        ) : null}
                                    </div>

                                    <div className="col-3">
                                        <button
                                            className='btn btn-warning'
                                            onClick={() => filtrarDatosRegistros(values)}
                                        >
                                            <Icon icon="bi:search" width="30" /> Buscar Matriculas
                                        </button>
                                    </div>
                                </div>
                                {
                                    Array.isArray(data) ?
                                        <Table responsive striped id="informe">
                                            <thead>
                                                <th>No</th>
                                                <th>Cedula</th>
                                                <th>Nombres</th>
                                                <th>Apellidos</th>
                                                <th>Programa</th>
                                                <th>Leccion</th>
                                                <th>Nivel</th>
                                                <th>Estado</th>
                                            </thead>
                                            <tbody>
                                                {
                                                    data?.map((matricula, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{matricula.cedula}</td>
                                                            <td>{matricula.nombre}</td>
                                                            <td>{matricula.apellido}</td>
                                                            <td>{matricula.programa}</td>
                                                            <td>{matricula.leccion}</td>
                                                            <td>{matricula.nivel}</td>
                                                            <td>{matricula.estado}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                        :
                                        <div className='my-4 text-center'>
                                            <h2>No hay matriculas disponibles</h2>
                                            <p>Seleccione una lección</p>
                                        </div>
                                }

                                <div>
                                    <Modal.Footer>
                                        {
                                            Array.isArray(data) ?
                                                <>
                                                <label style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '.2rem'
                                                    }}
                                                    className="form-label"
                                                    >
                                                        Exportar En
                                                    </label>
                                                    <RectHTMLTableExcel type='button' className='btn btn-success' style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '.2rem'
                                                    }}
                                                        id="exportarExcel"
                                                        table="informe"
                                                        filename="Matriculas por leccion"
                                                        sheet="Pagina 1"
                                                        buttonText={
                                                        <Icon
                                                         icon="file-icons:microsoft-excel"
                                                          color="white" 
                                                          width="25"
                                                        />   
                                                                                                        
                                                    }                                                    
                                                    />
                                                    <button type='button' className='btn btn-danger' style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '.2rem'
                                                    }} onClick={generarPdef}>
                                                        <Icon icon="ant-design:file-pdf-outlined" color="white" width="25" />
                                            
                                                    </button>
                                                </>
                                                : null
                                        }
                                        <Button onClick={props.onHide} className="btn btn-warning">
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

export default InformeMatriculasEsModal;