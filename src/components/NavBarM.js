import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavLink } from 'react-bootstrap';

import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteToken } from '../helpers/auth-token';
import { setLogin } from '../store/slices/login';
import Swal from 'sweetalert2';


export const NavBarM = (args) => {
    const dispatch = useDispatch()
    const logout = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Que deseas Cerrar Sesión!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Cerrar Sesión!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Sesión Cerrada!',
                    'Gracias por usar nuestro sistema.',
                    'success'

                )
                deleteToken()
                dispatch(setLogin(false))
            }
        })
    }

    return (
        <Navbar collapseOnSelect expand="md" bg="secondary" variant="light">
            <Container>
                <Navbar.Brand ><span className='text-white'>PeregrinoApp</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" data-bs-target="#responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav className='sidebarm'>
                        <ul className='row text-center d-flex justify-content-center flex-column align-items-center'>
                            <li className='d-flex gap-2 justify-content-between' style={{
                                    width: '180px'
                                }}>
                                <NavLink eventKey={1} as={Link} to="/" className="text-white rounded py-2 w-100 d-inline-block p-2 d-flex gap-2 justify-content-start align-items-center">
                                    <Icon icon="clarity:dashboard-solid-badged" width="30" /> Dashboard
                                </NavLink>
                            </li>
                            <li className='d-flex gap-2 justify-content-between' style={{
                                    width: '180px'
                                }}>
                                <NavLink eventKey={2} as={Link} to="usuarios" className="text-white rounded w-100 py-2 w-100 d-inline-block p-2 d-flex gap-2 justify-content-start align-items-center" >
                                    <Icon icon="bi:person-circle" width="30" /> Usuarios
                                </NavLink>
                            </li>
                            <li className='d-flex gap-2 justify-content-between' style={{
                                    width: '180px'
                                }}>
                                <NavLink eventKey={3} as={Link} to="internos" className="text-white rounded w-100 py-2 w-100 d-inline-block p-2 d-flex gap-2 justify-content-start align-items-center" >
                                    <Icon icon="bi:file-person" width="30" /> Internos
                                </NavLink>
                            </li>
                            <li className='d-flex gap-2 justify-content-between' style={{
                                    width: '180px'
                                }}>
                                <NavLink eventKey={4} as={Link} to="lecciones" className="text-white rounded w-100 py-2 w-100 d-inline-block p-2 d-flex gap-2 justify-content-start align-items-center" >
                                    <Icon icon="material-symbols:play-lesson" width="30" /> Lecciones
                                </NavLink>
                            </li>
                            <li className='d-flex gap-2 justify-content-between' style={{
                                    width: '180px'
                                }}>
                                <NavLink eventKey={5} as={Link} to="matriculas" className="text-white rounded w-100 py-2 w-100 d-inline-block p-2 d-flex gap-2 justify-content-start align-items-center" >
                                <Icon icon="fa6-solid:user-graduate" width="20"/> Matricular
                                </NavLink>
                            </li>
                            <li className='d-flex gap-2 justify-content-between' style={{
                                    width: '180px'
                                }}>
                                <NavLink eventKey={6} as={Link} to="salidas" className="text-white rounded w-100 py-2 w-100 d-inline-block p-2 d-flex gap-2 justify-content-start align-items-center" >
                                <Icon icon="fluent:picture-in-picture-exit-24-regular" width="20" /> Salidas Reclusos
                                </NavLink>
                            </li>
                            <li className='d-flex gap-2 justify-content-between' style={{
                                    width: '180px'
                                }}>
                                <NavLink eventKey={7} as={Link} to={"informes"} className="text-white rounded w-100 py-2 p-2 d-flex gap-2 justify-content-start align-items-center">
                                    <Icon icon="carbon:report" width="30" /> Informes
                                </NavLink>
                            </li>
                            <li className='d-flex gap-2 justify-content-between' style={{
                                    width: '180px'
                                }}>
                                <NavLink eventKey={8} as={Link} to={"Salir"} className="text-white rounded w-100 py-2 p-2 d-flex gap-2 justify-content-start align-items-center" onClick={logout}>
                                    <Icon icon="ion:exit-outline" width="30" /> Salir
                                </NavLink>
                            </li>
                        </ul>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBarM;