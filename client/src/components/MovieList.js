import React,{useEffect,useState} from "react";

import MoviesSection from "./MoviesSection";
import { Container,Nav,NavDropdown,Button,Form,Row,Col  } from 'react-bootstrap';
import Navbar from "./Navbar";
import { useSelector,useDispatch  } from "react-redux";
import { useNavigate  } from 'react-router-dom';
import {searchMovies,getRecommendedMovies} from '../actions/movie'
import {setUser} from '../actions/user'

import { MDBSpinner } from 'mdb-react-ui-kit';
const MovieList=(props)=>{
    const selectorData=useSelector((state)=>state.movies);
    const[movies,setMovies]=useState([]);
    const[search,setSearch]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(()=>{
        if(props.type==="recomended"){
            const user = JSON.parse(localStorage.getItem("user"));

         if(!user){
            navigate('/login')
            }   
            dispatch(getRecommendedMovies());
          }
    },[dispatch])
    
    useEffect(()=>{
        dispatch(setUser())
       
        setMovies(selectorData)
    },[selectorData])
    function test(){
       delete movies.search

        setMovies(movies);
    }
    const handleSearch=(event)=>{
        
            if(event.target.value!=""){
                setSearch(true)
                dispatch(searchMovies(event.target.value))
                setMovies(selectorData);
            }
                else  {
                    setSearch(false)
                    
                            
                        }
           
       
    }
    
   
        
  
   // console.log(movies);
  
    return(
        <React.Fragment>
            <Navbar title="Movies"  />
          <Container >
       
          <br></br>
            <div className=" height d-flex justify-content-center align-items-center">
                <div className="col-md-8">
                <div className="search"> 
                <i className="fa fa-search"></i> 
                <input type="text" className="form-control" onKeyDown={handleSearch} placeholder="Search Movies"/>
            </div>
                </div>
            </div>
            {movies.isLoading?(<div className='d-flex justify-content-center mx-auto align-items-center'>
                    <br></br>
                <h2 className="text-light">Loading</h2>
                <MDBSpinner role='status' color='primary' className="loader"  size="md" style={{width:"6rem", height: "6rem"}}>
                    <span className='visually-hidden'>Loading...</span>
                </MDBSpinner>
              
                </div>):(<React.Fragment>
                < MoviesSection name={ !search?props.name:"Results"} movieobj={!search?movies[props.type]:movies.search}/>
            {/* < MoviesSection name="Popular" movieobj={movies.popular}/>
            < MoviesSection name="Discover" movieobj={movies.featured}/> */}
    </React.Fragment>
    )
                
                    



                }
                  
            
            </Container>
        
           </React.Fragment>
    )
  
   
    

}
export default MovieList;