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
           
      
            <BrowserRouter>
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/watchlist" element={<WatchList />} />
      <Route path="/login" element={<AuthForm title="Login" type="login" />} />
      <Route path="/register" element={ <AuthForm title="Register" type="register" />} />
    </Routes>
  </BrowserRouter>
      
            
            
    );
};
export default App;