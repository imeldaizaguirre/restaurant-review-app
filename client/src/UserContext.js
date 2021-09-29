import React, { useState, createContext } from 'react'



export const UserContext = createContext();

export const UserProvider = (props) => {
    const[rating, setRating] = useState(5);
    const [hover, setHover] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userComment, setuserComment] = useState("");
    const [userRating, setuserRating] = useState(0);

    //addRestaurantForm state
    const [restaurantName, setRestaurantName] = useState(""); 
    const [restaurantAddress, setRestaurantAddress] = useState(''); 
    const [restaurantRating, setRestaurantRating] = useState(0);  

    //setting nearRestaurants Globally
    const [nRestaurant, setnRestaurant] = useState([])

    //setting newCoordinates for Click globally
    const [nCoordinates, setnCoordinates] = useState([]);
 
    //setting received Restaurant Reviews from API globally
    const [allRestaurantReviews, setallRestaurantReviews] = useState([]);
  
    //setting received restaurant images from API globally
    const [restaurantImage, setRestaurantImage] = useState([]);
    return (
        <UserContext.Provider value={{
        ratingK: [rating, setRating], 
        hoverK: [hover, setHover], 
        firstNameK: [firstName,setFirstName],
        lastNameK: [lastName, setLastName],
        userCommentK: [userComment, setuserComment],
        userRatingK: [userRating, setuserRating],
        restaurantNameK: [restaurantName, setRestaurantName],
        restaurantAddressK: [restaurantAddress, setRestaurantAddress],
        restaurantRatingK: [restaurantRating, setRestaurantRating], 
        nRestaurantK: [nRestaurant, setnRestaurant],
        nCoordinatesK: [nCoordinates, setnCoordinates],
        allRestaurantReviewsK: [allRestaurantReviews, setallRestaurantReviews],
        restaurantImageK: [restaurantImage, setRestaurantImage] 
        }}>
            {props.children}
        </UserContext.Provider>
    )
}





