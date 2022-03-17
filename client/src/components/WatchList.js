import React, { useEffect,useState } from 'react';
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { MDBContainer, MDBRow, MDBCol,MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane } from 'mdb-react-ui-kit';
import * as api from '../api/index.js';
import {setUser} from '../actions/user'
import { useNavigate  } from 'react-router-dom';
import { useSelector,useDispatch  } from "react-redux";


const WatchList =(props)=>{
 
    const dispatch=useDispatch();
    const[toggleWatched,setToggleWatched]=useState(false)
    const userData=useSelector((state)=>state.user);
    const history = useNavigate ();
    const [profile,setProfile]=useState({isLoggedIn:true,watchList:[]})
  

useEffect(() => {
 
    const user = JSON.parse(localStorage.getItem("user"));

 if(!user){
    history('/login')
}       
dispatch(setUser())
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
        <MDBCol md="12">
        <h1 className='text-center text-light'>{toggleWatched?"Watched Movies":"Unwatched"}</h1>
        <MDBTabs pills className='mb-3 move-tabs justify-content-center'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => setToggleWatched(false)} active={!toggleWatched}>
            WatchList
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => setToggleWatched(true)} active={toggleWatched}>
          Watched Movies
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent >
        <MDBTabsPane show={!toggleWatched}><section>
            
        <h1 className='text-center text-light'></h1><div className="row height ">
                    {unwatched.map((movie, idx) => {
                        return (<div className="col-lg-3 ">
                            <MovieCard idx={idx} movieId={movie._id} type="watchlist" btnText="Set As Watched" {...movie.movie} />

                        </div>

                        );
                    })}
                </div>
            
            
            </section></MDBTabsPane>
        <MDBTabsPane show={toggleWatched}><section>
             <div className="row height ">                        
                {watched.map((movie, idx) => {
                            return (
                                    <div className="col-lg-3 ">
                                    <MovieCard idx={idx} movieId={movie._id} type="watchlist" btnText="Remove from Watched" {...movie.movie} />
                                    </div>

                                        );
                                    })}
                                </div></section></MDBTabsPane>
        
      </MDBTabsContent>
        

        </MDBCol>
        </MDBRow>
      <section>
      
        </section>  
      <section>
 
      </section>
        </MDBContainer>
        </>)
}
export default WatchList;