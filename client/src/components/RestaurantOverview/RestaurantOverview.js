import React, {useState, useEffect, useContext} from 'react'
import './RestaurantOverview.css'
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import Restaurant from '../Restaurant/Restaurant';
import axios from 'axios';
import {UserContext} from '../../UserContext'
import {apiKey}  from '../../apiKeys.js'





function RestaurantOverview({restaurant, onClick, selected}) {
const [restaurantImage, setRestaurantImage] = useState("");
const { allRestaurantReviewsK} = useContext(UserContext);
const [allRestaurantReviews, setallRestaurantReviews] = allRestaurantReviewsK;



useEffect( () => {
    if(allRestaurantReviews.length === 0) {
        // https://api.allorigins.win/raw?url=
        let requestPlaceReviews =  `https://maps.googleapis.com/maps/api/place/details/json?place_id=${restaurant.place_id}&fields=name,rating,reviews,geometry,formatted_phone_number&key=${apiKey}`
    
       
       axios.get(requestPlaceReviews).then((response) => {
            setallRestaurantReviews(response.data.result.reviews)
          }).catch(errors => {
            console.log(errors);
          })
    }
    let requestPlaceImage = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${restaurant.geometry.location.lat},${restaurant.geometry.location.lng}&heading=151.78&pitch=-0.76&key=${apiKey}`

    axios.get(requestPlaceImage).then((response) => {
        setRestaurantImage(response.config.url)
    })
},[])

    return (
        selected ? 
        <Restaurant 
        restaurant={restaurant} 
        restaurantImage={restaurantImage} 
        restaurantReviews={allRestaurantReviews}
        /> 
        
        : 

        <div>
        <div className="Restaurant__Container" onClick = {onClick}>
            <div className="Restaurant__info">
                <h2 className="Restaurant__Name">{restaurant.name}</h2>
                <p className="Restaurant__Address">{restaurant.vicinity}</p>
                <div className="Raiting__Container">
                    <div>
                        <p className="Restaurant__Rating">
                            {restaurant.rating}
                        </p>  
                    </div>
                    <div className="Restaurant__Rating__Star">
                        {restaurant.rating ? Array(Math.floor(restaurant.rating)).fill().map((n, i) => 
                          <StarIcon key={i}fontSize = "small" /> ) : <p className="noRating">No Rating Available</p>}
                        {restaurant.rating && restaurant.rating % 1 !== 0 ?
                         <StarHalfIcon   fontSize = "small" /> : null}
                        
                    </div>
                </div>
  
            </div>
            
            <div className="Restaurant__image">
                <img src={restaurantImage} alt="restaurant img"></img>
            </div>
            <div>
            </div>
        </div>        
        </div>
        

    )
}

export default RestaurantOverview
