import React,{useEffect,useState} from "react";
import MovieItem from "./MovieItem";
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
            <div className="row height d-flex justify-content-center align-items-center">
                <div className="col-md-8">
                    <div className="search"> 
                        <i className="fa fa-search"></i> 
                        <input type="text" className="form-control" onKeyDown={handleSearch} placeholder="Search Movies"/>
                    </div>
                </div>
            </div>
           ){
            + (!search)?(
                <React.Fragment>
                <section className="popular">
        
                <h2 className="text-center text-light">Popular</h2>
               <hr class="bg-light border-top border-light"></hr>
           <div className="row">
               {
              typeof movies.popular !== 'undefined'? movies.popular.map((movie,idx)=>{
                       return(<div className="col-lg-3">
                           <MovieItem idx={idx} {...movie}/>
                           
                           </div>
                           
                           )
               }):""
               
           
           }
              
            </div>
           </section>
           <section className="featured">
               <h2 className="text-center text-light">Discover</h2>
               <hr class="bg-light border-top border-light"></hr>
           <div className="row">
               {
              typeof movies.featured !== 'undefined'? movies.featured.map((movie,idx)=>{
                       return(<div className="col-lg-3">
                           <MovieItem idx={idx} {...movie}/>
                           
                           </div>
                           
                           )
               }):""
               
           
           }
              
            </div>
            </section>
            </React.Fragment>
            ):(
                <section className="Results">
               <h2 className="text-center text-light">Results</h2>
               <hr class="bg-light border-top border-light"></hr>
           <div className="row">
               {
              typeof movies.search!== 'undefined'? movies.search.map((movie,idx)=>{
                       return(<div className="col-lg-3">
                           <MovieItem idx={idx} {...movie}/>
                           
                           </div>
                           
                           )
               }):""
               
           
           }
              
            </div>
            </section>
            )
           }
            
         
        
           </React.Fragment>
    )
  

}
export default MovieList;