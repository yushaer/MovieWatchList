import * as api from "../api"
export const getFeaturedMovies=()=> async(dispatch)=>{
    console.log("test")
    try {
        const {data}=await api.fetchFromAPI("featured")
        
         dispatch({type:'FETCH_Featured',payload:{featured:data.results}});
    } catch (error) {
        console.log(error.message);
    }
 
}
export const getPopularMovies=()=> async(dispatch)=>{
    console.log("test")
    try {
        const {data}=await api.fetchFromAPI("popular")
        
         dispatch({type:'FETCH_Popular',payload:{popular:data.results}});
    } catch (error) {
        console.log(error.message);
    }
 

}

export const searchMovies=(name)=> async(dispatch)=>{
    console.log("search " + name)
    try {
        const {data}=await api.fetchFromAPI("search?movieName="+name);
        
         dispatch({type:'FETCH_Search',payload:{search:data.results}});
    } catch (error) {
        console.log(error.message);
    }
 
}
