import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'


function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }


  return (
        <header>
            <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          
            <LinkContainer to='/'>
            <Navbar.Brand>ChessBot</Navbar.Brand>
            </LinkContainer>
          <Nav className="me-auto">
          {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Log out</NavDropdown.Item>
                </NavDropdown>
              
              ): (
                  <LinkContainer to={'/login'}>
                    <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
                  </LinkContainer>
              )}

              {userInfo && (
              <NavDropdown title='Openings' id='openings'>
                <LinkContainer to='/admin/savescreen'>
                  <NavDropdown.Item>Saved Openings</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              )}
          </Nav>
        </Container>
      </Navbar>
      <br />
     
        </header>
  )
}

export default Header
