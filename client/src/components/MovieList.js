import React,{useEffect,useState} from "react";
import MovieItem from "./MovieItem";
import MoviesSection from "./MoviesSection";
import { Container,Nav,NavDropdown,Button,Form,Row,Col  } from 'react-bootstrap';
import Navbar from "./Navbar";
import { useSelector,useDispatch  } from "react-redux";

import {searchMovies} from '../actions/movie'
import moment from 'moment'

const MovieList=(props)=>{
    const selectorData=useSelector((state)=>state.movies);
    const[movies,setMovies]=useState([]);
    const[search,setSearch]=useState(false);
    const dispatch=useDispatch();
    useEffect(()=>{
    
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
   
  
    console.log(movies);
   
    return(
        <React.Fragment>
            <Navbar title="Movies"  handleSearch={handleSearch} searchText={"Search Movies"}/>
          <Container >
          
          
            <div className=" height d-flex justify-content-center align-items-center">
                <div className="col-md-8">
                   
                </div>
            </div>
           {
            + (!search)?(
                <React.Fragment>
                    < MoviesSection name="Popular" movieobj={movies.popular}/>
                    < MoviesSection name="Discover" movieobj={movies.featured}/>
            </React.Fragment>
            ):(
                < MoviesSection name="Results" movieobj={movies.search}/>
                
            )
           }
            
            </Container>
        
           </React.Fragment>
    )
  

}
export default MovieList;