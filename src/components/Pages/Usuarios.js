import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { UserModal } from "../modal";
import { url } from "../../helpers/auth-token";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteUser, getUsersAll, searchUsers } from "../../store/slices/user/userSlices";

import axios from "axios";

export const Usuarios = () => {
  const [modalShow, setModalShow] = useState(false);
  const [titleModal, settitleModal] = useState("");
  const [userEdit, setUserEdit] = useState({});
  const [roles, setRoles] = useState({});
  const dispatch = useDispatch();
  const { list: users, total } = useSelector((store) => store.userList);
  const { list: user } = useSelector((store) => store.userLogged);

  const [desde, setDesde] = useState(0);
  const [countPage, setCountPage] = useState(1);

  const [value, setValue] = useState("");

  const handleSearch = (e) => {
    setValue(e.target.value);
    if (e.target.value <= 0) {
      dispatch(getUsersAll());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchUsers(value));
  };

  useEffect(() => {
    const cargarRole = async () => {
      try {
        const { data } = await axios.get(`${url}estado/roles`);
        setRoles(data);
      } catch (error) {
        console.log(error);
      }
    };
    cargarRole();
    try {
      if (desde < 0) {
        dispatch(getUsersAll(0));
      } else if (desde >= total && total !== 0) {
        setDesde((prevDesde) => prevDesde - 5);
      } else {
        dispatch(getUsersAll(desde));
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  }, [dispatch, desde]);
  const modalNewUser = () => {
    setModalShow(true);
    settitleModal("Nuevo Usuario");
    setUserEdit({});
   
  };
  const modalEditUser = (user) => {
    setModalShow(true);
    settitleModal("Editar Usuario");
    setUserEdit(user);

  };
  function eliminarUser(id) {
   dispatch(deleteUser(id))
  }

  const cambiarPagina = (valor) => {
    if ( valor.sign)

    if (desde === 0 && valor > 0) {
      setDesde(+5);
      setCountPage( prev => prev += 1 );
      return;
    }

    if (valor < 0 && desde < 0) {
      setDesde(0);
      setCountPage(1);
    } else if (desde >= total) {
      setDesde((prevDesde) => prevDesde - valor);
      setCountPage( prev => prev -= 1 );
    } else {
      setDesde((prevDesde) => prevDesde + valor);
      setCountPage( prev => prev += 1 );
    }
  };
if(user.roles!=="admin"){
  return(
    <>
    <h4 className="text-center mt-3"><b>SE REQUIERE ROL DE ADMINISTRADOR PARA ACCEDER A ESTA INFORMACIÓN</b></h4>
    </>
  )
}else{
  return (
    <div>
      <UserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        roles={roles}
        title={titleModal}
        userEdit={userEdit}
        backdrop="static"
        keyboard={false}
      />
      <div className="py-2 d-flex align-items-center justify-content-between">
        <Button onClick={modalNewUser}>
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
              placeholder={`Buscar Usuario por Nombre`}
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
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Telefono</th>
            <th>Email</th>
            {value.length === 0 && <th>Roles</th>}
            <th className="pr-2 d-md-flex justify-content-md-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users)
            ? users.map((user) => (
                <tr key={user._id}>
                  <td>{user.nombres}</td>
                  <td>{user.apellidos}</td>
                  <td>{user.telefono}</td>
                  <td>{user.email}</td>
                  {value.length === 0 && (
                    <td>
                      {Array.isArray(user.roles)
                        ? user.roles.map((rol, i) => (
                            <label key={i}> {rol.name}</label>
                          ))
                        : null}
                    </td>
                  )}
                  <td className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      type="button"
                      className="btn btn-warning mx-1"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Editar"
                      onClick={() => modalEditUser(user)}
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
                      onClick={() => eliminarUser(user._id)}
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
        {value.length === 0 && (
          <div className="actions d-flex gap-2">
            {desde > 0 && (
              <button
                className="btn btn-secondary"
                onClick={() => cambiarPagina(-5)}
              >
                Previos
              </button>
            )}
            {total > 5 && (
              <button
                className="btn btn-secondary"
                onClick={() => cambiarPagina(5)}
              >
                Siguientes
              </button>
            )}
          </div>
        )}
        {/* PAGINATION */}

        <h3>Paginas: {Math.ceil(total / 5)}</h3>
      </div>
    </div>
  );
}
};

export default Usuarios;
