import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteToken } from '../helpers/auth-token';
import { setLogin } from '../store/slices/login';


function NavBarM(args) {
    const dispatch = useDispatch()
    const logout = () => {
        deleteToken()
        dispatch(setLogin(false))
    }

    return (
        <Navbar collapseOnSelect expand="md" bg="light" variant="light">
            <Container>
                <Navbar.Brand ><span className='text-dark'>PeregrinoApp</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                    </Nav>
                    <Nav className='sidebarm'>
                        <ul className='row'>
                            <li>
                                <NavLink to="/" className="text-dark rounded py-2 w-100 d-inline-block p-2">
                                    <Icon icon="clarity:dashboard-solid-badged" width="30" /> Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="usuarios" className="text-dark rounded py-2 w-100 d-inline-block p-2" >
                                    <Icon icon="bi:person-circle" width="30" /> Usuarios
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="internos" className="text-dark rounded py-2 w-100 d-inline-block p-2" >
                                    <Icon icon="bi:file-person" width="30" /> Internos
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="lecciones" className="text-dark rounded py-2 w-100 d-inline-block p-2" >
                                    <Icon icon="material-symbols:play-lesson" width="30" /> Lecciones
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"informes"} className="text-dark rounded py-2 w-100 d-inline-block p-2">
                                    <Icon icon="carbon:report" width="30" /> Informes
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"Salir"} className="text-dark rounded py-2 w-100 d-inline-block p-2 " onClick={logout}>
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