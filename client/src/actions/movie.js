import * as api from "../api"
export const getFeaturedMovies=()=> async(dispatch)=>{
    console.log("test")
    try {
        dispatch({type:"loading",payload:{isLoading:true}});
        const {data}=await api.fetchFromAPI("/movies/featured")
        
         dispatch({type:'FETCH_Movies',payload:{featured:data.results}});
    } catch (error) {
        console.log(error.message);
    }
 
}


export const getRecommendedMovies=()=> async(dispatch)=>{
   
    try {
        dispatch({type:"loading",payload:{isLoading:true}});
        const {data}=await api.fetchFromAPI("/movies/recommendations")
        
         dispatch({type:'FETCH_Movies',payload:{recomended:data.results}});
    } catch (error) {
        console.log(error.message);
    }
 
}
export const getPopularMovies=()=> async(dispatch)=>{
    console.log("test")
    try {
        dispatch({type:"loading",payload:{isLoading:true}});
        const {data}=await api.fetchFromAPI("/movies/popular")
        
         dispatch({type:'FETCH_Movies',payload:{popular:data.results}});
    } catch (error) {
        console.log(error.message);
    }
 

}

export const searchMovies=(name)=> async(dispatch)=>{
    console.log("search " + name)
    try {
        dispatch({type:"loading",payload:{isLoading:true}});
        const {data}=await api.fetchFromAPI("/movies/search?movieName="+name);
        
         dispatch({type:'FETCH_Movies',payload:{search:data.results}});
    } catch (error) {
        console.log(error.message);
    }
 
}
