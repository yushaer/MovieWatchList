 
export default (movies={},action)=>{
    switch(action.type){
        case 'FETCH_Featured':
            return {...movies,...action.payload};
            break;
        case 'FETCH_Popular':
            return {...movies,...action.payload};
            break;
        case 'FETCH_Search':
            return {...movies,...action.payload};
            break;
        default:
            return movies;
    }
}