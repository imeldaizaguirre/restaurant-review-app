import React, {useState, useEffect} from 'react'
import './Restaurant.css'
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import Review from './Review.js'
import axios from 'axios';

function Restaurant({restaurant, onClick}) {
//   const getAverage = (ratings) => {
//     console.log("this is ratings >>>>>",ratings)
//     return ratings.reduce((a,b) =>  a + b) / ratings.length;
    
// }
const [ratingValue] = useState(restaurant.rating);
const [restaurantImage, setrestaurantImage] = useState(null)
const [restaurantReviews, setrestaurantReviews] = useState(null)
const [hasClicked, sethasClicked] = useState(false)


useEffect(() => {
    const key ="key=AIzaSyAY3St2Q1qw3XCTl2by6ccsrDfL_w7LB9w";
    let requestPlaceImage = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${restaurant.geometry.location.lat},${restaurant.geometry.location.lng}&heading=151.78&pitch=-0.76&${key}`
    let requestPlaceReviews = `https://api.allorigins.win/raw?url=https://maps.googleapis.com/maps/api/place/details/json?place_id=${restaurant.place_id}&fields=name,rating,reviews,geometry,formatted_phone_number&${key}`

    const requestOne = axios.get(requestPlaceImage);
    const requestTwo = axios.get(requestPlaceReviews);

    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        setrestaurantImage(responseOne.config.url)
        console.log("THIS IS RESPONSE TWO>>>>>>", responseTwo)
        setrestaurantReviews(responseTwo.data.result)
      })).catch(errors => {
        // react on errors.
      })
},[])


    return (
        <div>
        <div className="Restaurant__Container" onClick = {onClick}>
            <div className="Restaurant__info">
                <h2 className="Restaurant__Name">{restaurant.name}</h2>
                <p className="Restaurant__Address">{restaurant.vicinity}</p>
                <div className="Raiting__Container">
                    <div>
                        <p className="Restaurant__Rating">
                            {ratingValue}
                        </p>  
                    </div>
                    <div class="Restaurant__Rating__Star">
                        {ratingValue ? Array(Math.floor(ratingValue)).fill().map(n => 
                          <StarIcon fontSize = "small" /> ) : <p className="noRating">No Rating Available</p>}
                        {ratingValue && ratingValue % 1 !== 0 ?
                         <StarHalfIcon   fontSize = "small" /> : null}
                        
                    </div>
                </div>
  
            </div>
            
            <div className="Restaurant__image">
                <img src={restaurantImage} alt="restaurant img"></img>

                {/* "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcjPqtmfI9vyJdQhl6Gr1OCaL42ywae0kbvz9QUte5xTNu1rc0E_2uOcjabQ&usqp=CAc" */}
            </div>
            <div>
            </div>
        </div>
        {onClick ? 
        <Review restaurant={restaurant} restaurantImage={restaurantImage} restaurantReviews ={restaurantReviews} /> : null}
        </div>
        

    )
}

export default Restaurant
