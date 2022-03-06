import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle';
import {Navbar} from 'react-bootstrap'
 import { Container,Nav,NavDropdown,Button,Form,FormControl } from 'react-bootstrap';
 
const NavBar= (props)=>{
    return(
        <Navbar bg="light" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="#">{props.title}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
                {
                    props.links.map((link,idx)=>{
                        return(
                            <Nav.Link href={link.url}>{link.name}</Nav.Link>
                        )
                    })
                }
           
              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
             
            </Nav>
            <div className="search"> 
                <i className="fa fa-search"></i> 
                <input type="text" className="form-control" onKeyDown={props.handleSearch} placeholder={props.searchText}/>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
export default NavBar;