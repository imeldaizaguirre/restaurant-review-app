//underneat google const
  // const handleApiLoaded = (map, maps) => {
  //   const marker = new google.maps.Marker({
  //     position: this.state.center,
  //     map: map,
  //   });
  // };

//original componenet sample from google map react

          {/* {dummyData.map(restaurant => (
          <AnyReactComponent 
                  lat={restaurant.lat}
                  lng={restaurant.long}
                  userAddress ={restaurant.address}
                  text={handleApiLoaded}          
            />
        ))} */}

        //for google markers has to go inside the GoogleMap compoennt
        // yesIWantToUseGoogleMapApiInternals
          // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}