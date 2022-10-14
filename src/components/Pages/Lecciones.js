import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deleteLeccion,
  getLeccionAll,
  searchLecciones,
} from "../../store/slices/leccion/leccionSlices";
import { LeccionModal } from "../modal";
import RectHTMLTableExcel from 'react-html-table-to-excel'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const Lecciones = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [titleModal, settitleModal] = useState("");
  const [leccionEdit, setLeccionEdit] = useState({});
  const { list: lecciones, total } = useSelector((store) => store.leccionList);
  const [desde, setDesde] = useState(0);
  const [countPage, setCountPage] = useState(1);

  const [value, setValue] = useState("");

  const handleSearch = (e) => {
    setValue(e.target.value);
    if (e.target.value <= 0) {
      dispatch(getLeccionAll());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchLecciones(value));
  };

  useEffect(() => {
    try {
      if (desde < 0) {
        dispatch(getLeccionAll(0));
      } else if (desde >= total && total !== 0) {
        setDesde(prevDesde => prevDesde - 50);
      } else {
        dispatch(getLeccionAll(desde));
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  }, [dispatch, desde]);

  const modalNewLeccion = () => {
    setModalShow(true);
    settitleModal("Nueva Lección");
    setLeccionEdit({});
  };
  function eliminarLeccion(id) {
    dispatch(deleteLeccion(id));
  }
  const modalEditLeccion = (leccion) => {
    setModalShow(true);
    settitleModal("Editar Lección");
    setLeccionEdit(leccion);
  };

  const cambiarPagina = (valor) => {
    if (desde === 0 && valor > 0) {
      setDesde(+50);
      return;
    }

    if (valor < 0 && desde < 0) {
      setDesde(0);
    } else if (desde >= total) {
      setDesde(prevDesde => prevDesde - valor);
    } else {
      setDesde(prevDesde => prevDesde + valor);
    }
  }
  const createPdf = (data) => {

    const doc = new jsPDF();
    const logo = new Image();
    logo.src = '../../../public/assets/logo.jpeg';

    doc.setFont('helvetica', 'bold');
    //text hello
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `Listado General de Lecciones Registradas`,
      48,
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
      head: [['Nivel', 'Nombre', 'Programa', 'Descripción']],
      body: data.map(celda => (
        [celda.nivel, celda.nombre, celda.programa[0].nombre, celda.descripcion]
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

    doc.save('Lecciones.pdf');
  }
  const generarPdef = () => {
    if (lecciones) {
        createPdf(lecciones)
    }

}

  return (
    <div>
      <LeccionModal
        show={modalShow}
        title={titleModal}
        onHide={() => setModalShow(false)}
        leccion={leccionEdit}
        programa=""
        backdrop="static"
        keyboard={false}
      />
      <div className="py-2 d-flex align-items-center justify-content-between flex-column flex-md-row gap-4">
        <Button onClick={modalNewLeccion}>
          <Icon icon="ant-design:plus-circle-outlined" width="20" /> Nuevo
        </Button>
        <div className='d-flex align-items-center justify-content-evenly gap-2 order-3'>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '.2rem'
          }}
            className="form-label"
          >
            Exportar En
          </label>
          <RectHTMLTableExcel type='button' className='btn btn-success mx-2' style={{
            display: 'flex',
            alignItems: 'center',
            gap: '.2rem'
          }}
            id="exportarExcel"
            table="informe"
            filename="lecciones"
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
        </div>
        {/* SEARCH */}
        <form
          style={{
            width: "320px",
            padding: "0 1rem",
          }}
          className="form"
          onSubmit={handleSubmit}
        >
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              onChange={handleSearch}
              placeholder={`Buscar Leccion por Nombre`}
              value={value}
              aria-label="Buscar..."
              aria-describedby="search-addon"
            />
            <button className="input-group-text border-0" id="search-addon">
              <Icon icon="akar-icons:search" color="white" width="20" />
            </button>
          </div>
        </form>
        {/* SEARCH */}
      </div>
      <table className="table table-hover fs-6" id="informe">
        <thead>
          <tr>
            <th>Nivel</th>
            <th>Nombre</th>
            <th>Programa</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(lecciones)
            ? lecciones.map((leccion) => (
              <tr key={leccion.nivel}>
                <td>{leccion?.nivel}</td>
                <td>{leccion?.nombre}</td>
                <td>
                  {Array.isArray(leccion?.programa)
                    ? leccion?.programa.map((programa) => (
                      <span key={programa?.nombre}>{programa?.nombre}</span>
                    ))
                    : null}
                </td>
                <td>{leccion?.descripcion}</td>
                <td className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-warning mx-1"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Editar"
                    onClick={() => modalEditLeccion(leccion)}
                  >
                    <Icon icon="bx:edit" width="20" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    tabIndex="0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Eliminar"
                    onClick={() => eliminarLeccion(leccion._id)}
                  >
                    <Icon icon="fluent:delete-12-regular" width="20" />
                  </button>
                </td>
              </tr>
            ))
            : null}
        </tbody>
      </table>

      <div className="d-flex align-items-center justify-content-between mt-4">

        {/* PAGINATION */}
        {
          value.length === 0 && (
            <div className='actions d-flex gap-2'>
              {
                desde > 0 && <button className='btn btn-secondary' onClick={() => {
                  cambiarPagina(-50);
                  setCountPage(prev => prev - 1);
                }}>Previos</button>
              }
              {
                !(countPage >= Math.ceil(total / 50)) && (
                  <button className='btn btn-secondary' onClick={() => {
                    cambiarPagina(50);
                    setCountPage(prev => prev + 1);
                  }} >Siguientes</button>
                )
              }
            </div>
          )
        }
        {/* PAGINATION */}
        <div>
          <h3>Paginas: {countPage}/{Math.ceil(total / 50)}</h3>
        </div>
      </div>
    </div>
  );
};

export default Lecciones;
