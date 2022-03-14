import moviesList from "../models/movieList.js";
import Users from '../models/users.js'
import fetch from 'node-fetch';
import config from '../movie-config.js'
import movieConfig from "../movie-config.js";

export const getMoviesList=async(req,res)=>{
    try{
        const movies=await moviesList.find({user:req.userId});
   // console.log(movies);
        res.status(200).json(movies);
    }catch(error){
        res.status(404).json({message:error.message});
    }
}
export const updateMovie =async(req,res)=>{
    try{
        
        if(!req.body.id){
            return res.status(404).json({message:"id parameter is not present in request body"});
        }
        const movie=await moviesList.findOne({_id:req.body.id});
        movie.watched=!movie.watched
        movie.save();
    //console.log(movie);
        res.status(200).json(movie);
    }catch(error){
        res.status(404).json({message:error.message});
    }
}
export const deleteMovie =async(req,res)=>{
    try{
        if(!req.query.id){
            return res.status(404).json({message:"id parameter is required"});
        }
        const movie=await moviesList.findByIdAndRemove(req.query.id);
       console.log(req.query)
    ///console.log(movie);
        res.status(200).json({message:"movie removed from watch list"});
    }catch(error){
        console.log(error)
        res.status(404).json({message:error.message});
    }
}


async function fetchFromApi(url){
    
        const resp = await fetch(url);
        const data = resp.json();
        //console.log(data)
        return data;
      
}
async function fetchMovies(pages) {
    return await Promise.all(  pages.map(async page => {
           const resp = await fetch(page);
           return resp.json();
         }));
         
   }
export const getFeaturedMovies= async(req,res)=>{
    
        const movies= await fetchFromApi(movieConfig.url.featured);
        //console.log(movies);
        res.status(200).json(movies);
    
}
export const getMoviesBySearch= async(req,res)=>{
    if(req.query.movieName){
        let page =1;
        if(req.query.page){
            page=req.query.page;
        }
        const movies= await fetchFromApi(movieConfig.url.search+req.query.movieName+"&page="+page)
        
        res.status(200).json(movies);
       // console.log(movies);
       
    }
    else{
        res.status(404).json({message:"movie_name parameter is invalid"})
    }
   

}

export const getPopularMovies= async(req,res)=>{
   
        let page =1;
        if(req.query.page){
            page=req.query.page;
        }
        let pages=[movieConfig.url.popular+"&page="+1,movieConfig.url.popular+"&page="+2,movieConfig.url.popular+"&page="+3]
        fetchMovies(pages).then(posts => {
            let postSet = new Set()
           // console.log(posts);
            posts.forEach(page => {
                page.results.forEach(page => {
                    postSet.add(page)
                });
            });
            const post_arr=Array.from(postSet);
           // console.log(post_arr);
            res.status(200).json({results:post_arr});
        })
            
   
      
       
       // console.log(movies);
       
   
  
   

}
export const addMovies =async(req,res)=>{
    const movieid=req.query.id;
    const mov=req.body;
   
    try{                                                    
        const movie_Exists = await moviesList.findOne({user:req.userId,"movie.id":mov.id})
      //  console.log(movie_Exists)
        if(!movie_Exists){
            const Movie= await new moviesList({movie:mov,user:req.userId});
            await Movie.save();
            return res.status(200).json({message:"movie added to watchlist"})
        }                                                                   
        else{
            return res.status(200).json({message:"movie already in watchlist"})
        }
       

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Unable to add movie" });
      }
 
    
     
   // const movie= await new moviesList({movieId:movieid,imageUrl:img_url})
    
}