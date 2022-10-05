import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeccionAll } from '../../store/slices/leccion/leccionSlices';
import { getMatriculasAll } from '../../store/slices/matricula/matriculasSlices';
import { AsistenciaModal } from '../modal';

export const Informes = () => {

  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [titleModal, settitleModal] = useState("");
  const [leccionEdit, setLeccionEdit] = useState({});
  const [matriculaEdit, setMatriculaEdit] = useState({});
  const [registros, setRegistros] = useState([]);

  const { list: lecciones } = useSelector((store) => store.leccionList);
  const { list: matriculas } = useSelector((store) => store.matriculaList);


  const modalNewLeccion = () => {
    settitleModal("Nueva Asistencia");
    setLeccionEdit(lecciones);
    setMatriculaEdit(matriculas);
    setModalShow(true);
  };

  const setDataRegistros = () => {
    if ( registros.length === 0 && (registros.length < matriculas.length) ) {
      matriculas.forEach(( matricula, index ) => {
        matricula.recluso.forEach(( recluso ) => {
          matricula.leccion.forEach(( leccion ) => {
            setRegistros(( prev ) => {
              return (
                [ ...prev,{
                  cedula: recluso.cedula,
                  nombre: recluso.nombres,
                  apellido: recluso.apellidos,
                  programa: leccion.programa[0].nombre,
                  leccion: leccion.nombre,
                  nivel: leccion.nivel ? leccion.nivel : 'NA',
                  estado: matricula.estado[0] ? matricula.estado[0].name : 'NA',
                  estadoId: matricula.estado[0] ? matricula.estado[0]._id : 'NA',
                  matriculaId: matricula._id
                }]
              )
            })
          })
        })
      });
    }

      console.log({ registros });
  }


  useEffect(() => {
    dispatch( getLeccionAll() );
    dispatch( getMatriculasAll() );
        
  }, [ dispatch ]);
  
  useEffect(() => {
    setDataRegistros();
  }, [ matriculas ]);

  return (
    <div className='row'>
      <AsistenciaModal
        show={modalShow}
        title={titleModal}
        onHide={() => setModalShow(false)}
        leccion={leccionEdit}
        matriculas={registros}
        backdrop="static"
        keyboard={false}
      />
      <div className='container d-flex flex-column justify-content-center align-items-center gap-4 '>
        <h1>Informes</h1>
        <button className="btn btn-primary col-6 rounded-2 p-3 d-flex flex-wrap justify-content-center align-items-center gap-3"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '.4rem'
          }}
          onClick={ modalNewLeccion }
        >
          <Icon icon="bi:pass" width="40" height="40" color='white' />
          Generar Asistencia Por Leccion
        </button>
      </div>
    </div>
  )
}

export default Informes