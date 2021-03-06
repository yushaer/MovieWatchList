import {React,useEffect} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import AuthForm from './components/Form'
import MovieList from "./components/MovieList";
import WatchList from "./components/WatchList";
import AOS from 'aos';
import { useDispatch } from "react-redux";
import {setUser,getWatchList} from "./actions/user"

import {getFeaturedMovies,getPopularMovies} from './actions/movie'
const App=()=>{
  
  const dispatch=useDispatch();
  
    useEffect(() => {
    
        AOS.init({
          duration : 1000
        });
        dispatch(setUser());
       
        dispatch(getWatchList())

      }, [dispatch]);
    return(
           
      
            <BrowserRouter>
    <Routes>
  
      
      <Route path="/popular" element={<MovieList name="Popular" type="popular" />} />
     
      <Route path="/discover" element={<MovieList name="Discover" type="featured" />} />
      <Route path="/recommended" element={<MovieList type="recomended" name="Recommended Movies"  />} />
      <Route path="/" element={<WatchList />} />
      <Route path="/login" element={<AuthForm title="Login" type="login" />} />
      <Route path="/register" element={ <AuthForm title="Register" type="register" />} />
    </Routes>
  </BrowserRouter>
      
            
            
    );
};
export default App;