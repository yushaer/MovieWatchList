import React,{useEffect,useState} from "react";
import MovieCard from "./MovieCard";
const moviesSection=(props)=>{
    console.log("hellow")
    return(
        <section className="row height d-flex justify-content-center align-items-center" id={props.name}>
        <h2 className="text-center text-light">{props.name}</h2>
        <hr class="bg-light border-top border-light"></hr>
    <div className="row height ">
        {
           
            
            
                typeof props.movieobj !== 'undefined'? props.movieobj.map((movie,idx)=>{
                    return(<div className="col-lg-3 ">
                        <MovieCard idx={idx} {...movie}/>
                        
                        </div>
                        
                        )
                }):""
            
       
        
    
    }
       
     </div>
     </section>
    )
}

export default moviesSection;