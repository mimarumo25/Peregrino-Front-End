import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../store/slices/login';
import { deleteToken } from '../helpers/auth-token';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export const NavBar = (args) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <Navbar collapseOnSelect expand="md" bg="secondary" variant="dark">
            <Container>
                <Navbar.Brand ><span className='text-white'>PeregrinoApp</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                    </Nav>
                    <Nav >
                        <NavDropdown className='px-5' title={<Icon icon="bx:user-circle" width="50" color="black" />} id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={() => navigate('/profiles')} className="navbar-brand text-dark rounded">
                                    <Icon icon="carbon:user-avatar-filled-alt" width="20" /> Perfil
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={logout} className="navbar-brand text-dark rounded">
                                <Icon icon="ion:exit-outline" width="20" /> Salir
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

 