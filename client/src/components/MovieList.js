import React,{useEffect,useState} from "react";

import MoviesSection from "./MoviesSection";
import { Container  } from 'react-bootstrap';
import Navbar from "./Navbar";
import  Pagination from "./Pagination";
import { useSelector,useDispatch  } from "react-redux";
import { useNavigate,useLocation  } from 'react-router-dom';
import {searchMovies,getRecommendedMovies, getPopularMovies, getFeaturedMovies} from '../actions/movie'
import {setUser} from '../actions/user'

import { MDBSpinner } from 'mdb-react-ui-kit';
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
const MovieList=(props)=>{
    const query = useQuery();
    const selectorData=useSelector((state)=>state.movies);
    const[movies,setMovies]=useState(props.type);
    const[search,setSearch]=useState(false);
    const navigate=useNavigate();
    const location=useLocation();
    const dispatch=useDispatch();
    const page = query.get('page') || 1;
    

    useEffect(()=>{
    
       
            if(props.type=="recomended"){
                const user = JSON.parse(localStorage.getItem("user"));

                if(!user){
                   navigate('/login')
                   }  
                   dispatch(getRecommendedMovies(page));
                
            }
            
            
                dispatch(getPopularMovies(page));
            
                dispatch(getFeaturedMovies(page));
       
        
    
    },[dispatch,page,props.type=="recomended"])
    
    useEffect(()=>{
  
       
        setMovies(selectorData);
        //console.log(movies)
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
                <input type="text" className="form-control" onChange={handleSearch} placeholder="Search Movies"/>
            </div>
                </div>
            </div>
            {movies.isLoading?(<div className='d-flex justify-content-center mx-auto align-items-center'>
                    <br></br>
                <h2 className="text-light">Loading</h2>
                <MDBSpinner role='status' color='primary' className="loader"  size="md" style={{width:"6rem", height: "6rem"}}>
                    <span className='visually-hidden'>Loading...</span>
                </MDBSpinner>
              
                </div>):(<React.Fragment><br></br>
                < MoviesSection name={ !search?props.name:"Results"} movieobj={!search?movies[props.type]:movies.search}/>
            {/* < MoviesSection name="Popular" movieobj={movies.popular}/>
            < MoviesSection name="Discover" movieobj={movies.featured}/> */}
           {!search? (<Pagination type={props.type} movieobj={movies[props.type]} page={page}/>):''}
    </React.Fragment>
    )
                
                    



                }
                  
            
            </Container>
        
           </React.Fragment>
    )
  
   
    

}
export default MovieList;