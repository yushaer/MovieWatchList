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
 import { useNavigate  } from 'react-router-dom';
const NavBar= (props)=>{
  const navigate= useNavigate();
  const selectorData=useSelector((state)=>state.user);
    const[profile,setProfile]=useState({})
    const dispatch=useDispatch();
    const [showBasic, setShowBasic] = useState(false);
   useEffect(() => {
  
      //console.log(selectorData) 
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
                          <MDBNavbarItem key={idx}>
                          <Link to={link.url}  className="nav-link">{link.name}</Link>
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