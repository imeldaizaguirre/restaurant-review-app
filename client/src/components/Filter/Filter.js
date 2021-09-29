import React, {useContext} from 'react'
import "./Filter.css"
import CloseIcon from '@material-ui/icons/Close';
import {FaStar} from "react-icons/fa"
import {UserContext} from '../../UserContext'


function Filter({restaurant, onClick}) {
    const {ratingK, hoverK} = useContext(UserContext);

    const [rating, setRating] = ratingK;
    const [hover, setHover] = hoverK;
 

    return (
        <div className="Filter__Container">
            <div className="Filter__Heading">
                {restaurant !== null ? 
                <h2>{restaurant.name}</h2> :
                <h3>Filter ratings below</h3>
                }    
  
            </div>
            <div className="Filter__Stars"> 
                {restaurant ?
                <CloseIcon fontSize="inherit" onClick={onClick}/>
                : 
                [...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return(
                        <label key={i}>
                            <input 
                            type="radio" 
                            name="rating" 
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}

                            />
                            <FaStar className="star" 
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9" }
                            size={30}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave = {() => setHover(null)}
                            /> 
                        </label> 
                    ) 

                })

                
            } 
            
            </div>
           
        </div>
    )
}

export default Filter

