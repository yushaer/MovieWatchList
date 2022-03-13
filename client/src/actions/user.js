import * as api from "../api"
export const setUser=()=> async(dispatch)=>{

    try {
        if (localStorage.getItem('token')){
            const {data}=await api.getUser();
            //console.log(data)
         dispatch({type:'setUser',payload:{user:data,isLoggedIn:true}});
        }
       
    } catch (error) {
        
        dispatch({type:'logout'});
        console.log(error.message);
    }
 
}
