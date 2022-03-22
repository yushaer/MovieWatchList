import React, { useEffect,useState } from 'react';
import Navbar from "./Navbar";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import * as api from '../api/index.js';
import { useNavigate,Link  } from 'react-router-dom';
import { useSelector,useDispatch  } from "react-redux";
import {getWatchList,setUser } from '../actions/user';

const initialState = { username: '', email: '', password: '', password2: '' };
const AuthForm = (props) => {
  const dispatch=useDispatch();
  const selectorData=useSelector((state)=>state.user);
  const [validated, setValidated] = useState(false);

  const [error,setError]=useState(null);
  const [success,setSuccess]=useState(null);
const [formData,setFormData]=useState(initialState);
const history = useNavigate ();
useEffect(() => {

  //console.log(selectorData) 
 
 const user = JSON.parse(localStorage.getItem("user"));
 if(selectorData.isLoggedIn||user)history("/")
}, [selectorData]);


  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    if(form.checkValidity() ){
      if(props.type==="register"){
        try {
          const{data} = await api.register(formData);
          setError(null);
          setSuccess(data.message);
          //console.log(data);
        } catch (error) {
          setError(error.response.data.message);
          console.log(error.response.data);
        }
      }
      else{
        try{
          const{data}= await api.login(formData)
          setError(null);
          setSuccess(data.message);
          localStorage.setItem('token', data.token);
          localStorage.setItem('user',JSON.stringify({...data.User,isLoggedIn:true}))
          dispatch(getWatchList())
          dispatch(setUser());
        //  await dispatch(setUser());
          history("/")
          //console.log(data);
        }
        catch (error) {
          setError(error.response.data.message);
          console.log(error.response.data);
        }
        
      }

    }
    if (form.checkValidity() === false) {
    
      e.stopPropagation();
    }

   
   
    

    // Do some checks
   

  
  }
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  return (
    <><Navbar title="Movies" /><br></br>
     <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
        <MDBCard className='shadow-2-strong'>
            <MDBCardBody>
              <h1 className='text-center ' >{props.title}</h1>
              {error?(<h4 className='text-center text-danger'>{error}</h4>):(<h4 className='text-center text-success'>{success}</h4>)} 
                  <form onSubmit={handleSubmit} Validate >
                  {props.type=="register" ?
           (    
                <MDBInput className='mb-4' type="text" name="username" onChange={handleChange} placeholder="username" label='username' required  />
           ):null
          
          
          
          }
           
            <MDBInput className='mb-4' type='email'  name="email" id='form3Example3' label='Email address' onChange={handleChange} placeholder="Email" required />

            <MDBInput className='mb-4' type='password' id='form3Example4' label='Password' name="password" onChange={handleChange}  placeholder="Password" required />
            {props.type=="register" ?
            (<MDBInput className='mb-4' type='password' id='form3Example4' label='Confirm Password' name="password2" onChange={handleChange}  placeholder="Confirm Password" required />):""
          }
            

            <MDBBtn type='submit' className='mb-4' block>
            {props.title}
            </MDBBtn>

            <div className='text-center'>
            {props.type=="register" ? (<p>Already have a <Link to="/login" >account?</Link></p>)
            :
            <p>
              Not a member? <Link to="/register" >Register</Link>
            </p>
            }
           

              
            </div>
          </form>
              </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
   
    </>
  )
}

export default AuthForm