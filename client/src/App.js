import React, { Component } from 'react';
import './App.css';
import Map from './components/Map/Map.js'
import NearByRestaurants from './components/NearbyRestaurants/NearByRestaurants'
import axios from 'axios';
import {apiKey}  from './apiKeys.js'
import {UserProvider} from './UserContext';
import {UserContext} from './UserContext'





class App extends Component {
  static contextType = UserContext; 
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: null,
        lng: null,
      },
      userAddress: null,
      zoom: 12, 
      nearRestaurants: null, 
      newCoordinatesCenter: {
        lat: null,
        lng: null,
      },
      clickedToAddRestaurant: false 
    };
    
    // this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.handleLocationError = this.handleLocationError.bind(this.handleLocationError);
    this.addnewRestaurant = this.addnewRestaurant.bind(this);
    this.hideRestaurantForm = this.hideRestaurantForm.bind(this);
    
  }


componentDidMount() {
  if(window.navigator.geolocation) {
     window.navigator.geolocation.getCurrentPosition(this.getCoordinates)
    } else {
      alert("Geolocation is not supported by this browser.")
    }   
  }

  componentDidUpdate(){;
    if(this.state.nearRestaurants === null){
      let requestNearByRestaurants = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.center.lat},${this.state.center.lng}&radius=5000&type=restaurant&key=${apiKey}`
      axios.get(requestNearByRestaurants).then(response => {
        this.setState({ 
          nearRestaurants: response.data.results        
        }) }
     ).catch(err => (
       console.log(err)
     ))
    }
  
  }



getCoordinates (position) {
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

  addnewRestaurant(event) {
    let lat = event.lat;
    let lng = event.lng;
    this.setState(prevState => ({
       ...prevState.newCoordinatesCenter, newCoordinatesCenter:{lat: lat, lng: lng}
    }))
    this.setState({clickedToAddRestaurant: true})
    
  }



hideRestaurantForm() {
  this.setState({clickedToAddRestaurant: false})
      this.setState(prevState => ({
      ...prevState,
      newCoordinatesCenter:{
        lat: null,
        lng: null
        }
    })) 
  
}
  
  render() {

    return ( 
    <div className="App">
      <UserProvider >
        <Map  center = {this.state.center} userAddress={this.state.userAddress} zoom = {this.state.zoom} nearRestaurants = {this.state.nearRestaurants ? this.state.nearRestaurants : []} addnewRestaurant={this.addnewRestaurant} addNewMarker={this.state.addNewMarker} newCoordinatesCenter={this.state.newCoordinatesCenter} clickedToAddRestaurant={this.state.clickedToAddRestaurant}
        hideRestaurantForm={this.hideRestaurantForm}
        />

        {this.state.center.lat && this.state.nearRestaurants ? <NearByRestaurants nearRestaurants={this.state.nearRestaurants}/> :
        null}
  
      </UserProvider>
    </div>
    );
  }
}

export default App;

