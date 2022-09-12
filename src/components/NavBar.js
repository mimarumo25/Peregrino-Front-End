import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../store/slices/login';
import { deleteToken } from '../helpers/auth-token';


function NavBar(args) {
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
                    <Nav >
                        <NavDropdown className='px-5' title={<Icon icon="bx:user-circle" width="50" color="black" />} id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1"><Icon icon="carbon:user-avatar-filled-alt" width="20" /> Perfil</NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>
                                <Icon icon="ion:exit-outline" width="20" /> Salir
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;