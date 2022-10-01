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

export const Lecciones = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [titleModal, settitleModal] = useState("");
  const [leccionEdit, setLeccionEdit] = useState({});
  const { list: lecciones, total } = useSelector((store) => store.leccionList);
  const [desde, setDesde] = useState(0);

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
      if ( desde < 0 ) {
        dispatch(getLeccionAll(0));
      } else if ( desde >= total && total !== 0 ) {
        setDesde( prevDesde => prevDesde - 5 );
      } else {
        dispatch(getLeccionAll( desde ));
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

  const cambiarPagina = ( valor ) => {
    if ( desde === 0 && valor > 0 ) {
      setDesde(+5);
      return;
    }

    if ( valor < 0 && desde < 0 ) {
      setDesde(0);
    } else if ( desde >= total ) {
      setDesde( prevDesde => prevDesde - valor );
    } else {
      setDesde( prevDesde => prevDesde + valor );
    }

  }

  return (
    <div>
      <h2>{ ( desde < 0 ) ? 0 : desde }/{ total }</h2>
      <LeccionModal
        show={modalShow}
        title={titleModal}
        onHide={() => setModalShow(false)}
        leccion={leccionEdit}
        programa=""
        backdrop="static"
        keyboard={false}
      />
      <div className="py-2 d-flex align-items-center justify-content-between">
        <Button onClick={modalNewLeccion}>
          <Icon icon="ant-design:plus-circle-outlined" width="20" /> Nuevo
        </Button>
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
      <table className="table table-hover fs-6">
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
            ? lecciones.map((leccion, i) => (
                <tr key={leccion._id}>
                  <td>{leccion.nivel}</td>
                  <td>{leccion.nombre}</td>
                  <td>
                    {Array.isArray(leccion.programa)
                      ? leccion.programa.map((programa) => (
                          <span key={programa._id}>{programa.nombre}</span>
                        ))
                      : null}
                  </td>
                  <td>{leccion.descripcion}</td>
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

      {/* PAGINATION */}
      {
        value.length === 0 && (
        <div className='actions d-flex gap-2'>
          {
            desde > 0 && <button className='btn btn-secondary' onClick={ () => cambiarPagina( -5 ) }>Previos</button>
          }
          {
            ( total > 5 ) && <button className='btn btn-secondary' onClick={ () => cambiarPagina( 5 ) } >Siguientes</button>
          }
        </div>
        )
      }
      {/* PAGINATION */}
    </div>
  );
};

export default Lecciones;
