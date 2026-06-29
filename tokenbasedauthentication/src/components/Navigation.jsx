import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../services/AuthService';

function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [authUser, setAuthUser] = useState(AuthService.getAuthUser());

    useEffect(() => {
        setAuthUser(AuthService.getAuthUser());
    }, [location]);

    const handleLogout = () => {
        AuthService.removeAuthUser();
        navigate("/");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Employee Management</Navbar.Brand>
                <Nav className="me-auto">
                    {authUser && (
                        <>
                            <Nav.Link as={Link} to="/departments">Departments</Nav.Link>
                            <Nav.Link as={Link} to="/employees">Employees</Nav.Link>
                            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                                                                              <Nav.Link as={Link}       to="/restaurants">Restaurants</Nav.Link>
                        </>
                    )}
                </Nav>
                <Nav className="ms-auto">
                    {authUser ? (
                        <>
                            <Navbar.Text className="me-3 text-white">
                                {authUser.name || authUser.email || 'Logged in'}
                            </Navbar.Text>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </>
                    ) : (
                        <Nav.Link as={Link} to="/">Login</Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Navigation;