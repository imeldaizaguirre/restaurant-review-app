import React, {useState} from 'react'
import './NearByRestaurants.css'
import Restaurant from './Restaurant.js'
import Filter from "./Filter.js"
import Review from "./Review.js"




function NearByRestaurants({nearRestaurants}) {
    
const [selectedRestaurant, setSelectedRestaurant] = useState(null);
const showReviews = (restaurant) => { 
        setSelectedRestaurant(restaurant)

}

const handleClick = () => {
    setSelectedRestaurant(null)
    console.log("this is hasClicked value >>>>>",)
}


    return (
        <div className="NearByRestaurants__Container">          
            <Filter restaurant={selectedRestaurant} onClick={handleClick}/>
        
                    
            {selectedRestaurant ? 
            <Review restaurant = {selectedRestaurant}  />
                :
            nearRestaurants.map(restaurant => (
                    <div onClick={() => showReviews(restaurant)}>
                    <Restaurant 
                    restaurant = {restaurant}

                    />
                    </div>
                    
                )) 
            }                   
        </div>
    )
}

export default NearByRestaurants
