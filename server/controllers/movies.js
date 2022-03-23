import moviesList from "../models/movieList.js";
import Users from '../models/users.js'
import fetch from 'node-fetch';
import config from '../movie-config.js'
import movieConfig from "../movie-config.js";
 
import memorycache from 'memory-cache';
export const getMoviesList=async(req,res)=>{
    try{
        const movies=await moviesList.find({user:req.userId});
console.log(movies.length);
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
/**
 * deletes a movie from User Watch List
 * @param {*} req- request object
 * @param {*} res - response object
 * @returns     
 */
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
export const getTopRatedMovies=async(req,res)=>{
    try{

    }catch(error){
        res.status(404).json({message:error.message});
    }
}
    
export const getRecommendedMovies=async(req,res)=>{
    try{
        const movies=await moviesList.find({user:req.userId});
        if(movies.length>0){
            let page =1;
        if(req.query.page){
            page=req.query.page;
        }
            const movie=movies[Math.floor(Math.random()*movies.length)];
            const movieurl= movieConfig.url.base_url+movie.movie.id+"/recommendations?page="+page+"&api_key="+movieConfig.api_key;
            const recomended = await fetchFromApi(movieurl);
            //console.log(recomended)
            return res.status(200).json(recomended);
        }
        else {
            return res.status(404).json({message:"No movie present in the watchlist to reccomend from"})
        }

       
    }catch(error){
        res.status(404).json({message:error.message});
    }
}
async function fetchMovies(pages) {
    return await Promise.all(  pages.map(async page => {
           const resp = await fetch(page);
           return resp.json();
         }));
         
   }
export const getFeaturedMovies= async(req,res)=>{
    try{
        let page =1;
        if(req.query.page){
            page=req.query.page;
        }
        const movies= await fetchFromApi(movieConfig.url.featured+"&page="+page);
        let key='_express_' +req.originalUrl||req.url;
        memorycache.put(key,JSON.stringify(movies),10000)
        
        //console.log(movies);
        res.status(200).json(movies);
    }
    catch(error){

        res.status(401).json({message: error.message});
    }

   
    
}
export const getMoviesBySearch= async(req,res)=>{
    if(req.query.movieName){
        let page =1;
        if(req.query.page){
            page=req.query.page;
        }
        const movies= await fetchFromApi(movieConfig.url.search+req.query.movieName+"&page="+page)
        console.log(movies);
        return res.status(200).json(movies);
   
       
    }
    else{
        res.status(404).json({message:"movie_name parameter is invalid"})
    }
   

}


export const getPopularMovies= async(req,res)=>{
   try{
    let page =1;
    if(req.query.page){
        page=req.query.page;
    }


        let fetch_url=movieConfig.url.popular+"&page="+page
        const movies=await fetchFromApi(fetch_url)
        let key='_express_' +req.originalUrl||req.url;
         memorycache.put(key,JSON.stringify(movies),10000)
         //console.log(memorycache.get(key))
     //  console.log(movies);
        res.status(200).json(movies);
   }
   catch(error){
       console.log(error.message)
       res.status(401).json({message: error.message});
   }
       
    
            
   
      
       
       // console.log(movies);
       
   
  
   

}
function binarysearch(arr,key){
    let low=0;
    let high=arr.length-1;
    while(low<=high){
        let mid=Math.floor((low+high)/2);
        if(arr[mid].id===key){
            return mid;
        }
        else if(arr[mid].id<key){
            low=mid+1;
        }
        else{
            high=mid-1;
        }
    }
    return -1;
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