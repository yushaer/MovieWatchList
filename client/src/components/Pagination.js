import React, { useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {searchMovies,getRecommendedMovies, getPopularMovies, getFeaturedMovies} from '../actions/movie'

import { Link,useNavigate,useLocation} from 'react-router-dom';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
const Pagination =(props)=>{
    const navigate=useNavigate();
    const[movieData,setMovieData]=useState(0);

    const location = useLocation()
    const dispatch = useDispatch();
    const data = useSelector((state) => state.movies);
    console.log(props.page)
    useEffect(()=>{
       
 
        setMovieData(data);
    
    },[data]);
     
let max_pages=10;
 
if(!movieData.isLoading){
     
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
        if(movieData){
            if(movieData[props.type]&& movieData[props.type].totalPages<max_pages){
                max_pages=movieData[props.type].totalPages;
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
</nav>);}
    
}
export default Pagination;