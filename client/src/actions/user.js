import * as api from "../api"
export const setUser=()=> async(dispatch)=>{
    
    try {
        if (localStorage.getItem('token')){
            const {data}=await api.getUser();
            
         dispatch({type:'setUser',payload:{user:data,isLoggedIn:true}});
        }
       
    } catch (error) {
        console.log(error.message);
        dispatch({type:'logout'});
       
    }
 
}
export const getWatchList=()=> async(dispatch)=>{

    try {
        if (localStorage.getItem('token')){
            const {data}=await api.getWatchList();
            console.log(data)
         dispatch({type:'getWatch',payload:{watchList:data}});
        }
       
    } catch (error) {
        
       dispatch({type:'logout'});
        console.log(error.message);
    }
 
}

// export const updateWatchList=(updateData)=> async(dispatch)=>{

//     try {
//         if (localStorage.getItem('token')){
//             const {data}=await api.updateWatchList(updateData)
//             console.log(data)
//          dispatch({type:'getWatch',payload:{watchList:data}});
//         }
       
//     } catch (error) {
        
//        dispatch({type:'logout'});
//         console.log(error.message);
//     }
 
// }
