import {React,useEffect} from "react";



import { useDispatch } from "react-redux";
import {setUser} from "../actions/user"

import AuthForm from "../components/Form";

const Login=()=>{
  const dispatch=useDispatch();
  useEffect(() => {
    
     
      dispatch(setUser())
    }, [dispatch]);
      
      return(
        
          <div className=''>
            
     
            <AuthForm title="Login" type="login" />
           
          </div>
      );
  };
  export default Login;