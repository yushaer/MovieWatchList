import React, { useEffect,useState } from 'react';
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import * as api from '../api/index.js';
import { useNavigate,Link  } from 'react-router-dom';
import { useSelector,useDispatch  } from "react-redux";
import {setUser,getWatchList} from '../actions/user'

const WatchList =(props)=>{
 
    const dispatch=useDispatch();

    const userData=useSelector((state)=>state.user);
    const history = useNavigate ();
    const [profile,setProfile]=useState({isLoggedIn:true,watchList:[]})
    
useEffect(() => {
 
    const user = JSON.parse(localStorage.getItem("user"));

 if(!user){
    history('/login')
}       
 //api.getWatchList()
    
    setProfile(userData);
}, [userData]);

 let unwatched= profile.watchList.filter((movie,idx)=>movie.watched==false
    );
let watched= profile.watchList.filter((movie,idx)=>movie.watched==true
    );
 console.log( unwatched)
return (
    
    <><Navbar title="Movies" /><br></br>
     <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
            
            

        </MDBCol>
        </MDBRow>
      <section>
          <h1 className='text-center text-light'>Unwatched</h1>
          <div className="row height ">
          {unwatched.map((movie,idx)=>{
                    return(<div className="col-lg-3 ">
                        <MovieCard idx={idx} movieId={movie._id} type="watchlist" btnText="Set As Watched" {...movie.movie}/>
                        
                        </div>
                        
                        )
                    })}
        </div>
      </section>
      <section>
          <h1 className='text-center text-light'>Watched Movies</h1>
          <div className="row height ">
          {watched.map((movie,idx)=>{
                    return(<div className="col-lg-3 ">
                        <MovieCard idx={idx} movieId={movie._id} type="watchlist" btnText="Remove from Watched" {...movie.movie}/>
                        
                        </div>
                        
                        )
                    })}
        </div>
      </section>
        </MDBContainer>
        </>)
}
export default WatchList;