import React, {useState, useContext} from 'react'
import './NearByRestaurants.css'
import RestaurantOverview from '../RestaurantOverview/RestaurantOverview.js'
import Filter from "../Filter/Filter.js"
import {UserContext} from '../../UserContext'


function NearByRestaurants({nearRestaurants}) {
const {ratingK} = useContext(UserContext);
const [rating, setRating] = ratingK;
    
const [selectedRestaurant, setSelectedRestaurant] = useState(null);

const showReviews = (restaurant) => { 
        setSelectedRestaurant(restaurant)

}

const handleClick = () => {
    setSelectedRestaurant(null)
}

const filteredRestaurants = nearRestaurants.filter(restaurant => (Math.floor(restaurant.rating | 0) <= Math.floor(rating) ));


    return (
    <div className="NearByRestaurants__Container">  
       
        <Filter restaurant={selectedRestaurant} onClick={handleClick}/>
        
                    
        {selectedRestaurant ? 
        <RestaurantOverview restaurant = {selectedRestaurant} selected={true} />     
        :
        filteredRestaurants.map((restaurant, i) => (
                <div key={i} onClick={() => showReviews(restaurant)}>
                <RestaurantOverview 
                restaurant = {restaurant}
                selected = {false}
                />
                </div>
                
            ))
        
        }  
             
                  
    </div>
    )
}

export default NearByRestaurants
