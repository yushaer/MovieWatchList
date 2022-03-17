 
export default (movies={},action)=>{
    switch(action.type){
        case 'FETCH_Movies':
            movies.isLoading=false;
            return {...movies,...action.payload};
        case 'loading':
            return {...movies,...action.payload};
        default:
            return movies;
    }
}