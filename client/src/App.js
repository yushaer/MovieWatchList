import {React,useEffect} from "react";
import 'bootstrap/dist/js/bootstrap.bundle';
import MovieList from "./components/MovieList";
import AOS from 'aos';
import { useDispatch } from "react-redux";
import {setUser} from "./actions/user"

import {getFeaturedMovies,getPopularMovies} from './actions/movie'
const App=()=>{
  const dispatch=useDispatch();
    useEffect(() => {
        AOS.init({
          duration : 2000
        });
        dispatch(getFeaturedMovies());
        dispatch(getPopularMovies());
        dispatch(setUser())
      }, [dispatch]);
    return(
           
        <div className=''>
            
      
            <MovieList/>
            </div>
    );
};
export default App;