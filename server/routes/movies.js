import express from 'express';
import  {getMoviesList,addMovies,getFeaturedMovies,getMoviesBySearch,getPopularMovies}  from '../controllers/movies.js';
const router = express.Router();
router.get('/',getMoviesList);
router.get('/featured',getFeaturedMovies);
router.get('/search',getMoviesBySearch);
router.get('/popular',getPopularMovies)
router.post('/',addMovies);
export default router;