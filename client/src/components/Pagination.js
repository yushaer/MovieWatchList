import React, { useEffect,useState} from 'react';
 

import { Link,useNavigate,useLocation} from 'react-router-dom';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
const Pagination =(props)=>{
    const navigate=useNavigate();
   

    const location = useLocation()
    

    console.log(props.page)

let max_pages=10;
 

     
         function createPaginationItems(count){
             let elements=[]
             for(var i=1;i<=count;i++){
                 const elem=(
                    <MDBPaginationItem key={i} className={'text-light'+(i==parseInt(props.page)?' active':"")}>
                        <Link to={location.pathname+"?page="+ i} className="page-link">
                            {i}
                        </Link>
                    </MDBPaginationItem>
                 )
                 elements.push(elem);
             }
             return elements
         }
       // console.log(movieData)
        if( typeof props.movieobj !== 'undefined'  ){
            
                if( props.movieobj.totalPages<max_pages){
                    max_pages=props.movieobj.totalPages;
               
            }
            
        }
  return( <nav aria-label='Page navigation example' className='bg-dark text-light movie-pagination'>
  <MDBPagination  circle  center className=''>
  <MDBPaginationItem className='text-light'>
      <Link to={location.pathname+"?page="+ (parseInt(props.page)>1?parseInt(props.page)-1:props.page) } className="page-link">

        <span aria-hidden='true'>«</span>
        </Link>
    </MDBPaginationItem>
   {createPaginationItems(max_pages)}
   
    <MDBPaginationItem>
    <Link to={location.pathname+"?page="+ (parseInt(props.page)<max_pages?parseInt(props.page)+1:props.page)} className="page-link">

    <span aria-hidden='true'>»</span>
    </Link>
      
    </MDBPaginationItem>
  </MDBPagination>
</nav>);
    
}
export default Pagination;