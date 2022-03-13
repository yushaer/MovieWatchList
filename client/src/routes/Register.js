import {React,useEffect} from "react";



import { useDispatch } from "react-redux";
import {setUser} from "../actions/user"


import AuthForm from "../components/Form";

const Register=()=>{
  
  const dispatch=useDispatch();
  useEffect(() => {
    
     
      dispatch(setUser())
    }, [dispatch]);
      return(
        
          <div className=''>
            
     
            <AuthForm title="Register" type="register" />
           
          </div>
      );
  };
  export default Register;