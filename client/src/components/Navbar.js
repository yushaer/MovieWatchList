import {React,useState,useEffect} from "react";

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { HashLink as Link } from 'react-router-hash-link';
 
 import { useSelector,useDispatch  } from "react-redux";
 import {setUser} from '../actions/user'
 import { useNavigate,useLocation  } from 'react-router-dom';
const NavBar= (props)=>{
  const location=useLocation();
  const navigate= useNavigate();
  const selectorData=useSelector((state)=>state.user);
    const[profile,setProfile]=useState({})
    const dispatch=useDispatch();
    const [showBasic, setShowBasic] = useState(false);
   useEffect(() => {
  
      //console.log(selectorData) 
     setProfile(selectorData)
    }, [selectorData,location]);
  const links=[
  {
        url:"/popular",
        name:"Popular Movies"
    },
    {
        url:"/discover",
        name:"Discover Movies"
    },
    
]
    return(
      <MDBNavbar  sticky expand='lg' dark bgColor='dark'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>YR Studio</MDBNavbarBrand>

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
          {profile.isLoggedIn?(
         <>
                <MDBNavbarItem>
                    <Link to='/' className="nav-link">Watchlist</Link>
                  </MDBNavbarItem>
         <MDBNavbarItem>
                  
                  <Link to='/recommended' className="nav-link">Recommended Movies</Link>
                </MDBNavbarItem></>
                ):""
                }
            {
                    links.map((link,idx)=>{
                        return(
                          <MDBNavbarItem key={idx}>
                          <Link to={link.url}  className="nav-link">{link.name}</Link>
                          </MDBNavbarItem>
                        )
                    })
                }
      

         

           
          </MDBNavbarNav>
          <MDBNavbarNav right fullWidth={false} >
               {profile.isLoggedIn?(
              <MDBNavbarItem >
              <MDBDropdown >
                <MDBDropdownToggle tag='a' className='nav-link' color='dark'>
                {profile.user.username}
                </MDBDropdownToggle>
                <MDBDropdownMenu dark color='dark'>
                  
                  <MDBDropdownItem  active="false" data-active="false" color='dark'>
                    <MDBDropdownLink onClick={()=>{    localStorage.clear(); dispatch({type:"logout"}); navigate('/login')}}>Log Out</MDBDropdownLink>
                  </MDBDropdownItem>
                  
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
                      
                      ):(  <MDBNavbarItem> <Link to={"/login"} className="nav-link">login</Link></MDBNavbarItem> )}
              </MDBNavbarNav>

         
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  
    )
}
export default NavBar;