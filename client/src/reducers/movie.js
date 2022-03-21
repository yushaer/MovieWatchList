 
export default (movies={isLoading:false},action)=>{
    switch(action.type){
        case 'FETCH_Movies':
            movies.isLoading=false;
            return {...movies,...action.payload};
        case 'loading':
            return {...movies,...action.payload};
            break;
        default:
            return movies;
            break;
    }
}