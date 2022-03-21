import * as api from "../api"
export const getFeaturedMovies=(page)=> async(dispatch)=>{
   // console.log("test")
    try {
        dispatch({type:"loading",payload:{isLoading:true}});
        const {data}=await api.fetchFromAPI("/movies/featured?page=" + page)
        
         dispatch({type:'FETCH_Movies',payload:{featured:{movies:data.results,page:data.page,totalPages:data.total_pages}}});
    } catch (error) {
        console.log(error.message);
    }
 
}


export const getRecommendedMovies=(page)=> async(dispatch)=>{
   
    try {
        dispatch({type:"loading",payload:{isLoading:true}});
        const {data}=await api.fetchFromAPI("/movies/recommendations?page=" + page)
        
         dispatch({type:'FETCH_Movies',payload:{recomended:{movies:data.results,page:data.page,totalPages:data.total_pages}}});
    } catch (error) {
        console.log(error.message);
    }
 
}
export const getPopularMovies=(page)=> async(dispatch)=>{
    console.log("test")
    try {
        dispatch({type:"loading",payload:{isLoading:true}});
        const {data}=await api.fetchFromAPI("/movies/popular?page=" + page)
        
         dispatch({type:'FETCH_Movies',payload:{popular:{movies:data.results,page:data.page,totalPages:data.total_pages}}});
    } catch (error) {
        console.log(error.message);
    }
 

}

export const searchMovies=(name)=> async(dispatch)=>{
    //console.log("search " + name)
    try {
        dispatch({type:"loading",payload:{isLoading:true}});
        const {data}=await api.fetchFromAPI("/movies/search?movieName="+name);
        
         dispatch({type:'FETCH_Movies',payload:{search:{movies:data.results,page:data.page,totalPages:data.total_pages}}});
    } catch (error) {
        console.log(error.message);
    }
 
}
