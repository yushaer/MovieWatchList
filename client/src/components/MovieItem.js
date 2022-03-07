import React,{useState} from "react";

import {Popover,OverlayTrigger,Button} from "react-bootstrap";
const MovieItem=(props)=>{
    const[hover,sethover]=useState(false);


    const overview = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">{props.title}</Popover.Header>
        <Popover.Body>
        {props.overview}
        </Popover.Body>
      </Popover>
    );
    return(
        <div className="card bg-light  mb-5 rounded  movie " data-aos="fade-right" style={{"width": "18rem"}}>
              <img src={props.poster_path!=null?("https://image.tmdb.org/t/p/w185/"+props.poster_path):"https://image.cnbcfm.com/api/v1/image/106988339-1639402354290-gettyimages-1229892421-urnnewsmldpacom20090101201201-90-025559.jpeg?v=1645216444&w=929&h=523"} class="card-img" alt="..."/> 
              <OverlayTrigger trigger={["focus","hover"]}  placement={'right'} overlay={overview}> 
              <div class="card-img-overlay text-center mx-auto justify-content-center"  onMouseEnter={() => sethover(true)}
        onMouseLeave={() => sethover(false)}>
                  {hover?  <button className="btn  btn-secondary rounded shadow-lg  ">Add To Watch List</button>:""}
               
                </div></OverlayTrigger>
              <div className="card-body">
                
                <h3 className="card-title">{props.title}</h3>
                
                <span class="movie_info float-start">{props.release_date}</span>
		   		<span class="movie_info float-end"><i class="fas fa-star"></i>{props.vote_average}</span>
                <br></br>
               
                </div>
                
        </div>
    )
  

}
export default MovieItem;