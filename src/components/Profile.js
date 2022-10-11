import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { DatosUpdate } from './modal/DatosUpdate';
import { UpdatePassword } from './modal/UpdatePassword';

export const Profile = () => {
    const { list: user } = useSelector((store) => store.userLogged);
    const [modalShow, setModalShow] = useState(false);
    const [modalShow1, setModalShow1] = useState(false);
    const [title, setTitle] = useState(false);
    const modalNewDatos = () => {
        setTitle("Actualizar datos del Usuario")
        setModalShow(true);
    };
    const modalNewPassword = () => {
        setTitle("Actualizar Contraseña")
        setModalShow1(true);
    };

    return (
        <div>
            <DatosUpdate
                show={modalShow}
                onHide={() => setModalShow(false)}
                backdrop="static"
                data={user}
                title={title}
                keyboard={false}
            />
            <UpdatePassword
                show={modalShow1}
                onHide={() => setModalShow1(false)}
                backdrop="static"
                data={user}
                title={title}
                keyboard={false}
            />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card card-inverse" >
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-md-8 col-sm-8">
                                        <h2 className="card-title">Perfil de Usuario</h2>
                                        <p className="card-text"><strong>Nombre Completo: </strong> {user?.nombres} {" "}{user?.apellidos}</p>
                                        <p className="card-text"><strong>Telefóno: </strong> {user?.telefono} </p>
                                        <p className="card-text"><strong>Email: </strong> {user?.email} </p>
                                        <p className="card-text"><strong>Rol: </strong> {user?.roles} </p>
                                        <p><strong>Actualizar: </strong>
                                            <span className="btn btn-primary mx-1" onClick={modalNewDatos}>Datos</span>
                                            <span className="btn btn-info mx-1" onClick={modalNewPassword}>Contraseña</span>
                                        </p>
                                    </div>
                                    <div className="col-md-3 col-sm-3 text-center pt-1">
                                        <img
                                            className="img-thumbnail "
                                            src="/assets/avatar.webp"
                                            alt=""
                                            style={{
                                                borderRadius: '50%'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
