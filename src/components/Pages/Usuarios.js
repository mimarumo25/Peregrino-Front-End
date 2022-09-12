import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Icon } from '@iconify/react';
import UserModal from '../modal/UserModal';
import axios from "axios";
import { url } from '../../helpers/auth-token';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUsersAll } from '../../store/slices/user/userSlices';

const Usuarios = () => {
const [create, setCreate] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [titleModal, settitleModal] = useState('');
  const [userEdit, setUserEdit] = useState({});
  const [roles, setRoles] = useState({});
  const dispatch = useDispatch()
  const { list: users } = useSelector(store => store.userList);

  useEffect(() => {
    const cargarRole = async () => {
      try {
        const { data } = await axios.get(`${url}roles`);
        setRoles(data);
      } catch (error) {
        console.log(error);
      }
    }
    cargarRole();
    try {
      dispatch(getUsersAll())
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }, [dispatch]);
  const modalNewUser = () => {
    setModalShow(true)
    settitleModal('Nuevo Usuario')
    setUserEdit({})
    setCreate(true)
  }
  const modalEditUser = (user) => {
    setModalShow(true)
    settitleModal('Editar Usuario')
    setUserEdit(user)
    setCreate(false)
  }
  function eliminarUser(user) {
    alert(JSON.stringify(user))
  }
  return (
    <div>
      <UserModal
        show={modalShow}
        title={titleModal}
        onHide={() => setModalShow(false)}
        roles={roles}
        userEdit={userEdit}
        create={create}
        backdrop="static"
        keyboard={false}
      />
      <dir className='py-2'>
        <Button onClick={modalNewUser}><Icon icon="ant-design:plus-circle-outlined" width="20" /> Nuevo</Button>
      </dir>
      <table className="table table-hover fs-6">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) ?
            users.map((user) =>
              <tr key={user._id}>
                <td>{user.nombres}</td>
                <td>{user.apellidos}</td>
                <td>{user.telefono}</td>
                <td>{user.email}</td>
                <td>{Array.isArray(user.roles) ?
                  user.roles.map((rol,i) =>
                    <label key={i}> {rol.name}</label>
                  ) : null}
                </td>
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
                    onClick={() => eliminarUser(user)}>
                    <Icon icon="fluent:delete-12-regular" width="20" />
                  </button>
                </td>
              </tr>
            ) : null
          }
        </tbody>
      </table>

    </div>
  )
}

export default Usuarios