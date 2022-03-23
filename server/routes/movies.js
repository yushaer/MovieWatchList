import express from 'express';
import  {
    getMoviesList,
    addMovies,
    getFeaturedMovies,
    getMoviesBySearch,
    getPopularMovies,
    getRecommendedMovies,
    updateMovie,
    deleteMovie,
  
}  from '../controllers/movies.js';
import auth from '../middleware/auth.js';
import cache from '../middleware/cache.js';
const router = express.Router();
router.get('/watchlist',auth, getMoviesList);
router.get('/featured',cache,getFeaturedMovies);
router.get('/recommendations',auth,getRecommendedMovies);
router.get('/search',getMoviesBySearch);
router.get('/popular',cache,getPopularMovies);
router.post('/',auth,addMovies);
router.patch('/',auth,updateMovie);
router.delete('/',auth,deleteMovie);

export default router;