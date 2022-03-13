import {React,useState,useEffect} from "react";
import 'bootstrap/dist/js/bootstrap.bundle';
import {Navbar} from 'react-bootstrap'
 import { Container,Nav,NavDropdown } from 'react-bootstrap';
 import { useSelector,useDispatch  } from "react-redux";
 import {setUser} from '../actions/user'
 import { useNavigate  } from 'react-router-dom';
const NavBar= (props)=>{
  const navigate= useNavigate();
  const selectorData=useSelector((state)=>state.user);
    const[profile,setProfile]=useState({})
    const dispatch=useDispatch();
   useEffect(() => {

      console.log(selectorData) 
     setProfile(selectorData)
    }, [selectorData]);
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
             
            
       
            {profile.isLoggedIn?(
              
              <NavDropdown title={profile.user.username} id="collasible-nav-dropdown">
              <NavDropdown.Item  onClick={()=>{dispatch({type:"logout"}); navigate('/login')}}>Log Out</NavDropdown.Item>
            
            </NavDropdown>
              ):(  <Nav.Link href={"/login"}>{'login'}</Nav.Link>)}
               
         
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
export default NavBar;