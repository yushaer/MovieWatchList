import {React,useState,useEffect} from "react";

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCollapse
} from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom'
 
 import { useSelector,useDispatch  } from "react-redux";
 import {setUser} from '../actions/user'
 import { useNavigate  } from 'react-router-dom';
const NavBar= (props)=>{
  const navigate= useNavigate();
  const selectorData=useSelector((state)=>state.user);
    const[profile,setProfile]=useState({})
    const dispatch=useDispatch();
    const [showBasic, setShowBasic] = useState(false);
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
      <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>{props.title}</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            {
                    links.map((link,idx)=>{
                        return(
                          <MDBNavbarItem>
                          <Link to={link.url} className="nav-link">{link.name}</Link>
                          </MDBNavbarItem>
                        )
                    })
                }
       {profile.isLoggedIn?(
                  <MDBNavbarItem>
                  <Link to='/watchlist' className="nav-link">watchlist</Link>
                  </MDBNavbarItem>
                ):""
                }

         

           
          </MDBNavbarNav>
          <MDBNavbarNav right fullWidth={false} >
               {profile.isLoggedIn?(
              <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link'>
                {profile.user.username}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <MDBDropdownLink onClick={()=>{dispatch({type:"logout"}); navigate('/login')}}>Log Out</MDBDropdownLink>
                  </MDBDropdownItem>
                  
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
                      
                      ):(  <MDBNavbarItem> <Link to={"/login"} className="nav-link">login</Link></MDBNavbarItem> )}
              </MDBNavbarNav>

          {/* <form className='d-flex input-group w-auto'>
            <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
            <MDBBtn color='primary'>Search</MDBBtn>
          </form> */}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
      //   <Navbar bg="light" expand="lg" sticky="top" className="moves-menu">
      //   <Container fluid>
      //     <Navbar.Brand href="#">{props.title}</Navbar.Brand>
      //     <Navbar.Toggle aria-controls="navbar" />
      //     <Navbar.Collapse id="navbar">
      //       <Nav
      //         className="me-auto my-2 my-lg-0"
      //         style={{ maxHeight: '100px' }}
      //         navbarScroll
      //       >
      //           {
      //               links.map((link,idx)=>{
      //                   return(
      //                     <Link to={link.url} className="nav-link">{link.name}</Link>
                           
      //                   )
      //               })
      //           }
           
      //         {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
      //           <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
      //           <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
      //           <NavDropdown.Divider />
      //           <NavDropdown.Item href="#action5">
      //             Something else here
      //           </NavDropdown.Item>
      //         </NavDropdown> */}
             
      //       </Nav>
             
            
       
      //       {profile.isLoggedIn?(
              
      //         <NavDropdown title={profile.user.username} id="collasible-nav-dropdown">
      //         <NavDropdown.Item  onClick={()=>{dispatch({type:"logout"}); navigate('/login')}}>Log Out</NavDropdown.Item>
            
      //       </NavDropdown>
      //         ):(    <Link to={"/login"} className="nav-link">login</Link>)}
               
         
      //     </Navbar.Collapse>
      //   </Container>
      // </Navbar>
    )
}
export default NavBar;