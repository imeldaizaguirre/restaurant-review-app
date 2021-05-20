import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.js'




const Map = ({center, userAddress, zoom, nearRestaurants}) => {

  console.log("THIS IS THE LAT PASSED ON: ",center)
  console.log("THIS IS THE ZOOM PASSED ON: ",zoom)
 

  return (
    <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMapReact 
      bootstrapURLKeys={{ key: "AIzaSyAY3St2Q1qw3XCTl2by6ccsrDfL_w7LB9w" }}
      center={center}
      defaultZoom={zoom}>
    {center.lat ? <Marker lat={center.lat} lng={center.lng} text={'😀'} /> :  <p>Loading</p>}
    
    {center.lat ? nearRestaurants.map(restaurant => (
    <Marker lat={restaurant.geometry.location.lat} lng={restaurant.geometry.location.lng} text={'🌮'} 
    />)): 
    null}
    </GoogleMapReact>
  </div>
  )
}

export default Map
