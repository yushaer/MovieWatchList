const userReducer= (state={user:null,isLoggedIn:false,watchList:[]},action)=>{
    switch(action.type){
        case 'setUser':
         
            return {...state,...action.payload};

        case'getWatch':
        return {...state,...action.payload};
   
        case 'logout':
            
            localStorage.clear();
            return {...state,user:null,isLoggedIn:false};
         
       
        default:
            return state;
           
    }
}
export default userReducer;