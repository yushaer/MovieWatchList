
import MovieCard from "./MovieCard";
const moviesSection=(props)=>{
   // console.log("hellow")
    return(
        <section className="row height d-flex justify-content-center align-items-center" id={props.name}>
        <h2 className="text-center text-light">{props.name}</h2>
        <hr className="bg-light border-top border-light"></hr>
    <div className="row height ">
        {
           
            
            
                typeof props.movieobj !== 'undefined'? props.movieobj.map((movie,idx)=>{
                    return(<div key={idx} className="col-lg-3 ">
                        <MovieCard  {...movie}/>
                        
                        </div>
                        
                        )
                }):""
            
       
        
    
    }
       
     </div>
     </section>
    )
}

export default moviesSection;