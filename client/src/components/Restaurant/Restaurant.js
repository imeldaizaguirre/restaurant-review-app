import React from 'react'
import './Restaurant.css'
import ReviewsList from '../ReviewList/ReviewsList';




function Restaurant({restaurant, restaurantImage, restaurantReviews}) {
    return (
        <div className= "Review__Container">
            {/* image of restaurant */}
            <div className="Review__Image">
            <img 
            src={restaurantImage} alt="restaurant img"></img>

            </div>
        <div className="Review__Ratings">
            <div className="Review__Address">
            <span className="Map__Icon"><i className="fa fa-map-marker" aria-hidden="true"></i></span><span className="Review__Address_Text">{restaurant.vicinity}</span>
            </div>
            
            <ReviewsList 
            restaurant ={restaurant}
            restaurantImage = {restaurantImage}
            restaurantReviews = {restaurantReviews}
            />
        </div>
        
        </div>
    )
}

export default Restaurant
