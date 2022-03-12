import React, { useEffect, useRef,useState } from 'react';
import Navbar from "./Navbar";
import { Card,Container,Nav,NavDropdown,Button,Form,FormControl,Row,Col,InputGroup} from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import * as api from '../api/index.js';
import { useNavigate  } from 'react-router-dom';

const initialState = { username: '', email: '', password: '', password2: '' };
const AuthForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [error,setError]=useState(null);
  const [success,setSuccess]=useState(null);
const [formData,setFormData]=useState(initialState);
const history = useNavigate ();


  const register= async function () {
    try {
      const{data} = await api.register(formData);
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    if(form.checkValidity() ){
      if(props.type==="register"){
        try {
          const{data} = await api.register(formData);
          setError(null);
          setSuccess(data.message);
          console.log(data);
        } catch (error) {
          setError(error.response.data.message);
          console.log(error.response.data);
        }
      }
    }
    if (form.checkValidity() === false) {
    
      e.stopPropagation();
    }

    setValidated(true);
    console.log(formData);
    

    // Do some checks
   

  
  }
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

 
  return (
    <><Navbar title="Movies" /><br></br><div className="container">


      <Row className="justify-content-center">
        <Col md={8}>
        <Card className='auth-form'>
          <Card.Header className='text-center text-light' as="h2">{props.title}</Card.Header>
              <Card.Body className="mb-3 ">
               {error?(<h4 className='text-center text-danger'>{error}</h4>):(<h4 className='text-center text-success'>{success}</h4>)} 
            <Form onSubmit={handleSubmit} noValidate validated={validated} >
          {props.type=="register" ?
           (<Form.Group controlId="username" as={Row} className="mb-3 ">
           <InputGroup hasValidation>
           <Col sm={2}>
             <InputGroup.Text >Username</InputGroup.Text>
             </Col>
               <Col sm={10}>
                 <Form.Control type="text" name="username" onChange={handleChange} placeholder="username" required/>
                 <Form.Control.Feedback type="invalid" tooltip={true}>
              Please choose a username.
            </Form.Control.Feedback>
               </Col>
             

           </InputGroup>
           </Form.Group>):null
          
          
          
          }
           
            <Form.Group controlId="email" as={Row} className="mb-3">
              <InputGroup hasValidation >
              <Col sm={2}>
                <InputGroup.Text >Email</InputGroup.Text>
                </Col>
                  <Col sm={10}>
                    <Form.Control type="email" name="email" onChange={handleChange} placeholder="Email" required/>
                    <Form.Control.Feedback type="invalid" tooltip={true}>
              Please choose a  valid email.
            </Form.Control.Feedback>
                  </Col>
              </InputGroup>
              </Form.Group>
              
              <Form.Group controlId="password" as={Row} className="mb-3">
              <InputGroup  hasValidation>
              <Col sm={2}>
                <InputGroup.Text >Password</InputGroup.Text>
                </Col>
                  <Col sm={10}>
                    <Form.Control type="password" name="password" onChange={handleChange}  placeholder="Password" required/>
                    <Form.Control.Feedback type="invalid" tooltip={true}>
              Please choose a password.
            </Form.Control.Feedback>
                  </Col>
              </InputGroup>
              </Form.Group>
              {props.type=="register"? 
              (
              <><Form.Group controlId="password2" as={Row} className="mb-3">
                      <InputGroup hasValidation>
                        <Col sm={2}>
                          <InputGroup.Text>Password</InputGroup.Text>
                        </Col>
                        <Col sm={10}>
                          <Form.Control type="password" name="password2" onChange={handleChange} placeholder="Confirm Password" required />
                          <Form.Control.Feedback type="invalid" tooltip={true}>
                            Please choose a password.
                          </Form.Control.Feedback>
                        </Col>
                      </InputGroup>
                    </Form.Group><a href="/login" className="text-center" onClick={()=>{history('/login')}}>Already have a account?</a></>):(
                      <a href="/register" className="text-center" onClick={()=>{history('/register')}}>Need a account?</a>
                    )
              }
           
             
              <button type="submit" className="btn btn-secondary" style={{width:'100%'}}>{props.title}</button>
            </Form>
              
              
              </Card.Body>
          </Card>
     
        </Col>

      </Row>

    </div></>
  )
}

export default AuthForm