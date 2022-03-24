import react from 'react';
import { MDBBadge } from 'mdb-react-ui-kit';

const GenreBadge =(props)=>{
    const genres=props.genres;
     
        return genres.map((genre,index)=>{
            return(
                <MDBBadge key={index}  className="me-1 genre-badge" style={{}}>{genre}</MDBBadge>
            )  
        })
        
    
}
export default GenreBadge;