import { Modal, Button, Table } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import RectHTMLTableExcel from 'react-html-table-to-excel'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const AsistenciaModal = (props) => {


    const validationReclusoSchema = Yup.object().shape({
        nombre: Yup.string().required("Requerido*"),
    });

    const createPdf = ( matriculasFiltradas ) => {
    
        const doc = new jsPDF();
        const logo = new Image();
        logo.src = '../../../public/assets/logo.jpeg';
    
        doc.setFont('helvetica', 'bold');
        //text hello
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text(
          `Asistencia para la Leccion: ${matriculasFiltradas[0].leccion}`,
          15,
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
          head: [['Cedula', 'Nombre', 'Apellido', 'Programa', 'Leccion', 'Nivel', 'Firma' ]],
          body: matriculasFiltradas.map( celda => (
            [ celda.cedula, celda.nombre, celda.apellido, celda.programa, celda.leccion, celda.nivel, '']
            )),
          margin: {
            top: 42, right: 14, bottom: 20, left: 14
          },
          theme: 'grid',
          headStyles :{ halign: 'center', fillColor: '#8f0000' },
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
    
        doc.save('Asistencia.pdf');
      }

    const filtrarDatosRegistros = ( valuesLeccion = '' ) => {
        let matriculasFiltradas = props.matriculas
            .filter( matricula => matricula.leccion.toLocaleLowerCase()
            .includes( valuesLeccion.toLocaleLowerCase() ) && matricula.estado === 'En Curso' );

        createPdf( matriculasFiltradas );
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
                        <b>{props.title}</b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            leccion: "",
                        }}
                        validationSchema={ validationReclusoSchema }
                        enableReinitialize
                        onSubmit={(values, { resetForm }) => {
 
                        }}
                        
                    >
                        {({ errors, touched, values, handleChange }) => (
                            <Form>
                                <div className='row py-2 d-flex align-items-end justify-content-between'>
                                <div className="col">
                                        <b>
                                            <label htmlFor="programa">Selecciona una lección:</label>
                                        </b>
                                        <Field
                                            as="select"
                                            name="leccion"
                                            id="leccion"
                                            className="form-control"

                                        >
                                            <option defaultValue={true}>Seleccione una opción</option>
                                            {
                                                Array.isArray(props.leccion) ? props.leccion.map((lec, i) =>
                                                    <option key={i} value={ lec.nombre }>{lec.nombre}</option>
                                                ) : null
                                            }
                                        </Field>
                                        {errors.leccion && touched.leccion ? (
                                            <div className="text-danger">{errors.leccion}</div>
                                        ) : null}
                                    </div>
                                </div>
                                    {
                                        ( !props.matriculas && !values.nombre ) 
                                        ? <h2>Cargando...</h2>
                                        : (
                                            <>
                                            {
                                                ( props.matriculas.filter( matricula => matricula.leccion.toLocaleLowerCase().includes( values.leccion.toLocaleLowerCase() ) && matricula.estado === 'En Curso' ).length > 0 && values.leccion )
                                                ? <Table responsive striped id="informe">
                                                <thead>
                                                    <th>No</th>
                                                    <th>Cedula</th>
                                                    <th>Nombres</th>
                                                    <th>Apellidos</th>
                                                    <th>Programa</th>
                                                    <th>Leccion</th>
                                                    <th>Nivel</th>
                                                    <th>Firma</th>
                                                </thead>
                                                <tbody>
                                                    {
                                                        props.matriculas.filter( matricula => matricula.leccion.toLocaleLowerCase().includes( values.leccion.toLocaleLowerCase() ) && matricula.estado === 'En Curso' )
                                                        .map( (data, index) => (
                                                          <tr key={ data.matriculaId }>
                                                              <td>{ index + 1 }</td>
                                                              <td>{ data.cedula }</td>
                                                              <td>{ data.nombre }</td>
                                                              <td>{ data.apellido }</td>
                                                              <td>{ data.programa }</td>
                                                              <td>{ data.leccion }</td>
                                                              <td>{ data.nivel }</td>
                                                              <td>NA</td>
                                                          </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </Table>
                                            : null
                                            }
                                            {
                                                !( props.matriculas.filter( matricula => matricula.leccion.toLocaleLowerCase().includes( values.leccion.toLocaleLowerCase() ) && matricula.estado === 'En Curso' ).length > 0 && values.leccion )
                                                && <div className='my-4 text-center'>
                                                    <h2>No hay matriculas disponibles</h2>
                                                    <p>Seleccione una lección</p>
                                                  </div>
                                            }
                                            </>
                                        )
                                    }             
                                <div>
                                    <Modal.Footer>
                                        {
                                            ( props.matriculas.filter( matricula => matricula.leccion.toLocaleLowerCase().includes( values.leccion.toLocaleLowerCase() ) && matricula.estado === 'En Curso' ).length > 0 && values.leccion )
                                            && 
                                            <>
                                            <label style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '.2rem'
                                            }}
                                            className="form-label"
                                            >
                                                Generar Asistencia En
                                            </label>
                                            <RectHTMLTableExcel type='button' className='btn btn-success' style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '.2rem'
                                                    }}
                                                        id="exportarExcel"
                                                        table="informe"
                                                        filename="Asistencia"
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
                                            }} onClick={ () => filtrarDatosRegistros( values.leccion ) }>
                                                <Icon icon="ant-design:file-pdf-outlined" color="white" width="25" />
                                            </button>
                                            </>
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

export default AsistenciaModal;