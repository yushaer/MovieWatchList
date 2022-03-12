import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle';
import {Navbar} from 'react-bootstrap'
 import { Container,Nav,NavDropdown,Button,Form,FormControl } from 'react-bootstrap';
 
const NavBar= (props)=>{
  const links=[
    {
        url:"/",
        name:"home"
    },{
        url:"/#Popular",
        name:"Popular Movies"
    },
    {
        url:"/#Discover",
        name:"Discover Movies"
    },
    
]
    return(
        <Navbar bg="light" expand="lg" sticky="top" className="moves-menu">
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
                    links.map((link,idx)=>{
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
            {props.handleSearch?( <div className="search"> 
                <i className="fa fa-search"></i> 
                <input type="text" className="form-control" onKeyDown={props.handleSearch} placeholder={props.searchText}/>
            </div>):null}
            <div class="navbar-nav">
                 <Nav.Link href={"/login"}>{'login'}</Nav.Link>
              </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
export default NavBar;