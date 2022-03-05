import React,{useState} from "react";
const MovieItem=(props)=>{
    const[hover,sethover]=useState(false);
    return(
        <div className="card bg-light  mb-5 rounded  movie " data-aos="fade-bottom" style={{"width": "18rem"}}>
              <img src={"https://image.tmdb.org/t/p/w185/"+props.poster_path} class="card-img" alt="..."/> 
              <div class="card-img-overlay text-center mx-auto justify-content-center"  onMouseEnter={() => sethover(true)}
        onMouseLeave={() => sethover(false)}>
                  {hover?     <button className="btn  btn-secondary rounded shadow-lg  ">Add To Watch List</button>:""}
               
                </div>
              <div className="card-body">
                <h3 className="card-title">{props.title}</h3>
                <span class="movie_info float-start">{props.release_date}</span>
		   		<span class="movie_info float-end"><i class="fas fa-star"></i>{props.vote_average}</span>
                </div>
        </div>
    )
  

}
export default MovieItem;