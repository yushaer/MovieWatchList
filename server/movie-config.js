 
 import dotenv  from "dotenv";
 if(!process.env.PRODUCTION){
   
  dotenv.config()
}
 const config={api_key:process.env.MOVIEAPIKEY,
  url:{
    base_url:"https://api.themoviedb.org/3/movie/",
    featured:"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.asc?&api_key=" +process.env.MOVIEAPIKEY,
    search:`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEAPIKEY}&language=en-US&query=`,
    imageUrl:"https://image.tmdb.org/t/p/w185",
    popular:`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIEAPIKEY}`
  },
  token_secret:process.env.TOKENSECRET
}
export default config
 