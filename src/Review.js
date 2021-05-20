import React, {useState} from 'react'
import './Review.css'
import StarIcon from '@material-ui/icons/Star';



function Review({restaurant, restaurantImage, restaurantReviews}) {
    return (
        <div className= "Review__Container">
            {/* image of restaurant */}
            <div className="Review__Image">
            <img src={restaurantImage} alt="restaurant img"></img>
            </div>
        <div className="Review__Ratings">
            <div className="Review__Address">
            <span className="Map__Icon"><i class="fa fa-map-marker" aria-hidden="true"></i></span><span className="Review__Address_Text">{restaurant.vicinity}</span>
            </div>
            
            {restaurantReviews.map(review => (
                <div className="Review__Comments__Container">
                    <div className="Review__Stars__Container">
                        <div className="Review__Stars__Number">
                            <span>{review.rating}</span>
                        </div>
                        <div>
                            {Array(Math.floor(review.rating)).fill().map(n => 
                            n = <StarIcon fontSize = "small" /> )}
                        </div>
                    </div>
                    <div>
                        <div>
                            {review.author_name.toLowerCase()}
                        </div>
                        <div className="Review__Comment">
                        <p>{review.text}</p>
                        </div>
                    </div>
                  
                </div>
            ))}
        </div>
        
        </div>
    )
}

export default Review
