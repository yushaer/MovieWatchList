import React, { useEffect,useState } from 'react';
import Navbar from "./Navbar";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import * as api from '../api/index.js';
import { useNavigate,Link  } from 'react-router-dom';
import { useSelector,useDispatch  } from "react-redux";
import {setUser} from '../actions/user'
const WatchList =(props)=>{
    const dispatch=useDispatch();
    
    const userData=useSelector((state)=>state.user);
    const history = useNavigate ();
    const [profile,setProfile]=useState({isLoggedIn:true})
    
useEffect(() => {
  
 
 setProfile(userData);
 if(!profile.isLoggedIn){
    history('/login')
}       

}, [userData]);
 console.log( profile)
 
return (
    
    <><Navbar title="Movies" /><br></br>
     <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
            <h1 className='text-light'>WatchList</h1>
        </MDBCol>
        </MDBRow>
        </MDBContainer>
        </>)
}
export default WatchList;