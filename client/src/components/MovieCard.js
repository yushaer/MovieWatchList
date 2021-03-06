import React,{useState,useEffect} from "react";
import * as api from '../api/index.js';
import {isMobile} from 'react-device-detect';
import { MDBBadge } from 'mdb-react-ui-kit';
import { useNavigate} from 'react-router-dom';
import {Popover,OverlayTrigger} from "react-bootstrap";
import { MDBCard, MDBCardBody, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';
import { useSelector,useDispatch } from "react-redux";
import {getWatchList} from '../actions/user'
import GenreBadge from "./GenreBadge";
import moment from "moment";
const MovieCard=(props)=>{
    const[hover,sethover]=useState(false);
    const[profile,setProfile]=useState({});
 
    const profileData=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  useEffect(() => {


   
  setProfile(profileData)


  }, [profileData]);
  const handleDelete=async()=>{
    if(profile.isLoggedIn){
      await api.deleteMovie(props.movieId);
      dispatch(getWatchList());
    }
    else{
     navigate("/login")
    }
  }
    const handleClick=async()=>{
      if(props.type=="watchlist"){
        if(profile.isLoggedIn){
          await api.updateWatchList({id:props.movieId});
          dispatch(getWatchList());
        }
        else{
         navigate("/login")
        }
       
      }
      else{
        const movieData={
          id:props.id,
          title:props.title,
          release_date:props.release_date,
          imageUrl:"https://image.tmdb.org/t/p/w185/"+props.poster_path
        }
        try {
          const{data} = await api.addMovie(movieData)
         
          alert(data.message);
          dispatch(getWatchList());
        } catch (error) {
         
          console.log(error.response.data);
        }
      }
        
    }
    const overview = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">{props.title}</Popover.Header>
        <Popover.Body>
        {props.overview}
        </Popover.Body>
      </Popover>
    );
    const CardHeader=()=>{
      if(props.type=="watchlist"){
        return(<><MDBCardImage className="card-img" src={props.imageUrl != null ? (props.imageUrl) : "https://image.cnbcfm.com/api/v1/image/106988339-1639402354290-gettyimages-1229892421-urnnewsmldpacom20090101201201-90-025559.jpeg?v=1645216444&w=929&h=523"} fluid alt='...' />
        <div className='mask text-center text-center mx-auto justify-content-center card-img-overlay' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}>
        {hover ?
          <MDBBtn className='text-dark' color='light' onClick={handleClick}>{props.btnText}</MDBBtn>
          :""}
        </div></>)
                    }
        else {
          return (<><MDBCardImage className="card-img" src={props.poster_path != null ? ("https://image.tmdb.org/t/p/w185/" + props.poster_path) : "https://image.cnbcfm.com/api/v1/image/106988339-1639402354290-gettyimages-1229892421-urnnewsmldpacom20090101201201-90-025559.jpeg?v=1645216444&w=929&h=523"} fluid alt='...' />
          <OverlayTrigger trigger={["focus", "hover"]} placement={isMobile?'bottom':'right'} overlay={overview}>

                <div className='mask text-center text-center mx-auto justify-content-center card-img-overlay' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}>
                  {hover && profile.isLoggedIn ?
                    <MDBBtn className='text-dark' color='light' onClick={handleClick}>Add To Watch List</MDBBtn>
                    : ""}
                </div></OverlayTrigger></>)
        }
        
    }
 
 
   
      return(
        <MDBCard className="bg-light mb-5 movie" data-aos="fade-right" style={{ maxWidth: '22rem' }}>
              
                
        <MDBRipple rippleColor='light' rippleTag='div' className="bg-image hover-overlay" onMouseEnter={() => sethover(true)}
          onMouseLeave={() => sethover(false)} >
            {
            CardHeader()
          
          }
              
        </MDBRipple >
      <MDBCardBody>
     {props.type!="watchlist"?(<><GenreBadge genres={props.genres} /><br></br></>):""} 
     
    
    
       
        <h3 className="card-title">{props.title}</h3>

        
        <span className="movie_info float-start">{props.type=="watchlist"?new moment(props.release_date).format("YYYY MM DD"):props.release_date}</span>
        <span className="movie_info float-end">{props.type=="watchlist"?(<MDBBtn className='text-light' color='danger' onClick={handleDelete} >delete</MDBBtn>):(<><i className="fas fa-star"></i>{props.vote_average}</>)}</span>
      
        </MDBCardBody>
        
</MDBCard>
        // <div className="card bg-light mb-5 movie " data-aos="fade-right" style={{"width": "18rem"}}>
        //       <img src={props.poster_path!=null?("https://image.tmdb.org/t/p/w185/"+props.poster_path):"https://image.cnbcfm.com/api/v1/image/106988339-1639402354290-gettyimages-1229892421-urnnewsmldpacom20090101201201-90-025559.jpeg?v=1645216444&w=929&h=523"} class="card-img" alt="..."/> 
        //       <OverlayTrigger trigger={["focus","hover"]}  placement={'right'} overlay={overview}> 
        //       <div class="card-img-overlay text-center mx-auto justify-content-center"  onMouseEnter={() => sethover(true)}
        // onMouseLeave={() => sethover(false)}>
        //           {hover&&profile.isLoggedIn?  <button className="btn  btn-secondary rounded shadow-lg  " onClick={handleClick}>Add To Watch List</button>:""}
               
        //         </div></OverlayTrigger>
        //       <div className="card-body">
                
        //         <h3 className="card-title">{props.title}</h3>
                
        //         <span class="movie_info float-start">{props.release_date}</span>
		   	// 	       <span class="movie_info float-end"><i class="fas fa-star"></i>{props.vote_average}</span>
        //         <br></br>
               
        //         </div>
                
        // </div>
    )
    

    
  

}
export default MovieCard;