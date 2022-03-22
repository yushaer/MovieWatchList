import React, { useEffect,useState} from 'react';
 
import { Link,useNavigate,useLocation} from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
const MoviePagination =(props)=>{
    const navigate=useNavigate();
    const[startIdx,setStartIdx]=useState(0);
    const[endIdx,setEndIdx]=useState(0);

    const location = useLocation()
    

    console.log(props.page)

let max_pages=1;
 

     
        
       // console.log(movieData)
        if( typeof props.movieobj !== 'undefined'  ){
            
                
                    max_pages=props.movieobj.totalPages;
               
            
            
        }
        
   
  return( <div aria-label='Page navigation example' className=' text-light movie-pagination-bar'>
  <Pagination 
      page={parseInt(props.page)}
      count={max_pages}
      
      color="primary"
   
      classes={{ ul: "movie-pagination bg-dark",li:"movie-pagination-item"  }}
      renderItem={(item) => (
        <PaginationItem  
        className="movie-pagination-item"  
          component={Link}
          to={location.pathname+`${item.page === 1 ? '' : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
</div>);
    
}
export default MoviePagination;