import moviesList from "../models/movieList.js";
import fetch from 'node-fetch';
import config from '../movie-config.js'
import movieConfig from "../movie-config.js";
export const getMoviesList=async(req,res)=>{
    try{
        const movies=await moviesList.find();
        console.log(movies);
        res.status(200).json(movies);
    }catch(error){
        res.status(404).json({message:error.message});
    }
}

async function fetchFromApi(url){
    
        const resp = await fetch(url);
        const data = resp.json();
        console.log(data)
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
        //.then(movies=>{
        // movies.results.forEach(async movie => {
        //     //console.log(movie);
        //     const mov={
        //         id:movie.id,
        //         title:movie.original_title,
        //         release_date: new Date(movie.release_date),
        //         language:movie.original_language,
        //         imageUrl:movie.poster_path
        //     }
        //     const movie_data= await new moviesList({movie:mov});
        //         try{
        //             movie_data.save();
                
        //         }catch(error){
        //             res.status(404).json({message:error.message});
        //         }
        //     });
           
           
             
        // });
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
            console.log(posts);
            posts.forEach(page => {
                page.results.forEach(page => {
                    postSet.add(page)
                });
            });
            const post_arr=Array.from(postSet);
            console.log(post_arr);
            res.status(200).json({results:post_arr});
        })
            
   
      
       
       // console.log(movies);
       
   
  
   

}
export const addMovies =async(req,res)=>{
    const movieid=req.query.id;
   
    const fetchurl = movieConfig.url.base_url+movieid+"?api_key="+movieConfig.api_key;
     await fetchFromApi(fetchurl).then(async movie=>{
        const mov={
            id:movie.id,
            title:movie.original_title,
            release_date: new Date(movie.release_date),
            language:movie.original_language,
            imageUrl:movieConfig.url.imageUrl+movie.poster_path
        }
        const toAdd= await new moviesList({movie:mov});
        try{
            toAdd.save();
            res.status(200).json(toAdd);
        }catch(error){
            res.status(404).json({message:error.message});
        }

     })
   // const movie= await new moviesList({movieId:movieid,imageUrl:img_url})
    
}