import React, {useContext, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../Marker/Marker.js'
import {UserContext} from '../../UserContext'
import AddRestaurantForm from '../AddRestaurantForm/AddRestaurantForm.js'
import { apiKey } from '../../apiKeys.js';
   

const Map = ({center, zoom, nearRestaurants, addnewRestaurant, newCoordinatesCenter, clickedToAddRestaurant, hideRestaurantForm}) => {

  const {ratingK, restaurantNameK,  restaurantRatingK, restaurantAddressK, nRestaurantK, nCoordinatesK} = useContext(UserContext);

  const [rating, setRating] = ratingK;
  const [restaurantName, setRestaurantName] = restaurantNameK;
  const [restaurantRating, setRestaurantRating] = restaurantRatingK;
  const [restaurantAddress, setRestaurantAddress] = restaurantAddressK;
  const [nRestaurant, setnRestaurant] = nRestaurantK;
  const [nCoordinates, setnCoordinates] = nCoordinatesK;



  useEffect(() => {
    if(nearRestaurants){
      setnRestaurant(nearRestaurants)
      // filteredRestaurants = nRestaurant.filter(restaurant => (Math.floor(restaurant.rating) <= Math.floor(rating) ));
    }
    if(newCoordinatesCenter){
      setnCoordinates(newCoordinatesCenter)
    }
 
  }, [nearRestaurants, newCoordinatesCenter])
  

  const addRestaurant = () =>  {
    // add the review at the end of restaurantReviews array
    nearRestaurants.push({
        name: restaurantName,
        geometry: {
          location: {
            lat: nCoordinates.lat,
            lng: nCoordinates.lng
          }},
        vicinity: restaurantAddress, 
        rating: restaurantRating,
        
    })

    setRestaurantName("");
    setRestaurantAddress("");
    setRestaurantRating(0);
    hideRestaurantForm();
    
  }

let filteredRestaurants = nRestaurant.filter(restaurant => (Math.floor(restaurant.rating | 0) <= Math.floor(rating) ));

  return (
    <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact 
          bootstrapURLKeys={{ key: apiKey }}
          center={center}
          defaultZoom={zoom}
          onClick={clickedToAddRestaurant ? null : addnewRestaurant}
          >
        {center.lat ? <Marker lat={center.lat} lng={center.lng} text={'😀'} /> :  <p>Loading</p>}
        
        {center.lat ? filteredRestaurants.map((restaurant, i) => (
        <Marker key={i}lat={restaurant.geometry.location.lat} lng={restaurant.geometry.location.lng} text={'🌮'} 
        />)): 
        null}


      {nCoordinates.lat !== null && 
        <Marker lat={newCoordinatesCenter.lat} lng={newCoordinatesCenter.lng} text={'🌮'} newCoordinatesCenter
        />
       } 
      {/* {nCoordinates.lat !== null ?  */}
      {clickedToAddRestaurant ? 
        <AddRestaurantForm 
        addRestaurant={addRestaurant} 
        nearRestaurants={nearRestaurants} 
        hideRestaurantForm={hideRestaurantForm}
        />  : null }

        </GoogleMapReact>

  </div>
  )
}

export default Map
