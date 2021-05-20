import React from 'react'
import "./Filter.css"
import CloseIcon from '@material-ui/icons/Close';
import NearByRestaurants from './NearByRestaurants';

function Filter({restaurant, onClick}) {
 

    return (
        <div className="Filter__Container">
           
            <div className="Filter__Heading">
                {restaurant ? <h2>{restaurant.restaurantName}</h2> :
                <h3>Filter ratings below</h3>
                }              
            </div>
            <div className="Filter__Stars"> 
                {restaurant ?
                <CloseIcon fontSize="inherit" onClick={onClick}/>
                : 
                <p>⭐️⭐️⭐️⭐️</p> 
                
            } 
            
            </div>
           
        </div>
    )
}

export default Filter
