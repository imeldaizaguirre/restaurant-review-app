import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
import NearByRestaurants from './NearByRestaurants'
import axios from 'axios';




class App extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: null,
        lng: null,
      },
      userAddress: null,
      zoom: 12, 
      nearRestaurants: null   
    };
    
    // this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.handleLocationError = this.handleLocationError.bind(this.handleLocationError)
   
  }

componentDidMount() {
  if(window.navigator.geolocation) {
     window.navigator.geolocation.getCurrentPosition(this.getCoordinates)
    } else {
      alert("Geolocation is not supported by this browser.")
    }   
  }

  componentDidUpdate(){
    const key ="key=AIzaSyD9xlyoXGBcIYm-H8uQEaAE6q_8P1dr60o";
    if(this.state.nearRestaurants === null){
      let requestNearByRestaurants = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.center.lat},${this.state.center.lng}&radius=10000&type=restaurant&${key}`
      axios.get(requestNearByRestaurants).then(response => {
        console.log("This resp: ", response.data)
        this.setState({ 
          nearRestaurants: response.data.results        
        }) }
     ).catch(err => (
       console.log(err)
     ))
    }
    console.log("these are the restaurants >>>>>", this.state.nearRestaurants)
  }



// API CALL TO REVIEWS WITH PLACE_ID
  // https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,rating,reviews,geometry,formatted_phone_number&key=AIzaSyAY3St2Q1qw3XCTl2by6ccsrDfL_w7LB9w&radius=50

// STREET VIEW API 
// https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=AIzaSyAY3St2Q1qw3XCTl2by6ccsrDfL_w7LB9w


getCoordinates (position) {
    console.log("Lat: ",position.coords.latitude)
    console.log("Long: ",position.coords.longitude)
    this.setState({
      center:{
      lat: position.coords.latitude,
      lng: position.coords.longitude
      }
    }) 
  }
  
  handleLocationError (error){
      switch(error.code) {
        case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.")
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.")
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.")
          break;
          default:
            alert("An unknown error ocurred")
      }
  }
  


  render() {
    console.log("THIS IS THE ZOOM ON APP: ", this.state.zoom)
    return (
    <div className="App">
      <Map  center = {this.state.center} userAddress={this.state.userAddress} zoom = {this.state.zoom} nearRestaurants = {this.state.nearRestaurants ? this.state.nearRestaurants : []}/>
      {this.state.center.lat && this.state.nearRestaurants ? <NearByRestaurants nearRestaurants={this.state.nearRestaurants}/> :
      null}
    </div>
    );
  }
}

// API KEY AIzaSyAY3St2Q1qw3XCTl2by6ccsrDfL_w7LB9w

export default App;
